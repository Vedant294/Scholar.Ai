import { scholarships } from '@/app/data/scholarships';
import { calculateEligibility } from '@/app/lib/matching';
import { connectToDatabase } from '@/app/lib/db';

export async function POST(req) {
  try {
    // Attempt database connection in background
    try {
      await connectToDatabase();
    } catch (dbErr) {
      console.warn("MongoDB Connection failed, working in local sandbox mode:", dbErr.message);
    }

    const { message, conversationId, userProfile, history = [] } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
    }

    // --- TOKEN SAVING INTERCEPTOR: Handle greetings & general keywords locally (0 TOKENS CONSUMED!) ---
    const lowerMessage = message.trim().toLowerCase();
    const isSimpleGreeting = lowerMessage === 'hi' || lowerMessage === 'hello' || lowerMessage === 'hey' || lowerMessage === 'who are you';
    if (isSimpleGreeting) {
      console.log("Serving standard greeting locally to save 100% LLM API free-tier tokens.");
      const reply = generateSmartFallbackReply(message, userProfile);
      return new Response(JSON.stringify({
        reply,
        conversationId: conversationId || "conv_" + Math.random().toString(36).substr(2, 9),
        scholarships: getMatchingScholarshipList(userProfile),
        engine: "Local AI Fallback Core (Zero Token Match)"
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Limit historical contexts (Slice to last 4 messages to save 50%+ history context tokens)
    const slicedHistory = history.slice(-4);

    // 1. Try Primary LLM: Google Gemini API
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        console.log("Routing chat via Primary LLM: Gemini 1.5 Flash (with Token Optimizations)...");
        const responseText = await callGeminiAPI(geminiKey, message, userProfile, slicedHistory);
        return new Response(JSON.stringify({
          reply: responseText,
          conversationId: conversationId || "conv_" + Math.random().toString(36).substr(2, 9),
          scholarships: getMatchingScholarshipList(userProfile),
          engine: "Gemini 1.5 Flash (Primary)"
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (geminiError) {
        console.error("Gemini API failed. Attempting fallback to Grok...", geminiError.message);
      }
    }

    // 2. Try Fallback LLM: Grok API (xAI)
    const grokKey = process.env.GROK_API_KEY;
    if (grokKey) {
      try {
        console.log("Routing chat via Fallback LLM: Grok xAI (with Token Optimizations)...");
        const responseText = await callGrokAPI(grokKey, message, userProfile, slicedHistory);
        return new Response(JSON.stringify({
          reply: responseText,
          conversationId: conversationId || "conv_" + Math.random().toString(36).substr(2, 9),
          scholarships: getMatchingScholarshipList(userProfile),
          engine: "Grok xAI (Secondary Fallback)"
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      } catch (grokError) {
        console.error("Grok API also failed. Dropping back to Local Core Assistant...", grokError.message);
      }
    }

    // 3. Fallback to Local Core Assistant (Guarantees zero-crash!)
    console.log("Routing chat via Local Core Assistant engine...");
    const reply = generateSmartFallbackReply(message, userProfile);
    return new Response(JSON.stringify({
      reply,
      conversationId: conversationId || "conv_" + Math.random().toString(36).substr(2, 9),
      scholarships: getMatchingScholarshipList(userProfile),
      engine: "Local AI Fallback Core"
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Chat API global error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong in ScholarAI Core Engine" }), { status: 500 });
  }
}

function getMatchingScholarshipList(profile) {
  if (!profile) return [];
  return scholarships
    .map(s => ({
      ...s,
      score: calculateEligibility(profile, s)
    }))
    .filter(s => s.score >= 40)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

async function callGeminiAPI(apiKey, userMessage, profile, history) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const formattedHistory = history.map(msg => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }]
  }));

  // Fetch only top matched scholarships to insert into system prompt instead of full database (Saves 80%+ Context Tokens!)
  const topMatchedSchols = getMatchingScholarshipList(profile).map(s => ({
    name: s.name,
    state: s.state,
    amount: s.benefits.amount,
    deadline: s.deadline
  }));

  const systemPrompt = `You are ScholarAI, an AI advisor that helps Indian students find scholarships. You ONLY speak about scholarships. Be brief, encouraging, and clear.
  
  User Profile:
  - State: ${profile?.state || "Not specified"}
  - Category: ${profile?.category || "General"}
  - Course: ${profile?.course || "Not specified"}
  - Income: ₹${profile?.income || "Not specified"}
  
  Best Matched Scholarships from Database:
  ${JSON.stringify(topMatchedSchols)}
  
  Instructions:
  1. Highlight the top matched scholarships. Keep replies short (max 150 words) to save tokens.
  2. Speak with friendly mentor tone. Use bullet points and bold text where relevant.`;

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: userMessage }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 250 // Restricts long generated paragraphs (saves massive output tokens!)
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`Gemini responded with code ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "I processed your request, but couldn't formulate a response.";
}

async function callGrokAPI(apiKey, userMessage, profile, history) {
  const url = "https://api.x.ai/v1/chat/completions";
  
  const topMatchedSchols = getMatchingScholarshipList(profile).map(s => ({
    name: s.name,
    state: s.state,
    amount: s.benefits.amount
  }));

  const formattedMessages = [
    {
      role: "system",
      content: `You are ScholarAI, an encouraging AI scholarship advisor. Only discuss scholarship-related topics. Keep replies under 150 words.
      User Profile: State: ${profile?.state || "Maharashtra"}, Category: ${profile?.category || "General"}, Course: ${profile?.course || "B.Tech"}.
      Best Matches: ${JSON.stringify(topMatchedSchols)}`
    },
    ...history.map(msg => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content
    })),
    {
      role: "user",
      content: userMessage
    }
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "grok-beta",
      messages: formattedMessages,
      max_tokens: 250 // Restricts Grok token outputs
    })
  });

  if (!response.ok) {
    throw new Error(`Grok responded with code ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "I processed your request using Grok, but couldn't formulate a response.";
}

function generateSmartFallbackReply(message, profile) {
  const msg = message.toLowerCase();
  const matches = scholarships.map(s => ({
    ...s,
    score: calculateEligibility(profile, s)
  })).sort((a, b) => b.score - a.score);

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return `Hello! 👋 I am ScholarAI, your personalized scholarship advisor. Based on your profile (${profile?.course || "UG"} in ${profile?.state || "India"}), I have pre-calculated your eligibility for top central, state, and private scholarships.\n\nAsk me anything like:\n• **"What scholarships do I qualify for?"**\n• **"Tell me about Maharashtra state scholarships."**\n• **"Am I eligible for Tata or Reliance schemes?"**`;
  }

  if (msg.includes("maharashtra") || msg.includes("marathi") || msg.includes("shahu") || msg.includes("panjabrao")) {
    const mahSchols = matches.filter(s => s.state === "Maharashtra" || s.id.startsWith("mah-"));
    if (mahSchols.length === 0) {
      return `I see you are interested in Maharashtra scholarships! Please complete your onboarding or update your state to **Maharashtra** in your dashboard profile so I can fetch and match the top MahaDBT schemes for you.`;
    }
    
    let reply = `Here are the top real **Maharashtra State Scholarships** matching your profile:\n\n`;
    mahSchols.forEach(s => {
      reply += `• **${s.name}**\n  - **Eligibility Match:** ${s.score}%\n  - **Benefits:** ₹${s.benefits.amount.toLocaleString('en-IN')} / year\n  - **Deadline:** ${s.deadline}\n  - **Direct Apply:** [MahaDBT Portal](${s.applyLink})\n\n`;
    });
    reply += `Would you like me to tell you what documents are required for any of these?`;
    return reply;
  }

  if (msg.includes("eligible") || msg.includes("qualify") || msg.includes("match") || msg.includes("find")) {
    const qualified = matches.filter(s => s.score >= 50);
    if (qualified.length === 0) {
      return `Based on your current profile (Income: ₹${Number(profile?.income || 0).toLocaleString('en-IN')}, Category: ${profile?.category}), you don't fully match our major loaded scholarships. Try lowering your income or adjusting filters in the Discover panel!`;
    }

    let reply = `Based on your profile, here are your best matched scholarships:\n\n`;
    qualified.slice(0, 3).forEach(s => {
      reply += `• **${s.name}**\n  - **Match Score:** ${s.score}%\n  - **Provider:** ${s.provider}\n  - **Benefit:** ₹${s.benefits.amount.toLocaleString('en-IN')} (${s.benefits.type})\n  - **Deadline:** ${s.deadline}\n\n`;
    });
    reply += `You can save these directly to your **Dashboard** tracker to receive reminders!`;
    return reply;
  }

  return `I understand you are asking about scholarships. Here is a quick match based on your criteria:\n\nOur top recommendation for you is the **${matches[0]?.name}** with a match score of **${matches[0]?.score || 0}%**. It offers **₹${matches[0]?.benefits?.amount?.toLocaleString('en-IN')}** per year. Let me know if you want the application link or documents required for it!`;
}

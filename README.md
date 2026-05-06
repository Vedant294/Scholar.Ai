# ScholarAI 🎓

An AI-powered scholarship discovery platform for Indian students. Users complete a profile (state, category, income, course) and get matched to real government and private scholarships with eligibility scores. A built-in chat assistant answers questions using Gemini or Grok, with a local fallback engine that works even without API keys.

**Live stack:** Next.js 14 · Tailwind CSS · Framer Motion · MongoDB Atlas · Gemini 1.5 Flash / Grok xAI

---

## Project Overview

| Feature | Details |
|---|---|
| Scholarship Matching | Weighted scoring across state, category, income, course, gender |
| AI Chat | Gemini → Grok → Local fallback chain |
| Auth | Client-side (localStorage), no backend auth server |
| Database | MongoDB Atlas (optional — app works without it) |
| Deployment | Netlify (frontend) + Render (API routes via Node server) |

---

## Interview Q&A

### Introduction

**Q: Tell me about this project in one line.**
> ScholarAI is a Next.js web app that uses AI and a rule-based matching engine to help Indian students discover and track scholarships they are actually eligible for.

**Q: Why did you build this?**
> Most scholarship portals in India are fragmented — students have to manually check MahaDBT, NSP, and private trust websites separately. ScholarAI centralizes discovery and adds an AI layer so students can ask questions in plain language.

**Q: What problem does it solve?**
> It reduces the time a student spends finding relevant scholarships from hours to seconds by pre-computing eligibility scores against their profile.

---

### Architecture

**Q: Walk me through the architecture.**
> It's a single Next.js 14 app using the App Router. The frontend is entirely client-side React with state managed through a React Context (`AppContext`). The only backend piece is one API route — `/api/chat` — which handles AI calls. There's no separate backend server.

**Q: How does routing work? There's no `pages/` folder.**
> It uses Next.js App Router. All pages live under `app/`. The "routing" between Landing, Login, Dashboard, Chat, and Discover is actually tab-based state (`activeTab`) managed in `page.js` — not real URL routes. URL params are synced manually so browser back/forward still works.

**Q: Why localStorage instead of a database for user data?**
> It keeps the app fully functional without any backend. The MongoDB connection is optional — if it fails, the app silently falls back to local mode. This makes it easy to demo without infrastructure setup.

**Q: How does the AI fallback chain work?**
> The `/api/chat` route tries Gemini first, then Grok if Gemini fails, then a local rule-based engine if both fail. This guarantees the chat never crashes regardless of API key availability.

---

### Database & Modules

**Q: What does MongoDB store?**
> Currently the connection is established but the app primarily uses localStorage for user sessions and saved/applied scholarship tracking. MongoDB is wired in for future features like server-side conversation history and analytics.

**Q: Explain the matching algorithm.**
> `lib/matching.js` runs a weighted score (0–100) across five criteria:
> - State match → 30 points
> - Social category → 25 points
> - Family income ≤ limit → 20 points (partial credit if within 20% over)
> - Course match → 15 points
> - Gender eligibility → 10 points
>
> Scholarships scoring ≥ 40 are shown; top 3 are sent to the AI as context.

**Q: Where does the scholarship data come from?**
> It's a curated static dataset in `app/data/scholarships.js` with 7 real schemes — Maharashtra state schemes (MahaDBT), central schemes (AICTE Pragati, INSPIRE), and private trusts (Tata, Reliance). Each entry has eligibility rules, benefit amounts, deadlines, and direct apply links.

**Q: How does the AI know about the user's scholarships?**
> Before calling Gemini or Grok, the route runs the matching engine and injects only the top 3 matched scholarships into the system prompt. This keeps token usage low instead of dumping the full database into every request.

---

### How to Explain It Simply

> "Imagine you're a student in Maharashtra from an OBC family doing B.Tech. Instead of visiting 10 different government websites, you fill out one form here — your state, category, income, course. The app instantly scores every scholarship in its database against your profile and shows you the ones you actually qualify for, ranked by match percentage. Then you can chat with an AI assistant to ask things like 'what documents do I need?' or 'when is the deadline?' — and it answers based on your specific matches."

---

## Local Setup

```bash
# 1. Clone and install
git clone https://github.com/Vedant294/Scholar.Ai.git
cd Scholar.Ai
npm install

# 2. Create environment file
cp .env.example .env.local
# Fill in your keys (see below)

# 3. Run dev server
npm run dev
```

### Environment Variables

Create `.env.local` with:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/scholarai
GEMINI_API_KEY=your_gemini_api_key_here
GROK_API_KEY=your_grok_api_key_here
```

> All three are optional — the app runs in local fallback mode without them.

---

## Deployment Guide

### Option A — Netlify (Recommended for full-stack Next.js)

Netlify supports Next.js API routes natively via their serverless functions adapter.

1. Push your code to GitHub (already done).

2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git** → select `Scholar.Ai`.

3. Build settings (auto-detected, but verify):
   - Build command: `npm run build`
   - Publish directory: `.next`

4. Add environment variables under **Site settings → Environment variables**:
   ```
   MONGODB_URI
   GEMINI_API_KEY
   GROK_API_KEY
   ```

5. Click **Deploy**. Netlify handles the `/api/chat` route automatically.

> If you see a blank page, install the Netlify Next.js plugin:
> ```bash
> npm install -D @netlify/plugin-nextjs
> ```
> Then add `netlify.toml` to the project root:
> ```toml
> [[plugins]]
> package = "@netlify/plugin-nextjs"
> ```

---

### Option B — Render

Render runs Next.js as a Node.js web service, which handles both the frontend and API routes.

1. Go to [render.com](https://render.com) → **New** → **Web Service** → connect your GitHub repo.

2. Configure the service:
   | Setting | Value |
   |---|---|
   | Environment | Node |
   | Build Command | `npm install && npm run build` |
   | Start Command | `npm start` |
   | Node Version | 18 or 20 |

3. Add environment variables under **Environment**:
   ```
   MONGODB_URI
   GEMINI_API_KEY
   GROK_API_KEY
   ```

4. Click **Create Web Service**. Render will build and deploy.

> Free tier on Render spins down after inactivity — first request after idle may take ~30 seconds to wake up.

---

## Project Structure

```
app/
├── api/chat/route.js       # AI chat endpoint (Gemini → Grok → Local)
├── components/             # All UI components
├── context/AppContext.js   # Global state (user, saved, applied, conversations)
├── data/scholarships.js    # Static scholarship database
├── lib/
│   ├── db.js               # MongoDB connection (cached)
│   └── matching.js         # Eligibility scoring engine
├── page.js                 # Root page + tab-based router
└── globals.css             # Tailwind + custom styles
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Framer Motion |
| AI | Google Gemini 1.5 Flash / Grok xAI |
| Database | MongoDB Atlas via Mongoose |
| State | React Context + localStorage |
| Icons | Lucide React |
| Animations | canvas-confetti |

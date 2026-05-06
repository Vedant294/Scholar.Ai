export const scholarships = [
  {
    id: "mah-shahu-maharaj",
    name: "Rajarshi Chhatrapati Shahu Maharaj Fee Waiver Scheme",
    provider: "Directorate of Higher Education, Govt. of Maharashtra",
    state: "Maharashtra",
    deadline: "2026-06-30",
    applyLink: "https://mahadbt.maharashtra.gov.in/",
    benefits: {
      amount: 50000,
      type: "ANNUAL",
      details: "50% tuition fee waiver for professional courses (Engineering, Medical, MBA) and 100% waiver for non-professional courses."
    },
    eligibility: {
      incomeLimit: 800000,
      categories: ["General", "OBC", "EWS"],
      courses: ["B.Tech", "MBBS", "MBA", "MCA", "B.Sc", "B.Com"],
      levels: ["UG", "PG"],
      states: ["Maharashtra"],
      genders: ["All", "Female"],
      minMarks: 60
    }
  },
  {
    id: "mah-panjabrao-deshmukh",
    name: "Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojana",
    provider: "Directorate of Technical Education, Govt. of Maharashtra",
    state: "Maharashtra",
    deadline: "2026-06-30",
    applyLink: "https://mahadbt.maharashtra.gov.in/",
    benefits: {
      amount: 30000,
      type: "ANNUAL",
      details: "Hostel maintenance allowance up to ₹30,000 for children of registered labor and small landholders studying in metropolitan cities."
    },
    eligibility: {
      incomeLimit: 800000,
      categories: ["General", "OBC", "EWS", "SC", "ST"],
      courses: ["B.Tech", "MBBS", "B.Pharm", "MBA"],
      levels: ["UG", "PG"],
      states: ["Maharashtra"],
      genders: ["All", "Female"],
      minMarks: 50
    }
  },
  {
    id: "mah-post-matric-sc",
    name: "Government of India Post-Matric Scholarship for SC Students",
    provider: "Social Justice and Special Assistance, Govt. of Maharashtra",
    state: "Maharashtra",
    deadline: "2026-07-15",
    applyLink: "https://mahadbt.maharashtra.gov.in/",
    benefits: {
      amount: 60000,
      type: "ANNUAL",
      details: "100% tuition fee coverage, exam fees, and monthly maintenance allowance for SC students pursuing higher education."
    },
    eligibility: {
      incomeLimit: 250000,
      categories: ["SC"],
      courses: ["B.Tech", "MBBS", "B.Sc", "B.Com", "B.A", "MBA"],
      levels: ["UG", "PG", "PhD"],
      states: ["Maharashtra"],
      genders: ["All", "Female"],
      minMarks: 45
    }
  },
  {
    id: "national-pragati",
    name: "AICTE Pragati Scholarship Scheme for Girl Students",
    provider: "All India Council for Technical Education (AICTE)",
    state: "All India",
    deadline: "2026-08-31",
    applyLink: "https://scholarships.gov.in/",
    benefits: {
      amount: 50000,
      type: "ANNUAL",
      details: "₹50,000 per annum for tuition fees, purchase of books, equipment, laptops, and desktop computers."
    },
    eligibility: {
      incomeLimit: 800000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      courses: ["B.Tech", "B.Pharm"],
      levels: ["UG"],
      states: ["All India", "Maharashtra", "Delhi", "Karnataka", "Uttar Pradesh", "Tamil Nadu"],
      genders: ["Female"],
      minMarks: 60
    }
  },
  {
    id: "national-inspire",
    name: "INSPIRE Scholarship for Higher Education (SHE)",
    provider: "Department of Science and Technology, Govt. of India",
    state: "All India",
    deadline: "2026-09-15",
    applyLink: "https://online-inspire.gov.in/",
    benefits: {
      amount: 80000,
      type: "ANNUAL",
      details: "₹60,000 cash scholarship per year plus ₹20,000 mentorship support for undertaking research projects."
    },
    eligibility: {
      incomeLimit: 1200000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      courses: ["B.Sc", "M.Sc"],
      levels: ["UG", "PG"],
      states: ["All India", "Maharashtra", "Delhi", "Karnataka", "Uttar Pradesh", "Tamil Nadu"],
      genders: ["All", "Female"],
      minMarks: 80
    }
  },
  {
    id: "pvt-tata-million",
    name: "Tata Million Scholars Program",
    provider: "Tata Trusts",
    state: "All India",
    deadline: "2026-10-31",
    applyLink: "https://www.tatatrusts.org/",
    benefits: {
      amount: 100000,
      type: "ANNUAL",
      details: "Direct bank transfer of ₹1,00,000 to cover academic tuitions, books, hostel, and research projects for deserving scholars."
    },
    eligibility: {
      incomeLimit: 600000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      courses: ["B.Tech", "MBBS", "MBA"],
      levels: ["UG", "PG"],
      states: ["All India", "Maharashtra", "Delhi", "Karnataka", "Uttar Pradesh", "Tamil Nadu"],
      genders: ["All", "Female"],
      minMarks: 70
    }
  },
  {
    id: "pvt-reliance-foundation",
    name: "Reliance Foundation Undergraduate Scholarships",
    provider: "Reliance Foundation",
    state: "All India",
    deadline: "2026-11-15",
    applyLink: "https://www.reliancefoundation.org/",
    benefits: {
      amount: 200000,
      type: "TOTAL",
      details: "Up to ₹2,00,000 support across the duration of the undergraduate degree along with a strong alumni network & mentorship."
    },
    eligibility: {
      incomeLimit: 1500000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      courses: ["B.Tech", "B.Sc", "B.Com", "B.A"],
      levels: ["UG"],
      states: ["All India", "Maharashtra", "Delhi", "Karnataka", "Uttar Pradesh", "Tamil Nadu"],
      genders: ["All", "Female"],
      minMarks: 60
    }
  }
];

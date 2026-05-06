/**
 * Dynamic Match Scorer
 * 
 * Calculates compatibility percentage (0 - 100) based on:
 * - State Eligibility (30%)
 * - Social Category Match (25%)
 * - Family Income Level (20%)
 * - Selected Academic Course (15%)
 * - Gender Criteria (10%)
 */
export function calculateEligibility(profile, scholarship) {
  if (!profile || !scholarship) return 0;

  let score = 0;

  // 1. Home State Check (30%)
  const matchesState = scholarship.eligibility.states.includes(profile.state) || scholarship.state === "All India";
  if (matchesState) {
    score += 30;
  }

  // 2. Social Category Check (25%)
  const matchesCategory = scholarship.eligibility.categories.includes(profile.category);
  if (matchesCategory) {
    score += 25;
  }

  // 3. Family Income Check (20%)
  const matchesIncome = profile.income <= scholarship.eligibility.incomeLimit;
  if (matchesIncome) {
    score += 20;
  } else {
    // Partial score if income exceeds by less than 20%
    const excessRatio = (profile.income - scholarship.eligibility.incomeLimit) / scholarship.eligibility.incomeLimit;
    if (excessRatio < 0.2) {
      score += Math.round(10 * (1 - excessRatio * 5));
    }
  }

  // 4. Academic Course Check (15%)
  const matchesCourse = scholarship.eligibility.courses.includes(profile.course);
  if (matchesCourse) {
    score += 15;
  }

  // 5. Gender Check (10%)
  const matchesGender = scholarship.eligibility.genders.includes(profile.gender) || scholarship.eligibility.genders.includes("All");
  if (matchesGender) {
    score += 10;
  }

  return score;
}

// src/utils/courseData.ts

export const courseGroups = {
    "English": [
      "English I",
      "AP Seminar – English",
      "Seminar/English",
      "English: African Literature",
      "English: World Literature",
      "AP Language and Composition",
      "AP Literature and Composition",
      "AP Research"
    ],
    "Social Sciences": [
      "Human Geography (Gr 9)",
      "World Civilizations (Gr 10)",
      "Economics",
      "US History",
      "Business Studies",
      "Global Issues",
      "Model United Nations (MUN)",
      "AP Psychology",
      "AP Comparative Government and Politics",
      "AP Economics: Macro & Micro",
      "AP Macroeconomics",
      "AP Microeconomics",
      "AP World History: Modern",
      "AP Research"
    ],
    "Foreign Languages": [
      "French (Beginning)",
      "French (Intermediate)",
      "French (Upper Intermediate)",
      "French (Advanced)",
      "Spanish (Beginning)",
      "Spanish (Intermediate)",
      "Spanish (Upper Intermediate)",
      "Spanish (Advanced)",
      "AP French",
      "AP Spanish",
      "French Literature",
      "Spanish Literature"
    ],
    "Mathematics": [
      "Algebra I",
      "Geometry",
      "Algebra II",
      "Statistics",
      "AP Precalculus",
      "AP Calculus AB",
      "AP Calculus BC",
      "AP Statistics"
    ],
    "Science": [
      "Integrated Science I",
      "Integrated Science II",
      "Forensic Science",
      "Advanced Biology",
      "Advanced Chemistry",
      "Advanced Physics",
      "Advanced Environmental Science",
      "AP Biology",
      "AP Chemistry",
      "AP Physics I",
      "AP Environmental Science",
      "AP Computer Science A",
      "AP Computer Science Principles",
      "Intro to Computer Science: Python"
    ]
  } as const;
  
  export type CourseCategory = keyof typeof courseGroups;
  export type Course = typeof courseGroups[CourseCategory][number];
  
  
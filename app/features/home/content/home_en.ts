import type { PortfolioProject, SiteNavLink, SkillItem, SocialLink } from "../model/types";

export const SITE_BRAND_EN = "Kongkat Thanalertrungroj";

export const HERO_HEADLINE_NAME_LINES_EN = ["Kongkat", "Thanalertrungroj"] as const;

export const HERO_HEADLINE_ROLE_EN = "PROGRAMMER & AI ENGINEER" as const;

export const HERO_SUBTITLE_EN =
  "B.Sc. Computer Science · Rajamangala University of Technology Isan · 2022–2026 · GPA 3.31";

export const SITE_NAV_EN: SiteNavLink[] = [
  { label: "About", href: "/#about", icon: "person" },
  { label: "Expertise", href: "/#expertise", icon: "psychology" },
  { label: "Work", href: "/#work", icon: "work_outline" },
  { label: "Contact", href: "/#contact", icon: "mail" },
];

export const PORTFOLIO_PROJECTS_EN: PortfolioProject[] = [
  {
    slug: "data-center",
    category: "Website project",
    index: 1,
    total: 1,
    meta: "Cooperative project · University data platform",
    title: "DATA CENTER (SANDBOX)",
    description:
      "A centralized data center to remove silos and cut redundancy in university information management. Built with data governance in mind and as a base for future AI-driven analytics and forecasting.",
    bullets: [
      "End-to-end dataset management: advanced search, exploration, and dynamic filtering across the lifecycle.",
      "Dynamic schema & table management: metadata, primary keys, and complex relationships.",
      "Template-based Excel import to enforce standards and consistency at the point of entry.",
      "Semi-automated validation: data types, constraints, cross-table references, and precise error reporting.",
      "Security & governance via RBAC across departments and user levels.",
    ],
    ctaLabel: "Email me",
    ctaHref: "mailto:kongkat5556@hotmail.com?subject=Data%20Center%20project",
    imageSrc: "/images/projects/data-center-v2.png",
    imageAlt: "Data platform dashboard concept",
    imagePosition: "object-left-top",
    accent: "blue",
    icon: "database",
  },
  {
    slug: "gpa-prediction-model",
    category: "Data Project",
    index: 2,
    total: 2,
    meta: "Data Analysis · Machine Learning · Academic Dataset",
    title: "GRADUATE STUDENT ANALYTICS & GPA PREDICTION MODEL",
    description:
      "An end-to-end data science project analyzing the records of 2024 graduate students from Rajamangala University of Technology Isan (RMUTI) to uncover academic performance patterns. The project builds a machine learning model to predict the final cumulative GPA of incoming students, estimating their academic performance upon graduation based on their admission profiles.",
    bullets: [
      "Exploratory data analysis on a real-world university graduate dataset.",
      "Feature engineering from academic history, demographics, and prior education records.",
      "Machine learning model training and evaluation for cumulative GPA prediction.",
    ],
    detailSections: [
      {
        kind: "dataset",
        title: "Dataset Overview",
        source: "Graduate student records — Rajamangala University of Technology Isan (RMUTI), Academic Year 2024",
        groups: [
          {
            icon: "🎓",
            groupLabel: "Student Info",
            columns: "YEAR, UNIV_ID, STD_ID, PREFIX_NAME_ID, STD_FNAME, STD_LNAME",
            purpose: "Core identity information",
            rows: [
              { column: "YEAR", type: "int64", example: "2564, 2565", description: "Academic admission year (Thai Buddhist Era)" },
              { column: "UNIV_ID", type: "int64", example: "19901, 19902", description: "Campus code within RMUTI" },
              { column: "STD_ID", type: "object", example: "64172110001-5", description: "Student ID number" },
              { column: "PREFIX_NAME_ID", type: "int64", example: "3 = Mr., 4 = Ms.", description: "Name prefix code — anomalous max value (223) flagged for review" },
              { column: "STD_FNAME", type: "object", example: "—", description: "First name (Thai) — PII" },
              { column: "STD_LNAME", type: "object", example: "—", description: "Last name (Thai) — PII" },
            ],
            note: "PREFIX_NAME_ID has an outlier max value of 223 — requires data quality validation.",
          },
          {
            icon: "👤",
            groupLabel: "Demographics",
            columns: "CITIZEN_ID, GENDER_ID, BIRTHDAY, RACE_ID, RELIGION_ID",
            purpose: "Population & personal attributes",
            rows: [
              { column: "CITIZEN_ID", type: "object", example: "1309902xxxxxxx", description: "13-digit national ID — Sensitive PII" },
              { column: "GENDER_ID", type: "int64", example: "1 = Male, 2 = Female", description: "Gender identifier" },
              { column: "BIRTHDAY", type: "object", example: "15/06/2545", description: "Date of birth (DD/MM/YYYY Thai Era) — PII" },
              { column: "RACE_ID", type: "int64", example: "99 = Thai", description: "Nationality code" },
              { column: "RELIGION_ID", type: "float64", example: "1.0 = Buddhist, 6.0 = Islam", description: "Religion code — 2 missing records" },
            ],
          },
          {
            icon: "📚",
            groupLabel: "Curriculum",
            columns: "LEV_ID, CURR_ID, FAC_ID, ISCED_ID, PROGRAM_ID, PROG_CODE, NEW_CURR_ID, PROG_CURR_ID",
            purpose: "Degree program and faculty",
          },
          {
            icon: "📊",
            groupLabel: "Academic Performance",
            columns: "GPA",
            purpose: "Cumulative university GPA — target variable for prediction",
            rows: [
              { column: "GPA", type: "float64", example: "3.45", description: "Cumulative GPA — primary prediction target" },
            ],
          },
          {
            icon: "🏠",
            groupLabel: "Current Address",
            columns: "HOMEADD, MOO, SOI, STREET, SUB_DISTRICT_ID, DISTRICT_ID, PROVINCE_ID, ZIPCODE",
            purpose: "Student residential address",
          },
          {
            icon: "📞",
            groupLabel: "Contact",
            columns: "TELEPHONE, EMAIL",
            purpose: "Contact channels — PII",
          },
          {
            icon: "🎓",
            groupLabel: "Prior Education",
            columns: "OLD_SCHOOL_CODE, OLD_PROV_CODE, OLD_LEVEL_ID, OLD_PROG_NAME, OLD_GRADUATE_YEAR, OLD_GPA, OLD_SCHOOL_NAME, OLD_LEVEL_NAME, OLD_PROV_NAME",
            purpose: "Pre-university academic history",
            rows: [
              { column: "OLD_GPA", type: "float64", example: "3.20", description: "High school GPA — key predictor feature" },
              { column: "OLD_SCHOOL_CODE", type: "object", example: "—", description: "High school identifier — used to engineer school quality feature" },
              { column: "OLD_GRADUATE_YEAR", type: "int64", example: "2563", description: "High school graduation year" },
            ],
          },
          {
            icon: "🗃️",
            groupLabel: "Miscellaneous",
            columns: "DATAGRADUATION, GROUP_CODE, Custom",
            purpose: "Additional metadata fields",
          },
        ],
      },
      {
        kind: "eda",
        title: "Exploratory Data Analysis",
        stats: [
          { label: "Total Students", value: "6,520", sub: "Graduating class of 2024", icon: "groups" },
          { label: "Total Features", value: "42", sub: "21 numerical · 21 categorical", icon: "dataset" },
          { label: "Average GPA", value: "3.06", sub: "Median: 3.06 · Std: 0.46", icon: "grade" },
          { label: "GPA Range", value: "0.00 – 4.00", sub: "Only 1 outlier detected (0.02%)", icon: "show_chart" },
          { label: "High School GPA Correlation", value: "r = 0.384", sub: "Strongest predictor of university GPA", icon: "trending_up" },
          { label: "Best Cohort (Avg GPA)", value: "2566 → 3.17", sub: "Largest group: 2,565 students", icon: "emoji_events" },
        ],
        charts: [
          {
            title: "GPA Distribution",
            description: "Distribution of cumulative university GPA across all 6,520 graduates.",
            imagePath: "/projects/gpa-prediction-model/eda_output/04_uni_GPA.png",
            insight: "GPA is roughly normally distributed around 3.06, with a slight right skew towards higher grades. The majority of students achieve GPAs between 3.0 and 3.5, with over 3,000 students in this range.",
          },
          {
            title: "High School GPA vs. University GPA",
            description: "Scatter plot showing the relationship between each student's high school GPA (OLD_GPA) and their final university GPA.",
            imagePath: "/projects/gpa-prediction-model/eda_output/06c_oldgpa_vs_gpa.png",
            insight: "A clear positive trend is observed: students who performed well in high school tend to achieve higher university GPAs. While not a perfect straight line (Correlation r = 0.384), High School GPA remains a solid initial predictor of academic success in university.",
          },
          {
            title: "GPA by Gender",
            description: "Comparison of average GPA between male and female students.",
            imagePath: "/projects/gpa-prediction-model/eda_output/06a_gpa_by_gender.png",
            insight: "Female students achieve significantly higher average GPAs (3.17) compared to male students (2.94). With a balanced sample size of over 3,200 students per gender, this outcome demonstrates high reliability.",
          },
          {
            title: "GPA Trend by Admission Year (Cohort Analysis)",
            description: "Average GPA for each admission year cohort, showing how academic performance evolved over time.",
            imagePath: "/projects/gpa-prediction-model/eda_output/09_cohort_trend.png",
            insight: "There is a consistent upward trend in average GPAs according to admission year. The 2023 (2566) cohort reached the highest average GPA (3.17) and largest student count (2,565), with a notable jump starting in 2021 (2564).",
          },
          {
            title: "GPA by Prior Education Level",
            description: "How a student's prior education level (high school type) relates to their university GPA.",
            imagePath: "/projects/gpa-prediction-model/eda_output/06e_gpa_by_edu_level.png",
            insight: "Students coming from vocational or specialized tracks show notable differences in GPA outcomes compared to general high school graduates.",
          },
          {
            title: "Correlation Heatmap",
            description: "Heatmap of Pearson correlations between all key numerical features and GPA.",
            imagePath: "/projects/gpa-prediction-model/eda_output/07_correlation_heatmap.png",
            insight: "High School GPA (OLD_GPA) has the strongest correlation with university GPA (r = 0.384), followed by Admission Year (r = 0.259) and Gender (r = 0.183). Other factors like prior school province or education level show near-zero impact on university grades.",
          },
          {
            title: "Missing Value Analysis",
            description: "Overview of columns with missing data and their percentage.",
            imagePath: "/projects/gpa-prediction-model/eda_output/03_missing_barplot.png",
            insight: "Crucially, the most important predictor, High School GPA (OLD_GPA), has a very low missing rate of 0.89%, making it highly reliable. However, features like PROG_CURR_ID (77% missing) or ISCED_ID (51% missing) may require dropping or careful imputation for Machine Learning modeling.",
          },
        ],
      },
      {
        kind: "cleaning",
        title: "Data Cleaning",
        stats: [
          { label: "Rows (before → after)", before: "6,520", after: "6,520", icon: "table_rows" },
          { label: "Columns", before: "42", after: "45", icon: "view_column" },
          { label: "Missing Cells", before: "6,728", after: "133", icon: "healing" },
          { label: "PII Removed", before: "11 columns", after: "0 columns", icon: "lock" },
        ],
        steps: [
          {
            step: 1,
            title: "Fix Data Types",
            why: "Multiple columns were loaded with incorrect data types (e.g., academic year loaded as text instead of numeric), preventing mathematical operations.",
            what: "Converted YEAR and OLD_GRADUATE_YEAR to Nullable Integers, and RELIGION_ID to Int64 to support null values, and validated that GENDER_ID contains only valid entries (1 and 2).",
            result: "3 columns successfully converted; no anomalies found in GENDER_ID.",
            badge: "✅",
          },
          {
            step: 2,
            title: "Remove Personal Information (PDPA)",
            why: "Personally Identifiable Information (PII) such as names, citizen IDs, birth dates, and contact details must not be used for modeling to comply with the Personal Data Protection Act (PDPA).",
            what: "Dropped 11 PII columns, including first-last name, national ID, birthday, detailed address, phone number, and email.",
            result: "Dataset reduced to 33 columns—safely aligned with PDPA compliance.",
            badge: "🔒",
          },
          {
            step: 3,
            title: "Handle Missing Values",
            why: "Missing values can bias model training and cause errors; they must be strategically imputed, dropped, or flagged.",
            what: "Dropped NEW_CURR_ID (100% missing). Imputed OLD_GPA with its median (3.290) for 58 missing records. Imputed RELIGION_ID with its mode. Created missingness indicator flags for PROG_CURR_ID, PROGRAM_ID, and ISCED_ID before retaining them.",
            result: "Total missing cells reduced from 6,728 to 133. Crucially, target variable GPA and main predictor OLD_GPA now have 0 missing values.",
            badge: "🩹",
          },
          {
            step: 4,
            title: "Fix GPA Outliers",
            why: "GPAs outside the standard [0, 4.0] range are clear errors, while highly suspicious values (e.g., exact 0.00) should be flagged rather than immediately dropped.",
            what: "Validated all GPA values against the [0, 4.0] range. Flagged highly suspicious records—specifically GPA = 0.00 (1 record) and GPA < 0.50 (1 record)—as suspect.",
            result: "Zero records were dropped; all GPA values are verified within the valid numeric range.",
            badge: "✅",
          },
          {
            step: 5,
            title: "Normalize OLD_GPA Scale",
            why: "High school GPAs originate from multiple schools using different scales (e.g., 4.0 vs 5.0). Using raw values would bias model learning and prevent fair comparisons.",
            what: "Identified 1 outlier record with OLD_GPA = 4.58 (based on a 5.0 scale) and rescaled it to a 4.0 scale by multiplying by 4/5.",
            result: "Maximum OLD_GPA is now normalized to 4.000. All high school GPAs are on a standardized scale.",
            badge: "📐",
          },
          {
            step: 6,
            title: "Clean Text & Group Rare Categories",
            why: "Categorical levels with very low representation (e.g., 1–2 students) can cause overfitting and force the model to learn noise instead of generalizable patterns.",
            what: "Standardized text formatting (whitespace stripping and upper-casing). Aggregated rare groups (province < 20 students → 'OTHER' [41 provinces]; curriculum tracks < 20 students → 'OTHER' [523 tracks]; high schools < 5 students → 'OTHER').",
            result: "Reduced unique categories in OLD_PROG_NAME from 579 down to 43 highly meaningful and statistically significant values.",
            badge: "🗂️",
          },
          {
            step: 7,
            title: "Create New Features",
            why: "Raw attributes often lack direct predictive power, but converting them into engineered features unlocks valuable signals for machine learning algorithms.",
            what: "Engineered key features: GPA_CLASS (First Class Honours, Second Class Honours, Normal, Academic Probation), IS_VOCATIONAL (from vocational track), IS_STEM (STEM-focused high school track), and STUDY_GAP (gap years before university enrollment).",
            result: "Successfully added 4 new features. Example distributions for GPA_CLASS: First Class Honours = 20.3%, Normal = 64.5%.",
            badge: "⚙️",
          },
        ],
        issues: [
          {
            title: "AGE_AT_GRAD calculations currently unavailable",
            detail: "The reference date column is empty in raw data; needs parsing from BIRTHDAY (Buddhist Era DD/MM/YYYY) into CE scale prior to age calculation.",
          },
          {
            title: "OLD_PROG_NAME has excessive cardinality",
            detail: "Despite grouping rare levels, high dimensionality persists. Next steps should cluster into STEM / Arts / Vocational tracks prior to encoding.",
          },
        ],
      },
      {
        kind: "featureEngineering",
        title: "Feature Engineering",
        stats: [
          { label: "Total Features Added", value: "21", icon: "add_circle" },
          { label: "Final Column Count", value: "66", icon: "view_column" },
          { label: "Missing AGE Fixed", value: "100%", icon: "done_all" },
        ],
        steps: [
          {
            task: 1,
            title: "Fix AGE_AT_GRAD via precise Thai Calendar Parsing",
            concept: "The original dataset lacked age data due to dropping the birthdate column early. However, age is a critical demographic factor for academic performance.",
            what: "Extracted the 'BIRTHDAY' column from the raw source file. Parsed the Thai Buddhist Era (B.E.) date format (DD/MM/YYYY) into Gregorian (C.E.) dates. Calculated the exact age down to decimal years using the specific 'DATAGRADUATION' date rather than a generic year.",
            result: "Successfully populated AGE_AT_GRAD with 0 missing values. The average graduating age is 22.9 years.",
            badge: "🎂",
          },
          {
            task: 2,
            title: "Develop SCHOOL_QUALITY_INDEX via Bayesian Average",
            concept: "High schools (OLD_SCHOOL_CODE) are highly sparse (875 unique schools). Direct encoding causes overfitting. Instead, we can estimate a school's inherent 'quality' based on the average high school GPA of students originating from it.",
            what: "Computed the mean High School GPA per school. Applied a Bayesian Average formula (with prior strength m=5) to pull schools with very few students toward the global mean (3.24). This prevents overestimating schools with only 1-2 students who happen to have 4.0 GPAs.",
            result: "Created a single numerical index (2.62–3.67) that represents high school quality without high cardinality issues.",
            badge: "🏫",
          },
          {
            task: 3,
            title: "Geographic Mapping (PROVINCE_ID to REGION)",
            concept: "Individual provinces (76 unique values) create too many sparse features. Grouping them into broader geographic regions helps the model identify macro-level geographic patterns.",
            what: "Mapped both the student's current 'PROVINCE_ID' and high school 'OLD_PROV_CODE' into 5 standard Thai regions (Northeast, North, Central, South, Upper North) and applied One-Hot Encoding.",
            result: "Revealed that 95% of the student body originates from the Northeast. Added 11 One-Hot Encoded regional columns.",
            badge: "🗺️",
          },
          {
            task: 4,
            title: "Categorical Encoding Strategy",
            concept: "Machine learning algorithms require numeric inputs. Different categorical variables require specific encoding strategies based on their cardinality and intrinsic ordering.",
            what: "Applied Ordinal Encoding to 'GPA_CLASS' (Below Standard -> 1st Class Honors). Applied Label Encoding to prior education levels (e.g., Middle School -> Bachelor's). Applied Target Encoding (mean GPA) to high-cardinality features like Province Name and Program Name.",
            result: "Added 6 numerically encoded columns ready for model consumption. (Target encoding lookup tables were saved to prevent data leakage during training).",
            badge: "🔢",
          },
        ],
      },
      {
        kind: "stack",
        title: "Tools & Tech Stack",
        items: [
          { label: "Python", icon: "code" },
          { label: "Pandas & NumPy", icon: "table_chart" },
          { label: "Matplotlib & Seaborn", icon: "bar_chart" },
          { label: "Scikit-learn", icon: "model_training" },
          { label: "CatBoost", icon: "auto_awesome" },
          { label: "Jupyter Notebook", icon: "description" },
        ],
      },
    ],
    ctaLabel: "Email me",
    ctaHref: "mailto:kongkat5556@hotmail.com?subject=GPA%20Prediction%20Model%20project",
    imageSrc: "/images/projects/gpa-prediction.webp",
    imageAlt: "Graduate Student Analytics & GPA Prediction Model",
    imagePosition: "object-left-top",
    accent: "purple",
    icon: "school",
  },
];

export const SKILL_ITEMS_EN: SkillItem[] = [
  { label: "PYTHON", icon: "code" },
  { label: "FASTAPI · NEXT.JS · REACT", icon: "layers" },
  { label: "ML PIPELINES", icon: "model_training" },
  { label: "POSTGRESQL · ER MODELING & DATA DESIGN", icon: "table_chart" },
  { label: "DOCKER · FULL-STACK & MICROSERVICES", icon: "deployed_code" },
  { label: "TECHNICAL DOCS · FLOWCHARTS · ROADMAPS", icon: "description" },
  { label: "CRITICAL THINKING · BUSINESS ANALYSIS · PRESENTATION", icon: "psychology" },
];

export const FOOTER_SOCIAL_LINKS_EN: SocialLink[] = [
  { label: "kingly5556 on GitHub", href: "https://github.com/kingly5556", icon: "github" },
  { label: "kongkat5556@hotmail.com", href: "mailto:kongkat5556@hotmail.com", icon: "mail" },
  { label: "+66 86-424-1979", href: "tel:+66864241979", icon: "call" },
];

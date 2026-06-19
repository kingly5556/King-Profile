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
    total: 3,
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
    overviewImage: {
      src: "/images/certificated_pic/Datacenter_RmutiAward.png",
      alt: "RMUTI Innovation Award Certificate",
      caption: "Awarded at RMUTI Cooperative Education Project Contest (Innovation)",
    },
    ctaLabel: "Email me",
    ctaHref: "mailto:kongkat5556@hotmail.com?subject=Data%20Center%20project",
    imageSrc: "/images/projects/data-center-v2.png",
    imageAlt: "Data platform dashboard concept",
    imagePosition: "object-left-top",
    accent: "orange",
    icon: "database",
    detailSections: [
      {
        kind: "stack",
        title: "Tools & Tech Stack",
        items: [
          { label: "Next.js", icon: "code" },
          { label: "FastAPI", icon: "api" },
          { label: "MySQL", icon: "database" },
          { label: "Docker", icon: "terminal" },
          { label: "Jenkins", icon: "sync" },
          { label: "Kubernetes", icon: "grid_view" },
        ]
      },
      {
        kind: "systemDesign",
        title: "System Design",
        problems: [
          "Data was stored in silos, making it difficult to access",
          "Inconsistent data formats with no standards",
          "Lack of common data definitions and structures",
        ],
        modules: [
          { title: "Auth & User Management", description: "Manage user accounts, permissions, and approve new users.", icon: "🔐" },
          { title: "Dataset Management", description: "Explore, import, edit, and export data with validation.", icon: "📊" },
          { title: "Schema Management", description: "Manage schemas, tables, columns, and relations dynamically.", icon: "🏗️" },
          { title: "Department Management", description: "Manage information of departments that own the datasets.", icon: "🏢" }
        ],
        roles: [
          { role: "Admin", permissions: "Manage all systems, including users" },
          { role: "Super User", permissions: "Approve requests, manage schemas" },
          { role: "Data Owner", permissions: "Manage their own datasets" },
          { role: "User", permissions: "View department and public data" },
          { role: "Guest", permissions: "View public data without login" }
        ]
      },
      {
        kind: "systemFeature",
        id: "auth",
        title: "Auth & Users",
        stats: [
          { label: "User Levels", value: "5 Roles", icon: "🛡️" },
          { label: "Authentication", value: "JWT", icon: "🔑" },
          { label: "Profile", value: "Dynamic", icon: "📝" },
          { label: "Approval", value: "Admin Review", icon: "✅" }
        ],
        steps: [
          { step: 1, title: "Registration", concept: "Basic info and department selection", what: "Supports dynamic fields added by admins", result: "Account pending approval" },
          { step: 2, title: "Login", concept: "Auth via Username/Password", what: "Creates secure JWT session", result: "Logged in with role permissions" },
          { step: 3, title: "Profile Management", concept: "Manage personal info", what: "Update info and view current role", result: "Up-to-date user info" },
          { step: 4, title: "User Approval", concept: "Admin reviews new applicants", what: "Approve or reject access requests", result: "Access security control" },
          { step: 5, title: "Role Assignment", concept: "Manage access rights", what: "Change roles based on responsibilities", result: "RBAC access control" }
        ]
      },
      {
        kind: "systemFeature",
        id: "dataset",
        title: "Dataset Management",
        stats: [
          { label: "Import", value: "Excel (.xlsx)", icon: "📥" },
          { label: "Template", value: "Download Blueprint", icon: "📄" },
          { label: "Validation", value: "Cell-level", icon: "🔍" },
          { label: "Export", value: "Excel Export", icon: "📤" }
        ],
        steps: [
          { step: 1, title: "Data Exploration", concept: "Fast access UX required", what: "Search by name/ID and filter by groups", result: "Instant access to datasets" },
          { step: 2, title: "Detail Page", concept: "Context before usage", what: "Show metadata, description, and owner", result: "Informed usage decisions" },
          { step: 3, title: "Template Import", concept: "Enforce standards at source", what: "Force downloading a template to fill", result: "Reduced formatting errors" },
          { step: 4, title: "Validation", concept: "Prevent garbage data", what: "Validate types and lengths cell by cell", result: "Precise error location reporting" },
          { step: 5, title: "Bulk Edit", concept: "Easy mass updates", what: "Import Excel to update via Primary Key", result: "Time saved on data management" }
        ]
      },
      {
        kind: "systemFeature",
        id: "schema",
        title: "Schema Management",
        stats: [
          { label: "Create Table", value: "Dynamic", icon: "🏗️" },
          { label: "Data Types", value: "Text,Int,Date..", icon: "🔠" },
          { label: "Constraints", value: "PK & Not Null", icon: "🛑" },
          { label: "Relations", value: "FK Reference", icon: "🔗" }
        ],
        steps: [
          { step: 1, title: "New Table", concept: "Support new datasets", what: "Set name, ID, and access level", result: "Structure ready for import" },
          { step: 2, title: "Define Columns", concept: "Data Dictionary per table", what: "Add columns with Data Type, PK", result: "Clear data structures" },
          { step: 3, title: "Manage Relations", concept: "Relational Integrity", what: "Create Foreign Keys to reference tables", result: "Prevents cross-table conflicts" }
        ]
      },
      {
        kind: "deploymentPipeline",
        title: "Deployment Pipeline",
        stats: [
          { label: "CI/CD", value: "Jenkins", icon: "⚙️" },
          { label: "Container", value: "Docker", icon: "🐳" },
          { label: "Registry", value: "Harbor", icon: "🗄️" },
          { label: "Orchestration", value: "Kubernetes", icon: "☸️" },
          { label: "Source Code", value: "GitLab", icon: "🦊" }
        ],
        phases: [
          { phase: "1. Code", action: "Push to GitLab", detail: "Developer pushes code, triggering the Jenkins Pipeline." },
          { phase: "2. Checkout", action: "Pull Source Code", detail: "Jenkins pulls the latest source code from the repository." },
          { phase: "3. Build", action: "Docker Build", detail: "Builds Docker Images for Frontend and Backend." },
          { phase: "4. Tag", action: "Version Tagging", detail: "Tags image as {build_number}-{git_hash} and latest." },
          { phase: "5. Push", action: "Push to Harbor", detail: "Uploads both image tags to the Private Registry (Harbor)." },
          { phase: "6. Deploy", action: "Apply K8s Manifest", detail: "Applies K8s configs to update the running cluster." }
        ],
        k8sSummary: [
          "namespace.yaml — Isolates the environment",
          "configmap.yaml & secret.yaml — Stores configs and hides credentials",
          "deployment.yaml — Defines Pod creation for services",
          "service.yaml — Defines internal cluster ports",
          "ingress.yaml — Defines external routing rules"
        ]
      },
      {
        kind: "summary",
        title: "Project Summary",
        goalAchievement: "Developed a prototype centralized data center that aggregates data, enforces standards, and fully supports Role-Based Access Control as targeted.",
        qualityAssessment: "The system manages the dataset lifecycle from schema design and template import to export with high security and accuracy.",
        benefits: [
          "Reduced data storage redundancy within the university.",
          "Established a Single Source of Truth for easier analytics.",
          "Import templates lowered the burden and errors in data entry.",
          "RBAC ensured data access matches job responsibilities.",
          "The architecture is ready for future AutoML integration."
        ],
        steps: [
          { phase: "Requirement", action: "Analyzed Data Silo issues", result: "Defined scope of 4 core systems" },
          { phase: "Design", action: "Designed Database Schema & APIs", result: "Structure ready for dev" },
          { phase: "Backend", action: "Built APIs with FastAPI + SQLAlchemy", result: "High performance RESTful APIs" },
          { phase: "Frontend", action: "Built UI with Next.js", result: "Responsive and easy UX for all roles" },
          { phase: "Deploy", action: "Built CI/CD Pipeline via Jenkins", result: "Smooth production deployment" }
        ]
      }
    ],
  },
  {
    slug: "gpa-prediction-model",
    category: "Data Project",
    index: 2,
    total: 3,
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
            title: "Handle Missing Values",
            why: "Missing values can bias model training and cause errors; they must be strategically imputed, dropped, or flagged.",
            what: "Dropped NEW_CURR_ID (100% missing). Imputed OLD_GPA with its median (3.290) for 58 missing records. Imputed RELIGION_ID with its mode. Created missingness indicator flags for PROG_CURR_ID, PROGRAM_ID, and ISCED_ID before retaining them.",
            result: "Total missing cells reduced from 6,728 to 133. Crucially, target variable GPA and main predictor OLD_GPA now have 0 missing values.",
            badge: "🩹",
          },
          {
            step: 3,
            title: "Fix GPA Outliers",
            why: "GPAs outside the standard [0, 4.0] range are clear errors, while highly suspicious values (e.g., exact 0.00) should be flagged rather than immediately dropped.",
            what: "Validated all GPA values against the [0, 4.0] range. Flagged highly suspicious records—specifically GPA = 0.00 (1 record) and GPA < 0.50 (1 record)—as suspect.",
            result: "Zero records were dropped; all GPA values are verified within the valid numeric range.",
            badge: "✅",
          },
          {
            step: 4,
            title: "Normalize OLD_GPA Scale",
            why: "High school GPAs originate from multiple schools using different scales (e.g., 4.0 vs 5.0). Using raw values would bias model learning and prevent fair comparisons.",
            what: "Identified 1 outlier record with OLD_GPA = 4.58 (based on a 5.0 scale) and rescaled it to a 4.0 scale by multiplying by 4/5.",
            result: "Maximum OLD_GPA is now normalized to 4.000. All high school GPAs are on a standardized scale.",
            badge: "📐",
          },
          {
            step: 5,
            title: "Clean Text & Group Rare Categories",
            why: "Categorical levels with very low representation (e.g., 1–2 students) can cause overfitting and force the model to learn noise instead of generalizable patterns.",
            what: "Standardized text formatting (whitespace stripping and upper-casing). Aggregated rare groups (province < 20 students → 'OTHER' [41 provinces]; curriculum tracks < 20 students → 'OTHER' [523 tracks]; high schools < 5 students → 'OTHER').",
            result: "Reduced unique categories in OLD_PROG_NAME from 579 down to 43 highly meaningful and statistically significant values.",
            badge: "🗂️",
          },
          {
            step: 6,
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
        kind: "statisticalTesting",
        title: "Statistical Testing",
        summary: "Phase 3 applied four families of statistical tests (t-test, ANOVA, Correlation, Chi-Square) across 18 hypothesis pairs to rigorously validate which features are truly related to GPA — providing an evidence-based foundation for feature selection in Phase 5 modeling.",
        groups: [
          {
            groupTitle: "TEST 1 — Independent-Samples t-test: Gender vs GPA",
            icon: "🧪",
            question: "Does the student's gender have a statistically significant impact on their cumulative university GPA?",
            results: [
              {
                test: "t-test",
                feature: "GENDER_ID → GPA",
                statistic: "t = −15.05",
                pValue: "< 0.001 ***",
                effectSize: "Cohen's d = −0.373 (small-medium)",
                verdict: "significant",
                insight: "Female students (mean GPA 3.143) significantly outperform male students (mean GPA 2.974). While statistically highly significant, the effect size is small-to-medium — meaning gender alone explains a modest proportion of GPA variance.",
              },
            ],
          },
          {
            groupTitle: "TEST 2 — One-Way ANOVA: Group Differences in GPA",
            icon: "📊",
            question: "Do groups defined by prior education level, vocational track, and region produce significantly different mean GPAs?",
            results: [
              {
                test: "ANOVA",
                feature: "OLD_LEVEL_NAME → GPA",
                statistic: "F = 55.44",
                pValue: "< 0.001 ***",
                effectSize: "η² = 0.049 (medium)",
                verdict: "significant",
                insight: "Prior education level is a strong signal. Post-hoc analysis (Bonferroni) shows Bachelor's degree holders achieve significantly higher GPAs than vocational or lower secondary graduates.",
              },
              {
                test: "ANOVA",
                feature: "IS_VOCATIONAL → GPA",
                statistic: "F = 37.58",
                pValue: "< 0.001 ***",
                effectSize: "η² = 0.006 (small)",
                verdict: "significant",
                insight: "Students from vocational tracks (mean GPA 3.027) perform measurably lower than non-vocational peers (mean GPA 3.097). Statistically confirmed, though effect size is small.",
              },
              {
                test: "ANOVA",
                feature: "REGION → GPA",
                statistic: "F = 2.05",
                pValue: "0.085 (ns)",
                effectSize: "η² = 0.001 (negligible)",
                verdict: "not-significant",
                insight: "Residence region shows no significant effect on GPA — largely because 95% of students are from the Northeast, making this feature nearly constant and uninformative for modeling.",
              },
            ],
          },
          {
            groupTitle: "TEST 3 — Pearson & Spearman Correlation: Numerics vs GPA",
            icon: "📈",
            question: "Which numeric features show statistically significant linear or monotonic relationships with university GPA?",
            results: [
              {
                test: "Correlation",
                feature: "OLD_GPA",
                statistic: "Pearson r = +0.382",
                pValue: "< 0.001 ***",
                effectSize: "Spearman ρ = +0.399",
                verdict: "significant",
                insight: "High school GPA is the single strongest predictor. Both linear and rank-order correlations confirm a robust positive relationship with university GPA.",
              },
              {
                test: "Correlation",
                feature: "OLD_SCHOOL_GPA_MEAN",
                statistic: "Pearson r = +0.302",
                pValue: "< 0.001 ***",
                effectSize: "Spearman ρ = +0.287",
                verdict: "significant",
                insight: "The average GPA of all graduates from the same high school (target-encoded) captures school-level quality, confirming that school context is a meaningful predictor.",
              },
              {
                test: "Correlation",
                feature: "OLD_PROG_GPA_MEAN",
                statistic: "Pearson r = +0.212",
                pValue: "< 0.001 ***",
                effectSize: "Spearman ρ = +0.191",
                verdict: "significant",
                insight: "The program-level mean GPA from high school provides a curriculum-quality signal that meaningfully predicts university performance.",
              },
              {
                test: "Correlation",
                feature: "STUDY_GAP",
                statistic: "Pearson r = +0.087",
                pValue: "< 0.001 ***",
                effectSize: "Spearman ρ = +0.039",
                verdict: "significant",
                insight: "Surprisingly, a longer gap between high school and university enrollment correlates positively with GPA — suggesting that mature/returning students may be more academically motivated.",
              },
              {
                test: "Correlation",
                feature: "AGE_AT_GRAD",
                statistic: "Pearson r = +0.006",
                pValue: "0.603 (ns)",
                effectSize: "Spearman ρ = −0.145***",
                verdict: "not-significant",
                insight: "No significant linear relationship. The mixed signals (Pearson positive vs. Spearman negative) suggest a non-linear pattern. Dropped from linear modeling features.",
              },
            ],
          },
          {
            groupTitle: "TEST 4 — Chi-Square: GPA Class vs Categorical Features",
            icon: "🔲",
            question: "Which categorical features show a statistically significant association with GPA classification (First Class Honours / Second Class / Normal / Academic Probation)?",
            results: [
              {
                test: "Chi-Square",
                feature: "OLD_LEVEL_NAME → GPA_CLASS",
                statistic: "χ² = 2018.70, df = 21",
                pValue: "< 0.001 ***",
                effectSize: "Cramér's V = 0.321 (strong)",
                verdict: "significant",
                insight: "Strongest categorical association found. Prior education level is highly predictive of GPA class — a student's educational background fundamentally shapes their university honors outcome.",
              },
              {
                test: "Chi-Square",
                feature: "GENDER_ID → GPA_CLASS",
                statistic: "χ² = 173.76, df = 3",
                pValue: "< 0.001 ***",
                effectSize: "Cramér's V = 0.163 (moderate)",
                verdict: "significant",
                insight: "Gender has a moderate association with GPA class, confirming the t-test finding that female students are more likely to achieve First Class Honours.",
              },
              {
                test: "Chi-Square",
                feature: "REGION → GPA_CLASS",
                statistic: "χ² = 12.44, df = 12",
                pValue: "0.411 (ns)",
                effectSize: "Cramér's V = 0.025 (negligible)",
                verdict: "not-significant",
                insight: "Consistent with ANOVA results: residence region carries no meaningful information about GPA class. This confirms REGION_* features should be excluded from the predictive model.",
              },
            ],
          },
        ],
        keyFindings: [
          "OLD_GPA (high school GPA) is the single most powerful predictor across all test types — confirmed by Pearson r = 0.382, ANOVA via OLD_LEVEL_NAME, and Chi-Square Cramér's V = 0.321.",
          "School-context features (OLD_SCHOOL_GPA_MEAN, OLD_PROG_GPA_MEAN) carry significant signal — confirming that where a student studied is as important as how they studied.",
          "GENDER has a statistically significant but practically small effect (Cohen's d = 0.37) — included in the model but should not be over-interpreted.",
          "REGION (current residence) is consistently non-significant across all 4 test types — safely excluded from Phase 5 modeling, reducing noise and dimensionality.",
          "14 out of 18 total tests (78%) returned statistically significant results at α = 0.05, validating the quality and richness of the engineered feature set.",
        ],
      },
      {
        kind: "predictiveModeling",
        title: "Predictive Modeling",
        summary: "Phase 5 trained and evaluated 6 machine learning models on 6,520 graduate records using 23 Phase-3-informed features. The best model (LightGBM) predicts a student's cumulative university GPA with a mean absolute error of just ±0.16 GPA points on a 0–4 scale — a 57% improvement over baseline, with strong cross-validation consistency across 5 folds.",
        stats: [
          { label: "Best Model", value: "LightGBM", icon: "emoji_events" },
          { label: "MAE", value: "±0.1632", sub: "Avg. error in GPA points", icon: "target" },
          { label: "R² Score", value: "0.786", sub: "78.6% variance explained", icon: "show_chart" },
          { label: "vs. Baseline", value: "+57%", sub: "Better than predicting mean", icon: "trending_up" },
          { label: "Models Trained", value: "6", sub: "Ridge · RF · GB · XGB · LGBM · Stack", icon: "model_training" },
          { label: "Cross-Validation", value: "5-Fold", sub: "MAE 0.1629 ± 0.0041", icon: "repeat" },
          { label: "Train / Test Split", value: "80 / 20", sub: "Stratified by GPA class", icon: "splitscreen" },
          { label: "Errors > 1.0 GPA", value: "0 records", sub: "0% of 1,304 test cases", icon: "done_all" },
        ],
        models: [
          { rank: 1, name: "LightGBM", mae: 0.1632, rmse: 0.2119, r2: 0.7860, isWinner: true },
          { rank: 2, name: "Gradient Boosting", mae: 0.1643, rmse: 0.2126, r2: 0.7845 },
          { rank: 3, name: "Stacking Ensemble", mae: 0.1645, rmse: 0.2130, r2: 0.7836 },
          { rank: 4, name: "XGBoost", mae: 0.1645, rmse: 0.2134, r2: 0.7828 },
          { rank: 5, name: "Random Forest", mae: 0.1707, rmse: 0.2198, r2: 0.7697 },
          { rank: 6, name: "Ridge Regression", mae: 0.1859, rmse: 0.2329, r2: 0.7414 },
        ],
        baselineMae: 0.3799,
        features: [
          { name: "OLD_GPA", reason: "Strongest numeric predictor of university GPA", evidence: "Pearson r = +0.382 ***" },
          { name: "OLD_SCHOOL_GPA_MEAN", reason: "School-level quality (target encoded)", evidence: "r = +0.302 ***" },
          { name: "OLD_PROG_GPA_MEAN", reason: "Curriculum-level signal", evidence: "r = +0.212 ***" },
          { name: "OLD_PROV_GPA_MEAN", reason: "Province-level academic context", evidence: "r = +0.122 ***" },
          { name: "GENDER_ID", reason: "Female students score higher (t-test significant)", evidence: "t = −15.05, d = 0.37" },
          { name: "IS_VOCATIONAL", reason: "Vocational track students score lower", evidence: "ANOVA F = 37.58 ***" },
          { name: "OLD_LEVEL_NAME (enc)", reason: "Prior education level strongly predictive", evidence: "χ² Cramér's V = 0.321" },
          { name: "STUDY_GAP", reason: "Gap years positively correlated with GPA", evidence: "r = +0.087 ***" },
          { name: "OLD_REGION_*", reason: "High school region significant (not residence)", evidence: "Chi-Square p < 0.001" },
          { name: "REGION_* (excluded)", reason: "Residence region — not significant, 95% NORTHEAST", evidence: "ANOVA p = 0.085 ns" },
        ],
        cvSummary: "5-Fold Cross-Validation on LightGBM confirmed robust generalization with MAE = 0.1629 ± 0.0041 and R² = 0.7833 ± 0.0120 across all 5 folds. The low standard deviation indicates that the model is stable and not overfitting to any particular data partition.",
        residualInsights: [
          "Mean residual = +0.0048 — essentially zero, indicating the model has no systematic bias in either direction.",
          "Standard deviation of residuals = 0.212 — consistent with the RMSE of 0.2119 reported on the test set.",
          "Only 2.6% of test cases (34 out of 1,304) had prediction errors exceeding ±0.5 GPA points.",
          "Zero records had errors exceeding ±1.0 GPA points — the model never produces catastrophically wrong predictions.",
          "Residual distribution is approximately normal and centered at zero, confirming unbiased predictions and meeting key regression assumptions.",
        ],
      },
      {
        kind: "summary",
        title: "Project Summary",
        goalAchievement: "The project successfully met its initial goals by developing a robust machine learning pipeline capable of predicting university GPA with an average error of ±0.16 points. The comprehensive analysis successfully uncovered key academic patterns, confirming that prior education level and high school performance are the strongest indicators of university success.",
        qualityAssessment: "The implementation quality is exceptionally high. The analysis follows a rigorous scientific approach, utilizing 18 statistical tests to validate feature significance before model training. The final LightGBM model was rigorously evaluated using 5-fold Cross-Validation, ensuring strong generalization without overfitting or data leakage.",
        benefits: [
          "Enables early identification of at-risk students based on their admission profile, allowing the university to provide targeted academic support.",
          "Provides data-driven insights for the university administration regarding the effectiveness of different prior educational tracks.",
          "Demonstrates a complete, end-to-end data science lifecycle from raw, messy academic records to a deployable predictive model.",
          "Establishes a foundational framework that the university can expand upon for future cohorts."
        ],
        steps: [
          {
            phase: "Data Cleaning",
            action: "Sanitized 6,520 records, and resolved all missing values and data type errors.",
            result: "A clean and mathematically sound dataset."
          },
          {
            phase: "Exploratory Data Analysis",
            action: "Visualized and analyzed patterns across cohorts, genders, and prior education tracks.",
            result: "Identified high school GPA as the strongest initial predictor of university success."
          },
          {
            phase: "Feature Engineering",
            action: "Created 21 new features including Age at Graduation, School Quality Index, and regional mappings.",
            result: "Significantly enriched the dataset, providing deeper signals for the machine learning algorithms."
          },
          {
            phase: "Statistical Testing",
            action: "Applied t-tests, ANOVA, Pearson/Spearman correlations, and Chi-Square tests to validate features.",
            result: "Statistically confirmed the predictive power of 14 features, providing an evidence-based foundation for modeling."
          },
          {
            phase: "Predictive Modeling",
            action: "Trained and evaluated 6 machine learning models using 5-fold cross-validation.",
            result: "The LightGBM model emerged as the best performer, improving upon the baseline by 57% with an MAE of ±0.1632."
          }
        ]
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
  {
    slug: "quill-remake",
    category: "Website project",
    index: 3,
    total: 3,
    meta: "Personal Project · Novel Writing Platform",
    title: "QUILL PLATFORM",
    description: "A modernized remake of a novel reading and writing platform. The system was completely re-architected into a 3-Tier Separated Architecture from a monolithic client-DB pattern. It enhances security by centralizing business logic, removes all DB credentials from the frontend, and integrates an internal AI writing assistant securely.",
    bullets: [
      "Removed all direct database credentials (Supabase Key) from the Frontend to prevent unauthorized access.",
      "Centralized business logic in a dedicated Node.js/Express backend, serving as the Single Source of Truth.",
      "Implemented full REST APIs for Authentication, Novels, Chapters, Profiles, and Social features (Follow/Bookmark/Comment).",
      "Integrated a Python FastAPI AI Assistant as an internal-only service, accessed securely via a backend proxy.",
      "Developed a custom JWT Authentication system with Access and Refresh Token rotation.",
    ],
    overviewImage: {
      src: "/images/certificated_pic/Quill_AUCC.png",
      alt: "AUCC Competition Certificate",
      caption: "Certificate from the AUCC Competition",
    },
    ctaLabel: "Email me",
    ctaHref: "mailto:kongkat5556@hotmail.com?subject=Quill%20Remake%20project",
    imageSrc: "",
    imageAlt: "Quill Platform Remake",
    imagePosition: "object-left-top",
    accent: "blue",
    icon: "book",
    detailSections: [
      {
        kind: "stack",
        title: "Tools & Tech Stack",
        items: [
          { label: "React (Vite) + TS", icon: "code" },
          { label: "Node.js / Express", icon: "api" },
          { label: "Supabase", icon: "database" },
          { label: "JWT Auth", icon: "lock" },
          { label: "Tailwind CSS v4", icon: "brush" },
          { label: "react-quill-new", icon: "edit" },
        ]
      },
      {
        kind: "systemDesign",
        title: "New 3-Tier Architecture",
        problems: [
          "Frontend previously held database credentials (Supabase Key), risking security and quota theft.",
          "Business logic was scattered across the frontend, making it hard to maintain and test.",
          "Direct API calls to AI services from the frontend exposed the LLM API keys to the public."
        ],
        modules: [
          { title: "Frontend Layer", description: "React UI, completely isolated from DB credentials. Communicates only via Backend API.", icon: "💻" },
          { title: "Backend API Gateway", description: "Express server handling JWT auth, business logic, rate limiting, and request validation.", icon: "⚙️" },
          { title: "Database Layer", description: "Supabase PostgreSQL and Storage accessed exclusively by the backend via Service Role Key.", icon: "🗄️" },
          { title: "AI Service", description: "Internal Python FastAPI service (RAGEngine), callable only through the secure backend proxy.", icon: "🤖" }
        ],
        roles: [
          { role: "Guest", permissions: "Browse and read published novels" },
          { role: "Reader", permissions: "Follow authors, bookmark chapters, and post comments" },
          { role: "Writer", permissions: "Create novels, publish chapters, and use AI Assistant" }
        ],
        architectureDiagram: `Browser\n  └── Frontend (React :5173)\n        └── Backend API (Express :4000)\n              ├── Supabase PostgreSQL  [DB Access — Backend Only]\n              ├── Supabase Storage     [File Upload — Backend Only]\n              └── AI Service (FastAPI :8000) [Internal Only]`
      },
      {
        kind: "systemFeature",
        id: "auth",
        title: "Auth & Users",
        stats: [
          { label: "Authentication", value: "Custom JWT", icon: "🔑" },
          { label: "Token Strategy", value: "Access + Refresh", icon: "🔄" },
          { label: "Access Token", value: "7 Days", icon: "⏱️" },
          { label: "DB Credentials", value: "Backend Only", icon: "🔐" }
        ],
        steps: [
          { step: 1, title: "Register", concept: "Create new account securely", what: "Backend proxies creation to Supabase Auth and sets up user profile", result: "User account created" },
          { step: 2, title: "Login", concept: "Verify credentials", what: "Backend verifies password and issues signed JWT and Refresh Token", result: "Client receives secure token" },
          { step: 3, title: "Authenticated Request", concept: "Secure API access", what: "JWT Middleware verifies token validity and extracts userId before routing", result: "Protected resource accessed" },
          { step: 4, title: "Token Refresh", concept: "Maintain session smoothly", what: "Client swaps expired Access Token and valid Refresh Token for a new pair", result: "Uninterrupted UX" },
          { step: 5, title: "Avatar Upload", concept: "Secure file handling", what: "Backend receives image via multer, uploads to Supabase Storage, and saves URL", result: "Profile updated securely" }
        ]
      },
      {
        kind: "systemFeature",
        id: "dataset",
        title: "API Endpoints",
        stats: [
          { label: "Novel API", value: "8 Endpoints", icon: "📝" },
          { label: "Chapter API", value: "7 Endpoints", icon: "📖" },
          { label: "Social API", value: "5 Endpoints", icon: "👥" },
          { label: "Profile API", value: "4 Endpoints", icon: "👤" }
        ],
        steps: [
          { step: 1, title: "Auth Routes", concept: "Identity management", what: "Login, Register, Logout, Refresh Token", result: "Handles all user sessions" },
          { step: 2, title: "Novel Routes", concept: "Core content management", what: "CRUD, Publish/Unpublish, View Count, Search", result: "Manages novel lifecycle" },
          { step: 3, title: "Chapter Routes", concept: "Content delivery", what: "CRUD, Auto-save (background syncing), Chapter View Count", result: "Smooth writing and reading" },
          { step: 4, title: "Social Routes", concept: "User engagement", what: "Follow User, Bookmark Chapter, Add/Get Comments, Reading History", result: "Community interactions" },
          { step: 5, title: "Profile Routes", concept: "User personalization", what: "Get Profile, Update Profile, Avatar Upload, Search Users", result: "Profile customization" }
        ]
      },
      {
        kind: "summary",
        title: "Project Summary",
        goalAchievement: "Successfully transitioned a monolithic, frontend-heavy application into a robust 3-Tier Separated Architecture. The system is now significantly more secure by eliminating direct database access from the client side.",
        qualityAssessment: "The backend is equipped with essential production features including JWT Auth, Rate Limiting, Global Error Handling, CORS policies, and Security Headers via Helmet. The AI integration is securely isolated within the internal network.",
        benefits: [
          "Zero database credentials in the frontend entirely mitigates client-side data breach risks.",
          "Centralized Business Logic allows for much easier testing, maintenance, and bug fixing.",
          "Internal AI Service architecture prevents unauthorized external usage and API quota theft.",
          "The decoupled architecture is scalable—the frontend, backend, and AI service can be deployed independently."
        ],
        steps: [
          { phase: "Architecture Design", action: "Planned the 3-Tier architecture and defined all REST API contracts.", result: "Clear roadmap for migration." },
          { phase: "Database Setup", action: "Restructured 7 core tables and applied RLS bypass via Backend Service Role.", result: "Secure database foundation." },
          { phase: "Backend Dev", action: "Built the Express server featuring JWT, Multer, Rate Limiting, and Helmet.", result: "Secure API Gateway ready." },
          { phase: "Frontend Integration", action: "Refactored React UI to consume the new REST APIs and manage JWT state.", result: "Client safely connected." },
          { phase: "AI Proxy", action: "Built a backend proxy to securely stream responses from the Python FastAPI service.", result: "Secure AI Assistant integration." }
        ]
      }
    ]
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

"""
==============================================================
 EDA Pipeline - Graduate2567_ExportStudent
 Unicorn Real Data Project
 Author  : Data Team
 Created : 2026-05-19
==============================================================
 STAGE 0  : Setup & Imports
 STAGE 1  : Load & Basic Inspection
 STAGE 2  : Data Profiling
 STAGE 3  : Missing Value Analysis
 STAGE 4  : Univariate Analysis (Numerical)
 STAGE 5  : Univariate Analysis (Categorical)
 STAGE 6  : Bivariate Analysis (GPA Focus)
 STAGE 7  : Multivariate / Correlation Analysis
 STAGE 8  : Outlier Detection
 STAGE 9  : Time-Series / Cohort Analysis
 STAGE 10 : Summary Report & Export
==============================================================
"""

# ─────────────────────────────────────────────────────────────
# STAGE 0 : Setup & Imports
# ─────────────────────────────────────────────────────────────
import os
import warnings
warnings.filterwarnings("ignore")

import sys
import io
# Force UTF-8 output on Windows terminal
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")                 # non-interactive backend for saving files
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import seaborn as sns
from pathlib import Path

# ── Output directory ──────────────────────────────────────────
BASE_DIR   = Path(__file__).parent
OUTPUT_DIR = BASE_DIR / "eda_output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ── Plot style ────────────────────────────────────────────────
sns.set_theme(style="whitegrid", palette="muted", font_scale=1.1)
PALETTE = sns.color_palette("Set2")

print("=" * 60)
print("  EDA Pipeline — Graduate2567")
print("=" * 60)


# ─────────────────────────────────────────────────────────────
# STAGE 1 : Load & Basic Inspection
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 1] Load & Basic Inspection")

DATA_FILE = BASE_DIR / "Graduate2567_ExportStudent.csv"
df = pd.read_csv(DATA_FILE, encoding="utf-8-sig", low_memory=False)

# Pre-define column groups (used throughout all stages)
NUM_COLS = df.select_dtypes(include="number").columns.tolist()
CAT_COLS = df.select_dtypes(exclude="number").columns.tolist()

print(f"  Shape           : {df.shape[0]:,} rows x {df.shape[1]} columns")
print(f"  Columns ({df.shape[1]})  :\n  {list(df.columns)}\n")
print("  dtypes:")
print(df.dtypes.to_string())
print("  First 3 rows (numeric columns only):")
print(df.head(3)[NUM_COLS].to_string())


# ─────────────────────────────────────────────────────────────
# STAGE 2 : Data Profiling
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 2] Data Profiling")

print(f"  Numerical columns  ({len(NUM_COLS)}) : {NUM_COLS}")
print(f"  Categorical columns ({len(CAT_COLS)}) : {CAT_COLS}")

desc_num = df[NUM_COLS].describe(percentiles=[.05, .25, .5, .75, .95]).T
print("\n  Numerical describe:")
print(desc_num.to_string())

desc_num.to_csv(OUTPUT_DIR / "01_numerical_describe.csv")
print("  Saved : 01_numerical_describe.csv")


# ─────────────────────────────────────────────────────────────
# STAGE 3 : Missing Value Analysis
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 3] Missing Value Analysis")

miss = (
    df.isnull()
      .sum()
      .rename("missing_count")
      .to_frame()
)
miss["missing_pct"] = (miss["missing_count"] / len(df) * 100).round(2)
miss = miss[miss["missing_count"] > 0].sort_values("missing_pct", ascending=False)

print(miss.to_string())
miss.to_csv(OUTPUT_DIR / "02_missing_values.csv")

# Plot missing heatmap (top-20 missing columns if many)
if not miss.empty:
    top_miss = miss.head(20).index.tolist()
    fig, ax = plt.subplots(figsize=(12, 4))
    miss_pct = miss["missing_pct"].reset_index()
    miss_pct.columns = ["column", "missing_pct"]
    sns.barplot(data=miss_pct, x="missing_pct", y="column", ax=ax, palette="Reds_r")
    ax.set_title("Missing Value (%) by Column", fontsize=14, fontweight="bold")
    ax.set_xlabel("Missing (%)")
    ax.set_ylabel("")
    plt.tight_layout()
    fig.savefig(OUTPUT_DIR / "03_missing_barplot.png", dpi=150)
    plt.close(fig)
    print("  Saved : 03_missing_barplot.png")


# ─────────────────────────────────────────────────────────────
# STAGE 4 : Univariate Analysis — Numerical
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 4] Univariate Analysis (Numerical)")

# Focus columns
FOCUS_NUM = [c for c in ["GPA", "OLD_GPA"] if c in df.columns]
FOCUS_NUM += [c for c in NUM_COLS if c not in FOCUS_NUM and c not in
              ["YEAR", "UNIV_ID", "CITIZEN_ID", "STD_ID", "PREFIX_NAME_ID",
               "SUB_DISTRICT_ID", "DISTRICT_ID", "PROVINCE_ID",
               "RACE_ID", "RELIGION_ID", "ZIPCODE",
               "OLD_SCHOOL_CODE", "OLD_PROV_CODE", "OLD_LEVEL_ID",
               "GROUP_CODE", "LEV_ID", "CURR_ID", "FAC_ID",
               "ISCED_ID", "PROGRAM_ID", "PROG_CURR_ID", "NEW_CURR_ID"]]

for col in FOCUS_NUM:
    if col not in df.columns:
        continue
    series = df[col].dropna()
    fig, axes = plt.subplots(1, 2, figsize=(12, 4))
    
    # Histogram + KDE
    sns.histplot(series, kde=True, ax=axes[0], color=PALETTE[0], bins=30)
    axes[0].set_title(f"{col} — Distribution")
    axes[0].axvline(series.mean(),  color="red",    ls="--", lw=1.5, label=f"Mean={series.mean():.2f}")
    axes[0].axvline(series.median(), color="orange", ls="--", lw=1.5, label=f"Median={series.median():.2f}")
    axes[0].legend(fontsize=9)
    
    # Boxplot
    sns.boxplot(y=series, ax=axes[1], color=PALETTE[1])
    axes[1].set_title(f"{col} — Boxplot")
    axes[1].set_ylabel(col)
    
    fig.suptitle(f"Univariate: {col}", fontsize=13, fontweight="bold")
    plt.tight_layout()
    safe = col.replace("/", "_")
    fig.savefig(OUTPUT_DIR / f"04_uni_{safe}.png", dpi=150)
    plt.close(fig)
    print(f"  Saved : 04_uni_{safe}.png")


# ─────────────────────────────────────────────────────────────
# STAGE 5 : Univariate Analysis — Categorical
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 5] Univariate Analysis (Categorical)")

CAT_FOCUS = [
    ("GENDER_ID",     "Gender"),
    ("YEAR",          "Admission Year"),   # treat YEAR as group
    ("OLD_LEVEL_ID",  "Old Education Level"),
    ("OLD_LEVEL_NAME","Old Level Name"),
    ("OLD_PROV_NAME", "Old Province"),
    ("OLD_PROG_NAME", "Old Programme Track"),
    ("OLD_GRADUATE_YEAR", "Old Graduate Year"),
    ("PROG_CODE",     "Programme Code"),
    ("FAC_ID",        "Faculty ID"),
]

for col, label in CAT_FOCUS:
    if col not in df.columns:
        continue
    vc = df[col].value_counts().head(20)
    if vc.empty:
        continue
    fig, ax = plt.subplots(figsize=(10, max(4, len(vc) * 0.35)))
    vc_df = vc.reset_index()
    vc_df.columns = [col, "count"]
    sns.barplot(data=vc_df, x="count", y=col, ax=ax,
                palette="Blues_d", order=vc_df[col])
    ax.set_title(f"{label} — Frequency (Top 20)", fontsize=13, fontweight="bold")
    ax.set_xlabel("Count")
    ax.set_ylabel("")
    for p in ax.patches:
        ax.annotate(f"{int(p.get_width()):,}",
                    (p.get_width() + 1, p.get_y() + p.get_height() / 2),
                    va="center", fontsize=8)
    plt.tight_layout()
    safe = col.replace("/", "_")
    fig.savefig(OUTPUT_DIR / f"05_cat_{safe}.png", dpi=150)
    plt.close(fig)
    print(f"  Saved : 05_cat_{safe}.png")


# ─────────────────────────────────────────────────────────────
# STAGE 6 : Bivariate Analysis — GPA Focus
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 6] Bivariate Analysis (GPA Focus)")

if "GPA" in df.columns:

    # 6-A : GPA by Gender
    if "GENDER_ID" in df.columns:
        fig, ax = plt.subplots(figsize=(7, 5))
        sns.boxplot(data=df, x="GENDER_ID", y="GPA", ax=ax, palette="Set2")
        ax.set_title("GPA by Gender", fontsize=13, fontweight="bold")
        ax.set_xlabel("Gender (1=M, 2=F)")
        plt.tight_layout()
        fig.savefig(OUTPUT_DIR / "06a_gpa_by_gender.png", dpi=150)
        plt.close(fig)
        print("  Saved : 06a_gpa_by_gender.png")

    # 6-B : GPA by Admission Year
    if "YEAR" in df.columns:
        fig, ax = plt.subplots(figsize=(12, 5))
        year_order = sorted(df["YEAR"].dropna().unique())
        sns.boxplot(data=df, x="YEAR", y="GPA", order=year_order, ax=ax, palette="coolwarm")
        ax.set_title("GPA by Admission Year (Cohort)", fontsize=13, fontweight="bold")
        ax.set_xlabel("Year (BE)")
        plt.tight_layout()
        fig.savefig(OUTPUT_DIR / "06b_gpa_by_year.png", dpi=150)
        plt.close(fig)
        print("  Saved : 06b_gpa_by_year.png")

    # 6-C : GPA vs OLD_GPA Scatter
    if "OLD_GPA" in df.columns:
        mask = df["OLD_GPA"].notna() & df["GPA"].notna()
        fig, ax = plt.subplots(figsize=(8, 6))
        ax.scatter(df.loc[mask, "OLD_GPA"], df.loc[mask, "GPA"],
                   alpha=0.25, s=15, color=PALETTE[2])
        # regression line
        from numpy.polynomial.polynomial import polyfit as npfit
        x_ = df.loc[mask, "OLD_GPA"].values
        y_ = df.loc[mask, "GPA"].values
        coef = np.polyfit(x_, y_, 1)
        x_line = np.linspace(x_.min(), x_.max(), 200)
        ax.plot(x_line, np.polyval(coef, x_line), "r-", lw=1.5, label=f"OLS: slope={coef[0]:.2f}")
        ax.set_xlabel("Old GPA (High School)")
        ax.set_ylabel("University GPA")
        ax.set_title("Old GPA vs University GPA", fontsize=13, fontweight="bold")
        ax.legend()
        corr = np.corrcoef(x_, y_)[0, 1]
        ax.text(0.05, 0.93, f"Pearson r = {corr:.3f}", transform=ax.transAxes,
                fontsize=10, color="darkred")
        plt.tight_layout()
        fig.savefig(OUTPUT_DIR / "06c_oldgpa_vs_gpa.png", dpi=150)
        plt.close(fig)
        print(f"  Saved : 06c_oldgpa_vs_gpa.png  (r={corr:.3f})")

    # 6-D : GPA by Old Province (top-10 provinces by count)
    if "OLD_PROV_NAME" in df.columns:
        top_prov = df["OLD_PROV_NAME"].value_counts().head(10).index
        sub = df[df["OLD_PROV_NAME"].isin(top_prov)]
        fig, ax = plt.subplots(figsize=(12, 5))
        prov_order = sub.groupby("OLD_PROV_NAME")["GPA"].median().sort_values(ascending=False).index
        sns.boxplot(data=sub, x="OLD_PROV_NAME", y="GPA", order=prov_order, ax=ax, palette="tab10")
        ax.set_title("GPA by Province (Top-10 by Count)", fontsize=13, fontweight="bold")
        ax.set_xlabel("")
        plt.xticks(rotation=35, ha="right")
        plt.tight_layout()
        fig.savefig(OUTPUT_DIR / "06d_gpa_by_province.png", dpi=150)
        plt.close(fig)
        print("  Saved : 06d_gpa_by_province.png")

    # 6-E : GPA by OLD_LEVEL_NAME
    if "OLD_LEVEL_NAME" in df.columns:
        fig, ax = plt.subplots(figsize=(10, 5))
        lvl_order = df.groupby("OLD_LEVEL_NAME")["GPA"].median().sort_values(ascending=False).index
        sns.boxplot(data=df, x="OLD_LEVEL_NAME", y="GPA", order=lvl_order, ax=ax, palette="Set3")
        ax.set_title("GPA by Previous Education Level", fontsize=13, fontweight="bold")
        ax.set_xlabel("")
        plt.xticks(rotation=25, ha="right")
        plt.tight_layout()
        fig.savefig(OUTPUT_DIR / "06e_gpa_by_edu_level.png", dpi=150)
        plt.close(fig)
        print("  Saved : 06e_gpa_by_edu_level.png")

    # 6-F : GPA by OLD_PROG_NAME (track / แผนการเรียน) — top 10
    if "OLD_PROG_NAME" in df.columns:
        top_prog = df["OLD_PROG_NAME"].value_counts().head(10).index
        sub_prog = df[df["OLD_PROG_NAME"].isin(top_prog)]
        fig, ax = plt.subplots(figsize=(14, 5))
        prog_order = sub_prog.groupby("OLD_PROG_NAME")["GPA"].median().sort_values(ascending=False).index
        sns.boxplot(data=sub_prog, x="OLD_PROG_NAME", y="GPA", order=prog_order, ax=ax, palette="Paired")
        ax.set_title("GPA by Study Track (Old Programme — Top 10)", fontsize=13, fontweight="bold")
        ax.set_xlabel("")
        plt.xticks(rotation=40, ha="right")
        plt.tight_layout()
        fig.savefig(OUTPUT_DIR / "06f_gpa_by_track.png", dpi=150)
        plt.close(fig)
        print("  Saved : 06f_gpa_by_track.png")


# ─────────────────────────────────────────────────────────────
# STAGE 7 : Multivariate / Correlation Analysis
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 7] Correlation Analysis")

CORR_COLS = [c for c in ["GPA", "OLD_GPA"] if c in df.columns]
# Add any other numeric columns that make sense
CORR_COLS += [c for c in NUM_COLS if c not in CORR_COLS and
              c not in ["UNIV_ID", "CITIZEN_ID", "STD_ID",
                        "PREFIX_NAME_ID", "SUB_DISTRICT_ID",
                        "DISTRICT_ID", "PROVINCE_ID",
                        "RACE_ID", "RELIGION_ID", "ZIPCODE",
                        "OLD_SCHOOL_CODE", "GROUP_CODE",
                        "LEV_ID", "CURR_ID", "FAC_ID",
                        "ISCED_ID", "PROGRAM_ID",
                        "PROG_CURR_ID", "NEW_CURR_ID"]]

corr_df = df[CORR_COLS].dropna()
if corr_df.shape[1] >= 2:
    corr_matrix = corr_df.corr()
    fig, ax = plt.subplots(figsize=(max(6, len(CORR_COLS)), max(5, len(CORR_COLS) - 1)))
    mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
    sns.heatmap(corr_matrix, annot=True, fmt=".2f", cmap="coolwarm",
                mask=mask, ax=ax, vmin=-1, vmax=1, square=True,
                linewidths=0.5, cbar_kws={"shrink": 0.8})
    ax.set_title("Correlation Matrix (Lower Triangle)", fontsize=13, fontweight="bold")
    plt.tight_layout()
    fig.savefig(OUTPUT_DIR / "07_correlation_heatmap.png", dpi=150)
    plt.close(fig)
    print("  Saved : 07_correlation_heatmap.png")
    corr_matrix.to_csv(OUTPUT_DIR / "07_correlation_matrix.csv")
    print("  Saved : 07_correlation_matrix.csv")


# ─────────────────────────────────────────────────────────────
# STAGE 8 : Outlier Detection (IQR method)
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 8] Outlier Detection (IQR)")

outlier_summary = []
for col in [c for c in ["GPA", "OLD_GPA"] if c in df.columns]:
    q1  = df[col].quantile(0.25)
    q3  = df[col].quantile(0.75)
    iqr = q3 - q1
    lo  = q1 - 1.5 * iqr
    hi  = q3 + 1.5 * iqr
    n_out = ((df[col] < lo) | (df[col] > hi)).sum()
    pct   = n_out / df[col].notna().sum() * 100
    outlier_summary.append({"column": col, "Q1": q1, "Q3": q3,
                             "IQR": iqr, "lower_fence": lo, "upper_fence": hi,
                             "n_outliers": n_out, "outlier_pct": round(pct, 2)})
    print(f"  {col:<12} : Q1={q1:.2f}, Q3={q3:.2f}, "
          f"fence=[{lo:.2f}, {hi:.2f}], outliers={n_out} ({pct:.1f}%)")

pd.DataFrame(outlier_summary).to_csv(OUTPUT_DIR / "08_outlier_summary.csv", index=False)
print("  Saved : 08_outlier_summary.csv")


# ─────────────────────────────────────────────────────────────
# STAGE 9 : Cohort / Time-Series Analysis
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 9] Cohort / Time-Series Analysis")

if "YEAR" in df.columns and "GPA" in df.columns:
    cohort = (
        df.groupby("YEAR")["GPA"]
          .agg(["mean", "median", "std", "count"])
          .rename(columns={"mean": "GPA_mean", "median": "GPA_median",
                           "std": "GPA_std", "count": "n_students"})
          .reset_index()
    )
    print(cohort.to_string(index=False))
    cohort.to_csv(OUTPUT_DIR / "09_cohort_gpa.csv", index=False)

    fig, ax1 = plt.subplots(figsize=(12, 5))
    ax2 = ax1.twinx()
    ax1.plot(cohort["YEAR"], cohort["GPA_mean"],   "o-", color="#2196F3", lw=2, label="GPA Mean")
    ax1.plot(cohort["YEAR"], cohort["GPA_median"], "s--", color="#FF9800", lw=1.5, label="GPA Median")
    ax1.fill_between(cohort["YEAR"],
                     cohort["GPA_mean"] - cohort["GPA_std"],
                     cohort["GPA_mean"] + cohort["GPA_std"],
                     alpha=0.15, color="#2196F3", label="±1 SD")
    ax2.bar(cohort["YEAR"], cohort["n_students"], alpha=0.25, color="gray", label="# Students")
    ax1.set_xlabel("Admission Year (BE)")
    ax1.set_ylabel("GPA")
    ax2.set_ylabel("# Students", color="gray")
    ax1.set_title("GPA Trend by Cohort Year", fontsize=13, fontweight="bold")
    ax1.yaxis.set_major_formatter(mticker.FormatStrFormatter("%.2f"))
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, labels1 + labels2, loc="upper left", fontsize=9)
    plt.tight_layout()
    fig.savefig(OUTPUT_DIR / "09_cohort_trend.png", dpi=150)
    plt.close(fig)
    print("  Saved : 09_cohort_trend.png")


# ─────────────────────────────────────────────────────────────
# STAGE 10 : Summary Report & Export
# ─────────────────────────────────────────────────────────────
print("\n[STAGE 10] Summary Report")

summary_lines = [
    "=" * 60,
    " EDA SUMMARY — Graduate2567_ExportStudent",
    "=" * 60,
    f" Total records       : {len(df):,}",
    f" Total features      : {df.shape[1]}",
    f" Numerical features  : {len(NUM_COLS)}",
    f" Categorical features: {len(CAT_COLS)}",
    f" Missing columns     : {len(miss) if not miss.empty else 0}",
]

if "GPA" in df.columns:
    gpa = df["GPA"].dropna()
    summary_lines += [
        f"\n GPA Statistics:",
        f"   Mean   : {gpa.mean():.3f}",
        f"   Median : {gpa.median():.3f}",
        f"   Std    : {gpa.std():.3f}",
        f"   Min    : {gpa.min():.2f}",
        f"   Max    : {gpa.max():.2f}",
    ]

if "OLD_GPA" in df.columns and "GPA" in df.columns:
    r = df[["GPA", "OLD_GPA"]].dropna().corr().iloc[0, 1]
    summary_lines.append(f"\n Corr(GPA, OLD_GPA) = {r:.4f}")

if "YEAR" in df.columns and "GPA" in df.columns:
    yr_grp = df.groupby("YEAR")["GPA"].mean()
    best_yr  = yr_grp.idxmax()
    worst_yr = yr_grp.idxmin()
    summary_lines += [
        f"\n Cohort with highest avg GPA : {best_yr} ({yr_grp[best_yr]:.3f})",
        f" Cohort with lowest  avg GPA : {worst_yr} ({yr_grp[worst_yr]:.3f})",
    ]

summary_lines.append("=" * 60)
summary_text = "\n".join(summary_lines)

print(summary_text)
with open(OUTPUT_DIR / "10_eda_summary.txt", "w", encoding="utf-8") as f:
    f.write(summary_text)
print("\n  Saved : 10_eda_summary.txt")

# ── List all outputs ──────────────────────────────────────────
print(f"\n{'─'*60}")
print(f"  All outputs saved to: {OUTPUT_DIR}")
output_files = sorted(OUTPUT_DIR.iterdir())
for p in output_files:
    print(f"    {p.name}")
print(f"{'─'*60}")
print("\n  ✅  EDA Pipeline complete!\n")

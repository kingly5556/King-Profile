# รีวิวเว็บพอร์ตโฟลิโอ — Kongkat Thanalertrungroj

> ปรับปรุงล่าสุด 2026-09-28 (หลังแก้ปัญหารอบ 1–3) · branch `main` · Next.js 16.2.6 / React 19.2 / Tailwind v4 / Framer Motion / Recharts
> ⚠️ การแก้ทั้งหมดยังอยู่ใน working tree — **ยังไม่ได้ commit**

## สรุปสั้น ๆ

ปัญหาทางเทคนิคที่รีวิวครั้งแรกพบ **แก้ครบแล้ว** ยกเว้น 2 เรื่องที่ต้องให้เจ้าของตัดสินใจ (ชื่อ repo) หรือให้ข้อมูล (Resume, ลิงก์ demo/repo)
ผลตรวจล่าสุด: `npm run check` (lint + `tsc` + ตรวจคอนเทนต์) ผ่านหมด, `next build` ผ่าน, ทดสอบใน Chrome จริงแล้วว่าสลับภาษาและแท็บทำงานถูกต้อง

| หัวข้อ | เดิม | ตอนนี้ | หมายเหตุ |
|---|---|---|---|
| เนื้อหา / การเล่าเรื่อง | ★★★★☆ | ★★★★☆ | ลึก มีหลักฐาน แต่ยังไม่มี CV / demo link |
| ดีไซน์ / UX | ★★★★☆ | ★★★★☆ | ธีมมืด สม่ำเสมอ เคารพ `prefers-reduced-motion`; ไอคอนเปลี่ยนเป็น SVG (หน้าตาเหมือนเดิม + ไอคอน GitHub แสดงถูกต้อง) |
| โครงสร้างโค้ด | ★★★☆☆ | ★★★★★ | lint สะอาด, ไม่มี `any`, ไม่มีไฟล์ใหญ่เกิน ~800 บรรทัดที่เป็นโค้ด UI, มี guard กันคอนเทนต์เพี้ยนและ client import คอนเทนต์ผิด |
| SEO / Performance | ★★☆☆☆ | ★★★★☆ | OG/Twitter/sitemap/robots/`lang` ถูกต้อง, รูปเบาลงมาก, ผู้ใช้โหลดคอนเทนต์ภาษาเดียว, ไม่ต้องโหลดฟอนต์ไอคอนจาก Google |
| การบำรุงรักษา | ★★★☆☆ | ★★★★☆ | มี CI, `npm run check`, ข้อมูลติดต่อรวมที่เดียว, README ทันสมัย |

---

## ✅ แก้เสร็จแล้ว

### รอบ 1–2

| ข้อ | เรื่อง | สิ่งที่ทำ |
|---|---|---|
| 1 | **lint** | 40 → 0 errors, 18 → 0 warnings. แยก `LanguageToggle` ออกนอก `SiteHeader`, ลบ `any` ทั้งหมด, ลบโค้ด/ import ที่ไม่ใช้ |
| 2 | **SEO** | `metadataBase`, title template, Open Graph / Twitter card, canonical, `generateMetadata` ต่อโปรเจกต์, `opengraph-image`, `sitemap.xml`, `robots.txt` |
| 3 | **ภาษา** | cookie `portfolio-locale` อ่านฝั่ง server → HTML แรกเป็นภาษาที่เลือก, `<html lang>` ถูกต้อง, ไม่มี flash |
| 4 | **ขนาดไฟล์** | `hero-portrait.jpg` 3.5 MB → 167 KB; `Quill` และประกาศนียบัตรเป็น WebP; ลบไฟล์ซ้ำ/svg template → `public/` เหลือ ~2.3 MB |
| 8 | **โฟลเดอร์ขยะ** | `.kilo/`, `.qodo/` อยู่ใน `.gitignore` และ ESLint ignore |
| 9 | **README** | อัปเดตให้ตรงของจริง, ลบ `remotePatterns` ที่ไม่ใช้ |
| 11 | **ข้อมูลติดต่อ** | รวมที่ `content/contact.ts` (`CONTACT_EMAIL`, เบอร์, `contactMailto()`) |
| — | **`total: 3`** | ฟิลด์ที่ไม่มีใครอ่าน — ลบออก |

### รอบ 3 (ข้อ A, B, C ที่เคยค้าง)

| ข้อ | เรื่อง | สิ่งที่ทำ |
|---|---|---|
| A | **แยก `project-detail-client.tsx` (1,010 บรรทัด)** | เดิม `"use client"` ทั้งไฟล์และ import คอนเทนต์ 2 ภาษา → แตกเป็น `project-sections.tsx` (server components), `project-detail.tsx` (server, ตารางแท็บแบบ data-driven แทน `some/map` ซ้ำ 12 ชุด) และ `project-tabs.tsx` (client เล็ก ๆ ทำหน้าที่สลับแท็บอย่างเดียว). ส่วนที่ซ้ำ (การ์ดสถิติ, การ์ด 3 คอลัมน์, รายการลูกศร, หัวตาราง) รวมเป็น component เดียว. เนื้อหาโปรเจกต์ถูก render บน server เป็น HTML |
| A | **โหลดคอนเทนต์ภาษาเดียว** | `home_en/th.ts` ถูก import จากฝั่ง server เท่านั้น (`content/home.ts` → `getSiteContent`, `getProjects`, `toProjectSummary`). Client ได้ข้อมูลของภาษาปัจจุบันผ่าน `useLanguage().content` / props. หน้าแรกส่งเฉพาะฟิลด์ที่การ์ดใช้ (ไม่ส่ง `detailSections`). ตรวจแล้ว: ไม่พบสตริงคอนเทนต์ (เช่น `OLD_PROG_GPA_MEAN`, `Helmet`, ชื่อโปรเจกต์) ใน JS chunk ฝั่ง client เลย; หน้า EN มีตัวอักษรไทย 0 ตัว |
| A | **สลับภาษา** | `setLocale` ตั้ง cookie แล้วเรียก `router.refresh()` ใน transition เดียวกับ state → ข้อความ UI กับคอนเทนต์เปลี่ยนพร้อมกัน (ทดสอบใน Chrome: หน้าแรก ~1.7 วินาทีบน `next start` ในเครื่อง, แท็บที่เลือกอยู่ไม่หลุดเมื่อสลับภาษา) |
| B | **กันคอนเทนต์ EN/TH เพี้ยนกัน** | `scripts/check-content.ts` (`npm run check:content`) เทียบโครงสร้าง `home_en.ts` กับ `home_th.ts` (key, ความยาว array, ค่าที่ไม่ขึ้นกับภาษา เช่น ตัวเลข/slug/icon/path/href/kind) และตรวจชื่อไอคอน. **เจอความเพี้ยนจริง 1 จุดตั้งแต่รันครั้งแรก:** ผลทดสอบ `OLD_PROG_GPA_MEAN` (Pearson r = +0.212) มีใน EN แต่หายไปจาก TH → เพิ่มแล้ว |
| B | **ESLint guard** | `no-restricted-imports`: ไฟล์ client (`ui/**`, `context/**`, `project-tabs`, `eda-charts`) import `content/home*` ไม่ได้ กันเผลอทำให้ bundle บวมกลับมา (ทดสอบแล้วว่าจับได้) |
| B | **ชื่อ `PORTFOLIO_PROJECTS` ที่สื่อผิด** | เลิกใช้ค่าคงที่ "fallback ภาษาอังกฤษ" ทั้งหมด → `PROJECT_SLUGS`, `getProject(locale, slug)` |
| C | **Material Symbols** | เลิกโหลดฟอนต์ไอคอนทั้งชุดจาก Google (`<link>` + eslint-disable + preconnect ถูกลบ) → `MaterialIcon` เรนเดอร์ SVG inline จาก `ui/icon-paths.ts` (~46 ไอคอนที่ใช้จริง, Apache-2.0). ขนาดยังควบคุมด้วย `text-*` เหมือนเดิม. ผลพลอยได้: ไอคอน `github` เดิมไม่ใช่ไอคอนของ Material (เดิมน่าจะขึ้นเป็นตัวอักษร) ตอนนี้แสดงเป็นโลโก้ GitHub จริง |
| — | **CI** | `.github/workflows/ci.yml` รัน `npm run check` + `npm run build` ทุก push/PR |
| — | **บั๊กที่เจอระหว่างทาง** | คีย์แปล `benefitsAndImpact` ไม่มีใน `translations.ts` → หัวข้อในแท็บ Summary ของ GPA project แสดงเป็นคีย์ดิบ — เพิ่มคำแปล EN/TH แล้ว |

**ผลข้างเคียงที่ควรรู้:**
- หน้าแรกและหน้าโปรเจกต์เป็น **render ตามคำขอ (dynamic)** เพราะอ่าน cookie (ราคาที่จ่ายเพื่อ SSR ตรงภาษา); การสลับภาษาต้องรอ round-trip ไป server หนึ่งครั้ง (ไม่ instant เหมือนเดิม)
- ผู้เข้าชมเดิมที่เคยเลือกไทยไว้ใน `localStorage` จะเห็นอังกฤษหนึ่งครั้ง ต้องกดสลับใหม่
- `<title>` / description ที่ crawler เห็นเป็นภาษาอังกฤษเสมอ (crawler ไม่มี cookie)
- **ต้องตั้ง `NEXT_PUBLIC_SITE_URL`** ใน environment ของ hosting ไม่เช่นนั้น canonical / sitemap / og:image จะชี้ไป `localhost:3000` (บน Vercel ใช้ `VERCEL_PROJECT_PRODUCTION_URL` เป็นค่าสำรอง)
- เพิ่ม devDependency `tsx` (ใช้รันสคริปต์ตรวจคอนเทนต์)
- การจัดหน้าของการ์ดสถิติปรับเล็กน้อยจากการรวม component (ระยะห่างในการ์ดทุกใบเป็น `gap-3` เท่ากัน) — เนื้อหา/สีเหมือนเดิม

---

## ⏳ ยังค้างอยู่

**D. ชื่อ `portfoilo-king` สะกดผิด** (น่าจะ `portfolio-king`) — กระทบชื่อโฟลเดอร์, `package.json`, repo, deploy → เจ้าของควรตัดสินใจเอง

**E. อีเมลและเบอร์โทรแสดงเป็นข้อความธรรมดาบนหน้าสาธารณะ** — ปกติของพอร์ต scraper อาจเก็บไปส่งสแปม (ไม่แก้: การให้ติดต่อได้ง่ายสำคัญกว่า)

### ต้องการข้อมูลจากเจ้าของ (เนื้อหา)

- **ไม่มีลิงก์ live demo / repo ต่อโปรเจกต์** — CTA ทุกโปรเจกต์เป็น "Email me" อย่างเดียว ถ้าโค้ดเป็น private ควรมีภาพ / วิดีโอ walkthrough แทน
- **ไม่มีปุ่มดาวน์โหลดเรซูเม่/CV** — Hero มี "Open to opportunities" แต่ไม่มี call-to-action ต่อ
- **ไม่มีส่วน Experience/Education แยก** — GPA 3.31 อยู่ใน subtitle บรรทัดเดียว ประสบการณ์สหกิจกระจายอยู่ในหน้า Data Center
- **หน้าแรกมี 3 โปรเจกต์** — ทั้งหมดเป็นงานมหาวิทยาลัย/สหกิจ ถ้ามี side project / open-source เพิ่มจะช่วยได้
- **ข้อความทางเทคนิคของ Quill** (Rate Limiting, Helmet.js, Token Rotation, SSE) ผู้สัมภาษณ์มักถามต่อ ควรมั่นใจว่าตอบได้ทุกข้อ

### ควรให้คนอ่านตรวจ

- ข้อความไทยที่ผมเพิ่มใน `home_th.ts` (ผลทดสอบ `OLD_PROG_GPA_MEAN`) แปลจากฝั่ง EN — ควรตรวจสำนวนให้เหมือนส่วนอื่น (เคยมี commit แก้ถ้อยคำไทยมาแล้ว)
- ไอคอน `auto_awesome` ใช้ path จากชุดคลาสสิก (ชุด outlined รุ่นใหม่เปลี่ยนชื่อ/ไม่มี) ส่วน `emoji_events`/`grade`/`work_outline` แมปไป `trophy`/`star`/`work` — รูปร่างใกล้เคียงเดิม แต่ควรเหลือบดูบนหน้าเว็บ

---

## สิ่งที่ทำได้ดี

1. **เนื้อหาโปรเจกต์มีน้ำหนัก** — tech stack, system design, role/permission, pipeline พร้อมหลักฐานภายนอก (ประกาศนียบัตรรางวัล)
2. **มีงาน Data/ML จริง** — EDA, cleaning, statistical testing, `eda_pipeline.py` และ CSV ต้นทางใน `public/`
3. **2 ภาษา (EN/TH) ครบ** SSR ตรงภาษา และมีตัวตรวจไม่ให้สองฝั่งเพี้ยนกัน
4. **โครงสร้างแบบ feature-folder** — `features/home/{content,model,ui}`, `detailSections` เป็น discriminated union และตอนนี้ tab ของหน้าโปรเจกต์ขับด้วยข้อมูล เพิ่มโปรเจกต์ใหม่ไม่ต้องแตะ UI
5. **Accessibility พื้นฐานดี** — `useReducedMotion`, `aria-label` แยกภาษา, focus ring, `<html lang>` ตรงภาษา, แท็บมี `role="tab"` / `aria-selected`
6. **ประวัติ commit สะอาด** — 29 commits ข้อความเป็นระเบียบ

---

## โครงสร้างเว็บ

| Route | ประเภท | เนื้อหา |
|---|---|---|
| `/` | Dynamic (อ่าน cookie ภาษา) | Hero → Skills → Selected Works → Footer/Contact |
| `/project/[slug]` | Dynamic | `data-center`, `gpa-prediction-model`, `quill-remake` — render บน server, client เฉพาะตัวสลับแท็บและกราฟ Recharts |
| `/opengraph-image`, `/project/[slug]/opengraph-image` | Static / SSG | รูป preview สำหรับแชร์ลิงก์ |
| `/sitemap.xml`, `/robots.txt` | Static | SEO |

ไฟล์ใหญ่ที่เหลือ: `home_en.ts` / `home_th.ts` (803 บรรทัด — เป็นข้อมูล ไม่ใช่ UI), `project-sections.tsx` (server), `eda-charts.tsx` (267)

---

## แผนต่อไป

| # | งาน | แรง | ผลลัพธ์ |
|---|---|---|---|
| 1 | **commit งานที่แก้ทั้งหมด** (แนะนำแยก: lint / SEO+ภาษา / ไฟล์+README / server-component refactor+icons+CI) และตั้ง `NEXT_PUBLIC_SITE_URL` บน hosting | 10 นาที | งานไม่ค้างใน working tree |
| 2 | เพิ่มปุ่ม Resume/CV และลิงก์ demo/repo หรือวิดีโอในแต่ละโปรเจกต์ *(ต้องมีไฟล์/URL จากเจ้าของ)* | 1–2 ชม. | เพิ่มโอกาสถูกติดต่อ |
| 3 | ตรวจสำนวนไทยที่เพิ่ม + เหลือบดูไอคอนที่แมปใหม่บนหน้าเว็บ | 10 นาที | — |
| 4 | ตัดสินใจเรื่องชื่อ repo `portfoilo-king` | — | ชื่อถูกต้องก่อนเผยแพร่ |
| 5 | (ทางเลือก) วัด Lighthouse บน production และดูว่าการสลับภาษาช้าไหมบน hosting จริง — ถ้าช้า พิจารณา optimistic update ของข้อความ UI | 30 นาที | ยืนยันผลจริง |

---

## ผลการตรวจอัตโนมัติ (ล่าสุด)

| คำสั่ง | ผล |
|---|---|
| `npm run lint` | ✅ 0 errors / 0 warnings |
| `npm run typecheck` | ✅ ผ่าน |
| `npm run check:content` | ✅ โครงสร้าง EN/TH ตรงกัน, ไอคอน 46 ชื่อมีครบ (ก่อนแก้ จับได้ 1 จุดที่ TH ขาด) |
| `npx next build` | ✅ ผ่าน (Turbopack) |
| `next start` — `/`, 3 หน้าโปรเจกต์ × cookie `en`/`th` | ✅ 200; `<html lang>` ถูกต้อง; หน้า EN มีตัวอักษรไทย 0 ตัว; slug ที่ไม่มีได้ 404 |
| ค้นสตริงคอนเทนต์ใน `.next/static` (JS ฝั่ง client) | ✅ ไม่พบ (ยกเว้น `aria-label`/`alt` ชื่อภาษาไทยที่ hard-code ใน hero) |
| ทดสอบใน Chrome: สลับ EN↔TH บนหน้าแรกและหน้า GPA (ขณะเปิดแท็บ Summary) | ✅ nav/hero/การ์ด/แท็บ/หัวข้อเปลี่ยนครบ, แท็บไม่หลุด, `lang` อัปเดต, ไอคอน footer (GitHub/mail/call) ขนาดถูกต้อง |

> หมายเหตุ: ยังไม่ได้วัด Lighthouse / ทดสอบ responsive มือถือ / ดู animation จริงอย่างละเอียด

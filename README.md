# portfoilo-king

พอร์ตโฟลิโอเว็บของ Kongkat Thanalertrungroj — สร้างด้วย [Next.js](https://nextjs.org) (App Router), React, Tailwind CSS v4 และ Framer Motion

## ความต้องการของระบบ

- [Node.js](https://nodejs.org/) เวอร์ชันที่ Next.js 16 รองรับ (แนะนำ LTS ล่าสุด)

## วิธีติดตั้งและรันในเครื่อง

ในโฟลเดอร์โปรเจกต์รัน:

```bash
npm install
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000) หน้าเว็บจะรีเฟรชเมื่อแก้โค้ด (โหมด dev)

### คำสั่งที่ใช้บ่อย

| คำสั่ง | ความหมาย |
|--------|-----------|
| `npm run dev` | รันเซิร์ฟเวอร์พัฒนา (Turbopack ตามค่าเริ่มของ Next) |
| `npm run build` | บิลด์ production |
| `npm run start` | รันแอปหลังบิลด์แล้ว (ใช้คู่กับ `build`) |
| `npm run lint` | รัน ESLint |
| `npm run typecheck` | ตรวจ TypeScript (`tsc --noEmit`) |
| `npm run check:content` | ตรวจว่าคอนเทนต์ EN/TH โครงสร้างตรงกัน และชื่อไอคอนที่ใช้มีอยู่จริง |
| `npm run check` | lint + typecheck + check:content (CI รันตัวนี้ก่อน build) |

## วิธีแก้เนื้อหาและโครงหน้า

- **หน้าแรกรวมทุก section** — `app/page.tsx`
- **เนื้อหา (ข้อความ โปรเจกต์ ทักษะ ลิงก์โซเชียล)** — แยกตามภาษาใน `app/features/home/content/home_en.ts` และ `home_th.ts` โครงสร้างต้องตรงกัน (`npm run check:content` จะฟ้องถ้าไม่ตรง); `home.ts` เป็นทางเข้าฝั่ง server (`getSiteContent`, `getProjects`) — **component ฝั่ง client ห้าม import ไฟล์เนื้อหา** (ESLint บังคับ) ให้ใช้ `useLanguage().content` หรือรับ props จาก server component
- **ไอคอน** — `app/features/home/ui/icon-paths.ts` (SVG path; ชื่อไอคอนในคอนเทนต์ต้องมีที่นี่ ไม่งั้น `check:content` ล้ม)
- **ข้อมูลติดต่อ (อีเมล / เบอร์โทร)** — แก้ที่เดียวใน `app/features/home/content/contact.ts`
- **รูป hero** — ไฟล์ในเครื่อง `public/hero-portrait.jpg` (อ้างที่ `HERO_PORTRAIT_SRC` ใน `content/constants.ts`) ควรย่อไม่เกิน ~1600px ก่อน commit
- **ข้อความ UI (ปุ่ม แท็บ ฯลฯ)** — `app/features/home/content/translations.ts`
- **ภาษา** — เก็บใน cookie `portfolio-locale` และอ่านฝั่ง server ใน `app/layout.tsx` (หน้าจึง render ตามคำขอ ไม่ใช่ static)
- **SEO / metadata** — `app/site-config.ts`, `app/project/[slug]/project-meta.ts`; ตั้ง `NEXT_PUBLIC_SITE_URL` ใน environment ของ hosting เพื่อให้ canonical / sitemap / OG image ชี้โดเมนจริง
- **คอมโพเนนต์ UI ของหน้าแรก** — โฟลเดอร์ `app/features/home/ui/` (เช่น `hero-section.tsx`, `site-header.tsx`)
- **สี ฟอนต์ธีม** — `app/globals.css` (`@theme inline`) และฟอนต์ใน `app/layout.tsx`

## บิลด์ production

```bash
npm run build
npm run start
```

จากนั้นเข้า URL ที่เทอร์มินัลแสดง (ปกติ `http://localhost:3000`)

## Deploy

Deploy ได้บน [Vercel](https://vercel.com) หรือแพลตฟอร์มที่รองรับ Node/Next.js ตาม [เอกสารการ deploy ของ Next.js](https://nextjs.org/docs/app/building-your-application/deploying)

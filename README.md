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

## วิธีแก้เนื้อหาและโครงหน้า

- **หน้าแรกรวมทุก section** — `app/page.tsx`
- **ข้อความ ลิงก์ โปรเจกต์ ทักษะ รูป hero** — `app/features/home/content/home.ts`  
  เปลี่ยน URL รูป hero ได้ที่ `HERO_PORTRAIT_SRC` (โดเมนรูปต้องตรงกับ `images.remotePatterns` ใน `next.config.ts`; ตอนนี้อนุญาต `lh3.googleusercontent.com`)
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

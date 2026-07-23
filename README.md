# บทเรียนออนไลน์ประวัติศาสตร์เมืองสงขลา

เว็บไซต์บทเรียนออนไลน์ + เกม สำหรับประวัติศาสตร์เมืองสงขลา 3 ยุค: เขาแดง, แหลมสน, บ่อยาง
โฮสต์แบบ static ทั้งหมดบน GitHub Pages เชื่อมกับ Google Sheet ผ่าน Google Apps Script (backend แยกต่างหาก ไม่ได้อยู่ใน repo นี้)

## โครงสร้างโฟลเดอร์และลิงก์

| โฟลเดอร์ | เนื้อหา | URL |
|---|---|---|
| `kaodaeng-lesson/` | บทเรียน + แบบทดสอบ เขาแดง | https://jitpanusri-cell.github.io/songkhla-history/kaodaeng-lesson/ |
| `laemson-lesson/` | บทเรียน + แบบทดสอบ แหลมสน | https://jitpanusri-cell.github.io/songkhla-history/laemson-lesson/ |
| `boyang-lesson/` | บทเรียน + แบบทดสอบ บ่อยาง (มีเกมกล้อง 67 Motion Challenge ในตัว) | https://jitpanusri-cell.github.io/songkhla-history/boyang-lesson/ |
| `khaodaeng-mario-game/` | เกมกิจกรรม (มาริโอ้) ของหน้าเขาแดง | https://jitpanusri-cell.github.io/songkhla-history/khaodaeng-mario-game/ |
| `laemson-game/` | เกมปืนใหญ่เล็งตอบ ของหน้าแหลมสน | https://jitpanusri-cell.github.io/songkhla-history/laemson-game/ |

## ระบบหลังบ้าน (Google Apps Script)

ทุกหน้าเรียกใช้ Apps Script ตัวเดียวกัน (ไฟล์ `Code.gs` ที่ deploy แยกไว้ใน Apps Script project) ผ่าน JSONP เพื่อ:

- `?api=verifyStudent` — ตรวจสอบรหัสนักเรียนตอนล็อกอิน
- `?api=saveScore` — บันทึกคะแนน/กิจกรรมล่าสุดกลับ Google Sheet และดึง leaderboard

ทุกไฟล์ .html ในนี้อ้างถึง Apps Script URL เดียวกันผ่านตัวแปร `API_BASE_URL` (หรือ `SCORE_API_URL` ในไฟล์เกม) — ถ้า deploy Apps Script ใหม่แล้ว URL เปลี่ยน ต้องแก้ค่านี้ในทุกไฟล์ให้ตรงกัน

## วิธี deploy

1. เปิดใช้งาน GitHub Pages: Settings > Pages > Branch: `main` > Save
2. รอสักครู่แล้วเข้าลิงก์ตามตารางด้านบนเพื่อทดสอบ
3. ถ้าแก้ไขเนื้อหาบทเรียน/คำถามในไฟล์ไหน ให้แก้ที่ `index.html` ในโฟลเดอร์นั้นได้เลย ไม่ต้องรีบิลด์อะไรเพิ่ม

## หมายเหตุ

- นักเรียนต้องเข้าเกมผ่านหน้าบทเรียน (กดปุ่มในหน้า ไม่ใช่เปิดลิงก์เกมตรงๆ) เพื่อให้ระบบแนบรหัสนักเรียน/ชื่อ/ห้อง ไปกับ URL แล้วเกมจะบันทึกคะแนนกลับชีตได้ถูกคน
- หน้าบ่อยางใช้กล้อง (MediaPipe Hands) ต้องเปิดผ่าน HTTPS เท่านั้น ซึ่ง GitHub Pages รองรับอยู่แล้วโดยปริยาย

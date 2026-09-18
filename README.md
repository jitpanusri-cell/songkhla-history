# บทเรียนออนไลน์ประวัติศาสตร์เมืองสงขลา

เว็บไซต์บทเรียนออนไลน์ + เกม สำหรับประวัติศาสตร์เมืองสงขลา 3 ยุค: เขาแดง, แหลมสน, บ่อยาง
โฮสต์แบบ static ทั้งหมดบน GitHub Pages และเชื่อมต่อฐานข้อมูลหลังบ้านด้วย **Supabase (PostgreSQL)** เต็มรูปแบบ (ไม่มีการใช้ Google Sheets / Apps Script แล้ว)

## โครงสร้างโฟลเดอร์และลิงก์

| โฟลเดอร์ / ไฟล์ | เนื้อหา | URL |
|---|---|---|
| `index.html` (root) | หน้าหลักของเว็บไซต์ (ไม่มีระบบล็อกอิน) มีการ์ดลิงก์ไป 3 ยุค | https://jitpanusri-cell.github.io/songkhla-history/ |
| `kaodaeng-lesson/` | บทเรียน + แบบทดสอบ เขาแดง | https://jitpanusri-cell.github.io/songkhla-history/kaodaeng-lesson/ |
| `laemson-lesson/` | บทเรียน + แบบทดสอบ แหลมสน | https://jitpanusri-cell.github.io/songkhla-history/laemson-lesson/ |
| `boyang-lesson/` | บทเรียน + แบบทดสอบ บ่อยาง | https://jitpanusri-cell.github.io/songkhla-history/boyang-lesson/ |
| `profile/` | หน้าบัตรนักเรียนประจำตัว, อัปโหลดรูปภาพ และดูคะแนนสะสมรวม 3 ยุค | https://jitpanusri-cell.github.io/songkhla-history/profile/ |
| `admin/admin.html` | ระบบจัดการข้อมูลผู้สอน (ดูคะแนนรวมทุกห้องและส่งออกเป็น Excel) | https://jitpanusri-cell.github.io/songkhla-history/admin/admin.html |
| `kaodaeng-game/` | เกมกิจกรรม ปืนใหญ่เล็งตอบ ของหน้าเขาแดง | https://jitpanusri-cell.github.io/songkhla-history/kaodaeng-game/ |
| `laemson-game/` | เกมกิจกรรม ผจญภัย (มาริโอ้) ของหน้าแหลมสน | https://jitpanusri-cell.github.io/songkhla-history/laemson-game/ |
| `boyang-lesson/67-motion-challenge.html`| เกมกล้อง 67 Motion Challenge (MediaPipe Hands) ของหน้าบ่อยาง | https://jitpanusri-cell.github.io/songkhla-history/boyang-lesson/67-motion-challenge.html |
| `shared/supabase-api.js` | โค้ดกลางสำหรับเชื่อมต่อ API ของ Supabase ใช้ร่วมกันทุกหน้า | ไม่มี URL — อ้างอิงผ่าน `<script src="../shared/supabase-api.js">` |
| `shared/nav-links.js` | โค้ดปุ่มนำทางข้ามหน้าส่วน Footer ใช้ร่วมกันทุกหน้าบทเรียน | ไม่มี URL — อ้างอิงผ่าน `<script src="../shared/nav-links.js">` |

## ระบบหลังบ้าน (Supabase)

ระบบได้ย้ายจาก Google Apps Script มาใช้ **Supabase API (REST)** เพื่อความรวดเร็วและเสถียรภาพ โดยทุกหน้า (ทั้งบทเรียน เกม และโปรไฟล์) จะเรียกใช้งานฟังก์ชันผ่านไฟล์กลาง `shared/supabase-api.js` ซึ่งมีหน้าที่หลักดังนี้:

- `apiLoginStudent()` — ดึงข้อมูลนักเรียนจากตาราง `student_scores` เพื่อใช้ในการเข้าสู่ระบบ (เทียบรหัสและห้องเรียน)
- `apiSaveScore()` — บันทึกคะแนนใหม่ (PATCH) กลับไปยังคอลัมน์ที่กำหนด (เช่น `quiz_khao_daeng_max`, `game_laem_son_max`) โดยระบบจะบันทึกทับเฉพาะกรณีที่คะแนนใหม่ *มากกว่า* คะแนนเดิม หรือคะแนนเดิมยังเป็น Null
- `apiGetLeaderboard()` — ดึงข้อมูลคะแนนสูงสุด 10 อันดับแรกของเพื่อนในห้องเดียวกันมาแสดงผลแบบเรียลไทม์

*หมายเหตุ: API Key และ URL ของ Supabase ถูกฝังไว้ในไฟล์ `shared/supabase-api.js` หากมีการเปลี่ยนโปรเจกต์ฐานข้อมูลในอนาคต ให้แก้ไขที่ไฟล์นี้เพียงจุดเดียว*

## วิธี Deploy และอัปเดตระบบ

1. โค้ดทั้งหมดฝากไว้ที่ **GitHub Pages** (Settings > Pages > Branch: `main` > Save)
2. หากมีการแก้ไขเนื้อหาบทเรียน คำถาม หรือเปลี่ยนสีปุ่ม สามารถแก้ที่ไฟล์ `index.html` ของโฟลเดอร์นั้นๆ แล้ว Push ขึ้น GitHub ระบบจะอัปเดตหน้าเว็บให้อัตโนมัติโดยไม่ต้องบิลด์ใหม่
3. หากมีการปรับแก้สิทธิ์ฐานข้อมูล (เช่น ปิด-เปิด ให้นักเรียนส่งข้อสอบ) ให้ไปตั้งค่า Row Level Security (RLS) ที่หน้าเว็บจัดการของ Supabase ในตาราง `student_scores` 

## ปุ่มนำทางข้ามหน้า (shared/nav-links.js)

ทั้ง 3 หน้าบทเรียน (เขาแดง/แหลมสน/บ่อยาง) ตลอดจนหน้า Profile ใช้โค้ดชุดเดียวกันจากไฟล์ `shared/nav-links.js` ในการแสดงปุ่มนำทางไว้ที่ท้ายหน้า (footer) ของทุกหน้าเหมือนกันหมด ปุ่มของหน้าที่กำลังเปิดอยู่จะไฮไลต์และกดไม่ได้ หากต้องการแก้ข้อความ ลิงก์ สี หรือไอคอน ให้แก้ที่ไฟล์นี้ไฟล์เดียว จะมีผลกับทั้งโปรเจกต์ทันที

## หมายเหตุสำหรับนักเรียนและการเข้าใช้งาน

- นักเรียนควรเข้าเกมผ่าน **หน้าบทเรียน** หรือ **ล็อกอินผ่านหน้าแรกก่อนเสมอ** เพื่อให้ระบบดึงรหัสนักเรียน/ชื่อ/ห้อง ไปเป็นตัวแปรใน URL เกมจะได้ส่งคะแนนกลับไปบันทึกลงตาราง Supabase ได้ถูกคน
- เกม 67 Motion Challenge ของบ่อยางใช้กล้องมือถือผ่าน MediaPipe Hands ต้องเปิดผ่านโปรโตคอล **HTTPS** เสมอ (ซึ่ง GitHub Pages บังคับใช้และรองรับอยู่แล้ว)
- ระบบส่งออกข้อมูลผู้สอน (`admin/admin.html`) ประมวลผลและสร้างไฟล์ `.xlsx` (Excel) ในฝั่งผู้ใช้งาน (Client-side) ด้วยไลบรารี SheetJS ทำให้ผู้สอนสามารถกดดาวน์โหลดคะแนนของเด็กทุกคนได้ทันทีโดยไม่ต้องโหลดหน้าเว็บใหม่

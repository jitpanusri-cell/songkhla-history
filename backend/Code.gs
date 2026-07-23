function doGet(e) {
  // ===== API endpoints สำหรับหน้าเว็บภายนอกที่โฮสต์บน GitHub Pages (นอก Apps Script) =====
  // ทั้งสอง endpoint รองรับ JSONP ด้วย (เติม &callback=ชื่อฟังก์ชัน) เพราะ ContentService
  // ของ Apps Script ไม่มีทางตั้งค่า Access-Control-Allow-Origin ให้ fetch() ธรรมดาอ่าน response ข้ามโดเมนได้
  // ตัวอย่าง: .../exec?api=saveScore&studentId=12345&name=...&className=...&action=...&score=7&callback=cb
  //          .../exec?api=verifyStudent&studentId=12345&className=ม.3/1&callback=cb
  if (e.parameter.api === 'saveScore') {
    return handleApiSaveScore(e);
  }
  if (e.parameter.api === 'verifyStudent') {
    return handleApiVerifyStudent(e);
  }

  // ตรวจสอบว่า URL มีการส่งพารามิเตอร์ ?page=... มาหรือไม่
  var page = e.parameter.page;

  // ถ้าพารามิเตอร์ page เท่ากับ 'laemso' ให้เปิดหน้า แหลมสน
  // (แก้บั๊ก: ชื่อไฟล์จริงในโปรเจกต์คือ 'laemson' ของเดิมพิมพ์ตกตัว n จึงหาไฟล์ไม่เจอ)
  if (page === 'laemso') {
    return HtmlService.createHtmlOutputFromFile('laemson')
        .setTitle('บทเรียนออนไลน์ประวัติศาสตร์เมืองสงขลาฝั่งแหลมสน')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  // ถ้าพารามิเตอร์ page เท่ากับ 'boyang' ให้เปิดหน้า บ่อยาง
  else if (page === 'boyang') {
    return HtmlService.createHtmlOutputFromFile('BoYang')
        .setTitle('บทเรียนออนไลน์ประวัติศาสตร์เมืองสงขลาฝั่งบ่อยาง')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  // ถ้าไม่มีพารามิเตอร์ หรือเป็นค่าอื่นๆ ให้เปิดหน้า Index (เขาแดง) เป็นหน้าหลัก
  else {
    return HtmlService.createHtmlOutputFromFile('Index')
        .setTitle('บทเรียนออนไลน์ประวัติศาสตร์เมืองสงขลาฝั่งเขาแดง')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
}

// สร้าง response กลับให้หน้าเว็บภายนอก รองรับทั้ง JSON ธรรมดา (สำหรับ fetch แบบ no-cors ที่ไม่อ่าน response)
// และ JSONP (ถ้ามีพารามิเตอร์ callback มาด้วย) สำหรับหน้าเว็บที่ต้องอ่านค่ากลับไปแสดงผลจริง เช่น
// ผลตรวจสอบรหัสนักเรียน หรือ Leaderboard
function jsonOutput(e, obj) {
  var json = JSON.stringify(obj);
  var callback = e && e.parameter && e.parameter.callback;
  if (callback) {
    // ตรวจสอบคร่าวๆ ว่าเป็นชื่อฟังก์ชันที่ปลอดภัย (ตัวอักษร/ตัวเลข/_ /$ เท่านั้น) ป้องกัน injection
    var safeCallback = callback.replace(/[^a-zA-Z0-9_$]/g, '');
    return ContentService
        .createTextOutput(safeCallback + '(' + json + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// จัดการคำขอบันทึกคะแนนที่มาจากหน้าเว็บภายนอก (นอก Apps Script) ผ่าน query string
// คืนค่าเป็น JSON เดียวกับที่ saveDataAndGetLeaderboard() คืนให้ตอนเรียกผ่าน google.script.run ปกติ
function handleApiSaveScore(e) {
  try {
    var data = {
      studentId: e.parameter.studentId || '',
      name: e.parameter.name || '',
      className: e.parameter.className || '',
      action: e.parameter.action || '',
      score: e.parameter.score || 0
    };

    if (!data.studentId || !data.className) {
      return jsonOutput(e, { status: 'error', message: 'ข้อมูลไม่ครบ: ต้องมี studentId และ className' });
    }

    var result = saveDataAndGetLeaderboard(data);
    return jsonOutput(e, result);

  } catch (error) {
    return jsonOutput(e, { status: 'error', message: error.toString() });
  }
}

// จัดการคำขอตรวจสอบรหัสนักเรียนที่มาจากหน้าเว็บภายนอก (นอก Apps Script) ผ่าน query string
// คืนค่าเป็น JSON เดียวกับที่ verifyStudent() คืนให้ตอนเรียกผ่าน google.script.run ปกติ
function handleApiVerifyStudent(e) {
  try {
    var data = {
      className: e.parameter.className || '',
      studentId: e.parameter.studentId || ''
    };

    if (!data.className || !data.studentId) {
      return jsonOutput(e, { status: 'error', message: 'ข้อมูลไม่ครบ: ต้องมี className และ studentId' });
    }

    var result = verifyStudent(data);
    return jsonOutput(e, result);

  } catch (error) {
    return jsonOutput(e, { status: 'error', message: error.toString() });
  }
}

// ============================================================
// โครงสร้างคอลัมน์ในแต่ละชีตห้องเรียน (เช่น ม.3/1, ม.3/5, ...):
// A = รหัสนักเรียน   B = ชื่อ         C = ห้อง
// D = กิจกรรมล่าสุด   E = คะแนนล่าสุด
// F = เกมสูงสุด       G = แบบทดสอบสูงสุด
// ============================================================
var COL = { ID: 1, NAME: 2, CLASS: 3, ACTION: 4, SCORE: 5, MAXGAME: 6, MAXQUIZ: 7 };

// ตรวจสอบรหัสนักเรียน 5 หลัก
function verifyStudent(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(data.className);
    if (!sheet) return { status: "error", message: "ไม่พบชีตห้องเรียน " + data.className };

    var rows = sheet.getDataRange().getValues();
    var studentName = "";

    // ค้นหารหัสนักเรียน ในคอลัมน์ A (index 0)
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] && rows[i][0].toString().trim() === data.studentId.toString().trim()) {
        studentName = rows[i][1]; // ดึงชื่อจากคอลัมน์ B (index 1)
        break;
      }
    }

    if (studentName === "") {
      return { status: "error", message: "ไม่พบรหัสนักเรียนนี้ในตาราง" };
    }
    return { status: "success", name: studentName };

  } catch (error) {
    return { status: "error", message: error.toString() };
  }
}

// กิจกรรมใดควรอัปเดต/อ่านจากคอลัมน์คะแนนสูงสุดใด
// รวม action ของทุกหน้า (เขาแดง / แหลมสน / บ่อยาง) ไว้ในจุดเดียว
function getMaxColumnForAction(action) {
  // กิจกรรมประเภท "เกม" ของทุกหน้า -> อัปเดต/อ่านจากคอลัมน์เกมสูงสุด (F)
  if (
    action === "เล่นเกมกิจกรรม" ||       // หน้าเขาแดง
    action === "เล่นเกมแหลมสน" ||        // หน้าแหลมสน (เกมมาริโอ้)
    action === "เล่นเกม Speed67 บ่อยาง"  // หน้าบ่อยาง (67 Speed Game Challenge)
  ) return COL.MAXGAME;

  // กิจกรรมประเภท "แบบทดสอบ" ของทุกหน้า -> อัปเดต/อ่านจากคอลัมน์แบบทดสอบสูงสุด (G)
  if (
    action === "ทำแบบทดสอบ" ||     // หน้าเขาแดง
    action === "แบบทดสอบแหลมสน" || // หน้าแหลมสน
    action === "แบบทดสอบบ่อยาง"    // หน้าบ่อยาง
  ) return COL.MAXQUIZ;

  return null; // เช่น "เข้าสู่ระบบ...", "เข้าสู่ระบบแหลมสน", "เข้าสู่ระบบบ่อยาง" ไม่มีคอลัมน์คะแนนสูงสุดให้อัปเดต
}

// บันทึกคะแนนโดยอัปเดตแถวเดิมของนักเรียน (หาแถวจากรหัสนักเรียน) และดึง Leaderboard จากคอลัมน์คะแนนสูงสุด
function saveDataAndGetLeaderboard(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(data.className);
    if (!sheet) return { status: "error", message: "ไม่พบชีตห้องเรียน " + data.className };

    var rows = sheet.getDataRange().getValues();
    var targetRow = -1;

    // หาแถวของนักเรียนจากรหัสนักเรียนในคอลัมน์ A
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] && rows[i][0].toString().trim() === data.studentId.toString().trim()) {
        targetRow = i + 1; // แปลงเป็นเลขแถวจริงในชีต (1-based)
        break;
      }
    }

    if (targetRow === -1) {
      return { status: "error", message: "ไม่พบรหัสนักเรียนนี้ในรายชื่อห้อง " + data.className + " กรุณาติดต่อครูผู้สอนเพื่อเพิ่มชื่อในชีต" };
    }

    // อัปเดตห้องเรียน / กิจกรรมล่าสุด / คะแนนล่าสุด
    sheet.getRange(targetRow, COL.CLASS).setValue(data.className);
    sheet.getRange(targetRow, COL.ACTION).setValue(data.action);
    sheet.getRange(targetRow, COL.SCORE).setValue(data.score);

    // อัปเดตคะแนนสูงสุด เฉพาะกิจกรรมที่มีคอลัมน์คะแนนสูงสุด และคะแนนเป็นตัวเลข
    var maxCol = getMaxColumnForAction(data.action);
    var numericScore = parseFloat(data.score);
    if (maxCol && !isNaN(numericScore)) {
      var currentMax = parseFloat(sheet.getRange(targetRow, maxCol).getValue()) || 0;
      if (numericScore > currentMax) {
        sheet.getRange(targetRow, maxCol).setValue(numericScore);
      }
    }

    // สร้าง Leaderboard จากคอลัมน์คะแนนสูงสุดของกิจกรรมนี้ (ทุกคนในห้องเดียวกัน)
    var leaderboard = [];
    if (maxCol) {
      var allRows = sheet.getDataRange().getValues();
      for (var j = 1; j < allRows.length; j++) {
        var pName = allRows[j][COL.NAME - 1];
        var pScore = parseFloat(allRows[j][maxCol - 1]);
        if (pName && !isNaN(pScore) && pScore > 0) {
          leaderboard.push({ name: pName, score: pScore });
        }
      }
      leaderboard.sort(function (a, b) { return b.score - a.score; });
      leaderboard = leaderboard.slice(0, 10);
    }

    return { status: "success", leaderboard: leaderboard };

  } catch (error) {
    return { status: "error", message: error.toString() };
  }
}

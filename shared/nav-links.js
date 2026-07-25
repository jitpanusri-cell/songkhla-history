// shared/nav-links.js
// ปุ่มนำทาง 3 ปุ่มคงที่ (เขาแดง=หน้าหลัก / แหลมสน / บ่อยาง) — โค้ดชุดเดียว ใช้ร่วมกันทุกหน้า
// วางไว้ที่ท้ายหน้า (ในส่วน footer) ของทุกหน้าเหมือนกันหมด
// หมายเหตุ: เขาแดงคือหน้าหลักของเว็บนี้ (ไม่มีหน้า Home แยกต่างหาก) ปุ่มเขาแดงจึงมีความหมายเป็น "กลับหน้าหลัก" ในตัว
// ปุ่มทั้ง 3 จะแสดงเหมือนกันทุกหน้าเสมอ ปุ่มของหน้าที่กำลังเปิดอยู่จะถูกไฮไลต์และกดไม่ได้ (ไม่ใช่ลิงก์)
//
// วิธีใช้ในแต่ละหน้า:
//   1) ใส่ <script src="../shared/nav-links.js"></script> ในหน้า
//   2) ใส่ <div id="era-nav-footer" class="flex flex-wrap items-center justify-center gap-2 mb-4"></div> ไว้ในส่วน <footer> ของหน้า (ท้ายสุดของหน้า)
//   3) เรียก initEraNav('kaodaeng' | 'laemson' | 'boyang') หลัง lucide.createIcons() ตอนโหลดหน้า
//
// ถ้าต้องแก้ลิงก์ ข้อความ สี หรือไอคอนของปุ่มเหล่านี้ แก้ที่ไฟล์นี้ไฟล์เดียว จะมีผลกับทุกหน้าทันที

(function () {
  var BASE = 'https://jitpanusri-cell.github.io/songkhla-history';

  var PAGES = [
    {
      id: 'kaodaeng',
      label: 'เขาแดง (หน้าหลัก)',
      mobileLabel: 'กลับหน้าหลัก (เขาแดง)',
      url: BASE + '/kaodaeng-lesson/',
      icon: 'home',
      pill: 'bg-red-100 text-red-700 hover:bg-red-200'
    },
    {
      id: 'laemson',
      label: 'แหลมสน',
      mobileLabel: 'ไปฝั่งแหลมสน',
      url: BASE + '/laemson-lesson/',
      icon: 'map-pin',
      pill: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    },
    {
      id: 'boyang',
      label: 'บ่อยาง',
      mobileLabel: 'ไปฝั่งบ่อยาง',
      url: BASE + '/boyang-lesson/',
      icon: 'building-2',
      pill: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    }
  ];

  window.initEraNav = function (currentPageId) {
    // ปุ่มนำทางที่ท้ายหน้า (footer) — ออกแบบให้ใช้ได้กับพื้นหลังสีเข้มของ footer ทุกหน้า
    var footerEl = document.getElementById('era-nav-footer');
    if (footerEl) {
      footerEl.innerHTML = PAGES.map(function (p) {
        var isCurrent = p.id === currentPageId;
        if (isCurrent) {
          return '<span title="กำลังอยู่หน้านี้" ' +
            'class="flex shrink-0 whitespace-nowrap items-center bg-white text-gray-900 px-4 py-2 rounded-full text-xs sm:text-sm font-bold cursor-default shadow-sm">' +
            '<i data-lucide="' + p.icon + '" class="w-4 h-4 mr-1.5"></i> ' + p.label +
            '</span>';
        }
        return '<a href="' + p.url + '" ' +
          'class="flex shrink-0 whitespace-nowrap items-center bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition border border-white/20">' +
          '<i data-lucide="' + p.icon + '" class="w-4 h-4 mr-1.5"></i> ' + p.label +
          '</a>';
      }).join('');
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };
})();

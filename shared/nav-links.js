// shared/nav-links.js
// ปุ่มนำทาง 4 ปุ่มคงที่ (หน้าหลัก / เขาแดง / แหลมสน / บ่อยาง) — โค้ดชุดเดียว ใช้ร่วมกันทุกหน้า
// ปุ่มทั้ง 4 จะแสดงเหมือนกันทุกหน้าเสมอ ปุ่มของหน้าที่กำลังเปิดอยู่จะถูกไฮไลต์และกดไม่ได้ (ไม่ใช่ลิงก์)
//
// วิธีใช้ในแต่ละหน้า:
//   1) ใส่ <script src="../shared/nav-links.js"></script> ในหน้า (หน้าที่ root ใช้ "./shared/nav-links.js")
//   2) ใส่ <div id="era-nav-desktop" class="flex items-center gap-2"></div> ตรงจุดที่ต้องการให้ปุ่ม (แถบเมนูบนจอใหญ่)
//   3) ใส่ <div id="era-nav-mobile"></div> ตรงจุดที่ต้องการให้ปุ่ม (เมนูมือถือ/หน้าหลัก)
//   4) เรียก initEraNav('home' | 'kaodaeng' | 'laemson' | 'boyang') หลัง lucide.createIcons() ตอนโหลดหน้า
//
// ถ้าต้องแก้ลิงก์ ข้อความ สี หรือไอคอนของปุ่มเหล่านี้ แก้ที่ไฟล์นี้ไฟล์เดียว จะมีผลกับทุกหน้าทันที

(function () {
  var BASE = 'https://jitpanusri-cell.github.io/songkhla-history';

  var PAGES = [
    {
      id: 'home',
      label: 'หน้าหลัก',
      mobileLabel: 'กลับหน้าหลัก',
      url: BASE + '/',
      icon: 'home',
      pill: 'bg-slate-200 text-slate-700 hover:bg-slate-300'
    },
    {
      id: 'kaodaeng',
      label: 'เขาแดง',
      mobileLabel: 'ไปหน้าเขาแดง',
      url: BASE + '/kaodaeng-lesson/',
      icon: 'mountain',
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
    var desktopEl = document.getElementById('era-nav-desktop');
    if (desktopEl) {
      desktopEl.classList.add('gap-1.5');
      desktopEl.innerHTML = PAGES.map(function (p) {
        var isCurrent = p.id === currentPageId;
        if (isCurrent) {
          return '<span title="กำลังอยู่หน้านี้" ' +
            'class="hidden lg:flex shrink-0 whitespace-nowrap items-center bg-gray-800 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-default ring-2 ring-offset-1 ring-gray-800">' +
            '<i data-lucide="' + p.icon + '" class="w-3.5 h-3.5 mr-1"></i> ' + p.label +
            '</span>';
        }
        return '<a href="' + p.url + '" ' +
          'class="hidden lg:flex shrink-0 whitespace-nowrap items-center ' + p.pill + ' px-2.5 py-1.5 rounded-lg text-xs font-bold transition">' +
          '<i data-lucide="' + p.icon + '" class="w-3.5 h-3.5 mr-1"></i> ' + p.label +
          '</a>';
      }).join('');
    }

    var mobileEl = document.getElementById('era-nav-mobile');
    if (mobileEl) {
      mobileEl.innerHTML =
        '<div class="pt-2 pb-1 text-xs font-bold text-gray-400">เมนูหลักทุกยุค:</div>' +
        PAGES.map(function (p) {
          var isCurrent = p.id === currentPageId;
          if (isCurrent) {
            return '<div class="block py-2 border-b font-bold flex justify-between items-center bg-gray-100 px-2 rounded-lg text-gray-500">' +
              '<span><i data-lucide="' + p.icon + '" class="w-4 h-4 inline mr-1"></i> ' + p.label + ' (กำลังอยู่หน้านี้)</span>' +
              '</div>';
          }
          return '<a href="' + p.url + '" class="block py-2 border-b font-bold flex justify-between items-center">' +
            '<span><i data-lucide="' + p.icon + '" class="w-4 h-4 inline mr-1"></i> ' + p.mobileLabel + '</span>' +
            '<i data-lucide="external-link" class="w-4 h-4"></i>' +
            '</a>';
        }).join('');
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };
})();

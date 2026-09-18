// ==========================================
// ไฟล์กลางสำหรับจัดการปุ่มนำทาง (Footer Nav Links)
// รองรับ 5 หน้าหลัก: เขาแดง, แหลมสน, บ่อยาง, ตรวจสอบคะแนน, และสำหรับครู
// ==========================================

(function () {
  var BASE = 'https://jitpanusri-cell.github.io/songkhla-history';

  var PAGES = [
    {
      id: 'kaodaeng',
      label: 'เขาแดง',
      url: BASE + '/kaodaeng-lesson/',
      icon: 'home'
    },
    {
      id: 'laemson',
      label: 'แหลมสน',
      url: BASE + '/laemson-lesson/',
      icon: 'map-pin'
    },
    {
      id: 'boyang',
      label: 'บ่อยาง',
      url: BASE + '/boyang-lesson/',
      icon: 'building-2'
    },
    {
      id: 'profile',
      label: 'ตรวจสอบคะแนน',
      url: BASE + '/profile/',
      icon: 'id-card'
    },
    {
      id: 'admin',
      label: 'สำหรับครู',
      url: BASE + '/admin/admin.html',
      icon: 'layout-dashboard'
    }
  ];

  window.initEraNav = function (currentPageId) {
    var footerEl = document.getElementById('era-nav-footer');
    if (footerEl) {
      // เพิ่ม class justify-center และ gap-1.5 / gap-2 เพื่อความยืดหยุ่นบนมือถือ
      footerEl.className = "flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 px-2";
      
      footerEl.innerHTML = PAGES.map(function (p) {
        var isCurrent = p.id === currentPageId;
        
        // ปรับขนาด padding และฟอนต์ให้เล็กลงเล็กน้อย (text-[10px] บนมือถือ และ text-sm บนจอใหญ่) เพื่อให้พอดี 5 ปุ่ม
        var baseStyle = "flex shrink-0 whitespace-nowrap items-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold transition ";
        
        if (isCurrent) {
          return '<span title="กำลังอยู่หน้านี้" class="' + baseStyle + ' bg-white text-gray-900 cursor-default shadow-sm">' +
            '<i data-lucide="' + p.icon + '" class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5"></i> ' + p.label +
            '</span>';
        }
        return '<a href="' + p.url + '" class="' + baseStyle + ' bg-white/10 hover:bg-white/20 text-white border border-white/20">' +
          '<i data-lucide="' + p.icon + '" class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5"></i> ' + p.label +
          '</a>';
      }).join('');
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };
})();

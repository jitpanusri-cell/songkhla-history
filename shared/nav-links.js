// ==========================================
// ไฟล์กลางสำหรับจัดการปุ่มนำทาง (Footer Nav Links) แบบอัตโนมัติ 100%
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
      label: 'คะแนน', // เปลี่ยนชื่อเป็น "คะแนน" ตามที่ต้องการ
      url: BASE + '/profile/',
      icon: 'award' // เปลี่ยนไอคอนเป็นเหรียญรางวัล (Award)
    },
    {
      id: 'admin',
      label: 'สำหรับครู',
      url: BASE + '/admin/admin.html',
      icon: 'layout-dashboard'
    }
  ];

  function detectCurrentPage() {
    var path = window.location.pathname;
    if (path.indexOf('kaodaeng-lesson') !== -1) return 'kaodaeng';
    if (path.indexOf('laemson-lesson') !== -1) return 'laemson';
    if (path.indexOf('boyang-lesson') !== -1) return 'boyang';
    if (path.indexOf('profile') !== -1) return 'profile';
    if (path.indexOf('admin') !== -1) return 'admin';
    return 'kaodaeng';
  }

  function renderNav() {
    var currentPageId = detectCurrentPage();
    
    var footerEl = document.querySelector('footer');
    if (!footerEl) {
      footerEl = document.createElement('footer');
      footerEl.className = "bg-slate-900 text-slate-400 text-center py-6 px-4 text-sm mt-auto shrink-0 border-t-4 border-slate-700";
      document.body.appendChild(footerEl);
    }

    var navContainer = document.getElementById('era-nav-footer');
    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.id = 'era-nav-footer';
      footerEl.insertBefore(navContainer, footerEl.firstChild);
    }

    navContainer.className = "flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 px-2";
    
    navContainer.innerHTML = PAGES.map(function (p) {
      var isCurrent = p.id === currentPageId;
      var baseStyle = "flex shrink-0 whitespace-nowrap items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-bold transition ";
      
      if (isCurrent) {
        return '<span title="กำลังอยู่หน้านี้" class="' + baseStyle + ' bg-white text-gray-900 cursor-default shadow-sm">' +
          '<i data-lucide="' + p.icon + '" class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5"></i> ' + p.label +
          '</span>';
      }
      return '<a href="' + p.url + '" class="' + baseStyle + ' bg-white/10 hover:bg-white/20 text-white border border-white/20">' +
        '<i data-lucide="' + p.icon + '" class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5"></i> ' + p.label +
        '</a>';
    }).join('');

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNav);
  } else {
    renderNav();
  }

  window.initEraNav = renderNav;
})();

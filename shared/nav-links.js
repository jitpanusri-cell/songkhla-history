// ==========================================
// ไฟล์กลางสำหรับจัดการปุ่มนำทาง (Footer Nav Links) แบบอัตโนมัติ
// รองรับครบ 5 หน้า: เขาแดง, แหลมสน, บ่อยาง, ตรวจสอบคะแนน, และสำหรับครู
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
    // 1. ค้นหา Footer ของหน้าเว็บ
    var footerEl = document.querySelector('footer');
    
    // ถ้าไม่เจอ Footer ให้สร้างขึ้นมาต่อท้าย body อัตโนมัติทันที (ป้องกันหน้าไหนลืมใส่ Footer)
    if (!footerEl) {
      footerEl = document.createElement('footer');
      footerEl.className = "bg-slate-900 text-slate-400 text-center py-6 px-4 text-sm mt-auto shrink-0 border-t-4 border-slate-700";
      document.body.appendChild(footerEl);
    }

    // 2. ค้นหาหรือสร้าง Container สำหรับใส่ปุ่มนำทาง (id="era-nav-footer")
    var navContainer = document.getElementById('era-nav-footer');
    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.id = 'era-nav-footer';
      // แทรกไว้เป็นส่วนแรกสุดของ Footer
      footerEl.insertBefore(navContainer, footerEl.firstChild);
    }

    // 3. กำหนดสไตล์และสร้าง HTML ของปุ่มทั้ง 5 ปุ่ม
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

    // สั่งเรนเดอร์ไอคอน Lucide ซ้ำเพื่อให้แสดงผลครบถ้วน
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };
})();

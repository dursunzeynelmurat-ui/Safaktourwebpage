(function () {
  const menuBtn = document.querySelector('.menu-btn');
  const navList = document.querySelector('.nav-list');

  function closeMenu() {
    if (!navList || !menuBtn) return;
    navList.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && navList) {
    menuBtn.addEventListener('click', function () {
      const open = navList.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      const clickedOutside = !navList.contains(event.target) && !menuBtn.contains(event.target);
      if (clickedOutside) closeMenu();
    });
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  const form = document.querySelector('#quoteForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const fields = ['fullName', 'phone', 'nationality', 'serviceType', 'destination', 'checkIn', 'checkOut', 'guests'];
      let valid = true;
      fields.forEach(function (id) {
        const input = form.querySelector('#' + id);
        if (!input || !input.value.trim()) {
          valid = false;
          if (input) input.setAttribute('aria-invalid', 'true');
        } else if (input) {
          input.removeAttribute('aria-invalid');
        }
      });

      const phoneInput = form.querySelector('#phone');
      const checkInInput = form.querySelector('#checkIn');
      const checkOutInput = form.querySelector('#checkOut');
      const phoneRegex = /^[+0-9\s().-]{7,20}$/;

      if (phoneInput && !phoneRegex.test(phoneInput.value.trim())) {
        valid = false;
        phoneInput.setAttribute('aria-invalid', 'true');
      }

      if (checkInInput && checkOutInput && checkInInput.value && checkOutInput.value) {
        if (new Date(checkOutInput.value) < new Date(checkInInput.value)) {
          valid = false;
          checkOutInput.setAttribute('aria-invalid', 'true');
          alert(form.dataset.dateMsg || 'Check-out date must be after check-in date.');
          return;
        }
      }

      if (!valid) {
        alert(form.dataset.validationMsg || 'Please fill in required fields correctly.');
        return;
      }

      const t = form.dataset;
      const msg = `${t.msgTitle}\n` +
        `${t.fullName}: ${form.fullName.value}\n` +
        `${t.phone}: ${form.phone.value}\n` +
        `${t.nationality}: ${form.nationality.value}\n` +
        `${t.serviceType}: ${form.serviceType.value}\n` +
        `${t.destination}: ${form.destination.value}\n` +
        `${t.checkIn}: ${form.checkIn.value}\n` +
        `${t.checkOut}: ${form.checkOut.value}\n` +
        `${t.guests}: ${form.guests.value}\n` +
        `${t.notes}: ${form.notes.value || '-'}\n`;

      const phone = form.dataset.whatsapp || '905000000000';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener');
    });
  }
})();

(function () {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach((el) => obs.observe(el));

  const form = document.querySelector('[data-quote-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const waNumber = form.getAttribute('data-wa-number') || '905000000000';
      const t = (k) => form.getAttribute('data-label-' + k) || k;
      const data = new FormData(form);

      const lines = [
        'Şafak Tour - Quote Request',
        `${t('full_name')}: ${data.get('full_name')}`,
        `${t('phone')}: ${data.get('phone')}`,
        `${t('nationality')}: ${data.get('nationality')}`,
        `${t('service_type')}: ${data.get('service_type')}`,
        `${t('destination')}: ${data.get('destination')}`,
        `${t('check_in')}: ${data.get('check_in')}`,
        `${t('check_out')}: ${data.get('check_out')}`,
        `${t('guest_count')}: ${data.get('guest_count')}`,
        `${t('notes')}: ${data.get('notes') || '-'}`
      ];

      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }
})();

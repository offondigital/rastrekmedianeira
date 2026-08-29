(function () {
  'use strict';
  const skip = window.skipInjection || [];
  const $ = (s, c) => (c || document).querySelector(s);
  const has = id => skip.indexOf(id) === -1;

  /* ---------- HEADER / FOOTER ---------- */
  $('#header-placeholder').outerHTML = headerHTML;
  $('#footer-placeholder').outerHTML = footerHTML;

  /* ---------- MENU ---------- */
  const header = $('#siteHeader'), nav = $('#mainNav'), toggle = $('#navToggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- SCROLL HEADER + TOPO ---------- */
  const toTop = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- HERO SLIDER (background com preload) ---------- */
  const heroImages = [
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=70'
  ];
  const heroBg = $('#heroBg'), dotsBox = $('#heroDots');
  let idx = 0, timer = null;

  function show(i) {
    idx = (i + heroImages.length) % heroImages.length;
    heroBg.classList.remove('is-visible');
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      heroBg.style.backgroundImage = `url("${img.src}")`;
      requestAnimationFrame(() => heroBg.classList.add('is-visible'));
    };
    img.src = heroImages[idx];
    Array.prototype.forEach.call(dotsBox.children, (b, n) =>
      b.setAttribute('aria-selected', String(n === idx)));
  }
  heroImages.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.addEventListener('click', () => { show(i); restart(); });
    dotsBox.appendChild(b);
  });
  function restart() { clearInterval(timer); timer = setInterval(() => show(idx + 1), 6500); }
  show(0); restart();
  document.addEventListener('visibilitychange', () =>
    document.hidden ? clearInterval(timer) : restart());

  /* ---------- FEATURES ---------- */
  if (has('features')) {
    $('#features-title').textContent = pageContent.features.title;
    $('#features-list').innerHTML = pageContent.features.items.map(i => `
      <article class="feature-card reveal">
        <div class="feature-icon" aria-hidden="true">${i.icon || '•'}</div>
        <h3>${i.title}</h3><p>${i.description}</p>
      </article>`).join('');
  }

  /* ---------- SOBRE ---------- */
  if (has('about')) {
    const a = pageContent.aboutUs;
    $('#about-title').textContent = a.title;
    $('#about-desc').innerHTML = a.description;
    $('#about-btn').textContent = a.buttonText;
    $('#about-btn').setAttribute('href', a.buttonHref);
    const ai = $('#about-img');
    if (ai) { ai.dataset.src = a.image; }
  }

  /* ---------- DEPOIMENTOS ---------- */
  $('#testimonials-title').textContent = pageContent.testimonials.title;
  $('#testimonials-list').innerHTML = pageContent.testimonials.reviews.map(r => `
    <article class="testimonial reveal">
      <div class="stars" aria-label="5 de 5 estrelas">★★★★★</div>
      <p>“${r.comment}”</p>
      <strong>${r.name}</strong><small>${r.profession}</small>
    </article>`).join('');

  /* ---------- FOOTER ---------- */
  const f = pageContent.footer;
  $('#footer-desc').textContent = f.description;
  $('#footer-services').innerHTML = f.servicesLinks.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('');
  $('#footer-schedule').innerHTML = f.schedule.map(s => `<li>${s}</li>`).join('');
  $('#footer-address').textContent = f.address;
  $('#footer-copy').textContent = f.copyright;

  /* ---------- WHATSAPP ---------- */
  const wa = $('#whatsapp-float');
  wa.href = `https://wa.me/${pageContent.general.whatsappNumber}?text=${encodeURIComponent(pageContent.general.whatsappMessage)}`;
  wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.13-.42-2.15-1.33-.8-.71-1.34-1.59-1.5-1.89-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.08 4.37 2.98 1.17 2.98.78 3.52.73.54-.05 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.19-.57-.34M12 22a9.9 9.9 0 0 1-5.03-1.36L3 22l1.4-3.86A9.9 9.9 0 0 1 2 12 10 10 0 1 1 12 22"/></svg>';

  /* ---------- SCHEMA ---------- */
  const s = pageContent.schema;
  $('#schema-json').textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "AutoRepair",
    name: s.name, description: s.description, telephone: s.phone, email: s.email,
    url: "https://rastreamentodeveiculosrastrek.com.br/",
    address: { "@type": "PostalAddress", streetAddress: s.address.street, addressLocality: s.address.city, addressRegion: s.address.state, postalCode: s.address.zip, addressCountry: s.address.country },
    geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng },
    areaServed: ["Medianeira", "Cascavel", "Foz do Iguaçu", "Missal", "Toledo"],
    openingHours: ["Mo-Fr 08:00-11:45", "Mo-Fr 13:00-17:00", "Sa 08:00-14:00"]
  });

  /* ---------- LAZY: imagens, mapa e reveal ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.dataset.src) { el.src = el.dataset.src; delete el.dataset.src; }
      if (el.hasAttribute('data-lazy-map')) { el.innerHTML = mapContent.embedCode; el.removeAttribute('data-lazy-map'); }
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '120px 0px', threshold: 0.08 });

  document.querySelectorAll('.reveal,[data-lazy-map],img[data-src],#about-img').forEach(el => io.observe(el));

  /* stagger nos grids */
  document.querySelectorAll('.features-grid,.plans-grid,.testimonials-grid,.stats-grid').forEach(g => {
    Array.prototype.forEach.call(g.children, (c, i) => c.style.transitionDelay = (i * 80) + 'ms');
  });

  /* ---------- CONTADOR ---------- */
  const cio = new IntersectionObserver(en => {
    en.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count;
      let t0 = null;
      const step = ts => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / 1400, 1);
        el.textContent = Math.floor(end * (1 - Math.pow(1 - p, 3))).toLocaleString('pt-BR');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  document.title = document.title || pageContent.general.pageTitle;
})();

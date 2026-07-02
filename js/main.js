// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu after clicking a link (mobile)
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Voor & Na slider (toont meerdere foto's naast elkaar, schuift per stap)
const sliderTrack = document.getElementById('sliderTrack');
if (sliderTrack) {
  const viewport = sliderTrack.parentElement;
  const slides = Array.from(sliderTrack.querySelectorAll('.slide'));
  const dotsWrap = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let stopIndex = 0;
  let stops = [0];

  function computeStops() {
    const gap = 18;
    const viewportWidth = viewport.clientWidth;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const trackWidth = slides.length * slideWidth + (slides.length - 1) * gap;
    const maxScroll = Math.max(0, trackWidth - viewportWidth);
    const step = slideWidth + gap;
    stops = [0];
    let pos = step;
    while (pos < maxScroll) {
      stops.push(pos);
      pos += step;
    }
    if (maxScroll > 0) stops.push(maxScroll);
    stopIndex = Math.min(stopIndex, stops.length - 1);
    renderDots();
    applyPosition();
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    stops.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === stopIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Ga naar positie ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function applyPosition() {
    sliderTrack.style.transform = `translateX(-${stops[stopIndex]}px)`;
    dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === stopIndex));
    prevBtn.disabled = stopIndex === 0;
    nextBtn.disabled = stopIndex === stops.length - 1;
  }

  function goTo(index) {
    stopIndex = Math.max(0, Math.min(index, stops.length - 1));
    applyPosition();
  }

  prevBtn.addEventListener('click', () => goTo(stopIndex - 1));
  nextBtn.addEventListener('click', () => goTo(stopIndex + 1));
  window.addEventListener('resize', computeStops);

  // Swipe support
  let startX = 0;
  sliderTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  sliderTrack.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 40) goTo(stopIndex - 1);
    else if (diff < -40) goTo(stopIndex + 1);
  });

  // Wait for images to load so widths are accurate
  window.addEventListener('load', computeStops);
  computeStops();
}

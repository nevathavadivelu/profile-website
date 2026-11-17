/* main.js - all interactions. Vanilla ES6+, no libraries. */
document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* 1. Mobile hamburger menu: toggle, and close after a link is clicked */
  const toggle = $('#nav-toggle');
  const links = $('#nav-links');
  const setMenu = (open) => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* 2. Show More / Show Less on timeline milestones */
  $$('.toggle-more').forEach((btn) => {
    btn.addEventListener('click', () => {
      const more = btn.previousElementSibling;
      const open = more.classList.toggle('open');
      btn.textContent = open ? 'Show Less' : 'Show More';
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* 3. Scroll-triggered animations with IntersectionObserver */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible')); // fallback
  }

  /* 4. Family flip cards: click/tap (and keyboard) toggles the flip */
  $$('.flip').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  /* 6. Footer: automatic copyright year + back-to-top */
  $('#year').textContent = new Date().getFullYear();
  $('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

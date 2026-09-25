document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  const navLinks = document.querySelectorAll('#mainNav .nav-link');
  const navCollapseEl = document.getElementById('mainNav');
  const filterButtons = document.querySelectorAll('#program-filters .pill-btn');
  const programItems = document.querySelectorAll('.program-item');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMessage = document.getElementById('newsletterMessage');

  // Shadow on the header + show/hide back-to-top button while scrolling.
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Nav link active state + auto-close the mobile menu after choosing a link.
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');

      if (navCollapseEl.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapseEl).hide();
      }
    });
  });

  // Program category filtering — filters the visible cards, not just the pill style.
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      programItems.forEach((item) => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('d-none', !matches);
      });
    });
  });

  // Back-to-top button.
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Reveal sections as they scroll into view.
  const revealTargets = document.querySelectorAll(
    '.section-heading-block, .program-card, .feature-card, .journey-card, .testimonial-card, .experience-visual, .stat-number'
  );

  revealTargets.forEach((element) => element.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((element) => revealObserver.observe(element));

  // Newsletter form feedback (no backend — just confirms the input).
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = document.getElementById('emailInput').value.trim();

      if (!email) {
        newsletterMessage.textContent = 'Please enter your email.';
        return;
      }

      newsletterMessage.textContent = "Thanks — you're on the list.";
      newsletterForm.reset();
    });
  }
});

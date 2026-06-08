/* ----- Mobile nav toggle ----- */
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    /* Close nav when a link is clicked on mobile */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    /* ----- Scroll reveal ----- */
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));

    /* ----- Nav active state on scroll ----- */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navAnchors.forEach(a => {
              a.style.color = '';
              a.style.background = '';
            });
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) {
              active.style.color = 'var(--accent)';
              active.style.background = 'var(--accent-light)';
            }
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => sectionObserver.observe(s));

    /* ----- Contact form (demo) ----- */
    const form   = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      /* Basic validation */
      if (!name || !email || !message) {
        status.className = 'form-status error';
        status.textContent = 'Please fill in all fields before sending.';
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.className = 'form-status error';
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      /* Simulate successful send */
      status.className = 'form-status success';
      status.textContent = `Thanks, ${name}! Your message has been sent. I'll be in touch shortly.`;
      form.reset();
    });
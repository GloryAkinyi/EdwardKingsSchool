/**
 * Edward Kings Academy - Premium Interactions
 * Handles animations, sticky navbar, mobile menus, statistic counters,
 * pathways filtering, and contact form operations.
 */

(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
      const selectBody = document.querySelector('body');
      const selectHeader = document.querySelector('#header');
      if (!selectHeader) return;
      if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
      window.scrollY > 50 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToggle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
        mobileNavToggleBtn.classList.toggle('fa-bars');
        mobileNavToggleBtn.classList.toggle('fa-xmark');
      }
    }
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    }

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('.navmenu a').forEach(navmenuLink => {
      navmenuLink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToggle();
        }
      });
    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.style.opacity = '0';
          setTimeout(() => {
            preloader.remove();
          }, 600);
        }, 300);
      });
    }

    /**
     * Scroll top button
     */
    const scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }

    /**
     * Animation on scroll function and init (AOS)
     */
    function aosInit() {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
    }
    window.addEventListener('load', aosInit);

    /**
     * Initiate Pure Counter
     */
    function initPureCounter() {
      if (typeof PureCounter !== 'undefined') {
        new PureCounter();
      } else {
        // Fallback simple purecounter implementation if library is slow to load
        const counters = document.querySelectorAll('.purecounter');
        const speed = 200;

        counters.forEach(counter => {
          const animate = () => {
            const target = +counter.getAttribute('data-purecounter-end') || 0;
            const start = +counter.getAttribute('data-purecounter-start') || 0;
            const current = +counter.innerText;
            const increment = Math.ceil(target / speed);

            if (current < target) {
              counter.innerText = current + increment > target ? target : current + increment;
              setTimeout(animate, 10);
            } else {
              counter.innerText = target;
            }
          };
          
          // Trigger when visible
          const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              animate();
              observer.disconnect();
            }
          });
          observer.observe(counter);
        });
      }
    }
    window.addEventListener('load', initPureCounter);

    /**
     * Init isotope layout and filters
     */
    function initIsotope() {
      const isotopeLayouts = document.querySelectorAll('.isotope-layout');
      if (isotopeLayouts.length > 0 && typeof Isotope !== 'undefined') {
        isotopeLayouts.forEach(function(isotopeItem) {
          let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
          let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
          let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

          let initIsotope;
          const container = isotopeItem.querySelector('.isotope-container');
          if (!container) return;

          if (typeof imagesLoaded !== 'undefined') {
            imagesLoaded(container, function() {
              initIsotope = new Isotope(container, {
                itemSelector: '.isotope-item',
                layoutMode: layout,
                filter: filter,
                sortBy: sort
              });
            });
          } else {
            initIsotope = new Isotope(container, {
              itemSelector: '.isotope-item',
              layoutMode: layout,
              filter: filter,
              sortBy: sort
            });
          }

          isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filterBtn) {
            filterBtn.addEventListener('click', function() {
              const activeFilter = isotopeItem.querySelector('.isotope-filters .filter-active');
              if (activeFilter) activeFilter.classList.remove('filter-active');
              this.classList.add('filter-active');
              if (initIsotope) {
                initIsotope.arrange({
                  filter: this.getAttribute('data-filter')
                });
              }
              aosInit();
            }, false);
          });
        });
      }
    }
    window.addEventListener('load', initIsotope);

    /**
     * Initiate GLightbox (for video, photos)
     */
    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox'
      });
    }

    /**
     * Contact Form Submission Animation
     */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing Inquiry...';
        btn.disabled = true;

        // Simulate form submit endpoint
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent Successfully!';
          btn.style.backgroundColor = '#28a745';
          btn.style.borderColor = '#28a745';
          contactForm.reset();
          
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
            btn.style.borderColor = '';
            btn.disabled = false;
          }, 4000);
        }, 1500);
      });
    }

  });
})();

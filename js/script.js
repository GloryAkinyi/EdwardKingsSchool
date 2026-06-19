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

    /**
     * Alumni Spotlight Video — Play Button Interaction
     * Plays local HTML5 video and hides overlay.
     */
    (function initAlumniVideo() {
      const overlay = document.getElementById('videoOverlay');
      const playBtn = document.getElementById('playBtn');
      const video  = document.getElementById('alumniVideoNative');

      if (!overlay || !playBtn || !video) return;

      var activated = false;

      function activateVideo() {
        if (activated) return;
        activated = true;

        // Fade out the overlay
        overlay.classList.add('hidden');

        // Play the native video
        video.play();
      }

      // Click anywhere on the overlay or press Enter/Space on the play button
      overlay.addEventListener('click', activateVideo);
      playBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateVideo();
        }
      });
    })();

    /**
     * Init swiper sliders
     */
    function initSwiper() {
      document.querySelectorAll('.init-swiper').forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector('.swiper-config').innerHTML.trim()
        );
        new Swiper(swiperElement, config);
      });
    }
    window.addEventListener('load', initSwiper);

    /**
     * ============================================================
     * Academic Hall of Fame — Top Students Showcase
     * ============================================================
     * Strategy: Students scoring 350+ (out of 500) are "Star Performers"
     * shown with radial score rings and exact marks.
     * Students 250-349 are shown with letter-grade badges (A, B+, etc.)
     * instead of raw scores — elegant and parent-friendly.
     * ============================================================
     */
    (function initHallOfFame() {
      const grid = document.getElementById('hofStudentsGrid');
      const summaryEl = document.getElementById('hofYearSummary');
      const tabContainer = document.getElementById('hofYearTabs');
      const chartContainer = document.getElementById('hofTrendChart');

      if (!grid || !tabContainer) return;

      // ── Top Students Data (KCPE marks out of 500) ──
      // Actual student records from Edward Kings Academy
      const studentsData = {
        2023: {
          students: [
            { name: 'Gitonga Alex Mutharimi', marks: 382, secondary: 'Kabianga Boys High' },
            { name: 'Mwakoma John Madundu', marks: 376, secondary: 'Kwale Boys High' }
          ]
        },
        2022: {
          students: [
            { name: 'Ouma Gift Derrick', marks: 400, secondary: 'Mbita Boys High' },
            { name: 'Enock Mulungwa', marks: 395, secondary: 'Kitui Boys High' },
            { name: 'Timothy Mutuku', marks: 392, secondary: 'Lenana Boys High' },
            { name: 'Mwembe Mwero', marks: 389, secondary: 'Kisumu Girls High' },
            { name: 'Stephen Kivoi', marks: 366, secondary: 'Orero Boys High' }
          ]
        },
        2021: {
          students: [
            { name: 'Ongera Clein', marks: 392, secondary: 'St Joseph Kitale Boys' },
            { name: 'Kaingu Ruth', marks: 390, secondary: 'Lugulu Girls High' },
            { name: 'Mwembe Karauki', marks: 386, secondary: 'Kisumu Girls High' }
          ]
        },
        2020: {
          students: [
            { name: 'Omoto Fidel', marks: 395, secondary: 'St. Antony Kitale' },
            { name: 'Salim Mbeyu', marks: 392, secondary: 'Bura Girls High' },
            { name: 'Mwachoki Denis', marks: 384, secondary: 'Kenyatta Mwatate High' }
          ]
        },
        2019: {
          students: [
            { name: 'Obed Onano', marks: 417, secondary: 'Alliance Boys High' },
            { name: 'Rajab Sumeiya', marks: 397, secondary: 'Kipsigis Girls' },
            { name: 'Charles Onyiego Maroa', marks: 395, secondary: 'St Joseph Kitale Boys' },
            { name: 'Joy Marlyne Owino', marks: 392, secondary: 'Asumbi Girls High' },
            { name: 'Apudo Josphine', marks: 392, secondary: 'Asumbi Girls High' },
            { name: 'Ibrahim Walid', marks: 391, secondary: 'Orero Boys High' },
            { name: 'Musanzu Furaha', marks: 388, secondary: 'Kakamega High' }
          ]
        },
        2018: {
          students: [
            { name: 'Omar Neema', marks: 407, secondary: 'Kathiani Girls High' },
            { name: 'Lydia Kerubo', marks: 397, secondary: 'Kisumu Girls High' }
          ]
        },
        2017: {
          students: [
            { name: 'Phillimon Thoya', marks: 414, secondary: 'Maseno High' },
            { name: 'Gogo Martin Kiti', marks: 394, secondary: 'Kwale Boys High' },
            { name: 'Njenga George', marks: 392, secondary: 'Kanunga Boys High' },
            { name: 'Onyango Evans', marks: 392, secondary: 'Kanyawanga High' },
            { name: 'Mnjala Harun Mwadime', marks: 375, secondary: 'Kenyatta Mwatate High' }
          ]
        },
        2016: {
          students: [
            { name: 'Ouma Cliff Kerry', marks: 419, secondary: 'Kapsabet Boys High' },
            { name: 'Eric Ombogo', marks: 395, secondary: 'St Joseph Kitale Boys' },
            { name: 'Mustafa Shufaa', marks: 377, secondary: 'Nyakach Girls High' }
          ]
        },
        2015: {
          students: [
            { name: 'John Mokaya', marks: 395, secondary: 'Agoro Sare High' }
          ]
        },
        2014: {
          students: [
            { name: 'Milton Omondi', marks: 423, secondary: 'Friends Kamusinga' },
            { name: 'Hamisi Charo', marks: 413, secondary: 'Kakamega High' },
            { name: 'Dalmas Kemoet', marks: 407, secondary: 'JCC Complex' }
          ]
        },
        2013: {
          students: [
            { name: 'Glory Akinyi Okoth', marks: 383, secondary: 'St Alberts Ulanda' }
          ]
        },
        2012: {
          students: [
            { name: 'Umazi Mwembe', marks: 353, secondary: '' }
          ]
        }
      };

      // Star threshold: students at or above this get the full score ring
      var STAR_THRESHOLD = 350;

      /**
       * Get a letter grade from marks (used for non-star performers)
       */
      function getGrade(marks) {
        if (marks >= 400) return { letter: 'A', label: 'Excellent' };
        if (marks >= 350) return { letter: 'A-', label: 'Distinction' };
        if (marks >= 300) return { letter: 'B+', label: 'Above Avg' };
        if (marks >= 250) return { letter: 'B', label: 'Average' };
        return { letter: 'B', label: 'Merit' };
      }

      /**
       * Create SVG radial score ring (for star performers)
       */
      function createScoreRing(marks) {
        var pct = marks / 500;
        var circumference = 2 * Math.PI * 40; // r=40
        var offset = circumference * (1 - pct);

        return '<div class="hof-score-ring">' +
          '<svg viewBox="0 0 90 90">' +
            '<circle class="ring-bg" cx="45" cy="45" r="40"></circle>' +
            '<circle class="ring-fill" cx="45" cy="45" r="40" data-offset="' + offset + '"></circle>' +
          '</svg>' +
          '<div class="score-text">' + marks + '<small>/ 500</small></div>' +
        '</div>';
      }

      /**
       * Create grade badge (for non-star performers)
       */
      function createGradeBadge(marks) {
        var grade = getGrade(marks);
        return '<div class="hof-grade-badge">' +
          '<span class="grade-letter">' + grade.letter + '</span>' +
          '<span class="grade-label">' + grade.label + '</span>' +
        '</div>';
      }

      /**
       * Render student cards for a given year
       */
      function renderYear(year) {
        var data = studentsData[year];
        if (!data) return;

        // Build cards HTML
        var html = '';
        data.students.forEach(function(student) {
          var isStar = student.marks >= STAR_THRESHOLD;
          var schoolHtml = student.secondary
            ? '<div class="hof-student-secondary"><i class="bi bi-mortarboard-fill"></i> ' + student.secondary + '</div>'
            : '';
          html += '<div class="hof-student-card' + (isStar ? ' star-performer' : '') + '">';
          html += isStar ? createScoreRing(student.marks) : createGradeBadge(student.marks);
          html += '<div class="hof-student-name">' + student.name + '</div>';
          html += schoolHtml;
          html += '</div>';
        });
        grid.innerHTML = html;

        // Animate radial rings after render
        requestAnimationFrame(function() {
          setTimeout(function() {
            var rings = grid.querySelectorAll('.ring-fill');
            rings.forEach(function(ring) {
              ring.style.strokeDashoffset = ring.getAttribute('data-offset');
            });
          }, 100);
        });

        // Build summary — auto-calculate from listed students
        var marks = data.students.map(function(s) { return s.marks; });
        var topScore = Math.max.apply(null, marks);
        var totalStudents = marks.length;

        if (summaryEl) {
          summaryEl.innerHTML =
            '<div class="hof-summary-item">' +
              '<div class="hof-summary-value">' + topScore + '</div>' +
              '<div class="hof-summary-label">Top Score</div>' +
            '</div>' +
            '<div class="hof-summary-item">' +
              '<div class="hof-summary-value">' + totalStudents + '</div>' +
              '<div class="hof-summary-label">Top Students</div>' +
            '</div>';
        }
      }

      /**
       * Tab Click Handlers
       */
      tabContainer.querySelectorAll('.hof-year-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
          tabContainer.querySelector('.active').classList.remove('active');
          this.classList.add('active');
          renderYear(this.getAttribute('data-year'));
        });
      });

      /**
       * Render Trend Chart (SVG line chart)
       * Shows the top score per year
       */
      function renderTrendChart() {
        if (!chartContainer) return;

        var years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
        var scores = years.map(function(y) {
          var marks = studentsData[y].students.map(function(s) { return s.marks; });
          return Math.max.apply(null, marks);
        });

        var svgW = 600;
        var svgH = 200;
        var padL = 40;
        var padR = 30;
        var padT = 35;
        var padB = 35;
        var chartW = svgW - padL - padR;
        var chartH = svgH - padT - padB;

        var minScore = Math.min.apply(null, scores) - 20;
        var maxScore = Math.max.apply(null, scores) + 20;

        function xPos(i) { return padL + (i / (years.length - 1)) * chartW; }
        function yPos(v) { return padT + chartH - ((v - minScore) / (maxScore - minScore)) * chartH; }

        // Build SVG
        var svg = '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" preserveAspectRatio="xMidYMid meet">';

        // Gradient definition
        svg += '<defs><linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#D4AF37" stop-opacity="0.4"/>' +
          '<stop offset="100%" stop-color="#D4AF37" stop-opacity="0.02"/>' +
          '</linearGradient></defs>';

        // Grid lines
        for (var g = 0; g < 4; g++) {
          var gy = padT + (g / 3) * chartH;
          svg += '<line class="chart-grid-line" x1="' + padL + '" y1="' + gy + '" x2="' + (svgW - padR) + '" y2="' + gy + '"/>';
        }

        // Area fill
        var areaPath = 'M' + xPos(0) + ',' + yPos(scores[0]);
        for (var a = 1; a < scores.length; a++) {
          areaPath += ' L' + xPos(a) + ',' + yPos(scores[a]);
        }
        areaPath += ' L' + xPos(scores.length - 1) + ',' + (padT + chartH);
        areaPath += ' L' + xPos(0) + ',' + (padT + chartH) + ' Z';
        svg += '<path class="chart-area" d="' + areaPath + '"/>';

        // Line
        var linePath = 'M' + xPos(0) + ',' + yPos(scores[0]);
        for (var l = 1; l < scores.length; l++) {
          linePath += ' L' + xPos(l) + ',' + yPos(scores[l]);
        }
        svg += '<path class="chart-line" d="' + linePath + '"/>';

        // Dots, labels, values
        for (var d = 0; d < years.length; d++) {
          var cx = xPos(d);
          var cy = yPos(scores[d]);
          svg += '<circle class="chart-dot" cx="' + cx + '" cy="' + cy + '" r="5"/>';
          svg += '<text class="chart-value" x="' + cx + '" y="' + (cy - 12) + '">' + scores[d] + '</text>';
          // Show short year labels (e.g. '12, '14...)
          svg += '<text class="chart-label" x="' + cx + '" y="' + (svgH - 8) + '">\'' + String(years[d]).slice(2) + '</text>';
        }

        svg += '</svg>';
        chartContainer.innerHTML = svg;
      }

      // Initial render
      renderYear('2023');
      renderTrendChart();

    })();

  });
})();


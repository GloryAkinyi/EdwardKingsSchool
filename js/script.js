/**
 * Edward Kings Academy - Premium Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const brandText = document.querySelector('.scrolled-dark');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (brandText) {
                brandText.classList.remove('text-white');
                brandText.classList.add('text-dark');
            }
        } else {
            navbar.classList.remove('scrolled');
            if (brandText) {
                brandText.classList.add('text-white');
                brandText.classList.remove('text-dark');
            }
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navCollapse = document.getElementById('navbarNav');
                if (navCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Form submission animation (placeholder)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Inquiry Sent';
                btn.classList.replace('btn-admission', 'btn-success');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-success', 'btn-admission');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Parallax effect for hero (subtle)
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if (hero) {
            const scroll = window.pageYOffset;
            hero.style.backgroundPositionY = (scroll * 0.5) + 'px';
        }
    });
});

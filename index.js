document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    // Animated Numbers Counter 
    const statNumbers = document.querySelectorAll('.hero-stats h3');

    function runCounter() {
        statNumbers.forEach(counter => {
            const targetText = counter.textContent;
            const target = parseFloat(targetText);
            const isFloat = targetText.includes('.');
            const hasPlus = targetText.includes('+');
            const hasPercent = targetText.includes('%');
            
            let count = 0;
            const speed = 50; 
            const increment = target / 40;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = isFloat ? count.toFixed(1) : Math.floor(count);
                    if (hasPlus) counter.textContent += '+';
                    if (hasPercent) counter.textContent += '%';
                    setTimeout(updateCount, speed);
                } else {
                    counter.textContent = targetText; 
                }
            };
            updateCount();
        });
    }
    
    if (statNumbers.length > 0) {
        runCounter();
    }

    // Scroll Reveal
    const animatedElements = document.querySelectorAll('.timeline-item, .skills-box, .project-card, .service-card, .reveal-element');

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element', 'show');
            
                const progressSpans = entry.target.querySelectorAll('.progress-line span');
                progressSpans.forEach(span => {
                    const targetWidth = span.getAttribute('data-width');
                    if (targetWidth) {
                        span.style.width = targetWidth;
                    }
                });

                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));

    // Scroll to Top Button 
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);

    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        padding: '12px 15px',
        fontSize: '16px',
        backgroundColor: '#38bdf8',
        color: '#0f172a',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: '1000',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease'
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Sticky Navbar 
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled-nav');
            } else {
                header.classList.remove('scrolled-nav');
            }
        });
    }

});
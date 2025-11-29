// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Slide-style scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-slide');
    let currentSection = 0;

    // Initialize sections
    sections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('fade-in');
            section.classList.remove('fade-out');
        } else {
            section.classList.add('fade-out');
            section.classList.remove('fade-in');
        }
    });

    // Handle scroll for slide transitions
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        isScrolling = true;

        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + (sectionHeight / 2);
            const scrollCenter = scrollPosition + (windowHeight / 2);

            // Check if section is in viewport center
            if (scrollCenter >= sectionTop && scrollCenter < sectionTop + sectionHeight) {
                // Fade in current section
                section.classList.remove('fade-out');
                section.classList.add('fade-in');
                currentSection = index;

                // Fade out other sections
                sections.forEach((otherSection, otherIndex) => {
                    if (otherIndex !== index) {
                        otherSection.classList.remove('fade-in');
                        otherSection.classList.add('fade-out');
                    }
                });
            }
        });

        setTimeout(() => {
            isScrolling = false;
        }, 100);
    });

    // Initialize Values Section Animations
    const valuesHeader = document.querySelector('.values-header');
    const valuesWheel = document.querySelector('.values-wheel');

    if (valuesHeader && valuesWheel) {
        const valuesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === valuesHeader) {
                        setTimeout(() => {
                            valuesHeader.classList.add('fade-in');
                        }, 200);
                    }
                    if (entry.target === valuesWheel) {
                        setTimeout(() => {
                            valuesWheel.classList.add('fade-in');
                        }, 400);
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        valuesObserver.observe(valuesHeader);
        valuesObserver.observe(valuesWheel);
    }

    // Add fade-in animation on scroll for other elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in effect
    const animatedElements = document.querySelectorAll('.fade-in:not(.section-slide)');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

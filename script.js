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

// Navbar scroll effect - Optimized with requestAnimationFrame
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let navbarTicking = false;

const updateNavbar = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
    navbarTicking = false;
};

window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(updateNavbar);
        navbarTicking = true;
    }
}, { passive: true });

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

// Slide-style scroll animations - Optimized for performance
document.addEventListener('DOMContentLoaded', () => {
    // Use requestAnimationFrame for better performance
    let ticking = false;
    const sections = document.querySelectorAll('.section-slide');
    let currentSection = 0;

    // Initialize sections with minimal DOM manipulation
    if (sections.length > 0) {
        const firstSection = sections[0];
        firstSection.classList.add('fade-in');
        firstSection.classList.remove('fade-out');
        
        // Defer other sections initialization
        requestAnimationFrame(() => {
            for (let i = 1; i < sections.length; i++) {
                sections[i].classList.add('fade-out');
                sections[i].classList.remove('fade-in');
            }
        });
    }

    // Optimized scroll handler with requestAnimationFrame
    const handleScroll = () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + (sectionHeight / 2);
            const scrollCenter = scrollPosition + (windowHeight / 2);

            // Check if section is in viewport center
            if (scrollCenter >= sectionTop && scrollCenter < sectionTop + sectionHeight) {
                if (currentSection !== i) {
                    // Fade in current section
                    section.classList.remove('fade-out');
                    section.classList.add('fade-in');
                    
                    // Fade out previous section
                    if (sections[currentSection]) {
                        sections[currentSection].classList.remove('fade-in');
                        sections[currentSection].classList.add('fade-out');
                    }
                    
                    currentSection = i;
                }
                break; // Exit early once we find the active section
            }
        }
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });


    // About Section Animations
    const aboutSection = document.querySelector('.about-section');
    const aboutHeader = document.querySelector('.about-header');
    const aboutCards = document.querySelectorAll('.about-card');
    const aboutText = document.querySelector('.about-text');
    const aboutFeatures = document.querySelector('.about-features');

    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate header
                    if (aboutHeader) {
                        setTimeout(() => {
                            aboutHeader.classList.add('fade-in');
                        }, 200);
                    }

                    // Animate cards with stagger
                    if (aboutCards.length > 0) {
                        aboutCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, 400 + (index * 150));
                        });
                    }

                    // Animate description sections
                    if (aboutText) {
                        setTimeout(() => {
                            aboutText.classList.add('fade-in');
                        }, 800);
                    }

                    if (aboutFeatures) {
                        setTimeout(() => {
                            aboutFeatures.classList.add('fade-in');
                        }, 1000);
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        aboutObserver.observe(aboutSection);
    }

    // Why Choose Us Section Animations
    const whyChooseSection = document.querySelector('.why-choose-section');
    const whyChooseHeader = document.querySelector('.why-choose-header');
    const whyCards = document.querySelectorAll('.why-card, .why-stat-card');
    const whyStatNumbers = document.querySelectorAll('.why-stat-number');

    if (whyChooseSection) {
        const whyChooseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate header
                    if (whyChooseHeader) {
                        setTimeout(() => {
                            whyChooseHeader.classList.add('fade-in');
                        }, 200);
                    }

                    // Animate cards with stagger effect
                    if (whyCards.length > 0) {
                        whyCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, 400 + (index * 100));
                        });
                    }

                    // Number count-up effect for stats
                    if (whyStatNumbers.length > 0) {
                        whyStatNumbers.forEach(stat => {
                            const target = parseInt(stat.getAttribute('data-target'), 10);
                            if (isNaN(target)) return;

                            // Avoid re-animating if already done
                            if (stat.dataset.animated === 'true') return;
                            stat.dataset.animated = 'true';

                            const suffix = stat.textContent.replace(/[0-9]/g, '') || '+';
                            const duration = 1500;
                            const startTime = performance.now();

                            const animate = (currentTime) => {
                                const elapsed = currentTime - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                                const currentValue = Math.floor(eased * target);
                                stat.textContent = `${currentValue}${suffix}`;

                                if (progress < 1) {
                                    requestAnimationFrame(animate);
                                } else {
                                    stat.textContent = `${target}${suffix}`;
                                }
                            };

                            requestAnimationFrame(animate);
                        });
                    }
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        whyChooseObserver.observe(whyChooseSection);
    }

    // Products Section Animations
    const productsSection = document.querySelector('.products-section');
    const productCards = document.querySelectorAll('.product-card');

    if (productsSection) {
        const productsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate product cards with stagger effect
                    if (productCards.length > 0) {
                        productCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in');
                            }, 200 + (index * 100));
                        });
                    }
                    productsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });

        productsObserver.observe(productsSection);
    }

    // Defer non-critical animations to improve initial load
    requestAnimationFrame(() => {
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
                    observer.unobserve(entry.target); // Stop observing once animated
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
});

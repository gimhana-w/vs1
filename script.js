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

    // Parallax Effect - Center Wheel Icon Moves Down to Focus on About Section
    const centerWheel = document.querySelector('.wheel-center');
    const aboutSection = document.querySelector('.about-section');
    const valuesSection = document.querySelector('.values-section');

    if (centerWheel && aboutSection && valuesSection) {
        let isParallaxActive = false;

        // Function to handle parallax scroll
        const handleParallaxScroll = () => {
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const valuesSectionBottom = valuesSection.offsetTop + valuesSection.offsetHeight;
            const aboutSectionTop = aboutSection.offsetTop;
            const aboutSectionHeight = aboutSection.offsetHeight;

            // Calculate when to start parallax (when About section starts coming into view)
            const parallaxStartPoint = valuesSectionBottom - windowHeight * 0.5;
            const parallaxEndPoint = aboutSectionTop + aboutSectionHeight * 0.3;

            if (scrollPosition >= parallaxStartPoint && scrollPosition <= parallaxEndPoint) {
                if (!isParallaxActive) {
                    isParallaxActive = true;
                    centerWheel.classList.add('parallax-active');
                }

                // Calculate progress (0 to 1) between start and end points
                const progress = Math.min(1, (scrollPosition - parallaxStartPoint) / (parallaxEndPoint - parallaxStartPoint));
                
                // Move the wheel down gradually (max 300px down)
                const moveDistance = progress * 300;
                centerWheel.style.transform = `translate(-50%, calc(-50% + ${moveDistance}px))`;

                // Scale down slightly as it moves
                const scale = 1 - (progress * 0.2);
                centerWheel.style.transform += ` scale(${scale})`;

            } else if (scrollPosition > parallaxEndPoint) {
                // Keep it moved when fully in About section
                if (isParallaxActive) {
                    centerWheel.classList.add('parallax-move');
                }
            } else {
                // Reset when scrolling back up
                if (isParallaxActive) {
                    isParallaxActive = false;
                    centerWheel.classList.remove('parallax-active', 'parallax-move');
                    centerWheel.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            }
        };

        // Listen to scroll events
        window.addEventListener('scroll', handleParallaxScroll, { passive: true });
        handleParallaxScroll(); // Initial check
    }

    // About Section Animations
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
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });

        whyChooseObserver.observe(whyChooseSection);
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

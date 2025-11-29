// ============================================
// Hero Slider Functionality
// ============================================

let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
const heroSection = document.querySelector('.hero');

// Set fixed height based on first slide
function setHeroHeight() {
    if (slides.length > 0 && heroSection) {
        const firstSlide = slides[0];
        
        // Get the active slide (should be first slide on initial load)
        const activeSlide = document.querySelector('.hero-slide.active') || firstSlide;
        
        // Measure the height of the active slide
        const slideHeight = activeSlide.offsetHeight;
        
        // Set the hero section height to match
        if (slideHeight > 0) {
            heroSection.style.height = slideHeight + 'px';
        }
    }
}

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
}

function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    clearInterval(slideInterval);
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopAutoPlay();
        startAutoPlay(); // Restart autoplay after manual navigation
    });
});

// Pause autoplay on hover
if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
}

// Initialize slider
if (slides.length > 0) {
    showSlide(0);
    startAutoPlay();
    
    // Set height after first slide is shown and rendered
    setTimeout(() => {
        setHeroHeight();
    }, 500);
}

// Set height on load and resize
window.addEventListener('load', () => {
    setTimeout(setHeroHeight, 600);
});

window.addEventListener('resize', () => {
    setTimeout(setHeroHeight, 100);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    }
});

// ============================================
// Mobile Navigation Toggle
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================

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

// ============================================
// Active Navigation Link on Scroll
// ============================================

const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Intersection Observer for Animations
// ============================================

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

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.modern-benefit, .value-card, .service-card, .product-card, .news-card, .feature-item, .about-feature-card, .vision-card, .mission-card, .about-text-card'
);

// ============================================
// Service Cards Enhanced Interactivity
// ============================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Add click interaction
    card.addEventListener('click', () => {
        // Remove active class from all cards
        serviceCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
    });
    
    // Add keyboard navigation support
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// Newsletter Form Submission
// ============================================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            newsletterForm.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// ============================================
// Contact Form Submission
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// ============================================
// Counter Animation for Stats
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target);
        }
    });
}, { threshold: 0.5 });

const statNumbers = document.querySelectorAll('.stat-item h3, .map-stat-item h3');
statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// ============================================
// Lazy Loading Images (if images are added later)
// ============================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// Back to Top Button (Optional Enhancement)
// ============================================

// Create back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #bb141a;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-5px)';
    backToTopButton.style.background = '#9a1015';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.background = '#bb141a';
});

// ============================================
// Initialize on DOM Load
// ============================================

// ============================================
// Initialize on DOM Load
// ============================================

// ============================================
// Partners Map Interactivity
// ============================================

const regionMarkers = document.querySelectorAll('.region-marker');
const regionData = {
    '01': { name: 'Northern', count: '10+', fullName: 'Northern Province' },
    '02': { name: 'North western', count: '20+', fullName: 'North Western Province' },
    '03': { name: 'western', count: '80+', fullName: 'Western Province' },
    '04': { name: 'Southern', count: '20+', fullName: 'Southern Province' },
    '05': { name: 'sabaragamuwa', count: '15+', fullName: 'Sabaragamuwa Province' },
    '06': { name: 'Uva', count: '10+', fullName: 'Uva Province' },
    '07': { name: 'Central', count: '20+', fullName: 'Central Province' },
    '08': { name: 'Eastern', count: '10+', fullName: 'Eastern Province' },
    '09': { name: 'North central', count: '10+', fullName: 'North Central Province' }
};

regionMarkers.forEach(marker => {
    const regionId = marker.getAttribute('data-region');
    const data = regionData[regionId];
    
    // Add click event
    marker.addEventListener('click', () => {
        // Remove active class from all markers
        regionMarkers.forEach(m => m.classList.remove('active'));
        // Add active class to clicked marker
        marker.classList.add('active');
        
        // Optional: Show a tooltip or info card
        console.log(`Selected: ${data.fullName} - ${data.count} Partners`);
    });
    
    // Add hover sound effect (optional - can be removed)
    marker.addEventListener('mouseenter', () => {
        marker.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    // Animate markers on page load
    setTimeout(() => {
        marker.style.opacity = '0';
        marker.style.transform = 'scale(0.5)';
        marker.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            marker.style.opacity = '1';
            marker.style.transform = 'scale(1)';
        }, parseInt(regionId) * 100);
    }, 500);
});

// Add pulse animation to markers
setInterval(() => {
    regionMarkers.forEach((marker, index) => {
        setTimeout(() => {
            const circle = marker.querySelector('.marker-circle');
            if (circle && !marker.matches(':hover')) {
                circle.style.animation = 'pulse 2s ease-in-out';
                setTimeout(() => {
                    circle.style.animation = '';
                }, 2000);
            }
        }, index * 200);
    });
}, 8000);

// Add CSS animation for pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5);
        }
        50% {
            box-shadow: 0 4px 25px rgba(187, 20, 26, 0.4), 0 0 30px rgba(255, 255, 255, 0.7);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Wave Canvas Animation Background
// ============================================

class WaveAnimation {
    constructor() {
        this.canvas = document.getElementById('wave-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        this.time = 0;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createWaves();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createWaves() {
        this.waves = [
            {
                amplitude: 30,
                frequency: 0.01,
                speed: 0.02,
                color: 'rgba(255, 255, 255, 0.1)',
                yOffset: this.canvas.height * 0.3
            },
            {
                amplitude: 40,
                frequency: 0.015,
                speed: 0.015,
                color: 'rgba(187, 20, 26, 0.15)',
                yOffset: this.canvas.height * 0.5
            },
            {
                amplitude: 35,
                frequency: 0.012,
                speed: 0.025,
                color: 'rgba(1, 61, 101, 0.12)',
                yOffset: this.canvas.height * 0.7
            }
        ];
    }
    
    drawWave(wave) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, wave.yOffset);
        
        for (let x = 0; x < this.canvas.width; x += 2) {
            const y = wave.yOffset + 
                Math.sin(x * wave.frequency + this.time * wave.speed) * wave.amplitude;
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(0, wave.yOffset - wave.amplitude, 0, this.canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawOrbs() {
        const orbCount = 15;
        for (let i = 0; i < orbCount; i++) {
            const x = (this.canvas.width / orbCount) * i + Math.sin(this.time * 0.01 + i) * 50;
            const y = this.canvas.height * 0.5 + Math.cos(this.time * 0.015 + i) * 100;
            const radius = 3 + Math.sin(this.time * 0.02 + i) * 2;
            const opacity = 0.3 + Math.sin(this.time * 0.03 + i) * 0.2;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            const colors = ['#ffffff', '#bb141a', '#013d65'];
            this.ctx.fillStyle = colors[i % colors.length];
            this.ctx.globalAlpha = opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            
            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = colors[i % colors.length];
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.time += 0.5;
        
        // Draw waves
        this.waves.forEach(wave => {
            this.drawWave(wave);
        });
        
        // Draw floating orbs
        this.drawOrbs();
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createWaves();
        });
    }
}

// ============================================
// Wave Animation for Why Choose Us Section
// ============================================

class WaveAnimationSection {
    constructor() {
        this.canvas = document.getElementById('wave-canvas-section');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        this.time = 0;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createWaves();
    }
    
    resize() {
        const section = this.canvas.closest('.value-props');
        if (section) {
            this.canvas.width = section.offsetWidth;
            this.canvas.height = section.offsetHeight;
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = 600;
        }
    }
    
    createWaves() {
        this.waves = [
            {
                amplitude: 25,
                frequency: 0.008,
                speed: 0.018,
                color: 'rgba(255, 255, 255, 0.08)',
                yOffset: this.canvas.height * 0.25
            },
            {
                amplitude: 30,
                frequency: 0.012,
                speed: 0.012,
                color: 'rgba(187, 20, 26, 0.12)',
                yOffset: this.canvas.height * 0.5
            },
            {
                amplitude: 28,
                frequency: 0.01,
                speed: 0.02,
                color: 'rgba(1, 61, 101, 0.1)',
                yOffset: this.canvas.height * 0.75
            }
        ];
    }
    
    drawWave(wave) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, wave.yOffset);
        
        for (let x = 0; x < this.canvas.width; x += 2) {
            const y = wave.yOffset + 
                Math.sin(x * wave.frequency + this.time * wave.speed) * wave.amplitude;
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(0, wave.yOffset - wave.amplitude, 0, this.canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawOrbs() {
        const orbCount = 12;
        for (let i = 0; i < orbCount; i++) {
            const x = (this.canvas.width / orbCount) * i + Math.sin(this.time * 0.008 + i) * 40;
            const y = this.canvas.height * 0.5 + Math.cos(this.time * 0.012 + i) * 80;
            const radius = 2.5 + Math.sin(this.time * 0.018 + i) * 1.5;
            const opacity = 0.25 + Math.sin(this.time * 0.025 + i) * 0.15;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            const colors = ['#ffffff', '#bb141a', '#013d65'];
            this.ctx.fillStyle = colors[i % colors.length];
            this.ctx.globalAlpha = opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            
            // Glow effect
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = colors[i % colors.length];
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.time += 0.4;
        
        // Draw waves
        this.waves.forEach(wave => {
            this.drawWave(wave);
        });
        
        // Draw floating orbs
        this.drawOrbs();
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createWaves();
        });
    }
}

// ============================================
// Wave Animation for Values Section
// ============================================

class WaveAnimationValues {
    constructor() {
        this.canvas = document.getElementById('wave-canvas-values');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        this.time = 0;
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createWaves();
    }
    
    resize() {
        const section = this.canvas.closest('.values');
        if (section) {
            this.canvas.width = section.offsetWidth;
            this.canvas.height = section.offsetHeight;
        } else {
            this.canvas.width = window.innerWidth;
            this.canvas.height = 600;
        }
    }
    
    createWaves() {
        this.waves = [
            {
                amplitude: 25,
                frequency: 0.008,
                speed: 0.018,
                color: 'rgba(255, 255, 255, 0.08)',
                yOffset: this.canvas.height * 0.25
            },
            {
                amplitude: 30,
                frequency: 0.012,
                speed: 0.012,
                color: 'rgba(187, 20, 26, 0.12)',
                yOffset: this.canvas.height * 0.5
            },
            {
                amplitude: 28,
                frequency: 0.01,
                speed: 0.02,
                color: 'rgba(1, 61, 101, 0.1)',
                yOffset: this.canvas.height * 0.75
            }
        ];
    }
    
    drawWave(wave) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, wave.yOffset);
        
        for (let x = 0; x < this.canvas.width; x += 2) {
            const y = wave.yOffset + 
                Math.sin(x * wave.frequency + this.time * wave.speed) * wave.amplitude;
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(0, wave.yOffset - wave.amplitude, 0, this.canvas.height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawOrbs() {
        const orbCount = 12;
        for (let i = 0; i < orbCount; i++) {
            const x = (this.canvas.width / orbCount) * i + Math.sin(this.time * 0.008 + i) * 40;
            const y = this.canvas.height * 0.5 + Math.cos(this.time * 0.012 + i) * 80;
            const radius = 2.5 + Math.sin(this.time * 0.018 + i) * 1.5;
            const opacity = 0.25 + Math.sin(this.time * 0.025 + i) * 0.15;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            const colors = ['#ffffff', '#bb141a', '#013d65'];
            this.ctx.fillStyle = colors[i % colors.length];
            this.ctx.globalAlpha = opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            
            // Glow effect
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = colors[i % colors.length];
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.time += 0.4;
        
        // Draw waves
        this.waves.forEach(wave => {
            this.drawWave(wave);
        });
        
        // Draw floating orbs
        this.drawOrbs();
        
        requestAnimationFrame(() => this.animate());
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createWaves();
        });
    }
}

// ============================================
// Hero Image Slider Functionality
// ============================================

function initImageSlider() {
    const imageSliders = document.querySelectorAll('.image-slider-container');
    
    imageSliders.forEach(container => {
        const slides = container.querySelectorAll('.image-slide');
        const indicators = container.querySelectorAll('.img-indicator');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        let currentImageIndex = 0;
        let imageInterval;
        const totalImages = slides.length;
        
        function showImage(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
            currentImageIndex = index;
        }
        
        function nextImage() {
            const next = (currentImageIndex + 1) % totalImages;
            showImage(next);
        }
        
        function prevImage() {
            const prev = (currentImageIndex - 1 + totalImages) % totalImages;
            showImage(prev);
        }
        
        function startImageAutoPlay() {
            imageInterval = setInterval(nextImage, 4000); // Change image every 4 seconds
        }
        
        function stopImageAutoPlay() {
            clearInterval(imageInterval);
        }
        
        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextImage();
                stopImageAutoPlay();
                startImageAutoPlay();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevImage();
                stopImageAutoPlay();
                startImageAutoPlay();
            });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showImage(index);
                stopImageAutoPlay();
                startImageAutoPlay();
            });
        });
        
        // Pause autoplay on hover
        container.addEventListener('mouseenter', stopImageAutoPlay);
        container.addEventListener('mouseleave', startImageAutoPlay);
        
        // Initialize slider
        if (slides.length > 0) {
            showImage(0);
            startImageAutoPlay();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize main wave animation
    new WaveAnimation();
    
    // Initialize wave animation for Why Choose Us section
    new WaveAnimationSection();
    
    // Initialize wave animation for Values section
    new WaveAnimationValues();
    
    // Set initial active nav link
    activateNavLink();
    
    // Initialize image sliders
    initImageSlider();
});


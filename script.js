// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle hamburger animation
    hamburger.classList.toggle('active');
    
    // Toggle navigation menu
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Scroll-based animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.menu-item, .feature, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial check for elements in viewport
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Check for elements in viewport on scroll
window.addEventListener('scroll', animateOnScroll);

// Active navigation highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Theme Switching
const themeSwitch = document.getElementById('theme-switch');
const htmlElement = document.documentElement;
const themeIcon = themeSwitch.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme switch event listener
themeSwitch.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Menu Slider
const menuSlider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.menu-slide'),
    dots: document.querySelectorAll('.dot'),
    prevBtn: document.querySelector('.prev-btn'),
    nextBtn: document.querySelector('.next-btn'),
    
    init() {
        // Set initial active slide
        this.showSlide(0);
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add dot click events
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showSlide(index));
        });

        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slider = document.querySelector('.menu-slider');
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        // Handle swipe
        this.handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };

        // Auto play
        this.startAutoPlay();
    },
    
    showSlide(index) {
        // Remove all active classes
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        // Add prev class to previous slide
        if (index > 0) {
            this.slides[index - 1].classList.add('prev');
        } else {
            this.slides[this.slides.length - 1].classList.add('prev');
        }
        
        this.currentSlide = index;
    },
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
    },
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
    },
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    menuSlider.init();
});

// Hero Slider
const heroSlider = {
    slides: document.querySelectorAll('.hero-slider .slide'),
    prevBtn: document.querySelector('.prev-slide'),
    nextBtn: document.querySelector('.next-slide'),
    currentSlide: 0,
    slideInterval: null,

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.startAutoPlay();
    },

    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        this.slides[index].classList.add('active');
        
        this.currentSlide = index;
    },

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(next);
        this.resetAutoPlay();
    },

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prev);
        this.resetAutoPlay();
    },

    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    },

    resetAutoPlay() {
        clearInterval(this.slideInterval);
        this.startAutoPlay();
    }
};

// Initialize hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    heroSlider.init();
}); 
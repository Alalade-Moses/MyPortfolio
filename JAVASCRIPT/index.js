// Typewriter Effect
const texts = ['Full Stack Developer', 'React Specialist', 'Wordpress Designer', 'Project Manager',"Business Analyst"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typewriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typewriter, typeSpeed);
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = 80;
        const targetPosition = element.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.remove('active');
    const icon = document.getElementById('mobile-menu-icon');
    icon.className = 'fas fa-bars';
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');

    mobileMenu.classList.toggle('active');

    if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Enhanced scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const elementVisible = 100;

        // Check if element is in viewport
        if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
            element.classList.add('visible');

            // Handle staggered children animations
            if (element.classList.contains('stagger-children')) {
                const children = element.querySelectorAll('.animate-on-scroll');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 150);
                });
            }

            // Handle text reveal animations
            const textElements = element.querySelectorAll('.text-reveal');
            textElements.forEach((textEl, index) => {
                setTimeout(() => {
                    textEl.classList.add('visible');
                }, index * 200);
            });
        }
    });
}

// // // Contact form handling
function handleContactForm() {
//     const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

//     form.addEventListener('submit', function(e) {
//         e.preventDefault();

//         // // Get form data
            const formData = new FormData(form);
            const data = {
             name: formData.get('name'),
             email: formData.get('email'),
             subject: formData.get('subject'),
             message: formData.get('message')
            };

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }

         if (!isValidEmail(data.email)) {
             showFormMessage('Please enter a valid email address', 'error');
             return;
         }

//         // Simulate form submission
       submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

//         // Simulate API call
//         setTimeout(() => {
//             submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
//             submitBtn.classList.add('success');

//             // Reset form
            form.reset();

             // Reset button after 3 seconds
           setTimeout(() => {
               submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                 submitBtn.classList.remove('success');
                 submitBtn.disabled = false;
             }, 3000);
//         }, 2000);
//     });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message helper
function showFormMessage(message, type) {
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    submitBtn.classList.add(type);

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove(type);
    }, 3000);
}

// Enhanced Intersection Observer for scroll animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Add visible class with slight delay for smoother effect
                setTimeout(() => {
                    element.classList.add('visible');
                }, 100);

                // Handle staggered animations for children
                if (element.classList.contains('stagger-children')) {
                    const children = element.querySelectorAll('.animate-on-scroll');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, 200 + (index * 150));
                    });
                }

                // Handle text reveal animations
                const textElements = element.querySelectorAll('.text-reveal');
                textElements.forEach((textEl, index) => {
                    setTimeout(() => {
                        textEl.classList.add('visible');
                    }, 300 + (index * 100));
                });

                // Handle card animations with delay
                if (element.classList.contains('card-animate')) {
                    setTimeout(() => {
                        element.style.transform = 'translateY(0) scale(1)';
                        element.style.opacity = '1';
                    }, 150);
                }

                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Also observe text reveal elements
    document.querySelectorAll('.text-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for hero section
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}

// Add floating animation to skill cards
function initSkillCardAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .submit-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .btn, .submit-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start typewriter effect
    typewriter();

    // Set up scroll listeners
    window.addEventListener('scroll', handleNavbarScroll);
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('scroll', handleParallax);

    // Initialize intersection observer for better performance
    initIntersectionObserver();

    // Initial scroll animation check
    handleScrollAnimations();

    // Set up contact form
    handleContactForm();

    // Initialize skill card animations
    initSkillCardAnimations();

    // Add ripple effect to buttons
    addRippleCSS();
    addRippleEffect();

    // Add loading class removal
    document.body.classList.add('loaded');
});

// Handle clicks outside mobile menu
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        const icon = document.getElementById('mobile-menu-icon');
        icon.className = 'fas fa-bars';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('active');
        const icon = document.getElementById('mobile-menu-icon');
        icon.className = 'fas fa-bars';
    }

    // Arrow keys for section navigation
    if (e.ctrlKey || e.metaKey) {
        const sections = ['home', 'about', 'certifications', 'projects', 'contact'];
        let currentSection = 0;

        // Find current section based on scroll position
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            if (element && element.getBoundingClientRect().top <= 100) {
                currentSection = index;
            }
        });

        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
            e.preventDefault();
            scrollToSection(sections[currentSection + 1]);
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
            e.preventDefault();
            scrollToSection(sections[currentSection - 1]);
        }
    }
});

// Add performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll handlers for better performance
window.addEventListener('scroll', debounce(handleNavbarScroll, 10));
window.addEventListener('scroll', debounce(handleScrollAnimations, 50));

// Add smooth loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
});
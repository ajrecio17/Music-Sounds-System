// =====================================================
// MUSIC SOUNDS SYSTEM - Main JavaScript
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeScrollLinks();
    initializeContactForm();
    initializeAOS();
});

// =====================================================
// NAVBAR FUNCTIONALITY
// =====================================================

function initializeNavbar() {
    const navbarBurger = document.getElementById('navbarBurger');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarBurger) {
        navbarBurger.addEventListener('click', function() {
            navbarBurger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }

    // Close menu when a link is clicked
    const navbarItems = document.querySelectorAll('.navbar-item');
    navbarItems.forEach(item => {
        item.addEventListener('click', function() {
            navbarBurger.classList.remove('is-active');
            navbarMenu.classList.remove('is-active');
        });
    });
}

// =====================================================
// SMOOTH SCROLL FUNCTIONALITY
// =====================================================

function initializeScrollLinks() {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = 70; // Navbar height
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// CONTACT FORM HANDLING
// =====================================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: contactForm.querySelector('input[name="name"]').value.trim(),
                email: contactForm.querySelector('input[name="email"]').value.trim(),
                subject: contactForm.querySelector('input[name="subject"]').value.trim(),
                message: contactForm.querySelector('textarea[name="message"]').value.trim()
            };

            // Validate form
            if (!validateForm(formData)) {
                showMessage('Please fill in all fields correctly.', 'danger');
                return;
            }

            // Validate email format
            if (!isValidEmail(formData.email)) {
                showMessage('Please enter a valid email address.', 'danger');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const buttonContent = submitButton.innerHTML;
            submitButton.classList.add('is-loading');
            submitButton.disabled = true;

            // Simulate sending (in production, you'd send to a backend)
            setTimeout(() => {
                showMessage('Thank you! We have received your message. We will get back to you soon!', 'success');
                contactForm.reset();
                submitButton.classList.remove('is-loading');
                submitButton.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    clearMessage();
                }, 5000);
            }, 1500);
        });
    }
}

// =====================================================
// FORM VALIDATION
// =====================================================

function validateForm(formData) {
    return formData.name !== '' && 
           formData.email !== '' && 
           formData.subject !== '' && 
           formData.message !== '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    const messageBody = document.getElementById('formMessageBody');
    
    messageDiv.classList.remove('is-hidden', 'is-danger', 'is-success');
    messageDiv.classList.add(`is-${type}`);
    messageBody.textContent = message;
}

function clearMessage() {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.classList.add('is-hidden');
}

// =====================================================
// SCROLL ANIMATIONS (Simple AOS-like functionality)
// =====================================================

function initializeAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const cards = document.querySelectorAll('.service-card, .box');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// =====================================================
// NAVBAR BACKGROUND ON SCROLL
// =====================================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
});

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Smooth fade-in effect for images
function initializeImageLazyLoad() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Fallback for cached images
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize lazy loading on page load
window.addEventListener('load', function() {
    initializeImageLazyLoad();
});

// =====================================================
// UTILITY: Smooth scroll for mobile
// =====================================================

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const navHeight = 70;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// =====================================================
// SERVICE CARD INTERACTIONS
// =====================================================

function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeServiceCards);

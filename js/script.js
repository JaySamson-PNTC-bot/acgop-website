// ========================================
// ACGO CAVITE - JAVASCRIPT INTERACTIVITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // BANNER CLOSE FUNCTIONALITY
    const bannerClose = document.querySelector('.banner-close');
    const banner = document.querySelector('.banner');
    
    if (bannerClose) {
        bannerClose.addEventListener('click', function() {
            banner.style.display = 'none';
            // Save preference to localStorage
            localStorage.setItem('bannerClosed', 'true');
        });
    }
    
    // Check if banner was previously closed
    if (localStorage.getItem('bannerClosed') === 'true' && banner) {
        banner.style.display = 'none';
    }
    
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip empty anchors
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // FAQ ACCORDION FUNCTIONALITY
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        
        summary.addEventListener('click', function(e) {
            // Close other items when opening one
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.removeAttribute('open');
                }
            });
        });
    });
    
    // CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.schoolName || !data.email || !data.phone) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Log form data (in production, send to backend)
            console.log('Form Data:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you!</h3>
                <p>We've received your inquiry. We'll contact you within 24 hours.</p>
            `;
            successMessage.style.cssText = `
                background-color: #2d5016;
                color: white;
                padding: 2rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
            `;
            
            // Replace form with success message
            contactForm.style.display = 'none';
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            // Reset form after 3 seconds
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'grid';
                successMessage.remove();
            }, 3000);
        });
    }
    
    // SCROLL ANIMATIONS - Fade in elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe feature cards and service cards
    const cards = document.querySelectorAll('.feature-card, .service-card, .program-card, .resource-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // MOBILE MENU TOGGLE (if needed)
    // This is a basic implementation for mobile responsiveness
    const body = document.body;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide header
            // header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            // header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // ACTIVE NAV LINK HIGHLIGHTING
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.style.color = '');
                
                // Add active style to current link
                if (navLink) {
                    navLink.style.color = '#2d5016';
                    navLink.style.fontWeight = 'bold';
                }
            }
        });
    });
    
    // BUTTON RIPPLE EFFECT
    const buttons = document.querySelectorAll('.button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ADD RIPPLE ANIMATION TO STYLESHEET
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // LAZY LOADING FOR IMAGES
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        images.forEach(img => {
            observer.observe(img);
        });
    }
    
    // PERFORMANCE: Log page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
});

// UTILITY FUNCTIONS

// Debounce function for scroll events
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

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add to window object for external use
window.ACGO = {
    debounce: debounce,
    formatPhoneNumber: formatPhoneNumber,
    validateEmail: validateEmail
};

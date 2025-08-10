// Formspree Configuration
const FORMSPREE_CONFIG = {
    // Contact form endpoint
    contactFormId: 'your-formspree-contact-id',
    
    // Complaints form endpoint  
    complaintsFormId: 'your-formspree-complaints-id',
    
    // Base Formspree URL
    baseUrl: 'https://formspree.io/f/',
    
    // Form submission settings
    settings: {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }
};

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
});

function initializeForms() {
    // Initialize contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.action = FORMSPREE_CONFIG.baseUrl + FORMSPREE_CONFIG.contactFormId;
        setupFormSubmission(contactForm, 'contact');
    }
    
    // Initialize complaints form
    const complaintsForm = document.getElementById('complaint-form');
    if (complaintsForm) {
        complaintsForm.action = FORMSPREE_CONFIG.baseUrl + FORMSPREE_CONFIG.complaintsFormId;
        setupFormSubmission(complaintsForm, 'complaint');
    }
}

function setupFormSubmission(form, type) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showSuccessMessage(type);
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showErrorMessage();
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

function showSuccessMessage(type) {
    let message;
    
    if (type === 'complaint') {
        message = 'Thank you for your complaint. We have received your information and will review your case within 24 hours. Please check your email for a confirmation and next steps.';
    } else {
        message = 'Thank you for your message. We will respond within 24 hours. Please check your email for confirmation.';
    }
    
    // Create and show success modal or alert
    alert(message);
    
    // Optional: Redirect to thank you page
    // window.location.href = '/thank-you.html';
}

function showErrorMessage() {
    alert('Sorry, there was an error submitting your form. Please try again or contact us directly at support@getmymoneyback.online');
}

// Utility function to validate forms before submission
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export configuration for use in other files if needed
window.FormspreeConfig = FORMSPREE_CONFIG;
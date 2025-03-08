// Contact Form Handling with Name in Success Popup
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    const successPopup = document.getElementById('successPopup');
    const popupTitle = document.querySelector('.success-popup-title');
    const popupMessage = document.querySelector('.success-popup-message');
    const closeBtn = document.querySelector('.success-popup-btn');
    
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> بیج رہا ہے...';
            submitBtn.disabled = true;
            
            // Get form data
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Get the name value
            const name = nameInput ? nameInput.value.trim() : '';
            
            // Simulate form submission with fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Update popup message with name
                if (name) {
                    popupTitle.textContent = `Thanks، ${name}!`;
                    popupMessage.textContent = `Your message has been sent successfully. We will contact you soon.`;
                } else {
                    popupTitle.textContent = 'Your Message Has Been Sent!';
                    popupMessage.textContent = 'We will contact you soon.';
                }
                
                // Show the popup
                successPopup.classList.add('active');
                
                // Reset form
                contactForm.reset();
                
                // Auto close after 5 seconds
                setTimeout(function() {
                    successPopup.classList.remove('active');
                }, 5000);
            })
            .catch(error => {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show error message
                alert('پیغام بھیجنے میں مسئلہ ہوا ہے۔ براہ کرم دوبارہ کوشش کریں۔');
                console.error('Error:', error);
            });
        });
    }
    
    // Close popup when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            successPopup.classList.remove('active');
        });
    }
    
    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successPopup) {
            successPopup.classList.remove('active');
        }
    });
}); 
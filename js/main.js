// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Sticky Header
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    // Apply initial padding to body based on header height
    document.body.style.paddingTop = headerHeight + 'px';
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
            // Update padding when header changes to sticky (smaller height)
            if (header.offsetHeight !== headerHeight) {
                document.body.style.paddingTop = header.offsetHeight + 'px';
            }
        } else {
            header.classList.remove('sticky');
            // Reset padding to original header height
            document.body.style.paddingTop = headerHeight + 'px';
        }
    });
    
    // Update header padding on window resize
    window.addEventListener('resize', function() {
        const currentHeaderHeight = header.offsetHeight;
        document.body.style.paddingTop = currentHeaderHeight + 'px';
    });

    // Mobile Menu and Theme Toggle Fixes
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && 
                !mobileMenuBtn.contains(e.target) && 
                !themeToggle.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-menu ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Ensure theme toggle works on mobile
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            // Your existing theme toggle code here
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinksSmooth = document.querySelectorAll('.nav-link');
    
    navLinksSmooth.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinksSmooth.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });

    // Typed Text Animation
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        const words = ['Developer', 'Designer', 'Freelancer', 'Photographer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove a character
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Add a character
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // If word is complete, start deleting
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end of the word
            }
            
            // If word is deleted, move to the next word
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeEffect, 1000);
    }

    // Skills Progress Animation
    const skillsSection = document.querySelector('#skills');
    
    if (skillsSection) {
        const skillProgress = document.querySelectorAll('.skill-progress');
        
        function animateSkills() {
            skillProgress.forEach(progress => {
                const progressValue = progress.getAttribute('data-progress');
                progress.style.width = progressValue;
            });
        }
        
        // Animate skills when the skills section is in view
        window.addEventListener('scroll', function() {
            const sectionPosition = skillsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                animateSkills();
            }
        });
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('تمام فیلڈز بھریں');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('براہ کرم ایک درست ای میل ایڈریس درج کریں');
                return;
            }
            
            // Create form data object
            const formData = new FormData(this);
            
            // Hide mobile keyboard
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> بھیج رہا ہے...';
            submitBtn.disabled = true;
            
            // Simulate form submission (remove this in production)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success popup
                if (successPopup) {
                    showSuccessPopup(successPopup);
                }
                
                // Reset form styling
                const formLabels = contactForm.querySelectorAll('label');
                formLabels.forEach(label => {
                    label.classList.remove('active');
                });
                
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
            
            // Uncomment this for actual form submission
            /*
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('فارم جمع کرانے کے دوران نیٹ ورک کا مسئلہ');
            })
            .then(data => {
                // Reset form
                this.reset();
                
                // Show success popup
                if (successPopup) {
                    showSuccessPopup(successPopup);
                }
                
                // Reset form styling
                const formLabels = this.querySelectorAll('label');
                formLabels.forEach(label => {
                    label.classList.remove('active');
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('پیغام بھیجنے میں خرابی: ' + error.message);
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
            */
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            // Simple validation
            if (email === '') {
                alert('براہ کرم اپنا ای میل ایڈریس درج کریں');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('براہ کرم ایک درست ای میل ایڈریس درج کریں');
                return;
            }
            
            // Hide mobile keyboard
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            
            // Create form data
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Send form data
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('فارم جمع کرانے کے دوران نیٹ ورک کا مسئلہ');
            })
            .then(data => {
                // Reset form
                this.reset();
                
                // Show simple alert instead of popup
                alert('آپ کی نیوز لیٹر سبسکرپشن کامیابی سے مکمل ہو گئی ہے۔');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('سبسکرائب کرنے میں خرابی: ' + error.message);
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // Parallax Effect for Background Images
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Apply parallax effect to home section
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .tech-logos, .project-item, .contact-content');
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Exit Intent Popup
const exitPopup = document.getElementById('exitPopup');
const stayOnPageBtn = document.getElementById('stayOnPageBtn');
const leavePageBtn = document.getElementById('leavePageBtn');

// Only show exit popup when user is trying to leave the page
let exitIntentShown = false;

// Remove mouseout event as it can trigger on page load
// Instead, use beforeunload event to detect when user is trying to leave
window.addEventListener('beforeunload', function(e) {
    // Only show the popup if it hasn't been shown already in this session
    if (!sessionStorage.getItem('exitPopupShown') && !exitIntentShown) {
        // Show the popup
        showSuccessPopup(exitPopup);
        exitIntentShown = true;
        
        // Set session storage to prevent showing again in the same session
        sessionStorage.setItem('exitPopupShown', 'true');
        
        // Standard way to show a confirmation dialog when leaving
        e.preventDefault();
        e.returnValue = 'آپ واقعی اس ویب سائٹ کو چھوڑنا چاہتے ہیں؟';
        return 'آپ واقعی اس ویب سائٹ کو چھوڑنا چاہتے ہیں؟';
    }
});

// Stay on page button
if (stayOnPageBtn) {
    stayOnPageBtn.addEventListener('click', function() {
        closeSuccessPopup(exitPopup);
        // Reset the flag so it can show again if user tries to leave again
        exitIntentShown = false;
    });
}

// Leave page button
if (leavePageBtn) {
    leavePageBtn.addEventListener('click', function() {
        closeSuccessPopup(exitPopup);
        // Redirect to another page or just let them leave
        window.location.href = "about:blank";
    });
}

// For testing purposes - clear session storage when needed
// Uncomment this line to reset the popup for testing
// sessionStorage.removeItem('exitPopupShown');

// Improved Success Popup function for better mobile support
function showSuccessPopup(popup) {
    if (!popup) return;
    
    // Disable background scrolling when popup is visible
    document.body.style.overflow = 'hidden';
    
    // Show popup with animation
    popup.classList.add('active');
    
    // Focus management for accessibility
    setTimeout(() => {
        const closeBtn = popup.querySelector('.success-popup-btn');
        if (closeBtn) {
            closeBtn.focus();
        }
    }, 100);
    
    // Handle mobile keyboards if open
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
    
    // Add click event listeners for all close buttons
    const closeButtons = popup.querySelectorAll('.success-popup-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeSuccessPopup(popup);
        });
        
        // Add touchstart event for mobile devices
        btn.removeEventListener('touchstart', handlePopupButtonTouch);
        btn.addEventListener('touchstart', handlePopupButtonTouch);
    });
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeSuccessPopup(popup);
        }
    });
    
    // Allow closing popup by tapping outside on mobile
    popup.addEventListener('touchstart', function(e) {
        if (e.target === popup) {
            closeSuccessPopup(popup);
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closeSuccessPopup(popup);
        }
    });
}

// Handler for touch events on popup buttons
function handlePopupButtonTouch(e) {
    // Prevent default to avoid double-tap zoom on mobile
    e.preventDefault();
    const popup = this.closest('.success-popup');
    if (popup) {
        closeSuccessPopup(popup);
    }
}

// Improved closing function
function closeSuccessPopup(popup) {
    // Re-enable scrolling
    document.body.style.overflow = '';
    
    // Hide popup with animation
    popup.classList.remove('active');
    
    // Remove touch event listeners to prevent memory leaks
    const closeButtons = popup.querySelectorAll('.success-popup-btn');
    closeButtons.forEach(btn => {
        btn.removeEventListener('touchstart', handlePopupButtonTouch);
    });
}

// Fix viewport height for mobile browsers
function setMobileViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Call on initial load
setMobileViewportHeight();

// Call on resize and orientation change
window.addEventListener('resize', setMobileViewportHeight);
window.addEventListener('orientationchange', setMobileViewportHeight);

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(disable) {
    document.body.style.overflow = disable ? 'hidden' : '';
}

// Fix for iOS devices
document.documentElement.style.setProperty('--webkit-overflow-scrolling', 'touch');

// Detect device type
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|tablet|Tablet|Android(?!.*Mobile)/i.test(navigator.userAgent);

// Initialize on document ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("Document ready, initializing...");
    
    // Initialize custom cursor only on desktop
    if (window.innerWidth > 991) {
        initCustomCursor();
    }

    // Initialize mobile menu
    initMobileMenu();

    // Initialize theme toggle
    initThemeToggle();

    // Initialize form handling
    initFormHandling();

    // Fix viewport height for mobile browsers
    setMobileViewportHeight();
    window.addEventListener('resize', setMobileViewportHeight);
});

// Custom cursor initialization
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        // Add cursor effects
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
            cursorDot.classList.add('click');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
            cursorDot.classList.remove('click');
        });
        
        // Add hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .btn, .filter-btn, .project-item, .social-icon');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('expand');
                cursorDot.classList.add('expand');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('expand');
                cursorDot.classList.remove('expand');
            });
        });
    }
}

// Mobile menu initialization with advanced features
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        console.log("Mobile menu initialized");
        
        // Remove any existing event listeners
        const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);
        
        // Add ripple effect to mobile menu button
        newMobileMenuBtn.addEventListener('mousedown', createRippleEffect);
        
        // Toggle menu on button click with animation
        newMobileMenuBtn.addEventListener('click', function(e) {
            console.log("Mobile menu button clicked");
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class with animation
            this.classList.toggle('active');
            
            // Toggle menu with animation
            if (!navMenu.classList.contains('active')) {
                // Opening menu
                navMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add active class to each nav item with delay
                const navItems = navMenu.querySelectorAll('ul li');
                navItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100 * (index + 1));
                });
            } else {
                // Closing menu
                const navItems = navMenu.querySelectorAll('ul li');
                navItems.forEach((item, index) => {
                    item.classList.remove('active');
                });
                
                // Delay removing active class from menu
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !newMobileMenuBtn.contains(e.target)) {
                
                // Remove active class from menu button
                newMobileMenuBtn.classList.remove('active');
                
                // Remove active class from nav items
                const navItems = navMenu.querySelectorAll('ul li');
                navItems.forEach((item) => {
                    item.classList.remove('active');
                });
                
                // Delay removing active class from menu
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
        
        // Close menu when clicking nav links with smooth scroll
        const navLinks = document.querySelectorAll('#navMenu ul li a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Close mobile menu
                    newMobileMenuBtn.classList.remove('active');
                    
                    // Remove active class from nav items
                    const navItems = navMenu.querySelectorAll('ul li');
                    navItems.forEach((item) => {
                        item.classList.remove('active');
                    });
                    
                    // Delay removing active class from menu and scroll to section
                    setTimeout(() => {
                        navMenu.classList.remove('active');
                        document.body.style.overflow = '';
                        
                        // Scroll to section
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            });
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // Get all sections
            const sections = document.querySelectorAll('section[id]');
            
            // Loop through sections to find the one in view
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding link
                    const activeLink = document.querySelector(`#navMenu ul li a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        });
    } else {
        console.error("Mobile menu elements not found");
    }
}

// Theme toggle initialization with improved mobile support
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        console.log("Theme toggle initialized");
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

        // Add click event listener
        themeToggle.addEventListener('click', handleThemeToggle);
        
        // Add touch event listeners for mobile
        themeToggle.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent default touch behavior
            handleThemeToggle.call(this, e);
        }, { passive: false });

        // Log current theme mode
        console.log("Current theme mode:", document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    } else {
        console.error("Theme toggle element not found");
    }
}

// Handle theme toggle click/touch
function handleThemeToggle(e) {
    e.stopPropagation();
    console.log("Theme toggle activated");
    
    const themeToggle = this;
    
    // Add animation class
    themeToggle.classList.add('animate');
    
    // Toggle dark/light mode with delay for animation
    setTimeout(() => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            // Switch to light mode
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            console.log("Light mode activated");
        } else {
            // Switch to dark mode
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            console.log("Dark mode activated");
        }
        
        // Remove animation class
        themeToggle.classList.remove('animate');
    }, 300);

    // Create ripple effect
    createRippleEffect.call(this, e);
}

// Create ripple effect for buttons
function createRippleEffect(e) {
    const button = this;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    // Get position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Set position and size
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    
    // Add active class
    ripple.classList.add('active');
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Form handling initialization
function initFormHandling() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Handle input focus
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            // Handle input blur
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    label.classList.remove('active');
                }
            });
            
            // Handle input with existing value
            if (input.value !== '') {
                label.classList.add('active');
            }
        }
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('تمام فیلڈز بھریں');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('براہ کرم ایک درست ای میل ایڈریس درج کریں');
                return;
            }
            
            // Create form data object
            const formData = new FormData(this);
            
            // Hide mobile keyboard
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> بھیج رہا ہے...';
            submitBtn.disabled = true;
            
            // Send form data
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('فارم جمع کرانے کے دوران نیٹ ورک کا مسئلہ');
            })
            .then(data => {
                // Reset form
                this.reset();
                
                // Show success popup
                if (successPopup) {
                    showSuccessPopup(successPopup);
                }
                
                // Reset form styling
                const formLabels = this.querySelectorAll('label');
                formLabels.forEach(label => {
                    label.classList.remove('active');
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('پیغام بھیجنے میں خرابی: ' + error.message);
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
}

// Success Popup Functions
function showSuccessPopup(popup) {
    if (!popup) return;
    
    // Disable background scrolling
    document.body.style.overflow = 'hidden';
    
    // Show popup with animation
    popup.classList.add('active');
    
    // Add click event for close button
    const closeBtn = popup.querySelector('.success-popup-btn');
    if (closeBtn) {
        // Remove existing event listeners
        closeBtn.replaceWith(closeBtn.cloneNode(true));
        
        // Add new event listener
        const newCloseBtn = popup.querySelector('.success-popup-btn');
        newCloseBtn.addEventListener('click', () => closeSuccessPopup(popup));
        
        // Add touch event for mobile
        newCloseBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            closeSuccessPopup(popup);
        });
    }
    
    // Close on outside click
    const handleOutsideClick = (e) => {
        if (e.target === popup) {
            closeSuccessPopup(popup);
            popup.removeEventListener('click', handleOutsideClick);
        }
    };
    
    popup.addEventListener('click', handleOutsideClick);
    
    // Close on Escape key
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeSuccessPopup(popup);
            document.removeEventListener('keydown', handleEscKey);
        }
    };
    
    document.addEventListener('keydown', handleEscKey);
}

function closeSuccessPopup(popup) {
    // Re-enable scrolling
    document.body.style.overflow = '';
    
    // Hide popup with animation
    popup.classList.remove('active');
}

// Fix viewport height for mobile browsers
function setMobileViewportHeight() {
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
} 
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get cursor elements
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    // Check if cursor elements exist
    if (!cursor || !cursorDot) return;
    
    // Hide default cursor on elements that should use custom cursor
    const elementsToHideCursor = document.querySelectorAll('body, a, button, .filter-btn, .project-item, .social-icon, .theme-toggle, .mobile-menu-btn');
    elementsToHideCursor.forEach(el => {
        el.style.cursor = 'none';
    });
    
    // Variables for smooth movement
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    
    // Add event listener for mouse movement
    document.addEventListener('mousemove', function(e) {
        // Update target mouse position
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop for smooth cursor movement
    function animateCursor() {
        // Calculate smooth movement with easing
        const easingCursor = 0.2; // Lower = smoother but slower
        const easingDot = 0.3; // Slightly faster for the dot
        
        // Update cursor position with easing
        cursorX += (mouseX - cursorX) * easingCursor;
        cursorY += (mouseY - cursorY) * easingCursor;
        
        // Update cursor dot position with easing (slightly faster)
        cursorDotX += (mouseX - cursorDotX) * easingDot;
        cursorDotY += (mouseY - cursorDotY) * easingDot;
        
        // Apply positions
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorDot.style.left = cursorDotX + 'px';
        cursorDot.style.top = cursorDotY + 'px';
        
        // Continue animation loop
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation loop
    animateCursor();
    
    // Add event listeners for mouse enter/leave on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .project-item, .social-icon, .theme-toggle, .mobile-menu-btn, input, textarea, select, .form-group, .logo, .nav-link');
    
    interactiveElements.forEach(element => {
        // Mouse enter - expand cursor
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('expand');
            cursorDot.classList.add('expand');
        });
        
        // Mouse leave - return to normal
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('expand');
            cursorDot.classList.remove('expand');
        });
    });
    
    // Add event listeners for mouse down/up
    document.addEventListener('mousedown', function() {
        cursor.classList.add('click');
        cursorDot.classList.add('click');
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('click');
        cursorDot.classList.remove('click');
    });
    
    // Hide cursor when mouse leaves the window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    // Show cursor when mouse enters the window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '0.7';
        cursorDot.style.opacity = '1';
    });
    
    // Disable custom cursor on touch devices
    if (isTouchDevice()) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
        elementsToHideCursor.forEach(el => {
            el.style.cursor = 'auto';
        });
    }
    
    // Function to detect touch devices
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
}); 
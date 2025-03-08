// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the background rotator element
    const bgRotator = document.querySelector('.bg-rotator');
    
    // Check if the element exists
    if (!bgRotator) return;
    
    // Array of background images related to teaching and technology
    const backgroundImages = [
        'images/bg-1.jpg',
        'images/bg-2.jpg',
        'images/bg-3.jpg',
        'images/bg-4.jpg',
        'images/bg-5.jpg'
    ];
    
    // Current background index
    let currentBgIndex = 0;
    
    // Function to preload images
    function preloadImages(images) {
        images.forEach(image => {
            const img = new Image();
            img.src = image;
        });
    }
    
    // Preload all background images
    preloadImages(backgroundImages);
    
    // Function to change the background
    function changeBackground() {
        // Create a new background element
        const newBg = document.createElement('div');
        newBg.classList.add('bg-item');
        newBg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${backgroundImages[currentBgIndex]}')`;
        newBg.style.opacity = '0';
        
        // Add the new background to the rotator
        bgRotator.appendChild(newBg);
        
        // Fade in the new background
        setTimeout(() => {
            newBg.style.opacity = '1';
        }, 100);
        
        // Remove old backgrounds
        const bgItems = document.querySelectorAll('.bg-item');
        if (bgItems.length > 1) {
            setTimeout(() => {
                bgItems[0].style.opacity = '0';
                setTimeout(() => {
                    bgItems[0].remove();
                }, 1000);
            }, 1000);
        }
        
        // Update the current background index
        currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
    }
    
    // Set the initial background
    changeBackground();
    
    // Change the background every 10 seconds
    setInterval(changeBackground, 10000);
    
    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const bgItems = document.querySelectorAll('.bg-item');
        
        bgItems.forEach(item => {
            item.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });
    
    // Add mouse movement effect to background
    document.addEventListener('mousemove', function(e) {
        const bgItems = document.querySelectorAll('.bg-item');
        
        // Calculate the percentage of mouse position
        const xPercent = e.clientX / window.innerWidth;
        const yPercent = e.clientY / window.innerHeight;
        
        // Apply a subtle movement effect
        bgItems.forEach(item => {
            item.style.transform = `translate(${(xPercent - 0.5) * 20}px, ${(yPercent - 0.5) * 20}px)`;
        });
    });
}); 
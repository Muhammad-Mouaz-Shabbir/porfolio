// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check if user has a preferred theme stored
    const currentTheme = localStorage.getItem('theme');
    
    // If user has a stored preference, apply it
    if (currentTheme) {
        body.classList.add(currentTheme);
        
        // If dark mode is active, move the toggle ball
        if (currentTheme === 'dark-mode') {
            document.querySelector('.toggle-ball').style.transform = 'translateX(30px)';
        }
    }
    
    // Toggle theme when the button is clicked
    themeToggle.addEventListener('click', function() {
        // Toggle dark mode class on body
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Move the toggle ball
        const toggleBall = document.querySelector('.toggle-ball');
        
        if (body.classList.contains('dark-mode')) {
            toggleBall.style.transform = 'translateX(30px)';
            // Store user preference in localStorage
            localStorage.setItem('theme', 'dark-mode');
        } else {
            toggleBall.style.transform = 'translateX(0)';
            // Store user preference in localStorage
            localStorage.setItem('theme', 'light-mode');
        }
    });
    
    // Check user's preferred color scheme
    function checkColorScheme() {
        // Check if user has a stored preference
        if (!localStorage.getItem('theme')) {
            // If no stored preference, check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                // If system preference is dark, apply dark mode
                body.classList.add('dark-mode');
                body.classList.remove('light-mode');
                document.querySelector('.toggle-ball').style.transform = 'translateX(30px)';
                localStorage.setItem('theme', 'dark-mode');
            }
        }
    }
    
    // Check color scheme on page load
    checkColorScheme();
    
    // Listen for changes in system color scheme
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Only apply if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    // System switched to dark mode
                    body.classList.add('dark-mode');
                    body.classList.remove('light-mode');
                    document.querySelector('.toggle-ball').style.transform = 'translateX(30px)';
                } else {
                    // System switched to light mode
                    body.classList.remove('dark-mode');
                    body.classList.add('light-mode');
                    document.querySelector('.toggle-ball').style.transform = 'translateX(0)';
                }
            }
        });
    }
}); 
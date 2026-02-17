// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Template download simulation
    const downloadButtons = document.querySelectorAll('.btn-secondary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Download')) {
                e.preventDefault();
                
                // Show a modal or alert (you can replace this with actual download logic)
                alert('In the live version, this would download a PDF. For now, please browse the templates page for more options.');
                
                // Track download attempt (for analytics later)
                console.log('Download attempted:', this.previousElementSibling.previousElementSibling.textContent);
            }
        });
    });
    
    // Simple page visit counter (for demo)
    if (!localStorage.getItem('visitCount')) {
        localStorage.setItem('visitCount', '1');
    } else {
        let count = parseInt(localStorage.getItem('visitCount'));
        localStorage.setItem('visitCount', (count + 1).toString());
    }
    
    console.log('Page visits:', localStorage.getItem('visitCount'));
});
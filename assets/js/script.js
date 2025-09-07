// This script is optional if CSS scroll-behavior works for you,
// but it provides better browser compatibility.
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-buttons a');

    for (const link of navLinks) {
        link.addEventListener('click', function(event) {
            // Check if the link is an anchor link
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                event.preventDefault();

                // Store hash
                const hash = this.hash;

                // Use the element's scrollIntoView() method for smooth scrolling
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});
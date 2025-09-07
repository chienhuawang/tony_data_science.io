document.addEventListener('DOMContentLoaded', function() {
    // ===== INITIALIZE AOS ANIMATION LIBRARY (NEW) =====
    AOS.init({
        duration: 800, // 動畫持續時間 (毫秒)
        once: true, // 動畫只觸發一次
    });

    // ===== SMOOTH SCROLL FOR NAV BUTTONS =====
    const navLinks = document.querySelectorAll('.nav-buttons a');

    for (const link of navLinks) {
        link.addEventListener('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                const hash = this.hash;
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // ===== BACK TO TOP BUTTON LOGIC =====
    const backToTopButton = document.getElementById("back-to-top");

    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    backToTopButton.addEventListener('click', function(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
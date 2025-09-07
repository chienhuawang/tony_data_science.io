document.addEventListener('DOMContentLoaded', function() {
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

    // 當使用者滾動頁面時，執行 scrollFunction
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        // 如果頁面滾動超過 200px，就顯示按鈕
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    // 當使用者點擊按鈕時，平滑滾動到頁面頂部
    backToTopButton.addEventListener('click', function(event) {
        event.preventDefault(); // 防止 # 連結的預設跳轉行為
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
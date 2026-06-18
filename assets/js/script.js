document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALIZE AOS ANIMATION LIBRARY =====
    AOS.init({
        duration: 800,
        once: true,
        offset: 50
    });

    // ===== CUSTOM CURSOR LOGIC =====
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline && window.innerWidth > 1024) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
    }

    // ===== MODAL LOGIC =====
    const projectCards = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modal = document.querySelector(card.dataset.modalTarget);
            openModal(modal);
        });
    });

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background

        // Trigger Mermaid rendering once modal is visible (wait for transition)
        if (typeof mermaid !== 'undefined') {
            const unrendered = modal.querySelectorAll('.mermaid:not([data-processed="true"])');
            if (unrendered.length > 0) {
                setTimeout(() => {
                    try {
                        if (typeof mermaid.run === 'function') {
                            mermaid.run({ nodes: unrendered });
                        } else if (typeof mermaid.init === 'function') {
                            mermaid.init(undefined, unrendered);
                        }
                    } catch (err) {
                        console.error('Failed to render Mermaid diagrams:', err);
                    }
                }, 350); // Match style.css transition (300ms) plus a tiny buffer
            }
        }
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    const navLinks = document.querySelectorAll('.nav-link');
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

    // ===== SCROLLSPY LOGIC (Update Active Nav Link) =====
    const sections = document.querySelectorAll('.section-block');
    
    // Create an intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Adjust these margins to trigger earlier/later
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== INITIALIZE MERMAID =====
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: true, htmlLabels: true }
        });
    }

    // ===== TAB LOGIC FOR MODALS =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            const targetSelector = btn.dataset.tabTarget;
            const targetPanel = modal.querySelector(targetSelector);
            
            // Deactivate all sibling buttons
            modal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            // Deactivate all sibling panels
            modal.querySelectorAll('.tab-content-panel').forEach(p => p.classList.remove('active'));
            
            // Activate current button and panel
            btn.classList.add('active');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

});
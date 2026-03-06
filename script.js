/**
 * Advanced Portfolio Controller
 * Features: Custom Cursor, Intersection Observer for Scroll Animations, Dynamic Typing
 */
class PortfolioController {
    constructor() {
        // Initialize features only after the DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initCursor();
            this.initScrollReveal();
            this.initTypingEffect();
        });
    }

    /**
     * 1. Custom Interactive Cursor
     * Replaces the default mouse with a smooth following dot and an expanding ring on hover.
     */
    initCursor() {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        
        if (!cursorDot || !cursorOutline) return;

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Direct mapping for the dot
            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            
            // Smooth trailing effect for the outline using Web Animations API
            cursorOutline.animate({
                transform: `translate(${posX}px, ${posY}px)`
            }, { duration: 500, fill: "forwards" });
        });

        // Expand cursor on clickable elements
        const clickables = document.querySelectorAll('a, button, .hover-target');
        clickables.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorOutline.style.transform += ' scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            link.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', '');
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    /**
     * 2. Scroll Reveal Observer
     * Uses IntersectionObserver to trigger CSS animations when elements enter the viewport.
     */
    initScrollReveal() {
        const observerOptions = {
            root: null,
            threshold: 0.15, // Triggers when 15% of the element is visible
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    // Optional: Unobserve after revealing to only animate once
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
        hiddenElements.forEach(el => observer.observe(el));
    }

    /**
     * 3. Dynamic Typing Effect
     * Types out an array of strings like a terminal.
     */
    initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const words = ['Full Stack Developer.', 'UI/UX Enthusiast.', 'Problem Solver.'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex];
            const speed = isDeleting ? 50 : 100;

            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before next word
            } else {
                setTimeout(type, speed);
            }
        };

        type(); // Start the loop
    }
}

// Instantiate the controller
const myPortfolio = new PortfolioController();

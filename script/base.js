// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Add any JavaScript functionality here if needed
});
/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const slideCount = slides.children.length;
    let currentIndex = 0;

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(showNextSlide, 5000); // Change slide every 5 seconds
});

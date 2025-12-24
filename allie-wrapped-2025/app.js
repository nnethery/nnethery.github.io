// Allie's 2025 Goodreads Wrapped - Story Controller

class WrappedStory {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.slideDuration = 8000; // 8 seconds
        this.timer = null;
        this.isPaused = false;
        this.progressSegments = [];
        this.chartsInitialized = {};

        this.init();
    }

    init() {
        this.createProgressSegments();
        this.setupEventListeners();
        this.showSlide(0);
        // Don't auto-start on first slide - wait for tap
    }

    createProgressSegments() {
        const container = document.querySelector('.progress-segments');
        container.innerHTML = '';

        for (let i = 0; i < this.totalSlides; i++) {
            const segment = document.createElement('div');
            segment.className = 'progress-segment';
            segment.innerHTML = '<div class="fill"></div>';
            segment.addEventListener('click', (e) => {
                e.stopPropagation();
                this.goToSlide(i);
            });
            container.appendChild(segment);
            this.progressSegments.push(segment);
        }
    }

    setupEventListeners() {
        const navRight = document.querySelector('.nav-right');
        const navLeft = document.querySelector('.nav-left');

        // Track touch state for distinguishing taps from long presses
        let pressTimer;
        let touchStartTime;
        let didLongPress = false;
        let isTouchDevice = false;

        // Helper function to handle touch/click on nav areas
        const handleNavTouch = (navElement, action) => {
            // Click handler (works for mouse clicks only - skip on touch devices)
            navElement.addEventListener('click', (e) => {
                e.stopPropagation();
                // Skip if this is a touch device (touch events already handled it)
                if (isTouchDevice) return;
                if (!didLongPress) {
                    action();
                }
                didLongPress = false;
            });

            // Touch start - start long press timer
            navElement.addEventListener('touchstart', (e) => {
                isTouchDevice = true; // Mark as touch device to skip click handler
                touchStartTime = Date.now();
                didLongPress = false;
                pressTimer = setTimeout(() => {
                    didLongPress = true;
                    this.pause();
                }, 400); // 400ms for long press
            }, { passive: true });

            // Touch end - either navigate or resume from pause
            navElement.addEventListener('touchend', (e) => {
                e.preventDefault(); // Prevent click event from also firing
                clearTimeout(pressTimer);
                const touchDuration = Date.now() - touchStartTime;

                if (this.isPaused) {
                    this.resume();
                } else if (touchDuration < 400 && !didLongPress) {
                    action();
                }
                didLongPress = false;
            });

            // Touch cancel - clean up
            navElement.addEventListener('touchcancel', () => {
                clearTimeout(pressTimer);
                didLongPress = false;
            });
        };

        // Set up navigation for both sides
        handleNavTouch(navRight, () => this.nextSlide());
        handleNavTouch(navLeft, () => this.prevSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') this.nextSlide();
            if (e.key === 'ArrowLeft') this.prevSlide();
        });
    }

    showSlide(index) {
        // Update progress segments
        this.progressSegments.forEach((seg, i) => {
            seg.classList.remove('active', 'complete', 'paused');
            if (i < index) seg.classList.add('complete');
            if (i === index) seg.classList.add('active');
        });

        // Show/hide slides - use data-slide attribute for reliable matching
        document.querySelectorAll('.slide').forEach((slide) => {
            const slideIndex = parseInt(slide.dataset.slide);
            slide.classList.toggle('active', slideIndex === index);
        });

        // Update background
        const currentSlide = document.querySelector(`.slide[data-slide="${index}"]`);
        if (currentSlide) {
            const bg = currentSlide.dataset.bg;
            document.querySelector('.phone-frame').className = `phone-frame ${bg}`;
        }

        // Update circular timer
        this.updateCircularTimer(index);

        // Initialize slide-specific elements
        this.initSlideContent(index);

        // Start timer (except for first and last slide)
        this.startTimer();
    }

    updateCircularTimer(index) {
        const timerProgress = document.getElementById('timerProgress');

        // Clone and replace the element to force animation restart
        const newProgress = timerProgress.cloneNode(true);
        newProgress.classList.remove('animating', 'paused');
        timerProgress.parentNode.replaceChild(newProgress, timerProgress);

        // Start animation on non-first/last slides
        if (index !== 0 && index !== this.totalSlides - 1) {
            // Use requestAnimationFrame to ensure the DOM has updated
            requestAnimationFrame(() => {
                newProgress.classList.add('animating');
            });
        }
    }

    initSlideContent(index) {
        const slide = document.querySelector(`.slide[data-slide="${index}"]`);

        // Count up animations
        slide.querySelectorAll('.count-up').forEach(el => {
            this.animateCount(el);
        });

        // Initialize charts
        if (index === 5 && !this.chartsInitialized[5]) {
            this.initMonthlyChart();
            this.chartsInitialized[5] = true;
        }

        // Initialize genre bubbles
        if (index === 26 && !this.chartsInitialized[26]) {
            this.initGenreBubbles();
            this.chartsInitialized[26] = true;
        }
    }

    animateCount(element) {
        const target = parseInt(element.dataset.target);
        const duration = 1500;
        const start = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    initMonthlyChart() {
        const ctx = document.getElementById('monthlyChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: wrappedData.monthlyBreakdown.months,
                datasets: [{
                    data: wrappedData.monthlyBreakdown.counts,
                    backgroundColor: wrappedData.monthlyBreakdown.counts.map((count, i) => {
                        // Highlight April and September (indices 3 and 8)
                        if (i === 3 || i === 8) return 'rgba(255, 255, 255, 0.9)';
                        return 'rgba(255, 255, 255, 0.4)';
                    }),
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleFont: { size: 12 },
                        bodyFont: { size: 14 },
                        callbacks: {
                            label: (ctx) => `${ctx.raw} books`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: 'rgba(255,255,255,0.6)',
                            font: { size: 10 }
                        }
                    },
                    y: {
                        display: false,
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    initGenreBubbles() {
        const container = document.getElementById('genreBubbles');
        if (!container) return;

        const genres = wrappedData.genres.slice(0, 10);
        const maxCount = Math.max(...genres.map(g => g.count));

        // Colors for bubbles
        const colors = [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(240, 147, 251, 0.8)',
            'rgba(79, 172, 254, 0.8)',
            'rgba(0, 242, 254, 0.8)',
            'rgba(17, 153, 142, 0.8)',
            'rgba(56, 239, 125, 0.8)',
            'rgba(255, 107, 107, 0.8)',
            'rgba(254, 202, 87, 0.8)',
            'rgba(162, 155, 254, 0.8)'
        ];

        // Positions for bubbles (pre-calculated for good layout)
        const positions = [
            { x: 45, y: 30 },   // Historical Fiction (largest, center-ish)
            { x: 75, y: 55 },   // Fantasy
            { x: 20, y: 50 },   // Romance
            { x: 55, y: 70 },   // Historical
            { x: 15, y: 25 },   // Nonfiction
            { x: 80, y: 25 },   // Literary Fiction
            { x: 35, y: 85 },   // Contemporary
            { x: 70, y: 85 },   // Classics
            { x: 5, y: 75 },    // Mystery
            { x: 90, y: 70 }    // Memoir
        ];

        genres.forEach((genre, i) => {
            const bubble = document.createElement('div');
            bubble.className = 'genre-bubble';

            // Size based on count
            const minSize = 40;
            const maxSize = 90;
            const size = minSize + (genre.count / maxCount) * (maxSize - minSize);

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.background = colors[i];
            bubble.style.left = `${positions[i].x}%`;
            bubble.style.top = `${positions[i].y}%`;
            bubble.style.transform = 'translate(-50%, -50%)';
            bubble.style.animationDelay = `${i * 0.2}s`;

            // Only show name for larger bubbles
            if (size > 50) {
                bubble.innerHTML = `<span>${genre.name.split(' ')[0]}</span>`;
            }

            container.appendChild(bubble);
        });
    }

    startTimer() {
        this.clearTimer();

        // Don't auto-advance on first or last slide
        if (this.currentSlide === 0 || this.currentSlide === this.totalSlides - 1) {
            return;
        }

        this.timer = setTimeout(() => {
            this.nextSlide();
        }, this.slideDuration);
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    pause() {
        this.isPaused = true;
        this.clearTimer();
        document.getElementById('pauseIndicator').classList.add('visible');
        this.progressSegments[this.currentSlide].classList.add('paused');
    }

    resume() {
        this.isPaused = false;
        document.getElementById('pauseIndicator').classList.remove('visible');
        this.progressSegments[this.currentSlide].classList.remove('paused');
        this.startTimer();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
            this.showSlide(this.currentSlide);
        }
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.showSlide(this.currentSlide);
        }
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
    }
}

function restartStory() {
    // Reset all state
    window.story.currentSlide = 0;
    window.story.chartsInitialized = {};
    window.story.isPaused = false;
    window.story.clearTimer();

    // Clear dynamic content
    const bubbles = document.getElementById('genreBubbles');
    if (bubbles) bubbles.innerHTML = '';

    // Reset pause indicator
    document.getElementById('pauseIndicator').classList.remove('visible');

    // Reset all progress segments
    window.story.progressSegments.forEach(seg => {
        seg.classList.remove('active', 'complete', 'paused');
    });

    // Reset circular timer by cloning
    const timerProgress = document.getElementById('timerProgress');
    const newProgress = timerProgress.cloneNode(true);
    newProgress.classList.remove('animating', 'paused');
    timerProgress.parentNode.replaceChild(newProgress, timerProgress);

    // Show first slide (this will set up the intro state correctly)
    window.story.showSlide(0);
}

function nextSlide() {
    if (window.story) window.story.nextSlide();
}

function prevSlide() {
    if (window.story) window.story.prevSlide();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.story = new WrappedStory();
});

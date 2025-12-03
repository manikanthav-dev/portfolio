// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        // Add some variety to particles
        const colors = ['#38bdf8', '#22c55e', '#818cf8', '#06b6d4'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 6px ${particle.style.background}`;
        
        particlesContainer.appendChild(particle);
    }
}

// Typewriter animation function
function typeWriterLoop() {
    const texts = [
        "Backend Engineer",
        "Level 40 Code Wizard",
        "API Architect", 
        "Database Adept",
        "Cloud Explorer",
        "Systems Alchemist",
        "Microservices Architect",
        "Pipeline Builder",
        "Data Wrangler",
    ];
    const typewriterElement = document.getElementById('typewriter-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Section typewriter animation with looping
function sectionTypewriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Start the loop again after 5 seconds
            setTimeout(() => {
                sectionTypewriter(element, text, speed);
            }, 5000);
        }
    }
    
    type();
}

// Terminal footer animation
function terminalAnimation() {
    const output = document.getElementById('terminal-output');
    const messages = [
        'connection closed. Thanks for visiting!'
    ];
    
    let messageIndex = 0;
    
    function typeMessage() {
        if (messageIndex < messages.length) {
            const message = messages[messageIndex];
            let charIndex = 0;
            
            function typeChar() {
                if (charIndex < message.length) {
                    output.textContent = '[2025] ' + message.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeChar, 50);
                } else {
                    setTimeout(() => {
                        messageIndex++;
                        if (messageIndex < messages.length) {
                            setTimeout(typeMessage, 1000);
                        }
                    }, 2000);
                }
            }
            
            typeChar();
        }
    }
    
    setTimeout(typeMessage, 1000);
}

// Scroll reveal animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            reveal.classList.add('revealed');
        }
    });
}

// Ripple effect for skill nodes
function createRipple(event) {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Shockwave effect for portal button
function createShockwave(element) {
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    element.appendChild(shockwave);
    
    setTimeout(() => {
        shockwave.remove();
    }, 600);
}

// 8-BIT Music Toggle functionality
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('background-music');
    const musicText = musicToggle.querySelector('.music-text');
    const musicNudge = document.getElementById('musicNudge');
    let isPlaying = false;
    let nudgeInterval;

    // Function to show nudge
    function showNudge() {
        musicNudge.classList.add('show');
    }

    // Function to hide nudge
    function hideNudge() {
        musicNudge.classList.remove('show');
    }

    // Start nudge loop - show every 3 seconds
    function startNudgeLoop() {
        nudgeInterval = setInterval(() => {
            showNudge();
            // Hide after 2 seconds (within the 3-second cycle)
            setTimeout(() => {
                hideNudge();
            }, 2000);
        }, 3000);
    }

    // Start the nudge loop after initial delay
    setTimeout(() => {
        startNudgeLoop();
    }, 3000);

    // Hide nudge when user hovers over music toggle
    musicToggle.addEventListener('mouseenter', () => {
        hideNudge();
    });

    musicToggle.addEventListener('click', () => {
        // Stop the nudge loop when clicked
        if (nudgeInterval) {
            clearInterval(nudgeInterval);
        }
        hideNudge();

        if (isPlaying) {
            backgroundMusic.pause();
            musicText.textContent = '8-BIT OFF';
            musicToggle.classList.remove('active');
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
            });
            musicText.textContent = '8-BIT ON';
            musicToggle.classList.add('active');
            isPlaying = true;
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    createParticles();
    
    // Start typewriter animation
    typeWriterLoop();
    
    // Initialize music toggle
    initMusicToggle();
    
    // Initialize section typewriters
    const sectionTypewriters = document.querySelectorAll('.section-typewriter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.getAttribute('data-text');
                if (text) {
                    sectionTypewriter(element, text);
                }
                observer.unobserve(element);
            }
        });
    });
    
    sectionTypewriters.forEach(typewriter => {
        observer.observe(typewriter);
    });

    // Start terminal animation
    terminalAnimation();

    // Scroll reveal
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Initial check

    // Add ripple effect to skill nodes
    document.querySelectorAll('.skill-node').forEach(node => {
        node.addEventListener('click', createRipple);
    });

    // Add shockwave effect to portal button
    const portalBtn = document.getElementById('portal-btn');
    if (portalBtn) {
        portalBtn.addEventListener('mouseenter', () => {
            createShockwave(portalBtn);
        });
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            // Validate required fields
            if (!name || !email) {
                showFormMessage('Please fill in your name and email!', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address!', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = document.getElementById('portal-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <span class="animate-pulse">⚡</span>';
            
            try {
                // Replace with your Google Apps Script Web App URL
                // Get it after deploying your Google Apps Script (see GOOGLE_SHEETS_SETUP.md)
                const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqwpKLxZxVu4xMNJ8NIYgKQ49gg6ZdIBFYJYjYAuzaHV2XI0ZcDe1kAdoQ7C6fxpwDlQ/exec';
                
                // Google Apps Script works better with form data or URL-encoded data
                // We'll use a workaround by sending as form data
                const formData = new URLSearchParams();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('message', message || '');
                
                // Alternative: Send as JSON but handle CORS differently
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', // This prevents CORS errors but we can't read response
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString()
                });
                
                // With no-cors mode, we can't read the response
                // So we'll assume success if no error is thrown
                // Success
                showFormMessage('Message sent successfully! Adventure awaits! 🚀', 'success');
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
                
                return; // Exit early since we can't read response in no-cors mode
                
            } catch (error) {
                console.error('Error submitting form:', error);
                showFormMessage(
                    `Failed to send message: ${error.message}. Please try again or contact me directly at manikanthav-dev@outlook.com`, 
                    'error'
                );
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    function showFormMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.classList.remove('hidden');
        
        if (type === 'success') {
            formMessage.className = 'mt-4 p-3 rounded-lg text-center text-sm bg-green-900/50 text-green-300 border border-green-500/30';
        } else {
            formMessage.className = 'mt-4 p-3 rounded-lg text-center text-sm bg-red-900/50 text-red-300 border border-red-500/30';
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.floating');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Import AOS library (assuming it's included in your HTML)
// or declare it if it's a global variable

// Initialize AOS (Animate On Scroll) with modern settings
AOS.init({
    duration: 600,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    delay: 100
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    // Update icon
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }

    // Reinitialize particles with new theme
    initParticles();
});

// Import particles.js library (assuming it's included in your HTML)
// or declare it if it's a global variable

// Particles.js Configuration
function initParticles() {
    const isLightMode = body.classList.contains('light-mode');
    const particleColor = isLightMode ? '#1e40af' : '#0077ff';
    const lineColor = isLightMode ? '#3b82f6' : '#00e5ff';
    const opacity = isLightMode ? 0.6 : 0.5;
    const lineOpacity = isLightMode ? 0.4 : 0.4;

    particlesJS('particles-js', {
        particles: {
            number: {
                value: isLightMode ? 60 : 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: opacity,
                random: false
            },
            size: {
                value: isLightMode ? 4 : 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: lineColor,
                opacity: lineOpacity,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Initialize particles
initParticles();

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 500);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Modern Performance Optimizations
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Enhanced smooth scrolling with easing
function smoothScrollTo(target, duration = 800) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

const handleBackToTopScroll = debounce(() => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
}, 10);

window.addEventListener('scroll', handleBackToTopScroll, { passive: true });

backToTopButton.addEventListener('click', () => {
    smoothScrollTo(document.body, 600);
});

// Project Modal Functionality
const projectData = {
    ticketing: {
        title: "Enhanced Ticketing with Replacement Request System",
        image: "images/ticketing-project.jpg",
        role: "Full Stack Developer & System Administrator",
        description: "A comprehensive IT support ticketing system developed during my internship at Medical Center Parañaque. The system streamlines ticket and request handling with integrated SMTP email notifications and optimized workflows for efficient IT support operations.",
        responsibilities: [
            "Developed complete ticketing system using PHP and MySQL",
            "Integrated SMTP email system for automated notifications",
            "Optimized system workflows for ticket and request handling",
            "Provided technical support for network, hardware, and software issues",
            "Managed user accounts and domain joins via Active Directory",
            "Performed secure data backups and restorations",
            "Configured LAN/Wi-Fi, IP settings, and network infrastructure",
            "Documented IT service requests and procedures"
        ],
        technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "SMTP", "Active Directory"]
    },
    ocrs: {
        title: "OCRS Website",
        image: "images/ocrs-project.jpg",
        role: "Project Leader & Research Lead",
        description: "A real-time platform for reporting and resolving community issues in Barangay Sto. Niño, Parañaque City. The system integrates Google Maps API for precise location reporting and features a comprehensive dashboard for both residents and barangay officials.",
        responsibilities: [
            "Led the development team and managed project timeline",
            "Conducted research and requirements gathering with stakeholders",
            "Developed backend APIs and database architecture",
            "Implemented frontend features and user interface",
            "Coordinated with Barangay officials for deployment",
            "Managed hosting and database setup on Hostinger"
        ],
        technologies: ["MySQL", "PHP", "JavaScript", "Google Maps API", "Hostinger", "HTML/CSS", "Bootstrap"]
    },
    instabank: {
        title: "Instabank – E-Wallet App",
        image: "images/instabank-project.jpg",
        role: "Lead Developer",
        description: "A functional e-wallet prototype that enables real-time account transfers using Firebase Database. The app features secure authentication, real-time balance updates, and transaction history tracking.",
        responsibilities: [
            "Designed and implemented the app architecture",
            "Developed core functionality for money transfers",
            "Integrated Firebase for real-time data synchronization",
            "Implemented user authentication and security features",
            "Created intuitive user interface designs",
            "Conducted testing and bug fixes"
        ],
        technologies: ["Android Studio", "Java", "Firebase", "XML", "Material Design"]
    }
};

// Modal Elements
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalRole = document.getElementById('modalRole');
const modalDescription = document.getElementById('modalDescription');
const modalResponsibilities = document.getElementById('modalResponsibilities');
const modalTechnologies = document.getElementById('modalTechnologies');
const closeModal = document.querySelector('.close-modal');

// Open Modal
document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', (e) => {
        const projectCard = e.target.closest('.project-card');
        const projectId = projectCard.dataset.project;
        const project = projectData[projectId];

        modalTitle.textContent = project.title;
        modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
        modalRole.textContent = project.role;
        modalDescription.textContent = project.description;

        modalResponsibilities.innerHTML = project.responsibilities
            .map(resp => `<li>${resp}</li>`)
            .join('');

        modalTechnologies.innerHTML = project.technologies
            .map(tech => `<span class="tech-tag">${tech}</span>`)
            .join('');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target, 800);

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

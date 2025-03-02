// Import AOS library (assuming it's included in your HTML)
// or declare it if it's a global variable

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: false
});

// Import particles.js library (assuming it's included in your HTML)
// or declare it if it's a global variable

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#0077ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00e5ff',
            opacity: 0.4,
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

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project Modal Functionality
const projectData = {
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

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

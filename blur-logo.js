// JavaScript to automatically blur the Medical Center Parañaque logo

document.addEventListener('DOMContentLoaded', function() {
    
    // Function to apply blur effect
    function applyBlur(element) {
        element.style.filter = 'blur(8px)';
        element.style.webkitFilter = 'blur(8px)';
        element.style.transition = 'filter 0.3s ease';
    }
    
    // Method 1: Find images with medical center related content
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.src ? img.src.toLowerCase() : '';
        const alt = img.alt ? img.alt.toLowerCase() : '';
        
        if (src.includes('medical') || src.includes('center') || src.includes('paranaque') ||
            alt.includes('medical') || alt.includes('center') || alt.includes('paranaque')) {
            applyBlur(img);
        }
    });
    
    // Method 2: Find logos in the left container
    const leftContainers = document.querySelectorAll('.left-container, .left-panel, .login-left, .auth-left, .brand-section');
    leftContainers.forEach(container => {
        const logos = container.querySelectorAll('img, .logo, .brand, [class*="logo"], [class*="brand"]');
        logos.forEach(logo => applyBlur(logo));
    });
    
    // Method 3: Target by common logo class names
    const logoSelectors = [
        '.logo',
        '.brand',
        '.medical-center-logo',
        '.company-logo',
        '.brand-logo',
        '[class*="logo"]',
        '[class*="brand"]'
    ];
    
    logoSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Only blur if it's in the left half of the screen
            const rect = element.getBoundingClientRect();
            if (rect.left < window.innerWidth / 2) {
                applyBlur(element);
            }
        });
    });
    
    // Method 4: Find the first image in the left container
    const containers = document.querySelectorAll('div, section, aside');
    containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        // If container is in the left half of the screen
        if (rect.left < window.innerWidth / 2 && rect.width > 200) {
            const firstImg = container.querySelector('img');
            if (firstImg) {
                applyBlur(firstImg);
            }
        }
    });
    
    // Method 5: Specific targeting for IT HelpDesk interface
    const helpDeskLogos = document.querySelectorAll(
        '.helpdesk-login .logo, ' +
        '.medical-center-brand, ' +
        '.login-form .logo, ' +
        '.auth-container .brand'
    );
    helpDeskLogos.forEach(logo => applyBlur(logo));
    
    console.log('Logo blur script applied successfully');
});

// Alternative method using MutationObserver for dynamically loaded content
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    const images = node.querySelectorAll ? node.querySelectorAll('img') : [];
                    images.forEach(img => {
                        const src = img.src ? img.src.toLowerCase() : '';
                        const alt = img.alt ? img.alt.toLowerCase() : '';
                        
                        if (src.includes('medical') || src.includes('center') || 
                            alt.includes('medical') || alt.includes('center')) {
                            img.style.filter = 'blur(8px)';
                            img.style.webkitFilter = 'blur(8px)';
                        }
                    });
                }
            });
        }
    });
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

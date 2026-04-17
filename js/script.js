// Carousel image state - tracks current image for each car
const carouselState = [
    { current: 1 },
    { current: 1 },
    { current: 1 },
    { current: 1 },
    { current: 1 }
];

// Change carousel image
function changeImage(carIndex, direction) {
    const totalImages = 5;
    carouselState[carIndex].current += direction;
    
    // Wrap around
    if (carouselState[carIndex].current > totalImages) {
        carouselState[carIndex].current = 1;
    } else if (carouselState[carIndex].current < 1) {
        carouselState[carIndex].current = totalImages;
    }
    
    // Get all gallery items and update the specific one
    const galleryItems = document.querySelectorAll('.gallery-item');
    const carouselContainer = galleryItems[carIndex].querySelector('.carousel-container');
    const imagePath = `images/Prelude ${carIndex + 1}/prelude${carIndex + 1}-image${carouselState[carIndex].current}.jpg`;
    
    // Update image
    carouselContainer.querySelector('.carousel-image').src = imagePath;
    
    // Update counter
    carouselContainer.querySelector('.current-image').textContent = carouselState[carIndex].current;
}

// Pagination variables
let currentPage = 1;
const itemsPerPage = 2;
const totalItems = 5;
const totalPages = Math.ceil(totalItems / itemsPerPage);

// Initialize pagination
function initPagination() {
    renderPaginationNumbers();
    showPage(currentPage);
}

// Show specific page
function showPage(page) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    galleryItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Update active page number
    document.querySelectorAll('.page-number').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`button[data-page="${page}"]`).classList.add('active');
    
    // Update button states
    document.querySelector('.prev-page').disabled = page === 1;
    document.querySelector('.next-page').disabled = page === totalPages;
    
    currentPage = page;
}

// Previous page
function previousPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// Next page
function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

// Render pagination numbers
function renderPaginationNumbers() {
    const paginationContainer = document.getElementById('paginationNumbers');
    paginationContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-number';
        btn.setAttribute('data-page', i);
        btn.textContent = i;
        btn.onclick = () => showPage(i);
        paginationContainer.appendChild(btn);
    }
}

// Initialize pagination on page load
document.addEventListener('DOMContentLoaded', initPagination);

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

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill out all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.`);
    
    // Reset form
    this.reset();
});

// Add scroll animation to elements
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.gallery-item, .spec-item');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
        }
    });
});

// Mobile menu toggle (optional - for future mobile menu implementation)
function initMobileMenu() {
    // This function can be expanded later for mobile hamburger menu
    console.log('Mobile menu function ready');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    console.log('Larry\'s Preludes website loaded successfully');
});

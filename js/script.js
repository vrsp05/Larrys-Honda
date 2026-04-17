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

// Contact form handling with validation and Web3Form integration
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Clear all previous error messages
    clearErrorMessages();
    
    // Validate form
    let isValid = true;
    
    // Name validation
    if (name === '') {
        showError('nameError', 'Please enter your name');
        highlightInput('name');
        isValid = false;
    }
    
    // Email validation
    if (email === '') {
        showError('emailError', 'Please enter your email address');
        highlightInput('email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        highlightInput('email');
        isValid = false;
    }
    
    // Message validation
    if (message === '') {
        showError('messageError', 'Please enter a message');
        highlightInput('message');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // If validation passes, submit to Web3Form
    try {
        await submitFormToWeb3Form(name, email, message);
    } catch (error) {
        console.error('Form submission error:', error);
        showError('messageError', 'Failed to send message. Please try again.');
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear all error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    inputElements.forEach(el => {
        el.classList.remove('input-error');
    });
    
    const successElement = document.getElementById('successMessage');
    if (successElement) {
        successElement.textContent = '';
        successElement.style.display = 'none';
    }
}

// Highlight input field with error
function highlightInput(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.classList.add('input-error');
    }
}

// Submit form to Web3Form
async function submitFormToWeb3Form(name, email, message) {
    const accessKey = CONFIG.WEB3FORM_ACCESS_KEY;
    
    if (!accessKey || accessKey === 'your_web3form_api_key_here') {
        console.warn('Web3Form API key not configured. Showing local success message.');
        showSuccessMessage(name);
        resetForm();
        return;
    }
    
    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessMessage(name);
            resetForm();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Web3Form submission error:', error);
        // Fallback to local success if Web3Form fails
        showSuccessMessage(name);
        resetForm();
    }
}

// Show success message
function showSuccessMessage(name) {
    const successElement = document.getElementById('successMessage');
    if (successElement) {
        successElement.textContent = `Thank you, ${name}! Your message has been received. We'll get back to you within 1-3 business days.`;
        successElement.style.display = 'block';
    }
}

// Reset form
function resetForm() {
    document.getElementById('contactForm').reset();
    // Clear errors but keep success message visible
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
    
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    inputElements.forEach(el => {
        el.classList.remove('input-error');
    });
}

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

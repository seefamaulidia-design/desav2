// Main JavaScript for Desa Way Ilahan Website

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initDropdowns();
    initMobileMenu();
    initScrollToTop();
});

// Dropdown functionality
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'none';
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Add mobile toggle button if needed
        const menu = navbar.querySelector('.navbar-menu');
        if (menu && window.innerWidth <= 768) {
            menu.style.display = 'none';
        }
    }
}

// Scroll to top button
function initScrollToTop() {
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            showScrollToTop();
        } else {
            hideScrollToTop();
        }
    });
}

function showScrollToTop() {
    let button = document.getElementById('scrollToTop');
    if (!button) {
        button = document.createElement('button');
        button.id = 'scrollToTop';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #3498db;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            z-index: 99;
            display: none;
            transition: all 0.3s;
        `;
        document.body.appendChild(button);
        button.addEventListener('click', scrollToTop);
    }
    button.style.display = 'block';
}

function hideScrollToTop() {
    const button = document.getElementById('scrollToTop');
    if (button) {
        button.style.display = 'none';
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.insertBefore(notification, document.body.firstChild);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Confirm dialog
function confirmAction(message) {
    return confirm(message);
}

// Local storage helpers
const Storage = {
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: function(key) {
        localStorage.removeItem(key);
    },
    clear: function() {
        localStorage.clear();
    }
};

// API calls
const API = {
    async get(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('GET Error:', error);
            throw error;
        }
    },
    
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('POST Error:', error);
            throw error;
        }
    },
    
    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('PUT Error:', error);
            throw error;
        }
    },
    
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            console.error('DELETE Error:', error);
            throw error;
        }
    }
};

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
    const re = /^(\+62|62|0)[0-9]{9,12}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Validate NIK (Indonesian ID)
function isValidNIK(nik) {
    return /^\d{16}$/.test(nik);
}

// Trim whitespace from object values
function trimObject(obj) {
    const trimmed = {};
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            trimmed[key] = obj[key].trim();
        } else {
            trimmed[key] = obj[key];
        }
    }
    return trimmed;
}

// Export utilities
window.DesaUtils = {
    formatCurrency,
    formatDate,
    showNotification,
    confirmAction,
    Storage,
    API,
    isValidEmail,
    isValidPhone,
    isValidNIK,
    trimObject
};

console.log('Sistem Data Desa Way Ilahan - Initialized');

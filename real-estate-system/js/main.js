// Global Navigation & Utils
const PAGES = ['index.html','login.html','register.html','dashboard.html','properties.html','property-details.html','agents.html','clients.html','bookings.html','payments.html','reports.html','contact.html','about.html','admin.html','add-property.html','edit-property.html','delete-property.html','search.html','favorites.html','messages.html','notifications.html','settings.html','profile.html','terms.html','help.html','faq.html','logout.html','analytics.html','reviews.html','transactions.html','map.html','error.html'];

function highlightNav() {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach((a, i) => {
        a.classList.toggle('active', PAGES[i] === current);
    });
}

// Auth Management
function getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
}

function isAdmin() {
    const user = getUser();
    return user && user.isAdmin;
}

function requireLogin(redirect = 'login.html') {
    if (!getUser() || !getUser().loggedIn) {
        window.location.href = redirect;
    }
}

function requireAdmin(redirect = 'dashboard.html') {
    if (!isAdmin()) {
        alert('Admin access required');
        window.location.href = redirect;
    }
}

// Property Management
function getProperties() {
    return JSON.parse(localStorage.getItem('properties') || '[]');
}

function saveProperties(props) {
    localStorage.setItem('properties', JSON.stringify(props));
}

function getAgents() {
    return JSON.parse(localStorage.getItem('agents') || '[]');
}

// Bookings
function getBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Favorites
function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const idx = favorites.indexOf(id);
    if (idx > -1) {
        favorites.splice(idx, 1);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return idx === -1;
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightNav();
    
    // Auto-redirect unauth users from protected pages
    const protectedPages = ['dashboard.html', 'admin.html', 'agents.html'];
    if (protectedPages.includes(location.pathname.split('/').pop())) {
        requireLogin();
    }
    
    // Mock data init
    if (!localStorage.getItem('properties')) {
        const mockProps = Array.from({length: 20}, (_, i) => ({
            id: i+1,
            title: `Premium Property ${i+1}`,
            price: (Math.random()*800 + 200).toFixed(0),
            location: ['Kigali', 'Nairobi', 'Kampala'][Math.floor(Math.random()*3)],
            desc: 'Luxury property with modern amenities in prime location.',
            agent: 'John Doe',
            img: `https://source.unsplash.com/400x300/?house,${i}`
        }));
        saveProperties(mockProps);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// DOM Elements
const loginSection = document.getElementById('loginSection');
const protectedSection = document.getElementById('protectedSection');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const userEmailSpan = document.getElementById('userEmail');
const sessionDaysSpan = document.getElementById('sessionDays');
const logoutBtn = document.getElementById('logoutBtn');

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('authenticatedUser'));
    
    if (user) {
        showProtectedContent(user);
    }
});

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Basic validation
    if (!email || !password) {
        loginError.textContent = 'Please fill in all fields';
        return;
    }

    if (!validateEmail(email)) {
        loginError.textContent = 'Please enter a valid email';
        return;
    }

    try {
        const user = await authenticateUser(email, password);
        
        if (user) {
            localStorage.setItem('authenticatedUser', JSON.stringify(user));
            showProtectedContent(user);
        } else {
            loginError.textContent = 'Invalid email or password';
        }
    } catch (error) {
        loginError.textContent = 'Error during authentication';
        console.error('Authentication error:', error);
    }
});

// Logout button
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('authenticatedUser');
    showLoginForm();
});

// Functions
function showProtectedContent(user) {
    userEmailSpan.textContent = user.email;
    sessionDaysSpan.textContent = user.session_days;
    loginSection.style.display = 'none';
    protectedSection.style.display = 'block';
}

function showLoginForm() {
    loginForm.reset();
    loginSection.style.display = 'block';
    protectedSection.style.display = 'none';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

async function authenticateUser(email, password) {
    return new Promise((resolve) => {
        Papa.parse('daftaremail.csv', {
            download: true,
            header: true,
            complete: (results) => {
                const user = results.data.find(u => 
                    u.email === email && u.password === password
                );
                resolve(user || null);
            },
            error: () => resolve(null)
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorElement = document.getElementById('errorMessage');

    // Redirect to protected page if already logged in
    if (checkAuth()) {
        window.location.href = 'protected.html';
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Reset error message
        errorElement.textContent = '';
        
        // Basic validation
        if (!email || !password) {
            errorElement.textContent = 'Please fill in all fields';
            return;
        }
        
        if (!validateEmail(email)) {
            errorElement.textContent = 'Please enter a valid email address';
            return;
        }
        
        // Authenticate user
        const user = await authenticateUser(email, password);
        
        if (user) {
            // Store user data in localStorage (in a real app, use proper session management)
            localStorage.setItem('authenticatedUser', JSON.stringify(user));
            
            // Redirect to protected page
            window.location.href = 'protected.html';
        } else {
            errorElement.textContent = 'Invalid email or password';
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

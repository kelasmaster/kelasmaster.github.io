document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorElement = document.getElementById('errorMessage');
    
    // Reset error message
    errorElement.textContent = '';
    
    // Client-side validation
    if (!email || !password) {
        errorElement.textContent = 'Please fill in all fields';
        return;
    }
    
    if (!validateEmail(email)) {
        errorElement.textContent = 'Please enter a valid email address';
        return;
    }
    
    // Simulate checking against CSV data (in a real app, this would be a server request)
    const users = [
        { email: 'bandarlaundry@gmail.com', password: 'password123', sessionDays: 7 },
        { email: 'bandardeterjen@gmail.com', password: 'password456', sessionDays: 14 },
        { email: 'aiindonesiaart@gmail.com', password: 'password789', sessionDays: 30 }
    ];
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // In a real application, you would send this to your server
        // to create a proper session. This is just for demonstration.
        alert(`Login successful! Your session will last ${user.sessionDays} days.`);
        
        // Here you would typically redirect to the protected area
        // window.location.href = 'protected.html';
    } else {
        errorElement.textContent = 'Invalid email or password';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

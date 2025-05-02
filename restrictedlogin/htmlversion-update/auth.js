// Load user data from CSV
async function loadUserData() {
    return new Promise((resolve, reject) => {
        Papa.parse('daftaremail.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}

// Authenticate user
async function authenticateUser(email, password) {
    try {
        const users = await loadUserData();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            return {
                email: user.email,
                sessionDays: user.session_days,
                authenticated: true
            };
        }
        return null;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
}

// Check if user is authenticated
function checkAuth() {
    return localStorage.getItem('authenticatedUser');
}

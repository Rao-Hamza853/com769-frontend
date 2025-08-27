// login.js
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }

        // IMPORTANT: Store the token in the browser's local storage
        localStorage.setItem('token', data.token);

        alert('Login successful!');
        window.location.href = '/index.html'; // Redirect to the main dashboard

    } catch (error) {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message}`);
    }
});
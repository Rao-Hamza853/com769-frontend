// signup.js
document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the page from reloading

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            // If the server response is not OK (e.g., 400, 500), throw an error
            throw new Error(data.message || 'Something went wrong');
        }

        alert('Signup successful! Please log in.');
        window.location.href = '/login.html'; // Redirect to the login page

    } catch (error) {
        console.error('Signup failed:', error);
        alert(`Signup failed: ${error.message}`);
    }
});
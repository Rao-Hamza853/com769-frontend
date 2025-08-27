document.addEventListener('DOMContentLoaded', () => {
    // This is a protected route. First, check if a token exists.
    const token = localStorage.getItem('token');
    if (!token) {
        // If no token, the user is not logged in. Redirect them to the login page.
        alert('You must be logged in to upload a video.');
        window.location.href = '/login.html';
        return; // Stop the rest of the script from running
    }

    const uploadForm = document.getElementById('upload-form');
    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Use FormData to handle file uploads along with other form fields.
        // This is necessary for 'multipart/form-data' requests.
        const formData = new FormData(uploadForm);

        try {
            const response = await fetch(`${API_BASE_URL}/videos/upload`, {
                method: 'POST',
                // IMPORTANT: When using FormData, you DO NOT set the 'Content-Type' header.
                // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
                headers: {
                    // We must include the authentication token to access this protected route.
                    'x-auth-token': token
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                // The error message from the backend will be in data.message
                throw new Error(data.message || 'Upload failed');
            }

            alert('Video uploaded successfully!');
            window.location.href = '/index.html'; // Redirect to the dashboard

        } catch (error) {
            console.error('Upload Error:', error);
            alert(`Error during upload: ${error.message}`);
        }
    });
});
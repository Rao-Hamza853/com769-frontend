// index.js
document.addEventListener('DOMContentLoaded', () => {
    fetchVideos();

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token'); // Clear the token
            alert('You have been logged out.');
            window.location.href = '/login.html'; // Redirect to login
        });
    }
});

async function fetchVideos() {
    const videoGrid = document.getElementById('video-grid');
    try {
        const response = await fetch(`${API_BASE_URL}/videos`);
        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }
        const videos = await response.json();

        // Clear any existing content
        videoGrid.innerHTML = ''; 

        // Loop through the videos and create a card for each one
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'bg-gray-800 rounded-lg shadow-lg overflow-hidden';

            videoCard.innerHTML = `
                <video controls class="w-full h-48 object-cover" src="${video.videoUrl}"></video>
                <div class="p-4">
                    <h3 class="font-bold text-lg mb-1">${video.title}</h3>
                    <p class="text-gray-400 text-sm">Publisher: ${video.publisher || 'N/A'}</p>
                </div>
            `;
            videoGrid.appendChild(videoCard);
        });

    } catch (error) {
        console.error('Error fetching videos:', error);
        videoGrid.innerHTML = '<p class="text-red-500">Could not load videos.</p>';
    }
}
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Mặc định tự động nhận diện localhost, khi lên mạng sẽ trỏ về Render Backend
export const BACKEND_URL = isLocalhost
    ? 'http://localhost:5000'
    : 'https://homnaynaugi.onrender.com';

export const API_URL = `${BACKEND_URL}/api`;

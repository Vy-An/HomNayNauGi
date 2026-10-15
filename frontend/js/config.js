const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Tu dong nhan dien: Chay may thi tro localhost:5000, chay live thi tro Render
export const BACKEND_URL = isLocalhost
    ? 'http://localhost:5000'
    : 'https://homnaynaugi.onrender.com';

export const API_URL = `${BACKEND_URL}/api`;

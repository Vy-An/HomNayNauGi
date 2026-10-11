const API_URL = 'http://localhost:5000/api';

export async function fetchAPI(endpoint, options = {}) {
    try {
        const token = localStorage.getItem('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        return await response.json();
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        return { success: false, message: 'Không thể kết nối đến máy chủ.' };
    }
}

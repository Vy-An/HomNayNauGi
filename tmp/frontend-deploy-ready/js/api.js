import { API_URL, BACKEND_URL } from './config.js?v=f6fc70a84d8c';
export { API_URL, BACKEND_URL };
export const DEFAULT_AVATAR_URL = `https://otakuminihub.io.vn/api/images/users/admin.jpg`;

export function normalizeAssetUrl(value, fallback = '') {
    const rawValue = value == null || value === '' ? fallback : value;
    if (!rawValue) return rawValue;

    const originalValue = String(rawValue);
    const trimmedValue = originalValue.trim();
    if (!trimmedValue) return fallback || '';
    if (/^(data|blob):/i.test(trimmedValue)) return trimmedValue;
    if (/\/images\/users\/default\.png(?:$|\?)/i.test(trimmedValue)) {
        return fallback || DEFAULT_AVATAR_URL;
    }

    if (/^https?:\/\/localhost:\d+\/images\//i.test(trimmedValue)) {
        return trimmedValue.replace(/^https?:\/\/localhost:\d+\/images\//i, `https://otakuminihub.io.vn/api/images/`);
    }

    if (/^https?:\/\/otakuminihub\.io\.vn\/images\//i.test(trimmedValue)) {
        return trimmedValue.replace(/^https?:\/\/otakuminihub\.io\.vn\/images\//i, `https://otakuminihub.io.vn/api/images/`);
    }

    if (/^\/images\//i.test(trimmedValue)) {
        return `https://otakuminihub.io.vn/api${trimmedValue}`;
    }

    if (/^images\//i.test(trimmedValue)) {
        return `https://otakuminihub.io.vn/api/${trimmedValue}`;
    }

    return originalValue;
}

function normalizeApiPayload(value) {
    if (Array.isArray(value)) return value.map(normalizeApiPayload);
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, normalizeApiPayload(item)])
        );
    }
    if (typeof value === 'string') return normalizeAssetUrl(value);
    return value;
}

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

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return normalizeApiPayload(data);
        }

        return { 
            success: response.ok, 
            message: response.ok ? 'Thành công' : `Lỗi ${response.status}: Yêu cầu không thành công.` 
        };
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        return { success: false, message: 'Không thể kết nối đến máy chủ.' };
    }
}

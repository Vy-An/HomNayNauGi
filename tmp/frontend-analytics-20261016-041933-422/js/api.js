import { trackFavoriteChange } from './analytics.js?v=20261016-6c6851d781';

export const API_URL = 'https://otakuminihub.io.vn/api';
export const BACKEND_URL = API_URL;
export const DEFAULT_AVATAR_URL = `${BACKEND_URL}/images/users/admin.jpg`;

const hostingOrigin = new URL(API_URL).origin;
const managedImageHosts = new Set([
    new URL(API_URL).hostname,
    'localhost',
    '127.0.0.1',
    '[::1]',
    'homnaynaugi.onrender.com'
]);

export function normalizeAssetUrl(value, fallback = '') {
    const rawValue = value == null || value === '' ? fallback : value;
    if (!rawValue) return rawValue;

    const originalValue = String(rawValue);
    const trimmedValue = originalValue.trim();
    if (!trimmedValue) return fallback || '';
    if (/^(data|blob):/i.test(trimmedValue)) return trimmedValue;
    if (/\/images\/users\/default\.png(?:$|[?#])/i.test(trimmedValue)) {
        return fallback && fallback !== rawValue
            ? normalizeAssetUrl(fallback)
            : DEFAULT_AVATAR_URL;
    }

    try {
        const url = new URL(trimmedValue, `${hostingOrigin}/`);
        if (managedImageHosts.has(url.hostname) && /^\/(?:api\/)?images\//i.test(url.pathname)) {
            const imagePath = url.pathname.replace(/^\/(?:api\/)?images\//i, '/images/');
            return `${BACKEND_URL}${imagePath}${url.search}${url.hash}`;
        }
    } catch {
        return originalValue;
    }

    return originalValue;
}

export function normalizeApiPayload(value) {
    if (Array.isArray(value)) return value.map(normalizeApiPayload);
    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, item]) => [key, normalizeApiPayload(item)])
        );
    }
    if (typeof value === 'string') return normalizeAssetUrl(value);
    return value;
}

export async function fetchWithTracking(url, options = {}) {
    const response = await fetch(url, options);
    const method = String(options.method || 'GET').toUpperCase();
    if (!response.ok || !['POST', 'DELETE'].includes(method)) return response;

    try {
        const requestUrl = new URL(url, API_URL + '/');
        const apiUrl = new URL(API_URL);
        if (requestUrl.origin !== apiUrl.origin || !requestUrl.pathname.startsWith(apiUrl.pathname + '/')) return response;
        const route = requestUrl.pathname.slice(apiUrl.pathname.length);
        const match = /^\/(?:foods\/(\d+)\/favorite|auth\/me\/favorites\/(\d+))\/?$/.exec(route);
        if (!match || (match[1] && method !== 'POST')) return response;
        const payload = await response.clone().json();
        if (payload.success !== true) return response;
        if (match[1]) {
            if (typeof payload.is_favorite === 'boolean') trackFavoriteChange(match[1], payload.is_favorite);
        } else {
            trackFavoriteChange(match[2], method === 'POST');
        }
    } catch {}

    return response;
}

export async function fetchAPI(endpoint, options = {}) {
    try {
        const token = localStorage.getItem('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers
        };

        const response = await fetchWithTracking(`${API_URL}${endpoint}`, {
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

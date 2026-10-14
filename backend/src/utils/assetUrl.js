function getPublicBaseUrl() {
    return process.env.PUBLIC_BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
}

function resolveAssetUrl(value) {
    if (!value) return value;

    const rawValue = String(value);
    if (/^(https?:)?\/\//i.test(rawValue) || /^(data|blob):/i.test(rawValue)) {
        return rawValue;
    }

    const normalizedPath = rawValue.startsWith('/') ? rawValue : `/${rawValue}`;
    return `${getPublicBaseUrl()}${normalizedPath}`;
}

module.exports = {
    resolveAssetUrl
};

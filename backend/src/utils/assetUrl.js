function getPublicBaseUrl() {
<<<<<<< HEAD
    return (process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, '');
=======
    return process.env.PUBLIC_BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
>>>>>>> origin/develop
}

function resolveAssetUrl(value) {
    if (!value) return value;

    const rawValue = String(value);
    if (/^(https?:)?\/\//i.test(rawValue) || /^(data|blob):/i.test(rawValue)) {
        if (process.env.NODE_ENV === 'production') {
            const publicRoot = getPublicBaseUrl().replace(/\/api$/, '');
            const imageRoot = `${publicRoot}/images/`;
            if (rawValue.startsWith(imageRoot)) {
                return rawValue.replace(`${publicRoot}/images/`, `${publicRoot}/api/images/`);
            }
        }

        return rawValue;
    }

    const normalizedPath = rawValue.startsWith('/') ? rawValue : `/${rawValue}`;
    const publicBaseUrl = getPublicBaseUrl();
    const shouldUseApiImageBase = process.env.NODE_ENV === 'production'
        && normalizedPath.startsWith('/images/')
        && !publicBaseUrl.endsWith('/api');

    return `${publicBaseUrl}${shouldUseApiImageBase ? '/api' : ''}${normalizedPath}`;
}

module.exports = {
    resolveAssetUrl
};

export function trackEvent(name, parameters = {}) {
    try {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', name, parameters);
        }
    } catch {}
}

export function trackFavoriteChange(foodId, isFavorite) {
    const id = Number(foodId);
    if (!Number.isInteger(id) || id <= 0) return;
    trackEvent(isFavorite ? 'favorite_add' : 'favorite_remove', { food_id: String(id) });
}

export function trackGuestFavoritesChange(previous, next) {
    const ids = list => new Set((Array.isArray(list) ? list : [])
        .map(item => Number(item && (item.id_food || item.id)))
        .filter(id => Number.isInteger(id) && id > 0));
    const before = ids(previous);
    const after = ids(next);
    for (const id of after) if (!before.has(id)) trackFavoriteChange(id, true);
    for (const id of before) if (!after.has(id)) trackFavoriteChange(id, false);
}

export default function FoodCard({ id, name, image, time, likes, author, description, is_favorite, isFavorite }) {
    const isFav = Boolean(is_favorite ?? isFavorite);
    const imageUrl = image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
    const link = `#/mon-an/${id || 1}`;
    const foodId = id || 1;
    const likesCount = likes ?? 0;
    
    return `
        <a href="${link}" class="block bg-white rounded-[20px] shadow-sm hover:shadow-md overflow-hidden group cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-beige-border/80 flex flex-col h-full relative">
            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine z-20 pointer-events-none"></div>
            
            <!-- Image Section -->
            <div class="relative aspect-[16/10] overflow-hidden bg-cream-soft">
                <img src="${imageUrl}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Cooking Time Badge -->
                <div class="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 z-20 shadow-xs">
                    <i class="fa-regular fa-clock text-accent-light text-[10px]"></i> ${time || '30 phút'}
                </div>

                <!-- Nút Thích / Lưu món -->
                <button 
                    type="button"
                    class="food-fav-btn btn-favorite-dish absolute top-2.5 right-2.5 ${isFav || (typeof window !== 'undefined' && window.isDishFavorite && window.isDishFavorite(foodId)) ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-500 hover:text-rose-500'} backdrop-blur-md rounded-full w-8.5 h-8.5 flex items-center justify-center transition-all hover:scale-110 z-30 shadow-sm cursor-pointer" 
                    data-id="${foodId}"
                    data-food-id="${foodId}"
                    title="${isFav ? 'Bỏ yêu thích' : 'Lưu món ăn yêu thích'}"
                    onclick="event.preventDefault(); event.stopPropagation(); if (window.toggleFoodFavorite) { window.toggleFoodFavorite(event, ${foodId}); } else if (window.toggleFavoriteDish) { window.toggleFavoriteDish({ id: ${foodId}, name: '${(name || '').replace(/'/g, "\\'")}', image: '${(image || '').replace(/'/g, "\\'")}', time: '${time || '30 phút'}' }); }"
                >
                    <i class="${isFav || (typeof window !== 'undefined' && window.isDishFavorite && window.isDishFavorite(foodId)) ? 'fa-solid' : 'fa-regular'} fa-heart text-sm"></i>
                </button>
            </div>

            <!-- Body Section -->
            <div class="p-4 sm:p-4.5 flex flex-col flex-grow">
                <div class="flex items-start justify-between gap-2 mb-1.5">
                    <h3 class="font-extrabold text-sm sm:text-base text-text-main line-clamp-2 group-hover:text-primary transition-colors leading-snug flex-1">${name}</h3>
                    <!-- Số lượt thích -->
                    <div class="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md shrink-0 mt-0.5" title="${likesCount} lượt thích">
                        <i class="fa-solid fa-heart text-rose-500 text-[10px]"></i>
                        <span class="card-likes-count" data-food-id="${foodId}">${likesCount}</span>
                    </div>
                </div>
                
                <p class="text-xs text-text-muted mb-3.5 line-clamp-2 flex-grow leading-relaxed">${description || 'Món ăn thơm ngon, hấp dẫn và cung cấp đầy đủ dinh dưỡng, dễ dàng thực hiện tại nhà.'}</p>
                
                <div class="mt-auto pt-3 border-t border-[#F0EBE0]">
                    <!-- Nút Xem công thức -->
                    <div class="w-full py-2 bg-primary/8 group-hover:bg-primary text-primary group-hover:text-white font-bold rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-sm">
                        <span>Xem công thức</span>
                        <i class="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
                    </div>
                </div>
            </div>
        </a>
    `;
}

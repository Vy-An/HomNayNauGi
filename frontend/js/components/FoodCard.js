export default function FoodCard({ id, name, image, time, likes, author, description }) {
    const imageUrl = image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
    const link = `#/mon-an/${id || 1}`;
    
    return `
        <a href="${link}" class="block bg-white rounded-2xl shadow-bento overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full relative">
            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine z-20 pointer-events-none"></div>
            
            <!-- Image Section -->
            <div class="relative h-52 overflow-hidden">
                <img src="${imageUrl}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <!-- Cooking Time Badge -->
                <div class="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-20 shadow-xs">
                    <i class="fa-regular fa-clock text-amber-300"></i> ${time || '30 phút'}
                </div>
            </div>

            <!-- Body Section -->
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-extrabold text-lg text-text-main mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">${name}</h3>
                ${description ? `<p class="text-sm text-text-muted mb-3 line-clamp-2">${description}</p>` : ''}
                
                <div class="mt-auto space-y-3 pt-3 border-t border-gray-100">
                    <!-- Heart / Likes row & Nút Thích -->
                    <div class="flex items-center justify-between text-sm">
                        <!-- Số lượt thích -->
                        <div class="flex items-center gap-1.5 font-bold text-red-500">
                            <i class="fa-solid fa-heart text-red-500"></i>
                            <span>${likes || '2.5k'}</span>
                        </div>

                        <!-- Nút Thích (Nút bấm tương tác) -->
                        <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold transition-all active:scale-95 border border-red-100/80 shadow-2xs" onclick="event.preventDefault(); event.stopPropagation(); const isLiked = this.classList.contains('bg-red-500'); if(!isLiked) { this.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold transition-all active:scale-95 shadow-2xs'; this.querySelector('i').className = 'fa-solid fa-heart text-xs'; } else { this.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 text-xs font-bold transition-all active:scale-95 border border-red-100/80 shadow-2xs'; this.querySelector('i').className = 'fa-regular fa-heart text-xs'; }">
                            <i class="fa-regular fa-heart text-xs"></i>
                            <span>Thích</span>
                        </button>
                    </div>

                    <!-- Nút Xem công thức -->
                    <div class="w-full py-2.5 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs">
                        <span>Xem công thức</span>
                        <i class="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                    </div>
                </div>
            </div>
        </a>
    `;
}

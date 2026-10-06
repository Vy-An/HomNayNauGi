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

                <!-- Nút Thích -->
                <button class="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center text-red-500 transition-all hover:scale-110 z-30 shadow-sm" onclick="event.preventDefault(); event.stopPropagation(); const isLiked = this.classList.contains('bg-red-500'); if(!isLiked) { this.className = 'absolute top-3 right-3 bg-red-500 backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center text-white transition-all hover:scale-110 z-30 shadow-sm'; this.querySelector('i').className = 'fa-solid fa-heart text-[15px]'; } else { this.className = 'absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full w-9 h-9 flex items-center justify-center text-red-500 transition-all hover:scale-110 z-30 shadow-sm'; this.querySelector('i').className = 'fa-regular fa-heart text-[15px]'; }">
                    <i class="fa-regular fa-heart text-[15px]"></i>
                </button>
            </div>

            <!-- Body Section -->
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex items-start justify-between gap-3 mb-2">
                    <h3 class="font-extrabold text-lg text-text-main line-clamp-2 group-hover:text-primary transition-colors leading-tight">${name}</h3>
                    <!-- Số lượt thích -->
                    <div class="flex items-center gap-1.5 font-bold text-red-500 shrink-0 mt-0.5">
                        <i class="fa-solid fa-heart"></i>
                        <span>${likes || '2.5k'}</span>
                    </div>
                </div>
                
                <p class="text-sm text-text-muted mb-4 line-clamp-2 flex-grow">${description || 'Món ăn thơm ngon, hấp dẫn và cung cấp đầy đủ dinh dưỡng, dễ dàng thực hiện tại nhà.'}</p>
                
                <div class="mt-auto pt-3 border-t border-gray-100">
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

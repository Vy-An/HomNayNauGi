export default function FoodCard({ id, name, image, time, likes, author, description }) {
    const imageUrl = image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
    const link = `#/mon-an/${id || 1}`;
    
    return `
        <a href="${link}" class="block bg-white rounded-xl shadow-bento overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full relative">
            <!-- Shine Effect -->
            <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shine z-20 pointer-events-none"></div>
            
            <div class="relative h-56 overflow-hidden">
                <img src="${imageUrl}" alt="${name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button class="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-2.5 text-gray-400 hover:text-red-500 transition-colors shadow-sm hover:scale-110 z-30" onclick="event.preventDefault(); /* Logic tym */">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <div class="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 z-30">
                    <i class="fa-solid fa-clock"></i> ${time || '30 phút'}
                </div>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-extrabold text-lg text-text-main mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">${name}</h3>
                ${description ? `<p class="text-sm text-text-muted mb-4 line-clamp-3">${description}</p>` : ''}
                
                <div class="mt-auto">
                    ${author ? `
                    <div class="pt-3 border-t border-gray-50 flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-7 h-7 rounded-full bg-gray-200 overflow-hidden ring-2 ring-primary-subtle">
                                <img src="${author.avatar || `https://i.pravatar.cc/150?u=${id}`}" alt="Avatar" class="w-full h-full object-cover">
                            </div>
                            <span class="text-sm font-semibold text-text-main">${author.name}</span>
                        </div>
                        <div class="flex items-center gap-1 text-sm font-bold text-accent">
                            <i class="fa-solid fa-thumbs-up"></i> ${likes || '1.2k'}
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        </a>
    `;
}

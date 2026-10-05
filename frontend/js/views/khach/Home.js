import { fetchAPI } from '../../api.js';
import FoodCard from '../../components/FoodCard.js';

const dummyFoods = [
    { id: 1, name: 'Thịt Kho Trứng & Canh Chua', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '45 phút', likes: '2.5k', author: { name: 'Mẹ Bông' }, description: 'Mâm cơm truyền thống đậm đà hương vị quê hương, ăn là ghiền.' },
    { id: 2, name: 'Gà Xào Sả Ớt & Rau Luộc', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '30 phút', likes: '1.1k', author: { name: 'Lan Anh' }, description: 'Món ăn đơn giản, nhanh gọn nhưng cực kỳ đưa cơm cho những ngày bận rộn.' },
    { id: 3, name: 'Bò Xào Lúc Lắc', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '20 phút', likes: '3.4k', author: { name: 'Chef Tùng' }, description: 'Thịt bò mềm mọng, đậm đà gia vị kết hợp cùng rau củ giòn ngọt thanh mát.' }
];

const ITEM_HEIGHT = 160;

const Home = {
    render: async () => {
        const spotlightFood = dummyFoods[0];
        const otherFoods = dummyFoods.slice(1);
        
        const spotlightHTML = `
            <a href="#/mon-an/${spotlightFood.id}" class="col-span-1 sm:col-span-2 lg:col-span-1 block bg-white rounded-2xl shadow-bento overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary-light/20 relative aspect-square">
                <!-- Shine Effect -->
                <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shine z-20 pointer-events-none"></div>

                <img src="${spotlightFood.image}" alt="${spotlightFood.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div class="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 z-30">
                    <i class="fa-solid fa-fire text-sm"></i> Món ngon của ngày
                </div>
                <button class="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:text-red-500 transition-colors shadow-sm hover:scale-110 z-30" onclick="event.preventDefault();">
                    <i class="fa-solid fa-heart text-xl"></i>
                </button>

                <div class="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-30">
                    <h3 class="font-extrabold text-2xl lg:text-3xl text-white mb-2 line-clamp-2 leading-tight group-hover:text-accent-light transition-colors">${spotlightFood.name}</h3>
                    
                    <div class="flex flex-wrap items-center gap-3 mt-2">
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ring-2 ring-white">
                                <img src="${spotlightFood.author?.avatar || `https://i.pravatar.cc/150?u=${spotlightFood.id}`}" alt="Avatar" class="w-full h-full object-cover">
                            </div>
                            <span class="text-sm font-semibold text-white/90">${spotlightFood.author?.name}</span>
                        </div>
                        <div class="flex items-center gap-1 text-sm font-bold text-accent-light bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                            <i class="fa-solid fa-thumbs-up"></i> ${spotlightFood.likes}
                        </div>
                    </div>
                </div>
            </a>
        `;

        const otherCardsHTML = otherFoods.map(food => FoodCard(food)).join('');


        return `
            <!-- Banner & Gacha -->
            <section class="bg-background relative overflow-hidden py-12 md:py-20">
                <!-- Decorative blobs -->
                <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div class="absolute top-[20%] right-[-10%] w-96 h-96 bg-accent-light/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

                <div class="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row items-stretch gap-8">
                    
                    <!-- Cột Trái: Máy Gacha (60%) -->
                    <div class="w-full lg:w-3/5 flex flex-col items-center justify-start bg-card/60 backdrop-blur-xl rounded-2xl p-4 lg:p-6 shadow-bento border border-white min-h-[550px] lg:min-h-[650px]">
                        <!-- Slot Machine Container (Đẩy lên trên cùng) -->
                        <div id="slot-machine-container" class="w-full flex flex-col justify-start items-center"></div>
                        
                        <!-- Results Container (Luôn chừa sẵn không gian cố định ở dưới) -->
                        <div id="gacha-results-container" class="w-full mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x items-center justify-center min-h-[160px]"></div>
                    </div>

                    <!-- Cột Phải: Bộ Lọc (40%) -->
                    <div class="w-full lg:w-2/5 bg-glass-gradient backdrop-blur-xl rounded-2xl p-8 shadow-bento border border-white flex flex-col relative overflow-hidden">
                        
                        <h2 class="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                            <span class="p-2 bg-primary-subtle rounded-xl text-2xl shadow-sm border border-white text-primary"><i class="fa-solid fa-bowl-food"></i></span> Tùy chỉnh
                        </h2>
                        
                        <form id="gacha-form" class="space-y-6 flex-1 flex flex-col">
                            <!-- 1. Chọn số lượng món -->
                            <div class="bg-white/80 p-4 rounded-xl shadow-sm border border-white">
                                <label class="flex items-center gap-2 text-text-main font-bold mb-3 text-sm">
                                    <span class="w-6 h-6 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs border border-primary-light/30">1</span> Số lượng
                                </label>
                                <div class="grid grid-cols-4 gap-2">
                                    <label class="cursor-pointer group">
                                        <input type="radio" name="quantity" value="1" class="peer sr-only" checked>
                                        <div class="text-center py-2.5 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-bold text-xs group-hover:border-primary-light">1 món</div>
                                    </label>
                                    <label class="cursor-pointer group">
                                        <input type="radio" name="quantity" value="2" class="peer sr-only">
                                        <div class="text-center py-2.5 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-bold text-xs group-hover:border-primary-light">2 món</div>
                                    </label>
                                    <label class="cursor-pointer group">
                                        <input type="radio" name="quantity" value="3" class="peer sr-only">
                                        <div class="text-center py-2.5 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-bold text-xs group-hover:border-primary-light">3 món</div>
                                    </label>
                                    
                                    <!-- Nút thêm số lượng tùy chọn -->
                                    <div class="relative w-full h-full">
                                        <label id="custom-qty-label" class="hidden cursor-pointer group w-full h-full">
                                            <input type="radio" name="quantity" id="custom-qty-radio" value="" class="peer sr-only">
                                            <div class="text-center flex items-center justify-center py-2.5 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-bold text-xs w-full h-full">
                                                <span id="custom-qty-display"></span>
                                            </div>
                                        </label>

                                        <button type="button" id="btn-show-custom-qty" class="w-full h-full text-center py-2.5 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 text-gray-400 hover:text-primary hover:border-primary-light transition-all font-bold text-xs flex items-center justify-center group">
                                            <i class="fa-solid fa-plus text-base group-hover:scale-110 transition-transform"></i>
                                        </button>
                                        
                                        <!-- Ô nhập (ban đầu ẩn) -->
                                        <div id="custom-qty-input-wrapper" class="hidden absolute top-0 left-0 w-full h-full bg-white border border-primary rounded-lg items-center overflow-hidden z-20 shadow-sm">
                                            <input type="number" id="custom-qty-input" min="1" max="50" placeholder="Số" class="w-full h-full text-center text-sm font-bold text-primary focus:outline-none px-1 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" style="-moz-appearance: textfield;">
                                            <button type="button" id="btn-confirm-custom-qty" class="h-full px-2.5 bg-primary text-white hover:bg-primary-hover flex items-center justify-center transition-colors">
                                                <i class="fa-solid fa-check text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 2. Chọn nguyên liệu có sẵn -->
                            <div class="bg-white/80 p-4 rounded-xl shadow-sm border border-white">
                                <label class="flex items-center gap-2 text-text-main font-bold mb-3 text-sm">
                                    <span class="w-6 h-6 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs border border-primary-light/30">2</span> Nguyên liệu
                                </label>
                                <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="thit-heo" class="peer sr-only" checked>
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-red-50 peer-checked:text-red-500 peer-checked:border-red-200 peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-red-200"><i class="fa-solid fa-drumstick-bite text-xl"></i> Thịt heo</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="thit-ga" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-orange-50 peer-checked:text-orange-500 peer-checked:border-orange-200 peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-orange-200"><i class="fa-solid fa-kiwi-bird text-xl"></i> Thịt gà</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="thit-bo" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-rose-50 peer-checked:text-rose-600 peer-checked:border-rose-200 peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-rose-200"><i class="fa-solid fa-cow text-xl"></i> Thịt bò</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="ca" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-blue-50 peer-checked:text-blue-500 peer-checked:border-blue-200 peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-blue-200"><i class="fa-solid fa-fish text-xl"></i> Cá</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="tom" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-pink-50 peer-checked:text-pink-500 peer-checked:border-pink-200 peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-pink-200"><i class="fa-solid fa-shrimp text-xl"></i> Tôm/Cua</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="trung" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-accent-subtle peer-checked:text-accent-hover peer-checked:border-accent-light peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-accent-light"><i class="fa-solid fa-egg text-xl"></i> Trứng</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="dau-hu" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-yellow-50 peer-checked:text-yellow-600 peer-checked:border-yellow-200 peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-yellow-200"><i class="fa-solid fa-cube text-xl"></i> Đậu hũ</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="rau" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary-subtle peer-checked:text-primary-hover peer-checked:border-primary-light peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-primary-light"><i class="fa-solid fa-leaf text-xl"></i> Rau củ</div>
                                    </label>
                                </div>
                                <div class="mt-3 relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                                    </div>
                                    <input type="text" placeholder="Tìm thêm nguyên liệu khác..." class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all">
                                </div>
                            </div>

                            <!-- 3. Chọn loại món -->
                            <div class="bg-white/80 p-4 rounded-xl shadow-sm border border-white">
                                <label class="flex items-center gap-2 text-text-main font-bold mb-3 text-sm">
                                    <span class="w-6 h-6 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs border border-primary-light/30">3</span> Loại món
                                </label>
                                <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="man" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-orange-50 peer-checked:text-orange-600 peer-checked:border-orange-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-orange-200"><i class="fa-solid fa-bowl-food text-base"></i> Món mặn</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="canh" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-blue-50 peer-checked:text-blue-600 peer-checked:border-blue-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-blue-200"><i class="fa-solid fa-spoon text-base"></i> Món canh</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="xao" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-yellow-50 peer-checked:text-yellow-600 peer-checked:border-yellow-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-yellow-200"><i class="fa-solid fa-fire-burner text-base"></i> Món xào</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="kho" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-amber-50 peer-checked:text-amber-700 peer-checked:border-amber-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-amber-200"><i class="fa-solid fa-fire text-base"></i> Món kho</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="nuong" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-red-50 peer-checked:text-red-600 peer-checked:border-red-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-red-200"><i class="fa-solid fa-fire-flame-curved text-base"></i> Đồ nướng</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="chien" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-amber-50 peer-checked:text-amber-600 peer-checked:border-amber-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-amber-200"><i class="fa-solid fa-bacon text-base"></i> Đồ chiên</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="lau" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-rose-50 peer-checked:text-rose-600 peer-checked:border-rose-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-rose-200"><i class="fa-solid fa-mug-hot text-base"></i> Món lẩu</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="rau" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary-subtle peer-checked:text-primary-hover peer-checked:border-primary-light peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-primary-light"><i class="fa-solid fa-leaf text-base"></i> Món rau</div>
                                    </label>
                                </div>
                                <div class="mt-3 relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                                    </div>
                                    <input type="text" placeholder="Tìm thêm loại món khác..." class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all">
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </section>

            <!-- Quick Categories (Tags) -->
            <section class="container mx-auto px-4 lg:px-8 py-6 -mt-8 relative z-20">
                <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    <button class="snap-start flex-shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl px-5 py-3 flex items-center gap-2 transition-all hover:border-primary-light hover:-translate-y-0.5 active:scale-95 group text-sm font-bold text-text-main">
                        <i class="fa-solid fa-fire text-orange-500 text-xl group-hover:scale-110 transition-transform"></i> Đang thịnh hành
                    </button>
                    <button class="snap-start flex-shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl px-5 py-3 flex items-center gap-2 transition-all hover:border-primary-light hover:-translate-y-0.5 active:scale-95 group text-sm font-bold text-text-main">
                        <i class="fa-solid fa-leaf text-green-500 text-xl group-hover:scale-110 transition-transform"></i> Eat Clean
                    </button>
                    <button class="snap-start flex-shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl px-5 py-3 flex items-center gap-2 transition-all hover:border-primary-light hover:-translate-y-0.5 active:scale-95 group text-sm font-bold text-text-main">
                        <i class="fa-solid fa-cloud-rain text-blue-400 text-xl group-hover:scale-110 transition-transform"></i> Ngày mưa ăn gì
                    </button>
                    <button class="snap-start flex-shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl px-5 py-3 flex items-center gap-2 transition-all hover:border-primary-light hover:-translate-y-0.5 active:scale-95 group text-sm font-bold text-text-main">
                        <i class="fa-solid fa-money-bill-wave text-green-600 text-xl group-hover:scale-110 transition-transform"></i> Dưới 50k
                    </button>
                    <button class="snap-start flex-shrink-0 bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl px-5 py-3 flex items-center gap-2 transition-all hover:border-primary-light hover:-translate-y-0.5 active:scale-95 group text-sm font-bold text-text-main">
                        <i class="fa-solid fa-beer-mug-empty text-yellow-500 text-xl group-hover:scale-110 transition-transform"></i> Món nhậu
                    </button>
                </div>
            </section>

            <!-- Cộng đồng hôm nay nấu gì -->
            <section class="container mx-auto px-4 lg:px-8 py-12">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h2 class="text-3xl font-extrabold text-text-main flex items-center gap-3">
                            <span class="p-2 bg-accent-subtle rounded-xl text-2xl shadow-sm border border-accent-light/30"><i class="fa-solid fa-kitchen-set text-accent"></i></span> Cộng đồng nấu gì?
                        </h2>
                        <p class="text-text-muted mt-2 font-medium">Khám phá các mâm cơm được chia sẻ nhiều nhất tuần qua</p>
                    </div>
                    <a href="#/danh-sach" class="text-primary hover:text-primary-hover font-bold transition flex items-center gap-1 group hidden sm:flex bg-primary-subtle px-4 py-2 rounded-full active:scale-95 shadow-sm hover:shadow-md">
                        Xem tất cả <span class="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>
                
                <!-- Lưới Bento Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${spotlightHTML}
                    ${otherCardsHTML}
                </div>
            </section>

            <!-- Gacha Result Modal -->
            <div id="gacha-result-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md opacity-0 pointer-events-none transition-opacity duration-300">
                <div id="gacha-modal-content" class="bg-glass-gradient rounded-2xl border border-white shadow-glass overflow-hidden w-full max-w-2xl transform scale-95 transition-transform duration-300 flex flex-col max-h-[90vh]">
                </div>
            </div>
        `;
    },

    afterRender: async () => {
        let isSpinning = false;
        let reel1Items = [dummyFoods[0], dummyFoods[1], dummyFoods[2]];
        let reel2Items = [dummyFoods[0], dummyFoods[1], dummyFoods[2]];
        let reel3Items = [dummyFoods[0], dummyFoods[1], dummyFoods[2]];

        const slotMachineContainer = document.getElementById('slot-machine-container');
        const modal = document.getElementById('gacha-result-modal');
        const modalContent = document.getElementById('gacha-modal-content');

        const generateReelHTML = (reelNum) => `
            <div class="relative flex-1 h-full overflow-hidden bg-white rounded-md sm:rounded-xl" style="container-type: size;">
              <div class="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/95 to-transparent z-20 pointer-events-none"></div>
              <div class="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white/95 to-transparent z-20 pointer-events-none"></div>
              <div id="reel-${reelNum}" class="w-full flex flex-col will-change-transform"></div>
            </div>
        `;

        const renderSlotMachine = () => {
            slotMachineContainer.innerHTML = `
            <div class="relative w-full flex justify-center pt-0 pb-4">
                <!-- Đổi sang dùng thẻ img để giữ đúng tỉ lệ, relative div sẽ ôm sát hình. Tránh bị vỡ layout khi thay đổi kích thước -->
                <div class="relative z-50 w-[95%] sm:w-[85%] max-w-[550px] mx-auto mt-2">
                    <img src="./assets/images/gacha-machine-square-new.png" alt="Máy Gacha" class="w-full h-auto block drop-shadow-2xl" />
                    
                    <!-- Dynamic Header Logo -->
                    <div class="absolute top-[10%] left-1/2 -translate-x-1/2 w-full text-center z-20 pointer-events-none flex items-center justify-center">
                        <h2 class="text-sm sm:text-base md:text-lg lg:text-xl font-black text-white uppercase tracking-[0.1em] sm:tracking-[0.15em]" 
                            style="-webkit-text-stroke: 1.5px #1e3a8a; text-shadow: 0px 3px 0px #1e3a8a, 0px 5px 10px rgba(0,0,0,0.5);">
                            Hôm Nay Ăn Gì
                        </h2>
                    </div>

                    <!-- The 3 Reels positioned over the image's screen -->
                    <div class="absolute top-[25.5%] left-[16.5%] w-[67%] h-[44.5%] flex gap-[2%] items-center justify-between z-10 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-black/80 shadow-[inset_0_0_20px_rgba(0,0,0,1)] border-4 border-yellow-500/50">
                        ${generateReelHTML(1)}
                        ${generateReelHTML(2)}
                        ${generateReelHTML(3)}
                    </div>
                    
                    <!-- Dynamic 3D Spin Button (Covers the blank slot) -->
                    <!-- Căn chỉnh left 50% để vào chính giữa lỗ khoét, width 27% để bao trọn. Hạ bottom xuống 11% để khít lỗ khoét -->
                    <div class="absolute bottom-[11.3%] left-[50%] -translate-x-1/2 w-[28%] h-[7.2%] z-30">
                        <button id="spin-btn" class="group relative w-full h-full flex items-center justify-center font-black text-white text-[11px] sm:text-sm md:text-base rounded-md sm:rounded-lg bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 active:translate-y-0.5 transition-all shadow-[0_4px_0_#1e3a8a] active:shadow-[0_0px_0_#1e3a8a] border border-blue-300 disabled:opacity-70 disabled:active:translate-y-0 disabled:active:shadow-[0_4px_0_#1e3a8a] cursor-pointer">
                            <span id="spin-btn-text" class="tracking-wider uppercase drop-shadow-md flex items-center justify-center gap-1">
                                <i class="fa-solid fa-play"></i> QUAY
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            `;

            const spinBtn = document.getElementById('spin-btn');
            if (spinBtn) spinBtn.addEventListener('click', handleSpin);
        };

        const handleLeverAnimation = () => {
            const leverArm = document.getElementById('lever-arm');
            const leverKnob = document.getElementById('lever-knob');
            if (!leverArm || !leverKnob) return;
            
            leverArm.className = "absolute left-4 bottom-10 w-3 bg-gradient-to-r from-zinc-300 via-slate-100 to-zinc-400 rounded-full origin-bottom transition-all duration-300 shadow-lg h-24 rotate-[75deg] translate-x-2 translate-y-6";
            leverKnob.className = "absolute -top-5 -left-3 w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-orange-400 border-2 border-yellow-200 shadow-[0_0_15px_rgba(239,68,68,0.7)] transition-transform duration-200 scale-90";
            
            setTimeout(() => {
                leverArm.className = "absolute left-4 bottom-10 w-3 bg-gradient-to-r from-zinc-300 via-slate-100 to-zinc-400 rounded-full origin-bottom transition-all duration-300 shadow-lg h-36 -rotate-12 group-hover:-rotate-6";
                leverKnob.className = "absolute -top-5 -left-3 w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-orange-400 border-2 border-yellow-200 shadow-[0_0_15px_rgba(239,68,68,0.7)] transition-transform duration-200 group-hover:scale-110";
            }, 600);
        };

        const populateReelContent = (reelId, items) => {
            const reel = document.getElementById(reelId);
            if (!reel) return;
            reel.innerHTML = items.map(dish => {
                if (!dish) return '<div style="height:33.333333cqh"></div>';
                return `
                <div data-tooltip="${dish.name}" style="height: 33.333333cqh" class="w-full flex-shrink-0 flex flex-col items-center justify-center p-1 sm:p-2 select-none relative group border-b-[3px] border-gray-300">
                    <div class="relative h-[80%] max-h-[80px] aspect-square rounded-full overflow-hidden border-2 sm:border-4 border-orange-400 shadow-md shadow-green-900/20 bg-white flex-shrink-0">
                        <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'" />
                    </div>
                </div>
                `;
            }).join('');
        };
        const showResultModal = (dish, onBack = null) => {
            const ingredients = dish.ingredients || [
                '300g gạo tấm', '2 miếng sườn cốt lết', '100g bì heo trộn thính',
                '1 phần chả trứng hấp', 'Mỡ hành, đồ chua', 'Nước mắm chua ngọt'
            ];
            const steps = dish.steps || [
                'Ướp sườn với sả băm, tỏi băm, mật ong, dầu hào, nước mắm trong 30 phút.',
                'Nướng sườn trên than hoa hoặc nồi chiên không dầu ở 180°C đến khi vàng nâu.',
                'Nấu cơm tấm bằng nồi cơm điện với lượng nước vừa phải.',
                'Xới cơm ra đĩa, đặt sườn nướng, bì, chả trứng, rưới mỡ hành và chan nước mắm.'
            ];
            
            modalContent.innerHTML = `
                <div class="relative w-full h-48 sm:h-64 flex-shrink-0">
                    <img src="${dish.image}" class="w-full h-full object-cover" />
                    <!-- Close button on image -->
                    <button id="close-modal-x" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition z-10">
                        <i class="fa-solid fa-times"></i>
                    </button>
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
                </div>
                
                <div class="p-5 sm:p-8 pt-0 relative z-10 -mt-6 flex-1 overflow-y-auto">
                    <!-- Badges -->
                    <div class="flex flex-wrap gap-2 mb-3">
                        <span class="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-sm">Món Việt</span>
                        <span class="px-3 py-1 bg-green-700 text-white text-xs font-bold rounded-full shadow-sm">Bữa trưa</span>
                        <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-sm flex items-center gap-1"><i class="fa-solid fa-fire text-[10px]"></i> 650 kcal</span>
                    </div>
                    
                    <h2 class="text-2xl sm:text-3xl font-black text-green-900 mb-6 leading-tight">${dish.name}</h2>
                    
                    <!-- Ingredients -->
                    <div class="mb-8">
                        <h3 class="text-base font-black text-orange-600 mb-4 flex items-center gap-2 uppercase tracking-wide">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> Nguyên liệu chuẩn bị
                        </h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            ${ingredients.map(ing => `
                                <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-green-100 shadow-sm">
                                    <div class="w-2 h-2 rounded-full bg-orange-400"></div>
                                    <span class="text-sm font-medium text-gray-700">${ing}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Steps -->
                    <div>
                        <h3 class="text-base font-black text-orange-600 mb-4 flex items-center gap-2 uppercase tracking-wide">
                            <i class="fa-solid fa-clock"></i> Các bước thực hiện
                        </h3>
                        <div class="space-y-4">
                            ${steps.map((step, index) => `
                                <div class="flex gap-4">
                                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 font-black flex items-center justify-center border-2 border-green-200">
                                        ${index + 1}
                                    </div>
                                    <p class="text-sm text-gray-700 leading-relaxed font-medium">${step}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Footer Buttons -->
                    <div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 border-t border-green-200/60 pt-6">
                        <button class="flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold transition w-full sm:w-auto justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                            <span>Lưu món ăn</span>
                        </button>
                        <button id="close-modal-btn" class="w-full sm:w-auto px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-md">
                            ${onBack ? '<i class="fa-solid fa-arrow-left mr-2"></i> Quay lại danh sách' : 'Đóng'}
                        </button>
                    </div>
                    
                </div>
            `;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex', 'opacity-100', 'pointer-events-auto');
            modal.classList.remove('opacity-0', 'pointer-events-none');
            
            setTimeout(() => {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);

            const closeFn = (e) => {
                if(e) e.preventDefault();
                if (onBack) onBack();
                else hideModal();
            };
            const closeXFn = (e) => {
                if(e) e.preventDefault();
                hideModal(); // X button always fully closes
            }
            
            // Clean event listeners to prevent duplicates if called multiple times
            const closeBtn = document.getElementById('close-modal-btn');
            const closeX = document.getElementById('close-modal-x');
            const newCloseBtn = closeBtn.cloneNode(true);
            const newCloseX = closeX.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            closeX.parentNode.replaceChild(newCloseX, closeX);

            newCloseBtn.addEventListener('click', closeFn);
            newCloseX.addEventListener('click', closeXFn);
        };

        const showMultipleResultsModal = (dishes) => {
            modalContent.innerHTML = `
                <div class="p-6 bg-white rounded-3xl max-h-[85vh] overflow-y-auto w-full relative">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-black text-green-900">Thực Đơn Của Bạn (${dishes.length} món)</h2>
                        <button id="close-modal-x" class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        ${dishes.map((dish, idx) => `
                            <div class="result-card cursor-pointer border border-green-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group bg-green-50/30 hover:bg-white hover:-translate-y-1 w-[80%] sm:w-72 flex-shrink-0 snap-start" data-idx="${idx}">
                                <div class="h-32 w-full overflow-hidden relative">
                                    <img src="${dish.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                    <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div class="p-4 relative">
                                    <h3 class="font-bold text-lg text-green-900 group-hover:text-primary transition-colors line-clamp-1 pr-8">${dish.name}</h3>
                                    <p class="text-sm text-gray-500 mt-1"><i class="fa-regular fa-clock mr-1 text-orange-400"></i> ${dish.time}</p>
                                    <div class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-6 flex justify-center">
                        <button id="close-modal-btn" class="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-md w-full sm:w-auto">
                            Đóng lại
                        </button>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex', 'opacity-100', 'pointer-events-auto');
            modal.classList.remove('opacity-0', 'pointer-events-none');
            setTimeout(() => {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);

            const closeFn = (e) => {
                if(e) e.preventDefault();
                hideModal();
            };
            
            const closeBtn = document.getElementById('close-modal-btn');
            const closeX = document.getElementById('close-modal-x');
            const newCloseBtn = closeBtn.cloneNode(true);
            const newCloseX = closeX.cloneNode(true);
            closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
            closeX.parentNode.replaceChild(newCloseX, closeX);

            newCloseBtn.addEventListener('click', closeFn);
            newCloseX.addEventListener('click', closeFn);
            
            const cards = modalContent.querySelectorAll('.result-card');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    const idx = card.getAttribute('data-idx');
                    showResultModal(dishes[idx], () => {
                        showMultipleResultsModal(dishes);
                    });
                });
            });
        };


        const hideModal = () => {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modal.classList.remove('opacity-100', 'pointer-events-auto');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 300);
        };

        const handleSpin = async () => {
            if (isSpinning) return;
            isSpinning = true;
            
            const resultsContainer = document.getElementById('gacha-results-container');
            if (resultsContainer) {
                resultsContainer.innerHTML = '';
            }
            
            const quantityVal = document.querySelector('input[name="quantity"]:checked')?.value || "1";
            let numDishes = parseInt(quantityVal);
            
            const spinBtn = document.getElementById('spin-btn');
            const spinBtnText = document.getElementById('spin-btn-text');
            if (spinBtn) spinBtn.disabled = true;

            for (let i = 0; i < numDishes; i++) {
                if (spinBtnText) {
                    spinBtnText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> LẦN ${i + 1}/${numDishes}`;
                }
                await performSingleSpin();
                if (i < numDishes - 1) {
                    await new Promise(r => setTimeout(r, 800));
                }
            }

            isSpinning = false;
            if (spinBtn) spinBtn.disabled = false;
            if (spinBtnText) spinBtnText.innerHTML = '<i class="fa-solid fa-play"></i> QUAY';
        };

        const performSingleSpin = () => {
            return new Promise((resolve) => {
                reel1Items = Array.from({length: 30}, () => dummyFoods[Math.floor(Math.random() * dummyFoods.length)]);
                reel2Items = Array.from({length: 40}, () => dummyFoods[Math.floor(Math.random() * dummyFoods.length)]);
                reel3Items = Array.from({length: 50}, () => dummyFoods[Math.floor(Math.random() * dummyFoods.length)]);

                const resultDish = dummyFoods[Math.floor(Math.random() * dummyFoods.length)];

                const targetIdx1 = reel1Items.length - 3;
                const targetIdx2 = reel2Items.length - 3;
                const targetIdx3 = reel3Items.length - 3;

                // Place result in the middle of all 3 reels (jackpot)
                reel1Items[targetIdx1 + 1] = resultDish;
                reel2Items[targetIdx2 + 1] = resultDish;
                reel3Items[targetIdx3 + 1] = resultDish;

                populateReelContent('reel-1', reel1Items);
                populateReelContent('reel-2', reel2Items);
                populateReelContent('reel-3', reel3Items);

                const r1 = document.getElementById('reel-1');
                const r2 = document.getElementById('reel-2');
                const r3 = document.getElementById('reel-3');

                r1.style.transition = 'none'; r1.style.transform = 'translateY(0px)';
                r2.style.transition = 'none'; r2.style.transform = 'translateY(0px)';
                r3.style.transition = 'none'; r3.style.transform = 'translateY(0px)';

                // Force reflow
                void r1.offsetWidth;

                setTimeout(() => {
                    r1.style.transition = 'transform 1.5s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                    r1.style.transform = `translateY(-${(targetIdx1 / reel1Items.length) * 100}%)`;

                    r2.style.transition = 'transform 2.0s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                    r2.style.transform = `translateY(-${(targetIdx2 / reel2Items.length) * 100}%)`;

                    r3.style.transition = 'transform 2.5s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                    r3.style.transform = `translateY(-${(targetIdx3 / reel3Items.length) * 100}%)`;
                }, 50);

                setTimeout(() => {
                    const resultsContainer = document.getElementById('gacha-results-container');
                    if (resultsContainer) {
                        // Thẻ kết quả hình vuông nhỏ gọn
                        const cardHTML = `
                            <a href="#/mon-an/${resultDish.id || 1}" class="result-card block cursor-pointer border-4 border-yellow-400 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white hover:-translate-y-2 w-28 sm:w-32 aspect-square flex-shrink-0 snap-start animate-[fadeIn_0.5s_ease-out] relative">
                                <img src="${resultDish.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                <div class="absolute bottom-0 left-0 w-full p-2 flex flex-col justify-end h-full">
                                    <h3 class="font-bold text-xs sm:text-sm text-center text-white line-clamp-2 drop-shadow-md leading-snug">${resultDish.name}</h3>
                                </div>
                            </a>
                        `;
                        resultsContainer.insertAdjacentHTML('beforeend', cardHTML);
                        
                        // Cuộn đến thẻ mới
                        resultsContainer.scrollTo({ left: resultsContainer.scrollWidth, behavior: 'smooth' });
                    }
                    resolve();
                }, 2550);
            });
        };

        // Init
        renderSlotMachine();
        populateReelContent('reel-1', reel1Items);
        populateReelContent('reel-2', reel2Items);
        populateReelContent('reel-3', reel3Items);

        const form = document.getElementById('gacha-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                handleSpin();
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });

        // Tương tác cho số lượng tùy chỉnh
        const btnShowCustom = document.getElementById('btn-show-custom-qty');
        const customInputWrapper = document.getElementById('custom-qty-input-wrapper');
        const customInput = document.getElementById('custom-qty-input');
        const btnConfirmCustom = document.getElementById('btn-confirm-custom-qty');
        const customLabel = document.getElementById('custom-qty-label');
        const customDisplay = document.getElementById('custom-qty-display');
        const customRadio = document.getElementById('custom-qty-radio');
        const standardRadios = document.querySelectorAll('input[name="quantity"]:not(#custom-qty-radio)');

        if (btnShowCustom && customInputWrapper) {
            btnShowCustom.addEventListener('click', () => {
                btnShowCustom.classList.add('hidden');
                customInputWrapper.classList.remove('hidden');
                customInputWrapper.classList.add('flex');
                customInput.focus();
            });

            const confirmCustom = () => {
                const val = parseInt(customInput.value);
                if (val && val > 0) {
                    customInputWrapper.classList.add('hidden');
                    customInputWrapper.classList.remove('flex');
                    customLabel.classList.remove('hidden');
                    customLabel.classList.add('block');
                    customDisplay.textContent = val + ' món';
                    customRadio.value = val;
                    customRadio.checked = true;
                } else {
                    // Nếu nhập sai thì quay lại nút '+'
                    customInputWrapper.classList.add('hidden');
                    customInputWrapper.classList.remove('flex');
                    btnShowCustom.classList.remove('hidden');
                }
            };

            btnConfirmCustom.addEventListener('click', confirmCustom);
            customInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    confirmCustom();
                }
            });

            // Nếu người dùng click vào 1, 2, 3 thì reset nút tùy chọn
            standardRadios.forEach(radio => {
                radio.addEventListener('change', () => {
                    if (radio.checked) {
                        customLabel.classList.add('hidden');
                        customLabel.classList.remove('block');
                        btnShowCustom.classList.remove('hidden');
                        customInput.value = '';
                    }
                });
            });
        }

        // Tính năng: Custom Tooltip cho Máy Gacha
        let customTooltip = document.getElementById('gacha-custom-tooltip');
        if (!customTooltip) {
            customTooltip = document.createElement('div');
            customTooltip.id = 'gacha-custom-tooltip';
            customTooltip.className = 'fixed z-[9999] opacity-0 pointer-events-none transition-opacity duration-150 bg-[#654e38] text-white border border-white text-xs sm:text-sm px-3 py-1.5 font-semibold whitespace-nowrap drop-shadow-md';
            document.body.appendChild(customTooltip);
        }

        if (slotMachineContainer) {
            slotMachineContainer.addEventListener('mouseover', (e) => {
                const item = e.target.closest('[data-tooltip]');
                if (item) {
                    customTooltip.textContent = item.getAttribute('data-tooltip');
                    customTooltip.style.opacity = '1';
                }
            });
            slotMachineContainer.addEventListener('mousemove', (e) => {
                if (customTooltip.style.opacity === '1') {
                    // Căn chỉnh vị trí tooltip so với con trỏ chuột
                    customTooltip.style.left = (e.clientX + 15) + 'px';
                    customTooltip.style.top = (e.clientY + 15) + 'px';
                }
            });
            slotMachineContainer.addEventListener('mouseout', (e) => {
                const item = e.target.closest('[data-tooltip]');
                if (item) {
                    customTooltip.style.opacity = '0';
                }
            });
        }

        // Tính năng: Nắm kéo để cuộn ngang (Drag to scroll)
        const scrollContainers = document.querySelectorAll('.overflow-x-auto');
        let isDown = false;
        let isDragging = false;
        let startX;
        let scrollLeft;

        scrollContainers.forEach(slider => {
            // Thêm class cursor để người dùng biết có thể kéo
            slider.style.cursor = 'grab';

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                isDragging = false;
                slider.style.cursor = 'grabbing';
                // Tắt snap khi đang kéo để mượt hơn
                slider.classList.remove('snap-x'); 
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.style.cursor = 'grab';
                slider.classList.add('snap-x');
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.style.cursor = 'grab';
                slider.classList.add('snap-x');
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault(); // Tránh bôi đen text
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2; // Tốc độ cuộn (x2)
                
                if (Math.abs(walk) > 5) {
                    isDragging = true;
                }
                
                slider.scrollLeft = scrollLeft - walk;
            });

            // Chặn sự kiện click vào checkbox/radio nếu người dùng đang thực hiện hành động kéo
            slider.addEventListener('click', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true); // Dùng useCapture=true để chặn ngay từ đầu
        });

    }
};

export default Home;

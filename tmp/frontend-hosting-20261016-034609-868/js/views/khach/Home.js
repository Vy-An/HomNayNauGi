import { fetchAPI, BACKEND_URL } from '../../api.js?v=20261016-2eb0bee762';
import FoodCard from '../../components/FoodCard.js?v=20261016-2eb0bee762';

const dummyFoods = [
    { id: 1, name: 'Thịt Kho Trứng Nước Dừa', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '45 phút', likes: '2.5k', author: { name: 'Mẹ Bông', avatar: 'https://i.pravatar.cc/150?u=1' }, description: 'Mâm cơm truyền thống đậm đà hương vị quê hương, thịt mềm béo ngậy ăn là ghiền.' },
    { id: 2, name: 'Gà Xào Sả Ớt Cay Nồng', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '30 phút', likes: '1.8k', author: { name: 'Lan Anh', avatar: 'https://i.pravatar.cc/150?u=2' }, description: 'Món ăn đơn giản, nhanh gọn nhưng cực kỳ đưa cơm cho những ngày bận rộn.' },
    { id: 3, name: 'Bò Xào Lúc Lắc Rau Củ', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '25 phút', likes: '3.4k', author: { name: 'Chef Tùng', avatar: 'https://i.pravatar.cc/150?u=3' }, description: 'Thịt bò mềm mọng, đậm đà gia vị kết hợp cùng ớt chuông và hành tây giòn ngọt.' },
    { id: 4, name: 'Canh Chua Cá Hồi Bông Điên Điển', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '35 phút', likes: '2.1k', author: { name: 'Bếp Nhà Vy', avatar: 'https://i.pravatar.cc/150?u=4' }, description: 'Vị chua thanh mát của me và cà chua hòa quyện cùng vị ngọt béo ngậy của cá hồi.' }
];

const categoryExplore = [
    { title: 'Món mặn', slug: 'mon-man', icon: 'fa-bowl-rice', count: '1 món', image: `${BACKEND_URL}/images/foods/thit-ba-chi-luoc.jpg` },
    { title: 'Món canh', slug: 'mon-canh', icon: 'fa-spoon', count: '4 món', image: `${BACKEND_URL}/images/foods/canh-chua-ca-loc.jpg` },
    { title: 'Món kho', slug: 'mon-kho', icon: 'fa-fire-flame-simple', count: '3 món', image: `${BACKEND_URL}/images/foods/thit-kho-trung.jpg` },
    { title: 'Món xào', slug: 'mon-xao', icon: 'fa-fire-burner', count: '2 món', image: `${BACKEND_URL}/images/foods/suon-xao-chua-ngot.jpg` },
    { title: 'Món chiên', slug: 'mon-chien', icon: 'fa-fire', count: '3 món', image: `${BACKEND_URL}/images/foods/ga-chien-nuoc-mam.jpg` },
    { title: 'Món rau', slug: 'mon-rau', icon: 'fa-leaf', count: '3 món', image: `${BACKEND_URL}/images/foods/rau-muong-xao-toi.jpg` }
];

const Home = {
    render: async () => {
        const communityCardsHTML = dummyFoods.map(food => FoodCard(food)).join('');

        return `
            <div class="bg-[#F8F5EA] min-h-screen text-[#18382D] font-sans selection:bg-[#145A43]/20 selection:text-[#145A43] overflow-x-hidden w-full max-w-full">
                
                <!-- MAIN RANDOM HERO SECTION (IN NATURAL DOCUMENT FLOW) -->
                <section class="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 overflow-hidden">
                    
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full overflow-hidden">
                        
                        <!-- LEFT COLUMN: RANDOM MACHINE SECTION (50% / 6 cols) -->
                        <div class="random-machine-section lg:col-span-6 bg-[#FAF6EE] rounded-[24px] p-4 sm:p-6 shadow-xs border border-[#E5E1D6] flex flex-col justify-center min-w-0 overflow-hidden w-full">
                            
                            <!-- Machine Component Wrapper -->
                            <div class="w-full flex items-center justify-center py-1">
                                <div class="random-machine relative w-full max-w-[560px] mx-auto select-none">
                                    
                                    <!-- Machine Stage (Preserves exact 1024:903 aspect ratio, no stretching, no distortion) -->
                                    <div class="machine-stage relative w-full aspect-[1024/903]">
                                        
                                        <!-- Template Artwork Base Background Image -->
                                        <img 
                                            src="./assets/images/gacha-machine-blank.png" 
                                            alt="Máy Random Hôm Nay Nấu Gì" 
                                            class="absolute inset-0 w-full h-full object-contain pointer-events-none z-0" 
                                            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'" 
                                        />

                                        <!-- Pure Invisible Food Viewport: Seamless Clipping Window without border, shadow or card background -->
                                        <!-- Exact coordinates inside the screen frame: Top 32.4%, Left 24.6%, Width 50.9%, Height 33.0% -->
                                        <div class="food-viewport absolute top-[32.4%] left-[24.6%] w-[50.9%] h-[33.0%] z-10 flex gap-0 items-center justify-between overflow-hidden bg-transparent border-none shadow-none rounded-[16px]">
                                            <!-- Reel 1 (Invisible Channel) -->
                                            <div class="relative flex-1 h-full overflow-hidden bg-transparent border-none shadow-none" style="container-type: size;">
                                                <div id="reel-1" class="w-full flex flex-col will-change-transform"></div>
                                            </div>
                                            <!-- Reel 2 (Invisible Channel) -->
                                            <div class="relative flex-1 h-full overflow-hidden bg-transparent border-none shadow-none" style="container-type: size;">
                                                <div id="reel-2" class="w-full flex flex-col will-change-transform"></div>
                                            </div>
                                            <!-- Reel 3 (Invisible Channel) -->
                                            <div class="relative flex-1 h-full overflow-hidden bg-transparent border-none shadow-none" style="container-type: size;">
                                                <div id="reel-3" class="w-full flex flex-col will-change-transform"></div>
                                            </div>
                                        </div>

                                        <!-- Spin Button: Fills the exact wooden base button slot seamlessly -->
                                        <!-- Dimensions: Top 73.4%, Left 31.5%, Width 38.9%, Height 9.4% -->
                                        <div class="absolute top-[73.4%] left-[31.5%] w-[38.9%] h-[9.4%] z-20 flex items-center justify-center">
                                            <button 
                                                id="spin-btn" 
                                                type="button" 
                                                aria-label="Quay ngay" 
                                                class="group relative w-full h-full rounded-full bg-gradient-to-b from-[#FFA82E] via-[#F68B1F] to-[#D96509] hover:from-[#FFB547] hover:to-[#E57610] active:translate-y-0.5 active:scale-[0.98] transition-all border-none shadow-none flex items-center justify-center cursor-pointer overflow-hidden disabled:opacity-75"
                                            >
                                                <div class="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none"></div>
                                                <span id="spin-btn-text" class="relative z-10 font-black text-white text-xs sm:text-sm md:text-base tracking-wider uppercase drop-shadow flex items-center justify-center gap-1.5 sm:gap-2">
                                                    <i class="fa-solid fa-dice text-sm sm:text-base"></i>
                                                    <span>QUAY NGAY</span>
                                                    <i class="fa-solid fa-arrow-right text-xs"></i>
                                                </span>
                                            </button>
                                        </div>

                                        <!-- Mechanical Lever Trigger on the right -->
                                        <div 
                                            id="machine-lever-trigger" 
                                            class="absolute top-[26%] right-[3.5%] w-[12%] h-[36%] z-30 cursor-pointer group flex items-start justify-center"
                                            title="Kéo cần gạt để quay món!"
                                        >
                                            <div id="machine-lever-knob" class="w-full h-full transform origin-bottom transition-transform duration-300 group-hover:scale-105 group-active:rotate-[25deg]"></div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- RIGHT COLUMN: FILTER SECTION (50% / 6 cols) -->
                        <div class="lg:col-span-6 bg-white rounded-[24px] p-3.5 sm:p-6 shadow-xs border border-[#E5E1D6] flex flex-col justify-between min-w-0 overflow-hidden w-full">
                            
                            <!-- Header Form -->
                            <div class="flex items-center justify-between pb-3 border-b border-[#E5E1D6] mb-3.5 gap-2">
                                <h2 class="text-[13.5px] min-[390px]:text-[15px] sm:text-lg font-black text-[#145A43] flex items-center gap-1.5 sm:gap-2 min-w-0">
                                    <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#EAF3ED] text-[#145A43] flex items-center justify-center text-xs sm:text-sm shadow-2xs shrink-0">
                                        <i class="fa-solid fa-bowl-food"></i>
                                    </span>
                                    <span class="truncate whitespace-nowrap">Hôm nay bạn muốn ăn gì?</span>
                                </h2>
                                <button type="button" id="btn-reset-filters" class="text-[11px] sm:text-xs text-[#718078] hover:text-rose-600 font-bold transition flex items-center gap-1 cursor-pointer shrink-0 py-1 px-1.5 rounded-lg hover:bg-rose-50">
                                    <i class="fa-solid fa-rotate-left text-[10px]"></i> <span>Đặt lại</span>
                                </button>
                            </div>

                            <!-- Filter Steps Form -->
                            <form id="gacha-form" class="space-y-3.5" onsubmit="event.preventDefault(); return false;">
                                
                                <!-- STEP 1: SỐ LƯỢNG MÓN -->
                                <div class="bg-[#F8F5EA]/70 p-3 rounded-xl border border-[#E5E1D6]">
                                    <label class="flex items-center justify-between text-xs sm:text-sm font-bold text-[#18382D] mb-2 gap-2">
                                        <span class="flex items-center gap-1.5 min-w-0">
                                            <span class="w-5 h-5 rounded-full bg-[#145A43] text-white flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                                            <span class="truncate">Số lượng món</span>
                                        </span>
                                        <span class="text-[10px] sm:text-xs text-[#718078] font-normal shrink-0">Cho mâm cơm</span>
                                    </label>
                                    <div class="grid grid-cols-4 gap-2">
                                        <label class="cursor-pointer relative block">
                                            <input type="radio" name="quantity" value="1" class="peer sr-only" checked>
                                            <div class="text-center py-2 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] transition-all font-bold text-xs hover:border-[#145A43]">1 món</div>
                                        </label>
                                        <label class="cursor-pointer relative block">
                                            <input type="radio" name="quantity" value="2" class="peer sr-only">
                                            <div class="text-center py-2 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] transition-all font-bold text-xs hover:border-[#145A43]">2 món</div>
                                        </label>
                                        <label class="cursor-pointer relative block">
                                            <input type="radio" name="quantity" value="3" class="peer sr-only">
                                            <div class="text-center py-2 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] transition-all font-bold text-xs hover:border-[#145A43]">3 món</div>
                                        </label>
                                        
                                        <!-- Nút thêm số lượng tùy chọn -->
                                        <div class="relative w-full h-full">
                                            <label id="custom-qty-label" class="hidden cursor-pointer w-full h-full relative">
                                                <input type="radio" name="quantity" id="custom-qty-radio" value="" class="peer sr-only">
                                                <div class="text-center flex items-center justify-center py-2 rounded-xl border border-[#145A43] bg-[#145A43] text-white font-bold text-xs w-full h-full">
                                                    <span id="custom-qty-display"></span>
                                                </div>
                                            </label>
                                            <button type="button" id="btn-show-custom-qty" class="w-full h-full py-2 rounded-xl border border-[#E5E1D6] bg-white text-[#718078] hover:text-[#145A43] hover:border-[#145A43] transition font-bold text-xs flex items-center justify-center cursor-pointer">
                                                <i class="fa-solid fa-plus text-xs"></i>
                                            </button>
                                            <div id="custom-qty-input-wrapper" class="hidden absolute inset-0 bg-white border-2 border-[#145A43] rounded-xl items-center overflow-hidden z-20 shadow-2xs">
                                                <input type="number" id="custom-qty-input" min="1" max="50" placeholder="Số" class="w-full h-full text-center text-xs font-bold text-[#145A43] focus:outline-none px-1">
                                                <button type="button" id="btn-confirm-custom-qty" class="h-full px-2 bg-[#145A43] text-white hover:bg-[#0F4937] transition">
                                                    <i class="fa-solid fa-check text-xs"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- STEP 2: NGUYÊN LIỆU -->
                                <div class="bg-[#F8F5EA]/70 p-3 rounded-xl border border-[#E5E1D6] min-w-0 overflow-hidden w-full">
                                    <label class="flex items-center justify-between text-xs sm:text-sm font-bold text-[#18382D] mb-2 gap-2">
                                        <span class="flex items-center gap-1.5 min-w-0">
                                            <span class="w-5 h-5 rounded-full bg-[#145A43] text-white flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                                            <span class="truncate">Nguyên liệu</span>
                                        </span>
                                        <span class="text-[10px] sm:text-xs text-[#718078] font-normal shrink-0">Chọn 1 hoặc nhiều</span>
                                    </label>
                                    <div class="relative group/scroll">
                                        <button type="button" class="btn-scroll-left hidden sm:flex absolute -left-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/95 border border-[#E5E1D6] shadow-sm items-center justify-center text-[10px] text-[#18382D] hover:bg-[#145A43] hover:text-white transition-all opacity-0 group-hover/scroll:opacity-100 cursor-pointer pointer-events-none" title="Cuộn sang trái">
                                            <i class="fa-solid fa-chevron-left"></i>
                                        </button>
                                        <div id="ingredient-options" class="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden pb-1 w-full max-w-full scrollbar-none cursor-grab select-none relative">
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="ingredients" value="Thịt heo" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-drumstick-bite text-amber-500 peer-checked:text-white"></i> Thịt heo
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="ingredients" value="Thịt gà" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-kiwi-bird text-orange-500 peer-checked:text-white"></i> Thịt gà
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="ingredients" value="Hải sản" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-shrimp text-rose-500 peer-checked:text-white"></i> Hải sản
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="ingredients" value="Rau củ" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-leaf text-emerald-500 peer-checked:text-white"></i> Rau củ
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="ingredients" value="Trứng" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-egg text-amber-500 peer-checked:text-white"></i> Trứng
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="ingredients" value="Đậu hũ" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-cube text-yellow-600 peer-checked:text-white"></i> Đậu hũ
                                                </div>
                                            </label>
                                        </div>
                                        <button type="button" class="btn-scroll-right hidden sm:flex absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/95 border border-[#E5E1D6] shadow-sm items-center justify-center text-[10px] text-[#18382D] hover:bg-[#145A43] hover:text-white transition-all opacity-0 group-hover/scroll:opacity-100 cursor-pointer pointer-events-none" title="Cuộn sang phải">
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                    <div class="mt-2 relative">
                                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                                        <input id="ingredient-search" type="text" placeholder="Tìm thêm nguyên liệu khác..." class="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E5E1D6] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#145A43] focus:border-[#145A43]">
                                    </div>
                                </div>

                                <!-- STEP 3: LOẠI MÓN -->
                                <div class="bg-[#F8F5EA]/70 p-3 rounded-xl border border-[#E5E1D6] min-w-0 overflow-hidden w-full">
                                    <label class="flex items-center justify-between text-xs sm:text-sm font-bold text-[#18382D] mb-2 gap-2">
                                        <span class="flex items-center gap-1.5 min-w-0">
                                            <span class="w-5 h-5 rounded-full bg-[#145A43] text-white flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                                            <span class="truncate">Loại món</span>
                                        </span>
                                        <span class="text-[10px] sm:text-xs text-[#718078] font-normal shrink-0">Kiểu chế biến</span>
                                    </label>
                                    <div class="relative group/scroll">
                                        <button type="button" class="btn-scroll-left hidden sm:flex absolute -left-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/95 border border-[#E5E1D6] shadow-sm items-center justify-center text-[10px] text-[#18382D] hover:bg-[#145A43] hover:text-white transition-all opacity-0 group-hover/scroll:opacity-100 cursor-pointer pointer-events-none" title="Cuộn sang trái">
                                            <i class="fa-solid fa-chevron-left"></i>
                                        </button>
                                        <div id="category-options" class="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden pb-1 w-full max-w-full scrollbar-none cursor-grab select-none relative">
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="categories" value="Món mặn" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-bowl-food text-orange-500 peer-checked:text-white"></i> Món mặn
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="categories" value="Món canh" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-spoon text-blue-500 peer-checked:text-white"></i> Món canh
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="categories" value="Món xào" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-fire-burner text-amber-500 peer-checked:text-white"></i> Món xào
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="categories" value="Món nướng" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-fire text-red-500 peer-checked:text-white"></i> Món nướng
                                                </div>
                                            </label>
                                            <label class="cursor-pointer group shrink-0 relative">
                                                <input type="checkbox" name="categories" value="Món kho" class="peer sr-only">
                                                <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                                    <i class="fa-solid fa-fire-flame-simple text-amber-600 peer-checked:text-white"></i> Món kho
                                                </div>
                                            </label>
                                        </div>
                                        <button type="button" class="btn-scroll-right hidden sm:flex absolute -right-1.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white/95 border border-[#E5E1D6] shadow-sm items-center justify-center text-[10px] text-[#18382D] hover:bg-[#145A43] hover:text-white transition-all opacity-0 group-hover/scroll:opacity-100 cursor-pointer pointer-events-none" title="Cuộn sang phải">
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                    <div class="mt-2 relative">
                                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                                        <input id="category-search" type="text" placeholder="Tìm thêm loại món khác..." class="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E5E1D6] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#145A43] focus:border-[#145A43]">
                                    </div>
                                </div>

                                <!-- STEP 4: THỜI GIAN NẤU -->
                                <div class="bg-[#F8F5EA]/70 p-3 rounded-xl border border-[#E5E1D6]">
                                    <label class="flex items-center justify-between text-xs sm:text-sm font-bold text-[#18382D] mb-2">
                                        <span class="flex items-center gap-1.5">
                                            <span class="w-5 h-5 rounded-full bg-[#145A43] text-white flex items-center justify-center text-[10px] font-black">4</span>
                                            <span>Thời gian nấu</span>
                                        </span>
                                        <span class="text-xs text-[#718078] font-normal">Tùy chọn</span>
                                    </label>
                                    <div class="grid grid-cols-3 gap-2">
                                        <label class="cursor-pointer relative block">
                                            <input type="radio" name="cook_time" value="quick" class="peer sr-only">
                                            <div class="text-center py-2 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] transition text-xs font-bold hover:border-[#145A43]">&lt; 15 phút</div>
                                        </label>
                                        <label class="cursor-pointer relative block">
                                            <input type="radio" name="cook_time" value="medium" class="peer sr-only">
                                            <div class="text-center py-2 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] transition text-xs font-bold hover:border-[#145A43]">15 - 30 phút</div>
                                        </label>
                                        <label class="cursor-pointer relative block">
                                            <input type="radio" name="cook_time" value="long" class="peer sr-only">
                                            <div class="text-center py-2 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] transition text-xs font-bold hover:border-[#145A43]">&gt; 30 phút</div>
                                        </label>
                                    </div>
                                </div>

                                <!-- PRIMARY ACTION: BUTTON RANDOM -->
                                <button type="button" id="btn-hero-random" class="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#F4A62A] via-[#FFA82E] to-[#F37B1D] hover:from-[#FFA82E] hover:to-[#E59516] active:scale-[0.99] text-[#0F4937] font-black text-sm sm:text-base rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2 border border-amber-300">
                                    <i class="fa-solid fa-dice text-base text-[#0F4937]"></i>
                                    <span id="btn-hero-random-text">RANDOM NGAY →</span>
                                </button>
                            </form>
                        </div>

                    </div>

                    <!-- Món vừa quay được (Full-width card beneath Section 1) -->
                    <div class="bg-white rounded-[24px] p-4 sm:p-5 border border-[#E5E1D6] shadow-xs mt-6 w-full max-w-full overflow-hidden">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-xs sm:text-sm font-bold text-[#18382D] flex items-center gap-1.5">
                                <i class="fa-solid fa-rotate-right text-[#F4A62A]"></i>
                                <span>Món vừa quay được</span>
                            </span>
                            <button type="button" onclick="window.toggleWonDishesPopover && window.toggleWonDishesPopover()" class="text-xs font-bold text-[#145A43] hover:underline flex items-center gap-1 cursor-pointer">
                                <span>Xem tất cả</span>
                                <i class="fa-solid fa-arrow-right text-[10px]"></i>
                            </button>
                        </div>
                        <div id="gacha-results-container" class="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-hide snap-x items-center min-h-[82px] w-full max-w-full">
                            <!-- Rendered dynamically by JS -->
                        </div>
                    </div>
                </section>


                <section class="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4" id="section-quick-suggestions">
                    <div class="flex items-center gap-2 mb-2.5">
                        <span class="text-xs font-black uppercase tracking-wider text-[#145A43] flex items-center gap-1.5">
                            <i class="fa-solid fa-bolt text-[#F4A62A]"></i> Gợi ý nhanh:
                        </span>
                    </div>
                    <div id="quick-suggestions-container" class="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide snap-x">
                        <div class="h-8 w-32 bg-[#E5E1D6]/60 rounded-full animate-pulse shrink-0"></div>
                        <div class="h-8 w-36 bg-[#E5E1D6]/60 rounded-full animate-pulse shrink-0"></div>
                        <div class="h-8 w-28 bg-[#E5E1D6]/60 rounded-full animate-pulse shrink-0"></div>
                        <div class="h-8 w-36 bg-[#E5E1D6]/60 rounded-full animate-pulse shrink-0"></div>
                        <div class="h-8 w-32 bg-[#E5E1D6]/60 rounded-full animate-pulse shrink-0"></div>
                    </div>
                </section>


                <!-- SECTION 3: CỘNG ĐỒNG NẤU GÌ? (4 CARDS) -->
                <section class="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-[#E5E1D6]">
                    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                        <div>
                            <div class="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#F4A62A]">
                                <i class="fa-solid fa-users"></i> BẾP NHÀ CHIA SẺ
                            </div>
                            <h2 class="text-2xl sm:text-3xl font-black text-[#145A43] tracking-tight">
                                👥 Cộng đồng nấu gì?
                            </h2>
                            <p class="text-xs sm:text-sm text-[#718078] mt-1">Khám phá các mâm cơm được chia sẻ nhiều nhất tuần qua từ cộng đồng</p>
                        </div>
                        <a href="#/cong-dong" class="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#145A43] text-[#145A43] hover:text-white rounded-full text-xs sm:text-sm font-bold border border-[#E5E1D6] shadow-2xs hover:shadow-xs transition-all group shrink-0">
                            <span>Xem tất cả</span>
                            <i class="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                        </a>
                    </div>

                    <div id="home-community-cards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        ${communityCardsHTML}
                    </div>
                </section>


                <!-- SECTION 4: KHÁM PHÁ THÊM (CAROUSEL TRƯỢT LIÊN TỤC TỪ TRÁI SANG PHẢI) -->
                <section class="w-full py-8 border-t border-[#E5E1D6] mb-8 overflow-hidden">
                    <div class="text-center max-w-xl mx-auto mb-8 px-4">
                        <div class="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#F4A62A]">
                            <i class="fa-solid fa-compass"></i> ĐA DẠNG ẨM THỰC
                        </div>
                        <h2 class="text-2xl sm:text-3xl font-black text-[#145A43] tracking-tight">
                            🌿 Khám phá thêm
                        </h2>
                        <p class="text-xs sm:text-sm text-[#718078] mt-1">Tìm kiếm công thức theo phong cách và sở thích ẩm thực</p>
                    </div>

                    <div class="relative w-full overflow-hidden group/marquee py-2">
                        <!-- Left & Right smooth fade gradients -->
                        <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-[#F8F5EA] to-transparent z-10"></div>
                        <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-[#F8F5EA] to-transparent z-10"></div>

                        <!-- Continuous marquee track -->
                        <div id="home-explore-categories" class="flex gap-4 w-max animate-marquee-ltr hover:[animation-play-state:paused] active:[animation-play-state:paused] will-change-transform py-1 px-4">
                            ${[...categoryExplore, ...categoryExplore, ...categoryExplore, ...categoryExplore].map(cat => `
                                <a href="#/danh-sach?category=${cat.slug}" class="group/card relative rounded-2xl overflow-hidden bg-white border border-[#E5E1D6] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1.5 block w-[150px] sm:w-[180px] md:w-[200px] aspect-[4/5] flex flex-col justify-end p-3.5 shrink-0 select-none">
                                    <img src="${cat.image}" alt="${cat.title}" class="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500 ease-out" loading="lazy" decoding="async">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                                    
                                    <div class="relative z-10 text-white">
                                        <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-sm mb-2 group-hover/card:bg-[#F4A62A] group-hover/card:text-[#0F4937] transition-colors">
                                            <i class="fa-solid ${cat.icon}"></i>
                                        </div>
                                        <h3 class="font-bold text-sm sm:text-base leading-tight">${cat.title}</h3>
                                        <span class="text-xs text-white/80 font-medium">${cat.count}</span>
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </section>


                <!-- GACHA RESULT MODAL -->
                <div id="gacha-result-modal" class="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs opacity-0 pointer-events-none transition-opacity duration-300">
                    <div id="gacha-modal-content" class="bg-white rounded-2xl sm:rounded-3xl border border-[#E5E1D6] shadow-2xl overflow-hidden w-full max-w-xl transform scale-95 transition-transform duration-300 flex flex-col max-h-[88vh]">
                    </div>
                </div>

            </div>
        `;
    },

    afterRender: async () => {
        let isSpinning = false;
        let reel1Items = [dummyFoods[0], dummyFoods[1], dummyFoods[2]];
        let reel2Items = [dummyFoods[0], dummyFoods[1], dummyFoods[2]];
        let reel3Items = [dummyFoods[0], dummyFoods[1], dummyFoods[2]];

        const modal = document.getElementById('gacha-result-modal');
        const modalContent = document.getElementById('gacha-modal-content');
        const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
        let randomFoodsPool = [...dummyFoods];

        const normalizeFood = (food) => ({
            ...food,
            id: food.id || food.id_food || 1,
            image: food.image || fallbackImage,
            time: food.time || (food.cookingTime ? `${food.cookingTime} phút` : '30 phút'),
            likes: food.likes || '1.2k',
            author: food.author || { name: 'Hôm Nay Nấu Gì' },
            ingredients: Array.isArray(food.ingredients) ? food.ingredients : [
                '300g nguyên liệu chính tươi ngon',
                '2 củ hành tím băm nhỏ',
                '1 muỗng canh dầu hào, nước mắm',
                'Gia vị: hạt nêm, tiêu, đường'
            ],
            steps: Array.isArray(food.steps) ? food.steps : [
                'Sơ chế và rửa sạch nguyên liệu, để ráo nước.',
                'Ướp gia vị trong 15-20 phút cho thấm đều hương vị.',
                'Bật bếp xào nấu chín đều ở lửa vừa.',
                'Bày ra đĩa, trang trí rau thơm và thưởng thức nóng.'
            ]
        });

        const getCheckedValues = (name) => {
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                .map(input => input.value)
                .filter(Boolean);
        };

        const getSelectedQuantity = () => {
            const customInput = document.getElementById('custom-qty-input');
            const customInputWrapper = document.getElementById('custom-qty-input-wrapper');
            const customRadio = document.getElementById('custom-qty-radio');
            const isCustomEditing = customInputWrapper && !customInputWrapper.classList.contains('hidden');
            const customValue = Number.parseInt(customInput?.value || customRadio?.value, 10);

            if ((isCustomEditing || customRadio?.checked) && customValue > 0) {
                return Math.min(customValue, 50);
            }

            const quantityVal = document.querySelector('input[name="quantity"]:checked')?.value || "1";
            const quantity = Number.parseInt(quantityVal, 10);

            if (!quantity || quantity < 1) return 1;
            return Math.min(quantity, 50);
        };

        const buildRandomEndpoint = (quantity) => {
            const params = new URLSearchParams();
            params.set('quantity', quantity);

            const ingredients = getCheckedValues('ingredients');
            const categories = getCheckedValues('categories');
            const cookTimeInput = document.querySelector('input[name="cook_time"]:checked');

            if (ingredients.length) params.set('ingredients', ingredients.join(','));
            if (categories.length) params.set('categories', categories.join(','));
            if (cookTimeInput && cookTimeInput.value) {
                params.set('cook_time', cookTimeInput.value);
            }

            return `/random?${params.toString()}`;
        };

        const fetchRandomFoods = async (quantity) => {
            try {
                const response = await fetchAPI(buildRandomEndpoint(quantity));
                if (response && response.success && Array.isArray(response.data) && response.data.length > 0) {
                    const foods = response.data.map(normalizeFood);
                    randomFoodsPool = [...foods, ...randomFoodsPool].slice(0, 30);
                    return { success: true, foods, message: response.message };
                }
                return {
                    success: false,
                    foods: [],
                    message: response?.message || 'Không tìm thấy món ăn nào phù hợp với bộ lọc đã chọn.'
                };
            } catch (e) {
                return {
                    success: false,
                    foods: [],
                    message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
                };
            }
        };

        const getRandomPoolFood = () => {
            const pool = randomFoodsPool.length ? randomFoodsPool : dummyFoods;
            return pool[Math.floor(Math.random() * pool.length)];
        };

        const populateReelContent = (reelId, items) => {
            const reel = document.getElementById(reelId);
            if (!reel) return;
            reel.innerHTML = items.map(dish => {
                if (!dish) return '<div style="height:33.333333cqh"></div>';
                return `
                <div data-tooltip="${dish.name}" style="height: 33.333333cqh" class="w-full flex-shrink-0 flex items-center justify-center p-1 select-none relative group">
                    <div class="relative h-[82%] aspect-square rounded-full overflow-hidden border-2 border-[#D89A2B] shadow-sm bg-[#FFFDF8] flex items-center justify-center transform group-hover:scale-105 transition-transform">
                        <img 
                            src="${dish.image}" 
                            alt="${dish.name}" 
                            class="w-full h-full object-cover" 
                            onerror="this.src='${fallbackImage}'" 
                        />
                    </div>
                </div>
                `;
            }).join('');
        };

        // Render Recent Won Dishes Row
        window.renderRecentWonDishes = () => {
            const container = document.getElementById('gacha-results-container');
            if (!container) return;

            const token = localStorage.getItem('auth_token');
            if (!token) {
                container.innerHTML = `
                    <div class="w-full text-center py-2.5 bg-[#F8F5EA]/60 rounded-xl border border-dashed border-[#E5E1D6] text-xs text-[#718078] font-medium flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-lock text-[#F4A62A]"></i>
                        <span>Đăng nhập để tự động lưu lại các món bạn quay được!</span>
                        <a href="#/login" class="ml-1 text-[#0F4937] font-bold underline hover:text-[#145A43]">Đăng nhập ngay</a>
                    </div>
                `;
                return;
            }

            let won = [];
            try {
                won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
            } catch (e) {
                won = [];
            }

            if (won.length === 0) {
                container.innerHTML = `
                    <div class="w-full text-center py-2.5 bg-[#F8F5EA]/60 rounded-xl border border-dashed border-[#E5E1D6] text-xs text-[#718078] font-medium flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-dice text-[#F4A62A]"></i>
                        <span>Chưa có món nào được quay - Nhấn <strong>QUAY</strong> hoặc <strong>KÉO CẦN GẠT</strong> để bắt đầu!</span>
                    </div>
                `;
                return;
            }

            container.innerHTML = won.map((dish) => `
                <div class="result-thumb cursor-pointer border border-[#E5E1D6] hover:border-[#F4A62A] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-200 group bg-white hover:-translate-y-0.5 w-16 sm:w-20 aspect-square flex-shrink-0 snap-start relative" title="${dish.name}">
                    <img src="${dish.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='${fallbackImage}'">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div class="absolute bottom-0.5 inset-x-0.5">
                        <p class="font-bold text-[9px] text-center text-white line-clamp-1 leading-tight">${dish.name}</p>
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.result-thumb').forEach((thumb, idx) => {
                thumb.addEventListener('click', () => showResultModal(won[idx]));
            });
        };

        const addWonDishes = (dishes) => {
            const token = localStorage.getItem('auth_token');
            if (!token) return; // Chỉ lưu món khi đã đăng nhập

            const items = (Array.isArray(dishes) ? dishes : [dishes]).filter(Boolean);
            if (!items.length) return;

            try {
                const current = JSON.parse(localStorage.getItem('won_dishes') || '[]');
                const seen = new Set();
                const merged = [...items, ...current].filter((dish) => {
                    const key = String(dish.id || dish.name || '').trim();
                    if (!key || seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });

                localStorage.setItem('won_dishes', JSON.stringify(merged.slice(0, 50)));
                if (window.renderWonDishesList) window.renderWonDishesList();
                if (window.renderRecentWonDishes) window.renderRecentWonDishes();
            } catch (e) {}
        };

        const showResultModal = (dish, onBack = null) => {
            modalContent.onwheel = null;
            modalContent.className = "bg-white rounded-2xl sm:rounded-3xl border border-[#E5E1D6] shadow-2xl overflow-hidden w-full max-w-xl transform scale-95 transition-transform duration-300 flex flex-col max-h-[88vh]";

            const ingredients = dish.ingredients || [
                '300g nguyên liệu chính tươi ngon', '2 củ hành khô băm nhỏ',
                'Gia vị: đường, muối, nước mắm, tiêu', 'Rau sống và dưa leo ăn kèm'
            ];
            const steps = dish.steps || [
                'Rửa sạch nguyên liệu và ướp đều cùng gia vị trong 15 phút.',
                'Đun nóng chảo dầu, cho hành tỏi vào phi thơm lừng.',
                'Cho nguyên liệu vào đảo đều và nấu chín tới khi dậy mùi thơm đậm đà.',
                'Múc ra đĩa và thưởng thức ngay cùng cơm nóng.'
            ];
            
            modalContent.innerHTML = `
                <div class="relative w-full h-44 sm:h-52 flex-shrink-0">
                    <img src="${dish.image}" class="w-full h-full object-cover" onerror="this.src='${fallbackImage}'" />
                    <button id="close-modal-x" class="absolute top-3 right-3 w-7.5 h-7.5 flex items-center justify-center bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition z-10 cursor-pointer" title="Đóng">
                        <i class="fa-solid fa-times text-xs"></i>
                    </button>
                    <div class="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                </div>
                
                <div class="p-4 sm:p-6 pt-0 relative z-10 -mt-5 flex-1 min-h-0 overflow-y-auto custom-gacha-scroll">
                    <div class="flex flex-wrap gap-1.5 mb-2">
                        <span class="px-2 py-0.5 bg-[#F4A62A] text-[#0F4937] text-[11px] font-black rounded-full shadow-2xs">Món Gợi Ý</span>
                        <span class="px-2 py-0.5 bg-[#145A43] text-white text-[11px] font-bold rounded-full shadow-2xs">${dish.time || '30 phút'}</span>
                        <span class="px-2 py-0.5 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-full shadow-2xs flex items-center gap-1"><i class="fa-solid fa-heart text-[9px]"></i> ${dish.likes || '2.5k'}</span>
                    </div>
                    
                    <h2 class="text-lg sm:text-xl font-black text-[#145A43] mb-4 leading-tight">${dish.name}</h2>
                    
                    <!-- Nguyên liệu -->
                    <div class="mb-4">
                        <h3 class="text-xs font-black text-[#F4A62A] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                            <i class="fa-solid fa-basket-shopping"></i> Nguyên liệu chuẩn bị
                        </h3>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            ${ingredients.map(ing => `
                                <div class="flex items-center gap-2 bg-[#F8F5EA]/70 p-2 rounded-lg border border-[#E5E1D6]/70">
                                    <div class="w-1.5 h-1.5 rounded-full bg-[#F4A62A] shrink-0"></div>
                                    <span class="text-xs font-medium text-[#18382D]">${ing}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Các bước thực hiện -->
                    <div>
                        <h3 class="text-xs font-black text-[#F4A62A] mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                            <i class="fa-solid fa-list-check"></i> Các bước nấu
                        </h3>
                        <div class="space-y-2">
                            ${steps.map((step, index) => `
                                <div class="flex gap-2.5 items-start">
                                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-[#145A43] text-white text-[10px] font-black flex items-center justify-center mt-0.5">
                                        ${index + 1}
                                    </div>
                                    <p class="text-xs text-[#18382D] leading-relaxed font-medium">${step}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Footer Actions -->
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-2.5 mt-5 border-t border-gray-100 pt-4">
                        <a href="#/mon-an/${dish.id || 1}" class="text-xs font-bold text-[#145A43] hover:underline flex items-center gap-1">
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Xem trang món ăn
                        </a>
                        <button id="close-modal-btn" class="w-full sm:w-auto px-5 py-2 bg-[#145A43] hover:bg-[#0F4937] text-white text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer">
                            ${onBack ? '<i class="fa-solid fa-arrow-left mr-1"></i> Trở lại thực đơn' : 'Đóng'}
                        </button>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
            modal.classList.add('flex', 'opacity-100', 'pointer-events-auto');
            setTimeout(() => {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);

            const closeFn = (e) => {
                if (e) e.preventDefault();
                if (onBack) onBack();
                else hideModal();
            };
            const closeXFn = (e) => {
                if (e) e.preventDefault();
                hideModal();
            };
            
            document.getElementById('close-modal-btn')?.addEventListener('click', closeFn);
            document.getElementById('close-modal-x')?.addEventListener('click', closeXFn);
        };

        const showMultipleResultsModal = (dishes) => {
            const hasMoreThan6 = dishes.length > 6;

            // Set responsive modal container
            modalContent.className = `bg-white rounded-2xl sm:rounded-3xl border border-[#E5E1D6] shadow-2xl overflow-hidden w-full max-w-2xl sm:max-w-3xl transform scale-95 transition-transform duration-300 flex flex-col ${hasMoreThan6 ? 'max-h-[88vh]' : 'max-h-[90vh]'}`;

            modalContent.innerHTML = `
                <!-- Modal Header (Pinned) -->
                <div class="px-5 py-3.5 sm:py-4 border-b border-[#E5E1D6] bg-white flex justify-between items-center shrink-0 z-10">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-black uppercase text-[#F4A62A] tracking-wider">THỰC ĐƠN ĐÃ QUAY</span>
                            ${hasMoreThan6 ? `
                                <span class="px-2.5 py-0.5 bg-[#E8F3EE] text-[#145A43] text-[10px] font-bold rounded-full inline-flex items-center gap-1.5 border border-[#145A43]/20 shadow-2xs">
                                    <i class="fa-solid fa-arrows-up-down text-[9px]"></i> Cuộn chuột để xem hết (${dishes.length} món)
                                </span>
                            ` : ''}
                        </div>
                        <h2 class="text-base sm:text-lg font-black text-[#145A43] mt-0.5">Gợi ý ${dishes.length} món cho bạn</h2>
                    </div>
                    <button id="close-modal-x" class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition cursor-pointer" title="Đóng">
                        <i class="fa-solid fa-times text-xs"></i>
                    </button>
                </div>

                <!-- Modal Body: Dish Cards Grid (Scrollable with mouse wheel) -->
                <div id="gacha-grid-scroll" class="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 custom-gacha-scroll overscroll-contain ${hasMoreThan6 ? 'max-h-[380px] sm:max-h-[440px]' : ''}">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${dishes.map((dish, idx) => `
                            <div class="result-card cursor-pointer border border-[#E5E1D6] rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-200 group bg-gray-50/50 hover:bg-white hover:-translate-y-0.5 flex flex-col" data-idx="${idx}">
                                <div class="h-28 w-full overflow-hidden relative">
                                    <img src="${dish.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.src='${fallbackImage}'">
                                    <div class="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-black/60 text-white text-[9px] font-bold rounded-full">
                                        ⏱️ ${dish.time || '30 phút'}
                                    </div>
                                </div>
                                <div class="p-2.5 flex-1 flex flex-col justify-between">
                                    <h3 class="font-bold text-xs text-[#18382D] group-hover:text-[#145A43] transition-colors line-clamp-1">${dish.name}</h3>
                                    <div class="mt-1.5 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#145A43] font-bold">
                                        <span>Xem chi tiết</span>
                                        <i class="fa-solid fa-arrow-right text-[9px] transition-transform group-hover:translate-x-1"></i>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Modal Footer (Pinned) -->
                <div class="px-5 py-3 border-t border-[#E5E1D6] bg-gray-50/90 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
                    <div class="flex items-center gap-1.5 text-xs text-[#718078] font-medium">
                        ${hasMoreThan6 ? `
                            <i class="fa-solid fa-mouse text-[#145A43]"></i>
                            <span>Dùng <strong>con lăn chuột</strong> để cuộn xem thêm ${dishes.length - 6} món bên dưới</span>
                        ` : `
                            <i class="fa-solid fa-hand-pointer text-[#F4A62A]"></i>
                            <span>Nhấp vào từng món để xem công thức chi tiết</span>
                        `}
                    </div>
                    <button id="close-modal-btn" class="w-full sm:w-auto px-6 py-2 bg-[#145A43] hover:bg-[#0F4937] text-white text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer ml-auto">
                        Đóng lại
                    </button>
                </div>
            `;
            
            modal.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
            modal.classList.add('flex', 'opacity-100', 'pointer-events-auto');
            setTimeout(() => {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);

            // Enable mouse wheel scrolling anywhere on modalContent when dishes > 6
            const scrollArea = modalContent.querySelector('#gacha-grid-scroll');
            if (scrollArea && hasMoreThan6) {
                modalContent.onwheel = (e) => {
                    if (!scrollArea.contains(e.target)) {
                        scrollArea.scrollTop += e.deltaY;
                        e.preventDefault();
                    }
                };
            } else {
                modalContent.onwheel = null;
            }

            document.getElementById('close-modal-btn')?.addEventListener('click', hideModal);
            document.getElementById('close-modal-x')?.addEventListener('click', hideModal);
            
            modalContent.querySelectorAll('.result-card').forEach(card => {
                card.addEventListener('click', () => {
                    const idx = card.getAttribute('data-idx');
                    showResultModal(dishes[idx], () => {
                        showMultipleResultsModal(dishes);
                    });
                });
            });
        };

        const triggerGachaConfetti = () => {
            const launch = (confettiFn) => {
                const duration = 2400;
                const end = Date.now() + duration;
                const colors = ['#F4A62A', '#145A43', '#FFD166', '#22C55E', '#FF7A59', '#F8F5EA'];

                // Center celebration burst
                confettiFn({
                    particleCount: 50,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: colors,
                    zIndex: 9999,
                    disableForReducedMotion: true
                });

                // Dual corner cannons firing inwards across the modal
                const interval = setInterval(() => {
                    const timeLeft = end - Date.now();
                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }
                    confettiFn({
                        particleCount: 4,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0, y: 0.75 },
                        colors: colors,
                        zIndex: 9999,
                        disableForReducedMotion: true
                    });
                    confettiFn({
                        particleCount: 4,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1, y: 0.75 },
                        colors: colors,
                        zIndex: 9999,
                        disableForReducedMotion: true
                    });
                }, 120);
            };

            if (typeof window.confetti === 'function') {
                launch(window.confetti);
            } else {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
                script.onload = () => {
                    if (typeof window.confetti === 'function') {
                        launch(window.confetti);
                    }
                };
                document.head.appendChild(script);
            }
        };

        const hideModal = () => {
            if (typeof window.confetti?.reset === 'function') {
                window.confetti.reset();
            }
            modalContent.onwheel = null;
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
            
            const numDishes = getSelectedQuantity();
            
            const spinBtn = document.getElementById('spin-btn');
            const spinBtnText = document.getElementById('spin-btn-text');
            const heroRandomBtn = document.getElementById('btn-hero-random');
            const heroRandomBtnText = document.getElementById('btn-hero-random-text');
            const leverKnob = document.getElementById('machine-lever-knob');

            // Animate lever pull down
            if (leverKnob) {
                leverKnob.style.transform = 'rotate(28deg) translateY(8px)';
                setTimeout(() => {
                    leverKnob.style.transform = 'rotate(0deg) translateY(0px)';
                }, 400);
            }

            if (spinBtn) spinBtn.disabled = true;
            if (heroRandomBtn) heroRandomBtn.disabled = true;
            if (spinBtnText) {
                spinBtnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-sm"></i><span>ĐANG QUAY...</span>';
            }
            if (heroRandomBtnText) {
                heroRandomBtnText.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-sm mr-1"></i> Đang tìm món phù hợp...';
            }

            let result = null;
            try {
                result = await fetchRandomFoods(numDishes);
            } catch (error) {
                result = {
                    success: false,
                    foods: [],
                    message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
                };
            }

            const resultDishes = (result && result.foods) ? result.foods.filter(Boolean) : [];
            if (!result || !result.success || resultDishes.length === 0) {
                isSpinning = false;
                if (spinBtn) spinBtn.disabled = false;
                if (heroRandomBtn) heroRandomBtn.disabled = false;
                if (spinBtnText) {
                    spinBtnText.innerHTML = '<i class="fa-solid fa-dice text-sm sm:text-base"></i><span>QUAY NGAY</span><i class="fa-solid fa-arrow-right text-xs"></i>';
                }
                if (heroRandomBtnText) heroRandomBtnText.textContent = 'RANDOM NGAY →';

                const errorMsg = result?.message || 'Không tìm thấy món ăn nào phù hợp với bộ lọc đã chọn. Bạn hãy thử nới lỏng bộ lọc nhé!';
                if (window.Popup && typeof window.Popup.warning === 'function') {
                    window.Popup.warning(errorMsg, 'Không tìm thấy món phù hợp');
                } else if (window.Popup && typeof window.Popup.toast === 'function') {
                    window.Popup.toast(errorMsg, 'warning');
                } else {
                    alert(errorMsg);
                }
                return;
            }

            if (spinBtnText && resultDishes.length > 1) {
                spinBtnText.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-xs"></i><span>${resultDishes.length} MÓN</span>`;
            }

            await performSingleSpin(resultDishes[0]);
            addWonDishes(resultDishes);

            isSpinning = false;
            if (spinBtn) spinBtn.disabled = false;
            if (heroRandomBtn) heroRandomBtn.disabled = false;
            if (spinBtnText) {
                spinBtnText.innerHTML = '<i class="fa-solid fa-dice text-sm sm:text-base"></i><span>QUAY NGAY</span><i class="fa-solid fa-arrow-right text-xs"></i>';
            }
            if (heroRandomBtnText) heroRandomBtnText.textContent = 'RANDOM NGAY →';

            if (resultDishes.length === 1) {
                showResultModal(resultDishes[0]);
            } else if (resultDishes.length > 1) {
                showMultipleResultsModal(resultDishes);
            }
            triggerGachaConfetti();
        };

        const performSingleSpin = (resultDish) => {
            return new Promise((resolve) => {
                const finalDish = resultDish || getRandomPoolFood();

                // Build large reels with realistic dishes
                reel1Items = Array.from({length: 24}, () => getRandomPoolFood());
                reel2Items = Array.from({length: 32}, () => getRandomPoolFood());
                reel3Items = Array.from({length: 40}, () => getRandomPoolFood());

                // Set winning dish in middle row of 3x3 window
                const targetIdx1 = reel1Items.length - 3;
                const targetIdx2 = reel2Items.length - 3;
                const targetIdx3 = reel3Items.length - 3;

                // Index targetIdx + 1 is the middle row!
                reel1Items[targetIdx1 + 1] = finalDish;
                reel2Items[targetIdx2 + 1] = finalDish;
                reel3Items[targetIdx3 + 1] = finalDish;

                // Also populate surrounding top & bottom row with valid appetizing dishes
                reel1Items[targetIdx1] = getRandomPoolFood();
                reel1Items[targetIdx1 + 2] = getRandomPoolFood();
                reel2Items[targetIdx2] = getRandomPoolFood();
                reel2Items[targetIdx2 + 2] = getRandomPoolFood();
                reel3Items[targetIdx3] = getRandomPoolFood();
                reel3Items[targetIdx3 + 2] = getRandomPoolFood();

                populateReelContent('reel-1', reel1Items);
                populateReelContent('reel-2', reel2Items);
                populateReelContent('reel-3', reel3Items);

                const r1 = document.getElementById('reel-1');
                const r2 = document.getElementById('reel-2');
                const r3 = document.getElementById('reel-3');

                if (r1 && r2 && r3) {
                    r1.style.transition = 'none'; r1.style.transform = 'translateY(0px)';
                    r2.style.transition = 'none'; r2.style.transform = 'translateY(0px)';
                    r3.style.transition = 'none'; r3.style.transform = 'translateY(0px)';

                    void r1.offsetWidth;

                    setTimeout(() => {
                        // Smooth easing animation
                        r1.style.transition = 'transform 1.2s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                        r1.style.transform = `translateY(-${(targetIdx1 / reel1Items.length) * 100}%)`;

                        r2.style.transition = 'transform 1.6s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                        r2.style.transform = `translateY(-${(targetIdx2 / reel2Items.length) * 100}%)`;

                        r3.style.transition = 'transform 2.0s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                        r3.style.transform = `translateY(-${(targetIdx3 / reel3Items.length) * 100}%)`;
                    }, 40);
                }

                setTimeout(() => {
                    if (window.renderRecentWonDishes) {
                        window.renderRecentWonDishes();
                    }
                    resolve();
                }, 2100);
            });
        };

        // Initialize reels content
        reel1Items = [getRandomPoolFood(), getRandomPoolFood(), getRandomPoolFood()];
        reel2Items = [getRandomPoolFood(), getRandomPoolFood(), getRandomPoolFood()];
        reel3Items = [getRandomPoolFood(), getRandomPoolFood(), getRandomPoolFood()];
        populateReelContent('reel-1', reel1Items);
        populateReelContent('reel-2', reel2Items);
        populateReelContent('reel-3', reel3Items);

        // Bind Spin Buttons
        const spinBtn = document.getElementById('spin-btn');
        const leverTrigger = document.getElementById('machine-lever-trigger');
        const heroRandomBtn = document.getElementById('btn-hero-random');

        if (spinBtn) spinBtn.addEventListener('click', handleSpin);
        if (leverTrigger) leverTrigger.addEventListener('click', handleSpin);
        if (heroRandomBtn) heroRandomBtn.addEventListener('click', handleSpin);

        // Render Recent results
        window.renderRecentWonDishes();

        // Form submit
        const form = document.getElementById('gacha-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                handleSpin();
            });
        }

        // Modal backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) hideModal();
            });
        }

        // Reset filter button
        let activeCookTimeRadio = document.querySelector('#gacha-form input[name="cook_time"]:checked');
        const cookTimeRadios = document.querySelectorAll('#gacha-form input[name="cook_time"]');
        cookTimeRadios.forEach(radio => {
            radio.addEventListener('click', () => {
                if (activeCookTimeRadio === radio) {
                    radio.checked = false;
                    activeCookTimeRadio = null;
                } else {
                    activeCookTimeRadio = radio;
                }
            });
        });

        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                document.querySelectorAll('#gacha-form input[type="checkbox"]').forEach(cb => cb.checked = false);
                const firstRadio = document.querySelector('#gacha-form input[name="quantity"][value="1"]');
                if (firstRadio) firstRadio.checked = true;
                cookTimeRadios.forEach(cb => { cb.checked = false; });
                activeCookTimeRadio = null;
                
                const ingSearch = document.getElementById('ingredient-search');
                if (ingSearch) ingSearch.value = '';
                const catSearch = document.getElementById('category-search');
                if (catSearch) catSearch.value = '';
                document.querySelectorAll('#ingredient-options label, #category-options label').forEach(lbl => lbl.classList.remove('hidden'));

                const customLabel = document.getElementById('custom-qty-label');
                const btnShowCustom = document.getElementById('btn-show-custom-qty');
                if (customLabel) customLabel.classList.add('hidden');
                if (btnShowCustom) btnShowCustom.classList.remove('hidden');
            });
        }

        // Custom quantity controls
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
                if (customRadio) customRadio.checked = true;
                if (customInput) customInput.focus();
            });

            const confirmCustom = () => {
                const val = Number.parseInt(customInput?.value, 10);
                if (val && val > 0) {
                    const safeValue = Math.min(val, 50);
                    if (customInput) customInput.value = safeValue;
                    customInputWrapper.classList.add('hidden');
                    customInputWrapper.classList.remove('flex');
                    customLabel.classList.remove('hidden');
                    customLabel.classList.add('block');
                    if (customDisplay) customDisplay.textContent = safeValue + ' món';
                    if (customRadio) {
                        customRadio.value = safeValue;
                        customRadio.checked = true;
                    }
                } else {
                    customInputWrapper.classList.add('hidden');
                    customInputWrapper.classList.remove('flex');
                    btnShowCustom.classList.remove('hidden');
                    if (standardRadios[0]) standardRadios[0].checked = true;
                }
            };

            btnConfirmCustom?.addEventListener('click', confirmCustom);
            customInput?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    confirmCustom();
                }
            });

            standardRadios.forEach(radio => {
                radio.addEventListener('change', () => {
                    if (radio.checked) {
                        customLabel?.classList.add('hidden');
                        customLabel?.classList.remove('block');
                        btnShowCustom?.classList.remove('hidden');
                        if (customInput) customInput.value = '';
                    }
                });
            });
        }

        // Helper normalize Vietnamese text for search
        const normalizeText = (str) => (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

        // Search in ingredients and categories
        const bindFilterSearch = (inputId, containerId) => {
            const input = document.getElementById(inputId);
            const container = document.getElementById(containerId);
            if (!input || !container) return;

            input.addEventListener('input', () => {
                const keyword = normalizeText(input.value);
                container.querySelectorAll('label').forEach((chip) => {
                    const text = normalizeText(chip.textContent);
                    chip.classList.toggle('hidden', keyword && !text.includes(keyword));
                });
            });
        };

        bindFilterSearch('ingredient-search', 'ingredient-options');
        bindFilterSearch('category-search', 'category-options');

        // Cho phép cuộn chuột, kéo rê chuột (drag to scroll) mượt mà có quán tính và nút điều hướng
        const setupSmoothHorizontalScroll = (containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.classList.remove('snap-x');
            container.style.overscrollBehaviorX = 'contain';
            container.style.webkitOverflowScrolling = 'touch';

            // 1. Chặn HTML5 drag-and-drop mặc định (nguyên nhân chính khiến kéo chuột trên thẻ/chữ bị khựng/chặn mousemove)
            container.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });

            let isDown = false;
            let startX = 0;
            let scrollStart = 0;
            let hasDragged = false;
            let lastX = 0;
            let lastTime = 0;
            let velocity = 0;
            let momentumAnimId = null;

            const stopMomentum = () => {
                if (momentumAnimId) {
                    cancelAnimationFrame(momentumAnimId);
                    momentumAnimId = null;
                }
            };

            // 2. Con lăn chuột (Wheel): lăn chuột trôi ngang êm ái
            container.addEventListener('wheel', (e) => {
                const maxScroll = container.scrollWidth - container.clientWidth;
                if (maxScroll <= 0) return;

                const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
                if (rawDelta === 0) return;

                e.preventDefault();
                stopMomentum();

                const direction = Math.sign(rawDelta);
                const step = Math.abs(rawDelta) >= 40 ? direction * 55 : rawDelta * 1.2;
                container.scrollLeft = Math.max(0, Math.min(maxScroll, container.scrollLeft + step));
                updateNavButtons();
            }, { passive: false });

            // 3. Kéo rê chuột (Mouse Drag to Scroll)
            const onMouseDown = (e) => {
                // Chỉ nhận nút chuột trái
                if (e.button !== 0) return;

                stopMomentum();
                isDown = true;
                hasDragged = false;
                startX = e.pageX;
                lastX = e.pageX;
                lastTime = performance.now();
                scrollStart = container.scrollLeft;
                velocity = 0;

                container.classList.add('cursor-grabbing');
                container.classList.remove('cursor-grab');

                window.addEventListener('mousemove', onMouseMove, { passive: false });
                window.addEventListener('mouseup', onMouseUp);
            };

            const onMouseMove = (e) => {
                if (!isDown) return;
                const currentX = e.pageX;
                const delta = currentX - startX;

                if (Math.abs(delta) > 4) {
                    hasDragged = true;
                    if (e.cancelable) e.preventDefault();
                }

                const now = performance.now();
                const dt = now - lastTime;
                if (dt > 10) {
                    velocity = (currentX - lastX) / dt;
                    lastX = currentX;
                    lastTime = now;
                }

                container.scrollLeft = scrollStart - delta;
                updateNavButtons();
            };

            const onMouseUp = () => {
                if (!isDown) return;
                isDown = false;
                container.classList.remove('cursor-grabbing');
                container.classList.add('cursor-grab');

                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);

                // Quán tính lướt trôi (Momentum glide) khi thả chuột
                if (hasDragged && Math.abs(velocity) > 0.12) {
                    let currentVelocity = velocity * 15;
                    const friction = 0.93;

                    const glide = () => {
                        if (Math.abs(currentVelocity) < 0.5) {
                            momentumAnimId = null;
                            updateNavButtons();
                            return;
                        }
                        container.scrollLeft -= currentVelocity;
                        currentVelocity *= friction;
                        updateNavButtons();
                        momentumAnimId = requestAnimationFrame(glide);
                    };
                    momentumAnimId = requestAnimationFrame(glide);
                }

                if (hasDragged) {
                    setTimeout(() => {
                        hasDragged = false;
                    }, 80);
                }
            };

            container.addEventListener('mousedown', onMouseDown);

            // Chặn click nhầm vào checkbox/label nếu đang thao tác kéo chuột
            container.addEventListener('click', (e) => {
                if (hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }, true);

            // 4. Quản lý 2 nút mũi tên điều hướng Trái / Phải
            const parent = container.parentElement;
            const btnLeft = parent ? parent.querySelector('.btn-scroll-left') : null;
            const btnRight = parent ? parent.querySelector('.btn-scroll-right') : null;

            const updateNavButtons = () => {
                if (!btnLeft && !btnRight) return;
                const maxScroll = container.scrollWidth - container.clientWidth;
                if (maxScroll <= 5) {
                    if (btnLeft) btnLeft.classList.add('hidden');
                    if (btnRight) btnRight.classList.add('hidden');
                    return;
                }
                if (btnLeft) {
                    btnLeft.classList.remove('hidden');
                    const canScrollLeft = container.scrollLeft > 6;
                    btnLeft.style.opacity = canScrollLeft ? '1' : '0';
                    btnLeft.style.pointerEvents = canScrollLeft ? 'auto' : 'none';
                }
                if (btnRight) {
                    btnRight.classList.remove('hidden');
                    const canScrollRight = container.scrollLeft < maxScroll - 6;
                    btnRight.style.opacity = canScrollRight ? '1' : '0';
                    btnRight.style.pointerEvents = canScrollRight ? 'auto' : 'none';
                }
            };

            if (btnLeft) {
                btnLeft.addEventListener('click', (e) => {
                    e.preventDefault();
                    stopMomentum();
                    container.scrollBy({ left: -220, behavior: 'smooth' });
                    setTimeout(updateNavButtons, 350);
                });
            }

            if (btnRight) {
                btnRight.addEventListener('click', (e) => {
                    e.preventDefault();
                    stopMomentum();
                    container.scrollBy({ left: 220, behavior: 'smooth' });
                    setTimeout(updateNavButtons, 350);
                });
            }

            container.addEventListener('scroll', () => {
                updateNavButtons();
            }, { passive: true });

            setTimeout(updateNavButtons, 150);
        };

        setupSmoothHorizontalScroll('ingredient-options');
        setupSmoothHorizontalScroll('category-options');
        setupSmoothHorizontalScroll('gacha-results-container');
        setupSmoothHorizontalScroll('quick-suggestions-container');

        // Bộ lọc tìm kiếm nguyên liệu & loại món
        const setupFilterSearch = (inputId, containerId) => {
            const input = document.getElementById(inputId);
            const container = document.getElementById(containerId);
            if (!input || !container) return;

            input.addEventListener('input', () => {
                const q = normalizeText(input.value.trim());
                const labels = container.querySelectorAll('label');
                labels.forEach(label => {
                    const text = normalizeText(label.textContent);
                    if (!q || text.includes(q)) {
                        label.style.display = '';
                    } else {
                        label.style.display = 'none';
                    }
                });
            });
        };
        setupFilterSearch('ingredient-search', 'ingredient-options');
        setupFilterSearch('category-search', 'category-options');

        // Nút Đặt lại bộ lọc (Reset)
        const btnResetFilters = document.getElementById('btn-reset-filters');
        if (btnResetFilters) {
            btnResetFilters.addEventListener('click', () => {
                const form = document.getElementById('gacha-form');
                if (form) form.reset();
                const defaultQty = document.querySelector('input[name="quantity"][value="1"]');
                if (defaultQty) defaultQty.checked = true;
                const customLabel = document.getElementById('custom-qty-label');
                const btnCustom = document.getElementById('btn-show-custom-qty');
                if (customLabel) customLabel.classList.add('hidden');
                if (btnCustom) btnCustom.classList.remove('hidden');
                const ingSearch = document.getElementById('ingredient-search');
                const catSearch = document.getElementById('category-search');
                if (ingSearch) { ingSearch.value = ''; ingSearch.dispatchEvent(new Event('input')); }
                if (catSearch) { catSearch.value = ''; catSearch.dispatchEvent(new Event('input')); }
            });
        }

        const ingredientIconMap = {
            'thit ba chi': 'fa-drumstick-bite text-amber-500',
            'trung ga': 'fa-egg text-amber-500',
            'ca basa': 'fa-fish text-blue-500',
            'thit ga': 'fa-kiwi-bird text-orange-500',
            'suon non': 'fa-bone text-red-500',
            'ot chuong': 'fa-pepper-hot text-red-500',
            'thom': 'fa-apple-whole text-amber-500',
            'hanh tay': 'fa-seedling text-emerald-500',
            'thit bo': 'fa-drumstick-bite text-red-600',
            'ca loc': 'fa-fish text-blue-600',
            'ca chua': 'fa-apple-whole text-rose-500',
            'gia do': 'fa-seedling text-emerald-500',
            'bi do': 'fa-bowl-food text-amber-600',
            'thit heo bam': 'fa-drumstick-bite text-amber-500',
            'cai xanh': 'fa-leaf text-emerald-500',
            'rau muong': 'fa-leaf text-emerald-500',
            'cai thia': 'fa-leaf text-emerald-500',
            'dau que': 'fa-seedling text-emerald-500',
            'ca rot': 'fa-carrot text-orange-500',
            'bong cai xanh': 'fa-tree text-emerald-500',
            'dau hu': 'fa-cube text-yellow-600'
        };

        const categoryIconMap = {
            'mon-man': 'fa-bowl-food text-orange-500',
            'mon-canh': 'fa-spoon text-blue-500',
            'mon-xao': 'fa-fire-burner text-amber-500',
            'mon-kho': 'fa-fire-flame-simple text-amber-600',
            'mon-chien': 'fa-fire text-red-500',
            'mon-rau': 'fa-leaf text-emerald-500',
            'mon-luoc': 'fa-water text-cyan-500'
        };

        const categoryExploreImages = {
            'mon-man': `${BACKEND_URL}/images/foods/thit-ba-chi-luoc.jpg`,
            'mon-canh': `${BACKEND_URL}/images/foods/canh-chua-ca-loc.jpg`,
            'mon-kho': `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`,
            'mon-xao': `${BACKEND_URL}/images/foods/suon-xao-chua-ngot.jpg`,
            'mon-chien': `${BACKEND_URL}/images/foods/ga-chien-nuoc-mam.jpg`,
            'mon-rau': `${BACKEND_URL}/images/foods/rau-muong-xao-toi.jpg`,
            'mon-luoc': `${BACKEND_URL}/images/foods/rau-cu-luoc.jpg`
        };

        try {
            const optionsRes = await fetchAPI('/random/options');
            if (optionsRes && optionsRes.success && optionsRes.data) {
                const { categories, ingredients } = optionsRes.data;

                if (Array.isArray(ingredients) && ingredients.length > 0) {
                    const ingContainer = document.getElementById('ingredient-options');
                    if (ingContainer) {
                        ingContainer.innerHTML = ingredients.map(ing => {
                            const normalized = normalizeText(ing.name);
                            const iconClass = ingredientIconMap[normalized] || 'fa-leaf text-emerald-500';
                            return `
                                <label class="cursor-pointer group shrink-0 relative">
                                    <input type="checkbox" name="ingredients" value="${ing.name}" class="peer sr-only">
                                    <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                        <i class="fa-solid ${iconClass} peer-checked:text-white"></i> ${ing.name}
                                    </div>
                                </label>
                            `;
                        }).join('');
                        ingContainer.dispatchEvent(new Event('scroll'));
                    }
                }

                if (Array.isArray(categories) && categories.length > 0) {
                    const catContainer = document.getElementById('category-options');
                    if (catContainer) {
                        catContainer.innerHTML = categories.map(cat => {
                            const iconClass = categoryIconMap[cat.slug] || 'fa-bowl-food text-orange-500';
                            return `
                                <label class="cursor-pointer group shrink-0 relative">
                                    <input type="checkbox" name="categories" value="${cat.name}" class="peer sr-only">
                                    <div class="py-1.5 px-3 rounded-xl border border-[#E5E1D6] bg-white peer-checked:bg-[#145A43] peer-checked:text-white peer-checked:border-[#145A43] text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap">
                                        <i class="fa-solid ${iconClass} peer-checked:text-white"></i> ${cat.name}
                                    </div>
                                </label>
                            `;
                        }).join('');
                        catContainer.dispatchEvent(new Event('scroll'));
                    }

                    const exploreContainer = document.getElementById('home-explore-categories');
                    if (exploreContainer) {
                        const items = categories.slice(0, 8);
                        const repeatedItems = [...items, ...items, ...items, ...items];
                        exploreContainer.innerHTML = repeatedItems.map(cat => {
                            const iconClass = categoryIconMap[cat.slug]?.split(' ')[0] || 'fa-bowl-food';
                            const image = categoryExploreImages[cat.slug] || categoryExploreImages['mon-man'];
                            const countText = `${cat.foodCount || 0} món`;
                            return `
                                <a href="#/danh-sach?category=${cat.slug}" class="group/card relative rounded-2xl overflow-hidden bg-white border border-[#E5E1D6] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1.5 block w-[150px] sm:w-[180px] md:w-[200px] aspect-[4/5] flex flex-col justify-end p-3.5 shrink-0 select-none">
                                    <img src="${image}" alt="${cat.name}" class="absolute inset-0 w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500 ease-out" loading="lazy" decoding="async">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
                                    <div class="relative z-10 text-white">
                                        <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-sm mb-2 group-hover/card:bg-[#F4A62A] group-hover/card:text-[#0F4937] transition-colors">
                                            <i class="fa-solid ${iconClass}"></i>
                                        </div>
                                        <h3 class="font-bold text-sm sm:text-base leading-tight">${cat.name}</h3>
                                        <span class="text-xs text-white/80 font-medium">${countText}</span>
                                    </div>
                                </a>
                            `;
                        }).join('');

                        if (!exploreContainer._touchBound) {
                            exploreContainer._touchBound = true;
                            exploreContainer.addEventListener('touchstart', () => {
                                exploreContainer.style.animationPlayState = 'paused';
                            }, { passive: true });
                            exploreContainer.addEventListener('touchend', () => {
                                exploreContainer.style.animationPlayState = 'running';
                            }, { passive: true });
                            exploreContainer.addEventListener('touchcancel', () => {
                                exploreContainer.style.animationPlayState = 'running';
                            }, { passive: true });
                        }
                    }
                }
            }
        } catch (e) {
            console.warn('Loi khi tai danh sach options:', e);
        }

        try {
            const postsRes = await fetchAPI('/posts/featured?limit=4');
            if (postsRes && postsRes.success && Array.isArray(postsRes.data) && postsRes.data.length > 0) {
                const communityContainer = document.getElementById('home-community-cards');
                if (communityContainer) {
                    communityContainer.innerHTML = postsRes.data.map(post => FoodCard({
                        id: post.id || post.foodId || post.postId,
                        name: post.name || post.title,
                        image: post.image,
                        time: post.time,
                        likes: post.likes,
                        author: post.author,
                        description: post.description
                    })).join('');
                }
            }
        } catch (e) {
            console.warn('Loi khi tai bai viet cong dong:', e);
        }

        try {
            const suggestionsRes = await fetchAPI('/foods/quick-suggestions');
            const quickContainer = document.getElementById('quick-suggestions-container');
            const quickSection = document.getElementById('section-quick-suggestions');
            if (suggestionsRes && suggestionsRes.success && Array.isArray(suggestionsRes.data) && suggestionsRes.data.length > 0) {
                if (quickContainer) {
                    quickContainer.innerHTML = suggestionsRes.data.map((item) => {
                        const iconHtml = item.icon ? `<i class="fa-solid ${item.icon}"></i>` : (item.emoji ? `<span>${item.emoji}</span>` : '');
                        const countBadge = item.count ? `<span class="text-[10px] px-1.5 py-0.5 bg-[#F8F5EC] text-[#145A43] rounded-full border border-[#E5E1D6] font-semibold">${item.count}</span>` : '';
                        return `
                            <a href="${item.url}" class="snap-start shrink-0 px-4 py-2 bg-white hover:bg-[#145A43] text-[#18382D] hover:text-white rounded-full text-xs font-bold border border-[#E5E1D6] shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 group cursor-pointer">
                                ${iconHtml}
                                <span>${item.label}</span>
                                ${countBadge}
                                <i class="fa-solid fa-angle-right text-[10px] text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform"></i>
                            </a>
                        `;
                    }).join('');
                }
            } else if (quickSection) {
                quickSection.classList.add('hidden');
            }
        } catch (e) {
            const quickSection = document.getElementById('section-quick-suggestions');
            if (quickSection) {
                quickSection.classList.add('hidden');
            }
        }

        try {
            const foodsRes = await fetchAPI('/foods?limit=50');
            if (foodsRes && foodsRes.success && Array.isArray(foodsRes.data) && foodsRes.data.length > 0) {
                randomFoodsPool = foodsRes.data.map(normalizeFood);
                reel1Items = [getRandomPoolFood(), getRandomPoolFood(), getRandomPoolFood()];
                reel2Items = [getRandomPoolFood(), getRandomPoolFood(), getRandomPoolFood()];
                reel3Items = [getRandomPoolFood(), getRandomPoolFood(), getRandomPoolFood()];
                populateReelContent('reel-1', reel1Items);
                populateReelContent('reel-2', reel2Items);
                populateReelContent('reel-3', reel3Items);
            }
        } catch (e) {
            console.warn('Loi khi tai danh sach mon an ban dau:', e);
        }
    }
};

export default Home;

import { fetchAPI } from '../api.js';
import FoodCard from '../components/FoodCard.js';

const dummyFoods = [
    { id: 1, name: 'Thịt Kho Trứng & Canh Chua', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '45 phút', likes: '2.5k', author: { name: 'Mẹ Bông' } },
    { id: 2, name: 'Gà Xào Sả Ớt & Rau Luộc', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '30 phút', likes: '1.1k', author: { name: 'Lan Anh' } },
    { id: 3, name: 'Bò Xào Lúc Lắc', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', time: '20 phút', likes: '3.4k', author: { name: 'Chef Tùng' } }
];

const ITEM_HEIGHT = 160;

const Home = {
    render: async () => {
        const spotlightFood = dummyFoods[0];
        const otherFoods = dummyFoods.slice(1);
        
        const spotlightHTML = `
            <a href="#/mon-an/${spotlightFood.id}" class="col-span-1 sm:col-span-2 lg:col-span-2 block bg-white rounded-2xl shadow-bento overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary-light/20 relative h-[300px] lg:h-full">
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
                    <div class="w-full lg:w-3/5 flex flex-col items-center justify-center bg-card/60 backdrop-blur-xl rounded-2xl p-8 shadow-bento border border-white">
                        <div class="text-center w-full mb-6">
                            <h1 class="text-4xl md:text-5xl font-extrabold text-text-main mb-3 drop-shadow-sm leading-tight tracking-tight">Hôm Nay <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ăn Gì?</span></h1>
                            <p class="text-text-muted text-base font-medium">Khó chọn món? Quay cỗ máy ẩm thực chọn giúp bạn!</p>
                        </div>
                        <!-- Slot Machine Container -->
                        <div id="slot-machine-container" class="w-full"></div>
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
                                <div class="grid grid-cols-3 gap-2">
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
                                        <div class="text-center py-2.5 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary peer-checked:shadow-md peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-bold text-xs group-hover:border-primary-light">3-5 món</div>
                                    </label>
                                </div>
                            </div>

                            <!-- 2. Chọn nguyên liệu có sẵn -->
                            <div class="bg-white/80 p-4 rounded-xl shadow-sm border border-white">
                                <label class="flex items-center gap-2 text-text-main font-bold mb-3 text-sm">
                                    <span class="w-6 h-6 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs border border-primary-light/30">2</span> Nguyên liệu
                                </label>
                                <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="thit" class="peer sr-only" checked>
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-red-50 peer-checked:text-red-500 peer-checked:border-red-200 peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-red-200"><i class="fa-solid fa-drumstick-bite text-xl"></i> Thịt heo</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="trung" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-accent-subtle peer-checked:text-accent-hover peer-checked:border-accent-light peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-accent-light"><i class="fa-solid fa-egg text-xl"></i> Trứng</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="ingredients" value="rau" class="peer sr-only">
                                        <div class="text-center py-2.5 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary-subtle peer-checked:text-primary-hover peer-checked:border-primary-light peer-checked:shadow-sm peer-active:scale-95 peer-checked:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs flex flex-col items-center justify-center gap-1 font-bold group-hover:border-primary-light"><i class="fa-solid fa-leaf text-xl"></i> Rau</div>
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
                                <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="man" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-orange-50 peer-checked:text-orange-600 peer-checked:border-orange-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-orange-200"><i class="fa-solid fa-bowl-food text-base"></i> Mặn</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="canh" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-blue-50 peer-checked:text-blue-600 peer-checked:border-blue-200 peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-blue-200"><i class="fa-solid fa-bowl-food text-base"></i> Canh</div>
                                    </label>
                                    <label class="cursor-pointer group flex-shrink-0 w-24 snap-start">
                                        <input type="checkbox" name="categories" value="rau" class="peer sr-only">
                                        <div class="text-center py-2 px-1 rounded-lg border border-gray-100 bg-white peer-checked:bg-primary-subtle peer-checked:text-primary-hover peer-checked:border-primary-light peer-checked:shadow-sm transition-all text-xs flex items-center justify-center gap-1 font-bold group-hover:border-primary-light"><i class="fa-solid fa-leaf text-base"></i> Rau</div>
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
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[1fr]">
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
        let reel1Items = [dummyFoods[0], dummyFoods[1]];
        let reel2Items = [dummyFoods[0], dummyFoods[1]];
        let reel3Items = [dummyFoods[0], dummyFoods[1]];

        const slotMachineContainer = document.getElementById('slot-machine-container');
        const modal = document.getElementById('gacha-result-modal');
        const modalContent = document.getElementById('gacha-modal-content');

        const generateReelHTML = (reelNum) => `
            <div class="relative flex-1 h-full overflow-hidden bg-white rounded-md sm:rounded-xl">
              <div class="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-white/95 to-transparent z-20 pointer-events-none"></div>
              <div class="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white/95 to-transparent z-20 pointer-events-none"></div>
              <div id="reel-${reelNum}" class="w-full flex flex-col will-change-transform"></div>
            </div>
        `;

        const renderSlotMachine = () => {
            slotMachineContainer.innerHTML = `
            <div class="relative w-full flex justify-center min-h-[400px]">
                <div class="relative z-50 w-full max-w-lg lg:max-w-xl mx-auto aspect-square bg-[url('/assets/images/gacha-machine-square.jpg')] bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl">
                    
                    <!-- Title Overlay -->
                    <div class="absolute top-[8%] w-full text-center flex flex-col items-center justify-center select-none pointer-events-none z-10">
                        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]" style="-webkit-text-stroke: 1px #854d0e;">HÔM NAY ĂN GÌ?</h2>
                        <p class="text-[9px] sm:text-xs md:text-sm font-bold text-yellow-500 tracking-[0.2em] mt-1 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">MENU PRINTER - EDITION</p>
                    </div>

                    <!-- The 3 Reels positioned over the image's screen -->
                    <div class="absolute top-[29.5%] left-[12%] w-[76%] h-[41%] flex gap-[3.5%] items-center justify-between z-10">
                        ${generateReelHTML(1)}
                        ${generateReelHTML(2)}
                        ${generateReelHTML(3)}
                    </div>
                    
                    <!-- Invisible Spin Button Over the image's physical button -->
                    <button id="spin-btn" class="absolute bottom-[4%] left-[40.5%] w-[19%] h-[19%] rounded-full pointer-events-auto hover:bg-white/20 active:bg-black/20 transition-colors z-20 flex items-center justify-center cursor-pointer" title="Quay Ngay" ${isSpinning ? 'disabled' : ''}>
                        ${isSpinning ? '<i class="fa-solid fa-spinner fa-spin text-white text-3xl"></i>' : ''}
                    </button>
                    
                    ${isSpinning ? '<div class="absolute inset-0 bg-black/10 pointer-events-auto z-30"></div>' : ''}
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
                if (!dish) return '<div style="height:160px"></div>';
                return `
                <div style="height: 160px" class="w-full flex-shrink-0 flex flex-col items-center justify-center p-2.5 select-none relative group">
                    <div class="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-orange-400 shadow-md shadow-green-900/20 mb-2 bg-white">
                        <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'" />
                    </div>
                    <p class="text-xs md:text-sm font-black text-green-900 text-center line-clamp-1 px-1 max-w-[140px]">${dish.name}</p>
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
                
                <div class="p-5 sm:p-8 pt-0 relative z-10 -mt-6">
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
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        ${dishes.map((dish, idx) => `
                            <div class="result-card cursor-pointer border border-green-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group bg-green-50/30 hover:bg-white hover:-translate-y-1" data-idx="${idx}">
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

        const handleSpin = () => {
            if (isSpinning) return;
            isSpinning = true;
            renderSlotMachine(); 
            
            // Re-bind content because renderSlotMachine replaced DOM
            populateReelContent('reel-1', reel1Items);
            populateReelContent('reel-2', reel2Items);
            populateReelContent('reel-3', reel3Items);

            reel1Items = Array.from({length: 30}, () => dummyFoods[Math.floor(Math.random() * dummyFoods.length)]);
            reel2Items = Array.from({length: 40}, () => dummyFoods[Math.floor(Math.random() * dummyFoods.length)]);
            reel3Items = Array.from({length: 50}, () => dummyFoods[Math.floor(Math.random() * dummyFoods.length)]);

            const quantityVal = document.querySelector('input[name="quantity"]:checked')?.value || "1";
            let numDishes = parseInt(quantityVal);
            if (numDishes === 3) numDishes = Math.floor(Math.random() * 3) + 3; // 3 to 5
            
            const resultDishes = [];
            for(let i=0; i<numDishes; i++) {
                resultDishes.push(dummyFoods[Math.floor(Math.random() * dummyFoods.length)]);
            }

            const targetIdx1 = reel1Items.length - 2;
            const targetIdx2 = reel2Items.length - 2;
            const targetIdx3 = reel3Items.length - 2;

            reel1Items[targetIdx1] = resultDishes[0];
            reel2Items[targetIdx2] = resultDishes[1] || resultDishes[0];
            reel3Items[targetIdx3] = resultDishes[2] || resultDishes[0];

            populateReelContent('reel-1', reel1Items);
            populateReelContent('reel-2', reel2Items);
            populateReelContent('reel-3', reel3Items);

            const r1 = document.getElementById('reel-1');
            const r2 = document.getElementById('reel-2');
            const r3 = document.getElementById('reel-3');

            r1.style.transition = 'none'; r1.style.transform = 'translateY(0px)';
            r2.style.transition = 'none'; r2.style.transform = 'translateY(0px)';
            r3.style.transition = 'none'; r3.style.transform = 'translateY(0px)';

            setTimeout(() => {
                r1.style.transition = 'transform 1.5s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                r1.style.filter = 'blur(1px)';
                r1.style.transform = `translateY(-${targetIdx1 * ITEM_HEIGHT}px)`;

                r2.style.transition = 'transform 2.0s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                r2.style.filter = 'blur(1px)';
                r2.style.transform = `translateY(-${targetIdx2 * ITEM_HEIGHT}px)`;

                r3.style.transition = 'transform 2.5s cubic-bezier(0.12, 0.82, 0.28, 1.0)';
                r3.style.filter = 'blur(1px)';
                r3.style.transform = `translateY(-${targetIdx3 * ITEM_HEIGHT}px)`;
            }, 50);

            setTimeout(() => {
                r1.style.filter = 'none';
                r2.style.filter = 'none';
                r3.style.filter = 'none';
                
                isSpinning = false;
                renderSlotMachine();
                populateReelContent('reel-1', reel1Items);
                populateReelContent('reel-2', reel2Items);
                populateReelContent('reel-3', reel3Items);
                
                // Keep the final positions
                const nr1 = document.getElementById('reel-1');
                const nr2 = document.getElementById('reel-2');
                const nr3 = document.getElementById('reel-3');
                nr1.style.transition = 'none'; nr1.style.transform = `translateY(-${targetIdx1 * ITEM_HEIGHT}px)`;
                nr2.style.transition = 'none'; nr2.style.transform = `translateY(-${targetIdx2 * ITEM_HEIGHT}px)`;
                nr3.style.transition = 'none'; nr3.style.transform = `translateY(-${targetIdx3 * ITEM_HEIGHT}px)`;

                if (numDishes === 1) {
                    showResultModal(resultDishes[0]);
                } else {
                    showMultipleResultsModal(resultDishes);
                }
            }, 2550);
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
    }
};

export default Home;

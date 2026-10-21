import { fetchAPI } from '../../api.js?v=20261016-6c6851d781';
import { renderFoodCardSkeleton } from '../../components/Skeleton.js?v=20261016-6c6851d781';

// ============================================================================
// RICH SAMPLE DATASET: 36 Authentic Vietnamese Dishes
// Conforms to Dish Entity: id, name, image, time, cooking_time_minutes, rating, 
// rating_count, likes, is_favorite, category, sub_category, difficulty, 
// description, ingredients, tags, author
// ============================================================================
// Toàn bộ danh sách món ăn được nạp động từ Database Backend
const initialDishes = [];

// Lazy Loading Batch Configuration
const BATCH_SIZE = 12;

const sortOptions = [
    { value: 'newest', icon: 'fa-clock', label: 'Mới nhất' },
    { value: 'popular', icon: 'fa-fire', label: 'Phổ biến nhất' },
    { value: 'likes', icon: 'fa-heart', label: 'Được yêu thích' },
    { value: 'rating', icon: 'fa-star', label: 'Đánh giá cao' },
    { value: 'time_asc', icon: 'fa-hourglass-start', label: 'Thời gian nấu tăng dần' },
    { value: 'time_desc', icon: 'fa-hourglass-end', label: 'Thời gian nấu giảm dần' },
    { value: 'name_asc', icon: 'fa-arrow-down-a-z', label: 'Tên A → Z' }
];

const escapeHTML = (str) => {
    if (str == null) return '';
    return String(str).replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
};

const getCategoryIcon = (name = '', slug = '') => {
    const s = (slug || name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (s.includes('man')) return { icon: 'fa-drumstick-bite', color: 'text-amber-600' };
    if (s.includes('canh')) return { icon: 'fa-bowl-food', color: 'text-emerald-600' };
    if (s.includes('kho')) return { icon: 'fa-fire-burner', color: 'text-amber-700' };
    if (s.includes('xao')) return { icon: 'fa-fire-flame-curved', color: 'text-orange-500' };
    if (s.includes('chien')) return { icon: 'fa-bacon', color: 'text-yellow-600' };
    if (s.includes('rau')) return { icon: 'fa-leaf', color: 'text-green-600' };
    if (s.includes('luoc')) return { icon: 'fa-droplet', color: 'text-blue-500' };
    return { icon: 'fa-utensils', color: 'text-primary' };
};

const getIngredientIcon = (name = '') => {
    const n = (name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (n.includes('bo')) return { icon: 'fa-drumstick-bite', color: 'text-rose-600' };
    if (n.includes('ga') || n.includes('canh ga')) return { icon: 'fa-drumstick-bite', color: 'text-amber-600' };
    if (n.includes('heo') || n.includes('ba chi') || n.includes('thit')) return { icon: 'fa-bacon', color: 'text-rose-500' };
    if (n.includes('suon')) return { icon: 'fa-bacon', color: 'text-red-600' };
    if (n.includes('ca') || n.includes('basa') || n.includes('loc') || n.includes('phi')) return { icon: 'fa-fish', color: 'text-sky-500' };
    if (n.includes('tom')) return { icon: 'fa-shrimp', color: 'text-orange-500' };
    if (n.includes('muc')) return { icon: 'fa-fish', color: 'text-indigo-400' };
    if (n.includes('trung')) return { icon: 'fa-egg', color: 'text-amber-500' };
    if (n.includes('dau')) return { icon: 'fa-cube', color: 'text-amber-400' };
    if (n.includes('ca rot')) return { icon: 'fa-carrot', color: 'text-orange-500' };
    if (n.includes('ca chua')) return { icon: 'fa-apple-whole', color: 'text-red-500' };
    if (n.includes('ca tim')) return { icon: 'fa-circle', color: 'text-purple-500' };
    if (n.includes('bap')) return { icon: 'fa-leaf', color: 'text-emerald-500' };
    if (n.includes('bi') || n.includes('bau') || n.includes('muop')) return { icon: 'fa-lemon', color: 'text-yellow-600' };
    if (n.includes('cai') || n.includes('rau') || n.includes('xa lach') || n.includes('ngot') || n.includes('lang') || n.includes('muong') || n.includes('rong bien') || n.includes('gia')) return { icon: 'fa-leaf', color: 'text-emerald-600' };
    if (n.includes('bun') || n.includes('nui') || n.includes('bot')) return { icon: 'fa-bowl-rice', color: 'text-amber-500' };
    if (n.includes('nam')) return { icon: 'fa-cloud', color: 'text-amber-700' };
    if (n.includes('hanh') || n.includes('toi') || n.includes('sa') || n.includes('gung') || n.includes('ot') || n.includes('tieu') || n.includes('mam') || n.includes('chanh')) return { icon: 'fa-mortar-pestle', color: 'text-rose-400' };
    return { icon: 'fa-seedling', color: 'text-emerald-500' };
};

const FoodList = {
    render: async () => {
        return `
        <div class="cozy-kitchen-bg min-h-screen text-text-main font-sans selection:bg-primary/20 selection:text-primary pb-20">
            
            <!-- ======================================================== -->
            <!-- 1. HERO SECTION & LARGE SEARCH BAR                       -->
            <!-- ======================================================== -->
            <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div class="relative bg-gradient-to-r from-[#FFFDF9] via-[#FBF8F1] to-[#F5EBD4]/75 rounded-[28px] p-6 sm:p-8 lg:p-10 border border-beige-border/80 shadow-sm overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                    
                    <!-- Decorative Ambience Blobs -->
                    <div class="absolute -top-12 -left-12 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="absolute -bottom-10 right-20 w-60 h-60 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>

                    <!-- Left: Hero Text, Search Bar & Quick Categories -->
                    <div class="relative z-10 w-full lg:max-w-2xl space-y-4">
                        
                        <!-- Top Badge -->
                        <div class="inline-flex items-center gap-2 bg-primary-subtle border border-primary-light/40 px-3.5 py-1 rounded-full text-xs font-bold text-primary shadow-2xs">
                            <i class="fa-solid fa-kitchen-set text-accent text-xs"></i>
                            <span>Nấu ngon mỗi ngày</span>
                        </div>

                        <!-- Main Heading -->
                        <h1 class="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-text-main tracking-tight leading-tight">
                            Khám phá <span class="text-primary font-caveat text-3xl sm:text-4xl lg:text-[46px] font-bold inline-block">Từ Điển Ẩm Thực</span>
                        </h1>

                        <!-- Subtitle -->
                        <p class="text-text-muted text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
                            Hàng ngàn công thức món ngon, dễ làm, phù hợp với mọi bữa ăn trong gia đình.
                        </p>

                        <!-- Large Search Bar -->
                        <div class="pt-1">
                            <form id="hero-search-form" class="relative flex items-center w-full bg-white rounded-full border-2 border-[#DFD5BE] focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15 shadow-sm transition-all duration-200 p-1.5">
                                <span class="pl-3.5 pr-2 text-primary text-base sm:text-lg flex items-center justify-center">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <input 
                                    type="text" 
                                    id="hero-search-input"
                                    placeholder="Tìm kiếm món ăn, nguyên liệu..." 
                                    class="w-full bg-transparent text-xs sm:text-sm font-medium text-text-main placeholder:text-gray-400 focus:outline-none px-2"
                                    aria-label="Tìm kiếm món ăn"
                                />
                                <button 
                                    type="button" 
                                    id="btn-clear-search" 
                                    class="hidden p-1 text-gray-400 hover:text-gray-600 transition-colors mr-1 cursor-pointer"
                                    title="Xóa tìm kiếm"
                                >
                                    <i class="fa-solid fa-circle-xmark text-sm"></i>
                                </button>
                                <button 
                                    type="submit" 
                                    id="btn-hero-search-submit"
                                    class="px-4.5 py-2.5 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-primary/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
                                >
                                    <span>Tìm kiếm</span>
                                    <i class="fa-solid fa-arrow-right text-[11px]"></i>
                                </button>
                            </form>
                        </div>

                        <!-- Quick Category Pills -->
                        <div class="pt-1 flex flex-wrap items-center gap-2" id="quick-category-pills">
                            <span class="text-xs font-bold text-text-muted mr-1 hidden sm:inline">Danh mục:</span>
                            <button type="button" class="quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs" data-cat="viet">
                                <i class="fa-solid fa-bowl-food text-amber-600 text-xs"></i>
                                <span>Món Việt</span>
                            </button>
                            <button type="button" class="quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs" data-cat="nhanh">
                                <i class="fa-solid fa-bolt text-amber-500 text-xs"></i>
                                <span>Món Nhanh</span>
                            </button>
                        </div>

                    </div>

                    <!-- Right: Visual Food Photography Feature Image -->
                    <div class="relative z-10 shrink-0 w-full lg:w-auto flex items-center justify-center">
                        <div class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[24px] overflow-hidden border-4 border-white shadow-xl group">
                            <img 
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80" 
                                alt="Món ăn Việt Nam gia đình" 
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            <!-- Floating Badge 1 -->
                            <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-[11px] font-extrabold text-primary flex items-center gap-1.5">
                                <i class="fa-solid fa-fire text-accent"></i>
                                <span>120+ Công thức</span>
                            </div>

                            <!-- Floating Badge 2 -->
                            <div class="absolute bottom-3 right-3 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1">
                                <i class="fa-solid fa-star text-yellow-400"></i>
                                <span>4.9 / 5 (3.2k)</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            <!-- ======================================================== -->
            <!-- 2. MAIN CONTENT: 2-COLUMN LAYOUT                         -->
            <!-- LEFT COLUMN: FILTER CARD + RANDOM WIDGET (~320px)        -->
            <!-- RIGHT COLUMN: TOOLBAR + RECIPE GRID + INFINITE SCROLL    -->
            <!-- ======================================================== -->
            <main class="recipe-page-layout max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-7 items-start">
                
                <!-- ---------------------------------------------------- -->
                <!-- LEFT COLUMN: LEFT SIDEBAR (STICKY ~320px)            -->
                <!-- ---------------------------------------------------- -->
                <aside class="hidden lg:block left-sidebar w-full lg:sticky lg:top-[76px] lg:self-start lg:max-h-[calc(100vh-84px)] lg:overflow-y-auto space-y-3" id="desktop-left-sidebar">
                    
                    <!-- BLOCK 1: BỘ LỌC NHANH (FILTER CARD) -->
                    <section class="filter-card bg-white rounded-[20px] border border-beige-border/80 p-3.5 sm:p-4 shadow-sm space-y-3">
                        
                        <!-- Sidebar Header -->
                        <div class="flex items-center justify-between pb-2 border-b border-[#F0EBE0]">
                            <div class="flex items-center gap-1.5">
                                <span class="w-5.5 h-5.5 rounded-lg bg-primary-subtle text-primary flex items-center justify-center text-[10px] font-bold">
                                    <i class="fa-solid fa-sliders"></i>
                                </span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Bộ lọc nhanh
                                </h2>
                            </div>
                            <button type="button" id="btn-reset-filters-sidebar" class="text-[10px] font-bold text-text-muted hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1" title="Đặt lại bộ lọc">
                                <i class="fa-solid fa-rotate-left text-[9px]"></i>
                                <span>Đặt lại</span>
                            </button>
                        </div>

                        <!-- Group 1: LOẠI MÓN (2 cột, tối đa 3 hàng, cuộn được, checkbox ẩn ô có tích v) -->
                        <div class="space-y-1.5">
                            <div class="flex items-center justify-between">
                                <h3 class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
                                    Loại món
                                </h3>
                                <span class="text-[9.5px] font-semibold text-text-muted/80 bg-[#F4EFE6] px-1.5 py-0.2 rounded-md">
                                    Chọn nhiều
                                </span>
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 max-h-[114px] overflow-y-auto pr-1 custom-filter-scroll" id="filter-category-group">
                                <!-- Populated dynamically from Database -->
                                <div class="col-span-2 py-4 text-center text-text-muted text-[11px] font-medium">
                                    <i class="fa-solid fa-spinner animate-spin mr-1"></i> Đang tải danh mục...
                                </div>
                            </div>
                        </div>

                        <!-- Group 2: THỜI GIAN NẤU (2 cột, tối đa 3 hàng, radio ẩn chấm có tích v) -->
                        <div class="space-y-1.5 pt-2 border-t border-[#F0EBE0]">
                            <div class="flex items-center justify-between">
                                <h3 class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
                                    Thời gian nấu
                                </h3>
                                <span class="text-[9.5px] font-semibold text-text-muted/80 bg-[#F4EFE6] px-1.5 py-0.2 rounded-md">
                                    Chọn 1
                                </span>
                            </div>
                            <div class="grid grid-cols-2 gap-1.5 max-h-[114px] overflow-y-auto pr-1 custom-filter-scroll" id="filter-time-group">
                                <label class="filter-chip-item is-checked group relative w-full h-[34px] px-2 py-1 rounded-xl border border-gray-200/90 bg-white text-text-muted text-[11px] font-semibold flex items-center justify-between hover:border-primary/40 hover:bg-cream-soft hover:text-text-main transition-all cursor-pointer select-none">
                                    <input type="radio" name="cook_time" value="all" checked class="sr-only filter-time-radio">
                                    <span class="flex items-center gap-1.5 min-w-0 pr-1">
                                        <i class="fa-solid fa-clock-rotate-left text-primary text-[10px] w-3.5 text-center shrink-0"></i>
                                        <span class="truncate text-[11px]">Tất cả</span>
                                    </span>
                                    <span class="check-icon w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-primary">
                                        <i class="fa-solid fa-check text-[9px]"></i>
                                    </span>
                                </label>
                                <label class="filter-chip-item group relative w-full h-[34px] px-2 py-1 rounded-xl border border-gray-200/90 bg-white text-text-muted text-[11px] font-semibold flex items-center justify-between hover:border-primary/40 hover:bg-cream-soft hover:text-text-main transition-all cursor-pointer select-none">
                                    <input type="radio" name="cook_time" value="under_15" class="sr-only filter-time-radio">
                                    <span class="flex items-center gap-1.5 min-w-0 pr-1">
                                        <i class="fa-solid fa-bolt text-amber-500 text-[10px] w-3.5 text-center shrink-0"></i>
                                        <span class="truncate text-[11px]">Dưới 15p</span>
                                    </span>
                                    <span class="check-icon w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-primary">
                                        <i class="fa-solid fa-check text-[9px]"></i>
                                    </span>
                                </label>
                                <label class="filter-chip-item group relative w-full h-[34px] px-2 py-1 rounded-xl border border-gray-200/90 bg-white text-text-muted text-[11px] font-semibold flex items-center justify-between hover:border-primary/40 hover:bg-cream-soft hover:text-text-main transition-all cursor-pointer select-none">
                                    <input type="radio" name="cook_time" value="15_to_30" class="sr-only filter-time-radio">
                                    <span class="flex items-center gap-1.5 min-w-0 pr-1">
                                        <i class="fa-regular fa-clock text-blue-500 text-[10px] w-3.5 text-center shrink-0"></i>
                                        <span class="truncate text-[11px]">15 – 30p</span>
                                    </span>
                                    <span class="check-icon w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-primary">
                                        <i class="fa-solid fa-check text-[9px]"></i>
                                    </span>
                                </label>
                                <label class="filter-chip-item group relative w-full h-[34px] px-2 py-1 rounded-xl border border-gray-200/90 bg-white text-text-muted text-[11px] font-semibold flex items-center justify-between hover:border-primary/40 hover:bg-cream-soft hover:text-text-main transition-all cursor-pointer select-none">
                                    <input type="radio" name="cook_time" value="above_30" class="sr-only filter-time-radio">
                                    <span class="flex items-center gap-1.5 min-w-0 pr-1">
                                        <i class="fa-solid fa-hourglass-half text-emerald-600 text-[10px] w-3.5 text-center shrink-0"></i>
                                        <span class="truncate text-[11px]">Trên 30p</span>
                                    </span>
                                    <span class="check-icon w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-primary">
                                        <i class="fa-solid fa-check text-[9px]"></i>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <!-- Group 3: NGUYÊN LIỆU CHÍNH (2 cột, tối đa 3 hàng, cuộn được 53 nguyên liệu DB, checkbox ẩn có tích v) -->
                        <div class="space-y-1.5 pt-2 border-t border-[#F0EBE0]">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-1.5">
                                    <h3 class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
                                        Nguyên liệu
                                    </h3>
                                    <span id="selected-ingredients-count" class="hidden text-[9px] font-extrabold bg-primary text-white rounded-full px-1.5 py-0.2 shadow-2xs">0</span>
                                </div>
                                <span class="text-[9.5px] font-semibold text-text-muted/80 bg-[#F4EFE6] px-1.5 py-0.2 rounded-md">
                                    Chọn nhiều
                                </span>
                            </div>

                            <!-- Mini Search for 53 Ingredients -->
                            <div class="relative">
                                <i class="fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]"></i>
                                <input 
                                    type="text" 
                                    id="ingredient-quick-search" 
                                    placeholder="Tìm trong 53 nguyên liệu..." 
                                    class="w-full pl-7 pr-6 py-1 bg-[#FBF9F4] border border-gray-200/90 rounded-lg text-[10px] font-medium text-text-main placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-primary transition-all"
                                >
                                <button type="button" id="btn-clear-ing-search" class="hidden absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px] cursor-pointer">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>

                            <div class="grid grid-cols-2 gap-1.5 max-h-[114px] overflow-y-auto pr-1 custom-filter-scroll" id="filter-ingredients-group">
                                <!-- Populated dynamically from Database (53 items) -->
                                <div class="col-span-2 py-4 text-center text-text-muted text-[11px] font-medium">
                                    <i class="fa-solid fa-spinner animate-spin mr-1"></i> Đang tải nguyên liệu...
                                </div>
                            </div>
                        </div>

                        <!-- Filter Reset Action Button -->
                        <div class="pt-2 border-t border-[#F0EBE0]">
                            <button 
                                type="button" 
                                id="btn-reset-all-filters"
                                class="w-full py-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 border border-gray-100 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                                <i class="fa-solid fa-rotate-left text-[11px]"></i>
                                <span>Đặt lại bộ lọc</span>
                            </button>
                        </div>

                    </section>

                    <!-- BLOCK 2: ✨ RANDOM WIDGET (LUÔN TỒN TẠI DƯỚI BỘ LỌC) -->
                    <section class="random-widget bg-gradient-to-br from-[#1F5B43] via-[#1B4633] to-[#123C28] text-white rounded-[20px] p-3.5 sm:p-4 shadow-sm relative overflow-hidden group">
                        <div class="absolute top-0 right-0 translate-x-3 -translate-y-3 w-16 h-16 bg-accent/20 rounded-full blur-xl pointer-events-none"></div>
                        <div class="relative z-10 space-y-1.5">
                            <div class="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[9px] font-bold text-accent-light">
                                <i class="fa-solid fa-wand-magic-sparkles text-[9px]"></i>
                                <span>Chưa biết ăn gì?</span>
                            </div>
                            <h3 class="text-xs sm:text-sm font-extrabold leading-tight">
                                Random món ngay hôm nay
                            </h3>
                            <p class="text-white/80 text-[11px] font-normal leading-snug">
                                Chọn nhanh thực đơn ngon miệng trong 3 giây.
                            </p>
                            <div class="pt-1">
                                <a 
                                    href="#/" 
                                    class="inline-flex items-center gap-1.5 bg-[#E9A33A] hover:bg-[#D89229] active:bg-[#C78118] text-white font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-xs hover:scale-[1.02] transition-all cursor-pointer"
                                >
                                    <i class="fa-solid fa-dice text-xs"></i>
                                    <span>Random ngay</span>
                                    <i class="fa-solid fa-arrow-right text-[9px]"></i>
                                </a>
                            </div>
                        </div>
                    </section>

                </aside>


                <!-- ---------------------------------------------------- -->
                <!-- RIGHT COLUMN: RECIPE CONTENT (TOOLBAR + GRID)        -->
                <!-- ---------------------------------------------------- -->
                <section class="recipe-content min-w-0 flex-1 space-y-5" id="recipe-list-section">
                    
                    <!-- STICKY HORIZONTAL FILTER BAR FOR MOBILE (< lg) - SHOPEEFOOD STYLE -->
                    <div id="mobile-sticky-filter-bar" class="lg:hidden sticky top-14 sm:top-[68px] z-30 bg-white/95 backdrop-blur-md border border-[#E5DEC9] rounded-2xl shadow-xs p-2 mb-2">
                        <div class="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none snap-x py-0.5" id="mobile-filter-pills-row">
                            <!-- Reset Pill (hiển thị khi có bộ lọc hoạt động) -->
                            <button type="button" id="mobile-pill-reset" class="hidden shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 shadow-2xs active:scale-95 transition-all cursor-pointer">
                                <i class="fa-solid fa-rotate-left text-[10px]"></i>
                                <span>Đặt lại</span>
                            </button>

                            <!-- Pill 1: Loại món -->
                            <button type="button" id="mobile-pill-category" class="mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer" data-target="category">
                                <i class="fa-solid fa-bowl-food text-emerald-600 text-[11px]"></i>
                                <span id="mobile-pill-category-label">Loại món</span>
                                <i class="fa-solid fa-chevron-down text-[9px] text-gray-400"></i>
                            </button>

                            <!-- Pill 2: Thời gian nấu -->
                            <button type="button" id="mobile-pill-time" class="mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer" data-target="time">
                                <i class="fa-regular fa-clock text-amber-500 text-[11px]"></i>
                                <span id="mobile-pill-time-label">Thời gian</span>
                                <i class="fa-solid fa-chevron-down text-[9px] text-gray-400"></i>
                            </button>

                            <!-- Pill 3: Nguyên liệu -->
                            <button type="button" id="mobile-pill-ingredient" class="mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer" data-target="ingredient">
                                <i class="fa-solid fa-carrot text-orange-500 text-[11px]"></i>
                                <span id="mobile-pill-ingredient-label">Nguyên liệu</span>
                                <i class="fa-solid fa-chevron-down text-[9px] text-gray-400"></i>
                            </button>

                            <!-- Pill 4: Sắp xếp -->
                            <button type="button" id="mobile-pill-sort" class="mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer" data-target="sort">
                                <i class="fa-solid fa-arrow-down-wide-short text-primary text-[11px]"></i>
                                <span id="mobile-pill-sort-label">Sắp xếp</span>
                                <i class="fa-solid fa-chevron-down text-[9px] text-gray-400"></i>
                            </button>
                        </div>
                    </div>

                    <!-- RECIPE TOOLBAR: Count + Sort Dropdown + View Toggle (Sticky on Mobile) -->
                    <div class="recipe-toolbar sticky top-[102px] sm:top-[120px] lg:static z-20 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-[20px] border border-beige-border/80 p-2.5 sm:p-4 shadow-xs sm:shadow-sm flex items-center justify-between gap-2 sm:gap-3.5 mb-2">
                        
                        <!-- Left: Dish Count Badge & Active Filters Info -->
                        <div class="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                            <div class="flex items-center gap-1.5 sm:gap-2">
                                <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-primary-subtle text-primary flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">
                                    <i class="fa-solid fa-bowl-food"></i>
                                </span>
                                <span id="recipe-total-count" class="font-extrabold text-xs sm:text-sm text-text-main inline-flex items-center truncate">
                                    <span class="inline-block h-4 w-20 sm:w-28 rounded-md skeleton-shimmer"></span>
                                </span>
                            </div>
                            <span id="active-filter-indicator" class="hidden text-[10px] sm:text-[11px] font-semibold text-accent bg-accent/10 border border-accent/20 px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                                Đang lọc
                            </span>
                        </div>

                        <!-- Right: Sort Dropdown & View Mode Switcher -->
                        <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                            
                            <!-- Sort Dropdown -->
                            <div class="relative" id="sort-dropdown-wrapper">
                                <button 
                                    type="button" 
                                    id="btn-sort-toggle" 
                                    class="inline-flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#FCFAF6] hover:bg-white border border-[#DFD5BE] rounded-xl text-xs font-bold text-text-main shadow-2xs transition-all cursor-pointer"
                                    aria-haspopup="listbox"
                                    aria-expanded="false"
                                >
                                    <span class="flex items-center gap-1 sm:gap-1.5">
                                        <i class="fa-solid fa-arrow-down-wide-short text-primary text-[10px] sm:text-[11px]"></i>
                                        <span class="text-text-muted font-normal hidden min-[400px]:inline">Sắp xếp:</span>
                                        <span id="current-sort-label" class="truncate max-w-[80px] min-[480px]:max-w-none">Mới nhất</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-down text-[9px] text-gray-400"></i>
                                </button>

                                <!-- Dropdown Menu List -->
                                <div id="sort-dropdown-menu" class="hidden absolute top-full right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-beige-border p-1.5 z-40">
                                    ${sortOptions.map(opt => `
                                        <button 
                                            type="button" 
                                            class="btn-sort-option w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-text-main hover:bg-primary-subtle hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
                                            data-sort="${opt.value}"
                                            data-label="${opt.label}"
                                        >
                                            <i class="fa-solid ${opt.icon} text-[11px] text-primary w-4"></i>
                                            <span>${opt.label}</span>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- View Mode Switcher (Grid / List) -->
                            <div class="inline-flex items-center bg-[#FCFAF6] border border-[#DFD5BE] p-0.5 rounded-xl shadow-2xs shrink-0">
                                <button 
                                    type="button" 
                                    id="btn-view-grid" 
                                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold bg-primary text-white shadow-2xs transition-all cursor-pointer"
                                    title="Chế độ Lưới (Grid View)"
                                >
                                    <i class="fa-solid fa-grip"></i>
                                </button>
                                <button 
                                    type="button" 
                                    id="btn-view-list" 
                                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer"
                                    title="Chế độ Danh sách (List View)"
                                >
                                    <i class="fa-solid fa-list"></i>
                                </button>
                            </div>

                        </div>

                    </div>

                    <!-- RECIPE GRID: Strictly 3 cards/row on desktop -->
                    <div id="recipe-grid" class="recipe-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        ${renderFoodCardSkeleton(6)}
                    </div>

                    <!-- LOADING SENTINEL: Detected by IntersectionObserver -->
                    <div id="loading-sentinel" class="w-full py-2"></div>

                    <!-- LOADING STATE / SHIMMER SKELETON / END BADGE -->
                    <div id="loading-state" class="py-4 flex flex-col items-center justify-center w-full">
                        <!-- Shimmer skeletons or end of feed badge -->
                    </div>

                </section>

            </main>


            <!-- ======================================================== -->
            <!-- 3. MOBILE BOTTOM SHEET FILTER MODAL (ShopeeFood Style)   -->
            <!-- ======================================================== -->
            <div id="mobile-bottom-sheet-modal" class="fixed inset-0 z-[70] hidden select-none">
                <!-- Backdrop -->
                <div id="mobile-bottom-sheet-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"></div>

                <!-- Bottom Sheet Container -->
                <div id="mobile-bottom-sheet-panel" class="fixed inset-x-0 bottom-0 z-10 bg-white rounded-t-[26px] shadow-2xl border-t border-beige-border transform translate-y-full transition-transform duration-300 ease-out max-h-[82vh] flex flex-col overflow-hidden">
                    <!-- Top Handlebar & Header -->
                    <div class="pt-3 pb-2.5 px-4 border-b border-gray-100 flex flex-col items-center relative shrink-0 bg-white">
                        <div class="w-10 h-1 rounded-full bg-gray-300 mb-2"></div>
                        <div class="w-full flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span id="bottom-sheet-icon" class="w-6 h-6 rounded-lg bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">
                                    <i class="fa-solid fa-sliders"></i>
                                </span>
                                <div>
                                    <h3 id="bottom-sheet-title" class="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-text-main">
                                        Bộ lọc
                                    </h3>
                                    <p id="bottom-sheet-subtitle" class="text-[10px] text-text-muted font-medium">Chọn tiêu chí phù hợp</p>
                                </div>
                            </div>
                            <button type="button" id="btn-close-bottom-sheet" class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black flex items-center justify-center text-xs cursor-pointer transition">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Dynamic Body Content -->
                    <div id="bottom-sheet-body" class="p-4 overflow-y-auto max-h-[50vh] space-y-3 custom-filter-scroll">
                        <!-- Populated dynamically when user clicks a pill -->
                    </div>

                    <!-- Bottom Action Buttons -->
                    <div class="p-3 border-t border-gray-100 bg-gray-50 flex items-center gap-2.5 shrink-0" style="padding-bottom: max(0.75rem, env(safe-area-inset-bottom, 12px));">
                        <button type="button" id="btn-bottom-sheet-reset" class="w-1/3 py-2.5 bg-white border border-[#E5DEC9] text-text-muted hover:text-rose-600 font-bold text-xs rounded-xl shadow-2xs active:scale-95 transition cursor-pointer">
                            Đặt lại
                        </button>
                        <button type="button" id="btn-bottom-sheet-apply" class="flex-1 py-2.5 bg-[#145A43] hover:bg-[#0F4937] active:bg-[#0A3326] text-white font-bold text-xs rounded-xl shadow-sm active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer">
                            <i class="fa-solid fa-check text-xs"></i>
                            <span id="btn-bottom-sheet-apply-text">Áp dụng</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- FLOATING TOAST CONTAINER -->
            <div id="foodlist-toast-container" class="fixed top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9999] flex flex-col gap-2 items-center sm:items-end pointer-events-none"></div>

        </div>
        `;
    },

    afterRender: async (params) => {
        // ====================================================================
        // STATE MANAGEMENT (True Infinite Scroll / Lazy Loading)
        // ====================================================================
        let masterDishes = [...initialDishes];
        let currentFilteredDishes = [];
        let totalDishesCount = 0;
        let currentPage = 1;
        let isLoading = false;
        let hasMore = true;
        let viewMode = 'grid';
        let currentSort = 'newest';
        let currentSelectedCategories = [];
        let currentQuickCategory = '';
        let currentCookTime = 'all';
        let currentSelectedIngredients = [];
        let currentSearchQuery = '';
        let infiniteScrollObserver = null;
        let searchDebounceTimer = null;
        let latestRequestId = 0;

        const mapApiDish = (item) => ({
            id: item.id || item.id_food || item.id_monan,
            name: item.name || item.ten_mon || 'Món ngon',
            image: item.image || item.hinh_anh || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700',
            time: item.time || (item.thoi_gian ? `${item.thoi_gian} phút` : '25 phút'),
            cooking_time_minutes: parseInt(item.cooking_time_minutes || item.thoi_gian || 25, 10),
            rating: item.rating || 4.8,
            rating_count: item.rating_count || '1.5k',
            likes: typeof item.likes !== 'undefined' ? item.likes : 0,
            is_favorite: Boolean(item.is_favorite ?? item.isFavorite),
            category: item.category || item.loai_mon || 'Món mặn',
            category_slug: item.category_slug || '',
            sub_category: item.sub_category || 'viet',
            difficulty: item.difficulty || 'Dễ làm',
            description: item.description || item.mo_ta || 'Món ăn thơm ngon đậm đà cho bữa cơm gia đình.',
            ingredients: item.ingredients || ['Rau củ', 'Gia vị'],
            tags: item.tags || ['Món ngon', 'Món Việt'],
            author: item.author || { name: 'Bếp Nhà', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' }
        });

        const buildQueryParams = (page = 1, limit = BATCH_SIZE) => {
            const queryParams = new URLSearchParams();
            queryParams.set('page', String(page));
            queryParams.set('limit', String(limit));

            if (currentSearchQuery && currentSearchQuery.trim()) {
                queryParams.set('search', currentSearchQuery.trim());
            }

            if (currentSelectedCategories.length > 0) {
                queryParams.set('category', currentSelectedCategories.join(','));
            }

            if (currentQuickCategory && currentQuickCategory !== 'all') {
                queryParams.set('sub_category', currentQuickCategory);
            }

            if (currentCookTime && currentCookTime !== 'all') {
                queryParams.set('cook_time', currentCookTime);
            }

            if (currentSelectedIngredients && currentSelectedIngredients.length > 0) {
                queryParams.set('ingredients', currentSelectedIngredients.join(','));
            }

            if (currentSort && currentSort !== 'newest') {
                queryParams.set('sort', currentSort);
            }

            return queryParams;
        };

        // DOM Elements
        const heroSearchForm = document.getElementById('hero-search-form');
        const heroSearchInput = document.getElementById('hero-search-input');
        const btnClearSearch = document.getElementById('btn-clear-search');
        const recipeGrid = document.getElementById('recipe-grid');
        const loadingSentinel = document.getElementById('loading-sentinel');
        const loadingState = document.getElementById('loading-state');
        const recipeTotalCountEl = document.getElementById('recipe-total-count');
        const mobileResultCountEl = document.getElementById('mobile-result-count');
        const activeFilterIndicator = document.getElementById('active-filter-indicator');
        const btnViewGrid = document.getElementById('btn-view-grid');
        const btnViewList = document.getElementById('btn-view-list');
        const btnSortToggle = document.getElementById('btn-sort-toggle');
        const sortDropdownMenu = document.getElementById('sort-dropdown-menu');
        const currentSortLabel = document.getElementById('current-sort-label');
        const btnResetAllFilters = document.getElementById('btn-reset-all-filters');
        const btnResetFiltersSidebar = document.getElementById('btn-reset-filters-sidebar');
        
        // Mobile Sticky Filter & Bottom Sheet Elements
        const mobileStickyFilterBar = document.getElementById('mobile-sticky-filter-bar');
        const mobilePillReset = document.getElementById('mobile-pill-reset');
        const mobilePillCategory = document.getElementById('mobile-pill-category');
        const mobilePillCategoryLabel = document.getElementById('mobile-pill-category-label');
        const mobilePillTime = document.getElementById('mobile-pill-time');
        const mobilePillTimeLabel = document.getElementById('mobile-pill-time-label');
        const mobilePillIngredient = document.getElementById('mobile-pill-ingredient');
        const mobilePillIngredientLabel = document.getElementById('mobile-pill-ingredient-label');
        const mobilePillSort = document.getElementById('mobile-pill-sort');
        const mobilePillSortLabel = document.getElementById('mobile-pill-sort-label');

        const mobileBottomSheetModal = document.getElementById('mobile-bottom-sheet-modal');
        const mobileBottomSheetBackdrop = document.getElementById('mobile-bottom-sheet-backdrop');
        const mobileBottomSheetPanel = document.getElementById('mobile-bottom-sheet-panel');
        const bottomSheetIcon = document.getElementById('bottom-sheet-icon');
        const bottomSheetTitle = document.getElementById('bottom-sheet-title');
        const bottomSheetSubtitle = document.getElementById('bottom-sheet-subtitle');
        const bottomSheetBody = document.getElementById('bottom-sheet-body');
        const btnCloseBottomSheet = document.getElementById('btn-close-bottom-sheet');
        const btnBottomSheetReset = document.getElementById('btn-bottom-sheet-reset');
        const btnBottomSheetApply = document.getElementById('btn-bottom-sheet-apply');
        const btnBottomSheetApplyText = document.getElementById('btn-bottom-sheet-apply-text');

        // Toast Notification Helper
        const showToast = (message, type = 'success') => {
            const container = document.getElementById('foodlist-toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `pointer-events-auto transform -translate-y-2 opacity-0 transition-all duration-300 flex items-center gap-2.5 px-4.5 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-bold ${
                type === 'success' 
                    ? 'bg-primary text-white border-primary-light/40 shadow-primary/20' 
                    : type === 'info'
                    ? 'bg-[#26382F] text-white border-beige-border shadow-black/10'
                    : 'bg-red-600 text-white border-red-500 shadow-red-600/20'
            }`;

            const icon = type === 'success' 
                ? '<i class="fa-solid fa-circle-check text-accent-light text-base"></i>' 
                : type === 'info'
                ? '<i class="fa-solid fa-circle-info text-accent text-base"></i>'
                : '<i class="fa-solid fa-circle-exclamation text-yellow-300 text-base"></i>';

            toast.innerHTML = `${icon}<span>${message}</span>`;
            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.classList.remove('-translate-y-2', 'opacity-0');
                toast.classList.add('translate-y-0', 'opacity-100');
            });

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('-translate-y-2', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 2500);
        };

        // ====================================================================
        // CREATE RECIPE CARD ELEMENT
        // ====================================================================
        const createRecipeCardElement = (dish) => {
            const isFav = !!dish.is_favorite || (typeof window !== 'undefined' && window.isDishFavorite && window.isDishFavorite(dish.id));
            const link = `#/mon-an/${dish.id}`;
            const article = document.createElement('article');

            if (viewMode === 'list') {
                article.className = "bg-white rounded-[20px] border border-beige-border/80 p-3.5 sm:p-4.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-4 group col-span-full cursor-pointer";
                article.id = `dish-card-${dish.id}`;
                article.setAttribute('data-dish-id', dish.id);
                article.setAttribute('data-link', link);
                article.innerHTML = `
                    <div class="relative w-full sm:w-56 aspect-[16/10] sm:aspect-square rounded-2xl overflow-hidden bg-cream-soft shrink-0">
                        <img 
                            src="${dish.image}" 
                            alt="${dish.name}" 
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            loading="lazy" 
                            decoding="async"
                            onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'"
                        />
                        <div class="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-sm">
                            <i class="fa-regular fa-clock text-accent-light text-[10px]"></i>
                            <span>${dish.time}</span>
                        </div>
                        <button 
                            type="button" 
                            class="btn-favorite-dish absolute top-2.5 right-2.5 w-8 h-8 rounded-full ${isFav ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-500 hover:text-rose-500'} backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-all cursor-pointer z-10" 
                            data-id="${dish.id}" 
                            aria-label="Thêm vào yêu thích"
                        >
                            <i class="${isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} text-sm"></i>
                        </button>
                    </div>

                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex items-start justify-between gap-3 mb-1.5">
                                <div>
                                    <span class="inline-block bg-primary-subtle text-primary font-bold text-[10px] px-2 py-0.5 rounded-md mb-1">${dish.category}</span>
                                    <h3 class="font-extrabold text-base sm:text-lg text-text-main group-hover:text-primary transition-colors leading-snug">
                                        <a href="${link}">${dish.name}</a>
                                    </h3>
                                </div>
                                <div class="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg shrink-0" title="${dish.likes} lượt yêu thích">
                                    <i class="fa-solid fa-heart text-rose-500 text-[10px]"></i>
                                    <span class="card-likes-count" data-food-id="${dish.id}">${dish.likes >= 1000 ? (dish.likes / 1000).toFixed(1).replace('.0', '') + 'k' : dish.likes}</span>
                                </div>
                            </div>
                            <p class="text-xs sm:text-sm text-text-muted line-clamp-2 mb-3 leading-relaxed">
                                ${dish.description}
                            </p>
                            <div class="flex flex-wrap items-center gap-1.5 mb-3">
                                ${dish.tags.slice(0, 3).map(tag => `
                                    <span class="bg-[#F8F5EC] border border-[#EBE3D3] text-text-muted text-[10px] font-semibold px-2 py-0.5 rounded-md">${tag}</span>
                                `).join('')}
                            </div>
                        </div>

                        <div class="pt-3 border-t border-[#F0EBE0] flex items-center justify-between">
                            <div class="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                                <i class="fa-solid fa-kitchen-set text-primary text-[11px]"></i>
                                <span>${dish.difficulty}</span>
                            </div>
                            <a 
                                href="${link}" 
                                class="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                            >
                                <span>Xem công thức</span>
                                <i class="fa-solid fa-arrow-right text-[10px]"></i>
                            </a>
                        </div>
                    </div>
                `;
                return article;
            }

            // Grid View Card (3 cards per row on desktop, uniform height)
            article.className = "bg-white rounded-[20px] border border-beige-border/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer";
            article.id = `dish-card-${dish.id}`;
            article.setAttribute('data-dish-id', dish.id);
            article.setAttribute('data-link', link);
            article.innerHTML = `
                <div class="relative aspect-[16/10] overflow-hidden bg-cream-soft shrink-0">
                    <img 
                        src="${dish.image}" 
                        alt="${dish.name}" 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                        loading="lazy" 
                        decoding="async"
                        onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div class="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm z-10">
                        <i class="fa-regular fa-clock text-accent-light text-[10px]"></i>
                        <span>${dish.time}</span>
                    </div>

                    <button 
                        type="button" 
                        class="btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full ${isFav ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-500 hover:text-rose-500'} backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-all cursor-pointer z-20" 
                        data-id="${dish.id}" 
                        aria-label="Thêm vào yêu thích"
                    >
                        <i class="${isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} text-sm"></i>
                    </button>
                </div>

                <div class="p-4 sm:p-4.5 flex flex-col flex-1">
                    <div class="flex items-start justify-between gap-2 mb-1.5">
                        <h3 class="font-extrabold text-sm sm:text-base text-text-main line-clamp-2 leading-snug group-hover:text-primary transition-colors flex-1">
                            <a href="${link}">${dish.name}</a>
                        </h3>
                        <div class="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md shrink-0 mt-0.5" title="${dish.likes} lượt yêu thích">
                            <i class="fa-solid fa-heart text-rose-500 text-[10px]"></i>
                            <span class="card-likes-count" data-food-id="${dish.id}">${dish.likes >= 1000 ? (dish.likes / 1000).toFixed(1).replace('.0', '') + 'k' : dish.likes}</span>
                        </div>
                    </div>

                    <p class="text-xs text-text-muted line-clamp-2 mb-3 leading-relaxed font-normal">
                        ${dish.description}
                    </p>

                    <div class="flex flex-wrap items-center gap-1.5 mb-3.5 mt-auto">
                        <span class="bg-primary-subtle border border-primary-light/30 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md">${dish.category}</span>
                        <span class="bg-[#F8F5EC] border border-[#EBE3D3] text-text-muted text-[10px] font-semibold px-2 py-0.5 rounded-md">${dish.difficulty}</span>
                    </div>

                    <div class="pt-3 border-t border-[#F0EBE0] mt-auto">
                        <a 
                            href="${link}" 
                            class="w-full py-2 bg-primary/8 hover:bg-primary text-primary hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:shadow-sm"
                        >
                            <span>Xem công thức</span>
                            <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                        </a>
                    </div>
                </div>
            `;
            return article;
        };

        // Render Shimmer Skeleton Cards HTML
        const createSkeletonCardsHTML = (count = 3) => {
            let html = '';
            for (let i = 0; i < count; i++) {
                html += `
                    <div class="bg-white rounded-[20px] border border-beige-border/80 p-4 shadow-sm animate-pulse space-y-3">
                        <div class="w-full aspect-[16/10] bg-[#ECE5D8] rounded-xl"></div>
                        <div class="space-y-1.5">
                            <div class="w-3/4 h-4 bg-[#ECE5D8] rounded-md"></div>
                            <div class="w-1/2 h-3 bg-[#ECE5D8] rounded-md"></div>
                        </div>
                        <div class="w-full h-3 bg-[#ECE5D8] rounded-md"></div>
                        <div class="flex gap-2 pt-2 border-t border-[#F0EBE0]">
                            <div class="w-16 h-5 bg-[#ECE5D8] rounded-md"></div>
                            <div class="w-16 h-5 bg-[#ECE5D8] rounded-md"></div>
                        </div>
                    </div>
                `;
            }
            return html;
        };

        // Update Toolbar & Mobile Badges
        const updateToolbarCounts = () => {
            const total = totalDishesCount;
            if (recipeTotalCountEl) {
                recipeTotalCountEl.textContent = `${total} món ăn phù hợp`;
            }
            if (mobileResultCountEl) {
                mobileResultCountEl.textContent = `${total} món ăn`;
            }

            const hasActiveFilters = currentSelectedCategories.length > 0 || 
                                     Boolean(currentQuickCategory) || 
                                     (currentCookTime && currentCookTime !== 'all') || 
                                     currentSelectedIngredients.length > 0 || 
                                     currentSearchQuery.trim() !== '';

            if (activeFilterIndicator) {
                activeFilterIndicator.classList.toggle('hidden', !hasActiveFilters);
            }

            let filterCount = 0;
            filterCount += currentSelectedCategories.length;
            if (currentQuickCategory) filterCount++;
            if (currentCookTime && currentCookTime !== 'all') filterCount++;
            filterCount += currentSelectedIngredients.length;
            updateMobileFilterPills();
        };

        // Update Mobile Sticky Filter Pills & Badges
        const updateMobileFilterPills = () => {
            const hasCat = currentSelectedCategories.length > 0;
            const hasTime = currentCookTime && currentCookTime !== 'all';
            const hasIng = currentSelectedIngredients.length > 0;
            const hasSort = currentSort && currentSort !== 'newest';
            const hasSearch = currentSearchQuery.trim() !== '';

            // Pill Reset
            const hasAnyActive = hasCat || hasTime || hasIng || hasSort || hasSearch || Boolean(currentQuickCategory);
            if (mobilePillReset) {
                mobilePillReset.classList.toggle('hidden', !hasAnyActive);
            }

            // Pill Category
            if (mobilePillCategory && mobilePillCategoryLabel) {
                if (hasCat) {
                    mobilePillCategoryLabel.textContent = `Loại món (${currentSelectedCategories.length})`;
                    mobilePillCategory.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-primary bg-primary-subtle text-primary shadow-2xs active:scale-95 transition-all cursor-pointer";
                } else {
                    mobilePillCategoryLabel.textContent = "Loại món";
                    mobilePillCategory.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer";
                }
            }

            // Pill Time
            if (mobilePillTime && mobilePillTimeLabel) {
                if (hasTime) {
                    const timeLabels = {
                        under_15: '< 15p',
                        '15_to_30': '15 - 30p',
                        above_30: '> 30p'
                    };
                    mobilePillTimeLabel.textContent = timeLabels[currentCookTime] || 'Thời gian';
                    mobilePillTime.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-primary bg-primary-subtle text-primary shadow-2xs active:scale-95 transition-all cursor-pointer";
                } else {
                    mobilePillTimeLabel.textContent = "Thời gian";
                    mobilePillTime.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer";
                }
            }

            // Pill Ingredient
            if (mobilePillIngredient && mobilePillIngredientLabel) {
                if (hasIng) {
                    mobilePillIngredientLabel.textContent = `Nguyên liệu (${currentSelectedIngredients.length})`;
                    mobilePillIngredient.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-primary bg-primary-subtle text-primary shadow-2xs active:scale-95 transition-all cursor-pointer";
                } else {
                    mobilePillIngredientLabel.textContent = "Nguyên liệu";
                    mobilePillIngredient.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer";
                }
            }

            // Pill Sort
            if (mobilePillSort && mobilePillSortLabel) {
                if (hasSort) {
                    const match = sortOptions.find(o => o.value === currentSort);
                    mobilePillSortLabel.textContent = match ? match.label : 'Sắp xếp';
                    mobilePillSort.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-primary bg-primary-subtle text-primary shadow-2xs active:scale-95 transition-all cursor-pointer";
                } else {
                    mobilePillSortLabel.textContent = "Sắp xếp";
                    mobilePillSort.className = "mobile-filter-trigger shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#E5DEC9] bg-white text-text-main shadow-2xs active:scale-95 transition-all cursor-pointer";
                }
            }
        };

        // Update Loading State (Shimmer / End of Feed indicator)
        const updateLoadingStateUI = () => {
            if (!loadingState) return;

            const total = totalDishesCount;
            if (total === 0) {
                loadingState.innerHTML = '';
                return;
            }

            if (!hasMore || currentFilteredDishes.length >= total) {
                loadingState.innerHTML = `
                    <div class="text-center py-6 text-text-muted text-xs font-medium w-full">
                        <div class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-beige-border px-5 py-2.5 rounded-full shadow-sm text-text-muted">
                            <span class="text-accent">🎉</span>
                            <span>Bạn đã khám phá hết các món ăn (${currentFilteredDishes.length}/${total} món)</span>
                        </div>
                    </div>
                `;
            } else {
                loadingState.innerHTML = `
                    <div class="text-center py-4 text-text-muted text-xs font-medium">
                        <span class="inline-flex items-center gap-2 text-text-muted opacity-80">
                            <i class="fa-solid fa-angles-down animate-bounce text-xs text-primary"></i>
                            <span>Cuộn xuống để tải thêm món ngon (Đã xem ${currentFilteredDishes.length}/${total})</span>
                        </span>
                    </div>
                `;
            }
        };

        // ====================================================================
        // INFINITE SCROLL & LAZY RENDERING ENGINE (Server-side Paginated)
        // Strictly appends to #recipe-grid without touching sidebar
        // ====================================================================
        const loadMoreRecipes = async () => {
            if (isLoading || !hasMore) return;
            isLoading = true;

            // Show skeleton cards in #loading-state
            if (loadingState) {
                loadingState.innerHTML = `
                    <div class="w-full space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            ${createSkeletonCardsHTML(3)}
                        </div>
                        <div class="flex items-center justify-center gap-2 text-xs font-bold text-primary py-2">
                            <i class="fa-solid fa-spinner animate-spin text-sm text-accent"></i>
                            <span>Đang tải thêm món ngon...</span>
                        </div>
                    </div>
                `;
            }

            try {
                currentPage++;
                const queryParams = buildQueryParams(currentPage, BATCH_SIZE);
                const endpoint = `/foods?${queryParams.toString()}`;
                const apiRes = await fetchAPI(endpoint);

                if (apiRes && apiRes.success && Array.isArray(apiRes.data) && apiRes.data.length > 0) {
                    const nextBatch = apiRes.data.map(mapApiDish);
                    currentFilteredDishes = [...currentFilteredDishes, ...nextBatch];

                    if (recipeGrid && nextBatch.length > 0) {
                        const fragment = document.createDocumentFragment();
                        nextBatch.forEach(dish => {
                            fragment.appendChild(createRecipeCardElement(dish));
                        });
                        recipeGrid.appendChild(fragment);
                    }

                    if (apiRes.data.length < BATCH_SIZE || currentFilteredDishes.length >= (apiRes.total || totalDishesCount)) {
                        hasMore = false;
                        if (infiniteScrollObserver) infiniteScrollObserver.disconnect();
                    }
                } else {
                    hasMore = false;
                    if (infiniteScrollObserver) infiniteScrollObserver.disconnect();
                }
            } catch (err) {
                console.warn('Lỗi khi tải thêm món ăn:', err);
                hasMore = false;
            } finally {
                isLoading = false;
                updateToolbarCounts();
                updateLoadingStateUI();
            }
        };

        // Setup Intersection Observer on #loading-sentinel
        const setupInfiniteScroll = () => {
            if (infiniteScrollObserver) {
                infiniteScrollObserver.disconnect();
            }

            if (!loadingSentinel || !hasMore) return;

            infiniteScrollObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    if (!isLoading && hasMore) {
                        loadMoreRecipes();
                    }
                }
            }, {
                root: null,
                rootMargin: '350px 0px',
                threshold: 0
            });

            infiniteScrollObserver.observe(loadingSentinel);
        };

        // Render First Batch on Filter / Search Change
        const renderFirstBatch = () => {
            if (!recipeGrid) return;

            // Clear recipe-grid
            recipeGrid.innerHTML = '';

            // Handle Empty State
            if (currentFilteredDishes.length === 0) {
                hasMore = false;
                recipeGrid.className = "w-full col-span-full";
                recipeGrid.innerHTML = `
                    <div class="bg-white rounded-[24px] border border-beige-border/80 p-8 sm:p-12 text-center shadow-sm max-w-lg mx-auto space-y-4">
                        <div class="w-20 h-20 rounded-full bg-cream-soft flex items-center justify-center text-3xl mx-auto text-primary border border-[#E9DFC9]">
                            <i class="fa-solid fa-bowl-rice"></i>
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-base sm:text-lg font-extrabold text-text-main">Chưa tìm thấy món phù hợp</h3>
                            <p class="text-xs sm:text-sm text-text-muted font-medium">Thử thay đổi từ khóa hoặc bộ lọc nhé!</p>
                        </div>
                        <button 
                            type="button" 
                            id="btn-empty-reset" 
                            class="inline-flex items-center gap-2 bg-primary hover:bg-[#1B4633] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                        >
                            <i class="fa-solid fa-rotate-right text-xs"></i>
                            <span>Xóa bộ lọc</span>
                        </button>
                    </div>
                `;

                const btnEmptyReset = document.getElementById('btn-empty-reset');
                if (btnEmptyReset) {
                    btnEmptyReset.addEventListener('click', resetAllFilters);
                }

                if (loadingState) loadingState.innerHTML = '';
                updateToolbarCounts();
                return;
            }

            // Restore layout class
            if (viewMode === 'grid') {
                recipeGrid.className = "recipe-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6";
            } else {
                recipeGrid.className = "recipe-grid flex flex-col gap-4";
            }

            // Render first batch cards using DocumentFragment
            const fragment = document.createDocumentFragment();
            currentFilteredDishes.forEach(dish => {
                fragment.appendChild(createRecipeCardElement(dish));
            });
            recipeGrid.appendChild(fragment);

            updateToolbarCounts();
            updateLoadingStateUI();
            setupInfiniteScroll();
        };

        // ====================================================================
        // FILTER & SORT LOGIC
        // ====================================================================
        const runClientFilter = () => {
            let result = [...masterDishes];

            if (currentSearchQuery.trim() !== '') {
                const q = currentSearchQuery.toLowerCase().trim();
                result = result.filter(d => 
                    d.name.toLowerCase().includes(q) ||
                    d.description.toLowerCase().includes(q) ||
                    d.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
                    d.tags.some(t => t.toLowerCase().includes(q))
                );
            }

            if (currentQuickCategory === 'nhanh') {
                result = result.filter(d => d.cooking_time_minutes > 0 && d.cooking_time_minutes <= 15);
            } else if (currentQuickCategory && currentQuickCategory !== 'all') {
                result = result.filter(d => d.sub_category === currentQuickCategory);
            }

            if (currentSelectedCategories.length > 0) {
                const targetCats = currentSelectedCategories.map(c => c.toLowerCase());
                result = result.filter(d => 
                    targetCats.includes(d.category.toLowerCase()) || 
                    (d.category_slug && targetCats.includes(d.category_slug.toLowerCase()))
                );
            }

            if (currentCookTime === 'under_15') {
                result = result.filter(d => d.cooking_time_minutes <= 15);
            } else if (currentCookTime === '15_to_30') {
                result = result.filter(d => d.cooking_time_minutes > 15 && d.cooking_time_minutes <= 30);
            } else if (currentCookTime === 'above_30') {
                result = result.filter(d => d.cooking_time_minutes > 30);
            }

            if (currentSelectedIngredients.length > 0) {
                result = result.filter(d => 
                    currentSelectedIngredients.some(selectedIng => 
                        d.ingredients.some(dishIng => dishIng.toLowerCase().includes(selectedIng.toLowerCase()))
                    )
                );
            }

            if (currentSort === 'newest') {
                result.sort((a, b) => b.id - a.id);
            } else if (currentSort === 'popular') {
                result.sort((a, b) => (parseFloat(b.rating_count) || 0) - (parseFloat(a.rating_count) || 0));
            } else if (currentSort === 'likes') {
                result.sort((a, b) => b.likes - a.likes);
            } else if (currentSort === 'rating') {
                result.sort((a, b) => b.rating - a.rating);
            } else if (currentSort === 'time_asc') {
                result.sort((a, b) => a.cooking_time_minutes - b.cooking_time_minutes);
            } else if (currentSort === 'time_desc') {
                result.sort((a, b) => b.cooking_time_minutes - a.cooking_time_minutes);
            } else if (currentSort === 'name_asc') {
                result.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
            }

            return result;
        };

        const executeFilterAndSort = async () => {
            const requestId = ++latestRequestId;
            currentPage = 1;
            hasMore = true;
            isLoading = true;

            // Hiển thị khung chờ Skeleton Facebook-style trong lúc gọi API lọc
            if (recipeGrid) {
                if (viewMode === 'grid') {
                    recipeGrid.className = "recipe-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6";
                } else {
                    recipeGrid.className = "recipe-grid flex flex-col gap-4";
                }
                recipeGrid.innerHTML = renderFoodCardSkeleton(6);
            }
            if (recipeTotalCountEl) {
                recipeTotalCountEl.innerHTML = '<span class="inline-block h-4 w-28 rounded-md skeleton-shimmer"></span>';
            }
            if (loadingState) loadingState.innerHTML = '';

            try {
                const queryParams = buildQueryParams(1, BATCH_SIZE);
                const endpoint = `/foods?${queryParams.toString()}`;
                const apiRes = await fetchAPI(endpoint);

                if (requestId !== latestRequestId) return;

                if (apiRes && apiRes.success && Array.isArray(apiRes.data)) {
                    totalDishesCount = typeof apiRes.total === 'number' ? apiRes.total : apiRes.data.length;
                    currentFilteredDishes = apiRes.data.map(mapApiDish);

                    if (currentFilteredDishes.length < BATCH_SIZE || currentFilteredDishes.length >= totalDishesCount) {
                        hasMore = false;
                    }
                } else {
                    const fallback = runClientFilter();
                    totalDishesCount = fallback.length;
                    currentFilteredDishes = fallback.slice(0, BATCH_SIZE);
                    if (currentFilteredDishes.length >= totalDishesCount) hasMore = false;
                }
            } catch (e) {
                if (requestId !== latestRequestId) return;
                const fallback = runClientFilter();
                totalDishesCount = fallback.length;
                currentFilteredDishes = fallback.slice(0, BATCH_SIZE);
                if (currentFilteredDishes.length >= totalDishesCount) hasMore = false;
            } finally {
                if (requestId === latestRequestId) {
                    isLoading = false;
                    renderFirstBatch();
                }
            }
        };

        let dbCategories = [];
        let dbIngredients = [];

        const renderCategoryChips = () => {
            const container = document.getElementById('filter-category-group');
            if (!container) return;
            if (!dbCategories || dbCategories.length === 0) {
                container.innerHTML = '<div class="col-span-2 py-4 text-center text-text-muted text-[11px] font-medium">Không có danh mục</div>';
                return;
            }
            container.innerHTML = dbCategories.map(cat => {
                const isChecked = currentSelectedCategories.includes(cat.name);
                const icon = getCategoryIcon(cat.name, cat.slug);
                return `
                    <label class="filter-chip-item group relative w-full h-[34px] px-2 py-1 rounded-xl border border-gray-200/90 bg-white text-text-muted text-[11px] font-semibold flex items-center justify-between hover:border-primary/40 hover:bg-cream-soft hover:text-text-main transition-all cursor-pointer select-none ${isChecked ? 'is-checked' : ''}" data-cat-name="${escapeHTML(cat.name)}">
                        <input type="checkbox" name="filter_category" value="${escapeHTML(cat.name)}" class="sr-only filter-category-checkbox" ${isChecked ? 'checked' : ''}>
                        <span class="flex items-center gap-1.5 min-w-0 pr-1">
                            <i class="fa-solid ${icon.icon} ${icon.color} text-[10px] w-3.5 text-center shrink-0"></i>
                            <span class="truncate text-[11px]" title="${escapeHTML(cat.name)}">${escapeHTML(cat.name)}</span>
                        </span>
                        <span class="check-icon w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-primary">
                            <i class="fa-solid fa-check text-[9px]"></i>
                        </span>
                    </label>
                `;
            }).join('');
        };

        const renderIngredientChips = (keyword = '') => {
            const container = document.getElementById('filter-ingredients-group');
            if (!container) return;
            const q = (keyword || '').toLowerCase().trim();
            const filtered = q
                ? dbIngredients.filter(ing => ing.name.toLowerCase().includes(q))
                : dbIngredients;

            if (filtered.length === 0) {
                container.innerHTML = `<div class="col-span-2 py-4 text-center text-text-muted text-[11px] font-medium">Không tìm thấy "${escapeHTML(q)}"</div>`;
                return;
            }

            container.innerHTML = filtered.map(ing => {
                const isChecked = currentSelectedIngredients.includes(ing.name);
                const icon = getIngredientIcon(ing.name);
                return `
                    <label class="filter-chip-item group relative w-full h-[34px] px-2 py-1 rounded-xl border border-gray-200/90 bg-white text-text-muted text-[11px] font-semibold flex items-center justify-between hover:border-primary/40 hover:bg-cream-soft hover:text-text-main transition-all cursor-pointer select-none ${isChecked ? 'is-checked' : ''}" data-ing-name="${escapeHTML(ing.name)}">
                        <input type="checkbox" name="filter_ingredient" value="${escapeHTML(ing.name)}" class="sr-only filter-ingredient-checkbox" ${isChecked ? 'checked' : ''}>
                        <span class="flex items-center gap-1.5 min-w-0 pr-1">
                            <i class="fa-solid ${icon.icon} ${icon.color} text-[10px] w-3.5 text-center shrink-0"></i>
                            <span class="truncate text-[11px]" title="${escapeHTML(ing.name)}">${escapeHTML(ing.name)}</span>
                        </span>
                        <span class="check-icon w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-primary">
                            <i class="fa-solid fa-check text-[9px]"></i>
                        </span>
                    </label>
                `;
            }).join('');
        };

        const updateIngredientCountBadge = () => {
            const countEl = document.getElementById('selected-ingredients-count');
            if (countEl) {
                if (currentSelectedIngredients.length > 0) {
                    countEl.textContent = currentSelectedIngredients.length;
                    countEl.classList.remove('hidden');
                } else {
                    countEl.classList.add('hidden');
                }
            }
        };

        const loadDbFilterOptions = async () => {
            try {
                const res = await fetchAPI('/foods/options');
                if (res && res.success && res.data) {
                    dbCategories = res.data.categories || [];
                    dbIngredients = res.data.ingredients || [];
                }
            } catch (err) {
                console.warn('Could not load filter options from DB:', err);
            }

            if (!dbCategories || dbCategories.length === 0) {
                dbCategories = [
                    { id: 1, name: 'Món mặn', slug: 'mon-man' },
                    { id: 2, name: 'Món canh', slug: 'mon-canh' },
                    { id: 3, name: 'Món rau', slug: 'mon-rau' },
                    { id: 4, name: 'Món xào', slug: 'mon-xao' },
                    { id: 5, name: 'Món chiên', slug: 'mon-chien' },
                    { id: 6, name: 'Món luộc', slug: 'mon-luoc' },
                    { id: 7, name: 'Món kho', slug: 'mon-kho' }
                ];
            }

            if (!dbIngredients || dbIngredients.length === 0) {
                dbIngredients = [
                    { id: 1, name: 'Thịt heo' },
                    { id: 2, name: 'Thịt gà' },
                    { id: 3, name: 'Thịt bò' },
                    { id: 4, name: 'Hải sản' },
                    { id: 5, name: 'Trứng gà' },
                    { id: 6, name: 'Đậu hũ' }
                ];
            }

            const ingSearchInput = document.getElementById('ingredient-quick-search');
            if (ingSearchInput) {
                ingSearchInput.placeholder = `Tìm trong ${dbIngredients.length} nguyên liệu...`;
            }

            renderCategoryChips();
            renderIngredientChips();
        };

        const resetAllFilters = () => {
            currentSelectedCategories = [];
            currentQuickCategory = '';
            currentCookTime = 'all';
            currentSelectedIngredients = [];
            currentSearchQuery = '';
            currentSort = 'newest';

            if (heroSearchInput) heroSearchInput.value = '';
            if (btnClearSearch) btnClearSearch.classList.add('hidden');

            document.querySelectorAll('.quick-cat-btn').forEach(btn => {
                btn.className = "quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs";
            });

            // Reset categories chips
            renderCategoryChips();

            // Reset time radios
            const allRadio = document.querySelector('input[name="cook_time"][value="all"]');
            if (allRadio) allRadio.checked = true;
            document.querySelectorAll('#filter-time-group .filter-chip-item').forEach(lbl => {
                const radio = lbl.querySelector('input[name="cook_time"]');
                lbl.classList.toggle('is-checked', radio && radio.value === 'all');
            });

            // Reset ingredient search and counter badge
            const ingSearch = document.getElementById('ingredient-quick-search');
            if (ingSearch) ingSearch.value = '';
            const btnClearIng = document.getElementById('btn-clear-ing-search');
            if (btnClearIng) btnClearIng.classList.add('hidden');
            updateIngredientCountBadge();

            // Re-render ingredient chips
            renderIngredientChips('');

            if (currentSortLabel) currentSortLabel.textContent = 'Mới nhất';

            executeFilterAndSort();
            updateMobileFilterPills();
            showToast('Đã đặt lại toàn bộ bộ lọc', 'info');
        };

        // ====================================================================
        // EVENT HANDLERS & LISTENERS
        // ====================================================================

        // 1. Search Input & Debounce
        if (heroSearchInput) {
            heroSearchInput.addEventListener('input', (e) => {
                const val = e.target.value;
                if (btnClearSearch) {
                    btnClearSearch.classList.toggle('hidden', val.length === 0);
                }

                clearTimeout(searchDebounceTimer);
                searchDebounceTimer = setTimeout(() => {
                    currentSearchQuery = val;
                    executeFilterAndSort();
                }, 300);
            });
        }

        if (btnClearSearch) {
            btnClearSearch.addEventListener('click', () => {
                if (heroSearchInput) {
                    heroSearchInput.value = '';
                    btnClearSearch.classList.add('hidden');
                    currentSearchQuery = '';
                    executeFilterAndSort();
                }
            });
        }

        if (heroSearchForm) {
            heroSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                currentSearchQuery = heroSearchInput?.value || '';
                executeFilterAndSort();
            });
        }

        const quickCatBtns = document.querySelectorAll('.quick-cat-btn');
        quickCatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-cat');
                if (currentQuickCategory === cat) {
                    currentQuickCategory = '';
                    btn.className = "quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs";
                } else {
                    currentQuickCategory = cat;
                    quickCatBtns.forEach(b => {
                        b.className = "quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs";
                    });
                    btn.className = "quick-cat-btn active-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs";
                }

                executeFilterAndSort();
            });
        });

        // 2. Dynamic Categories Filter Listener (Checkbox with hidden input + checkmark ✓)
        const filterCategoryGroup = document.getElementById('filter-category-group');
        if (filterCategoryGroup) {
            filterCategoryGroup.addEventListener('change', (e) => {
                const target = e.target.closest('.filter-category-checkbox');
                if (target) {
                    const label = target.closest('.filter-chip-item');
                    if (label) label.classList.toggle('is-checked', target.checked);
                    const val = target.value;
                    if (target.checked) {
                        if (!currentSelectedCategories.includes(val)) currentSelectedCategories.push(val);
                    } else {
                        currentSelectedCategories = currentSelectedCategories.filter(c => c !== val);
                    }
                    executeFilterAndSort();
                }
            });
        }

        // 3. Cook Time Filter Listener (Radio with hidden circle + checkmark ✓)
        const filterTimeGroup = document.getElementById('filter-time-group');
        if (filterTimeGroup) {
            filterTimeGroup.addEventListener('change', (e) => {
                const target = e.target.closest('input[name="cook_time"]');
                if (target) {
                    currentCookTime = target.value;
                    filterTimeGroup.querySelectorAll('.filter-chip-item').forEach(lbl => {
                        const radio = lbl.querySelector('input[name="cook_time"]');
                        lbl.classList.toggle('is-checked', radio && radio.checked);
                    });
                    executeFilterAndSort();
                }
            });
        }

        // 4. Dynamic Ingredients Filter Listener (53 items from DB, Checkbox with hidden input + checkmark ✓)
        const filterIngredientsGroup = document.getElementById('filter-ingredients-group');
        if (filterIngredientsGroup) {
            filterIngredientsGroup.addEventListener('change', (e) => {
                const target = e.target.closest('.filter-ingredient-checkbox');
                if (target) {
                    const label = target.closest('.filter-chip-item');
                    if (label) label.classList.toggle('is-checked', target.checked);
                    const val = target.value;
                    if (target.checked) {
                        if (!currentSelectedIngredients.includes(val)) currentSelectedIngredients.push(val);
                    } else {
                        currentSelectedIngredients = currentSelectedIngredients.filter(i => i !== val);
                    }
                    updateIngredientCountBadge();
                    executeFilterAndSort();
                }
            });
        }

        // 5. Ingredient Mini Quick Search
        const ingSearchInput = document.getElementById('ingredient-quick-search');
        const btnClearIngSearch = document.getElementById('btn-clear-ing-search');
        if (ingSearchInput) {
            ingSearchInput.addEventListener('input', (e) => {
                const val = e.target.value;
                if (btnClearIngSearch) {
                    btnClearIngSearch.classList.toggle('hidden', val.length === 0);
                }
                renderIngredientChips(val);
            });
        }
        if (btnClearIngSearch) {
            btnClearIngSearch.addEventListener('click', () => {
                if (ingSearchInput) {
                    ingSearchInput.value = '';
                    btnClearIngSearch.classList.add('hidden');
                    renderIngredientChips('');
                    ingSearchInput.focus();
                }
            });
        }

        // 6. Reset Filters Buttons
        if (btnResetAllFilters) btnResetAllFilters.addEventListener('click', resetAllFilters);
        if (btnResetFiltersSidebar) btnResetFiltersSidebar.addEventListener('click', resetAllFilters);

        // 7. Sort Dropdown Toggle & Options
        if (btnSortToggle && sortDropdownMenu) {
            btnSortToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                sortDropdownMenu.classList.toggle('hidden');
                btnSortToggle.setAttribute('aria-expanded', !sortDropdownMenu.classList.contains('hidden'));
            });

            document.addEventListener('click', (e) => {
                if (!sortDropdownMenu.contains(e.target) && e.target !== btnSortToggle) {
                    sortDropdownMenu.classList.add('hidden');
                    btnSortToggle.setAttribute('aria-expanded', 'false');
                }
            });

            document.querySelectorAll('.btn-sort-option').forEach(optBtn => {
                optBtn.addEventListener('click', () => {
                    const sortVal = optBtn.getAttribute('data-sort');
                    const sortLabelText = optBtn.getAttribute('data-label');
                    currentSort = sortVal;
                    if (currentSortLabel) currentSortLabel.textContent = sortLabelText;
                    sortDropdownMenu.classList.add('hidden');
                    btnSortToggle.setAttribute('aria-expanded', 'false');
                    executeFilterAndSort();
                    updateMobileFilterPills();
                });
            });
        }

        // 8. View Mode Switcher (Grid / List)
        if (btnViewGrid && btnViewList) {
            btnViewGrid.addEventListener('click', () => {
                if (viewMode === 'grid') return;
                viewMode = 'grid';
                btnViewGrid.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-primary text-white shadow-2xs transition-all cursor-pointer";
                btnViewList.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer";
                renderFirstBatch();
            });

            btnViewList.addEventListener('click', () => {
                if (viewMode === 'list') return;
                viewMode = 'list';
                btnViewList.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-primary text-white shadow-2xs transition-all cursor-pointer";
                btnViewGrid.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer";
                renderFirstBatch();
            });
        }

        // 9. Card Event Delegation: Favorite Heart Click on #recipe-grid
        if (recipeGrid) {
            recipeGrid.addEventListener('click', async (e) => {
                const favBtn = e.target.closest('.btn-favorite-dish');
                if (favBtn) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dishId = parseInt(favBtn.getAttribute('data-id'), 10);
                    const dish = masterDishes.find(d => d.id === dishId) || currentFilteredDishes.find(d => d.id === dishId);
                    if (!dish) return;

                    if (typeof window !== 'undefined' && window.toggleFavoriteDish) {
                        const isFav = await window.toggleFavoriteDish(dish);
                        dish.is_favorite = isFav;
                    } else if (typeof window !== 'undefined' && window.toggleFoodFavorite) {
                        await window.toggleFoodFavorite(e, dishId);
                    } else {
                        dish.is_favorite = !dish.is_favorite;
                        const heartIcon = favBtn.querySelector('i');
                        if (dish.is_favorite) {
                            favBtn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-rose-500 text-white backdrop-blur-sm flex items-center justify-center shadow-sm scale-125 transition-all cursor-pointer z-20";
                            setTimeout(() => favBtn.classList.remove('scale-125'), 150);
                            if (heartIcon) heartIcon.className = "fa-solid fa-heart text-sm";
                            showToast(`Đã thêm "${dish.name}" vào Yêu thích! ❤️`, 'success');
                        } else {
                            favBtn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
                            if (heartIcon) heartIcon.className = "fa-regular fa-heart text-sm";
                            showToast(`Đã bỏ lưu "${dish.name}"`, 'info');
                        }
                    }
                    return;
                }

                // Click vào bất kỳ đâu trên card món ăn -> Mở trang chi tiết món
                const card = e.target.closest('article[id^="dish-card-"]');
                if (card) {
                    const link = card.getAttribute('data-link') || `#/mon-an/${card.getAttribute('data-dish-id') || card.id.replace('dish-card-', '')}`;
                    if (link) {
                        window.location.hash = link;
                    }
                }
            });
        }

        // 10. Mobile Sticky Filter Pills & Bottom Sheet Logic (ShopeeFood Style)
        let activeBottomSheetType = null;
        let tempSheetSelectedCategories = [];
        let tempSheetCookTime = 'all';
        let tempSheetSelectedIngredients = [];

        const openBottomSheet = (type) => {
            activeBottomSheetType = type;
            if (!mobileBottomSheetModal || !mobileBottomSheetPanel || !bottomSheetBody) return;

            if (type === 'category') {
                tempSheetSelectedCategories = [...currentSelectedCategories];
                if (bottomSheetIcon) bottomSheetIcon.innerHTML = '<i class="fa-solid fa-bowl-food text-emerald-600"></i>';
                if (bottomSheetTitle) bottomSheetTitle.textContent = 'LOẠI MÓN';
                if (bottomSheetSubtitle) bottomSheetSubtitle.textContent = 'Chọn một hoặc nhiều loại món bạn thích';
                if (btnBottomSheetApplyText) {
                    btnBottomSheetApplyText.textContent = tempSheetSelectedCategories.length > 0 ? `Áp dụng (${tempSheetSelectedCategories.length})` : 'Áp dụng';
                }

                bottomSheetBody.innerHTML = `
                    <div class="grid grid-cols-2 gap-2" id="sheet-category-grid">
                        ${dbCategories.map(cat => {
                            const isChecked = tempSheetSelectedCategories.includes(cat.name);
                            const icon = getCategoryIcon(cat.name, cat.slug);
                            return `
                                <button type="button" class="sheet-cat-item ${isChecked ? 'is-checked bg-primary-subtle border-primary text-primary font-bold' : 'bg-white border-gray-200 text-text-muted font-medium'} flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition select-none" data-cat="${escapeHTML(cat.name)}">
                                    <span class="flex items-center gap-2 truncate pr-1">
                                        <i class="fa-solid ${icon.icon} ${icon.color} text-xs w-4 text-center shrink-0"></i>
                                        <span class="truncate">${escapeHTML(cat.name)}</span>
                                    </span>
                                    <span class="sheet-check w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-primary ${isChecked ? '' : 'opacity-0'}">
                                        <i class="fa-solid fa-check text-[10px]"></i>
                                    </span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                `;

                bottomSheetBody.querySelectorAll('.sheet-cat-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const cat = item.getAttribute('data-cat');
                        if (tempSheetSelectedCategories.includes(cat)) {
                            tempSheetSelectedCategories = tempSheetSelectedCategories.filter(c => c !== cat);
                            item.className = "sheet-cat-item bg-white border-gray-200 text-text-muted font-medium flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition select-none";
                            item.querySelector('.sheet-check').classList.add('opacity-0');
                        } else {
                            tempSheetSelectedCategories.push(cat);
                            item.className = "sheet-cat-item is-checked bg-primary-subtle border-primary text-primary font-bold flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition select-none";
                            item.querySelector('.sheet-check').classList.remove('opacity-0');
                        }
                        if (btnBottomSheetApplyText) {
                            btnBottomSheetApplyText.textContent = tempSheetSelectedCategories.length > 0 ? `Áp dụng (${tempSheetSelectedCategories.length})` : 'Áp dụng';
                        }
                    });
                });
            } else if (type === 'time') {
                tempSheetCookTime = currentCookTime;
                if (bottomSheetIcon) bottomSheetIcon.innerHTML = '<i class="fa-regular fa-clock text-amber-500"></i>';
                if (bottomSheetTitle) bottomSheetTitle.textContent = 'THỜI GIAN NẤU';
                if (bottomSheetSubtitle) bottomSheetSubtitle.textContent = 'Chọn thời gian chế biến món ăn';
                if (btnBottomSheetApplyText) btnBottomSheetApplyText.textContent = 'Áp dụng';

                const times = [
                    { value: 'all', label: 'Tất cả thời gian', icon: 'fa-clock-rotate-left', color: 'text-primary' },
                    { value: 'under_15', label: 'Dưới 15 phút (Món nhanh)', icon: 'fa-bolt', color: 'text-amber-500' },
                    { value: '15_to_30', label: '15 - 30 phút (Vừa vặn)', icon: 'fa-clock', color: 'text-sky-500' },
                    { value: 'above_30', label: 'Trên 30 phút (Hầm, kho kỹ)', icon: 'fa-hourglass-half', color: 'text-emerald-600' }
                ];

                bottomSheetBody.innerHTML = `
                    <div class="space-y-2" id="sheet-time-list">
                        ${times.map(t => {
                            const isChecked = tempSheetCookTime === t.value;
                            return `
                                <button type="button" class="sheet-time-item ${isChecked ? 'is-checked bg-primary-subtle border-primary text-primary font-bold' : 'bg-white border-gray-200 text-text-muted font-medium'} w-full flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition select-none" data-time="${t.value}">
                                    <span class="flex items-center gap-2.5">
                                        <i class="fa-solid ${t.icon} ${t.color} text-sm w-4 text-center shrink-0"></i>
                                        <span>${t.label}</span>
                                    </span>
                                    <span class="sheet-check w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-primary ${isChecked ? '' : 'opacity-0'}">
                                        <i class="fa-solid fa-check text-[10px]"></i>
                                    </span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                `;

                const timeItems = bottomSheetBody.querySelectorAll('.sheet-time-item');
                timeItems.forEach(item => {
                    item.addEventListener('click', () => {
                        tempSheetCookTime = item.getAttribute('data-time');
                        timeItems.forEach(i => {
                            const isCur = i.getAttribute('data-time') === tempSheetCookTime;
                            i.className = isCur 
                                ? "sheet-time-item is-checked bg-primary-subtle border-primary text-primary font-bold w-full flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition select-none"
                                : "sheet-time-item bg-white border-gray-200 text-text-muted font-medium w-full flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition select-none";
                            i.querySelector('.sheet-check').classList.toggle('opacity-0', !isCur);
                        });
                    });
                });
            } else if (type === 'ingredient') {
                tempSheetSelectedIngredients = [...currentSelectedIngredients];
                if (bottomSheetIcon) bottomSheetIcon.innerHTML = '<i class="fa-solid fa-carrot text-orange-500"></i>';
                if (bottomSheetTitle) bottomSheetTitle.textContent = 'NGUYÊN LIỆU';
                if (bottomSheetSubtitle) bottomSheetSubtitle.textContent = `Chọn trong ${dbIngredients.length} nguyên liệu tươi ngon`;
                if (btnBottomSheetApplyText) {
                    btnBottomSheetApplyText.textContent = tempSheetSelectedIngredients.length > 0 ? `Áp dụng (${tempSheetSelectedIngredients.length})` : 'Áp dụng';
                }

                bottomSheetBody.innerHTML = `
                    <div class="relative mb-3">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                        <input 
                            type="text" 
                            id="sheet-ing-search-input" 
                            placeholder="Tìm kiếm trong ${dbIngredients.length} nguyên liệu..." 
                            class="w-full pl-8 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-text-main focus:bg-white focus:outline-none focus:border-primary transition"
                        >
                        <button type="button" id="btn-sheet-clear-ing" class="hidden absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs cursor-pointer">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                    <div class="grid grid-cols-2 gap-2" id="sheet-ingredients-grid">
                        <!-- Populated dynamically -->
                    </div>
                `;

                const renderSheetIngredients = (q = '') => {
                    const grid = document.getElementById('sheet-ingredients-grid');
                    if (!grid) return;
                    const query = q.toLowerCase().trim();
                    const filtered = query ? dbIngredients.filter(i => i.name.toLowerCase().includes(query)) : dbIngredients;

                    if (filtered.length === 0) {
                        grid.innerHTML = `<div class="col-span-2 py-6 text-center text-text-muted text-xs font-medium">Không tìm thấy nguyên liệu phù hợp</div>`;
                        return;
                    }

                    grid.innerHTML = filtered.map(ing => {
                        const isChecked = tempSheetSelectedIngredients.includes(ing.name);
                        const icon = getIngredientIcon(ing.name);
                        return `
                            <button type="button" class="sheet-ing-item ${isChecked ? 'is-checked bg-primary-subtle border-primary text-primary font-bold' : 'bg-white border-gray-200 text-text-muted font-medium'} flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition select-none" data-ing="${escapeHTML(ing.name)}">
                                <span class="flex items-center gap-1.5 truncate pr-1">
                                    <i class="fa-solid ${icon.icon} ${icon.color} text-[11px] w-3.5 text-center shrink-0"></i>
                                    <span class="truncate">${escapeHTML(ing.name)}</span>
                                </span>
                                <span class="sheet-check w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-primary ${isChecked ? '' : 'opacity-0'}">
                                    <i class="fa-solid fa-check text-[10px]"></i>
                                </span>
                            </button>
                        `;
                    }).join('');

                    grid.querySelectorAll('.sheet-ing-item').forEach(item => {
                        item.addEventListener('click', () => {
                            const ingName = item.getAttribute('data-ing');
                            if (tempSheetSelectedIngredients.includes(ingName)) {
                                tempSheetSelectedIngredients = tempSheetSelectedIngredients.filter(i => i !== ingName);
                                item.className = "sheet-ing-item bg-white border-gray-200 text-text-muted font-medium flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition select-none";
                                item.querySelector('.sheet-check').classList.add('opacity-0');
                            } else {
                                tempSheetSelectedIngredients.push(ingName);
                                item.className = "sheet-ing-item is-checked bg-primary-subtle border-primary text-primary font-bold flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition select-none";
                                item.querySelector('.sheet-check').classList.remove('opacity-0');
                            }
                            if (btnBottomSheetApplyText) {
                                btnBottomSheetApplyText.textContent = tempSheetSelectedIngredients.length > 0 ? `Áp dụng (${tempSheetSelectedIngredients.length})` : 'Áp dụng';
                            }
                        });
                    });
                };

                renderSheetIngredients();

                const sheetSearchInput = document.getElementById('sheet-ing-search-input');
                const btnSheetClear = document.getElementById('btn-sheet-clear-ing');
                if (sheetSearchInput) {
                    sheetSearchInput.addEventListener('input', (e) => {
                        const v = e.target.value;
                        if (btnSheetClear) btnSheetClear.classList.toggle('hidden', v.length === 0);
                        renderSheetIngredients(v);
                    });
                }
                if (btnSheetClear) {
                    btnSheetClear.addEventListener('click', () => {
                        if (sheetSearchInput) {
                            sheetSearchInput.value = '';
                            btnSheetClear.classList.add('hidden');
                            renderSheetIngredients('');
                            sheetSearchInput.focus();
                        }
                    });
                }
            } else if (type === 'sort') {
                if (bottomSheetIcon) bottomSheetIcon.innerHTML = '<i class="fa-solid fa-arrow-down-wide-short text-primary"></i>';
                if (bottomSheetTitle) bottomSheetTitle.textContent = 'SẮP XẾP';
                if (bottomSheetSubtitle) bottomSheetSubtitle.textContent = 'Chọn thứ tự hiển thị món ăn';
                if (btnBottomSheetApplyText) btnBottomSheetApplyText.textContent = 'Đóng';

                bottomSheetBody.innerHTML = `
                    <div class="space-y-1.5" id="sheet-sort-list">
                        ${sortOptions.map(opt => {
                            const isCur = currentSort === opt.value;
                            return `
                                <button type="button" class="sheet-sort-item ${isCur ? 'bg-primary-subtle border-primary text-primary font-bold' : 'bg-white border-gray-100 hover:bg-gray-50 text-text-main font-semibold'} w-full flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition select-none" data-sort="${opt.value}" data-label="${opt.label}">
                                    <span class="flex items-center gap-2.5">
                                        <i class="fa-solid ${opt.icon} text-primary text-sm w-4 text-center shrink-0"></i>
                                        <span>${opt.label}</span>
                                    </span>
                                    <span class="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-primary ${isCur ? '' : 'opacity-0'}">
                                        <i class="fa-solid fa-check text-[11px]"></i>
                                    </span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                `;

                bottomSheetBody.querySelectorAll('.sheet-sort-item').forEach(item => {
                    item.addEventListener('click', () => {
                        currentSort = item.getAttribute('data-sort');
                        const labelText = item.getAttribute('data-label');
                        if (currentSortLabel) currentSortLabel.textContent = labelText;
                        executeFilterAndSort();
                        updateMobileFilterPills();
                        closeBottomSheet();
                    });
                });
            }

            // Show Bottom Sheet Modal with slide-up animation
            mobileBottomSheetModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                mobileBottomSheetPanel.classList.remove('translate-y-full');
            });
        };

        const closeBottomSheet = () => {
            if (!mobileBottomSheetModal || !mobileBottomSheetPanel) return;
            mobileBottomSheetPanel.classList.add('translate-y-full');
            document.body.style.overflow = '';
            setTimeout(() => {
                mobileBottomSheetModal.classList.add('hidden');
                activeBottomSheetType = null;
            }, 250);
        };

        if (btnBottomSheetApply) {
            btnBottomSheetApply.addEventListener('click', () => {
                if (activeBottomSheetType === 'category') {
                    currentSelectedCategories = [...tempSheetSelectedCategories];
                    renderCategoryChips();
                    executeFilterAndSort();
                } else if (activeBottomSheetType === 'time') {
                    currentCookTime = tempSheetCookTime;
                    const radio = document.querySelector(`input[name="cook_time"][value="${currentCookTime}"]`);
                    if (radio) radio.checked = true;
                    document.querySelectorAll('#filter-time-group .filter-chip-item').forEach(lbl => {
                        const r = lbl.querySelector('input[name="cook_time"]');
                        lbl.classList.toggle('is-checked', r && r.value === currentCookTime);
                    });
                    executeFilterAndSort();
                } else if (activeBottomSheetType === 'ingredient') {
                    currentSelectedIngredients = [...tempSheetSelectedIngredients];
                    updateIngredientCountBadge();
                    renderIngredientChips();
                    executeFilterAndSort();
                }
                updateMobileFilterPills();
                closeBottomSheet();
            });
        }

        if (btnBottomSheetReset) {
            btnBottomSheetReset.addEventListener('click', () => {
                if (activeBottomSheetType === 'category') {
                    tempSheetSelectedCategories = [];
                    currentSelectedCategories = [];
                    renderCategoryChips();
                    executeFilterAndSort();
                } else if (activeBottomSheetType === 'time') {
                    tempSheetCookTime = 'all';
                    currentCookTime = 'all';
                    const allR = document.querySelector('input[name="cook_time"][value="all"]');
                    if (allR) allR.checked = true;
                    document.querySelectorAll('#filter-time-group .filter-chip-item').forEach(lbl => {
                        const r = lbl.querySelector('input[name="cook_time"]');
                        lbl.classList.toggle('is-checked', r && r.value === 'all');
                    });
                    executeFilterAndSort();
                } else if (activeBottomSheetType === 'ingredient') {
                    tempSheetSelectedIngredients = [];
                    currentSelectedIngredients = [];
                    updateIngredientCountBadge();
                    renderIngredientChips();
                    executeFilterAndSort();
                } else if (activeBottomSheetType === 'sort') {
                    currentSort = 'newest';
                    if (currentSortLabel) currentSortLabel.textContent = 'Mới nhất';
                    executeFilterAndSort();
                }
                updateMobileFilterPills();
                closeBottomSheet();
            });
        }

        if (btnCloseBottomSheet) btnCloseBottomSheet.addEventListener('click', closeBottomSheet);
        if (mobileBottomSheetBackdrop) mobileBottomSheetBackdrop.addEventListener('click', closeBottomSheet);

        // Bind clicks on sticky pills
        document.querySelectorAll('.mobile-filter-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const target = trigger.getAttribute('data-target');
                if (target) openBottomSheet(target);
            });
        });

        // Pill Reset click
        if (mobilePillReset) {
            mobilePillReset.addEventListener('click', () => {
                resetAllFilters();
            });
        }

        // ====================================================================
        // INITIAL RENDER
        // ====================================================================
        const urlParams = params instanceof URLSearchParams 
            ? params 
            : new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');

        const urlSort = urlParams.get('sort');
        const urlCat = urlParams.get('category');
        const urlTime = urlParams.get('cook_time') || urlParams.get('time');
        const urlSubCat = urlParams.get('sub_category');
        const urlSearch = urlParams.get('search');

        if (urlSort) {
            currentSort = urlSort;
            const sortMatch = sortOptions.find(o => o.value === urlSort);
            if (sortMatch && currentSortLabel) {
                currentSortLabel.textContent = sortMatch.label;
            }
        }

        await loadDbFilterOptions();

        if (urlCat) {
            const parsedCats = urlCat.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
            parsedCats.forEach(c => {
                const matchCat = dbCategories.find(dbC => 
                    dbC.name.toLowerCase() === c || 
                    (dbC.slug && dbC.slug.toLowerCase() === c)
                );
                if (matchCat && !currentSelectedCategories.includes(matchCat.name)) {
                    currentSelectedCategories.push(matchCat.name);
                }
            });
            renderCategoryChips();
        }

        if (urlTime) {
            currentCookTime = urlTime;
            const targetRadio = document.querySelector(`input[name="cook_time"][value="${urlTime}"]`);
            if (targetRadio) {
                targetRadio.checked = true;
                document.querySelectorAll('#filter-time-group .filter-chip-item').forEach(lbl => {
                    const radio = lbl.querySelector('input[name="cook_time"]');
                    lbl.classList.toggle('is-checked', radio && radio.value === urlTime);
                });
            }
        }

        if (urlSubCat) {
            currentQuickCategory = urlSubCat;
            quickCatBtns.forEach(b => {
                const isMatch = b.getAttribute('data-cat') === urlSubCat;
                b.className = isMatch
                    ? "quick-cat-btn active-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs"
                    : "quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs";
            });
        }

        if (urlSearch) {
            currentSearchQuery = urlSearch;
            if (heroSearchInput) heroSearchInput.value = urlSearch;
            if (btnClearSearch) btnClearSearch.classList.remove('hidden');
        }

        // Drag to scroll for mobile filter pills row
        const setupPillRowDrag = () => {
            const row = document.getElementById('mobile-filter-pills-row');
            if (!row) return;
            row.addEventListener('dragstart', (e) => e.preventDefault());
            let isDown = false;
            let startX = 0;
            let scrollStart = 0;
            let hasDragged = false;
            row.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                isDown = true;
                hasDragged = false;
                startX = e.pageX;
                scrollStart = row.scrollLeft;
                const onMove = (me) => {
                    if (!isDown) return;
                    const delta = me.pageX - startX;
                    if (Math.abs(delta) > 4) hasDragged = true;
                    row.scrollLeft = scrollStart - delta;
                };
                const onUp = () => {
                    isDown = false;
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('mouseup', onUp);
                    if (hasDragged) {
                        setTimeout(() => { hasDragged = false; }, 80);
                    }
                };
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
            });
            row.addEventListener('click', (e) => {
                if (hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }, true);
        };
        setupPillRowDrag();

        executeFilterAndSort();
        updateMobileFilterPills();
        if (window.updateNavbarFavBadge) window.updateNavbarFavBadge();
    }
};

export default FoodList;

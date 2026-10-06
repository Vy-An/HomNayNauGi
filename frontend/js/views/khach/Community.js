// Community View - Food Social Community & Food Magazine Concept
// Features: 3-Column Desktop Layout, Food Journal Composer with id_food attachment, Client-side Pagination (8 posts/page), Filter Navigation, Like & Share.

// Sample existing foods in frontend database
const availableFoods = [
    { id: 1, name: 'Thịt Kho Trứng & Nước Dừa', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80' },
    { id: 2, name: 'Bún Chả & Nem Rán Hà Nội', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80' },
    { id: 3, name: 'Cá Hồi Áp Chảo Bơ Tỏi', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80' },
    { id: 4, name: 'Sườn Xào Chua Ngọt', image: 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=500&auto=format&fit=crop&q=80' },
    { id: 5, name: 'Canh Chua Cá Lóc Nam Bộ', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=80' },
    { id: 6, name: 'Gà Xào Sả Ớt Cay Nồng', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=80' },
    { id: 7, name: 'Bò Xào Lúc Lắc Khoai Tây', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80' },
    { id: 8, name: 'Đậu Hũ Nhồi Thịt Sốt Cà', image: 'https://images.unsplash.com/photo-1546069901-d1d0cf377fde?w=500&auto=format&fit=crop&q=80' },
    { id: 9, name: 'Rau Muống Xào Tỏi Xanh Mướt', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80' },
    { id: 10, name: 'Canh Sườn Nấu Sấu Hà Nội', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80' }
];

// Rich Initial Community Posts Dataset (Conforms to Post entity: id_post, id_user, id_food, title, content, image, status, created_at)
const initialPosts = [
    {
        id_post: 1,
        id_user: 101,
        id_food: 1,
        author: { name: 'Nguyễn Thị Hoa', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
        time: '2 giờ trước',
        created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        title: 'Mâm cơm ấm cúng ngày mưa',
        content: 'Hôm nay trời mưa mát mẻ nên vào bếp nấu mâm cơm chuẩn vị quê nhà: Thịt kho trứng cút đậm đà ăn kèm canh rau muống luộc vắt chanh và cà pháo giòn rụm. Nhờ gợi ý của ứng dụng mà nấu vừa nhanh vừa chuẩn vị! 🥢🥰',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Thịt Kho Trứng & Nước Dừa',
        likes: 382,
        liked: false
    },
    {
        id_post: 2,
        id_user: 102,
        id_food: 2,
        author: { name: 'Trần Minh Anh', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
        time: '4 giờ trước',
        created_at: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        title: 'Bún chả Hà Nội tự làm',
        content: 'Cuối tuần trổ tài làm Bún chả & Nem rán Hà Nội theo công thức gợi ý trên Hôm Nay Ăn Gì. Nước chấm chua ngọt pha chuẩn tỉ lệ, thịt nướng thơm lừng cả gian bếp. Cả nhà khen nức nở luôn ạ! ✨',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Bún Chả & Nem Rán Hà Nội',
        likes: 426,
        liked: false
    },
    {
        id_post: 3,
        id_user: 103,
        id_food: 3,
        author: { name: 'Lê Hoàng Nam', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
        time: '6 giờ trước',
        created_at: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        title: 'Bữa trưa Eat Clean nhẹ bụng',
        content: 'Bữa trưa Eat Clean nhẹ bụng: Cá hồi áp chảo sốt bơ tỏi, măng tây nướng và salad sốt mè rang. Nhanh gọn chỉ mất 20 phút chuẩn bị mà vẫn đủ đầy năng lượng cho buổi chiều làm việc. 🥗🐟',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Cá Hồi Áp Chảo Bơ Tỏi',
        likes: 215,
        liked: false
    },
    {
        id_post: 4,
        id_user: 104,
        id_food: 4,
        author: { name: 'Phạm Lan Hương', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
        time: '8 giờ trước',
        created_at: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
        title: 'Sườn xào chua ngọt đưa cơm',
        content: 'Sườn xào chua ngọt óng ánh sốt cà chua, hành tây và ớt chuông giòn ngọt. Nấu món này là nồi cơm hết veo trong một nốt nhạc! Các mẹ thử công thức này nhé. 🍲',
        image: 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Sườn Xào Chua Ngọt',
        likes: 198,
        liked: false
    },
    {
        id_post: 5,
        id_user: 105,
        id_food: 5,
        author: { name: 'Đặng Quốc Bảo', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
        time: '12 giờ trước',
        created_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        title: 'Canh chua cá lóc giải nhiệt',
        content: 'Trưa nắng làm tô canh chua cá lóc nấu dọc mùng, bạc hà và giá đỗ tươi. Nước canh chua thanh ngọt mát, ăn tới đâu tỉnh cả người tới đó. 🥣',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Canh Chua Cá Lóc Nam Bộ',
        likes: 174,
        liked: false
    },
    {
        id_post: 6,
        id_user: 106,
        id_food: 6,
        author: { name: 'Vũ Thanh Mai', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
        time: '1 ngày trước',
        created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        title: 'Gà xào sả ớt thơm lừng',
        content: 'Thịt gà xào sả ớt đẫm vị, cay tê nơi đầu lưỡi rất thích hợp cho những ngày se lạnh. Thêm đĩa dưa leo giòn rụm nữa là điểm 10 trọn vẹn! 🌶️🍗',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Gà Xào Sả Ớt Cay Nồng',
        likes: 260,
        liked: false
    },
    {
        id_post: 7,
        id_user: 107,
        id_food: 7,
        author: { name: 'Hoàng Nhật Minh', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
        time: '1 ngày trước',
        created_at: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
        title: 'Bò lúc lắc mềm ngọt',
        content: 'Bò xào lúc lắc ướp sốt tiêu đen ăn kèm ớt chuông ba màu và khoai tây chiên giòn tan. Món này các bé nhà mình mê tít! 🥩🍟',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Bò Xào Lúc Lắc Khoai Tây',
        likes: 312,
        liked: false
    },
    {
        id_post: 8,
        id_user: 108,
        id_food: 8,
        author: { name: 'Bùi Kim Oanh', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
        time: '2 ngày trước',
        created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        title: 'Đậu hũ sốt cà truyền thống',
        content: 'Món đậu hũ nhồi thịt sốt cà chua thân thương mộc mạc, làm nhanh chỉ 15 phút mà rất bùi béo ngọt thanh, chan cơm thì ngon tuyệt vời. 🍅',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Đậu Hũ Nhồi Thịt Sốt Cà',
        likes: 145,
        liked: false
    },
    {
        id_post: 9,
        id_user: 109,
        id_food: 9,
        author: { name: 'Thái Thị Hạnh', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80' },
        time: '2 ngày trước',
        created_at: new Date(Date.now() - 52 * 3600 * 1000).toISOString(),
        title: 'Rau muống xào tỏi xanh mướt',
        content: 'Bí quyết xào rau muống xanh ngắt giòn tan: chần nhanh qua nước sôi có chút muối rồi xào lửa lớn với tỏi đập dập phi thơm nức mũi! 🌿',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Rau Muống Xào Tỏi Xanh Mướt',
        likes: 188,
        liked: false
    },
    {
        id_post: 10,
        id_user: 110,
        id_food: 10,
        author: { name: 'Ngô Đức Thắng', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
        time: '3 ngày trước',
        created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
        title: 'Canh sườn nấu sấu chuẩn Hà Nội',
        content: 'Vị chua thanh mát lành của quả sấu hòa quyện cùng sườn non ninh mềm béo ngậy. Món canh tinh hoa ẩm thực mùa hè miền Bắc! 🍲',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&auto=format&fit=crop&q=80',
        foodName: 'Canh Sườn Nấu Sấu Hà Nội',
        likes: 290,
        liked: false
    }
];

const POSTS_PER_PAGE = 4; // 4 posts per page for clean, compact & balanced feed

const Community = {
    render: async () => {
        return `
        <div class="cozy-kitchen-bg min-h-screen text-text-main font-sans selection:bg-primary/20 selection:text-primary pb-16">
            
            <!-- ======================================================== -->
            <!-- 1. COMMUNITY HERO SECTION (Compact & Warm)               -->
            <!-- ======================================================== -->
            <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-2">
                <div class="relative bg-gradient-to-r from-[#FFFDF9] via-[#FBF8F1] to-[#F5EBD4]/75 rounded-[24px] p-5 sm:p-7 border border-beige-border/80 shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5">
                    
                    <!-- Decorative Ambience Blobs -->
                    <div class="absolute -top-10 -left-10 w-44 h-44 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div class="absolute -bottom-8 right-16 w-44 h-44 bg-accent/15 rounded-full blur-2xl pointer-events-none"></div>

                    <!-- Left: Hero Text & Action -->
                    <div class="relative z-10 max-w-2xl space-y-2">
                        <div class="inline-flex items-center gap-1.5 bg-primary-subtle border border-primary-light/30 px-3 py-0.5 rounded-full text-xs font-bold text-primary shadow-sm">
                            <span>🍲</span>
                            <span>Cộng đồng Ẩm thực & Bếp nhà</span>
                        </div>

                        <h1 class="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-text-main tracking-tight leading-snug">
                            Cộng đồng <span class="text-primary font-caveat text-3xl sm:text-4xl lg:text-[42px] font-bold inline-block">Hôm Nay Ăn Gì?</span>
                        </h1>

                        <p class="text-text-muted text-xs sm:text-sm leading-relaxed font-medium">
                            Chia sẻ mâm cơm, món ngon và những khoảnh khắc ấm cúng trong căn bếp của bạn cùng cộng đồng yêu ẩm thực.
                        </p>

                        <div class="pt-1 flex items-center gap-3">
                            <button 
                                id="btn-scroll-to-composer" 
                                class="inline-flex items-center gap-2 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-xs sm:text-sm px-4.5 py-2 rounded-full shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                            >
                                <i class="fa-solid fa-plus text-xs"></i>
                                <span>Chia sẻ món hôm nay</span>
                            </button>
                            <span class="text-xs text-text-muted font-medium hidden sm:inline">
                                • Những câu chuyện ấm áp từ căn bếp gia đình
                            </span>
                        </div>
                    </div>

                    <!-- Right: Editorial Food Graphic -->
                    <div class="relative z-10 flex-shrink-0 flex items-center justify-center">
                        <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/95 border-3 border-[#E9DFC9] shadow-md flex items-center justify-center relative group">
                            <svg class="w-16 h-16 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 10C24 6 28 6 28 2" stroke="#E59F3F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-steam"/>
                                <path d="M32 12C32 8 36 8 36 4" stroke="#245B43" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-steam" style="animation-delay: 0.5s;"/>
                                <path d="M40 10C40 6 44 6 44 2" stroke="#E59F3F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-steam" style="animation-delay: 1s;"/>
                                <path d="M12 28C12 28 14 52 32 52C50 52 52 28 52 28H12Z" fill="#245B43"/>
                                <circle cx="32" cy="28" r="16" fill="#FFF9ED" stroke="#B9824B" stroke-width="2"/>
                                <circle cx="32" cy="28" r="8" fill="#E59F3F"/>
                                <path d="M20 28H44" stroke="#7DA66D" stroke-width="3" stroke-linecap="round"/>
                            </svg>
                            <span class="absolute -top-1.5 -right-1 bg-accent text-white font-handwriting text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                                🥢 Bếp ấm
                            </span>
                        </div>
                    </div>

                </div>
            </section>

            <!-- ======================================================== -->
            <!-- 2. COMMUNITY MAIN CONTENT: 3-COLUMN DESKTOP (1360px max) -->
            <!-- ======================================================== -->
            <main class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    
                    <!-- ---------------------------------------------------- -->
                    <!-- LEFT SIDEBAR: ~240px (lg:col-span-3 - STICKY)        -->
                    <!-- ---------------------------------------------------- -->
                    <aside class="lg:col-span-3 space-y-4.5 order-2 lg:order-1 lg:sticky lg:top-[80px] lg:self-start">
                        
                        <!-- Card 1: 🍽️ KHÁM PHÁ (Filter Navigation) -->
                        <div class="bg-white rounded-[20px] border border-beige-border/80 p-4.5 shadow-sm">
                            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-[#F0EBE0]">
                                <span class="text-sm">🍽️</span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Khám phá
                                </h2>
                            </div>

                            <nav class="space-y-1" id="category-navigation">
                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white shadow-sm transition-all flex items-center justify-between cursor-pointer" data-filter="all">
                                    <span class="flex items-center gap-2">
                                        <span>✨</span>
                                        <span>Tất cả bài viết</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="newest">
                                    <span class="flex items-center gap-2">
                                        <span>🕐</span>
                                        <span>Mới nhất</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="liked">
                                    <span class="flex items-center gap-2">
                                        <span>❤️</span>
                                        <span>Được yêu thích</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="trending">
                                    <span class="flex items-center gap-2">
                                        <span>🔥</span>
                                        <span>Đang nổi bật</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="random">
                                    <span class="flex items-center gap-2">
                                        <span>🎲</span>
                                        <span>Khám phá ngẫu nhiên</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>
                            </nav>
                        </div>

                        <!-- Card 2: ✨ GỢI Ý HÔM NAY / CHƯA BIẾT ĂN GÌ? -->
                        <div class="bg-gradient-to-br from-[#1F5B43] via-[#1B4633] to-[#123C28] text-white rounded-[20px] p-4.5 shadow-md relative overflow-hidden group">
                            <div class="absolute top-0 right-0 translate-x-3 -translate-y-3 w-20 h-20 bg-accent/20 rounded-full blur-xl pointer-events-none"></div>

                            <div class="relative z-10 space-y-2">
                                <div class="inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-accent-light">
                                    <span>✨</span>
                                    <span>Gợi ý hôm nay</span>
                                </div>

                                <h3 class="text-sm sm:text-base font-extrabold leading-snug">
                                    Chưa biết ăn gì?
                                </h3>

                                <p class="text-white/80 text-xs leading-relaxed font-normal">
                                    Để Hôm Nay Ăn Gì? chọn giúp bạn nhé.
                                </p>

                                <div class="pt-0.5">
                                    <a href="#/" class="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover active:bg-amber-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm hover:scale-[1.02] transition-all">
                                        <span>🎲 Random món ngay</span>
                                        <i class="fa-solid fa-arrow-right text-[9px]"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </aside>


                    <!-- ---------------------------------------------------- -->
                    <!-- CENTER FEED: ~620px (lg:col-span-6)                  -->
                    <!-- ---------------------------------------------------- -->
                    <section class="lg:col-span-6 space-y-5 order-1 lg:order-2" id="center-feed-column">
                        
                        <!-- CREATE POST: COOKING JOURNAL COMPOSER -->
                        <div id="post-composer" class="bg-white rounded-[20px] border border-beige-border/80 p-4.5 sm:p-5 shadow-sm">
                            <div class="flex items-center gap-3 mb-3">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" alt="Bạn" class="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20">
                                <div>
                                    <h4 class="font-bold text-xs sm:text-sm text-text-main">Hôm nay bạn vừa nấu món gì?</h4>
                                    <p class="text-[11px] text-text-muted font-medium">Nhật ký món ngon từ căn bếp của bạn</p>
                                </div>
                            </div>

                            <form id="form-create-post" class="space-y-2.5">
                                <div class="relative">
                                    <textarea 
                                        id="post-content-input" 
                                        rows="3" 
                                        placeholder="Chia sẻ một chút về món ăn hôm nay..."
                                        class="w-full bg-[#FCFAF6] rounded-xl p-3 border border-[#DFD5BE] focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <!-- Attached Food Pill Display -->
                                <div id="attached-food-pill" class="hidden inline-flex items-center gap-2 bg-primary-subtle border border-primary-light/40 text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    <i class="fa-solid fa-utensils text-accent text-xs"></i>
                                    <span id="attached-food-name">Món ăn</span>
                                    <button type="button" id="btn-remove-attached-food" class="hover:text-red-500 transition-colors ml-1" title="Gỡ món ăn">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <!-- Image Preview Container -->
                                <div id="image-preview-container" class="hidden relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video max-h-44">
                                    <img id="image-preview-img" src="" alt="Preview" class="w-full h-full object-cover">
                                    <button type="button" id="btn-remove-preview-image" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-xs transition-colors" title="Xóa ảnh">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <!-- Composer Actions Bar -->
                                <div class="flex items-center justify-between pt-2 border-t border-[#F0EBE0]">
                                    <div class="flex items-center gap-1.5">
                                        <!-- Hidden File Input for Image Upload -->
                                        <input type="file" id="post-image-file" accept="image/*" class="hidden">

                                        <!-- Button: Thêm ảnh -->
                                        <button 
                                            type="button" 
                                            id="btn-trigger-upload" 
                                            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary hover:bg-primary-subtle transition-colors cursor-pointer"
                                        >
                                            <i class="fa-solid fa-camera text-primary text-sm"></i>
                                            <span>Thêm ảnh</span>
                                        </button>

                                        <!-- Button: Gắn món ăn -->
                                        <div class="relative">
                                            <button 
                                                type="button" 
                                                id="btn-trigger-attach-food" 
                                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary hover:bg-primary-subtle transition-colors cursor-pointer"
                                            >
                                                <i class="fa-solid fa-bowl-food text-accent text-sm"></i>
                                                <span>Gắn món ăn</span>
                                            </button>

                                            <!-- Dropdown list to pick food -->
                                            <div id="attach-food-dropdown" class="hidden absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-beige-border p-2 z-30 max-h-56 overflow-y-auto">
                                                <div class="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-text-muted border-b border-gray-100">
                                                    Chọn món ăn liên quan
                                                </div>
                                                <div class="space-y-1 mt-1">
                                                    ${availableFoods.map(f => `
                                                        <button type="button" class="btn-select-food w-full text-left p-1.5 rounded-xl hover:bg-primary-subtle flex items-center gap-2 text-xs font-bold text-text-main transition-colors cursor-pointer" data-id="${f.id}" data-name="${f.name}">
                                                            <img src="${f.image}" class="w-7 h-7 rounded-lg object-cover">
                                                            <span class="truncate">${f.name}</span>
                                                        </button>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Submit Button: Đăng bài -->
                                    <button 
                                        type="submit" 
                                        id="btn-submit-post" 
                                        class="px-4.5 py-2 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-primary/20 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <span>Đăng bài</span>
                                        <span class="text-xs">→</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- FEED HEADER (Showing Current Filter & Post Count) -->
                        <div id="community-feed-header" class="flex items-center justify-between text-xs text-text-muted font-semibold px-1">
                            <span id="feed-filter-title">✨ Tất cả bài viết</span>
                            <span id="feed-post-count-badge" class="bg-white border border-beige-border px-2 py-0.5 rounded-full text-[11px]">Đang tải...</span>
                        </div>

                        <!-- FEED POSTS CONTAINER -->
                        <div id="community-feed" class="space-y-5">
                            <!-- Injected by JavaScript -->
                        </div>

                        <!-- PAGINATION CONTAINER -->
                        <div id="community-pagination" class="pt-2 pb-4 flex items-center justify-center">
                            <!-- Injected by JavaScript -->
                        </div>

                    </section>


                    <!-- ---------------------------------------------------- -->
                    <!-- RIGHT SIDEBAR: ~260px (lg:col-span-3 - STICKY)       -->
                    <!-- ---------------------------------------------------- -->
                    <aside class="lg:col-span-3 space-y-4.5 order-3 lg:sticky lg:top-[80px] lg:self-start">
                        
                        <!-- Card 1: ❤️ ĐƯỢC YÊU THÍCH (Top Dishes - NO FOLLOW) -->
                        <div class="bg-white rounded-[20px] border border-beige-border/80 p-4.5 shadow-sm">
                            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-[#F0EBE0]">
                                <span class="w-5 h-5 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center text-[10px]">
                                    <i class="fa-solid fa-heart"></i>
                                </span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Được yêu thích
                                </h2>
                            </div>

                            <div class="space-y-3" id="popular-dishes-list">
                                <!-- Rendered dynamically -->
                            </div>
                        </div>

                        <!-- Card 2: 🕐 MỚI NHẤT (Recent Community Posts) -->
                        <div class="bg-white rounded-[20px] border border-beige-border/80 p-4.5 shadow-sm">
                            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-[#F0EBE0]">
                                <span class="w-5 h-5 rounded-md bg-green-100 text-green-700 flex items-center justify-center text-[10px]">
                                    <i class="fa-solid fa-clock"></i>
                                </span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Mới nhất
                                </h2>
                            </div>

                            <div class="space-y-3" id="recent-posts-list">
                                <!-- Rendered dynamically -->
                            </div>
                        </div>

                        <!-- Card 3: 💡 GỢI Ý HÔM NAY (Compact Food Tip/Quote) -->
                        <div class="bg-[#FFF9ED] rounded-[20px] border border-[#E9DFC9] p-4 shadow-sm relative overflow-hidden">
                            <div class="flex items-center gap-1.5 mb-2">
                                <span class="text-xs text-accent">💡</span>
                                <h3 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Gợi ý hôm nay
                                </h3>
                            </div>

                            <p class="font-handwriting text-sm text-primary font-bold leading-snug">
                                "Một mâm cơm ngon không cần quá cầu kỳ, chỉ cần có đủ yêu thương và tiếng cười gia đình."
                            </p>

                            <div class="mt-2.5 flex items-center justify-between text-[10px] text-text-muted font-medium pt-1.5 border-t border-[#EFE9DC]">
                                <span>— Bếp Hôm Nay Ăn Gì?</span>
                                <span>🍲</span>
                            </div>
                        </div>

                    </aside>

                </div>
            </main>

            <!-- FLOATING TOAST NOTIFICATION CONTAINER -->
            <div id="community-toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"></div>

        </div>
        `;
    },

    afterRender: async () => {
        // Master State (Frontend only)
        let allPosts = [...initialPosts];
        let currentFilteredPosts = [...allPosts];
        let currentPage = 1;
        let selectedFoodId = null;
        let selectedFoodName = null;
        let uploadedImageSrc = null;
        let currentFilter = 'all';

        // DOM Elements
        const formCreatePost = document.getElementById('form-create-post');
        const postContentInput = document.getElementById('post-content-input');
        const postImageFileInput = document.getElementById('post-image-file');
        const btnTriggerUpload = document.getElementById('btn-trigger-upload');
        const imagePreviewContainer = document.getElementById('image-preview-container');
        const imagePreviewImg = document.getElementById('image-preview-img');
        const btnRemovePreviewImage = document.getElementById('btn-remove-preview-image');
        const btnTriggerAttachFood = document.getElementById('btn-trigger-attach-food');
        const attachFoodDropdown = document.getElementById('attach-food-dropdown');
        const attachedFoodPill = document.getElementById('attached-food-pill');
        const attachedFoodNameEl = document.getElementById('attached-food-name');
        const btnRemoveAttachedFood = document.getElementById('btn-remove-attached-food');
        const feedContainer = document.getElementById('community-feed');
        const paginationContainer = document.getElementById('community-pagination');
        const feedFilterTitle = document.getElementById('feed-filter-title');
        const feedPostCountBadge = document.getElementById('feed-post-count-badge');
        const btnScrollToComposer = document.getElementById('btn-scroll-to-composer');
        const popularDishesList = document.getElementById('popular-dishes-list');
        const recentPostsList = document.getElementById('recent-posts-list');

        // Toast Helper
        const showToast = (message, type = 'success') => {
            const container = document.getElementById('community-toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `pointer-events-auto transform translate-y-2 opacity-0 transition-all duration-300 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-bold ${
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

            toast.innerHTML = `
                ${icon}
                <span>${message}</span>
            `;

            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
                toast.classList.add('translate-y-0', 'opacity-100');
            });

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-2', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        };

        // Smooth Scroll to Top of Feed (Composer or Feed Header)
        const scrollToFeed = () => {
            const target = document.getElementById('community-feed-header') || document.getElementById('post-composer');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        // Render Single Post Card HTML
        const createPostCardHTML = (post, isFeatured = false) => {
            const hasImage = !!post.image;
            const hasFood = !!post.foodName;

            return `
                <article class="bg-white rounded-[20px] border border-beige-border/80 shadow-sm hover:shadow-md transition-all duration-300 p-4.5 sm:p-5 mb-4 group ${isFeatured ? 'ring-1 ring-primary/20' : ''}" id="post-card-${post.id_post}">
                    <!-- Author Header -->
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <img src="${post.author.avatar}" alt="${post.author.name}" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/15 shadow-sm">
                                <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <div class="flex items-center gap-1.5">
                                    <h3 class="font-extrabold text-xs sm:text-sm text-text-main hover:text-primary transition-colors cursor-pointer">${post.author.name}</h3>
                                    ${isFeatured ? '<span class="bg-accent/15 text-accent-hover text-[10px] font-bold px-1.5 py-0.2 rounded-full">Nổi bật</span>' : ''}
                                </div>
                                <p class="text-[11px] text-text-muted font-medium mt-0.5 flex items-center gap-1">
                                    <i class="fa-regular fa-clock text-[10px]"></i>
                                    <span>${post.time}</span>
                                </p>
                            </div>
                        </div>

                        <button class="btn-more-options text-text-muted hover:text-text-main p-1.5 rounded-full hover:bg-gray-100 transition-colors" title="Tùy chọn">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>

                    <!-- Post Text -->
                    <p class="text-text-main text-xs sm:text-sm leading-relaxed mb-3 font-normal">
                        ${post.content}
                    </p>

                    <!-- Large Food Image with Attached Food Pill (16:10 Aspect Ratio) -->
                    ${hasImage ? `
                    <div class="rounded-xl overflow-hidden mb-3.5 bg-cream-soft border border-[#EFE9DC] relative group/img aspect-[16/10]">
                        <img 
                            src="${post.image}" 
                            alt="${post.foodName || 'Món ăn gia đình'}" 
                            class="w-full h-full object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-500 ease-out" 
                            loading="lazy"
                        />
                        ${hasFood ? `
                        <div class="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                            <i class="fa-solid fa-utensils text-accent-light text-[10px]"></i>
                            <span>${post.foodName}</span>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}

                    <!-- Post Action Bar (STRICTLY ONLY LIKE & SHARE) -->
                    <div class="flex items-center justify-between pt-2.5 border-t border-[#F0EBE0] text-text-muted">
                        <!-- Like Button -->
                        <button 
                            class="btn-like inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-rose-50 text-text-muted hover:text-rose-600 transition-all font-bold text-xs cursor-pointer active:scale-95" 
                            data-id="${post.id_post}" 
                            data-liked="${post.liked}" 
                            data-count="${post.likes}"
                        >
                            <i class="${post.liked ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'} text-sm transition-colors"></i>
                            <span class="like-count ${post.liked ? 'text-rose-600 font-extrabold' : ''}">${post.likes}</span>
                            <span class="font-semibold text-[11px] text-text-muted">lượt thích</span>
                        </button>

                        <!-- Share Button -->
                        <button 
                            class="btn-share inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary-subtle text-text-muted hover:text-primary transition-all font-bold text-xs cursor-pointer active:scale-95" 
                            data-id="${post.id_post}"
                        >
                            <i class="fa-solid fa-share-nodes text-sm"></i>
                            <span class="font-semibold">Chia sẻ</span>
                        </button>
                    </div>
                </article>
            `;
        };

        // Render Posts for Current Page (Pagination Slice)
        const renderPosts = () => {
            if (!feedContainer) return;

            const totalPosts = currentFilteredPosts.length;
            if (feedPostCountBadge) {
                feedPostCountBadge.textContent = `${totalPosts} bài viết`;
            }

            // Empty State
            if (totalPosts === 0) {
                feedContainer.innerHTML = `
                    <div class="bg-white rounded-[20px] border border-beige-border/80 p-8 text-center shadow-sm">
                        <div class="w-16 h-16 rounded-full bg-cream-soft flex items-center justify-center text-2xl mx-auto mb-3 text-primary">
                            🍽️
                        </div>
                        <h3 class="text-base font-extrabold text-text-main mb-1">Chưa có bài viết nào</h3>
                        <p class="text-xs text-text-muted mb-4">Hãy là người đầu tiên chia sẻ mâm cơm ấm cúng hôm nay!</p>
                        <button id="btn-empty-composer" class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2 rounded-full transition-all">
                            <i class="fa-solid fa-plus text-xs"></i>
                            <span>Đăng bài ngay</span>
                        </button>
                    </div>
                `;

                const btnEmptyComposer = document.getElementById('btn-empty-composer');
                if (btnEmptyComposer) {
                    btnEmptyComposer.addEventListener('click', () => {
                        if (postContentInput) postContentInput.focus();
                    });
                }

                if (paginationContainer) paginationContainer.innerHTML = '';
                return;
            }

            // Calculate Pagination Slice
            const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
            const endIndex = startIndex + POSTS_PER_PAGE;
            const pagePosts = currentFilteredPosts.slice(startIndex, endIndex);

            feedContainer.innerHTML = pagePosts.map((post, index) => {
                const isFeatured = (currentPage === 1 && index === 0);
                return createPostCardHTML(post, isFeatured);
            }).join('');

            renderPagination();
        };

        // Render Pagination Controls
        const renderPagination = () => {
            if (!paginationContainer) return;

            const totalPosts = currentFilteredPosts.length;
            const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

            // Hide pagination if <= POSTS_PER_PAGE
            if (totalPages <= 1) {
                paginationContainer.innerHTML = '';
                return;
            }

            const isFirstPage = currentPage === 1;
            const isLastPage = currentPage === totalPages;

            let pageNumbersHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const isActive = i === currentPage;
                pageNumbersHTML += `
                    <button 
                        type="button" 
                        class="page-num-btn w-8.5 h-8.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center cursor-pointer ${
                            isActive 
                                ? 'bg-primary text-white shadow-sm font-extrabold scale-105' 
                                : 'bg-white text-text-main hover:bg-primary-subtle hover:text-primary border border-beige-border'
                        }" 
                        data-page="${i}"
                    >
                        ${i}
                    </button>
                `;
            }

            paginationContainer.innerHTML = `
                <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-beige-border px-3 py-1.5 rounded-2xl shadow-sm">
                    <!-- Prev Button -->
                    <button 
                        type="button" 
                        id="btn-prev-page" 
                        class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isFirstPage 
                                ? 'opacity-40 cursor-not-allowed text-gray-400 bg-gray-50 border border-gray-100' 
                                : 'bg-white text-text-main hover:bg-primary-subtle hover:text-primary border border-beige-border'
                        }"
                        ${isFirstPage ? 'disabled' : ''}
                    >
                        <span>←</span>
                        <span>Trước</span>
                    </button>

                    <!-- Page Numbers -->
                    <div class="flex items-center gap-1.5 px-1">
                        ${pageNumbersHTML}
                    </div>

                    <!-- Next Button -->
                    <button 
                        type="button" 
                        id="btn-next-page" 
                        class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            isLastPage 
                                ? 'opacity-40 cursor-not-allowed text-gray-400 bg-gray-50 border border-gray-100' 
                                : 'bg-white text-text-main hover:bg-primary-subtle hover:text-primary border border-beige-border'
                        }"
                        ${isLastPage ? 'disabled' : ''}
                    >
                        <span>Sau</span>
                        <span>→</span>
                    </button>
                </div>
            `;
        };

        // Go to Page function
        const goToPage = (pageNumber) => {
            const totalPages = Math.ceil(currentFilteredPosts.length / POSTS_PER_PAGE);
            if (pageNumber < 1 || pageNumber > totalPages) return;

            currentPage = pageNumber;
            renderPosts();
            scrollToFeed();
        };

        // Render Right Sidebar Popular & Recent Cards
        const renderSidebars = () => {
            // Popular Dishes (Top 3 by likes)
            if (popularDishesList) {
                const popularSorted = [...allPosts]
                    .filter(p => !!p.foodName)
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 3);

                popularDishesList.innerHTML = popularSorted.map(p => `
                    <div class="flex items-center gap-2.5 group cursor-pointer" onclick="window.location.hash='#/danh-sach'">
                        <img src="${p.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}" alt="${p.foodName}" class="w-11 h-11 rounded-xl object-cover ring-1 ring-black/5 flex-shrink-0 group-hover:scale-105 transition-transform">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-xs text-text-main truncate group-hover:text-primary transition-colors">${p.foodName}</h4>
                            <p class="text-[11px] text-rose-600 font-bold mt-0.5 flex items-center gap-1">
                                <i class="fa-solid fa-heart text-[10px]"></i>
                                <span>${p.likes} lượt thích</span>
                            </p>
                        </div>
                    </div>
                `).join('');
            }

            // Recent Posts (Top 3 newest)
            if (recentPostsList) {
                const recentSorted = [...allPosts]
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 3);

                recentPostsList.innerHTML = recentSorted.map(p => `
                    <div class="flex items-center gap-2.5 group cursor-pointer">
                        <img src="${p.image || p.author.avatar}" alt="${p.author.name}" class="w-11 h-11 rounded-xl object-cover ring-1 ring-black/5 flex-shrink-0 group-hover:scale-105 transition-transform">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-xs text-text-main truncate group-hover:text-primary transition-colors">${p.title || p.author.name}</h4>
                            <p class="text-[10px] text-text-muted font-medium mt-0.5 flex items-center gap-1">
                                <i class="fa-regular fa-clock text-[9px]"></i>
                                <span>${p.time}</span>
                            </p>
                        </div>
                    </div>
                `).join('');
            }
        };

        // Scroll to Composer on Hero CTA
        if (btnScrollToComposer) {
            btnScrollToComposer.addEventListener('click', () => {
                const composer = document.getElementById('post-composer');
                if (composer) {
                    composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (postContentInput) postContentInput.focus();
                }
            });
        }

        // Image Upload Trigger & Preview
        if (btnTriggerUpload && postImageFileInput) {
            btnTriggerUpload.addEventListener('click', () => {
                postImageFileInput.click();
            });

            postImageFileInput.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        uploadedImageSrc = event.target.result;
                        if (imagePreviewImg && imagePreviewContainer) {
                            imagePreviewImg.src = uploadedImageSrc;
                            imagePreviewContainer.classList.remove('hidden');
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Remove Preview Image
        if (btnRemovePreviewImage) {
            btnRemovePreviewImage.addEventListener('click', () => {
                uploadedImageSrc = null;
                if (postImageFileInput) postImageFileInput.value = '';
                if (imagePreviewContainer) imagePreviewContainer.classList.add('hidden');
                if (imagePreviewImg) imagePreviewImg.src = '';
            });
        }

        // Attach Food Trigger & Selector
        if (btnTriggerAttachFood && attachFoodDropdown) {
            btnTriggerAttachFood.addEventListener('click', (e) => {
                e.stopPropagation();
                attachFoodDropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!attachFoodDropdown.contains(e.target) && e.target !== btnTriggerAttachFood) {
                    attachFoodDropdown.classList.add('hidden');
                }
            });

            // Food option selection
            const foodButtons = attachFoodDropdown.querySelectorAll('.btn-select-food');
            foodButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    selectedFoodId = parseInt(btn.getAttribute('data-id'), 10);
                    selectedFoodName = btn.getAttribute('data-name');

                    if (attachedFoodPill && attachedFoodNameEl) {
                        attachedFoodNameEl.textContent = selectedFoodName;
                        attachedFoodPill.classList.remove('hidden');
                    }

                    attachFoodDropdown.classList.add('hidden');
                    showToast(`Đã gắn món: ${selectedFoodName}`, 'info');
                });
            });
        }

        // Remove Attached Food
        if (btnRemoveAttachedFood) {
            btnRemoveAttachedFood.addEventListener('click', () => {
                selectedFoodId = null;
                selectedFoodName = null;
                if (attachedFoodPill) attachedFoodPill.classList.add('hidden');
            });
        }

        // Post Submit Handler (Pure Client-side Demo)
        if (formCreatePost) {
            formCreatePost.addEventListener('submit', (e) => {
                e.preventDefault();
                const content = postContentInput?.value.trim() || '';

                if (!content && !uploadedImageSrc) {
                    showToast('Vui lòng nhập nội dung hoặc thêm ảnh món ăn.', 'warning');
                    postContentInput?.focus();
                    return;
                }

                // Create new post conforming to data schema
                const newPost = {
                    id_post: Date.now(),
                    id_user: 999,
                    id_food: selectedFoodId || null,
                    author: {
                        name: 'Bạn',
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
                    },
                    time: 'Vừa xong',
                    created_at: new Date().toISOString(),
                    title: selectedFoodName || 'Mâm cơm bếp nhà',
                    content: content || 'Mâm cơm ấm cúng vừa nấu xong!',
                    image: uploadedImageSrc || null,
                    foodName: selectedFoodName || null,
                    likes: 1,
                    liked: true
                };

                // Add to master array at beginning
                allPosts.unshift(newPost);
                currentFilteredPosts = [...allPosts];

                // Reset page to 1
                currentPage = 1;
                renderPosts();
                renderSidebars();
                scrollToFeed();

                // Reset composer
                formCreatePost.reset();
                uploadedImageSrc = null;
                selectedFoodId = null;
                selectedFoodName = null;
                if (imagePreviewContainer) imagePreviewContainer.classList.add('hidden');
                if (imagePreviewImg) imagePreviewImg.src = '';
                if (attachedFoodPill) attachedFoodPill.classList.add('hidden');

                showToast('Đăng bài chia sẻ thành công!', 'success');
            });
        }

        // Event Delegation for Like & Share on feedContainer
        if (feedContainer) {
            feedContainer.addEventListener('click', (e) => {
                // Like Handler
                const likeBtn = e.target.closest('.btn-like');
                if (likeBtn) {
                    const postId = parseInt(likeBtn.getAttribute('data-id'), 10);
                    const post = allPosts.find(p => p.id_post === postId);
                    if (!post) return;

                    post.liked = !post.liked;
                    post.likes = post.liked ? post.likes + 1 : Math.max(0, post.likes - 1);

                    const heartIcon = likeBtn.querySelector('i');
                    const countSpan = likeBtn.querySelector('.like-count');

                    likeBtn.setAttribute('data-liked', post.liked);
                    likeBtn.setAttribute('data-count', post.likes);

                    if (post.liked) {
                        heartIcon.className = 'fa-solid fa-heart text-rose-500 text-sm scale-125 transition-transform duration-150';
                        setTimeout(() => { heartIcon.className = 'fa-solid fa-heart text-rose-500 text-sm'; }, 150);
                        if (countSpan) {
                            countSpan.textContent = post.likes;
                            countSpan.className = 'like-count text-rose-600 font-extrabold';
                        }
                    } else {
                        heartIcon.className = 'fa-regular fa-heart text-sm';
                        if (countSpan) {
                            countSpan.textContent = post.likes;
                            countSpan.className = 'like-count';
                        }
                    }

                    renderSidebars();
                    return;
                }

                // Share Handler
                const shareBtn = e.target.closest('.btn-share');
                if (shareBtn) {
                    const postId = shareBtn.getAttribute('data-id');
                    const url = `${window.location.origin}${window.location.pathname}#/cong-dong?post=${postId}`;

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(url).catch(() => {});
                    }

                    showToast('Đã sao chép liên kết bài viết.', 'success');
                    return;
                }

                // More Options Handler
                const moreBtn = e.target.closest('.btn-more-options');
                if (moreBtn) {
                    showToast('Tùy chọn bài viết (Demo)', 'info');
                    return;
                }
            });
        }

        // Pagination Container Event Delegation
        if (paginationContainer) {
            paginationContainer.addEventListener('click', (e) => {
                const prevBtn = e.target.closest('#btn-prev-page');
                if (prevBtn && !prevBtn.disabled) {
                    goToPage(currentPage - 1);
                    return;
                }

                const nextBtn = e.target.closest('#btn-next-page');
                if (nextBtn && !nextBtn.disabled) {
                    goToPage(currentPage + 1);
                    return;
                }

                const pageBtn = e.target.closest('.page-num-btn');
                if (pageBtn) {
                    const page = parseInt(pageBtn.getAttribute('data-page'), 10);
                    if (page && page !== currentPage) {
                        goToPage(page);
                    }
                    return;
                }
            });
        }

        // Left Sidebar Filter Navigation Handlers
        const filterButtons = document.querySelectorAll('.filter-nav-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.getAttribute('data-filter');
                currentFilter = filterType;

                // Update Active Tab Style
                filterButtons.forEach(b => {
                    b.className = "filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer";
                    const chevron = b.querySelector('.fa-chevron-right');
                    if (chevron) chevron.className = "fa-solid fa-chevron-right text-[10px] opacity-40";
                });

                btn.className = "filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white shadow-sm transition-all flex items-center justify-between cursor-pointer";
                const activeChevron = btn.querySelector('.fa-chevron-right');
                if (activeChevron) activeChevron.className = "fa-solid fa-chevron-right text-[10px]";

                // Filter logic
                if (filterType === 'all') {
                    currentFilteredPosts = [...allPosts];
                    if (feedFilterTitle) feedFilterTitle.textContent = '✨ Tất cả bài viết';
                } else if (filterType === 'newest') {
                    currentFilteredPosts = [...allPosts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    if (feedFilterTitle) feedFilterTitle.textContent = '🕐 Mới nhất';
                } else if (filterType === 'liked') {
                    currentFilteredPosts = [...allPosts].sort((a, b) => b.likes - a.likes);
                    if (feedFilterTitle) feedFilterTitle.textContent = '❤️ Được yêu thích';
                } else if (filterType === 'trending') {
                    currentFilteredPosts = [...allPosts].filter(p => p.likes >= 200);
                    if (feedFilterTitle) feedFilterTitle.textContent = '🔥 Đang nổi bật';
                } else if (filterType === 'random') {
                    currentFilteredPosts = [...allPosts].sort(() => Math.random() - 0.5);
                    if (feedFilterTitle) feedFilterTitle.textContent = '🎲 Khám phá ngẫu nhiên';
                }

                // Reset page to 1 on filter switch
                currentPage = 1;
                renderPosts();
                scrollToFeed();
                showToast(`Đã lọc: ${btn.querySelector('span span:last-child')?.textContent || 'Danh sách'}`, 'info');
            });
        });

        // Initial Renders
        renderPosts();
        renderSidebars();
    }
};

export default Community;

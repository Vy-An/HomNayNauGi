import { fetchAPI, BACKEND_URL } from '../../api.js';
import Popup from '../../components/Popup.js';
import { renderCommunityPostSkeleton } from '../../components/Skeleton.js';

const INITIAL_BATCH = 6;
const LOAD_MORE_BATCH = 4;

const Community = {
    render: async () => {
        return `
        <div class="cozy-kitchen-bg min-h-screen text-text-main font-sans selection:bg-primary/20 selection:text-primary pb-16">
            <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-2">
                <div class="relative bg-gradient-to-r from-[#FFFDF9] via-[#FBF8F1] to-[#F5EBD4]/75 rounded-[24px] p-5 sm:p-7 border border-beige-border/80 shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5">
                    <div class="absolute -top-10 -left-10 w-44 h-44 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div class="absolute -bottom-8 right-16 w-44 h-44 bg-accent/15 rounded-full blur-2xl pointer-events-none"></div>

                    <div class="relative z-10 max-w-2xl space-y-2">
                        <div class="inline-flex items-center gap-1.5 bg-primary-subtle border border-primary-light/30 px-3 py-0.5 rounded-full text-xs font-bold text-primary shadow-sm">
                            <span>🍲</span>
                            <span>Cộng đồng Ẩm thực & Bếp nhà</span>
                        </div>

                        <h1 class="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-text-main tracking-tight leading-snug">
                            Cộng đồng <span class="text-primary font-caveat text-3xl sm:text-4xl lg:text-[42px] font-bold inline-block">Hôm Nay Nấu Gì?</span>
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

            <main class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                    <aside class="lg:col-span-3 space-y-4.5 order-2 lg:order-1 lg:sticky lg:top-[80px] lg:self-start lg:max-h-[calc(100vh-92px)] lg:overflow-y-auto">
                        <div class="bg-white rounded-[20px] border border-beige-border/80 p-4.5 shadow-sm">
                            <div class="flex items-center gap-2.5 mb-3 pb-2 border-b border-[#F0EBE0]">
                                <span class="w-6 h-6 rounded-lg bg-primary-subtle text-primary flex items-center justify-center text-xs">
                                    <i class="fa-solid fa-compass"></i>
                                </span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Khám phá
                                </h2>
                            </div>

                            <nav class="space-y-1.5" id="category-navigation">
                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white shadow-sm transition-all flex items-center justify-between cursor-pointer" data-filter="all" data-icon-class="bg-emerald-50 text-emerald-600">
                                    <span class="flex items-center gap-2.5">
                                        <span class="filter-icon-box w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs transition-colors">
                                            <i class="fa-solid fa-border-all"></i>
                                        </span>
                                        <span class="filter-btn-title">Tất cả bài viết</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="newest" data-icon-class="bg-blue-50 text-blue-600">
                                    <span class="flex items-center gap-2.5">
                                        <span class="filter-icon-box w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs transition-colors">
                                            <i class="fa-solid fa-clock"></i>
                                        </span>
                                        <span class="filter-btn-title">Mới nhất</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="liked" data-icon-class="bg-rose-50 text-rose-500">
                                    <span class="flex items-center gap-2.5">
                                        <span class="filter-icon-box w-6 h-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center text-xs transition-colors">
                                            <i class="fa-solid fa-heart"></i>
                                        </span>
                                        <span class="filter-btn-title">Được yêu thích</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="trending" data-icon-class="bg-amber-50 text-amber-500">
                                    <span class="flex items-center gap-2.5">
                                        <span class="filter-icon-box w-6 h-6 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center text-xs transition-colors">
                                            <i class="fa-solid fa-fire"></i>
                                        </span>
                                        <span class="filter-btn-title">Đang nổi bật</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>

                                <button class="filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer" data-filter="random" data-icon-class="bg-purple-50 text-purple-600">
                                    <span class="flex items-center gap-2.5">
                                        <span class="filter-icon-box w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-xs transition-colors">
                                            <i class="fa-solid fa-dice"></i>
                                        </span>
                                        <span class="filter-btn-title">Khám phá ngẫu nhiên</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
                                </button>
                            </nav>
                        </div>

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
                                    Để Hôm Nay Nấu Gì? chọn giúp bạn nhé.
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

                    <section class="lg:col-span-6 space-y-5 order-1 lg:order-2" id="center-feed-column">
                        <div id="post-composer" class="bg-white rounded-[20px] border border-beige-border/80 p-3.5 sm:p-5 shadow-sm">
                            <div class="flex items-center gap-3 mb-3">
                                <img id="composer-user-avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" alt="Bạn" class="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20">
                                <div>
                                    <h4 id="composer-user-name" class="font-bold text-xs sm:text-sm text-text-main">Hôm nay bạn vừa nấu món gì?</h4>
                                    <p class="text-[11px] text-text-muted font-medium">Nhật ký món ngon từ căn bếp của bạn</p>
                                </div>
                            </div>

                            <form id="form-create-post" class="space-y-2.5">
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        id="post-title-input" 
                                        placeholder="Tiêu đề bài viết (không bắt buộc)..." 
                                        class="w-full bg-[#FCFAF6] rounded-xl px-3 py-2 border border-[#DFD5BE] focus:bg-white text-text-main placeholder:text-gray-400 font-semibold text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all mb-2"
                                    />
                                    <textarea 
                                        id="post-content-input" 
                                        rows="3" 
                                        placeholder="Chia sẻ một chút về món ăn hôm nay..."
                                        class="w-full bg-[#FCFAF6] rounded-xl p-3 border border-[#DFD5BE] focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div id="attached-food-pill" class="hidden inline-flex items-center gap-2 bg-primary-subtle border border-primary-light/40 text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                    <i class="fa-solid fa-utensils text-accent text-xs"></i>
                                    <span id="attached-food-name">Món ăn</span>
                                    <button type="button" id="btn-remove-attached-food" class="hover:text-red-500 transition-colors ml-1" title="Gỡ món ăn">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <div id="image-preview-container" class="hidden relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video max-h-44">
                                    <img id="image-preview-img" src="" alt="Preview" class="w-full h-full object-cover">
                                    <button type="button" id="btn-remove-preview-image" class="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-xs transition-colors" title="Xóa ảnh">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>

                                <div class="flex items-center justify-between pt-2.5 border-t border-[#F0EBE0] gap-1.5 sm:gap-2">
                                    <div class="flex items-center gap-1 sm:gap-1.5 shrink-0">
                                        <input type="file" id="post-image-file" accept="image/*" class="hidden">

                                        <button 
                                            type="button" 
                                            id="btn-trigger-upload" 
                                            class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary hover:bg-primary-subtle transition-colors cursor-pointer whitespace-nowrap shrink-0"
                                        >
                                            <i class="fa-solid fa-camera text-primary text-xs sm:text-sm"></i>
                                            <span class="whitespace-nowrap">Thêm ảnh</span>
                                        </button>

                                        <div class="relative shrink-0">
                                            <button 
                                                type="button" 
                                                id="btn-trigger-attach-food" 
                                                class="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-text-muted hover:text-primary hover:bg-primary-subtle transition-colors cursor-pointer whitespace-nowrap shrink-0"
                                            >
                                                <i class="fa-solid fa-bowl-food text-accent text-xs sm:text-sm"></i>
                                                <span class="whitespace-nowrap">Gắn món ăn</span>
                                            </button>

                                            <div id="attach-food-dropdown" class="hidden absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-beige-border p-2 z-30 max-h-56 overflow-y-auto">
                                                <div class="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-text-muted border-b border-gray-100">
                                                    Chọn món ăn liên quan
                                                </div>
                                                <div id="attach-food-dropdown-list" class="space-y-1 mt-1">
                                                    <div class="p-2 text-xs text-text-muted text-center">Đang tải món ăn...</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        id="btn-submit-post" 
                                        class="px-3 sm:px-4.5 py-1.5 sm:py-2 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-primary/20 hover:shadow-lg transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
                                    >
                                        <span class="whitespace-nowrap">Đăng bài</span>
                                        <span class="text-xs">→</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div id="community-feed-header" class="flex items-center justify-between text-xs text-text-muted font-semibold px-1">
                            <span id="feed-filter-title" class="inline-flex items-center"><i class="fa-solid fa-border-all mr-1.5 text-primary"></i> Tất cả bài viết</span>
                            <span id="feed-post-count-badge" class="bg-white border border-beige-border px-2.5 py-0.5 rounded-full text-[11px] inline-flex items-center"><span class="inline-block w-16 h-2.5 rounded skeleton-shimmer"></span></span>
                        </div>

                        <div id="community-feed" class="space-y-5">
                            ${renderCommunityPostSkeleton(3)}
                        </div>

                        <div id="community-load-more" class="py-4 flex flex-col items-center justify-center"></div>
                    </section>

                    <aside class="lg:col-span-3 space-y-4.5 order-3 lg:sticky lg:top-[80px] lg:self-start lg:max-h-[calc(100vh-92px)] lg:overflow-y-auto">
                        <div class="bg-white rounded-[20px] border border-beige-border/80 p-4.5 shadow-sm">
                            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-[#F0EBE0]">
                                <span class="w-5 h-5 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center text-[10px]">
                                    <i class="fa-solid fa-heart"></i>
                                </span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Được yêu thích
                                </h2>
                            </div>

                            <div class="space-y-3" id="popular-dishes-list"></div>
                        </div>

                        <div class="bg-white rounded-[20px] border border-beige-border/80 p-4.5 shadow-sm">
                            <div class="flex items-center gap-2 mb-3 pb-2 border-b border-[#F0EBE0]">
                                <span class="w-5 h-5 rounded-md bg-green-100 text-green-700 flex items-center justify-center text-[10px]">
                                    <i class="fa-solid fa-clock"></i>
                                </span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Mới nhất
                                </h2>
                            </div>

                            <div class="space-y-3" id="recent-posts-list"></div>
                        </div>

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
                                <span>— Bếp Hôm Nay Nấu Gì?</span>
                                <span>🍲</span>
                            </div>
                        </div>
                    </aside>
                </div>
            <!-- Modal Báo cáo bài viết -->
            <div id="post-report-modal" class="fixed inset-0 bg-black/50 backdrop-blur-xs hidden items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden animate-scaleIn">
                    <!-- Header -->
                    <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-rose-50/60">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-base shrink-0">
                                <i class="fa-solid fa-triangle-exclamation"></i>
                            </div>
                            <div>
                                <h3 id="report-modal-title" class="text-base font-bold text-text-main">Báo cáo bài viết</h3>
                                <p class="text-xs text-text-muted">Nội dung sẽ được gửi tới Ban quản trị phê duyệt</p>
                            </div>
                        </div>
                        <button type="button" id="btn-close-report-modal" class="w-8 h-8 rounded-full hover:bg-gray-200/60 text-text-muted flex items-center justify-center transition cursor-pointer">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <!-- Form -->
                    <form id="post-report-form" class="p-5 space-y-4">
                        <input type="hidden" id="report-target-type" value="post">
                        <input type="hidden" id="report-post-id" value="">
                        
                        <div>
                            <label class="block text-xs font-bold text-text-main uppercase tracking-wider mb-2">
                                Lý do báo cáo vi phạm <span class="text-rose-500">*</span>
                            </label>
                            <div class="space-y-2 text-xs">
                                <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30 cursor-pointer transition">
                                    <input type="radio" name="report_reason" value="Spam hoặc quảng cáo không phù hợp" checked class="accent-rose-600">
                                    <span class="font-medium text-text-main">Spam hoặc quảng cáo không phù hợp</span>
                                </label>
                                <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30 cursor-pointer transition">
                                    <input type="radio" name="report_reason" value="Ngôn từ thù ghét, quấy rối hoặc xúc phạm" class="accent-rose-600">
                                    <span class="font-medium text-text-main">Ngôn từ thù ghét, quấy rối hoặc xúc phạm</span>
                                </label>
                                <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30 cursor-pointer transition">
                                    <input type="radio" name="report_reason" value="Nội dung phản cảm, độc hại hoặc bạo lực" class="accent-rose-600">
                                    <span class="font-medium text-text-main">Nội dung phản cảm, độc hại hoặc bạo lực</span>
                                </label>
                                <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30 cursor-pointer transition">
                                    <input type="radio" name="report_reason" value="Thông tin sai lệch về an toàn thực phẩm" class="accent-rose-600">
                                    <span class="font-medium text-text-main">Thông tin sai lệch về an toàn thực phẩm</span>
                                </label>
                                <label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 hover:border-rose-300 hover:bg-rose-50/30 cursor-pointer transition">
                                    <input type="radio" name="report_reason" value="Lý do khác" class="accent-rose-600">
                                    <span class="font-medium text-text-main">Lý do khác</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-text-main mb-1.5">
                                Chi tiết bổ sung (tùy chọn)
                            </label>
                            <textarea id="report-description" rows="3" placeholder="Nhập thêm chi tiết vi phạm để Admin dễ kiểm tra..." class="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none"></textarea>
                        </div>

                        <div class="pt-2 border-t border-gray-100 flex items-center justify-end gap-2.5">
                            <button type="button" id="btn-cancel-report" class="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 text-text-muted hover:bg-gray-100 transition cursor-pointer">
                                Hủy bỏ
                            </button>
                            <button type="submit" id="btn-submit-report" class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow transition flex items-center gap-1.5 cursor-pointer">
                                <i class="fa-solid fa-paper-plane text-[10px]"></i>
                                <span>Gửi báo cáo</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="community-toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"></div>
        </div>
        `;
    },

    afterRender: async () => {
        let allPosts = [];
        let currentFilteredPosts = [];
        let availableFoodsList = [];
        let displayedCount = INITIAL_BATCH;
        let isLoading = false;
        let infiniteScrollObserver = null;

        let selectedFoodId = null;
        let selectedFoodName = null;
        let uploadedImageSrc = null;
        let currentFilter = 'all';
        let isSubmittingPost = false;

        const formCreatePost = document.getElementById('form-create-post');
        const postTitleInput = document.getElementById('post-title-input');
        const postContentInput = document.getElementById('post-content-input');
        const postImageFileInput = document.getElementById('post-image-file');
        const btnTriggerUpload = document.getElementById('btn-trigger-upload');
        const imagePreviewContainer = document.getElementById('image-preview-container');
        const imagePreviewImg = document.getElementById('image-preview-img');
        const btnRemovePreviewImage = document.getElementById('btn-remove-preview-image');
        const btnTriggerAttachFood = document.getElementById('btn-trigger-attach-food');
        const attachFoodDropdown = document.getElementById('attach-food-dropdown');
        const attachFoodDropdownList = document.getElementById('attach-food-dropdown-list');
        const attachedFoodPill = document.getElementById('attached-food-pill');
        const attachedFoodNameEl = document.getElementById('attached-food-name');
        const btnRemoveAttachedFood = document.getElementById('btn-remove-attached-food');
        const btnSubmitPost = document.getElementById('btn-submit-post');
        const feedContainer = document.getElementById('community-feed');
        const loadMoreSentinel = document.getElementById('community-load-more');
        const feedFilterTitle = document.getElementById('feed-filter-title');
        const feedPostCountBadge = document.getElementById('feed-post-count-badge');
        const btnScrollToComposer = document.getElementById('btn-scroll-to-composer');
        const popularDishesList = document.getElementById('popular-dishes-list');
        const recentPostsList = document.getElementById('recent-posts-list');
        const composerUserAvatar = document.getElementById('composer-user-avatar');
        const composerUserName = document.getElementById('composer-user-name');

        const currentUser = (() => {
            try {
                return JSON.parse(localStorage.getItem('auth_user') || 'null');
            } catch {
                return null;
            }
        })();

        if (currentUser) {
            if (composerUserName) composerUserName.textContent = currentUser.name || currentUser.username || 'Bếp của bạn';
            if (composerUserAvatar && currentUser.avatar) composerUserAvatar.src = currentUser.avatar;
        }

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

            toast.innerHTML = `${icon}<span>${message}</span>`;
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

        const formatTimeAgo = (dateStr) => {
            if (!dateStr) return 'Vừa xong';
            const past = new Date(dateStr).getTime();
            const now = Date.now();
            const diffSec = Math.max(0, Math.floor((now - past) / 1000));
            if (diffSec < 60) return 'Vừa xong';
            const diffMin = Math.floor(diffSec / 60);
            if (diffMin < 60) return `${diffMin} phút trước`;
            const diffHour = Math.floor(diffMin / 60);
            if (diffHour < 24) return `${diffHour} giờ trước`;
            const diffDay = Math.floor(diffHour / 24);
            if (diffDay < 30) return `${diffDay} ngày trước`;
            return new Date(dateStr).toLocaleDateString('vi-VN');
        };

        const createPostCardHTML = (post, isFeatured = false) => {
            const hasImage = !!post.image;
            const hasFood = !!post.foodName;
            const authorName = post.author?.name || 'Thành viên Bếp';
            const authorAvatar = post.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
            const formattedTime = formatTimeAgo(post.created_at);

            return `
                <article class="bg-white rounded-[20px] border border-beige-border/80 shadow-sm hover:shadow-md transition-all duration-300 p-4.5 sm:p-5 group ${isFeatured ? 'ring-1 ring-primary/20' : ''}" id="post-card-${post.id_post}">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <img src="${authorAvatar}" alt="${authorName}" class="w-10 h-10 rounded-full object-cover ring-2 ring-primary/15 shadow-sm" loading="lazy" decoding="async">
                                <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <div class="flex items-center gap-1.5">
                                    <h3 class="font-extrabold text-xs sm:text-sm text-text-main hover:text-primary transition-colors cursor-pointer">${authorName}</h3>
                                    ${isFeatured ? '<span class="bg-accent/15 text-accent-hover text-[10px] font-bold px-1.5 py-0.2 rounded-full">Nổi bật</span>' : ''}
                                </div>
                                <p class="text-[11px] text-text-muted font-medium mt-0.5 flex items-center gap-1">
                                    <i class="fa-regular fa-clock text-[10px]"></i>
                                    <span>${formattedTime}</span>
                                </p>
                            </div>
                        </div>

                        <div class="relative post-options-container">
                            <button class="btn-more-options text-text-muted hover:text-text-main p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer" data-id="${post.id_post}" title="Tùy chọn">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <div class="post-options-dropdown hidden absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-30">
                                <button type="button" class="btn-open-report w-full px-3.5 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition cursor-pointer" data-id="${post.id_post}">
                                    <i class="fa-regular fa-flag text-rose-500 text-sm"></i>
                                    <span>Báo cáo bài viết</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    ${post.title ? `<h4 class="text-sm font-extrabold text-text-main mb-1.5">${post.title}</h4>` : ''}

                    <p class="text-text-main text-xs sm:text-sm leading-relaxed mb-3 font-normal whitespace-pre-line">${post.content}</p>

                    ${hasImage ? `
                    <div class="rounded-xl overflow-hidden mb-3.5 bg-cream-soft border border-[#EFE9DC] relative group/img aspect-[16/10]">
                        <img 
                            src="${post.image}" 
                            alt="${post.foodName || post.title || 'Món ăn gia đình'}" 
                            class="w-full h-full object-cover object-center group-hover/img:scale-[1.02] transition-transform duration-500 ease-out" 
                            loading="lazy"
                            decoding="async"
                        />
                        ${hasFood ? `
                        <div class="absolute bottom-2.5 left-2.5 bg-black/65 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm cursor-pointer hover:bg-black/80 transition-colors" onclick="window.location.hash='#/mon-an/${post.id_food}'">
                            <i class="fa-solid fa-utensils text-accent-light text-[10px]"></i>
                            <span>${post.foodName}</span>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}

                    <div class="flex items-center justify-between pt-2.5 border-t border-[#F0EBE0] text-text-muted">
                        <div class="flex items-center gap-1.5 sm:gap-2">
                            <button 
                                class="btn-like inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-rose-50 text-text-muted hover:text-rose-600 transition-all font-bold text-xs cursor-pointer active:scale-95" 
                                data-id="${post.id_post}" 
                                data-liked="${post.liked}" 
                                data-count="${post.likes}"
                            >
                                <i class="${post.liked ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'} text-sm transition-colors"></i>
                                <span class="like-count ${post.liked ? 'text-rose-600 font-extrabold' : ''}">${post.likes}</span>
                                <span class="font-semibold text-[11px] text-text-muted hidden sm:inline">lượt thích</span>
                            </button>

                            <button 
                                class="btn-toggle-comments inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary-subtle text-text-muted hover:text-primary transition-all font-bold text-xs cursor-pointer active:scale-95" 
                                data-id="${post.id_post}"
                            >
                                <i class="fa-regular fa-message text-sm"></i>
                                <span class="comments-count font-bold">${post.comments || 0}</span>
                                <span class="font-semibold text-[11px] text-text-muted hidden sm:inline">bình luận</span>
                            </button>
                        </div>

                        <button 
                            class="btn-share inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-primary-subtle text-text-muted hover:text-primary transition-all font-bold text-xs cursor-pointer active:scale-95" 
                            data-id="${post.id_post}"
                            data-title="${encodeURIComponent(post.title || 'Bài viết món ngon')}"
                        >
                            <i class="fa-solid fa-share-nodes text-sm"></i>
                            <span class="font-semibold">Chia sẻ</span>
                        </button>
                    </div>

                    <div id="comments-section-${post.id_post}" class="hidden pt-3 mt-3 border-t border-[#F0EBE0]/80 space-y-3">
                        <div class="comments-composer flex items-start gap-2.5">
                            <img src="${currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`}" alt="Avatar" class="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-beige-border" loading="lazy">
                            <div class="flex-1 space-y-1.5">
                                <div class="relative">
                                    <textarea 
                                        id="comment-input-${post.id_post}" 
                                        rows="2" 
                                        placeholder="${currentUser ? 'Viết bình luận hoặc cảm nghĩ của bạn...' : 'Vui lòng đăng nhập để bình luận...'}" 
                                        class="w-full text-xs sm:text-sm bg-[#FAF8F5] border border-beige-border rounded-xl px-3 py-2 text-text-main focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none resize-none transition-all placeholder:text-text-muted/70"
                                        ${currentUser ? '' : 'readonly'}
                                    ></textarea>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span class="text-[11px] text-text-muted">Nhấn Gửi để đăng bình luận</span>
                                    ${currentUser ? `
                                        <button 
                                            type="button" 
                                            class="btn-submit-comment inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary hover:bg-[#1B4633] text-white font-bold text-xs shadow-2xs cursor-pointer transition-colors"
                                            data-id="${post.id_post}"
                                        >
                                            <i class="fa-solid fa-paper-plane text-[10px]"></i>
                                            <span>Gửi</span>
                                        </button>
                                    ` : `
                                        <a href="#/login" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-primary-deep font-bold text-xs transition-colors">
                                            <span>Đăng nhập để gửi</span>
                                        </a>
                                    `}
                                </div>
                            </div>
                        </div>

                        <div id="comments-list-${post.id_post}" class="space-y-2.5 pt-1">
                            <div class="py-3 text-center text-xs text-text-muted">
                                <i class="fa-solid fa-spinner animate-spin text-primary text-sm mr-1.5"></i>
                                <span>Đang tải bình luận...</span>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        };

        const createSkeletonCardHTML = () => {
            return renderCommunityPostSkeleton(1);
        };

        const updateFeedBadge = () => {
            if (feedPostCountBadge) {
                const total = currentFilteredPosts.length;
                const visible = Math.min(displayedCount, total);
                feedPostCountBadge.textContent = `Hiển thị ${visible}/${total} bài viết`;
            }
        };

        const updateSentinelStatus = () => {
            if (!loadMoreSentinel) return;

            const total = currentFilteredPosts.length;
            if (total === 0) {
                loadMoreSentinel.innerHTML = '';
                return;
            }

            if (displayedCount >= total) {
                loadMoreSentinel.innerHTML = `
                    <div class="text-center py-5 text-text-muted text-xs font-medium w-full">
                        <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-beige-border px-4 py-2 rounded-full shadow-sm text-text-muted">
                            <span class="text-accent">✨</span>
                            <span>Bạn đã xem hết bài viết trong cộng đồng.</span>
                        </div>
                    </div>
                `;
            } else {
                loadMoreSentinel.innerHTML = `
                    <div class="text-center py-3 text-text-muted text-xs font-medium">
                        <span class="inline-flex items-center gap-2 text-text-muted opacity-70">
                            <i class="fa-solid fa-angles-down animate-bounce text-xs text-primary"></i>
                            <span>Cuộn xuống để xem thêm món ngon</span>
                        </span>
                    </div>
                `;
            }
        };

        const renderInitialPosts = () => {
            if (!feedContainer) return;

            const totalPosts = currentFilteredPosts.length;
            updateFeedBadge();

            if (totalPosts === 0) {
                feedContainer.innerHTML = `
                    <div class="bg-white rounded-[20px] border border-beige-border/80 p-8 text-center shadow-sm">
                        <div class="w-16 h-16 rounded-full bg-cream-soft flex items-center justify-center text-2xl mx-auto mb-3 text-primary">
                            🍽️
                        </div>
                        <h3 class="text-base font-extrabold text-text-main mb-1">Chưa có bài viết nào</h3>
                        <p class="text-xs text-text-muted mb-4">Hãy là người đầu tiên chia sẻ mâm cơm ấm cúng hôm nay!</p>
                        <button id="btn-empty-composer" class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs px-4 py-2 rounded-full transition-all cursor-pointer">
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

                if (loadMoreSentinel) loadMoreSentinel.innerHTML = '';
                return;
            }

            const initialSlice = currentFilteredPosts.slice(0, displayedCount);
            feedContainer.innerHTML = initialSlice.map((post, index) => {
                const isFeatured = (index === 0 && currentFilter === 'all');
                return createPostCardHTML(post, isFeatured);
            }).join('');

            updateSentinelStatus();
        };

        const loadMorePosts = () => {
            if (isLoading) return;
            const total = currentFilteredPosts.length;
            if (displayedCount >= total) return;

            isLoading = true;

            if (loadMoreSentinel) {
                loadMoreSentinel.innerHTML = `
                    <div class="w-full space-y-4">
                        ${createSkeletonCardHTML()}
                        <div class="flex items-center justify-center gap-2 text-xs font-bold text-primary py-2">
                            <i class="fa-solid fa-spinner animate-spin text-sm text-accent"></i>
                            <span>Đang khám phá thêm món ngon...</span>
                        </div>
                    </div>
                `;
            }

            setTimeout(() => {
                const nextBatch = currentFilteredPosts.slice(displayedCount, displayedCount + LOAD_MORE_BATCH);
                
                if (feedContainer && nextBatch.length > 0) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = nextBatch.map(post => createPostCardHTML(post)).join('');
                    
                    while (tempDiv.firstChild) {
                        feedContainer.appendChild(tempDiv.firstChild);
                    }
                }

                displayedCount += nextBatch.length;
                isLoading = false;
                updateFeedBadge();
                updateSentinelStatus();
            }, 300);
        };

        const setupInfiniteScroll = () => {
            if (infiniteScrollObserver) {
                infiniteScrollObserver.disconnect();
            }

            if (!loadMoreSentinel) return;

            infiniteScrollObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    if (!isLoading && displayedCount < currentFilteredPosts.length) {
                        loadMorePosts();
                    }
                }
            }, {
                root: null,
                rootMargin: '350px 0px',
                threshold: 0.1
            });

            infiniteScrollObserver.observe(loadMoreSentinel);
        };

        const renderSidebars = () => {
            if (popularDishesList) {
                const popularSorted = [...allPosts]
                    .filter(p => !!p.foodName)
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 3);

                popularDishesList.innerHTML = popularSorted.length > 0 ? popularSorted.map(p => `
                    <div class="flex items-center gap-2.5 group cursor-pointer" onclick="window.location.hash='#/mon-an/${p.id_food}'">
                        <img src="${p.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}" alt="${p.foodName}" class="w-11 h-11 rounded-xl object-cover ring-1 ring-black/5 flex-shrink-0 group-hover:scale-105 transition-transform" loading="lazy">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-xs text-text-main truncate group-hover:text-primary transition-colors">${p.foodName}</h4>
                            <p class="text-[11px] text-rose-600 font-bold mt-0.5 flex items-center gap-1">
                                <i class="fa-solid fa-heart text-[10px]"></i>
                                <span>${p.likes} lượt thích</span>
                            </p>
                        </div>
                    </div>
                `).join('') : '<p class="text-xs text-text-muted">Chưa có bài viết món ăn nào</p>';
            }

            if (recentPostsList) {
                const recentSorted = [...allPosts]
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 3);

                recentPostsList.innerHTML = recentSorted.length > 0 ? recentSorted.map(p => `
                    <div class="flex items-center gap-2.5 group cursor-pointer" onclick="document.getElementById('post-card-${p.id_post}')?.scrollIntoView({ behavior: 'smooth', block: 'center' })">
                        <img src="${p.image || p.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" alt="${p.title || p.author?.name}" class="w-11 h-11 rounded-xl object-cover ring-1 ring-black/5 flex-shrink-0 group-hover:scale-105 transition-transform" loading="lazy">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-xs text-text-main truncate group-hover:text-primary transition-colors">${p.title || p.author?.name || 'Bài viết mới'}</h4>
                            <p class="text-[10px] text-text-muted font-medium mt-0.5 flex items-center gap-1">
                                <i class="fa-regular fa-clock text-[9px]"></i>
                                <span>${formatTimeAgo(p.created_at)}</span>
                            </p>
                        </div>
                    </div>
                `).join('') : '<p class="text-xs text-text-muted">Chưa có bài viết nào</p>';
            }
        };

        const loadFoodsForDropdown = async () => {
            try {
                const res = await fetchAPI('/foods?limit=50');
                const foods = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
                availableFoodsList = foods.map(f => ({
                    id: f.id_food || f.id,
                    name: f.name,
                    image: f.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'
                }));

                if (attachFoodDropdownList) {
                    if (availableFoodsList.length === 0) {
                        attachFoodDropdownList.innerHTML = '<div class="p-2 text-xs text-text-muted text-center">Không có món ăn nào</div>';
                    } else {
                        attachFoodDropdownList.innerHTML = availableFoodsList.map(f => `
                            <button type="button" class="btn-select-food w-full text-left p-1.5 rounded-xl hover:bg-primary-subtle flex items-center gap-2 text-xs font-bold text-text-main transition-colors cursor-pointer" data-id="${f.id}" data-name="${f.name}">
                                <img src="${f.image}" class="w-7 h-7 rounded-lg object-cover" loading="lazy">
                                <span class="truncate">${f.name}</span>
                            </button>
                        `).join('');

                        attachFoodDropdownList.querySelectorAll('.btn-select-food').forEach(btn => {
                            btn.addEventListener('click', () => {
                                selectedFoodId = parseInt(btn.getAttribute('data-id'), 10);
                                selectedFoodName = btn.getAttribute('data-name');

                                if (attachedFoodPill && attachedFoodNameEl) {
                                    attachedFoodNameEl.textContent = selectedFoodName;
                                    attachedFoodPill.classList.remove('hidden');
                                }

                                if (attachFoodDropdown) attachFoodDropdown.classList.add('hidden');
                                showToast(`Đã gắn món: ${selectedFoodName}`, 'info');
                            });
                        });
                    }
                }
            } catch {
                if (attachFoodDropdownList) {
                    attachFoodDropdownList.innerHTML = '<div class="p-2 text-xs text-red-500 text-center">Không tải được danh sách món</div>';
                }
            }
        };

        const loadPostsFromAPI = async (filter = 'all') => {
            if (feedContainer) {
                feedContainer.innerHTML = createSkeletonCardHTML() + createSkeletonCardHTML();
            }

            try {
                const res = await fetchAPI(`/posts?filter=${encodeURIComponent(filter)}&limit=100`);
                const posts = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
                allPosts = posts.map(p => ({
                    id_post: p.id_post || p.id,
                    id_user: p.id_user,
                    id_food: p.id_food,
                    title: p.title || '',
                    content: p.content || '',
                    image: p.image || '',
                    foodName: p.food?.name || p.foodName || '',
                    author: {
                        name: p.user?.name || p.author?.name || 'Ẩn danh',
                        avatar: p.user?.avatar || p.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                    },
                    created_at: p.created_at,
                    likes: Number(p.likesCount ?? p.likes_count ?? p._count?.post_likes ?? (typeof p.likes === 'number' ? p.likes : 0)) || 0,
                    liked: Boolean(p.isLiked),
                    comments: Number(p.commentsCount ?? p.comments ?? p._count?.post_comments ?? 0) || 0
                }));

                currentFilteredPosts = [...allPosts];
                displayedCount = INITIAL_BATCH;
                renderInitialPosts();
                setupInfiniteScroll();
                renderSidebars();

                const hash = window.location.hash || '';
                const queryIndex = hash.indexOf('?');
                if (queryIndex !== -1) {
                    const params = new URLSearchParams(hash.slice(queryIndex + 1));
                    const targetPostId = params.get('post');
                    if (targetPostId) {
                        setTimeout(() => {
                            const targetEl = document.getElementById(`post-card-${targetPostId}`);
                            if (targetEl) {
                                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                targetEl.classList.add('ring-2', 'ring-primary');
                                setTimeout(() => targetEl.classList.remove('ring-2', 'ring-primary'), 2500);
                            }
                        }, 400);
                    }
                }
            } catch {
                if (feedContainer) {
                    feedContainer.innerHTML = `
                        <div class="bg-white rounded-[20px] border border-red-200 p-6 text-center shadow-sm">
                            <p class="text-sm font-bold text-red-600 mb-2">Không thể tải bài viết từ máy chủ.</p>
                            <button id="btn-retry-posts" class="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full">Thử lại</button>
                        </div>
                    `;
                    document.getElementById('btn-retry-posts')?.addEventListener('click', () => loadPostsFromAPI(filter));
                }
            }
        };

        if (btnScrollToComposer) {
            btnScrollToComposer.addEventListener('click', () => {
                const composer = document.getElementById('post-composer');
                if (composer) {
                    composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (postContentInput) postContentInput.focus();
                }
            });
        }

        if (btnTriggerUpload && postImageFileInput) {
            btnTriggerUpload.addEventListener('click', () => {
                postImageFileInput.click();
            });

            postImageFileInput.addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    if (file.size > 8 * 1024 * 1024) {
                        showToast('Ảnh quá lớn. Vui lòng chọn ảnh dưới 8MB.', 'error');
                        return;
                    }
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

        if (btnRemovePreviewImage) {
            btnRemovePreviewImage.addEventListener('click', () => {
                uploadedImageSrc = null;
                if (postImageFileInput) postImageFileInput.value = '';
                if (imagePreviewContainer) imagePreviewContainer.classList.add('hidden');
                if (imagePreviewImg) imagePreviewImg.src = '';
            });
        }

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
        }

        if (btnRemoveAttachedFood) {
            btnRemoveAttachedFood.addEventListener('click', () => {
                selectedFoodId = null;
                selectedFoodName = null;
                if (attachedFoodPill) attachedFoodPill.classList.add('hidden');
            });
        }

        if (formCreatePost) {
            formCreatePost.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (isSubmittingPost) return;

                const content = postContentInput?.value.trim() || '';
                const title = postTitleInput?.value.trim() || '';

                if (!content && !uploadedImageSrc) {
                    showToast('Vui lòng nhập nội dung hoặc thêm ảnh món ăn.', 'warning');
                    postContentInput?.focus();
                    return;
                }

                const token = localStorage.getItem('auth_token');
                if (!token) {
                    showToast('Vui lòng đăng nhập để đăng bài viết!', 'warning');
                    setTimeout(() => {
                        window.location.hash = '#/dang-nhap';
                    }, 1200);
                    return;
                }

                isSubmittingPost = true;
                if (btnSubmitPost) {
                    btnSubmitPost.disabled = true;
                    btnSubmitPost.innerHTML = '<span class="whitespace-nowrap">Đang gửi...</span><i class="fa-solid fa-spinner animate-spin text-xs"></i>';
                }

                try {
                    const payload = {
                        content: content || 'Mâm cơm ấm cúng!',
                        title: title || (selectedFoodName ? `Món ngon: ${selectedFoodName}` : 'Bếp nhà hôm nay'),
                        image: uploadedImageSrc || null,
                        id_food: selectedFoodId || null
                    };

                    const response = await fetchAPI('/posts', {
                        method: 'POST',
                        body: JSON.stringify(payload)
                    });

                    if (response?.success && response.data) {
                        const newPostData = response.data;
                        const isPending = newPostData.status === 'pending';

                        formCreatePost.reset();
                        uploadedImageSrc = null;
                        selectedFoodId = null;
                        selectedFoodName = null;
                        if (imagePreviewContainer) imagePreviewContainer.classList.add('hidden');
                        if (imagePreviewImg) imagePreviewImg.src = '';
                        if (attachedFoodPill) attachedFoodPill.classList.add('hidden');

                        if (isPending) {
                            showToast('Đã gửi bài viết. Bài viết đang chờ Admin duyệt.', 'info');
                        } else {
                            const createdPost = {
                                id_post: newPostData.id_post || newPostData.id,
                                id_user: newPostData.id_user,
                                id_food: newPostData.id_food,
                                title: newPostData.title || title,
                                content: newPostData.content || content,
                                image: newPostData.image || uploadedImageSrc,
                                foodName: newPostData.food?.name || selectedFoodName || '',
                                author: {
                                    name: newPostData.user?.name || currentUser?.name || 'Bạn',
                                    avatar: newPostData.user?.avatar || currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
                                },
                                created_at: newPostData.created_at || new Date().toISOString(),
                                likes: 0,
                                liked: false,
                                comments: 0
                            };

                            allPosts.unshift(createdPost);
                            currentFilteredPosts.unshift(createdPost);
                            displayedCount++;

                            if (feedContainer) {
                                const tempDiv = document.createElement('div');
                                tempDiv.innerHTML = createPostCardHTML(createdPost, true);
                                const newCard = tempDiv.firstElementChild;
                                feedContainer.insertBefore(newCard, feedContainer.firstChild);
                            }

                            updateFeedBadge();
                            renderSidebars();

                            showToast('Đăng bài chia sẻ thành công!', 'success');
                        }
                    } else {
                        showToast(response?.message || 'Không thể gửi bài viết. Vui lòng thử lại.', 'error');
                    }
                } catch (err) {
                    showToast('Không thể gửi bài viết. Vui lòng thử lại.', 'error');
                } finally {
                    isSubmittingPost = false;
                    if (btnSubmitPost) {
                        btnSubmitPost.disabled = false;
                        btnSubmitPost.innerHTML = '<span class="whitespace-nowrap">Đăng bài</span><span class="text-xs">→</span>';
                    }
                }
            });
        }

        if (feedContainer) {
            feedContainer.addEventListener('click', async (e) => {
                const likeBtn = e.target.closest('.btn-like');
                if (likeBtn) {
                    const postId = parseInt(likeBtn.getAttribute('data-id'), 10);
                    const token = localStorage.getItem('auth_token');
                    if (!token) {
                        showToast('Vui lòng đăng nhập để thả tim bài viết!', 'warning');
                        setTimeout(() => {
                            window.location.hash = '#/dang-nhap';
                        }, 1200);
                        return;
                    }

                    likeBtn.disabled = true;
                    try {
                        const res = await fetchAPI(`/posts/${postId}/like`, { method: 'POST' });
                        const likeData = res?.data || res;
                        if (res?.success && likeData) {
                            const isLiked = Boolean(likeData.isLiked ?? likeData.liked);
                            const likesCount = Number(likeData.likesCount ?? likeData.likes_count ?? likeData.likes) || 0;
                            const post = allPosts.find(p => p.id_post === postId);
                            if (post) {
                                post.liked = isLiked;
                                post.likes = likesCount;
                            }

                            const heartIcon = likeBtn.querySelector('i');
                            const countSpan = likeBtn.querySelector('.like-count');

                            likeBtn.setAttribute('data-liked', isLiked);
                            likeBtn.setAttribute('data-count', likesCount);

                            if (isLiked) {
                                heartIcon.className = 'fa-solid fa-heart text-rose-500 text-sm scale-125 transition-transform duration-150';
                                setTimeout(() => { heartIcon.className = 'fa-solid fa-heart text-rose-500 text-sm'; }, 150);
                                if (countSpan) {
                                    countSpan.textContent = likesCount;
                                    countSpan.className = 'like-count text-rose-600 font-extrabold';
                                }
                            } else {
                                heartIcon.className = 'fa-regular fa-heart text-sm';
                                if (countSpan) {
                                    countSpan.textContent = likesCount;
                                    countSpan.className = 'like-count';
                                }
                            }

                            renderSidebars();
                        } else {
                            showToast(res?.message || 'Không thể tương tác thả tim.', 'error');
                        }
                    } catch (err) {
                        showToast(err.message || 'Lỗi kết nối khi thả tim.', 'error');
                    } finally {
                        likeBtn.disabled = false;
                    }
                    return;
                }

                const shareBtn = e.target.closest('.btn-share');
                if (shareBtn) {
                    const postId = shareBtn.getAttribute('data-id');
                    const postTitle = decodeURIComponent(shareBtn.getAttribute('data-title') || 'Món ngon');
                    const url = `${window.location.origin}${window.location.pathname}#/cong-dong?post=${postId}`;

                    if (navigator.share) {
                        try {
                            await navigator.share({
                                title: postTitle,
                                text: `Xem bài viết chia sẻ nấu ăn: ${postTitle}`,
                                url: url
                            });
                            showToast('Đã mở chia sẻ thành công.', 'success');
                            return;
                        } catch {
                        }
                    }

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        try {
                            await navigator.clipboard.writeText(url);
                            showToast('Đã sao chép liên kết bài viết vào clipboard.', 'success');
                            return;
                        } catch {
                        }
                    }

                    const tempInput = document.createElement('input');
                    tempInput.value = url;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    showToast('Đã sao chép liên kết bài viết.', 'success');
                    return;
                }

                const moreBtn = e.target.closest('.btn-more-options');
                if (moreBtn) {
                    const dropdown = moreBtn.parentElement?.querySelector('.post-options-dropdown');
                    if (dropdown) {
                        const isHidden = dropdown.classList.contains('hidden');
                        document.querySelectorAll('.post-options-dropdown').forEach(d => d.classList.add('hidden'));
                        if (isHidden) {
                            dropdown.classList.remove('hidden');
                        }
                    }
                    return;
                }

                const openReportBtn = e.target.closest('.btn-open-report');
                if (openReportBtn) {
                    const postId = parseInt(openReportBtn.getAttribute('data-id'), 10);
                    openReportBtn.closest('.post-options-dropdown')?.classList.add('hidden');
                    if (!postId) return;

                    const token = localStorage.getItem('auth_token');
                    if (!token) {
                        const goToLogin = await Popup.confirm({
                            title: 'Yêu cầu đăng nhập',
                            message: 'Bạn cần đăng nhập tài khoản để gửi báo cáo vi phạm bài viết. Bạn có muốn đăng nhập ngay?',
                            type: 'warning',
                            confirmText: 'Đăng nhập ngay',
                            cancelText: 'Để sau',
                            confirmButtonColor: 'primary'
                        });
                        if (goToLogin) {
                            window.location.hash = '#/login';
                        }
                        return;
                    }

                    // Mở popup modal báo cáo bài viết
                    const reportModal = document.getElementById('post-report-modal');
                    const reportModalTitle = document.getElementById('report-modal-title');
                    const reportTargetType = document.getElementById('report-target-type');
                    const reportPostIdInput = document.getElementById('report-post-id');
                    const reportDescInput = document.getElementById('report-description');
                    const defaultRadio = document.querySelector('input[name="report_reason"][value="Spam hoặc quảng cáo không phù hợp"]');

                    if (reportModalTitle) reportModalTitle.textContent = 'Báo cáo bài viết';
                    if (reportTargetType) reportTargetType.value = 'post';
                    if (reportPostIdInput) reportPostIdInput.value = postId;
                    if (reportDescInput) reportDescInput.value = '';
                    if (defaultRadio) defaultRadio.checked = true;

                    if (reportModal) {
                        reportModal.classList.remove('hidden');
                        reportModal.classList.add('flex');
                    }
                    return;
                }

                const moreCommentBtn = e.target.closest('.btn-more-comment-options');
                if (moreCommentBtn) {
                    const dropdown = moreCommentBtn.parentElement?.querySelector('.comment-options-dropdown');
                    if (dropdown) {
                        const isHidden = dropdown.classList.contains('hidden');
                        document.querySelectorAll('.post-options-dropdown, .comment-options-dropdown').forEach(d => d.classList.add('hidden'));
                        if (isHidden) {
                            dropdown.classList.remove('hidden');
                        }
                    }
                    return;
                }

                const openReportCommentBtn = e.target.closest('.btn-open-report-comment');
                if (openReportCommentBtn) {
                    const commentId = parseInt(openReportCommentBtn.getAttribute('data-comment-id'), 10);
                    openReportCommentBtn.closest('.comment-options-dropdown')?.classList.add('hidden');
                    if (!commentId) return;

                    const token = localStorage.getItem('auth_token');
                    if (!token) {
                        const goToLogin = await Popup.confirm({
                            title: 'Yêu cầu đăng nhập',
                            message: 'Bạn cần đăng nhập tài khoản để gửi báo cáo vi phạm bình luận. Bạn có muốn đăng nhập ngay?',
                            type: 'warning',
                            confirmText: 'Đăng nhập ngay',
                            cancelText: 'Để sau',
                            confirmButtonColor: 'primary'
                        });
                        if (goToLogin) {
                            window.location.hash = '#/login';
                        }
                        return;
                    }

                    // Mở popup modal báo cáo bình luận
                    const reportModal = document.getElementById('post-report-modal');
                    const reportModalTitle = document.getElementById('report-modal-title');
                    const reportTargetType = document.getElementById('report-target-type');
                    const reportPostIdInput = document.getElementById('report-post-id');
                    const reportDescInput = document.getElementById('report-description');
                    const defaultRadio = document.querySelector('input[name="report_reason"][value="Spam hoặc quảng cáo không phù hợp"]');

                    if (reportModalTitle) reportModalTitle.textContent = 'Báo cáo bình luận';
                    if (reportTargetType) reportTargetType.value = 'comment';
                    if (reportPostIdInput) reportPostIdInput.value = commentId;
                    if (reportDescInput) reportDescInput.value = '';
                    if (defaultRadio) defaultRadio.checked = true;

                    if (reportModal) {
                        reportModal.classList.remove('hidden');
                        reportModal.classList.add('flex');
                    }
                    return;
                }

                const toggleCommentBtn = e.target.closest('.btn-toggle-comments');
                if (toggleCommentBtn) {
                    const postId = parseInt(toggleCommentBtn.getAttribute('data-id'), 10);
                    const commentsSection = document.getElementById(`comments-section-${postId}`);
                    if (!commentsSection) return;

                    const isOpening = commentsSection.classList.contains('hidden');
                    commentsSection.classList.toggle('hidden');

                    if (isOpening) {
                        const commentsList = document.getElementById(`comments-list-${postId}`);
                        if (commentsList) {
                            commentsList.innerHTML = `
                                <div class="py-3 text-center text-xs text-text-muted">
                                    <i class="fa-solid fa-spinner animate-spin text-primary text-sm mr-1.5"></i>
                                    <span>Đang tải bình luận...</span>
                                </div>
                            `;

                            try {
                                const res = await fetchAPI(`/posts/${postId}/comments`);
                                const comments = Array.isArray(res?.data) ? res.data : [];
                                
                                const post = allPosts.find(p => p.id_post === postId);
                                if (post) {
                                    post.comments = comments.length;
                                }
                                const countBadge = toggleCommentBtn.querySelector('.comments-count');
                                if (countBadge) countBadge.textContent = comments.length;

                                if (comments.length === 0) {
                                    commentsList.innerHTML = `
                                        <div class="py-3 text-center text-xs text-text-muted">
                                            Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ!
                                        </div>
                                    `;
                                } else {
                                    commentsList.innerHTML = comments.map(c => {
                                        const cAuthor = c.author || c.user || {};
                                        const isMyComment = currentUser && (c.id_user === currentUser.id_user || c.id_user === currentUser.id);
                                        const cTime = c.time || formatTimeAgo(c.created_at);
                                        const cId = c.id_comment || c.id;

                                        return `
                                            <div class="comment-item bg-[#FBF9F5] rounded-xl p-2.5 sm:p-3 border border-beige-border/60 text-xs transition-all" id="comment-item-${cId}">
                                                <div class="flex items-start justify-between gap-2">
                                                    <div class="flex items-center gap-2">
                                                        <img src="${cAuthor.avatar || `${BACKEND_URL}/images/users/admin.jpg`}" alt="${cAuthor.name || 'Người dùng'}" class="w-6 h-6 rounded-full object-cover ring-1 ring-beige-border">
                                                        <div>
                                                            <strong class="text-text-main text-xs font-bold">${cAuthor.name || 'Thành viên'}</strong>
                                                            <span class="text-[10px] text-text-muted ml-1.5">${cTime}</span>
                                                        </div>
                                                    </div>

                                                    ${isMyComment ? `
                                                        <div class="flex items-center gap-1.5">
                                                            <button type="button" class="btn-edit-comment text-text-muted hover:text-primary transition-colors cursor-pointer text-[11px] p-0.5" data-comment-id="${cId}" data-post-id="${postId}" title="Chỉnh sửa bình luận">
                                                                <i class="fa-solid fa-pen"></i>
                                                            </button>
                                                            <button type="button" class="btn-delete-comment text-text-muted hover:text-rose-600 transition-colors cursor-pointer text-[11px] p-0.5" data-comment-id="${cId}" data-post-id="${postId}" title="Xóa bình luận">
                                                                <i class="fa-solid fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                    ` : `
                                                        <div class="relative comment-options-container">
                                                            <button type="button" class="btn-more-comment-options text-text-muted hover:text-text-main p-1 rounded-full hover:bg-gray-200/50 transition-colors cursor-pointer text-[10px]" data-comment-id="${cId}" title="Tùy chọn">
                                                                <i class="fa-solid fa-ellipsis"></i>
                                                            </button>
                                                            <div class="comment-options-dropdown hidden absolute right-0 top-full mt-0.5 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30">
                                                                <button type="button" class="btn-open-report-comment w-full px-3 py-1.5 text-left text-[11px] font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition cursor-pointer" data-comment-id="${cId}" data-post-id="${postId}">
                                                                    <i class="fa-regular fa-flag text-rose-500 text-xs"></i>
                                                                    <span>Báo cáo bình luận</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    `}
                                                </div>

                                                <div class="comment-body mt-1.5 text-text-main text-xs leading-relaxed" id="comment-content-${cId}">
                                                    ${c.content}
                                                </div>
                                            </div>
                                        `;
                                    }).join('');
                                }
                            } catch {
                                commentsList.innerHTML = `
                                    <div class="py-2 text-center text-xs text-red-500">
                                        Không thể tải danh sách bình luận.
                                    </div>
                                `;
                            }
                        }
                    }
                    return;
                }

                const submitCommentBtn = e.target.closest('.btn-submit-comment');
                if (submitCommentBtn) {
                    const postId = parseInt(submitCommentBtn.getAttribute('data-id'), 10);
                    const token = localStorage.getItem('auth_token');
                    if (!token) {
                        showToast('Vui lòng đăng nhập để bình luận!', 'warning');
                        setTimeout(() => { window.location.hash = '#/dang-nhap'; }, 1000);
                        return;
                    }

                    const inputEl = document.getElementById(`comment-input-${postId}`);
                    const content = inputEl?.value.trim();
                    if (!content) {
                        showToast('Vui lòng nhập nội dung bình luận.', 'warning');
                        inputEl?.focus();
                        return;
                    }

                    submitCommentBtn.disabled = true;
                    submitCommentBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin text-[10px]"></i><span>Đang gửi...</span>';

                    try {
                        const res = await fetchAPI(`/posts/${postId}/comments`, {
                            method: 'POST',
                            body: JSON.stringify({ content })
                        });

                        if (res?.success && res.data) {
                            showToast('Đã gửi bình luận thành công!', 'success');
                            if (inputEl) inputEl.value = '';

                            const commentsList = document.getElementById(`comments-list-${postId}`);
                            const newC = res.data;
                            const cAuthor = newC.author || newC.user || currentUser;
                            const cId = newC.id_comment || newC.id;
                            const cHTML = `
                                <div class="comment-item bg-[#FBF9F5] rounded-xl p-2.5 sm:p-3 border border-beige-border/60 text-xs transition-all" id="comment-item-${cId}">
                                    <div class="flex items-start justify-between gap-2">
                                        <div class="flex items-center gap-2">
                                            <img src="${cAuthor.avatar || currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`}" alt="${cAuthor.name || currentUser?.name}" class="w-6 h-6 rounded-full object-cover ring-1 ring-beige-border">
                                            <div>
                                                <strong class="text-text-main text-xs font-bold">${cAuthor.name || currentUser?.name || 'Bạn'}</strong>
                                                <span class="text-[10px] text-text-muted ml-1.5">Vừa xong</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-1.5">
                                            <button type="button" class="btn-edit-comment text-text-muted hover:text-primary transition-colors cursor-pointer text-[11px] p-0.5" data-comment-id="${cId}" data-post-id="${postId}" title="Chỉnh sửa bình luận">
                                                <i class="fa-solid fa-pen"></i>
                                            </button>
                                            <button type="button" class="btn-delete-comment text-text-muted hover:text-rose-600 transition-colors cursor-pointer text-[11px] p-0.5" data-comment-id="${cId}" data-post-id="${postId}" title="Xóa bình luận">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="comment-body mt-1.5 text-text-main text-xs leading-relaxed" id="comment-content-${cId}">
                                        ${newC.content}
                                    </div>
                                </div>
                            `;

                            if (commentsList) {
                                if (commentsList.querySelector('.text-text-muted')?.textContent.includes('Chưa có bình luận')) {
                                    commentsList.innerHTML = cHTML;
                                } else {
                                    commentsList.insertAdjacentHTML('beforeend', cHTML);
                                }
                            }

                            const post = allPosts.find(p => p.id_post === postId);
                            const updatedCount = Number(res.commentsCount ?? ((post?.comments || 0) + 1));
                            if (post) post.comments = updatedCount;

                            const toggleBtn = document.querySelector(`.btn-toggle-comments[data-id="${postId}"]`);
                            const countSpan = toggleBtn?.querySelector('.comments-count');
                            if (countSpan) countSpan.textContent = updatedCount;
                        } else {
                            showToast(res?.message || 'Không thể đăng bình luận.', 'error');
                        }
                    } catch (err) {
                        showToast(err.message || 'Lỗi khi gửi bình luận.', 'error');
                    } finally {
                        submitCommentBtn.disabled = false;
                        submitCommentBtn.innerHTML = '<i class="fa-solid fa-paper-plane text-[10px]"></i><span>Gửi</span>';
                    }
                    return;
                }

                const deleteCommentBtn = e.target.closest('.btn-delete-comment');
                if (deleteCommentBtn) {
                    const commentId = deleteCommentBtn.getAttribute('data-comment-id');
                    const postId = parseInt(deleteCommentBtn.getAttribute('data-post-id'), 10);

                    const confirmed = await Popup.confirm({
                        title: 'Xóa bình luận',
                        message: 'Bạn có chắc chắn muốn xóa bình luận này không? Thao tác này không thể hoàn tác.',
                        type: 'danger',
                        confirmText: 'Xóa bình luận',
                        cancelText: 'Hủy bỏ',
                        confirmButtonColor: 'danger'
                    });
                    if (!confirmed) return;

                    try {
                        const res = await fetchAPI(`/comments/${commentId}`, { method: 'DELETE' });
                        if (res?.success) {
                            showToast('Đã xóa bình luận.', 'success');
                            const itemEl = document.getElementById(`comment-item-${commentId}`);
                            if (itemEl) itemEl.remove();

                            const post = allPosts.find(p => p.id_post === postId);
                            if (post && post.comments > 0) post.comments--;
                            const toggleBtn = document.querySelector(`.btn-toggle-comments[data-id="${postId}"]`);
                            const countSpan = toggleBtn?.querySelector('.comments-count');
                            if (countSpan && post) countSpan.textContent = post.comments;

                            const commentsList = document.getElementById(`comments-list-${postId}`);
                            if (commentsList && commentsList.children.length === 0) {
                                commentsList.innerHTML = `
                                    <div class="py-3 text-center text-xs text-text-muted">
                                        Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ!
                                    </div>
                                `;
                            }
                        } else {
                            showToast(res?.message || 'Không thể xóa bình luận.', 'error');
                        }
                    } catch (err) {
                        showToast(err.message || 'Lỗi khi xóa bình luận.', 'error');
                    }
                    return;
                }

                const editCommentBtn = e.target.closest('.btn-edit-comment');
                if (editCommentBtn) {
                    const commentId = editCommentBtn.getAttribute('data-comment-id');
                    const contentEl = document.getElementById(`comment-content-${commentId}`);
                    if (!contentEl) return;

                    if (contentEl.querySelector('textarea')) return;

                    const oldText = contentEl.textContent.trim();
                    contentEl.innerHTML = `
                        <div class="space-y-1.5 mt-1">
                            <textarea class="w-full text-xs bg-white border border-beige-border rounded-lg p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20">${oldText}</textarea>
                            <div class="flex items-center justify-end gap-1.5">
                                <button type="button" class="btn-cancel-edit-comment px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 text-text-muted text-[11px] font-semibold cursor-pointer">Hủy</button>
                                <button type="button" class="btn-save-edit-comment px-2.5 py-0.5 rounded-md bg-primary hover:bg-[#1B4633] text-white text-[11px] font-bold cursor-pointer" data-comment-id="${commentId}">Lưu</button>
                            </div>
                        </div>
                    `;

                    contentEl.querySelector('.btn-cancel-edit-comment')?.addEventListener('click', () => {
                        contentEl.textContent = oldText;
                    });

                    contentEl.querySelector('.btn-save-edit-comment')?.addEventListener('click', async () => {
                        const newText = contentEl.querySelector('textarea')?.value.trim();
                        if (!newText) {
                            showToast('Nội dung bình luận không được rỗng.', 'warning');
                            return;
                        }

                        try {
                            const res = await fetchAPI(`/comments/${commentId}`, {
                                method: 'PATCH',
                                body: JSON.stringify({ content: newText })
                            });

                            if (res?.success) {
                                contentEl.textContent = newText;
                                showToast('Đã cập nhật bình luận!', 'success');
                            } else {
                                showToast(res?.message || 'Không thể cập nhật bình luận.', 'error');
                            }
                        } catch (err) {
                            showToast(err.message || 'Lỗi khi cập nhật bình luận.', 'error');
                        }
                    });
                    return;
                }
            });
        }

        // Đóng dropdown tùy chọn bài viết hoặc bình luận khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.post-options-container') && !e.target.closest('.comment-options-container')) {
                document.querySelectorAll('.post-options-dropdown, .comment-options-dropdown').forEach(d => d.classList.add('hidden'));
            }
        });

        // Xử lý Modal Báo cáo vi phạm (Bài viết & Bình luận)
        const reportModal = document.getElementById('post-report-modal');
        const btnCloseReportModal = document.getElementById('btn-close-report-modal');
        const btnCancelReport = document.getElementById('btn-cancel-report');
        const postReportForm = document.getElementById('post-report-form');
        const btnSubmitReport = document.getElementById('btn-submit-report');

        const closeReportModal = () => {
            if (reportModal) {
                reportModal.classList.add('hidden');
                reportModal.classList.remove('flex');
            }
        };

        if (btnCloseReportModal) {
            btnCloseReportModal.addEventListener('click', closeReportModal);
        }

        if (btnCancelReport) {
            btnCancelReport.addEventListener('click', closeReportModal);
        }

        if (reportModal) {
            reportModal.addEventListener('click', (e) => {
                if (e.target === reportModal) {
                    closeReportModal();
                }
            });
        }

        if (postReportForm) {
            postReportForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const targetType = document.getElementById('report-target-type')?.value || 'post';
                const targetId = parseInt(document.getElementById('report-post-id')?.value, 10);
                const reasonEl = document.querySelector('input[name="report_reason"]:checked');
                const reason = reasonEl ? reasonEl.value : '';
                const description = document.getElementById('report-description')?.value.trim() || '';

                if (!targetId) {
                    showToast(`Không xác định được ${targetType === 'comment' ? 'bình luận' : 'bài viết'} cần báo cáo.`, 'error');
                    return;
                }

                if (!reason) {
                    showToast('Vui lòng chọn lý do báo cáo vi phạm.', 'warning');
                    return;
                }

                const originalBtnContent = btnSubmitReport ? btnSubmitReport.innerHTML : '';
                if (btnSubmitReport) {
                    btnSubmitReport.disabled = true;
                    btnSubmitReport.innerHTML = '<i class="fa-solid fa-spinner animate-spin text-[10px]"></i><span>Đang gửi...</span>';
                }

                try {
                    const endpoint = targetType === 'comment' ? `/comments/${targetId}/report` : `/posts/${targetId}/report`;
                    const res = await fetchAPI(endpoint, {
                        method: 'POST',
                        body: JSON.stringify({ reason, description })
                    });

                    if (res?.success) {
                        showToast(res.message || 'Báo cáo vi phạm đã được gửi thành công. Ban quản trị sẽ sớm xem xét và xử lý.', 'success');
                        closeReportModal();
                    } else {
                        showToast(res?.message || 'Không thể gửi báo cáo vi phạm lúc này.', 'error');
                    }
                } catch (err) {
                    showToast(err.message || 'Lỗi khi gửi báo cáo.', 'error');
                } finally {
                    if (btnSubmitReport) {
                        btnSubmitReport.disabled = false;
                        btnSubmitReport.innerHTML = originalBtnContent;
                    }
                }
            });
        }

        const filterButtons = document.querySelectorAll('.filter-nav-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const filterType = btn.getAttribute('data-filter');
                currentFilter = filterType;

                filterButtons.forEach(b => {
                    b.className = "filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-muted hover:text-primary hover:bg-cream-soft transition-all flex items-center justify-between cursor-pointer";
                    const chevron = b.querySelector('.fa-chevron-right');
                    if (chevron) chevron.className = "fa-solid fa-chevron-right text-[10px] opacity-40";
                    const iconBox = b.querySelector('.filter-icon-box');
                    const defaultClass = b.getAttribute('data-icon-class');
                    if (iconBox && defaultClass) {
                        iconBox.className = `filter-icon-box w-6 h-6 rounded-lg ${defaultClass} flex items-center justify-center text-xs transition-colors`;
                    }
                });

                btn.className = "filter-nav-btn w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white shadow-sm transition-all flex items-center justify-between cursor-pointer";
                const activeChevron = btn.querySelector('.fa-chevron-right');
                if (activeChevron) activeChevron.className = "fa-solid fa-chevron-right text-[10px]";
                const activeIconBox = btn.querySelector('.filter-icon-box');
                if (activeIconBox) {
                    activeIconBox.className = "filter-icon-box w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center text-xs transition-colors";
                }

                if (feedFilterTitle) {
                    const titles = {
                        all: '<i class="fa-solid fa-border-all mr-1.5 text-primary"></i> Tất cả bài viết',
                        newest: '<i class="fa-solid fa-clock mr-1.5 text-blue-600"></i> Mới nhất',
                        liked: '<i class="fa-solid fa-heart mr-1.5 text-rose-500"></i> Được yêu thích',
                        trending: '<i class="fa-solid fa-fire mr-1.5 text-amber-500"></i> Đang nổi bật',
                        random: '<i class="fa-solid fa-dice mr-1.5 text-purple-600"></i> Khám phá ngẫu nhiên'
                    };
                    feedFilterTitle.innerHTML = titles[filterType] || '<i class="fa-solid fa-border-all mr-1.5 text-primary"></i> Bài viết';
                }

                await loadPostsFromAPI(filterType);

                const target = document.getElementById('community-feed-header') || document.getElementById('post-composer');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }

                const labelText = btn.querySelector('.filter-btn-title')?.textContent?.trim() || 'Danh sách';
                showToast(`Đã lọc: ${labelText}`, 'info');
            });
        });

        await Promise.all([
            loadFoodsForDropdown(),
            loadPostsFromAPI('all')
        ]);
    }
};

export default Community;

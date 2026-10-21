import { fetchAPI, BACKEND_URL } from '../../api.js?v=20261016-6c6851d781';

function escapeHTML(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
}

function formatDate(value) {
    if (!value) return 'Thành viên mới';
    try {
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(value));
    } catch {
        return 'Thành viên mới';
    }
}

const Profile = {
    render: async () => {
        return `
        <div class="cozy-kitchen-bg text-text-main font-sans min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
            <div class="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
                <section class="relative rounded-2xl overflow-hidden shadow-sm border border-beige-border/80 bg-gradient-to-r from-[#145A43] via-[#0F4937] to-[#0A3628] text-white">
                    <div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay" style="background-image: url('${BACKEND_URL}/images/foods/thit-kho-trung.jpg');"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-[#0F4937]/80 to-[#145A43]/70 pointer-events-none"></div>

                    <div class="relative z-10 p-4 sm:p-5 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-4 text-center sm:text-left">
                            <div class="relative shrink-0">
                                <img 
                                    id="profile-hero-avatar" 
                                    src="${BACKEND_URL}/images/users/admin.jpg" 
                                    alt="Avatar" 
                                    class="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-full object-cover border-3 border-white shadow-md bg-white/20"
                                >
                                <button 
                                    id="btn-avatar-camera" 
                                    type="button" 
                                    class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent hover:bg-accent-hover text-primary-deep flex items-center justify-center border-2 border-white shadow-xs cursor-pointer transition-transform hover:scale-105"
                                    title="Thay ảnh đại diện"
                                >
                                    <i class="fa-solid fa-camera text-[11px]"></i>
                                </button>
                            </div>

                            <div class="space-y-1 pt-0.5">
                                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                    <h1 id="profile-hero-name" class="text-lg sm:text-xl font-black text-white tracking-tight">Đang tải...</h1>
                                    <span id="profile-hero-badge" class="bg-accent text-primary-deep text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">Thành viên</span>
                                </div>
                                <p id="profile-hero-email" class="text-xs text-white/80 font-medium">...</p>
                                <p class="text-[11px] text-white/75 flex items-center justify-center sm:justify-start gap-1.5">
                                    <i class="fa-regular fa-calendar text-[10px] text-accent"></i>
                                    <span>Tham gia: <strong id="profile-hero-joined">...</strong></span>
                                </p>
                                <p id="profile-hero-bio" class="text-xs text-white/90 italic pt-0.5 max-w-lg leading-relaxed">
                                    "Yêu thích nấu ăn, chia sẻ mâm cơm ấm cúng cho gia đình mỗi ngày."
                                </p>
                            </div>
                        </div>

                        <div class="shrink-0 pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <button 
                                id="btn-hero-edit-profile" 
                                type="button" 
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-accent hover:bg-accent-hover active:bg-amber-600 text-primary-deep font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            >
                                <i class="fa-solid fa-pen text-[11px]"></i>
                                <span>Chỉnh sửa thông tin</span>
                            </button>
                            <button 
                                id="btn-hero-logout" 
                                type="button" 
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/15 hover:bg-rose-500/90 active:bg-rose-600 text-white font-bold text-xs border border-white/20 backdrop-blur-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                title="Đăng xuất tài khoản"
                            >
                                <i class="fa-solid fa-arrow-right-from-bracket text-[11px]"></i>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>

                    <div class="relative z-10 bg-black/35 backdrop-blur-2xs border-t border-white/10 px-2 sm:px-6 py-2 sm:py-2.5 grid grid-cols-4 gap-1 sm:gap-2 text-center">
                        <div>
                            <p class="text-[9px] sm:text-[10px] uppercase font-bold text-white/70 truncate">Bài viết</p>
                            <p id="stat-posts-count" class="text-xs sm:text-base font-black text-white">0</p>
                        </div>
                        <div id="stat-favs-box" class="cursor-pointer hover:bg-white/10 rounded-lg sm:rounded-xl p-0.5 sm:p-1 transition select-none" title="Bấm để xem danh sách món yêu thích">
                            <p class="text-[9px] sm:text-[10px] uppercase font-bold text-white/70 flex items-center justify-center gap-1 truncate">
                                <i class="fa-solid fa-heart text-rose-400 text-[9px] sm:text-[10px]"></i>
                                <span>Yêu thích</span>
                            </p>
                            <p id="stat-favs-count" class="text-xs sm:text-base font-black text-accent">0</p>
                        </div>
                        <div>
                            <p class="text-[9px] sm:text-[10px] uppercase font-bold text-white/70 truncate">Đang theo dõi</p>
                            <p id="stat-following-count" class="text-xs sm:text-base font-black text-white">0</p>
                        </div>
                        <div>
                            <p class="text-[9px] sm:text-[10px] uppercase font-bold text-white/70 truncate">Người theo dõi</p>
                            <p id="stat-followers-count" class="text-xs sm:text-base font-black text-white">0</p>
                        </div>
                    </div>
                </section>
            </div>

            <div class="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row items-start gap-5">
                <aside class="hidden md:block w-full md:w-[240px] shrink-0 bg-white rounded-2xl border border-beige-border/90 p-2 sm:p-2.5 shadow-sm md:sticky md:top-[80px] md:self-start">
                    <nav class="space-y-0.5 text-xs sm:text-sm font-semibold">
                        <a href="#/" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-text-muted hover:text-primary hover:bg-cream-soft transition-colors">
                            <span class="w-4.5 text-center text-text-muted"><i class="fa-solid fa-house text-xs"></i></span>
                            <span>Trang chủ</span>
                        </a>

                        <a href="#/danh-sach" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-text-muted hover:text-primary hover:bg-cream-soft transition-colors">
                            <span class="w-4.5 text-center text-text-muted"><i class="fa-solid fa-utensils text-xs"></i></span>
                            <span>Danh sách món ăn</span>
                        </a>

                        <a href="#/?random=true" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-text-muted hover:text-primary hover:bg-cream-soft transition-colors">
                            <span class="w-4.5 text-center text-text-muted"><i class="fa-solid fa-dice text-xs"></i></span>
                            <span>Random món ăn</span>
                        </a>

                        <a href="#/cong-dong" class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-text-muted hover:text-primary hover:bg-cream-soft transition-colors">
                            <span class="w-4.5 text-center text-text-muted"><i class="fa-solid fa-users text-xs"></i></span>
                            <span>Cộng đồng</span>
                        </a>

                        <button type="button" id="sidebar-btn-favorites" class="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-text-muted hover:text-primary hover:bg-cream-soft transition-colors cursor-pointer">
                            <span class="w-4.5 text-center text-rose-500"><i class="fa-solid fa-heart text-xs"></i></span>
                            <span>Yêu thích</span>
                        </button>

                        <button type="button" id="sidebar-btn-notifs" class="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-text-muted hover:text-primary hover:bg-cream-soft transition-colors cursor-pointer">
                            <span class="w-4.5 text-center text-text-muted"><i class="fa-regular fa-bell text-xs"></i></span>
                            <span>Thông báo</span>
                        </button>

                        <div class="my-1.5 border-t border-beige-border/70"></div>

                        <a href="#/ca-nhan" class="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-primary-subtle text-primary font-extrabold shadow-2xs border border-primary/15">
                            <span class="w-4.5 text-center text-primary"><i class="fa-solid fa-circle-user text-xs"></i></span>
                            <span>Trang cá nhân</span>
                        </a>

                        <button type="button" id="sidebar-btn-logout" class="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer">
                            <span class="w-4.5 text-center"><i class="fa-solid fa-arrow-right-from-bracket text-xs"></i></span>
                            <span>Đăng xuất</span>
                        </button>
                    </nav>
                </aside>

                <main class="flex-1 w-full min-w-0 space-y-4">
                    <div class="bg-white rounded-2xl border border-beige-border/90 p-1 sm:p-0 sm:px-4 grid grid-cols-3 sm:flex sm:items-center sm:gap-4 sm:h-[52px] shadow-sm">
                        <button 
                            type="button" 
                            class="profile-subtab-btn active py-2.5 sm:py-0 sm:h-full flex items-center justify-center gap-1 sm:gap-2 rounded-xl sm:rounded-none bg-primary sm:bg-transparent text-white sm:text-primary font-bold sm:font-extrabold shadow-sm sm:shadow-none sm:border-b-2 sm:border-primary cursor-pointer transition-all text-xs sm:text-sm"
                            data-tab="posts"
                        >
                            <i class="fa-solid fa-newspaper text-xs"></i>
                            <span class="sm:hidden">Bài viết</span>
                            <span class="hidden sm:inline">Bài viết của tôi</span>
                            <span id="tab-badge-posts" class="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-white/25 sm:bg-primary-subtle text-white sm:text-primary font-bold">0</span>
                        </button>

                        <button 
                            type="button" 
                            class="profile-subtab-btn py-2.5 sm:py-0 sm:h-full flex items-center justify-center gap-1 sm:gap-2 rounded-xl sm:rounded-none text-text-muted hover:text-primary font-semibold sm:border-b-2 sm:border-transparent cursor-pointer transition-all text-xs sm:text-sm hover:bg-cream-soft sm:hover:bg-transparent"
                            data-tab="favorites"
                        >
                            <i class="fa-solid fa-heart text-xs text-rose-500"></i>
                            <span class="sm:hidden">Yêu thích</span>
                            <span class="hidden sm:inline">Món yêu thích</span>
                            <span id="tab-badge-favs" class="text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-cream-soft text-text-muted font-bold">0</span>
                        </button>

                        <button 
                            type="button" 
                            class="profile-subtab-btn py-2.5 sm:py-0 sm:h-full flex items-center justify-center gap-1 sm:gap-2 rounded-xl sm:rounded-none text-text-muted hover:text-primary font-semibold sm:border-b-2 sm:border-transparent cursor-pointer transition-all text-xs sm:text-sm hover:bg-cream-soft sm:hover:bg-transparent"
                            data-tab="info"
                        >
                            <i class="fa-solid fa-circle-user text-xs"></i>
                            <span class="sm:hidden">Hồ sơ</span>
                            <span class="hidden sm:inline">Thông tin cá nhân</span>
                        </button>
                    </div>

                    <div id="subtab-panel-posts" class="subtab-content">
                        <div class="flex flex-col lg:flex-row items-start gap-5">
                            <div class="w-full lg:w-[67%] space-y-4">
                                <div class="bg-white rounded-2xl border border-beige-border/90 p-4 flex items-center justify-between shadow-sm">
                                    <div class="flex items-center gap-2">
                                        <div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                        <h3 class="font-extrabold text-sm sm:text-base text-text-main">Bài viết của tôi</h3>
                                        <span id="section-posts-counter" class="text-xs text-text-muted font-semibold">(0)</span>
                                    </div>
                                    <a href="#/cong-dong" class="text-xs font-bold text-primary hover:text-primary-deep hover:underline flex items-center gap-1">
                                        <span>Đăng bài mới</span>
                                        <i class="fa-solid fa-arrow-right text-[10px]"></i>
                                    </a>
                                </div>

                                <div id="my-posts-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="col-span-full py-12 text-center text-text-muted">
                                        <i class="fa-solid fa-spinner animate-spin text-2xl text-primary mb-2"></i>
                                        <p class="text-xs font-semibold">Đang tải bài viết của bạn...</p>
                                    </div>
                                </div>
                            </div>

                            <div class="hidden lg:block w-full lg:w-[33%] space-y-4">
                                <div class="bg-white rounded-2xl border border-beige-border/90 p-4 shadow-sm">
                                    <div class="flex items-center justify-between pb-3 mb-3 border-b border-beige-border/60">
                                        <div class="flex items-center gap-2">
                                            <i class="fa-solid fa-heart text-rose-500 text-xs"></i>
                                            <h3 class="font-extrabold text-sm text-text-main">Món yêu thích</h3>
                                        </div>
                                        <button type="button" id="btn-view-all-favs" class="text-xs font-bold text-primary hover:underline cursor-pointer">
                                            Xem tất cả
                                        </button>
                                    </div>

                                    <div id="sidebar-favs-list" class="space-y-3">
                                        <div class="py-6 text-center text-text-muted text-xs">
                                            <i class="fa-solid fa-spinner animate-spin text-base text-primary mb-1"></i>
                                            <p>Đang tải món yêu thích...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="subtab-panel-favorites" class="subtab-content hidden">
                        <div class="bg-white rounded-2xl border border-beige-border/90 p-5 shadow-sm space-y-4">
                            <div class="flex items-center justify-between pb-3 border-b border-beige-border/60">
                                <div class="flex items-center gap-2.5">
                                    <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-sm font-bold">
                                        <i class="fa-solid fa-heart"></i>
                                    </div>
                                    <div>
                                        <h3 class="font-extrabold text-sm sm:text-base text-text-main">Tất cả món ăn yêu thích</h3>
                                        <p class="text-[11px] text-text-muted">Danh sách các công thức bạn đã lưu lại để nấu</p>
                                    </div>
                                </div>
                                <span id="full-favs-count-badge" class="text-xs font-bold bg-primary-subtle text-primary px-2.5 py-1 rounded-full border border-primary/20">0 món</span>
                            </div>

                            <div id="full-favs-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="col-span-full py-12 text-center text-text-muted">
                                    <i class="fa-solid fa-spinner animate-spin text-2xl text-primary mb-2"></i>
                                    <p class="text-xs font-semibold">Đang tải danh sách món ăn yêu thích...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="subtab-panel-info" class="subtab-content hidden">
                        <div class="bg-white rounded-2xl border border-beige-border/90 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
                            <div class="flex items-center gap-3 pb-4 border-b border-beige-border/60">
                                <div class="w-10 h-10 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center text-lg shadow-2xs">
                                    <i class="fa-solid fa-address-card"></i>
                                </div>
                                <div>
                                    <h3 class="font-extrabold text-base text-text-main">Hồ sơ tài khoản</h3>
                                    <p class="text-xs text-text-muted">Thông tin chi tiết tài khoản của bạn tại Hôm Nay Nấu Gì</p>
                                </div>
                            </div>

                            <div class="space-y-4 text-xs sm:text-sm">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 gap-1">
                                    <span class="font-bold text-text-muted">Họ và tên</span>
                                    <span id="tab-info-name" class="font-black text-text-main">...</span>
                                </div>

                                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 gap-1">
                                    <span class="font-bold text-text-muted">Địa chỉ Email</span>
                                    <span id="tab-info-email" class="font-semibold text-text-main">...</span>
                                </div>

                                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 gap-1">
                                    <span class="font-bold text-text-muted">Vai trò hệ thống</span>
                                    <span id="tab-info-role" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-subtle text-primary border border-primary/20">Thành viên</span>
                                </div>

                                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 gap-1">
                                    <span class="font-bold text-text-muted">Trạng thái tài khoản</span>
                                    <span class="text-emerald-600 font-bold flex items-center gap-1.5">
                                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span>Đang hoạt động bình thường</span>
                                    </span>
                                </div>

                                <div class="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 gap-1">
                                    <span class="font-bold text-text-muted">Ngày tạo tài khoản</span>
                                    <span id="tab-info-created" class="font-medium text-text-main">...</span>
                                </div>
                            </div>

                            <div class="pt-2 flex items-center justify-end gap-2.5 sm:gap-3">
                                <button 
                                    id="btn-info-logout" 
                                    type="button" 
                                    class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                                >
                                    <i class="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                                    <span>Đăng xuất</span>
                                </button>
                                <button 
                                    id="btn-tab-open-edit" 
                                    type="button" 
                                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-deep text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
                                >
                                    <i class="fa-solid fa-pen-to-square text-xs"></i>
                                    <span>Cập nhật thông tin</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <div id="modal-edit-profile" class="fixed inset-0 bg-black/50 z-50 hidden items-center justify-center p-4 backdrop-blur-2xs">
                <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-beige-border overflow-hidden">
                    <div class="p-4 bg-primary text-white flex items-center justify-between">
                        <div class="flex items-center gap-2 font-bold text-sm">
                            <i class="fa-solid fa-user-pen text-accent"></i>
                            <span>Chỉnh sửa thông tin cá nhân</span>
                        </div>
                        <button id="btn-close-modal-edit" type="button" class="text-white/80 hover:text-white text-lg cursor-pointer">&times;</button>
                    </div>

                    <form id="form-profile-update" class="p-5 space-y-4 text-xs sm:text-sm">
                        <div class="space-y-1.5">
                            <label for="input-edit-name" class="font-bold text-text-main block">Họ và tên hiển thị</label>
                            <input 
                                type="text" 
                                id="input-edit-name" 
                                class="w-full bg-cream-card border border-beige-border focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-2.5 text-text-main outline-none transition-all"
                                required
                            >
                        </div>

                        <div class="space-y-1.5">
                            <label for="input-edit-avatar" class="font-bold text-text-main block">Đường dẫn ảnh đại diện (URL)</label>
                            <input 
                                type="text" 
                                id="input-edit-avatar" 
                                placeholder="https://otakuminihub.io.vn/api/images/users/admin.jpg" 
                                class="w-full bg-cream-card border border-beige-border focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 rounded-xl px-3.5 py-2.5 text-text-main outline-none transition-all"
                            >
                        </div>

                        <div class="space-y-1.5 opacity-60">
                            <label class="font-bold text-text-muted block">Địa chỉ Email (Cố định)</label>
                            <input 
                                type="email" 
                                id="input-edit-email-disabled" 
                                disabled 
                                class="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-500 cursor-not-allowed outline-none"
                            >
                        </div>

                        <div class="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                            <button 
                                type="button" 
                                id="btn-cancel-edit" 
                                class="px-4 py-2 rounded-xl bg-cream-soft hover:bg-beige-DEFAULT text-text-main font-bold transition cursor-pointer"
                            >
                                Hủy
                            </button>
                            <button 
                                type="submit" 
                                class="px-4 py-2 rounded-xl bg-primary hover:bg-primary-deep text-white font-bold transition shadow-xs cursor-pointer"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="profile-toast" class="fixed top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9999] flex flex-col gap-2 items-center sm:items-end pointer-events-none"></div>
        </div>
        `;
    },

    afterRender: async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            window.location.hash = '#/login';
            return;
        }

        const showToast = (message, type = 'success') => {
            const container = document.getElementById('profile-toast');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `pointer-events-auto transform -translate-y-2 opacity-0 transition-all duration-300 flex items-center gap-2.5 px-4.5 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-bold ${
                type === 'success' 
                    ? 'bg-primary text-white border-white/20' 
                    : type === 'info'
                    ? 'bg-text-main text-white border-white/10'
                    : 'bg-rose-600 text-white border-white/20'
            }`;

            const icon = type === 'success' 
                ? '<i class="fa-solid fa-circle-check text-accent"></i>' 
                : type === 'info'
                ? '<i class="fa-solid fa-circle-info text-blue-300"></i>'
                : '<i class="fa-solid fa-circle-exclamation text-yellow-300"></i>';

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
            }, 3000);
        };

        const handleLogout = async () => {
            if (window.logoutAuth) {
                return window.logoutAuth();
            }
            if (window.Popup) {
                const confirmed = await window.Popup.confirm({
                    title: 'Đăng xuất tài khoản',
                    message: 'Bạn có chắc chắn muốn đăng xuất không?',
                    type: 'question',
                    confirmText: 'Đăng xuất',
                    cancelText: 'Hủy bỏ',
                    confirmButtonColor: 'warning'
                });
                if (!confirmed) return;
            }
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            localStorage.removeItem('user');
            window.location.hash = '#/login';
            if (window.Popup) {
                window.Popup.toast('Đã đăng xuất tài khoản thành công.', 'info');
            }
        };

        document.getElementById('sidebar-btn-logout')?.addEventListener('click', handleLogout);
        document.getElementById('btn-hero-logout')?.addEventListener('click', handleLogout);
        document.getElementById('btn-info-logout')?.addEventListener('click', handleLogout);

        document.getElementById('sidebar-btn-notifs')?.addEventListener('click', () => {
            showToast('Chức năng thông báo chi tiết đang được phát triển.', 'info');
        });

        let currentUser = null;
        let myPosts = [];
        let myFavorites = [];

        const switchTab = (tabName) => {
            const tabs = ['posts', 'favorites', 'info'];
            tabs.forEach(t => {
                const panel = document.getElementById(`subtab-panel-${t}`);
                if (panel) {
                    if (t === tabName) {
                        panel.classList.remove('hidden');
                    } else {
                        panel.classList.add('hidden');
                    }
                }
            });

            document.querySelectorAll('.profile-subtab-btn').forEach(btn => {
                const target = btn.getAttribute('data-tab');
                const badge = btn.querySelector('span[id^="tab-badge-"]');
                if (target === tabName) {
                    btn.className = "profile-subtab-btn active py-2.5 sm:py-0 sm:h-full flex items-center justify-center gap-1 sm:gap-2 rounded-xl sm:rounded-none bg-primary sm:bg-transparent text-white sm:text-primary font-bold sm:font-extrabold shadow-sm sm:shadow-none sm:border-b-2 sm:border-primary cursor-pointer transition-all text-xs sm:text-sm";
                    if (badge) {
                        badge.className = "text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-white/25 sm:bg-primary-subtle text-white sm:text-primary font-bold";
                    }
                } else {
                    btn.className = "profile-subtab-btn py-2.5 sm:py-0 sm:h-full flex items-center justify-center gap-1 sm:gap-2 rounded-xl sm:rounded-none text-text-muted hover:text-primary font-semibold sm:border-b-2 sm:border-transparent cursor-pointer transition-all text-xs sm:text-sm hover:bg-cream-soft sm:hover:bg-transparent";
                    if (badge) {
                        badge.className = "text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full bg-cream-soft text-text-muted font-bold";
                    }
                }
            });
        };

        document.querySelectorAll('.profile-subtab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });

        document.getElementById('sidebar-btn-favorites')?.addEventListener('click', () => {
            switchTab('favorites');
        });

        document.getElementById('stat-favs-box')?.addEventListener('click', () => {
            switchTab('favorites');
        });

        document.getElementById('btn-view-all-favs')?.addEventListener('click', () => {
            switchTab('favorites');
        });

        if (window.location.hash.includes('tab=favorites') || window.location.hash.includes('yeu-thich')) {
            switchTab('favorites');
        }

        const modalEdit = document.getElementById('modal-edit-profile');
        const formEdit = document.getElementById('form-profile-update');
        const inputEditName = document.getElementById('input-edit-name');
        const inputEditAvatar = document.getElementById('input-edit-avatar');
        const inputEditEmail = document.getElementById('input-edit-email-disabled');

        const openEditModal = () => {
            if (!currentUser) return;
            if (inputEditName) inputEditName.value = currentUser.name || '';
            if (inputEditAvatar) inputEditAvatar.value = currentUser.avatar || '';
            if (inputEditEmail) inputEditEmail.value = currentUser.email || '';
            modalEdit?.classList.remove('hidden');
            modalEdit?.classList.add('flex');
        };

        const closeEditModal = () => {
            modalEdit?.classList.add('hidden');
            modalEdit?.classList.remove('flex');
        };

        document.getElementById('btn-hero-edit-profile')?.addEventListener('click', openEditModal);
        document.getElementById('btn-tab-open-edit')?.addEventListener('click', openEditModal);
        document.getElementById('btn-avatar-camera')?.addEventListener('click', openEditModal);
        document.getElementById('btn-close-modal-edit')?.addEventListener('click', closeEditModal);
        document.getElementById('btn-cancel-edit')?.addEventListener('click', closeEditModal);

        if (formEdit) {
            formEdit.addEventListener('submit', async (e) => {
                e.preventDefault();
                const newName = inputEditName?.value.trim();
                const newAvatar = inputEditAvatar?.value.trim();

                if (!newName) {
                    showToast('Họ tên không được để trống.', 'error');
                    return;
                }

                try {
                    const res = await fetchAPI('/auth/me', {
                        method: 'PATCH',
                        body: JSON.stringify({
                            name: newName,
                            avatar: newAvatar || null
                        })
                    });

                    if (res?.success && res.user) {
                        currentUser = res.user;
                        localStorage.setItem('auth_user', JSON.stringify(res.user));
                        populateUserData(res.user);
                        closeEditModal();
                        showToast('Cập nhật hồ sơ thành công!', 'success');
                    } else {
                        showToast(res?.message || 'Không thể cập nhật hồ sơ.', 'error');
                    }
                } catch (err) {
                    showToast(err.message || 'Lỗi khi cập nhật hồ sơ.', 'error');
                }
            });
        }

        const populateUserData = (user) => {
            if (!user) return;
            const heroName = document.getElementById('profile-hero-name');
            const heroEmail = document.getElementById('profile-hero-email');
            const heroAvatar = document.getElementById('profile-hero-avatar');
            const heroJoined = document.getElementById('profile-hero-joined');
            const heroBadge = document.getElementById('profile-hero-badge');
            const navAvatar = document.getElementById('nav-user-avatar');
            const navName = document.getElementById('nav-user-name');

            if (heroName) heroName.textContent = user.name || 'Người dùng';
            if (heroEmail) heroEmail.textContent = user.email || '';
            if (heroAvatar) heroAvatar.src = user.avatar || `${BACKEND_URL}/images/users/admin.jpg`;
            if (navAvatar) navAvatar.src = user.avatar || `${BACKEND_URL}/images/users/admin.jpg`;
            if (navName) navName.textContent = user.name || 'Tài khoản';
            if (heroJoined) heroJoined.textContent = formatDate(user.created_at);
            if (heroBadge) heroBadge.textContent = user.role === 'admin' ? 'Quản trị viên' : 'Thành viên Bếp';

            const approvedPostsCount = myPosts.filter(p => p.status === 'active').length || user.stats?.activePosts || user.stats?.posts || 0;
            const totalPostsCount = myPosts.length || user.stats?.posts || 0;
            const favsCount = user.stats?.favorites ?? myFavorites.length ?? 0;

            const statPosts = document.getElementById('stat-posts-count');
            const statFavs = document.getElementById('stat-favs-count');
            const tabBadgePosts = document.getElementById('tab-badge-posts');
            const tabBadgeFavs = document.getElementById('tab-badge-favs');
            const secCounter = document.getElementById('section-posts-counter');
            const fullFavBadge = document.getElementById('full-favs-count-badge');

            if (statPosts) statPosts.textContent = approvedPostsCount;
            if (statFavs) statFavs.textContent = favsCount;
            if (tabBadgePosts) tabBadgePosts.textContent = totalPostsCount;
            if (tabBadgeFavs) tabBadgeFavs.textContent = favsCount;
            if (secCounter) secCounter.textContent = `(${totalPostsCount})`;
            if (fullFavBadge) fullFavBadge.textContent = `${favsCount} món`;

            const tabName = document.getElementById('tab-info-name');
            const tabEmail = document.getElementById('tab-info-email');
            const tabRole = document.getElementById('tab-info-role');
            const tabCreated = document.getElementById('tab-info-created');

            if (tabName) tabName.textContent = user.name || '';
            if (tabEmail) tabEmail.textContent = user.email || '';
            if (tabRole) tabRole.textContent = user.role === 'admin' ? 'Quản trị viên (Admin)' : 'Người dùng tiêu chuẩn (User)';
            if (tabCreated) tabCreated.textContent = formatDate(user.created_at);
        };

        const renderPostsGrid = () => {
            const container = document.getElementById('my-posts-grid');
            if (!container) return;

            if (myPosts.length === 0) {
                container.className = "col-span-full";
                container.innerHTML = `
                    <div class="bg-white rounded-2xl border border-beige-border/90 p-8 text-center shadow-sm space-y-3">
                        <div class="w-14 h-14 rounded-full bg-cream-soft flex items-center justify-center text-2xl mx-auto text-primary">
                            🍲
                        </div>
                        <h4 class="font-extrabold text-sm text-text-main">Bạn chưa đăng bài viết nào</h4>
                        <p class="text-xs text-text-muted">Chia sẻ món ngon ấm cúng bạn vừa làm với cộng đồng Hôm Nay Nấu Gì!</p>
                        <a href="#/cong-dong" class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-deep text-white text-xs font-bold rounded-xl transition-colors shadow-2xs">
                            <i class="fa-solid fa-plus text-xs"></i>
                            <span>Đăng bài ngay</span>
                        </a>
                    </div>
                `;
                return;
            }

            container.className = "grid grid-cols-1 md:grid-cols-2 gap-4";
            container.innerHTML = myPosts.map(post => {
                const likes = post.likesCount ?? post.likes ?? 0;
                const comments = post.commentsCount ?? post.comments ?? 0;
                const isLiked = Boolean(post.isLiked || post.liked);
                const postImg = post.image || (post.food?.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`);
                const foodName = post.foodName || post.food?.name || '';
                const isPending = post.status === 'pending';
                const isHidden = post.status === 'hidden';

                let statusBadge = `
                    <span class="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <span>🟢</span> Đã đăng
                    </span>
                `;
                let cardStyle = "bg-white rounded-2xl border border-beige-border/90 p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between";
                let statusNotice = '';

                if (isPending) {
                    statusBadge = `
                        <span class="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300 shadow-2xs flex items-center gap-1">
                            <span>🟡</span> Đang chờ duyệt
                        </span>
                    `;
                    cardStyle = "bg-amber-50/20 rounded-2xl border-2 border-amber-300/80 p-3.5 shadow-xs opacity-75 hover:opacity-95 transition-all flex flex-col justify-between ring-1 ring-amber-200/50";
                    statusNotice = `
                        <div class="px-3 py-2 rounded-xl bg-amber-100/70 border border-amber-300/70 text-[#8C5300] text-[11px] font-semibold flex items-center gap-2">
                            <i class="fa-solid fa-hourglass-half text-amber-600 text-xs shrink-0"></i>
                            <span>Bài viết đang chờ Admin duyệt.</span>
                        </div>
                    `;
                } else if (isHidden) {
                    statusBadge = `
                        <span class="text-[10px] bg-rose-50 text-rose-700 font-extrabold px-2.5 py-0.5 rounded-full border border-rose-300 shadow-2xs flex items-center gap-1">
                            <span>🔴</span> Bị từ chối
                        </span>
                    `;
                    cardStyle = "bg-rose-50/20 rounded-2xl border-2 border-rose-300/80 p-3.5 shadow-xs opacity-70 hover:opacity-90 transition-all flex flex-col justify-between ring-1 ring-rose-200/50";
                    statusNotice = `
                        <div class="px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-start gap-2">
                            <i class="fa-solid fa-circle-exclamation text-rose-600 text-xs shrink-0 mt-0.5"></i>
                            <div class="leading-tight">
                                <p class="font-bold">Bài viết bị từ chối</p>
                                ${post.hidden_reason ? `<p class="text-[10px] text-rose-700 mt-0.5 font-medium">Lý do: <span class="font-bold underline">${escapeHTML(post.hidden_reason)}</span></p>` : ''}
                            </div>
                        </div>
                    `;
                }

                return `
                    <article class="${cardStyle}" id="my-post-card-${post.id_post}">
                        <div class="space-y-2.5">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <img src="${post.author?.avatar || currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`}" class="w-7 h-7 rounded-full object-cover border border-gray-100 shadow-2xs">
                                    <div class="leading-tight">
                                        <p class="font-bold text-xs text-text-main">${escapeHTML(post.author?.name || currentUser?.name)}</p>
                                        <span class="text-[10px] text-text-muted">${formatDate(post.created_at)}</span>
                                    </div>
                                </div>
                                ${statusBadge}
                            </div>

                            ${statusNotice}

                            ${postImg ? `
                                <div class="rounded-xl overflow-hidden aspect-video bg-gray-100 border border-beige-border/50 relative">
                                    <img src="${postImg}" alt="Ảnh món ăn" class="w-full h-full object-cover ${isPending ? 'filter blur-[0.5px]' : ''}" loading="lazy" decoding="async">
                                    ${isPending ? `
                                        <div class="absolute inset-0 bg-amber-950/20 backdrop-blur-[1px] flex items-center justify-center">
                                            <span class="bg-black/60 backdrop-blur-md text-amber-200 text-xs font-extrabold px-3 py-1.5 rounded-full border border-amber-300/40 shadow-md flex items-center gap-1.5">
                                                <span>🟡</span>
                                                Đang chờ duyệt
                                            </span>
                                        </div>
                                    ` : ''}
                                </div>
                            ` : ''}

                            <div>
                                ${post.title ? `<h4 class="font-extrabold text-xs sm:text-sm text-text-main line-clamp-1 mb-1">${escapeHTML(post.title)}</h4>` : ''}
                                <p class="text-xs text-text-muted line-clamp-2 leading-relaxed">${escapeHTML(post.content || '')}</p>
                            </div>

                            ${foodName ? `
                                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream-card border border-beige-border text-[11px] font-bold text-primary">
                                    <i class="fa-solid fa-utensils text-[10px] text-accent"></i>
                                    <span>${escapeHTML(foodName)}</span>
                                </div>
                            ` : ''}
                        </div>

                        <div class="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                            <div class="flex items-center gap-3">
                                <button type="button" class="btn-like-post flex items-center gap-1.5 font-bold ${isLiked ? 'text-rose-500' : 'text-text-muted hover:text-rose-500'} ${isPending || isHidden ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} transition-colors" data-id="${post.id_post}" ${isPending || isHidden ? 'disabled' : ''}>
                                    <i class="${isLiked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart"></i>
                                    <span class="like-number">${likes}</span>
                                </button>
                                <span class="flex items-center gap-1.5 font-bold text-text-muted">
                                    <i class="fa-regular fa-comment"></i>
                                    <span>${comments}</span>
                                </span>
                            </div>

                            <div class="flex items-center gap-1.5">
                                ${isPending ? `
                                    <span class="px-3 py-1 rounded-lg bg-amber-100 text-[#8C5300] text-xs font-bold flex items-center gap-1.5 border border-amber-300/70 shadow-2xs">
                                        <i class="fa-solid fa-hourglass-half text-[10px] text-amber-600"></i>
                                        <span>Đang chờ duyệt</span>
                                    </span>
                                ` : isHidden ? `
                                    <span class="px-3 py-1 rounded-lg bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 border border-rose-300/70 shadow-2xs">
                                        <i class="fa-solid fa-eye-slash text-[10px] text-rose-600"></i>
                                        <span>Đã bị ẩn</span>
                                    </span>
                                ` : `
                                    <button type="button" class="btn-share-post px-2.5 py-1 rounded-lg bg-cream-card hover:bg-cream-soft border border-beige-border/70 text-text-muted text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors" data-id="${post.id_post}" title="Chia sẻ bài viết">
                                        <i class="fa-solid fa-share-nodes text-[10px]"></i>
                                        <span>Chia sẻ</span>
                                    </button>
                                    <a href="#/cong-dong" class="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-deep text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs">
                                        <span>Chi tiết</span>
                                        <i class="fa-solid fa-chevron-right text-[9px]"></i>
                                    </a>
                                `}
                            </div>
                        </div>
                    </article>
                `;
            }).join('');
        };

        const renderSidebarFavsList = () => {
            const container = document.getElementById('sidebar-favs-list');
            if (!container) return;

            if (myFavorites.length === 0) {
                container.innerHTML = `
                    <div class="py-6 text-center text-text-muted text-xs space-y-2">
                        <i class="fa-regular fa-heart text-xl text-gray-300"></i>
                        <p>Chưa có món yêu thích nào.</p>
                        <a href="#/danh-sach" class="inline-block text-primary font-bold underline">Khám phá món ngon</a>
                    </div>
                `;
                return;
            }

            const previewList = myFavorites.slice(0, 5);
            container.innerHTML = previewList.map(item => {
                const food = item.food || {};
                const foodId = food.id_food || food.id || item.id_food;
                const link = foodId ? `#/mon-an/${foodId}` : '#/danh-sach';

                return `
                    <div class="flex items-center justify-between gap-2.5 p-2 rounded-xl hover:bg-cream-soft transition-colors group">
                        <a href="${link}" class="flex items-center gap-2.5 min-w-0 flex-1">
                            <img src="${food.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`}" alt="${escapeHTML(food.name)}" class="w-11 h-11 rounded-xl object-cover shrink-0 border border-beige-border/70 shadow-2xs" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${BACKEND_URL}/images/foods/thit-kho-trung.jpg'">
                            <div class="min-w-0">
                                <h4 class="font-extrabold text-xs text-text-main group-hover:text-primary transition-colors truncate">${escapeHTML(food.name || 'Món ngon')}</h4>
                                <span class="text-[10px] text-text-muted font-medium">${escapeHTML(food.category || 'Món ngon')}</span>
                            </div>
                        </a>
                        <button 
                            type="button" 
                            class="btn-quick-remove-fav w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                            data-id="${foodId}"
                            data-name="${escapeHTML(food.name)}"
                            title="Bỏ yêu thích"
                        >
                            <i class="fa-solid fa-heart text-xs"></i>
                        </button>
                    </div>
                `;
            }).join('');
        };

        const renderFullFavsGrid = () => {
            const container = document.getElementById('full-favs-grid');
            if (!container) return;

            if (myFavorites.length === 0) {
                container.className = "col-span-full";
                container.innerHTML = `
                    <div class="py-12 text-center text-text-muted space-y-3">
                        <div class="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-2xl mx-auto">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <h4 class="font-extrabold text-sm text-text-main">Danh sách yêu thích đang trống</h4>
                        <p class="text-xs text-text-muted">Hãy tìm kiếm và lưu lại những món ăn yêu thích để dễ dàng nấu mỗi ngày!</p>
                        <a href="#/danh-sach" class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-deep text-white text-xs font-bold rounded-xl transition-colors shadow-2xs">
                            <i class="fa-solid fa-magnifying-glass text-xs"></i>
                            <span>Khám phá danh sách món ăn</span>
                        </a>
                    </div>
                `;
                return;
            }

            container.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
            container.innerHTML = myFavorites.map(item => {
                const food = item.food || {};
                const foodId = food.id_food || food.id || item.id_food;
                const link = foodId ? `#/mon-an/${foodId}` : '#/danh-sach';

                return `
                    <div class="bg-white rounded-2xl border border-beige-border/90 p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer" data-fav-link="${link}">
                        <div>
                            <div class="relative rounded-xl overflow-hidden aspect-[4/3] mb-2.5 bg-gray-100 border border-beige-border/50">
                                <img src="${food.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`}" alt="${escapeHTML(food.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${BACKEND_URL}/images/foods/thit-kho-trung.jpg'">
                                ${food.cooking_time ? `
                                    <span class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-2xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                        <i class="fa-regular fa-clock text-[9px]"></i>
                                        <span>${food.cooking_time} phút</span>
                                    </span>
                                ` : ''}
                                <button 
                                    type="button" 
                                    class="btn-full-remove-fav absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform hover:scale-110"
                                    data-id="${foodId}"
                                    data-name="${escapeHTML(food.name)}"
                                    title="Bỏ yêu thích"
                                >
                                    <i class="fa-solid fa-heart text-xs"></i>
                                </button>
                            </div>

                            <span class="inline-block bg-primary-subtle text-primary border border-primary/20 text-[10px] font-bold px-2 py-0.5 rounded-md mb-1">${escapeHTML(food.category || 'Món ngon')}</span>
                            <h4 class="font-extrabold text-xs sm:text-sm text-text-main group-hover:text-primary transition-colors line-clamp-1 mb-1">
                                <a href="${link}">${escapeHTML(food.name)}</a>
                            </h4>
                            <p class="text-[11px] text-text-muted line-clamp-2 leading-relaxed mb-3">${escapeHTML(food.description || '')}</p>
                        </div>

                        <div class="pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                            <button 
                                type="button" 
                                class="btn-full-remove-fav text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer" 
                                data-id="${foodId}" 
                                data-name="${escapeHTML(food.name)}"
                            >
                                <i class="fa-solid fa-trash-can text-[10px]"></i>
                                <span>Bỏ thích</span>
                            </button>
                            <a href="${link}" class="px-2.5 py-1 bg-primary-subtle hover:bg-primary text-primary hover:text-white font-bold rounded-lg transition-colors flex items-center gap-1 border border-primary/15 shadow-2xs">
                                <span>Xem công thức</span>
                                <i class="fa-solid fa-arrow-right text-[9px]"></i>
                            </a>
                        </div>
                    </div>
                `;
            }).join('');
        };

        const postsGrid = document.getElementById('my-posts-grid');
        if (postsGrid) {
            postsGrid.addEventListener('click', async (e) => {
                const likeBtn = e.target.closest('.btn-like-post');
                if (likeBtn) {
                    const postId = Number(likeBtn.getAttribute('data-id'));
                    likeBtn.disabled = true;
                    try {
                        const res = await fetchAPI(`/posts/${postId}/like`, { method: 'POST' });
                        if (res?.success) {
                            const isLiked = Boolean(res.isLiked ?? res.liked);
                            const likesCount = res.likesCount ?? res.likes ?? 0;
                            const icon = likeBtn.querySelector('i');
                            const num = likeBtn.querySelector('.like-number');
                            if (icon) icon.className = `${isLiked ? 'fa-solid text-rose-500' : 'fa-regular'} fa-heart`;
                            if (num) num.textContent = likesCount;

                            const item = myPosts.find(p => p.id_post === postId);
                            if (item) {
                                item.isLiked = isLiked;
                                item.likesCount = likesCount;
                            }
                        }
                    } catch (err) {
                        showToast('Không thể tương tác bài viết lúc này.', 'error');
                    } finally {
                        likeBtn.disabled = false;
                    }
                    return;
                }

                const shareBtn = e.target.closest('.btn-share-post');
                if (shareBtn) {
                    const postId = shareBtn.getAttribute('data-id');
                    const url = `${window.location.origin}${window.location.pathname}#/cong-dong?post=${postId}`;
                    if (navigator.share) {
                        try {
                            await navigator.share({
                                title: 'Hôm Nay Nấu Gì - Bài viết cộng đồng',
                                url
                            });
                            return;
                        } catch {}
                    }
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        try {
                            await navigator.clipboard.writeText(url);
                            showToast('Đã sao chép liên kết bài viết!', 'success');
                            return;
                        } catch {}
                    }
                    showToast('Liên kết: ' + url, 'info');
                }
            });
        }

        const handleRemoveFavorite = async (foodId, foodName) => {
            try {
                const res = await fetchAPI(`/auth/me/favorites/${foodId}`, { method: 'DELETE' });
                if (res?.success) {
                    myFavorites = myFavorites.filter(item => (item.food?.id_food || item.food?.id || item.id_food) !== foodId);
                    renderSidebarFavsList();
                    renderFullFavsGrid();

                    const newCount = myFavorites.length;
                    const statFavs = document.getElementById('stat-favs-count');
                    const tabBadgeFavs = document.getElementById('tab-badge-favs');
                    const fullFavBadge = document.getElementById('full-favs-count-badge');

                    if (statFavs) statFavs.textContent = newCount;
                    if (tabBadgeFavs) tabBadgeFavs.textContent = newCount;
                    if (fullFavBadge) fullFavBadge.textContent = `${newCount} món`;

                    if (window._favListCache) {
                        window._favListCache = window._favListCache.filter(item => Number(item.id_food || item.id) !== Number(foodId));
                    }
                    if (window._userFavIds) {
                        window._userFavIds.delete(Number(foodId));
                    }
                    if (typeof window !== 'undefined' && window.syncFavBadge) {
                        window.syncFavBadge();
                    }
                    if (window.updateNavbarFavBadge) {
                        window.updateNavbarFavBadge(newCount);
                    }

                    showToast(`Đã bỏ lưu "${foodName}" khỏi danh sách yêu thích.`, 'info');
                } else {
                    showToast(res?.message || 'Không thể bỏ yêu thích món ăn.', 'error');
                }
            } catch (err) {
                showToast(err.message || 'Lỗi khi bỏ yêu thích món ăn.', 'error');
            }
        };

        const sidebarFavs = document.getElementById('sidebar-favs-list');
        if (sidebarFavs) {
            sidebarFavs.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-quick-remove-fav');
                if (btn) {
                    const foodId = Number(btn.getAttribute('data-id'));
                    const foodName = btn.getAttribute('data-name') || 'Món ăn';
                    btn.disabled = true;
                    handleRemoveFavorite(foodId, foodName);
                }
            });
        }

        const fullFavsGrid = document.getElementById('full-favs-grid');
        if (fullFavsGrid) {
            fullFavsGrid.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-full-remove-fav');
                if (btn) {
                    const foodId = Number(btn.getAttribute('data-id'));
                    const foodName = btn.getAttribute('data-name') || 'Món ăn';
                    btn.disabled = true;
                    handleRemoveFavorite(foodId, foodName);
                    return;
                }

                const card = e.target.closest('[data-fav-link]');
                if (card) {
                    const link = card.getAttribute('data-fav-link');
                    if (link) window.location.hash = link;
                }
            });
        }

        try {
            const [meRes, postsRes, favsRes] = await Promise.all([
                fetchAPI('/auth/me'),
                fetchAPI('/auth/me/posts'),
                fetchAPI('/auth/me/favorites')
            ]);

            if (meRes?.success && meRes.user) {
                currentUser = meRes.user;
                populateUserData(meRes.user);
            } else {
                showToast('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 'warning');
                setTimeout(() => { window.location.hash = '#/login'; }, 1000);
                return;
            }

            if (postsRes?.success && Array.isArray(postsRes.data)) {
                myPosts = postsRes.data;
                renderPostsGrid();
                const approvedCount = myPosts.filter(p => p.status === 'active').length;
                const totalCount = myPosts.length;
                const statPosts = document.getElementById('stat-posts-count');
                const tabBadgePosts = document.getElementById('tab-badge-posts');
                const secCounter = document.getElementById('section-posts-counter');
                if (statPosts) statPosts.textContent = approvedCount;
                if (tabBadgePosts) tabBadgePosts.textContent = totalCount;
                if (secCounter) secCounter.textContent = `(${totalCount})`;
            } else {
                renderPostsGrid();
            }

            if (favsRes?.success && Array.isArray(favsRes.data)) {
                myFavorites = favsRes.data;
                renderSidebarFavsList();
                renderFullFavsGrid();
                const count = myFavorites.length;
                const statFavs = document.getElementById('stat-favs-count');
                const tabBadgeFavs = document.getElementById('tab-badge-favs');
                const fullFavBadge = document.getElementById('full-favs-count-badge');
                if (statFavs) statFavs.textContent = count;
                if (tabBadgeFavs) tabBadgeFavs.textContent = count;
                if (fullFavBadge) fullFavBadge.textContent = `${count} món`;
            } else {
                renderSidebarFavsList();
                renderFullFavsGrid();
            }
        } catch (err) {
            showToast('Lỗi khi tải thông tin hồ sơ.', 'error');
        }
    }
};

export default Profile;

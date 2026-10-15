import { fetchAPI, BACKEND_URL, API_URL } from '../api.js';

export default function Navbar() {
    const currentHash = window.location.hash.slice(1).toLowerCase() || '/';
    const isHome = currentHash === '/' || currentHash === '';
    const isList = currentHash.startsWith('/danh-sach');
    const isCommunity = currentHash.startsWith('/cong-dong');
    const isAdmin = currentHash.startsWith('/admin');
    const isProfile = currentHash.startsWith('/ca-nhan');
    let authUser = null;

    try {
        authUser = JSON.parse(localStorage.getItem('auth_user') || 'null');
    } catch (e) {
        authUser = null;
    }

    const isLoggedIn = Boolean(localStorage.getItem('auth_token') && authUser);
    const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
    const authName = escapeHTML(authUser?.name || 'Tài khoản');
    const authAvatar = escapeHTML(authUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`);

    const getLinkClass = (isActive) => isActive 
        ? "text-[#F4A62A] font-extrabold relative py-1 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#F4A62A] after:left-0 after:bottom-0 transition-all" 
        : "text-white/85 font-semibold relative py-1 hover:text-[#F4A62A] transition-colors duration-200 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#F4A62A] after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-200";

    // Won dishes count (only for logged-in users)
    let wonCount = 0;
    try {
        if (isLoggedIn) {
            const won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
            wonCount = won.length;
        }
    } catch (e) {
        wonCount = 0;
    }

    return `
        <!-- Overlay for Cart / Favorite Drawer -->
        <div id="nav-drawer-overlay" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="fixed inset-0 bg-black/50 z-[65] hidden transition-opacity backdrop-blur-xs"></div>

        <header class="bg-[#0F4937] text-white sticky top-0 z-50 shadow-sm border-b border-white/10 overflow-x-clip">
            <div class="max-w-[1360px] mx-auto px-3 sm:px-4 lg:px-8 h-14 sm:h-[68px] flex items-center justify-between gap-2">
                
                <!-- Logo -->
                <a href="#/" class="flex items-center gap-2 group shrink-0">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#F4A62A] flex items-center justify-center text-[#0F4937] shadow-sm group-hover:scale-105 transition-transform">
                        <i class="fa-solid fa-kitchen-set text-sm sm:text-xl"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm sm:text-base lg:text-xl font-black tracking-tight text-white leading-tight font-sans">Hôm Nay Nấu Gì?</span>
                        <span class="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#F4A62A] font-black leading-none hidden min-[400px]:block">MÓN NGON MỖI NGÀY</span>
                    </div>
                </a>
                
                <!-- Center Navigation -->
                <nav class="hidden md:flex items-center gap-3 lg:gap-8 text-xs lg:text-sm">
                    <a href="#/" class="${getLinkClass(isHome)}">Trang chủ</a>
                    <a href="#/danh-sach" class="${getLinkClass(isList)}">Danh sách món ăn</a>
                    <a href="#/cong-dong" class="${getLinkClass(isCommunity)}">Cộng đồng</a>
                    ${authUser?.role === 'admin' ? `<a href="#/admin" class="${getLinkClass(isAdmin)}">Admin</a>` : ''}
                </nav>

                <!-- Right Action Icons & Auth -->
                <div class="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
                    <!-- Quick Search Button -->
                    <button onclick="document.getElementById('nav-search-bar').classList.toggle('hidden'); document.getElementById('nav-search-input')?.focus();" class="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:text-[#F4A62A] cursor-pointer" title="Tìm kiếm món">
                        <i class="fa-solid fa-magnifying-glass text-[11px] sm:text-sm"></i>
                    </button>

                    <!-- Favorites Heart Button (Desktop Only) -->
                    <button onclick="window.openFavoritesDrawer && window.openFavoritesDrawer()" class="hidden md:flex w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-all hover:text-rose-400 relative cursor-pointer" title="Món yêu thích">
                        <i class="fa-solid fa-heart text-[11px] sm:text-sm"></i>
                        <span id="nav-fav-badge" class="hidden absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-sm ring-2 ring-[#0F4937] animate-pulse">0</span>
                    </button>

                    <!-- Shopping List Drawer Button (Desktop Only) -->
                    <button onclick="window.openShoppingDrawer && window.openShoppingDrawer()" class="hidden md:flex w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-all hover:text-emerald-300 relative cursor-pointer" title="Danh sách đi chợ">
                        <i class="fa-solid fa-cart-shopping text-[11px] sm:text-sm"></i>
                        <span id="nav-shopping-badge" class="hidden absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-sm ring-2 ring-[#0F4937]">0</span>
                    </button>

                    <!-- Won Dishes / Random Cart Basket (Desktop Only) -->
                    <div class="relative hidden md:block">
                        <button onclick="window.toggleWonDishesPopover && window.toggleWonDishesPopover()" class="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:text-[#F4A62A] relative cursor-pointer" title="Mâm cơm đã quay">
                            <i class="fa-solid fa-basket-shopping text-[11px] sm:text-sm"></i>
                            <span id="nav-won-badge" class="${wonCount > 0 ? '' : 'hidden'} absolute -top-1 -right-1 bg-[#F4A62A] text-[#0F4937] text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-sm ring-2 ring-[#0F4937] animate-pulse">
                                ${wonCount}
                            </span>
                        </button>

                        <!-- Won Dishes Dropdown Popover -->
                        <div id="nav-won-popover" class="hidden absolute right-0 top-full mt-2.5 w-80 sm:w-96 bg-white text-text-main rounded-2xl shadow-2xl border border-beige-border z-[70] overflow-hidden">
                            <div class="p-3 bg-[#0F4937] text-white flex items-center justify-between border-b border-white/10">
                                <div class="flex items-center gap-2 font-bold text-xs sm:text-sm">
                                    <i class="fa-solid fa-basket-shopping text-[#F4A62A]"></i>
                                    <span>Món đã random</span>
                                </div>
                                <span id="nav-won-count-header" class="text-[11px] bg-white/15 px-2 py-0.5 rounded-full font-bold text-[#F4A62A]">${wonCount} món</span>
                            </div>
                            <div id="nav-won-list" class="max-h-72 overflow-y-auto p-3 space-y-2 divide-y divide-gray-100">
                                <!-- Rendered dynamically by JS -->
                            </div>
                            <div class="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                                <button id="nav-won-clear-btn" onclick="window.clearWonDishes && window.clearWonDishes()" class="${(!isLoggedIn || wonCount === 0) ? 'hidden' : ''} px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition cursor-pointer">Xóa hết</button>
                                <a href="#/danh-sach" onclick="document.getElementById('nav-won-popover').classList.add('hidden')" class="flex-1 text-center py-1.5 bg-[#0F4937] hover:bg-[#145A43] text-white text-xs font-bold rounded-xl shadow-xs transition">Xem thêm món</a>
                            </div>
                        </div>
                    </div>

                    <!-- Notification Button -->
                    <button onclick="window.Popup ? window.Popup.info('Bạn chưa có thông báo mới.', 'Thông báo hệ thống') : alert('Bạn chưa có thông báo mới.')" class="w-8.5 h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:text-amber-300 cursor-pointer hidden lg:flex" title="Thông báo">
                        <i class="fa-solid fa-bell text-xs sm:text-sm"></i>
                    </button>

                    <!-- Divider -->
                    <div class="h-5 w-px bg-white/20 mx-0.5 hidden lg:block"></div>

                    <!-- Auth Links (Desktop Only) -->
                    <div class="hidden md:flex items-center gap-1 sm:gap-2">
                        ${isLoggedIn ? `
                            <div class="relative group/user py-2">
                                <!-- User Trigger Pill -->
                                <a href="#/ca-nhan" class="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full ${isProfile ? 'bg-white/20 border-[#F4A62A] ring-1 ring-[#F4A62A]' : 'bg-white/10 hover:bg-white/20 border-white/15'} border transition-all text-white cursor-pointer select-none" title="Trang cá nhân">
                                    <img id="nav-user-avatar" src="${authAvatar}" alt="${authName}" class="w-7 h-7 rounded-full object-cover bg-white/20 ring-1 ring-white/30">
                                    <span id="nav-user-name" class="max-w-28 truncate text-xs font-bold text-white group-hover/user:text-[#F4A62A] transition-colors">${authName}</span>
                                    <i class="fa-solid fa-chevron-down text-[10px] text-white/70 group-hover/user:text-[#F4A62A] group-hover/user:rotate-180 transition-transform duration-200"></i>
                                </a>

                                <!-- Dropdown Submenu -->
                                <div class="absolute right-0 top-full pt-1 w-60 z-50 opacity-0 invisible pointer-events-none group-hover/user:opacity-100 group-hover/user:visible group-hover/user:pointer-events-auto transform group-hover/user:translate-y-0 translate-y-1 transition-all duration-200">
                                    <div class="bg-white text-gray-800 rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 py-2 overflow-hidden">
                                        <!-- User Info Header -->
                                        <div class="px-4 py-3 bg-gradient-to-r from-emerald-50/70 to-amber-50/50 border-b border-gray-100 flex items-center gap-3">
                                            <img src="${authAvatar}" alt="${authName}" class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs shrink-0">
                                            <div class="min-w-0 flex-1">
                                                <p class="text-xs font-black text-gray-900 truncate">${authName}</p>
                                                <span class="inline-flex items-center gap-1 text-[10px] font-bold ${authUser?.role === 'admin' ? 'text-amber-600' : 'text-emerald-700'}">
                                                    <span class="w-1.5 h-1.5 rounded-full ${authUser?.role === 'admin' ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
                                                    ${authUser?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                                                </span>
                                            </div>
                                        </div>

                                        <!-- Menu Links -->
                                        <div class="py-1.5">
                                            <a href="#/ca-nhan" class="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-700 hover:text-[#0F4937] hover:bg-emerald-50/60 transition-colors">
                                                <div class="w-7 h-7 rounded-lg bg-emerald-50 text-[#0F4937] flex items-center justify-center shrink-0">
                                                    <i class="fa-regular fa-user text-xs"></i>
                                                </div>
                                                <span>Trang cá nhân</span>
                                            </a>

                                            <a href="#/cong-dong" class="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-700 hover:text-[#0F4937] hover:bg-emerald-50/60 transition-colors">
                                                <div class="w-7 h-7 rounded-lg bg-amber-50 text-[#F4A62A] flex items-center justify-center shrink-0">
                                                    <i class="fa-solid fa-users text-xs"></i>
                                                </div>
                                                <span>Cộng đồng ẩm thực</span>
                                            </a>

                                            <button type="button" onclick="window.openFavoritesDrawer && window.openFavoritesDrawer()" class="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-700 hover:text-[#0F4937] hover:bg-emerald-50/60 transition-colors cursor-pointer">
                                                <div class="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                                                    <i class="fa-regular fa-heart text-xs"></i>
                                                </div>
                                                <span>Món yêu thích</span>
                                            </button>

                                            ${authUser?.role === 'admin' ? `
                                                <a href="#/admin" class="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-[#0F4937] hover:bg-emerald-50/80 transition-colors">
                                                    <div class="w-7 h-7 rounded-lg bg-emerald-100 text-[#0F4937] flex items-center justify-center shrink-0">
                                                        <i class="fa-solid fa-shield-halved text-xs"></i>
                                                    </div>
                                                    <span>Trang quản trị (Admin)</span>
                                                </a>
                                            ` : ''}
                                        </div>

                                        <!-- Divider -->
                                        <div class="my-1 border-t border-gray-100"></div>

                                        <!-- Logout Button at bottom -->
                                        <div class="px-2 pt-1 pb-0.5">
                                            <button type="button" onclick="window.logoutAuth && window.logoutAuth()" class="w-full flex items-center gap-3 px-3 py-2 text-xs font-black text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer">
                                                <div class="w-7 h-7 rounded-lg bg-rose-100/70 text-rose-600 flex items-center justify-center shrink-0">
                                                    <i class="fa-solid fa-arrow-right-from-bracket text-xs"></i>
                                                </div>
                                                <span>Đăng xuất</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ` : `
                            <a href="#/login" class="text-white/85 hover:text-white font-bold text-[11px] sm:text-xs lg:text-sm px-1.5 sm:px-2 py-1 rounded-lg hover:bg-white/10 transition whitespace-nowrap">Đăng nhập</a>
                            <a href="#/login?mode=register" class="px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 bg-[#F4A62A] hover:bg-[#E59516] text-[#0F4937] font-black rounded-full text-xs lg:text-sm shadow-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap hidden sm:inline-flex">Đăng ký</a>
                        `}
                    </div>
                </div>
            </div>

            <!-- Dropdown Search Bar -->
            <div id="nav-search-bar" class="hidden absolute top-full left-0 w-full bg-white shadow-xl py-2.5 border-t border-beige-border z-40 transition-all">
                <div class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
                    <form onsubmit="event.preventDefault(); const q = document.getElementById('nav-search-input').value; if(q) window.location.hash = '#/danh-sach?search=' + encodeURIComponent(q);" class="relative max-w-2xl mx-auto flex items-center">
                        <i class="fa-solid fa-magnifying-glass absolute left-4 text-gray-400 text-xs"></i>
                        <input id="nav-search-input" type="text" placeholder="Tìm kiếm món ăn, nguyên liệu, loại món..." class="w-full pl-10 pr-20 py-2 bg-gray-50 border border-gray-200 rounded-full text-text-main text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4937] focus:bg-white transition-all">
                        <button type="submit" class="absolute right-1.5 px-3.5 py-1 bg-[#0F4937] hover:bg-[#145A43] text-white rounded-full text-xs font-bold transition">Tìm</button>
                    </form>
                </div>
            </div>
        </header>

        <!-- FAVORITES DRAWER -->
        <div id="nav-fav-modal" class="fixed inset-y-0 right-0 w-[85vw] sm:w-96 bg-white shadow-2xl z-[70] transform translate-x-full invisible pointer-events-none hidden transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-[#0F4937] text-white">
                <div class="flex items-center gap-2">
                    <h3 class="text-base font-bold flex items-center gap-2"><i class="fa-solid fa-heart text-[#F4A62A]"></i> Món yêu thích</h3>
                    <span id="nav-fav-count-header" class="text-xs bg-white/15 px-2.5 py-0.5 rounded-full font-bold text-[#F4A62A]">0 món</span>
                </div>
                <button onclick="window.closeNavDrawers && window.closeNavDrawers()" class="hover:bg-white/10 text-white transition text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">&times;</button>
            </div>
            
            <!-- Chế độ lưu thông báo -->
            <div class="px-4 py-2 bg-emerald-50/70 border-b border-emerald-100 text-[11px] flex items-center justify-between">
                <span id="nav-fav-storage-hint" class="font-medium flex items-center gap-1.5 text-text-muted">
                    <i class="fa-solid fa-spinner animate-spin text-[10px]"></i> Đang đồng bộ...
                </span>
                <button type="button" id="btn-clear-all-favs" onclick="window.clearFavorites && window.clearFavorites()" class="text-rose-600 hover:text-rose-700 font-bold text-[11px] cursor-pointer hover:underline hidden">
                    Xóa hết
                </button>
            </div>

            <!-- Danh sách món yêu thích -->
            <div id="nav-fav-list-container" class="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                    <div class="w-16 h-16 mb-3 rounded-full bg-rose-50 flex items-center justify-center border-2 border-rose-100 text-rose-400">
                        <i class="fa-regular fa-heart text-2xl"></i>
                    </div>
                    <p class="font-bold text-gray-700 text-sm">Chưa có món yêu thích</p>
                    <p class="text-xs text-gray-400 mt-1 max-w-[200px]">Hãy nhấn biểu tượng trái tim ở các món ăn để lưu lại đây.</p>
                    <a href="#/danh-sach" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Khám phá món ngay</a>
                </div>
            </div>

            <!-- Footer Drawer Favorites -->
            <div class="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shadow-xs">
                <a href="#/danh-sach" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="flex-1 text-center py-2 bg-gray-100 hover:bg-gray-200 text-text-main text-xs font-bold rounded-xl transition">Khám phá món</a>
                ${isLoggedIn ? `
                    <a href="#/ca-nhan" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="flex-1 text-center py-2 bg-[#0F4937] hover:bg-[#145A43] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-user text-[11px] text-[#F4A62A]"></i>
                        <span>Quản lý cá nhân</span>
                    </a>
                ` : `
                    <a href="#/login" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="flex-1 text-center py-2 bg-[#F4A62A] hover:bg-[#E59516] text-[#0F4937] text-xs font-black rounded-xl transition shadow-xs flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-arrow-right-to-bracket text-[11px]"></i>
                        <span>Đăng nhập</span>
                    </a>
                `}
            </div>
        </div>

        <!-- SHOPPING LIST DRAWER -->
        <div id="nav-shopping-drawer" class="fixed inset-y-0 right-0 w-[90vw] sm:w-[420px] bg-white shadow-2xl z-[70] transform translate-x-full invisible pointer-events-none hidden transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-[#0F4937] text-white">
                <div class="flex items-center gap-2 font-bold text-base">
                    <i id="nav-shopping-title-icon" class="fa-solid fa-cart-shopping text-[#F4A62A]"></i>
                    <span id="nav-shopping-title-text">Danh sách đi chợ</span>
                    <span id="nav-shopping-header-count" class="text-[11px] bg-white/15 px-2 py-0.5 rounded-full font-bold text-[#F4A62A]">0 món</span>
                </div>
                <button onclick="window.closeNavDrawers && window.closeNavDrawers()" class="hover:bg-white/10 text-white transition text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">&times;</button>
            </div>

            <!-- Tab Switcher: Nguyên liệu đi chợ vs Món đã random (Gacha) -->
            <div class="grid grid-cols-2 bg-gray-100/90 p-1 border-b border-gray-200 text-xs font-bold text-center shrink-0">
                <button type="button" id="nav-tab-btn-shopping" onclick="window.switchNavShoppingTab && window.switchNavShoppingTab('shopping')" class="py-2 rounded-lg bg-white text-primary shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-cart-shopping text-emerald-600"></i>
                    <span>Nguyên liệu</span>
                </button>
                <button type="button" id="nav-tab-btn-won" onclick="window.switchNavShoppingTab && window.switchNavShoppingTab('won')" class="py-2 rounded-lg text-gray-500 hover:text-primary transition cursor-pointer flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-dice text-amber-500"></i>
                    <span>Món đã random</span>
                    <span id="nav-tab-won-badge" class="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full hidden">0</span>
                </button>
            </div>

            <!-- Panel 1: Nguyên liệu đi chợ -->
            <div id="nav-panel-shopping" class="flex-1 flex flex-col min-h-0">
                <!-- Quick Add Item Form -->
                <div class="p-3 bg-gray-100/70 border-b border-gray-200">
                    <form id="form-quick-add-item" onsubmit="window.quickAddShoppingItem && window.quickAddShoppingItem(event)" class="flex gap-1.5">
                        <input type="text" id="quick-add-name" placeholder="Thêm nguyên liệu..." class="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary" required>
                        <input type="number" id="quick-add-qty" placeholder="SL" value="1" min="0.1" step="any" class="w-14 px-2 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-center focus:outline-none focus:ring-1 focus:ring-primary">
                        <input type="text" id="quick-add-unit" placeholder="ĐVT" value="cái" class="w-14 px-2 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-center focus:outline-none focus:ring-1 focus:ring-primary">
                        <button type="submit" class="px-3 py-1.5 bg-[#0F4937] hover:bg-[#145A43] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer" title="Thêm">+</button>
                    </form>
                </div>
                
                <div id="nav-shopping-items-list" class="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-2">
                    <p class="text-center text-xs text-gray-400 py-10">Đang tải danh sách đi chợ...</p>
                </div>

                <div class="p-3 bg-white border-t border-gray-100 flex items-center justify-between shrink-0">
                    <button type="button" onclick="window.clearShoppingList && window.clearShoppingList()" class="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition cursor-pointer">Dọn sạch</button>
                    <button type="button" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="px-4 py-1.5 bg-[#0F4937] hover:bg-[#145A43] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer">Đóng</button>
                </div>
            </div>

            <!-- Panel 2: Món đã random (Gacha) -->
            <div id="nav-panel-won" class="flex-1 flex flex-col min-h-0 hidden">
                <div class="p-3 bg-amber-50/70 border-b border-amber-100 text-xs text-amber-800 flex items-center justify-between font-bold">
                    <span class="flex items-center gap-1.5">
                        <i class="fa-solid fa-dice text-[#F4A62A]"></i>
                        <span>Món vừa quay từ Vòng quay Gacha</span>
                    </span>
                    <button type="button" onclick="window.clearWonDishes && window.clearWonDishes()" class="text-xs text-rose-600 hover:underline cursor-pointer font-bold">Xóa hết</button>
                </div>
                
                <div id="nav-drawer-won-items-list" class="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-2">
                    <!-- Rendered by renderWonDishesInDrawer -->
                </div>

                <div class="p-3 bg-white border-t border-gray-100 flex items-center justify-between shrink-0">
                    <a href="#/" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="px-3 py-1.5 text-xs text-[#0F4937] font-bold hover:underline">Quay thêm món</a>
                    <button type="button" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="px-4 py-1.5 bg-[#0F4937] hover:bg-[#145A43] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer">Đóng</button>
                </div>
            </div>

            <!-- Footer Drawer -->
            <div class="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shadow-xs">
                <a href="#/danh-sach" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="flex-1 text-center py-2 bg-gray-100 hover:bg-gray-200 text-text-main text-xs font-bold rounded-xl transition">Khám phá món</a>
                ${isLoggedIn ? `
                    <a href="#/ca-nhan" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="flex-1 text-center py-2 bg-[#0F4937] hover:bg-[#145A43] text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-user text-[11px] text-[#F4A62A]"></i>
                        <span>Quản lý cá nhân</span>
                    </a>
                ` : `
                    <a href="#/login" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="flex-1 text-center py-2 bg-[#F4A62A] hover:bg-[#E59516] text-[#0F4937] text-xs font-black rounded-xl transition shadow-xs flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-arrow-right-to-bracket text-[11px]"></i>
                        <span>Đăng nhập để lưu</span>
                    </a>
                `}
            </div>
        </div>

        <!-- BOTTOM NAVIGATION BAR FOR MOBILE (< md) -->
        <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E1D6] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 pt-1 pb-2 flex items-center justify-around select-none" style="padding-bottom: max(0.5rem, env(safe-area-inset-bottom, 8px));">
            <!-- 1. Trang chủ -->
            <a href="#/" onclick="${isHome ? 'window.scrollTo({ top: 0, behavior: \'smooth\' });' : ''}" class="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${isHome ? 'text-[#145A43] font-black' : 'text-[#718078] hover:text-[#145A43] font-semibold'}">
                <div class="relative flex items-center justify-center w-6 h-6">
                    <i class="fa-solid fa-house text-base ${isHome ? 'text-[#145A43] scale-110' : ''}"></i>
                </div>
                <span class="text-[10px] mt-0.5 leading-tight ${isHome ? 'font-bold text-[#145A43]' : ''}">Trang chủ</span>
            </a>

            <!-- 2. Thực đơn (Danh sách món) -->
            <a href="#/danh-sach" onclick="${isList ? 'window.scrollTo({ top: 0, behavior: \'smooth\' });' : ''}" class="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${isList ? 'text-[#145A43] font-black' : 'text-[#718078] hover:text-[#145A43] font-semibold'}">
                <div class="relative flex items-center justify-center w-6 h-6">
                    <i class="fa-solid fa-utensils text-base ${isList ? 'text-[#145A43] scale-110' : ''}"></i>
                </div>
                <span class="text-[10px] mt-0.5 leading-tight ${isList ? 'font-bold text-[#145A43]' : ''}">Thực đơn</span>
            </a>

            <!-- 3. Cộng đồng -->
            <a href="#/cong-dong" onclick="${isCommunity ? 'window.scrollTo({ top: 0, behavior: \'smooth\' });' : ''}" class="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${isCommunity ? 'text-[#145A43] font-black' : 'text-[#718078] hover:text-[#145A43] font-semibold'}">
                <div class="relative flex items-center justify-center w-6 h-6">
                    <i class="fa-solid fa-users text-base ${isCommunity ? 'text-[#145A43] scale-110' : ''}"></i>
                </div>
                <span class="text-[10px] mt-0.5 leading-tight ${isCommunity ? 'font-bold text-[#145A43]' : ''}">Cộng đồng</span>
            </a>

            <!-- 4. Đi chợ (kèm badge số lượng) -->
            <button type="button" onclick="window.openShoppingDrawer && window.openShoppingDrawer()" class="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all text-[#718078] hover:text-[#145A43] font-semibold cursor-pointer">
                <div class="relative flex items-center justify-center w-6 h-6">
                    <i class="fa-solid fa-cart-shopping text-base"></i>
                    <span id="nav-bottom-shopping-badge" class="hidden absolute -top-1 -right-2 bg-emerald-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">0</span>
                </div>
                <span class="text-[10px] mt-0.5 leading-tight">Đi chợ</span>
            </button>

            <!-- 5. Cá nhân -->
            <a href="#/ca-nhan" onclick="${isProfile ? 'window.scrollTo({ top: 0, behavior: \'smooth\' });' : ''}" class="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${isProfile ? 'text-[#145A43] font-black' : 'text-[#718078] hover:text-[#145A43] font-semibold'}">
                <div class="relative flex items-center justify-center w-6 h-6">
                    ${isLoggedIn ? `
                        <img src="${authAvatar}" alt="${authName}" class="w-5 h-5 rounded-full object-cover ring-1 ${isProfile ? 'ring-[#145A43] ring-2' : 'ring-gray-300'}">
                    ` : `
                        <i class="fa-solid fa-circle-user text-base ${isProfile ? 'text-[#145A43]' : ''}"></i>
                    `}
                </div>
                <span class="text-[10px] mt-0.5 leading-tight ${isProfile ? 'font-bold text-[#145A43]' : ''}">Cá nhân</span>
            </a>
        </nav>
    `;
}

if (typeof window !== 'undefined') {
    window._favListCache = null;
    window._userFavIds = new Set();

    // Lấy danh sách khách từ localStorage (tồn tại sau khi tải lại trang)
    window.getGuestFavorites = () => {
        try {
            return JSON.parse(localStorage.getItem('guest_favorites') || sessionStorage.getItem('guest_favorites') || '[]');
        } catch (e) {
            return [];
        }
    };

    window.setGuestFavorites = (list) => {
        try {
            localStorage.setItem('guest_favorites', JSON.stringify(list || []));
        } catch (e) {}
    };

    // Lấy danh sách favorites theo trạng thái login
    window.getStoredFavorites = async (forceRefresh = false) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            if (window._favListCache && !forceRefresh) {
                return window._favListCache;
            }
            try {
                const res = await fetch(`${API_URL}/auth/me/favorites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const json = await res.json();
                if (json?.success && Array.isArray(json.data)) {
                    const formatted = json.data.map(fav => {
                        const food = fav.food || {};
                        return {
                            id: food.id_food || fav.id_food || fav.id,
                            id_food: food.id_food || fav.id_food || fav.id,
                            id_favorite: fav.id_favorite,
                            name: food.name || fav.name || 'Món ngon',
                            image: food.image || fav.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`,
                            time: food.time || (food.cooking_time ? `${food.cooking_time} phút` : '30 phút'),
                            cooking_time: food.cooking_time,
                            category: food.category || 'Món ngon',
                            description: food.description || ''
                        };
                    });
                    window._favListCache = formatted;
                    window._userFavIds = new Set(formatted.map(item => Number(item.id_food || item.id)));
                    return formatted;
                }
            } catch (err) {
                console.warn('Lỗi lấy danh sách món yêu thích:', err);
            }
            return window._favListCache || [];
        } else {
            const guestList = window.getGuestFavorites();
            window._userFavIds = new Set(guestList.map(item => Number(item.id_food || item.id)));
            return guestList;
        }
    };

    // Kiểm tra món đã được yêu thích chưa
    window.isDishFavorite = (dishId) => {
        const numId = Number(dishId);
        if (!numId) return false;
        if (window._userFavIds && window._userFavIds.has(numId)) {
            return true;
        }
        const token = localStorage.getItem('auth_token');
        if (!token) {
            return window.getGuestFavorites().some(item => Number(item.id_food || item.id) === numId);
        }
        if (window._favListCache) {
            return window._favListCache.some(item => Number(item.id_food || item.id) === numId);
        }
        return false;
    };

    // Đồng bộ số lượng trên icon trái tim Navbar
    window.syncFavBadge = async () => {
        const badge = document.getElementById('nav-fav-badge');
        const countHeader = document.getElementById('nav-fav-count-header');
        const token = localStorage.getItem('auth_token');

        let count = 0;
        if (token) {
            const list = await window.getStoredFavorites(false);
            count = list.length;
        } else {
            count = window.getGuestFavorites().length;
        }

        if (badge) {
            badge.textContent = count;
            badge.classList.toggle('hidden', count === 0);
        }
        if (countHeader) {
            countHeader.textContent = `${count} món`;
        }
        return count;
    };

    // Render danh sách trong Drawer Món yêu thích
    window.renderFavoritesList = async () => {
        const container = document.getElementById('nav-fav-list-container');
        const countHeader = document.getElementById('nav-fav-count-header');
        const badge = document.getElementById('nav-fav-badge');
        const hintEl = document.getElementById('nav-fav-storage-hint');
        const clearBtn = document.getElementById('btn-clear-all-favs');
        if (!container) return;

        const token = localStorage.getItem('auth_token');

        // Cập nhật nhãn trạng thái lưu trữ
        if (hintEl) {
            if (token) {
                hintEl.innerHTML = `
                    <span class="text-emerald-700 font-bold flex items-center gap-1.5">
                        <i class="fa-solid fa-cloud-arrow-up text-emerald-600"></i>
                        <span>Đã đồng bộ với tài khoản cá nhân</span>
                    </span>
                `;
            } else {
                hintEl.innerHTML = `
                    <span class="text-amber-800 font-bold flex items-center gap-1.5" title="Dữ liệu lưu tạm trên trình duyệt hiện tại bằng localStorage">
                        <i class="fa-solid fa-clock-rotate-left text-amber-600"></i>
                        <span>Lưu tạm trên trình duyệt (Chưa đăng nhập)</span>
                    </span>
                `;
            }
        }

        container.innerHTML = `
            <div class="py-12 text-center text-text-muted">
                <i class="fa-solid fa-spinner animate-spin text-2xl text-[#0F4937] mb-2"></i>
                <p class="text-xs font-semibold">Đang nạp món yêu thích...</p>
            </div>
        `;

        const list = await window.getStoredFavorites(true);
        const count = list.length;

        if (badge) {
            badge.textContent = count;
            badge.classList.toggle('hidden', count === 0);
        }
        if (countHeader) {
            countHeader.textContent = `${count} món`;
        }
        if (clearBtn) {
            clearBtn.classList.toggle('hidden', count === 0);
        }

        if (count === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                    <div class="w-16 h-16 mb-3 rounded-full bg-rose-50 flex items-center justify-center border-2 border-rose-100 text-rose-400">
                        <i class="fa-regular fa-heart text-2xl"></i>
                    </div>
                    <p class="font-bold text-gray-700 text-sm">Chưa có món yêu thích</p>
                    <p class="text-xs text-gray-400 mt-1 max-w-[200px]">Hãy nhấn biểu tượng trái tim ở các món ăn để lưu lại đây.</p>
                    <a href="#/danh-sach" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Khám phá món ngay</a>
                </div>
            `;
            return;
        }

        const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));

        container.innerHTML = list.map(item => {
            const foodId = item.id_food || item.id;
            const foodName = escapeHTML(item.name || 'Món ngon');
            const foodImg = item.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`;
            const foodTime = item.time || (item.cooking_time ? `${item.cooking_time} phút` : '30 phút');
            const foodCategory = escapeHTML(item.category || 'Món ngon');

            return `
                <div class="flex items-center gap-3 p-2.5 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-xs transition group">
                    <a href="#/mon-an/${foodId}" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="shrink-0">
                        <img src="${foodImg}" alt="${foodName}" class="w-14 h-14 rounded-xl object-cover border border-gray-100 group-hover:scale-105 transition duration-300" onerror="this.src='${BACKEND_URL}/images/foods/thit-kho-trung.jpg'">
                    </a>
                    <div class="flex-1 min-w-0">
                        <a href="#/mon-an/${foodId}" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="font-bold text-xs sm:text-sm text-text-main hover:text-[#0F4937] transition line-clamp-1">${foodName}</a>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md border border-emerald-100/60">${foodCategory}</span>
                            <span class="text-[11px] text-gray-400 flex items-center gap-1"><i class="fa-regular fa-clock text-amber-500 text-[10px]"></i> ${foodTime}</span>
                        </div>
                    </div>
                    <button onclick="window.removeFavoriteDish(${foodId}, '${foodName}')" class="w-8 h-8 rounded-xl bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition flex items-center justify-center shrink-0 cursor-pointer shadow-2xs" title="Bỏ yêu thích">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            `;
        }).join('');
    };

    // Xóa món khỏi yêu thích
    window.removeFavoriteDish = async (foodId, foodName = '') => {
        const numId = Number(foodId);
        if (!numId) return;

        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const res = await fetch(`${API_URL}/auth/me/favorites/${numId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` }
                });
                const json = await res.json();
                if (json?.success) {
                    if (window._favListCache) {
                        window._favListCache = window._favListCache.filter(item => Number(item.id_food || item.id) !== numId);
                    }
                    if (window._userFavIds) {
                        window._userFavIds.delete(numId);
                    }
                }
            } catch (err) {
                console.warn('Lỗi khi xóa món yêu thích:', err);
            }
        } else {
            let list = window.getGuestFavorites();
            list = list.filter(item => Number(item.id_food || item.id) !== numId);
            window.setGuestFavorites(list);
            if (window._userFavIds) {
                window._userFavIds.delete(numId);
            }
        }

        // Cập nhật giao diện
        await window.renderFavoritesList();
        await window.syncFavBadge();

        // Cập nhật nút tim trên trang danh sách nếu có
        document.querySelectorAll(`.btn-favorite-dish[data-id="${numId}"]`).forEach(btn => {
            btn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
            const icon = btn.querySelector('i');
            if (icon) icon.className = "fa-regular fa-heart text-sm";
        });

        // Cập nhật nút tim trên trang chi tiết món nếu đang xem món này
        const detailFavBtn = document.getElementById('fav-btn');
        if (detailFavBtn && window.location.hash.includes(`/mon-an/${numId}`)) {
            detailFavBtn.classList.remove('text-rose-500', 'bg-rose-50', 'border-rose-300');
            const icon = detailFavBtn.querySelector('i');
            if (icon) icon.className = "fa-regular fa-heart text-rose-500";
            const span = detailFavBtn.querySelector('span');
            if (span) span.textContent = 'Lưu món';
        }

        if (window.Popup) {
            window.Popup.toast(`Đã xóa "${foodName || 'món'}" khỏi Yêu thích.`, 'info');
        }
    };

    // Toggle Favorite (thêm nếu chưa có, xóa nếu đã có)
    window.toggleFavoriteDish = async (dish) => {
        if (!dish) return false;
        const foodId = Number(dish.id || dish.id_food);
        if (!foodId) return false;

        const isFav = window.isDishFavorite(foodId);
        const foodName = dish.name || 'Món ăn';
        const foodImage = dish.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`;
        const foodTime = dish.time || (dish.cooking_time ? `${dish.cooking_time} phút` : '30 phút');
        const foodCategory = dish.category || 'Món ngon';

        if (isFav) {
            await window.removeFavoriteDish(foodId, foodName);
            return false;
        }

        // Chưa yêu thích -> Thêm vào
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const res = await fetch(`${API_URL}/auth/me/favorites/${foodId}`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    },
                    body: JSON.stringify({ id_food: foodId })
                });
                const json = await res.json();
                if (json?.success) {
                    if (window._userFavIds) window._userFavIds.add(foodId);
                    await window.getStoredFavorites(true);
                    if (window.Popup) {
                        window.Popup.toast(`Đã thêm "${foodName}" vào Món yêu thích! ❤️`, 'success');
                    }
                } else {
                    if (window.Popup) {
                        window.Popup.toast(json?.message || 'Không thể lưu món yêu thích.', 'error');
                    }
                    return false;
                }
            } catch (err) {
                console.warn('Lỗi thêm yêu thích:', err);
                return false;
            }
        } else {
            // Khách chưa đăng nhập: lưu vào localStorage (tồn tại khi tải lại trang)
            let guestList = window.getGuestFavorites();
            guestList = guestList.filter(item => Number(item.id_food || item.id) !== foodId);
            guestList.unshift({
                id: foodId,
                id_food: foodId,
                name: foodName,
                image: foodImage,
                time: foodTime,
                category: foodCategory
            });
            window.setGuestFavorites(guestList);
            if (window._userFavIds) window._userFavIds.add(foodId);
            if (window.Popup) {
                window.Popup.toast(`Đã lưu "${foodName}" vào Món yêu thích! ❤️`, 'success');
            }
        }

        // Re-render UI
        await window.renderFavoritesList();
        await window.syncFavBadge();

        // Cập nhật card trên trang danh sách
        document.querySelectorAll(`.btn-favorite-dish[data-id="${foodId}"]`).forEach(btn => {
            btn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-rose-500 text-white backdrop-blur-sm flex items-center justify-center shadow-sm scale-110 transition-all cursor-pointer z-20";
            setTimeout(() => btn.classList.remove('scale-110'), 150);
            const icon = btn.querySelector('i');
            if (icon) icon.className = "fa-solid fa-heart text-sm";
        });

        // Cập nhật nút trang chi tiết món nếu đang xem món này
        const detailFavBtn = document.getElementById('fav-btn');
        if (detailFavBtn && window.location.hash.includes(`/mon-an/${foodId}`)) {
            detailFavBtn.classList.add('text-rose-500', 'bg-rose-50', 'border-rose-300');
            const icon = detailFavBtn.querySelector('i');
            if (icon) icon.className = "fa-solid fa-heart text-rose-500";
            const span = detailFavBtn.querySelector('span');
            if (span) span.textContent = 'Đã lưu yêu thích';
        }

        return true;
    };

    // Xóa toàn bộ danh sách yêu thích
    window.clearFavorites = async () => {
        if (window.Popup) {
            const confirmed = await window.Popup.confirm({
                title: 'Xóa toàn bộ món yêu thích',
                message: 'Bạn có chắc chắn muốn xóa hết tất cả món ăn trong danh sách yêu thích không?',
                type: 'warning',
                confirmText: 'Xóa hết',
                cancelText: 'Giữ lại',
                confirmButtonColor: 'danger'
            });
            if (!confirmed) return;
        }

        const token = localStorage.getItem('auth_token');
        if (token) {
            const list = await window.getStoredFavorites(false);
            for (const item of list) {
                const fId = item.id_food || item.id;
                try {
                    await fetch(`${API_URL}/auth/me/favorites/${fId}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (e) {}
            }
            window._favListCache = [];
            window._userFavIds = new Set();
        } else {
            localStorage.removeItem('guest_favorites');
            sessionStorage.removeItem('guest_favorites');
            window._userFavIds = new Set();
        }

        await window.renderFavoritesList();
        await window.syncFavBadge();

        // Reset các nút tim trên trang nếu có
        document.querySelectorAll('.btn-favorite-dish').forEach(btn => {
            btn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
            const icon = btn.querySelector('i');
            if (icon) icon.className = "fa-regular fa-heart text-sm";
        });

        if (window.Popup) {
            window.Popup.toast('Đã làm trống danh sách món yêu thích.', 'info');
        }
    };

    window.logoutAuth = async () => {
        if (window.Popup) {
            const confirmed = await window.Popup.confirm({
                title: 'Đăng xuất tài khoản',
                message: 'Bạn có chắc chắn muốn đăng xuất khỏi Hôm Nay Nấu Gì không?',
                type: 'question',
                confirmText: 'Đăng xuất',
                cancelText: 'Ở lại',
                confirmButtonColor: 'warning'
            });
            if (!confirmed) return;
        }

        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                await fetch(`${API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (e) {}
        }
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('won_dishes');
        window._favListCache = null;
        window._userFavIds = new Set();
        window.location.hash = '#/login';
        if (window.Popup) {
            window.Popup.toast('Đã đăng xuất tài khoản thành công.', 'info');
        }
    };

    window.closeNavDrawers = () => {
        const overlay = document.getElementById('nav-drawer-overlay');
        const favModal = document.getElementById('nav-fav-modal');
        const shoppingModal = document.getElementById('nav-shopping-drawer');
        const wonPopover = document.getElementById('nav-won-popover');
        if (overlay) overlay.classList.add('hidden');
        if (favModal) {
            favModal.classList.add('translate-x-full');
            setTimeout(() => {
                if (favModal.classList.contains('translate-x-full')) {
                    favModal.classList.add('invisible', 'pointer-events-none', 'hidden');
                }
            }, 300);
        }
        if (shoppingModal) {
            shoppingModal.classList.add('translate-x-full');
            setTimeout(() => {
                if (shoppingModal.classList.contains('translate-x-full')) {
                    shoppingModal.classList.add('invisible', 'pointer-events-none', 'hidden');
                }
            }, 300);
        }
        if (wonPopover) wonPopover.classList.add('hidden');
    };

    window.openFavoritesDrawer = () => {
        const overlay = document.getElementById('nav-drawer-overlay');
        const favModal = document.getElementById('nav-fav-modal');
        if (overlay) overlay.classList.remove('hidden');
        if (favModal) {
            favModal.classList.remove('hidden');
            requestAnimationFrame(() => {
                favModal.classList.remove('invisible', 'pointer-events-none', 'translate-x-full');
            });
            if (window.renderFavoritesList) window.renderFavoritesList();
            if (window.loadFavoritesInNav) window.loadFavoritesInNav();
            if (window.loadNavbarFavorites) window.loadNavbarFavorites();
        }
    };

    window.openShoppingDrawer = (defaultTab = 'shopping') => {
        const overlay = document.getElementById('nav-drawer-overlay');
        const shoppingModal = document.getElementById('nav-shopping-drawer');
        if (overlay) overlay.classList.remove('hidden');
        if (shoppingModal) {
            shoppingModal.classList.remove('hidden');
            requestAnimationFrame(() => {
                shoppingModal.classList.remove('invisible', 'pointer-events-none', 'translate-x-full');
            });
            window.switchNavShoppingTab(defaultTab);
        }
    };

    window.switchNavShoppingTab = (tab = 'shopping') => {
        const btnShop = document.getElementById('nav-tab-btn-shopping');
        const btnWon = document.getElementById('nav-tab-btn-won');
        const panelShop = document.getElementById('nav-panel-shopping');
        const panelWon = document.getElementById('nav-panel-won');
        const icon = document.getElementById('nav-shopping-title-icon');
        const text = document.getElementById('nav-shopping-title-text');

        // Cập nhật số lượng trên tab badge món random
        try {
            const won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
            const tabBadge = document.getElementById('nav-tab-won-badge');
            if (tabBadge) {
                tabBadge.textContent = won.length;
                tabBadge.classList.toggle('hidden', won.length === 0);
            }
        } catch (e) {}

        if (tab === 'shopping') {
            panelShop?.classList.remove('hidden');
            panelWon?.classList.add('hidden');

            btnShop?.classList.add('bg-white', 'text-primary', 'shadow-xs');
            btnShop?.classList.remove('text-gray-500');
            btnWon?.classList.remove('bg-white', 'text-primary', 'shadow-xs');
            btnWon?.classList.add('text-gray-500');

            if (icon) icon.className = "fa-solid fa-cart-shopping text-[#F4A62A]";
            if (text) text.textContent = "Danh sách đi chợ";

            if (window.loadShoppingListInNav) window.loadShoppingListInNav();
        } else {
            panelShop?.classList.add('hidden');
            panelWon?.classList.remove('hidden');

            btnWon?.classList.add('bg-white', 'text-primary', 'shadow-xs');
            btnWon?.classList.remove('text-gray-500');
            btnShop?.classList.remove('bg-white', 'text-primary', 'shadow-xs');
            btnShop?.classList.add('text-gray-500');

            if (icon) icon.className = "fa-solid fa-dice text-[#F4A62A]";
            if (text) text.textContent = "Món đã random";

            if (window.renderWonDishesInDrawer) window.renderWonDishesInDrawer();
        }
    };

    window.renderWonDishesInDrawer = () => {
        const container = document.getElementById('nav-drawer-won-items-list');
        const tabBadge = document.getElementById('nav-tab-won-badge');
        const headerCount = document.getElementById('nav-shopping-header-count');
        if (!container) return;

        let won = [];
        try {
            won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
        } catch (e) {
            won = [];
        }

        if (tabBadge) {
            tabBadge.textContent = won.length;
            tabBadge.classList.toggle('hidden', won.length === 0);
        }

        const panelWon = document.getElementById('nav-panel-won');
        if (panelWon && !panelWon.classList.contains('hidden') && headerCount) {
            headerCount.textContent = `${won.length} món`;
        }

        if (won.length === 0) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                    <div class="w-14 h-14 mb-3 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                        <i class="fa-solid fa-dice text-2xl"></i>
                    </div>
                    <p class="font-bold text-gray-700 text-sm">Chưa có món nào từ máy quay</p>
                    <p class="text-xs text-gray-400 mt-1 max-w-[220px]">Hãy thử quay vòng quay Gacha ở Trang chủ để nhận gợi ý món ăn!</p>
                    <a href="#/" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] hover:bg-[#145A43] text-white rounded-full text-xs font-bold shadow-xs transition">Đến vòng quay ngay</a>
                </div>
            `;
            return;
        }

        container.innerHTML = won.map((item, idx) => {
            const foodId = item.id_food || item.id || 1;
            const foodName = item.name || 'Món ngon';
            const foodImg = item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80';
            const foodTime = item.time || (item.cooking_time ? `${item.cooking_time} phút` : '30 phút');
            const foodCat = item.category || 'Món ngon';

            return `
                <div class="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3 shadow-2xs hover:border-amber-200 transition">
                    <a href="#/mon-an/${foodId}" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="shrink-0">
                        <img src="${foodImg}" class="w-12 h-12 rounded-lg object-cover border border-gray-100" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80'">
                    </a>
                    <div class="flex-1 min-w-0">
                        <a href="#/mon-an/${foodId}" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="font-bold text-xs text-text-main hover:text-[#0F4937] transition line-clamp-1">${foodName}</a>
                        <div class="flex items-center gap-2 mt-0.5 text-[11px] text-gray-400">
                            <span class="text-emerald-700 font-semibold">${foodCat}</span>
                            <span>•</span>
                            <span class="flex items-center gap-1"><i class="fa-regular fa-clock text-amber-500"></i> ${foodTime}</span>
                        </div>
                    </div>
                    <button onclick="window.removeWonDish(${idx})" class="text-gray-300 hover:text-rose-500 p-2 transition cursor-pointer" title="Xóa món này">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </div>
            `;
        }).join('');
    };

    window.loadFavoritesInNav = async () => {
        const container = document.getElementById('nav-fav-items-list');
        const headerCount = document.getElementById('nav-fav-header-count');
        const badge = document.getElementById('nav-fav-badge');
        if (!container) return;

        const token = localStorage.getItem('auth_token');
        if (!token) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                    <div class="w-16 h-16 mb-3 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                        <i class="fa-regular fa-heart text-2xl"></i>
                    </div>
                    <p class="font-bold text-gray-700 text-sm">Chưa đăng nhập</p>
                    <p class="text-xs text-gray-400 mt-1 max-w-[200px]">Đăng nhập để xem danh sách món ăn bạn đã lưu.</p>
                    <a href="#/login" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Đăng nhập ngay</a>
                </div>
            `;
            if (headerCount) headerCount.textContent = '0 món';
            if (badge) badge.classList.add('hidden');
            return;
        }

        try {
            const res = await fetchAPI('/auth/me/favorites');
            if (res && res.success && Array.isArray(res.data)) {
                const favorites = res.data;
                const count = favorites.length;
                if (headerCount) headerCount.textContent = `${count} món`;
                if (badge) {
                    badge.textContent = count;
                    badge.classList.toggle('hidden', count === 0);
                }

                if (count === 0) {
                    container.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                            <div class="w-16 h-16 mb-3 rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                                <i class="fa-regular fa-heart text-2xl"></i>
                            </div>
                            <p class="font-bold text-gray-700 text-sm">Chưa có món yêu thích</p>
                            <p class="text-xs text-gray-400 mt-1 max-w-[200px]">Hãy nhấn biểu tượng trái tim ở các món ăn để lưu lại đây.</p>
                            <a href="#/danh-sach" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Khám phá món ngay</a>
                        </div>
                    `;
                    return;
                }

                container.innerHTML = favorites.map(item => {
                    const f = item.food || {};
                    return `
                        <div class="bg-white rounded-xl p-2.5 border border-gray-100 flex items-center gap-3 shadow-2xs hover:border-rose-100 transition">
                            <img src="${f.image || 'http://localhost:5000/images/foods/thit-kho-trung.jpg'}" class="w-12 h-12 rounded-lg object-cover shrink-0">
                            <div class="flex-1 min-w-0">
                                <a href="#/mon-an/${f.id_food || f.id || 1}" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="font-bold text-xs text-text-main hover:text-primary transition line-clamp-1">${f.name}</a>
                                <div class="flex items-center gap-2 mt-0.5 text-[11px] text-gray-400">
                                    <span>${f.category || 'Món ngon'}</span>
                                    <span>•</span>
                                    <span><i class="fa-regular fa-clock text-amber-500"></i> ${f.time || '30 phút'}</span>
                                </div>
                            </div>
                            <button onclick="window.removeNavFavorite(${f.id_food || f.id})" class="text-gray-400 hover:text-rose-500 p-2 transition cursor-pointer" title="Bỏ lưu">
                                <i class="fa-solid fa-trash-can text-xs"></i>
                            </button>
                        </div>
                    `;
                }).join('');
            }
        } catch (e) {
            container.innerHTML = `<p class="text-xs text-red-500 text-center py-4">Lỗi khi tải danh sách yêu thích.</p>`;
        }
    };

    window.removeNavFavorite = async (foodId) => {
        try {
            const res = await fetchAPI(`/auth/me/favorites/${foodId}`, { method: 'DELETE' });
            if (res && res.success) {
                window.loadFavoritesInNav();
                // Đồng bộ cập nhật ngay biểu tượng tim trên thẻ món ăn nếu đang ở trang danh sách
                const cardFavBtn = document.querySelector(`.btn-favorite-dish[data-id="${foodId}"]`);
                if (cardFavBtn) {
                    cardFavBtn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
                    const icon = cardFavBtn.querySelector('i');
                    if (icon) icon.className = "fa-regular fa-heart text-sm";
                }
            }
        } catch (e) {}
    };

    window.loadShoppingListInNav = async () => {
        const container = document.getElementById('nav-shopping-items-list');
        const headerCount = document.getElementById('nav-shopping-header-count');
        const badge = document.getElementById('nav-shopping-badge');
        if (!container) return;

        const token = localStorage.getItem('auth_token');
        if (!token) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                    <i class="fa-solid fa-cart-shopping text-3xl mb-2 text-gray-300"></i>
                    <p class="font-bold text-gray-700 text-sm">Chưa đăng nhập</p>
                    <p class="text-xs text-gray-400 mt-1 max-w-[220px]">Đăng nhập để đồng bộ và lưu trữ danh sách đi chợ của bạn.</p>
                    <a href="#/login" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Đăng nhập</a>
                </div>
            `;
            if (headerCount) headerCount.textContent = '0 món';
            if (badge) badge.classList.add('hidden');
            const bottomBadge = document.getElementById('nav-bottom-shopping-badge');
            if (bottomBadge) bottomBadge.classList.add('hidden');
            return;
        }

        try {
            const res = await fetchAPI('/shopping-list');
            if (res && res.success) {
                const total = res.total_items || 0;
                const remaining = res.remaining_items ?? total;
                if (headerCount) headerCount.textContent = `${total} nguyên liệu`;
                if (badge) {
                    badge.textContent = remaining;
                    badge.classList.toggle('hidden', remaining === 0);
                }
                const bottomBadge = document.getElementById('nav-bottom-shopping-badge');
                if (bottomBadge) {
                    bottomBadge.textContent = remaining;
                    bottomBadge.classList.toggle('hidden', remaining === 0);
                }

                if (total === 0) {
                    container.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                            <i class="fa-solid fa-basket-shopping text-3xl mb-2 text-gray-300"></i>
                            <p class="font-bold text-gray-700 text-sm">Danh sách đi chợ đang trống</p>
                            <p class="text-xs text-gray-400 mt-1 max-w-[220px]">Nhấn "Thêm vào đi chợ" ở chi tiết món ăn hoặc tự gõ vào ô phía trên!</p>
                        </div>
                    `;
                    return;
                }

                const lists = res.lists || [];
                container.innerHTML = lists.map(l => `
                    <div class="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs space-y-2">
                        <div class="flex items-center justify-between border-b border-gray-100 pb-1.5">
                            <span class="font-bold text-xs text-primary flex items-center gap-1.5">
                                <i class="fa-solid fa-utensils text-accent text-[11px]"></i>
                                ${l.food_name}
                            </span>
                            <span class="text-[10px] text-gray-400 font-semibold">${l.items.length} món</span>
                        </div>
                        <div class="space-y-1.5">
                            ${l.items.map(it => `
                                <div class="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-gray-50 transition">
                                    <label class="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                                        <input type="checkbox" ${it.is_checked ? 'checked' : ''} onchange="window.toggleShoppingItem(${it.id_shopping_list_item})" class="rounded text-primary focus:ring-primary h-4 w-4">
                                        <span class="text-xs font-medium text-text-main truncate ${it.is_checked ? 'line-through text-gray-400' : ''}">${it.name}</span>
                                    </label>
                                    <div class="flex items-center gap-2 shrink-0">
                                        <span class="text-[11px] font-bold ${it.is_checked ? 'text-gray-400' : 'text-emerald-700 bg-emerald-50'} px-2 py-0.5 rounded-md">${it.quantity} ${it.unit}</span>
                                        <button onclick="window.deleteShoppingItem(${it.id_shopping_list_item})" class="text-gray-300 hover:text-rose-500 transition p-1 cursor-pointer">
                                            <i class="fa-solid fa-xmark text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('');
            }
        } catch (e) {
            container.innerHTML = `<p class="text-xs text-red-500 text-center py-4">Lỗi khi tải danh sách đi chợ.</p>`;
        }
    };

    window.toggleShoppingItem = async (itemId) => {
        try {
            await fetchAPI(`/shopping-list/items/${itemId}/toggle`, { method: 'PATCH' });
            window.loadShoppingListInNav();
        } catch (e) {}
    };

    window.deleteShoppingItem = async (itemId) => {
        try {
            await fetchAPI(`/shopping-list/items/${itemId}`, { method: 'DELETE' });
            window.loadShoppingListInNav();
        } catch (e) {}
    };

    window.quickAddShoppingItem = async (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('quick-add-name');
        const qtyInput = document.getElementById('quick-add-qty');
        const unitInput = document.getElementById('quick-add-unit');
        if (!nameInput) return;

        const name = nameInput.value.trim();
        const quantity = Number(qtyInput?.value) || 1;
        const unit = unitInput?.value?.trim() || 'cái';
        if (!name) return;

        try {
            const res = await fetchAPI('/shopping-list/add-item', {
                method: 'POST',
                body: JSON.stringify({ name, quantity, unit })
            });
            if (res && res.success) {
                nameInput.value = '';
                if (qtyInput) qtyInput.value = '1';
                window.loadShoppingListInNav();
            }
        } catch (e) {}
    };

    window.clearShoppingList = async () => {
        if (!confirm('Bạn có chắc muốn dọn sạch toàn bộ danh sách đi chợ?')) return;
        try {
            await fetchAPI('/shopping-list/clear', { method: 'DELETE' });
            window.loadShoppingListInNav();
        } catch (e) {}
    };

    window.toggleWonDishesPopover = () => {
        const popover = document.getElementById('nav-won-popover');
        if (!popover) return;
        const isHidden = popover.classList.contains('hidden');
        if (isHidden) {
            window.renderWonDishesList();
            popover.classList.remove('hidden');
        } else {
            popover.classList.add('hidden');
        }
    };

    window.renderWonDishesList = () => {
        const container = document.getElementById('nav-won-list');
        const countHeader = document.getElementById('nav-won-count-header');
        const badge = document.getElementById('nav-won-badge');
        const clearBtn = document.getElementById('nav-won-clear-btn');
        if (!container) return;

        const token = localStorage.getItem('auth_token');
        if (!token) {
            if (badge) {
                badge.textContent = '0';
                badge.classList.add('hidden');
            }
            if (countHeader) countHeader.textContent = '0 món';
            if (clearBtn) clearBtn.classList.add('hidden');

            container.innerHTML = `
                <div class="py-6 px-4 text-center">
                    <div class="w-12 h-12 mx-auto rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-2.5 shadow-2xs">
                        <i class="fa-solid fa-lock text-lg"></i>
                    </div>
                    <p class="text-xs font-bold text-gray-800">Chưa đăng nhập tài khoản</p>
                    <p class="text-[11px] text-gray-500 mt-1 max-w-[240px] mx-auto leading-relaxed">Vui lòng đăng nhập để hệ thống tự động lưu trữ và xem các món bạn đã quay random.</p>
                    <a href="#/login" onclick="document.getElementById('nav-won-popover')?.classList.add('hidden')" class="inline-block mt-3.5 px-4 py-1.5 bg-[#0F4937] hover:bg-[#145A43] text-white text-xs font-bold rounded-full transition shadow-xs">Đăng nhập ngay</a>
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

        if (badge) {
            badge.textContent = won.length;
            badge.classList.toggle('hidden', won.length === 0);
        }
        if (countHeader) countHeader.textContent = `${won.length} món`;
        if (clearBtn) clearBtn.classList.toggle('hidden', won.length === 0);

        if (won.length === 0) {
            container.innerHTML = `
                <div class="py-6 text-center text-gray-400">
                    <i class="fa-solid fa-dice text-2xl mb-2 text-gray-300"></i>
                    <p class="text-xs font-semibold">Chưa có món nào từ máy quay random</p>
                    <p class="text-[11px] text-gray-400 mt-0.5">Hãy thử quay máy Gacha ở Trang chủ!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = won.map((item, idx) => `
            <div class="flex items-center gap-3 pt-2 first:pt-0">
                <img src="${item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80'}" class="w-10 h-10 rounded-xl object-cover border border-gray-200 shrink-0" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80'">
                <div class="flex-1 min-w-0">
                    <a href="#/mon-an/${item.id || 1}" onclick="document.getElementById('nav-won-popover').classList.add('hidden')" class="font-bold text-xs text-text-main hover:text-[#0F4937] transition line-clamp-1">${item.name}</a>
                    <span class="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><i class="fa-regular fa-clock text-amber-500"></i> ${item.time || '30 phút'}</span>
                </div>
                <button onclick="window.removeWonDish(${idx})" class="text-gray-400 hover:text-rose-500 transition text-xs p-1 cursor-pointer" title="Xóa món này">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');
    };

    window.removeWonDish = (index) => {
        try {
            let won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
            won.splice(index, 1);
            localStorage.setItem('won_dishes', JSON.stringify(won));
            if (window.renderWonDishesList) window.renderWonDishesList();
            if (window.renderWonDishesInDrawer) window.renderWonDishesInDrawer();
            if (window.renderRecentWonDishes) window.renderRecentWonDishes();
        } catch (e) {}
    };

    window.clearWonDishes = async () => {
        if (window.Popup) {
            const confirmed = await window.Popup.confirm({
                title: 'Xóa danh sách món đã random',
                message: 'Bạn có chắc muốn xóa toàn bộ danh sách các món ăn đã random gần đây không?',
                type: 'warning',
                confirmText: 'Xóa hết',
                cancelText: 'Giữ lại',
                confirmButtonColor: 'danger'
            });
            if (!confirmed) return;
        }

        localStorage.removeItem('won_dishes');
        if (window.renderWonDishesList) window.renderWonDishesList();
        if (window.renderWonDishesInDrawer) window.renderWonDishesInDrawer();
        if (window.renderRecentWonDishes) window.renderRecentWonDishes();
        if (window.Popup) {
            window.Popup.toast('Đã làm trống danh sách món đã random.', 'info');
        }
    };

    window.addWonDish = (dish) => {
        try {
            let won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
            won = won.filter(d => (d.id || d.name) !== (dish.id || dish.name));
            won.unshift(dish);
            if (won.length > 20) won = won.slice(0, 20);
            localStorage.setItem('won_dishes', JSON.stringify(won));
            if (window.renderWonDishesList) window.renderWonDishesList();
            if (window.renderWonDishesInDrawer) window.renderWonDishesInDrawer();
            if (window.renderRecentWonDishes) window.renderRecentWonDishes();
        } catch (e) {}
    };
    // Auto-check badges on page load
    setTimeout(() => {
        if (window.syncFavBadge) window.syncFavBadge();
        if (window.updateNavbarFavBadge) window.updateNavbarFavBadge();
        if (localStorage.getItem('auth_token')) {
            if (window.loadFavoritesInNav) window.loadFavoritesInNav();
            if (window.loadShoppingListInNav) window.loadShoppingListInNav();
        }
    }, 100);

    window.updateNavbarFavBadge = async (count = null) => {
        const badge = document.getElementById('nav-fav-badge');
        const countHeader = document.getElementById('nav-fav-count-header');

        if (count !== null && count !== undefined) {
            const num = Number(count);
            if (badge) {
                badge.textContent = num;
                badge.classList.toggle('hidden', num <= 0);
            }
            if (countHeader) countHeader.textContent = `${num} món`;
            return;
        }

        const token = localStorage.getItem('auth_token');
        if (!token) {
            if (badge) badge.classList.add('hidden');
            if (countHeader) countHeader.textContent = '0 món';
            return;
        }

        try {
            const res = await fetchAPI('/auth/me/favorites');
            if (res && res.success && Array.isArray(res.data)) {
                const total = res.data.length;
                if (badge) {
                    badge.textContent = total;
                    badge.classList.toggle('hidden', total <= 0);
                }
                if (countHeader) countHeader.textContent = `${total} món`;
            }
        } catch (e) {}
    };

    window.loadNavbarFavorites = async () => {
        const container = document.getElementById('nav-fav-list-container');
        const countHeader = document.getElementById('nav-fav-count-header');
        if (!container) return;

        const token = localStorage.getItem('auth_token');
        if (!token) {
            if (countHeader) countHeader.textContent = '0 món';
            if (window.updateNavbarFavBadge) window.updateNavbarFavBadge(0);
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                    <div class="w-16 h-16 mb-3 rounded-full bg-rose-50 flex items-center justify-center border-2 border-rose-100 text-rose-400">
                        <i class="fa-regular fa-heart text-2xl"></i>
                    </div>
                    <p class="font-bold text-gray-700 text-sm">Chưa đăng nhập</p>
                    <p class="text-xs text-gray-400 mt-1 max-w-[220px]">Đăng nhập để xem và quản lý danh sách món ăn yêu thích của bạn.</p>
                    <a href="#/login" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-5 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Đăng nhập ngay</a>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="py-12 text-center text-gray-400">
                <i class="fa-solid fa-spinner animate-spin text-2xl text-[#0F4937] mb-2"></i>
                <p class="text-xs font-semibold">Đang tải món yêu thích...</p>
            </div>
        `;

        try {
            const res = await fetchAPI('/auth/me/favorites');
            if (res && res.success && Array.isArray(res.data)) {
                const list = res.data;
                if (countHeader) countHeader.textContent = `${list.length} món`;
                if (window.updateNavbarFavBadge) window.updateNavbarFavBadge(list.length);

                if (list.length === 0) {
                    container.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                            <div class="w-16 h-16 mb-3 rounded-full bg-rose-50 flex items-center justify-center border-2 border-rose-100 text-rose-400">
                                <i class="fa-regular fa-heart text-2xl"></i>
                            </div>
                            <p class="font-bold text-gray-700 text-sm">Chưa có món yêu thích</p>
                            <p class="text-xs text-gray-400 mt-1 max-w-[200px]">Hãy nhấn biểu tượng trái tim ở các món ăn để lưu lại đây.</p>
                            <a href="#/danh-sach" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Khám phá món ngay</a>
                        </div>
                    `;
                    return;
                }

                container.innerHTML = list.map(item => {
                    const food = item.food || {};
                    const foodId = food.id_food || food.id || item.id_food;
                    const foodName = food.name || 'Món ngon';
                    return `
                        <div class="flex items-center gap-3 p-2.5 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-[#0F4937]/30 transition">
                            <img src="${food.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`}" class="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100" onerror="this.src='${BACKEND_URL}/images/foods/thit-kho-trung.jpg'">
                            <div class="flex-1 min-w-0">
                                <a href="#/mon-an/${foodId}" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="font-bold text-xs text-text-main hover:text-[#0F4937] transition line-clamp-1">${foodName}</a>
                                <div class="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                                    <span class="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">${food.category || 'Món ngon'}</span>
                                    <span><i class="fa-regular fa-clock text-amber-500"></i> ${food.time || '30 phút'}</span>
                                </div>
                            </div>
                            <button onclick="window.removeFavoriteFromNavbar && window.removeFavoriteFromNavbar(${foodId}, '${foodName.replace(/'/g, "\\'")}')" class="w-7 h-7 rounded-lg text-rose-500 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer" title="Bỏ yêu thích">
                                <i class="fa-solid fa-trash-can text-xs"></i>
                            </button>
                        </div>
                    `;
                }).join('');
            } else {
                container.innerHTML = `<p class="text-xs text-red-500 text-center py-8">Không thể nạp danh sách món yêu thích.</p>`;
            }
        } catch (e) {
            container.innerHTML = `<p class="text-xs text-red-500 text-center py-8">Lỗi kết nối máy chủ.</p>`;
        }
    };

    window.removeFavoriteFromNavbar = async (foodId, foodName) => {
        try {
            const res = await fetchAPI(`/auth/me/favorites/${foodId}`, { method: 'DELETE' });
            if (res && res.success) {
                if (window.Popup) {
                    window.Popup.toast(`Đã bỏ lưu "${foodName}"`, 'info');
                }
                window.loadNavbarFavorites();
                // Đồng bộ cập nhật các nút tim trên trang hiện tại (cả FoodCard và FoodList)
                document.querySelectorAll(`.food-fav-btn[data-food-id="${foodId}"]`).forEach(btn => {
                    btn.className = "food-fav-btn absolute top-2.5 right-2.5 bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-md rounded-full w-8.5 h-8.5 flex items-center justify-center transition-all hover:scale-110 z-30 shadow-sm cursor-pointer";
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = "fa-regular fa-heart text-sm";
                    btn.title = "Lưu món ăn yêu thích";
                });
                document.querySelectorAll(`.btn-favorite-dish[data-id="${foodId}"]`).forEach(btn => {
                    btn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = "fa-regular fa-heart text-sm";
                    btn.title = "Lưu món ăn yêu thích";
                });
                document.querySelectorAll(`.card-likes-count[data-food-id="${foodId}"]`).forEach(el => {
                    const current = parseInt(el.textContent) || 0;
                    if (current > 0) el.textContent = current - 1;
                });

                // Cập nhật giao diện trang FoodDetail nếu đang mở món này
                const detailFavBtn = document.getElementById('fav-btn');
                const isCurrentDetailPage = detailFavBtn && (!detailFavBtn.getAttribute('data-food-id') || String(detailFavBtn.getAttribute('data-food-id')) === String(foodId));
                if (detailFavBtn && isCurrentDetailPage) {
                    const detailFavLabel = document.getElementById('fav-btn-label');
                    const detailLikesEl = document.getElementById('detail-likes-count');
                    const favIcon = detailFavBtn.querySelector('i');
                    detailFavBtn.className = "w-full py-3.5 px-6 rounded-2xl bg-white border border-beige-border/80 text-text-main font-bold hover:bg-cream-soft hover:text-rose-600 transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer";
                    if (favIcon) favIcon.className = "fa-regular fa-heart text-rose-500 text-base";
                    if (detailFavLabel) detailFavLabel.textContent = "Lưu món yêu thích";
                    detailFavBtn.title = "Lưu món ăn yêu thích";
                    if (detailLikesEl) {
                        const cur = parseInt(detailLikesEl.textContent) || 0;
                        if (cur > 0) detailLikesEl.textContent = cur - 1;
                    }
                    if (window.currentFoodDetail) {
                        window.currentFoodDetail.is_favorite = false;
                        window.currentFoodDetail.isFavorite = false;
                        if (window.currentFoodDetail.likes > 0) window.currentFoodDetail.likes -= 1;
                    }
                }

                // Cập nhật mảng masterDishes nếu đang ở trang FoodList
                if (window.masterDishes && Array.isArray(window.masterDishes)) {
                    const targetDish = window.masterDishes.find(d => Number(d.id) === Number(foodId));
                    if (targetDish) {
                        targetDish.is_favorite = false;
                        if (targetDish.likes > 0) targetDish.likes -= 1;
                    }
                }

                if (window.updateNavbarFavBadge) {
                    window.updateNavbarFavBadge(res.remainingCount ?? null);
                }
            }
        } catch (e) {}
    };

    window.toggleFoodFavorite = async (event, foodId) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const token = localStorage.getItem('auth_token');
        if (!token) {
            if (window.Popup) {
                const goLogin = await window.Popup.confirm({
                    title: 'Yêu cầu đăng nhập',
                    message: 'Bạn cần đăng nhập tài khoản để lưu các món ăn yêu thích.',
                    type: 'info',
                    confirmText: 'Đăng nhập',
                    cancelText: 'Để sau'
                });
                if (goLogin) window.location.hash = '#/login';
            } else {
                alert('Vui lòng đăng nhập để lưu món ăn yêu thích.');
                window.location.hash = '#/login';
            }
            return;
        }

        const btnsFoodCard = document.querySelectorAll(`.food-fav-btn[data-food-id="${foodId}"]`);
        const btnsFoodList = document.querySelectorAll(`.btn-favorite-dish[data-id="${foodId}"]`);
        const detailFavBtn = document.getElementById('fav-btn');
        const isCurrentDetailPage = detailFavBtn && (!detailFavBtn.getAttribute('data-food-id') || String(detailFavBtn.getAttribute('data-food-id')) === String(foodId));

        btnsFoodCard.forEach(b => b.disabled = true);
        btnsFoodList.forEach(b => b.disabled = true);
        if (detailFavBtn && isCurrentDetailPage) detailFavBtn.disabled = true;

        try {
            const res = await fetchAPI(`/foods/${foodId}/favorite`, { method: 'POST' });
            if (res && res.success) {
                const isFav = Boolean(res.is_favorite);
                const likes = typeof res.likes !== 'undefined' ? res.likes : null;

                btnsFoodCard.forEach(btn => {
                    if (isFav) {
                        btn.className = "food-fav-btn absolute top-2.5 right-2.5 bg-rose-500 text-white backdrop-blur-md rounded-full w-8.5 h-8.5 flex items-center justify-center transition-all hover:scale-110 z-30 shadow-sm cursor-pointer";
                        const icon = btn.querySelector('i');
                        if (icon) icon.className = "fa-solid fa-heart text-sm";
                        btn.title = "Bỏ yêu thích";
                    } else {
                        btn.className = "food-fav-btn absolute top-2.5 right-2.5 bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-md rounded-full w-8.5 h-8.5 flex items-center justify-center transition-all hover:scale-110 z-30 shadow-sm cursor-pointer";
                        const icon = btn.querySelector('i');
                        if (icon) icon.className = "fa-regular fa-heart text-sm";
                        btn.title = "Lưu món ăn yêu thích";
                    }
                });

                btnsFoodList.forEach(btn => {
                    if (isFav) {
                        btn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-rose-500 text-white backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
                        const icon = btn.querySelector('i');
                        if (icon) icon.className = "fa-solid fa-heart text-sm";
                        btn.title = "Bỏ yêu thích";
                    } else {
                        btn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
                        const icon = btn.querySelector('i');
                        if (icon) icon.className = "fa-regular fa-heart text-sm";
                        btn.title = "Lưu món ăn yêu thích";
                    }
                });

                if (likes !== null) {
                    document.querySelectorAll(`.card-likes-count[data-food-id="${foodId}"]`).forEach(el => {
                        el.textContent = likes;
                    });
                }

                // Cập nhật giao diện trang FoodDetail nếu đang mở món này
                if (detailFavBtn && isCurrentDetailPage) {
                    const detailFavLabel = document.getElementById('fav-btn-label');
                    const detailLikesEl = document.getElementById('detail-likes-count');
                    const favIcon = detailFavBtn.querySelector('i');

                    if (isFav) {
                        detailFavBtn.className = "w-full py-3.5 px-6 rounded-2xl bg-rose-50 border border-rose-300 text-rose-600 font-bold transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer";
                        if (favIcon) favIcon.className = "fa-solid fa-heart text-rose-500 text-base";
                        if (detailFavLabel) detailFavLabel.textContent = "Đã lưu món yêu thích";
                        detailFavBtn.title = "Bỏ lưu món";
                    } else {
                        detailFavBtn.className = "w-full py-3.5 px-6 rounded-2xl bg-white border border-beige-border/80 text-text-main font-bold hover:bg-cream-soft hover:text-rose-600 transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer";
                        if (favIcon) favIcon.className = "fa-regular fa-heart text-rose-500 text-base";
                        if (detailFavLabel) detailFavLabel.textContent = "Lưu món yêu thích";
                        detailFavBtn.title = "Lưu món ăn yêu thích";
                    }

                    if (detailLikesEl && likes !== null) {
                        detailLikesEl.textContent = likes;
                    }

                    if (window.currentFoodDetail) {
                        window.currentFoodDetail.is_favorite = isFav;
                        window.currentFoodDetail.isFavorite = isFav;
                        if (likes !== null) window.currentFoodDetail.likes = likes;
                    }
                }

                // Cập nhật mảng masterDishes nếu đang ở trang FoodList
                if (window.masterDishes && Array.isArray(window.masterDishes)) {
                    const targetDish = window.masterDishes.find(d => Number(d.id) === Number(foodId));
                    if (targetDish) {
                        targetDish.is_favorite = isFav;
                        if (likes !== null) targetDish.likes = likes;
                    }
                }

                if (window.Popup) {
                    window.Popup.toast(res.message, isFav ? 'success' : 'info');
                }

                // Cập nhật số lượng trên badge Navbar
                if (window.updateNavbarFavBadge) {
                    window.updateNavbarFavBadge(res.userTotalFavorites ?? null);
                }

                // Nếu drawer yêu thích đang mở thì làm mới
                const favModal = document.getElementById('nav-fav-modal');
                if (favModal && !favModal.classList.contains('invisible')) {
                    window.loadNavbarFavorites();
                }
            } else {
                if (window.Popup) window.Popup.error(res?.message || 'Có lỗi xảy ra.');
            }
        } catch (e) {
            console.error('Lỗi toggle favorite:', e);
        } finally {
            btnsFoodCard.forEach(b => b.disabled = false);
            btnsFoodList.forEach(b => b.disabled = false);
            if (detailFavBtn && isCurrentDetailPage) detailFavBtn.disabled = false;
        }
    };

    // Tự động đồng bộ số lượng món yêu thích khi nạp Navbar
    setTimeout(() => {
        if (window.updateNavbarFavBadge) window.updateNavbarFavBadge();
    }, 50);
}


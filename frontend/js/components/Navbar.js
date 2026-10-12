export default function Navbar() {
    const currentHash = window.location.hash.slice(1).toLowerCase() || '/';
    const isHome = currentHash === '/' || currentHash === '';
    const isList = currentHash.startsWith('/danh-sach');
    const isCommunity = currentHash.startsWith('/cong-dong');
    const isAdmin = currentHash.startsWith('/admin');
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
    const authAvatar = escapeHTML(authUser?.avatar || 'http://localhost:5000/images/users/admin.jpg');

    const getLinkClass = (isActive) => isActive 
        ? "text-[#F4A62A] font-extrabold relative py-1 after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-[#F4A62A] after:left-0 after:bottom-0 transition-all" 
        : "text-white/85 font-semibold relative py-1 hover:text-[#F4A62A] transition-colors duration-200 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#F4A62A] after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-200";

    // Won dishes count
    let wonCount = 0;
    try {
        const won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
        wonCount = won.length;
    } catch (e) {
        wonCount = 0;
    }

    return `
        <!-- Overlay for Cart / Favorite Drawer -->
        <div id="nav-drawer-overlay" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="fixed inset-0 bg-black/50 z-[65] hidden transition-opacity backdrop-blur-xs"></div>

        <header class="bg-[#0F4937] text-white sticky top-0 z-50 shadow-sm border-b border-white/10">
            <div class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
                
                <!-- Logo -->
                <a href="#/" class="flex items-center gap-2.5 group shrink-0">
                    <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F4A62A] flex items-center justify-center text-[#0F4937] shadow-sm group-hover:scale-105 transition-transform">
                        <i class="fa-solid fa-kitchen-set text-lg sm:text-xl"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-lg sm:text-xl font-black tracking-tight text-white leading-tight font-sans">Hôm Nay Nấu Gì?</span>
                        <span class="text-[9px] uppercase tracking-[0.2em] text-[#F4A62A] font-black leading-none">MÓN NGON MỖI NGÀY</span>
                    </div>
                </a>
                
                <!-- Center Navigation -->
                <nav class="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
                    <a href="#/" class="${getLinkClass(isHome)}">Trang chủ</a>
                    <a href="#/danh-sach" class="${getLinkClass(isList)}">Danh sách món ăn</a>
                    <a href="#/cong-dong" class="${getLinkClass(isCommunity)}">Cộng đồng</a>
                    ${authUser?.role === 'admin' ? `<a href="#/admin" class="${getLinkClass(isAdmin)}">Admin</a>` : ''}
                </nav>

                <!-- Right Action Icons & Auth -->
                <div class="flex items-center gap-2 sm:gap-3">
                    <!-- Quick Search Button -->
                    <button onclick="document.getElementById('nav-search-bar').classList.toggle('hidden'); document.getElementById('nav-search-input')?.focus();" class="w-8.5 h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:text-[#F4A62A] cursor-pointer" title="Tìm kiếm món">
                        <i class="fa-solid fa-magnifying-glass text-xs sm:text-sm"></i>
                    </button>

                    <!-- Favorites Heart Button -->
                    <button onclick="window.openFavoritesDrawer && window.openFavoritesDrawer()" class="w-8.5 h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:text-rose-400 relative cursor-pointer" title="Món yêu thích">
                        <i class="fa-solid fa-heart text-xs sm:text-sm"></i>
                    </button>

                    <!-- Won Dishes / Random Cart Basket -->
                    <div class="relative">
                        <button onclick="window.toggleWonDishesPopover && window.toggleWonDishesPopover()" class="w-8.5 h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:text-[#F4A62A] relative cursor-pointer" title="Mâm cơm đã quay">
                            <i class="fa-solid fa-basket-shopping text-xs sm:text-sm"></i>
                            <span id="nav-won-badge" class="${wonCount > 0 ? '' : 'hidden'} absolute -top-1 -right-1 bg-[#F4A62A] text-[#0F4937] text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm ring-2 ring-[#0F4937] animate-pulse">
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
                                <button onclick="window.clearWonDishes && window.clearWonDishes()" class="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition">Xóa hết</button>
                                <a href="#/danh-sach" onclick="document.getElementById('nav-won-popover').classList.add('hidden')" class="flex-1 text-center py-1.5 bg-[#0F4937] hover:bg-[#145A43] text-white text-xs font-bold rounded-xl shadow-xs transition">Xem thêm món</a>
                            </div>
                        </div>
                    </div>

                    <!-- Notification Button -->
                    <button onclick="alert('Bạn chưa có thông báo mới.')" class="w-8.5 h-8.5 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:text-amber-300 cursor-pointer hidden sm:flex" title="Thông báo">
                        <i class="fa-solid fa-bell text-xs sm:text-sm"></i>
                    </button>

                    <!-- Divider -->
                    <div class="h-5 w-px bg-white/20 mx-0.5 hidden sm:block"></div>

                    <!-- Auth Links -->
                    <div class="flex items-center gap-2">
                        ${isLoggedIn ? `
                            <a href="#/ca-nhan" class="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white group cursor-pointer" title="Xem trang cá nhân">
                                <img src="${authAvatar}" alt="${authName}" class="w-7 h-7 rounded-full object-cover bg-white/20">
                                <span class="max-w-28 truncate text-xs font-bold group-hover:text-[#F4A62A] transition-colors">${authName}</span>
                            </a>
                            <button onclick="window.logoutAuth && window.logoutAuth()" class="px-3 sm:px-4 py-1.5 bg-[#F4A62A] hover:bg-[#E59516] text-[#0F4937] font-black rounded-full text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer">Đăng xuất</button>
                        ` : `
                            <a href="#/login" class="text-white/85 hover:text-white font-bold text-xs sm:text-sm px-2 py-1 rounded-lg hover:bg-white/10 transition">Đăng nhập</a>
                            <a href="#/login?mode=register" class="px-3 sm:px-4 py-1.5 bg-[#F4A62A] hover:bg-[#E59516] text-[#0F4937] font-black rounded-full text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95">Đăng ký</a>
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

        <div id="nav-fav-modal" class="fixed inset-y-0 right-0 w-[85vw] sm:w-96 bg-white shadow-2xl z-[70] transform translate-x-full invisible pointer-events-none transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-[#0F4937] text-white">
                <h3 class="text-base font-bold flex items-center gap-2"><i class="fa-solid fa-heart text-[#F4A62A]"></i> Món yêu thích</h3>
                <button onclick="window.closeNavDrawers && window.closeNavDrawers()" class="hover:bg-white/10 text-white transition text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">&times;</button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                <div class="flex flex-col items-center justify-center h-full text-gray-400 py-16 text-center">
                    <div class="w-16 h-16 mb-3 rounded-full bg-rose-50 flex items-center justify-center border-2 border-rose-100 text-rose-400">
                        <i class="fa-regular fa-heart text-2xl"></i>
                    </div>
                    <p class="font-bold text-gray-700 text-sm">Chưa có món yêu thích</p>
                    <p class="text-xs text-gray-400 mt-1 max-w-[200px]">Hãy nhấn biểu tượng trái tim ở các món ăn để lưu lại đây.</p>
                    <a href="#/danh-sach" onclick="window.closeNavDrawers && window.closeNavDrawers()" class="mt-4 px-4 py-2 bg-[#0F4937] text-white rounded-full text-xs font-bold shadow hover:bg-[#145A43] transition-all">Khám phá món ngay</a>
                </div>
            </div>
        </div>
    `;
}

if (typeof window !== 'undefined') {
    window.logoutAuth = async () => {
        const token = localStorage.getItem('auth_token');

        if (token) {
            try {
                await fetch('http://localhost:5000/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (e) {}
        }

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        window.location.hash = '#/login';
    };

    window.closeNavDrawers = () => {
        const overlay = document.getElementById('nav-drawer-overlay');
        const favModal = document.getElementById('nav-fav-modal');
        const wonPopover = document.getElementById('nav-won-popover');
        if (overlay) overlay.classList.add('hidden');
        if (favModal) {
            favModal.classList.add('translate-x-full');
            setTimeout(() => {
                if (favModal.classList.contains('translate-x-full')) {
                    favModal.classList.add('invisible', 'pointer-events-none');
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
            favModal.classList.remove('invisible', 'pointer-events-none', 'translate-x-full');
        }
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
        if (!container) return;

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
                <button onclick="window.removeWonDish(${idx})" class="text-gray-400 hover:text-rose-500 transition text-xs p-1" title="Xóa món này">
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
            window.renderWonDishesList();
            if (window.renderRecentWonDishes) window.renderRecentWonDishes();
        } catch (e) {}
    };

    window.clearWonDishes = () => {
        localStorage.removeItem('won_dishes');
        window.renderWonDishesList();
        if (window.renderRecentWonDishes) window.renderRecentWonDishes();
    };

    window.addWonDish = (dish) => {
        try {
            let won = JSON.parse(localStorage.getItem('won_dishes') || '[]');
            // Avoid duplicate ID if existing
            won = won.filter(d => (d.id || d.name) !== (dish.id || dish.name));
            won.unshift(dish);
            if (won.length > 20) won = won.slice(0, 20);
            localStorage.setItem('won_dishes', JSON.stringify(won));
            window.renderWonDishesList();
            if (window.renderRecentWonDishes) window.renderRecentWonDishes();
        } catch (e) {}
    };
}

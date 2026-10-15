import FoodCard from '../../components/FoodCard.js';
import { fetchAPI } from '../../api.js';

let currentFoodDetail = null;

const FoodDetail = {
    render: async (id) => {
        let food = null;
        try {
            const res = await fetchAPI(`/foods/${id || 1}`);
            if (res && res.success && res.data) {
                food = res.data;
            }
        } catch (e) {
            console.warn('Lỗi khi gọi API chi tiết món ăn:', e);
        }

        if (!food) {
            return `
                <div class="cozy-kitchen-bg min-h-screen text-center py-20 px-4">
                    <p class="text-xl font-bold text-red-500 mb-2">Không tìm thấy món ăn này trong Database!</p>
                    <a href="#/danh-sach" class="text-primary font-semibold underline">Quay lại danh sách</a>
                </div>
            `;
        }

        currentFoodDetail = food;
        window.currentFoodDetail = food;

        const ingredientsCardsHTML = (food.ingredients || []).map(ing => `
            <div class="bg-gray-50/80 border border-gray-100 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 flex items-center justify-between text-xs hover:border-primary/30 transition">
                <div class="flex items-center gap-2 font-semibold text-text-main min-w-0 pr-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span class="truncate">${ing.name}</span>
                </div>
                <span class="text-[11px] font-bold text-text-muted bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-2xs shrink-0">${ing.amount}</span>
            </div>
        `).join('');

        const stepsCardsHTML = (food.steps || []).map((step, index) => `
            <div class="bg-gray-50/80 border border-gray-100 rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 hover:border-primary/30 transition">
                <div class="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                    ${index + 1}
                </div>
                <p class="text-text-main text-xs md:text-sm leading-relaxed pt-0.5 flex-1 min-w-0 break-words">${step}</p>
            </div>
        `).join('');

        // Món ăn liên quan từ database
        const relatedFoods = (food.relatedFoods && food.relatedFoods.length > 0)
            ? food.relatedFoods
            : [];

        const relatedCardsHTML = relatedFoods.map(f => FoodCard(f)).join('');

        return `
            <div class="cozy-kitchen-bg min-h-screen text-text-main font-sans pb-12 sm:pb-16 overflow-x-hidden">
                <!-- Breadcrumb Header -->
                <div class="bg-white/70 backdrop-blur-xs border-b border-beige-border/80 py-2.5 sm:py-3">
                    <div class="container mx-auto px-3 sm:px-4 lg:px-8 text-xs text-text-muted flex items-center gap-1.5 sm:gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
                        <a href="#/" class="hover:text-primary transition font-medium shrink-0">Trang chủ</a> 
                        <span class="text-gray-300 shrink-0">/</span> 
                        <a href="#/danh-sach" class="hover:text-primary transition font-medium shrink-0">Danh sách món ăn</a>
                        <span class="text-gray-300 shrink-0">/</span> 
                        <span class="text-primary font-bold shrink-0 truncate max-w-[140px] sm:max-w-none">${food.name}</span>
                    </div>
                </div>

                <div class="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8 max-w-6xl space-y-6 sm:space-y-10">
                    <div class="flex flex-col lg:flex-row gap-5 sm:gap-8 items-start">
                        
                        <!-- COLUMN 1 (LEFT): Ảnh món ăn HÌNH VUÔNG TO -->
                        <div class="w-full lg:w-5/12 lg:sticky lg:top-20">
                            <div class="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border-2 sm:border-4 border-white bg-gray-100">
                                <img src="${food.image}" alt="${food.name}" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                                
                                <!-- Top Back Button -->
                                <div class="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                                    <button type="button" onclick="if (window.history.length > 1) { window.history.back(); } else { window.location.hash = '#/danh-sach'; }" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold hover:bg-black/70 transition shadow-xs active:scale-95 cursor-pointer border border-white/20">
                                        <i class="fa-solid fa-arrow-left text-[11px] text-[#F4A62A]"></i>
                                        <span>Quay lại</span>
                                    </button>
                                </div>

                                <!-- Overlaid Title & Tags -->
                                <div class="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 text-white z-10">
                                    <div class="flex flex-wrap items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2">
                                        <span class="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] sm:text-[11px] font-bold shadow-2xs">${food.category}</span>
                                        <span class="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold">${food.mealType}</span>
                                        <span class="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1 shadow-2xs">
                                            <i class="fa-solid fa-fire text-[9px]"></i> ${food.calories}
                                        </span>
                                    </div>
                                    <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug line-clamp-2">${food.name}</h1>
                                </div>
                            </div>
                        </div>

                        <!-- COLUMN 2 (RIGHT): Metadata + Button + Bảng nguyên liệu & Công thức -->
                        <div class="w-full lg:w-7/12 space-y-4 sm:space-y-5">
                            
                            <!-- METADATA 3-CARD ROW & ACTION BUTTON -->
                            <div class="space-y-3 sm:space-y-4">
                                <!-- Metadata 3-Card Row -->
                                <div class="grid grid-cols-3 gap-2 sm:gap-3">
                                    <div class="bg-white rounded-2xl p-2.5 sm:p-4 text-center border border-beige-border/80 shadow-xs flex flex-col items-center justify-center min-w-0 transition hover:shadow-sm">
                                        <span class="text-primary text-base sm:text-lg mb-1 flex items-center justify-center"><i class="fa-regular fa-clock"></i></span>
                                        <span class="text-[10px] sm:text-xs text-text-muted font-medium block truncate max-w-full">Thời gian</span>
                                        <span class="font-extrabold text-text-main text-xs sm:text-base block truncate max-w-full mt-0.5">${food.time}</span>
                                    </div>
                                    <div class="bg-white rounded-2xl p-2.5 sm:p-4 text-center border border-beige-border/80 shadow-xs flex flex-col items-center justify-center min-w-0 transition hover:shadow-sm">
                                        <span class="text-rose-500 text-base sm:text-lg mb-1 flex items-center justify-center"><i class="fa-solid fa-heart"></i></span>
                                        <span class="text-[10px] sm:text-xs text-text-muted font-medium block truncate max-w-full">Yêu thích</span>
                                        <span id="detail-likes-count" class="font-extrabold text-text-main text-xs sm:text-base block truncate max-w-full mt-0.5">${food.likes ?? 0}</span>
                                    </div>
                                    <div class="bg-white rounded-2xl p-2.5 sm:p-4 text-center border border-beige-border/80 shadow-xs flex flex-col items-center justify-center min-w-0 transition hover:shadow-sm">
                                        <span class="text-emerald-700 text-base sm:text-lg mb-1 flex items-center justify-center"><i class="fa-solid fa-users"></i></span>
                                        <span class="text-[10px] sm:text-xs text-text-muted font-medium block truncate max-w-full">Khẩu phần</span>
                                        <span class="font-extrabold text-text-main text-xs sm:text-base block truncate max-w-full mt-0.5">${food.portions}</span>
                                    </div>
                                </div>

                                <!-- Action Buttons Row -->
                                <div class="flex items-center gap-3 w-full">
                                    <button id="fav-btn" data-food-id="${food.id}" class="flex-1 py-3 sm:py-3.5 px-4 rounded-2xl ${food.is_favorite ? 'bg-rose-50 border border-rose-300 text-rose-600 font-bold shadow-xs' : 'bg-white border border-beige-border/80 text-text-main font-bold hover:bg-cream-soft hover:text-rose-600'} transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs cursor-pointer active:scale-[0.99]" title="${food.is_favorite ? 'Bỏ lưu món' : 'Lưu món ăn yêu thích'}">
                                        <i class="${food.is_favorite ? 'fa-solid' : 'fa-regular'} fa-heart text-rose-500 text-base"></i>
                                        <span id="fav-btn-label">Lưu món</span>
                                    </button>
                                    <button id="add-to-cart-btn" class="flex-[1.5] py-3 sm:py-3.5 px-5 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold rounded-2xl transition shadow-md shadow-primary/20 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer">
                                        <i class="fa-solid fa-cart-shopping text-accent-light"></i>
                                        <span>Thêm vào đi chợ</span>
                                    </button>
                                </div>
                            </div>

                            <!-- BẢNG NGUYÊN LIỆU & CÔNG THỨC (CÓ TAB SWITCHING) -->
                            <div class="bg-white border border-beige-border/80 rounded-2xl sm:rounded-[22px] p-3.5 sm:p-5 shadow-sm space-y-3 sm:space-y-4">
                                
                                <!-- TAB HEADER BUTTONS -->
                                <div class="grid grid-cols-2 gap-1.5 sm:gap-2 bg-cream-soft/60 p-1 sm:p-1.5 rounded-2xl border border-beige-border mb-1 sm:mb-2">
                                    <button id="tab-ingredients" class="tab-btn active w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs border border-beige-border flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer">
                                        <i class="fa-solid fa-wand-magic-sparkles text-accent"></i>
                                        <span>Nguyên liệu <span class="hidden sm:inline">chuẩn bị</span></span>
                                    </button>
                                    <button id="tab-recipe" class="tab-btn w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer">
                                        <i class="fa-solid fa-fire-burner text-primary"></i>
                                        <span>Công thức <span class="hidden sm:inline">nấu</span> (${food.steps.length} bước)</span>
                                    </button>
                                </div>

                                <!-- TAB PANEL 1: NGUYÊN LIỆU CHUẨN BỊ -->
                                <div id="panel-ingredients" class="tab-panel space-y-2.5 sm:space-y-3">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                                        ${ingredientsCardsHTML}
                                    </div>
                                </div>

                                <!-- TAB PANEL 2: CÔNG THỨC NẤU -->
                                <div id="panel-recipe" class="tab-panel hidden space-y-2.5 sm:space-y-3">
                                    ${stepsCardsHTML}
                                </div>

                            </div>
                        </div>

                    </div>

                    <!-- SECTION MÓN ĂN LIÊN QUAN (THEO DANH MỤC) -->
                    <div class="pt-6 sm:pt-8 border-t border-beige-border/80 space-y-4 sm:space-y-5">
                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <div>
                                <h2 class="text-lg sm:text-xl font-extrabold text-text-main flex items-center gap-2">
                                    <i class="fa-solid fa-utensils text-primary text-base"></i>
                                    <span>Món ăn liên quan (${food.category})</span>
                                </h2>
                                <p class="text-[11px] sm:text-xs text-text-muted mt-0.5 font-medium">Gợi ý các món ngon cùng danh mục cho bữa ăn gia đình</p>
                            </div>
                            <a href="#/danh-sach" class="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1">
                                <span>Xem tất cả</span>
                                <i class="fa-solid fa-chevron-right text-[10px]"></i>
                            </a>
                        </div>

                        <!-- Grid món ăn liên quan (3 cột) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            ${relatedCardsHTML}
                        </div>
                    </div>

                </div>
            </div>

            <!-- Toast notification -->
            <div id="toast-msg" class="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 bg-[#18382D] text-white px-5 py-3 rounded-2xl shadow-xl border border-beige-border/40 -translate-y-4 opacity-0 transition-all duration-300 flex items-center gap-2.5 z-[9999] max-w-[90vw] text-xs sm:text-sm font-bold pointer-events-none">
                <span class="text-green-400"><i class="fa-solid fa-check"></i></span>
                <span id="toast-text">Đã lưu món yêu thích!</span>
            </div>
        `;
    },

    afterRender: async (id) => {
        const btnFav = document.getElementById('fav-btn');
        const btnAdd = document.getElementById('add-to-cart-btn');
        const toast = document.getElementById('toast-msg');
        const toastText = document.getElementById('toast-text');

        // Tab logic
        const tabIng = document.getElementById('tab-ingredients');
        const tabRec = document.getElementById('tab-recipe');
        const panelIng = document.getElementById('panel-ingredients');
        const panelRec = document.getElementById('panel-recipe');

        if (tabIng && tabRec && panelIng && panelRec) {
            tabIng.addEventListener('click', () => {
                tabIng.className = 'tab-btn active w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs border border-beige-border flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer';
                tabRec.className = 'tab-btn w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer';
                panelIng.classList.remove('hidden');
                panelRec.classList.add('hidden');
            });

            tabRec.addEventListener('click', () => {
                tabRec.className = 'tab-btn active w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs border border-beige-border flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer';
                tabIng.className = 'tab-btn w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer';
                panelRec.classList.remove('hidden');
                panelIng.classList.add('hidden');
            });
        }

        function showToast(text) {
            if (!toast) return;
            if (toastText) toastText.textContent = text;
            toast.classList.remove('-translate-y-4', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('-translate-y-4', 'opacity-0');
            }, 3000);
        }

        if (btnAdd) {
            btnAdd.addEventListener('click', async () => {
                const token = localStorage.getItem('auth_token');
                if (!token) {
                    showToast('Vui lòng đăng nhập để lưu danh sách đi chợ! 🔒');
                    setTimeout(() => { window.location.hash = '#/login'; }, 1200);
                    return;
                }

                if (!currentFoodDetail) return;
                btnAdd.disabled = true;
                const originalText = btnAdd.innerHTML;
                btnAdd.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Đang thêm...</span>';

                try {
                    const res = await fetchAPI('/shopping-list/add-food', {
                        method: 'POST',
                        body: JSON.stringify({ foodId: currentFoodDetail.id })
                    });

                    if (res && res.success) {
                        showToast(`Đã thêm nguyên liệu món "${currentFoodDetail.name}" vào Đi chợ! 🛒`);
                        if (window.loadShoppingListInNav) window.loadShoppingListInNav();
                        if (window.openShoppingDrawer) {
                            setTimeout(() => window.openShoppingDrawer(), 800);
                        }
                    } else {
                        showToast(res.message || 'Không thể thêm vào đi chợ.');
                    }
                } catch (err) {
                    showToast('Lỗi khi thêm nguyên liệu.');
                } finally {
                    btnAdd.disabled = false;
                    btnAdd.innerHTML = originalText;
                }
            });
        }

        if (btnFav) {
            btnFav.addEventListener('click', async (e) => {
                const targetFoodId = currentFoodDetail?.id || id;

                if (window.toggleFoodFavorite) {
                    await window.toggleFoodFavorite(e, targetFoodId);
                    if (currentFoodDetail && window.currentFoodDetail) {
                        currentFoodDetail.is_favorite = window.currentFoodDetail.is_favorite;
                        currentFoodDetail.likes = window.currentFoodDetail.likes;
                    }
                } else {
                    const token = localStorage.getItem('auth_token');
                    if (!token) {
                        if (window.Popup) {
                            const goLogin = await window.Popup.confirm({
                                title: 'Yêu cầu đăng nhập',
                                message: 'Bạn cần đăng nhập tài khoản để lưu món ăn yêu thích.',
                                type: 'info',
                                confirmText: 'Đăng nhập ngay',
                                cancelText: 'Để sau'
                            });
                            if (goLogin) window.location.hash = '#/login';
                        } else {
                            alert('Vui lòng đăng nhập để lưu món ăn yêu thích.');
                            window.location.hash = '#/login';
                        }
                        return;
                    }

                    btnFav.disabled = true;
                    try {
                        const res = await fetchAPI(`/foods/${targetFoodId}/favorite`, { method: 'POST' });
                        if (res && res.success) {
                            const isFav = Boolean(res.is_favorite);
                            const favLabel = document.getElementById('fav-btn-label');
                            const likesEl = document.getElementById('detail-likes-count');
                            const favIcon = btnFav.querySelector('i');

                            if (isFav) {
                                btnFav.className = 'flex-1 py-3 sm:py-3.5 px-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-600 font-bold transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs cursor-pointer active:scale-[0.99]';
                                if (favIcon) favIcon.className = 'fa-solid fa-heart text-rose-500 text-base';
                                if (favLabel) favLabel.textContent = 'Lưu món';
                                btnFav.title = 'Bỏ lưu món';
                            } else {
                                btnFav.className = 'flex-1 py-3 sm:py-3.5 px-4 rounded-2xl bg-white border border-beige-border/80 text-text-main font-bold hover:bg-cream-soft hover:text-rose-600 transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs cursor-pointer active:scale-[0.99]';
                                if (favIcon) favIcon.className = 'fa-regular fa-heart text-rose-500 text-base';
                                if (favLabel) favLabel.textContent = 'Lưu món';
                                btnFav.title = 'Lưu món ăn yêu thích';
                            }

                            if (likesEl && typeof res.likes !== 'undefined') {
                                likesEl.textContent = res.likes;
                            }

                            if (currentFoodDetail) {
                                currentFoodDetail.is_favorite = isFav;
                                if (typeof res.likes !== 'undefined') currentFoodDetail.likes = res.likes;
                            }

                            if (window.updateNavbarFavBadge) {
                                window.updateNavbarFavBadge(res.userTotalFavorites ?? null);
                            }

                            const favModal = document.getElementById('nav-fav-modal');
                            if (favModal && !favModal.classList.contains('invisible') && window.loadNavbarFavorites) {
                                window.loadNavbarFavorites();
                            }

                            if (window.Popup) {
                                window.Popup.toast(res.message, isFav ? 'success' : 'info');
                            } else {
                                showToast(res.message);
                            }
                        } else {
                            if (window.Popup) {
                                window.Popup.error(res?.message || 'Có lỗi xảy ra.');
                            } else {
                                showToast(res?.message || 'Có lỗi xảy ra.');
                            }
                        }
                    } catch (e) {
                        console.error('Lỗi toggle favorite:', e);
                    } finally {
                        btnFav.disabled = false;
                    }
                }
            });
        }

        if (window.updateNavbarFavBadge) {
            window.updateNavbarFavBadge();
        }
        if (window.syncFavBadge) {
            window.syncFavBadge();
        }
    }
};

export default FoodDetail;

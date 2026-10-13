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
                <div class="cozy-kitchen-bg min-h-screen text-center py-20">
                    <p class="text-xl font-bold text-red-500 mb-2">Không tìm thấy món ăn này trong Database!</p>
                    <a href="#/danh-sach" class="text-primary font-semibold underline">Quay lại danh sách</a>
                </div>
            `;
        }

        currentFoodDetail = food;
        window.currentFoodDetail = food;

        const ingredientsCardsHTML = (food.ingredients || []).map(ing => `
            <div class="bg-gray-50/80 border border-gray-100 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs hover:border-primary/30 transition">
                <div class="flex items-center gap-2 font-semibold text-text-main">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span>${ing.name}</span>
                </div>
                <span class="text-[11px] font-bold text-text-muted bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-2xs">${ing.amount}</span>
            </div>
        `).join('');

        const stepsCardsHTML = (food.steps || []).map((step, index) => `
            <div class="bg-gray-50/80 border border-gray-100 rounded-xl p-3.5 flex items-start gap-3 hover:border-primary/30 transition">
                <div class="shrink-0 w-7 h-7 rounded-full bg-primary text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                    ${index + 1}
                </div>
                <p class="text-text-main text-xs md:text-sm leading-relaxed pt-0.5">${step}</p>
            </div>
        `).join('');

        // Món ăn liên quan từ database
        const relatedFoods = (food.relatedFoods && food.relatedFoods.length > 0)
            ? food.relatedFoods
            : [];

        const relatedCardsHTML = relatedFoods.map(f => FoodCard(f)).join('');

        return `
            <div class="cozy-kitchen-bg min-h-screen text-text-main font-sans pb-16">
                <!-- Breadcrumb Header -->
                <div class="bg-white/70 backdrop-blur-xs border-b border-beige-border/80 py-3">
                    <div class="container mx-auto px-4 lg:px-8 text-xs text-text-muted flex items-center gap-2">
                        <a href="#/" class="hover:text-primary transition font-medium">Trang chủ</a> 
                        <span class="text-gray-300">/</span> 
                        <a href="#/danh-sach" class="hover:text-primary transition font-medium">Danh sách món ăn</a>
                        <span class="text-gray-300">/</span> 
                        <span class="text-primary font-bold">${food.name}</span>
                    </div>
                </div>

                <div class="container mx-auto px-4 lg:px-8 py-6 md:py-8 max-w-6xl space-y-10">
                    <div class="flex flex-col lg:flex-row gap-8 items-start">
                        
                        <!-- COLUMN 1 (LEFT): Ảnh món ăn HÌNH VUÔNG TO [hình2] -->
                        <div class="w-full lg:w-5/12 lg:sticky lg:top-20">
                            <div class="relative aspect-square w-full rounded-3xl overflow-hidden shadow-md border-4 border-white">
                                <img src="${food.image}" alt="${food.name}" class="w-full h-full object-cover">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                                
                                <!-- Top Back Button -->
                                <div class="absolute top-4 left-4 z-10">
                                    <a href="#/danh-sach" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold hover:bg-black/60 transition shadow-xs">
                                        <i class="fa-solid fa-arrow-left text-[10px]"></i>
                                        <span>Quay lại</span>
                                    </a>
                                </div>

                                <!-- Overlaid Title & Tags -->
                                <div class="absolute bottom-5 left-5 right-5 text-white z-10">
                                    <div class="flex flex-wrap items-center gap-1.5 mb-2">
                                        <span class="px-2.5 py-0.5 rounded-full bg-primary text-white text-[11px] font-bold shadow-2xs">${food.category}</span>
                                        <span class="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold">${food.mealType}</span>
                                        <span class="px-2.5 py-0.5 rounded-full bg-accent text-white text-[11px] font-bold flex items-center gap-1 shadow-2xs">
                                            <i class="fa-solid fa-fire text-[9px]"></i> ${food.calories}
                                        </span>
                                    </div>
                                    <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">${food.name}</h1>
                                </div>
                            </div>
                        </div>

                        <!-- COLUMN 2 (RIGHT): [hình1] (Metadata + Buttons) NẰM TRÊN BẢNG NGUYÊN LIỆU & CÔNG THỨC -->
                        <div class="w-full lg:w-7/12 space-y-5">
                            
                            <!-- [hình1]: METADATA 3-CARD ROW & ACTION BUTTONS -->
                            <div class="space-y-4">
                                <!-- Metadata 3-Card Row -->
                                <div class="grid grid-cols-3 gap-3">
                                    <div class="bg-white rounded-2xl p-3.5 sm:p-4 text-center border border-beige-border/80 shadow-sm">
                                        <span class="text-primary text-lg mb-0.5 block"><i class="fa-regular fa-clock"></i></span>
                                        <span class="text-[11px] text-text-muted font-medium block">Thời gian</span>
                                        <span class="font-extrabold text-text-main text-sm md:text-base">${food.time}</span>
                                    </div>
                                    <div class="bg-white rounded-2xl p-3.5 sm:p-4 text-center border border-beige-border/80 shadow-sm">
                                        <span class="text-rose-500 text-lg mb-0.5 block"><i class="fa-solid fa-heart"></i></span>
                                        <span class="text-[11px] text-text-muted font-medium block">Yêu thích</span>
                                        <span id="detail-likes-count" class="font-extrabold text-text-main text-sm md:text-base">${food.likes ?? 0}</span>
                                    </div>
                                    <div class="bg-white rounded-2xl p-3.5 sm:p-4 text-center border border-beige-border/80 shadow-sm">
                                        <span class="text-emerald-700 text-lg mb-0.5 block"><i class="fa-solid fa-users"></i></span>
                                        <span class="text-[11px] text-text-muted font-medium block">Khẩu phần</span>
                                        <span class="font-extrabold text-text-main text-sm md:text-base">${food.portions}</span>
                                    </div>
                                </div>

                                <!-- Action Buttons Row -->
<<<<<<< HEAD
                                <div class="flex items-center gap-3">
                                    <button id="fav-btn" class="flex-1 py-3 px-4 rounded-2xl ${food.is_favorite ? 'bg-rose-50 border border-rose-200 text-rose-600' : 'bg-white border border-beige-border/80 text-text-main'} font-semibold hover:bg-cream-soft transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer">
                                        <i class="${food.is_favorite ? 'fa-solid' : 'fa-regular'} fa-heart text-rose-500"></i>
                                        <span>${food.is_favorite ? 'Đã lưu món' : 'Lưu món'}</span>
                                    </button>
                                    <button id="add-to-cart-btn" class="flex-[2] py-3 px-5 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold rounded-2xl transition shadow-md shadow-primary/20 flex items-center justify-center gap-2 text-xs md:text-sm cursor-pointer">
                                        <i class="fa-solid fa-cart-shopping text-accent-light"></i>
                                        <span>Thêm vào đi chợ</span>
=======
                                <div class="w-full">
                                    <button id="fav-btn" data-food-id="${food.id}" class="w-full py-3.5 px-6 rounded-2xl ${food.is_favorite ? 'bg-rose-50 border border-rose-300 text-rose-600 font-bold shadow-xs' : 'bg-white border border-beige-border/80 text-text-main font-bold hover:bg-cream-soft hover:text-rose-600'} transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer" title="${food.is_favorite ? 'Bỏ lưu món' : 'Lưu món ăn yêu thích'}">
                                        <i class="${food.is_favorite ? 'fa-solid' : 'fa-regular'} fa-heart text-rose-500 text-base"></i>
                                        <span id="fav-btn-label">${food.is_favorite ? 'Đã lưu món yêu thích' : 'Lưu món yêu thích'}</span>
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
                                    </button>
                                </div>
                            </div>

                            <!-- BẢNG NGUYÊN LIỆU & CÔNG THỨC (CÓ TAB SWITCHING) -->
                            <div class="bg-white border border-beige-border/80 rounded-[22px] p-5 shadow-sm space-y-4">
                                
                                <!-- TAB HEADER BUTTONS (2 cột dài bằng khung bên ngoài) -->
                                <div class="grid grid-cols-2 gap-2 bg-cream-soft/60 p-1.5 rounded-2xl border border-beige-border mb-2">
                                    <button id="tab-ingredients" class="tab-btn active w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs border border-beige-border flex items-center justify-center gap-2 cursor-pointer">
                                        <i class="fa-solid fa-wand-magic-sparkles text-accent"></i>
                                        <span>Nguyên liệu chuẩn bị</span>
                                    </button>
                                    <button id="tab-recipe" class="tab-btn w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main transition-all flex items-center justify-center gap-2 cursor-pointer">
                                        <i class="fa-solid fa-fire-burner text-primary"></i>
                                        <span>Công thức nấu (${food.steps.length} bước)</span>
                                    </button>
                                </div>

                                <!-- TAB PANEL 1: NGUYÊN LIỆU CHUẨN BỊ -->
                                <div id="panel-ingredients" class="tab-panel space-y-3">
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                        ${ingredientsCardsHTML}
                                    </div>
                                </div>

                                <!-- TAB PANEL 2: CÔNG THỨC NẤU -->
                                <div id="panel-recipe" class="tab-panel hidden space-y-2.5">
                                    ${stepsCardsHTML}
                                </div>

                            </div>
                        </div>

                    </div>

                    <!-- SECTION MÓN ĂN LIÊN QUAN (THEO DANH MỤC) -->
                    <div class="pt-8 border-t border-beige-border/80 space-y-5">
                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <div>
                                <h2 class="text-xl font-extrabold text-text-main flex items-center gap-2">
                                    <i class="fa-solid fa-utensils text-primary"></i>
                                    Món ăn liên quan (${food.category})
                                </h2>
                                <p class="text-xs text-text-muted mt-0.5 font-medium">Gợi ý các món ngon cùng danh mục cho bữa ăn gia đình</p>
                            </div>
                            <a href="#/danh-sach" class="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1">
                                <span>Xem tất cả</span>
                                <i class="fa-solid fa-chevron-right text-[10px]"></i>
                            </a>
                        </div>

                        <!-- Grid món ăn liên quan (3 cột) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            ${relatedCardsHTML}
                        </div>
                    </div>

                </div>
            </div>

            <!-- Toast notification -->
            <div id="toast-msg" class="fixed bottom-5 right-5 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-xl translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3 z-50">
                <span class="text-green-400"><i class="fa-solid fa-check"></i></span>
                <span id="toast-text">Đã thêm nguyên liệu vào Danh sách đi chợ!</span>
            </div>
        `;
    },

    afterRender: async (id) => {
        const btnFav = document.getElementById('fav-btn');
        const toast = document.getElementById('toast-msg');
        const toastText = document.getElementById('toast-text');

        // Tab logic
        const tabIng = document.getElementById('tab-ingredients');
        const tabRec = document.getElementById('tab-recipe');
        const panelIng = document.getElementById('panel-ingredients');
        const panelRec = document.getElementById('panel-recipe');

        if (tabIng && tabRec && panelIng && panelRec) {
            tabIng.addEventListener('click', () => {
                tabIng.className = 'tab-btn active w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs border border-gray-200/60 flex items-center justify-center gap-2 cursor-pointer';
                tabRec.className = 'tab-btn w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main transition-all flex items-center justify-center gap-2 cursor-pointer';
                panelIng.classList.remove('hidden');
                panelRec.classList.add('hidden');
            });

            tabRec.addEventListener('click', () => {
                tabRec.className = 'tab-btn active w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all bg-white text-primary shadow-xs border border-gray-200/60 flex items-center justify-center gap-2 cursor-pointer';
                tabIng.className = 'tab-btn w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-text-muted hover:text-text-main transition-all flex items-center justify-center gap-2 cursor-pointer';
                panelRec.classList.remove('hidden');
                panelIng.classList.add('hidden');
            });
        }

        function showToast(text) {
            if (!toast) return;
            if (toastText) toastText.textContent = text;
            toast.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

<<<<<<< HEAD
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
=======
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
                                btnFav.className = 'w-full py-3.5 px-6 rounded-2xl bg-rose-50 border border-rose-300 text-rose-600 font-bold transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer';
                                if (favIcon) favIcon.className = 'fa-solid fa-heart text-rose-500 text-base';
                                if (favLabel) favLabel.textContent = 'Đã lưu món yêu thích';
                                btnFav.title = 'Bỏ lưu món';
                            } else {
                                btnFav.className = 'w-full py-3.5 px-6 rounded-2xl bg-white border border-beige-border/80 text-text-main font-bold hover:bg-cream-soft hover:text-rose-600 transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer';
                                if (favIcon) favIcon.className = 'fa-regular fa-heart text-rose-500 text-base';
                                if (favLabel) favLabel.textContent = 'Lưu món yêu thích';
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
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
                }
            });
        }

<<<<<<< HEAD
        if (btnFav) {
            btnFav.addEventListener('click', async () => {
                const token = localStorage.getItem('auth_token');
                if (!token) {
                    showToast('Vui lòng đăng nhập để lưu món yêu thích! 🔒');
                    setTimeout(() => { window.location.hash = '#/login'; }, 1200);
                    return;
                }

                if (!currentFoodDetail) return;
                btnFav.disabled = true;

                try {
                    const res = await fetchAPI(`/auth/me/favorites/${currentFoodDetail.id}/toggle`, {
                        method: 'POST'
                    });

                    if (res && res.success) {
                        currentFoodDetail.is_favorite = res.is_favorite;
                        const isFav = res.is_favorite;
                        btnFav.className = `flex-1 py-3 px-4 rounded-2xl ${isFav ? 'bg-rose-50 border border-rose-200 text-rose-600' : 'bg-white border border-beige-border/80 text-text-main'} font-semibold hover:bg-cream-soft transition flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm cursor-pointer`;
                        btnFav.innerHTML = `<i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart text-rose-500"></i><span>${isFav ? 'Đã lưu món' : 'Lưu món'}</span>`;
                        showToast(res.message);
                        if (window.loadFavoritesInNav) window.loadFavoritesInNav();
                    } else {
                        showToast(res.message || 'Không thể cập nhật yêu thích.');
                    }
                } catch (err) {
                    showToast('Lỗi kết nối khi cập nhật yêu thích.');
                } finally {
                    btnFav.disabled = false;
                }
            });
=======
        if (window.updateNavbarFavBadge) {
            window.updateNavbarFavBadge();
>>>>>>> c217107e829a23c28d6011ad1e764d46a2bd4f12
        }
        if (window.syncFavBadge) {
            window.syncFavBadge();
        }
    }
};

export default FoodDetail;

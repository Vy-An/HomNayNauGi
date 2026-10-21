/**
 * Component Popup / Modal / Toast tái sử dụng cho toàn bộ dự án Hôm Nay Nấu Gì
 * Hỗ trợ:
 * - Popup.confirm({ title, message, type, confirmText, cancelText }) -> Promise<boolean> (Yes/No)
 * - Popup.alert({ title, message, type, confirmText }) -> Promise<void>
 * - Popup.success(message, title, options)
 * - Popup.error(message, title, options)
 * - Popup.warning(message, title, options)
 * - Popup.info(message, title, options)
 * - Popup.toast(message, type, duration)
 */

class PopupManager {
    constructor() {
        this.activeModal = null;
        this.toastContainer = null;
        this.initDOM();
    }

    initDOM() {
        if (typeof document === 'undefined') return;

        // Container cho toast
        if (!document.getElementById('app-popup-toast-container')) {
            const toastBox = document.createElement('div');
            toastBox.id = 'app-popup-toast-container';
            toastBox.className = 'fixed top-16 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 z-[99999] flex flex-col gap-2.5 pointer-events-none sm:max-w-sm w-auto items-center sm:items-end';
            document.body.appendChild(toastBox);
            this.toastContainer = toastBox;
        } else {
            this.toastContainer = document.getElementById('app-popup-toast-container');
        }

        // Keyframe animation và CSS hỗ trợ nếu Tailwind chưa recompile
        if (!document.getElementById('app-popup-styles')) {
            const style = document.createElement('style');
            style.id = 'app-popup-styles';
            style.textContent = `
                @keyframes popupFadeIn {
                    from { opacity: 0; transform: scale(0.92) translateY(8px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes popupFadeOut {
                    from { opacity: 1; transform: scale(1) translateY(0); }
                    to { opacity: 0; transform: scale(0.92) translateY(8px); }
                }
                @keyframes toastSlideIn {
                    from { opacity: 0; transform: translateX(40px) scale(0.95); }
                    to { opacity: 1; transform: translateX(0) scale(1); }
                }
                @keyframes toastSlideOut {
                    from { opacity: 1; transform: translateX(0) scale(1); }
                    to { opacity: 0; transform: translateX(40px) scale(0.95); }
                }
                .app-popup-card-anim-in {
                    animation: popupFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .app-popup-card-anim-out {
                    animation: popupFadeOut 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .app-toast-anim-in {
                    animation: toastSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .app-toast-anim-out {
                    animation: toastSlideOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `;
            document.head.appendChild(style);
        }
    }

    getTypeConfig(type = 'info') {
        const configs = {
            success: {
                icon: '<i class="fa-solid fa-circle-check"></i>',
                iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                accentColor: '#10b981',
                confirmBg: 'bg-[#245B43] hover:bg-[#1B4633] text-white shadow-emerald-900/20',
                badgeText: 'Thành công',
                defaultTitle: 'Thao tác thành công!'
            },
            error: {
                icon: '<i class="fa-solid fa-circle-xmark"></i>',
                iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
                accentColor: '#f43f5e',
                confirmBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20',
                badgeText: 'Lỗi',
                defaultTitle: 'Đã xảy ra lỗi!'
            },
            danger: {
                icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
                iconBg: 'bg-rose-50 text-rose-600 border-rose-200',
                accentColor: '#e11d48',
                confirmBg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20',
                badgeText: 'Cảnh báo',
                defaultTitle: 'Cảnh báo nguy hiểm'
            },
            warning: {
                icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
                iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
                accentColor: '#f59e0b',
                confirmBg: 'bg-[#E59F3F] hover:bg-[#C27E25] text-white shadow-amber-900/20',
                badgeText: 'Cảnh báo',
                defaultTitle: 'Xác nhận thay đổi'
            },
            question: {
                icon: '<i class="fa-solid fa-circle-question"></i>',
                iconBg: 'bg-emerald-50 text-[#245B43] border-emerald-200',
                accentColor: '#245B43',
                confirmBg: 'bg-[#245B43] hover:bg-[#1B4633] text-white shadow-emerald-900/20',
                badgeText: 'Xác nhận',
                defaultTitle: 'Bạn có chắc chắn?'
            },
            info: {
                icon: '<i class="fa-solid fa-circle-info"></i>',
                iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
                accentColor: '#0284c7',
                confirmBg: 'bg-[#245B43] hover:bg-[#1B4633] text-white shadow-emerald-900/20',
                badgeText: 'Thông báo',
                defaultTitle: 'Thông báo hệ thống'
            }
        };

        return configs[type] || configs.info;
    }

    /**
     * Hiển thị hộp thoại Xác nhận Yes / No (Confirm Modal)
     * Trả về Promise<boolean>
     */
    confirm(options = {}) {
        return new Promise((resolve) => {
            this.initDOM();

            // Đóng modal cũ nếu còn
            if (this.activeModal) {
                this.closeModal(false);
            }

            const {
                title,
                message = '',
                type = 'warning',
                confirmText = 'Đồng ý',
                cancelText = 'Hủy bỏ',
                confirmButtonColor,
                icon,
                html = null
            } = typeof options === 'string' ? { message: options } : options;

            const cfg = this.getTypeConfig(type);
            const displayTitle = title || cfg.defaultTitle;
            const customIcon = icon || cfg.icon;

            // Xác định màu nút confirm
            let confirmBtnClass = cfg.confirmBg;
            if (confirmButtonColor === 'danger') {
                confirmBtnClass = 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/20';
            } else if (confirmButtonColor === 'primary') {
                confirmBtnClass = 'bg-[#245B43] hover:bg-[#1B4633] text-white shadow-emerald-900/20';
            } else if (confirmButtonColor === 'warning') {
                confirmBtnClass = 'bg-[#E59F3F] hover:bg-[#C27E25] text-white shadow-amber-900/20';
            }

            const backdrop = document.createElement('div');
            backdrop.className = 'fixed inset-0 z-[99998] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200';
            backdrop.style.opacity = '0';

            const modalContent = document.createElement('div');
            modalContent.className = 'app-popup-card-anim-in relative bg-[#FCFAF6] border border-[#E9D8B7] w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden';
            
            // Trang trí vệt sáng ấm phía trên
            const topBar = document.createElement('div');
            topBar.className = 'absolute top-0 left-0 right-0 h-1.5';
            topBar.style.backgroundColor = cfg.accentColor;
            modalContent.appendChild(topBar);

            modalContent.innerHTML += `
                <!-- Nút X đóng nhanh -->
                <button type="button" id="app-popup-close-x" class="absolute top-4 right-4 w-8 h-8 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center transition-colors cursor-pointer text-sm" title="Đóng">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-4.5 pt-1">
                    <!-- Icon tròn ấn tượng -->
                    <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${cfg.iconBg} border flex items-center justify-center text-2xl shrink-0 shadow-sm">
                        ${customIcon}
                    </div>

                    <div class="flex-1 text-center sm:text-left min-w-0">
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1.5 ${cfg.iconBg}">
                            ${cfg.badgeText}
                        </span>
                        <h3 class="text-lg sm:text-xl font-extrabold text-[#26382F] leading-snug">
                            ${displayTitle}
                        </h3>
                        <div class="text-sm text-[#66736B] leading-relaxed mt-2 font-medium">
                            ${html || message}
                        </div>
                    </div>
                </div>

                <!-- Nút thao tác Yes / No -->
                <div class="mt-6 pt-4 border-t border-[#E9D8B7]/60 flex items-center justify-end gap-2.5">
                    <button type="button" id="app-popup-cancel-btn" class="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white hover:bg-stone-100 text-[#4A5550] border border-stone-200 font-bold text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                        ${cancelText}
                    </button>
                    <button type="button" id="app-popup-confirm-btn" class="w-full sm:w-auto px-5.5 py-2.5 rounded-2xl ${confirmBtnClass} font-extrabold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                        ${confirmText}
                    </button>
                </div>
            `;

            backdrop.appendChild(modalContent);
            document.body.appendChild(backdrop);

            // Hiệu ứng mở backdrop
            requestAnimationFrame(() => {
                backdrop.style.opacity = '1';
            });

            const cleanup = (result) => {
                modalContent.classList.remove('app-popup-card-anim-in');
                modalContent.classList.add('app-popup-card-anim-out');
                backdrop.style.opacity = '0';
                
                setTimeout(() => {
                    if (backdrop.parentNode) {
                        backdrop.parentNode.removeChild(backdrop);
                    }
                    this.activeModal = null;
                    document.removeEventListener('keydown', keyHandler);
                    resolve(result);
                }, 180);
            };

            const confirmBtn = modalContent.querySelector('#app-popup-confirm-btn');
            const cancelBtn = modalContent.querySelector('#app-popup-cancel-btn');
            const closeX = modalContent.querySelector('#app-popup-close-x');

            confirmBtn?.addEventListener('click', () => cleanup(true));
            cancelBtn?.addEventListener('click', () => cleanup(false));
            closeX?.addEventListener('click', () => cleanup(false));

            // Đóng khi click ngoài backdrop
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) cleanup(false);
            });

            // Phím tắt bàn phím
            const keyHandler = (e) => {
                if (e.key === 'Escape') {
                    cleanup(false);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    cleanup(true);
                }
            };
            document.addEventListener('keydown', keyHandler);

            // Auto-focus vào nút confirm
            setTimeout(() => confirmBtn?.focus(), 50);

            this.activeModal = { backdrop, cleanup };
        });
    }

    /**
     * Hiển thị hộp thoại Alert thông báo 1 nút
     * Trả về Promise<void>
     */
    alert(options = {}) {
        return new Promise((resolve) => {
            this.initDOM();

            if (this.activeModal) {
                this.closeModal(false);
            }

            const {
                title,
                message = '',
                type = 'info',
                confirmText = 'Đã hiểu',
                icon,
                html = null
            } = typeof options === 'string' ? { message: options } : options;

            const cfg = this.getTypeConfig(type);
            const displayTitle = title || cfg.defaultTitle;
            const customIcon = icon || cfg.icon;

            const backdrop = document.createElement('div');
            backdrop.className = 'fixed inset-0 z-[99998] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200';
            backdrop.style.opacity = '0';

            const modalContent = document.createElement('div');
            modalContent.className = 'app-popup-card-anim-in relative bg-[#FCFAF6] border border-[#E9D8B7] w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden';
            
            const topBar = document.createElement('div');
            topBar.className = 'absolute top-0 left-0 right-0 h-1.5';
            topBar.style.backgroundColor = cfg.accentColor;
            modalContent.appendChild(topBar);

            modalContent.innerHTML += `
                <button type="button" id="app-popup-close-x" class="absolute top-4 right-4 w-8 h-8 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center transition-colors cursor-pointer text-sm" title="Đóng">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-4.5 pt-1">
                    <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${cfg.iconBg} border flex items-center justify-center text-2xl shrink-0 shadow-sm">
                        ${customIcon}
                    </div>

                    <div class="flex-1 text-center sm:text-left min-w-0">
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider mb-1.5 ${cfg.iconBg}">
                            ${cfg.badgeText}
                        </span>
                        <h3 class="text-lg sm:text-xl font-extrabold text-[#26382F] leading-snug">
                            ${displayTitle}
                        </h3>
                        <div class="text-sm text-[#66736B] leading-relaxed mt-2 font-medium">
                            ${html || message}
                        </div>
                    </div>
                </div>

                <div class="mt-6 pt-4 border-t border-[#E9D8B7]/60 flex items-center justify-end">
                    <button type="button" id="app-popup-confirm-btn" class="w-full sm:w-auto px-6 py-2.5 rounded-2xl ${cfg.confirmBg} font-extrabold text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                        ${confirmText}
                    </button>
                </div>
            `;

            backdrop.appendChild(modalContent);
            document.body.appendChild(backdrop);

            requestAnimationFrame(() => {
                backdrop.style.opacity = '1';
            });

            const cleanup = () => {
                modalContent.classList.remove('app-popup-card-anim-in');
                modalContent.classList.add('app-popup-card-anim-out');
                backdrop.style.opacity = '0';
                
                setTimeout(() => {
                    if (backdrop.parentNode) {
                        backdrop.parentNode.removeChild(backdrop);
                    }
                    this.activeModal = null;
                    document.removeEventListener('keydown', keyHandler);
                    resolve();
                }, 180);
            };

            const confirmBtn = modalContent.querySelector('#app-popup-confirm-btn');
            const closeX = modalContent.querySelector('#app-popup-close-x');

            confirmBtn?.addEventListener('click', cleanup);
            closeX?.addEventListener('click', cleanup);

            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) cleanup();
            });

            const keyHandler = (e) => {
                if (e.key === 'Escape' || e.key === 'Enter') {
                    cleanup();
                }
            };
            document.addEventListener('keydown', keyHandler);

            setTimeout(() => confirmBtn?.focus(), 50);

            this.activeModal = { backdrop, cleanup };
        });
    }

    closeModal(result = false) {
        if (this.activeModal && this.activeModal.cleanup) {
            this.activeModal.cleanup(result);
        }
    }

    /**
     * Tiện ích nhanh: Popup thành công
     */
    success(message, title = 'Thành công', options = {}) {
        return this.alert({
            title,
            message,
            type: 'success',
            ...options
        });
    }

    /**
     * Tiện ích nhanh: Popup thất bại / lỗi
     */
    error(message, title = 'Đã có lỗi xảy ra', options = {}) {
        return this.alert({
            title,
            message,
            type: 'error',
            ...options
        });
    }

    /**
     * Tiện ích nhanh: Popup cảnh báo
     */
    warning(message, title = 'Cảnh báo', options = {}) {
        return this.alert({
            title,
            message,
            type: 'warning',
            ...options
        });
    }

    /**
     * Tiện ích nhanh: Popup thông tin
     */
    info(message, title = 'Thông báo', options = {}) {
        return this.alert({
            title,
            message,
            type: 'info',
            ...options
        });
    }

    /**
     * Hiển thị Toast thông báo nổi ở góc màn hình
     */
    toast(message, type = 'success', duration = 3200) {
        this.initDOM();
        if (!this.toastContainer) return;

        const cfg = this.getTypeConfig(type);

        const toastEl = document.createElement('div');
        toastEl.className = 'app-toast-anim-in pointer-events-auto flex items-center justify-between gap-3 px-4.5 py-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E9D8B7] shadow-xl text-xs sm:text-sm font-bold text-[#26382F]';

        toastEl.innerHTML = `
            <div class="flex items-center gap-2.5 min-w-0">
                <div class="w-7 h-7 rounded-xl ${cfg.iconBg} border flex items-center justify-center text-sm shrink-0">
                    ${cfg.icon}
                </div>
                <span class="truncate font-semibold">${message}</span>
            </div>
            <button type="button" class="text-stone-400 hover:text-stone-700 p-1 text-xs transition cursor-pointer">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        const closeBtn = toastEl.querySelector('button');
        const removeToast = () => {
            toastEl.classList.remove('app-toast-anim-in');
            toastEl.classList.add('app-toast-anim-out');
            setTimeout(() => toastEl.remove(), 200);
        };

        closeBtn?.addEventListener('click', removeToast);

        this.toastContainer.appendChild(toastEl);

        if (duration > 0) {
            setTimeout(removeToast, duration);
        }
    }
}

// Khởi tạo singleton
const Popup = new PopupManager();

// Gắn vào window để bất kỳ nơi nào trong app cũng gọi được
if (typeof window !== 'undefined') {
    window.Popup = Popup;

    // Tự động ghi đè window.alert cũ bằng Popup đẹp mắt
    window.alert = (msg) => {
        Popup.info(String(msg || ''), 'Thông báo');
    };
}

export default Popup;

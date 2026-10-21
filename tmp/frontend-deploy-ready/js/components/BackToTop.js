/**
 * Component Nút Trả Về Đầu Trang (Back To Top Button)
 * Tái sử dụng cho toàn bộ các trang trên ứng dụng Hôm Nay Nấu Gì
 */

const BackToTop = {
    _scrollHandlerAttached: false,

    /**
     * Trả về HTML của nút BackToTop
     */
    render: () => {
        return `
            <button 
                id="btn-back-to-top" 
                type="button" 
                aria-label="Lên đầu trang" 
                title="Lên đầu trang" 
                class="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,8px))] sm:bottom-8 right-3.5 sm:right-6 md:right-8 z-35 w-10.5 h-10.5 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#145A43] hover:bg-[#0F4937] text-white shadow-lg shadow-[#145A43]/30 hover:shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 transform opacity-0 pointer-events-none translate-y-3 scale-90 active:scale-90 border border-white/30 backdrop-blur-xs group"
            >
                <i class="fa-solid fa-arrow-up text-sm sm:text-base group-hover:-translate-y-0.5 transition-transform duration-200"></i>
            </button>
        `;
    },

    /**
     * Cập nhật trạng thái hiển thị/ẩn dựa trên vị trí cuộn trang
     */
    updateVisibility: () => {
        const btn = document.getElementById('btn-back-to-top');
        if (!btn) return;
        const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollY > 200) {
            btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3', 'scale-90');
            btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
        } else {
            btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3', 'scale-90');
            btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
        }
    },

    /**
     * Khởi tạo nút và gắn sự kiện cuộn trang & click
     */
    init: () => {
        let btn = document.getElementById('btn-back-to-top');
        if (!btn) {
            // Tự động chèn vào cuối body nếu chưa tồn tại
            const container = document.createElement('div');
            container.id = 'back-to-top-wrapper';
            container.innerHTML = BackToTop.render();
            const element = container.firstElementChild;
            if (element) {
                document.body.appendChild(element);
                btn = element;
            }
        }

        if (btn) {
            // Click để cuộn mượt mà lên đầu trang
            btn.onclick = (e) => {
                e.preventDefault();
                try {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } catch (err) {
                    window.scrollTo(0, 0);
                }
            };
        }

        // Chỉ gắn sự kiện cuộn 1 lần duy nhất cho window
        if (!BackToTop._scrollHandlerAttached) {
            window.addEventListener('scroll', BackToTop.updateVisibility, { passive: true });
            BackToTop._scrollHandlerAttached = true;
        }

        BackToTop.updateVisibility();
    }
};

export default BackToTop;


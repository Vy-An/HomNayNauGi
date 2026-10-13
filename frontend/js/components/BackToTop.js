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
                aria-label="Về đầu trang" 
                title="Về đầu trang" 
                class="fixed bottom-6 right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#245B43] hover:bg-[#1B4633] text-white shadow-lg shadow-[#245B43]/30 hover:shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 transform opacity-0 pointer-events-none translate-y-4 hover:-translate-y-1 active:scale-90 border-2 border-white/20 backdrop-blur-xs group"
            >
                <i class="fa-solid fa-chevron-up text-sm sm:text-base group-hover:-translate-y-0.5 transition-transform duration-200"></i>
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
        if (scrollY > 250) {
            btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
        } else {
            btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
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
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
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


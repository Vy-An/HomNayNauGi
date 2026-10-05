export default function Navbar() {
    return `
        <!-- Lớp phủ tối (Overlay) cho Modal Yêu thích -->
        <div id="nav-fav-overlay" onclick="document.getElementById('nav-fav-modal').classList.add('translate-x-full'); this.classList.add('hidden');" class="fixed inset-0 bg-black/40 z-[55] hidden transition-opacity"></div>

        <header class="bg-primary text-white shadow-md relative z-50">
            <div class="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
                <!-- Logo -->
                <a href="#/" class="flex items-center gap-2 text-2xl font-extrabold tracking-wide hover:opacity-90 transition">
                    <i class="fa-solid fa-kitchen-set text-accent text-3xl"></i>
                    <span>Hôm Nay Ăn Gì?</span>
                </a>
                
                <!-- Center Navigation -->
                <nav class="hidden md:flex gap-8 font-semibold">
                    <a href="#/" class="relative hover:text-accent transition duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">Trang chủ</a>
                    <a href="#/danh-sach" class="relative hover:text-accent transition duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">Danh sách món ăn</a>
                    <a href="#/cong-dong" class="relative hover:text-accent transition duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">Cộng đồng</a>
                    <a href="#/admin" class="relative hover:text-accent transition duration-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-accent after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300">Admin</a>
                </nav>

                <!-- Right Actions -->
                <div class="flex items-center gap-4">
                    <button onclick="document.getElementById('nav-search-bar').classList.toggle('hidden'); document.getElementById('nav-search-input').focus();" class="hover:text-accent transition text-lg" title="Tìm kiếm"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <button onclick="document.getElementById('nav-fav-modal').classList.remove('translate-x-full'); document.getElementById('nav-fav-overlay').classList.remove('hidden');" class="hover:text-accent transition text-lg" title="Yêu thích"><i class="fa-solid fa-heart"></i></button>
                    <a href="#/login" class="flex items-center gap-2 hover:bg-primary-hover transition bg-primary-hover/50 px-4 py-2 rounded-full border border-white/20 ml-2">
                        <i class="fa-solid fa-user"></i>
                        <span class="hidden sm:inline font-semibold">Đăng nhập</span>
                    </a>
                </div>
            </div>

            <!-- Thanh tìm kiếm (Ẩn mặc định, xổ xuống khi bấm kính lúp) -->
            <div id="nav-search-bar" class="hidden absolute top-full left-0 w-full bg-white shadow-md py-4 border-t border-gray-100 z-40">
                <div class="container mx-auto px-4 lg:px-8">
                    <div class="relative max-w-2xl mx-auto">
                        <input id="nav-search-input" type="text" placeholder="Tìm kiếm món ăn, nguyên liệu, tác giả..." class="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-full text-text-main focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner font-medium">
                        <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                        <button onclick="document.getElementById('nav-search-bar').classList.add('hidden')" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition">
                            <i class="fa-solid fa-times text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Sidebar Món Yêu Thích (Trượt từ phải sang như giỏ hàng) -->
        <div id="nav-fav-modal" class="fixed inset-y-0 right-0 w-[85vw] sm:w-96 bg-white shadow-2xl z-[60] transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-100">
            <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
                <h3 class="text-xl font-bold flex items-center gap-2"><i class="fa-solid fa-heart text-accent"></i> Món yêu thích</h3>
                <button onclick="document.getElementById('nav-fav-modal').classList.add('translate-x-full'); document.getElementById('nav-fav-overlay').classList.add('hidden');" class="hover:bg-black/20 transition text-2xl w-8 h-8 flex items-center justify-center rounded-full">&times;</button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
                <!-- Nội dung trống khi chưa có món yêu thích -->
                <div class="flex flex-col items-center justify-center h-full text-gray-400 mt-20">
                    <div class="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                        <i class="fa-regular fa-heart text-5xl text-gray-300"></i>
                    </div>
                    <p class="font-medium text-gray-500">Bạn chưa lưu món ăn nào</p>
                    <a href="#/danh-sach" onclick="document.getElementById('nav-fav-modal').classList.add('translate-x-full'); document.getElementById('nav-fav-overlay').classList.add('hidden');" class="mt-4 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow hover:bg-primary-hover hover:-translate-y-0.5 transition-all">Khám phá menu</a>
                </div>
            </div>
            
            <!-- Nút hành động cuối sidebar -->
            <div class="p-4 border-t border-gray-200 bg-white">
                <button class="w-full py-3 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed">Xóa tất cả</button>
            </div>
        </div>
    `;
}

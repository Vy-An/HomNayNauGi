export default function Navbar() {
    return `
        <header class="bg-primary text-white sticky top-0 z-50 shadow-md">
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
                    <button class="hover:text-accent transition text-lg" title="Tìm kiếm"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <button class="hover:text-accent transition text-lg" title="Yêu thích"><i class="fa-solid fa-heart"></i></button>
                    <a href="#/login" class="flex items-center gap-2 hover:bg-primary-hover transition bg-primary-hover/50 px-4 py-2 rounded-full border border-white/20 ml-2">
                        <i class="fa-solid fa-user"></i>
                        <span class="hidden sm:inline font-semibold">Đăng nhập</span>
                    </a>
                </div>
            </div>
        </header>
    `;
}

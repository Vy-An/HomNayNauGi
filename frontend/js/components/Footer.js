export default function Footer() {
    return `
        <footer class="bg-[#143E2C] text-white py-12 mt-auto border-t border-white/10">
            <div class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                
                <!-- Cột 1: Logo & Giới thiệu -->
                <div class="space-y-3.5">
                    <a href="#/" class="inline-flex items-center gap-2 text-xl font-extrabold tracking-wide hover:opacity-90 transition">
                        <i class="fa-solid fa-kitchen-set text-accent text-2xl"></i>
                        <span>Hôm Nay Ăn Gì?</span>
                    </a>
                    <p class="text-white/75 text-xs sm:text-sm leading-relaxed font-normal">
                        Nền tảng gợi ý thực đơn gia đình thông minh, chia sẻ công thức và kết nối cộng đồng yêu ẩm thực ấm cúng.
                    </p>
                    <div class="pt-1 text-xs text-white/60">
                        <span>🥢 Bếp nhà ấm áp • Bữa cơm đủ đầy</span>
                    </div>
                </div>

                <!-- Cột 2: Liên kết nhanh -->
                <div class="space-y-3">
                    <h4 class="text-sm font-extrabold uppercase tracking-wider text-accent-light">
                        Liên kết nhanh
                    </h4>
                    <ul class="space-y-2 text-xs sm:text-sm text-white/80 font-medium">
                        <li><a href="#/" class="hover:text-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px] text-accent"></i> Trang chủ</a></li>
                        <li><a href="#/danh-sach" class="hover:text-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px] text-accent"></i> Danh sách món ăn</a></li>
                        <li><a href="#/" class="hover:text-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px] text-accent"></i> Random món ăn</a></li>
                        <li><a href="#/cong-dong" class="hover:text-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px] text-accent"></i> Cộng đồng bếp</a></li>
                        <li><a href="#/" class="hover:text-accent transition-colors flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px] text-accent"></i> Về chúng tôi</a></li>
                    </ul>
                </div>

                <!-- Cột 3: Kết nối với chúng tôi -->
                <div class="space-y-3">
                    <h4 class="text-sm font-extrabold uppercase tracking-wider text-accent-light">
                        Kết nối với chúng tôi
                    </h4>
                    <p class="text-xs text-white/75">Theo dõi kênh ẩm thực để đón nhận video hướng dẫn nấu ăn mới nhất:</p>
                    <div class="flex items-center gap-2.5 pt-1">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all text-sm hover:scale-110" title="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all text-sm hover:scale-110" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all text-sm hover:scale-110" title="YouTube"><i class="fa-brands fa-youtube"></i></a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all text-sm hover:scale-110" title="TikTok"><i class="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>

                <!-- Cột 4: Đăng ký nhận công thức mới -->
                <div class="space-y-3">
                    <h4 class="text-sm font-extrabold uppercase tracking-wider text-accent-light">
                        Đăng ký nhận công thức
                    </h4>
                    <p class="text-xs text-white/75">Nhận gợi ý mâm cơm ngon và bí quyết nấu ăn hàng tuần qua email:</p>
                    <form onsubmit="event.preventDefault(); alert('Cảm ơn bạn đã đăng ký nhận công thức mới!');" class="space-y-2 pt-1">
                        <input 
                            type="email" 
                            required 
                            placeholder="Nhập email của bạn..." 
                            class="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 transition-all"
                        />
                        <button 
                            type="submit" 
                            class="w-full py-2.5 bg-accent hover:bg-accent-hover text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>

            </div>

            <!-- Bottom Sub-Footer -->
            <div class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
                <p>&copy; 2026 Hôm Nay Ăn Gì? All rights reserved.</p>
                <div class="flex items-center gap-4">
                    <a href="#" class="hover:text-white transition-colors">Điều khoản sử dụng</a>
                    <span>•</span>
                    <a href="#" class="hover:text-white transition-colors">Chính sách bảo mật</a>
                    <span>•</span>
                    <a href="#" class="hover:text-white transition-colors">Liên hệ</a>
                </div>
            </div>
        </footer>
    `;
}

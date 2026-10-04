export default function Footer() {
    return `
        <footer class="bg-primary hover text-white py-10 mt-auto">
            <div class="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Hôm Nay Ăn Gì?</h3>
                    <p class="text-white/80">Ứng dụng gợi ý mâm cơm gia đình, giúp bạn tiết kiệm thời gian suy nghĩ món ăn mỗi ngày.</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4">Liên kết nhanh</h3>
                    <ul class="space-y-2 text-white/80">
                        <li><a href="#/" class="hover:text-accent transition">Trang chủ</a></li>
                        <li><a href="#/danh-sach" class="hover:text-accent transition">Danh sách món ăn</a></li>
                        <li><a href="#/cong-dong" class="hover:text-accent transition">Cộng đồng</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4">Kết nối với chúng tôi</h3>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition text-xl"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition text-xl"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition text-xl"><i class="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
            <div class="container mx-auto px-4 lg:px-8 mt-8 pt-8 border-t border-white/20 text-center text-white/60">
                <p>&copy; 2026 Hôm Nay Ăn Gì. All rights reserved.</p>
            </div>
        </footer>
    `;
}

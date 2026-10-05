const Login = {
    render: async () => {
        return `
            <div class="min-h-[80vh] flex items-center justify-center bg-primary-light/5 py-12 px-4">
                <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div class="text-center mb-8">
                        <span class="text-5xl mb-4 block"><i class="fa-solid fa-kitchen-set"></i></span>
                        <h2 class="text-3xl font-extrabold text-text-main mb-2">Chào mừng trở lại!</h2>
                        <p class="text-text-muted">Vui lòng đăng nhập để lưu món ăn và tham gia cộng đồng.</p>
                    </div>

                    <form class="space-y-5">
                        <div>
                            <label class="block text-sm font-bold text-text-main mb-2">Email</label>
                            <input type="email" placeholder="Nhập email của bạn" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-gray-50 focus:bg-white">
                        </div>
                        <div>
                            <label class="block text-sm font-bold text-text-main mb-2">Mật khẩu</label>
                            <input type="password" placeholder="Nhập mật khẩu" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-gray-50 focus:bg-white">
                        </div>
                        
                        <div class="flex items-center justify-between text-sm">
                            <label class="flex items-center gap-2 cursor-pointer text-text-muted">
                                <input type="checkbox" class="rounded text-primary"> Ghi nhớ đăng nhập
                            </label>
                            <a href="#" class="font-bold text-primary hover:text-primary-hover transition">Quên mật khẩu?</a>
                        </div>

                        <button type="button" onclick="window.location.hash='#/'" class="w-full py-4 mt-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition shadow-md shadow-primary/30">
                            Đăng Nhập
                        </button>
                    </form>

                    <div class="mt-8 text-center text-text-muted text-sm border-t border-gray-100 pt-6">
                        Chưa có tài khoản? <a href="#" class="font-bold text-primary hover:text-primary-hover transition">Đăng ký ngay</a>
                    </div>
                </div>
            </div>
        `;
    }
};

export default Login;

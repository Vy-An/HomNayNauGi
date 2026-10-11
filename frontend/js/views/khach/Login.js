// Login & Register View (Static UI with Rich Cozy Kitchen Theme)

const Login = {
    render: async () => {
        return `
        <div class="cozy-kitchen-bg min-h-screen flex flex-col justify-between relative overflow-hidden text-text-main font-sans selection:bg-primary/20 selection:text-primary">
            
            <!-- Background Decorative Lighting & Ambience -->
            <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#E9D8B7]/40 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute top-1/3 -right-32 w-96 h-96 bg-[#2F6B4F]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 left-1/4 w-[500px] h-[500px] bg-[#FFF5E6]/60 rounded-full blur-3xl pointer-events-none"></div>

            <!-- Top Header / Navigation Bar inside Login Screen -->
            <header class="relative z-20 w-full px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
                <a href="#/" class="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]">
                    <div class="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20 group-hover:bg-primary-hover transition-colors">
                        <i class="fa-solid fa-kitchen-set text-lg text-accent-light"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-lg sm:text-xl font-extrabold tracking-tight text-primary flex items-center gap-1.5">
                            Hôm Nay Ăn Gì
                            <span class="w-2 h-2 rounded-full bg-accent inline-block"></span>
                        </span>
                        <span class="text-[10px] font-semibold text-text-muted tracking-wider uppercase">Gợi ý món ngon gia đình</span>
                    </div>
                </a>

                <div class="flex items-center gap-3">
                    <a href="#/" class="inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-white/80 hover:bg-white text-xs sm:text-sm font-bold text-text-main hover:text-primary border border-beige-border shadow-sm hover:shadow transition-all">
                        <i class="fa-solid fa-arrow-left text-xs"></i>
                        <span>Về trang chủ</span>
                    </a>
                </div>
            </header>

            <!-- Main Content Area: 2-Column Split (1440x900 & 1366x768 Optimized) -->
            <main class="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-2 lg:py-4 flex items-center">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full my-auto">
                    
                    <!-- ============================================== -->
                    <!-- LEFT COLUMN: BRAND HERO & COZY KITCHEN STORY -->
                    <!-- ============================================== -->
                    <div class="lg:col-span-7 flex flex-col justify-center space-y-4 lg:space-y-5 lg:pr-2">
                        
                        <!-- Mini Badge -->
                        <div class="inline-flex items-center gap-2 self-start bg-primary-subtle border border-primary-light/30 px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                            <span class="animate-pulse">✨</span>
                            <span>Trợ lý ẩm thực & công thức ngẫu nhiên</span>
                        </div>

                        <!-- Big Organic Headline -->
                        <div class="space-y-1 sm:space-y-2">
                            <h1 class="text-3xl sm:text-4xl lg:text-[46px] font-black leading-[1.15] tracking-tight text-text-main">
                                Khám phá <br class="hidden sm:inline"/>
                                <span class="text-primary relative inline-block font-caveat text-4xl sm:text-5xl lg:text-[58px] font-bold">
                                    món ngon mỗi ngày
                                    <svg class="absolute -bottom-1.5 left-0 w-full h-2.5 text-accent" viewBox="0 0 250 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 9C60 3 190 2 247 9" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                                    </svg>
                                </span>
                            </h1>
                            <p class="text-text-muted text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-medium pt-1">
                                Để chúng tôi lo thử thách, bạn chỉ cần chọn nguyên liệu, ngân sách và số lượng món, hệ thống sẽ gợi ý cho bạn những công thức dễ nấu, ngon miệng và phù hợp nhất!
                            </p>
                        </div>

                        <!-- 4 Core Feature Cards (2x2 Grid) -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-xl pt-1">
                            
                            <!-- Feature 1: Random món ăn -->
                            <div class="bg-white/85 hover:bg-white p-3 rounded-2xl border border-beige-border/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-2.5 group">
                                <div class="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                                    🎲
                                </div>
                                <div>
                                    <h4 class="font-bold text-xs sm:text-sm text-text-main">Random món ăn</h4>
                                    <p class="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-tight">Gợi ý tức thì theo sở thích & nguyên liệu</p>
                                </div>
                            </div>

                            <!-- Feature 2: Dễ nấu tại nhà -->
                            <div class="bg-white/85 hover:bg-white p-3 rounded-2xl border border-beige-border/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-2.5 group">
                                <div class="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                                    🌿
                                </div>
                                <div>
                                    <h4 class="font-bold text-xs sm:text-sm text-text-main">Dễ nấu tại nhà</h4>
                                    <p class="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-tight">Công thức chuẩn chỉnh, chi tiết từng bước</p>
                                </div>
                            </div>

                            <!-- Feature 3: Nguyên liệu dễ tìm -->
                            <div class="bg-white/85 hover:bg-white p-3 rounded-2xl border border-beige-border/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-2.5 group">
                                <div class="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                                    ♡
                                </div>
                                <div>
                                    <h4 class="font-bold text-xs sm:text-sm text-text-main">Nguyên liệu dễ tìm</h4>
                                    <p class="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-tight">Tối ưu chi phí, thực phẩm quen thuộc</p>
                                </div>
                            </div>

                            <!-- Feature 4: Đa dạng ẩm thực -->
                            <div class="bg-white/85 hover:bg-white p-3 rounded-2xl border border-beige-border/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-2.5 group">
                                <div class="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                                    ☺
                                </div>
                                <div>
                                    <h4 class="font-bold text-xs sm:text-sm text-text-main">Đa dạng ẩm thực</h4>
                                    <p class="text-[11px] sm:text-xs text-text-muted mt-0.5 leading-tight">Hàng trăm món ngon 3 miền phong phú</p>
                                </div>
                            </div>

                        </div>

                        <!-- Cozy Kitchen Scene Illustration & Vignette -->
                        <div class="relative max-w-xl bg-gradient-to-r from-cream-soft via-white to-cream-warm/80 rounded-2xl p-3.5 sm:p-4 border border-beige-border/90 shadow-sm overflow-hidden">
                            <!-- Floating Decorative Steam Spirals & Notes -->
                            <div class="absolute top-1.5 right-12 text-accent font-handwriting text-xs font-bold animate-float-gentle">
                                ♨️ Đang nấu thơm lừng...
                            </div>

                            <div class="flex items-center gap-3">
                                <!-- Illustrated Chef / Kitchen Cooking Icon Container -->
                                <div class="relative w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                                    <svg class="w-8 h-8 text-primary" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 10C24 6 28 6 28 2" stroke="#E59F3F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-steam"/>
                                        <path d="M32 12C32 8 36 8 36 4" stroke="#245B43" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-steam" style="animation-delay: 0.5s;"/>
                                        <path d="M18 22C18 20 24 16 32 16C40 16 46 20 46 22H18Z" fill="#3D7A59"/>
                                        <circle cx="32" cy="14" r="3" fill="#E59F3F"/>
                                        <path d="M14 24H50L46 48C46 51 43 54 39 54H25C21 54 18 51 18 48L14 24Z" fill="#245B43"/>
                                        <path d="M14 28C10 28 8 32 8 34C8 36 10 40 14 40" stroke="#B9824B" stroke-width="3" stroke-linecap="round"/>
                                        <path d="M50 28C54 28 56 32 56 34C56 36 54 40 50 40" stroke="#B9824B" stroke-width="3" stroke-linecap="round"/>
                                        <rect x="12" y="56" width="40" height="4" rx="2" fill="#B9824B"/>
                                    </svg>
                                    <span class="absolute -bottom-1 -right-1 text-xs">🐱</span>
                                </div>

                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2">
                                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-accent-hover bg-accent-subtle px-1.5 py-0.5 rounded border border-accent-light/40">Gợi ý trong ngày</span>
                                        <span class="text-[11px] text-text-muted font-medium">• Hơn 500+ công thức</span>
                                    </div>
                                    <h4 class="font-extrabold text-xs sm:text-sm text-text-main mt-0.5 truncate">Cơm nhà chuẩn vị, nấu siêu nhanh</h4>
                                    <p class="text-[11px] text-text-muted font-medium line-clamp-1">
                                        Đăng nhập để lưu lại các mâm cơm yêu thích và tạo thực đơn tuần riêng của bạn!
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <!-- ============================================== -->
                    <!-- RIGHT COLUMN: LOGIN / REGISTER CARD          -->
                    <!-- ============================================== -->
                    <div class="lg:col-span-5 flex justify-center lg:justify-end w-full">
                        <div class="w-full max-w-[440px] bg-[#FCFAF6] rounded-[28px] p-5 sm:p-7 shadow-cozy-card border border-[#EBE4D5] relative backdrop-blur-sm">
                            
                            <!-- Cozy Card Decoration Accent -->
                            <div class="absolute top-0 right-8 -translate-y-1/2 bg-accent text-white font-handwriting text-xs font-bold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-white">
                                <span>🍽️ Bắt đầu ngay</span>
                            </div>

                            <!-- TAB SWITCHER: ĐĂNG NHẬP / ĐĂNG KÝ -->
                            <div class="bg-[#EFE9DC] p-1 rounded-full flex items-center justify-between mb-3.5 sm:mb-4 shadow-inner">
                                <button type="button" id="tab-login" class="flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 bg-primary text-white shadow-cozy-pill flex items-center justify-center gap-1.5 cursor-pointer">
                                    <i class="fa-solid fa-arrow-right-to-bracket text-xs"></i>
                                    <span>Đăng nhập</span>
                                </button>
                                <button type="button" id="tab-register" class="flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 text-text-muted hover:text-text-main flex items-center justify-center gap-1.5 cursor-pointer">
                                    <i class="fa-solid fa-user-plus text-xs"></i>
                                    <span>Đăng ký</span>
                                </button>
                            </div>

                            <!-- CARD HEADER -->
                            <div class="mb-3.5 sm:mb-4">
                                <h2 id="card-heading" class="text-xl sm:text-2xl font-extrabold text-text-main tracking-tight leading-snug">
                                    Chào mừng bạn trở lại!
                                </h2>
                                <p id="card-subtitle" class="text-xs sm:text-sm text-text-muted font-medium mt-0.5">
                                    Cùng khám phá thêm nhiều món ngon nhé!
                                </p>
                            </div>

                            <!-- ===================================== -->
                            <!-- LOGIN FORM                            -->
                            <!-- ===================================== -->
                            <form id="login-form" class="space-y-3" novalidate>
                                <!-- Field: Email hoặc Username -->
                                <div>
                                    <label class="block text-[11px] font-bold text-text-main mb-1 uppercase tracking-wide">
                                        Email hoặc tên đăng nhập
                                    </label>
                                    <div class="relative flex items-center">
                                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A91]">
                                            <i class="fa-regular fa-envelope text-sm"></i>
                                        </div>
                                        <input 
                                            type="text" 
                                            id="login-account" 
                                            name="account"
                                            placeholder="Nhập email hoặc tên tài khoản" 
                                            class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DFD5BE] bg-white/90 focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                        />
                                    </div>
                                    <p id="error-login-account" class="text-red-600 text-[11px] font-semibold mt-0.5 hidden"></p>
                                </div>

                                <!-- Field: Mật khẩu -->
                                <div>
                                    <label class="block text-[11px] font-bold text-text-main mb-1 uppercase tracking-wide">
                                        Mật khẩu
                                    </label>
                                    <div class="relative flex items-center">
                                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A91]">
                                            <i class="fa-solid fa-lock text-sm"></i>
                                        </div>
                                        <input 
                                            type="password" 
                                            id="login-password" 
                                            name="password"
                                            placeholder="Nhập mật khẩu của bạn" 
                                            class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#DFD5BE] bg-white/90 focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                        />
                                        <button 
                                            type="button" 
                                            id="toggle-login-password" 
                                            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C9A91] hover:text-text-main transition-colors cursor-pointer"
                                            aria-label="Hiện hoặc ẩn mật khẩu"
                                        >
                                            <i class="fa-regular fa-eye text-sm"></i>
                                        </button>
                                    </div>
                                    <p id="error-login-password" class="text-red-600 text-[11px] font-semibold mt-0.5 hidden"></p>
                                </div>

                                <!-- Remember me & Forgot Password -->
                                <div class="flex items-center justify-between text-xs pt-0.5">
                                    <label class="inline-flex items-center gap-1.5 cursor-pointer text-text-muted font-medium select-none hover:text-text-main">
                                        <input 
                                            type="checkbox" 
                                            id="login-remember" 
                                            name="remember"
                                            class="w-3.5 h-3.5 rounded text-primary focus:ring-primary/30 border-[#DFD5BE] accent-primary cursor-pointer" 
                                            checked
                                        />
                                        <span>Ghi nhớ đăng nhập</span>
                                    </label>
                                    <button 
                                        type="button" 
                                        id="btn-forgot-password" 
                                        class="font-bold text-primary hover:text-primary-hover hover:underline transition-colors"
                                    >
                                        Quên mật khẩu?
                                    </button>
                                </div>

                                <!-- Submit Button -->
                                <button 
                                    type="submit" 
                                    id="btn-login-submit" 
                                    class="w-full py-2.5 sm:py-3 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-sm sm:text-base rounded-full shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer mt-1"
                                >
                                    <span>Đăng nhập</span>
                                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </form>

                            <!-- ===================================== -->
                            <!-- REGISTER FORM (Compact & Optimized)    -->
                            <!-- ===================================== -->
                            <form id="register-form" class="space-y-2.5 hidden" novalidate>
                                <!-- Field: Họ và tên -->
                                <div>
                                    <label class="block text-[11px] font-bold text-text-main mb-0.5 uppercase tracking-wide">
                                        Họ và tên
                                    </label>
                                    <div class="relative flex items-center">
                                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A91]">
                                            <i class="fa-regular fa-user text-sm"></i>
                                        </div>
                                        <input 
                                            type="text" 
                                            id="reg-fullname" 
                                            name="fullname"
                                            placeholder="Ví dụ: Nguyễn Văn A" 
                                            class="w-full pl-10 pr-3.5 py-2 sm:py-2.5 rounded-xl border border-[#DFD5BE] bg-white/90 focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                        />
                                    </div>
                                    <p id="error-reg-fullname" class="text-red-600 text-[11px] font-semibold mt-0.5 hidden"></p>
                                </div>

                                <!-- Field: Email -->
                                <div>
                                    <label class="block text-[11px] font-bold text-text-main mb-0.5 uppercase tracking-wide">
                                        Email
                                    </label>
                                    <div class="relative flex items-center">
                                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A91]">
                                            <i class="fa-regular fa-envelope text-sm"></i>
                                        </div>
                                        <input 
                                            type="email" 
                                            id="reg-email" 
                                            name="email"
                                            placeholder="name@example.com" 
                                            class="w-full pl-10 pr-3.5 py-2 sm:py-2.5 rounded-xl border border-[#DFD5BE] bg-white/90 focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                        />
                                    </div>
                                    <p id="error-reg-email" class="text-red-600 text-[11px] font-semibold mt-0.5 hidden"></p>
                                </div>

                                <!-- Field: Mật khẩu -->
                                <div>
                                    <label class="block text-[11px] font-bold text-text-main mb-0.5 uppercase tracking-wide">
                                        Mật khẩu
                                    </label>
                                    <div class="relative flex items-center">
                                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A91]">
                                            <i class="fa-solid fa-lock text-sm"></i>
                                        </div>
                                        <input 
                                            type="password" 
                                            id="reg-password" 
                                            name="password"
                                            placeholder="Tối thiểu 6 ký tự" 
                                            class="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-xl border border-[#DFD5BE] bg-white/90 focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                        />
                                        <button 
                                            type="button" 
                                            id="toggle-reg-password" 
                                            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C9A91] hover:text-text-main transition-colors cursor-pointer"
                                            aria-label="Hiện hoặc ẩn mật khẩu"
                                        >
                                            <i class="fa-regular fa-eye text-sm"></i>
                                        </button>
                                    </div>
                                    <p id="error-reg-password" class="text-red-600 text-[11px] font-semibold mt-0.5 hidden"></p>
                                </div>

                                <!-- Field: Xác nhận mật khẩu -->
                                <div>
                                    <label class="block text-[11px] font-bold text-text-main mb-0.5 uppercase tracking-wide">
                                        Xác nhận mật khẩu
                                    </label>
                                    <div class="relative flex items-center">
                                        <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8C9A91]">
                                            <i class="fa-solid fa-shield-halved text-sm"></i>
                                        </div>
                                        <input 
                                            type="password" 
                                            id="reg-confirm-password" 
                                            name="confirmPassword"
                                            placeholder="Nhập lại mật khẩu" 
                                            class="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-xl border border-[#DFD5BE] bg-white/90 focus:bg-white text-text-main placeholder:text-gray-400 font-medium text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                                        />
                                        <button 
                                            type="button" 
                                            id="toggle-reg-confirm-password" 
                                            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8C9A91] hover:text-text-main transition-colors cursor-pointer"
                                            aria-label="Hiện hoặc ẩn xác nhận mật khẩu"
                                        >
                                            <i class="fa-regular fa-eye text-sm"></i>
                                        </button>
                                    </div>
                                    <p id="error-reg-confirm-password" class="text-red-600 text-[11px] font-semibold mt-0.5 hidden"></p>
                                </div>

                                <!-- Terms & Conditions Checkbox -->
                                <div class="pt-0.5">
                                    <label class="inline-flex items-start gap-1.5 cursor-pointer text-[11px] text-text-muted font-medium select-none hover:text-text-main leading-tight">
                                        <input 
                                            type="checkbox" 
                                            id="reg-terms" 
                                            name="terms"
                                            class="w-3.5 h-3.5 mt-0.5 rounded text-primary focus:ring-primary/30 border-[#DFD5BE] accent-primary cursor-pointer flex-shrink-0" 
                                            checked
                                        />
                                        <span>Tôi đồng ý với <a href="#" class="text-primary font-bold hover:underline">Điều khoản</a> và <a href="#" class="text-primary font-bold hover:underline">Chính sách bảo mật</a></span>
                                    </label>
                                    <p id="error-reg-terms" class="text-red-600 text-[11px] font-semibold mt-0.5 hidden"></p>
                                </div>

                                <!-- Register Submit Button -->
                                <button 
                                    type="submit" 
                                    id="btn-register-submit" 
                                    class="w-full py-2.5 sm:py-3 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-sm sm:text-base rounded-full shadow-md shadow-primary/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer mt-1"
                                >
                                    <span>Đăng ký tài khoản</span>
                                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </form>

                            <!-- SOCIAL LOGIN SECTION -->
                            <div class="mt-3.5 sm:mt-4">
                                <!-- Divider: "Hoặc" -->
                                <div class="relative flex items-center justify-center my-2.5">
                                    <div class="border-t border-[#E2D7C3] w-full"></div>
                                    <span class="bg-[#FCFAF6] px-3 text-[10px] font-bold text-[#8C9A91] uppercase tracking-wider">
                                        Hoặc
                                    </span>
                                    <div class="border-t border-[#E2D7C3] w-full"></div>
                                </div>

                                <!-- Social Buttons (Same Row) -->
                                <div class="grid grid-cols-2 gap-2.5 mt-2">
                                    <!-- Google Login -->
                                    <button 
                                        type="button" 
                                        id="btn-social-google" 
                                        class="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white hover:bg-gray-50 border border-[#DFD5BE] text-text-main font-bold text-xs shadow-sm hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
                                    >
                                        <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                                        </svg>
                                        <span>Google</span>
                                    </button>

                                    <!-- Apple Login -->
                                    <button 
                                        type="button" 
                                        id="btn-social-apple" 
                                        class="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white hover:bg-gray-50 border border-[#DFD5BE] text-text-main font-bold text-xs shadow-sm hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
                                    >
                                        <svg class="w-3.5 h-3.5 flex-shrink-0 fill-current text-black" viewBox="0 0 170 170">
                                            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.56-7.7-11.6-13.98-5.99-9.35-10.74-19.82-14.25-31.41-3.51-11.59-5.27-22.61-5.27-33.06 0-14.45 3.67-26.33 11.01-35.65 7.34-9.32 16.5-14.07 27.48-14.26 4.35 0 9.17 1.15 14.45 3.46 5.28 2.31 8.91 3.49 10.89 3.54 1.58 0 5.42-1.28 11.52-3.83 6.1-2.56 11.39-3.69 15.86-3.4 11.75.55 21.05 4.79 27.9 12.73-10.23 6.18-15.24 14.86-15.02 26.04.22 8.71 3.48 16.03 9.77 21.95 6.3 5.92 13.8 9.38 22.5 10.37-2.39 7.07-5.32 14.34-8.77 21.79zm-29.41-116.7c0 6.64-2.45 12.87-7.34 18.7-5.88 6.97-13.12 11.02-21.73 12.13-.22-1.19-.33-2.33-.33-3.41 0-6.42 2.63-12.72 7.89-18.9 2.63-3.15 5.92-5.74 9.87-7.77 3.95-2.03 7.83-3.15 11.64-3.35 0 .87 0 1.74 0 2.6z"/>
                                        </svg>
                                        <span>Apple</span>
                                    </button>
                                </div>
                            </div>

                            <!-- CARD FOOTER TOGGLE LINK -->
                            <div class="mt-3.5 sm:mt-4 text-center text-xs text-text-muted font-medium border-t border-[#EBE4D5] pt-3">
                                <span id="footer-text-question">Chưa có tài khoản?</span>
                                <button 
                                    type="button" 
                                    id="btn-toggle-mode" 
                                    class="font-bold text-primary hover:text-primary-hover hover:underline transition-colors ml-1 cursor-pointer"
                                >
                                    Đăng ký ngay
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

            <!-- Bottom Minimal Footer for Cozy Feel -->
            <footer class="relative z-20 w-full px-6 lg:px-12 py-4 text-center text-xs text-text-muted font-medium flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-beige-border/50 bg-cream/40 backdrop-blur-sm">
                <p>© 2026 Hôm Nay Ăn Gì? • Tự tay chuẩn bị bữa cơm ấm cúng</p>
                <div class="flex items-center gap-4 text-text-muted">
                    <a href="#/danh-sach" class="hover:text-primary transition-colors">Danh sách món ăn</a>
                    <span>•</span>
                    <a href="#/cong-dong" class="hover:text-primary transition-colors">Cộng đồng</a>
                    <span>•</span>
                    <span class="text-primary font-bold">Phiên bản Demo</span>
                </div>
            </footer>

            <!-- FLOATING TOAST NOTIFICATION CONTAINER -->
            <div id="toast-container" class="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"></div>

        </div>
        `;
    },

    afterRender: async () => {
        // State
        let currentMode = 'login'; // 'login' | 'register'

        // Elements
        const tabLogin = document.getElementById('tab-login');
        const tabRegister = document.getElementById('tab-register');
        const cardHeading = document.getElementById('card-heading');
        const cardSubtitle = document.getElementById('card-subtitle');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const footerTextQuestion = document.getElementById('footer-text-question');
        const btnToggleMode = document.getElementById('btn-toggle-mode');

        // Password Toggles
        const toggleLoginPass = document.getElementById('toggle-login-password');
        const loginPassInput = document.getElementById('login-password');
        const toggleRegPass = document.getElementById('toggle-reg-password');
        const regPassInput = document.getElementById('reg-password');
        const toggleRegConfirmPass = document.getElementById('toggle-reg-confirm-password');
        const regConfirmPassInput = document.getElementById('reg-confirm-password');

        // Social Buttons
        const btnGoogle = document.getElementById('btn-social-google');
        const btnApple = document.getElementById('btn-social-apple');
        const btnForgotPassword = document.getElementById('btn-forgot-password');

        // Toast Helper
        const showToast = (message, type = 'success') => {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `pointer-events-auto transform translate-y-[-10px] opacity-0 transition-all duration-300 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-bold ${
                type === 'success' 
                    ? 'bg-primary text-white border-primary-light/40 shadow-primary/20' 
                    : type === 'info'
                    ? 'bg-[#26382F] text-white border-beige-border shadow-black/10'
                    : 'bg-red-600 text-white border-red-500 shadow-red-600/20'
            }`;

            const icon = type === 'success' 
                ? '<i class="fa-solid fa-circle-check text-accent-light text-base"></i>' 
                : type === 'info'
                ? '<i class="fa-solid fa-circle-info text-accent text-base"></i>'
                : '<i class="fa-solid fa-circle-exclamation text-yellow-300 text-base"></i>';

            toast.innerHTML = `
                ${icon}
                <span>${message}</span>
            `;

            container.appendChild(toast);

            // Trigger animation in
            requestAnimationFrame(() => {
                toast.classList.remove('translate-y-[-10px]', 'opacity-0');
                toast.classList.add('translate-y-0', 'opacity-100');
            });

            // Remove after 3.5 seconds
            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-[-10px]', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 3500);
        };

        // Switch Mode Function (Smooth transition between Login and Register)
        const switchMode = (mode) => {
            currentMode = mode;

            if (mode === 'login') {
                // Tab active styles
                tabLogin.className = "flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all duration-300 bg-primary text-white shadow-cozy-pill flex items-center justify-center gap-2 cursor-pointer";
                tabRegister.className = "flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 text-text-muted hover:text-text-main flex items-center justify-center gap-2 cursor-pointer";
                
                // Headings
                cardHeading.textContent = "Chào mừng bạn trở lại!";
                cardSubtitle.textContent = "Cùng khám phá thêm nhiều món ngon nhé!";
                
                // Forms
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');

                // Footer Toggle
                footerTextQuestion.textContent = "Chưa có tài khoản?";
                btnToggleMode.textContent = "Đăng ký ngay";
            } else {
                // Tab active styles
                tabRegister.className = "flex-1 py-2.5 px-4 rounded-full text-sm font-bold transition-all duration-300 bg-primary text-white shadow-cozy-pill flex items-center justify-center gap-2 cursor-pointer";
                tabLogin.className = "flex-1 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 text-text-muted hover:text-text-main flex items-center justify-center gap-2 cursor-pointer";
                
                // Headings
                cardHeading.textContent = "Tạo tài khoản mới";
                cardSubtitle.textContent = "Bắt đầu hành trình nấu ăn dễ dàng ngay hôm nay!";
                
                // Forms
                registerForm.classList.remove('hidden');
                loginForm.classList.add('hidden');

                // Footer Toggle
                footerTextQuestion.textContent = "Đã có tài khoản?";
                btnToggleMode.textContent = "Đăng nhập ngay";
            }

            // Clear errors
            document.querySelectorAll('[id^="error-"]').forEach(el => {
                el.textContent = '';
                el.classList.add('hidden');
            });
        };

        // Event Listeners for Tabs & Footer Toggle
        if (tabLogin) tabLogin.addEventListener('click', () => switchMode('login'));
        if (tabRegister) tabRegister.addEventListener('click', () => switchMode('register'));
        if (btnToggleMode) {
            btnToggleMode.addEventListener('click', () => {
                switchMode(currentMode === 'login' ? 'register' : 'login');
            });
        }

        // Show/Hide Password Toggle helper
        const setupPasswordToggle = (toggleBtn, inputEl) => {
            if (!toggleBtn || !inputEl) return;
            toggleBtn.addEventListener('click', () => {
                const isPassword = inputEl.type === 'password';
                inputEl.type = isPassword ? 'text' : 'password';
                toggleBtn.innerHTML = isPassword 
                    ? '<i class="fa-regular fa-eye-slash"></i>' 
                    : '<i class="fa-regular fa-eye"></i>';
            });
        };

        setupPasswordToggle(toggleLoginPass, loginPassInput);
        setupPasswordToggle(toggleRegPass, regPassInput);
        setupPasswordToggle(toggleRegConfirmPass, regConfirmPassInput);

        // Helper to display input error
        const showError = (errorId, message) => {
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.classList.remove('hidden');
            }
        };

        const clearError = (errorId) => {
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.add('hidden');
            }
        };

        // Form Validation & Submit Handlers (Pure Client-side Demo)
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                const accountInput = document.getElementById('login-account');
                const passwordInput = document.getElementById('login-password');
                const accountVal = accountInput?.value.trim() || '';
                const passwordVal = passwordInput?.value || '';

                clearError('error-login-account');
                clearError('error-login-password');

                if (!accountVal) {
                    showError('error-login-account', 'Vui lòng nhập email hoặc tên đăng nhập.');
                    isValid = false;
                }

                if (!passwordVal) {
                    showError('error-login-password', 'Vui lòng nhập mật khẩu.');
                    isValid = false;
                } else if (passwordVal.length < 6) {
                    showError('error-login-password', 'Mật khẩu phải chứa ít nhất 6 ký tự.');
                    isValid = false;
                }

                if (!isValid) return;

                // Simulate Button Loading state
                const submitBtn = document.getElementById('btn-login-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Đang xác thực...</span>';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    showToast('Đăng nhập thành công (Demo)', 'success');
                    
                    // Optional demo redirect back to home after 1.2s
                    setTimeout(() => {
                        window.location.hash = '#/';
                    }, 1200);
                }, 700);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                const nameInput = document.getElementById('reg-fullname');
                const emailInput = document.getElementById('reg-email');
                const passwordInput = document.getElementById('reg-password');
                const confirmPasswordInput = document.getElementById('reg-confirm-password');
                const termsCheckbox = document.getElementById('reg-terms');

                const nameVal = nameInput?.value.trim() || '';
                const emailVal = emailInput?.value.trim() || '';
                const passwordVal = passwordInput?.value || '';
                const confirmPasswordVal = confirmPasswordInput?.value || '';

                clearError('error-reg-fullname');
                clearError('error-reg-email');
                clearError('error-reg-password');
                clearError('error-reg-confirm-password');
                clearError('error-reg-terms');

                if (!nameVal) {
                    showError('error-reg-fullname', 'Vui lòng nhập họ và tên của bạn.');
                    isValid = false;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailVal) {
                    showError('error-reg-email', 'Vui lòng nhập địa chỉ email.');
                    isValid = false;
                } else if (!emailRegex.test(emailVal)) {
                    showError('error-reg-email', 'Email không đúng định dạng.');
                    isValid = false;
                }

                if (!passwordVal) {
                    showError('error-reg-password', 'Vui lòng nhập mật khẩu.');
                    isValid = false;
                } else if (passwordVal.length < 6) {
                    showError('error-reg-password', 'Mật khẩu phải có ít nhất 6 ký tự.');
                    isValid = false;
                }

                if (!confirmPasswordVal) {
                    showError('error-reg-confirm-password', 'Vui lòng xác nhận lại mật khẩu.');
                    isValid = false;
                } else if (passwordVal !== confirmPasswordVal) {
                    showError('error-reg-confirm-password', 'Mật khẩu xác nhận không khớp.');
                    isValid = false;
                }

                if (!termsCheckbox?.checked) {
                    showError('error-reg-terms', 'Bạn cần đồng ý với điều khoản dịch vụ.');
                    isValid = false;
                }

                if (!isValid) return;

                const submitBtn = document.getElementById('btn-register-submit');
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Đang tạo tài khoản...</span>';

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    showToast('Tạo tài khoản thành công (Demo)', 'success');
                    
                    // Switch back to login view after success
                    setTimeout(() => {
                        switchMode('login');
                        const loginAccount = document.getElementById('login-account');
                        if (loginAccount) loginAccount.value = emailVal;
                    }, 1000);
                }, 800);
            });
        }

        // Social Buttons Handlers (Pure Client-side Demo)
        if (btnGoogle) {
            btnGoogle.addEventListener('click', () => {
                showToast('Tính năng đăng nhập Google đang ở chế độ Demo.', 'info');
            });
        }

        if (btnApple) {
            btnApple.addEventListener('click', () => {
                showToast('Tính năng đăng nhập Apple đang ở chế độ Demo.', 'info');
            });
        }

        if (btnForgotPassword) {
            btnForgotPassword.addEventListener('click', () => {
                showToast('Liên kết đặt lại mật khẩu đã được gửi đến email (Demo).', 'info');
            });
        }
    }
};

export default Login;

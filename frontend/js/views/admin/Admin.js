const Admin = {
    render: async (params) => {
        const page = params || 'dashboard';
        
        let contentHTML = '';

        if (page === 'users') {
            contentHTML = `
                <header class="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h1 class="text-2xl font-bold text-text-main">Quản Lý Người Dùng</h1>
                    <div class="flex items-center gap-4">
                        <span class="text-text-muted">Xin chào, <strong>Admin</strong></span>
                        <img src="https://i.pravatar.cc/150?u=admin" class="w-10 h-10 rounded-full">
                    </div>
                </header>
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-bold text-text-main">Danh sách thành viên</h2>
                        <div class="flex gap-2">
                            <input type="text" placeholder="Tìm kiếm..." class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                            <button class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm text-sm"><i class="fa-solid fa-plus"></i> Thêm User</button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                                    <th class="p-4 font-semibold">Tên người dùng</th>
                                    <th class="p-4 font-semibold">Email</th>
                                    <th class="p-4 font-semibold">Vai trò</th>
                                    <th class="p-4 font-semibold">Trạng thái</th>
                                    <th class="p-4 font-semibold text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td class="p-4 font-medium text-text-main flex items-center gap-3">
                                        <img src="https://i.pravatar.cc/150?u=user1" class="w-8 h-8 rounded-full">
                                        Nguyễn Văn A
                                    </td>
                                    <td class="p-4 text-text-muted">nva@gmail.com</td>
                                    <td class="p-4 text-text-muted">User</td>
                                    <td class="p-4"><span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Hoạt động</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button class="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Khóa"><i class="fa-solid fa-lock"></i></button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td class="p-4 font-medium text-text-main flex items-center gap-3">
                                        <img src="https://i.pravatar.cc/150?u=user2" class="w-8 h-8 rounded-full">
                                        Trần Thị B
                                    </td>
                                    <td class="p-4 text-text-muted">ttb@gmail.com</td>
                                    <td class="p-4 text-text-muted">Admin</td>
                                    <td class="p-4"><span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Hoạt động</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button class="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Khóa"><i class="fa-solid fa-lock"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else if (page === 'foods') {
            contentHTML = `
                <header class="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h1 class="text-2xl font-bold text-text-main">Quản Lý Món Ăn</h1>
                    <div class="flex items-center gap-4">
                        <span class="text-text-muted">Xin chào, <strong>Admin</strong></span>
                        <img src="https://i.pravatar.cc/150?u=admin" class="w-10 h-10 rounded-full">
                    </div>
                </header>
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-bold text-text-main">Danh sách Món ăn</h2>
                        <button class="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm border border-green-700"><i class="fa-solid fa-plus"></i> Thêm món mới</button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                                    <th class="p-4 font-semibold">Hình ảnh</th>
                                    <th class="p-4 font-semibold">Tên món</th>
                                    <th class="p-4 font-semibold">Phân loại</th>
                                    <th class="p-4 font-semibold">Trạng thái</th>
                                    <th class="p-4 font-semibold text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td class="p-4">
                                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100" class="w-16 h-12 object-cover rounded-lg">
                                    </td>
                                    <td class="p-4 font-medium text-text-main">Thịt Kho Trứng</td>
                                    <td class="p-4 text-text-muted">Món Mặn</td>
                                    <td class="p-4"><span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Đã duyệt</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button class="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Xóa"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td class="p-4">
                                        <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100" class="w-16 h-12 object-cover rounded-lg">
                                    </td>
                                    <td class="p-4 font-medium text-text-main">Gà Xào Sả Ớt</td>
                                    <td class="p-4 text-text-muted">Món Mặn</td>
                                    <td class="p-4"><span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Chờ duyệt</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-green-500 hover:bg-green-50 p-2 rounded transition" title="Duyệt"><i class="fa-solid fa-check"></i></button>
                                        <button class="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                                        <button class="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Xóa"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else if (page === 'community') {
            contentHTML = `
                <header class="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h1 class="text-2xl font-bold text-text-main">Quản Lý Bài Viết Cộng Đồng</h1>
                    <div class="flex items-center gap-4">
                        <span class="text-text-muted">Xin chào, <strong>Admin</strong></span>
                        <img src="https://i.pravatar.cc/150?u=admin" class="w-10 h-10 rounded-full">
                    </div>
                </header>
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-bold text-text-main">Quản lý nội dung (Kiểm duyệt)</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                                    <th class="p-4 font-semibold">Tác giả</th>
                                    <th class="p-4 font-semibold w-1/3">Nội dung</th>
                                    <th class="p-4 font-semibold">Tương tác</th>
                                    <th class="p-4 font-semibold">Báo cáo</th>
                                    <th class="p-4 font-semibold text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td class="p-4 font-medium text-text-main">Minh Anh</td>
                                    <td class="p-4 text-text-muted text-sm line-clamp-2">Cuối tuần trổ tài làm bún đậu mắm tôm theo công thức trên Hôm Nay Ăn Gì. Nước mắm pha bao dính...</td>
                                    <td class="p-4 text-text-muted text-sm"><i class="fa-solid fa-heart text-red-500"></i> 342 | <i class="fa-solid fa-comment text-blue-500"></i> 48</td>
                                    <td class="p-4"><span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">0</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Xem"><i class="fa-solid fa-eye"></i></button>
                                        <button class="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Xóa bài"><i class="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition bg-red-50/30">
                                    <td class="p-4 font-medium text-text-main">Spammer123</td>
                                    <td class="p-4 text-text-muted text-sm line-clamp-2">Click vào link này để nhận thẻ cào 500k: http://scam-link...</td>
                                    <td class="p-4 text-text-muted text-sm"><i class="fa-solid fa-heart text-red-500"></i> 0 | <i class="fa-solid fa-comment text-blue-500"></i> 0</td>
                                    <td class="p-4"><span class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">12 báo cáo</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-red-500 hover:bg-red-50 p-2 rounded transition font-bold" title="Xóa & Ban"><i class="fa-solid fa-ban"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else {
            // Dashboard Default
            contentHTML = `
                <header class="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h1 class="text-2xl font-bold text-text-main">Dashboard Tổng Quan</h1>
                    <div class="flex items-center gap-4">
                        <span class="text-text-muted">Xin chào, <strong>Admin</strong></span>
                        <img src="https://i.pravatar.cc/150?u=admin" class="w-10 h-10 rounded-full">
                    </div>
                </header>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-primary">
                        <p class="text-text-muted text-sm font-semibold mb-1">Tổng món ăn</p>
                        <h3 class="text-3xl font-bold text-text-main">1,245</h3>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                        <p class="text-text-muted text-sm font-semibold mb-1">Người dùng</p>
                        <h3 class="text-3xl font-bold text-text-main">8,592</h3>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-accent">
                        <p class="text-text-muted text-sm font-semibold mb-1">Bài viết cộng đồng</p>
                        <h3 class="text-3xl font-bold text-text-main">432</h3>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                        <p class="text-text-muted text-sm font-semibold mb-1">Báo cáo vi phạm</p>
                        <h3 class="text-3xl font-bold text-text-main">12</h3>
                    </div>
                </div>

                <!-- Data Table -->
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-bold text-text-main">Món ăn chờ duyệt</h2>
                        <button class="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm border border-green-700"><i class="fa-solid fa-plus"></i> Thêm món mới</button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                                    <th class="p-4 font-semibold">Tên món</th>
                                    <th class="p-4 font-semibold">Tác giả</th>
                                    <th class="p-4 font-semibold">Ngày đăng</th>
                                    <th class="p-4 font-semibold">Trạng thái</th>
                                    <th class="p-4 font-semibold text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td class="p-4 font-medium text-text-main">Bún chả Hà Nội chuẩn vị</td>
                                    <td class="p-4 text-text-muted">Hoàng Nam</td>
                                    <td class="p-4 text-text-muted">04/10/2026</td>
                                    <td class="p-4"><span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Chờ duyệt</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-green-500 hover:bg-green-50 p-2 rounded transition" title="Duyệt"><i class="fa-solid fa-check"></i></button>
                                        <button class="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Từ chối"><i class="fa-solid fa-xmark"></i></button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                                    <td class="p-4 font-medium text-text-main">Salad Ức Gà Giảm Cân</td>
                                    <td class="p-4 text-text-muted">Hương Giang</td>
                                    <td class="p-4 text-text-muted">03/10/2026</td>
                                    <td class="p-4"><span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Đã duyệt</span></td>
                                    <td class="p-4 text-right space-x-2">
                                        <button class="text-gray-400 hover:bg-gray-100 p-2 rounded transition" title="Sửa"><i class="fa-solid fa-pen-to-square"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        return `
            <div class="bg-gray-50 min-h-screen flex">
                <!-- Sidebar -->
                <aside class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col min-h-[calc(100vh-70px)]">
                    <div class="p-6 border-b border-gray-100">
                        <h2 class="text-xl font-bold text-primary flex items-center gap-2">
                            <i class="fa-solid fa-shield"></i> Admin Panel
                        </h2>
                    </div>
                    <nav class="flex-1 p-4 space-y-2">
                        <a href="#/admin/dashboard" class="flex items-center gap-3 px-4 py-3 ${page === 'dashboard' ? 'bg-green-50 text-primary font-bold' : 'text-text-muted hover:bg-gray-50 hover:text-primary font-medium'} rounded-xl transition">
                            <i class="fa-solid fa-chart-simple w-5 text-center"></i> Dashboard
                        </a>
                        <a href="#/admin/users" class="flex items-center gap-3 px-4 py-3 ${page === 'users' ? 'bg-green-50 text-primary font-bold' : 'text-text-muted hover:bg-gray-50 hover:text-primary font-medium'} rounded-xl transition">
                            <i class="fa-solid fa-users w-5 text-center"></i> Quản lý người dùng
                        </a>
                        <a href="#/admin/foods" class="flex items-center gap-3 px-4 py-3 ${page === 'foods' ? 'bg-green-50 text-primary font-bold' : 'text-text-muted hover:bg-gray-50 hover:text-primary font-medium'} rounded-xl transition">
                            <i class="fa-solid fa-kitchen-set w-5 text-center"></i> Quản lý món ăn
                        </a>
                        <a href="#/admin/community" class="flex items-center gap-3 px-4 py-3 ${page === 'community' ? 'bg-green-50 text-primary font-bold' : 'text-text-muted hover:bg-gray-50 hover:text-primary font-medium'} rounded-xl transition">
                            <i class="fa-solid fa-comments w-5 text-center"></i> Quản lý cộng đồng
                        </a>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="flex-1 p-8">
                    ${contentHTML}
                </main>
            </div>
        `;
    },
    afterRender: async () => {
        // Tạm ẩn Footer khi ở trang Admin để layout tràn viền
        const footer = document.getElementById('footer-container');
        if(footer) footer.style.display = 'none';
    }
};

export default Admin;

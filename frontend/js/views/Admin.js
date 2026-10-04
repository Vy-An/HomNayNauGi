const Admin = {
    render: async () => {
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
                        <a href="#/admin" class="flex items-center gap-3 px-4 py-3 bg-green-50 text-primary font-bold rounded-xl transition">
                            <i class="fa-solid fa-chart-simple"></i> Dashboard
                        </a>
                        <a href="#/admin" class="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-gray-50 hover:text-primary font-medium rounded-xl transition">
                            <i class="fa-solid fa-users"></i> Quản lý người dùng
                        </a>
                        <a href="#/admin" class="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-gray-50 hover:text-primary font-medium rounded-xl transition">
                            <i class="fa-solid fa-kitchen-set"></i> Quản lý món ăn
                        </a>
                        <a href="#/admin" class="flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-gray-50 hover:text-primary font-medium rounded-xl transition">
                            <i class="fa-solid fa-comments"></i> Quản lý cộng đồng
                        </a>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="flex-1 p-8">
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
                            <button class="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm border border-green-700">+ Thêm món mới</button>
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
                                            <button class="text-red-500 hover:bg-red-50 p-2 rounded transition" title="Từ chối">✖️</button>
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
                </main>
            </div>
        `;
    },
    afterRender: async () => {
        // Tạm ẩn Footer khi ở trang Admin để layout tràn viền
        const footer = document.getElementById('footer-container');
        if(footer) footer.style.display = 'none';
        
        // Cần đảm bảo các trang khác sẽ show lại footer
        // Đã được xử lý ở app.js (vẽ lại nội dung footer) 
        // Tuy nhiên tốt nhất là force display block khi vào các trang khác. 
        // Nhưng tạm thời thế này là đủ cho mockup.
    }
};

export default Admin;

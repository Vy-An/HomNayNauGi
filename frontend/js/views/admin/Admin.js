import { fetchAPI, BACKEND_URL } from '../../api.js';
import Popup from '../../components/Popup.js';

const adminUsersState = {
    page: 1,
    limit: 10,
    search: '',
    role: '',
    status: '',
    users: []
};

const adminFoodsState = {
    page: 1,
    limit: 10,
    search: '',
    category: '',
    status: '',
    foods: [],
    categories: [],
    ingredients: [],
    editingId: null
};

function getStoredAdminUser() {
    try {
        return JSON.parse(localStorage.getItem('auth_user') || 'null');
    } catch (error) {
        return null;
    }
}

function escapeHTML(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
}

function formatDate(value) {
    if (!value) return '-';

    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(new Date(value));
}

function formatNumber(value) {
    return new Intl.NumberFormat('vi-VN').format(Number(value) || 0);
}

function roleLabel(role) {
    return role === 'admin' ? 'Admin' : 'User';
}

function statusLabel(status) {
    return status === 'blocked' ? 'Đã khóa' : 'Hoạt động';
}

function roleBadge(role) {
    const classes = role === 'admin'
        ? 'bg-purple-100 text-purple-700'
        : 'bg-blue-100 text-blue-700';

    return `<span class="${classes} px-3 py-1 rounded-full text-xs font-bold">${roleLabel(role)}</span>`;
}

function statusBadge(status) {
    const classes = status === 'blocked'
        ? 'bg-red-100 text-red-700'
        : 'bg-green-100 text-green-700';

    return `<span class="${classes} px-3 py-1 rounded-full text-xs font-bold">${statusLabel(status)}</span>`;
}

function renderDashboardPage() {
    const currentUser = getStoredAdminUser();
    const adminName = currentUser?.name || 'Admin';
    const adminAvatar = currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`;

    return `
        <header class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 class="text-2xl font-bold text-text-main">Dashboard tổng quan</h1>
                <p class="text-sm text-text-muted mt-1">Theo dõi nhanh dữ liệu người dùng, món ăn, bài viết và báo cáo từ database.</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-text-muted">Xin chào, <strong>${escapeHTML(adminName)}</strong></span>
                <img src="${escapeHTML(adminAvatar)}" class="w-10 h-10 rounded-full object-cover" alt="Admin">
            </div>
        </header>

        <div id="admin-dashboard-alert" class="hidden mb-4 rounded-xl border px-4 py-3 text-sm font-semibold"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <a href="#/admin/foods" class="group block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-primary hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer">
                <div class="flex items-center justify-between">
                    <p class="text-text-muted text-sm font-semibold">Tổng món ăn</p>
                    <i class="fa-solid fa-arrow-right text-xs text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition"></i>
                </div>
                <h3 id="admin-dashboard-foods-total" class="text-3xl font-bold text-text-main mt-1">0</h3>
                <p id="admin-dashboard-foods-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-primary font-bold">
                    <span>Mở danh sách món</span>
                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </div>
            </a>
            <a href="#/admin/users" class="group block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500 hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer">
                <div class="flex items-center justify-between">
                    <p class="text-text-muted text-sm font-semibold">Người dùng</p>
                    <i class="fa-solid fa-arrow-right text-xs text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition"></i>
                </div>
                <h3 id="admin-dashboard-users-total" class="text-3xl font-bold text-text-main mt-1">0</h3>
                <p id="admin-dashboard-users-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                    <span>Mở quản lý người dùng</span>
                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </div>
            </a>
            <a href="#/admin/community" class="group block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-accent hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer">
                <div class="flex items-center justify-between">
                    <p class="text-text-muted text-sm font-semibold">Kiểm duyệt bài viết</p>
                    <i class="fa-solid fa-arrow-right text-xs text-gray-300 group-hover:text-accent group-hover:translate-x-1 transition"></i>
                </div>
                <h3 id="admin-dashboard-posts-total" class="text-3xl font-bold text-text-main mt-1">0</h3>
                <p id="admin-dashboard-posts-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-accent font-bold">
                    <span>Mở kiểm duyệt bài viết</span>
                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </div>
            </a>
            <a href="#/admin/reports" class="group block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500 hover:shadow-md hover:-translate-y-1 transition duration-200 cursor-pointer">
                <div class="flex items-center justify-between">
                    <p class="text-text-muted text-sm font-semibold">Báo cáo vi phạm</p>
                    <i class="fa-solid fa-arrow-right text-xs text-gray-300 group-hover:text-red-500 group-hover:translate-x-1 transition"></i>
                </div>
                <h3 id="admin-dashboard-reports-total" class="text-3xl font-bold text-text-main mt-1">0</h3>
                <p id="admin-dashboard-reports-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-red-600 font-bold">
                    <span>Xem danh sách vi phạm</span>
                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </div>
            </a>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div>
                    <h2 class="text-lg font-bold text-text-main">Món ăn mới nhất</h2>
                    <p class="text-sm text-text-muted mt-1">Dữ liệu lấy trực tiếp từ bảng foods.</p>
                </div>
                <a href="#/admin/foods" class="text-sm bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm border border-green-700 inline-flex items-center gap-2">
                    <i class="fa-solid fa-kitchen-set"></i> Quản lý món ăn
                </a>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                            <th class="p-4 font-semibold">Tên món</th>
                            <th class="p-4 font-semibold">Danh mục</th>
                            <th class="p-4 font-semibold">Ngày tạo</th>
                            <th class="p-4 font-semibold">Trạng thái</th>
                            <th class="p-4 font-semibold text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="admin-dashboard-foods-body">
                        <tr>
                            <td colspan="5" class="p-8 text-center text-text-muted">Đang tải dữ liệu...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function setDashboardAlert(message = '', type = 'info') {
    const alert = document.getElementById('admin-dashboard-alert');
    if (!alert) return;

    if (!message) {
        alert.classList.add('hidden');
        alert.textContent = '';
        return;
    }

    const classes = type === 'error'
        ? 'bg-red-50 border-red-200 text-red-700'
        : 'bg-green-50 border-green-200 text-green-700';

    alert.className = `mb-4 rounded-xl border px-4 py-3 text-sm font-semibold ${classes}`;
    alert.textContent = message;
}

function updateDashboardStats(stats = {}) {
    const foods = stats.foods || {};
    const users = stats.users || {};
    const posts = stats.posts || {};
    const reports = stats.reports || {};

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText('admin-dashboard-foods-total', formatNumber(foods.total));
    setText('admin-dashboard-foods-sub', `${formatNumber(foods.active)} đang hiển thị · ${formatNumber(foods.inactive)} đã ẩn`);
    setText('admin-dashboard-users-total', formatNumber(users.total));
    setText('admin-dashboard-users-sub', `${formatNumber(users.active)} hoạt động · ${formatNumber(users.blocked)} đã khóa`);
    setText('admin-dashboard-posts-total', formatNumber(posts.total));
    const pendingText = Number(posts.pending) > 0 ? ` · ${formatNumber(posts.pending)} chờ duyệt` : '';
    setText('admin-dashboard-posts-sub', `${formatNumber(posts.active)} đang hiển thị · ${formatNumber(posts.hidden)} đã ẩn${pendingText}`);
    setText('admin-dashboard-reports-total', formatNumber(reports.total));
    const repPending = Number(reports.pending) || 0;
    const repResolved = Math.max(0, (Number(reports.total) || 0) - repPending);
    setText('admin-dashboard-reports-sub', `${formatNumber(repPending)} chờ xử lý · ${formatNumber(repResolved)} đã giải quyết`);
}

function renderDashboardFoods(foods = []) {
    const body = document.getElementById('admin-dashboard-foods-body');
    if (!body) return;

    if (!foods.length) {
        body.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-text-muted">Chưa có món ăn nào trong database.</td></tr>';
        return;
    }

    body.innerHTML = foods.map((food) => `
        <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
            <td class="p-4">
                <div class="flex items-center gap-3">
                    <img src="${escapeHTML(food.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`)}" class="w-12 h-10 rounded-lg object-cover bg-gray-100" alt="${escapeHTML(food.name)}">
                    <span class="font-medium text-text-main">${escapeHTML(food.name)}</span>
                </div>
            </td>
            <td class="p-4 text-text-muted">${escapeHTML(food.category?.name || '-')}</td>
            <td class="p-4 text-text-muted">${formatDate(food.created_at)}</td>
            <td class="p-4">${foodStatusBadge(food.status)}</td>
            <td class="p-4 text-right">
                <a href="#/admin/foods" class="text-slate-600 hover:bg-slate-100 p-2 rounded transition inline-flex" title="Mở quản lý món ăn">
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </td>
        </tr>
    `).join('');
}

async function loadAdminDashboard() {
    setDashboardAlert();

    const res = await fetchAPI('/admin/dashboard');
    if (!res.success) {
        updateDashboardStats();
        renderDashboardFoods([]);
        setDashboardAlert(res.message || 'Không thể tải dữ liệu dashboard.', 'error');
        return;
    }

    updateDashboardStats(res.data?.stats || {});
    renderDashboardFoods(res.data?.latestFoods || []);
}

function renderUsersPage() {
    const currentUser = getStoredAdminUser();
    const adminName = currentUser?.name || 'Admin';
    const adminAvatar = currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`;

    return `
        <header class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 class="text-2xl font-bold text-text-main">Quản lý người dùng</h1>
                <p class="text-sm text-text-muted mt-1">Theo dõi, tìm kiếm, khóa/mở khóa và cập nhật tài khoản thành viên.</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-text-muted">Xin chào, <strong>${escapeHTML(adminName)}</strong></span>
                <img src="${escapeHTML(adminAvatar)}" class="w-10 h-10 rounded-full object-cover" alt="Admin">
            </div>
        </header>

        <div id="admin-users-stats-container" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div data-user-filter="all" class="admin-user-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-slate-400 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-primary transition">Tổng người dùng</p>
                    <i class="fa-solid fa-users text-sm text-gray-300 group-hover:text-primary transition"></i>
                </div>
                <strong id="admin-users-stat-total" class="block text-3xl text-text-main mt-2">0</strong>
                <p class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-primary transition">
                    <span>Xem tất cả</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
            </div>
            <div data-user-filter="active" class="admin-user-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-green-500 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-green-600 transition">Hoạt động</p>
                    <i class="fa-solid fa-user-check text-sm text-green-300 group-hover:text-green-600 transition"></i>
                </div>
                <strong id="admin-users-stat-active" class="block text-3xl text-green-700 mt-2">0</strong>
                <p class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-green-600 transition">
                    <span>Lọc tài khoản hoạt động</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
            </div>
            <div data-user-filter="blocked" class="admin-user-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-red-500 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-red-600 transition">Đã khóa</p>
                    <i class="fa-solid fa-user-slash text-sm text-red-300 group-hover:text-red-600 transition"></i>
                </div>
                <strong id="admin-users-stat-blocked" class="block text-3xl text-red-700 mt-2">0</strong>
                <p class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-red-600 transition">
                    <span>Lọc tài khoản bị khóa</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
            </div>
            <div data-user-filter="admin" class="admin-user-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-purple-500 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-purple-600 transition">Quản trị viên</p>
                    <i class="fa-solid fa-user-shield text-sm text-purple-300 group-hover:text-purple-600 transition"></i>
                </div>
                <strong id="admin-users-stat-admins" class="block text-3xl text-purple-700 mt-2">0</strong>
                <p class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-purple-600 transition">
                    <span>Lọc vai trò Admin</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
            </div>
        </div>

        <div id="admin-users-alert" class="hidden mb-4 rounded-xl border px-4 py-3 text-sm font-semibold"></div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between">
                <h2 class="text-lg font-bold text-text-main">Danh sách thành viên</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_150px_150px_auto_auto] gap-2 w-full xl:w-auto">
                    <input id="admin-users-search" type="text" placeholder="Tìm theo tên hoặc email..." class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                    <select id="admin-users-role-filter" class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                        <option value="">Tất cả vai trò</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <select id="admin-users-status-filter" class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Hoạt động</option>
                        <option value="blocked">Đã khóa</option>
                    </select>
                    <button id="admin-users-refresh" class="bg-white hover:bg-gray-50 text-primary border border-primary/20 px-4 py-2 rounded-lg font-semibold transition text-sm">
                        <i class="fa-solid fa-rotate-right"></i>
                    </button>
                    <button id="admin-user-add" class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm text-sm">
                        <i class="fa-solid fa-plus"></i> Thêm user
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                            <th class="p-4 font-semibold">Người dùng</th>
                            <th class="p-4 font-semibold">Vai trò</th>
                            <th class="p-4 font-semibold">Trạng thái</th>
                            <th class="p-4 font-semibold">Hoạt động</th>
                            <th class="p-4 font-semibold">Ngày tạo</th>
                            <th class="p-4 font-semibold text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="admin-users-body">
                        <tr>
                            <td colspan="6" class="p-8 text-center text-text-muted">Đang tải người dùng...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p id="admin-users-page-info" class="text-sm text-text-muted">Trang 1</p>
                <div class="flex gap-2">
                    <button id="admin-users-prev" class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">Trước</button>
                    <button id="admin-users-next" class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">Sau</button>
                </div>
            </div>
        </div>

        <div id="admin-user-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50 p-4">
            <form id="admin-user-form" class="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-xl overflow-hidden">
                <div class="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 id="admin-user-modal-title" class="text-lg font-bold text-text-main">Thêm người dùng</h3>
                    <button type="button" id="admin-user-modal-close" class="w-9 h-9 rounded-full hover:bg-gray-100 text-text-muted">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label class="text-sm font-semibold text-text-main">
                        Họ tên
                        <input id="admin-user-name" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" required>
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Email
                        <input id="admin-user-email" type="email" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" required>
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Vai trò
                        <select id="admin-user-role" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Trạng thái
                        <select id="admin-user-status" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                            <option value="active">Hoạt động</option>
                            <option value="blocked">Đã khóa</option>
                        </select>
                    </label>
                    <label class="text-sm font-semibold text-text-main sm:col-span-2">
                        Avatar URL
                        <input id="admin-user-avatar" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="/images/users/admin.jpg">
                    </label>
                    <label class="text-sm font-semibold text-text-main sm:col-span-2">
                        Mật khẩu
                        <input id="admin-user-password" type="password" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="Tối thiểu 6 ký tự">
                    </label>
                </div>
                <div class="p-5 border-t border-gray-100 flex justify-end gap-2">
                    <button type="button" id="admin-user-cancel" class="px-4 py-2 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50">Hủy</button>
                    <button type="submit" class="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold">Lưu</button>
                </div>
            </form>
        </div>

        <div id="admin-user-detail-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl overflow-hidden">
                <div class="p-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="text-lg font-bold text-text-main">Chi tiết người dùng</h3>
                    <button type="button" id="admin-user-detail-close" class="w-9 h-9 rounded-full hover:bg-gray-100 text-text-muted">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div id="admin-user-detail-body" class="p-5 text-sm text-text-muted"></div>
            </div>
        </div>
    `;
}

function setUsersAlert(message = '', type = 'info') {
    const alert = document.getElementById('admin-users-alert');
    if (!alert) return;

    if (!message) {
        alert.classList.add('hidden');
        alert.textContent = '';
        return;
    }

    const classes = type === 'error'
        ? 'bg-red-50 border-red-200 text-red-700'
        : 'bg-green-50 border-green-200 text-green-700';

    alert.className = `mb-4 rounded-xl border px-4 py-3 text-sm font-semibold ${classes}`;
    alert.textContent = message;
}

function setUsersLoading(message = 'Đang tải người dùng...') {
    const body = document.getElementById('admin-users-body');
    if (!body) return;

    body.innerHTML = `
        <tr>
            <td colspan="6" class="p-8 text-center text-text-muted">${escapeHTML(message)}</td>
        </tr>
    `;
}

function renderUsersTable(users) {
    const body = document.getElementById('admin-users-body');
    if (!body) return;

    const currentUser = getStoredAdminUser();
    const currentUserId = currentUser?.id || currentUser?.id_user;

    if (!users.length) {
        setUsersLoading('Không tìm thấy người dùng phù hợp.');
        return;
    }

    body.innerHTML = users.map((user) => {
        const isSelf = Number(user.id_user) === Number(currentUserId);
        const nextStatus = user.status === 'blocked' ? 'active' : 'blocked';
        const statusIcon = user.status === 'blocked' ? 'fa-unlock' : 'fa-lock';
        const statusTitle = user.status === 'blocked' ? 'Mở khóa' : 'Khóa';
        const disabledSelf = isSelf ? 'disabled opacity-40 cursor-not-allowed' : '';

        return `
            <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <img src="${escapeHTML(user.avatar || `${BACKEND_URL}/images/users/admin.jpg`)}" class="w-10 h-10 rounded-full object-cover bg-gray-100" alt="${escapeHTML(user.name)}">
                        <div>
                            <p class="font-bold text-text-main">${escapeHTML(user.name)} ${isSelf ? '<span class="text-xs text-primary">(Bạn)</span>' : ''}</p>
                            <p class="text-sm text-text-muted">${escapeHTML(user.email)}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4">${roleBadge(user.role)}</td>
                <td class="p-4">${statusBadge(user.status)}</td>
                <td class="p-4 text-sm text-text-muted">
                    <span title="Bài viết"><i class="fa-solid fa-pen-to-square text-primary"></i> ${user.stats?.posts || 0}</span>
                    <span class="mx-2 text-gray-300">|</span>
                    <span title="Bình luận"><i class="fa-solid fa-comment text-blue-500"></i> ${user.stats?.comments || 0}</span>
                </td>
                <td class="p-4 text-text-muted text-sm">${formatDate(user.created_at)}</td>
                <td class="p-4 text-right">
                    <div class="flex justify-end gap-1">
                        <button class="text-slate-600 hover:bg-slate-100 p-2 rounded transition" title="Xem" data-admin-action="view" data-id="${user.id_user}">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="text-amber-600 hover:bg-amber-50 p-2 rounded transition ${disabledSelf}" title="${statusTitle}" data-admin-action="status" data-id="${user.id_user}" data-status="${nextStatus}" ${isSelf ? 'disabled' : ''}>
                            <i class="fa-solid ${statusIcon}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateUsersStats(stats = {}) {
    const ids = {
        total: 'admin-users-stat-total',
        active: 'admin-users-stat-active',
        blocked: 'admin-users-stat-blocked',
        admins: 'admin-users-stat-admins'
    };

    Object.entries(ids).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = stats[key] ?? 0;
    });
}

function updateUsersPagination(pagination = {}) {
    const info = document.getElementById('admin-users-page-info');
    const prev = document.getElementById('admin-users-prev');
    const next = document.getElementById('admin-users-next');

    if (info) {
        info.textContent = `Trang ${pagination.page || adminUsersState.page} / ${pagination.totalPages || 1} - ${pagination.total || 0} người dùng`;
    }

    if (prev) prev.disabled = (pagination.page || 1) <= 1;
    if (next) next.disabled = !pagination.hasMore;
}

function updateUserStatCardsUI() {
    const cards = document.querySelectorAll('#admin-users-stats-container [data-user-filter]');
    if (!cards.length) return;

    let activeFilter = null;
    if (adminUsersState.role === 'admin' && !adminUsersState.status) {
        activeFilter = 'admin';
    } else if (adminUsersState.status === 'active' && !adminUsersState.role) {
        activeFilter = 'active';
    } else if (adminUsersState.status === 'blocked' && !adminUsersState.role) {
        activeFilter = 'blocked';
    } else if (!adminUsersState.role && !adminUsersState.status) {
        activeFilter = 'all';
    }

    cards.forEach((card) => {
        const filter = card.dataset.userFilter;
        const isActive = filter === activeFilter;

        card.classList.remove(
            'ring-2', 'ring-offset-2',
            'ring-slate-400', 'ring-green-500', 'ring-red-500', 'ring-purple-500',
            'bg-slate-50', 'bg-green-50/60', 'bg-red-50/60', 'bg-purple-50/60'
        );

        if (isActive) {
            card.classList.add('ring-2', 'ring-offset-2');
            if (filter === 'all') card.classList.add('ring-slate-400', 'bg-slate-50');
            if (filter === 'active') card.classList.add('ring-green-500', 'bg-green-50/60');
            if (filter === 'blocked') card.classList.add('ring-red-500', 'bg-red-50/60');
            if (filter === 'admin') card.classList.add('ring-purple-500', 'bg-purple-50/60');
        }
    });
}

async function loadAdminUsers() {
    setUsersAlert();
    setUsersLoading();

    const params = new URLSearchParams({
        page: adminUsersState.page,
        limit: adminUsersState.limit
    });

    if (adminUsersState.search) params.set('search', adminUsersState.search);
    if (adminUsersState.role) params.set('role', adminUsersState.role);
    if (adminUsersState.status) params.set('status', adminUsersState.status);

    const res = await fetchAPI(`/admin/users?${params.toString()}`);

    if (!res.success) {
        adminUsersState.users = [];
        renderUsersTable([]);
        updateUsersStats();
        updateUserStatCardsUI();
        updateUsersPagination({ page: 1, totalPages: 1, total: 0, hasMore: false });
        setUsersAlert(res.message || 'Không thể tải danh sách người dùng.', 'error');
        return;
    }

    adminUsersState.users = res.data || [];
    renderUsersTable(adminUsersState.users);
    updateUsersStats(res.stats);
    updateUserStatCardsUI();
    updateUsersPagination(res.pagination);
}

function getUserFromState(id) {
    return adminUsersState.users.find((user) => Number(user.id_user) === Number(id));
}

function openUserModal() {
    const modal = document.getElementById('admin-user-modal');
    const title = document.getElementById('admin-user-modal-title');
    const password = document.getElementById('admin-user-password');

    document.getElementById('admin-user-name').value = '';
    document.getElementById('admin-user-email').value = '';
    document.getElementById('admin-user-role').value = 'user';
    document.getElementById('admin-user-status').value = 'active';
    document.getElementById('admin-user-avatar').value = '';
    password.value = '';
    password.required = true;
    password.placeholder = 'Tối thiểu 6 ký tự';

    if (title) title.textContent = 'Thêm người dùng';
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeUserModal() {
    const modal = document.getElementById('admin-user-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

async function saveUserFromForm(event) {
    event.preventDefault();
    setUsersAlert();

    const password = document.getElementById('admin-user-password').value;
    const payload = {
        name: document.getElementById('admin-user-name').value.trim(),
        email: document.getElementById('admin-user-email').value.trim(),
        role: document.getElementById('admin-user-role').value,
        status: document.getElementById('admin-user-status').value,
        avatar: document.getElementById('admin-user-avatar').value.trim()
    };

    if (password) payload.password = password;

    const res = await fetchAPI('/admin/users', {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (!res.success) {
        setUsersAlert(res.message || 'Không thể lưu người dùng.', 'error');
        Popup.error(res.message || 'Không thể lưu người dùng.');
        return;
    }

    closeUserModal();
    setUsersAlert(res.message || 'Đã lưu người dùng.');
    Popup.toast(res.message || 'Đã lưu thông tin người dùng thành công!', 'success');
    await loadAdminUsers();
}

async function openUserDetail(id) {
    const modal = document.getElementById('admin-user-detail-modal');
    const body = document.getElementById('admin-user-detail-body');
    if (!modal || !body) return;

    body.innerHTML = '<p class="text-text-muted">Đang tải chi tiết...</p>';
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const res = await fetchAPI(`/admin/users/${id}`);
    if (!res.success) {
        body.innerHTML = `<p class="text-red-600 font-semibold">${escapeHTML(res.message || 'Không thể tải chi tiết người dùng.')}</p>`;
        return;
    }

    const user = res.data;
    body.innerHTML = `
        <div class="flex items-center gap-4 mb-5">
            <img src="${escapeHTML(user.avatar || `${BACKEND_URL}/images/users/admin.jpg`)}" class="w-16 h-16 rounded-full object-cover bg-gray-100" alt="${escapeHTML(user.name)}">
            <div>
                <h4 class="text-xl font-bold text-text-main">${escapeHTML(user.name)}</h4>
                <p>${escapeHTML(user.email)}</p>
                <div class="flex gap-2 mt-2">${roleBadge(user.role)} ${statusBadge(user.status)}</div>
            </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">Bài viết</span><strong class="text-lg text-text-main">${user.stats?.posts || 0}</strong></div>
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">Bình luận</span><strong class="text-lg text-text-main">${user.stats?.comments || 0}</strong></div>
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">Yêu thích</span><strong class="text-lg text-text-main">${user.stats?.favorites || 0}</strong></div>
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">List đi chợ</span><strong class="text-lg text-text-main">${user.stats?.shoppingLists || 0}</strong></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <h5 class="font-bold text-text-main mb-2">Bài viết gần đây</h5>
                ${(user.recentPosts || []).length ? user.recentPosts.map((post) => `
                    <div class="border border-gray-100 rounded-xl p-3 mb-2">
                        <p class="font-semibold text-text-main">${escapeHTML(post.title)}</p>
                        <p class="text-xs text-text-muted">${formatDate(post.created_at)} · ${post.likesCount} tim · ${post.commentsCount} bình luận</p>
                    </div>
                `).join('') : '<p class="text-text-muted">Chưa có bài viết.</p>'}
            </div>
            <div>
                <h5 class="font-bold text-text-main mb-2">Bình luận gần đây</h5>
                ${(user.recentComments || []).length ? user.recentComments.map((comment) => `
                    <div class="border border-gray-100 rounded-xl p-3 mb-2">
                        <p class="font-semibold text-text-main line-clamp-1">${escapeHTML(comment.postTitle || 'Bài viết')}</p>
                        <p class="text-xs text-text-muted line-clamp-2">${escapeHTML(comment.content)}</p>
                    </div>
                `).join('') : '<p class="text-text-muted">Chưa có bình luận.</p>'}
            </div>
        </div>
    `;
}

function closeUserDetail() {
    const modal = document.getElementById('admin-user-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

async function changeUserStatus(id, nextStatus) {
    const user = getUserFromState(id);
    if (!user) return;

    const action = nextStatus === 'blocked' ? 'khóa' : 'mở khóa';
    const isBlock = nextStatus === 'blocked';

    const confirmed = await Popup.confirm({
        title: `Xác nhận ${action} tài khoản`,
        message: `Bạn có chắc chắn muốn <strong>${action}</strong> tài khoản "<strong>${escapeHTML(user.name)}</strong>" không?`,
        type: isBlock ? 'warning' : 'question',
        confirmText: isBlock ? 'Khóa tài khoản' : 'Mở khóa',
        cancelText: 'Hủy bỏ',
        confirmButtonColor: isBlock ? 'danger' : 'primary'
    });
    if (!confirmed) return;

    const res = await fetchAPI(`/admin/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus })
    });

    if (!res.success) {
        setUsersAlert(res.message || 'Không thể cập nhật trạng thái.', 'error');
        Popup.error(res.message || 'Không thể cập nhật trạng thái.');
        return;
    }

    setUsersAlert(res.message || 'Đã cập nhật trạng thái.');
    Popup.toast(`Đã ${action} tài khoản "${user.name}" thành công!`, 'success');
    await loadAdminUsers();
}

function bindAdminUsersEvents() {
    const search = document.getElementById('admin-users-search');
    const role = document.getElementById('admin-users-role-filter');
    const status = document.getElementById('admin-users-status-filter');
    const refresh = document.getElementById('admin-users-refresh');
    const add = document.getElementById('admin-user-add');
    const body = document.getElementById('admin-users-body');
    const prev = document.getElementById('admin-users-prev');
    const next = document.getElementById('admin-users-next');
    const form = document.getElementById('admin-user-form');
    const statsContainer = document.getElementById('admin-users-stats-container');

    // Click tương tác thẻ thống kê
    statsContainer?.addEventListener('click', (event) => {
        const card = event.target.closest('[data-user-filter]');
        if (!card) return;

        const filter = card.dataset.userFilter;
        if (filter === 'all') {
            adminUsersState.role = '';
            adminUsersState.status = '';
        } else if (filter === 'active') {
            adminUsersState.role = '';
            adminUsersState.status = 'active';
        } else if (filter === 'blocked') {
            adminUsersState.role = '';
            adminUsersState.status = 'blocked';
        } else if (filter === 'admin') {
            adminUsersState.role = 'admin';
            adminUsersState.status = '';
        }

        // Đồng bộ giá trị dropdown lọc
        if (role) role.value = adminUsersState.role;
        if (status) status.value = adminUsersState.status;

        adminUsersState.page = 1;
        updateUserStatCardsUI();
        loadAdminUsers();
    });

    let searchTimer = null;
    search?.addEventListener('input', () => {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(() => {
            adminUsersState.search = search.value.trim();
            adminUsersState.page = 1;
            loadAdminUsers();
        }, 300);
    });

    role?.addEventListener('change', () => {
        adminUsersState.role = role.value;
        adminUsersState.page = 1;
        updateUserStatCardsUI();
        loadAdminUsers();
    });

    status?.addEventListener('change', () => {
        adminUsersState.status = status.value;
        adminUsersState.page = 1;
        updateUserStatCardsUI();
        loadAdminUsers();
    });

    refresh?.addEventListener('click', () => loadAdminUsers());
    add?.addEventListener('click', () => openUserModal());

    prev?.addEventListener('click', () => {
        if (adminUsersState.page <= 1) return;
        adminUsersState.page -= 1;
        loadAdminUsers();
    });

    next?.addEventListener('click', () => {
        adminUsersState.page += 1;
        loadAdminUsers();
    });

    body?.addEventListener('click', (event) => {
        const button = event.target.closest('[data-admin-action]');
        if (!button || button.disabled) return;

        const id = button.dataset.id;
        const action = button.dataset.adminAction;

        if (action === 'view') openUserDetail(id);
        if (action === 'status') changeUserStatus(id, button.dataset.status);
    });

    form?.addEventListener('submit', saveUserFromForm);
    document.getElementById('admin-user-modal-close')?.addEventListener('click', closeUserModal);
    document.getElementById('admin-user-cancel')?.addEventListener('click', closeUserModal);
    document.getElementById('admin-user-detail-close')?.addEventListener('click', closeUserDetail);
    document.getElementById('admin-user-modal')?.addEventListener('click', (event) => {
        if (event.target.id === 'admin-user-modal') closeUserModal();
    });
    document.getElementById('admin-user-detail-modal')?.addEventListener('click', (event) => {
        if (event.target.id === 'admin-user-detail-modal') closeUserDetail();
    });
}

async function initAdminUsersPage() {
    bindAdminUsersEvents();
    updateUserStatCardsUI();
    await loadAdminUsers();
}

function foodStatusLabel(status) {
    return status === 'inactive' ? 'Đã ẩn' : 'Đang hiển thị';
}

function foodStatusBadge(status) {
    const classes = status === 'inactive'
        ? 'bg-gray-100 text-gray-700'
        : 'bg-green-100 text-green-700';

    return `<span class="${classes} px-3 py-1 rounded-full text-xs font-bold">${foodStatusLabel(status)}</span>`;
}

function renderFoodsPage() {
    const currentUser = getStoredAdminUser();
    const adminName = currentUser?.name || 'Admin';
    const adminAvatar = currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`;

    return `
        <header class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 class="text-2xl font-bold text-text-main">Quản lý món ăn</h1>
                <p class="text-sm text-text-muted mt-1">Thêm, sửa, tìm kiếm và ẩn/hiện món ăn trong hệ thống.</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-text-muted">Xin chào, <strong>${escapeHTML(adminName)}</strong></span>
                <img src="${escapeHTML(adminAvatar)}" class="w-10 h-10 rounded-full object-cover" alt="Admin">
            </div>
        </header>

        <div id="admin-foods-stats-container" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div data-food-filter="all" class="admin-food-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-slate-400 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-primary transition">Tổng món ăn</p>
                    <i class="fa-solid fa-utensils text-sm text-gray-300 group-hover:text-primary transition"></i>
                </div>
                <strong id="admin-foods-stat-total" class="block text-3xl text-text-main mt-2">0</strong>
                <p class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-primary transition">
                    <span>Xem tất cả món</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
            </div>
            <div data-food-filter="active" class="admin-food-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-green-500 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-green-600 transition">Đang hiển thị</p>
                    <i class="fa-solid fa-eye text-sm text-green-300 group-hover:text-green-600 transition"></i>
                </div>
                <strong id="admin-foods-stat-active" class="block text-3xl text-green-700 mt-2">0</strong>
                <p class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-green-600 transition">
                    <span>Lọc món đang hiển thị</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
            </div>
            <div data-food-filter="inactive" class="admin-food-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-gray-500 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-gray-700 transition">Đã ẩn</p>
                    <i class="fa-solid fa-eye-slash text-sm text-gray-300 group-hover:text-gray-700 transition"></i>
                </div>
                <strong id="admin-foods-stat-inactive" class="block text-3xl text-gray-700 mt-2">0</strong>
                <p class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-gray-700 transition">
                    <span>Lọc món đã ẩn</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </p>
            </div>
            <div data-food-filter="categories" class="admin-food-stat-card cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition duration-200 select-none border-l-4 border-l-amber-500 group">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted group-hover:text-amber-600 transition">Danh mục</p>
                    <i class="fa-solid fa-layer-group text-sm text-amber-300 group-hover:text-amber-600 transition"></i>
                </div>
                <strong id="admin-foods-stat-categories" class="block text-3xl text-amber-700 mt-2">0</strong>
                <p id="admin-foods-category-hint" class="text-[11px] text-text-muted mt-1 flex items-center gap-1 group-hover:text-amber-600 transition">
                    <span>Lọc theo danh mục</span> <i class="fa-solid fa-filter text-[10px]"></i>
                </p>
            </div>
        </div>

        <div id="admin-foods-alert" class="hidden mb-4 rounded-xl border px-4 py-3 text-sm font-semibold"></div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-5 border-b border-gray-100 flex flex-col xl:flex-row gap-3 xl:items-center xl:justify-between">
                <h2 class="text-lg font-bold text-text-main">Danh sách món ăn</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1fr)_170px_150px_auto_auto] gap-2 w-full xl:w-auto">
                    <input id="admin-foods-search" type="text" placeholder="Tìm món, nguyên liệu..." class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                    <select id="admin-foods-category-filter" class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                        <option value="">Tất cả danh mục</option>
                    </select>
                    <select id="admin-foods-status-filter" class="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary">
                        <option value="">Tất cả trạng thái</option>
                        <option value="active">Đang hiển thị</option>
                        <option value="inactive">Đã ẩn</option>
                    </select>
                    <button id="admin-foods-refresh" class="bg-white hover:bg-gray-50 text-primary border border-primary/20 px-4 py-2 rounded-lg font-semibold transition text-sm">
                        <i class="fa-solid fa-rotate-right"></i>
                    </button>
                    <button id="admin-food-add" class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm text-sm">
                        <i class="fa-solid fa-plus"></i> Thêm món
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-text-muted text-sm border-b border-gray-100">
                            <th class="p-4 font-semibold">Món ăn</th>
                            <th class="p-4 font-semibold">Danh mục</th>
                            <th class="p-4 font-semibold">Thông tin</th>
                            <th class="p-4 font-semibold">Trạng thái</th>
                            <th class="p-4 font-semibold">Ngày tạo</th>
                            <th class="p-4 font-semibold text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody id="admin-foods-body">
                        <tr>
                            <td colspan="6" class="p-8 text-center text-text-muted">Đang tải món ăn...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p id="admin-foods-page-info" class="text-sm text-text-muted">Trang 1</p>
                <div class="flex gap-2">
                    <button id="admin-foods-prev" class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">Trước</button>
                    <button id="admin-foods-next" class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">Sau</button>
                </div>
            </div>
        </div>

        <div id="admin-food-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50 p-4">
            <form id="admin-food-form" class="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl max-h-[92vh] overflow-y-auto">
                <div class="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h3 id="admin-food-modal-title" class="text-lg font-bold text-text-main">Thêm món ăn</h3>
                    <button type="button" id="admin-food-modal-close" class="w-9 h-9 rounded-full hover:bg-gray-100 text-text-muted">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label class="text-sm font-semibold text-text-main">
                        Tên món
                        <input id="admin-food-name" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" required>
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Slug
                        <input id="admin-food-slug" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="Tự tạo nếu bỏ trống">
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Danh mục
                        <select id="admin-food-category" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" required></select>
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Trạng thái
                        <select id="admin-food-status" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                            <option value="active">Đang hiển thị</option>
                            <option value="inactive">Đã ẩn</option>
                        </select>
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Thời gian nấu
                        <input id="admin-food-time" type="number" min="1" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="30">
                    </label>
                    <label class="text-sm font-semibold text-text-main">
                        Khẩu phần
                        <input id="admin-food-servings" type="number" min="1" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="4">
                    </label>
                    <label class="text-sm font-semibold text-text-main sm:col-span-2">
                        Ảnh món ăn
                        <input id="admin-food-image" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="/images/foods/ten-mon.jpg">
                    </label>
                    <label class="text-sm font-semibold text-text-main sm:col-span-2">
                        Mô tả
                        <textarea id="admin-food-description" rows="3" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"></textarea>
                    </label>
                    <label class="text-sm font-semibold text-text-main sm:col-span-2">
                        Nguyên liệu
                        <textarea id="admin-food-ingredients" rows="5" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="Mỗi dòng: Tên hoặc ID | số lượng | ghi chú | đơn vị"></textarea>
                        <span class="block mt-1 text-xs text-text-muted">Ví dụ: Thịt gà | 500 | cắt miếng | g</span>
                    </label>
                    <label class="text-sm font-semibold text-text-main sm:col-span-2">
                        Các bước nấu
                        <textarea id="admin-food-steps" rows="5" class="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary" placeholder="Mỗi dòng là một bước nấu"></textarea>
                    </label>
                </div>
                <div class="p-5 border-t border-gray-100 flex justify-end gap-2 sticky bottom-0 bg-white">
                    <button type="button" id="admin-food-cancel" class="px-4 py-2 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50">Hủy</button>
                    <button type="submit" class="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold">Lưu món</button>
                </div>
            </form>
        </div>

        <div id="admin-food-detail-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-3xl max-h-[92vh] overflow-y-auto">
                <div class="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <h3 class="text-lg font-bold text-text-main">Chi tiết món ăn</h3>
                    <button type="button" id="admin-food-detail-close" class="w-9 h-9 rounded-full hover:bg-gray-100 text-text-muted">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div id="admin-food-detail-body" class="p-5 text-sm text-text-muted"></div>
            </div>
        </div>

        <div id="admin-food-category-modal" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50 p-4">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden animate-scaleIn">
                <div class="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-layer-group text-amber-600 text-lg"></i>
                        <h3 class="text-lg font-bold text-text-main">Lọc món theo danh mục</h3>
                    </div>
                    <button type="button" id="admin-food-category-modal-close" class="w-9 h-9 rounded-full hover:bg-gray-100 text-text-muted flex items-center justify-center">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="p-5">
                    <p class="text-xs text-text-muted mb-4">Nhấp vào một danh mục bên dưới để lọc danh sách món ăn ngay:</p>
                    <div id="admin-food-category-modal-list" class="flex flex-wrap gap-2.5 max-h-72 overflow-y-auto pr-1">
                    </div>
                </div>
                <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <button type="button" id="admin-food-category-modal-clear" class="text-xs text-text-muted hover:text-red-600 font-semibold transition">
                        <i class="fa-solid fa-arrow-rotate-left mr-1"></i> Bỏ lọc danh mục
                    </button>
                    <button type="button" id="admin-food-category-modal-cancel" class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-100">Đóng</button>
                </div>
            </div>
        </div>
    `;
}

function setFoodsAlert(message = '', type = 'info') {
    const alert = document.getElementById('admin-foods-alert');
    if (!alert) return;

    if (!message) {
        alert.classList.add('hidden');
        alert.textContent = '';
        return;
    }

    const classes = type === 'error'
        ? 'bg-red-50 border-red-200 text-red-700'
        : 'bg-green-50 border-green-200 text-green-700';

    alert.className = `mb-4 rounded-xl border px-4 py-3 text-sm font-semibold ${classes}`;
    alert.textContent = message;
}

function setFoodsLoading(message = 'Đang tải món ăn...') {
    const body = document.getElementById('admin-foods-body');
    if (!body) return;

    body.innerHTML = `
        <tr>
            <td colspan="6" class="p-8 text-center text-text-muted">${escapeHTML(message)}</td>
        </tr>
    `;
}

function getFoodFromState(id) {
    return adminFoodsState.foods.find((food) => Number(food.id_food) === Number(id));
}

function renderFoodsTable(foods) {
    const body = document.getElementById('admin-foods-body');
    if (!body) return;

    if (!foods.length) {
        setFoodsLoading('Không tìm thấy món ăn phù hợp.');
        return;
    }

    body.innerHTML = foods.map((food) => {
        const nextStatus = food.status === 'inactive' ? 'active' : 'inactive';
        const statusIcon = food.status === 'inactive' ? 'fa-eye' : 'fa-eye-slash';
        const statusTitle = food.status === 'inactive' ? 'Hiện món' : 'Ẩn món';
        const image = food.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`;

        return `
            <tr class="border-b border-gray-50 hover:bg-gray-50 transition">
                <td class="p-4">
                    <div class="flex items-center gap-3">
                        <img src="${escapeHTML(image)}" class="w-16 h-12 rounded-xl object-cover bg-gray-100" alt="${escapeHTML(food.name)}">
                        <div>
                            <p class="font-bold text-text-main">${escapeHTML(food.name)}</p>
                            <p class="text-xs text-text-muted">${escapeHTML(food.slug)}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4 text-text-muted">${escapeHTML(food.category?.name || '-')}</td>
                <td class="p-4 text-sm text-text-muted">
                    <span><i class="fa-regular fa-clock text-amber-500"></i> ${food.cooking_time || '-'} phút</span>
                    <span class="mx-2 text-gray-300">|</span>
                    <span><i class="fa-solid fa-users text-primary"></i> ${food.servings || '-'} phần</span>
                    <p class="text-xs text-gray-400 mt-1">${food.stats?.ingredients || 0} nguyên liệu · ${food.stats?.steps || 0} bước</p>
                </td>
                <td class="p-4">${foodStatusBadge(food.status)}</td>
                <td class="p-4 text-text-muted text-sm">${formatDate(food.created_at)}</td>
                <td class="p-4 text-right">
                    <div class="flex justify-end gap-1">
                        <button class="text-slate-600 hover:bg-slate-100 p-2 rounded transition" title="Xem" data-food-action="view" data-id="${food.id_food}">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="text-blue-500 hover:bg-blue-50 p-2 rounded transition" title="Sửa" data-food-action="edit" data-id="${food.id_food}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="text-amber-600 hover:bg-amber-50 p-2 rounded transition" title="${statusTitle}" data-food-action="status" data-id="${food.id_food}" data-status="${nextStatus}">
                            <i class="fa-solid ${statusIcon}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateFoodsStats(stats = {}) {
    const ids = {
        total: 'admin-foods-stat-total',
        active: 'admin-foods-stat-active',
        inactive: 'admin-foods-stat-inactive',
        categories: 'admin-foods-stat-categories'
    };

    Object.entries(ids).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = stats[key] ?? 0;
    });
}

function updateFoodsPagination(pagination = {}) {
    const info = document.getElementById('admin-foods-page-info');
    const prev = document.getElementById('admin-foods-prev');
    const next = document.getElementById('admin-foods-next');

    if (info) {
        info.textContent = `Trang ${pagination.page || adminFoodsState.page} / ${pagination.totalPages || 1} - ${pagination.total || 0} món ăn`;
    }

    if (prev) prev.disabled = (pagination.page || 1) <= 1;
    if (next) next.disabled = !pagination.hasMore;
}

function openCategoryFilterModal() {
    const modal = document.getElementById('admin-food-category-modal');
    const list = document.getElementById('admin-food-category-modal-list');
    if (!modal || !list) return;

    const currentCatId = String(adminFoodsState.category || '');

    let html = `
        <button type="button" data-select-category="" class="px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${!currentCatId ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}">
            <i class="fa-solid fa-border-all mr-1.5"></i> Tất cả danh mục
        </button>
    `;

    (adminFoodsState.categories || []).forEach((cat) => {
        const isSelected = String(cat.id_category) === currentCatId;
        const btnClass = isSelected
            ? 'bg-amber-600 text-white font-bold ring-2 ring-amber-300 shadow-sm'
            : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60';

        html += `
            <button type="button" data-select-category="${cat.id_category}" class="px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${btnClass}">
                <i class="fa-solid fa-utensils mr-1.5 opacity-70"></i> ${escapeHTML(cat.name)}
            </button>
        `;
    });

    list.innerHTML = html;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCategoryFilterModal() {
    const modal = document.getElementById('admin-food-category-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function updateFoodStatCardsUI() {
    const cards = document.querySelectorAll('#admin-foods-stats-container [data-food-filter]');
    if (!cards.length) return;

    let activeFilter = null;
    if (adminFoodsState.category) {
        activeFilter = 'categories';
    } else if (adminFoodsState.status === 'active' && !adminFoodsState.category) {
        activeFilter = 'active';
    } else if (adminFoodsState.status === 'inactive' && !adminFoodsState.category) {
        activeFilter = 'inactive';
    } else if (!adminFoodsState.status && !adminFoodsState.category) {
        activeFilter = 'all';
    }

    cards.forEach((card) => {
        const filter = card.dataset.foodFilter;
        const isActive = filter === activeFilter;

        card.classList.remove(
            'ring-2', 'ring-offset-2',
            'ring-slate-400', 'ring-green-500', 'ring-gray-600', 'ring-amber-500',
            'bg-slate-50', 'bg-green-50/60', 'bg-gray-100/60', 'bg-amber-50/60'
        );

        if (isActive) {
            card.classList.add('ring-2', 'ring-offset-2');
            if (filter === 'all') card.classList.add('ring-slate-400', 'bg-slate-50');
            if (filter === 'active') card.classList.add('ring-green-500', 'bg-green-50/60');
            if (filter === 'inactive') card.classList.add('ring-gray-600', 'bg-gray-100/60');
            if (filter === 'categories') card.classList.add('ring-amber-500', 'bg-amber-50/60');
        }
    });

    // Cập nhật hint text trên card danh mục nếu đang lọc danh mục
    const catHint = document.getElementById('admin-foods-category-hint');
    if (catHint) {
        if (adminFoodsState.category) {
            const currentCat = (adminFoodsState.categories || []).find((c) => String(c.id_category) === String(adminFoodsState.category));
            const catName = currentCat ? currentCat.name : 'Đã chọn';
            catHint.innerHTML = `<span class="text-amber-700 font-bold">Lọc: ${escapeHTML(catName)}</span> <i class="fa-solid fa-xmark text-[11px] text-red-500 hover:text-red-700 ml-1 cursor-pointer" title="Bỏ lọc"></i>`;
        } else {
            catHint.innerHTML = `<span>Lọc theo danh mục</span> <i class="fa-solid fa-filter text-[10px]"></i>`;
        }
    }
}

function renderFoodOptions() {
    const categoryFilter = document.getElementById('admin-foods-category-filter');
    const categoryInput = document.getElementById('admin-food-category');
    const filterValue = adminFoodsState.category;
    const inputValue = categoryInput?.value || '';
    const filterOptions = ['<option value="">Tất cả danh mục</option>']
        .concat(adminFoodsState.categories.map((category) => `<option value="${category.id_category}">${escapeHTML(category.name)}</option>`))
        .join('');
    const inputOptions = ['<option value="">Chọn danh mục</option>']
        .concat(adminFoodsState.categories.map((category) => `<option value="${category.id_category}">${escapeHTML(category.name)}</option>`))
        .join('');

    if (categoryFilter) {
        categoryFilter.innerHTML = filterOptions;
        categoryFilter.value = filterValue;
    }

    if (categoryInput) {
        categoryInput.innerHTML = inputOptions;
        categoryInput.value = inputValue;
    }
}

async function loadFoodOptions() {
    const res = await fetchAPI('/admin/foods/options');
    if (!res.success) {
        setFoodsAlert(res.message || 'Không thể tải danh mục/nguyên liệu.', 'error');
        return;
    }

    adminFoodsState.categories = res.data?.categories || [];
    adminFoodsState.ingredients = res.data?.ingredients || [];
    renderFoodOptions();
}

async function loadAdminFoods() {
    setFoodsAlert();
    setFoodsLoading();

    const params = new URLSearchParams({
        page: adminFoodsState.page,
        limit: adminFoodsState.limit
    });

    if (adminFoodsState.search) params.set('search', adminFoodsState.search);
    if (adminFoodsState.category) params.set('category', adminFoodsState.category);
    if (adminFoodsState.status) params.set('status', adminFoodsState.status);

    const res = await fetchAPI(`/admin/foods?${params.toString()}`);

    if (!res.success) {
        adminFoodsState.foods = [];
        renderFoodsTable([]);
        updateFoodsStats();
        updateFoodStatCardsUI();
        updateFoodsPagination({ page: 1, totalPages: 1, total: 0, hasMore: false });
        setFoodsAlert(res.message || 'Không thể tải danh sách món ăn.', 'error');
        return;
    }

    adminFoodsState.foods = res.data || [];
    renderFoodsTable(adminFoodsState.foods);
    updateFoodsStats(res.stats);
    updateFoodStatCardsUI();
    updateFoodsPagination(res.pagination);
}

function foodIngredientsText(food) {
    return (food?.ingredients || [])
        .map((item) => `${item.name} | ${item.quantity || 1} | ${item.note || ''} | ${item.unit || 'phần'}`)
        .join('\n');
}

function foodStepsText(food) {
    return (food?.steps || [])
        .sort((a, b) => a.step_number - b.step_number)
        .map((step) => step.instruction)
        .join('\n');
}

function openFoodModal(food = null) {
    adminFoodsState.editingId = food?.id_food || null;
    renderFoodOptions();

    document.getElementById('admin-food-name').value = food?.name || '';
    document.getElementById('admin-food-slug').value = food?.slug || '';
    document.getElementById('admin-food-category').value = food?.id_category || '';
    document.getElementById('admin-food-status').value = food?.status || 'active';
    document.getElementById('admin-food-time').value = food?.cooking_time || '';
    document.getElementById('admin-food-servings').value = food?.servings || '';
    document.getElementById('admin-food-image').value = food?.image_path || '';
    document.getElementById('admin-food-description').value = food?.description || '';
    document.getElementById('admin-food-ingredients').value = foodIngredientsText(food);
    document.getElementById('admin-food-steps').value = foodStepsText(food);

    const title = document.getElementById('admin-food-modal-title');
    if (title) title.textContent = food ? 'Sửa món ăn' : 'Thêm món ăn';

    const modal = document.getElementById('admin-food-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeFoodModal() {
    const modal = document.getElementById('admin-food-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    adminFoodsState.editingId = null;
}

async function saveFoodFromForm(event) {
    event.preventDefault();
    setFoodsAlert();

    const payload = {
        name: document.getElementById('admin-food-name').value.trim(),
        slug: document.getElementById('admin-food-slug').value.trim(),
        id_category: document.getElementById('admin-food-category').value,
        status: document.getElementById('admin-food-status').value,
        cooking_time: document.getElementById('admin-food-time').value,
        servings: document.getElementById('admin-food-servings').value,
        image: document.getElementById('admin-food-image').value.trim(),
        description: document.getElementById('admin-food-description').value.trim(),
        ingredients: document.getElementById('admin-food-ingredients').value,
        steps: document.getElementById('admin-food-steps').value
    };

    const isEditing = Boolean(adminFoodsState.editingId);
    const endpoint = isEditing ? `/admin/foods/${adminFoodsState.editingId}` : '/admin/foods';
    const method = isEditing ? 'PATCH' : 'POST';
    const res = await fetchAPI(endpoint, {
        method,
        body: JSON.stringify(payload)
    });

    if (!res.success) {
        setFoodsAlert(res.message || 'Không thể lưu món ăn.', 'error');
        Popup.error(res.message || 'Không thể lưu món ăn.');
        return;
    }

    closeFoodModal();
    setFoodsAlert(res.message || 'Đã lưu món ăn.');
    Popup.toast(res.message || 'Đã lưu thông tin món ăn thành công!', 'success');
    await loadAdminFoods();
}

async function openFoodDetail(id) {
    const modal = document.getElementById('admin-food-detail-modal');
    const body = document.getElementById('admin-food-detail-body');
    if (!modal || !body) return;

    body.innerHTML = '<p class="text-text-muted">Đang tải chi tiết...</p>';
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const res = await fetchAPI(`/admin/foods/${id}`);
    if (!res.success) {
        body.innerHTML = `<p class="text-red-600 font-semibold">${escapeHTML(res.message || 'Không thể tải chi tiết món ăn.')}</p>`;
        return;
    }

    const food = res.data;
    body.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-5 mb-5">
            <img src="${escapeHTML(food.image || `${BACKEND_URL}/images/foods/thit-kho-trung.jpg`)}" class="w-full sm:w-48 h-36 rounded-2xl object-cover bg-gray-100" alt="${escapeHTML(food.name)}">
            <div class="flex-1">
                <h4 class="text-xl font-bold text-text-main">${escapeHTML(food.name)}</h4>
                <p class="text-xs text-text-muted mt-1">${escapeHTML(food.slug)}</p>
                <div class="flex flex-wrap gap-2 mt-3">
                    ${foodStatusBadge(food.status)}
                    <span class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">${escapeHTML(food.category?.name || 'Chưa có danh mục')}</span>
                </div>
                <p class="text-text-muted mt-3">${escapeHTML(food.description || 'Chưa có mô tả.')}</p>
            </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">Thời gian</span><strong class="text-lg text-text-main">${food.cooking_time || '-'} phút</strong></div>
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">Khẩu phần</span><strong class="text-lg text-text-main">${food.servings || '-'} phần</strong></div>
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">Yêu thích</span><strong class="text-lg text-text-main">${food.stats?.favorites || 0}</strong></div>
            <div class="bg-gray-50 rounded-xl p-3"><span class="block text-xs text-text-muted">Bài viết</span><strong class="text-lg text-text-main">${food.stats?.posts || 0}</strong></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <h5 class="font-bold text-text-main mb-2">Nguyên liệu</h5>
                ${(food.ingredients || []).length ? food.ingredients.map((item) => `
                    <div class="border border-gray-100 rounded-xl p-3 mb-2">
                        <p class="font-semibold text-text-main">${escapeHTML(item.name)}</p>
                        <p class="text-xs text-text-muted">${escapeHTML(`${item.quantity || ''} ${item.unit || ''}`.trim())}${item.note ? ` · ${escapeHTML(item.note)}` : ''}</p>
                    </div>
                `).join('') : '<p class="text-text-muted">Chưa có nguyên liệu.</p>'}
            </div>
            <div>
                <h5 class="font-bold text-text-main mb-2">Các bước nấu</h5>
                ${(food.steps || []).length ? food.steps.map((step) => `
                    <div class="border border-gray-100 rounded-xl p-3 mb-2">
                        <p class="font-semibold text-text-main">Bước ${step.step_number}</p>
                        <p class="text-xs text-text-muted">${escapeHTML(step.instruction)}</p>
                    </div>
                `).join('') : '<p class="text-text-muted">Chưa có bước nấu.</p>'}
            </div>
        </div>
    `;
}

function closeFoodDetail() {
    const modal = document.getElementById('admin-food-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

async function changeFoodStatus(id, nextStatus) {
    const food = getFoodFromState(id);
    if (!food) return;

    const action = nextStatus === 'inactive' ? 'ẩn' : 'hiện';
    const isHide = nextStatus === 'inactive';

    const confirmed = await Popup.confirm({
        title: `Xác nhận ${action} món ăn`,
        message: `Bạn có chắc chắn muốn <strong>${action}</strong> món "<strong>${escapeHTML(food.name)}</strong>" không?`,
        type: isHide ? 'warning' : 'question',
        confirmText: isHide ? 'Ẩn món này' : 'Hiện món ăn',
        cancelText: 'Hủy bỏ',
        confirmButtonColor: isHide ? 'warning' : 'primary'
    });
    if (!confirmed) return;

    const res = await fetchAPI(`/admin/foods/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus })
    });

    if (!res.success) {
        setFoodsAlert(res.message || 'Không thể cập nhật trạng thái món ăn.', 'error');
        Popup.error(res.message || 'Không thể cập nhật trạng thái món ăn.');
        return;
    }

    setFoodsAlert(res.message || 'Đã cập nhật trạng thái món ăn.');
    Popup.toast(`Đã ${action} món "${food.name}" thành công!`, 'success');
    await loadAdminFoods();
}

function bindAdminFoodsEvents() {
    const search = document.getElementById('admin-foods-search');
    const category = document.getElementById('admin-foods-category-filter');
    const status = document.getElementById('admin-foods-status-filter');
    const refresh = document.getElementById('admin-foods-refresh');
    const add = document.getElementById('admin-food-add');
    const body = document.getElementById('admin-foods-body');
    const prev = document.getElementById('admin-foods-prev');
    const next = document.getElementById('admin-foods-next');
    const form = document.getElementById('admin-food-form');
    const statsContainer = document.getElementById('admin-foods-stats-container');

    // Click tương tác thẻ thống kê món ăn
    statsContainer?.addEventListener('click', (event) => {
        // Kiểm tra nếu bấm vào icon bỏ lọc danh mục
        if (event.target.closest('#admin-foods-category-hint .fa-xmark')) {
            event.stopPropagation();
            adminFoodsState.category = '';
            if (category) category.value = '';
            adminFoodsState.page = 1;
            updateFoodStatCardsUI();
            loadAdminFoods();
            return;
        }

        const card = event.target.closest('[data-food-filter]');
        if (!card) return;

        const filter = card.dataset.foodFilter;
        if (filter === 'all') {
            adminFoodsState.status = '';
            adminFoodsState.category = '';
            if (status) status.value = '';
            if (category) category.value = '';
            adminFoodsState.page = 1;
            updateFoodStatCardsUI();
            loadAdminFoods();
        } else if (filter === 'active') {
            adminFoodsState.status = 'active';
            adminFoodsState.category = '';
            if (status) status.value = 'active';
            if (category) category.value = '';
            adminFoodsState.page = 1;
            updateFoodStatCardsUI();
            loadAdminFoods();
        } else if (filter === 'inactive') {
            adminFoodsState.status = 'inactive';
            adminFoodsState.category = '';
            if (status) status.value = 'inactive';
            if (category) category.value = '';
            adminFoodsState.page = 1;
            updateFoodStatCardsUI();
            loadAdminFoods();
        } else if (filter === 'categories') {
            openCategoryFilterModal();
        }
    });

    // Lắng nghe chọn danh mục trong modal danh mục
    const catModalList = document.getElementById('admin-food-category-modal-list');
    catModalList?.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-select-category]');
        if (!btn) return;

        const catId = btn.dataset.selectCategory || '';
        adminFoodsState.category = catId;
        if (category) category.value = catId;
        adminFoodsState.page = 1;
        closeCategoryFilterModal();
        updateFoodStatCardsUI();
        loadAdminFoods();
    });

    document.getElementById('admin-food-category-modal-close')?.addEventListener('click', closeCategoryFilterModal);
    document.getElementById('admin-food-category-modal-cancel')?.addEventListener('click', closeCategoryFilterModal);
    document.getElementById('admin-food-category-modal-clear')?.addEventListener('click', () => {
        adminFoodsState.category = '';
        if (category) category.value = '';
        adminFoodsState.page = 1;
        closeCategoryFilterModal();
        updateFoodStatCardsUI();
        loadAdminFoods();
    });
    document.getElementById('admin-food-category-modal')?.addEventListener('click', (event) => {
        if (event.target.id === 'admin-food-category-modal') closeCategoryFilterModal();
    });

    let searchTimer = null;
    search?.addEventListener('input', () => {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(() => {
            adminFoodsState.search = search.value.trim();
            adminFoodsState.page = 1;
            loadAdminFoods();
        }, 300);
    });

    category?.addEventListener('change', () => {
        adminFoodsState.category = category.value;
        adminFoodsState.page = 1;
        updateFoodStatCardsUI();
        loadAdminFoods();
    });

    status?.addEventListener('change', () => {
        adminFoodsState.status = status.value;
        adminFoodsState.page = 1;
        updateFoodStatCardsUI();
        loadAdminFoods();
    });

    refresh?.addEventListener('click', () => loadAdminFoods());
    add?.addEventListener('click', () => openFoodModal());

    prev?.addEventListener('click', () => {
        if (adminFoodsState.page <= 1) return;
        adminFoodsState.page -= 1;
        loadAdminFoods();
    });

    next?.addEventListener('click', () => {
        adminFoodsState.page += 1;
        loadAdminFoods();
    });

    body?.addEventListener('click', (event) => {
        const button = event.target.closest('[data-food-action]');
        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.foodAction;

        if (action === 'view') openFoodDetail(id);
        if (action === 'edit') openFoodModal(getFoodFromState(id));
        if (action === 'status') changeFoodStatus(id, button.dataset.status);
    });

    form?.addEventListener('submit', saveFoodFromForm);
    document.getElementById('admin-food-modal-close')?.addEventListener('click', closeFoodModal);
    document.getElementById('admin-food-cancel')?.addEventListener('click', closeFoodModal);
    document.getElementById('admin-food-detail-close')?.addEventListener('click', closeFoodDetail);
    document.getElementById('admin-food-modal')?.addEventListener('click', (event) => {
        if (event.target.id === 'admin-food-modal') closeFoodModal();
    });
    document.getElementById('admin-food-detail-modal')?.addEventListener('click', (event) => {
        if (event.target.id === 'admin-food-detail-modal') closeFoodDetail();
    });
}

async function initAdminFoodsPage() {
    bindAdminFoodsEvents();
    await loadFoodOptions();
    updateFoodStatCardsUI();
    await loadAdminFoods();
}

// ==========================================
// 1. QUẢN LÝ KIỂM DUYỆT BÀI VIẾT (COMMUNITY POSTS)
// ==========================================

const adminCommunityState = {
    page: 1,
    limit: 10,
    search: '',
    status: '', // '' = Tất cả, 'pending' = Chờ duyệt, 'active' = Đã duyệt, 'hidden' = Đã từ chối / Đã ẩn
    posts: []
};

function renderCommunityPage() {
    const currentUser = getStoredAdminUser();
    const adminName = currentUser?.name || 'Admin';
    const adminAvatar = currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`;

    return `
        <header class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 class="text-2xl font-bold text-text-main flex items-center gap-2.5">
                    <i class="fa-solid fa-clipboard-check text-primary"></i>
                    <span>Kiểm duyệt bài viết cộng đồng</span>
                </h1>
                <p class="text-sm text-text-muted mt-1">Quy trình kiểm duyệt bài viết mới của người dùng (Chờ duyệt, Đã duyệt, Đã ẩn / Bị từ chối).</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-text-muted">Xin chào, <strong>${escapeHTML(adminName)}</strong></span>
                <img src="${escapeHTML(adminAvatar)}" class="w-10 h-10 rounded-full object-cover" alt="Admin">
            </div>
        </header>

        <!-- 4 Thẻ Thống Kê Quy Trình Duyệt Bài -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" id="admin-comm-stats-container">
            <div data-comm-filter="pending" class="admin-comm-stat-card bg-white rounded-2xl border border-amber-200/80 shadow-sm p-4.5 border-l-4 border-l-[#E59F3F] bg-amber-50/20 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem các bài viết đang chờ duyệt">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-[#C27E25] flex items-center gap-1.5">
                        <i class="fa-solid fa-hourglass-half"></i> Chờ kiểm duyệt
                    </p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-amber-300 group-hover:text-[#C27E25] group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-comm-stat-pending" class="block text-2xl font-black text-[#C27E25] mt-1.5">0</strong>
                <p class="text-[11px] text-[#C27E25]/80 mt-1">Bài viết mới cần admin phê duyệt</p>
            </div>

            <div data-comm-filter="active" class="admin-comm-stat-card bg-white rounded-2xl border border-green-200/80 shadow-sm p-4.5 border-l-4 border-l-green-600 bg-green-50/20 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem các bài viết đã duyệt thành công">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-green-700 flex items-center gap-1.5">
                        <i class="fa-solid fa-circle-check"></i> Đã duyệt thành công
                    </p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-green-300 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-comm-stat-active" class="block text-2xl font-black text-green-700 mt-1.5">0</strong>
                <p class="text-[11px] text-green-700/80 mt-1">Đang hiển thị công khai trên web</p>
            </div>

            <div data-comm-filter="hidden" class="admin-comm-stat-card bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4.5 border-l-4 border-l-stone-500 bg-stone-50/20 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem các bài viết đã từ chối hoặc bị ẩn">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-stone-600 flex items-center gap-1.5">
                        <i class="fa-solid fa-eye-slash"></i> Đã từ chối / Đã ẩn
                    </p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-gray-300 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-comm-stat-hidden" class="block text-2xl font-black text-stone-600 mt-1.5">0</strong>
                <p class="text-[11px] text-stone-500 mt-1">Bài viết không đạt tiêu chuẩn</p>
            </div>

            <div data-comm-filter="" class="admin-comm-stat-card bg-white rounded-2xl border border-gray-100 shadow-sm p-4.5 border-l-4 border-l-primary cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem tất cả bài viết">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Tổng tất cả bài viết</p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-comm-stat-total" class="block text-2xl font-black text-text-main mt-1.5">0</strong>
                <p class="text-[11px] text-text-muted mt-1">Toàn bộ bài viết trong hệ thống</p>
            </div>
        </div>

        <!-- Toolbar: Tabs Lọc Trạng Thái & Tìm Kiếm -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-3 rounded-2xl border border-gray-100 shadow-xs">
            <!-- Tabs lọc 3 quy trình chính -->
            <div class="flex flex-wrap items-center gap-2" id="admin-comm-tabs-container">
                <button type="button" data-comm-tab="" class="admin-comm-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 bg-[#245B43] text-white shadow-sm">
                    <i class="fa-solid fa-list"></i>
                    <span>Tất cả</span>
                    <span id="admin-comm-tab-all-badge" class="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-white/20 text-white">0</span>
                </button>
                <button type="button" data-comm-tab="pending" class="admin-comm-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 text-text-muted hover:bg-stone-100">
                    <i class="fa-solid fa-hourglass-half text-amber-500"></i>
                    <span>Chờ duyệt</span>
                    <span id="admin-comm-tab-pending-badge" class="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">0</span>
                </button>
                <button type="button" data-comm-tab="active" class="admin-comm-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 text-text-muted hover:bg-stone-100">
                    <i class="fa-solid fa-circle-check text-green-600"></i>
                    <span>Đã duyệt (Thành công)</span>
                    <span id="admin-comm-tab-active-badge" class="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-green-100 text-green-800">0</span>
                </button>
                <button type="button" data-comm-tab="hidden" class="admin-comm-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 text-text-muted hover:bg-stone-100">
                    <i class="fa-solid fa-eye-slash text-stone-500"></i>
                    <span>Đã từ chối / Đã ẩn</span>
                    <span id="admin-comm-tab-hidden-badge" class="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-stone-100 text-stone-700">0</span>
                </button>
            </div>

            <!-- Tìm kiếm & Tải lại -->
            <div class="flex items-center gap-2.5">
                <div class="relative flex-1 sm:flex-initial">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                    <input type="text" id="admin-community-search" placeholder="Tìm tiêu đề, tác giả..." class="pl-9 pr-3.5 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary w-full sm:w-60 transition">
                </div>

                <button type="button" id="admin-community-refresh" class="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-stone-50 text-text-muted hover:text-primary transition font-bold text-xs sm:text-sm cursor-pointer" title="Tải lại">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
        </div>

        <!-- Khung bảng danh sách bài viết -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-text-muted text-xs uppercase tracking-wider border-b border-gray-100">
                            <th class="p-4 font-bold whitespace-nowrap w-48 sm:w-56">Tác giả</th>
                            <th class="p-4 font-bold max-w-xs md:max-w-sm">Bài viết & Nội dung</th>
                            <th class="p-4 font-bold text-center whitespace-nowrap w-24">Tương tác</th>
                            <th class="p-4 font-bold text-center whitespace-nowrap w-36">Trạng thái</th>
                            <th class="p-4 font-bold text-right whitespace-nowrap w-36">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="admin-community-posts-body" class="divide-y divide-gray-100 text-sm">
                        <tr>
                            <td colspan="5" class="p-8 text-center text-text-muted">Đang tải dữ liệu bài viết...</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Phân trang -->
            <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-text-muted">
                <span id="admin-community-pagination-info">Hiển thị trang 1</span>
                <div class="flex items-center gap-2">
                    <button type="button" id="admin-community-prev" class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-stone-50 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed">
                        <i class="fa-solid fa-chevron-left"></i> Trước
                    </button>
                    <button type="button" id="admin-community-next" class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-stone-50 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed">
                        Sau <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal xem chi tiết bài viết -->
        <div id="admin-community-detail-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
            <div class="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-gray-100">
                <button type="button" id="admin-community-detail-close" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition cursor-pointer text-sm">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div id="admin-community-detail-content"></div>
            </div>
        </div>
    `;
}

function renderCommunityPostsTable(posts) {
    const tbody = document.getElementById('admin-community-posts-body');
    if (!tbody) return;

    if (!posts || posts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="p-10 text-center text-text-muted">
                    <div class="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3 text-lg">
                        <i class="fa-solid fa-folder-open"></i>
                    </div>
                    Không tìm thấy bài viết nào trong mục này.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = posts.map(p => {
        const isPending = p.status === 'pending';
        const isHidden = p.status === 'hidden';
        const isActive = p.status === 'active';

        // 1. Cột TRẠNG THÁI
        let statusBadgeHTML = '';
        if (isPending) {
            statusBadgeHTML = `<span class="bg-amber-100 text-[#C27E25] border border-amber-300 px-3 py-1 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 animate-pulse"><i class="fa-solid fa-hourglass-half text-[10px]"></i> Chờ duyệt</span>`;
        } else if (isHidden) {
            statusBadgeHTML = `
                <div class="inline-flex flex-col items-center">
                    <span class="bg-stone-100 text-stone-700 border border-stone-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                        <i class="fa-solid fa-eye-slash text-[10px]"></i> Đã ẩn / Từ chối
                    </span>
                    ${p.hidden_reason ? `<span class="text-[10px] text-rose-600 line-clamp-1 mt-0.5 max-w-32 text-center" title="${escapeHTML(p.hidden_reason)}">Lý do: ${escapeHTML(p.hidden_reason)}</span>` : ''}
                </div>
            `;
        } else {
            statusBadgeHTML = `<span class="bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><i class="fa-solid fa-check text-[10px]"></i> Đã duyệt</span>`;
        }

        const foodTag = p.food ? `<span class="inline-block mt-1 text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-bold"><i class="fa-solid fa-utensils text-[10px] mr-1 text-amber-600"></i>${escapeHTML(p.food.name)}</span>` : '';

        // 2. Cột THAO TÁC
        let approveBtnHTML = '';
        if (isPending) {
            approveBtnHTML = `
                <button type="button" class="w-8 h-8 rounded-lg text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition cursor-pointer text-xs" data-post-action="approve" data-id="${p.id_post}" title="Duyệt bài viết">
                    <i class="fa-solid fa-check text-sm"></i>
                </button>
            `;
        } else if (isHidden) {
            approveBtnHTML = `
                <button type="button" class="w-8 h-8 rounded-lg text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition cursor-pointer text-xs" data-post-action="approve" data-id="${p.id_post}" title="Duyệt lại bài viết">
                    <i class="fa-solid fa-rotate-left text-sm"></i>
                </button>
            `;
        }

        let hideBtnHTML = '';
        if (isPending) {
            hideBtnHTML = `
                <button type="button" class="w-8 h-8 rounded-lg text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer text-xs" data-post-action="reject" data-id="${p.id_post}" title="Từ chối bài viết">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            `;
        } else if (isActive) {
            hideBtnHTML = `
                <button type="button" class="w-8 h-8 rounded-lg text-amber-600 hover:bg-amber-50 flex items-center justify-center transition cursor-pointer text-xs" data-post-action="hide" data-id="${p.id_post}" title="Ẩn bài viết">
                    <i class="fa-solid fa-eye-slash"></i>
                </button>
            `;
        }

        return `
            <tr class="hover:bg-stone-50/70 transition border-b border-gray-100">
                <td class="p-4 align-top whitespace-nowrap">
                    <div class="flex items-center gap-3">
                        <img src="${escapeHTML(p.author?.avatar || '/images/users/default.png')}" class="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0" onerror="this.src='https://i.pravatar.cc/150?u=user'">
                        <div class="min-w-0">
                            <strong class="block text-text-main text-xs sm:text-sm font-bold truncate max-w-[130px] sm:max-w-[160px]">${escapeHTML(p.author?.name || 'Ẩn danh')}</strong>
                            <span class="block text-[11px] text-text-muted truncate max-w-[130px] sm:max-w-[160px]">${escapeHTML(p.author?.email || '')}</span>
                            <span class="block text-[10px] text-stone-400 mt-0.5">${formatDate(p.created_at)}</span>
                        </div>
                    </div>
                </td>
                <td class="p-4 align-top max-w-xs md:max-w-sm">
                    <div class="space-y-1">
                        <h4 class="font-bold text-text-main text-sm line-clamp-1 hover:text-primary transition cursor-pointer" data-post-action="view" data-id="${p.id_post}">${escapeHTML(p.title || 'Bài viết không tiêu đề')}</h4>
                        <p class="text-xs text-[#66736B] line-clamp-2 leading-relaxed">${escapeHTML(p.content || '')}</p>
                        ${foodTag}
                    </div>
                </td>
                <td class="p-4 align-top text-center whitespace-nowrap">
                    <div class="flex items-center justify-center gap-3 text-xs text-text-muted">
                        <span class="flex items-center gap-1 text-rose-500 font-bold"><i class="fa-solid fa-heart"></i> ${formatNumber(p.likes_count)}</span>
                        <span class="flex items-center gap-1 text-blue-500 font-bold"><i class="fa-solid fa-comment"></i> ${formatNumber(p.comments_count)}</span>
                    </div>
                </td>
                <td class="p-4 align-top text-center whitespace-nowrap">
                    ${statusBadgeHTML}
                </td>
                <td class="p-4 align-top text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                        <button type="button" class="w-8 h-8 rounded-lg text-blue-600 hover:bg-blue-50 flex items-center justify-center transition cursor-pointer text-xs" data-post-action="view" data-id="${p.id_post}" title="Xem chi tiết bài viết">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        ${approveBtnHTML}
                        ${hideBtnHTML}
                        <button type="button" class="w-8 h-8 rounded-lg text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer text-xs" data-post-action="delete" data-id="${p.id_post}" title="Xóa vĩnh viễn bài viết">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function loadAdminCommunityPosts() {
    const tbody = document.getElementById('admin-community-posts-body');
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-text-muted"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải dữ liệu bài viết...</td></tr>`;
    }

    const params = new URLSearchParams({
        page: adminCommunityState.page,
        limit: adminCommunityState.limit
    });

    if (adminCommunityState.search) params.append('search', adminCommunityState.search);
    if (adminCommunityState.status) params.append('status', adminCommunityState.status);

    const res = await fetchAPI(`/admin/posts?${params.toString()}`);
    if (!res || !res.success) {
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-rose-600 font-bold">${res?.message || 'Không thể tải danh sách bài viết.'}</td></tr>`;
        }
        return;
    }

    adminCommunityState.posts = res.data || [];
    renderCommunityPostsTable(adminCommunityState.posts);

    // Cập nhật số liệu các thẻ & badge tabs
    const pagination = res.pagination || {};
    const totalCount = pagination.allTotal ?? pagination.total ?? 0;
    const pendingCount = pagination.pendingTotal || 0;
    const activeCount = pagination.activeTotal || 0;
    const hiddenCount = pagination.hiddenTotal || 0;

    const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = formatNumber(val);
    };

    setText('admin-comm-stat-total', totalCount);
    setText('admin-comm-stat-pending', pendingCount);
    setText('admin-comm-stat-active', activeCount);
    setText('admin-comm-stat-hidden', hiddenCount);

    setText('admin-comm-tab-all-badge', totalCount);
    setText('admin-comm-tab-pending-badge', pendingCount);
    setText('admin-comm-tab-active-badge', activeCount);
    setText('admin-comm-tab-hidden-badge', hiddenCount);

    updateCommunityPagination(pagination);
    updateCommunityTabAndCardsUI();
}

function updateCommunityTabAndCardsUI() {
    // 1. Cập nhật active Tabs
    const tabBtns = document.querySelectorAll('.admin-comm-tab-btn');
    tabBtns.forEach(btn => {
        const tab = btn.dataset.commTab;
        const isActive = (tab === adminCommunityState.status);
        if (isActive) {
            btn.className = 'admin-comm-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 bg-[#245B43] text-white shadow-sm';
            const badge = btn.querySelector('span:last-child');
            if (badge) badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-white/25 text-white';
        } else {
            btn.className = 'admin-comm-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 text-text-muted hover:bg-stone-100';
            const badge = btn.querySelector('span:last-child');
            if (badge) {
                if (tab === 'pending') badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800';
                else if (tab === 'active') badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-green-100 text-green-800';
                else if (tab === 'hidden') badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-stone-100 text-stone-700';
                else badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-gray-100 text-gray-700';
            }
        }
    });

    // 2. Cập nhật active Stat Cards
    const cards = document.querySelectorAll('.admin-comm-stat-card');
    cards.forEach(card => {
        const filter = card.dataset.commFilter;
        const isActive = (filter === adminCommunityState.status);
        card.classList.remove('ring-2', 'ring-[#245B43]', 'ring-[#E59F3F]', 'ring-green-600', 'ring-stone-500', 'shadow-md', 'scale-[1.01]');
        if (isActive) {
            let ringColor = 'ring-[#245B43]';
            if (filter === 'pending') ringColor = 'ring-[#E59F3F]';
            if (filter === 'active') ringColor = 'ring-green-600';
            if (filter === 'hidden') ringColor = 'ring-stone-500';
            card.classList.add('ring-2', ringColor, 'shadow-md', 'scale-[1.01]');
        }
    });
}

function updateCommunityPagination(pagination = {}) {
    const prev = document.getElementById('admin-community-prev');
    const next = document.getElementById('admin-community-next');
    const info = document.getElementById('admin-community-pagination-info');

    const page = pagination.page || 1;
    const totalPages = pagination.totalPages || 1;
    const total = pagination.total || 0;

    if (info) {
        info.textContent = `Trang ${page} / ${totalPages} (Tổng ${total} bài viết)`;
    }

    if (prev) prev.disabled = page <= 1;
    if (next) next.disabled = page >= totalPages;
}

// Modal Prompt Hỏi Lý Do Ẩn Bài Viết
function askPostHideReason(postTitle = 'bài viết', isReject = false) {
    return new Promise((resolve) => {
        let modal = document.getElementById('admin-hide-reason-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'admin-hide-reason-modal';
            modal.className = 'fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-200';
            modal.innerHTML = `
                <div class="relative bg-[#FCFAF6] border border-[#E9D8B7] w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl">
                    <button type="button" id="admin-hide-reason-close" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition cursor-pointer text-sm">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center text-xl shrink-0 shadow-xs">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <div>
                            <span id="admin-hide-reason-badge" class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 mb-1">Kiểm duyệt bài viết</span>
                            <h3 id="admin-hide-reason-heading" class="text-lg font-extrabold text-[#26382F]">Lý do từ chối bài viết</h3>
                        </div>
                    </div>
                    <p class="text-xs text-[#66736B] leading-relaxed mb-4">
                        Vui lòng nêu rõ lý do <span id="admin-hide-reason-action-text">từ chối</span> bài viết "<strong id="admin-hide-reason-title"></strong>" để gửi phản hồi đến tác giả:
                    </p>
                    <div class="space-y-3">
                        <label class="block text-xs font-bold text-text-main">Chọn lý do phổ biến:</label>
                        <select id="admin-hide-reason-quick" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-rose-500 cursor-pointer">
                            <option value="Bài viết chứa nội dung không phù hợp">Bài viết chứa nội dung không phù hợp</option>
                            <option value="Vi phạm tiêu chuẩn cộng đồng">Vi phạm tiêu chuẩn cộng đồng</option>
                            <option value="Nội dung phản cảm, kích động hoặc từ ngữ không phù hợp">Nội dung phản cảm, kích động hoặc từ ngữ không phù hợp</option>
                            <option value="Spam hoặc quảng cáo không được phép">Spam hoặc quảng cáo không được phép</option>
                            <option value="Thông tin hoặc hình ảnh sai lệch, không đúng thực tế">Thông tin hoặc hình ảnh sai lệch, không đúng thực tế</option>
                            <option value="custom">Lý do khác (tự nhập bên dưới)...</option>
                        </select>
                        <label class="block text-xs font-bold text-text-main mt-2">Chi tiết lý do gửi tác giả:</label>
                        <textarea id="admin-hide-reason-text" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-rose-500 placeholder-stone-400" placeholder="Nhập lý do cụ thể..."></textarea>
                    </div>
                    <div class="mt-6 pt-4 border-t border-[#E9D8B7]/60 flex items-center justify-end gap-2.5">
                        <button type="button" id="admin-hide-reason-cancel" class="px-5 py-2.5 rounded-2xl bg-white hover:bg-stone-100 text-[#4A5550] border border-stone-200 font-bold text-xs sm:text-sm cursor-pointer transition">
                            Hủy bỏ
                        </button>
                        <button type="button" id="admin-hide-reason-confirm" class="px-5.5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-900/20 cursor-pointer transition">
                            <i class="fa-solid fa-xmark mr-1.5"></i>Từ chối bài viết
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const titleEl = document.getElementById('admin-hide-reason-title');
        const headingEl = document.getElementById('admin-hide-reason-heading');
        const badgeEl = document.getElementById('admin-hide-reason-badge');
        const actionTextEl = document.getElementById('admin-hide-reason-action-text');
        const quickSelect = document.getElementById('admin-hide-reason-quick');
        const textarea = document.getElementById('admin-hide-reason-text');
        const closeBtn = document.getElementById('admin-hide-reason-close');
        const cancelBtn = document.getElementById('admin-hide-reason-cancel');
        const confirmBtn = document.getElementById('admin-hide-reason-confirm');

        if (titleEl) titleEl.textContent = postTitle;
        if (headingEl) headingEl.textContent = isReject ? 'Lý do từ chối bài viết' : 'Lý do ẩn bài viết';
        if (badgeEl) badgeEl.textContent = isReject ? 'Từ chối kiểm duyệt' : 'Ẩn bài viết';
        if (actionTextEl) actionTextEl.textContent = isReject ? 'từ chối' : 'ẩn';
        if (confirmBtn) {
            confirmBtn.innerHTML = isReject
                ? '<i class="fa-solid fa-xmark mr-1.5"></i>Từ chối bài viết'
                : '<i class="fa-solid fa-eye-slash mr-1.5"></i>Ẩn bài viết';
        }

        const defaultReason = isReject ? 'Bài viết chứa nội dung không phù hợp' : 'Vi phạm tiêu chuẩn cộng đồng';
        if (quickSelect) quickSelect.value = defaultReason;
        if (textarea) textarea.value = defaultReason;

        quickSelect.onchange = () => {
            if (quickSelect.value === 'custom') {
                textarea.value = '';
                textarea.focus();
            } else {
                textarea.value = quickSelect.value;
            }
        };

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        const cleanup = (value) => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            resolve(value);
        };

        confirmBtn.onclick = () => {
            let reason = (textarea.value || '').trim();
            if (!reason || reason === 'custom') {
                reason = quickSelect.value !== 'custom' ? quickSelect.value : defaultReason;
            }
            cleanup(reason || defaultReason);
        };

        cancelBtn.onclick = () => cleanup(null);
        closeBtn.onclick = () => cleanup(null);
        modal.onclick = (e) => {
            if (e.target === modal) cleanup(null);
        };
    });
}

async function approveCommunityPost(id) {
    const post = adminCommunityState.posts.find(p => p.id_post == id);
    const postTitle = post?.title || `Bài viết #${id}`;

    const confirmed = await Popup.confirm({
        title: 'Xác nhận duyệt bài viết',
        message: `Bạn có chắc chắn muốn <strong>phê duyệt</strong> bài viết "<strong>${escapeHTML(postTitle)}</strong>" để hiển thị công khai trên cộng đồng không?`,
        type: 'question',
        confirmText: 'Duyệt bài ngay',
        cancelText: 'Hủy bỏ',
        confirmButtonColor: 'primary'
    });
    if (!confirmed) return;

    const res = await fetchAPI(`/admin/posts/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'active' })
    });

    if (!res || !res.success) {
        Popup.error(res?.message || 'Không thể phê duyệt bài viết lúc này.');
        return;
    }

    Popup.toast('Đã duyệt bài viết thành công!', 'success');
    await loadAdminCommunityPosts();
    updateSidebarBadges();
}

async function hideCommunityPost(id) {
    const post = adminCommunityState.posts.find(p => p.id_post == id);
    const postTitle = post?.title || `Bài viết #${id}`;
    const isPending = post?.status === 'pending';

    const reason = await askPostHideReason(postTitle, isPending);
    if (!reason) return;

    const res = await fetchAPI(`/admin/posts/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'hidden', hidden_reason: reason })
    });

    if (!res || !res.success) {
        Popup.error(res?.message || (isPending ? 'Không thể từ chối bài viết lúc này.' : 'Không thể ẩn bài viết lúc này.'));
        return;
    }

    Popup.toast(isPending ? `Đã từ chối bài viết. Lý do: "${reason}"` : `Đã ẩn bài viết. Lý do: "${reason}"`, 'success');
    await loadAdminCommunityPosts();
    updateSidebarBadges();
}

async function deleteCommunityPost(id) {
    const post = adminCommunityState.posts.find(p => p.id_post == id);
    const postTitle = post?.title || `Bài viết #${id}`;

    const confirmed = await Popup.confirm({
        title: 'Xóa vĩnh viễn bài viết',
        message: `Hành động này sẽ <strong>xóa vĩnh viễn</strong> bài viết "<strong>${escapeHTML(postTitle)}</strong>" và tất cả bình luận liên quan. Bạn có chắc chắn không?`,
        type: 'danger',
        confirmText: 'Xóa vĩnh viễn',
        cancelText: 'Hủy bỏ',
        confirmButtonColor: 'danger'
    });
    if (!confirmed) return;

    const res = await fetchAPI(`/admin/posts/${id}`, {
        method: 'DELETE'
    });

    if (!res || !res.success) {
        Popup.error(res?.message || 'Không thể xóa bài viết lúc này.');
        return;
    }

    Popup.toast('Đã xóa bài viết thành công!', 'success');
    await loadAdminCommunityPosts();
    updateSidebarBadges();
}

async function openCommunityDetailModal(id) {
    const modal = document.getElementById('admin-community-detail-modal');
    const content = document.getElementById('admin-community-detail-content');
    if (!modal || !content) return;

    content.innerHTML = `<div class="p-8 text-center text-text-muted"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải chi tiết bài viết...</div>`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const res = await fetchAPI(`/admin/posts/${id}`);
    if (!res || !res.success) {
        content.innerHTML = `<p class="text-center text-red-500 font-bold p-6">${res?.message || 'Không thể tải chi tiết bài viết.'}</p>`;
        return;
    }

    const post = res.data;
    let detailStatusBadge = '<span class="px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-800 font-bold">Chờ duyệt</span>';
    if (post.status === 'active') {
        detailStatusBadge = '<span class="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 font-bold">Đã duyệt (Hiển thị)</span>';
    } else if (post.status === 'hidden') {
        detailStatusBadge = '<span class="px-3 py-1 rounded-full text-xs bg-stone-100 text-stone-600 font-bold">Đã ẩn / Từ chối</span>';
    }

    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center gap-3">
                <img src="${escapeHTML(post.author?.avatar || '/images/users/default.png')}" class="w-12 h-12 rounded-full object-cover border border-gray-200">
                <div>
                    <h4 class="font-bold text-text-main text-base">${escapeHTML(post.author?.name || 'Ẩn danh')}</h4>
                    <span class="text-xs text-text-muted">${escapeHTML(post.author?.email || '')} • ${formatDate(post.created_at)}</span>
                </div>
            </div>

            <div class="pt-2">
                <h3 class="text-lg font-black text-text-main">${escapeHTML(post.title || '')}</h3>
                <p class="text-sm text-[#4A5550] leading-relaxed mt-2 whitespace-pre-line">${escapeHTML(post.content || '')}</p>
            </div>

            ${post.hidden_reason ? `
                <div class="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                    <strong class="font-black"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Lý do từ chối/ẩn:</strong> ${escapeHTML(post.hidden_reason)}
                </div>
            ` : ''}

            ${post.image ? `
                <div class="rounded-2xl overflow-hidden border border-gray-100 max-h-72">
                    <img src="${escapeHTML(post.image)}" class="w-full h-full object-cover" onerror="this.style.display='none'">
                </div>
            ` : ''}

            <div class="flex items-center gap-4 text-xs font-bold text-text-muted pt-2 border-t border-gray-100">
                <span class="flex items-center gap-1.5 text-rose-500"><i class="fa-solid fa-heart"></i> ${formatNumber(post.likes_count)} thích</span>
                <span class="flex items-center gap-1.5 text-blue-500"><i class="fa-solid fa-comment"></i> ${formatNumber(post.comments_count)} bình luận</span>
                <span class="ml-auto">${detailStatusBadge}</span>
            </div>
        </div>
    `;
}

function closeCommunityDetailModal() {
    const modal = document.getElementById('admin-community-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function bindAdminCommunityEvents() {
    const search = document.getElementById('admin-community-search');
    const refresh = document.getElementById('admin-community-refresh');
    const prev = document.getElementById('admin-community-prev');
    const next = document.getElementById('admin-community-next');
    const postsBody = document.getElementById('admin-community-posts-body');
    const modalClose = document.getElementById('admin-community-detail-close');
    const modal = document.getElementById('admin-community-detail-modal');

    // Chuyển Tabs (Tất cả, Chờ duyệt, Đã duyệt, Đã ẩn)
    const tabsContainer = document.getElementById('admin-comm-tabs-container');
    tabsContainer?.addEventListener('click', (e) => {
        const btn = e.target.closest('.admin-comm-tab-btn');
        if (!btn) return;
        adminCommunityState.status = btn.dataset.commTab || '';
        adminCommunityState.page = 1;
        loadAdminCommunityPosts();
    });

    // Click thẻ thống kê -> Lọc theo tab tương ứng
    const statsContainer = document.getElementById('admin-comm-stats-container');
    statsContainer?.addEventListener('click', (e) => {
        const card = e.target.closest('.admin-comm-stat-card');
        if (!card) return;
        adminCommunityState.status = card.dataset.commFilter || '';
        adminCommunityState.page = 1;
        loadAdminCommunityPosts();
    });

    // Tìm kiếm
    let searchTimer = null;
    search?.addEventListener('input', () => {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(() => {
            adminCommunityState.search = search.value.trim();
            adminCommunityState.page = 1;
            loadAdminCommunityPosts();
        }, 300);
    });

    // Tải lại
    refresh?.addEventListener('click', () => {
        loadAdminCommunityPosts();
    });

    // Phân trang
    prev?.addEventListener('click', () => {
        if (adminCommunityState.page <= 1) return;
        adminCommunityState.page -= 1;
        loadAdminCommunityPosts();
    });

    next?.addEventListener('click', () => {
        adminCommunityState.page += 1;
        loadAdminCommunityPosts();
    });

    // Thao tác trên từng dòng bài viết
    postsBody?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-post-action]');
        if (!btn) return;

        const id = btn.dataset.id;
        const action = btn.dataset.postAction;

        if (action === 'view') openCommunityDetailModal(id);
        if (action === 'approve') approveCommunityPost(id);
        if (action === 'hide' || action === 'reject') hideCommunityPost(id);
        if (action === 'delete') deleteCommunityPost(id);
    });

    // Đóng Modal
    modalClose?.addEventListener('click', closeCommunityDetailModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeCommunityDetailModal();
    });
}

async function initAdminCommunityPage() {
    bindAdminCommunityEvents();
    await loadAdminCommunityPosts();
    updateSidebarBadges();
}

// ==========================================
// 2. QUẢN LÝ BÁO CÁO VI PHẠM (REPORTS)
// ==========================================

const adminReportsState = {
    page: 1,
    limit: 10,
    search: '',
    status: '', // '' = Tất cả, 'pending' = Chờ xử lý, 'handled' = Đã giải quyết (resolved/rejected)
    targetType: '', // '' = Tất cả, 'post' = Bài viết, 'comment' = Bình luận
    reports: []
};

function renderReportsPage() {
    const currentUser = getStoredAdminUser();
    const adminName = currentUser?.name || 'Admin';
    const adminAvatar = currentUser?.avatar || `${BACKEND_URL}/images/users/admin.jpg`;

    return `
        <header class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 class="text-2xl font-bold text-text-main flex items-center gap-2.5">
                    <i class="fa-solid fa-triangle-exclamation text-rose-500"></i>
                    <span>Quản lý Báo cáo vi phạm</span>
                </h1>
                <p class="text-sm text-text-muted mt-1">Xử lý các bài viết hoặc bình luận bị người dùng tố cáo vi phạm tiêu chuẩn cộng đồng.</p>
            </div>
            <div class="flex items-center gap-4">
                <span class="text-text-muted">Xin chào, <strong>${escapeHTML(adminName)}</strong></span>
                <img src="${escapeHTML(adminAvatar)}" class="w-10 h-10 rounded-full object-cover" alt="Admin">
            </div>
        </header>

        <!-- 4 Thẻ Thống Kê Vi Phạm -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" id="admin-rep-stats-container">
            <div data-rep-filter="pending" class="admin-rep-stat-card bg-white rounded-2xl border border-amber-200 shadow-sm p-4.5 border-l-4 border-l-amber-500 bg-amber-50/20 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem các báo cáo chờ xử lý">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-amber-700 flex items-center gap-1.5">
                        <i class="fa-solid fa-hourglass-half"></i> Chờ xử lý
                    </p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-amber-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-rep-stat-pending" class="block text-2xl font-black text-amber-600 mt-1.5">0</strong>
                <p class="text-[11px] text-amber-700/80 mt-1">Cần Admin kiểm tra & đưa ra quyết định</p>
            </div>

            <div data-rep-filter="resolved" class="admin-rep-stat-card bg-white rounded-2xl border border-green-200 shadow-sm p-4.5 border-l-4 border-l-green-600 bg-green-50/20 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem các báo cáo đã giải quyết">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-green-700 flex items-center gap-1.5">
                        <i class="fa-solid fa-circle-check"></i> Đã giải quyết
                    </p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-green-300 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-rep-stat-resolved" class="block text-2xl font-black text-green-700 mt-1.5">0</strong>
                <p class="text-[11px] text-green-700/80 mt-1">Đã xử lý (ẩn nội dung hoặc xác nhận)</p>
            </div>

            <div data-rep-filter="rejected" class="admin-rep-stat-card bg-white rounded-2xl border border-stone-200 shadow-sm p-4.5 border-l-4 border-l-stone-500 bg-stone-50/20 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem các báo cáo đã bỏ qua">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-stone-600 flex items-center gap-1.5">
                        <i class="fa-solid fa-ban"></i> Đã bỏ qua / Bác bỏ
                    </p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-stone-300 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-rep-stat-rejected" class="block text-2xl font-black text-stone-600 mt-1.5">0</strong>
                <p class="text-[11px] text-stone-500 mt-1">Đánh giá nội dung không vi phạm</p>
            </div>

            <div data-rep-filter="" class="admin-rep-stat-card bg-white rounded-2xl border border-gray-100 shadow-sm p-4.5 border-l-4 border-l-primary cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all select-none group" title="Xem tất cả báo cáo">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Tổng số báo cáo</p>
                    <i class="fa-solid fa-arrow-right text-[10px] text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all"></i>
                </div>
                <strong id="admin-rep-stat-total" class="block text-2xl font-black text-text-main mt-1.5">0</strong>
                <p class="text-[11px] text-text-muted mt-1">Toàn bộ báo cáo đã ghi nhận</p>
            </div>
        </div>

        <!-- Toolbar: Tabs Lọc & Bộ Lọc Đối Tượng -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-3 rounded-2xl border border-gray-100 shadow-xs">
            <!-- Tabs lọc 3 quy trình báo cáo -->
            <div class="flex flex-wrap items-center gap-2" id="admin-rep-tabs-container">
                <button type="button" data-rep-tab="" class="admin-rep-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 bg-[#245B43] text-white shadow-sm">
                    <i class="fa-solid fa-list"></i>
                    <span>Tất cả báo cáo</span>
                    <span id="admin-rep-tab-all-badge" class="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-white/20 text-white">0</span>
                </button>
                <button type="button" data-rep-tab="pending" class="admin-rep-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 text-text-muted hover:bg-stone-100">
                    <i class="fa-solid fa-hourglass-half text-amber-500"></i>
                    <span>Chờ xử lý</span>
                    <span id="admin-rep-tab-pending-badge" class="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">0</span>
                </button>
                <button type="button" data-rep-tab="handled" class="admin-rep-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 text-text-muted hover:bg-stone-100">
                    <i class="fa-solid fa-check-double text-green-600"></i>
                    <span>Đã giải quyết</span>
                    <span id="admin-rep-tab-resolved-badge" class="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-green-100 text-green-800">0</span>
                </button>
            </div>

            <!-- Bộ lọc đối tượng & Tìm kiếm -->
            <div class="flex flex-wrap items-center gap-2.5">
                <select id="admin-reports-target-filter" class="px-3 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary bg-white cursor-pointer font-medium">
                    <option value="">Tất cả đối tượng</option>
                    <option value="post">Chỉ bài viết</option>
                    <option value="comment">Chỉ bình luận</option>
                </select>

                <div class="relative">
                    <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                    <input type="text" id="admin-reports-search" placeholder="Tìm theo lý do, người báo..." class="pl-9 pr-3.5 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-primary w-44 sm:w-56 transition">
                </div>

                <button type="button" id="admin-reports-refresh" class="px-3.5 py-2 rounded-xl border border-gray-200 hover:bg-stone-50 text-text-muted hover:text-primary transition font-bold text-xs sm:text-sm cursor-pointer" title="Tải lại">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
        </div>

        <!-- Khung bảng danh sách báo cáo -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-rose-50/50 text-rose-900 text-xs uppercase tracking-wider border-b border-rose-100">
                            <th class="p-4 font-bold max-w-xs md:max-w-sm">Nội dung bị tố cáo</th>
                            <th class="p-4 font-bold whitespace-nowrap w-44">Tác giả nội dung</th>
                            <th class="p-4 font-bold whitespace-nowrap">Người báo cáo & Lý do</th>
                            <th class="p-4 font-bold whitespace-nowrap w-28 text-center">Thời gian</th>
                            <th class="p-4 font-bold text-center whitespace-nowrap w-32">Xử lý</th>
                            <th class="p-4 font-bold text-right whitespace-nowrap w-36">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody id="admin-reports-body" class="divide-y divide-gray-100 text-sm">
                        <tr>
                            <td colspan="6" class="p-8 text-center text-text-muted">Đang tải danh sách báo cáo vi phạm...</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Phân trang -->
            <div class="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-text-muted">
                <span id="admin-reports-pagination-info">Hiển thị trang 1</span>
                <div class="flex items-center gap-2">
                    <button type="button" id="admin-reports-prev" class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-stone-50 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed">
                        <i class="fa-solid fa-chevron-left"></i> Trước
                    </button>
                    <button type="button" id="admin-reports-next" class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-stone-50 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed">
                        Sau <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal chi tiết báo cáo vi phạm -->
        <div id="admin-report-detail-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
            <div class="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-gray-100">
                <button type="button" id="admin-report-detail-close" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition cursor-pointer text-sm">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div id="admin-report-detail-content"></div>
            </div>
        </div>
    `;
}

function renderReportsTable(reports) {
    const tbody = document.getElementById('admin-reports-body');
    if (!tbody) return;

    if (!reports || reports.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="p-10 text-center text-text-muted">
                    <div class="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-3 text-lg">
                        <i class="fa-solid fa-shield-check"></i>
                    </div>
                    Tuyệt vời! Không có báo cáo vi phạm nào phù hợp với bộ lọc.
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = reports.map(r => {
        const isPost = (r.target_type === 'post');
        const targetData = isPost ? (r.post || {}) : (r.comment || {});
        const isHidden = (targetData.status === 'hidden');

        // Phân loại tag
        const typeBadge = isPost
            ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 shrink-0"><i class="fa-solid fa-newspaper text-[10px]"></i> Bài viết #${r.target_id}</span>`
            : `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 shrink-0"><i class="fa-solid fa-comment-dots text-[10px]"></i> Bình luận #${r.target_id}</span>`;

        // Trạng thái nội dung
        const contentStatusBadge = isHidden
            ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200 shrink-0">Đã ẩn</span>`
            : `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200 shrink-0">Hiển thị</span>`;

        // Tiêu đề & nội dung bị tố cáo
        let titleHTML = '';
        let snippetText = '';
        if (isPost) {
            titleHTML = escapeHTML(r.post?.title || `Bài viết #${r.target_id}`);
            snippetText = escapeHTML(r.post?.content || '(Không có nội dung)');
        } else {
            titleHTML = `Bình luận trong: "${escapeHTML(r.comment?.post_title || 'Bài viết')}"`;
            snippetText = escapeHTML(r.comment?.content || '(Không có nội dung)');
        }

        // Tác giả nội dung
        const author = targetData.author || {};

        // Trạng thái xử lý báo cáo
        let statusBadge = '<span class="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 animate-pulse"><i class="fa-solid fa-hourglass-half text-[10px]"></i> Chờ xử lý</span>';
        if (r.status === 'resolved') {
            statusBadge = '<span class="bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><i class="fa-solid fa-circle-check text-[10px]"></i> Đã giải quyết</span>';
        } else if (r.status === 'rejected') {
            statusBadge = '<span class="bg-stone-100 text-stone-600 border border-stone-300 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><i class="fa-solid fa-ban text-[10px]"></i> Đã bỏ qua</span>';
        }

        return `
            <tr class="hover:bg-rose-50/30 transition border-b border-gray-100">
                <td class="p-4 align-top max-w-xs md:max-w-sm">
                    <div class="space-y-1.5">
                        <div class="flex items-center gap-2">
                            ${typeBadge}
                            ${contentStatusBadge}
                        </div>
                        <h4 class="font-bold text-text-main text-sm line-clamp-1 hover:text-primary transition cursor-pointer" data-rep-action="view" data-id="${r.id_report}">
                            ${titleHTML}
                        </h4>
                        <p class="text-xs text-[#66736B] line-clamp-2 leading-relaxed">${snippetText}</p>
                    </div>
                </td>
                <td class="p-4 align-top whitespace-nowrap">
                    <div class="flex items-center gap-2.5">
                        <img src="${escapeHTML(author.avatar || '/images/users/default.png')}" class="w-8 h-8 rounded-full object-cover border border-gray-200" onerror="this.src='https://i.pravatar.cc/150?u=user'">
                        <div class="min-w-0">
                            <span class="block text-xs font-bold text-text-main truncate max-w-32">${escapeHTML(author.name || 'Tác giả')}</span>
                            <span class="block text-[10px] text-text-muted truncate max-w-32">${escapeHTML(author.email || '')}</span>
                        </div>
                    </div>
                </td>
                <td class="p-4 align-top">
                    <div>
                        <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 mb-1">
                            ${escapeHTML(r.reason || 'Vi phạm tiêu chuẩn')}
                        </span>
                        <p class="text-xs text-text-muted line-clamp-1 italic">${escapeHTML(r.description || 'Không có mô tả')}</p>
                        <span class="text-[10px] text-stone-400">Báo bởi: <strong>${escapeHTML(r.reporter?.name || 'Ẩn danh')}</strong></span>
                    </div>
                </td>
                <td class="p-4 align-top text-xs text-text-muted whitespace-nowrap text-center">
                    ${formatDate(r.created_at)}
                </td>
                <td class="p-4 align-top text-center whitespace-nowrap">
                    ${statusBadge}
                </td>
                <td class="p-4 align-top text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                        <button type="button" class="w-8 h-8 rounded-lg text-blue-600 hover:bg-blue-50 flex items-center justify-center transition cursor-pointer text-xs" data-rep-action="view" data-id="${r.id_report}" title="Xem chi tiết báo cáo">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        ${!isHidden ? `
                            <button type="button" class="w-8 h-8 rounded-lg text-amber-600 hover:bg-amber-50 flex items-center justify-center transition cursor-pointer text-xs" data-rep-action="hide-content" data-id="${r.id_report}" title="Ẩn nội dung vi phạm">
                                <i class="fa-solid fa-eye-slash"></i>
                            </button>
                        ` : `
                            <button type="button" class="w-8 h-8 rounded-lg text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition cursor-pointer text-xs" data-rep-action="restore-content" data-id="${r.id_report}" title="Khôi phục hiển thị">
                                <i class="fa-solid fa-rotate-left"></i>
                            </button>
                        `}
                        ${r.status === 'pending' ? `
                            <button type="button" class="w-8 h-8 rounded-lg text-stone-600 hover:bg-stone-100 flex items-center justify-center transition cursor-pointer text-xs" data-rep-action="reject" data-id="${r.id_report}" title="Bác bỏ / Bỏ qua">
                                <i class="fa-solid fa-ban"></i>
                            </button>
                            <button type="button" class="w-8 h-8 rounded-lg text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition cursor-pointer text-xs" data-rep-action="resolve" data-id="${r.id_report}" title="Đánh dấu đã giải quyết">
                                <i class="fa-solid fa-check text-sm"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

async function loadAdminReports() {
    const tbody = document.getElementById('admin-reports-body');
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-text-muted"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải danh sách báo cáo vi phạm...</td></tr>`;
    }

    const params = new URLSearchParams({
        page: adminReportsState.page,
        limit: adminReportsState.limit
    });

    if (adminReportsState.search) params.append('search', adminReportsState.search);
    if (adminReportsState.status) params.append('status', adminReportsState.status);
    if (adminReportsState.targetType) params.append('target_type', adminReportsState.targetType);

    const res = await fetchAPI(`/admin/reports?${params.toString()}`);
    if (!res || !res.success) {
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-rose-600 font-bold">${res?.message || 'Không thể tải danh sách báo cáo vi phạm.'}</td></tr>`;
        }
        return;
    }

    adminReportsState.reports = res.data || [];
    renderReportsTable(adminReportsState.reports);

    const pagination = res.pagination || {};
    const totalCount = pagination.allTotal ?? pagination.total ?? 0;
    const pendingCount = pagination.pendingTotal || 0;
    const resolvedCount = pagination.resolvedTotal || 0;
    const rejectedCount = pagination.rejectedTotal || 0;

    const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = formatNumber(val);
    };

    setText('admin-rep-stat-total', totalCount);
    setText('admin-rep-stat-pending', pendingCount);
    setText('admin-rep-stat-resolved', resolvedCount);
    setText('admin-rep-stat-rejected', rejectedCount);

    setText('admin-rep-tab-all-badge', totalCount);
    setText('admin-rep-tab-pending-badge', pendingCount);
    setText('admin-rep-tab-resolved-badge', resolvedCount + rejectedCount);

    updateReportsPagination(pagination);
    updateReportsTabAndCardsUI();
}

function updateReportsTabAndCardsUI() {
    // 1. Cập nhật active Tabs
    const tabBtns = document.querySelectorAll('.admin-rep-tab-btn');
    tabBtns.forEach(btn => {
        const tab = btn.dataset.repTab;
        const isActive = (tab === adminReportsState.status);
        if (isActive) {
            btn.className = 'admin-rep-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 bg-[#245B43] text-white shadow-sm';
            const badge = btn.querySelector('span:last-child');
            if (badge) badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-white/25 text-white';
        } else {
            btn.className = 'admin-rep-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 text-text-muted hover:bg-stone-100';
            const badge = btn.querySelector('span:last-child');
            if (badge) {
                if (tab === 'pending') badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800';
                else if (tab === 'handled') badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-green-100 text-green-800';
                else badge.className = 'px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-gray-100 text-gray-700';
            }
        }
    });

    // 2. Cập nhật active Stat Cards
    const cards = document.querySelectorAll('.admin-rep-stat-card');
    cards.forEach(card => {
        const filter = card.dataset.repFilter;
        let isActive = (filter === adminReportsState.status);
        if (adminReportsState.status === 'handled' && (filter === 'resolved' || filter === 'rejected')) {
            isActive = true;
        }

        card.classList.remove('ring-2', 'ring-[#245B43]', 'ring-amber-500', 'ring-green-600', 'ring-stone-500', 'shadow-md', 'scale-[1.01]');
        if (isActive) {
            let ringColor = 'ring-[#245B43]';
            if (filter === 'pending') ringColor = 'ring-amber-500';
            if (filter === 'resolved') ringColor = 'ring-green-600';
            if (filter === 'rejected') ringColor = 'ring-stone-500';
            card.classList.add('ring-2', ringColor, 'shadow-md', 'scale-[1.01]');
        }
    });
}

function updateReportsPagination(pagination = {}) {
    const prev = document.getElementById('admin-reports-prev');
    const next = document.getElementById('admin-reports-next');
    const info = document.getElementById('admin-reports-pagination-info');

    const page = pagination.page || 1;
    const totalPages = pagination.totalPages || 1;
    const total = pagination.total || 0;

    if (info) {
        info.textContent = `Trang ${page} / ${totalPages} (Tổng ${total} báo cáo)`;
    }

    if (prev) prev.disabled = page <= 1;
    if (next) next.disabled = page >= totalPages;
}

async function handleReportAction(reportId, action) {
    const report = adminReportsState.reports.find(r => r.id_report == reportId);
    if (!report) return;

    if (action === 'hide-content') {
        const isPost = (report.target_type === 'post');
        const confirmed = await Popup.confirm({
            title: `Ẩn ${isPost ? 'bài viết' : 'bình luận'} vi phạm`,
            message: `Bạn có chắc muốn <strong>ẩn nội dung</strong> này và đánh dấu báo cáo là <strong>Đã giải quyết</strong>?`,
            type: 'warning',
            confirmText: 'Ẩn & Giải quyết',
            cancelText: 'Hủy bỏ'
        });
        if (!confirmed) return;

        const res = await fetchAPI(`/admin/reports/${reportId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'resolved', action: 'hide' })
        });

        if (res?.success) {
            Popup.toast(`Đã ẩn ${isPost ? 'bài viết' : 'bình luận'} và giải quyết báo cáo!`, 'success');
            await loadAdminReports();
            updateSidebarBadges();
        } else {
            Popup.error(res?.message || 'Không thể xử lý báo cáo.');
        }
    } else if (action === 'restore-content') {
        const isPost = (report.target_type === 'post');
        const confirmed = await Popup.confirm({
            title: `Khôi phục ${isPost ? 'bài viết' : 'bình luận'}`,
            message: `Khôi phục hiển thị công khai cho nội dung này?`,
            type: 'question',
            confirmText: 'Khôi phục ngay',
            cancelText: 'Hủy bỏ'
        });
        if (!confirmed) return;

        const res = await fetchAPI(`/admin/reports/${reportId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'resolved', action: 'restore' })
        });

        if (res?.success) {
            Popup.toast('Đã khôi phục hiển thị nội dung thành công!', 'success');
            await loadAdminReports();
            updateSidebarBadges();
        } else {
            Popup.error(res?.message || 'Không thể khôi phục nội dung.');
        }
    } else if (action === 'reject') {
        const confirmed = await Popup.confirm({
            title: 'Bác bỏ / Bỏ qua báo cáo',
            message: 'Đánh dấu báo cáo này là không vi phạm tiêu chuẩn?',
            type: 'question',
            confirmText: 'Bỏ qua báo cáo',
            cancelText: 'Hủy bỏ'
        });
        if (!confirmed) return;

        const res = await fetchAPI(`/admin/reports/${reportId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'rejected' })
        });

        if (res?.success) {
            Popup.toast('Đã bác bỏ báo cáo vi phạm.', 'info');
            await loadAdminReports();
            updateSidebarBadges();
        } else {
            Popup.error(res?.message || 'Không thể cập nhật báo cáo.');
        }
    } else if (action === 'resolve') {
        const res = await fetchAPI(`/admin/reports/${reportId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'resolved' })
        });

        if (res?.success) {
            Popup.toast('Đã đánh dấu báo cáo là Đã giải quyết.', 'success');
            await loadAdminReports();
            updateSidebarBadges();
        } else {
            Popup.error(res?.message || 'Không thể cập nhật báo cáo.');
        }
    }
}

async function openReportDetailModal(id) {
    const modal = document.getElementById('admin-report-detail-modal');
    const content = document.getElementById('admin-report-detail-content');
    if (!modal || !content) return;

    const report = adminReportsState.reports.find(r => r.id_report == id);
    if (!report) {
        content.innerHTML = `<p class="text-center text-red-500 p-6">Không tìm thấy thông tin báo cáo.</p>`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        return;
    }

    const isPost = (report.target_type === 'post');
    const targetData = isPost ? (report.post || {}) : (report.comment || {});
    const author = targetData.author || {};
    const isHidden = (targetData.status === 'hidden');

    content.innerHTML = `
        <div class="space-y-5">
            <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                <div class="flex items-center gap-2.5 text-rose-600 font-bold text-base">
                    <i class="fa-solid fa-triangle-exclamation text-lg"></i>
                    <span>Chi tiết Báo Cáo Vi Phạm #${report.id_report}</span>
                </div>
                <span class="text-xs text-stone-400 font-medium">${formatDate(report.created_at)}</span>
            </div>

            <!-- Khối 1: Thông tin người báo cáo & lý do -->
            <div class="p-4.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black uppercase text-rose-800 tracking-wide">Thông tin tố cáo</span>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-200 text-rose-900">${escapeHTML(report.reason)}</span>
                </div>
                <p class="text-xs text-rose-800 leading-relaxed">${escapeHTML(report.description || 'Không có mô tả chi tiết')}</p>
                <div class="pt-2 border-t border-rose-200/60 flex items-center gap-2.5">
                    <img src="${escapeHTML(report.reporter?.avatar || '/images/users/default.png')}" class="w-7 h-7 rounded-full object-cover border border-rose-200">
                    <span class="text-xs text-stone-700">Người báo cáo: <strong>${escapeHTML(report.reporter?.name || 'Ẩn danh')}</strong> (${escapeHTML(report.reporter?.email || '')})</span>
                </div>
            </div>

            <!-- Khối 2: Nội dung bị tố cáo -->
            <div class="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-black uppercase text-stone-600 tracking-wide flex items-center gap-1.5">
                        <i class="fa-solid ${isPost ? 'fa-newspaper' : 'fa-comment-dots'} text-primary"></i>
                        Đối tượng bị tố cáo: ${isPost ? 'Bài viết' : 'Bình luận'}
                    </span>
                    <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${isHidden ? 'bg-stone-200 text-stone-700' : 'bg-green-100 text-green-700'}">
                        ${isHidden ? 'Đang bị ẩn' : 'Đang hiển thị'}
                    </span>
                </div>

                <div class="flex items-center gap-2.5">
                    <img src="${escapeHTML(author.avatar || '/images/users/default.png')}" class="w-8 h-8 rounded-full object-cover border border-gray-200">
                    <div>
                        <strong class="block text-xs text-text-main">${escapeHTML(author.name || 'Tác giả')}</strong>
                        <span class="block text-[11px] text-text-muted">${escapeHTML(author.email || '')}</span>
                    </div>
                </div>

                ${isPost ? `
                    <div class="pt-2">
                        <h4 class="font-bold text-text-main text-base">${escapeHTML(report.post?.title || '')}</h4>
                        <p class="text-xs text-[#4A5550] mt-1.5 whitespace-pre-line leading-relaxed">${escapeHTML(report.post?.content || '')}</p>
                        ${report.post?.image ? `
                            <img src="${escapeHTML(report.post.image)}" class="w-full max-h-56 object-cover rounded-xl mt-3 border border-gray-200" onerror="this.style.display='none'">
                        ` : ''}
                    </div>
                ` : `
                    <div class="pt-2">
                        <span class="text-[11px] text-stone-500 font-semibold block mb-1">Thuộc bài viết: <strong>${escapeHTML(report.comment?.post_title || '')}</strong></span>
                        <div class="p-3 bg-white rounded-xl border border-stone-200 text-xs text-[#4A5550] leading-relaxed">
                            "${escapeHTML(report.comment?.content || '')}"
                        </div>
                    </div>
                `}
            </div>

            <!-- Khối 3: Thao tác xử lý nhanh -->
            <div class="pt-2 flex flex-wrap items-center justify-end gap-2.5 border-t border-gray-100">
                ${!isHidden ? `
                    <button type="button" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition cursor-pointer" onclick="window.__adminReportAction(${report.id_report}, 'hide-content')">
                        <i class="fa-solid fa-eye-slash mr-1"></i> Ẩn nội dung & Giải quyết
                    </button>
                ` : `
                    <button type="button" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer" onclick="window.__adminReportAction(${report.id_report}, 'restore-content')">
                        <i class="fa-solid fa-rotate-left mr-1"></i> Khôi phục hiển thị
                    </button>
                `}
                ${report.status === 'pending' ? `
                    <button type="button" class="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition cursor-pointer" onclick="window.__adminReportAction(${report.id_report}, 'reject')">
                        <i class="fa-solid fa-ban mr-1"></i> Bỏ qua báo cáo
                    </button>
                    <button type="button" class="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition cursor-pointer" onclick="window.__adminReportAction(${report.id_report}, 'resolve')">
                        <i class="fa-solid fa-check mr-1"></i> Đã giải quyết
                    </button>
                ` : ''}
                <button type="button" class="px-4 py-2 rounded-xl border border-gray-200 hover:bg-stone-50 text-text-muted font-bold text-xs transition cursor-pointer" onclick="document.getElementById('admin-report-detail-close').click()">
                    Đóng
                </button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeReportDetailModal() {
    const modal = document.getElementById('admin-report-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Global hook cho các nút trong modal chi tiết
window.__adminReportAction = async (id, action) => {
    closeReportDetailModal();
    await handleReportAction(id, action);
};

function bindAdminReportsEvents() {
    const search = document.getElementById('admin-reports-search');
    const targetFilter = document.getElementById('admin-reports-target-filter');
    const refresh = document.getElementById('admin-reports-refresh');
    const prev = document.getElementById('admin-reports-prev');
    const next = document.getElementById('admin-reports-next');
    const reportsBody = document.getElementById('admin-reports-body');
    const modalClose = document.getElementById('admin-report-detail-close');
    const modal = document.getElementById('admin-report-detail-modal');

    // Chuyển Tabs báo cáo (Tất cả, Chờ xử lý, Đã giải quyết)
    const tabsContainer = document.getElementById('admin-rep-tabs-container');
    tabsContainer?.addEventListener('click', (e) => {
        const btn = e.target.closest('.admin-rep-tab-btn');
        if (!btn) return;
        adminReportsState.status = btn.dataset.repTab || '';
        adminReportsState.page = 1;
        loadAdminReports();
    });

    // Click thẻ thống kê
    const statsContainer = document.getElementById('admin-rep-stats-container');
    statsContainer?.addEventListener('click', (e) => {
        const card = e.target.closest('.admin-rep-stat-card');
        if (!card) return;
        const filter = card.dataset.repFilter;
        adminReportsState.status = (filter === 'resolved' || filter === 'rejected') ? filter : (filter || '');
        adminReportsState.page = 1;
        loadAdminReports();
    });

    // Lọc đối tượng (Bài viết / Bình luận)
    targetFilter?.addEventListener('change', () => {
        adminReportsState.targetType = targetFilter.value;
        adminReportsState.page = 1;
        loadAdminReports();
    });

    // Tìm kiếm
    let searchTimer = null;
    search?.addEventListener('input', () => {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(() => {
            adminReportsState.search = search.value.trim();
            adminReportsState.page = 1;
            loadAdminReports();
        }, 300);
    });

    // Tải lại
    refresh?.addEventListener('click', () => {
        loadAdminReports();
    });

    // Phân trang
    prev?.addEventListener('click', () => {
        if (adminReportsState.page <= 1) return;
        adminReportsState.page -= 1;
        loadAdminReports();
    });

    next?.addEventListener('click', () => {
        adminReportsState.page += 1;
        loadAdminReports();
    });

    // Thao tác trên từng dòng báo cáo
    reportsBody?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-rep-action]');
        if (!btn) return;

        const id = btn.dataset.id;
        const action = btn.dataset.repAction;

        if (action === 'view') openReportDetailModal(id);
        if (action === 'hide-content') handleReportAction(id, 'hide-content');
        if (action === 'restore-content') handleReportAction(id, 'restore-content');
        if (action === 'reject') handleReportAction(id, 'reject');
        if (action === 'resolve') handleReportAction(id, 'resolve');
    });

    // Đóng Modal
    modalClose?.addEventListener('click', closeReportDetailModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeReportDetailModal();
    });
}

async function initAdminReportsPage() {
    bindAdminReportsEvents();
    await loadAdminReports();
    updateSidebarBadges();
}

// Cập nhật badges cảnh báo cho Sidebar
async function updateSidebarBadges() {
    try {
        const [postsRes, repRes] = await Promise.all([
            fetchAPI('/admin/posts?limit=1&status=pending'),
            fetchAPI('/admin/reports?limit=1&status=pending')
        ]);

        const postsPending = postsRes?.pagination?.pendingTotal || 0;
        const reportsPending = repRes?.pagination?.pendingTotal || 0;

        const postsBadge = document.getElementById('admin-sidebar-posts-badge');
        const repBadge = document.getElementById('admin-sidebar-reports-badge');

        if (postsBadge) {
            if (postsPending > 0) {
                postsBadge.textContent = postsPending;
                postsBadge.classList.remove('hidden');
            } else {
                postsBadge.classList.add('hidden');
            }
        }

        if (repBadge) {
            if (reportsPending > 0) {
                repBadge.textContent = reportsPending;
                repBadge.classList.remove('hidden');
                repBadge.classList.add('animate-pulse');
            } else {
                repBadge.classList.add('hidden');
            }
        }
    } catch (e) {
        // ignore
    }
}

const Admin = {
    render: async (params) => {
        const page = params || 'dashboard';
        
        let contentHTML = '';

        if (page === 'users') {
            contentHTML = renderUsersPage();
        } else if (page === 'foods') {
            contentHTML = renderFoodsPage();
        } else if (page === 'community') {
            contentHTML = renderCommunityPage();
        } else if (page === 'reports') {
            contentHTML = renderReportsPage();
        } else {
            contentHTML = renderDashboardPage();
        }

        return `
            <div class="cozy-kitchen-bg min-h-screen flex text-text-main font-sans">
                <!-- Sidebar -->
                <aside class="w-64 bg-white/95 backdrop-blur-md border-r border-beige-border hidden md:flex flex-col sticky top-16 sm:top-[68px] h-[calc(100vh-4rem)] sm:h-[calc(100vh-68px)] self-start shrink-0 z-30 overflow-y-auto shadow-xs">
                    <div class="p-6 border-b border-beige-border/80 sticky top-0 bg-white/95 backdrop-blur-md z-10">
                        <h2 class="text-xl font-bold text-primary flex items-center gap-2">
                            <i class="fa-solid fa-shield text-accent"></i> Admin Panel
                        </h2>
                    </div>
                    <nav class="flex-1 p-4 space-y-2">
                        <a href="#/admin/dashboard" class="flex items-center gap-3 px-4 py-3 ${page === 'dashboard' ? 'bg-primary text-white font-bold shadow-sm' : 'text-text-muted hover:bg-cream-soft hover:text-primary font-semibold'} rounded-xl transition cursor-pointer">
                            <i class="fa-solid fa-chart-simple w-5 text-center"></i> Dashboard
                        </a>
                        <a href="#/admin/users" class="flex items-center gap-3 px-4 py-3 ${page === 'users' ? 'bg-primary text-white font-bold shadow-sm' : 'text-text-muted hover:bg-cream-soft hover:text-primary font-semibold'} rounded-xl transition cursor-pointer">
                            <i class="fa-solid fa-users w-5 text-center"></i> Quản lý người dùng
                        </a>
                        <a href="#/admin/foods" class="flex items-center gap-3 px-4 py-3 ${page === 'foods' ? 'bg-primary text-white font-bold shadow-sm' : 'text-text-muted hover:bg-cream-soft hover:text-primary font-semibold'} rounded-xl transition cursor-pointer">
                            <i class="fa-solid fa-kitchen-set w-5 text-center"></i> Quản lý món ăn
                        </a>
                        <a href="#/admin/community" class="flex items-center justify-between px-4 py-3 ${page === 'community' ? 'bg-primary text-white font-bold shadow-sm' : 'text-text-muted hover:bg-cream-soft hover:text-primary font-semibold'} rounded-xl transition cursor-pointer">
                            <span class="flex items-center gap-3">
                                <i class="fa-solid fa-clipboard-check w-5 text-center"></i> Kiểm duyệt bài viết
                            </span>
                            <span id="admin-sidebar-posts-badge" class="hidden text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold"></span>
                        </a>
                        <a href="#/admin/reports" class="flex items-center justify-between px-4 py-3 ${page === 'reports' ? 'bg-primary text-white font-bold shadow-sm' : 'text-text-muted hover:bg-cream-soft hover:text-primary font-semibold'} rounded-xl transition cursor-pointer">
                            <span class="flex items-center gap-3">
                                <i class="fa-solid fa-triangle-exclamation w-5 text-center text-rose-500"></i> Báo cáo vi phạm
                            </span>
                            <span id="admin-sidebar-reports-badge" class="hidden text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold"></span>
                        </a>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="flex-1 p-6 sm:p-8 min-w-0">
                    ${contentHTML}
                </main>
            </div>
        `;
    },
    afterRender: async (page = 'dashboard') => {
        // Tạm ẩn Footer khi ở trang Admin để layout tràn viền
        const footer = document.getElementById('footer-container');
        if(footer) footer.style.display = 'none';

        if (page === 'dashboard') {
            await loadAdminDashboard();
        }

        if (page === 'users') {
            await initAdminUsersPage();
        }

        if (page === 'foods') {
            await initAdminFoodsPage();
        }

        if (page === 'community') {
            await initAdminCommunityPage();
        }

        if (page === 'reports') {
            await initAdminReportsPage();
        }

        // Cập nhật số lượng pending trên sidebar
        updateSidebarBadges();
    }
};

export default Admin;

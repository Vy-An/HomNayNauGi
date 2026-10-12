import { fetchAPI } from '../../api.js';

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
    const adminAvatar = currentUser?.avatar || 'http://localhost:5000/images/users/admin.jpg';

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
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-primary">
                <p class="text-text-muted text-sm font-semibold mb-1">Tổng món ăn</p>
                <h3 id="admin-dashboard-foods-total" class="text-3xl font-bold text-text-main">0</h3>
                <p id="admin-dashboard-foods-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                <p class="text-text-muted text-sm font-semibold mb-1">Người dùng</p>
                <h3 id="admin-dashboard-users-total" class="text-3xl font-bold text-text-main">0</h3>
                <p id="admin-dashboard-users-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-accent">
                <p class="text-text-muted text-sm font-semibold mb-1">Bài viết cộng đồng</p>
                <h3 id="admin-dashboard-posts-total" class="text-3xl font-bold text-text-main">0</h3>
                <p id="admin-dashboard-posts-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                <p class="text-text-muted text-sm font-semibold mb-1">Báo cáo vi phạm</p>
                <h3 id="admin-dashboard-reports-total" class="text-3xl font-bold text-text-main">0</h3>
                <p id="admin-dashboard-reports-sub" class="text-xs text-text-muted mt-2">Đang tải...</p>
            </div>
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
    setText('admin-dashboard-posts-sub', `${formatNumber(posts.active)} đang hiển thị · ${formatNumber(posts.hidden)} đã ẩn`);
    setText('admin-dashboard-reports-total', formatNumber(reports.total));
    setText('admin-dashboard-reports-sub', `${formatNumber(reports.pending)} đang chờ xử lý`);
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
                    <img src="${escapeHTML(food.image || 'http://localhost:5000/images/foods/thit-kho-trung.jpg')}" class="w-12 h-10 rounded-lg object-cover bg-gray-100" alt="${escapeHTML(food.name)}">
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
    const adminAvatar = currentUser?.avatar || 'http://localhost:5000/images/users/admin.jpg';

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

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Tổng người dùng</p>
                <strong id="admin-users-stat-total" class="block text-3xl text-text-main mt-2">0</strong>
            </div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Hoạt động</p>
                <strong id="admin-users-stat-active" class="block text-3xl text-green-700 mt-2">0</strong>
            </div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Đã khóa</p>
                <strong id="admin-users-stat-blocked" class="block text-3xl text-red-700 mt-2">0</strong>
            </div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Quản trị viên</p>
                <strong id="admin-users-stat-admins" class="block text-3xl text-purple-700 mt-2">0</strong>
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
                        <img src="${escapeHTML(user.avatar || 'http://localhost:5000/images/users/admin.jpg')}" class="w-10 h-10 rounded-full object-cover bg-gray-100" alt="${escapeHTML(user.name)}">
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
        updateUsersPagination({ page: 1, totalPages: 1, total: 0, hasMore: false });
        setUsersAlert(res.message || 'Không thể tải danh sách người dùng.', 'error');
        return;
    }

    adminUsersState.users = res.data || [];
    renderUsersTable(adminUsersState.users);
    updateUsersStats(res.stats);
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
        return;
    }

    closeUserModal();
    setUsersAlert(res.message || 'Đã lưu người dùng.');
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
            <img src="${escapeHTML(user.avatar || 'http://localhost:5000/images/users/admin.jpg')}" class="w-16 h-16 rounded-full object-cover bg-gray-100" alt="${escapeHTML(user.name)}">
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
    if (!window.confirm(`Bạn có chắc muốn ${action} tài khoản "${user.name}"?`)) return;

    const res = await fetchAPI(`/admin/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus })
    });

    if (!res.success) {
        setUsersAlert(res.message || 'Không thể cập nhật trạng thái.', 'error');
        return;
    }

    setUsersAlert(res.message || 'Đã cập nhật trạng thái.');
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
        loadAdminUsers();
    });

    status?.addEventListener('change', () => {
        adminUsersState.status = status.value;
        adminUsersState.page = 1;
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
    const adminAvatar = currentUser?.avatar || 'http://localhost:5000/images/users/admin.jpg';

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

        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Tổng món ăn</p>
                <strong id="admin-foods-stat-total" class="block text-3xl text-text-main mt-2">0</strong>
            </div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Đang hiển thị</p>
                <strong id="admin-foods-stat-active" class="block text-3xl text-green-700 mt-2">0</strong>
            </div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Đã ẩn</p>
                <strong id="admin-foods-stat-inactive" class="block text-3xl text-gray-700 mt-2">0</strong>
            </div>
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p class="text-xs font-bold uppercase tracking-wide text-text-muted">Danh mục</p>
                <strong id="admin-foods-stat-categories" class="block text-3xl text-amber-700 mt-2">0</strong>
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
        const image = food.image || 'http://localhost:5000/images/foods/thit-kho-trung.jpg';

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
        updateFoodsPagination({ page: 1, totalPages: 1, total: 0, hasMore: false });
        setFoodsAlert(res.message || 'Không thể tải danh sách món ăn.', 'error');
        return;
    }

    adminFoodsState.foods = res.data || [];
    renderFoodsTable(adminFoodsState.foods);
    updateFoodsStats(res.stats);
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
        return;
    }

    closeFoodModal();
    setFoodsAlert(res.message || 'Đã lưu món ăn.');
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
            <img src="${escapeHTML(food.image || 'http://localhost:5000/images/foods/thit-kho-trung.jpg')}" class="w-full sm:w-48 h-36 rounded-2xl object-cover bg-gray-100" alt="${escapeHTML(food.name)}">
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
    if (!window.confirm(`Bạn có chắc muốn ${action} món "${food.name}"?`)) return;

    const res = await fetchAPI(`/admin/foods/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus })
    });

    if (!res.success) {
        setFoodsAlert(res.message || 'Không thể cập nhật trạng thái món ăn.', 'error');
        return;
    }

    setFoodsAlert(res.message || 'Đã cập nhật trạng thái món ăn.');
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
        loadAdminFoods();
    });

    status?.addEventListener('change', () => {
        adminFoodsState.status = status.value;
        adminFoodsState.page = 1;
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
    await loadAdminFoods();
}

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
            contentHTML = renderUsersPage();
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
            contentHTML = renderFoodsPage();
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
            contentHTML = renderDashboardPage();
        }

        return `
            <div class="cozy-kitchen-bg min-h-screen flex text-text-main font-sans">
                <!-- Sidebar -->
                <aside class="w-64 bg-white/90 backdrop-blur-md border-r border-beige-border hidden md:flex flex-col min-h-[calc(100vh-70px)]">
                    <div class="p-6 border-b border-beige-border/80">
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
                        <a href="#/admin/community" class="flex items-center gap-3 px-4 py-3 ${page === 'community' ? 'bg-primary text-white font-bold shadow-sm' : 'text-text-muted hover:bg-cream-soft hover:text-primary font-semibold'} rounded-xl transition cursor-pointer">
                            <i class="fa-solid fa-comments w-5 text-center"></i> Quản lý cộng đồng
                        </a>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="flex-1 p-6 sm:p-8">
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
    }
};

export default Admin;

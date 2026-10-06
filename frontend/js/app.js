import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './views/khach/Home.js';
import Admin from './views/admin/Admin.js';
import FoodList from './views/khach/FoodList.js';
import FoodDetail from './views/khach/FoodDetail.js';
import Community from './views/khach/Community.js';
import Login from './views/khach/Login.js';

// Hệ thống Router định tuyến
const routes = {
    '/': Home,
    '/admin': Admin,
    '/danh-sach': FoodList,
    '/cong-dong': Community,
    '/login': Login
};

const router = async () => {
    try {
        // Lấy nội dung sau dấu #
        let path = window.location.hash.slice(1).toLowerCase() || '/';
        
        let page = null;
        let params = null;

        // Xử lý route động cho chi tiết món ăn (VD: /mon-an/1)
        if (path.startsWith('/mon-an/')) {
            page = FoodDetail;
            params = path.split('/')[2]; // Lấy ID
        } else if (path.startsWith('/admin')) {
            page = Admin;
            params = path.split('/')[2] || 'dashboard'; // /admin/users -> users, mặc định là dashboard
        } else {
            page = routes[path] || Home;
        }

        document.getElementById('navbar-container').innerHTML = Navbar();

        document.getElementById('app-content').innerHTML = '<p class="text-center py-10">Đang tải...</p>';
        
        // Hỗ trợ cả page dạng function hoặc dạng object có render() và afterRender()
        if (typeof page === 'function') {
            document.getElementById('app-content').innerHTML = await page(params);
        } else {
            document.getElementById('app-content').innerHTML = await page.render(params);
            if (page.afterRender) await page.afterRender(params);
        }

        const footerContainer = document.getElementById('footer-container');
        footerContainer.style.display = 'block';
        footerContainer.innerHTML = Footer();
    } catch (err) {
        console.error('Lỗi khi render trang:', err);
        const appContent = document.getElementById('app-content');
        if (appContent) {
            appContent.innerHTML = `
                <div class="container mx-auto p-8 text-center">
                    <p class="text-red-500 font-bold mb-2">Đã xảy ra lỗi khi tải giao diện:</p>
                    <p class="text-sm text-gray-600 bg-red-50 p-4 rounded-xl inline-block border border-red-200">${err.message}</p>
                </div>
            `;
        }
    }
};

// Chạy router khi vừa tải trang hoặc khi đổi URL (back/forward, click link)
window.addEventListener('hashchange', router);

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', router);
} else {
    router();
}

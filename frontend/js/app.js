import Popup from './components/Popup.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import BackToTop from './components/BackToTop.js';
import Home from './views/khach/Home.js';
import Admin from './views/admin/Admin.js';
import FoodList from './views/khach/FoodList.js';
import FoodDetail from './views/khach/FoodDetail.js';
import Community from './views/khach/Community.js';
import Login from './views/khach/Login.js';
import Profile from './views/khach/Profile.js';
import { renderPageSkeleton } from './components/Skeleton.js';

const routes = {
    '/': Home,
    '/admin': Admin,
    '/danh-sach': FoodList,
    '/cong-dong': Community,
    '/login': Login,
    '/ca-nhan': Profile
};

const router = async () => {
    try {
        // Cuộn về đầu trang khi chuyển view
        window.scrollTo({ top: 0, behavior: 'instant' });

        let fullHash = window.location.hash.slice(1) || '/';
        let [hashPath, queryString] = fullHash.split('?');
        let path = (hashPath || '/').toLowerCase();
        
        let page = null;
        let params = null;

        if (path.startsWith('/mon-an/')) {
            page = FoodDetail;
            params = path.split('/')[2];
        } else if (path.startsWith('/admin')) {
            page = Admin;
            params = path.split('/')[2] || 'dashboard';
        } else {
            page = routes[path] || Home;
            params = queryString ? new URLSearchParams(queryString) : null;
        }

        const navbarContainer = document.getElementById('navbar-container');
        const footerContainer = document.getElementById('footer-container');

        if (path === '/login') {
            if (navbarContainer) navbarContainer.innerHTML = '';
            if (footerContainer) footerContainer.style.display = 'none';
        } else {
            if (navbarContainer) {
                navbarContainer.innerHTML = Navbar();
                if (typeof window !== 'undefined') {
                    if (window.syncFavBadge) window.syncFavBadge();
                    if (window.updateNavbarFavBadge) window.updateNavbarFavBadge();
                }
            }
            if (footerContainer) {
                footerContainer.style.display = 'block';
                footerContainer.innerHTML = Footer();
            }
        }

        document.getElementById('app-content').innerHTML = renderPageSkeleton(path);
        
        // Hỗ trợ cả page dạng function hoặc dạng object có render() và afterRender()
        if (typeof page === 'function') {
            document.getElementById('app-content').innerHTML = await page(params);
        } else {
            document.getElementById('app-content').innerHTML = await page.render(params);
            if (page.afterRender) await page.afterRender(params);
        }

        // Khởi tạo nút BackToTop cho tất cả các trang
        BackToTop.init();
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
    window.addEventListener('DOMContentLoaded', () => {
        router();
        BackToTop.init();
    });
} else {
    router();
    BackToTop.init();
}

// Chống lệch giao diện theo trục ngang
window.addEventListener('scroll', () => {
    if (window.scrollX !== 0) {
        window.scrollTo(0, window.scrollY);
    }
}, { passive: true });


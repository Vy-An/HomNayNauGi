import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './views/Home.js';
import Admin from './views/Admin.js';
import FoodList from './views/FoodList.js';
import FoodDetail from './views/FoodDetail.js';
import Community from './views/Community.js';
import Login from './views/Login.js';

// Hệ thống Router định tuyến
const routes = {
    '/': Home,
    '/admin': Admin,
    '/danh-sach': FoodList,
    '/cong-dong': Community,
    '/login': Login
};

const router = async () => {
    // Lấy nội dung sau dấu #
    let path = window.location.hash.slice(1).toLowerCase() || '/';
    
    let page = null;
    let params = null;

    // Xử lý route động cho chi tiết món ăn (VD: /mon-an/1)
    if (path.startsWith('/mon-an/')) {
        page = FoodDetail;
        params = path.split('/')[2]; // Lấy ID
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
};

// Chạy router khi vừa tải trang hoặc khi đổi URL (back/forward, click link)
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

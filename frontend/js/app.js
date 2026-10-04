import Navbar from './components/Navbar.js';
import Home from './views/Home.js';
import Admin from './views/Admin.js';

// Hệ thống Router định tuyến
const routes = {
    '/': Home,
    '/admin': Admin
};

const router = async () => {
    // Lấy nội dung sau dấu # (ví dụ: localhost:5500/#/admin -> Lấy ra '/admin')
    let path = window.location.hash.slice(1).toLowerCase() || '/';
    
    const page = routes[path] || Home; // Nếu url sai, trả về Home mặc định

    // Render Navbar (không đổi)
    document.getElementById('navbar-container').innerHTML = Navbar();

    // Render Nội dung chính (thay đổi theo trang)
    document.getElementById('app-content').innerHTML = '<p style="text-align: center;">Đang tải...</p>';
    document.getElementById('app-content').innerHTML = await page();
};

// Chạy router khi vừa tải trang hoặc khi đổi URL (back/forward, click link)
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

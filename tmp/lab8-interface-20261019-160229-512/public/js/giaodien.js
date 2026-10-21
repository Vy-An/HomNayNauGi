const paths = {
    laptop: '<rect x="4" y="3" width="16" height="13" rx="2"/><path d="M2 20h20l-2-4H4z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="m16 3 5 5-12 12-6 1 1-6zM13 6l5 5"/>',
    code: '<path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    money: '<rect x="2" y="5" width="20" height="14" rx="3"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>',
    chart: '<path d="M4 20V10m8 10V4m8 16v-7"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    spark: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>'
};
export const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.laptop}</svg>`;
export const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
export const dinhDangGia = (gia) => new Intl.NumberFormat("vi-VN", {
    style: "currency", currency: "VND", maximumFractionDigits: 0
}).format(gia);
export function hienThiKhung(trang, noiDung) {
    const main = document.querySelector("#app");
    if (!main)
        throw new Error("Không tìm thấy vùng nội dung.");
    const nav = [
        { id: "danhsach", url: "laptop_ds.html", ten: "Danh sách laptop", icon: "grid" },
        { id: "them", url: "laptop_them.html", ten: "Thêm laptop", icon: "plus" },
        { id: "sua", url: "laptop_sua.html", ten: "Chỉnh sửa laptop", icon: "edit" },
        { id: "lodash", url: "mang_lodash.html", ten: "Thực hành Lodash", icon: "code" }
    ];
    const hienTai = nav.find(item => item.id === trang);
    document.title = `${hienTai.ten} · Laptop Studio`;
    main.innerHTML = `<a class="skip-link" href="#noi-dung">Đến nội dung chính</a>
        <aside class="sidebar" aria-label="Thanh điều hướng">
            <a class="brand" href="index.html" aria-label="Laptop Studio - trang chính"><span class="brand-mark">${icon("laptop")}</span><span>Laptop<span class="brand-sub">STUDIO / LAB 08</span></span></a>
            <p class="nav-label">KHÔNG GIAN QUẢN LÝ</p>
            <nav aria-label="Điều hướng chính">${nav.map(item => `${item.id === "lodash" ? '<p class="nav-label nav-label-second">GÓC THỰC HÀNH</p>' : ""}<a href="${item.url}" class="nav-link${item.id === trang ? " is-active" : ""}"${item.id === trang ? ' aria-current="page"' : ""}>${icon(item.icon)}<span>${item.ten}</span>${item.id === trang ? '<span class="nav-dot"></span>' : ""}</a>`).join("")}</nav>
            <div class="sidebar-note"><span class="note-symbol">${icon("spark")}</span><strong>Mỗi module, một bước tiến.</strong><p>Không gian thực hành TypeScript &amp; Vite.</p><a href="mang_lodash.html">Khám phá bài Lodash ${icon("arrow")}</a></div>
            <div class="sidebar-footer"><span class="avatar">Đ</span><div><strong>Nguyễn Sĩ Đăng</strong><small>PS47415 · WEB502</small></div></div>
        </aside>
        <div class="workspace"><header class="topbar"><div class="breadcrumb"><span>Lab 08</span><span class="breadcrumb-divider">/</span><span>${hienTai.ten}</span></div><span class="mode-badge"><i></i>Dữ liệu mẫu</span></header>
            <main class="page-content" id="noi-dung" tabindex="-1">${noiDung}</main><footer class="page-footer"><span>Laptop Studio</span><span>TypeScript · Modules · Vite</span></footer></div>`;
    return main;
}
export const dauTrang = (nhan, ten, moTa, hanhDong = "") => `<section class="page-heading"><div><p class="eyebrow">${nhan}</p><h1>${ten}</h1><p class="page-description">${moTa}</p></div>${hanhDong}</section>`;
export const minhHoaLaptop = () => `<div class="laptop-art" aria-hidden="true"><div class="art-orbit"></div><div class="art-screen"><div class="art-wallpaper"><i></i><i></i><i></i></div><span>STUDIO</span></div><div class="art-base"></div></div>`;

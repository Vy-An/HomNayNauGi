import { danhSachLT, layDanhSachLT, timkiemLT } from "./module_laptop.js";
import { dauTrang, dinhDangGia, hienThiKhung, icon } from "./giaodien.js";

const laptops = layDanhSachLT();
const tongGia = laptops.reduce((sum, sp) => sum + sp.gia, 0);
hienThiKhung("danhsach", `
    ${dauTrang("BỘ SƯU TẬP CỦA BẠN", "Danh sách laptop", "Mọi sản phẩm, gọn gàng trong một không gian.", `<a class="button button-primary" href="laptop_them.html">${icon("plus")}Thêm laptop</a>`)}
    <section class="stats-grid" aria-label="Thống kê sản phẩm">
        <article class="stat-card"><span class="stat-icon">${icon("laptop")}</span><div><p>Tổng sản phẩm</p><strong>${laptops.length}<small>laptop</small></strong></div><span class="stat-corner">01</span></article>
        <article class="stat-card"><span class="stat-icon stat-icon-purple">${icon("money")}</span><div><p>Giá bán trung bình</p><strong>${dinhDangGia(tongGia / (laptops.length || 1))}</strong></div><span class="stat-corner">02</span></article>
        <article class="stat-card"><span class="stat-icon stat-icon-amber">${icon("chart")}</span><div><p>Tổng giá trị</p><strong>${dinhDangGia(tongGia)}</strong></div><span class="stat-corner">03</span></article>
    </section>
    <section class="panel catalog-panel" aria-labelledby="catalog-title">
        <div class="catalog-toolbar"><div><h2 id="catalog-title">Tất cả laptop <span class="count-badge">${laptops.length}</span></h2><p>Danh mục sản phẩm trong bài thực hành.</p></div>
            <div class="catalog-controls"><label class="search-box">${icon("search")}<input id="search" type="search" placeholder="Tìm tên laptop..." aria-label="Tìm kiếm laptop"></label><select id="sort" aria-label="Sắp xếp laptop"><option value="default">Sắp xếp mặc định</option><option value="price-asc">Giá tăng dần</option><option value="price-desc">Giá giảm dần</option></select></div></div>
        <div class="table-scroll"><table><thead><tr><th scope="col">SẢN PHẨM</th><th scope="col">GIÁ BÁN</th><th scope="col">MÃ SẢN PHẨM</th><th scope="col" class="action-cell">THAO TÁC</th></tr></thead><tbody id="product-rows">${danhSachLT()}</tbody></table></div>
        <div class="catalog-footer"><span id="result-count" role="status" aria-live="polite">Hiển thị ${laptops.length} / ${laptops.length} sản phẩm</span><span class="collection-note"><i></i>Bộ sưu tập Lab 08</span></div>
    </section>
    <section class="learning-banner"><span class="banner-icon">${icon("code")}</span><div><p>THÊM MỘT CHÚT THỰC HÀNH</p><h2>Khám phá sức mạnh của Lodash</h2><span>Tìm số lớn nhất, nhỏ nhất và tính tổng chỉ với vài dòng code.</span></div><a class="button button-secondary" href="mang_lodash.html">Mở bài thực hành ${icon("arrow")}</a></section>`);

const search = document.querySelector<HTMLInputElement>("#search")!;
const sort = document.querySelector<HTMLSelectElement>("#sort")!;
const locSanPham = (): void => {
    const results = timkiemLT(search.value);
    if (sort.value === "price-asc") results.sort((a, b) => a.gia - b.gia);
    if (sort.value === "price-desc") results.sort((a, b) => b.gia - a.gia);
    document.querySelector<HTMLElement>("#product-rows")!.innerHTML = danhSachLT(results);
    document.querySelector<HTMLElement>("#result-count")!.textContent = `Hiển thị ${results.length} / ${laptops.length} sản phẩm`;
};
search.addEventListener("input", locSanPham);
sort.addEventListener("change", locSanPham);

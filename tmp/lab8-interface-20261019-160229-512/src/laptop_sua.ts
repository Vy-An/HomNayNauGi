import { chitietLT, formSuaLT, ganSuKienForm, layDanhSachLT } from "./module_laptop.js";
import { dauTrang, escapeHTML, hienThiKhung, icon } from "./giaodien.js";

const params = new URLSearchParams(window.location.search);
const id = params.has("id") ? Number(params.get("id")) : layDanhSachLT()[0]?.id;
const sanpham = id === undefined ? undefined : chitietLT(id);
const picker = `<div class="product-picker"><label for="product-picker">Chọn laptop cần chỉnh sửa</label><select id="product-picker">${layDanhSachLT().map(sp => `<option value="${sp.id}"${sp.id === id ? " selected" : ""}>${escapeHTML(sp.ten)}</option>`).join("")}</select></div>`;

hienThiKhung("sua", `<a class="back-link" href="laptop_ds.html">${icon("back")}Quay lại danh sách</a>
    ${dauTrang("CHĂM CHÚT TỪNG CHI TIẾT", "Chỉnh sửa laptop", "Chọn sản phẩm và xem trước những thay đổi của bạn.")}
    ${sanpham ? picker + formSuaLT(sanpham.id!) : `<section class="panel empty-state"><span class="empty-icon">${icon("laptop")}</span><h2>Không tìm thấy laptop</h2><p>Sản phẩm trong đường dẫn này không có trong danh sách.</p><a class="button button-primary" href="laptop_ds.html">Về danh sách laptop ${icon("arrow")}</a></section>`}`);

document.querySelector<HTMLSelectElement>("#product-picker")?.addEventListener("change", event => {
    const select = event.currentTarget as HTMLSelectElement;
    window.location.assign(`laptop_sua.html?id=${encodeURIComponent(select.value)}`);
});
ganSuKienForm();

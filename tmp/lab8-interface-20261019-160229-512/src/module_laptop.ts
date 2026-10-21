import type { sanpham } from "./base.js";
import { dinhDangGia, escapeHTML, icon, minhHoaLaptop } from "./giaodien.js";

export const title = "QUẢN TRỊ LAPTOP";
const laptops: sanpham[] = [
    { id: 1, ten: "MSI Modern i3 15G4", gia: 9000000 },
    { id: 2, ten: "Asus Vivobook i3 1G4", gia: 8500000 },
    { id: 3, ten: "Lenovo Ideapad R5 50H", gia: 15490000 },
    { id: 4, ten: "Lenovo 1ITL6 i3 5G4", gia: 8700000 },
    { id: 5, ten: "Dell Inspiron i5 15U", gia: 1700000 }
];

export const layDanhSachLT = (): sanpham[] => laptops.map(sp => ({ ...sp }));
export const chitietLT = (id: number): sanpham | undefined => layDanhSachLT().find(sp => sp.id === id);
const boDau = (text: string): string => text.toLocaleLowerCase("vi-VN").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
export const timkiemLT = (tukhoa: string): sanpham[] => layDanhSachLT().filter(sp => boDau(sp.ten).includes(boDau(tukhoa.trim())));

export const danhSachLT = (danhSach = layDanhSachLT()): string => danhSach.length ? danhSach.map(sp => `<tr><td><div class="product-cell"><span class="product-thumb thumb-${(sp.id ?? 1) % 3}">${icon("laptop")}</span><div><strong>${escapeHTML(sp.ten)}</strong><small>${escapeHTML(sp.ten.split(" ")[0])} · Laptop</small></div></div></td><td class="price-cell">${dinhDangGia(sp.gia)}</td><td><span class="sku">LT-${String(sp.id).padStart(3, "0")}</span></td><td class="action-cell"><a class="edit-link" href="laptop_sua.html?id=${sp.id}" aria-label="Sửa ${escapeHTML(sp.ten)}">${icon("edit")}<span>Sửa</span></a></td></tr>`).join("")
    : '<tr><td colspan="4"><div class="empty-state"><strong>Chưa tìm thấy laptop phù hợp</strong><p>Thử một tên sản phẩm hoặc hãng khác.</p></div></td></tr>';

function formLaptop(sp?: sanpham): string {
    return `<div class="form-grid"><section class="panel form-panel" aria-labelledby="form-title"><div class="panel-heading"><div><span class="section-number">01</span><h2 id="form-title">Thông tin sản phẩm</h2></div><span class="subtle-text">2 trường thông tin</span></div>
        <form id="laptop-form"><div class="field"><label for="ten">Tên laptop <span>*</span></label><input id="ten" name="ten" maxlength="120" value="${escapeHTML(sp?.ten ?? "")}" placeholder="Ví dụ: Asus Vivobook i3 1G4" required aria-describedby="ten-hint"><small id="ten-hint">Tên đầy đủ giúp bạn dễ tìm và phân biệt sản phẩm.</small></div>
            <div class="field"><label for="gia">Giá bán <span>*</span></label><div class="input-affix"><input id="gia" type="number" name="gia" min="1" max="1000000000" step="1" value="${sp?.gia ?? ""}" placeholder="Nhập giá bán" required aria-describedby="gia-hint"><span>VNĐ</span></div><small id="gia-hint">Nhập số tiền bằng đồng Việt Nam, không có dấu chấm.</small></div>
            ${sp ? `<input type="hidden" name="id" value="${sp.id}">` : ""}<p class="form-message" id="form-message" role="status" aria-live="polite"></p><div class="form-actions"><a class="button button-secondary" href="laptop_ds.html">Hủy</a><button class="button button-primary" type="submit" name="btn">${icon("check")}${sp ? "Xem trước thay đổi" : "Xem trước laptop"}</button></div>
        </form></section><aside class="preview-panel"><p class="eyebrow">BẢN XEM TRƯỚC</p>${minhHoaLaptop()}<div class="preview-product"><span class="small-tag">LAPTOP</span><h2 id="preview-name">${escapeHTML(sp?.ten ?? "Laptop của bạn")}</h2><p id="preview-price">${sp ? dinhDangGia(sp.gia) : "Chưa nhập giá"}</p></div><div class="preview-note">${icon("spark")}<p>Đây là bản thực hành với dữ liệu mẫu. Bạn có thể nhập thông tin để xem trước sản phẩm.</p></div></aside></div>`;
}

export const formThemLT = (): string => formLaptop();
export const formSuaLT = (id: number): string => formLaptop(chitietLT(id));

export function ganSuKienForm(): void {
    const form = document.querySelector<HTMLFormElement>("#laptop-form");
    if (!form) return;
    const ten = form.querySelector<HTMLInputElement>('[name="ten"]')!;
    const gia = form.querySelector<HTMLInputElement>('[name="gia"]')!;
    const message = document.querySelector<HTMLElement>("#form-message")!;
    const capNhat = (): void => {
        document.querySelector<HTMLElement>("#preview-name")!.textContent = ten.value.trim() || "Laptop của bạn";
        const value = Number(gia.value);
        document.querySelector<HTMLElement>("#preview-price")!.textContent = Number.isFinite(value) && value > 0 ? dinhDangGia(value) : "Chưa nhập giá";
        message.textContent = "";
    };
    ten.addEventListener("input", capNhat);
    gia.addEventListener("input", capNhat);
    form.addEventListener("submit", event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        if (!ten.value.trim()) { message.textContent = "Vui lòng nhập tên laptop."; ten.focus(); return; }
        capNhat();
        message.textContent = "Đã cập nhật bản xem trước. Dữ liệu mẫu được giữ nguyên.";
    });
}

// Các hàm API của bài học được bổ sung khi kết nối với server.
export const themLT = (data: sanpham): void => {};
export const suaLT = (id: number, data: sanpham): void => {};
export const xoaLT = (id: number): void => {};
export * from "./base.js";

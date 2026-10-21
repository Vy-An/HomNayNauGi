export const title = "QUẢN TRỊ LAPTOP";
export const danhSachLT = () => {
    const laptops = [
        { id: 1, ten: "MSI Modern i3 15G4", gia: 9000000 },
        { id: 2, ten: "Asus Vivobook i3 1G4", gia: 8500000 },
        { id: 3, ten: "Lenovo Ideapad R5 50H", gia: 15490000 },
        { id: 4, ten: "Lenovo 1ITL6 i3 5G4", gia: 8700000 },
        { id: 5, ten: "Dell Inspiron i5 15U", gia: 1700000 }
    ];
    return laptops.map(sp => `<p><b>${sp.ten}</b> <span>${sp.gia.toLocaleString("vi-VN")} VNĐ</span></p>`).join("");
};
export const formThemLT = () => {
    return `<form>
        <p><label for="ten">Tên</label><input id="ten" name="ten"></p>
        <p><label for="gia">Giá</label><input id="gia" type="number" name="gia" min="0"></p>
        <p><button type="button" name="btn">Thêm</button></p>
    </form>`;
};
export const themLT = (data) => {
    // Code gửi yêu cầu thêm laptop lên server.
};
export const formSuaLT = (id) => {
    return `<form>
        <p><label for="ten">Tên</label><input id="ten" name="ten"></p>
        <p><label for="gia">Giá</label><input id="gia" type="number" name="gia" min="0"></p>
        <p><button type="button" name="btn">Cập nhật</button></p>
        <input type="hidden" name="id" value="${id}">
    </form>`;
};
export const suaLT = (id, data) => {
    // Code gửi yêu cầu cập nhật laptop lên server.
};
export const xoaLT = (id) => {
    // Code gửi yêu cầu xóa laptop lên server.
};
export const chitietLT = (id) => {
    // Code gửi yêu cầu lấy chi tiết laptop từ server.
};
export const timkiemLT = (tukhoa) => {
    // Code lấy danh sách laptop theo từ khóa.
};
export * from "./base.js";

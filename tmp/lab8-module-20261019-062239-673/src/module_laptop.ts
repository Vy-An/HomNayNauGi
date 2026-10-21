import { sanpham } from "./base.js";

export const title: string = "QUẢN TRỊ LAPTOP";

export const danhSachLT = (): string => {
    const sp1: sanpham = {
        id: 1,
        ten: "MSI Modern i3 15G4",
        gia: 9000000
    };

    return `<p><b>${sp1.ten}</b> <span>${sp1.gia}</span></p>`;
};

export const formThemLT = (): string => {
    return `<form>
        <p>Tên <input name="ten"></p>
        <p>Giá <input type="number" name="gia"></p>
        <p><button type="button" name="btn">Thêm</button></p>
    </form>`;
};

export const themLT = (data: sanpham): void => {
    // Code gửi yêu cầu thêm laptop lên server.
};

export const formSuaLT = (id: number): string => {
    return `<form>
        <p>Tên <input name="ten"></p>
        <p>Giá <input type="number" name="gia"></p>
        <p><button type="button" name="btn">Cập nhật</button></p>
        <input type="hidden" name="id" value="${id}">
    </form>`;
};

export const suaLT = (id: number, data: sanpham): void => {
    // Code gửi yêu cầu cập nhật laptop lên server.
};

export const xoaLT = (id: number): void => {
    // Code gửi yêu cầu xóa laptop lên server.
};

export const chitietLT = (id: number): void => {
    // Code gửi yêu cầu lấy chi tiết laptop từ server.
};

export const timkiemLT = (tukhoa: string): void => {
    // Code lấy danh sách laptop theo từ khóa.
};

export * from "./base.js";

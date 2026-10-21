import { danhSachLT, xoaLT, title } from "./module_laptop.js";

const show = document.querySelector<HTMLElement>("main");
if (show) {
    show.innerHTML = `<h2>${title}</h2><h3>DANH SÁCH LAPTOP</h3>`;
    show.innerHTML += danhSachLT();
}

function btnXoa_click(id: number): void {
    xoaLT(id);
    alert("Đã xóa");
}

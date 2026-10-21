import { formThemLT, themLT, title, sanpham } from "./module_laptop.js";

const show = document.querySelector<HTMLElement>("main");
if (show) {
    show.innerHTML = `<h2>${title}</h2><h3>THÊM LAPTOP</h3>`;
    show.innerHTML += formThemLT();
}

const form = document.querySelector<HTMLFormElement>("main form");
const button = form?.querySelector<HTMLButtonElement>('button[name="btn"]');

if (button) {
    button.onclick = function (): void {
        const data: sanpham = { ten: "a", gia: 11 };
        themLT(data);
        alert("Đã thêm");
    };
}

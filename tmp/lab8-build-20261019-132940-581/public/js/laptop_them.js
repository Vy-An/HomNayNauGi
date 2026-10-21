import { formThemLT, themLT, title } from "./module_laptop.js";
const show = document.querySelector("main");
if (show) {
    show.innerHTML = `<h2>${title}</h2><h3>THÊM LAPTOP</h3>`;
    show.innerHTML += formThemLT();
}
const form = document.querySelector("main form");
const button = form?.querySelector('button[name="btn"]');
if (button) {
    button.onclick = function () {
        const data = { ten: "a", gia: 11 };
        themLT(data);
        alert("Đã thêm");
    };
}

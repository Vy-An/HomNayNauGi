import { title } from "./module_laptop.js";

const show = document.querySelector<HTMLElement>("main");
if (show) {
    show.innerHTML = `<h2>${title}</h2><h3>DANH SÁCH LAPTOP</h3>`;
}

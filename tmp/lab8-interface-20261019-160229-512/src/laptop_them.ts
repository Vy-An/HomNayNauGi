import { formThemLT, ganSuKienForm } from "./module_laptop.js";
import { dauTrang, hienThiKhung, icon } from "./giaodien.js";

hienThiKhung("them", `<a class="back-link" href="laptop_ds.html">${icon("back")}Quay lại danh sách</a>
    ${dauTrang("MỘT KHỞI ĐẦU MỚI", "Thêm laptop", "Một sản phẩm mới bắt đầu từ những thông tin cơ bản.")}
    ${formThemLT()}`);
ganSuKienForm();

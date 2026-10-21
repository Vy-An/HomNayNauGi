import * as _ from "lodash";
import { dauTrang, hienThiKhung, icon } from "./giaodien.js";

const arr = [9, 14, 82, 73, 57];
const lonnhat = _.max(arr);
const nhonhat = _.min(arr);
const tong = _.sum(arr);
console.log(lonnhat, nhonhat, tong);

hienThiKhung("lodash", `${dauTrang("BÀI 03 · THƯ VIỆN LODASH", "Chơi cùng những con số", "Một mảng dữ liệu, ba phép tính. Thử thay đổi các số và khám phá kết quả.")}
    <section class="panel lodash-input-panel"><div class="panel-heading"><div><span class="section-number">01</span><h2>Mảng dữ liệu của bạn</h2></div><span class="small-tag">LODASH</span></div>
        <form id="array-form"><label for="array-input">Nhập các số, ngăn cách bằng dấu phẩy</label><div class="array-input-row"><input id="array-input" name="numbers" value="${arr.join(", ")}" required autocomplete="off" aria-describedby="array-error"><button class="button button-primary" type="submit">${icon("spark")}Tính kết quả</button></div><p id="array-error" class="form-message is-error" role="status" aria-live="polite"></p></form>
        <div class="array-chips" id="array-chips" aria-label="Các phần tử của mảng">${arr.map((value, index) => `<span><small>${index}</small>${value}</span>`).join("")}</div></section>
    <section class="result-grid" aria-label="Kết quả tính toán" aria-live="polite">
        <article class="result-card result-max"><span class="result-label">GIÁ TRỊ LỚN NHẤT</span><strong id="result-max">${lonnhat}</strong><code>_.max(arr)</code><p>Phần tử có giá trị cao nhất trong mảng.</p></article>
        <article class="result-card result-min"><span class="result-label">GIÁ TRỊ NHỎ NHẤT</span><strong id="result-min">${nhonhat}</strong><code>_.min(arr)</code><p>Phần tử có giá trị thấp nhất trong mảng.</p></article>
        <article class="result-card result-sum"><span class="result-label">TỔNG CÁC PHẦN TỬ</span><strong id="result-sum">${tong}</strong><code>_.sum(arr)</code><p>Cộng tất cả các giá trị trong mảng.</p></article>
    </section>
    <section class="code-panel"><div class="code-heading"><span class="code-dots"><i></i><i></i><i></i></span><span>mang_lodash.ts</span><span>TypeScript</span></div><pre><code><span class="code-purple">import</span> * as _ <span class="code-purple">from</span> <span class="code-green">"lodash"</span>;

const arr = <span id="code-array">[${arr.join(", ")}]</span>;
const lonnhat = _.<span class="code-green">max</span>(arr);
const nhonhat = _.<span class="code-green">min</span>(arr);
const tong = _.<span class="code-green">sum</span>(arr);

console.log(lonnhat, nhonhat, tong);</code></pre><div class="console-result"><span>CONSOLE</span><code id="console-result">${lonnhat} &nbsp; ${nhonhat} &nbsp; ${tong}</code></div></section>`);

document.querySelector<HTMLFormElement>("#array-form")!.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector<HTMLInputElement>("#array-input")!;
    const pieces = input.value.split(",").map(value => value.trim());
    const values = pieces.map(Number);
    const error = document.querySelector<HTMLElement>("#array-error")!;
    const total = _.sum(values);
    if (pieces.some(value => value === "") || values.some(value => !Number.isFinite(value)) || values.length > 100 || !Number.isFinite(total)) {
        error.textContent = "Nhập từ 1 đến 100 số hợp lệ, ngăn cách bằng dấu phẩy. Ví dụ: 9, 14, 82.";
        input.setAttribute("aria-invalid", "true");
        return;
    }
    error.textContent = "";
    input.removeAttribute("aria-invalid");
    const max = _.max(values)!;
    const min = _.min(values)!;
    document.querySelector<HTMLElement>("#result-max")!.textContent = String(max);
    document.querySelector<HTMLElement>("#result-min")!.textContent = String(min);
    document.querySelector<HTMLElement>("#result-sum")!.textContent = String(total);
    document.querySelector<HTMLElement>("#array-chips")!.innerHTML = values.map((value, index) => `<span><small>${index}</small>${value}</span>`).join("");
    document.querySelector<HTMLElement>("#code-array")!.textContent = `[${values.join(", ")}]`;
    document.querySelector<HTMLElement>("#console-result")!.textContent = `${max}   ${min}   ${total}`;
    console.log(max, min, total);
});

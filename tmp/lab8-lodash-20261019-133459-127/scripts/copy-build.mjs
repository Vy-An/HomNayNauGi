import { copyFile, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const projectDir = new URL("../", import.meta.url);
const distDir = new URL("dist/", projectDir);
const publicJsDir = new URL("public/js/", projectDir);

// Trang thử dùng bundle đã build, nên không còn import trực tiếp từ "lodash".
const html = await readFile(new URL("mang_lodash.html", projectDir), "utf8");
await writeFile(
    new URL("mang_lodash.html", distDir),
    html.replace('src="public/js/mang_lodash.js"', 'src="./mang_lodash.js"'),
    "utf8"
);

// Chép cả các chunk dùng chung để các trang laptop vẫn tải đủ module.
await mkdir(publicJsDir, { recursive: true });
for (const entry of await readdir(distDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".js")) {
        await copyFile(new URL(entry.name, distDir), new URL(entry.name, publicJsDir));
    } else if (entry.isDirectory() && entry.name === "chunks") {
        await cp(new URL("chunks/", distDir), new URL("chunks/", publicJsDir), {
            recursive: true
        });
    }
}

console.log("Đã tạo dist/mang_lodash.html và chép các bundle, chunk vào public/js.");

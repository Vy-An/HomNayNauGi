import { copyFile, cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const projectDir = new URL("../", import.meta.url);
const distDir = new URL("dist/", projectDir);
const publicJsDir = new URL("public/js/", projectDir);

// Mọi trang trong dist dùng bundle và stylesheet ở ngay trong thư mục dist.
for (const page of ["index.html", "laptop_ds.html", "laptop_them.html", "laptop_sua.html", "mang_lodash.html"]) {
    const html = await readFile(new URL(page, projectDir), "utf8");
    await writeFile(
        new URL(page, distDir),
        html.replaceAll('src="public/js/', 'src="./').replaceAll('href="public/css/', 'href="./css/'),
        "utf8"
    );
}
await cp(new URL("public/css/", projectDir), new URL("css/", distDir), { recursive: true });

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

console.log("Đã tạo 5 trang HTML, CSS trong dist và chép bundle, chunk vào public/js.");

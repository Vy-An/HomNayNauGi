# Dự Án Hôm Nay Nấu Gì (HomNayNauGi)

Tài liệu hướng dẫn cài đặt và khởi chạy dự án từng bước chi tiết, chuẩn xác từ A - Z.

---

## 📋 Thứ tự các bước chuẩn bị & khởi chạy

Để dự án hoạt động trơn tru không gặp lỗi, **hãy thực hiện đúng thứ tự 4 bước sau**:

1. **Khởi động & Import Database (MySQL)**
2. **Cấu hình file môi trường (`backend/.env`)**
3. **Cài đặt & Chạy Backend**
4. **Cài đặt & Chạy Frontend**

---

## 🛠️ BƯỚC 1: Chuẩn bị Cơ sở dữ liệu (Database MySQL)

> [!IMPORTANT]
> Cần bật MySQL trước khi chạy Backend, nếu không Backend sẽ báo lỗi 500 khi gọi API.

1. Mở **Laragon** (hoặc XAMPP) và nhấn **Start All** để khởi động dịch vụ **MySQL** (cổng mặc định `3306`).
2. Mở trình duyệt vào **phpMyAdmin** (thường là `http://localhost/phpmyadmin`)
3. Tạo một Database mới có tên:
   ```text
   homnaynaugi
   ```
4. Chọn Database `homnaynaugi` vừa tạo -> Chọn tab **Import (Nhập)** -> Chọn tệp:
   ```text
   hom_nay_an_gi.sql (nằm ngay tại thư mục gốc dự án)
   ```
5. Nhấn **Import (Thực hiện)** để nạp toàn bộ 18 món ăn, nguyên liệu và danh mục vào database.

---

## ⚙️ BƯỚC 2: Cấu hình file `backend/.env`

Vào thư mục `backend`, tạo file `.env` (nếu chưa có) và điền nội dung kết nối:

```env
PORT=5000
DATABASE_URL="mysql://root:mat_khau_cua_ban@localhost:3306/homnaynaugi"
```

> [!WARNING]
> **Quy tắc quan trọng về mật khẩu MySQL trong URL:**
> - Nếu mật khẩu MySQL của bạn có ký tự đặc biệt `@` (ví dụ `vyan@1234@`), bạn **bắt buộc phải đổi ký tự `@` thành `%40`**:
>   ```env
>   DATABASE_URL="mysql://root:vyan%401234%40@localhost:3306/homnaynaugi"
>   ```
> - Nếu tài khoản `root` của bạn **không có mật khẩu** (mặc định của Laragon):
>   ```env
>   DATABASE_URL="mysql://root:@localhost:3306/homnaynaugi"
>   ```

---

## 🚀 BƯỚC 3: Cài đặt và Chạy Backend (Terminal 1)

Mở **Terminal thứ nhất** tại thư mục dự án và chạy các lệnh theo đúng trình tự sau:

```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt các thư viện cần thiết
npm install

# 3. Đồng bộ Prisma Client với Database (BẮT BUỘC CHẠY LẦN ĐẦU)
npx prisma generate

# 4. Khởi động server backend
npm run dev
```

Khi chạy thành công, terminal sẽ thông báo:
```text
Server Backend đang chạy tại: http://localhost:5000
```

- **Kiểm tra server:** Mở `http://localhost:5000` -> Hiển thị thông báo server hoạt động.
- **Kiểm tra API dữ liệu:** Mở `http://localhost:5000/api/random/options` -> Hiển thị danh mục và nguyên liệu dạng JSON.

---

## 🎨 BƯỚC 4: Cài đặt và Chạy Frontend (Terminal 2)

Giữ nguyên Terminal 1 đang chạy Backend. Mở thêm **Terminal thứ hai** và chạy:

```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt các thư viện
npm install

# 3. Khởi động máy chủ frontend
npm run dev
```

Lệnh `npm run dev` sẽ tự động chạy song song:
- Lắng nghe và build Tailwind CSS tự động (`npm run build:css`).
- Máy chủ web tĩnh phục vụ giao diện (`npm run start`).

Terminal sẽ hiển thị địa chỉ truy cập:
```text
http://localhost:3000
```

Mở trình duyệt truy cập:
👉 **`http://localhost:3000/#/`** để trải nghiệm đầy đủ giao diện Trang chủ, Vòng quay Gacha và các tính năng!

---

## 🔍 Bảng xử lý các lỗi thường gặp (Troubleshooting)

| Tình trạng lỗi | Nguyên nhân | Cách xử lý |
| :--- | :--- | :--- |
| `[nodemon] app crashed - waiting for file changes...` | Chưa sinh file Prisma Client | Chạy lệnh `npx prisma generate` trong thư mục `backend`. |
| `EPERM: operation not permitted ... query_engine-windows.dll.node` | Server backend đang chạy và khóa file khi chạy `prisma generate` | Nhấn `Ctrl + C` tắt backend trước, chạy `npx prisma generate`, rồi chạy lại `npm run dev`. |
| API trả về lỗi `500 Internal Server Error` | Sai mật khẩu MySQL hoặc sai tên database trong `.env` | Kiểm tra lại file `backend/.env`. Chú ý mã hóa ký tự `@` thành `%40` nếu mật khẩu có chứa `@`. |
| Giao diện bị lệch mảng trắng khi chọn nguyên liệu | Trình duyệt tự cuộn focus vào input ẩn | Đã được khắc phục sẵn với thuộc tính `overflow-clip` và `relative` trong `frontend/js/views/khach/Home.js`. |
| Không load được icon FontAwesome | Chế độ Tracking Prevention của trình duyệt Edge | Không ảnh hưởng đến giao diện, icon vẫn hiển thị bình thường. |

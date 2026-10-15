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
>
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

| Tình trạng lỗi                                                    | Nguyên nhân                                                          | Cách xử lý                                                                                                                |
| :------------------------------------------------------------------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `[nodemon] app crashed - waiting for file changes...`              | Chưa sinh file Prisma Client                                          | Chạy lệnh`npx prisma generate` trong thư mục `backend`.                                                              |
| `EPERM: operation not permitted ... query_engine-windows.dll.node` | Server backend đang chạy và khóa file khi chạy`prisma generate` | Nhấn`Ctrl + C` tắt backend trước, chạy `npx prisma generate`, rồi chạy lại `npm run dev`.                      |
| API trả về lỗi`500 Internal Server Error`                       | Sai mật khẩu MySQL hoặc sai tên database trong`.env`             | Kiểm tra lại file`backend/.env`. Chú ý mã hóa ký tự `@` thành `%40` nếu mật khẩu có chứa `@`.          |
| Giao diện bị lệch mảng trắng khi chọn nguyên liệu            | Trình duyệt tự cuộn focus vào input ẩn                           | Đã được khắc phục sẵn với thuộc tính`overflow-clip` và `relative` trong `frontend/js/views/khach/Home.js`. |
| Không load được icon FontAwesome                                 | Chế độ Tracking Prevention của trình duyệt Edge                  | Không ảnh hưởng đến giao diện, icon vẫn hiển thị bình thường.                                                   |

---

## Link web

http://localhost:3000/#/

---

## Link gọi API

> Base URL backend: `http://localhost:5000/api`
>
> Các API có ghi **cần đăng nhập** phải gửi header:
>
> ```http
> Authorization: Bearer <token_dang_nhap>
> ```
>
> Lấy token từ API đăng nhập hoặc sau khi đăng nhập trên frontend.

### Auth

| Method | Link API | Chức năng |
| :----- | :------- | :-------- |
| POST   | <nobr>`http://localhost:5000/api/auth/login`</nobr> | Đăng nhập |
| POST   | <nobr>`http://localhost:5000/api/auth/register`</nobr> | Đăng ký |
| POST   | <nobr>`http://localhost:5000/api/auth/logout`</nobr> | Đăng xuất, cần đăng nhập |
| GET    | <nobr>`http://localhost:5000/api/auth/me`</nobr> | Lấy thông tin tài khoản đang đăng nhập |
| PATCH  | <nobr>`http://localhost:5000/api/auth/me`</nobr> | Cập nhật thông tin cá nhân (tên, số điện thoại, bio, avatar), cần đăng nhập |
| GET    | <nobr>`http://localhost:5000/api/auth/me/posts`</nobr> | Lấy danh sách bài viết của tôi (kèm trạng thái: pending, active, hidden & lý do ẩn), cần đăng nhập |
| GET    | <nobr>`http://localhost:5000/api/auth/me/favorites`</nobr> | Lấy danh sách món ăn yêu thích của tôi, cần đăng nhập |
| POST   | <nobr>`http://localhost:5000/api/auth/me/favorites/1`</nobr> | Thêm món ăn vào danh sách yêu thích của tôi, cần đăng nhập |
| DELETE | <nobr>`http://localhost:5000/api/auth/me/favorites/1`</nobr> | Xóa món ăn khỏi danh sách yêu thích, cần đăng nhập |

### Random món ăn

| Method | Link API | Chức năng |
| :----- | :------- | :-------- |
| GET    | <nobr>`http://localhost:5000/api/random/options`</nobr> | Lấy danh sách nguyên liệu và danh mục cho máy random |
| GET    | <nobr>`http://localhost:5000/api/random?quantity=3`</nobr> | Random 3 món |
| GET    | <nobr>`http://localhost:5000/api/random?quantity=6&ingredients=Bi%20do,Ca%20basa&categories=mon-canh,mon-chien&cook_time=medium`</nobr> | Random theo nguyên liệu, danh mục, thời gian nấu |

`cook_time` hỗ trợ: `quick` là dưới hoặc bằng 15 phút, `medium` là 15 - 30 phút, `long` là trên 30 phút.

### Món ăn

| Method | Link API | Chức năng |
| :----- | :------- | :-------- |
| GET    | <nobr>`http://localhost:5000/api/foods`</nobr> | Lấy danh sách món ăn |
| GET    | <nobr>`http://localhost:5000/api/foods?search=ga&page=1&limit=12`</nobr> | Tìm kiếm món ăn |
| GET    | <nobr>`http://localhost:5000/api/foods?category=mon-canh&cook_time=under_15&sort=time_asc`</nobr> | Lọc món ăn theo danh mục, thời gian, sắp xếp |
| GET    | <nobr>`http://localhost:5000/api/foods/options`</nobr> | Lấy danh mục và nguyên liệu cho bộ lọc |
| GET    | <nobr>`http://localhost:5000/api/foods/quick-suggestions`</nobr> | Lấy gợi ý nhanh |
| GET    | <nobr>`http://localhost:5000/api/foods/1`</nobr> | Xem chi tiết món ăn theo ID hoặc slug |

`cook_time` của `/api/foods` hỗ trợ: `all`, `under_15`, `15_to_30`, `above_30`.
`sort` hỗ trợ: `newest`, `time_asc`, `time_desc`, `name_asc`.

### Bài viết cộng đồng

| Method | Link API | Chức năng |
| :----- | :------- | :-------- |
| GET    | <nobr>`http://localhost:5000/api/posts?filter=all&page=1&limit=10`</nobr> | Lấy danh sách bài viết đã duyệt hiển thị công khai |
| GET    | <nobr>`http://localhost:5000/api/posts?filter=newest`</nobr> | Lọc bài viết mới nhất |
| GET    | <nobr>`http://localhost:5000/api/posts?filter=liked`</nobr> | Lọc bài viết nhiều lượt thích |
| GET    | <nobr>`http://localhost:5000/api/posts?filter=trending`</nobr> | Lọc bài viết nổi bật |
| GET    | <nobr>`http://localhost:5000/api/posts?filter=random`</nobr> | Lấy bài viết ngẫu nhiên |
| GET    | <nobr>`http://localhost:5000/api/posts/featured?limit=4`</nobr> | Lấy bài viết nổi bật cho trang chủ |
| GET    | <nobr>`http://localhost:5000/api/posts/1`</nobr> | Xem chi tiết bài viết |
| POST   | <nobr>`http://localhost:5000/api/posts`</nobr> | Đăng bài viết (trạng thái ban đầu `pending` chờ kiểm duyệt), cần đăng nhập |
| POST   | <nobr>`http://localhost:5000/api/posts/1/like`</nobr> | Thả tim hoặc bỏ tim bài viết, cần đăng nhập |
| POST   | <nobr>`http://localhost:5000/api/posts/1/report`</nobr> | Báo cáo vi phạm bài viết (kèm `reason`, `description`), cần đăng nhập |

### Bình luận

| Method | Link API | Chức năng |
| :----- | :------- | :-------- |
| GET    | <nobr>`http://localhost:5000/api/posts/1/comments?page=1&limit=10`</nobr> | Lấy bình luận của bài viết |
| POST   | <nobr>`http://localhost:5000/api/posts/1/comments`</nobr> | Thêm bình luận, cần đăng nhập |
| PATCH  | <nobr>`http://localhost:5000/api/comments/1`</nobr> | Sửa bình luận, cần đăng nhập |
| DELETE | <nobr>`http://localhost:5000/api/comments/1`</nobr> | Ẩn/xóa mềm bình luận, cần đăng nhập |
| POST   | <nobr>`http://localhost:5000/api/comments/1/report`</nobr> | Báo cáo vi phạm bình luận (kèm `reason`, `description`), cần đăng nhập |

### Admin

> Các API admin cần tài khoản đăng nhập có `role = admin`.

| Method | Link API | Chức năng |
| :----- | :------- | :-------- |
| GET    | <nobr>`http://localhost:5000/api/admin/dashboard`</nobr> | Lấy số liệu tổng quan dashboard |
| GET    | <nobr>`http://localhost:5000/api/admin/users?page=1&limit=10`</nobr> | Lấy danh sách người dùng |
| GET    | <nobr>`http://localhost:5000/api/admin/users?search=admin&role=admin&status=active`</nobr> | Tìm/lọc người dùng |
| POST   | <nobr>`http://localhost:5000/api/admin/users`</nobr> | Tạo người dùng |
| GET    | <nobr>`http://localhost:5000/api/admin/users/1`</nobr> | Xem chi tiết người dùng |
| PATCH  | <nobr>`http://localhost:5000/api/admin/users/1/status`</nobr> | Khóa/mở khóa người dùng |
| GET    | <nobr>`http://localhost:5000/api/admin/foods/options`</nobr> | Lấy options quản lý món ăn |
| GET    | <nobr>`http://localhost:5000/api/admin/foods?page=1&limit=10`</nobr> | Lấy danh sách món ăn trong admin |
| GET    | <nobr>`http://localhost:5000/api/admin/foods?search=ga&status=active&sort=time_asc`</nobr> | Tìm/lọc món ăn trong admin |
| POST   | <nobr>`http://localhost:5000/api/admin/foods`</nobr> | Tạo món ăn |
| GET    | <nobr>`http://localhost:5000/api/admin/foods/1`</nobr> | Xem chi tiết món ăn |
| PATCH  | <nobr>`http://localhost:5000/api/admin/foods/1`</nobr> | Cập nhật món ăn |
| PATCH  | <nobr>`http://localhost:5000/api/admin/foods/1/status`</nobr> | Ẩn/hiện món ăn |
| GET    | <nobr>`http://localhost:5000/api/admin/posts?status=pending&page=1&limit=10`</nobr> | Lấy danh sách bài viết kiểm duyệt (lọc `status`: `pending`, `active`, `hidden`; tìm kiếm `search`) |
| GET    | <nobr>`http://localhost:5000/api/admin/posts/1`</nobr> | Xem chi tiết bài viết (kèm thông tin tác giả, bình luận, lượt thích) |
| PATCH  | <nobr>`http://localhost:5000/api/admin/posts/1/status`</nobr> | Duyệt bài (`active`), ẩn bài viết (`hidden` kèm `reason`), hoặc đưa về chờ duyệt (`pending`) |
| DELETE | <nobr>`http://localhost:5000/api/admin/posts/1`</nobr> | Xóa bài viết vĩnh viễn (xóa kèm các báo cáo, bình luận, lượt thích liên quan) |
| GET    | <nobr>`http://localhost:5000/api/admin/reports?status=pending&page=1&limit=10`</nobr> | Lấy danh sách báo cáo vi phạm cộng đồng (lọc `status`: `pending`, `resolved`, `rejected`) |
| PATCH  | <nobr>`http://localhost:5000/api/admin/reports/1/status`</nobr> | Cập nhật trạng thái xử lý báo cáo vi phạm (`resolved`, `rejected`, `pending`) |
| PATCH  | <nobr>`http://localhost:5000/api/admin/comments/1/status`</nobr> | Cập nhật trạng thái bình luận (`active`, `hidden`), ẩn hoặc khôi phục bình luận vi phạm |

### Ảnh tĩnh từ backend

| Link | Chức năng |
| :--- | :-------- |
| <nobr>`http://localhost:5000/images/foods/thit-kho-trung.jpg`</nobr> | Ảnh món ăn |
| <nobr>`http://localhost:5000/images/posts/post-1.jpg`</nobr> | Ảnh bài viết |
| <nobr>`http://localhost:5000/images/users/admin.jpg`</nobr> | Ảnh người dùng |

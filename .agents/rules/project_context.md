# Project Context: Hôm Nay Ăn Gì (What to Eat Today)

## 1. Tổng quan Dự án (Project Overview)
Dự án "Hôm nay ăn gì" là một nền tảng web ứng dụng giúp người dùng giải quyết vấn đề "hôm nay ăn gì", quản lý danh sách đi chợ, và tương tác với cộng đồng nấu ăn.

## 2. Luồng Nghiệp Vụ (Business Logic)

### 2.1. VAI TRÒ: NGƯỜI DÙNG (GUEST / USER)
- **Xác thực:** Trang chủ → Đăng ký / Đăng nhập → Thành công.
- **Random bữa ăn:** Trang chủ → Random món ăn → Chọn (Số lượng, Nguyên liệu, Loại món) → Kết quả → Xem món / Random lại / Tạo list đi chợ.
- **Khám phá món ăn:** Trang chủ → Món ăn → Tìm kiếm / Lọc (theo nguyên liệu/loại) → Chi tiết món → Lưu yêu thích / Thêm list đi chợ.
- **Đi chợ:** Kết quả Random / Chi tiết món → Thêm vào list đi chợ → Danh sách đi chợ → Đánh dấu đã mua.
- **Tương tác Cộng đồng:** Trang chủ → Cộng đồng → Danh sách bài viết → Chi tiết bài → Thả tim / Bình luận / Chia sẻ / Báo cáo.
- **Đăng bài Cộng đồng:** Cộng đồng → Đăng bài → (Đăng nhập nếu chưa) → Soạn nội dung (Tiêu đề, ảnh, chữ) → Đăng thành công.
- **Tài khoản & Cá nhân:** Trang chủ → Tài khoản → Hồ sơ / Đổi mật khẩu / Xem món yêu thích / Đăng xuất.
- **Quản lý bài viết của tôi:** Tài khoản → Bài viết của tôi → Chọn bài → Xem / Sửa / Xóa.

### 2.2. VAI TRÒ: ADMIN (QUẢN TRỊ VIÊN)
- **Đăng nhập hệ thống:** Đăng nhập Admin → Dashboard.
- **Quản lý Tài khoản (User):** Dashboard → Người dùng → Danh sách → Tìm kiếm → Chi tiết → Khóa / Mở khóa / Xóa.
- **Quản lý Món ăn:** Dashboard → Món ăn → Danh sách → Thêm (Nhập thông tin, danh mục, nguyên liệu, bước nấu) / Sửa / Xóa / Xem.
- **Quản lý Thuộc tính:** Dashboard → Nguyên liệu / Danh mục → Danh sách → Thêm / Sửa / Xóa.
- **Kiểm duyệt Nội dung:** Dashboard → Bài đăng / Bình luận → Xem chi tiết → Ẩn / Xóa vi phạm.
- **Xử lý Báo cáo:** Dashboard → Báo cáo → Danh sách → Xem nội dung → Bỏ qua / Xóa nội dung vi phạm.

## 3. Cấu trúc Database (ERD)

Dựa trên sơ đồ ERD, hệ thống bao gồm các bảng và quan hệ sau:

1. **Users**
   - PK: `id_user`
   - Fields: name, email, password, avatar, role, status, created_at, updated_at
2. **Foods**
   - PK: `id_food`
   - FK: `id_category`
   - Fields: name, slug, description, image, cooking_time, servings, status, created_at, updated_at
3. **Categories**
   - PK: `id_Category`
   - Fields: name, slug, created_at, updated_at
4. **Ingredients**
   - PK: `id_ingredient`
   - Fields: name, unit, updated_at, created_at
5. **Food_Ingredients**
   - PK: `id_Food_Ingredient`
   - FK: `id_food`, `id_ingredient`
   - Fields: quantity, note
6. **Recipe_steps**
   - PK: `id_Recipe_steps`
   - FK: `id_food`
   - Fields: step_number, instruction
7. **Favorites**
   - PK: `id_favorites`
   - FK: `id_user`, `id_food`
   - Fields: created_at
8. **Shopping_lists**
   - PK: `id_shopping_list`
   - FK: `id_user`, `id_food`
   - Fields: created_at
9. **Shopping_lists_items**
   - PK: `id_shopping_list_item`
   - FK: `id_shopping_list`, `id_ingredient`
   - Fields: quantity, unit, is_checked
10. **Post**
    - PK: `id_post`
    - FK: `id_user`, `id_food`
    - Fields: title, content, image, status, created_at, updated_at
11. **Comment**
    - PK: `id_comment`
    - FK: `id_post`, `id_user`
    - Fields: content, status, created_at, updated_at
12. **post_likes**
    - PK: `id_post_like`
    - FK: `id_post`, `id_user`
    - Fields: created_at
13. **report**
    - PK: `id_report`
    - FK: `id_user`
    - Fields: target_type, target_id, reason, description, status, created_at, updated_at
14. **Notifications**
    - PK: `id_notification`
    - FK: `id_user`
    - Fields: type, title, message, is_read, created_at

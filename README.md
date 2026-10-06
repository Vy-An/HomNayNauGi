# HomNayNauGi

## Cách chạy dự án

### 1. Cài package

Mở terminal tại thư mục gốc dự án, sau đó chạy:

```bash
cd backend
npm install
```

Mở thêm terminal khác:

```bash
cd frontend
npm install
```

### 2. Chạy backend

Trong thư mục `backend`, chạy:

```bash
npm run dev
```

Backend sẽ chạy tại:

```txt
http://localhost:5000
```

API random món ăn:

```txt
http://localhost:5000/api/random
```

### 3. Chạy frontend

Trong thư mục `frontend`, chạy:

```bash
npm start
```

Frontend thường sẽ chạy tại:

```txt
http://localhost:3000
```

Nếu terminal hiện port khác, hãy mở đúng link mà terminal hiển thị.

### 4. Link xem web hoàn chỉnh

Sau khi đã chạy đủ MySQL, backend và frontend:

- Web chính: `http://localhost:3000/#/`
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`
- API random món ăn: `http://localhost:5000/api/random`
- API danh sách nguyên liệu/loại món: `http://localhost:5000/api/random/options`

Mở link này trên trình duyệt để xem web hoàn chỉnh:

```txt
http://localhost:3000/#/
```

Luồng chạy của dự án:

```txt
Frontend http://localhost:3000/#/
-> gọi API Backend http://localhost:5000/api
-> Backend kết nối MySQL bằng DATABASE_URL
-> Database hom_nay_an_gi
```

Nếu frontend hiện port khác, ví dụ `3001`, thì mở:

```txt
http://localhost:3001/#/
```

Lưu ý: backend cần có file `backend/.env` chứa `DATABASE_URL` để kết nối MySQL.

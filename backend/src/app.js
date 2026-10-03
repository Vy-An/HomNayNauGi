const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (Hiện tại trống, sẽ import sau khi code xong)
// const foodRoutes = require('./routes/food.routes');
// app.use('/api/foods', foodRoutes);

// Route mặc định kiểm tra server
app.get('/', (req, res) => {
    res.send('Server Hôm Nay Ăn Gì đang chạy (Kiến trúc chuẩn)!');
});

// Giả lập API trả về món ăn (để test Frontend)
app.get('/api/foods', (req, res) => {
    res.json({
        success: true,
        data: [
            { id: 1, name: "Phở Bò", description: "Món ăn truyền thống" },
            { id: 2, name: "Cơm Tấm", description: "Đặc sản Sài Gòn" }
        ]
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Backend đang chạy tại: http://localhost:${PORT}`);
});

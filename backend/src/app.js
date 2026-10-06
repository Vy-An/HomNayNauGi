const express = require('express');
const cors = require('cors');
require('dotenv').config();
const randomRoutes = require('./routes/random.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/random', randomRoutes);

// Route mặc định kiểm tra server
app.get('/', (req, res) => {
    res.send('Server Hôm Nay Ăn Gì đang chạy (Kiến trúc chuẩn)!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Backend đang chạy tại: http://localhost:${PORT}`);
});

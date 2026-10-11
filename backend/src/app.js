const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const randomRoutes = require('./routes/random.routes');
const postRoutes = require('./routes/post.routes');
const foodRoutes = require('./routes/food.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/api/random', randomRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/foods', foodRoutes);

// Route mặc định kiểm tra server
app.get('/', (req, res) => {
    res.send('Server Hôm Nay Ăn Gì đang chạy (Kiến trúc chuẩn)!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Backend đang chạy tại: http://localhost:${PORT}`);
});

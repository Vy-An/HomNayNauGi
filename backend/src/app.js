const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const randomRoutes = require('./routes/random.routes');
const postRoutes = require('./routes/post.routes');
const foodRoutes = require('./routes/food.routes');
const authRoutes = require('./routes/auth.routes');
const commentRoutes = require('./routes/comment.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/random', randomRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Server Hôm Nay Ăn Gì đang chạy (Kiến trúc chuẩn)!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Backend đang chạy tại: http://localhost:${PORT}`);
});

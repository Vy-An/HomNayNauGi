import { fetchAPI } from '../api.js';

export default async function Home() {
    // Gọi API lấy danh sách món ăn
    const result = await fetchAPI('/foods');
    let foodCards = '<p>Không thể tải dữ liệu món ăn.</p>';

    if (result && result.success) {
        foodCards = result.data.map(food => `
            <div class="food-card">
                <h3>${food.name}</h3>
                <p>${food.description || 'Chưa có mô tả'}</p>
                <button>Xem chi tiết</button>
            </div>
        `).join('');
    }

    return `
        <section id="food-list">
            <h2>Khám phá các món ăn</h2>
            <div class="grid-container">
                ${foodCards}
            </div>
        </section>
    `;
}

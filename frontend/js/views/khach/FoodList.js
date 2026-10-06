import FoodCard from '../../components/FoodCard.js';

const FoodList = {
    render: async () => {
        // Dữ liệu mock (sau này fetch từ API)
        const dummyFoods = [
            { id: 1, name: 'Thịt Kho Trứng', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', time: '45 phút', likes: '2.5k', author: { name: 'Mẹ Bông' } },
            { id: 2, name: 'Gà Xào Sả Ớt', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500', time: '30 phút', likes: '1.1k', author: { name: 'Lan Anh' } },
            { id: 3, name: 'Rau Muống Xào', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500', time: '10 phút', likes: '3.4k', author: { name: 'Chef Tùng' } },
            { id: 4, name: 'Sườn Chua Ngọt', image: 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=500', time: '40 phút', likes: '4.2k', author: { name: 'Bếp Của Hoa' } },
            { id: 5, name: 'Canh Chua Cá Lóc', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', time: '25 phút', likes: '1.5k', author: { name: 'Gia Đình' } },
            { id: 6, name: 'Đậu Hũ Dồn Thịt', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500', time: '35 phút', likes: '890', author: { name: 'Lan Anh' } },
        ];

        // Render danh sách thẻ món ăn
        const foodCardsHTML = dummyFoods.map(food => FoodCard(food)).join('');

        return `
            <div class="bg-primary-light/5 py-8">
                <div class="container mx-auto px-4 lg:px-8">
                    
                    <!-- Breadcrumb & Title -->
                    <div class="mb-8">
                        <div class="text-sm text-text-muted mb-2">
                            <a href="#/" class="hover:text-primary">Trang chủ</a> <span class="mx-2">/</span> <span class="text-text-main font-semibold">Danh sách món ăn</span>
                        </div>
                        <h1 class="text-3xl font-bold text-text-main">Khám phá Từ Điển Ẩm Thực</h1>
                    </div>

                    <div class="flex flex-col lg:flex-row gap-8">
                        <!-- Cột Trái: Bộ Lọc (Filter) -->
                        <div class="w-full lg:w-1/4">
                            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                                <h3 class="font-bold text-lg mb-4 flex items-center gap-2"><i class="fa-solid fa-magnifying-glass text-primary"></i> Tìm kiếm & Lọc</h3>
                                
                                <div class="space-y-6">
                                    <!-- Search input -->
                                    <div>
                                        <input type="text" placeholder="Tên món ăn, nguyên liệu..." class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition">
                                    </div>
                                    
                                    <!-- Lọc theo Danh mục -->
                                    <div>
                                        <h4 class="font-semibold text-text-main mb-3">Loại món</h4>
                                        <div class="space-y-2">
                                            <label class="flex items-center gap-2 cursor-pointer text-text-muted hover:text-primary transition"><input type="checkbox" class="rounded text-primary"> Món Mặn</label>
                                            <label class="flex items-center gap-2 cursor-pointer text-text-muted hover:text-primary transition"><input type="checkbox" class="rounded text-primary"> Món Canh</label>
                                            <label class="flex items-center gap-2 cursor-pointer text-text-muted hover:text-primary transition"><input type="checkbox" class="rounded text-primary"> Món Xào</label>
                                            <label class="flex items-center gap-2 cursor-pointer text-text-muted hover:text-primary transition"><input type="checkbox" class="rounded text-primary"> Món Chay</label>
                                        </div>
                                    </div>

                                    <button class="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition">Áp dụng bộ lọc</button>
                                </div>
                            </div>
                        </div>

                        <!-- Cột Phải: Danh sách món ăn -->
                        <div class="w-full lg:w-3/4">
                            <div class="flex justify-between items-center mb-6">
                                <span class="text-text-muted">Hiển thị <span class="font-bold text-text-main">120</span> kết quả</span>
                                <select class="px-4 py-2 border border-gray-200 rounded-lg text-text-main focus:outline-none">
                                    <option>Mới nhất</option>
                                    <option>Yêu thích nhiều nhất</option>
                                    <option>Dễ làm nhất</option>
                                </select>
                            </div>
                            
                            <!-- Grid món ăn -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                ${foodCardsHTML}
                            </div>
                            
                            <!-- Phân trang (Pagination Mockup) -->
                            <div class="flex justify-center gap-2 mt-12">
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 transition"><i class="fa-solid fa-chevron-left"></i></button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold shadow-md">1</button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-text-main hover:bg-gray-50 transition">2</button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-text-main hover:bg-gray-50 transition">3</button>
                                <button class="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 transition"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

export default FoodList;

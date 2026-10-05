const FoodDetail = {
    render: async (id) => {
        // Trong thực tế sẽ gọi fetchAPI('/foods/' + id)
        // Đây là data mockup
        const food = {
            id: id || 1,
            name: 'Thịt Kho Trứng Cút',
            description: 'Món ăn truyền thống đậm đà, thịt mềm tan, trứng cút thấm vị, ăn với cơm trắng là hết sẩy.',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
            time: '45 phút',
            portions: '3-4 người',
            difficulty: 'Trung bình',
            ingredients: [
                { name: 'Thịt ba chỉ', amount: '500g' },
                { name: 'Trứng cút', amount: '20 quả' },
                { name: 'Nước dừa tươi', amount: '1 trái' },
                { name: 'Hành tím, tỏi, ớt', amount: 'Vừa đủ' },
                { name: 'Nước mắm, đường, tiêu', amount: 'Tùy khẩu vị' }
            ],
            steps: [
                'Sơ chế nguyên liệu: Rửa sạch thịt ba chỉ, thái miếng vuông vừa ăn. Trứng cút luộc chín, bóc vỏ. Hành, tỏi băm nhỏ.',
                'Ướp thịt: Ướp thịt với hành tỏi băm, 2 muỗng nước mắm, 1 muỗng đường, 1/2 muỗng tiêu trong 30 phút.',
                'Thắng nước màu: Cho 2 muỗng đường vào nồi, đun đến khi có màu cánh gián thì cho 1 muỗng nước vào.',
                'Kho thịt: Cho thịt đã ướp vào nồi nước màu, đảo đều cho săn lại. Đổ nước dừa tươi vào ngập thịt, đun lửa riu riu.',
                'Hoàn thành: Khi thịt bắt đầu mềm, cho trứng cút vào kho cùng. Nêm nếm lại cho vừa miệng. Đun đến khi nước kho sánh lại là được.'
            ]
        };

        const ingredientsHTML = food.ingredients.map(ing => `
            <li class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <span class="text-text-main font-medium">${ing.name}</span>
                <span class="text-text-muted text-sm bg-gray-100 px-3 py-1 rounded-full">${ing.amount}</span>
            </li>
        `).join('');

        const stepsHTML = food.steps.map((step, index) => `
            <div class="flex gap-4 mb-6">
                <div class="shrink-0 w-8 h-8 bg-green-100 text-primary font-bold rounded-full flex items-center justify-center">
                    ${index + 1}
                </div>
                <div>
                    <h4 class="font-bold text-text-main mb-1">Bước ${index + 1}</h4>
                    <p class="text-text-muted leading-relaxed">${step}</p>
                </div>
            </div>
        `).join('');

        return `
            <div class="bg-white">
                <!-- Header / Breadcrumb -->
                <div class="bg-gray-50 border-b border-gray-100 py-4">
                    <div class="container mx-auto px-4 lg:px-8 text-sm text-text-muted">
                        <a href="#/" class="hover:text-primary transition">Trang chủ</a> 
                        <span class="mx-2">/</span> 
                        <a href="#/danh-sach" class="hover:text-primary transition">Danh sách món ăn</a>
                        <span class="mx-2">/</span> 
                        <span class="text-text-main font-semibold">${food.name}</span>
                    </div>
                </div>

                <div class="container mx-auto px-4 lg:px-8 py-8 md:py-12">
                    <div class="flex flex-col lg:flex-row gap-10">
                        <!-- Ảnh Món Ăn -->
                        <div class="w-full lg:w-5/12">
                            <div class="rounded-3xl overflow-hidden shadow-lg sticky top-24">
                                <img src="${food.image}" alt="${food.name}" class="w-full h-[400px] object-cover">
                                <div class="absolute top-4 right-4 flex gap-2">
                                    <button class="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition shadow-sm" title="Yêu thích">
                                        <i class="fa-solid fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Thông tin Chi Tiết -->
                        <div class="w-full lg:w-7/12">
                            <div class="mb-8">
                                <h1 class="text-3xl md:text-4xl font-extrabold text-text-main mb-4">${food.name}</h1>
                                <p class="text-lg text-text-muted leading-relaxed">${food.description}</p>
                            </div>

                            <div class="flex flex-wrap gap-6 mb-10 pb-8 border-b border-gray-100">
                                <div class="flex items-center gap-3">
                                    <span class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl"><i class="fa-solid fa-clock"></i></span>
                                    <div>
                                        <p class="text-sm text-text-muted">Thời gian</p>
                                        <p class="font-bold text-text-main">${food.time}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl"><i class="fa-solid fa-users"></i></span>
                                    <div>
                                        <p class="text-sm text-text-muted">Khẩu phần</p>
                                        <p class="font-bold text-text-main">${food.portions}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl"><i class="fa-solid fa-star"></i></span>
                                    <div>
                                        <p class="text-sm text-text-muted">Độ khó</p>
                                        <p class="font-bold text-text-main">${food.difficulty}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <!-- Nguyên liệu -->
                                <div>
                                    <div class="flex justify-between items-end mb-4">
                                        <h3 class="text-2xl font-bold text-text-main flex items-center gap-2"><i class="fa-solid fa-leaf text-green-500"></i> Nguyên liệu</h3>
                                    </div>
                                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                                        <ul class="m-0 p-0">
                                            ${ingredientsHTML}
                                        </ul>
                                    </div>
                                    <!-- Nút Mua Sắm -->
                                    <button id="add-to-cart-btn" class="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl flex items-center justify-center gap-2 transition shadow-md">
                                        <i class="fa-solid fa-cart-shopping"></i> Thêm vào danh sách đi chợ
                                    </button>
                                </div>

                                <!-- Các bước thực hiện -->
                                <div>
                                    <h3 class="text-2xl font-bold text-text-main mb-6 flex items-center gap-2"><i class="fa-solid fa-fire-burner text-orange-500"></i> Cách làm</h3>
                                    <div class="pr-4">
                                        ${stepsHTML}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Toast notification -->
            <div id="toast-msg" class="fixed bottom-5 right-5 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3">
                <span class="text-green-400"><i class="fa-solid fa-check"></i></span>
                <span>Đã thêm nguyên liệu vào Danh sách đi chợ!</span>
            </div>
        `;
    },
    
    afterRender: async (id) => {
        // Xử lý nút Thêm vào danh sách đi chợ
        const btnAdd = document.getElementById('add-to-cart-btn');
        const toast = document.getElementById('toast-msg');
        
        if (btnAdd) {
            btnAdd.addEventListener('click', () => {
                // Logic lưu LocalStorage giả lập
                let cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
                cart.push({ id, name: 'Thịt Kho Trứng Cút', addedAt: new Date().toISOString() });
                localStorage.setItem('shoppingCart', JSON.stringify(cart));
                
                // Hiển thị Toast
                toast.classList.remove('translate-y-20', 'opacity-0');
                
                // Ẩn Toast sau 3 giây
                setTimeout(() => {
                    toast.classList.add('translate-y-20', 'opacity-0');
                }, 3000);
            });
        }
    }
};

export default FoodDetail;

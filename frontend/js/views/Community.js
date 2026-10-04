const Community = {
    render: async () => {
        // Dữ liệu giả lập cho bài viết cộng đồng
        const posts = [
            {
                id: 1,
                author: { name: 'Nguyễn Thị Hoa', avatar: 'https://i.pravatar.cc/150?u=hoa' },
                time: '2 giờ trước',
                content: 'Hôm nay trời mưa lười đi chợ, có ngay mâm cơm gia đình đơn giản với thịt kho trứng và canh rau muống luộc. Ứng dụng gợi ý hay quá cả nhà ạ! 🥰',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
                likes: 124,
                comments: 15
            },
            {
                id: 2,
                author: { name: 'Minh Anh', avatar: 'https://i.pravatar.cc/150?u=minhanh' },
                time: '5 giờ trước',
                content: 'Cuối tuần trổ tài làm bún đậu mắm tôm theo công thức trên Hôm Nay Ăn Gì. Nước mắm pha bao dính, chồng khen tấm tắc luôn! 🥢',
                image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
                likes: 342,
                comments: 48
            }
        ];

        const postsHTML = posts.map(post => `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <!-- User Info -->
                <div class="flex items-center gap-4 mb-4">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="w-12 h-12 rounded-full object-cover">
                    <div>
                        <h4 class="font-bold text-text-main">${post.author.name}</h4>
                        <p class="text-sm text-text-muted">${post.time}</p>
                    </div>
                    <button class="ml-auto text-text-muted hover:text-primary transition">•••</button>
                </div>
                
                <!-- Content -->
                <p class="text-text-main leading-relaxed mb-4">${post.content}</p>
                <div class="rounded-xl overflow-hidden mb-4 bg-gray-50">
                    <img src="${post.image}" class="w-full max-h-[400px] object-cover cursor-pointer hover:opacity-95 transition">
                </div>
                
                <!-- Actions -->
                <div class="flex items-center gap-6 pt-4 border-t border-gray-50 text-text-muted font-medium">
                    <button class="flex items-center gap-2 hover:text-red-500 transition">
                        <i class="fa-solid fa-heart"></i> ${post.likes}
                    </button>
                    <button class="flex items-center gap-2 hover:text-primary transition">
                        <i class="fa-solid fa-comment"></i> ${post.comments} Bình luận
                    </button>
                    <button class="flex items-center gap-2 hover:text-primary transition ml-auto">
                        <i class="fa-solid fa-share-nodes"></i> Chia sẻ
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="bg-primary-light/5 py-8 min-h-screen">
                <div class="container mx-auto px-4 lg:px-8 max-w-5xl flex flex-col md:flex-row gap-8">
                    
                    <!-- Main Feed -->
                    <div class="w-full md:w-2/3">
                        
                        <!-- Create Post Box -->
                        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                            <div class="flex items-start gap-4">
                                <img src="https://i.pravatar.cc/150?u=user" alt="Bạn" class="w-12 h-12 rounded-full object-cover">
                                <div class="flex-1">
                                    <textarea placeholder="Bạn muốn chia sẻ mâm cơm hôm nay không?" class="w-full bg-gray-50 rounded-xl p-4 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none min-h-[100px] mb-3"></textarea>
                                    <div class="flex justify-between items-center">
                                        <button class="flex items-center gap-2 text-text-muted hover:text-primary transition px-3 py-2 rounded-lg hover:bg-green-50">
                                            <span class="text-xl"><i class="fa-solid fa-camera"></i></span> Thêm ảnh
                                        </button>
                                        <button class="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-full transition shadow-md">Đăng bài</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Posts List -->
                        <div id="community-feed">
                            ${postsHTML}
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="w-full md:w-1/3">
                        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 class="font-bold text-lg text-text-main mb-4"><i class="fa-solid fa-crown text-yellow-500"></i> Top tác giả nổi bật</h3>
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="https://i.pravatar.cc/150?u=hoa" class="w-10 h-10 rounded-full">
                                        <span class="font-semibold text-text-main">Nguyễn Thị Hoa</span>
                                    </div>
                                    <button class="text-sm font-bold text-primary hover:bg-green-50 px-3 py-1 rounded-full transition">Theo dõi</button>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="https://i.pravatar.cc/150?u=minhanh" class="w-10 h-10 rounded-full">
                                        <span class="font-semibold text-text-main">Minh Anh</span>
                                    </div>
                                    <button class="text-sm font-bold text-primary hover:bg-green-50 px-3 py-1 rounded-full transition">Theo dõi</button>
                                </div>
                            </div>

                            <hr class="border-gray-100 my-6">

                            <h3 class="font-bold text-lg text-text-main mb-4"><i class="fa-solid fa-fire text-orange-500"></i> Đang thịnh hành</h3>
                            <ul class="space-y-3 text-text-muted">
                                <li><a href="#" class="hover:text-primary transition">#MamComGiaDinh (2.5k bài)</a></li>
                                <li><a href="#" class="hover:text-primary transition">#BentoNhanhGon (1.2k bài)</a></li>
                                <li><a href="#" class="hover:text-primary transition">#EatClean (850 bài)</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
};

export default Community;

import { fetchAPI } from '../../api.js';

// ============================================================================
// RICH SAMPLE DATASET: 36 Authentic Vietnamese Dishes
// Conforms to Dish Entity: id, name, image, time, cooking_time_minutes, rating, 
// rating_count, likes, is_favorite, category, sub_category, difficulty, 
// description, ingredients, tags, author
// ============================================================================
const initialDishes = [
    {
        id: 1,
        name: 'Thịt Kho Trứng Nước Dừa',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
        time: '45 phút',
        cooking_time_minutes: 45,
        rating: 4.9,
        rating_count: '2.8k',
        likes: 1250,
        is_favorite: false,
        category: 'Món mặn',
        sub_category: 'viet',
        difficulty: 'Dễ làm',
        description: 'Món thịt kho hột vịt nước dừa xiêm béo ngậy, thịt ba chỉ mềm tan đậm đà, trứng cút ngấm vị truyền thống.',
        ingredients: ['Thịt heo', 'Trứng', 'Nước dừa', 'Hành tím', 'Nước mắm'],
        tags: ['Món mặn', 'Dễ làm', 'Món Việt'],
        author: { name: 'Mẹ Bông', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' }
    },
    {
        id: 2,
        name: 'Bún Chả Hà Nội Truyền Thống',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80',
        time: '40 phút',
        cooking_time_minutes: 40,
        rating: 4.8,
        rating_count: '3.1k',
        likes: 1980,
        is_favorite: false,
        category: 'Món nướng',
        sub_category: 'viet',
        difficulty: 'Trung bình',
        description: 'Chả thịt nướng than hoa thơm lừng ăn kèm bún tươi, rau sống và nước mắm chua ngọt đu đủ cà rốt giòn rụm.',
        ingredients: ['Thịt heo', 'Rau củ', 'Bún tươi', 'Nước mắm', 'Sả'],
        tags: ['Món nướng', 'Đặc sản', 'Món Việt'],
        author: { name: 'Bếp Của Lan', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }
    },
    {
        id: 3,
        name: 'Gà Xào Sả Ớt Cay Nồng',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=700&auto=format&fit=crop&q=80',
        time: '25 phút',
        cooking_time_minutes: 25,
        rating: 4.7,
        rating_count: '1.5k',
        likes: 890,
        is_favorite: false,
        category: 'Món xào',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Thịt gà ta săn chắc xào sả ớt đẫm vị cay thơm nức mũi, màu vàng ươm kích thích vị giác cực kỳ đưa cơm.',
        ingredients: ['Thịt gà', 'Sả', 'Ớt', 'Tỏi', 'Gừng'],
        tags: ['Món xào', 'Món nhanh', 'Đậm đà'],
        author: { name: 'Chef Tùng', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
    },
    {
        id: 4,
        name: 'Canh Chua Cá Lóc Nam Bộ',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=80',
        time: '30 phút',
        cooking_time_minutes: 30,
        rating: 4.9,
        rating_count: '2.4k',
        likes: 1420,
        is_favorite: false,
        category: 'Món canh',
        sub_category: 'viet',
        difficulty: 'Dễ làm',
        description: 'Tô canh chua cá lóc nấu cùng thơm, cà chua, dọc mùng, bạc hà và giá đỗ tươi mát giải nhiệt ngày nắng.',
        ingredients: ['Hải sản', 'Rau củ', 'Me', 'Bạc hà', 'Dọc mùng'],
        tags: ['Món canh', 'Thanh mát', 'Món Việt'],
        author: { name: 'Gia Đình Bếp', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }
    },
    {
        id: 5,
        name: 'Bò Xào Lúc Lắc Khoai Tây',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&auto=format&fit=crop&q=80',
        time: '20 phút',
        cooking_time_minutes: 20,
        rating: 4.8,
        rating_count: '1.9k',
        likes: 1670,
        is_favorite: false,
        category: 'Món xào',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Thịt thăn bò mềm mọng ướp sốt tiêu đen xào lửa lớn với ớt chuông ba màu và khoai tây chiên giòn.',
        ingredients: ['Thịt bò', 'Rau củ', 'Ớt chuông', 'Hành tây', 'Bơ tỏi'],
        tags: ['Món xào', 'Món nhanh', 'Món ngon'],
        author: { name: 'Hoàng Nam', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
    },
    {
        id: 6,
        name: 'Sườn Xào Chua Ngọt',
        image: 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=700&auto=format&fit=crop&q=80',
        time: '35 phút',
        cooking_time_minutes: 35,
        rating: 4.9,
        rating_count: '3.5k',
        likes: 2100,
        is_favorite: false,
        category: 'Món xào',
        sub_category: 'viet',
        difficulty: 'Trung bình',
        description: 'Sườn heo non chặt vừa ăn đảo đều sốt cà chua, giấm táo và đường thốt nốt sánh óng ánh chua ngọt hài hòa.',
        ingredients: ['Thịt heo', 'Rau củ', 'Cà chua', 'Hành tây', 'Ớt chuông'],
        tags: ['Món xào', 'Đưa cơm', 'Món Việt'],
        author: { name: 'Cô Ba Sài Gòn', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' }
    },
    {
        id: 7,
        name: 'Đậu Hũ Nhồi Thịt Sốt Cà',
        image: 'https://images.unsplash.com/photo-1546069901-d1d0cf377fde?w=700&auto=format&fit=crop&q=80',
        time: '20 phút',
        cooking_time_minutes: 20,
        rating: 4.6,
        rating_count: '1.2k',
        likes: 780,
        is_favorite: false,
        category: 'Món mặn',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Đậu hũ chiên vàng nhồi thịt heo mộc nhĩ nấm hương, sốt cà chua tươi sánh mịn thơm ngậy ấm lòng bữa tối.',
        ingredients: ['Đậu hũ', 'Thịt heo', 'Rau củ', 'Cà chua', 'Hành lá'],
        tags: ['Món mặn', 'Món nhanh', 'Bình dân'],
        author: { name: 'Thanh Mai', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100' }
    },
    {
        id: 8,
        name: 'Rau Muống Xào Tỏi Xanh Giòn',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80',
        time: '10 phút',
        cooking_time_minutes: 10,
        rating: 4.7,
        rating_count: '2.1k',
        likes: 1150,
        is_favorite: false,
        category: 'Món xào',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Rau muống non xanh mướt chần nhanh xào lửa lớn cùng tỏi phi thơm nức mũi, giữ trọn độ giòn ngọt tự nhiên.',
        ingredients: ['Rau củ', 'Tỏi', 'Dầu hào', 'Nước mắm'],
        tags: ['Món xào', 'Dưới 15p', 'Rau xanh'],
        author: { name: 'Bếp Nhà Tôi', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100' }
    },
    {
        id: 9,
        name: 'Cá Hồi Áp Chảo Bơ Chanh',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&auto=format&fit=crop&q=80',
        time: '15 phút',
        cooking_time_minutes: 15,
        rating: 4.9,
        rating_count: '1.8k',
        likes: 1890,
        is_favorite: false,
        category: 'Món chiên',
        sub_category: 'au',
        difficulty: 'Dễ làm',
        description: 'Phi lê cá hồi tươi da giòn thịt mềm mọng nước, sốt bơ chanh vàng óng ăn kèm măng tây xào bơ tỏi.',
        ingredients: ['Hải sản', 'Rau củ', 'Bơ', 'Chanh vàng', 'Măng tây'],
        tags: ['Món Âu', 'Eat Clean', 'Cao cấp'],
        author: { name: 'Chef Julian', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' }
    },
    {
        id: 10,
        name: 'Canh Sườn Nấu Sấu Hà Nội',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80',
        time: '35 phút',
        cooking_time_minutes: 35,
        rating: 4.8,
        rating_count: '1.6k',
        likes: 920,
        is_favorite: false,
        category: 'Món canh',
        sub_category: 'viet',
        difficulty: 'Dễ làm',
        description: 'Vị chua thanh mát lành đặc trưng của quả sấu hòa quyện cùng sườn non ninh mềm béo ngậy chuẩn vị hè Bắc Bộ.',
        ingredients: ['Thịt heo', 'Rau củ', 'Quả sấu', 'Hành lá', 'Mùi tàu'],
        tags: ['Món canh', 'Món Việt', 'Chua thanh'],
        author: { name: 'Hà Nội Xưa', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100' }
    },
    {
        id: 11,
        name: 'Nem Rán Hà Nội Giòn Rụm',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80',
        time: '45 phút',
        cooking_time_minutes: 45,
        rating: 4.9,
        rating_count: '4.2k',
        likes: 2450,
        is_favorite: false,
        category: 'Món chiên',
        sub_category: 'viet',
        difficulty: 'Trung bình',
        description: 'Cuốn nem đầy đặn tôm thịt mộc nhĩ miến dong, chiên vàng ươm giòn tan chấm nước mắm tỏi ớt chua ngọt.',
        ingredients: ['Thịt heo', 'Hải sản', 'Trứng', 'Rau củ', 'Miến dong'],
        tags: ['Món chiên', 'Đặc sản', 'Món Tết'],
        author: { name: 'Bà Nội Nấu', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100' }
    },
    {
        id: 12,
        name: 'Đậu Hũ Chiên Sả Ớt Giòn Cay',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
        time: '15 phút',
        cooking_time_minutes: 15,
        rating: 4.7,
        rating_count: '980',
        likes: 650,
        is_favorite: false,
        category: 'Món chiên',
        sub_category: 'chay',
        difficulty: 'Dễ làm',
        description: 'Món ăn chay thanh đạm nhưng cực kỳ đưa cơm. Đậu hũ bên ngoài giòn rụm bên trong béo mềm phủ sả ớt phi vàng.',
        ingredients: ['Đậu hũ', 'Sả', 'Ớt', 'Hạt nêm chay'],
        tags: ['Món Chay', 'Món chiên', 'Dễ làm'],
        author: { name: 'Tâm An', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100' }
    },
    {
        id: 13,
        name: 'Chè Hạt Sen Long Nhãn',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
        time: '25 phút',
        cooking_time_minutes: 25,
        rating: 4.9,
        rating_count: '1.4k',
        likes: 1120,
        is_favorite: false,
        category: 'Món chiên',
        sub_category: 'ngot',
        difficulty: 'Dễ làm',
        description: 'Hạt sen bùi béo lồng bên trong cùi nhãn Hưng Yên mọng nước, nấu cùng đường phèn thanh mát bổ dưỡng.',
        ingredients: ['Hạt sen', 'Long nhãn', 'Đường phèn', 'Lá dứa'],
        tags: ['Món Ngọt', 'Tráng miệng', 'Thanh mát'],
        author: { name: 'Bếp Bánh & Chè', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100' }
    },
    {
        id: 14,
        name: 'Mì Ý Sốt Bò Bằm Bolognese',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=700&auto=format&fit=crop&q=80',
        time: '30 phút',
        cooking_time_minutes: 30,
        rating: 4.8,
        rating_count: '2.9k',
        likes: 1750,
        is_favorite: false,
        category: 'Món xào',
        sub_category: 'au',
        difficulty: 'Trung bình',
        description: 'Sợi mì Spaghetti dai ngon ngập tràn sốt cà chua thịt bò bằm đậm đà thơm thảo mộc Ý và phô mai Parmesan bào.',
        ingredients: ['Thịt bò', 'Rau củ', 'Cà chua', 'Mì Spaghetti', 'Phô mai'],
        tags: ['Món Âu', 'Món xào', 'Yêu thích'],
        author: { name: 'Chef Mario', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' }
    },
    {
        id: 15,
        name: 'Nấm Đùi Gà Kho Tiêu Chay',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
        time: '20 phút',
        cooking_time_minutes: 20,
        rating: 4.7,
        rating_count: '860',
        likes: 540,
        is_favorite: false,
        category: 'Món mặn',
        sub_category: 'chay',
        difficulty: 'Dễ làm',
        description: 'Nấm đùi gà giòn ngọt tự nhiên kho kẹo cùng nước tương thơm béo và tiêu sọ Phú Quốc cay nồng đậm vị.',
        ingredients: ['Nấm đùi gà', 'Rau củ', 'Tiêu xanh', 'Nước tương'],
        tags: ['Món Chay', 'Món mặn', 'Healthy'],
        author: { name: 'Bếp Chay Mộc', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=100' }
    },
    {
        id: 16,
        name: 'Mực Hấp Gừng Hành',
        image: 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=700&auto=format&fit=crop&q=80',
        time: '15 phút',
        cooking_time_minutes: 15,
        rating: 4.9,
        rating_count: '2.1k',
        likes: 1390,
        is_favorite: false,
        category: 'Món mặn',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Mực ống tươi rói hấp nhanh cùng gừng thái chỉ và hành hoa, giòn ngọt sần sật chấm muối ớt chanh chuẩn vị.',
        ingredients: ['Hải sản', 'Rau củ', 'Gừng tươi', 'Hành lá', 'Ớt sừng'],
        tags: ['Hải sản', 'Món nhanh', 'Thanh ngọt'],
        author: { name: 'Hải Sản Phố', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100' }
    },
    {
        id: 17,
        name: 'Sườn Nướng Mật Ong BBQ',
        image: 'https://images.unsplash.com/photo-1544025162-8314e3fc4585?w=700&auto=format&fit=crop&q=80',
        time: '50 phút',
        cooking_time_minutes: 50,
        rating: 4.9,
        rating_count: '3.7k',
        likes: 2890,
        is_favorite: false,
        category: 'Món nướng',
        sub_category: 'viet',
        difficulty: 'Trung bình',
        description: 'Sườn heo ướp mật ong rừng, dầu hào và tỏi nướng bằng nồi chiên không dầu thơm nức nở, màu cánh gián quyến rũ.',
        ingredients: ['Thịt heo', 'Mật ong', 'Tỏi', 'Dầu hào', 'Tiêu'],
        tags: ['Món nướng', 'Đậm vị', 'Món tiệc'],
        author: { name: 'Vũ Bếp', avatar: 'https://images.unsplash.com/photo-1534751516642-a171edd2521d?w=100' }
    },
    {
        id: 18,
        name: 'Trứng Chiên Cuộn Phô Mai',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
        time: '12 phút',
        cooking_time_minutes: 12,
        rating: 4.8,
        rating_count: '1.7k',
        likes: 980,
        is_favorite: false,
        category: 'Món chiên',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Trứng gà đánh xốp mịn cuộn cùng phô mai Mozzarella tan chảy béo ngậy, món ăn sáng hoặc ăn vặt các bé mê tít.',
        ingredients: ['Trứng', 'Phô mai', 'Rau củ', 'Bơ lạt'],
        tags: ['Dưới 15p', 'Món nhanh', 'Món chiên'],
        author: { name: 'Mẹ Min', avatar: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=100' }
    },
    {
        id: 19,
        name: 'Canh Rong Biển Thịt Bò',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=80',
        time: '20 phút',
        cooking_time_minutes: 20,
        rating: 4.7,
        rating_count: '1.3k',
        likes: 810,
        is_favorite: false,
        category: 'Món canh',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Rong biển thanh mát nấu cùng thịt bò bằm xào dầu mè thơm lừng, món canh dinh dưỡng hồi phục sức khỏe nhanh chóng.',
        ingredients: ['Thịt bò', 'Rau củ', 'Rong biển', 'Dầu mè', 'Tỏi'],
        tags: ['Món canh', 'Healthy', 'Món nhanh'],
        author: { name: 'K-Kitchen', avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100' }
    },
    {
        id: 20,
        name: 'Bánh Flan Trứng Sữa Caramen',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
        time: '35 phút',
        cooking_time_minutes: 35,
        rating: 4.9,
        rating_count: '4.8k',
        likes: 3100,
        is_favorite: false,
        category: 'Món chiên',
        sub_category: 'ngot',
        difficulty: 'Dễ làm',
        description: 'Bánh flan mềm mịn không rỗ, vị béo thơm của sữa tươi và trứng quyện cùng lớp caramen đắng nhẹ thơm cà phê.',
        ingredients: ['Trứng', 'Sữa tươi', 'Đường', 'Cà phê', 'Vani'],
        tags: ['Món Ngọt', 'Tráng miệng', 'Béo ngậy'],
        author: { name: 'Gia Hân', avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=100' }
    },
    {
        id: 21,
        name: 'Tôm Sốt Bơ Tỏi Cay',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=700&auto=format&fit=crop&q=80',
        time: '18 phút',
        cooking_time_minutes: 18,
        rating: 4.8,
        rating_count: '1.9k',
        likes: 1420,
        is_favorite: false,
        category: 'Món xào',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Tôm sú tươi giòn ngọt sốt bơ tỏi sánh ngậy thơm lừng, chấm bánh mì giòn rụm thì ngon hết nấc.',
        ingredients: ['Hải sản', 'Bơ lạt', 'Tỏi băm', 'Ớt bột', 'Ngò tây'],
        tags: ['Hải sản', 'Món xào', 'Đậm vị'],
        author: { name: 'Chef Hải', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
    },
    {
        id: 22,
        name: 'Canh Kim Chi Đậu Phụ Thịt Heo',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&auto=format&fit=crop&q=80',
        time: '25 phút',
        cooking_time_minutes: 25,
        rating: 4.8,
        rating_count: '2.2k',
        likes: 1530,
        is_favorite: false,
        category: 'Món canh',
        sub_category: 'nhanh',
        difficulty: 'Dễ làm',
        description: 'Nước canh cay nồng đậm đà từ kim chi lên men, thịt ba chỉ ngọt mềm và đậu hũ non bùi béo ăn ấm lòng ngày đông.',
        ingredients: ['Thịt heo', 'Đậu hũ', 'Rau củ', 'Kim chi', 'Hành baro'],
        tags: ['Món canh', 'Cay nồng', 'Món nhanh'],
        author: { name: 'Kimchi House', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }
    },
    {
        id: 23,
        name: 'Gà Nướng Muối Ớt Da Giòn',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=700&auto=format&fit=crop&q=80',
        time: '45 phút',
        cooking_time_minutes: 45,
        rating: 4.9,
        rating_count: '3.3k',
        likes: 2150,
        is_favorite: false,
        category: 'Món nướng',
        sub_category: 'viet',
        difficulty: 'Trung bình',
        description: 'Gà nguyên con ướp muối hạt ớt hiểm giã nhuyễn nướng than hồng, lớp da giòn rụm bên trong mọng nước ngọt thịt.',
        ingredients: ['Thịt gà', 'Ớt hiểm', 'Muối hạt', 'Lá chanh', 'Mật ong'],
        tags: ['Món nướng', 'Món Việt', 'Đậm đà'],
        author: { name: 'Anh Ba Nướng', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
    },
    {
        id: 24,
        name: 'Salad Rau Mầm Cá Ngừ Sốt Mè Rang',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80',
        time: '10 phút',
        cooking_time_minutes: 10,
        rating: 4.7,
        rating_count: '1.1k',
        likes: 720,
        is_favorite: false,
        category: 'Món xào',
        sub_category: 'chay',
        difficulty: 'Dễ làm',
        description: 'Bữa ăn Eat Clean cực kỳ tiện lợi với rau mầm tươi xanh, cà chua bi giòn ngọt và sốt mè rang bùi béo.',
        ingredients: ['Rau củ', 'Hải sản', 'Cà chua bi', 'Sốt mè rang'],
        tags: ['Dưới 15p', 'Eat Clean', 'Món nhanh'],
        author: { name: 'Healthy Life', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' }
    }
];

// Lazy Loading Batch Configuration
const BATCH_SIZE = 12;

const sortOptions = [
    { value: 'newest', icon: 'fa-clock', label: 'Mới nhất' },
    { value: 'popular', icon: 'fa-fire', label: 'Phổ biến nhất' },
    { value: 'likes', icon: 'fa-heart', label: 'Được yêu thích' },
    { value: 'rating', icon: 'fa-star', label: 'Đánh giá cao' },
    { value: 'time_asc', icon: 'fa-hourglass-start', label: 'Thời gian nấu tăng dần' },
    { value: 'time_desc', icon: 'fa-hourglass-end', label: 'Thời gian nấu giảm dần' },
    { value: 'name_asc', icon: 'fa-arrow-down-a-z', label: 'Tên A → Z' }
];

const FoodList = {
    render: async () => {
        return `
        <div class="cozy-kitchen-bg min-h-screen text-text-main font-sans selection:bg-primary/20 selection:text-primary pb-20">
            
            <!-- ======================================================== -->
            <!-- 1. HERO SECTION & LARGE SEARCH BAR                       -->
            <!-- ======================================================== -->
            <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div class="relative bg-gradient-to-r from-[#FFFDF9] via-[#FBF8F1] to-[#F5EBD4]/75 rounded-[28px] p-6 sm:p-8 lg:p-10 border border-beige-border/80 shadow-sm overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                    
                    <!-- Decorative Ambience Blobs -->
                    <div class="absolute -top-12 -left-12 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="absolute -bottom-10 right-20 w-60 h-60 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>

                    <!-- Left: Hero Text, Search Bar & Quick Categories -->
                    <div class="relative z-10 w-full lg:max-w-2xl space-y-4">
                        
                        <!-- Top Badge -->
                        <div class="inline-flex items-center gap-2 bg-primary-subtle border border-primary-light/40 px-3.5 py-1 rounded-full text-xs font-bold text-primary shadow-2xs">
                            <span>🍲</span>
                            <span>Nấu ngon mỗi ngày</span>
                        </div>

                        <!-- Main Heading -->
                        <h1 class="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-text-main tracking-tight leading-tight">
                            Khám phá <span class="text-primary font-caveat text-3xl sm:text-4xl lg:text-[46px] font-bold inline-block">Từ Điển Ẩm Thực</span>
                        </h1>

                        <!-- Subtitle -->
                        <p class="text-text-muted text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
                            Hàng ngàn công thức món ngon, dễ làm, phù hợp với mọi bữa ăn trong gia đình.
                        </p>

                        <!-- Large Search Bar -->
                        <div class="pt-1">
                            <form id="hero-search-form" class="relative flex items-center w-full bg-white rounded-full border-2 border-[#DFD5BE] focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15 shadow-sm transition-all duration-200 p-1.5">
                                <span class="pl-3.5 pr-2 text-primary text-base sm:text-lg flex items-center justify-center">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <input 
                                    type="text" 
                                    id="hero-search-input"
                                    placeholder="Tìm kiếm món ăn, nguyên liệu..." 
                                    class="w-full bg-transparent text-xs sm:text-sm font-medium text-text-main placeholder:text-gray-400 focus:outline-none px-2"
                                    aria-label="Tìm kiếm món ăn"
                                />
                                <button 
                                    type="button" 
                                    id="btn-clear-search" 
                                    class="hidden p-1 text-gray-400 hover:text-gray-600 transition-colors mr-1 cursor-pointer"
                                    title="Xóa tìm kiếm"
                                >
                                    <i class="fa-solid fa-circle-xmark text-sm"></i>
                                </button>
                                <button 
                                    type="submit" 
                                    id="btn-hero-search-submit"
                                    class="px-4.5 py-2.5 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-primary/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
                                >
                                    <span>Tìm kiếm</span>
                                    <i class="fa-solid fa-arrow-right text-[11px]"></i>
                                </button>
                            </form>
                        </div>

                        <!-- Quick Category Pills -->
                        <div class="pt-1 flex flex-wrap items-center gap-2" id="quick-category-pills">
                            <span class="text-xs font-bold text-text-muted mr-1 hidden sm:inline">Danh mục:</span>
                            <button type="button" class="quick-cat-btn active-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs" data-cat="all">
                                <span>✨</span>
                                <span>Tất cả</span>
                            </button>
                            <button type="button" class="quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs" data-cat="viet">
                                <span>🍲</span>
                                <span>Món Việt</span>
                            </button>
                            <button type="button" class="quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs" data-cat="chay">
                                <span>🌱</span>
                                <span>Món Chay</span>
                            </button>
                            <button type="button" class="quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs" data-cat="nhanh">
                                <span>⚡</span>
                                <span>Món Nhanh</span>
                            </button>
                            <button type="button" class="quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs" data-cat="ngot">
                                <span>🍰</span>
                                <span>Món Ngọt</span>
                            </button>
                            <button type="button" class="quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs" data-cat="au">
                                <span>🌎</span>
                                <span>Món Âu</span>
                            </button>
                        </div>

                    </div>

                    <!-- Right: Visual Food Photography Feature Image -->
                    <div class="relative z-10 shrink-0 w-full lg:w-auto flex items-center justify-center">
                        <div class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[24px] overflow-hidden border-4 border-white shadow-xl group">
                            <img 
                                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80" 
                                alt="Món ăn Việt Nam gia đình" 
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            
                            <!-- Floating Badge 1 -->
                            <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-[11px] font-extrabold text-primary flex items-center gap-1.5">
                                <i class="fa-solid fa-fire text-accent"></i>
                                <span>120+ Công thức</span>
                            </div>

                            <!-- Floating Badge 2 -->
                            <div class="absolute bottom-3 right-3 bg-black/65 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1">
                                <i class="fa-solid fa-star text-yellow-400"></i>
                                <span>4.9 / 5 (3.2k)</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            <!-- ======================================================== -->
            <!-- 2. MAIN CONTENT: 2-COLUMN LAYOUT                         -->
            <!-- LEFT COLUMN: FILTER CARD + RANDOM WIDGET (~320px)        -->
            <!-- RIGHT COLUMN: TOOLBAR + RECIPE GRID + INFINITE SCROLL    -->
            <!-- ======================================================== -->
            <main class="recipe-page-layout max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-7 items-start">
                
                <!-- ---------------------------------------------------- -->
                <!-- LEFT COLUMN: LEFT SIDEBAR (STICKY ~320px)            -->
                <!-- ---------------------------------------------------- -->
                <aside class="left-sidebar w-full lg:sticky lg:top-[76px] lg:self-start space-y-3" id="desktop-left-sidebar">
                    
                    <!-- BLOCK 1: BỘ LỌC NHANH (FILTER CARD) -->
                    <section class="filter-card bg-white rounded-[20px] border border-beige-border/80 p-3.5 sm:p-4 shadow-sm space-y-2.5">
                        
                        <!-- Sidebar Header -->
                        <div class="flex items-center justify-between pb-2 border-b border-[#F0EBE0]">
                            <div class="flex items-center gap-1.5">
                                <span class="w-5.5 h-5.5 rounded-lg bg-primary-subtle text-primary flex items-center justify-center text-[10px] font-bold">
                                    <i class="fa-solid fa-sliders"></i>
                                </span>
                                <h2 class="text-xs font-extrabold uppercase tracking-wider text-text-main">
                                    Bộ lọc nhanh
                                </h2>
                            </div>
                            <button type="button" id="btn-reset-filters-sidebar" class="text-[10px] font-bold text-text-muted hover:text-red-500 transition-colors cursor-pointer" title="Đặt lại bộ lọc">
                                Đặt lại
                            </button>
                        </div>

                        <!-- Group 1: LOẠI MÓN -->
                        <div class="space-y-1">
                            <h3 class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
                                Loại món
                            </h3>
                            <div class="grid grid-cols-2 gap-1" id="filter-category-group">
                                <button type="button" class="btn-filter-cat active-cat px-2 py-1 rounded-lg text-[11px] font-bold text-left transition-all border cursor-pointer flex items-center justify-between" data-cat="all">
                                    <span>Tất cả</span>
                                    <i class="fa-solid fa-check text-[8px]"></i>
                                </button>
                                <button type="button" class="btn-filter-cat px-2 py-1 rounded-lg text-[11px] font-semibold text-text-muted text-left transition-all border border-gray-100 hover:bg-cream-soft hover:text-primary cursor-pointer flex items-center justify-between" data-cat="Món mặn">
                                    <span>Món mặn</span>
                                </button>
                                <button type="button" class="btn-filter-cat px-2 py-1 rounded-lg text-[11px] font-semibold text-text-muted text-left transition-all border border-gray-100 hover:bg-cream-soft hover:text-primary cursor-pointer flex items-center justify-between" data-cat="Món canh">
                                    <span>Món canh</span>
                                </button>
                                <button type="button" class="btn-filter-cat px-2 py-1 rounded-lg text-[11px] font-semibold text-text-muted text-left transition-all border border-gray-100 hover:bg-cream-soft hover:text-primary cursor-pointer flex items-center justify-between" data-cat="Món xào">
                                    <span>Món xào</span>
                                </button>
                                <button type="button" class="btn-filter-cat px-2 py-1 rounded-lg text-[11px] font-semibold text-text-muted text-left transition-all border border-gray-100 hover:bg-cream-soft hover:text-primary cursor-pointer flex items-center justify-between" data-cat="Món nướng">
                                    <span>Món nướng</span>
                                </button>
                                <button type="button" class="btn-filter-cat px-2 py-1 rounded-lg text-[11px] font-semibold text-text-muted text-left transition-all border border-gray-100 hover:bg-cream-soft hover:text-primary cursor-pointer flex items-center justify-between" data-cat="Món chiên">
                                    <span>Món chiên</span>
                                </button>
                            </div>
                        </div>

                        <!-- Group 2: THỜI GIAN NẤU -->
                        <div class="space-y-1 pt-1.5 border-t border-[#F0EBE0]">
                            <h3 class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
                                Thời gian nấu
                            </h3>
                            <div class="space-y-0.5" id="filter-time-group">
                                <label class="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="radio" name="cook_time" value="all" checked class="accent-primary w-3 h-3">
                                    <span>Tất cả thời gian</span>
                                </label>
                                <label class="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="radio" name="cook_time" value="under_15" class="accent-primary w-3 h-3">
                                    <span>⚡ Dưới 15 phút</span>
                                </label>
                                <label class="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="radio" name="cook_time" value="15_to_30" class="accent-primary w-3 h-3">
                                    <span>⏱️ 15 – 30 phút</span>
                                </label>
                                <label class="flex items-center gap-1.5 px-1.5 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="radio" name="cook_time" value="above_30" class="accent-primary w-3 h-3">
                                    <span>🍲 Trên 30 phút</span>
                                </label>
                            </div>
                        </div>

                        <!-- Group 3: NGUYÊN LIỆU CHÍNH -->
                        <div class="space-y-1 pt-1.5 border-t border-[#F0EBE0]">
                            <h3 class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
                                Nguyên liệu chính
                            </h3>
                            <div class="grid grid-cols-2 gap-x-1 gap-y-0.5" id="filter-ingredients-group">
                                <label class="flex items-center gap-1 px-1 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="checkbox" value="Thịt heo" class="ingredient-checkbox accent-primary w-3 h-3 rounded">
                                    <span>Thịt heo</span>
                                </label>
                                <label class="flex items-center gap-1 px-1 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="checkbox" value="Thịt gà" class="ingredient-checkbox accent-primary w-3 h-3 rounded">
                                    <span>Thịt gà</span>
                                </label>
                                <label class="flex items-center gap-1 px-1 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="checkbox" value="Hải sản" class="ingredient-checkbox accent-primary w-3 h-3 rounded">
                                    <span>Hải sản</span>
                                </label>
                                <label class="flex items-center gap-1 px-1 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="checkbox" value="Rau củ" class="ingredient-checkbox accent-primary w-3 h-3 rounded">
                                    <span>Rau củ</span>
                                </label>
                                <label class="flex items-center gap-1 px-1 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="checkbox" value="Trứng" class="ingredient-checkbox accent-primary w-3.5 h-3.5 rounded">
                                    <span>Trứng</span>
                                </label>
                                <label class="flex items-center gap-1 px-1 py-0.5 rounded-md hover:bg-cream-soft transition-colors cursor-pointer text-[11px] font-medium text-text-main">
                                    <input type="checkbox" value="Đậu hũ" class="ingredient-checkbox accent-primary w-3 h-3 rounded">
                                    <span>Đậu hũ</span>
                                </label>
                            </div>
                        </div>

                        <!-- Filter Apply & Reset Action Buttons -->
                        <div class="pt-1.5 border-t border-[#F0EBE0] space-y-1">
                            <button 
                                type="button" 
                                id="btn-apply-filters"
                                class="w-full py-1.5 bg-primary hover:bg-[#1B4633] active:bg-[#143627] text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <i class="fa-solid fa-magnifying-glass text-[10px]"></i>
                                <span>Áp dụng bộ lọc</span>
                            </button>
                            <button 
                                type="button" 
                                id="btn-reset-all-filters"
                                class="w-full py-1 text-text-muted hover:text-text-main font-semibold text-[11px] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <span>Đặt lại bộ lọc</span>
                            </button>
                        </div>

                    </section>

                    <!-- BLOCK 2: ✨ RANDOM WIDGET (LUÔN TỒN TẠI DƯỚI BỘ LỌC) -->
                    <section class="random-widget bg-gradient-to-br from-[#1F5B43] via-[#1B4633] to-[#123C28] text-white rounded-[20px] p-3.5 sm:p-4 shadow-sm relative overflow-hidden group">
                        <div class="absolute top-0 right-0 translate-x-3 -translate-y-3 w-16 h-16 bg-accent/20 rounded-full blur-xl pointer-events-none"></div>
                        <div class="relative z-10 space-y-1.5">
                            <div class="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full text-[9px] font-bold text-accent-light">
                                <span>✨</span>
                                <span>Chưa biết ăn gì?</span>
                            </div>
                            <h3 class="text-xs sm:text-sm font-extrabold leading-tight">
                                Random món ngay hôm nay
                            </h3>
                            <p class="text-white/80 text-[11px] font-normal leading-snug">
                                Chọn nhanh thực đơn ngon miệng trong 3 giây.
                            </p>
                            <div class="pt-1">
                                <a 
                                    href="#/" 
                                    class="inline-flex items-center gap-1.5 bg-[#E9A33A] hover:bg-[#D89229] active:bg-[#C78118] text-white font-bold text-[11px] px-3.5 py-1.5 rounded-full shadow-xs hover:scale-[1.02] transition-all cursor-pointer"
                                >
                                    <span>🎲 Random ngay</span>
                                    <i class="fa-solid fa-arrow-right text-[9px]"></i>
                                </a>
                            </div>
                        </div>
                    </section>

                </aside>


                <!-- ---------------------------------------------------- -->
                <!-- RIGHT COLUMN: RECIPE CONTENT (TOOLBAR + GRID)        -->
                <!-- ---------------------------------------------------- -->
                <section class="recipe-content min-w-0 flex-1 space-y-5" id="recipe-list-section">
                    
                    <!-- Mobile Filter Toggle Bar -->
                    <div class="lg:hidden flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-beige-border shadow-2xs">
                        <button 
                            type="button" 
                            id="btn-open-mobile-filter" 
                            class="inline-flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm cursor-pointer"
                        >
                            <i class="fa-solid fa-sliders"></i>
                            <span>Bộ lọc nhanh</span>
                            <span id="mobile-filter-badge" class="bg-accent text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center ml-0.5">0</span>
                        </button>
                        <span id="mobile-result-count" class="text-xs font-bold text-text-muted">Đang tải...</span>
                    </div>

                    <!-- RECIPE TOOLBAR: Count + Sort Dropdown + View Toggle -->
                    <div class="recipe-toolbar bg-white rounded-[20px] border border-beige-border/80 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3.5">
                        
                        <!-- Left: Dish Count Badge & Active Filters Info -->
                        <div class="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
                            <div class="flex items-center gap-2">
                                <span class="w-7 h-7 rounded-xl bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold">
                                    <i class="fa-solid fa-bowl-food"></i>
                                </span>
                                <span id="recipe-total-count" class="font-extrabold text-sm text-text-main">
                                    Đang tải món ăn...
                                </span>
                            </div>
                            <span id="active-filter-indicator" class="hidden text-[11px] font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                                Đang lọc
                            </span>
                        </div>

                        <!-- Right: Sort Dropdown & View Mode Switcher -->
                        <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                            
                            <!-- Sort Dropdown -->
                            <div class="relative flex-1 sm:flex-initial" id="sort-dropdown-wrapper">
                                <button 
                                    type="button" 
                                    id="btn-sort-toggle" 
                                    class="w-full sm:w-auto inline-flex items-center justify-between gap-2 px-3 py-2 bg-[#FCFAF6] hover:bg-white border border-[#DFD5BE] rounded-xl text-xs font-bold text-text-main shadow-2xs transition-all cursor-pointer"
                                    aria-haspopup="listbox"
                                    aria-expanded="false"
                                >
                                    <span class="flex items-center gap-1.5">
                                        <i class="fa-solid fa-arrow-down-wide-short text-primary text-[11px]"></i>
                                        <span class="text-text-muted font-normal">Sắp xếp:</span>
                                        <span id="current-sort-label">Mới nhất</span>
                                    </span>
                                    <i class="fa-solid fa-chevron-down text-[10px] text-gray-400"></i>
                                </button>

                                <!-- Dropdown Menu List -->
                                <div id="sort-dropdown-menu" class="hidden absolute top-full right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-beige-border p-1.5 z-40">
                                    ${sortOptions.map(opt => `
                                        <button 
                                            type="button" 
                                            class="btn-sort-option w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-text-main hover:bg-primary-subtle hover:text-primary transition-colors flex items-center gap-2 cursor-pointer"
                                            data-sort="${opt.value}"
                                            data-label="${opt.label}"
                                        >
                                            <i class="fa-solid ${opt.icon} text-[11px] text-primary w-4"></i>
                                            <span>${opt.label}</span>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- View Mode Switcher (Grid / List) -->
                            <div class="inline-flex items-center bg-[#FCFAF6] border border-[#DFD5BE] p-0.5 rounded-xl shadow-2xs">
                                <button 
                                    type="button" 
                                    id="btn-view-grid" 
                                    class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-primary text-white shadow-2xs transition-all cursor-pointer"
                                    title="Chế độ Lưới (Grid View)"
                                >
                                    <i class="fa-solid fa-grip"></i>
                                </button>
                                <button 
                                    type="button" 
                                    id="btn-view-list" 
                                    class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer"
                                    title="Chế độ Danh sách (List View)"
                                >
                                    <i class="fa-solid fa-list"></i>
                                </button>
                            </div>

                        </div>

                    </div>

                    <!-- RECIPE GRID: Strictly 3 cards/row on desktop -->
                    <div id="recipe-grid" class="recipe-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        <!-- Only recipe cards are appended here -->
                    </div>

                    <!-- LOADING SENTINEL: Detected by IntersectionObserver -->
                    <div id="loading-sentinel" class="w-full py-2"></div>

                    <!-- LOADING STATE / SHIMMER SKELETON / END BADGE -->
                    <div id="loading-state" class="py-4 flex flex-col items-center justify-center w-full">
                        <!-- Shimmer skeletons or end of feed badge -->
                    </div>

                </section>

            </main>


            <!-- ======================================================== -->
            <!-- 3. MOBILE FILTER SLIDE-OVER MODAL                        -->
            <!-- ======================================================== -->
            <div id="mobile-filter-modal" class="fixed inset-0 z-50 hidden">
                <div id="mobile-filter-backdrop" class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"></div>
                <div class="fixed inset-y-0 right-0 max-w-full flex">
                    <div class="w-screen max-w-sm bg-white p-5 shadow-2xl overflow-y-auto flex flex-col justify-between">
                        <div class="space-y-5">
                            <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                                <h3 class="text-sm font-extrabold uppercase tracking-wider text-text-main flex items-center gap-2">
                                    <i class="fa-solid fa-sliders text-primary"></i>
                                    <span>Bộ lọc tìm kiếm</span>
                                </h3>
                                <button type="button" id="btn-close-mobile-filter" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <p class="text-xs text-text-muted">Chọn các tiêu chí để lọc món ăn nhanh chóng.</p>
                        </div>
                        <div class="pt-4 border-t border-gray-100 space-y-2">
                            <button type="button" id="btn-mobile-apply" class="w-full py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-md cursor-pointer">
                                Xem kết quả
                            </button>
                            <button type="button" id="btn-mobile-reset" class="w-full py-2 bg-gray-100 text-text-muted font-bold text-xs rounded-xl cursor-pointer">
                                Đặt lại tất cả
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FLOATING TOAST CONTAINER -->
            <div id="foodlist-toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"></div>

        </div>
        `;
    },

    afterRender: async () => {
        // ====================================================================
        // STATE MANAGEMENT (Frontend only)
        // ====================================================================
        let masterDishes = [...initialDishes];
        let currentFilteredDishes = [...masterDishes];
        let currentIndex = 0;
        let isLoading = false;
        let hasMore = true;
        let viewMode = 'grid'; // 'grid' or 'list'
        let currentSort = 'newest';
        let currentCategory = 'all';
        let currentQuickCategory = 'all';
        let currentCookTime = 'all';
        let currentSelectedIngredients = [];
        let currentSearchQuery = '';
        let infiniteScrollObserver = null;
        let searchDebounceTimer = null;

        // Load API Data gracefully if backend is available
        try {
            const apiRes = await fetchAPI('/foods');
            if (apiRes && apiRes.success && Array.isArray(apiRes.data) && apiRes.data.length > 0) {
                masterDishes = apiRes.data.map(item => ({
                    id: item.id || item.id_food || item.id_monan,
                    name: item.name || item.ten_mon || 'Món ngon',
                    image: item.image || item.hinh_anh || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700',
                    time: item.time || (item.thoi_gian ? `${item.thoi_gian} phút` : '25 phút'),
                    cooking_time_minutes: parseInt(item.thoi_gian || 25, 10),
                    rating: item.rating || 4.8,
                    rating_count: item.rating_count || '1.5k',
                    likes: item.likes || 120,
                    is_favorite: false,
                    category: item.category || item.loai_mon || 'Món mặn',
                    sub_category: item.sub_category || 'viet',
                    difficulty: item.difficulty || 'Dễ làm',
                    description: item.description || item.mo_ta || 'Món ăn thơm ngon đậm đà cho bữa cơm gia đình.',
                    ingredients: item.ingredients || ['Rau củ', 'Gia vị'],
                    tags: item.tags || ['Món ngon', 'Món Việt'],
                    author: item.author || { name: 'Bếp Nhà', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' }
                }));
                currentFilteredDishes = [...masterDishes];
            }
        } catch (e) {
            console.log('Using rich static dataset for FoodList:', e);
        }

        // DOM Elements
        const heroSearchForm = document.getElementById('hero-search-form');
        const heroSearchInput = document.getElementById('hero-search-input');
        const btnClearSearch = document.getElementById('btn-clear-search');
        const recipeGrid = document.getElementById('recipe-grid');
        const loadingSentinel = document.getElementById('loading-sentinel');
        const loadingState = document.getElementById('loading-state');
        const recipeTotalCountEl = document.getElementById('recipe-total-count');
        const mobileResultCountEl = document.getElementById('mobile-result-count');
        const activeFilterIndicator = document.getElementById('active-filter-indicator');
        const btnViewGrid = document.getElementById('btn-view-grid');
        const btnViewList = document.getElementById('btn-view-list');
        const btnSortToggle = document.getElementById('btn-sort-toggle');
        const sortDropdownMenu = document.getElementById('sort-dropdown-menu');
        const currentSortLabel = document.getElementById('current-sort-label');
        const btnApplyFilters = document.getElementById('btn-apply-filters');
        const btnResetAllFilters = document.getElementById('btn-reset-all-filters');
        const btnResetFiltersSidebar = document.getElementById('btn-reset-filters-sidebar');
        
        // Mobile Modal Elements
        const btnOpenMobileFilter = document.getElementById('btn-open-mobile-filter');
        const btnCloseMobileFilter = document.getElementById('btn-close-mobile-filter');
        const mobileFilterModal = document.getElementById('mobile-filter-modal');
        const mobileFilterBackdrop = document.getElementById('mobile-filter-backdrop');
        const btnMobileApply = document.getElementById('btn-mobile-apply');
        const btnMobileReset = document.getElementById('btn-mobile-reset');
        const mobileFilterBadge = document.getElementById('mobile-filter-badge');

        // Toast Notification Helper
        const showToast = (message, type = 'success') => {
            const container = document.getElementById('foodlist-toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `pointer-events-auto transform translate-y-2 opacity-0 transition-all duration-300 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-bold ${
                type === 'success' 
                    ? 'bg-primary text-white border-primary-light/40 shadow-primary/20' 
                    : type === 'info'
                    ? 'bg-[#26382F] text-white border-beige-border shadow-black/10'
                    : 'bg-red-600 text-white border-red-500 shadow-red-600/20'
            }`;

            const icon = type === 'success' 
                ? '<i class="fa-solid fa-circle-check text-accent-light text-base"></i>' 
                : type === 'info'
                ? '<i class="fa-solid fa-circle-info text-accent text-base"></i>'
                : '<i class="fa-solid fa-circle-exclamation text-yellow-300 text-base"></i>';

            toast.innerHTML = `${icon}<span>${message}</span>`;
            container.appendChild(toast);

            requestAnimationFrame(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
                toast.classList.add('translate-y-0', 'opacity-100');
            });

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-2', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 2500);
        };

        // ====================================================================
        // CREATE RECIPE CARD ELEMENT
        // ====================================================================
        const createRecipeCardElement = (dish) => {
            const isFav = !!dish.is_favorite;
            const link = `#/mon-an/${dish.id}`;
            const article = document.createElement('article');

            if (viewMode === 'list') {
                article.className = "bg-white rounded-[20px] border border-beige-border/80 p-3.5 sm:p-4.5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-4 group col-span-full";
                article.id = `dish-card-${dish.id}`;
                article.innerHTML = `
                    <div class="relative w-full sm:w-56 aspect-[16/10] sm:aspect-square rounded-2xl overflow-hidden bg-cream-soft shrink-0">
                        <img 
                            src="${dish.image}" 
                            alt="${dish.name}" 
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            loading="lazy" 
                            decoding="async"
                            onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'"
                        />
                        <div class="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-sm">
                            <i class="fa-regular fa-clock text-accent-light text-[10px]"></i>
                            <span>${dish.time}</span>
                        </div>
                        <button 
                            type="button" 
                            class="btn-favorite-dish absolute top-2.5 right-2.5 w-8 h-8 rounded-full ${isFav ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-500 hover:text-rose-500'} backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-all cursor-pointer z-10" 
                            data-id="${dish.id}" 
                            aria-label="Thêm vào yêu thích"
                        >
                            <i class="${isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} text-sm"></i>
                        </button>
                    </div>

                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex items-start justify-between gap-3 mb-1.5">
                                <div>
                                    <span class="inline-block bg-primary-subtle text-primary font-bold text-[10px] px-2 py-0.5 rounded-md mb-1">${dish.category}</span>
                                    <h3 class="font-extrabold text-base sm:text-lg text-text-main group-hover:text-primary transition-colors leading-snug">
                                        <a href="${link}">${dish.name}</a>
                                    </h3>
                                </div>
                                <div class="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg shrink-0" title="${dish.likes} lượt yêu thích">
                                    <i class="fa-solid fa-heart text-rose-500 text-[10px]"></i>
                                    <span>${dish.likes >= 1000 ? (dish.likes / 1000).toFixed(1).replace('.0', '') + 'k' : dish.likes}</span>
                                </div>
                            </div>
                            <p class="text-xs sm:text-sm text-text-muted line-clamp-2 mb-3 leading-relaxed">
                                ${dish.description}
                            </p>
                            <div class="flex flex-wrap items-center gap-1.5 mb-3">
                                ${dish.tags.slice(0, 3).map(tag => `
                                    <span class="bg-[#F8F5EC] border border-[#EBE3D3] text-text-muted text-[10px] font-semibold px-2 py-0.5 rounded-md">${tag}</span>
                                `).join('')}
                            </div>
                        </div>

                        <div class="pt-3 border-t border-[#F0EBE0] flex items-center justify-between">
                            <div class="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                                <i class="fa-solid fa-kitchen-set text-primary text-[11px]"></i>
                                <span>${dish.difficulty}</span>
                            </div>
                            <a 
                                href="${link}" 
                                class="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                            >
                                <span>Xem công thức</span>
                                <i class="fa-solid fa-arrow-right text-[10px]"></i>
                            </a>
                        </div>
                    </div>
                `;
                return article;
            }

            // Grid View Card (3 cards per row on desktop, uniform height)
            article.className = "bg-white rounded-[20px] border border-beige-border/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group";
            article.id = `dish-card-${dish.id}`;
            article.innerHTML = `
                <div class="relative aspect-[16/10] overflow-hidden bg-cream-soft shrink-0">
                    <img 
                        src="${dish.image}" 
                        alt="${dish.name}" 
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                        loading="lazy" 
                        decoding="async"
                        onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div class="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm z-10">
                        <i class="fa-regular fa-clock text-accent-light text-[10px]"></i>
                        <span>${dish.time}</span>
                    </div>

                    <button 
                        type="button" 
                        class="btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full ${isFav ? 'bg-rose-500 text-white' : 'bg-white/90 text-gray-500 hover:text-rose-500'} backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-all cursor-pointer z-20" 
                        data-id="${dish.id}" 
                        aria-label="Thêm vào yêu thích"
                    >
                        <i class="${isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} text-sm"></i>
                    </button>
                </div>

                <div class="p-4 sm:p-4.5 flex flex-col flex-1">
                    <div class="flex items-start justify-between gap-2 mb-1.5">
                        <h3 class="font-extrabold text-sm sm:text-base text-text-main line-clamp-2 leading-snug group-hover:text-primary transition-colors flex-1">
                            <a href="${link}">${dish.name}</a>
                        </h3>
                        <div class="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md shrink-0 mt-0.5" title="${dish.likes} lượt yêu thích">
                            <i class="fa-solid fa-heart text-rose-500 text-[10px]"></i>
                            <span>${dish.likes >= 1000 ? (dish.likes / 1000).toFixed(1).replace('.0', '') + 'k' : dish.likes}</span>
                        </div>
                    </div>

                    <p class="text-xs text-text-muted line-clamp-2 mb-3 leading-relaxed font-normal">
                        ${dish.description}
                    </p>

                    <div class="flex flex-wrap items-center gap-1.5 mb-3.5 mt-auto">
                        <span class="bg-primary-subtle border border-primary-light/30 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md">${dish.category}</span>
                        <span class="bg-[#F8F5EC] border border-[#EBE3D3] text-text-muted text-[10px] font-semibold px-2 py-0.5 rounded-md">${dish.difficulty}</span>
                    </div>

                    <div class="pt-3 border-t border-[#F0EBE0] mt-auto">
                        <a 
                            href="${link}" 
                            class="w-full py-2 bg-primary/8 hover:bg-primary text-primary hover:text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:shadow-sm"
                        >
                            <span>Xem công thức</span>
                            <i class="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                        </a>
                    </div>
                </div>
            `;
            return article;
        };

        // Render Shimmer Skeleton Cards HTML
        const createSkeletonCardsHTML = (count = 3) => {
            let html = '';
            for (let i = 0; i < count; i++) {
                html += `
                    <div class="bg-white rounded-[20px] border border-beige-border/80 p-4 shadow-sm animate-pulse space-y-3">
                        <div class="w-full aspect-[16/10] bg-[#ECE5D8] rounded-xl"></div>
                        <div class="space-y-1.5">
                            <div class="w-3/4 h-4 bg-[#ECE5D8] rounded-md"></div>
                            <div class="w-1/2 h-3 bg-[#ECE5D8] rounded-md"></div>
                        </div>
                        <div class="w-full h-3 bg-[#ECE5D8] rounded-md"></div>
                        <div class="flex gap-2 pt-2 border-t border-[#F0EBE0]">
                            <div class="w-16 h-5 bg-[#ECE5D8] rounded-md"></div>
                            <div class="w-16 h-5 bg-[#ECE5D8] rounded-md"></div>
                        </div>
                    </div>
                `;
            }
            return html;
        };

        // Update Toolbar & Mobile Badges
        const updateToolbarCounts = () => {
            const total = currentFilteredDishes.length;
            if (recipeTotalCountEl) {
                recipeTotalCountEl.textContent = `${total} món ăn phù hợp`;
            }
            if (mobileResultCountEl) {
                mobileResultCountEl.textContent = `${total} món ăn`;
            }

            const hasActiveFilters = currentCategory !== 'all' || 
                                     currentQuickCategory !== 'all' || 
                                     currentCookTime !== 'all' || 
                                     currentSelectedIngredients.length > 0 || 
                                     currentSearchQuery.trim() !== '';

            if (activeFilterIndicator) {
                activeFilterIndicator.classList.toggle('hidden', !hasActiveFilters);
            }

            let filterCount = 0;
            if (currentCategory !== 'all') filterCount++;
            if (currentQuickCategory !== 'all') filterCount++;
            if (currentCookTime !== 'all') filterCount++;
            filterCount += currentSelectedIngredients.length;
            if (currentSearchQuery.trim() !== '') filterCount++;

            if (mobileFilterBadge) {
                mobileFilterBadge.textContent = filterCount;
                mobileFilterBadge.classList.toggle('hidden', filterCount === 0);
            }
        };

        // Update Loading State (Shimmer / End of Feed indicator)
        const updateLoadingStateUI = () => {
            if (!loadingState) return;

            const total = currentFilteredDishes.length;
            if (total === 0) {
                loadingState.innerHTML = '';
                return;
            }

            if (!hasMore || currentIndex >= total) {
                loadingState.innerHTML = `
                    <div class="text-center py-6 text-text-muted text-xs font-medium w-full">
                        <div class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-beige-border px-5 py-2.5 rounded-full shadow-sm text-text-muted">
                            <span class="text-accent">🎉</span>
                            <span>Bạn đã xem hết các món ăn</span>
                        </div>
                    </div>
                `;
            } else {
                loadingState.innerHTML = `
                    <div class="text-center py-4 text-text-muted text-xs font-medium">
                        <span class="inline-flex items-center gap-2 text-text-muted opacity-80">
                            <i class="fa-solid fa-angles-down animate-bounce text-xs text-primary"></i>
                            <span>Cuộn xuống để khám phá thêm món ngon</span>
                        </span>
                    </div>
                `;
            }
        };

        // ====================================================================
        // INFINITE SCROLL & LAZY RENDERING ENGINE
        // Strictly appends to #recipe-grid without touching sidebar
        // ====================================================================
        const loadMoreRecipes = () => {
            if (isLoading || !hasMore) return;
            const total = currentFilteredDishes.length;
            if (currentIndex >= total) {
                hasMore = false;
                updateLoadingStateUI();
                return;
            }

            isLoading = true;

            // Show skeleton cards in #loading-state
            if (loadingState) {
                loadingState.innerHTML = `
                    <div class="w-full space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            ${createSkeletonCardsHTML(3)}
                        </div>
                        <div class="flex items-center justify-center gap-2 text-xs font-bold text-primary py-2">
                            <i class="fa-solid fa-spinner animate-spin text-sm text-accent"></i>
                            <span>Đang tải thêm món ngon...</span>
                        </div>
                    </div>
                `;
            }

            // Simulate realistic smooth lazy load delay
            setTimeout(() => {
                const nextBatch = currentFilteredDishes.slice(currentIndex, currentIndex + BATCH_SIZE);

                if (recipeGrid && nextBatch.length > 0) {
                    const fragment = document.createDocumentFragment();
                    nextBatch.forEach(dish => {
                        fragment.appendChild(createRecipeCardElement(dish));
                    });
                    recipeGrid.appendChild(fragment);
                }

                currentIndex += nextBatch.length;
                if (currentIndex >= total) {
                    hasMore = false;
                    if (infiniteScrollObserver) infiniteScrollObserver.disconnect();
                }

                isLoading = false;
                updateToolbarCounts();
                updateLoadingStateUI();
            }, 450);
        };

        // Setup Intersection Observer on #loading-sentinel
        const setupInfiniteScroll = () => {
            if (infiniteScrollObserver) {
                infiniteScrollObserver.disconnect();
            }

            if (!loadingSentinel || !hasMore) return;

            infiniteScrollObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    if (!isLoading && hasMore) {
                        loadMoreRecipes();
                    }
                }
            }, {
                root: null,
                rootMargin: '400px',
                threshold: 0
            });

            infiniteScrollObserver.observe(loadingSentinel);
        };

        // Render First Batch on Filter / Search Change
        const renderFirstBatch = () => {
            if (!recipeGrid) return;

            currentIndex = 0;
            hasMore = true;
            isLoading = false;
            updateToolbarCounts();

            // Clear ONLY recipe-grid
            recipeGrid.innerHTML = '';

            // Handle Empty State
            if (currentFilteredDishes.length === 0) {
                hasMore = false;
                recipeGrid.className = "w-full col-span-full";
                recipeGrid.innerHTML = `
                    <div class="bg-white rounded-[24px] border border-beige-border/80 p-8 sm:p-12 text-center shadow-sm max-w-lg mx-auto space-y-4">
                        <div class="w-20 h-20 rounded-full bg-cream-soft flex items-center justify-center text-3xl mx-auto text-primary border border-[#E9DFC9]">
                            🍲
                        </div>
                        <div class="space-y-1">
                            <h3 class="text-base sm:text-lg font-extrabold text-text-main">Chưa tìm thấy món phù hợp</h3>
                            <p class="text-xs sm:text-sm text-text-muted font-medium">Thử thay đổi từ khóa hoặc bộ lọc nhé!</p>
                        </div>
                        <button 
                            type="button" 
                            id="btn-empty-reset" 
                            class="inline-flex items-center gap-2 bg-primary hover:bg-[#1B4633] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                        >
                            <i class="fa-solid fa-rotate-right text-xs"></i>
                            <span>Xóa bộ lọc</span>
                        </button>
                    </div>
                `;

                const btnEmptyReset = document.getElementById('btn-empty-reset');
                if (btnEmptyReset) {
                    btnEmptyReset.addEventListener('click', resetAllFilters);
                }

                if (loadingState) loadingState.innerHTML = '';
                return;
            }

            // Restore layout class
            if (viewMode === 'grid') {
                recipeGrid.className = "recipe-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6";
            } else {
                recipeGrid.className = "recipe-grid flex flex-col gap-4";
            }

            // Render first batch of 12 cards using DocumentFragment
            const firstBatch = currentFilteredDishes.slice(0, BATCH_SIZE);
            const fragment = document.createDocumentFragment();
            firstBatch.forEach(dish => {
                fragment.appendChild(createRecipeCardElement(dish));
            });
            recipeGrid.appendChild(fragment);

            currentIndex = firstBatch.length;
            if (currentIndex >= currentFilteredDishes.length) {
                hasMore = false;
            }

            updateLoadingStateUI();
            setupInfiniteScroll();
        };

        // ====================================================================
        // FILTER & SORT LOGIC
        // ====================================================================
        const executeFilterAndSort = () => {
            let result = [...masterDishes];

            // 1. Search Query Filter
            if (currentSearchQuery.trim() !== '') {
                const q = currentSearchQuery.toLowerCase().trim();
                result = result.filter(d => 
                    d.name.toLowerCase().includes(q) ||
                    d.description.toLowerCase().includes(q) ||
                    d.ingredients.some(ing => ing.toLowerCase().includes(q)) ||
                    d.tags.some(t => t.toLowerCase().includes(q))
                );
            }

            // 2. Quick Category Filter (viet, chay, nhanh, ngot, au)
            if (currentQuickCategory !== 'all') {
                result = result.filter(d => d.sub_category === currentQuickCategory);
            }

            // 3. Category Group Filter
            if (currentCategory !== 'all') {
                result = result.filter(d => d.category.toLowerCase() === currentCategory.toLowerCase());
            }

            // 4. Cooking Time Filter
            if (currentCookTime === 'under_15') {
                result = result.filter(d => d.cooking_time_minutes <= 15);
            } else if (currentCookTime === '15_to_30') {
                result = result.filter(d => d.cooking_time_minutes > 15 && d.cooking_time_minutes <= 30);
            } else if (currentCookTime === 'above_30') {
                result = result.filter(d => d.cooking_time_minutes > 30);
            }

            // 5. Ingredients Checkboxes Filter
            if (currentSelectedIngredients.length > 0) {
                result = result.filter(d => 
                    currentSelectedIngredients.some(selectedIng => 
                        d.ingredients.some(dishIng => dishIng.toLowerCase().includes(selectedIng.toLowerCase()))
                    )
                );
            }

            // 6. Sorting
            if (currentSort === 'newest') {
                result.sort((a, b) => b.id - a.id);
            } else if (currentSort === 'popular') {
                result.sort((a, b) => (parseFloat(b.rating_count) || 0) - (parseFloat(a.rating_count) || 0));
            } else if (currentSort === 'likes') {
                result.sort((a, b) => b.likes - a.likes);
            } else if (currentSort === 'rating') {
                result.sort((a, b) => b.rating - a.rating);
            } else if (currentSort === 'time_asc') {
                result.sort((a, b) => a.cooking_time_minutes - b.cooking_time_minutes);
            } else if (currentSort === 'time_desc') {
                result.sort((a, b) => b.cooking_time_minutes - a.cooking_time_minutes);
            } else if (currentSort === 'name_asc') {
                result.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
            }

            currentFilteredDishes = result;
            renderFirstBatch();
        };

        // Reset All Filters
        const resetAllFilters = () => {
            currentCategory = 'all';
            currentQuickCategory = 'all';
            currentCookTime = 'all';
            currentSelectedIngredients = [];
            currentSearchQuery = '';
            currentSort = 'newest';

            if (heroSearchInput) heroSearchInput.value = '';
            if (btnClearSearch) btnClearSearch.classList.add('hidden');

            document.querySelectorAll('.quick-cat-btn').forEach(btn => {
                const isAll = btn.getAttribute('data-cat') === 'all';
                btn.className = isAll
                    ? "quick-cat-btn active-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs"
                    : "quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs";
            });

            document.querySelectorAll('.btn-filter-cat').forEach(btn => {
                const isAll = btn.getAttribute('data-cat') === 'all';
                btn.className = isAll
                    ? "btn-filter-cat active-cat px-2.5 py-1.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between"
                    : "btn-filter-cat px-2.5 py-1.5 rounded-xl text-xs font-semibold text-text-muted text-left transition-all border border-gray-100 hover:bg-cream-soft hover:text-primary cursor-pointer flex items-center justify-between";
                const checkIcon = btn.querySelector('.fa-check');
                if (checkIcon) checkIcon.remove();
                if (isAll) {
                    btn.innerHTML = `<span>Tất cả</span><i class="fa-solid fa-check text-[9px]"></i>`;
                }
            });

            const allRadio = document.querySelector('input[name="cook_time"][value="all"]');
            if (allRadio) allRadio.checked = true;

            document.querySelectorAll('.ingredient-checkbox').forEach(cb => {
                cb.checked = false;
            });

            if (currentSortLabel) currentSortLabel.textContent = 'Mới nhất';

            executeFilterAndSort();
            showToast('Đã đặt lại toàn bộ bộ lọc', 'info');
        };

        // ====================================================================
        // EVENT HANDLERS & LISTENERS
        // ====================================================================

        // 1. Search Input & Debounce
        if (heroSearchInput) {
            heroSearchInput.addEventListener('input', (e) => {
                const val = e.target.value;
                if (btnClearSearch) {
                    btnClearSearch.classList.toggle('hidden', val.length === 0);
                }

                clearTimeout(searchDebounceTimer);
                searchDebounceTimer = setTimeout(() => {
                    currentSearchQuery = val;
                    executeFilterAndSort();
                }, 300);
            });
        }

        if (btnClearSearch) {
            btnClearSearch.addEventListener('click', () => {
                if (heroSearchInput) {
                    heroSearchInput.value = '';
                    btnClearSearch.classList.add('hidden');
                    currentSearchQuery = '';
                    executeFilterAndSort();
                }
            });
        }

        if (heroSearchForm) {
            heroSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                currentSearchQuery = heroSearchInput?.value || '';
                executeFilterAndSort();
            });
        }

        // 2. Quick Category Pills Click
        const quickCatBtns = document.querySelectorAll('.quick-cat-btn');
        quickCatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-cat');
                currentQuickCategory = cat;

                quickCatBtns.forEach(b => {
                    b.className = "quick-cat-btn px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#E5DEC9] bg-white/80 text-text-muted hover:text-primary hover:bg-primary-subtle shadow-2xs";
                });
                btn.className = "quick-cat-btn active-pill px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs";

                executeFilterAndSort();
            });
        });

        // 3. Category Buttons Group Click
        const catButtons = document.querySelectorAll('.btn-filter-cat');
        catButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.getAttribute('data-cat');
                currentCategory = cat;

                catButtons.forEach(b => {
                    b.className = "btn-filter-cat px-2.5 py-1.5 rounded-xl text-xs font-semibold text-text-muted text-left transition-all border border-gray-100 hover:bg-cream-soft hover:text-primary cursor-pointer flex items-center justify-between";
                    const ic = b.querySelector('.fa-check');
                    if (ic) ic.remove();
                });

                btn.className = "btn-filter-cat active-cat px-2.5 py-1.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer flex items-center justify-between";
                const spanText = btn.querySelector('span')?.textContent || '';
                btn.innerHTML = `<span>${spanText}</span><i class="fa-solid fa-check text-[9px]"></i>`;
            });
        });

        // 4. Time Radio Change
        const timeRadios = document.querySelectorAll('input[name="cook_time"]');
        timeRadios.forEach(r => {
            r.addEventListener('change', () => {
                currentCookTime = r.value;
            });
        });

        // 5. Apply Filters Button Click
        if (btnApplyFilters) {
            btnApplyFilters.addEventListener('click', () => {
                const checked = Array.from(document.querySelectorAll('.ingredient-checkbox:checked')).map(cb => cb.value);
                currentSelectedIngredients = checked;
                executeFilterAndSort();
                showToast('Đã áp dụng bộ lọc', 'success');
            });
        }

        // 6. Reset Filters Buttons
        if (btnResetAllFilters) btnResetAllFilters.addEventListener('click', resetAllFilters);
        if (btnResetFiltersSidebar) btnResetFiltersSidebar.addEventListener('click', resetAllFilters);

        // 7. Sort Dropdown Toggle & Options
        if (btnSortToggle && sortDropdownMenu) {
            btnSortToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                sortDropdownMenu.classList.toggle('hidden');
                btnSortToggle.setAttribute('aria-expanded', !sortDropdownMenu.classList.contains('hidden'));
            });

            document.addEventListener('click', (e) => {
                if (!sortDropdownMenu.contains(e.target) && e.target !== btnSortToggle) {
                    sortDropdownMenu.classList.add('hidden');
                    btnSortToggle.setAttribute('aria-expanded', 'false');
                }
            });

            document.querySelectorAll('.btn-sort-option').forEach(optBtn => {
                optBtn.addEventListener('click', () => {
                    const sortVal = optBtn.getAttribute('data-sort');
                    const sortLabelText = optBtn.getAttribute('data-label');
                    currentSort = sortVal;
                    if (currentSortLabel) currentSortLabel.textContent = sortLabelText;
                    sortDropdownMenu.classList.add('hidden');
                    btnSortToggle.setAttribute('aria-expanded', 'false');
                    executeFilterAndSort();
                });
            });
        }

        // 8. View Mode Switcher (Grid / List)
        if (btnViewGrid && btnViewList) {
            btnViewGrid.addEventListener('click', () => {
                if (viewMode === 'grid') return;
                viewMode = 'grid';
                btnViewGrid.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-primary text-white shadow-2xs transition-all cursor-pointer";
                btnViewList.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer";
                renderFirstBatch();
            });

            btnViewList.addEventListener('click', () => {
                if (viewMode === 'list') return;
                viewMode = 'list';
                btnViewList.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-primary text-white shadow-2xs transition-all cursor-pointer";
                btnViewGrid.className = "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-text-muted hover:text-primary transition-all cursor-pointer";
                renderFirstBatch();
            });
        }

        // 9. Card Event Delegation: Favorite Heart Click on #recipe-grid
        if (recipeGrid) {
            recipeGrid.addEventListener('click', (e) => {
                const favBtn = e.target.closest('.btn-favorite-dish');
                if (favBtn) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dishId = parseInt(favBtn.getAttribute('data-id'), 10);
                    const dish = masterDishes.find(d => d.id === dishId);
                    if (!dish) return;

                    dish.is_favorite = !dish.is_favorite;
                    const heartIcon = favBtn.querySelector('i');

                    if (dish.is_favorite) {
                        favBtn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-rose-500 text-white backdrop-blur-sm flex items-center justify-center shadow-sm scale-125 transition-all cursor-pointer z-20";
                        setTimeout(() => {
                            favBtn.classList.remove('scale-125');
                        }, 150);
                        if (heartIcon) heartIcon.className = "fa-solid fa-heart text-sm";
                        showToast(`Đã thêm "${dish.name}" vào Yêu thích! ❤️`, 'success');
                    } else {
                        favBtn.className = "btn-favorite-dish absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/90 text-gray-500 hover:text-rose-500 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all cursor-pointer z-20";
                        if (heartIcon) heartIcon.className = "fa-regular fa-heart text-sm";
                        showToast(`Đã bỏ lưu "${dish.name}"`, 'info');
                    }
                }
            });
        }

        // 10. Mobile Filter Modal Toggle
        if (btnOpenMobileFilter && mobileFilterModal) {
            btnOpenMobileFilter.addEventListener('click', () => {
                mobileFilterModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        }

        const closeMobileFilter = () => {
            if (mobileFilterModal) {
                mobileFilterModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        };

        if (btnCloseMobileFilter) btnCloseMobileFilter.addEventListener('click', closeMobileFilter);
        if (mobileFilterBackdrop) mobileFilterBackdrop.addEventListener('click', closeMobileFilter);

        if (btnMobileApply) {
            btnMobileApply.addEventListener('click', () => {
                const checked = Array.from(document.querySelectorAll('.ingredient-checkbox:checked')).map(cb => cb.value);
                currentSelectedIngredients = checked;
                executeFilterAndSort();
                closeMobileFilter();
                showToast('Đã áp dụng bộ lọc!', 'success');
            });
        }

        if (btnMobileReset) {
            btnMobileReset.addEventListener('click', () => {
                resetAllFilters();
                closeMobileFilter();
            });
        }

        // ====================================================================
        // INITIAL RENDER
        // ====================================================================
        executeFilterAndSort();
    }
};

export default FoodList;

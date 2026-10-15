const fs = require('fs');
const path = require('path');

const root = process.cwd();
const sqlPath = path.join(root, 'hom_nay_an_gi.sql');
const addSqlPath = path.join(root, 'add_foods_to_50.sql');

const existingIngredients = new Map([
  ['Thịt ba chỉ', 1],
  ['Trứng gà', 2],
  ['Cá basa', 8],
  ['Thịt gà', 10],
  ['Sườn non', 11],
  ['Ớt chuông', 12],
  ['Thơm', 13],
  ['Hành tây', 14],
  ['Thịt bò', 15],
  ['Cá lóc', 17],
  ['Cà chua', 19],
  ['Giá đỗ', 20],
  ['Bí đỏ', 21],
  ['Thịt heo bằm', 22],
  ['Cải xanh', 23],
  ['Rau muống', 24],
  ['Cải thìa', 26],
  ['Đậu que', 27],
  ['Cà rốt', 28],
  ['Bông cải xanh', 29],
  ['Đậu hũ', 30]
]);

const ingredientUnits = {
  'Rau ngót': 'g',
  'Tôm': 'g',
  'Mướp': 'g',
  'Khổ qua': 'g',
  'Bún tàu': 'g',
  'Bí xanh': 'g',
  'Rong biển': 'g',
  'Khoai mỡ': 'g',
  'Cải chua': 'g',
  'Tiêu': 'g',
  'Hành tím': 'g',
  'Mắm ruốc': 'g',
  'Sả': 'g',
  'Nghệ': 'g',
  'Mực': 'g',
  'Cần tây': 'g',
  'Nui': 'g',
  'Tỏi': 'g',
  'Chả cá': 'g',
  'Thì là': 'g',
  'Bột chiên giòn': 'g',
  'Cánh gà': 'g',
  'Cá rô phi': 'g',
  'Bầu': 'g',
  'Rau lang': 'g',
  'Lá chanh': 'g',
  'Dưa leo': 'g',
  'Xà lách': 'g',
  'Bắp cải': 'g',
  'Cà tím': 'g',
  'Hành lá': 'g',
  'Gừng': 'g'
};

const dishes = [
  {
    category: 'mon-canh',
    name: 'Canh rau ngót thịt bằm',
    slug: 'canh-rau-ngot-thit-bam',
    description: 'Rau ngót nấu thịt bằm ngọt nước, dễ ăn cho bữa cơm gia đình.',
    image: '/images/foods/canh-cai-thit-bam.jpg',
    time: 25,
    servings: 4,
    ingredients: [['Rau ngót', 300], ['Thịt heo bằm', 150]],
    steps: [
      'Rửa sạch rau ngót, vò nhẹ cho rau mềm và thịt bằm ướp ít nước mắm.',
      'Phi thơm hành, xào thịt bằm săn rồi thêm nước vào đun sôi.',
      'Cho rau ngót vào nấu chín, nêm vừa ăn rồi tắt bếp.'
    ]
  },
  {
    category: 'mon-canh',
    name: 'Canh mướp tôm',
    slug: 'canh-muop-tom',
    description: 'Canh mướp nấu tôm thanh ngọt, hợp những ngày cần món nhẹ bụng.',
    image: '/images/foods/canh-cai-thit-bam.jpg',
    time: 20,
    servings: 4,
    ingredients: [['Mướp', 300], ['Tôm', 200]],
    steps: [
      'Gọt mướp, cắt miếng vừa ăn; tôm bóc vỏ và ướp nhẹ.',
      'Xào sơ tôm cho thơm rồi thêm nước vào đun sôi.',
      'Cho mướp vào nấu vừa chín, nêm gia vị và dùng nóng.'
    ]
  },
  {
    category: 'mon-canh',
    name: 'Canh khổ qua nhồi thịt',
    slug: 'canh-kho-qua-nhoi-thit',
    description: 'Khổ qua nhồi thịt nấu mềm, vị đắng nhẹ và nước dùng trong.',
    image: '/images/foods/canh-bi-do-thit-bam.jpg',
    time: 45,
    servings: 4,
    ingredients: [['Khổ qua', 400], ['Thịt heo bằm', 250], ['Bún tàu', 50]],
    steps: [
      'Làm sạch khổ qua, bỏ ruột; trộn thịt bằm với bún tàu và gia vị.',
      'Nhồi nhân vào khổ qua rồi cho vào nồi nước đang sôi.',
      'Hầm đến khi khổ qua mềm, nêm lại nước dùng cho vừa ăn.'
    ]
  },
  {
    category: 'mon-canh',
    name: 'Canh bí xanh tôm',
    slug: 'canh-bi-xanh-tom',
    description: 'Bí xanh mềm mát nấu cùng tôm, nước canh ngọt tự nhiên.',
    image: '/images/foods/canh-bi-do-thit-bam.jpg',
    time: 25,
    servings: 4,
    ingredients: [['Bí xanh', 400], ['Tôm', 150]],
    steps: [
      'Gọt bí xanh, cắt lát; tôm làm sạch và băm hoặc để nguyên con.',
      'Xào sơ tôm rồi thêm nước vào nấu sôi.',
      'Cho bí xanh vào nấu mềm, nêm gia vị và rắc tiêu nếu thích.'
    ]
  },
  {
    category: 'mon-canh',
    name: 'Canh rong biển đậu hũ',
    slug: 'canh-rong-bien-dau-hu',
    description: 'Rong biển và đậu hũ mềm tạo món canh nhẹ, nhanh và thanh.',
    image: '/images/foods/dau-hu-sot-ca-chua.jpg',
    time: 15,
    servings: 3,
    ingredients: [['Rong biển', 30], ['Đậu hũ', 2]],
    steps: [
      'Ngâm rong biển cho nở, rửa sạch; cắt đậu hũ thành miếng nhỏ.',
      'Đun nước dùng, cho đậu hũ vào nấu nhẹ lửa.',
      'Thêm rong biển, nêm vừa ăn và tắt bếp ngay khi sôi lại.'
    ]
  },
  {
    category: 'mon-canh',
    name: 'Canh khoai mỡ thịt bằm',
    slug: 'canh-khoai-mo-thit-bam',
    description: 'Khoai mỡ sánh mềm nấu thịt bằm, thơm béo và dễ ăn.',
    image: '/images/foods/canh-bi-do-thit-bam.jpg',
    time: 30,
    servings: 4,
    ingredients: [['Khoai mỡ', 400], ['Thịt heo bằm', 150]],
    steps: [
      'Gọt khoai mỡ, bào hoặc đập dập; thịt bằm ướp ít gia vị.',
      'Xào thịt bằm cho săn rồi thêm nước vào đun sôi.',
      'Cho khoai mỡ vào khuấy nhẹ đến khi canh sánh và chín mềm.'
    ]
  },
  {
    category: 'mon-canh',
    name: 'Canh cải chua sườn',
    slug: 'canh-cai-chua-suon',
    description: 'Cải chua nấu sườn có vị chua dịu, ăn rất bắt cơm.',
    image: '/images/foods/suon-xao-chua-ngot.jpg',
    time: 40,
    servings: 4,
    ingredients: [['Cải chua', 300], ['Sườn non', 300]],
    steps: [
      'Chần sườn qua nước sôi, rửa sạch bọt; cải chua cắt vừa ăn.',
      'Hầm sườn đến khi mềm và nước dùng ngọt.',
      'Cho cải chua vào nấu thêm vài phút, nêm lại cho vừa miệng.'
    ]
  },
  {
    category: 'mon-kho',
    name: 'Cá lóc kho tiêu',
    slug: 'ca-loc-kho-tieu',
    description: 'Cá lóc kho tiêu cay thơm, nước kho sánh đậm vị.',
    image: '/images/foods/ca-kho-to.jpg',
    time: 45,
    servings: 4,
    ingredients: [['Cá lóc', 500], ['Tiêu', 5], ['Hành tím', 20]],
    steps: [
      'Cá lóc làm sạch, cắt khúc và ướp với nước mắm, tiêu, hành tím.',
      'Thắng màu nhẹ rồi cho cá vào kho với lửa vừa.',
      'Kho đến khi nước sánh lại, rắc thêm tiêu và dùng với cơm nóng.'
    ]
  },
  {
    category: 'mon-kho',
    name: 'Thịt kho mắm ruốc',
    slug: 'thit-kho-mam-ruoc',
    description: 'Thịt ba chỉ kho mắm ruốc thơm sả, mặn ngọt đậm đà.',
    image: '/images/foods/thit-kho-trung.jpg',
    time: 35,
    servings: 4,
    ingredients: [['Thịt ba chỉ', 500], ['Mắm ruốc', 30], ['Sả', 40]],
    steps: [
      'Thịt ba chỉ thái nhỏ, sả băm nhuyễn và mắm ruốc pha loãng.',
      'Rang thịt cho ra bớt mỡ rồi cho sả vào đảo thơm.',
      'Thêm mắm ruốc, đường và chút nước, kho đến khi thịt thấm.'
    ]
  },
  {
    category: 'mon-kho',
    name: 'Tôm rim thịt ba chỉ',
    slug: 'tom-rim-thit-ba-chi',
    description: 'Tôm rim cùng thịt ba chỉ có màu đẹp, vị mặn ngọt hài hòa.',
    image: '/images/foods/thit-kho-trung.jpg',
    time: 30,
    servings: 4,
    ingredients: [['Tôm', 300], ['Thịt ba chỉ', 200]],
    steps: [
      'Tôm rửa sạch, thịt ba chỉ thái mỏng và ướp với nước mắm.',
      'Rang thịt trước cho săn rồi cho tôm vào đảo đều.',
      'Rim nhỏ lửa đến khi nước sốt áo đều tôm thịt.'
    ]
  },
  {
    category: 'mon-kho',
    name: 'Sườn kho thơm',
    slug: 'suon-kho-thom',
    description: 'Sườn kho thơm mềm, vị chua ngọt nhẹ rất đưa cơm.',
    image: '/images/foods/suon-xao-chua-ngot.jpg',
    time: 40,
    servings: 4,
    ingredients: [['Sườn non', 500], ['Thơm', 200]],
    steps: [
      'Chặt sườn vừa ăn, chần sơ và ướp gia vị.',
      'Áp chảo sườn cho săn rồi thêm thơm và ít nước.',
      'Kho nhỏ lửa đến khi sườn mềm, nước kho sánh lại.'
    ]
  },
  {
    category: 'mon-kho',
    name: 'Bò kho cà rốt',
    slug: 'bo-kho-ca-rot',
    description: 'Bò kho cà rốt thơm mềm, dùng với cơm hoặc bánh mì đều ngon.',
    image: '/images/foods/bo-xao-hanh-tay.jpg',
    time: 60,
    servings: 4,
    ingredients: [['Thịt bò', 500], ['Cà rốt', 300], ['Sả', 30]],
    steps: [
      'Thịt bò cắt miếng, ướp với sả và gia vị bò kho.',
      'Xào thịt cho săn rồi thêm nước hầm đến khi mềm.',
      'Cho cà rốt vào nấu chín, nêm lại và dùng nóng.'
    ]
  },
  {
    category: 'mon-kho',
    name: 'Cá basa kho nghệ',
    slug: 'ca-basa-kho-nghe',
    description: 'Cá basa kho nghệ có màu vàng đẹp, thơm và ít tanh.',
    image: '/images/foods/ca-kho-to.jpg',
    time: 35,
    servings: 4,
    ingredients: [['Cá basa', 500], ['Nghệ', 30]],
    steps: [
      'Cá basa rửa sạch, cắt khúc và ướp với nghệ, nước mắm.',
      'Cho cá vào nồi cùng ít nước màu và kho lửa nhỏ.',
      'Kho đến khi cá thấm, nước kho sệt và thơm mùi nghệ.'
    ]
  },
  {
    category: 'mon-kho',
    name: 'Gà kho sả ớt',
    slug: 'ga-kho-sa-ot',
    description: 'Gà kho sả ớt thơm cay nhẹ, hợp bữa cơm ngày mưa.',
    image: '/images/foods/ga-kho-gung.jpg',
    time: 40,
    servings: 4,
    ingredients: [['Thịt gà', 600], ['Sả', 50], ['Ớt chuông', 100]],
    steps: [
      'Gà chặt miếng vừa ăn, ướp với sả băm và gia vị.',
      'Phi thơm sả rồi cho gà vào đảo săn.',
      'Kho nhỏ lửa đến khi gà chín mềm và nước kho cạn vừa.'
    ]
  },
  {
    category: 'mon-xao',
    name: 'Mực xào cần tây',
    slug: 'muc-xao-can-tay',
    description: 'Mực xào cần tây giòn ngọt, thơm mùi rau cần và hành tây.',
    image: '/images/foods/bo-xao-hanh-tay.jpg',
    time: 20,
    servings: 3,
    ingredients: [['Mực', 400], ['Cần tây', 150], ['Hành tây', 100]],
    steps: [
      'Làm sạch mực, khứa nhẹ và cắt miếng; cần tây cắt khúc.',
      'Xào mực nhanh trên lửa lớn cho săn.',
      'Thêm cần tây, hành tây vào đảo đều rồi nêm vừa ăn.'
    ]
  },
  {
    category: 'mon-xao',
    name: 'Tôm xào bông cải',
    slug: 'tom-xao-bong-cai',
    description: 'Tôm xào bông cải xanh giòn, màu sắc bắt mắt và giàu dinh dưỡng.',
    image: '/images/foods/dau-que-xao-toi.jpg',
    time: 25,
    servings: 3,
    ingredients: [['Tôm', 300], ['Bông cải xanh', 300], ['Cà rốt', 100]],
    steps: [
      'Bông cải tách nhánh, chần sơ; tôm làm sạch.',
      'Xào tôm với tỏi cho thơm và vừa chín.',
      'Cho rau củ vào đảo nhanh, nêm gia vị rồi tắt bếp.'
    ]
  },
  {
    category: 'mon-xao',
    name: 'Gà xào mướp',
    slug: 'ga-xao-muop',
    description: 'Thịt gà xào mướp mềm ngọt, chế biến nhanh cho bữa tối.',
    image: '/images/foods/ga-kho-gung.jpg',
    time: 25,
    servings: 3,
    ingredients: [['Thịt gà', 350], ['Mướp', 300]],
    steps: [
      'Thịt gà thái miếng mỏng, ướp với chút nước mắm.',
      'Xào gà cho săn rồi cho mướp vào đảo đều.',
      'Nêm lại gia vị, xào đến khi mướp vừa chín tới.'
    ]
  },
  {
    category: 'mon-xao',
    name: 'Bò xào bông cải',
    slug: 'bo-xao-bong-cai',
    description: 'Bò xào bông cải mềm giòn, món nhanh gọn cho ngày bận.',
    image: '/images/foods/bo-xao-hanh-tay.jpg',
    time: 25,
    servings: 3,
    ingredients: [['Thịt bò', 400], ['Bông cải xanh', 300]],
    steps: [
      'Thịt bò thái mỏng, ướp dầu hào và tiêu; bông cải chần sơ.',
      'Xào bò nhanh trên lửa lớn rồi trút ra.',
      'Xào bông cải, cho bò vào đảo lại và nêm vừa ăn.'
    ]
  },
  {
    category: 'mon-xao',
    name: 'Nui xào bò',
    slug: 'nui-xao-bo',
    description: 'Nui xào bò sốt cà chua là món no bụng, hợp cả bữa sáng.',
    image: '/images/foods/bo-xao-hanh-tay.jpg',
    time: 30,
    servings: 3,
    ingredients: [['Nui', 250], ['Thịt bò', 250], ['Cà chua', 150]],
    steps: [
      'Luộc nui vừa chín tới, xả nước lạnh và để ráo.',
      'Xào bò với cà chua cho thành sốt nhẹ.',
      'Cho nui vào đảo đều, nêm lại và dùng khi còn nóng.'
    ]
  },
  {
    category: 'mon-xao',
    name: 'Cải chua xào trứng',
    slug: 'cai-chua-xao-trung',
    description: 'Cải chua xào trứng chua nhẹ, béo thơm và rất nhanh.',
    image: '/images/foods/trung-chien-hanh.jpg',
    time: 15,
    servings: 2,
    ingredients: [['Cải chua', 300], ['Trứng gà', 3]],
    steps: [
      'Rửa cải chua cho bớt mặn rồi cắt nhỏ.',
      'Xào cải chua cho ráo và thơm.',
      'Đổ trứng đã đánh vào, đảo đều đến khi trứng chín.'
    ]
  },
  {
    category: 'mon-rau',
    name: 'Mướp xào tỏi',
    slug: 'muop-xao-toi',
    description: 'Mướp xào tỏi mềm ngọt, món rau đơn giản cho bữa cơm.',
    image: '/images/foods/rau-muong-xao-toi.jpg',
    time: 15,
    servings: 3,
    ingredients: [['Mướp', 400], ['Tỏi', 20]],
    steps: [
      'Gọt mướp, cắt lát vừa ăn; tỏi băm nhỏ.',
      'Phi thơm tỏi với ít dầu ăn.',
      'Cho mướp vào xào nhanh, nêm vừa ăn và tắt bếp.'
    ]
  },
  {
    category: 'mon-chien',
    name: 'Đậu hũ chiên sả',
    slug: 'dau-hu-chien-sa',
    description: 'Đậu hũ chiên vàng áo sả thơm, ăn kèm nước tương rất hợp.',
    image: '/images/foods/dau-hu-sot-ca-chua.jpg',
    time: 20,
    servings: 3,
    ingredients: [['Đậu hũ', 4], ['Sả', 40]],
    steps: [
      'Cắt đậu hũ miếng vừa ăn và để ráo nước.',
      'Chiên đậu hũ vàng đều các mặt.',
      'Phi sả thơm, đảo đậu hũ với sả và chút gia vị.'
    ]
  },
  {
    category: 'mon-chien',
    name: 'Chả cá chiên thì là',
    slug: 'cha-ca-chien-thi-la',
    description: 'Chả cá chiên thơm thì là, bên ngoài vàng giòn bên trong dai mềm.',
    image: '/images/foods/ca-chien-nuoc-mam.jpg',
    time: 25,
    servings: 3,
    ingredients: [['Chả cá', 400], ['Thì là', 30]],
    steps: [
      'Trộn chả cá với thì là cắt nhỏ và chút tiêu.',
      'Nặn thành miếng vừa ăn.',
      'Chiên ngập dầu vừa đến khi chả cá vàng thơm.'
    ]
  },
  {
    category: 'mon-chien',
    name: 'Tôm chiên bột',
    slug: 'tom-chien-bot',
    description: 'Tôm chiên bột giòn rụm, phù hợp làm món mặn hoặc ăn chơi.',
    image: '/images/foods/ga-chien-nuoc-mam.jpg',
    time: 25,
    servings: 3,
    ingredients: [['Tôm', 400], ['Bột chiên giòn', 150]],
    steps: [
      'Tôm bóc vỏ, chừa đuôi và thấm khô.',
      'Pha bột chiên giòn theo hướng dẫn, nhúng tôm vào bột.',
      'Chiên tôm trong dầu nóng đến khi vàng giòn.'
    ]
  },
  {
    category: 'mon-chien',
    name: 'Cánh gà chiên giòn',
    slug: 'canh-ga-chien-gion',
    description: 'Cánh gà chiên giòn vàng, thịt bên trong mềm ngọt.',
    image: '/images/foods/ga-chien-nuoc-mam.jpg',
    time: 35,
    servings: 4,
    ingredients: [['Cánh gà', 600], ['Bột chiên giòn', 150]],
    steps: [
      'Cánh gà rửa sạch, khứa nhẹ và ướp gia vị.',
      'Áo cánh gà với bột chiên giòn.',
      'Chiên lửa vừa đến khi cánh gà chín vàng đều.'
    ]
  },
  {
    category: 'mon-chien',
    name: 'Trứng chiên thịt bằm',
    slug: 'trung-chien-thit-bam',
    description: 'Trứng chiên thịt bằm mềm thơm, dễ làm và rất hao cơm.',
    image: '/images/foods/trung-chien-hanh.jpg',
    time: 15,
    servings: 3,
    ingredients: [['Trứng gà', 4], ['Thịt heo bằm', 150]],
    steps: [
      'Đánh trứng với thịt bằm, hành lá và gia vị.',
      'Làm nóng chảo dầu rồi đổ hỗn hợp trứng vào.',
      'Chiên vàng hai mặt, cắt miếng và dùng nóng.'
    ]
  },
  {
    category: 'mon-chien',
    name: 'Cá rô phi chiên giòn',
    slug: 'ca-ro-phi-chien-gion',
    description: 'Cá rô phi chiên giòn, chấm nước mắm tỏi ớt rất ngon.',
    image: '/images/foods/ca-chien-nuoc-mam.jpg',
    time: 30,
    servings: 4,
    ingredients: [['Cá rô phi', 600]],
    steps: [
      'Làm sạch cá, khứa vài đường và thấm khô.',
      'Ướp cá với ít muối rồi chiên trong dầu nóng.',
      'Chiên đến khi cá vàng giòn hai mặt và để ráo dầu.'
    ]
  },
  {
    category: 'mon-luoc',
    name: 'Bầu luộc chấm trứng',
    slug: 'bau-luoc-cham-trung',
    description: 'Bầu luộc mềm ngọt, ăn cùng trứng luộc và nước mắm rất thanh.',
    image: '/images/foods/rau-cu-luoc.jpg',
    time: 20,
    servings: 3,
    ingredients: [['Bầu', 500], ['Trứng gà', 2]],
    steps: [
      'Gọt bầu, cắt miếng vừa ăn; luộc trứng chín.',
      'Đun sôi nước, cho bầu vào luộc vừa chín.',
      'Vớt bầu ra, dùng cùng trứng luộc và nước chấm.'
    ]
  },
  {
    category: 'mon-luoc',
    name: 'Rau lang luộc',
    slug: 'rau-lang-luoc',
    description: 'Rau lang luộc xanh mềm, món rau dân dã cho bữa cơm nhà.',
    image: '/images/foods/rau-cu-luoc.jpg',
    time: 15,
    servings: 3,
    ingredients: [['Rau lang', 500]],
    steps: [
      'Nhặt rau lang, rửa nhiều lần cho sạch đất cát.',
      'Đun nước thật sôi rồi cho rau vào luộc.',
      'Vớt rau khi vừa chín, giữ nước luộc làm canh nếu thích.'
    ]
  },
  {
    category: 'mon-luoc',
    name: 'Gà luộc lá chanh',
    slug: 'ga-luoc-la-chanh',
    description: 'Gà luộc da vàng, thịt ngọt, rắc lá chanh thơm nhẹ.',
    image: '/images/foods/ga-kho-gung.jpg',
    time: 45,
    servings: 4,
    ingredients: [['Thịt gà', 800], ['Lá chanh', 10]],
    steps: [
      'Rửa sạch gà, cho vào nồi cùng nước và ít muối.',
      'Luộc lửa vừa đến khi gà chín, ủ thêm vài phút.',
      'Chặt gà ra đĩa, rắc lá chanh thái chỉ lên trên.'
    ]
  },
  {
    category: 'mon-luoc',
    name: 'Thịt heo luộc cuốn rau',
    slug: 'thit-heo-luoc-cuon-rau',
    description: 'Thịt heo luộc cuốn rau sống, chấm mắm nêm hoặc nước mắm chua ngọt.',
    image: '/images/foods/thit-ba-chi-luoc.jpg',
    time: 35,
    servings: 4,
    ingredients: [['Thịt ba chỉ', 500], ['Dưa leo', 200], ['Xà lách', 200]],
    steps: [
      'Luộc thịt ba chỉ với ít muối và hành tím đến khi chín.',
      'Thái thịt mỏng, rửa sạch rau sống và dưa leo.',
      'Cuốn thịt với rau, dùng cùng nước chấm tùy thích.'
    ]
  },
  {
    category: 'mon-luoc',
    name: 'Bắp cải luộc',
    slug: 'bap-cai-luoc',
    description: 'Bắp cải luộc ngọt giòn, món rau nhanh cho mọi bữa cơm.',
    image: '/images/foods/rau-cu-luoc.jpg',
    time: 15,
    servings: 3,
    ingredients: [['Bắp cải', 500]],
    steps: [
      'Tách bắp cải, rửa sạch và cắt miếng vừa ăn.',
      'Đun sôi nước với chút muối rồi cho bắp cải vào.',
      'Luộc vừa chín, vớt ra để ráo và dùng nóng.'
    ]
  },
  {
    category: 'mon-man',
    name: 'Cà tím nướng mỡ hành',
    slug: 'ca-tim-nuong-mo-hanh',
    description: 'Cà tím nướng mềm thơm, phủ mỡ hành béo nhẹ và nước mắm chua ngọt.',
    image: '/images/foods/dau-hu-sot-ca-chua.jpg',
    time: 25,
    servings: 3,
    ingredients: [['Cà tím', 400], ['Hành lá', 50]],
    steps: [
      'Nướng cà tím đến khi vỏ xém và ruột mềm.',
      'Bóc vỏ cà, rưới mỡ hành lên trên.',
      'Dùng cùng nước mắm chua ngọt và cơm nóng.'
    ]
  },
  {
    category: 'mon-man',
    name: 'Thịt băm sốt cà chua',
    slug: 'thit-bam-sot-ca-chua',
    description: 'Thịt băm sốt cà chua mềm thơm, dễ ăn cho cả nhà.',
    image: '/images/foods/dau-hu-sot-ca-chua.jpg',
    time: 20,
    servings: 3,
    ingredients: [['Thịt heo bằm', 300], ['Cà chua', 300]],
    steps: [
      'Ướp thịt bằm với chút nước mắm và tiêu.',
      'Xào cà chua đến khi mềm thành sốt.',
      'Cho thịt vào đảo chín, nêm vừa ăn và rắc hành lá.'
    ]
  },
  {
    category: 'mon-man',
    name: 'Đậu hũ nhồi thịt sốt cà',
    slug: 'dau-hu-nhoi-thit-sot-ca',
    description: 'Đậu hũ nhồi thịt sốt cà chua đậm vị, mềm béo và bắt cơm.',
    image: '/images/foods/dau-hu-sot-ca-chua.jpg',
    time: 35,
    servings: 4,
    ingredients: [['Đậu hũ', 4], ['Thịt heo bằm', 200], ['Cà chua', 300]],
    steps: [
      'Khoét nhẹ đậu hũ, nhồi thịt bằm đã ướp vào giữa.',
      'Chiên sơ đậu hũ cho định hình.',
      'Nấu sốt cà chua rồi cho đậu hũ vào rim thấm.'
    ]
  },
  {
    category: 'mon-man',
    name: 'Cá basa sốt chua ngọt',
    slug: 'ca-basa-sot-chua-ngot',
    description: 'Cá basa chiên áp chảo rồi sốt chua ngọt với cà chua và thơm.',
    image: '/images/foods/ca-chien-nuoc-mam.jpg',
    time: 35,
    servings: 4,
    ingredients: [['Cá basa', 500], ['Cà chua', 200], ['Thơm', 150]],
    steps: [
      'Cá basa cắt miếng, thấm khô và chiên sơ.',
      'Xào cà chua, thơm với gia vị thành sốt chua ngọt.',
      'Cho cá vào áo sốt nhẹ để cá thấm đều.'
    ]
  },
  {
    category: 'mon-man',
    name: 'Gà rang lá chanh',
    slug: 'ga-rang-la-chanh',
    description: 'Gà rang lá chanh thơm lừng, thịt săn và đậm đà.',
    image: '/images/foods/ga-kho-gung.jpg',
    time: 35,
    servings: 4,
    ingredients: [['Thịt gà', 600], ['Lá chanh', 10]],
    steps: [
      'Gà chặt miếng vừa ăn, ướp với nước mắm và tiêu.',
      'Rang gà trên lửa vừa đến khi săn và vàng nhẹ.',
      'Thêm lá chanh thái chỉ, đảo đều rồi tắt bếp.'
    ]
  },
  {
    category: 'mon-man',
    name: 'Bò lúc lắc',
    slug: 'bo-luc-lac',
    description: 'Bò lúc lắc mềm thơm, xào nhanh cùng ớt chuông và hành tây.',
    image: '/images/foods/bo-xao-hanh-tay.jpg',
    time: 25,
    servings: 3,
    ingredients: [['Thịt bò', 500], ['Ớt chuông', 200], ['Hành tây', 150]],
    steps: [
      'Thịt bò cắt khối nhỏ, ướp dầu hào và tiêu.',
      'Áp chảo bò trên lửa lớn cho xém cạnh.',
      'Thêm ớt chuông, hành tây vào đảo nhanh rồi dùng nóng.'
    ]
  },
  {
    category: 'mon-luoc',
    name: 'Tôm hấp sả',
    slug: 'tom-hap-sa',
    description: 'Tôm hấp sả giữ vị ngọt tự nhiên, thơm và rất nhanh.',
    image: '/images/foods/ca-chien-nuoc-mam.jpg',
    time: 20,
    servings: 3,
    ingredients: [['Tôm', 500], ['Sả', 50]],
    steps: [
      'Tôm rửa sạch, cắt râu; sả đập dập.',
      'Lót sả dưới nồi, xếp tôm lên trên.',
      'Hấp đến khi tôm đỏ đều, dùng cùng muối tiêu chanh.'
    ]
  },
  {
    category: 'mon-luoc',
    name: 'Cá hấp gừng',
    slug: 'ca-hap-gung',
    description: 'Cá hấp gừng thanh nhẹ, giữ được độ ngọt và ít dầu mỡ.',
    image: '/images/foods/ca-kho-to.jpg',
    time: 30,
    servings: 4,
    ingredients: [['Cá lóc', 500], ['Gừng', 40]],
    steps: [
      'Cá làm sạch, khứa nhẹ hai mặt và ướp chút muối.',
      'Xếp gừng thái sợi lên cá rồi đem hấp.',
      'Hấp đến khi cá chín, dùng cùng nước mắm gừng.'
    ]
  }
];

const categoryIds = {
  'mon-man': 1,
  'mon-canh': 2,
  'mon-rau': 3,
  'mon-xao': 4,
  'mon-chien': 5,
  'mon-luoc': 6,
  'mon-kho': 7
};

function q(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

function row(values) {
  return `(${values.join(', ')})`;
}

function appendRowsToInsert(sql, table, rows) {
  const marker = `INSERT INTO \`${table}\``;
  const start = sql.indexOf(marker);
  if (start === -1) throw new Error(`Cannot find INSERT block for ${table}`);

  const end = sql.indexOf(';', start);
  if (end === -1) throw new Error(`Cannot find end of INSERT block for ${table}`);

  const before = sql.slice(0, end);
  const after = sql.slice(end);
  return `${before},\n${rows.join(',\n')}${after}`;
}

function replaceAutoIncrement(sql, table, value) {
  const re = new RegExp(`(ALTER TABLE \`${table}\`\\r?\\n  MODIFY \`[^\\n]+? AUTO_INCREMENT)(?:, AUTO_INCREMENT=\\d+)?;`);
  return sql.replace(re, `$1, AUTO_INCREMENT=${value};`);
}

function getInsertBlock(sql, table) {
  const start = sql.indexOf(`INSERT INTO \`${table}\``);
  if (start === -1) return '';
  const end = sql.indexOf(';', start);
  return sql.slice(start, end + 1);
}

function getMaxId(sql, table) {
  const block = getInsertBlock(sql, table);
  const ids = [...block.matchAll(/\((\d+),/g)].map((match) => Number(match[1]));
  return ids.length ? Math.max(...ids) : 0;
}

function getExistingFoodCount(sql) {
  return [...getInsertBlock(sql, 'foods').matchAll(/\(\d+,/g)].length;
}

function buildMainSql() {
  let sql = fs.readFileSync(sqlPath, 'utf8');
  if (sql.includes('canh-rau-ngot-thit-bam')) {
    console.log('hom_nay_an_gi.sql already has added foods');
    return;
  }

  const foodsToAdd = dishes.slice(0, Math.max(0, 50 - getExistingFoodCount(sql)));
  const ingredientMap = new Map(existingIngredients);
  let nextIngredientId = Math.max(getMaxId(sql, 'ingredients'), 30) + 1;

  const newIngredientRows = [];
  for (const dish of foodsToAdd) {
    for (const [name] of dish.ingredients) {
      if (ingredientMap.has(name)) continue;
      ingredientMap.set(name, nextIngredientId);
      newIngredientRows.push(row([
        nextIngredientId,
        q(name),
        q(ingredientUnits[name] || 'g'),
        q('2026-10-14 00:00:00'),
        q('2026-10-14 00:00:00')
      ]));
      nextIngredientId += 1;
    }
  }

  const nextFoodId = getMaxId(sql, 'foods') + 1;
  const foodIdBySlug = new Map();
  const foodRows = foodsToAdd.map((dish, index) => {
    const id = nextFoodId + index;
    foodIdBySlug.set(dish.slug, id);
    return row([
      id,
      categoryIds[dish.category],
      q(dish.name),
      q(dish.slug),
      q(dish.description),
      q(dish.image),
      dish.time,
      dish.servings,
      q('active'),
      q('2026-10-14 00:00:00'),
      q('2026-10-14 00:00:00')
    ]);
  });

  let nextFoodIngredientId = getMaxId(sql, 'food_ingredients') + 1;
  const foodIngredientRows = [];
  for (const dish of foodsToAdd) {
    for (const [name, quantity, note = null] of dish.ingredients) {
      foodIngredientRows.push(row([
        nextFoodIngredientId,
        foodIdBySlug.get(dish.slug),
        ingredientMap.get(name),
        Number(quantity).toFixed(2),
        note ? q(note) : 'NULL'
      ]));
      nextFoodIngredientId += 1;
    }
  }

  let nextStepId = getMaxId(sql, 'recipe_steps') + 1;
  const recipeRows = [];
  for (const dish of foodsToAdd) {
    dish.steps.forEach((step, index) => {
      recipeRows.push(row([
        nextStepId,
        foodIdBySlug.get(dish.slug),
        index + 1,
        q(step)
      ]));
      nextStepId += 1;
    });
  }

  if (newIngredientRows.length) sql = appendRowsToInsert(sql, 'ingredients', newIngredientRows);
  sql = appendRowsToInsert(sql, 'foods', foodRows);
  sql = appendRowsToInsert(sql, 'food_ingredients', foodIngredientRows);
  sql = appendRowsToInsert(sql, 'recipe_steps', recipeRows);

  sql = replaceAutoIncrement(sql, 'foods', nextFoodId + foodsToAdd.length);
  sql = replaceAutoIncrement(sql, 'ingredients', nextIngredientId);
  sql = replaceAutoIncrement(sql, 'food_ingredients', nextFoodIngredientId);
  sql = replaceAutoIncrement(sql, 'recipe_steps', nextStepId);

  fs.writeFileSync(sqlPath, sql, 'utf8');
}

function buildAddSql() {
  const allIngredientNames = new Set();
  dishes.forEach((dish) => dish.ingredients.forEach(([name]) => allIngredientNames.add(name)));

  const ingredientRows = [...allIngredientNames]
    .filter((name) => !existingIngredients.has(name))
    .map((name) => row([q(name), q(ingredientUnits[name] || 'g'), 'NOW()', 'NOW()']));

  const candidateRows = dishes.map((dish, index) => row([
    index + 1,
    q(dish.category),
    q(dish.name),
    q(dish.slug),
    q(dish.description),
    q(dish.image),
    dish.time,
    dish.servings
  ]));

  const candidateIngredientRows = dishes.flatMap((dish) =>
    dish.ingredients.map(([name, quantity, note = null]) => row([
      q(dish.slug),
      q(name),
      Number(quantity).toFixed(2),
      note ? q(note) : 'NULL'
    ]))
  );

  const candidateStepRows = dishes.flatMap((dish) =>
    dish.steps.map((step, index) => row([
      q(dish.slug),
      index + 1,
      q(step)
    ]))
  );

  const content = `-- Add enough foods to make the public site have 50 active foods.
-- Safe to run more than once: existing slugs/ingredients/steps are skipped.
SET NAMES utf8mb4;
START TRANSACTION;

SET @foods_needed := GREATEST(0, 50 - (SELECT COUNT(*) FROM foods WHERE status = 'active'));

CREATE TEMPORARY TABLE tmp_food_candidates (
  ord INT NOT NULL PRIMARY KEY,
  category_slug VARCHAR(150) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  cooking_time SMALLINT UNSIGNED NOT NULL,
  servings TINYINT UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_food_candidates (ord, category_slug, name, slug, description, image, cooking_time, servings) VALUES
${candidateRows.join(',\n')};

CREATE TEMPORARY TABLE tmp_food_candidate_ingredients (
  food_slug VARCHAR(255) NOT NULL,
  ingredient_name VARCHAR(150) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  note VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_food_candidate_ingredients (food_slug, ingredient_name, quantity, note) VALUES
${candidateIngredientRows.join(',\n')};

CREATE TEMPORARY TABLE tmp_food_candidate_steps (
  food_slug VARCHAR(255) NOT NULL,
  step_number SMALLINT UNSIGNED NOT NULL,
  instruction TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tmp_food_candidate_steps (food_slug, step_number, instruction) VALUES
${candidateStepRows.join(',\n')};

INSERT INTO ingredients (name, unit, created_at, updated_at) VALUES
${ingredientRows.join(',\n')}
ON DUPLICATE KEY UPDATE unit = VALUES(unit), updated_at = CURRENT_TIMESTAMP;

INSERT INTO foods (id_category, name, slug, description, image, cooking_time, servings, status, created_at, updated_at)
SELECT c.id_category, pick.name, pick.slug, pick.description, pick.image, pick.cooking_time, pick.servings, 'active', NOW(), NOW()
FROM (
  SELECT ranked.*
  FROM (
    SELECT f.*, ROW_NUMBER() OVER (ORDER BY f.ord) AS rn
    FROM tmp_food_candidates f
    WHERE NOT EXISTS (
      SELECT 1 FROM foods existing_food WHERE existing_food.slug = f.slug
    )
  ) ranked
  WHERE ranked.rn <= @foods_needed
) pick
JOIN categories c ON c.slug = pick.category_slug;

INSERT INTO food_ingredients (id_food, id_ingredient, quantity, note)
SELECT f.id_food, i.id_ingredient, fi.quantity, fi.note
FROM tmp_food_candidate_ingredients fi
JOIN foods f ON f.slug = fi.food_slug
JOIN ingredients i ON i.name = fi.ingredient_name
WHERE NOT EXISTS (
  SELECT 1
  FROM food_ingredients existing_fi
  WHERE existing_fi.id_food = f.id_food
    AND existing_fi.id_ingredient = i.id_ingredient
);

INSERT INTO recipe_steps (id_food, step_number, instruction)
SELECT f.id_food, s.step_number, s.instruction
FROM tmp_food_candidate_steps s
JOIN foods f ON f.slug = s.food_slug
WHERE NOT EXISTS (
  SELECT 1
  FROM recipe_steps existing_step
  WHERE existing_step.id_food = f.id_food
    AND existing_step.step_number = s.step_number
);

DROP TEMPORARY TABLE IF EXISTS tmp_food_candidate_steps;
DROP TEMPORARY TABLE IF EXISTS tmp_food_candidate_ingredients;
DROP TEMPORARY TABLE IF EXISTS tmp_food_candidates;

COMMIT;

SELECT COUNT(*) AS active_foods_after_import FROM foods WHERE status = 'active';
`;

  fs.writeFileSync(addSqlPath, content, 'utf8');
}

buildMainSql();
buildAddSql();

console.log(`Updated ${sqlPath}`);
console.log(`Created ${addSqlPath}`);

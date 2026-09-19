const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: '../.env' });

const reviewTemplates = [
  { name: 'Rahul Sharma', rating: 5, comment: 'Exceptional quality! Exceeded all my expectations. Fast delivery too.' },
  { name: 'Priya Nair', rating: 5, comment: 'Flipkart Assured quality! Super smooth finish and works flawlessly.' },
  { name: 'Vikram Singh', rating: 4, comment: 'Very good product for the price. Build quality feels solid.' },
  { name: 'Ananya Patel', rating: 5, comment: 'Loved it! Highly recommended to anyone looking for premium build.' },
  { name: 'David Miller', rating: 4, comment: 'Great performance and sleek design. Packaging was great.' },
  { name: 'Sneha Kapoor', rating: 5, comment: 'Absolute value for money! Will definitely buy again.' },
  { name: 'Amit Verma', rating: 5, comment: 'Stunning product. Using it daily and haven\'t faced any issues.' },
  { name: 'Sophia Chen', rating: 4, comment: 'Solid purchase. Matches description accurately.' },
];

// Called after users are created; userId is injected per review
function getRandomReviews(count, userId) {
  const shuffled = [...reviewTemplates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(r => ({
    user: userId,
    name: r.name,
    rating: r.rating,
    comment: r.comment,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
  }));
}

// products is now a function so userId can be passed in
function buildProducts(userId) {

return [
  // -------------------------------------------------------------
  // 1. ELECTRONICS (20 Products)
  // -------------------------------------------------------------
  {
    name: 'AeroSync Pro Wireless Headphones',
    description: 'Premium active noise-cancelling wireless headphones with 40-hour battery life, spatial audio, dual-mic noise reduction, and ultra-soft memory foam ear cushions.',
    price: 299.99, originalPrice: 399.99, category: 'Electronics', brand: 'AeroSync', stock: 45, rating: 4.8, numReviews: 124, isFeatured: true, badge: 'Best Seller',
    tags: ['wireless', 'noise-cancelling', 'audio', 'headphone'],
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'VisionX Pro Smartwatch Ultra',
    description: 'Advanced health tracking smartwatch with 1.9" Ultra AMOLED display, ECG monitoring, dual-band GPS, 100+ workout modes, and 7-day battery life.',
    price: 449.99, originalPrice: 549.99, category: 'Electronics', brand: 'VisionX', stock: 30, rating: 4.7, numReviews: 89, isFeatured: true, badge: 'New',
    tags: ['smartwatch', 'fitness', 'health', 'wearable'],
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'LumaCam X1 Mirrorless Camera',
    description: 'Full-frame mirrorless camera with 45MP sensor, 8K RAW video recording, real-time AI subject tracking, and 5-axis optical image stabilization.',
    price: 2499.99, originalPrice: 2799.99, category: 'Electronics', brand: 'LumaCam', stock: 15, rating: 4.9, numReviews: 56, isFeatured: true, badge: 'Pro',
    tags: ['camera', 'photography', '4k', 'mirrorless'],
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'QuantumBook Ultra 14 Laptop',
    description: 'Ultra-thin 14" OLED laptop featuring Intel Core i9 processor, 32GB LPDDR5 RAM, 1TB NVMe SSD, Thunderbolt 4, and up to 18-hour battery life.',
    price: 1799.99, originalPrice: 1999.99, category: 'Electronics', brand: 'QuantumBook', stock: 20, rating: 4.8, numReviews: 78, isFeatured: true, badge: 'Hot Deal',
    tags: ['laptop', 'computer', 'ultrabook', 'oled'],
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'OceanWave 360 Bluetooth Speaker',
    description: 'IPX7 100% waterproof 360-degree Bluetooth speaker with punchy bass, 24-hour continuous playtime, and multi-speaker party pairing.',
    price: 79.99, originalPrice: 99.99, category: 'Electronics', brand: 'OceanWave', stock: 75, rating: 4.5, numReviews: 234, isFeatured: false, badge: 'Sale',
    tags: ['speaker', 'bluetooth', 'waterproof', 'audio'],
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SoundMax Wireless Earbuds Pro',
    description: 'Active Noise Cancelling TWS earbuds with transparency mode, wireless charging case, touch controls, and 32 hours total playback.',
    price: 149.99, originalPrice: 189.99, category: 'Electronics', brand: 'SoundMax', stock: 60, rating: 4.6, numReviews: 180, isFeatured: false, badge: 'Popular',
    tags: ['earbuds', 'wireless', 'tws', 'audio'],
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'NovaPad Air 11 Tablet',
    description: 'Sleek 11-inch 2K liquid retina display tablet with Octa-Core processing, stylus pen support, quad speakers, and aluminum unibody.',
    price: 599.99, originalPrice: 699.99, category: 'Electronics', brand: 'NovaPad', stock: 25, rating: 4.7, numReviews: 95, isFeatured: false, badge: 'Trending',
    tags: ['tablet', 'display', 'stylus', 'portable'],
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Lumina 55 4K OLED Smart TV',
    description: 'Cinematic 55" 4K OLED TV with Dolby Vision IQ, 120Hz refresh rate, Google TV built-in, and ultra-thin bezel design.',
    price: 1299.99, originalPrice: 1499.99, category: 'Electronics', brand: 'Lumina', stock: 12, rating: 4.9, numReviews: 42, isFeatured: true, badge: 'Top Rated',
    tags: ['tv', '4k', 'oled', 'smart tv'],
    images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800', 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ApexPro GaN 140W Fast Charger',
    description: 'Ultra-compact 140W GaN III fast desktop charger with 3 USB-C ports and 1 USB-A port for simultaneous high-speed charging of laptops and phones.',
    price: 69.99, originalPrice: 89.99, category: 'Electronics', brand: 'ApexPro', stock: 110, rating: 4.8, numReviews: 215, isFeatured: false, badge: 'Best Seller',
    tags: ['charger', 'gan', 'fast charging', 'usb-c'],
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', 'https://images.unsplash.com/photo-1622445268465-843d63d80d46?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SoundPulse Dolby Atmos Soundbar',
    description: '3.1.2 channel home theater soundbar with wireless subwoofer, Dolby Atmos 3D audio, eARC HDMI, and Bluetooth streaming.',
    price: 349.99, originalPrice: 429.99, category: 'Electronics', brand: 'SoundPulse', stock: 18, rating: 4.6, numReviews: 67, isFeatured: false, badge: 'Sale',
    tags: ['soundbar', 'audio', 'home theater', 'dolby atmos'],
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'HyperDrive 2TB External NVMe SSD',
    description: 'Rugged USB 3.2 Gen2x2 portable SSD with read speeds up to 2000MB/s, IP65 water/dust resistance, and hardware encryption.',
    price: 189.99, originalPrice: 229.99, category: 'Electronics', brand: 'HyperDrive', stock: 40, rating: 4.8, numReviews: 134, isFeatured: false, badge: 'Pro',
    tags: ['ssd', 'storage', 'portable', 'fast'],
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SmartHome Hub Display 10',
    description: '10-inch smart home controller display with stereo speakers, built-in camera with privacy shutter, and Matter/Zigbee hub integration.',
    price: 179.99, originalPrice: 219.99, category: 'Electronics', brand: 'SmartHome', stock: 35, rating: 4.4, numReviews: 88, isFeatured: false, badge: 'New',
    tags: ['smart home', 'hub', 'display', 'assistant'],
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=800', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'AeroDrone 4K HDR Quadcopter',
    description: 'Foldable 4K HDR drone with 3-axis gimbal, 35-minute flight time, 10km HD video transmission, and omnidirectional obstacle sensing.',
    price: 799.99, originalPrice: 949.99, category: 'Electronics', brand: 'AeroDrone', stock: 14, rating: 4.7, numReviews: 53, isFeatured: true, badge: 'Hot',
    tags: ['drone', '4k', 'aerial', 'camera'],
    images: ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'VisionPro 27 4K 144Hz Monitor',
    description: '27" 4K UHD IPS gaming and creative display with 144Hz refresh rate, 1ms response time, 98% DCI-P3, HDR600, and USB-C Power Delivery.',
    price: 549.99, originalPrice: 649.99, category: 'Electronics', brand: 'VisionPro', stock: 22, rating: 4.8, numReviews: 112, isFeatured: false, badge: 'Bestseller',
    tags: ['monitor', '4k', '144hz', 'display'],
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800', 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SonicBass In-Ear Earphones',
    description: 'High-resolution wired in-ear monitors with dual dynamic drivers, detachable braided cable, and noise-isolating silicone tips.',
    price: 49.99, originalPrice: 69.99, category: 'Electronics', brand: 'SonicBass', stock: 90, rating: 4.4, numReviews: 195, isFeatured: false, badge: 'Budget Pick',
    tags: ['earphones', 'wired', 'audio', 'bass'],
    images: ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CineBeam Portable Mini Projector',
    description: 'Compact 1080p full HD smart pocket projector with 500 ANSI lumens, built-in battery, auto keystone correction, and WiFi streaming.',
    price: 299.99, originalPrice: 379.99, category: 'Electronics', brand: 'CineBeam', stock: 28, rating: 4.5, numReviews: 76, isFeatured: false, badge: 'Popular',
    tags: ['projector', 'cinema', 'portable', 'home theater'],
    images: ['https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'PowerBank Max 30000mAh 65W',
    description: 'Colossal 30000mAh fast-charging power bank with 65W Power Delivery to charge laptops, tablets, and smartphones simultaneously.',
    price: 89.99, originalPrice: 109.99, category: 'Electronics', brand: 'PowerBank', stock: 85, rating: 4.7, numReviews: 310, isFeatured: false, badge: 'Essential',
    tags: ['power bank', 'battery', 'charging', 'travel'],
    images: ['https://images.unsplash.com/photo-1609592424074-2792193b2a26?w=800', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'SmartLock Pro Touchscreen',
    description: 'Keyless entry smart door lock with fingerprint scanner, digital keypad, mobile app remote control, and emergency backup battery.',
    price: 199.99, originalPrice: 249.99, category: 'Electronics', brand: 'SmartLock', stock: 32, rating: 4.6, numReviews: 94, isFeatured: false, badge: 'New',
    tags: ['smart lock', 'security', 'fingerprint', 'home'],
    images: ['https://images.unsplash.com/photo-1558002038-1055907df827?w=800', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'StreamCam HD 60fps Web Camera',
    description: 'Full HD 1080p 60fps webcam with dual noise-cancelling mics, auto-focus, glass lens, and adjustable tripod mount for streaming and meetings.',
    price: 119.99, originalPrice: 149.99, category: 'Electronics', brand: 'StreamCam', stock: 45, rating: 4.7, numReviews: 142, isFeatured: false, badge: 'Top Rated',
    tags: ['webcam', 'streaming', 'hd', 'camera'],
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'AirBeat Wireless Mini Speaker',
    description: 'Palm-sized ultra-portable Bluetooth speaker with surprising volume, rugged rubber coating, 12-hour playback, and built-in carabiner.',
    price: 59.99, originalPrice: 79.99, category: 'Electronics', brand: 'AirBeat', stock: 100, rating: 4.5, numReviews: 220, isFeatured: false, badge: 'Sale',
    tags: ['speaker', 'mini', 'portable', 'outdoor'],
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800'],
    reviews: getRandomReviews(3, userId)
  },

  // -------------------------------------------------------------
  // 2. FASHION (20 Products)
  // -------------------------------------------------------------
  {
    name: 'FrostPeak Winter Insulated Ski Jacket',
    description: 'Waterproof, windproof alpine ski jacket with 3M Thinsulate thermal lining, underarm ventilation, powder skirt, and helmet-compatible hood.',
    price: 249.99, originalPrice: 319.99, category: 'Fashion', brand: 'FrostPeak', stock: 35, rating: 4.6, numReviews: 92, isFeatured: true, badge: 'Hot Deal',
    tags: ['jacket', 'ski', 'winter', 'outerwear'],
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800', 'https://images.unsplash.com/photo-1605908502724-9093a79a1b39?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'UrbanFlex Slim Fit Denim Jacket',
    description: 'Classic trucker style denim jacket crafted from premium stretch cotton denim with vintage wash, button front, and dual chest pockets.',
    price: 89.99, originalPrice: 119.99, category: 'Fashion', brand: 'UrbanFlex', stock: 65, rating: 4.7, numReviews: 145, isFeatured: false, badge: 'Bestseller',
    tags: ['denim', 'jacket', 'casual', 'urban'],
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800', 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'RoyalSilk Handloom Designer Saree',
    description: 'Exquisite pure Kanjeevaram silk saree with intricate zari woven floral borders, matching unstitched blouse piece, and rich luster finish.',
    price: 189.99, originalPrice: 249.99, category: 'Fashion', brand: 'RoyalSilk', stock: 25, rating: 4.9, numReviews: 78, isFeatured: true, badge: 'Trending',
    tags: ['saree', 'ethnic', 'silk', 'traditional'],
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'ClassicLeather Italian Oxfords',
    description: 'Handcrafted Italian full-grain leather oxford shoes with cushioned leather footbed, Goodyear welted sole, and timeless formal silhouette.',
    price: 199.99, originalPrice: 249.99, category: 'Fashion', brand: 'ClassicLeather', stock: 40, rating: 4.8, numReviews: 110, isFeatured: false, badge: 'Premium',
    tags: ['shoes', 'oxford', 'formal', 'leather'],
    images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800', 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'VelvetNight Evening Gown',
    description: 'Floor-length plush velvet evening dress featuring a subtle slit, off-shoulder neckline, tailored corset body, and elegant drape.',
    price: 159.99, originalPrice: 209.99, category: 'Fashion', brand: 'VelvetNight', stock: 20, rating: 4.7, numReviews: 64, isFeatured: false, badge: 'Glamour',
    tags: ['dress', 'gown', 'evening', 'velvet'],
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CozyKnit Heavyweight Cotton Hoodie',
    description: '450 GSM ultra-soft fleece cotton pullover hoodie with fleece-lined double hood, kangaroo pocket, and relaxed unisex streetwear fit.',
    price: 69.99, originalPrice: 89.99, category: 'Fashion', brand: 'CozyKnit', stock: 85, rating: 4.6, numReviews: 210, isFeatured: false, badge: 'Popular',
    tags: ['hoodie', 'streetwear', 'cotton', 'cozy'],
    images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800', 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ModernTrench Waterproof Overcoat',
    description: 'Double-breasted weatherproof trench coat with detachable wool lining, belted waist, storm flap, and deep welt pockets.',
    price: 179.99, originalPrice: 229.99, category: 'Fashion', brand: 'ModernTrench', stock: 30, rating: 4.8, numReviews: 83, isFeatured: false, badge: 'Classic',
    tags: ['trench coat', 'overcoat', 'waterproof', 'fashion'],
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?w=800', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'BreezeBatik Floral Summer Maxi Dress',
    description: 'Lightweight breathable rayon maxi dress featuring bohemian batik print, smocked waist, tier ruffle skirt, and flutter sleeves.',
    price: 79.99, originalPrice: 99.99, category: 'Fashion', brand: 'BreezeBatik', stock: 50, rating: 4.5, numReviews: 128, isFeatured: false, badge: 'Summer Sale',
    tags: ['maxi dress', 'floral', 'summer', 'boho'],
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'TailoredFit Mens 3-Piece Suit',
    description: 'Modern slim fit 3-piece tuxedo suit includes notch lapel jacket, double-breasted vest, and flat-front trousers in premium wool blend.',
    price: 349.99, originalPrice: 449.99, category: 'Fashion', brand: 'TailoredFit', stock: 18, rating: 4.9, numReviews: 95, isFeatured: true, badge: 'Best Seller',
    tags: ['suit', 'tuxedo', 'menswear', 'formal'],
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'HeritageWool Tartan Fringe Scarf',
    description: '100% pure merino wool woven plaid scarf with fringed edges, ultra-warm soft hand feel, and traditional Scottish tartan patterns.',
    price: 39.99, originalPrice: 59.99, category: 'Fashion', brand: 'HeritageWool', stock: 120, rating: 4.6, numReviews: 167, isFeatured: false, badge: 'Essential',
    tags: ['scarf', 'wool', 'winter', 'accessories'],
    images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800', 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'UrbanPolo Organic Cotton Polo',
    description: 'Pique knit 100% organic cotton polo shirt with mother-of-pearl buttons, rib knit collar, and anti-fade vibrant dyeing technology.',
    price: 49.99, originalPrice: 69.99, category: 'Fashion', brand: 'UrbanPolo', stock: 75, rating: 4.5, numReviews: 130, isFeatured: false, badge: 'Eco Friendly',
    tags: ['polo', 'cotton', 'shirt', 'casual'],
    images: ['https://images.unsplash.com/photo-1625910513413-7fc21e344675?w=800', 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'LuxeCashmere V-Neck Sweater',
    description: '100% Mongolian 2-ply cashmere sweater offering lightweight warmth, pill-resistant finish, and refined ribbed trim detailing.',
    price: 139.99, originalPrice: 179.99, category: 'Fashion', brand: 'LuxeCashmere', stock: 28, rating: 4.8, numReviews: 72, isFeatured: false, badge: 'Luxe',
    tags: ['sweater', 'cashmere', 'knitwear', 'premium'],
    images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800', 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'StreetVibe Oversized Graphic Tee',
    description: 'Heavy 260 GSM combed cotton vintage washed t-shirt featuring high-density screen printed streetwear graphic graphics.',
    price: 34.99, originalPrice: 44.99, category: 'Fashion', brand: 'StreetVibe', stock: 95, rating: 4.6, numReviews: 240, isFeatured: false, badge: 'Trending',
    tags: ['t-shirt', 'streetwear', 'graphic tee', 'oversized'],
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SunShield UV Protection Fedora Hat',
    description: 'Hand-woven Ecuadorian straw fedora with UPF 50+ sun protection, interior sweatband, and grosgrain ribbon accent.',
    price: 44.99, originalPrice: 59.99, category: 'Fashion', brand: 'SunShield', stock: 45, rating: 4.4, numReviews: 88, isFeatured: false, badge: 'Summer',
    tags: ['hat', 'fedora', 'straw hat', 'accessories'],
    images: ['https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ActiveFlex Seamless Leggings Set',
    description: 'High-waisted squat-proof compression leggings and matching sports bra with 4-way stretch, moisture-wicking technology, and zero chafing seams.',
    price: 59.99, originalPrice: 79.99, category: 'Fashion', brand: 'ActiveFlex', stock: 60, rating: 4.7, numReviews: 185, isFeatured: false, badge: 'Best Seller',
    tags: ['leggings', 'activewear', 'gym', 'fitness'],
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800', 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ElegancePleated A-Line Midi Skirt',
    description: 'High-waist accordion pleated midi skirt featuring satin sheen finish, elasticized waistband, and graceful movement.',
    price: 64.99, originalPrice: 84.99, category: 'Fashion', brand: 'Elegance', stock: 40, rating: 4.5, numReviews: 96, isFeatured: false, badge: 'New',
    tags: ['skirt', 'pleated', 'midi', 'satin'],
    images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'BoldBiker Genuine Leather Jacket',
    description: '100% lambskin leather motorcycle jacket with asymmetrical front zipper, silver hardware, quilted shoulder panels, and satin lining.',
    price: 279.99, originalPrice: 349.99, category: 'Fashion', brand: 'BoldBiker', stock: 22, rating: 4.9, numReviews: 104, isFeatured: true, badge: 'Iconic',
    tags: ['leather jacket', 'biker', 'outerwear', 'lambskin'],
    images: ['https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'CasualChic Button-Down Linen Shirt',
    description: 'Breathable 100% French flax linen long-sleeve casual shirt tailored with relaxed spread collar and mother-of-pearl buttons.',
    price: 54.99, originalPrice: 74.99, category: 'Fashion', brand: 'CasualChic', stock: 70, rating: 4.6, numReviews: 140, isFeatured: false, badge: 'Breeze',
    tags: ['linen', 'shirt', 'casual', 'breathable'],
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'WinterWarm Thermal Base Layer Set',
    description: 'Merino wool blend top and bottom thermal underwear set designed for sub-zero heat retention, odor control, and extreme comfort.',
    price: 49.99, originalPrice: 64.99, category: 'Fashion', brand: 'WinterWarm', stock: 80, rating: 4.7, numReviews: 160, isFeatured: false, badge: 'Warmth',
    tags: ['thermal', 'base layer', 'winter', 'merino'],
    images: ['https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SummerLinen Relaxed Trousers',
    description: 'Drawstring linen-cotton relaxed trousers with slanted side pockets and straight leg cut ideal for beach vacations and casual wear.',
    price: 69.99, originalPrice: 89.99, category: 'Fashion', brand: 'SummerLinen', stock: 55, rating: 4.5, numReviews: 115, isFeatured: false, badge: 'Resort',
    tags: ['trousers', 'linen', 'pants', 'summer'],
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800'],
    reviews: getRandomReviews(3, userId)
  },

  // -------------------------------------------------------------
  // 3. HOME (20 Products)
  // -------------------------------------------------------------
  {
    name: 'LuxHome Air Purifier 500 HEPA',
    description: 'Medical-grade H13 True HEPA air purifier covering up to 600 sq ft. Features active carbon filter for smoke/pet odor and smart air quality sensor LED.',
    price: 199.99, originalPrice: 249.99, category: 'Home', brand: 'LuxHome', stock: 50, rating: 4.7, numReviews: 143, isFeatured: true, badge: 'Best Seller',
    tags: ['air purifier', 'hepa', 'home', 'clean air'],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'BaristaPro Espresso Machine 15-Bar',
    description: 'Professional 15-bar Italian pump espresso maker with built-in conical grinder, microfoam milk steaming wand, and precise PID temperature control.',
    price: 499.99, originalPrice: 599.99, category: 'Home', brand: 'BaristaPro', stock: 20, rating: 4.9, numReviews: 210, isFeatured: true, badge: 'Top Choice',
    tags: ['espresso', 'coffee maker', 'kitchen', 'barista'],
    images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800', 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a698?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Roboclean Smart Robot Vacuum & Mop',
    description: 'LiDAR laser navigation robot vacuum with 4000Pa suction, auto-empty dust bin dock, sonic mopping pad, and app customized room cleaning.',
    price: 349.99, originalPrice: 449.99, category: 'Home', brand: 'Roboclean', stock: 35, rating: 4.8, numReviews: 175, isFeatured: true, badge: 'Hot Deal',
    tags: ['robot vacuum', 'cleaning', 'smart home', 'mop'],
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800', 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'AirChef XL Digital Air Fryer 6.5L',
    description: 'Large 6.5-Liter rapid air convection fryer with 12 preset cooking modes, non-stick ceramic basket, glass viewing window, and 85% less oil tech.',
    price: 129.99, originalPrice: 169.99, category: 'Home', brand: 'AirChef', stock: 65, rating: 4.7, numReviews: 320, isFeatured: false, badge: 'Popular',
    tags: ['air fryer', 'kitchen', 'cooking', 'healthy'],
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CloudComfort Ergonomic Mesh Chair',
    description: 'High-back ergonomic office desk chair with dynamic lumbar support, 3D adjustable armrests, breathable mesh backrest, and tilt lock mechanism.',
    price: 229.99, originalPrice: 299.99, category: 'Home', brand: 'CloudComfort', stock: 40, rating: 4.6, numReviews: 198, isFeatured: false, badge: 'Comfort Pick',
    tags: ['office chair', 'ergonomic', 'furniture', 'mesh'],
    images: ['https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=800', 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'VelvetLuxe 3-Seater Living Room Sofa',
    description: 'Modern mid-century 3-seater couch featuring stain-resistant velvet upholstery, solid hardwood frame, high-density foam cushions, and gold brass legs.',
    price: 799.99, originalPrice: 999.99, category: 'Home', brand: 'VelvetLuxe', stock: 10, rating: 4.8, numReviews: 65, isFeatured: true, badge: 'Luxury',
    tags: ['sofa', 'couch', 'furniture', 'living room'],
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'NordicWood Round Oak Dining Table',
    description: 'Solid white oak round dining table with fluted pedestal base, seating up to 6 people comfortably with natural matte lacquer protective seal.',
    price: 449.99, originalPrice: 549.99, category: 'Home', brand: 'NordicWood', stock: 15, rating: 4.7, numReviews: 48, isFeatured: false, badge: 'Design Award',
    tags: ['dining table', 'furniture', 'wood', 'nordic'],
    images: ['https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800', 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'EgyptianCotton 1000 Thread Bedding Set',
    description: 'Luxurious 4-piece sheet set crafted from long-staple 1000 thread count Egyptian cotton with sateen weave sheen and deep pocket fitted sheet.',
    price: 149.99, originalPrice: 199.99, category: 'Home', brand: 'EgyptianCotton', stock: 55, rating: 4.9, numReviews: 240, isFeatured: false, badge: '5-Star Hotel',
    tags: ['bedding', 'sheets', 'cotton', 'bedroom'],
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'LumosArc Modern LED Floor Lamp',
    description: 'Architectural arched floor lamp with dimmable LED bulb, heavy marble base, brushed brass finish, and remote warm/white color temperature control.',
    price: 119.99, originalPrice: 159.99, category: 'Home', brand: 'LumosArc', stock: 30, rating: 4.6, numReviews: 89, isFeatured: false, badge: 'Trending',
    tags: ['lamp', 'lighting', 'floor lamp', 'decor'],
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'PureWater Countertop UV Purifier',
    description: 'Direct-flow 5-stage RO + UV water purifier with instant hot/cold water dispensing, TDS display filter monitor, and tool-free quick twist filter change.',
    price: 179.99, originalPrice: 229.99, category: 'Home', brand: 'PureWater', stock: 25, rating: 4.7, numReviews: 112, isFeatured: false, badge: 'Essential',
    tags: ['water purifier', 'kitchen', 'ro filter', 'health'],
    images: ['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ChefSeries Non-Stick Cookware 10-Piece',
    description: 'Hard-anodized aluminum cookware set with triple-layer titanium nonstick coating, stainless stay-cool handles, and tempered glass lids. Oven safe to 500°F.',
    price: 199.99, originalPrice: 269.99, category: 'Home', brand: 'ChefSeries', stock: 45, rating: 4.8, numReviews: 280, isFeatured: false, badge: 'Top Seller',
    tags: ['cookware', 'pots and pans', 'kitchen', 'nonstick'],
    images: ['https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?w=800', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'AromaDiffuser Ultrasonic Humidifier',
    description: 'Quiet 3L essential oil cool mist humidifier with 7 ambient LED light colors, auto shutdown, and 24-hour continuous misting.',
    price: 44.99, originalPrice: 59.99, category: 'Home', brand: 'AromaDiffuser', stock: 90, rating: 4.5, numReviews: 176, isFeatured: false, badge: 'Relaxing',
    tags: ['diffuser', 'humidifier', 'aromatherapy', 'home'],
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'OrthoRest Memory Foam Mattress Topper',
    description: '3-inch cooling gel-infused memory foam mattress topper with removable bamboo washable cover for pressure-relieving back support.',
    price: 109.99, originalPrice: 149.99, category: 'Home', brand: 'OrthoRest', stock: 60, rating: 4.7, numReviews: 215, isFeatured: false, badge: 'Comfort',
    tags: ['mattress topper', 'memory foam', 'bedding', 'sleep'],
    images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SmartGlow App Desk Lamp',
    description: 'Sleek aluminum folding LED desk lamp with wireless smartphone charging pad, eye-care flicker-free dimming, and Google Assistant voice control.',
    price: 59.99, originalPrice: 79.99, category: 'Home', brand: 'SmartGlow', stock: 75, rating: 4.6, numReviews: 132, isFeatured: false, badge: 'Smart',
    tags: ['desk lamp', 'led', 'wireless charger', 'office'],
    images: ['https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'MinimalistCeramic Vase Set of 3',
    description: 'Handcrafted Nordic matte white ceramic vases designed for pampas grass, dried flowers, or modern minimalist bookshelf decor.',
    price: 39.99, originalPrice: 54.99, category: 'Home', brand: 'Minimalist', stock: 80, rating: 4.6, numReviews: 154, isFeatured: false, badge: 'Aesthetic',
    tags: ['vase', 'ceramic', 'decor', 'pampas grass'],
    images: ['https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800', 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'HydroClean Cordless Pressure Washer',
    description: 'Portable 20V battery powered pressure washer delivering 500 PSI for car washing, patio cleaning, and outdoor furniture maintenance.',
    price: 139.99, originalPrice: 179.99, category: 'Home', brand: 'HydroClean', stock: 35, rating: 4.5, numReviews: 87, isFeatured: false, badge: 'Outdoor',
    tags: ['pressure washer', 'cleaning', 'cordless', 'tools'],
    images: ['https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CozyThrow Merino Wool Blanket',
    description: 'Chunky hand-knit 100% Australian merino wool throw blanket (50x60") providing plush softness and warm texture for living room couches.',
    price: 89.99, originalPrice: 119.99, category: 'Home', brand: 'CozyThrow', stock: 40, rating: 4.8, numReviews: 109, isFeatured: false, badge: 'Warmth',
    tags: ['blanket', 'merino wool', 'throw', 'decor'],
    images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800', 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ThermoBlender High-Speed Blender 1800W',
    description: 'Commercial grade 1800W blender with hardened stainless steel blades, pulse mode, preset smoothie/soup programs, and 2L BPA-free pitcher.',
    price: 119.99, originalPrice: 149.99, category: 'Home', brand: 'ThermoBlender', stock: 50, rating: 4.7, numReviews: 165, isFeatured: false, badge: 'Heavy Duty',
    tags: ['blender', 'kitchen', 'smoothie', 'appliance'],
    images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CleanStep Automatic Motion Sensor Can',
    description: '13-Gallon stainless steel touchless garbage bin with infrared motion sensor, fingerprint-proof coating, and odor filter compartment.',
    price: 69.99, originalPrice: 89.99, category: 'Home', brand: 'CleanStep', stock: 65, rating: 4.6, numReviews: 142, isFeatured: false, badge: 'Hygiene',
    tags: ['trash can', 'touchless', 'stainless steel', 'kitchen'],
    images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'WallCraft Geometric Brass Wall Mirror',
    description: 'Modern 30" hexagonal brass framed accent wall mirror with crystal clear reflection HD glass for entryways and vanities.',
    price: 79.99, originalPrice: 109.99, category: 'Home', brand: 'WallCraft', stock: 30, rating: 4.7, numReviews: 98, isFeatured: false, badge: 'Elegance',
    tags: ['mirror', 'wall mirror', 'decor', 'brass'],
    images: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800', 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=800'],
    reviews: getRandomReviews(3, userId)
  },

  // -------------------------------------------------------------
  // 4. SPORTS (20 Products)
  // -------------------------------------------------------------
  {
    name: 'CloudStep Air Running Shoes',
    description: 'Ultra-lightweight performance road running shoes with responsive nitrogen-infused foam midsole, carbon fiber plate, and breathable mesh upper.',
    price: 189.99, originalPrice: 229.99, category: 'Sports', brand: 'CloudStep', stock: 80, rating: 4.6, numReviews: 203, isFeatured: true, badge: 'Sale',
    tags: ['shoes', 'running', 'sports', 'marathon'],
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Zenith Yoga Mat Pro 8mm Eco',
    description: 'Extra-thick 8mm high-density non-slip eco rubber yoga mat with engraved alignment posture lines and cotton carrying strap.',
    price: 59.99, originalPrice: 79.99, category: 'Sports', brand: 'Zenith', stock: 120, rating: 4.7, numReviews: 178, isFeatured: false, badge: 'Eco Friendly',
    tags: ['yoga mat', 'fitness', 'pilates', 'gym'],
    images: ['https://images.unsplash.com/photo-1601925228080-22b95f94e726?w=800', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'FlexGym Adjustable Dumbbells 50lbs Set',
    description: 'Fast-select weight adjustable dumbbell pair replacing 15 sets of weights from 5 to 50 lbs with smooth dial mechanism and storage trays.',
    price: 299.99, originalPrice: 399.99, category: 'Sports', brand: 'FlexGym', stock: 25, rating: 4.9, numReviews: 310, isFeatured: true, badge: 'Best Seller',
    tags: ['dumbbells', 'weights', 'gym', 'strength'],
    images: ['https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'TrailBlazer 21-Speed Mountain Bike',
    description: '29-Inch aluminum alloy hardtail mountain bike with Shimano 21-speed drivetrain, front suspension fork, and mechanical dual disc brakes.',
    price: 549.99, originalPrice: 699.99, category: 'Sports', brand: 'TrailBlazer', stock: 15, rating: 4.8, numReviews: 86, isFeatured: true, badge: 'Adventure',
    tags: ['bike', 'mountain bike', 'cycling', 'outdoor'],
    images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800', 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'EnduranceTread Smart Folding Treadmill',
    description: 'Compact space-saving motorized treadmill with 3.0 HP motor, 15% automatic incline, HD touchscreen, and Bluetooth heart rate strap.',
    price: 699.99, originalPrice: 849.99, category: 'Sports', brand: 'Endurance', stock: 10, rating: 4.7, numReviews: 64, isFeatured: false, badge: 'Top Rated',
    tags: ['treadmill', 'cardio', 'home gym', 'running'],
    images: ['https://images.unsplash.com/photo-1576678927484-cc909957088c?w=800', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'AlpineHike 4-Person Waterproof Tent',
    description: 'Double-layer 3000mm waterproof dome camping tent with vestibule awning, easy 5-minute setup aluminum poles, and mesh gear loft.',
    price: 159.99, originalPrice: 209.99, category: 'Sports', brand: 'AlpineHike', stock: 35, rating: 4.6, numReviews: 125, isFeatured: false, badge: 'Outdoor',
    tags: ['tent', 'camping', 'hiking', 'outdoor'],
    images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SmashPro Carbon Fiber Tennis Racket',
    description: 'Graphite-carbon composite tennis racket engineered for explosive power, spin stability, and pre-strung with high-tenacity polyester string.',
    price: 149.99, originalPrice: 189.99, category: 'Sports', brand: 'SmashPro', stock: 40, rating: 4.7, numReviews: 92, isFeatured: false, badge: 'Pro Grade',
    tags: ['tennis', 'racket', 'carbon fiber', 'court'],
    images: ['https://images.unsplash.com/photo-1617083934555-ac7d4fed8814?w=800', 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'HydroFit 2L Hydration Backpack',
    description: 'Lightweight running and cycling vest pack with BPA-free 2-Liter leakproof water bladder, quick-bite valve, and reflective safety strips.',
    price: 49.99, originalPrice: 69.99, category: 'Sports', brand: 'HydroFit', stock: 85, rating: 4.5, numReviews: 174, isFeatured: false, badge: 'Essential',
    tags: ['hydration', 'backpack', 'running', 'cycling'],
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'PowerBand Resistance Bands 5-Set',
    description: '100% natural latex heavy duty exercise loop bands ranging from light to XXX-heavy resistance for strength training and rehab.',
    price: 29.99, originalPrice: 39.99, category: 'Sports', brand: 'PowerBand', stock: 150, rating: 4.6, numReviews: 420, isFeatured: false, badge: 'Best Value',
    tags: ['resistance bands', 'fitness', 'home workout', 'rehab'],
    images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800', 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'StrikeKing Tournament English Willow Cricket Bat',
    description: 'Grade-1 English Willow handcrafted cricket bat with full profile spine, semi-oval cane handle, and protective toe guard.',
    price: 179.99, originalPrice: 229.99, category: 'Sports', brand: 'StrikeKing', stock: 25, rating: 4.8, numReviews: 118, isFeatured: false, badge: 'Flipkart Special',
    tags: ['cricket', 'bat', 'sports', 'english willow'],
    images: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800', 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SpeedRope Weighted Jump Rope',
    description: 'Tangle-free ball bearing speed jump rope with removable 0.5lb handle weights, memory foam handles, and adjustable steel cable.',
    price: 24.99, originalPrice: 34.99, category: 'Sports', brand: 'SpeedRope', stock: 110, rating: 4.5, numReviews: 190, isFeatured: false, badge: 'Popular',
    tags: ['jump rope', 'cardio', 'boxing', 'crossfit'],
    images: ['https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'GymPro Cast Iron Kettlebell 24kg',
    description: 'Solid cast iron kettlebell with wide textured ergonomic grip handle and flat rubber base to prevent rolling during swings and squats.',
    price: 69.99, originalPrice: 89.99, category: 'Sports', brand: 'GymPro', stock: 45, rating: 4.7, numReviews: 135, isFeatured: false, badge: 'Durable',
    tags: ['kettlebell', 'weights', 'crossfit', 'strength'],
    images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800', 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'RecoveryGun Deep Tissue Massage Gun',
    description: 'Percussive therapy muscle massager with brushless motor, 30 speed levels, 6 interchangeable massage heads, and ultra quiet operation.',
    price: 119.99, originalPrice: 159.99, category: 'Sports', brand: 'RecoveryGun', stock: 55, rating: 4.8, numReviews: 245, isFeatured: false, badge: 'Recovery',
    tags: ['massage gun', 'recovery', 'muscle', 'fitness'],
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800', 'https://images.unsplash.com/photo-1601925228080-22b95f94e726?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'AeroSpeed Aerodynamic Cycling Helmet',
    description: 'In-mold polycarbonate road bike helmet with 18 wind-channel vents, dial-fit sizing system, and integrated magnetic rear safety light.',
    price: 79.99, originalPrice: 99.99, category: 'Sports', brand: 'AeroSpeed', stock: 40, rating: 4.6, numReviews: 88, isFeatured: false, badge: 'Safety First',
    tags: ['helmet', 'cycling', 'bike', 'safety'],
    images: ['https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=800', 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'OceanGlide Inflatable Stand-Up Paddleboard',
    description: '10\'6" military-grade drop-stitch inflatable SUP board complete with 3-piece paddle, dual-action pump, safety leash, and travel backpack.',
    price: 399.99, originalPrice: 499.99, category: 'Sports', brand: 'OceanGlide', stock: 20, rating: 4.8, numReviews: 95, isFeatured: true, badge: 'Summer Hit',
    tags: ['paddleboard', 'sup', 'water sports', 'inflatable'],
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'FlexGrip Padded Weightlifting Gloves',
    description: 'Breathable leather gym gloves with padded palm protection, integrated 18-inch wrist wraps, and pull-tab finger loops.',
    price: 19.99, originalPrice: 29.99, category: 'Sports', brand: 'FlexGrip', stock: 130, rating: 4.4, numReviews: 210, isFeatured: false, badge: 'Bestseller',
    tags: ['gloves', 'weightlifting', 'gym', 'accessories'],
    images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800', 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CourtMaster Official Indoor Volleyball',
    description: 'Soft touch composite leather indoor match volleyball with 18-panel hand-stitched construction and air lock butyl bladder.',
    price: 34.99, originalPrice: 44.99, category: 'Sports', brand: 'CourtMaster', stock: 75, rating: 4.6, numReviews: 114, isFeatured: false, badge: 'Official',
    tags: ['volleyball', 'ball', 'indoor', 'sports'],
    images: ['https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800', 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'TrailMaster Trekking Poles Pair',
    description: 'Ultra-light 7075 aircraft aluminum hiking poles with quick flip locks, cork grip handles, and tungsten carbide tip ends.',
    price: 44.99, originalPrice: 59.99, category: 'Sports', brand: 'TrailMaster', stock: 65, rating: 4.7, numReviews: 130, isFeatured: false, badge: 'Hiking',
    tags: ['trekking poles', 'hiking', 'outdoor', 'walking'],
    images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'GoalPro Portable Soccer Net Set 6x4ft',
    description: 'All-weather pop-up soccer net pair with fiberglass poles, steel ground stakes, and heavy duty carry bag for backyard training.',
    price: 89.99, originalPrice: 119.99, category: 'Sports', brand: 'GoalPro', stock: 35, rating: 4.5, numReviews: 78, isFeatured: false, badge: 'Fun',
    tags: ['soccer', 'goal net', 'football', 'backyard'],
    images: ['https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ThermoSport Insulated Stainless Bottle 1L',
    description: 'Double-wall vacuum insulated stainless steel water bottle keeping drinks ice cold for 24 hours with leakproof straw lid.',
    price: 32.99, originalPrice: 42.99, category: 'Sports', brand: 'ThermoSport', stock: 100, rating: 4.8, numReviews: 340, isFeatured: false, badge: 'Top Rated',
    tags: ['water bottle', 'stainless steel', 'hydration', 'gym'],
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800'],
    reviews: getRandomReviews(4, userId)
  },

  // -------------------------------------------------------------
  // 5. BEAUTY (20 Products)
  // -------------------------------------------------------------
  {
    name: 'AuraGlow Skincare Routine 5-Set',
    description: 'Complete 5-step daily glowing skin routine: Vitamin C serum, Hyaluronic acid moisturizer, Retinol night repair, Eye cream, and SPF 50 sunscreen.',
    price: 89.99, originalPrice: 120.00, category: 'Beauty', brand: 'AuraGlow', stock: 100, rating: 4.8, numReviews: 445, isFeatured: true, badge: 'Flipkart Choice',
    tags: ['skincare', 'beauty', 'serum', 'glow'],
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'GlowSerum Triple Vitamin C Complex',
    description: 'Potent 20% L-Ascorbic Acid brightening face serum enriched with Ferulic acid and Vitamin E to reduce dark spots and boost collagen.',
    price: 45.99, originalPrice: 59.99, category: 'Beauty', brand: 'GlowSerum', stock: 80, rating: 4.7, numReviews: 320, isFeatured: false, badge: 'Best Seller',
    tags: ['serum', 'vitamin c', 'brightening', 'skincare'],
    images: ['https://images.unsplash.com/photo-1608248597309-172377b5a828?w=800', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SilkHydrate Hyaluronic Face Cream',
    description: 'Deeply hydrating gel moisturizer with multi-molecular hyaluronic acid, niacinamide, and squalane for 72-hour moisture lock.',
    price: 39.99, originalPrice: 49.99, category: 'Beauty', brand: 'SilkHydrate', stock: 95, rating: 4.6, numReviews: 210, isFeatured: false, badge: 'Hydrating',
    tags: ['moisturizer', 'hyaluronic acid', 'face cream', 'skincare'],
    images: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'RetinolYouth Night Repair Eye Serum',
    description: 'Targeted anti-aging eye serum infused with 0.5% encapsulated retinol, peptides, and caffeine to diminish fine lines and dark circles.',
    price: 49.99, originalPrice: 64.99, category: 'Beauty', brand: 'RetinolYouth', stock: 60, rating: 4.7, numReviews: 185, isFeatured: false, badge: 'Anti-Aging',
    tags: ['retinol', 'eye cream', 'serum', 'skincare'],
    images: ['https://images.unsplash.com/photo-1512290900676-26c2a4d4b51d?w=800', 'https://images.unsplash.com/photo-1608248597309-172377b5a828?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'LuxeHair Ionic Salon Hair Dryer',
    description: '1875W professional ionic hair blow dryer with brushless motor, 3 heat settings, cool shot button, and magnetic nozzle attachments.',
    price: 129.99, originalPrice: 169.99, category: 'Beauty', brand: 'LuxeHair', stock: 40, rating: 4.8, numReviews: 140, isFeatured: true, badge: 'Salon Pro',
    tags: ['hair dryer', 'haircare', 'styling', 'ionic'],
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'VelvetMatte 12-Shade Lipstick Collection',
    description: 'Non-drying smudge-proof matte liquid lipsticks packed with vitamin E and jojoba oil for 16-hour longwear color.',
    price: 59.99, originalPrice: 79.99, category: 'Beauty', brand: 'VelvetMatte', stock: 75, rating: 4.6, numReviews: 290, isFeatured: false, badge: 'Must Have',
    tags: ['lipstick', 'makeup', 'matte', 'cosmetics'],
    images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800', 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'PureBotanica Moroccan Argan Hair Oil',
    description: '100% cold-pressed organic Argan oil treatment for frizzy hair, split end repair, and heat protection shine.',
    price: 29.99, originalPrice: 39.99, category: 'Beauty', brand: 'PureBotanica', stock: 110, rating: 4.7, numReviews: 360, isFeatured: false, badge: 'Organic',
    tags: ['hair oil', 'argan oil', 'haircare', 'shine'],
    images: ['https://images.unsplash.com/photo-1608248597309-172377b5a828?w=800', 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'ProGroom Electric Beard Trimmer',
    description: 'Waterproof self-sharpening titanium blade mens beard and hair trimmer with 20 precision length settings and 90-min cordless runtime.',
    price: 69.99, originalPrice: 89.99, category: 'Beauty', brand: 'ProGroom', stock: 65, rating: 4.7, numReviews: 240, isFeatured: false, badge: 'Grooming',
    tags: ['trimmer', 'grooming', 'beard', 'shaver'],
    images: ['https://images.unsplash.com/photo-1621607512214-68297480165e?w=800', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CelestialNight Eau de Parfum Cologne 100ml',
    description: 'Captivating amber woody fragrance opening with bergamot and black pepper, settling into warm cedarwood and vanilla bean base.',
    price: 99.99, originalPrice: 129.99, category: 'Beauty', brand: 'CelestialNight', stock: 35, rating: 4.9, numReviews: 175, isFeatured: true, badge: 'Signature',
    tags: ['perfume', 'cologne', 'fragrance', 'luxury'],
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'SunShield Mineral Face Sunscreen SPF 50',
    description: 'Sheer zinc oxide broad spectrum SPF 50 sunscreen with zero white cast, water resistance, and reef-safe dermatologist formula.',
    price: 24.99, originalPrice: 32.99, category: 'Beauty', brand: 'SunShield', stock: 120, rating: 4.6, numReviews: 310, isFeatured: false, badge: 'Daily Shield',
    tags: ['sunscreen', 'spf 50', 'skincare', 'face'],
    images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'RoseQuartz Facial Jade Roller & Gua Sha',
    description: '100% natural Brazilian rose quartz crystal facial massage roller and contoured gua sha stone for lymphatic drainage and puffiness reduction.',
    price: 22.99, originalPrice: 30.00, category: 'Beauty', brand: 'RoseQuartz', stock: 90, rating: 4.5, numReviews: 215, isFeatured: false, badge: 'Wellness',
    tags: ['gua sha', 'jade roller', 'facial', 'beauty tool'],
    images: ['https://images.unsplash.com/photo-1608248597309-172377b5a828?w=800', 'https://images.unsplash.com/photo-1617897903246-719242758050?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'UltraClean Sonic Facial Cleansing Brush',
    description: 'Waterproof silicone facial cleanser with 8000 sonic pulsations per minute, 8 speed intensities, and thermal massage heating.',
    price: 49.99, originalPrice: 69.99, category: 'Beauty', brand: 'UltraClean', stock: 50, rating: 4.6, numReviews: 162, isFeatured: false, badge: 'Cleansing',
    tags: ['cleansing brush', 'facial', 'skincare', 'sonic'],
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'LashLuxe Volumizing Waterproof Mascara',
    description: 'Clump-free fiber mascara delivering 10x dramatic eyelash volume and length with 24-hour smudge-proof formula.',
    price: 19.99, originalPrice: 26.99, category: 'Beauty', brand: 'LashLuxe', stock: 140, rating: 4.5, numReviews: 410, isFeatured: false, badge: 'Bestseller',
    tags: ['mascara', 'makeup', 'eyelashes', 'beauty'],
    images: ['https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'RadiantSkin Charcoal Clay Face Mask',
    description: 'Purifying kaolin and activated charcoal detox mask infused with tea tree oil to draw out impurities and shrink pores.',
    price: 27.99, originalPrice: 36.99, category: 'Beauty', brand: 'RadiantSkin', stock: 85, rating: 4.6, numReviews: 195, isFeatured: false, badge: 'Detox',
    tags: ['face mask', 'charcoal', 'clay mask', 'skincare'],
    images: ['https://images.unsplash.com/photo-1567928269937-ae146e45b428?w=800', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SmoothTouch Ceramic Hair Straightener',
    description: '1-inch 3D floating ceramic tourmaline flat iron heating up to 450°F in 30 seconds with auto shutoff and swivel cord.',
    price: 79.99, originalPrice: 99.99, category: 'Beauty', brand: 'SmoothTouch', stock: 45, rating: 4.7, numReviews: 168, isFeatured: false, badge: 'Hair Care',
    tags: ['straightener', 'flat iron', 'hair', 'styling'],
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'OrganicNectar Body Wash & Lotion Pack',
    description: 'Sulfate-free hydrating shea butter body wash and 24-hour moisture lotion set with natural coconut vanilla fragrance.',
    price: 34.99, originalPrice: 44.99, category: 'Beauty', brand: 'OrganicNectar', stock: 90, rating: 4.5, numReviews: 140, isFeatured: false, badge: 'Body Care',
    tags: ['body wash', 'lotion', 'shea butter', 'skincare'],
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800', 'https://images.unsplash.com/photo-1608248597309-172377b5a828?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'GlowMist Hydrating Rosewater Spray',
    description: '100% pure organic Damask rosewater facial mist spray for instant skin hydration, soothing redness, and makeup setting.',
    price: 18.99, originalPrice: 24.99, category: 'Beauty', brand: 'GlowMist', stock: 110, rating: 4.6, numReviews: 230, isFeatured: false, badge: 'Refreshing',
    tags: ['rosewater', 'face mist', 'hydrating', 'toner'],
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', 'https://images.unsplash.com/photo-1608248597309-172377b5a828?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'NailsPro Complete Gel Nail Polish Kit',
    description: 'All-in-one gel manicure starter kit with 48W UV LED nail lamp, 6 salon gel polish colors, base/top coat, and nail art tools.',
    price: 54.99, originalPrice: 69.99, category: 'Beauty', brand: 'NailsPro', stock: 60, rating: 4.7, numReviews: 275, isFeatured: false, badge: 'DIY Salon',
    tags: ['gel polish', 'nail kit', 'uv lamp', 'manicure'],
    images: ['https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800', 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'BloomBlush Powder & Bronzer Palette',
    description: '4-pan cheek contour palette with velvet matte blushes and sun-kissed luminous bronzers suitable for all skin tones.',
    price: 32.99, originalPrice: 42.99, category: 'Beauty', brand: 'BloomBlush', stock: 70, rating: 4.6, numReviews: 128, isFeatured: false, badge: 'Palette',
    tags: ['blush', 'bronzer', 'makeup', 'palette'],
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SpaRelax Lavender Essential Oil Set',
    description: 'Pure therapeutic grade French lavender essential oil (30ml) packaged with ceramic candle oil burner for deep relaxation and sleep.',
    price: 38.99, originalPrice: 49.99, category: 'Beauty', brand: 'SpaRelax', stock: 85, rating: 4.8, numReviews: 190, isFeatured: false, badge: 'Relaxation',
    tags: ['essential oil', 'lavender', 'spa', 'aromatherapy'],
    images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'],
    reviews: getRandomReviews(3, userId)
  },

  // -------------------------------------------------------------
  // 6. BOOKS (20 Products)
  // -------------------------------------------------------------
  {
    name: 'Atomic Habits: Building Good Habits',
    description: 'The million-copy #1 bestseller by James Clear providing a proven framework for improving every day through tiny 1% habit adjustments.',
    price: 18.99, originalPrice: 27.00, category: 'Books', brand: 'Avery', stock: 150, rating: 4.9, numReviews: 850, isFeatured: true, badge: '#1 Bestseller',
    tags: ['book', 'self-help', 'productivity', 'habits'],
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Designing Data-Intensive Applications',
    description: 'The definitive guide by Martin Kleppmann on distributed system architecture, databases, stream processing, and scalability.',
    price: 44.99, originalPrice: 59.99, category: 'Books', brand: 'O\'Reilly', stock: 65, rating: 4.9, numReviews: 420, isFeatured: true, badge: 'Tech Essential',
    tags: ['book', 'tech', 'software', 'system design'],
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Deep Work: Rules for Focused Success',
    description: 'Cal Newport\'s groundbreaking book on mastering undistracted focus in an increasingly noisy cognitive environment.',
    price: 16.99, originalPrice: 24.00, category: 'Books', brand: 'Grand Central', stock: 90, rating: 4.8, numReviews: 310, isFeatured: false, badge: 'Must Read',
    tags: ['book', 'focus', 'productivity', 'career'],
    images: ['https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'The Psychology of Money',
    description: 'Morgan Housel shares 19 short stories exploring the strange ways people think about money, risk, greed, and happiness.',
    price: 17.99, originalPrice: 25.00, category: 'Books', brand: 'Harriman', stock: 110, rating: 4.8, numReviews: 620, isFeatured: true, badge: 'Popular',
    tags: ['book', 'finance', 'investing', 'psychology'],
    images: ['https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Clean Code: Handbook of Software Craftsmanship',
    description: 'Robert C. Martin\'s classic guide to writing clean, readable, refactored, and maintainable object-oriented code.',
    price: 39.99, originalPrice: 49.99, category: 'Books', brand: 'Prentice Hall', stock: 55, rating: 4.7, numReviews: 290, isFeatured: false, badge: 'Developer Standard',
    tags: ['book', 'programming', 'clean code', 'tech'],
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Sapiens: A Brief History of Humankind',
    description: 'Yuval Noah Harari explores 70,000 years of human history, examining how Homo sapiens came to dominate planet Earth.',
    price: 19.99, originalPrice: 28.00, category: 'Books', brand: 'Harper', stock: 95, rating: 4.8, numReviews: 540, isFeatured: false, badge: 'Global Hit',
    tags: ['book', 'history', 'anthropology', 'bestseller'],
    images: ['https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'The Pragmatic Programmer 20th Anniversary',
    description: 'David Thomas and Andrew Hunt\'s updated masterwork covering pragmatic software engineering philosophy and techniques.',
    price: 42.99, originalPrice: 54.99, category: 'Books', brand: 'Addison-Wesley', stock: 45, rating: 4.9, numReviews: 260, isFeatured: false, badge: 'Classic',
    tags: ['book', 'programming', 'pragmatic', 'software'],
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Dune: Deluxe Hardcover Illustrated Edition',
    description: 'Frank Herbert\'s epic sci-fi masterpiece in a collector\'s clothbound hardcover edition with gilded edges and custom illustrations.',
    price: 29.99, originalPrice: 40.00, category: 'Books', brand: 'Ace Books', stock: 40, rating: 4.9, numReviews: 380, isFeatured: false, badge: 'Collector Edition',
    tags: ['book', 'sci-fi', 'fiction', 'hardcover'],
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Thinking, Fast and Slow',
    description: 'Nobel laureate Daniel Kahneman explains the two systems that drive the way we think: fast intuitive emotional thinking vs slow deliberate logical thinking.',
    price: 18.50, originalPrice: 26.00, category: 'Books', brand: 'FSG', stock: 70, rating: 4.7, numReviews: 310, isFeatured: false, badge: 'Nobel Author',
    tags: ['book', 'psychology', 'mind', 'science'],
    images: ['https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Project Hail Mary: A Novel',
    description: 'Andy Weir\'s gripping interstellar survival novel following lone astronaut Ryland Grace on a desperation mission to save humanity.',
    price: 21.99, originalPrice: 28.99, category: 'Books', brand: 'Ballantine', stock: 80, rating: 4.9, numReviews: 490, isFeatured: false, badge: 'Sci-Fi Hit',
    tags: ['book', 'sci-fi', 'space', 'novel'],
    images: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'System Design Interview An Insider Guide',
    description: 'Alex Xu\'s step-by-step practical manual for tackling complex distributed software system design engineering interviews.',
    price: 36.99, originalPrice: 45.00, category: 'Books', brand: 'ByteByteGo', stock: 90, rating: 4.8, numReviews: 380, isFeatured: false, badge: 'Interview Prep',
    tags: ['book', 'system design', 'interview', 'coding'],
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'The Creative Act: A Way of Being',
    description: 'Legendary music producer Rick Rubin reflects on the creative process, offering wisdom for artists, creators, and thinkers.',
    price: 22.99, originalPrice: 32.00, category: 'Books', brand: 'Penguin', stock: 65, rating: 4.8, numReviews: 240, isFeatured: false, badge: 'Inspirational',
    tags: ['book', 'creativity', 'art', 'philosophy'],
    images: ['https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Mans Search for Meaning',
    description: 'Viktor Frankl\'s timeless memoir detailing his experiences in Nazi concentration camps and his psychotherapeutic method of logotherapy.',
    price: 14.99, originalPrice: 19.99, category: 'Books', brand: 'Beacon Press', stock: 100, rating: 4.9, numReviews: 580, isFeatured: false, badge: 'Timeless',
    tags: ['book', 'memoir', 'psychology', 'classics'],
    images: ['https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Zero to One: Notes on Startups',
    description: 'Peter Thiel\'s essential guide on building breakthrough technology companies that invent new value rather than copying existing models.',
    price: 16.99, originalPrice: 23.00, category: 'Books', brand: 'Crown Currency', stock: 85, rating: 4.7, numReviews: 410, isFeatured: false, badge: 'Startup Guide',
    tags: ['book', 'startups', 'business', 'tech'],
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Rich Dad Poor Dad',
    description: 'Robert Kiyosaki\'s #1 personal finance book revealing what the rich teach their kids about money that the poor and middle class do not.',
    price: 15.99, originalPrice: 22.00, category: 'Books', brand: 'Plata Publishing', stock: 140, rating: 4.6, numReviews: 920, isFeatured: false, badge: 'All-Time Classic',
    tags: ['book', 'finance', 'money', 'wealth'],
    images: ['https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=800', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'The Subtle Art of Not Giving a F*ck',
    description: 'Mark Manson\'s counterintuitive self-help guide advocating for embracing limits and focusing only on what truly matters.',
    price: 17.50, originalPrice: 24.99, category: 'Books', brand: 'HarperOne', stock: 120, rating: 4.6, numReviews: 730, isFeatured: false, badge: 'Bestseller',
    tags: ['book', 'self-help', 'mindset', 'life'],
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Refactoring: Improving Code Design',
    description: 'Martin Fowler\'s comprehensive guide on code refactoring principles, smells, and catalog of refactoring transformations.',
    price: 47.99, originalPrice: 59.99, category: 'Books', brand: 'Addison-Wesley', stock: 40, rating: 4.8, numReviews: 195, isFeatured: false, badge: 'Pro Tech',
    tags: ['book', 'refactoring', 'programming', 'code'],
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Elon Musk: Official Biography',
    description: 'Walter Isaacson\'s intimate biography of Elon Musk based on two years of shadowing his meetings and interviewing family and rivals.',
    price: 24.99, originalPrice: 35.00, category: 'Books', brand: 'Simon & Schuster', stock: 75, rating: 4.7, numReviews: 390, isFeatured: false, badge: 'Biography',
    tags: ['book', 'biography', 'elon musk', 'tech'],
    images: ['https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'The Lean Startup',
    description: 'Eric Ries presents the continuous innovation methodology for creating successful businesses through validated learning and rapid iteration.',
    price: 18.99, originalPrice: 26.00, category: 'Books', brand: 'Crown Business', stock: 80, rating: 4.7, numReviews: 350, isFeatured: false, badge: 'Entrepreneurship',
    tags: ['book', 'startup', 'lean', 'business'],
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'Code Complete: Practical Handbook',
    description: 'Steve McConnell\'s synthesized software construction guide filled with best practices for coding, debugging, testing, and architecture.',
    price: 45.99, originalPrice: 59.99, category: 'Books', brand: 'Microsoft Press', stock: 50, rating: 4.9, numReviews: 280, isFeatured: false, badge: 'Bible of Coding',
    tags: ['book', 'software engineering', 'coding', 'architecture'],
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'],
    reviews: getRandomReviews(4, userId)
  },

  // -------------------------------------------------------------
  // 7. GAMING (20 Products)
  // -------------------------------------------------------------
  {
    name: 'ZenDesk Pro Mechanical Keyboard',
    description: 'RGB hot-swappable mechanical gaming keyboard featuring aircraft aluminum top frame, per-key RGB lighting, and pre-lubed tactile switches.',
    price: 159.99, originalPrice: 199.99, category: 'Gaming', brand: 'ZenDesk', stock: 40, rating: 4.7, numReviews: 312, isFeatured: true, badge: 'Hot',
    tags: ['keyboard', 'gaming', 'mechanical', 'rgb'],
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'ApexViper Ultra-Light Wireless Mouse',
    description: '49g ultra-lightweight wireless esports gaming mouse with 30,000 DPI optical sensor, 80-hour battery, and optical switches.',
    price: 89.99, originalPrice: 119.99, category: 'Gaming', brand: 'ApexViper', stock: 65, rating: 4.8, numReviews: 240, isFeatured: true, badge: 'Esports Pro',
    tags: ['mouse', 'gaming', 'wireless', 'ultra light'],
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'PlayStation 5 Pro Console 1TB',
    description: 'Next-gen gaming console with advanced ray tracing performance, 4K 120Hz support, 1TB high-speed custom SSD, and DualSense haptic feedback controller.',
    price: 499.99, originalPrice: 549.99, category: 'Gaming', brand: 'Sony', stock: 18, rating: 4.9, numReviews: 450, isFeatured: true, badge: 'Flipkart Choice',
    tags: ['console', 'ps5', 'gaming', '4k'],
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'Xbox Elite Series 2 Wireless Controller',
    description: 'Pro customization wireless controller with adjustable-tension thumbsticks, hair trigger locks, rubberized wrap-around grip, and remappable paddle buttons.',
    price: 179.99, originalPrice: 209.99, category: 'Gaming', brand: 'Microsoft', stock: 35, rating: 4.7, numReviews: 180, isFeatured: false, badge: 'Pro Controller',
    tags: ['controller', 'xbox', 'gamepad', 'wireless'],
    images: ['https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800', 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'MetaQuest 3 Advanced VR Headset 512GB',
    description: 'Breakthrough mixed reality VR headset featuring 4K+ Infinite Display resolution, Touch Plus controllers, and full color passthrough.',
    price: 499.99, originalPrice: 599.99, category: 'Gaming', brand: 'MetaQuest', stock: 20, rating: 4.8, numReviews: 165, isFeatured: true, badge: 'VR Next Gen',
    tags: ['vr', 'virtual reality', 'headset', 'gaming'],
    images: ['https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=800', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'HyperSound 7.1 Wireless Gaming Headset',
    description: 'Low-latency 2.4GHz wireless headset with 50mm drivers, detachable broadcast-grade mic, 7.1 surround sound, and cooling gel ear cushions.',
    price: 129.99, originalPrice: 169.99, category: 'Gaming', brand: 'HyperSound', stock: 50, rating: 4.6, numReviews: 210, isFeatured: false, badge: '7.1 Surround',
    tags: ['headset', 'gaming', 'wireless', 'audio'],
    images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ThroneMaster Ergonomic Gaming Chair',
    description: 'Full steel frame gaming chair with 4D armrests, cold-cured foam seat cushion, 165-degree recline, and lumbar memory foam pillow.',
    price: 299.99, originalPrice: 389.99, category: 'Gaming', brand: 'ThroneMaster', stock: 25, rating: 4.7, numReviews: 145, isFeatured: false, badge: 'Comfort',
    tags: ['gaming chair', 'chair', 'ergonomic', 'setup'],
    images: ['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800', 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'StreamPro Studio Condenser Microphone',
    description: 'Cardioid studio USB condenser microphone featuring tap-to-mute sensor, built-in shock mount, pop filter, and RGB lighting spectrum ring.',
    price: 119.99, originalPrice: 149.99, category: 'Gaming', brand: 'StreamPro', stock: 45, rating: 4.8, numReviews: 198, isFeatured: false, badge: 'Streamer Pick',
    tags: ['microphone', 'streaming', 'usb mic', 'audio'],
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'GamePad Duo Dual Charging Dock Station',
    description: 'Fast dual controller charging stand with LED indicator lights and intelligent overcharge protection for PS5 and Xbox controllers.',
    price: 29.99, originalPrice: 39.99, category: 'Gaming', brand: 'GamePad Duo', stock: 90, rating: 4.5, numReviews: 160, isFeatured: false, badge: 'Essential',
    tags: ['charger', 'dock', 'controller', 'accessories'],
    images: ['https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800', 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'RacingWheel Pro Force Feedback Wheel',
    description: 'Dual-motor force feedback steering wheel with 900-degree rotation, stainless steel paddle shifters, and 3-pedal floor unit.',
    price: 279.99, originalPrice: 349.99, category: 'Gaming', brand: 'RacingWheel', stock: 15, rating: 4.9, numReviews: 110, isFeatured: false, badge: 'Real Simulation',
    tags: ['steering wheel', 'racing', 'simulation', 'pedals'],
    images: ['https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'RGBMat XL Extended LED Desk Mat',
    description: 'Extra-large 900x400mm waterproof micro-textured cloth gaming mouse pad with 14 customizable RGB lighting modes.',
    price: 34.99, originalPrice: 49.99, category: 'Gaming', brand: 'RGBMat', stock: 110, rating: 4.6, numReviews: 280, isFeatured: false, badge: 'Setup Tech',
    tags: ['desk mat', 'mouse pad', 'rgb', 'gaming'],
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CaptureCard 4K60 Pro Video Capture',
    description: 'Ultra-low latency USB 3.0 video capture card supporting 4K 60fps HDR passthrough and 1080p 60fps streaming recording.',
    price: 159.99, originalPrice: 199.99, category: 'Gaming', brand: 'CaptureCard', stock: 30, rating: 4.8, numReviews: 95, isFeatured: false, badge: 'Streaming',
    tags: ['capture card', 'streaming', '4k', 'video'],
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'FlightSim HOTAS Joystick & Throttle',
    description: 'Full-featured flight simulation control system with dual throttle levers, magnetic sensors, and 45 programmable buttons.',
    price: 189.99, originalPrice: 239.99, category: 'Gaming', brand: 'FlightSim', stock: 18, rating: 4.7, numReviews: 76, isFeatured: false, badge: 'Flight Sim',
    tags: ['joystick', 'flight sim', 'hotas', 'controller'],
    images: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'GameDeck Handheld OLED Console 512GB',
    description: 'Portable handheld PC gaming machine with 7" 90Hz OLED touch display, AMD APU processor, and full PC library compatibility.',
    price: 399.99, originalPrice: 449.99, category: 'Gaming', brand: 'GameDeck', stock: 22, rating: 4.9, numReviews: 320, isFeatured: true, badge: 'Handheld King',
    tags: ['handheld', 'portable console', 'pc gaming', 'oled'],
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'BlueLight Blocking Gaming Glasses',
    description: 'Anti-glare yellow tinted blue light blocking glasses reducing eyestrain and headache during long competitive gaming sessions.',
    price: 29.99, originalPrice: 39.99, category: 'Gaming', brand: 'BlueLight', stock: 85, rating: 4.5, numReviews: 175, isFeatured: false, badge: 'Eye Care',
    tags: ['glasses', 'blue light', 'gaming', 'eyewear'],
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CableManagement RGB Under Desk Tray',
    description: 'Heavy duty steel wire raceway cable management tray with addressable ARGB ambient lighting strips.',
    price: 24.99, originalPrice: 34.99, category: 'Gaming', brand: 'CablePro', stock: 95, rating: 4.6, numReviews: 120, isFeatured: false, badge: 'Clean Setup',
    tags: ['cable management', 'desk', 'rgb', 'organizer'],
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'ConsoleCooling RGB Fan Stand',
    description: 'Vertical cooling stand with dual silent turbo fans, controller charging docks, and digital LED temperature monitor.',
    price: 39.99, originalPrice: 54.99, category: 'Gaming', brand: 'ConsoleCool', stock: 65, rating: 4.6, numReviews: 140, isFeatured: false, badge: 'Cooling',
    tags: ['cooling stand', 'ps5', 'xbox', 'fan'],
    images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SoundDamper Acoustic Foam Panels 12-Pack',
    description: 'High-density 2" wedge acoustic soundproofing foam tiles (12x12") for home recording studios and gaming rooms.',
    price: 32.99, originalPrice: 44.99, category: 'Gaming', brand: 'SoundDamper', stock: 80, rating: 4.5, numReviews: 160, isFeatured: false, badge: 'Studio',
    tags: ['acoustic foam', 'soundproofing', 'studio', 'panels'],
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'RetroArcade Tabletop Mini Arcade Machine',
    description: 'Nostalgic tabletop cabinet with 8-inch screen, arcade joystick, and 300 pre-installed classic 8-bit/16-bit retro arcade games.',
    price: 149.99, originalPrice: 189.99, category: 'Gaming', brand: 'RetroArcade', stock: 30, rating: 4.8, numReviews: 110, isFeatured: false, badge: 'Retro',
    tags: ['arcade', 'retro', 'mini cabinet', 'classic games'],
    images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'KeycapCustom PBT Pudding Keycaps Set',
    description: '108-key double-shot PBT OEM profile translucent pudding keycap set compatible with MX mechanical switch keyboards.',
    price: 29.99, originalPrice: 39.99, category: 'Gaming', brand: 'KeycapCustom', stock: 100, rating: 4.7, numReviews: 215, isFeatured: false, badge: 'Custom',
    tags: ['keycaps', 'pbt', 'pudding', 'keyboard'],
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800'],
    reviews: getRandomReviews(3, userId)
  },

  // -------------------------------------------------------------
  // 8. ACCESSORIES (20 Products)
  // -------------------------------------------------------------
  {
    name: 'NovaMesh Backpack 40L Weatherproof',
    description: 'Urban commuter backpack with 17" padded laptop compartment, USB charging port, anti-theft hidden pocket, and ergonomic back airflow system.',
    price: 129.99, originalPrice: 159.99, category: 'Accessories', brand: 'NovaMesh', stock: 60, rating: 4.5, numReviews: 167, isFeatured: true, badge: 'Popular',
    tags: ['backpack', 'travel', 'laptop', 'waterproof'],
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'PolarizedTitanium Sunglasses UV400',
    description: 'Ultra-lightweight titanium alloy frame aviator sunglasses featuring HD TAC polarized lenses with 100% UV400 protection.',
    price: 79.99, originalPrice: 109.99, category: 'Accessories', brand: 'Titanium', stock: 75, rating: 4.7, numReviews: 195, isFeatured: false, badge: 'Bestseller',
    tags: ['sunglasses', 'polarized', 'eyewear', 'titanium'],
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'MinimalistRFID Bifold Leather Wallet',
    description: 'Slim genuine top-grain leather wallet with advanced RFID blocking lining, quick-access pop-up card mechanism, and billfold compartment.',
    price: 49.99, originalPrice: 69.99, category: 'Accessories', brand: 'Minimalist', stock: 110, rating: 4.8, numReviews: 280, isFeatured: false, badge: 'RFID Safe',
    tags: ['wallet', 'leather', 'rfid', 'slim'],
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', 'https://images.unsplash.com/photo-1606503830017-09d5718dfd1f?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'SmartBand Fitness & Activity Tracker',
    description: 'Slim lightweight smart wristband with heart rate monitoring, sleep analysis, SpO2 sensor, 50m water resistance, and 14-day battery life.',
    price: 39.99, originalPrice: 59.99, category: 'Accessories', brand: 'SmartBand', stock: 85, rating: 4.4, numReviews: 210, isFeatured: false, badge: 'Sale',
    tags: ['fitness band', 'tracker', 'smartband', 'health'],
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800', 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'MagneticPower Wireless Bank 10000mAh',
    description: 'MagSafe-compatible wireless portable power bank snap-on battery pack with foldable kickstand and 20W PD USB-C port.',
    price: 49.99, originalPrice: 64.99, category: 'Accessories', brand: 'MagneticPower', stock: 90, rating: 4.7, numReviews: 235, isFeatured: false, badge: 'MagSafe',
    tags: ['power bank', 'magsafe', 'wireless', 'battery'],
    images: ['https://images.unsplash.com/photo-1609592424074-2792193b2a26?w=800', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'GaNFast 100W 4-Port USB-C Desktop Charger',
    description: 'Power delivery multi-port wall charger supporting high-speed simultaneous charging for MacBook Pro, iPad, iPhone, and Android devices.',
    price: 69.99, originalPrice: 89.99, category: 'Accessories', brand: 'GaNFast', stock: 70, rating: 4.8, numReviews: 180, isFeatured: false, badge: 'Top Rated',
    tags: ['charger', 'usb-c', 'gan', 'fast charging'],
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', 'https://images.unsplash.com/photo-1622445268465-843d63d80d46?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'LeatherCraft Slim Card Holder Case',
    description: 'Hand-stitched Italian vegetable-tanned leather card case with 5 card slots and center cash pocket.',
    price: 29.99, originalPrice: 39.99, category: 'Accessories', brand: 'LeatherCraft', stock: 120, rating: 4.6, numReviews: 145, isFeatured: false, badge: 'Handmade',
    tags: ['card holder', 'leather', 'slim', 'wallet'],
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', 'https://images.unsplash.com/photo-1606503830017-09d5718dfd1f?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'HydroFlask Stainless Tumbler 900ml',
    description: 'Insulated travel tumbler with handle and reusable straw, keeping beverages hot for 12 hours or cold for 24 hours.',
    price: 34.99, originalPrice: 44.99, category: 'Accessories', brand: 'HydroFlask', stock: 80, rating: 4.8, numReviews: 310, isFeatured: false, badge: 'Trending',
    tags: ['tumbler', 'water bottle', 'stainless steel', 'travel'],
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'TravelTech Cable Organizer Pouch',
    description: 'Double layer water-resistant electronics accessory organizer bag for cables, chargers, hard drives, SD cards, and power banks.',
    price: 24.99, originalPrice: 32.99, category: 'Accessories', brand: 'TravelTech', stock: 100, rating: 4.6, numReviews: 185, isFeatured: false, badge: 'Organizer',
    tags: ['cable pouch', 'travel organizer', 'tech', 'accessories'],
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'KeyOrganizer Leather Key Holder Ring',
    description: 'Compact leather key organizer holding up to 8 keys silently without jangling, equipped with integrated bottle opener attachment.',
    price: 19.99, originalPrice: 27.99, category: 'Accessories', brand: 'KeyOrganizer', stock: 130, rating: 4.5, numReviews: 160, isFeatured: false, badge: 'EDC',
    tags: ['key organizer', 'keychain', 'leather', 'edc'],
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', 'https://images.unsplash.com/photo-1606503830017-09d5718dfd1f?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'LaptopSleeve Protective Case 15.6',
    description: '360-degree shockproof protective laptop sleeve bag with soft fleece lining and corner armor padding for 15-15.6 inch laptops.',
    price: 27.99, originalPrice: 36.99, category: 'Accessories', brand: 'LaptopSleeve', stock: 95, rating: 4.7, numReviews: 220, isFeatured: false, badge: 'Protection',
    tags: ['laptop sleeve', 'case', 'laptop', 'protective'],
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=800', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'SmartTag Bluetooth Item Finder 4-Pack',
    description: 'Waterproof Bluetooth trackers with ultra-wideband location precision, 120dB loud ringer, and replaceable 1-year CR2032 battery.',
    price: 89.99, originalPrice: 119.99, category: 'Accessories', brand: 'SmartTag', stock: 50, rating: 4.8, numReviews: 290, isFeatured: true, badge: 'Never Lost',
    tags: ['smart tag', 'bluetooth tracker', 'finder', 'keys'],
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
    reviews: getRandomReviews(4, userId)
  },
  {
    name: 'UrbanBelt Genuine Full-Grain Leather Belt',
    description: 'Classic 1.5-inch wide full-grain Italian leather dress belt with solid zinc alloy buckle and scratch-resistant finish.',
    price: 39.99, originalPrice: 52.99, category: 'Accessories', brand: 'UrbanBelt', stock: 85, rating: 4.7, numReviews: 175, isFeatured: false, badge: 'Classic',
    tags: ['belt', 'leather belt', 'mens accessories', 'fashion'],
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'TravelPillow Memory Foam Neck Pillow',
    description: 'Ergonomic 360-degree head support memory foam travel neck pillow with breathable magnetic therapy cloth washable cover.',
    price: 29.99, originalPrice: 39.99, category: 'Accessories', brand: 'TravelPillow', stock: 110, rating: 4.6, numReviews: 240, isFeatured: false, badge: 'Flight essential',
    tags: ['travel pillow', 'neck pillow', 'flight', 'comfort'],
    images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CrossbodyCanvas Messenger Bag',
    description: 'Vintage heavy duty waxed canvas messenger shoulder bag with real leather straps, tablet pouch, and magnetic quick clasps.',
    price: 54.99, originalPrice: 74.99, category: 'Accessories', brand: 'Crossbody', stock: 45, rating: 4.7, numReviews: 130, isFeatured: false, badge: 'Vintage',
    tags: ['messenger bag', 'canvas', 'shoulder bag', 'crossbody'],
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'PhoneGrip Magnetic Ring Stand',
    description: '360-degree rotating double ring magnetic phone kickstand grip compatible with MagSafe cases and magnetic car mounts.',
    price: 15.99, originalPrice: 22.99, category: 'Accessories', brand: 'PhoneGrip', stock: 150, rating: 4.5, numReviews: 310, isFeatured: false, badge: 'Bestseller',
    tags: ['phone grip', 'ring stand', 'magsafe', 'phone accessory'],
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', 'https://images.unsplash.com/photo-1609592424074-2792193b2a26?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'AntiTheft TSA Travel Padlock 2-Pack',
    description: 'Resettable 4-digit combination TSA accepted luggage locks made from high-strength zinc alloy and hardened steel shackle.',
    price: 18.99, originalPrice: 24.99, category: 'Accessories', brand: 'AntiTheft', stock: 120, rating: 4.6, numReviews: 190, isFeatured: false, badge: 'TSA Approved',
    tags: ['tsa lock', 'padlock', 'luggage', 'travel'],
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'CompactUmbrella Automatic Windproof',
    description: 'Teflon-coated 10-rib reinforced windproof folding travel umbrella with auto open/close handle and UV reflection inner layer.',
    price: 22.99, originalPrice: 29.99, category: 'Accessories', brand: 'CompactUmbrella', stock: 100, rating: 4.7, numReviews: 225, isFeatured: false, badge: 'Weatherproof',
    tags: ['umbrella', 'compact', 'windproof', 'rain'],
    images: ['https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800', 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'AirTagLeather Leather Keychain Case',
    description: 'Premium genuine leather protective keychain case cover tailored specifically for Apple AirTag tracking devices.',
    price: 14.99, originalPrice: 19.99, category: 'Accessories', brand: 'AirTagLeather', stock: 140, rating: 4.5, numReviews: 180, isFeatured: false, badge: 'Leather',
    tags: ['airtag', 'keychain', 'leather case', 'apple'],
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800', 'https://images.unsplash.com/photo-1606503830017-09d5718dfd1f?w=800'],
    reviews: getRandomReviews(3, userId)
  },
  {
    name: 'MultiTool 18-in-1 Stainless Pocket Tool',
    description: 'Heavy duty stainless steel multi-tool pliers featuring wire cutters, serrated knife, bottle opener, screwdrivers, and nylon belt sheath.',
    price: 28.99, originalPrice: 38.99, category: 'Accessories', brand: 'MultiTool', stock: 75, rating: 4.8, numReviews: 240, isFeatured: false, badge: 'Everyday Carry',
    tags: ['multitool', 'pliers', 'pocket tool', 'edc'],
    images: ['https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800', 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=800'],
  }
];
}

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nexashop';
    await mongoose.connect(mongoUri);
    console.log(`✅ Connected to MongoDB at ${mongoUri}`);

    // 1. Seed users first so we have real ObjectIds for reviews
    await User.deleteMany({ email: { $in: ['admin@nexastore.com', 'john@example.com'] } });
    const [adminUser, normalUser] = await User.create([
      { name: 'Nexa Admin',  email: 'admin@nexastore.com', password: 'admin123',     isAdmin: true  },
      { name: 'John Doe',   email: 'john@example.com',    password: 'password123',  isAdmin: false }
    ]);
    console.log('👤 Seeded Admin (admin@nexastore.com / admin123) and User (john@example.com / password123)');

    // 2. Build product data using the real userId
    const products = buildProducts(normalUser._id);

    // 3. Seed products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    await Product.insertMany(products);
    console.log(`🎉 Successfully seeded ${products.length} products (20 per category across 8 categories)!`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seedDB();


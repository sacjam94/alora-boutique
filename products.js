// =============================================
// ALORA BOUTIQUE – PRODUCT DATA
// =============================================
// Replace image paths with real product photos when available.
// This data structure is ready for Shopify/Razorpay integration.

const PRODUCTS = [
  {
    id: 1,
    slug: "purple-churidar-set",
    name: "Purple Churidar Set",
    category: "ladies-wear",
    categoryLabel: "Ladies Wear",
    badge: "New",
    price: 1499,
    originalPrice: 1999,
    shortDescription: "Elegant churidar set in deep plum with gold embroidery detailing.",
    description: `Indulge in the timeless elegance of our Purple Churidar Set. Crafted from premium cotton-silk blend fabric, this set features intricate gold zari embroidery along the neckline and cuffs. The rich plum colour is versatile enough for festive occasions and special events alike.\n\nThe dupatta is delicately bordered with matching gold thread work, completing the look with effortless grace. Perfect for family gatherings, festivals, and celebrations.`,
    fabric: "Cotton-Silk Blend",
    care: "Dry clean recommended. Hand wash in cold water if needed. Do not bleach.",
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L", "XL"],
    images: [
      "images/product_purple_churidar.jpg",
      "images/product_pink_kurta.jpg",
      "images/product_blue_kurta.jpg"
    ],
    rating: 4.8,
    reviewCount: 32,
    stock: 12,
    shipping: "Free shipping on orders above ₹999. Delivery in 3–5 business days.",
    tags: ["churidar", "ethnic", "festive", "ladies"],
    reviews: [
      { author: "Priya M.", rating: 5, date: "12 May 2025", text: "Absolutely stunning! The embroidery work is exquisite and the fabric is so comfortable. Got so many compliments at the wedding." },
      { author: "Anjali R.", rating: 5, date: "3 Apr 2025", text: "Perfect fit and the colour is even more beautiful in person. Highly recommend Alora Boutique!" },
      { author: "Meena S.", rating: 4, date: "18 Mar 2025", text: "Lovely quality, took slightly longer to arrive but worth the wait." }
    ]
  },
  {
    id: 2,
    slug: "pink-floral-kurta",
    name: "Pink Floral Kurta",
    category: "occasion-wear",
    categoryLabel: "Occasion Wear",
    badge: "Popular",
    price: 1199,
    originalPrice: 1599,
    shortDescription: "Breezy floral kurta in soft blush tones — perfect for festive days.",
    description: `A statement piece for any celebration, our Pink Floral Kurta brings together delicate floral print and flowing bell sleeves in a design that is effortlessly feminine. Made from premium rayon fabric, the kurta drapes beautifully and keeps you comfortable all day.\n\nThe subtle sequin detailing along the hem adds a touch of sparkle without being over the top. Pair with straight-fit palazzo pants or churidar for a complete festive look.`,
    fabric: "Premium Rayon",
    care: "Hand wash in cold water. Lay flat to dry. Do not tumble dry.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "images/product_pink_kurta.jpg",
      "images/product_purple_churidar.jpg",
      "images/product_mustard_kurta.jpg"
    ],
    rating: 4.9,
    reviewCount: 58,
    stock: 8,
    shipping: "Free shipping on orders above ₹999. Delivery in 3–5 business days.",
    tags: ["kurta", "floral", "festive", "occasion"],
    reviews: [
      { author: "Reshma K.", rating: 5, date: "20 May 2025", text: "Best kurta I've bought this year! The floral print is so pretty and the fabric feels luxurious." },
      { author: "Divya P.", rating: 5, date: "2 May 2025", text: "Wore this to Onam and received so many compliments. The fit was perfect." },
      { author: "Sangeetha N.", rating: 4, date: "14 Apr 2025", text: "Beautiful kurta, vibrant colours. The sequin detail is a lovely touch." }
    ]
  },
  {
    id: 3,
    slug: "blue-long-kurta",
    name: "Blue Long Kurta",
    category: "custom-design",
    categoryLabel: "Custom Design",
    badge: "Custom",
    price: 1799,
    originalPrice: 2299,
    shortDescription: "Regal royal blue long kurta with silver embroidery — available for customisation.",
    description: `Our signature Blue Long Kurta is a masterpiece of understated elegance. Crafted from a luxurious poly-silk fabric, this floor-length kurta features hand-applied silver thread embroidery along the neckline, cuffs, and hem. The colour — a deep, regal royal blue — is perfect for formal occasions.\n\nThis style is available for full customisation including size, sleeve length, and embroidery pattern. Contact us via WhatsApp to discuss your requirements.`,
    fabric: "Poly-Silk Blend",
    care: "Dry clean recommended for best results.",
    sizes: ["XS", "S", "M", "L", "XL"],
    availableSizes: ["S", "M", "L"],
    images: [
      "images/product_blue_kurta.jpg",
      "images/product_purple_churidar.jpg",
      "images/boutique_hero.jpg"
    ],
    rating: 4.7,
    reviewCount: 24,
    stock: 5,
    shipping: "Free shipping on orders above ₹999. Delivery in 3–5 business days. Custom orders may take 7–10 days.",
    tags: ["kurta", "custom", "ethnic", "formal"],
    reviews: [
      { author: "Latha V.", rating: 5, date: "8 May 2025", text: "Had this customised for my son's wedding and it was absolutely perfect. The team was so helpful!" },
      { author: "Nisha T.", rating: 4, date: "22 Apr 2025", text: "Beautiful quality fabric and the embroidery is done with such care. Very happy." },
      { author: "Asha M.", rating: 5, date: "5 Apr 2025", text: "Worth every rupee. The royal blue is even more stunning in person." }
    ]
  },
  {
    id: 4,
    slug: "mustard-yellow-kurta",
    name: "Mustard Yellow Kurta",
    category: "ladies-wear",
    categoryLabel: "Ladies Wear",
    badge: null,
    price: 999,
    originalPrice: 1299,
    shortDescription: "Earthy mustard block-print cotton kurta — casual, comfortable, and chic.",
    description: `Embrace earthy tones with our Mustard Yellow Kurta. Hand block-printed by skilled artisans, each piece carries a unique charm. The breathable 100% cotton fabric makes it ideal for Kerala's warm climate, while the classic A-line silhouette flatters all body types.\n\nThe minimal block print in a deeper ochre gives a beautiful contrast against the warm mustard base. Pair with white churidar or palazzo pants for a complete, effortless look.`,
    fabric: "100% Pure Cotton",
    care: "Machine wash gentle cycle in cold water. Tumble dry low. Iron on medium heat.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "images/product_mustard_kurta.jpg",
      "images/product_pink_kurta.jpg",
      "images/product_blue_maxi.jpg"
    ],
    rating: 4.6,
    reviewCount: 41,
    stock: 20,
    shipping: "Free shipping on orders above ₹999. Delivery in 3–5 business days.",
    tags: ["kurta", "cotton", "casual", "ladies"],
    reviews: [
      { author: "Bindhu O.", rating: 5, date: "14 May 2025", text: "Such a refreshing colour! Very comfortable for everyday wear." },
      { author: "Sreeja L.", rating: 4, date: "30 Apr 2025", text: "The block print is so unique and pretty. Perfect fit for M size." },
      { author: "Roja C.", rating: 5, date: "12 Apr 2025", text: "Great value for money. The cotton is so soft and cool." }
    ]
  },
  {
    id: 5,
    slug: "blue-floral-maxi",
    name: "Blue Floral Maxi",
    category: "teen-girls",
    categoryLabel: "Teen Girls",
    badge: "Festive",
    price: 1099,
    originalPrice: 1449,
    shortDescription: "Light chiffon maxi dress with blue floral print — young, fun, and festive.",
    description: `Our Blue Floral Maxi Dress is the perfect statement piece for teenage girls who love to stand out at celebrations. The airy chiffon fabric floats beautifully, making it ideal for festivals, family functions, and parties.\n\nFeaturing an all-over vibrant blue floral print, this maxi has a flattering empire waist and a comfortable fit. The sleeveless design with subtle shoulder detailing adds a modern touch to the traditional celebration dress.`,
    fabric: "Premium Chiffon",
    care: "Hand wash gently in cold water. Do not wring. Dry in shade.",
    sizes: ["XXS", "XS", "S", "M", "L"],
    availableSizes: ["XS", "S", "M", "L"],
    images: [
      "images/product_blue_maxi.jpg",
      "images/product_pink_nightwear.jpg",
      "images/product_pink_kurta.jpg"
    ],
    rating: 4.9,
    reviewCount: 63,
    stock: 15,
    shipping: "Free shipping on orders above ₹999. Delivery in 3–5 business days.",
    tags: ["maxi", "teen", "festive", "dress"],
    reviews: [
      { author: "Riya J.", rating: 5, date: "18 May 2025", text: "My daughter absolutely loves this! She wore it for Vishu and looked like a princess." },
      { author: "Keerthana B.", rating: 5, date: "5 May 2025", text: "The fabric is so light and flowy. Perfect for Kerala heat during festivals." },
      { author: "Sunitha A.", rating: 4, date: "20 Apr 2025", text: "Very pretty dress. The colour is beautiful. Sizing runs a bit large so order one size down." }
    ]
  },
  {
    id: 6,
    slug: "cozy-pink-nightwear",
    name: "Cozy Pink Nightwear",
    category: "teen-girls",
    categoryLabel: "Teen Girls",
    badge: null,
    price: 799,
    originalPrice: 999,
    shortDescription: "Super soft star-print cotton pyjama set — cute, comfy, and dreamy.",
    description: `Sweet dreams are made of this! Our Cozy Pink Nightwear Set features a charming little star print on the softest cotton fabric you've ever felt. Designed for teenage girls, the set includes a relaxed-fit top and comfortable drawstring pyjama bottoms.\n\nThe pastel pink palette and fun star motif make this the perfect gift — and the breathable cotton ensures a comfortable night's sleep all year round. Available in a range of sizes to suit all teenagers.`,
    fabric: "100% Soft Cotton",
    care: "Machine wash cold. Tumble dry low. Do not bleach.",
    sizes: ["XS", "S", "M", "L"],
    availableSizes: ["XS", "S", "M", "L"],
    images: [
      "images/product_pink_nightwear.jpg",
      "images/product_blue_maxi.jpg",
      "images/product_mustard_kurta.jpg"
    ],
    rating: 4.7,
    reviewCount: 47,
    stock: 25,
    shipping: "Free shipping on orders above ₹999. Delivery in 3–5 business days.",
    tags: ["nightwear", "teen", "cotton", "gift"],
    reviews: [
      { author: "Deepa K.", rating: 5, date: "22 May 2025", text: "My 14-year-old daughter loves it! She says it's the comfiest PJs ever." },
      { author: "Rekha P.", rating: 4, date: "10 May 2025", text: "Great quality, very soft fabric. The print is so cute!" },
      { author: "Minu V.", rating: 5, date: "28 Apr 2025", text: "Bought as a birthday gift. She was so happy. Will order again!" }
    ]
  }
];

// Helper: Get product by id
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

// Helper: Get related products (same category, excluding self)
function getRelatedProducts(product, limit = 3) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .concat(PRODUCTS.filter(p => p.category !== product.category && p.id !== product.id))
    .slice(0, limit);
}

// Helper: Get products by category
function getProductsByCategory(category) {
  if (!category || category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

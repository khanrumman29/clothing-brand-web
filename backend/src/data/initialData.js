export const defaultSiteContent = {
  hero: {
    heading: 'IN THE RIGHT OUTFIT\nANYTHING IS POSSIBLE',
    subheading: "WINTER '25 EDITORIAL CAMPAIGN",
    image: '/assets/milan-hero.jpg',
    buttons: [
      { text: 'COLLECTIONS', action: '#winter-collections', variant: 'light' },
      { text: 'SHOP NOW', action: '#winter-collections', variant: 'dark' }
    ]
  },
  announcement: {
    enabled: true,
    text: 'COMPLIMENTARY EXPRESS SHIPPING ON ORDERS OVER $150 • FREE RETURNS'
  },
  winterCollections: {
    title: 'WINTER COLLECTIONS',
    subtitle: 'LET US LOVE WINTER FOR IT IS THE SPRING OF GENIUS'
  },
  harfaBanner: {
    title: 'FIND YOUR PERFECT LOOK AT HARFA STY NEW ON PARIS',
    description: 'Experience our newly inaugurated Paris flagship showcase. Designed with raw industrial concrete and warm European oak, discover limited-run winter tailoring, heavyweight shearling, and hand-finished outerwear crafted for cold climates.',
    discountLabel: 'SALES AND DISCOUNT!',
    discountPercentage: 87,
    image: '/assets/editorial-paris.png',
    buttonText: 'FIND THE STORE'
  },
  videoBanner: {
    title: 'WEAR TO WINTER',
    subtitle: 'LET US LOVE WINTER FOR IT IS THE SPRING OF GENIUS',
    backgroundImage: '/assets/winter-video-banner.png',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    buttonText: 'SHOP NOW'
  },
  featuredCollections: {
    title: 'FEATURED COLLECTIONS',
    subtitle: 'TOP NEW COLLECTIONS WITH HARFA BRANDS EXPLOR NOW',
    hoodieCard: {
      title: 'HOODIE',
      subtitle: 'OPEN WITH BUY AND APPLY CODE GET OFFERS',
      buttonText: 'DISCOVER'
    }
  }
};

export const defaultProducts = [
  {
    name: 'LOOSE FIT HOODIE',
    category: 'Hoodies',
    gender: 'Men',
    price: 120.99,
    originalPrice: 200.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-hoodie.png',
    secondaryImage: '/assets/bento-hoodie.png',
    discount: '40% OFF',
    isNewArrival: true,
    colors: ['#121212', '#71717a', '#ede8e1'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Crafted from heavyweight 460gsm organic French terry cotton with a boxy, dropped-shoulder silhouette. Features a double-layered hood without drawstrings for a clean, minimalist drape.',
    stock: 25
  },
  {
    name: 'PATTERNED SCARF',
    category: 'Accessories',
    gender: 'Unisex',
    price: 88.02,
    originalPrice: 100.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-scarf.png',
    secondaryImage: '/assets/editorial-paris.png',
    discount: '12% OFF',
    isNewArrival: false,
    colors: ['#475569', '#1e293b', '#94a3b8'],
    sizes: ['One Size'],
    description: 'Woven in Scotland from pure brushed lambswool featuring a modern monochrome tartan check with fringed edges. Featherweight warmth for cold winter layering.',
    stock: 18
  },
  {
    name: 'RELAXED FIT COR JACKET',
    category: 'Outerwear',
    gender: 'Men',
    price: 150.05,
    originalPrice: 200.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-jacket.png',
    secondaryImage: '/assets/bento-jacket.png',
    discount: '25% OFF',
    isNewArrival: true,
    colors: ['#09090b', '#27272a', '#3f3f46'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Technical horizontal-quilted cold-weather puffer jacket with thermal down-alternative filling, weather-resistant matte shell, and structured high stand collar.',
    stock: 15
  },
  {
    name: 'RIB-KNIT HAT',
    category: 'Accessories',
    gender: 'Unisex',
    price: 75.05,
    originalPrice: 95.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-beanie.png',
    secondaryImage: '/assets/product-tan-beanie.png',
    discount: '21% OFF',
    isNewArrival: false,
    colors: ['#f4f4f5', '#d4d4d8', '#18181b'],
    sizes: ['One Size'],
    description: 'Chunky 7-gauge fisherman rib-knit beanie in off-white virgin wool blend. Features an adjustable turned-up cuff with tailored crown darts for a flattering fit.',
    stock: 32
  },
  {
    name: 'LIGHTWEIGHT PUFFER JK',
    category: 'Outerwear',
    gender: 'Men',
    price: 120.99,
    originalPrice: 200.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-overshirt.png',
    secondaryImage: '/assets/category-men.png',
    discount: '40% OFF',
    isNewArrival: true,
    colors: ['#18181b', '#3f3f46', '#71717a'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Contemporary corduroy utility overshirt jacket with matte button front closure, twin flap chest pockets, and relaxed tailored drape.',
    stock: 12
  },
  {
    name: 'PACK COTTON HATS',
    category: 'Accessories',
    gender: 'Unisex',
    price: 88.02,
    originalPrice: 100.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-tan-beanie.png',
    secondaryImage: '/assets/product-beanie.png',
    discount: '12% OFF',
    isNewArrival: false,
    colors: ['#d7c4b7', '#b5a193', '#78695d'],
    sizes: ['One Size'],
    description: 'Ultra-soft melange ribbed knit beanie in warm toasted almond shade. Double-layered gauge construction retains shape season after season.',
    stock: 20
  },
  {
    name: 'RIB-KNIT GLOVES SET',
    category: 'Accessories',
    gender: 'Unisex',
    price: 75.05,
    originalPrice: 95.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-gloves.png',
    secondaryImage: '/assets/bento-bags.png',
    discount: '21% OFF',
    isNewArrival: false,
    colors: ['#09090b', '#27272a'],
    sizes: ['S/M', 'L/XL'],
    description: 'Pair of seamless touchscreen-compatible wool gloves with ribbed extended cuffs that fit smoothly under winter coats.',
    stock: 14
  },
  {
    name: 'CHUNKY TRAINERS',
    category: 'Footwear',
    gender: 'Unisex',
    price: 150.05,
    originalPrice: 200.00,
    mrpText: 'MRP INCLUSIVE OF ALL TAXES',
    image: '/assets/product-trainers.png',
    secondaryImage: '/assets/bento-sneakers.png',
    discount: '25% OFF',
    isNewArrival: true,
    colors: ['#fafafa', '#e4e4e7', '#a1a1aa'],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    description: 'Sculpted chunky runner sneakers featuring multilayered breathable mesh and suede panels, lightweight EVA midsoles, and high-traction rubber lug outsoles.',
    stock: 10
  }
];

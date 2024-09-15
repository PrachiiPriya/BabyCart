const products = [
  {
    id: 1,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/15768636a.webp",
    title: "Babyhug Full Sleeves Below Knee Length Transparent Raincoat Rainy Day Print - Neon Green",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Its Raining Its Pouring',
    category: 'BATH',
    description: 'Lorem ipsum dolor sit amet...',
    age:'1'
  },
  {
    id: 2,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/15768636a.webp",
    title: "Babyhug Marvel Single Jersey Knit Half Sleeves T-Shirt And Shorts Set with Avengers Graphics - White & Navy Blue",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Collection Featuring Disney and Marvel',
    category: 'BOY FASHION',
    description: 'Lorem ipsum dolor sit amet...',
    age:'2'
  },
  {
    id: 3,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438X531/16250361a.jpg",
    title: "Babyhug Disney Single Jersey Knit Full Sleeves Night Suit Polka Dot and Dalmatians Print - Yellow",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Collection Featuring Disney and Marvel',
    category: 'GIRL FASHION',
    description: 'Lorem ipsum dolor sit amet...',
    age:'3'
  },
  {
    id: 4,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438X531/16168781a.jpg",
    title: "US Polo Assn Cotton Knit Half Sleeves Frock With Logo Embroidery - Pink",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Couture Cuteness Collection',
    category: 'GIRL FASHION',
    description: 'Lorem ipsum dolor sit amet...',
    age:'4'
  },
  {
    id: 5,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438X531/15467857a.jpg",
    title: "US Polo Assn Knit Half Sleeves T-Shirt With Stripes - Red",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Couture Cuteness Collection',
    category: 'BOY FASHION',
    description: 'Lorem ipsum dolor sit amet...',
    age:'5'
  },
  {
    id: 6,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438X531/15255881sz.jpg",
    title: "The Mom Store Full Sleeves Fruits Printed Sleepsuit - Red",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Moonlight Pajama Parade',
    category: 'MOMS',
    description: 'Lorem ipsum dolor sit amet...',
    age:'6'
  },
  {
    id: 7,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438X531/14680867a.jpg",
    title: "Toothless Marvel Avengers Theme Featuring Captain America Printed Sneakers - Red",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Footwear Fiesta',
    category: 'FOOTWEAR',
    description: 'Lorem ipsum dolor sit amet...',
    age:'7'
  },
  {
    id: 8,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/12292142a.webp",
    title: "KIDSUN Round Shaped Animal Detail Silicon Strap Analog Light Watch - Purple",
    price: "Rs 399",
    discount: "35% OFF",
    quantity: 1,
    collection: 'Accessory Adventure',
    category: 'TOYS',
    description: 'Lorem ipsum dolor sit amet...',
    age:'8'
  },
  {
    id: 9,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/15255073a.webp",
    title: "Coral Linen Shirt",
    price: "Rs 300",
    discount: "20",
    quantity: 5,
    collection: 'Top Home Deals',
    category: 'BOY FASHION',
    age:'9'
  },
  {
    id: 10,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/15489345a.webp",
    title: "Pink Ruffle Top",
    price: "Rs 400",
    discount: "30",
    quantity: 6,
    collection: 'Magical Collection',
    category: 'GIRL FASHION',
    age:'10'
  },
  {
    id: 11,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/16109392a.webp",
    title: "Pink Walking Shoes",
    price: "Rs 500",
    discount: "10",
    quantity: 7,
    collection: 'Footwear Fiesta',
    category: 'FOOTWEAR',
    age:'11'
  },
  {
    id: 12,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/219x265/3262003a.webp",
    title: "Toy for Toddlers",
    price: "Rs 600",
    discount: "40",
    quantity: 8,
    collection: 'Baby Blossom Bash',
    category: 'TOYS',
    age:'12'
  },
  {
    id: 13,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/13729052a.webp",
    title: "Hair Pins",
    price: "Rs 700",
    discount: "50",
    quantity: 9,
    collection: 'Accessory Adventure',
    category: 'ACCESSORIES',
    age:'13'
  },
  {
    id: 14,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/10216894b.jpg",
    title: "Blue T-shirt",
    price: "Rs 350",
    discount: "35",
    quantity: 5,
    collection: 'Top Home Deals',
    category: 'BOY FASHION',
    age:'14'
  },
  {
    id: 15,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/15935117a.webp",
    title: "Multicolor top",
    price: "Rs 450",
    discount: "45",
    quantity: 6,
    collection: 'Magical Collection',
    category: 'GIRL FASHION',
    age:'15'
  },
  {
    id: 16,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/15957693a.webp",
    title: "Yellow Crocs",
    price: "Rs 550",
    discount: "50",
    quantity: 7,
    collection: 'Footwear Fiesta',
    category: 'FOOTWEAR',
    age:'15'
  },
  {
    id: 17,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/219x265/13353030a.webp",
    title: "Toy",
    price: "Rs 650",
    discount: "55",
    quantity: 8,
    collection: 'Baby Blossom Bash',
    category: 'TOYS',
    age:'14'
  },
  {
    id: 18,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/17381010a.webp",
    title: "Hair Bow",
    price: "Rs 750",
    discount: "60",
    quantity: 9,
    collection: 'Accessory Adventure',
    category: 'ACCESSORIES',
    age:'13'
  },
  {
    id: 19,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/13901366a.webp",
    title: "Boys Yellow Topwear",
    price: "Rs 400",
    discount: "60",
    quantity: 5,
    collection: 'Top Home Deals',
    category: 'BOY FASHION',
    age:'12'
  },
  {
    id: 20,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/16024113a.webp",
    title: "Girls Topwear Combo",
    price: "Rs 500",
    discount: "70",
    quantity: 6,
    collection: 'Magical Collection',
    category: 'GIRL FASHION',
    age:'11'
  },
  {
    id: 21,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/16113884a.webp",
    title: "Red Sandals",
    price: "Rs 600",
    discount: "80",
    quantity: 7,
    collection: 'Footwear Fiesta',
    category: 'FOOTWEAR',
    age:'10'
  },
  {
    id: 22,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/219x265/15779201a.webp",
    title: "Magnetic Connectors",
    price: "Rs 700",
    discount: "90",
    quantity: 8,
    collection: 'Baby Blossom Bash',
    category: 'TOYS',
    age:'9'
  },
  {
    id: 23,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/14335836a.webp",
    title: "Watch",
    price: "Rs 800",
    discount: "100",
    quantity: 9,
    collection: 'Accessory Adventure',
    category: 'ACCESSORIES',
    age:'8'
  },
  {
    id: 24,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/16450597a.webp",
    title: "Home Deals",
    price: "Rs 600",
    discount: "90",
    quantity: 4,
    collection: 'Top Home Deals',
    category: 'BOY FASHION',
    age:'7'
  },
  {
    id: 25,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/438x531/11581319a.webp",
    title: "Intelliskills Handwriting Magic Practice Workbook Set - English",
    price: "Rs 300",
    discount: "80",
    quantity: 6,
    collection: 'Magical Collection',
    category: 'GIRL FASHION',
    age:'6'
  },
  {
    id: 26,
    url: "https://th.bing.com/th/id/OIP.kcQwZ0aC1OEQvdGNynhG6gHaHa?rs=1&pid=ImgDetMain",
    title: "Blue Footwear",
    price: "Rs 400",
    discount: "70",
    quantity: 7,
    collection: 'Footwear Fiesta',
    category: 'FOOTWEAR',
    age:'5'
  },
  {
    id: 27,
    url: "https://images-na.ssl-images-amazon.com/images/I/71TxLIHNTzL._AC_SL1500_.jpg",
    title: "Toy and Infant Care",
    price: "Rs 500",
    discount: "60",
    quantity: 8,
    collection: 'Baby Blossom Bash',
    category: 'TOYS',
    age:'4'
  },
  {
    id: 28,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/15498148a.webp",
    title: "Black  Collection",
    price: "Rs 600",
    discount: "50",
    quantity: 9,
    collection: 'Accessory Adventure',
    category: 'ACCESSORIES',
    age:'3'
  },
  {
    id: 29,
    url: "https://thecraftingchicks.com/wp-content/uploads/2015/06/fairy-tales-goldilocks.jpg",
    title: "Goldilocks and the three Bears",
    price: "Rs 700",
    discount: "40",
    quantity: 5,
    collection: 'Top Home Deals',
    category: 'BOY FASHION',
    age:'10'
  },
  {
    id: 30,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/14447970a.webp",
    title: "Decoratives",
    price: "Rs 800",
    discount: "30",
    quantity: 6,
    collection: 'Magical Collection',
    category: 'GIRL FASHION',
    age:'1'
  },
  {
    id: 31,
    url: "https://cdn.fcglcdn.com/brainbees/images/products/300x364/16219960a.webp",
    title: "Red Footwear",
    price: "Rs 900",
    discount: "20",
    quantity: 7,
    collection: 'Footwear Fiesta',
    category: 'FOOTWEAR',
    age:'1'
  },
  {
    id: 32,
    url: "https://i5.walmartimages.com/asr/ab9c8cb4-f827-42a8-b6f0-87f93c143735_1.2e78a6461ce9f53e3d141d857011db62.jpeg",
    title: "Toy Vehicles",
    price: "Rs 3000",
    discount: "10",
    quantity: 8,
    collection: 'Baby Blossom Bash',
    category: 'TOYS',
    age:'2'
  },
  {
    id: 33,
    url: "https://livingimpressive.com/wp-content/uploads/2014/07/Animal-Accessories-6.jpg",
    title: "Decor Accessories for kid rooms",
    price: "Rs 3000",
    discount: "5",
    quantity: 9,
    collection: 'Accessory Adventure',
    category: 'ACCESSORIES',
    age:'1'
  }
];

module.exports = products;

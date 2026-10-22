import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputImage = 'c:/Users/HP/OneDrive/Desktop/clothing brand web/images/image.png';
const outputDir = 'c:/Users/HP/OneDrive/Desktop/clothing brand web/frontend/public/assets';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function extract() {
  const metadata = await sharp(inputImage).metadata();
  console.log('Image dimensions:', metadata.width, 'x', metadata.height);

  // Crop definitions based on 1600x1200 mockup layout:
  // Left half main design: x: 44 to 1042, y: 44 to 1156
  // Hero section is approx:
  // x: 44, y: 108, width: 998, height: 434
  // Winter collections grid starts at y: ~660
  // Product 1 (Loose fit hoodie): x: 77, y: 671, width: 221, height: 265
  // Product 2 (Patterned scarf): x: 312, y: 671, width: 221, height: 265
  // Product 3 (Cor jacket): x: 548, y: 671, width: 221, height: 265
  // Product 4 (Rib knit hat): x: 785, y: 671, width: 221, height: 265
  
  // Row 2:
  // Product 5 (Overshirt): x: 77, y: 1022, width: 221, height: 178 (partially visible)
  // Product 6 (Tan hat): x: 312, y: 1022, width: 221, height: 178
  // Product 7 (Gloves): x: 548, y: 1022, width: 221, height: 178
  // Product 8 (Trainers): x: 785, y: 1022, width: 221, height: 178

  // Right column full overview (x: 1086 to 1550):
  // Editorial "Harfa Sty" photo: x: 1093, y: 144, width: 251, height: 156
  // Winter Video Banner: x: 1093, y: 318, width: 436, height: 195
  // Featured Collections:
  // Jeans: x: 1094, y: 575, width: 141, height: 80
  // T-Shirt: x: 1094, y: 663, width: 141, height: 161
  // Hoodie (center): x: 1241, y: 575, width: 142, height: 161
  // Sneakers: x: 1241, y: 742, width: 142, height: 82
  // Bags: x: 1390, y: 575, width: 140, height: 80
  // Jacket: x: 1390, y: 663, width: 140, height: 161
  // Demographics:
  // Men: x: 1093, y: 859, width: 140, height: 163
  // Women: x: 1241, y: 859, width: 140, height: 163
  // Kids: x: 1389, y: 859, width: 140, height: 163

  const crops = [
    { name: 'hero-banner.png', left: 44, top: 108, width: 998, height: 434 },
    { name: 'product-hoodie.png', left: 77, top: 671, width: 221, height: 265 },
    { name: 'product-scarf.png', left: 312, top: 671, width: 221, height: 265 },
    { name: 'product-jacket.png', left: 548, top: 671, width: 221, height: 265 },
    { name: 'product-beanie.png', left: 785, top: 671, width: 221, height: 265 },
    { name: 'product-overshirt.png', left: 77, top: 1022, width: 221, height: 178 },
    { name: 'product-tan-beanie.png', left: 312, top: 1022, width: 221, height: 178 },
    { name: 'product-gloves.png', left: 548, top: 1022, width: 221, height: 178 },
    { name: 'product-trainers.png', left: 785, top: 1022, width: 221, height: 178 },
    
    // Overview column full items:
    { name: 'editorial-paris.png', left: 1093, top: 144, width: 251, height: 156 },
    { name: 'winter-video-banner.png', left: 1093, top: 318, width: 436, height: 195 },
    { name: 'bento-jeans.png', left: 1094, top: 575, width: 141, height: 80 },
    { name: 'bento-tshirt.png', left: 1094, top: 663, width: 141, height: 161 },
    { name: 'bento-hoodie.png', left: 1241, top: 575, width: 142, height: 161 },
    { name: 'bento-sneakers.png', left: 1241, top: 742, width: 142, height: 82 },
    { name: 'bento-bags.png', left: 1390, top: 575, width: 140, height: 80 },
    { name: 'bento-jacket.png', left: 1390, top: 663, width: 140, height: 161 },
    { name: 'category-men.png', left: 1093, top: 859, width: 140, height: 163 },
    { name: 'category-women.png', left: 1241, top: 859, width: 140, height: 163 },
    { name: 'category-kids.png', left: 1389, top: 859, width: 140, height: 163 },
    
    // Top overview row items in right column for complete product cards:
    { name: 'row2-puffer.png', left: 1090, top: 0, width: 85, height: 60 },
    { name: 'row2-tanhat.png', left: 1180, top: 0, width: 85, height: 60 },
    { name: 'row2-gloves.png', left: 1270, top: 0, width: 85, height: 60 },
    { name: 'row2-trainers.png', left: 1360, top: 0, width: 95, height: 60 },
  ];

  for (const c of crops) {
    // Ensure bounds are within image
    const validLeft = Math.max(0, Math.min(metadata.width - 10, c.left));
    const validTop = Math.max(0, Math.min(metadata.height - 10, c.top));
    const validWidth = Math.min(c.width, metadata.width - validLeft);
    const validHeight = Math.min(c.height, metadata.height - validTop);

    if (validWidth > 0 && validHeight > 0) {
      await sharp(inputImage)
        .extract({ left: validLeft, top: validTop, width: validWidth, height: validHeight })
        .toFile(path.join(outputDir, c.name));
      console.log('Saved:', c.name);
    }
  }
  console.log('Finished extracting mockup crops!');
}

extract().catch(console.error);

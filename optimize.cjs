const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const publicDir = path.join(__dirname, 'public');
  
  // Optimize favicon to standard 180x180 PNG
  await sharp(path.join(publicDir, 'favicon.png'))
    .resize(180, 180)
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'favicon-opt.png'));
    
  fs.unlinkSync(path.join(publicDir, 'favicon.png'));
  fs.renameSync(path.join(publicDir, 'favicon-opt.png'), path.join(publicDir, 'favicon.png'));

  // Optimize logos to WebP
  await sharp(path.join(publicDir, 'logo.png'))
    .resize(1200) // good for OG image
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'logo.webp'));

  await sharp(path.join(publicDir, 'logo-transparent.png'))
    .resize(800)
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'logo-transparent.webp'));

  // Delete original bulky PNGs
  fs.unlinkSync(path.join(publicDir, 'logo.png'));
  fs.unlinkSync(path.join(publicDir, 'logo-transparent.png'));
  
  console.log("Images successfully optimized.");
}
run().catch(console.error);

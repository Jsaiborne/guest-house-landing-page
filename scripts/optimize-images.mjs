import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('public/images');
const BACKUP_DIR = path.resolve('images_backup');

// Helper to recursively list files
function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

async function main() {
  console.log('Scanning for images...');
  const files = getFilesRecursively(SOURCE_DIR);
  const imageExtensions = /\.(jpe?g|png)$/i;

  const targetFiles = files.filter(file => imageExtensions.test(file));
  console.log(`Found ${targetFiles.length} images to optimize.`);

  for (const file of targetFiles) {
    const relativePath = path.relative(SOURCE_DIR, file);
    const dirName = path.dirname(relativePath);
    
    // Determine image type and resize rules
    let maxWidth = 1200;
    let type = 'Gallery/Room';
    
    // Check if it's in the hero folder
    if (relativePath.startsWith('hero') || dirName === 'hero') {
      maxWidth = 1920;
      type = 'Hero';
    }

    const backupPath = path.join(BACKUP_DIR, relativePath);
    const backupDir = path.dirname(backupPath);
    
    // Create backup directory if needed
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Copy original file to backup
    fs.copyFileSync(file, backupPath);
    console.log(`[Backup] Copied original to ${path.relative(process.cwd(), backupPath)}`);

    // Define target WebP path
    const parsedPath = path.parse(file);
    const targetWebPPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    console.log(`[Optimizing] Processing ${relativePath} as ${type} (Max width: ${maxWidth}px)`);

    try {
      await sharp(backupPath)
        .resize({
          width: maxWidth,
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 80, effort: 6 })
        .toFile(targetWebPPath);

      // Check size of the generated file
      const stats = fs.statSync(targetWebPPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`[Success] Saved ${path.relative(process.cwd(), targetWebPPath)} (${sizeKB} KB)`);

      // Delete the original JPG/PNG file from the source directory
      fs.unlinkSync(file);
      console.log(`[Cleanup] Deleted original from ${path.relative(process.cwd(), file)}`);
    } catch (err) {
      console.error(`[Error] Failed to process ${relativePath}:`, err);
    }
  }

  console.log('Image optimization process complete!');
}

main().catch(err => {
  console.error('Fatal error in optimizer script:', err);
  process.exit(1);
});

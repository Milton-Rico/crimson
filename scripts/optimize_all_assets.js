import fs from 'fs/promises';
import path from 'path';
import process from 'node:process';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');

async function collectImageFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectImageFiles(fullPath);
      }
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        return [fullPath];
      }
      return [];
    })
  );
  return files.flat();
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalBuffer = await fs.readFile(filePath);
  const originalSize = originalBuffer.length;
  
  const image = sharp(originalBuffer);
  const metadata = await image.metadata();

  let pipeline = sharp(originalBuffer);

  // If extremely large dimension (> 2400px), scale gently to max 2200px while maintaining full crispness
  if (metadata.width && metadata.width > 2200) {
    pipeline = pipeline.resize({ width: 2200, withoutEnlargement: true });
  }

  let optimizedBuffer;
  if (ext === '.png') {
    optimizedBuffer = await pipeline
      .png({
        quality: 85,
        compressionLevel: 9,
        palette: true,
        effort: 8
      })
      .toBuffer();
  } else if (ext === '.jpg' || ext === '.jpeg') {
    optimizedBuffer = await pipeline
      .jpeg({
        quality: 82,
        mozjpeg: true
      })
      .toBuffer();
  } else if (ext === '.webp') {
    optimizedBuffer = await pipeline
      .webp({
        quality: 80,
        effort: 6
      })
      .toBuffer();
  }

  if (optimizedBuffer && optimizedBuffer.length < originalSize) {
    const tempPath = `${filePath}.tmp`;
    await fs.writeFile(tempPath, optimizedBuffer);
    await fs.rename(tempPath, filePath);

    return {
      filePath,
      changed: true,
      before: originalSize,
      after: optimizedBuffer.length,
      width: metadata.width,
      height: metadata.height
    };
  }

  return {
    filePath,
    changed: false,
    before: originalSize,
    after: originalSize,
    width: metadata.width,
    height: metadata.height
  };
}

async function main() {
  console.log(`Scanning and optimizing images in ${assetsDir}...`);
  const files = await collectImageFiles(assetsDir);
  const results = [];

  for (const file of files) {
    try {
      const res = await optimizeFile(file);
      results.push(res);
      const rel = path.relative(process.cwd(), file);
      const status = res.changed ? 'OPTIMIZED' : 'SKIPPED';
      const pct = res.changed ? `(-${Math.round((1 - res.after / res.before) * 100)}%)` : '';
      console.log(`[${status}] ${rel} | ${formatKb(res.before)} -> ${formatKb(res.after)} ${pct}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    totalBefore += r.before;
    totalAfter += r.after;
  }

  console.log('\n========================================');
  console.log(`Total Before: ${formatKb(totalBefore)}`);
  console.log(`Total After:  ${formatKb(totalAfter)}`);
  console.log(`Total Saved:  ${formatKb(totalBefore - totalAfter)} (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
  console.log('========================================\n');
}

main().catch(console.error);

import fs from 'fs/promises';
import path from 'path';
import process from 'node:process';
import sharp from 'sharp';

const projectRoot = path.resolve('src/assets/projects');
const maxWidth = 1600;
const quality = 72;

async function collectWebpFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectWebpFiles(fullPath);
      }

      return fullPath.endsWith('.webp') ? [fullPath] : [];
    })
  );

  return files.flat();
}

async function optimizeImage(filePath) {
  const originalBuffer = await fs.readFile(filePath);
  const image = sharp(originalBuffer);
  const metadata = await image.metadata();
  const tempPath = `${filePath}.tmp`;

  const transformedBuffer = await image
    .resize({
      width: metadata.width > maxWidth ? maxWidth : undefined,
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
    })
    .toBuffer();

  if (transformedBuffer.length >= originalBuffer.length) {
    return {
      filePath,
      changed: false,
      before: originalBuffer.length,
      after: originalBuffer.length,
      width: metadata.width,
      height: metadata.height,
    };
  }

  await fs.writeFile(tempPath, transformedBuffer);
  await fs.rename(tempPath, filePath);

  const updatedMetadata = await sharp(transformedBuffer).metadata();

  return {
    filePath,
    changed: true,
    before: originalBuffer.length,
    after: transformedBuffer.length,
    width: updatedMetadata.width,
    height: updatedMetadata.height,
  };
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  const files = await collectWebpFiles(projectRoot);
  const results = [];

  for (const filePath of files) {
    results.push(await optimizeImage(filePath));
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const result of results) {
    totalBefore += result.before;
    totalAfter += result.after;
    const relativePath = path.relative(process.cwd(), result.filePath);
    const status = result.changed ? 'optimized' : 'skipped';

    console.log(
      `${status.padEnd(9)} ${relativePath} ${result.width}x${result.height} ${formatKb(
        result.before
      )} -> ${formatKb(result.after)}`
    );
  }

  console.log('');
  console.log(`Total before: ${formatKb(totalBefore)}`);
  console.log(`Total after:  ${formatKb(totalAfter)}`);
  console.log(`Saved:        ${formatKb(totalBefore - totalAfter)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

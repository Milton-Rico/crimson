import fs from 'fs/promises';
import path from 'path';
import process from 'node:process';
import sharp from 'sharp';

const projectRoot = path.resolve('src/assets/projects');
const variantWidth = 800;
const variantSuffix = '-sm';
const quality = 68;

async function collectWebpFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectWebpFiles(fullPath);
      }

      if (!fullPath.endsWith('.webp') || fullPath.endsWith(`${variantSuffix}.webp`)) {
        return [];
      }

      return [fullPath];
    })
  );

  return nested.flat();
}

function getVariantPath(filePath) {
  const extension = path.extname(filePath);
  const baseName = path.basename(filePath, extension);
  return path.join(path.dirname(filePath), `${baseName}${variantSuffix}${extension}`);
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function generateVariant(filePath) {
  const sourceBuffer = await fs.readFile(filePath);
  const image = sharp(sourceBuffer);
  const metadata = await image.metadata();
  const variantBuffer = await image
    .resize({
      width: metadata.width > variantWidth ? variantWidth : undefined,
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
    })
    .toBuffer();

  const variantPath = getVariantPath(filePath);
  await fs.writeFile(variantPath, variantBuffer);

  const variantMeta = await sharp(variantBuffer).metadata();

  return {
    filePath,
    variantPath,
    originalWidth: metadata.width,
    originalHeight: metadata.height,
    width: variantMeta.width,
    height: variantMeta.height,
    size: variantBuffer.length,
  };
}

async function main() {
  const files = await collectWebpFiles(projectRoot);
  const results = [];

  for (const filePath of files) {
    results.push(await generateVariant(filePath));
  }

  let totalSize = 0;

  for (const result of results) {
    totalSize += result.size;
    console.log(
      `${path.relative(process.cwd(), result.variantPath)} ${result.width}x${result.height} ${formatKb(
        result.size
      )}`
    );
  }

  console.log('');
  console.log(`Created ${results.length} responsive variants`);
  console.log(`Combined variant size: ${formatKb(totalSize)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

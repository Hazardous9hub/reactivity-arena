import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

const targetUrl = 'https://hazardous9hub.github.io/reactivity-arena/';

async function generate() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pngPath = path.join(publicDir, 'reactivity-arena-qr.png');
  const svgPath = path.join(publicDir, 'reactivity-arena-qr.svg');
  const rootPngPath = path.join(rootDir, 'Reactivity-Arena-Class10-Metals-QRCode.png');

  // Generate High-Res PNG (1000x1000)
  await QRCode.toFile(pngPath, targetUrl, {
    width: 1000,
    margin: 2,
    color: {
      dark: '#00f2fe',
      light: '#080d1a'
    },
    errorCorrectionLevel: 'H'
  });
  console.log(`Generated: ${pngPath}`);

  // Generate High-Res Printable PNG with high-contrast (Dark on white for paper printouts)
  await QRCode.toFile(rootPngPath, targetUrl, {
    width: 1000,
    margin: 2,
    color: {
      dark: '#0f172a',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'H'
  });
  console.log(`Generated: ${rootPngPath}`);

  // Generate SVG
  const svgString = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#00f2fe',
      light: '#080d1a'
    },
    errorCorrectionLevel: 'H'
  });
  fs.writeFileSync(svgPath, svgString);
  console.log(`Generated: ${svgPath}`);
}

generate().catch(console.error);

import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { mkdirSync } from 'fs'

// SVG du logo Vision. sur fond violet foncé
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <!-- Fond -->
  <rect width="512" height="512" rx="96" fill="#1A0F3C"/>

  <!-- Logo pixel art centré (16x16 → 256x256, offset 128,128) -->
  <g transform="translate(128, 80) scale(16)">
    <!-- Corps rouge -->
    <rect x="5" y="3" width="6" height="1" fill="#E63946"/>
    <rect x="4" y="4" width="8" height="1" fill="#E63946"/>
    <rect x="4" y="5" width="8" height="6" fill="#C8102E"/>
    <rect x="5" y="11" width="6" height="2" fill="#C8102E"/>
    <rect x="6" y="13" width="4" height="3" fill="#C8102E"/>
    <!-- Yeux verts -->
    <rect x="4" y="4" width="1" height="1" fill="#C8F04A"/>
    <rect x="11" y="4" width="1" height="1" fill="#C8F04A"/>
    <rect x="4" y="9" width="1" height="1" fill="#C8F04A"/>
    <rect x="11" y="9" width="1" height="1" fill="#C8F04A"/>
  </g>

  <!-- Texte "Vision." en bas -->
  <text
    x="256" y="430"
    font-family="Arial Black, sans-serif"
    font-size="72"
    font-weight="900"
    fill="#C8F04A"
    text-anchor="middle"
    letter-spacing="-2"
  >Vision.</text>
</svg>`

const svgBuf = Buffer.from(svg)

mkdirSync('public', { recursive: true })

// Tailles nécessaires
const sizes = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png',         size: 192 },
  { name: 'icon-512.png',         size: 512 },
  { name: 'favicon-32.png',       size: 32  },
]

for (const { name, size } of sizes) {
  await sharp(svgBuf)
    .resize(size, size)
    .png()
    .toFile(`public/${name}`)
  console.log(`✓ public/${name}`)
}

// Écrire aussi le SVG source
writeFileSync('public/icon.svg', svg)
console.log('✓ public/icon.svg')
console.log('Icons générées avec succès !')

// Genera las imágenes optimizadas de public/img y la og:image.
// Uso: npm run images
//
// Cuando haya fotos reales de la Dra., reemplazá HERO_SRC por su retrato y volvé a correr el script.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const STOCK = path.resolve(root, '../cliinicas dental fotos stock')
const OUT = path.join(root, 'public/img')
fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const HERO_SRC = path.join(STOCK, 'foto hero.png')

// Pasa los azules (el ambo de la foto del hero) a lavanda, pesado por saturación
// para que la pared casi blanca y la piel no cambien.
async function toLavender(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min
    if (d < 0.02) continue
    const s = d / (1 - Math.abs(2 * l - 1))
    let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
    if (h < 185 || h > 245) continue
    const w = Math.min(1, (h - 185) / 15, (245 - h) / 15) * Math.min(1, Math.max(0, (s - 0.12) / 0.2))
    if (w <= 0) continue
    const nh = h + (262 - h) * w
    const ns = s * (1 - 0.25 * w)
    const c = (1 - Math.abs(2 * l - 1)) * ns, x = c * (1 - Math.abs(((nh / 60) % 2) - 1)), m = l - c / 2
    const [rr, gg, bb] = nh < 240 ? [0, x, c] : nh < 300 ? [x, 0, c] : [c, 0, x]
    data[i] = Math.round((rr + m) * 255)
    data[i + 1] = Math.round((gg + m) * 255)
    data[i + 2] = Math.round((bb + m) * 255)
  }
  return sharp(data, { raw: info }).png().toBuffer()
}

async function writeSet(input, name, widths, crop) {
  for (const w of widths) {
    let img = sharp(input).rotate()
    if (crop) img = img.extract(crop)
    await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, `${name}-${w}.webp`))
  }
  console.log('✓', name)
}

const hero = await toLavender(HERO_SRC) // 1763x892

// Hero desktop: foto completa de fondo (formato ~2:1 como la referencia).
await writeSet(hero, 'hero', [1100, 1763])
// Hero mobile: recorte centrado en ella. Se muestra a ~360px CSS → 720px en retina.
await writeSet(hero, 'hero-m', [480, 860], { left: 760, top: 0, width: 880, height: 892 })

// Beneficios: retrato sonriente sobre fondo claro (como la de la referencia).
// Original 736px de ancho: se muestra como máximo a 368px CSS para que no se pixele en retina.
await writeSet(path.join(STOCK, 'Cómo destacar clínicas estéticas frente competencia claves profesionales.jpg'), 'beneficios', [368, 736], {
  left: 0, top: 70, width: 736, height: 900,
})

// Tarjetas de servicios (formato 16:10, se muestran hasta ~380px CSS → 760px en retina).
await writeSet(path.join(STOCK, 'caroline-lm-ux18C551ghI-unsplash.jpg'), 'srv-prevencion', [400, 800], {
  left: 0, top: 500, width: 3479, height: 2174,
})
await writeSet(path.join(STOCK, 'kamal-hoseinianzade-RCQnbyQsnUg-unsplash.jpg'), 'srv-estetica', [400, 800], {
  left: 1500, top: 700, width: 4000, height: 2500,
})
await writeSet(path.join(STOCK, 'descarga (36).jpg'), 'srv-rehab', [400, 736], {
  left: 0, top: 110, width: 736, height: 460,
})

// og:image 1200x630 JPG con la foto del hero.
const violet = '#6F4DA8'
const photo = await sharp(hero).extract({ left: 700, top: 0, width: 1000, height: 892 }).resize(560, 630, { fit: 'cover', position: 'top' }).toBuffer()
const textSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <style>.s{font-family:'Manrope','Segoe UI',Arial,sans-serif}.f{font-family:'Cormorant Garamond',Georgia,serif}</style>
  <circle cx="102" cy="104" r="30" fill="#EFE8F8"/>
  <text x="102" y="114" text-anchor="middle" class="f" font-size="30" font-style="italic" fill="${violet}">pb</text>
  <text x="146" y="113" class="s" font-size="24" fill="#2B2433" font-weight="600">Dra. Paula Batista Pintos</text>
  <text x="72" y="250" class="s" font-size="52" fill="#2B2433" font-weight="600">Odontóloga en</text>
  <text x="72" y="314" class="s" font-size="52" fill="#2B2433" font-weight="600">Treinta y Tres</text>
  <text x="72" y="390" class="s" font-size="27" fill="#655C70">Atención cercana, honesta y sin juicios.</text>
  <rect x="72" y="455" width="320" height="64" rx="32" fill="${violet}"/>
  <text x="232" y="496" text-anchor="middle" class="s" font-size="23" fill="#fff" font-weight="600">Agendá por WhatsApp</text>
</svg>`
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#FFFFFF' } })
  .composite([{ input: photo, left: 640, top: 0 }, { input: Buffer.from(textSvg), left: 0, top: 0 }])
  .jpeg({ quality: 86 })
  .toFile(path.join(root, 'public/og-image.jpg'))
console.log('✓ og-image.jpg')

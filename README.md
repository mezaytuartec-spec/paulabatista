# Dra. Paula Batista Pintos — landing

Vite + React + Tailwind. Deploy en Vercel: build `npm run build`, output `dist/`.

```bash
npm install
npm run dev
```

## Imágenes

`npm run images` genera `public/img/` y `public/og-image.jpg` (1200x630) desde la carpeta de stock
`../cliinicas dental fotos stock`. Las fotos de stock elegidas y sus recortes están en `scripts/prepare-images.mjs`.

Hoy la foto del hero es de stock ("foto hero.png", con el ambo pasado a lavanda). Cuando haya una foto real de la doctora,
cambiá `HERO_SRC` en el script (y el recorte mobile `hero-m`) y volvé a correr `npm run images`. La og:image se regenera sola.

## Dominio

`VITE_SITE_URL` en `.env` define la URL absoluta de og:image y canonical. Cambiala cuando tengas el dominio final
(o configurala como variable de entorno en Vercel).

import { useEffect, useState } from 'react'
import {
  ADDRESS_SHORT, BENEFITS, GENERAL_MSG, INSTAGRAM, MAPS_EMBED, MAPS_LINK, PHONE_LABEL, REVIEWS, REVIEWS_LINK, SERVICE_GROUPS, waLink,
} from './content.js'

/* ---------- Íconos ---------- */

const paths = {
  chat: <path d="M4 18.5V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H8.5L4 18.5Z" />,
  check: <><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12.2 2.4 2.4 4.8-4.9" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7.5 2.9C19.5 15.4 12 20 12 20Z" />,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  insta: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" /></>,
}

function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

function Stars({ className = 'h-4 w-4' }) {
  return (
    <span className="flex gap-0.5 text-[#E4A93C]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8L10 1.8Z" /></svg>
      ))}
    </span>
  )
}

function Logo({ small = false }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="Dra. Paula Batista Pintos, inicio">
      <span className={`grid place-items-center rounded-full bg-white/80 font-serif italic text-violet-500 ring-1 ring-lav-200 ${small ? 'h-9 w-9 text-lg' : 'h-10 w-10 text-xl'}`} aria-hidden="true">pb</span>
      <span className="text-[15px] font-semibold leading-tight tracking-[-0.01em] sm:text-[17px]">
        Dra. Paula <span className="text-violet-500">B</span>atista Pintos
      </span>
    </a>
  )
}

function Img({ name, widths, sizes, alt, className = '', eager = false }) {
  return (
    <img
      src={`/img/${name}-${widths[0]}.webp`}
      srcSet={widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) return els.forEach((el) => el.classList.add('in'))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const ext = { target: '_blank', rel: 'noopener noreferrer' }
const NAV = [
  ['Servicios', '#servicios'],
  ['Cómo trabajo', '#como-trabajo'],
  ['Reseñas', '#resenas'],
  ['Ubicación', '#ubicacion'],
]

/* ---------- Hero (texto a la izquierda, persona a la derecha, chip de dirección sobre la foto) ---------- */

function useMedia(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

function Hero() {
  const desktop = useMedia('(min-width: 1024px)')
  return (
    <section id="inicio" className="relative overflow-hidden rounded-[24px] bg-mist lg:rounded-[28px]">
      {/* Foto de fondo en desktop */}
      {desktop && <div className="absolute inset-0">
        <Img name="hero" widths={[1100, 1763]} sizes="(min-width: 1400px) 1360px, 100vw" alt="Odontóloga sonriendo en el consultorio" className="object-[70%_0%]" eager />
      </div>}

      <header className="relative z-10 flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 lg:px-[60px] lg:pt-7">
        <Logo />
        <nav className="absolute left-[31%] top-[38px] hidden items-center gap-6 text-[14px] text-ink/80 xl:flex" aria-label="Principal">
          {NAV.map(([t, h]) => <a key={h} href={h} className="hover:text-violet-600">{t}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} {...ext} className="hidden rounded-full bg-white px-5 py-2.5 text-[14px] font-medium transition-colors hover:bg-lav-50 sm:inline-flex">
            Agendá tu consulta
          </a>
          <a href={waLink()} {...ext} aria-label="Escribir por WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform active:scale-95">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </header>

      <div className="relative z-10 px-5 pb-8 pt-10 sm:px-8 lg:flex lg:min-h-[620px] lg:items-center lg:px-[60px] lg:pb-24 lg:pt-6">
        <div className="max-w-[600px]">
          <h1 className="text-[33px] font-semibold leading-[1.12] tracking-[-0.025em] sm:text-[44px] lg:text-[50px]">
            Tu dentista en <span className="whitespace-nowrap">Treinta y Tres</span>, con una atención <span className="hl">cercana y honesta</span>
          </h1>
          <p className="mt-4 max-w-[540px] text-[17px] leading-[1.5] text-ink/75 lg:text-[20px]">
            Soy Paula Batista Pintos, odontóloga. Atiendo a adultos y adolescentes con hora agendada, y también urgencias.
          </p>
          <a href={waLink(GENERAL_MSG)} {...ext} className="btn mt-7">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Agendá por WhatsApp
          </a>
        </div>
      </div>

      {/* Foto en mobile/tablet: debajo del texto, se funde con el fondo */}
      {!desktop && (
        <div className="relative mx-auto aspect-[880/892] w-full max-w-[520px]">
          <Img name="hero-m" widths={[480, 860]} sizes="(min-width: 520px) 520px, 100vw" alt="Odontóloga sonriendo en el consultorio" eager />
        </div>
      )}

      <a href="#ubicacion" className="absolute bottom-5 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-medium shadow-[0_6px_20px_-8px_rgba(38,34,46,.25)] sm:right-8 lg:bottom-[96px] lg:right-[150px] lg:px-5 lg:py-3 lg:text-[14px]">
        <Icon name="pin" className="h-[18px] w-[18px] text-violet-500" />
        {ADDRESS_SHORT}
      </a>
    </section>
  )
}

/* ---------- Beneficios (foto a la izquierda + 4 tarjetas) ---------- */

function Benefits() {
  return (
    <section id="como-trabajo" className="relative z-10 -mt-6 rounded-t-[24px] bg-white px-5 pb-16 pt-12 sm:px-8 lg:-mt-[60px] lg:rounded-t-[28px] lg:px-[60px] lg:pb-24 lg:pt-[72px]">
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-3">
        <p className="label reveal lg:pt-2">Cómo trabajo</p>
        <h2 className="h2 reveal lg:col-span-2">
          Ir al dentista también puede ser <span className="hl">algo tranquilo</span>
        </h2>

        <div className="reveal mx-auto aspect-[368/450] w-full max-w-[368px] overflow-hidden rounded-[22px] bg-mist lg:row-span-2 lg:mx-0 lg:aspect-auto lg:max-w-none">
          <Img name="beneficios" widths={[368, 736]} sizes="368px" alt="Mujer sonriendo con dientes sanos" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:col-span-2 lg:gap-10">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className="card-line reveal p-5 sm:p-6" style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
              <span className="tile"><Icon name={b.icon} /></span>
              <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] sm:mt-10">{b.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Servicios (tarjetas con foto y lista; "Consultar" en lugar de precio) ---------- */

function Services({ onPick }) {
  return (
    <section id="servicios" className="rounded-[24px] bg-lav-100 px-5 py-14 sm:px-8 lg:rounded-[28px] lg:px-[60px] lg:py-20">
      <div className="reveal mx-auto max-w-[760px] text-center">
        <p className="label">Servicios</p>
        <h2 className="h2 mt-4">
          Todo lo que necesitás para <span className="hl">cuidar tus dientes</span>
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-10">
        {SERVICE_GROUPS.map((g, i) => (
          <article key={g.title} className="reveal flex flex-col rounded-[22px] bg-white p-4 sm:p-5" style={{ transitionDelay: `${i * 70}ms` }}>
            <div className="aspect-[16/10] overflow-hidden rounded-[14px] bg-mist">
              <Img name={g.img} widths={g.widths} sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw" alt={g.alt} />
            </div>
            <h3 className="mt-5 px-1 text-[19px] font-semibold tracking-[-0.01em]">{g.title}</h3>
            <ul className="mt-2 px-1">
              {g.items.map((it) => (
                <li key={it.label} className="border-b border-line last:border-0">
                  <a
                    href={waLink(it.msg)}
                    {...ext}
                    onClick={() => onPick(it)}
                    className="group flex items-center justify-between gap-3 py-2.5 text-[15px]"
                  >
                    <span className="text-ink/80">
                      {it.label}
                      {it.note && <span className="block text-[13px] text-muted">{it.note}</span>}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 text-[14px] font-semibold text-violet-500 group-hover:text-violet-700">
                      Consultar
                      <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- Reseñas (mismo esquema que beneficios) ---------- */

function Reviews() {
  return (
    <section id="resenas" className="px-5 py-16 sm:px-8 lg:px-[60px] lg:py-24">
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-3">
        <p className="label reveal lg:pt-2">Reseñas</p>
        <h2 className="h2 reveal lg:col-span-2">
          Lo que dicen <span className="hl">mis pacientes</span>
        </h2>

        <div className="reveal flex flex-col justify-between gap-8 rounded-[22px] bg-mist p-7 lg:row-span-2">
          <div>
            <p className="text-[64px] font-semibold leading-none tracking-[-0.04em]">5.0</p>
            <div className="mt-3"><Stars className="h-5 w-5" /></div>
            <p className="mt-2 text-[15px] text-muted">8 reseñas en Google</p>
          </div>
          <figure>
            <blockquote className="font-serif text-[26px] italic leading-snug text-violet-600">“Atención cercana, honesta y sin juicios.”</blockquote>
            <figcaption className="mt-2 text-[13px] text-muted">Mi forma de trabajar · Paula</figcaption>
          </figure>
          <a href={REVIEWS_LINK} {...ext} className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold transition-colors hover:bg-lav-50">
            Ver en Google <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:col-span-2 lg:gap-10">
          {REVIEWS.map((r, i) => (
            <figure key={r.name} className="card-line reveal flex flex-col p-5 sm:p-6" style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
              <Stars />
              <blockquote className="mt-4 flex-1 text-[15px] leading-[1.55] text-ink/80">“{r.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="tile h-9 w-9 rounded-full text-[13px] font-semibold">{r.name.split(' ').map((n) => n[0]).join('')}</span>
                <span className="text-[15px] font-semibold">{r.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Ubicación (mismo bloque que servicios) ---------- */

function Location() {
  return (
    <section id="ubicacion" className="rounded-[24px] bg-lav-100 px-5 py-14 sm:px-8 lg:rounded-[28px] lg:px-[60px] lg:py-20">
      <div className="reveal mx-auto max-w-[760px] text-center">
        <p className="label">Ubicación</p>
        <h2 className="h2 mt-4">Dónde queda el <span className="hl">consultorio</span></h2>
      </div>
      <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-10">
        <div className="reveal flex flex-col rounded-[22px] bg-white p-6 sm:p-7">
          <ul className="space-y-5 text-[15px]">
            <li className="flex gap-4">
              <span className="tile"><Icon name="pin" /></span>
              <span><b className="block font-semibold">Atanasio Sierra 612</b><span className="text-muted">Treinta y Tres, Uruguay</span></span>
            </li>
            <li className="flex gap-4">
              <span className="tile"><Icon name="calendar" /></span>
              <span><b className="block font-semibold">Consultas con hora agendada</b><span className="text-muted">También urgencias</span></span>
            </li>
            <li className="flex gap-4">
              <span className="tile"><WhatsAppIcon /></span>
              <span><a href={waLink()} {...ext} className="block font-semibold hover:text-violet-600">{PHONE_LABEL}</a><span className="text-muted">WhatsApp</span></span>
            </li>
            <li className="flex gap-4">
              <span className="tile"><Icon name="insta" /></span>
              <span><a href={INSTAGRAM} {...ext} className="block font-semibold hover:text-violet-600">@dra.paulabatistapintos</a><span className="text-muted">Instagram</span></span>
            </li>
          </ul>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <a href={waLink()} {...ext} className="btn"><WhatsAppIcon className="h-[18px] w-[18px]" />Escribime</a>
            <a href={MAPS_LINK} {...ext} className="inline-flex items-center rounded-full border border-line px-6 py-3.5 text-[15px] font-semibold transition-colors hover:bg-lav-50">Cómo llegar</a>
          </div>
        </div>
        <div className="reveal min-h-[320px] overflow-hidden rounded-[22px] bg-white lg:col-span-2 lg:min-h-[420px]">
          <iframe title="Mapa: Atanasio Sierra 612, Treinta y Tres" src={MAPS_EMBED} className="h-full min-h-[320px] w-full border-0 lg:min-h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-5 pb-28 pt-12 sm:px-8 lg:px-[60px] lg:pb-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Logo small />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink/75" aria-label="Pie de página">
          {NAV.map(([t, h]) => <a key={h} href={h} className="hover:text-violet-600">{t}</a>)}
        </nav>
        <div className="flex flex-wrap items-center gap-5 text-[14px] text-ink/75">
          <a href={waLink()} {...ext} className="flex items-center gap-2 hover:text-violet-600"><WhatsAppIcon className="h-4 w-4" />{PHONE_LABEL}</a>
          <a href={INSTAGRAM} {...ext} className="flex items-center gap-2 hover:text-violet-600"><Icon name="insta" className="h-4 w-4" />Instagram</a>
        </div>
      </div>
      <p className="mt-10 border-t border-line pt-6 text-[13px] text-muted">Dra. Paula Batista Pintos · Odontóloga · {ADDRESS_SHORT}</p>
    </footer>
  )
}

/* ---------- WhatsApp siempre visible ---------- */

// Mobile: barra fija que recuerda el último servicio tocado. Desktop: botón flotante al pasar el hero.
function StickyWhatsApp({ picked, onClear }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 520)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
        {picked && (
          <div className="mb-2 flex items-center justify-between gap-3 text-[13px] text-muted">
            <span className="truncate">Consulta por: <b className="font-semibold text-ink">{picked.label}</b></span>
            <button type="button" onClick={onClear} className="shrink-0 rounded-full px-2 py-1 font-medium text-violet-600">Quitar</button>
          </div>
        )}
        <a href={waLink(picked?.msg)} {...ext} className="btn w-full">
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          {picked ? 'Escribime por WhatsApp' : 'Agendá por WhatsApp'}
        </a>
      </div>
      <a
        href={waLink(picked?.msg)}
        {...ext}
        className={`btn fixed bottom-6 right-6 z-50 hidden shadow-[0_12px_30px_-10px_rgba(74,52,120,.6)] transition-[opacity,transform] duration-200 lg:inline-flex ${show ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" />
        {picked ? `Consultar: ${picked.label}` : 'Agendá por WhatsApp'}
      </a>
    </>
  )
}

export default function App() {
  const [picked, setPicked] = useState(null)
  useReveal()
  return (
    <div className="mx-auto max-w-[1400px] px-2 pt-2 sm:px-4 sm:pt-4 lg:px-5 lg:pt-5">
      <main>
        <Hero />
        <Benefits />
        <Services onPick={setPicked} />
        <Reviews />
        <Location />
      </main>
      <Footer />
      <StickyWhatsApp picked={picked} onClear={() => setPicked(null)} />
    </div>
  )
}

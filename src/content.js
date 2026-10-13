export const PHONE = '59891354508'
export const PHONE_LABEL = '+598 91 354 508'
export const INSTAGRAM = 'https://www.instagram.com/dra.paulabatistapintos/'
export const ADDRESS_SHORT = 'Atanasio Sierra 612, Treinta y Tres'
const Q = encodeURIComponent('Atanasio Sierra 612, Treinta y Tres, Uruguay')
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${Q}`
export const MAPS_EMBED = `https://www.google.com/maps?q=${Q}&z=16&output=embed`
export const REVIEWS_LINK = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Dra. Paula Batista Pintos odontóloga Treinta y Tres')

export const GENERAL_MSG = 'Hola Dra. Paula, quería agendar una consulta.'
export const waLink = (msg = GENERAL_MSG) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`

const msg = (s) => `Hola Dra. Paula, quería consultar por ${s}.`

export const BENEFITS = [
  { icon: 'chat', title: 'Te explico todo', text: 'Te cuento qué veo y qué opciones tenés, con palabras simples. Podés preguntar todo lo que quieras.' },
  { icon: 'check', title: 'Solo lo que necesitás', text: 'Te recomiendo lo que realmente hace falta, ni más ni menos.' },
  { icon: 'heart', title: 'Sin retos', text: 'No importa cuánto tiempo hace que no vas al dentista. No te voy a retar: arrancamos desde donde estás.' },
  { icon: 'calendar', title: 'Con hora y también urgencias', text: 'Coordinamos el día y la hora por WhatsApp. Si es una urgencia, escribime y te busco un lugar.' },
]

// Mismo formato que las tarjetas de la referencia (foto + lista). En lugar de precios, cada fila abre WhatsApp.
export const SERVICE_GROUPS = [
  {
    title: 'Prevención y diagnóstico',
    img: 'srv-prevencion',
    widths: [400, 800],
    alt: 'Espejo e instrumental odontológico',
    items: [
      { label: 'Consulta de diagnóstico', msg: msg('una consulta de diagnóstico') },
      { label: 'Limpieza y control de sarro', msg: msg('una limpieza y control de sarro') },
      { label: 'Tratamiento de encías', msg: msg('un tratamiento de encías') },
    ],
  },
  {
    title: 'Estética dental',
    img: 'srv-estetica',
    widths: [400, 800],
    alt: 'Primer plano de una sonrisa',
    items: [
      { label: 'Blanqueamiento', msg: msg('blanqueamiento') },
      { label: 'Manchas blancas con ICON', note: 'mínimamente invasivo', msg: msg('el tratamiento de manchas blancas con ICON') },
    ],
  },
  {
    title: 'Reposición y urgencias',
    img: 'srv-rehab',
    widths: [400, 736],
    alt: 'Mujer adulta sonriendo',
    items: [
      { label: 'Reposición de piezas', msg: msg('reposición de piezas') },
      { label: 'Prótesis', msg: msg('prótesis') },
      { label: 'Urgencias', msg: 'Hola Dra. Paula, tengo una urgencia dental. ¿Me podrías atender?' },
    ],
  },
]

export const REVIEWS = [
  {
    name: 'Ana Nuñez',
    text: 'Tanto mi hijo como yo nos atendemos con ella. Es muy profesional, honesta y sincera; explica las cosas con claridad y te recomienda lo que realmente necesitás.',
  },
  {
    name: 'Gimena Martinez',
    text: 'Explica todo con claridad y hace que uno se sienta cómodo y seguro durante la consulta. El consultorio es impecable y la atención fue puntual.',
  },
  {
    name: 'Valentina Rodriguez',
    text: 'Cada vez que voy es súper profesional y dedicada. Siempre se hace un espacio para atenderme.',
  },
  { name: 'Karen Gravi', text: 'Excelente y cálida atención!' },
]

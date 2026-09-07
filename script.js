/*
 * RAVO — public marketing site.
 *
 * No framework, no build step, no network calls. Everything on this page is local to the tab: the
 * two demos compute nothing on a server, store nothing, and send nothing. The site ships no database
 * client and no auth route at all — it is a page about the product, not the product.
 */

const root = document.documentElement
const reduced = matchMedia('(prefers-reduced-motion: reduce)')
let motionOff = reduced.matches

/* ── retire the former app deployment ──────────────────────────────────────────────────────────
   ravoapp.app once served the installable pilot PWA. A visitor who installed it still has that
   service worker and its caches, which would otherwise keep serving the old application shell over
   this page for ever. Unregister on first paint. */
async function retirePreviousSiteWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations
      .filter(registration => new URL(registration.scope).origin === location.origin)
      .map(registration => registration.unregister()))
  }
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
  }
  const url = new URL(location.href)
  if (url.searchParams.delete('ravo-site')) history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}
void retirePreviousSiteWorker()

/* ── language ──────────────────────────────────────────────────────────────────────────────── */

const RAIL = {
  he: ['משימות', 'קניות', 'יומן', 'מטבח', 'חשבונות', 'שגרות', 'ספקים', 'תחזוקה'],
  en: ['Tasks', 'Shopping', 'Calendar', 'Kitchen', 'Bills', 'Routines', 'Vendors', 'Maintenance']
}

/* Screen names carry their own alt text, so switching language switches what a screen reader is
   told as well as which screenshot is shown. */
const SCREENS = {
  today: { he: 'מסך היום של RAVO', en: 'The RAVO Today screen' },
  tasks: { he: 'מסך המשימות של RAVO', en: 'The RAVO Tasks screen' },
  shopping: { he: 'מסך הקניות של RAVO', en: 'The RAVO Shopping screen' },
  calendar: { he: 'מסך היומן של RAVO', en: 'The RAVO Calendar screen' },
  money: { he: 'מסך החשבונות של RAVO', en: 'The RAVO Bills screen' },
  templates: { he: 'מסך השגרות של RAVO', en: 'The RAVO Routines screen' },
  household: { he: 'מסך בני הבית של RAVO', en: 'The RAVO Household screen' },
  'quick-add': { he: 'מסך ההוספה המהירה של RAVO', en: 'The RAVO Quick Add screen' },
  office: { he: 'מסך היום במשרד של RAVO Office', en: 'The RAVO Office Today screen' },
  maintenance: { he: 'מסך התחזוקה של RAVO Office', en: 'The RAVO Office Maintenance screen' }
}

const PIN_LABEL = {
  today: { he: 'היום', en: 'Today' }, tasks: { he: 'משימות', en: 'Tasks' },
  shopping: { he: 'קניות', en: 'Shopping' }, calendar: { he: 'יומן', en: 'Calendar' },
  money: { he: 'חשבונות', en: 'Bills' }, templates: { he: 'שגרות', en: 'Routines' }
}

/*
 * The Quick Capture demo, written against what the real reader actually does.
 *
 * A Hebrew line is understood end to end: the destination is chosen, and the date, time and subject
 * come out of the sentence. An English line is not — the date and time are read, and the person
 * picks where it goes. Saying anything warmer than that in English would be selling a feature that
 * does not exist, so the English panel asks the question instead of answering it.
 */
const CAPTURE = {
  he: {
    text: 'מחר ב־18:00 לקנות חלב',
    head: 'נקלט לרשימת הקניות',
    chips: [['מתי', 'מחר'], ['שעה', '18:00'], ['לאן', 'קניות']]
  },
  en: {
    text: 'Buy milk 8/9 at 18:00',
    head: 'Date and time picked up',
    chips: [['When', '8 Sep'], ['Time', '18:00'], ['Where', 'You choose']]
  }
}

const langSwitch = document.querySelector('[data-lang-switch]')
let language = localStorage.getItem('ravo-marketing-language') === 'en' ? 'en' : 'he'

function applyLanguage(next) {
  language = next
  const english = next === 'en'
  root.lang = english ? 'en' : 'he'
  root.dir = english ? 'ltr' : 'rtl'

  for (const element of document.querySelectorAll('[data-he][data-en]')) {
    const value = element.dataset[english ? 'en' : 'he']
    if (value.includes('<')) element.innerHTML = value
    else element.textContent = value
  }

  for (const image of document.querySelectorAll('[data-screen-src]')) {
    const name = image.dataset.screenSrc
    image.src = `assets/screens/${next}/${name}.webp`
    image.alt = SCREENS[name][next]
  }

  langSwitch.textContent = english ? 'עברית' : 'EN'
  langSwitch.setAttribute('aria-label', english ? 'החלפה לעברית' : 'Switch to English')
  document.querySelector('[data-menu-toggle]')?.setAttribute('aria-label', english ? 'Menu' : 'תפריט')

  const track = document.querySelector('.rail-track')
  const items = RAIL[next]
  // Twice through, so the marquee can loop on a -50% translate without a visible seam.
  track.innerHTML = [...items, ...items].map(item => `<span>${item}</span><i>●</i>`).join('')

  paintPinLabel(currentScreen)
  startTyping()
  localStorage.setItem('ravo-marketing-language', next)
}

langSwitch.addEventListener('click', () => applyLanguage(language === 'he' ? 'en' : 'he'))

/* ── mobile navigation ─────────────────────────────────────────────────────────────────────── */

const menuToggle = document.querySelector('[data-menu-toggle]')
const nav = document.getElementById('site-nav')
const setMenu = open => {
  nav.classList.toggle('open', open)
  menuToggle.setAttribute('aria-expanded', String(open))
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'))
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false) })
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false) })
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) setMenu(false)
})

/* ── header state + year ───────────────────────────────────────────────────────────────────── */

const header = document.querySelector('.site-header')
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40), { passive: true })
document.querySelector('[data-year]').textContent = new Date().getFullYear()

/* ── reveal on scroll ──────────────────────────────────────────────────────────────────────── */

const reveals = document.querySelectorAll('.reveal')
if (motionOff) reveals.forEach(element => element.classList.add('visible'))
else {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('visible')
      observer.unobserve(entry.target)
    }
  }, { threshold: .1, rootMargin: '0px 0px -8% 0px' })
  reveals.forEach(element => observer.observe(element))
}

/* ── hero: chaos, then calm ────────────────────────────────────────────────────────────────────
   The scattered household signals appear where they are carried — loose, unaligned, all at once —
   and then settle into an arc beneath the product. It is the page's argument, made before the
   first paragraph is read. With reduced motion they simply start settled. */

const signals = document.querySelector('[data-signals]')
if (signals) {
  ;[...signals.children].forEach((item, index) => item.style.setProperty('--i', index))
  // `shown` runs the whole choreography from one keyframe animation; `settled` is the finished
  // state on its own, for a visitor who asked not to be moved.
  if (motionOff) signals.classList.add('settled')
  else setTimeout(() => signals.classList.add('shown'), 240)
}

const stage = document.querySelector('[data-tilt]')
if (stage) addEventListener('pointermove', event => {
  if (motionOff) return
  stage.style.setProperty('--mx', ((event.clientX / innerWidth) - .5).toFixed(3))
  stage.style.setProperty('--my', ((event.clientY / innerHeight) - .5).toFixed(3))
}, { passive: true })

/* ── the scroll-driven product story ───────────────────────────────────────────────────────────
   The device stays pinned while the writing moves past it; each step swaps the screen behind the
   same frame. Below the tablet breakpoint the pin is not rendered at all and each step carries its
   own device, so the sequence still reads as a sequence on a phone. */

const steps = document.querySelectorAll('.step')
const pinScreens = document.querySelectorAll('[data-pin]')
const ticks = document.querySelectorAll('.pin-ticks li')
const pinLabel = document.querySelector('[data-pin-label]')
let currentScreen = 'today'

function paintPinLabel(name) {
  if (pinLabel) pinLabel.textContent = (PIN_LABEL[name] ?? PIN_LABEL.today)[language]
}

function showScreen(name, index) {
  currentScreen = name
  steps.forEach((step, position) => step.classList.toggle('active', position === index))
  pinScreens.forEach(screen => screen.classList.toggle('is-on', screen.dataset.pin === name))
  ticks.forEach((tick, position) => tick.classList.toggle('on', position === index))
  paintPinLabel(name)
}

if (steps.length) {
  showScreen(steps[0].dataset.screen, 0)
  const stepObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      showScreen(entry.target.dataset.screen, [...steps].indexOf(entry.target))
    }
  }, { threshold: .3, rootMargin: '-22% 0px -40% 0px' })
  steps.forEach(step => stepObserver.observe(step))
}

/* ── shared responsibility ─────────────────────────────────────────────────────────────────── */

const handover = document.querySelector('[data-handover]')
if (handover) {
  if (motionOff) handover.classList.add('moved')
  else {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        setTimeout(() => handover.classList.add('moved'), 700)
        observer.disconnect()
      }
    }, { threshold: .4 })
    observer.observe(handover)
  }
}

const tasks = document.querySelectorAll('.demo-task')
const progress = document.querySelector('.progress i')
const toast = document.querySelector('.demo-toast')
let toastTimer

function paintProgress() {
  const done = [...tasks].filter(task => task.getAttribute('aria-pressed') === 'true').length
  if (progress) progress.style.width = `${Math.max(8, Math.round(done / tasks.length * 100))}%`
}
for (const task of tasks) task.addEventListener('click', () => {
  const next = task.getAttribute('aria-pressed') !== 'true'
  task.setAttribute('aria-pressed', String(next))
  paintProgress()
  if (!next || !toast) return
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400)
})
paintProgress()

/* ── quick capture ─────────────────────────────────────────────────────────────────────────── */

const field = document.querySelector('[data-capture-text]')
const result = document.querySelector('[data-capture-result]')
let typingTimer

function paintResult(script) {
  result.querySelector('.result-head span:last-child').textContent = script.head
  result.querySelector('.chips').innerHTML = script.chips
    .map(([label, value]) => `<li><small>${label}</small><strong>${value}</strong></li>`).join('')
}

function startTyping() {
  if (!field) return
  clearTimeout(typingTimer)
  const script = CAPTURE[language]
  paintResult(script)
  result.setAttribute('aria-hidden', 'true')
  result.classList.remove('show')

  if (motionOff) {
    field.textContent = script.text
    result.setAttribute('aria-hidden', 'false')
    result.classList.add('show')
    return
  }

  let index = 0
  const tick = () => {
    field.textContent = script.text.slice(0, index++)
    if (index <= script.text.length) { typingTimer = setTimeout(tick, 62); return }
    // A beat while it is read, then the panel resolves — the same order the product does it in.
    typingTimer = setTimeout(() => {
      result.setAttribute('aria-hidden', 'false')
      result.classList.add('show')
      typingTimer = setTimeout(startTyping, 4200)
    }, 380)
  }
  tick()
}

/* A visitor who turns reduced motion on mid-visit gets the settled state, not a frozen half-state. */
reduced.addEventListener('change', event => {
  motionOff = event.matches
  if (!motionOff) return
  signals?.classList.add('settled')
  handover?.classList.add('moved')
  reveals.forEach(element => element.classList.add('visible'))
  startTyping()
})

applyLanguage(language)

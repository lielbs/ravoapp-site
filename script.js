/*
 * RAVO — public website.
 *
 * No framework and no network calls. The Quick Add box runs the app's own reader in the browser
 * and nothing typed into it leaves the device. Motion is driven by class changes so the CSS owns
 * the timing, and everything respects prefers-reduced-motion.
 */

const root = document.documentElement
const COPY = window.RAVO_COPY ?? { en: {}, scenes: {} }
const SCENES = COPY.scenes ?? {}
const reduced = matchMedia('(prefers-reduced-motion: reduce)')
const still = () => reduced.matches
const $ = (selector, scope = document) => scope.querySelector(selector)
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]
const el = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
}
const icon = name => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  use.setAttribute('href', `#${name}`)
  svg.append(use)
  return svg
}

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
void retirePreviousSiteWorker().catch(() => {})

/* ── language ──────────────────────────────────────────────────────────────────────────────── */

const LANGUAGE_KEY = 'ravo-marketing-language'
let language = (() => { try { return localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'he' } catch { return 'he' } })()
const hebrew = {}, hebrewAria = {}
for (const node of $$('[data-i18n]')) hebrew[node.dataset.i18n] = node.innerHTML
for (const node of $$('[data-i18n-aria]')) hebrewAria[node.dataset.i18nAria] = node.getAttribute('aria-label')
const pick = value => value?.[language] ?? value?.he ?? ''
const painters = []

function applyLanguage(next) {
  language = next
  const english = next === 'en'
  root.lang = english ? 'en' : 'he'
  root.dir = english ? 'ltr' : 'rtl'
  for (const node of $$('[data-i18n]')) {
    const value = english ? COPY.en?.[node.dataset.i18n] : hebrew[node.dataset.i18n]
    if (value !== undefined) node.innerHTML = value
  }
  for (const node of $$('[data-i18n-aria]')) {
    const value = english ? COPY.en?.[node.dataset.i18nAria] : hebrewAria[node.dataset.i18nAria]
    if (value) node.setAttribute('aria-label', value)
  }
  for (const image of $$('[data-screen-src]')) image.src = `assets/screens/${next}/${image.dataset.screenSrc}.webp`
  const toggle = $('[data-lang-switch]')
  toggle.textContent = english ? 'עברית' : 'EN'
  toggle.setAttribute('aria-label', english ? 'החלפה לעברית' : 'Switch to English')
  $('[data-menu-toggle]').setAttribute('aria-label', english ? 'Menu' : 'תפריט')
  for (const paint of painters) paint()
  try { localStorage.setItem(LANGUAGE_KEY, next) } catch { /* private mode: the choice lasts this visit */ }
}
$('[data-lang-switch]').addEventListener('click', () => applyLanguage(language === 'he' ? 'en' : 'he'))

/* ── chrome: header, menu, reveal, download bar ────────────────────────────────────────────── */

const header = $('[data-header]')
const onScroll = () => header.classList.toggle('scrolled', scrollY > 10)
addEventListener('scroll', onScroll, { passive: true })
onScroll()

const menuToggle = $('[data-menu-toggle]')
const nav = $('#site-nav')
const setMenu = open => { nav.classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)) }
menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')))
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false) })
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false) })
document.addEventListener('click', event => { if (nav.classList.contains('open') && !event.target.closest('.site-header')) setMenu(false) })

const revealWatch = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); revealWatch.unobserve(entry.target) }
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
$$('.reveal').forEach(node => revealWatch.observe(node))

const sticky = $('[data-sticky-cta]')
let heroGone = false, finaleHere = false
const paintSticky = () => sticky.classList.toggle('show', heroGone && !finaleHere)
new IntersectionObserver(([entry]) => { heroGone = !entry.isIntersecting; paintSticky() }).observe($('.hero .cta-row'))
new IntersectionObserver(([entry]) => { finaleHere = entry.isIntersecting; paintSticky() }).observe($('.finale'))

$('[data-year]').textContent = String(new Date().getFullYear())

function whileVisible(node, start, stop, threshold = 0.2) {
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold }).observe(node)
}

/* ── hero: the phone cycles through real screens, each with the notification it belongs to ── */

const heroScreens = $$('[data-hero-phone] img')
let heroIndex = 0, heroTimer = 0, officeIndex = 0
const pings = $('[data-pings]')
const backPhone = () => getComputedStyle($('.phone--back')).display !== 'none'
/* One slot per phone: the front phone's notification sits beside it, the back phone's over it. */
function showPing(slot, entry, space) {
  const old = $(`li[data-slot="${slot}"]`, pings)
  if (old) { old.classList.add('out'); setTimeout(() => old.remove(), 450) }
  if (!entry) return
  const row = el('li')
  row.dataset.slot = slot; row.dataset.space = space
  const logo = el('img'); logo.src = 'logo.svg'; logo.alt = ''; logo.width = 30; logo.height = 30
  const [title, body] = pick(entry)
  row.append(logo, el('b', '', title), el('span', '', body))
  pings.append(row)
  requestAnimationFrame(() => requestAnimationFrame(() => row.classList.add('in')))
}
const frontPing = () => showPing('front', SCENES.hero?.[heroScreens[heroIndex].dataset.screenSrc], 'home')
const officePings = () => SCENES.hero?.office ?? []
const backPing = () => { if (backPhone()) showPing('back', officePings()[officeIndex % officePings().length], 'biz') }
function heroTick() {
  heroScreens[heroIndex].classList.remove('is-on')
  heroIndex = (heroIndex + 1) % heroScreens.length
  heroScreens[heroIndex].classList.add('is-on')
  $('li[data-slot="front"]', pings)?.classList.add('out')
  /* The screen changes first and its notification follows, so the two read as one event. */
  setTimeout(frontPing, 420)
  officeIndex += 1
  setTimeout(backPing, 1700)
}
painters.push(() => { pings.replaceChildren(); frontPing(); backPing() })
whileVisible($('.hero'), () => {
  if (!still() && !heroTimer) heroTimer = setInterval(heroTick, 3400)
}, () => { clearInterval(heroTimer); heroTimer = 0 }, 0.15)

/* ── Quick Add: the app's own reader, in the browser ───────────────────────────────────────── */

const tryBox = $('[data-try]')
const tryInput = $('[data-try-input]')
const tryResult = $('[data-try-result]')
const tryExamples = $('[data-try-examples]')
const trySeg = $('.seg', tryBox)
let trySpace = 'home'
let reader = null
const labels = () => SCENES.labels ?? {}
const formatDay = iso => new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'he-IL', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00`))
function renderReading() {
  const text = tryInput.value.trim()
  tryResult.replaceChildren()
  for (const button of $$('button', tryExamples)) button.setAttribute('aria-pressed', String(button.textContent === tryInput.value))
  if (!text) { tryResult.append(el('p', 'try-empty', pick(labels().empty))); return }
  if (!reader) return
  const reading = reader.parseCapture(text, trySpace)
  const kinds = SCENES.kinds ?? {}
  const L = labels()
  const sure = reading.kind !== 'unknown' && reading.confidence >= (reader.CONFIRM_THRESHOLD ?? 0.7)
  const card = el('div', 'try-card')
  const head = el('div', 'try-card__head')
  if (sure) { const kind = el('span', 'try-kind', pick(kinds[reading.kind])); kind.dataset.kind = reading.kind; head.append(kind) }
  head.append(el('span', 'try-card__read', pick(L.read)))
  card.append(head, el('h3', '', reading.fields.title || text))
  const facts = el('ul', 'try-chips')
  const add = (label, value) => {
    const item = el('li'); item.style.setProperty('--i', facts.children.length)
    item.append(el('b', '', label), document.createTextNode(value)); facts.append(item)
  }
  const f = reading.fields
  if (f.date) add(pick(L.when), formatDay(f.date))
  if (f.time) add(pick(L.time), f.endTime ? `${f.time}–${f.endTime}` : f.time)
  if (f.amount) add(pick(L.amount), `₪${f.amount.toLocaleString(language === 'en' ? 'en-GB' : 'he-IL')}`)
  if (f.items?.length > 1) add(pick(L.items), f.items.join(' · '))
  if (f.quantity) add(pick(L.qty), String(f.quantity))
  if (f.assigneeText) add(pick(L.owner), f.assigneeText)
  if (f.recurrence && L.repeat?.[f.recurrence]) add(pick(L.repeats), pick(L.repeat[f.recurrence]))
  if (f.urgent) add('!', pick(L.urgent))
  if (facts.children.length) card.append(facts)
  if (sure) card.append(el('p', 'try-confirm', pick(L.confirm)))
  else {
    card.append(el('p', 'try-confirm', pick(L.unsure)))
    const options = el('ul', 'try-options')
    const choices = [...new Set([reading.kind, ...reading.alternatives].filter(kind => kind && kind !== 'unknown'))]
    const fallback = trySpace === 'office' ? ['task', 'procurement', 'maintenance'] : ['task', 'shopping', 'calendar_event']
    for (const kind of choices.length ? choices : fallback) options.append(el('li', '', pick(kinds[kind])))
    card.append(options)
  }
  tryResult.append(card)
}
function paintExamples() {
  tryExamples.replaceChildren()
  for (const example of SCENES.examples?.[trySpace] ?? []) {
    const button = el('button', '', example)
    button.type = 'button'
    button.addEventListener('click', () => { tryInput.value = example; renderReading() })
    tryExamples.append(button)
  }
}
function setTrySpace(space) {
  trySpace = space
  trySeg.dataset.at = space === 'office' ? '1' : '0'
  for (const button of $$('[data-space]', tryBox)) button.setAttribute('aria-checked', String(button.dataset.space === space))
  tryInput.value = SCENES.examples?.[space]?.[0] ?? ''
  paintExamples()
  renderReading()
}
for (const button of $$('[data-space]', tryBox)) button.addEventListener('click', () => setTrySpace(button.dataset.space))
tryInput.addEventListener('input', renderReading)
painters.push(() => { paintExamples(); renderReading() })
setTrySpace('home')
import('./assets/capture.js').then(module => { reader = module; renderReading() }).catch(() => {})

/* ── the assistant, interactive ────────────────────────────────────────────────────────────── */

const assist = $('[data-assist]')
const assistScreen = $('.demo-screen', assist)
const assistList = $('[data-assist-list]')
const assistSheet = $('[data-assist-sheet]')
const assistToast = $('[data-assist-toast]')
const assistDone = $('[data-assist-done]')
let assistOpen = null, toastTimer = 0
let assistLeft = []
const TONES = { danger: ['#ef8f86', 'rgba(239,143,134,.15)'], warning: ['#e8c174', 'rgba(232,193,116,.15)'], mint: ['#8fd3bd', 'rgba(143,211,189,.15)'] }
function toast(text) {
  assistToast.textContent = text
  assistToast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => assistToast.classList.remove('show'), 1900)
}
function closeSheet() {
  assistSheet.classList.remove('open')
  assistSheet.setAttribute('aria-hidden', 'true')
  assistScreen.classList.remove('dim')
  assistOpen = null
}
function resolve(id, message) {
  closeSheet()
  const row = $(`[data-id="${id}"]`, assistList)
  assistLeft = assistLeft.filter(item => item !== id)
  if (row) { row.classList.add('leaving'); setTimeout(() => row.remove(), 520) }
  toast(message)
  if (!assistLeft.length) setTimeout(() => { assistDone.hidden = false }, 650)
}
function openSheet(item) {
  assistOpen = item
  $('[data-assist-title]').textContent = pick(item.title)
  const chips = $('[data-assist-chips]')
  chips.replaceChildren()
  for (const choice of SCENES.assistant?.dates ?? []) {
    const button = el('button', '', pick(choice))
    button.type = 'button'
    button.addEventListener('click', () => resolve(item.id, `✓ ${pick(SCENES.assistant.scheduled)} ${pick(choice)}`))
    chips.append(button)
  }
  assistScreen.classList.add('dim')
  assistSheet.classList.add('open')
  assistSheet.setAttribute('aria-hidden', 'false')
  $('button', chips)?.focus({ preventScroll: true })
}
function paintAssistant() {
  closeSheet()
  assistList.replaceChildren()
  assistDone.hidden = true
  const items = SCENES.assistant?.items ?? []
  assistLeft = items.map(item => item.id)
  items.forEach((item, index) => {
    const row = el('button', 'demo-row')
    row.type = 'button'
    row.dataset.id = item.id
    const [tone, soft] = TONES[item.tone] ?? TONES.warning
    row.style.setProperty('--tone', tone); row.style.setProperty('--tone-soft', soft)
    const ico = el('span', 'ico'); ico.append(icon(item.icon))
    row.append(ico, el('b', '', pick(item.title)), el('small', '', pick(item.hint)), icon('i-chev'))
    if (index === 0 && !still()) row.classList.add('hint')
    row.addEventListener('click', () => openSheet(item))
    assistList.append(row)
  })
}
$('[data-assist-complete]').addEventListener('click', () => assistOpen && resolve(assistOpen.id, `✓ ${pick(SCENES.assistant.completed)}`))
$('[data-assist-later]').addEventListener('click', () => assistOpen && resolve(assistOpen.id, pick(SCENES.assistant.later)))
$('[data-assist-reset]').addEventListener('click', paintAssistant)
assistScreen.addEventListener('click', event => { if (assistOpen && !event.target.closest('[data-assist-sheet]') && !event.target.closest('.demo-row')) closeSheet() })
painters.push(paintAssistant)

/* ── Home or Business ──────────────────────────────────────────────────────────────────────── */

const spaces = $('[data-spaces]')
const spacesSeg = $('.seg', spaces)
const spacesCopy = $('[data-spaces-copy]')
const spacesScreen = $('[data-spaces-screen]')
let spacesTab = 'home'
function fillSpaces() {
  const data = SCENES.spaces?.[spacesTab]
  if (!data) return
  spacesCopy.replaceChildren()
  spacesCopy.append(el('span', 'tag', spacesTab === 'home' ? 'RAVO Home' : 'RAVO Business'), el('h3', '', pick(data.title)), el('p', '', pick(data.lede)))
  const list = el('ul')
  for (const line of pick(data.features)) list.append(el('li', '', line))
  spacesCopy.append(list)
  spacesScreen.src = `assets/screens/${language}/${data.screen}.webp`
  spacesScreen.alt = pick(data.alt)
}
function setSpacesTab(tab, animate = true) {
  spacesTab = tab
  spaces.dataset.at = tab === 'biz' ? '1' : '0'
  spacesSeg.dataset.at = spaces.dataset.at
  for (const button of $$('[data-tab]', spaces)) button.setAttribute('aria-selected', String(button.dataset.tab === tab))
  if (!animate || still()) { fillSpaces(); return }
  spacesCopy.classList.add('swap'); spacesScreen.classList.add('swap')
  setTimeout(() => {
    fillSpaces()
    const show = () => { spacesCopy.classList.remove('swap'); spacesScreen.classList.remove('swap') }
    if (spacesScreen.complete) requestAnimationFrame(show)
    else { spacesScreen.addEventListener('load', show, { once: true }); spacesScreen.addEventListener('error', show, { once: true }) }
  }, 260)
}
for (const button of $$('[data-tab]', spaces)) button.addEventListener('click', () => setSpacesTab(button.dataset.tab))
painters.push(() => setSpacesTab(spacesTab, false))

/* ── tour: real screens, swipeable ─────────────────────────────────────────────────────────── */

const tourTrack = $('[data-tour-track]')
function paintTour() {
  tourTrack.replaceChildren()
  for (const item of SCENES.tour ?? []) {
    const card = el('li', 'tour-card')
    card.dataset.space = item.space
    const phone = el('div', 'phone')
    const image = el('img')
    image.src = `assets/screens/${language}/${item.screen}.webp`; image.alt = pick(item.title); image.loading = 'lazy'; image.width = 720; image.height = 1560
    phone.append(image)
    const text = el('div')
    text.append(el('span', 'space', item.space === 'biz' ? 'RAVO Business' : 'RAVO Home'), el('b', '', pick(item.title)), el('p', '', pick(item.line)))
    card.append(phone, text)
    tourTrack.append(card)
  }
}
const tourStep = direction => {
  const card = $('.tour-card', tourTrack)
  if (!card) return
  const distance = (card.getBoundingClientRect().width + 16) * direction * (language === 'he' ? -1 : 1)
  tourTrack.scrollBy({ left: distance, behavior: still() ? 'auto' : 'smooth' })
}
$('[data-tour-prev]').addEventListener('click', () => tourStep(-1))
$('[data-tour-next]').addEventListener('click', () => tourStep(1))
painters.push(paintTour)

/* ── start ─────────────────────────────────────────────────────────────────────────────────── */

if (language === 'en') applyLanguage('en')
else for (const paint of painters) paint()

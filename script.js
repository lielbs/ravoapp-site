/*
 * RAVO — public website.
 *
 * Deliberately small: the language switch, the phone menu, the Quick Add box and a short fade as
 * sections arrive. Nothing moves by itself. No framework and no network calls — the Quick Add box
 * runs the app's own reader in the browser, and nothing typed into it leaves the device.
 */

const root = document.documentElement
const COPY = window.RAVO_COPY ?? { en: {}, scenes: {} }
const SCENES = COPY.scenes
const $ = (selector, scope = document) => scope.querySelector(selector)
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]
const el = (tag, className, text) => {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text !== undefined) node.textContent = text
  return node
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
/* The Hebrew lives in the page itself; read it once so switching back restores it exactly. */
const hebrew = {}, hebrewAria = {}
for (const node of $$('[data-i18n]')) hebrew[node.dataset.i18n] = node.innerHTML
for (const node of $$('[data-i18n-aria]')) hebrewAria[node.dataset.i18nAria] = node.getAttribute('aria-label')
const pick = value => value?.[language] ?? value?.he ?? ''

function applyLanguage(next) {
  language = next
  const english = next === 'en'
  root.lang = english ? 'en' : 'he'
  root.dir = english ? 'ltr' : 'rtl'
  for (const node of $$('[data-i18n]')) {
    const value = english ? COPY.en[node.dataset.i18n] : hebrew[node.dataset.i18n]
    if (value !== undefined) node.innerHTML = value
  }
  for (const node of $$('[data-i18n-aria]')) {
    const value = english ? COPY.en[node.dataset.i18nAria] : hebrewAria[node.dataset.i18nAria]
    if (value) node.setAttribute('aria-label', value)
  }
  for (const image of $$('[data-screen-src]')) {
    const name = image.dataset.screenSrc
    image.src = `assets/screens/${next}/${name}.webp`
    if (SCENES.screens?.[name]) image.alt = SCENES.screens[name][next]
  }
  const toggle = $('[data-lang-switch]')
  toggle.textContent = english ? 'עברית' : 'EN'
  toggle.setAttribute('aria-label', english ? 'החלפה לעברית' : 'Switch to English')
  $('[data-menu-toggle]').setAttribute('aria-label', english ? 'Menu' : 'תפריט')
  paintExamples()
  renderReading()
  try { localStorage.setItem(LANGUAGE_KEY, next) } catch { /* private mode: the choice lasts this visit */ }
}
$('[data-lang-switch]').addEventListener('click', () => applyLanguage(language === 'he' ? 'en' : 'he'))

/* ── header, phone menu, reveal, download bar ──────────────────────────────────────────────── */

const header = $('.site-header')
const onScroll = () => header.classList.toggle('scrolled', scrollY > 8)
addEventListener('scroll', onScroll, { passive: true })
onScroll()

const menuToggle = $('[data-menu-toggle]')
const nav = $('#site-nav')
const setMenu = open => { nav.classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)) }
menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')))
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false) })
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false) })

const revealWatch = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); revealWatch.unobserve(entry.target) }
}, { rootMargin: '0px 0px -6% 0px' })
$$('.reveal').forEach(node => revealWatch.observe(node))

/* On a phone the download button follows once the hero's own has scrolled away, and steps aside
   at the closing section, which has its own. */
const sticky = $('[data-sticky-cta]')
let heroGone = false, finaleHere = false
const paintSticky = () => sticky.classList.toggle('show', heroGone && !finaleHere)
new IntersectionObserver(([entry]) => { heroGone = !entry.isIntersecting; paintSticky() }).observe($('.hero .cta-row'))
new IntersectionObserver(([entry]) => { finaleHere = entry.isIntersecting; paintSticky() }).observe($('.finale'))

$('[data-year]').textContent = String(new Date().getFullYear())

/* ── Quick Add: the app's own reader, in the browser ───────────────────────────────────────── */

const tryBox = $('[data-try]')
const tryInput = $('[data-try-input]')
const tryResult = $('[data-try-result]')
const tryExamples = $('[data-try-examples]')
let trySpace = 'home'
let reader = null
const labels = () => SCENES.labels ?? {}
const formatDay = iso => new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'he-IL', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00`))
function chip(list, label, value) {
  const item = el('li')
  item.append(el('b', '', `${label} `), document.createTextNode(value))
  list.append(item)
}
function renderReading() {
  const text = tryInput.value.trim()
  tryResult.replaceChildren()
  if (!text) { tryResult.append(el('p', 'try-empty', pick(labels().empty))); return }
  if (!reader) return
  const reading = reader.parseCapture(text, trySpace)
  const kinds = SCENES.kinds ?? {}
  const sure = reading.kind !== 'unknown' && reading.confidence >= (reader.CONFIRM_THRESHOLD ?? 0.7)
  const card = el('div', 'try-card')
  const head = el('div', 'try-card__head')
  if (sure) head.append(el('span', 'try-kind', pick(kinds[reading.kind])))
  head.append(el('span', 'try-card__read', pick(labels().read)))
  card.append(head, el('h3', '', reading.fields.title || text))
  const facts = el('ul', 'try-chips')
  const f = reading.fields
  const L = labels()
  if (f.date) chip(facts, pick(L.when), formatDay(f.date))
  if (f.time) chip(facts, pick(L.time), f.endTime ? `${f.time}–${f.endTime}` : f.time)
  if (f.amount) chip(facts, pick(L.amount), `₪${f.amount.toLocaleString(language === 'en' ? 'en-GB' : 'he-IL')}`)
  if (f.items?.length > 1) chip(facts, `${pick(L.items)}:`, f.items.join(' · '))
  if (f.quantity) chip(facts, pick(L.qty), String(f.quantity))
  if (f.assigneeText) chip(facts, pick(L.owner), f.assigneeText)
  if (f.recurrence && L.repeat?.[f.recurrence]) chip(facts, pick(L.repeats), pick(L.repeat[f.recurrence]))
  if (f.urgent) chip(facts, '', pick(L.urgent))
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
  tryExamples.setAttribute('aria-label', pick(labels().examples))
  for (const example of SCENES.examples?.[trySpace] ?? []) {
    const button = el('button', '', example)
    button.type = 'button'
    button.addEventListener('click', () => { tryInput.value = example; renderReading() })
    tryExamples.append(button)
  }
}
function setSpace(space) {
  trySpace = space
  for (const button of $$('[data-space]', tryBox)) button.setAttribute('aria-checked', String(button.dataset.space === space))
  tryInput.placeholder = SCENES.examples?.[space]?.[0] ?? ''
  tryInput.value = SCENES.examples?.[space]?.[0] ?? ''
  paintExamples()
  renderReading()
}
for (const button of $$('[data-space]', tryBox)) button.addEventListener('click', () => setSpace(button.dataset.space))
tryInput.addEventListener('input', renderReading)
setSpace('home')
import('./assets/capture.js').then(module => { reader = module; renderReading() }).catch(() => {})

if (language === 'en') applyLanguage('en')

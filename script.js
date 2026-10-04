/*
 * RAVO — public marketing site.
 *
 * No framework and no network calls. Everything on this page is local to the tab: the Quick Add box
 * runs the app's own reader in the browser, and nothing typed into it leaves the device. The site
 * ships no database client and no auth route — it is a page about the product, not the product.
 *
 * Words live in two places: the Hebrew in index.html, the English and every moving scene in
 * copy.js (`window.RAVO_COPY`). This file only decides what is shown when.
 */

const root = document.documentElement
const COPY = window.RAVO_COPY ?? { en: {}, scenes: {} }
const SCENES = COPY.scenes
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
const clamp = (value, low = 0, high = 1) => Math.min(high, Math.max(low, value))

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
const stored = (() => { try { return localStorage.getItem(LANGUAGE_KEY) } catch { return null } })()
let language = stored === 'en' ? 'en' : 'he'
/* The Hebrew of every key, read back out of the page before English first replaces it. */
const hebrew = {}
const hebrewAria = {}
for (const node of document.querySelectorAll('[data-i18n]')) hebrew[node.dataset.i18n] = node.innerHTML
for (const node of document.querySelectorAll('[data-i18n-aria]')) hebrewAria[node.dataset.i18nAria] = node.getAttribute('aria-label')
const pick = value => value?.[language] ?? value?.he ?? ''
const painters = []

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
    const alt = SCENES.screens?.[name]
    if (alt && image.alt) image.alt = alt[next]
  }
  const toggle = $('[data-lang-switch]')
  toggle.textContent = english ? 'עברית' : 'EN'
  toggle.setAttribute('aria-label', english ? 'החלפה לעברית' : 'Switch to English')
  $('[data-menu-toggle]')?.setAttribute('aria-label', english ? 'Menu' : 'תפריט')
  for (const paint of painters) paint()
  try { localStorage.setItem(LANGUAGE_KEY, next) } catch { /* private mode: the choice lasts this visit */ }
}
$('[data-lang-switch]').addEventListener('click', () => applyLanguage(language === 'he' ? 'en' : 'he'))

/* ── chrome: menu, header, reveal, sticky action, year ─────────────────────────────────────── */

const menuToggle = $('[data-menu-toggle]')
const nav = $('#site-nav')
const setMenu = open => { nav.classList.toggle('open', open); menuToggle.setAttribute('aria-expanded', String(open)) }
menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')))
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false) })
document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false) })

const header = $('.site-header')
const onScrollChrome = () => header.classList.toggle('scrolled', scrollY > 24)
addEventListener('scroll', onScrollChrome, { passive: true })
onScrollChrome()

/* The bar says where the visitor is: the link of the section on screen stays lit. */
const navLinks = $$('#site-nav a')
const sectionWatch = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue
    for (const link of navLinks) link.classList.toggle('current', link.hash === `#${entry.target.id}`)
  }
}, { rootMargin: '-45% 0px -50% 0px' })
for (const link of navLinks) {
  const section = document.getElementById(link.hash.slice(1))
  if (section) sectionWatch.observe(section)
}

const revealWatch = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); revealWatch.unobserve(entry.target) }
}, { rootMargin: '0px 0px -8% 0px' })
$$('.reveal').forEach(node => revealWatch.observe(node))

/* The phone-width download action appears once the hero's own badge has scrolled away, and steps
   aside at the finale, which has its own. */
const sticky = $('[data-sticky-cta]')
let heroGone = false, finaleHere = false
const paintSticky = () => sticky.classList.toggle('show', heroGone && !finaleHere)
new IntersectionObserver(([entry]) => { heroGone = !entry.isIntersecting; paintSticky() }).observe($('.hero .cta-row'))
new IntersectionObserver(([entry]) => { finaleHere = entry.isIntersecting; paintSticky() }).observe($('.finale'))

$('[data-year]').textContent = String(new Date().getFullYear())

/* Runs `start` while the element is on screen and `stop` when it leaves. */
function whileVisible(node, start, stop, threshold = 0.25) {
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold }).observe(node)
}

/* ── hero notifications ────────────────────────────────────────────────────────────────────── */

const toastList = $('[data-toasts]')
const SLOTS = [8, 41, 74]
let toastIndex = 0, toastTimer = 0
function notificationRow(entry) {
  const row = el('li')
  row.dataset.space = entry.space
  const icon = el('img'); icon.src = 'logo.svg'; icon.alt = ''; icon.width = 30; icon.height = 30
  const [title, body] = pick(entry)
  row.append(icon, el('b', '', title), el('span', '', body))
  return row
}
function pushToast() {
  const list = SCENES.toasts ?? []
  if (!list.length) return
  const row = notificationRow(list[toastIndex % list.length])
  toastIndex += 1
  toastList.append(row)
  const shown = [...toastList.children]
  while (shown.length > SLOTS.length) shown.shift().remove()
  shown.forEach((item, index) => {
    item.style.top = `${SLOTS[index]}%`
    item.style.transform = `translateX(${(index % 2 ? 1 : -1) * 18}%)`
  })
  requestAnimationFrame(() => requestAnimationFrame(() => row.classList.add('in')))
}
function paintToasts() {
  toastList.replaceChildren()
  const count = still() ? SLOTS.length : 1
  for (let index = 0; index < count; index += 1) pushToast()
}
painters.push(paintToasts)
whileVisible($('.hero'), () => {
  if (!still() && !toastTimer) toastTimer = setInterval(pushToast, 2600)
}, () => { clearInterval(toastTimer); toastTimer = 0 }, 0.1)

/* ── how it works: the mess, then the order ────────────────────────────────────────────────────
   Pinned and driven by the scroll position. Messages arrive scattered across both group chats;
   then each one leaves its bubble and lands in its space as a row with an owner and a date. */

const messTrack = $('[data-mess]')
const messItems = $('[data-mess-items]')
const messCount = $('[data-mess-count]')
const SCATTER = [[4, 2], [50, 6], [16, 22], [56, 30], [2, 44], [44, 50], [22, 64], [56, 70], [6, 84], [40, 88]]
let bubbles = [], rows = []
function paintMess() {
  messItems.replaceChildren()
  const slots = { home: $('[data-slots="home"]'), biz: $('[data-slots="biz"]') }
  slots.home.replaceChildren(); slots.biz.replaceChildren()
  bubbles = []; rows = []
  ;(SCENES.mess ?? []).forEach((item, index) => {
    const words = pick(item)
    const bubble = el('p', 'mess-bubble')
    bubble.dataset.space = item.space
    const [x, y] = SCATTER[index % SCATTER.length]
    bubble.style.setProperty('--x', `${x}%`)
    bubble.style.setProperty('--y', `${y}%`)
    bubble.style.setProperty('--r', `${index % 2 ? 1.5 : -1.5}deg`)
    bubble.append(el('small', '', words.from), el('span', '', words.msg))
    messItems.append(bubble)
    const row = el('li')
    row.append(el('b', '', words.row), el('span', '', words.meta))
    slots[item.space].append(row)
    bubbles.push({ node: bubble, space: item.space })
    rows.push(row)
  })
  paintMessProgress()
}
function messProgress() {
  if (still()) return 1
  const box = messTrack.getBoundingClientRect()
  return clamp(-box.top / Math.max(1, box.height - innerHeight))
}
function paintMessProgress() {
  const p = messProgress()
  messTrack.dataset.phase = p > 0.42 ? 'after' : 'before'
  messCount.textContent = String(Math.round(12 + 35 * clamp(p / 0.2)))
  const board = $('.mess-board').getBoundingClientRect()
  bubbles.forEach(({ node, space }, index) => {
    // Each item gets its own slice of the scroll, so they land one after another.
    const local = clamp((p - 0.22 - index * 0.055) / 0.16)
    const column = $(`[data-col="${space}"]`).getBoundingClientRect()
    const targetX = column.left + column.width / 2 - board.left - (node.offsetLeft + node.offsetWidth / 2)
    const targetY = column.top + column.height * 0.4 - board.top - (node.offsetTop + node.offsetHeight / 2)
    node.style.setProperty('--dx', `${targetX * local}px`)
    node.style.setProperty('--dy', `${targetY * local}px`)
    node.style.setProperty('--s', String(1 - 0.45 * local))
    node.style.setProperty('--o', String(1 - local))
    rows[index].style.setProperty('--o', String(clamp(local * 1.6 - 0.4)))
  })
}
painters.push(paintMess)
let messFrame = 0
addEventListener('scroll', () => {
  if (messFrame) return
  messFrame = requestAnimationFrame(() => { messFrame = 0; paintMessProgress() })
}, { passive: true })
addEventListener('resize', paintMessProgress)

/* ── quick add: the app's own reader, in the browser ───────────────────────────────────────── */

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
  const english = language === 'en'
  const f = reading.fields
  if (f.date) chip(facts, english ? 'When' : 'מתי', formatDay(f.date))
  if (f.time) chip(facts, english ? 'Time' : 'שעה', f.endTime ? `${f.time}–${f.endTime}` : f.time)
  if (f.amount) chip(facts, english ? 'Amount' : 'סכום', `₪${f.amount.toLocaleString(english ? 'en-GB' : 'he-IL')}`)
  if (f.items?.length > 1) chip(facts, `${pick(labels().items)}:`, f.items.join(' · '))
  if (f.quantity) chip(facts, pick(labels().qty), String(f.quantity))
  if (f.assigneeText) chip(facts, pick(labels().owner), f.assigneeText)
  if (f.recurrence && labels().repeat?.[f.recurrence]) chip(facts, '↻', pick(labels().repeat[f.recurrence]))
  if (f.urgent) chip(facts, '!', pick(labels().urgent))
  if (f.time && (reading.kind === 'task' || reading.kind === 'calendar_event')) chip(facts, '⏰', pick(labels().reminder))
  if (facts.children.length) card.append(facts)
  if (sure) card.append(el('p', 'try-confirm', pick(labels().confirm)))
  else {
    card.append(el('p', 'try-confirm', pick(labels().unsure)))
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
    button.addEventListener('click', () => { stopTyping(); tryInput.value = example; renderReading() })
    tryExamples.append(button)
  }
}
function setSpace(space) {
  trySpace = space
  for (const button of $$('[data-space]', tryBox)) button.setAttribute('aria-checked', String(button.dataset.space === space))
  paintExamples()
  tryInput.value = SCENES.examples?.[space]?.[0] ?? ''
  renderReading()
}
for (const button of $$('[data-space]', tryBox)) button.addEventListener('click', () => { stopTyping(); setSpace(button.dataset.space) })
tryInput.addEventListener('input', () => { stopTyping(); renderReading() })
painters.push(() => { paintExamples(); renderReading() })

/* The first example types itself once, the way somebody would write it, so the box is already
   answering before anybody touches it. Any interaction stops it and hands the box over. */
let typingTimer = 0, typedOnce = false
function stopTyping() { clearInterval(typingTimer); typingTimer = 0 }
function typeFirstExample() {
  if (typedOnce || still() || !reader) return
  typedOnce = true
  const sentence = SCENES.examples?.[trySpace]?.[0] ?? ''
  let index = 0
  tryInput.value = ''
  renderReading()
  typingTimer = setInterval(() => {
    index += 1
    tryInput.value = sentence.slice(0, index)
    renderReading()
    if (index >= sentence.length) stopTyping()
  }, 55)
}
import('./assets/capture.js').then(module => {
  reader = module
  setSpace('home')
  whileVisible(tryBox, typeFirstExample, () => {}, 0.5)
}).catch(() => {
  tryResult.replaceChildren(el('p', 'try-empty', pick(labels().empty)))
})

/* ── a day in each space ───────────────────────────────────────────────────────────────────── */

const daySection = $('#day')
const daySteps = $('[data-day-steps]')
const dayScreen = $('[data-day-screen]')
let dayTrack = 'home', dayStep = 0, dayTimer = 0, dayTouched = false
function showDayStep(index) {
  const steps = SCENES.day?.[dayTrack] ?? []
  if (!steps.length) return
  dayStep = (index + steps.length) % steps.length
  $$('button', daySteps).forEach((button, position) => button.setAttribute('aria-current', String(position === dayStep)))
  const name = steps[dayStep].screen
  const next = `assets/screens/${language}/${name}.webp`
  if (dayScreen.getAttribute('src') === next) return
  dayScreen.classList.add('is-fading')
  const image = new Image()
  image.onload = image.onerror = () => {
    dayScreen.src = next
    dayScreen.alt = pick(SCENES.screens?.[name])
    dayScreen.classList.remove('is-fading')
  }
  image.src = next
}
function paintDay() {
  daySection.dataset.track = dayTrack
  for (const tab of $$('[data-track]', $('.day-switch'))) tab.setAttribute('aria-selected', String(tab.dataset.track === dayTrack))
  daySteps.replaceChildren()
  ;(SCENES.day?.[dayTrack] ?? []).forEach((step, index) => {
    const [time, title, text] = pick(step)
    const item = el('li')
    const button = el('button')
    button.type = 'button'
    button.append(el('time', '', time), el('b', '', title), el('span', '', text))
    button.addEventListener('click', () => { dayTouched = true; showDayStep(index) })
    item.append(button)
    daySteps.append(item)
  })
  dayScreen.removeAttribute('src')
  showDayStep(0)
}
for (const tab of $$('[data-track]', $('.day-switch'))) {
  tab.addEventListener('click', () => { dayTouched = true; dayTrack = tab.dataset.track; paintDay() })
}
painters.push(paintDay)
whileVisible(daySection, () => {
  if (still() || dayTimer) return
  dayTimer = setInterval(() => { if (!dayTouched) showDayStep(dayStep + 1) }, 4200)
}, () => { clearInterval(dayTimer); dayTimer = 0 })

/* ── reminders: the lock screen ────────────────────────────────────────────────────────────── */

const lockStack = $('[data-lock]')
let lockTimer = 0
function paintLock() {
  clearInterval(lockTimer); lockTimer = 0
  $('[data-lock-date]').textContent = new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'he-IL', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())
  lockStack.replaceChildren()
  for (const entry of SCENES.lock ?? []) lockStack.append(notificationRow(entry))
  if (still()) $$('li', lockStack).forEach(row => row.classList.add('in'))
}
function playLock() {
  if (still() || lockTimer) return
  const items = $$('li', lockStack)
  if (items.every(row => row.classList.contains('in'))) return
  let index = 0
  lockTimer = setInterval(() => {
    items[index]?.classList.add('in')
    index += 1
    if (index >= items.length) { clearInterval(lockTimer); lockTimer = 0 }
  }, 900)
}
painters.push(paintLock)
whileVisible($('.lock'), playLock, () => {}, 0.4)

/* ── roles ─────────────────────────────────────────────────────────────────────────────────── */

const roleChoice = { home: 0, biz: 0 }
function paintRoles() {
  const roles = SCENES.roles
  if (!roles) return
  for (const space of ['home', 'biz']) {
    const panel = $(`[data-roles="${space}"]`)
    const data = roles[space]
    panel.replaceChildren()
    const title = el('h3'); title.append(el('i'), document.createTextNode(pick(data.title)))
    const tabs = el('div', 'role-tabs'); tabs.setAttribute('role', 'tablist')
    data.list.forEach((role, index) => {
      const tab = el('button', '', pick(role)[0])
      tab.type = 'button'
      tab.setAttribute('role', 'tab')
      tab.setAttribute('aria-selected', String(index === roleChoice[space]))
      tab.addEventListener('click', () => { roleChoice[space] = index; paintRoles() })
      tabs.append(tab)
    })
    const [, sees, hidden] = pick(data.list[roleChoice[space]])
    const lists = el('div', 'role-lists')
    const seesBox = el('div', 'role-sees'); seesBox.append(el('h4', '', pick(roles.sees)))
    const seesList = el('ul'); sees.forEach(item => seesList.append(el('li', '', item))); seesBox.append(seesList)
    const hidesBox = el('div', 'role-hides'); hidesBox.append(el('h4', '', pick(roles.hidden)))
    const hidesList = el('ul')
    ;(hidden.length ? hidden : [pick(roles.nothing)]).forEach(item => hidesList.append(el('li', '', item)))
    hidesBox.append(hidesList)
    lists.append(seesBox, hidesBox)
    panel.append(title, tabs, lists)
  }
}
painters.push(paintRoles)

/* ── start ─────────────────────────────────────────────────────────────────────────────────── */

if (language === 'en') applyLanguage('en')
else for (const paint of painters) paint()
reduced.addEventListener?.('change', () => { for (const paint of painters) paint() })

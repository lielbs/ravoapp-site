const root = document.documentElement
const switcher = document.querySelector('[data-lang-switch]')
const saved = localStorage.getItem('ravo-marketing-language')

// ravoapp.app used to host the installable product. Remove any worker and caches left by that
// deployment once this network-delivered marketing page has taken control of the tab.
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

function setLanguage(language) {
  const english = language === 'en'
  root.lang = english ? 'en' : 'he'
  root.dir = english ? 'ltr' : 'rtl'
  document.querySelectorAll('[data-he][data-en]').forEach(element => {
    const value = element.dataset[english ? 'en' : 'he']
    if (value.includes('<br>')) element.innerHTML = value
    else element.textContent = value
  })
  if (switcher) {
    switcher.textContent = english ? 'עברית' : 'EN'
    switcher.setAttribute('aria-label', english ? 'החלפה לעברית' : 'Switch to English')
  }
  localStorage.setItem('ravo-marketing-language', language)
}

setLanguage(saved === 'en' ? 'en' : 'he')
switcher?.addEventListener('click', () => setLanguage(root.lang === 'he' ? 'en' : 'he'))
document.querySelector('[data-year]').textContent = new Date().getFullYear()

document.querySelector('.demo-check')?.addEventListener('click', event => {
  const button = event.currentTarget
  button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'))
})

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
if (reducedMotion) document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'))
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
  }), { threshold: .12 })
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element))
}

const typing = document.querySelector('.typing span')
if (typing) {
  const renderTyping = () => {
    const text = typing.dataset[root.lang === 'en' ? 'typeEn' : 'typeHe']
    if (reducedMotion) { typing.textContent = text; return }
    let index = 0
    const tick = () => {
      typing.textContent = text.slice(0, index++)
      if (index <= text.length) setTimeout(tick, 65)
    }
    tick()
  }
  renderTyping()
  switcher?.addEventListener('click', () => { typing.textContent = ''; setTimeout(renderTyping, 0) })
}

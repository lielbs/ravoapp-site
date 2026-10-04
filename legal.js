async function retirePreviousSiteWorker() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map(registration => registration.unregister()))
  }
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
  }
}
void retirePreviousSiteWorker()

const copy = {
  support: {
    he: ['תמיכה', `<p class="legal-note">RAVO מרכז את מה שמחזיק בית או עסק — משימות, קניות, חשבונות ויומן — במרחב משותף. אם משהו לא עובד כצפוי, אנחנו כאן.</p><h2>איך פונים אלינו?</h2><p>שלחו מייל אל <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>. אנחנו משתדלים להשיב בתוך יום עסקים.</p><p>כדי שנוכל לעזור מהר, כתבו מה ניסיתם לעשות, מה קרה במקום ומאיזה מכשיר. אין צורך לשלוח תוכן פרטי, סיסמאות או פרטי תשלום.</p><h2>שאלות נפוצות</h2><h3>שכחתי סיסמה</h3><p>במסך הכניסה למוצר אפשר לבקש איפוס סיסמה ולקבל קוד בדוא״ל.</p><h3>הזמנה לא עובדת</h3><p>הזמנה תקפה לשבעה ימים ומיועדת לכתובת שאליה נשלחה. אם פגה, בקשו מבעל המרחב לשלוח חדשה.</p><h3>איך מוחקים חשבון?</h3><p>מחיקת חשבון זמינה מתוך הגדרות המוצר ומתבצעת מיד. אין צורך לפנות לתמיכה.</p>`],
    en: ['Support', `<p class="legal-note">RAVO brings together the things that keep a home or business running. If something isn’t working as expected, we’re here.</p><h2>Contact us</h2><p>Email <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>. We aim to reply within one business day.</p><p>Tell us what you tried, what happened instead, and which device you used. Please don’t send private household content, passwords or payment details.</p><h2>Common questions</h2><h3>Forgotten password</h3><p>The product’s sign-in screen can send a password-reset code by email.</p><h3>An invitation doesn’t work</h3><p>Invitations remain valid for seven days and are tied to their recipient address. If one expires, ask the workspace owner to send a new one.</p><h3>Deleting an account</h3><p>Account deletion is available in product settings and takes effect immediately. Support contact is not required.</p>`]
  },
  privacy: {
    he: ['מדיניות פרטיות', `<p class="legal-note">המדיניות מתארת איזה מידע RAVO שומר כדי להפעיל מרחב משותף לבית (RAVO Home) או לעסק (RAVO Business), מדוע, היכן, ואיזה מידע אינו אוסף.</p><h2>המידע שנשמר</h2><p><strong>חשבון:</strong> כתובת דוא״ל, מזהה חשבון, שם תצוגה ותפקיד בכל מרחב. אפשר לבחור סיסמה ב־RAVO, או להשתמש בהזדהות של Apple באפליקציית האייפון. Apple מוסרת לנו כתובת דוא״ל מאומתת ומזהה חשבון — ולעולם לא את הסיסמה שלכם אצלה. אם תבחרו ב־Hide My Email, נשמרת כתובת ההעברה של Apple.</p><p><strong>תוכן מרחב בית:</strong> משימות, קניות, מזווה, ארוחות, חשבונות והוצאות, אירועי יומן, פעילות והתראות שחברי המרחב מוסיפים.</p><p><strong>תוכן מרחב Business:</strong> שם העסק, פרטי החברים והעובדים שנמסרו במרחב, תפקידים והרשאות, משימות והקצאות, רכש, הוצאות, אירועים, הודעות לצוות, ציוד ודיווחי תחזוקה. אם הזנתם ספקים, נשמרים שמותיהם ופרטי הקשר שהזנתם, כגון איש קשר, טלפון ודוא״ל. יש להזין מידע על אחרים רק כשיש לכם רשות לכך.</p><p><strong>תמונת פרופיל (רשות):</strong> אפשר לבחור תמונה או לצלם אחת. התמונה נחתכת, מוקטנת ומנוקה ממטא־נתוני מצלמה במכשיר לפני העלאה לאחסון פרטי, ומוצגת לחברי המרחב המורשים באמצעות קישור זמני. אין גישה גורפת לספריית התמונות ואין צילום ברקע. אפשר להסיר את התמונה בכל עת.</p><p><strong>התראות:</strong> אם הפעלתם התראות, נשמר אסימון מכשיר של Apple (APNs) באפליקציית האייפון, או יעד דחיפה ומפתחות הצפנה בדפדפן. התראה עשויה לכלול כותרת ותוכן קצר מפריט שמותר לכם לראות. התזכורת היומית של העוזר מתוזמנת מקומית במכשיר, ואינה מציגה פרטי משימות או סכומים במסך הנעילה.</p><p><strong>מידע טכני:</strong> אבחון תקלות נשמר מקומית במכשיר ואינו נשלח אוטומטית. אם תפנו לתמיכה, תבחרו מה לשתף.</p><h2>העוזר וההוספה החכמה</h2><p>ההוספה החכמה מפענחת את מה שכתבתם במכשיר עצמו. העוזר מחשב הצעות — משימות באיחור, חשבונות קרובים, כפילויות ואירועים חופפים — לפי כללים, רק מהמידע שמותר לכם לראות. התוכן אינו נשלח לשירות בינה מלאכותית חיצוני ואינו משמש לאימון מודלים. העדפות העוזר (דחייה או הסתרה של הצעות) נשמרות במכשיר. טיוטה שנמסרה דרך קיצורי iPhone מועברת לאפליקציה ונשמרת במרחב רק אחרי אישור שלכם.</p><h2>למה המידע משמש</h2><p>רק להפעלת השירות: סנכרון בין חברי המרחב, אכיפת הרשאות, הצגת מידע, התראות והצעות העוזר. תוכן המרחב אינו משמש לפרסום.</p><h2>מה איננו אוספים ואיננו עושים</h2><p>איננו קוראים את מיקום המכשיר, את אנשי הקשר, את יומן המכשיר או את המיקרופון. איננו מוכרים מידע אישי, איננו מציגים פרסומות, איננו מבצעים פרסום ממוקד — לרבות כלפי קטינים — ואיננו משתמשים בעוגיות מעקב של צד שלישי באתר הציבורי.</p><h2>מי רואה מה</h2><p>הגישה מבוססת חשבון, חברות במרחב והרשאות התפקיד. ההרשאות נאכפות במסד הנתונים, כך שמידע שאינו מותר לתפקיד אינו נשלח למכשיר שלו. אין גישה בין מרחבים נפרדים, גם כשאותו חשבון חבר בבית ובעסק.</p><h2>ספקי תשתית והעברה מחוץ לישראל</h2><p>מסד הנתונים והקבצים מאוחסנים אצל Supabase, באזור סיאול שבדרום קוריאה (ap-northeast-2), ולכן המידע מועבר מחוץ לישראל לצורך הפעלת השירות. שירותים משלימים — Apple להזדהות ולהתראות, ספק לשליחת דוא״ל אימות — עשויים לעבד מידע באזורים נוספים לפי הספק.</p><h2>שמירה ומחיקה</h2><p>המידע נשמר כל עוד החשבון קיים. יומן הפעילות נגזם אחרי 120 יום; התראות נמחקות 30 יום אחרי שנקראו, ולכל היותר אחרי 90 יום. מחיקת חשבון זמינה בהגדרות ומתבצעת מיד: מרחב שאתם החברים היחידים בו נמחק עם כל תוכנו, ובמרחב משותף התוכן שיצרתם נשאר לשאר החברים בלי שיוך אליכם.</p><h2>זכויות</h2><p>אפשר לעיין ולתקן פרטים במוצר ולמחוק חשבון מתוך ההגדרות. לבקשת עותק או לכל שאלה כתבו אל <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>.</p><h2>אבטחה</h2><p>התקשורת מוצפנת, סיסמאות אינן נשמרות אצל RAVO כטקסט, ומפתחות בעלי הרשאות מוגברות אינם נשלחים למכשיר. אף שירות אינו חסין לחלוטין.</p>`],
    en: ['Privacy Policy', `<p class="legal-note">This policy explains the information RAVO keeps to run a shared space for a home (RAVO Home) or a business (RAVO Business), why, where, and what it does not collect.</p><h2>Information kept</h2><p><strong>Account:</strong> email address, account identifier, display name and your role in each space. You can choose a RAVO password, or use Apple&rsquo;s identity service in the iPhone app. Apple gives us a verified email address and an account identifier &mdash; never your Apple password. If you choose Hide My Email, Apple&rsquo;s relay address is what we keep.</p><p><strong>Home space content:</strong> tasks, shopping, pantry, meals, bills and spending, calendar events, activity and notifications that members add.</p><p><strong>RAVO Business content:</strong> the business name, details of members and staff provided in the space, roles and permissions, tasks and assignments, procurement, spending, events, team updates, equipment and maintenance reports. If you add vendors, their names and the contact details you enter (such as a contact person, phone and email) are kept. Only enter information about other people when you are allowed to.</p><p><strong>Profile photo (optional):</strong> you can choose a photo or take one. It is cropped, resized and stripped of camera metadata on the device before upload to private storage, and shown to authorised members through a temporary link. There is no blanket photo-library access and no background capture. You can remove it at any time.</p><p><strong>Notifications:</strong> if you turn them on, an Apple (APNs) device token is kept for the iPhone app, or a push endpoint and encryption keys for a browser. A notification may include a title and a short line from an item you are allowed to see. The assistant&rsquo;s daily reminder is scheduled locally on the device and shows no task details or amounts on the lock screen.</p><p><strong>Technical information:</strong> diagnostics stay on the device and are not sent automatically. If you contact support, you choose what to share.</p><h2>The assistant and Quick Add</h2><p>Quick Add reads what you write on the device itself. The assistant works out its suggestions &mdash; overdue tasks, bills coming due, duplicates, overlapping events &mdash; with rules, using only information you are allowed to see. Content is not sent to an outside AI service and is not used to train models. Assistant preferences (putting off or hiding suggestions) stay on the device. A draft handed over from iPhone Shortcuts is passed to the app and saved to the space only after you confirm it.</p><h2>How information is used</h2><p>Only to run the service: syncing between members, enforcing permissions, showing information, notifications and the assistant&rsquo;s suggestions. Workspace content is not used for advertising.</p><h2>What we do not collect or do</h2><p>We do not read the device&rsquo;s location, contacts, device calendar or microphone. We do not sell personal information, show ads, run targeted advertising &mdash; including towards minors &mdash; or use third-party tracking cookies on the public website.</p><h2>Who sees what</h2><p>Access is based on account, space membership and role permissions. Permissions are enforced in the database, so information a role may not see is never sent to that person&rsquo;s device. Separate spaces cannot reach each other, even when one account belongs to a home and a business.</p><h2>Infrastructure and transfer outside Israel</h2><p>The database and files are hosted by Supabase in the Seoul, South Korea region (ap-northeast-2), so information is transferred outside Israel to run the service. Supporting services &mdash; Apple for identity and notifications, a provider for verification email &mdash; may process information in other regions according to each provider.</p><h2>Retention and deletion</h2><p>Information is kept while the account exists. The activity log is trimmed after 120 days; notifications are deleted 30 days after being read, and after 90 days at most. Account deletion is available in Settings and takes effect immediately: a space where you are the only member is deleted with all its content, and in a shared space what you created stays with the other members, no longer attached to you.</p><h2>Your rights</h2><p>You can review and correct details in the product and delete your account from Settings. For a copy of your information or any question, write to <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>.</p><h2>Security</h2><p>Connections are encrypted, RAVO does not store passwords as text, and privileged keys are never sent to the device. No service is completely immune.</p>`]
  },
  terms: {
    he: ['תנאי שימוש', `<p class="legal-note">RAVO זמין ב־App Store ומסופקת ללא תשלום. אין רכישות בתוך האפליקציה ואין מנוי פעיל. תנאי תשלום יחולו רק אם וכאשר יופעל שירות בתשלום, לאחר הודעה מראש.</p><h2>השירות</h2><p>RAVO מסייע לבית או לעסק לתאם משימות, קניות, יומן, חשבונות ותפעול משותף. הוא אינו שירות בנקאי, ייעוץ פיננסי, רפואי או שירות חירום.</p><h2>חשבון ואחריות</h2><p>המשתמשים אחראים למסור פרטים נכונים, לשמור על סודיות אמצעי הגישה ולהוסיף למרחב רק אנשים ומידע שיש להם רשות להוסיף. בעל המרחב אחראי לבחירת תפקידים והרשאות.</p><h2>שימוש הוגן</h2><p>אין להשתמש בשירות באופן בלתי חוקי, לפגיעה באחרים, להפרת פרטיות, להפצת קוד מזיק או לניסיון לעקוף הרשאות.</p><h2>זמינות ושינויים</h2><p>זהו שירות בשלבי פיתוח. ייתכנו שינויים, הפסקות ותקלות. נשאף לשמור על מידע ועל רציפות, אך אין להסתמך על RAVO למקרה שבו תקלה עלולה לגרום נזק ממשי.</p><h2>קניין רוחני</h2><p>המשתמשים שומרים על הזכויות בתוכן שהם מוסיפים. השם RAVO, המיתוג והתוכנה שייכים למפעיל השירות.</p><h2>יצירת קשר</h2><p>לשאלות כתבו אל <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>. פרטי המפעיל המסחריים המלאים יפורסמו לפני כל השקה בתשלום.</p>`],
    en: ['Terms of Use', `<p class="legal-note">RAVO is available on the App Store and is provided without charge. There are no in-app purchases and no active subscription. Payment terms will apply only if a paid service is introduced, after advance notice.</p><h2>The service</h2><p>RAVO helps a household or business coordinate tasks, shopping, calendar, bills and shared operations. It is not banking, financial or medical advice, or an emergency service.</p><h2>Accounts and responsibility</h2><p>Users must provide accurate details, protect their access credentials, and add only people and information they are authorised to add. Workspace owners are responsible for roles and permissions.</p><h2>Fair use</h2><p>The service may not be used unlawfully, to harm others, violate privacy, distribute malicious code or circumvent permissions.</p><h2>Availability and changes</h2><p>This service remains in development. Changes, interruptions and faults may occur. RAVO should not be relied upon where a failure could cause material harm.</p><h2>Intellectual property</h2><p>Users retain rights in content they add. The RAVO name, brand and software belong to the service operator.</p><h2>Contact</h2><p>Questions can be sent to <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>. Full commercial operator details will be published before any paid launch.</p>`]
  },
  accessibility: {
    he: ['הצהרת נגישות', `<p class="legal-note">RAVO נבנה עבור בית שלם — כולל אנשים שרואים, שומעים או מפעילים מכשיר אחרת. ההתאמה נמשכת והאתר טרם עבר ביקורת נגישות מוסמכת.</p><h2>מה נעשה באתר</h2><ul><li>מבנה סמנטי וכותרות ברורות.</li><li>ניווט מקלדת ומיקוד נראה.</li><li>ניגודיות וטקסט חלופי לתמונות מוצר.</li><li>עברית מימין לשמאל ואנגלית משמאל לימין.</li><li>שטחי הפעלה נדיבים והתאמה למסכים קטנים.</li><li>כיבוד העדפת המערכת להפחתת תנועה.</li></ul><h2>מה עדיין לא נבדק</h2><p>לא בוצעה ביקורת חיצונית מלאה או בדיקה מקיפה בכל קוראי המסך והמכשירים. לכן איננו מצהירים על הסמכה או התאמה מלאה לתקן.</p><h2>דרך חלופית ופניות</h2><p>אם תוכן מסוים אינו נגיש לכם, כתבו אל <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>. נשמח לספק מידע בדרך חלופית ולטפל בליקוי.</p>`],
    en: ['Accessibility Statement', `<p class="legal-note">RAVO is being built for a whole household — including people who see, hear or operate a device differently. Accessibility work is ongoing and the site has not had a certified audit.</p><h2>What the website supports</h2><ul><li>Semantic structure and clear headings.</li><li>Keyboard navigation and visible focus.</li><li>Colour contrast and alternative text for product imagery.</li><li>Right-to-left Hebrew and left-to-right English.</li><li>Generous touch targets and small-screen layouts.</li><li>Respect for reduced-motion system preferences.</li></ul><h2>What hasn’t been fully tested</h2><p>No complete external audit or exhaustive testing across every screen reader and device has taken place. We therefore do not claim certification or full standards conformance.</p><h2>Alternative access and contact</h2><p>If any content is inaccessible, email <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>. We’ll provide an alternative format and work to fix the issue.</p>`]
  },
  'subscription-policy': {
    he: ['מדיניות מנוי וביטול', `<p class="legal-note">אין כרגע מנוי בתשלום. מחיר סופי, תקופת חיוב ותנאים מסחריים יפורסמו לפני הפעלה של שירות בתשלום.</p><h2>כל עוד השירות ללא תשלום</h2><p>לא מתבצע חיוב, אין חידוש אוטומטי ואין צורך לבטל מנוי.</p><h2>אם יופעל מנוי בעתיד</h2><p>המחיר ותדירות החיוב יוצגו לפני אישור רכישה. כל חידוש אוטומטי, דרך הביטול וזכויות החזר יוסברו לפני התשלום ובהתאם לדין ולכללי פלטפורמת הרכישה.</p><h2>מה קורה למידע</h2><p>ביטול מנוי עתידי לא ימחק חשבון או תוכן באופן אוטומטי. מחיקת חשבון תהיה פעולה נפרדת מתוך הגדרות המוצר.</p><h2>שאלות</h2><p>כתבו אל <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>.</p>`],
    en: ['Subscription & Cancellation Policy', `<p class="legal-note">There is currently no paid subscription. Final pricing, billing period and commercial terms will be published before any paid service begins.</p><h2>While the service is free</h2><p>No charge is made, there is no automatic renewal and there is no subscription to cancel.</p><h2>If a subscription is introduced</h2><p>Price and billing frequency will be shown before purchase. Any auto-renewal, cancellation method and refund rights will be explained before payment, in line with applicable law and the purchase platform’s rules.</p><h2>Your information</h2><p>Cancelling a future subscription will not automatically delete an account or its content. Account deletion will remain a separate action in product settings.</p><h2>Questions</h2><p>Email <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>.</p>`]
  }
}

/*
 * Every visible string on these pages is set from here, in both languages: the chrome as well as
 * the body. A legal page that keeps its navigation in English while the policy is in Hebrew is a
 * page that was translated halfway, and half a translation reads as carelessness on exactly the
 * pages where carelessness costs the most.
 */
const CHROME = {
  he: {
    back: 'חזרה לאתר',
    updated: 'עודכן: 4 באוקטובר 2026',
    tagline: 'סדר בבית ובעסק',
    skip: 'דילוג לתוכן',
    switchLabel: 'Switch to English',
    nav: 'מידע משפטי'
  },
  en: {
    back: 'Back to website',
    updated: 'Updated: 4 October 2026',
    tagline: 'Home and Business, in sync',
    skip: 'Skip to content',
    switchLabel: 'החלפה לעברית',
    nav: 'Legal information'
  }
}

const ORDER = ['support', 'privacy', 'terms', 'accessibility', 'subscription-policy']
const SHORT = {
  support: { he: 'תמיכה', en: 'Support' },
  privacy: { he: 'פרטיות', en: 'Privacy' },
  terms: { he: 'תנאי שימוש', en: 'Terms' },
  accessibility: { he: 'נגישות', en: 'Accessibility' },
  'subscription-policy': { he: 'מדיניות מנוי', en: 'Subscription policy' }
}

const key = document.body.dataset.page
const switcher = document.querySelector('[data-lang-switch]')

function render(language) {
  const [title, html] = copy[key][language]
  const chrome = CHROME[language]
  document.documentElement.lang = language
  document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  document.title = `${title} — RAVO`
  document.querySelector('h1').textContent = title
  document.querySelector('.legal-content').innerHTML = html
  document.querySelector('[data-back]').textContent = chrome.back
  document.querySelector('[data-updated]').textContent = chrome.updated
  document.querySelector('[data-tagline]').textContent = chrome.tagline
  document.querySelector('[data-skip]').textContent = chrome.skip

  const nav = document.querySelector('[data-legal-nav]')
  nav.setAttribute('aria-label', chrome.nav)
  // The page you are on is not a link to itself.
  nav.innerHTML = ORDER.filter(slug => slug !== key)
    .map(slug => `<a href="../${slug}/">${SHORT[slug][language]}</a>`).join('')

  switcher.textContent = language === 'he' ? 'EN' : 'עברית'
  switcher.setAttribute('aria-label', chrome.switchLabel)
  try { localStorage.setItem('ravo-marketing-language', language) } catch { /* private mode */ }
}

let saved = 'he'
try { saved = localStorage.getItem('ravo-marketing-language') === 'en' ? 'en' : 'he' } catch { /* private mode */ }
render(saved)
switcher.addEventListener('click', () => render(document.documentElement.lang === 'he' ? 'en' : 'he'))

/*
 * Every word on the landing page that is not already in the HTML.
 *
 * The HTML carries the Hebrew, because Hebrew is the product's own language and what a crawler should
 * read. `en` below is the English for each `data-i18n` key; the Hebrew of each key is read back out
 * of the page itself the first time English is shown, so the two can never drift apart.
 *
 * `scenes` is the content of the moving parts — notifications, the mess, the day, the roles — in both
 * languages. All of it is written from what the product really does: notification titles are the
 * ones the server sends, role lists come from src/domain/permissions.ts, screens are real captures.
 */
window.RAVO_COPY = {
  en: {
    skip: 'Skip to content',
    tagline: 'Home and Business, in sync',
    navLabel: 'Main navigation',
    navHow: 'How it works', navTry: 'Quick Add', navAssistant: 'Assistant', navSpaces: 'Home & Business', navFaq: 'FAQ',
    getApp: 'Get the app',
    heroBadge: 'Now on the App Store · Free',
    heroTitle: 'Life happens.<br><em>RAVO brings it into focus.</em>',
    heroLede: 'One app for home and for business. Write one sentence — RAVO works out where it belongs. The assistant surfaces what needs handling and suggests the next step. Tasks, shopping and procurement, calendar, bills and issues, with a clear owner for everything.',
    powerTryT: 'Quick Add', powerTry: 'One sentence, and it’s already in the right place',
    powerAssistT: 'The assistant', powerAssist: 'What’s worth handling now, and the next step',
    pillHome: 'For home and family', pillBiz: 'For business and team',
    downloadOn: 'Download on the',
    heroTry: 'Try Quick Add',
    heroNote: 'RAVO is currently free · No subscription · No ads · Hebrew and English',
    messEyebrow: 'How it works',
    messBefore: 'This is what it looks like today.', messAfter: 'This is what it looks like with RAVO.',
    messBeforeSub: 'The family group, the work group, notes and reminders in your head. All of it matters, and all of it is in the same place.',
    messAfterSub: 'Everything goes where it belongs, with an owner, a date and a reminder. At home and at work.',
    messUnread: 'unread messages',
    spacesEyebrow: 'Two spaces · one account',
    spacesTitle: 'At home and at work,<br><em>the same calm.</em>',
    spacesLede: 'RAVO Home and RAVO Business are built on one idea: everything that needs handling gets a place, an owner and a date. Each space speaks its own language, and each one’s information stays completely separate.',
    homeTitle: 'The house runs. You breathe.',
    homeLede: 'For families, couples and flatmates. Who’s picking up, what’s missing, what needs paying and what’s on this week — without asking the group again.',
    homeF1: 'Tasks with an owner, a date and a time', homeF2: 'A shopping list that sorts itself by supermarket aisle',
    homeF3: 'A family calendar: clubs, appointments and dinners', homeF4: 'Household bills and spending, with a reminder before',
    homeF5: 'Kitchen, dishes and pantry', homeF6: 'Permissions for children, household help and guests',
    fitsLabel: 'Fits:', homeFits: 'Families · Couples · Flatmates · Homes with household help',
    bizTitle: 'The business runs. Nothing slips.',
    bizLede: 'For any business with a team: offices, shops, clinics, studios and restaurants. Who’s on the fault, what needs ordering and what was agreed — without chasing anyone.',
    bizF1: 'Team tasks with an owner and an “I’ve got it” reply', bizF2: 'Issues and maintenance — from report to closed',
    bizF3: 'Procurement and kitchen, grouped by area', bizF4: 'Vendors, equipment and assets in one place',
    bizF5: 'Updates for the whole team, without another group chat', bizF6: 'Spending, the business calendar and role-based permissions',
    bizFits: 'Offices · Shops · Clinics · Studios · Restaurants · Operations teams',
    bridge: 'One account can belong to a home and a business — with a different role and permissions in each, one tap apart.',
    tryEyebrow: 'Quick Add · try it now, this is the real RAVO',
    tf1: 'Where it belongs', tf2: 'When, and at what time', tf3: 'How many, and how much', tf4: 'Who owns it', tf5: 'How often it repeats', tf6: 'Whether it’s urgent',
    assistEyebrow: 'The assistant · new in 1.0.1',
    assistTitle: 'No need to hunt for what’s urgent.<br><em>The assistant already found it.</em>',
    assistLede: 'RAVO’s assistant looks across what’s happening at home and at work and surfaces only what’s worth handling now — with the next step, one tap away.',
    as1t: 'Only what matters now', as1: 'Up to three suggestions on the home screen, and only when there’s really something to do. Everything else waits on the assistant screen.',
    as2t: 'The next step in a tap', as2: 'A new date — today, tomorrow or in a week — mark it done, or go straight to the right place.',
    as3t: 'Catches what falls through the cracks', as3: 'Tasks that stalled or came back without an owner, bills before they’re due, urgent issues, duplicates and overlapping events.',
    as4t: 'Straight from iPhone Shortcuts', as4: 'Add a task, a shopping item or an issue report from the Shortcuts app — and the draft opens in RAVO for you to confirm.',
    as5t: 'Quiet and private', as5: 'Suggestions are worked out only from what you’re allowed to see, with no outside AI service. Nothing changes without your say-so.',
    tryTitle: 'Write a sentence.<br><em>RAVO understands it.</em>',
    tryLede: 'Write it the way you’d text it. RAVO works out where it goes, when, how much and who owns it — and in the app you confirm before anything is saved.',
    tryNote: 'The free-text reader is built for Hebrew. Tap one of the examples to see it work. It’s the same engine the app runs, running here in your browser: nothing you type is sent anywhere.',
    tryLabel: 'A sentence to try', trySpace: 'Space',
    dayEyebrow: 'A day with RAVO',
    dayTitle: 'One day.<br><em>Two spaces.</em>',
    dayLede: 'The same day, from the home’s point of view and the business’s. Pick a space and see it in the app.',
    remindEyebrow: 'Reminders',
    remindTitle: 'You don’t have to remember.<br><em>RAVO does.</em>',
    r1t: 'At the task’s own time', r1: 'A task with a time rings exactly then, for whoever owns it.',
    r2t: 'Before it becomes urgent', r2: 'A morning summary of what’s coming up, and bills three days before they’re due.',
    r3t: 'An hour before an event', r3: 'New events get a reminder automatically. Change it or turn it off any time.',
    r4t: 'When something lands on you', r4: 'A task assigned to you, an issue handed to you, an event you were added to.',
    r5t: 'You decide what rings', r5: 'Each kind of notification has its own switch in Settings.',
    rolesEyebrow: 'Permissions',
    rolesTitle: 'Everyone sees<br><em>what’s right for them.</em>',
    rolesLede: 'Permissions are enforced on the server, not just on screen: what a role shouldn’t see never reaches that person’s device. Pick a role.',
    trustEyebrow: 'Privacy',
    trustTitle: 'Your information<br><em>is not the product.</em>',
    t1t: 'No ads. No data sale.', t1: 'No adverts, no targeted advertising and no tracking cookies. Home and business content is used only to run the service.',
    t2t: 'Spaces stay apart', t2: 'A home and a business are separate spaces. Neither can reach the other, even on the same account.',
    t3t: 'Free, no credit card', t3: 'We don’t ask for a payment method, and there is no subscription renewing behind your back.',
    t4t: 'Delete in a tap', t4: 'Account deletion is in Settings and takes effect immediately, without contacting anyone.',
    faqEyebrow: 'FAQ', faqTitle: 'What people really want to know.',
    q1: 'What does it cost? Is it really free?',
    a1: 'Yes. RAVO is currently free: no subscription, no in-app purchases, no ads, and we don’t ask for a payment method. If paid features are ever added, we’ll tell you in advance — and nothing will ever be charged without your explicit consent.',
    q2: 'What’s the difference between RAVO Home and RAVO Business?',
    a2: 'It’s one app with two kinds of space. RAVO Home is shaped for a household: shopping by aisle, a family calendar, bills, the kitchen, and roles like parent and child. RAVO Business is shaped for a business: issues and maintenance, procurement and kitchen, vendors, equipment, team updates, and roles like management, staff and operations. You pick a space when you start, and can add the other at any time.',
    q3: 'Can one account belong to a home and a business?',
    a3: 'Yes. One account can belong to several spaces and switch between them in a tap. You have your own role and permissions in each, and home and business information never mixes.',
    q4: 'How do I bring in my family or my team?',
    a4: 'From the household or team screen, send an invitation to the person’s email and choose their role. The invitation is valid for seven days, and they join straight into the right space.',
    q5: 'Does everyone need to download the app?',
    a5: 'Everyone taking part needs their own account, so it’s clear who owns what and each person sees only what they’re allowed to. RAVO is currently available for iPhone, and we’re working on an Android version. You can start on your own and bring others in later.',
    q6: 'What do children or staff see?',
    a6: 'Only what their role allows. At home, children don’t see bills or amounts, and household help sees only their own tasks. At work, staff and operations don’t see spending or management information. Permissions are enforced on the server, not merely hidden on screen.',
    q7: 'How do reminders work?',
    a7: 'A task with a time reminds you at that time, a bill a few days before it’s due, and an event an hour before (or whenever you choose). Each morning brings a summary of what’s coming up. You need to allow notifications on your iPhone, and RAVO’s Settings let you choose which kinds ring.',
    q8: 'Does Quick Add use AI?',
    a8: 'No. It’s a rule-based engine built for Hebrew that runs on the device itself, without sending what you wrote to an outside server. It picks out the destination, date, time, amount, owner and repetition, and you always confirm before anything is saved. You can try it on this page.',
    q14: 'What does the assistant do — and what doesn’t it do?',
    a14: 'The assistant surfaces tasks that stalled or were left without an owner, bills coming due, urgent business issues, duplicates and overlapping events — and suggests the next step. It never changes or deletes anything by itself: every action takes a tap from you. You can put a suggestion off for a day or stop a kind of suggestion, and those preferences stay on your device.',
    q9: 'Where is the information stored, and who can see it?',
    a9: 'It’s stored with our infrastructure provider (Supabase), on servers in Seoul, South Korea, and every connection is encrypted. Only the space’s members can see it, each according to their role. We don’t sell information, show ads or use your content for anything else. The full detail is in the privacy policy.',
    q10: 'What happens if I delete my account?',
    a10: 'Deletion is immediate. A space where you are the only member is deleted with all its content. In a shared space, what you created stays with the other members — no longer attached to you.',
    q11: 'Does it work offline?',
    a11: 'Offline, you can see what has already loaded. Adding and editing work again the moment the connection returns, and every change syncs to everyone.',
    q12: 'Which languages?',
    a12: 'The interface is available in Hebrew and English. Free-text reading in Quick Add is built for Hebrew; in English you choose where something goes with a tap.',
    q13: 'I have a question or a problem. Who do I contact?',
    a13: 'Write to us at <a href="mailto:support@ravoapp.app">support@ravoapp.app</a>. We aim to reply within one business day.',
    finaleTitle: 'Less load.<br><em>More clarity.</em>',
    finaleLede: 'Download RAVO, open a home or a business — or both — and bring in whoever you need.',
    finaleNote: 'RAVO is currently free · for iPhone',
    footerLine: 'Clarity, ownership and coordination — at home and at work.',
    legalNav: 'Legal information',
    fSupport: 'Support', fPrivacy: 'Privacy', fTerms: 'Terms', fAccess: 'Accessibility', fPayments: 'Payments & cancellation',
    footerAsk: 'Have a question?', rights: '· All rights reserved'
  },

  scenes: {
    /* Hero notifications. Titles are the server's own (send_due_reminders, release_due_reminders,
       the task and maintenance triggers); bodies are demo content. */
    toasts: [
      { space: 'home', he: ['תזכורת', 'להתקשר לרופא'], en: ['Reminder', 'Call the doctor'] },
      { space: 'biz', he: ['תקלה חדשה בטיפולך', 'המזגן בחדר הישיבות'], en: ['New issue for you', 'Meeting-room air conditioner'] },
      { space: 'home', he: ['חשבון מתקרב', 'ארנונה — לתשלום עד 15/10'], en: ['Bill coming up', 'Council tax — due 15/10'] },
      { space: 'biz', he: ['משימה חדשה בשבילך', 'לאשר הזמנת טונר'], en: ['A new task for you', 'Approve the toner order'] },
      { space: 'home', he: ['משימה הושלמה', 'לאסוף חבילה מהלוקר'], en: ['Task done', 'Collect the parcel from the locker'] },
      { space: 'biz', he: ['ישיבת צוות שבועית', '06/10 · 10:00'], en: ['Weekly team meeting', '06/10 · 10:00'] }
    ],

    /* The mess. `from` is who sent it in which group; `row` is what it becomes in RAVO. */
    mess: [
      { space: 'home', he: { from: 'נועה · הבית', msg: 'מישהו קונה חלב??', row: 'חלב, ביצים ולחם', meta: 'קניות · נועה' }, en: { from: 'Noa · Home', msg: 'is anyone getting milk??', row: 'Milk, eggs and bread', meta: 'Shopping · Noa' } },
      { space: 'biz', he: { from: 'יעל · צוות', msg: 'המזגן בחדר ישיבות שוב מטפטף', row: 'המזגן בחדר הישיבות', meta: 'תקלה · מריה · דחוף' }, en: { from: 'Yael · Team', msg: 'the meeting-room AC is dripping again', row: 'Meeting-room AC', meta: 'Issue · Maria · urgent' } },
      { space: 'home', he: { from: 'ליאל · הבית', msg: 'שילמנו כבר ארנונה?', row: 'ארנונה ₪480', meta: 'עד 15/10 · ליאל' }, en: { from: 'Liel · Home', msg: 'did we pay council tax yet?', row: 'Council tax ₪480', meta: 'Due 15/10 · Liel' } },
      { space: 'biz', he: { from: 'דניאל · צוות', msg: 'נגמר הטונר, מי מזמין?', row: 'טונר ונייר למדפסת', meta: 'רכש · דניאל' }, en: { from: 'Daniel · Team', msg: 'toner’s out, who’s ordering?', row: 'Toner and printer paper', meta: 'Procurement · Daniel' } },
      { space: 'home', he: { from: 'מאיה · הבית', msg: 'מי אוסף אותי מהחוג?', row: 'איסוף מהחוג', meta: 'היום 16:30 · דניאל' }, en: { from: 'Maya · Home', msg: 'who’s picking me up from club?', row: 'Pick-up from club', meta: 'Today 16:30 · Daniel' } },
      { space: 'biz', he: { from: 'נועה · צוות', msg: 'הספק אמר שמגיע מתי?', row: 'ביקור טכנאי מדפסות', meta: 'יומן · מחר 14:30' }, en: { from: 'Noa · Team', msg: 'when did the vendor say they’re coming?', row: 'Printer technician visit', meta: 'Calendar · tomorrow 14:30' } },
      { space: 'home', he: { from: 'דניאל · הבית', msg: 'איפה הטופס של הטיול', row: 'לחתום על טופס הטיול', meta: 'מחר · ליאל' }, en: { from: 'Daniel · Home', msg: 'where’s the trip form', row: 'Sign the trip form', meta: 'Tomorrow · Liel' } },
      { space: 'biz', he: { from: 'ליאל · צוות', msg: 'החשבונית של הספק שולמה?', row: 'חשבונית ספק ₪1,450', meta: 'הוצאות · עד 10/10' }, en: { from: 'Liel · Team', msg: 'was the vendor invoice paid?', row: 'Vendor invoice ₪1,450', meta: 'Spending · due 10/10' } },
      { space: 'home', he: { from: 'נועה · הבית', msg: 'תזכירו לי להתקשר לרופא', row: 'להתקשר לרופא', meta: 'מחר 20:00 · נועה' }, en: { from: 'Noa · Home', msg: 'remind me to call the doctor', row: 'Call the doctor', meta: 'Tomorrow 20:00 · Noa' } },
      { space: 'biz', he: { from: 'מריה · צוות', msg: 'מי נועל היום?', row: 'סגירת יום', meta: 'כל יום · מריה' }, en: { from: 'Maria · Team', msg: 'who’s locking up today?', row: 'Close up for the day', meta: 'Every day · Maria' } }
    ],

    /* A day in each space. `screen` is a real capture in assets/screens/<language>/. */
    day: {
      home: [
        { screen: 'today', he: ['07:30', 'כל אחד יודע מה שלו', 'מסך ״היום״ מראה מה דחוף, מה של מי ומה כבר טופל — לפני שמישהו שואל.'], en: ['07:30', 'Everyone knows what’s theirs', 'Today shows what’s urgent, who owns what and what’s already handled — before anyone asks.'] },
        { screen: 'shopping', he: ['12:10', 'הרשימה כבר מסודרת', 'מה שנוסף בבוקר מחכה לפי מחלקות הסופר, ומי שבבית רואה בזמן אמת מה נלקח.'], en: ['12:10', 'The list is already sorted', 'What was added this morning waits in aisle order, and whoever’s at home sees what’s in the basket.'] },
        { screen: 'calendar', he: ['16:30', 'אף אחד לא שוכח חוג', 'חוגים, תורים וארוחות ביומן אחד, עם מי שמשתתף ותזכורת לפני.'], en: ['16:30', 'Nobody forgets a club', 'Clubs, appointments and dinners in one calendar, with who’s involved and a reminder before.'] },
        { screen: 'money', he: ['21:00', 'החשבונות בלי ערפל', 'מה שולם, מה ממתין ומי אחראי — בלי לחפש במייל.'], en: ['21:00', 'Bills without the fog', 'What’s paid, what’s waiting and who owns it — without digging through email.'] }
      ],
      biz: [
        { screen: 'office', he: ['08:00', 'תמונת מצב לפני הקפה', '״היום בעסק״ מראה מה דורש טיפול, מי זמין ומה ביומן — במבט אחד.'], en: ['08:00', 'The picture before the coffee', 'Business Today shows what needs handling, who’s around and what’s on — at a glance.'] },
        { screen: 'maintenance', he: ['10:15', 'תקלה נפתחת ונסגרת', 'מדווחים בהקשה, מעבירים למי שמטפל, ורואים אותה עד שהיא נפתרת.'], en: ['10:15', 'An issue opens, and closes', 'Report it in a tap, hand it to whoever fixes it, and follow it until it’s resolved.'] },
        { screen: 'biz-procurement', he: ['13:00', 'רכש בלי ״מי הזמין?״', 'מה צריך להזמין, לפי תחום — מטבחון, ציוד משרדי, מחשוב — ומי מטפל עכשיו.'], en: ['13:00', 'Procurement without “who ordered?”', 'What needs ordering, by area — kitchen, office supplies, IT — and who’s on it now.'] },
        { screen: 'biz-announcements', he: ['17:30', 'עדכון אחד לכל הצוות', 'הודעה ברורה שכולם רואים, בלי עוד קבוצה ובלי שמשהו ילך לאיבוד.'], en: ['17:30', 'One update for the whole team', 'A clear notice everyone sees, without another group chat or anything getting lost.'] }
      ]
    },

    /* From src/domain/permissions.ts — roleAccessSummary and officeRoleAccessSummary. */
    roles: {
      home: {
        title: { he: 'בבית', en: 'At home' },
        list: [
          { he: ['בעלים', ['כל משימות הבית', 'קניות, ארוחות ויומן', 'חשבונות והרשאות'], []], en: ['Owner', ['Every household task', 'Shopping, meals and calendar', 'Bills and permissions'], []] },
          { he: ['הורה', ['ניהול משימות וקניות', 'ארוחות, יומן וחשבונות', 'בני הבית ופעילות'], ['הגדרות בעלות מתקדמות']], en: ['Parent', ['Tasks and shopping', 'Meals, calendar and bills', 'Household and activity'], ['Advanced owner settings']] },
          { he: ['ילד/ה', ['המשימות האישיות', 'קניות וארוחות', 'יומן הבית', 'פעילות משפחתית'], ['חשבונות וסכומים', 'ניהול הרשאות']], en: ['Child', ['Their own tasks', 'Shopping and meals', 'The family calendar', 'Family activity'], ['Bills and amounts', 'Managing permissions']] },
          { he: ['עובד/ת משק בית', ['משימות שהוקצו', 'דיווח על מוצרים חסרים'], ['חשבונות', 'יומן הבית', 'מידע משפחתי פרטי']], en: ['Household help', ['Assigned tasks', 'Reporting missing items'], ['Bills', 'The family calendar', 'Private family information']] },
          { he: ['אורח/ת', ['מידע ששותף במפורש', 'הצעות לארוחות'], ['משימות הבית', 'קניות', 'יומן הבית', 'חשבונות ופעילות']], en: ['Guest', ['Information shared explicitly', 'Meal ideas'], ['Household tasks', 'Shopping', 'The family calendar', 'Bills and activity']] }
        ]
      },
      biz: {
        title: { he: 'בעסק', en: 'At work' },
        list: [
          { he: ['הנהלה', ['כל תפעול העסק', 'הוצאות, צוות והרשאות'], []], en: ['Management', ['All of operations', 'Spending, team and permissions'], []] },
          { he: ['מנהל/ת', ['משימות, רכש ותחזוקה', 'ספקים, ציוד ועדכונים'], ['בעלות מתקדמת']], en: ['Manager', ['Tasks, procurement and maintenance', 'Vendors, equipment and updates'], ['Advanced ownership']] },
          { he: ['עובד/ת', ['המשימות האישיות', 'רכש, מטבחון ועדכונים'], ['הוצאות והרשאות']], en: ['Staff', ['Their own tasks', 'Procurement, kitchen and updates'], ['Spending and permissions']] },
          { he: ['תפעול', ['תחזוקה ומטבחון', 'משימות תפעול'], ['הוצאות ומידע ניהולי']], en: ['Operations', ['Maintenance and kitchen', 'Operations tasks'], ['Spending and management information']] },
          { he: ['אורח/ת או ספק', ['עדכונים ששותפו'], ['ניהול העסק']], en: ['Guest or vendor', ['Updates shared with them'], ['Running the business']] }
        ]
      },
      sees: { he: 'רואה', en: 'Sees' },
      hidden: { he: 'לא רואה', en: 'Doesn’t see' },
      nothing: { he: 'אין הגבלות', en: 'No restrictions' }
    },

    /* The lock screen. Server titles again, home and business interleaved. */
    lock: [
      { space: 'home', he: ['משימה מתקרבת', 'להחליף מצעים — עד 05/10'], en: ['Task coming up', 'Change the bed linen — by 05/10'] },
      { space: 'biz', he: ['תקלה חדשה בטיפולך', 'המדפסת לא מושכת נייר'], en: ['New issue for you', 'The printer won’t take paper'] },
      { space: 'home', he: ['חשבון מתקרב', 'חשמל — לתשלום עד 07/10'], en: ['Bill coming up', 'Electricity — due 07/10'] },
      { space: 'biz', he: ['ישיבת צוות שבועית', '06/10 · 10:00 · חדר ישיבות'], en: ['Weekly team meeting', '06/10 · 10:00 · Meeting room'] },
      { space: 'home', he: ['תזכורת', 'להתקשר לרופא'], en: ['Reminder', 'Call the doctor'] }
    ],

    /* The try-it box. Every example was run through the bundled reader before it went here. */
    examples: {
      home: ['תזכיר לי מחר בשמונה בערב להתקשר לרופא', 'חלב, ביצים ולחם', 'לשלם ארנונה 480 ש״ח עד 15/10', 'יום הולדת לנועה בשישי ב־19:30', 'להחליף מצעים כל שבוע', 'להזכיר לדני להוציא את הכלב'],
      office: ['דחוף לתקן את המזגן בחדר הישיבות', 'להזמין טונר ונייר למדפסת', 'חשבונית ספק 1450 ש״ח עד 10/10', 'ישיבת צוות ביום ראשון ב־10:00', 'להזכיר לנועה לשלוח הצעת מחיר מחר', 'נגמר הקפה במטבחון']
    },
    kinds: {
      task: { he: 'משימה', en: 'Task' }, shopping: { he: 'קניות', en: 'Shopping' }, bill: { he: 'חשבון', en: 'Bill' },
      calendar_event: { he: 'יומן', en: 'Calendar' }, procurement: { he: 'רכש', en: 'Procurement' },
      expense: { he: 'הוצאה', en: 'Expense' }, maintenance: { he: 'תקלה', en: 'Issue' }
    },
    labels: {
      read: { he: 'RAVO זיהה', en: 'RAVO read' }, unsure: { he: 'אפשר כמה יעדים — באפליקציה בוחרים בהקשה:', en: 'It could go a few places — in the app you choose with a tap:' },
      empty: { he: 'כתבו משהו, או בחרו דוגמה.', en: 'Type something, or pick an example.' },
      owner: { he: 'אחראי/ת', en: 'Owner' }, urgent: { he: 'דחוף', en: 'Urgent' }, reminder: { he: 'תזכורת בזמן', en: 'Reminder on time' },
      items: { he: 'פריטים', en: 'items' }, qty: { he: 'כמות', en: 'Quantity' },
      repeat: { daily: { he: 'כל יום', en: 'Every day' }, weekly: { he: 'כל שבוע', en: 'Every week' }, monthly: { he: 'כל חודש', en: 'Every month' }, yearly: { he: 'כל שנה', en: 'Every year' } },
      confirm: { he: 'באפליקציה: הקשה אחת לאישור, והוא בפנים.', en: 'In the app: one tap to confirm, and it’s in.' },
      examples: { he: 'דוגמאות', en: 'Examples' }
    },
    screens: {
      today: { he: 'מסך היום של RAVO Home', en: 'The RAVO Home Today screen' },
      tasks: { he: 'מסך המשימות של RAVO', en: 'The RAVO Tasks screen' },
      shopping: { he: 'מסך הקניות של RAVO Home', en: 'The RAVO Home Shopping screen' },
      calendar: { he: 'מסך היומן של RAVO Home', en: 'The RAVO Home Calendar screen' },
      money: { he: 'מסך החשבונות של RAVO Home', en: 'The RAVO Home Bills screen' },
      templates: { he: 'מסך השגרות של RAVO', en: 'The RAVO Routines screen' },
      household: { he: 'מסך בני הבית של RAVO Home', en: 'The RAVO Home Household screen' },
      'quick-add': { he: 'מסך ההוספה המהירה של RAVO', en: 'The RAVO Quick Add screen' },
      office: { he: 'מסך היום בעסק של RAVO Business', en: 'The RAVO Business Today screen' },
      maintenance: { he: 'מסך התחזוקה של RAVO Business', en: 'The RAVO Business Maintenance screen' },
      memory: { he: 'מסך החיפוש של RAVO', en: 'The RAVO Search screen' },
      'biz-tasks': { he: 'מסך המשימות של RAVO Business', en: 'The RAVO Business Tasks screen' },
      'biz-procurement': { he: 'מסך הרכש של RAVO Business', en: 'The RAVO Business Procurement screen' },
      'biz-announcements': { he: 'מסך העדכונים של RAVO Business', en: 'The RAVO Business Updates screen' },
      'biz-team': { he: 'מסך הצוות של RAVO Business', en: 'The RAVO Business Team screen' },
      'biz-calendar': { he: 'מסך היומן של RAVO Business', en: 'The RAVO Business Calendar screen' },
      assistant: { he: 'מסך העוזר של RAVO Business', en: 'The RAVO Business assistant screen' },
      'assistant-sheet': { he: 'הצעה של העוזר ב־RAVO Home, עם בחירת מועד חדש בהקשה', en: 'An assistant suggestion in RAVO Home, with a new date one tap away' }
    }
  }
}

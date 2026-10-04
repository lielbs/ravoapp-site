/*
 * Everything on the homepage that is not already in the HTML: the English for each `data-i18n` key,
 * and the content of the moving parts in both languages. Notification titles are the ones the
 * server sends; the assistant's suggestions use the app's own wording; screens are real captures.
 */
window.RAVO_COPY = {
  en: {
    skip: 'Skip to content',
    tagline: 'Home and Business, in order',
    navLabel: 'Main navigation',
    navHow: 'How it works', navQuick: 'Quick Add', navAssistant: 'Assistant', navSpaces: 'Home & Business', navFaq: 'FAQ',
    getApp: 'Get the app',
    heroNew: 'New',
    heroBadge: 'The smart assistant · Free on the App Store',
    heroTitle: 'Life happens.<br><em>RAVO brings it into focus.</em>',
    heroLede: 'One app for home and for business. Write a sentence — it lands in the right place, with an owner and a date. The assistant shows what’s urgent and what to do next.',
    downloadOn: 'Download on the',
    heroTry: 'Try RAVO right here',
    proof1: 'Free, no ads', proof2: 'For home and business', proof3: 'Hebrew and English',
    howEyebrow: 'How it works',
    howTitle: 'Three steps.<br><em>Nobody forgets.</em>',
    s1t: 'Write it', s1: 'Like a message to a friend: buy milk, pay council tax by the 15th, the AC is leaking.',
    s2t: 'RAVO sorts it', s2: 'Everything goes to its place, with an owner, a date and a reminder.',
    s3t: 'Everyone’s in sync', s3: 'Each person sees what’s theirs and gets notified on time. No more asking the group.',
    quickEyebrow: 'Quick Add · try it now',
    quickTitle: 'Write a sentence.<br><em>RAVO reads it.</em>',
    quickLede: 'Write it like a message to a friend. RAVO recognises a task, a shopping item, an event, a bill or an issue — and adds the date, time, amount and owner.',
    quickNote: 'This is the app’s real engine, running in your browser. Nothing is sent anywhere. Free-text reading is built for Hebrew.',
    trySpace: 'Space', tryLabel: 'A sentence to try',
    assistEyebrow: 'The assistant · new',
    assistTitle: 'What’s urgent right now?<br><em>The assistant already knows.</em>',
    assistLede: 'The assistant surfaces only what really needs handling — a task that stalled, a bill coming due, an urgent issue — and suggests the next step. Tap a suggestion and try it.',
    as1: 'Up to three suggestions, only when there’s something to do', as2: 'A new date or mark it done, in one tap', as3: 'Nothing changes without your say-so',
    demoHead: 'Worth handling', demoHint: 'Tap a suggestion', demoWhen: 'When should it happen?',
    demoComplete: 'Already done — mark complete', demoLater: 'Not now', demoDone: 'All handled', demoReset: 'Start again',
    demoNote: 'An interactive demo of the assistant in the app',
    spacesEyebrow: 'Two spaces · one account',
    spacesTitle: 'For home. For business.<br><em>Or both.</em>',
    tourEyebrow: 'This is the product',
    tourTitle: 'Swipe<br><em>and meet RAVO.</em>',
    prev: 'Previous', next: 'Next',
    trustEyebrow: 'Privacy',
    trustTitle: 'Your information<br><em>is not the product.</em>',
    t1t: 'Everyone sees what’s theirs', t1: 'Children don’t see bills, staff don’t see spending. Permissions are enforced on the server.',
    t2t: 'No ads', t2: 'We don’t sell information or show adverts. Content is used only to run the service.',
    t3t: 'Delete in a tap', t3: 'Delete your account in Settings and it’s gone at once.',
    faqEyebrow: 'FAQ', faqTitle: 'Before you start',
    q1: 'What does it cost?',
    a1: 'RAVO is currently free: no subscription, no in-app purchases, no ads, and we don’t ask for a payment method. If paid features are ever added, we’ll tell you in advance, and nothing will be charged without your explicit consent.',
    q2: 'What’s the difference between RAVO Home and RAVO Business?',
    a2: 'It’s one app with two kinds of space. Home is shaped for a household: shopping, a family calendar, bills, and roles like parent and child. Business is shaped for a business: issues, procurement, vendors, equipment, team updates, and roles like management and staff. One account can have both.',
    q3: 'How do I bring in my family or my team?',
    a3: 'Send an invitation to their email and choose a role. It’s valid for seven days, and they join straight into the right space.',
    q4: 'What does the assistant do?',
    a4: 'The assistant surfaces tasks that stalled or were left without an owner, bills coming due, urgent issues, duplicates and overlapping events — and suggests the next step. It never changes or deletes anything by itself.',
    q5: 'What do children or staff see?',
    a5: 'Only what their role allows. At home, children don’t see bills or amounts. At work, staff don’t see spending or management information.',
    q6: 'How do reminders work?',
    a6: 'A task with a time reminds you at that time, a bill a few days before it’s due, and an event an hour before. Settings let you choose which kinds ring.',
    q7: 'Which devices does it run on?',
    a7: 'RAVO is currently available for iPhone, in Hebrew and English. An Android version is on the way.',
    q8: 'Where is the information stored?',
    a8: 'With our infrastructure provider Supabase, on servers in Seoul, South Korea, and every connection is encrypted. Only the space’s members can see it, each according to their role. The full detail is in the <a href="privacy/">privacy policy</a>.',
    finaleTitle: 'Less load.<br><em>More clarity.</em>',
    finaleLede: 'Download RAVO, open a home or a business, and bring in whoever you need. It takes a minute.',
    finaleNote: 'RAVO is currently free · for iPhone',
    footerLine: 'Order, ownership and coordination — at home and at work.',
    legalNav: 'Legal information',
    fSupport: 'Support', fPrivacy: 'Privacy', fTerms: 'Terms', fAccess: 'Accessibility', fPayments: 'Payments & cancellation',
    footerAsk: 'Have a question?', rights: '· All rights reserved'
  },

  scenes: {
    /* Hero notifications: titles are the server's own, bodies are demo content. */
    /* The hero's notifications. Each one is about the screen beside it: the front phone's three
       screens, in order, and the Business screen on the back phone. Every line is something that
       screen actually shows, so the notification and the screen tell the same story. */
    hero: {
      today: { he: ['תזכורת', 'לאסוף חבילה מהלוקר · 18:00'], en: ['Reminder', 'Pick up the parcel from the locker · 18:00'] },
      'assistant-sheet': { he: ['העוזר שם לב', 'המשימה להזמין תור לטכנאי עדיין פתוחה'], en: ['The assistant noticed', 'Still open: Book the repair engineer'] },
      shopping: { he: ['רשימת הקניות', 'נועה הוסיפה חלב ועגבניות'], en: ['Shopping list', 'Noa added milk and tomatoes'] },
      office: [
        { he: ['העוזר שם לב', 'חשבון שכירות משרד לתשלום בקרוב'], en: ['The assistant noticed', 'Due soon: Office rent'] },
        { he: ['מרכז שליטה', '4 אנשי צוות פעילים · 0 תקלות דחופות'], en: ['Control centre', '4 active team members · 0 urgent issues'] }
      ]
    },

    /* Quick Add. Every example was run through the bundled reader before it went here. */
    examples: {
      home: ['תזכיר לי מחר בשמונה בערב להתקשר לרופא', 'חלב, ביצים ולחם', 'לשלם ארנונה 480 ש״ח עד 15/10', 'להחליף מצעים כל שבוע'],
      office: ['דחוף לתקן את המזגן בחדר הישיבות', 'להזמין טונר ונייר למדפסת', 'ישיבת צוות ביום ראשון ב־10:00', 'חשבונית ספק 1450 ש״ח עד 10/10']
    },
    kinds: {
      task: { he: 'משימה', en: 'Task' }, shopping: { he: 'קניות', en: 'Shopping' }, bill: { he: 'חשבון', en: 'Bill' },
      calendar_event: { he: 'יומן', en: 'Calendar' }, procurement: { he: 'רכש', en: 'Procurement' },
      expense: { he: 'הוצאה', en: 'Expense' }, maintenance: { he: 'תקלה', en: 'Issue' }
    },
    labels: {
      read: { he: 'RAVO זיהה', en: 'RAVO read' },
      unsure: { he: 'זה יכול להתאים לכמה מקומות — באפליקציה בוחרים בהקשה:', en: 'It could go a few places — in the app you choose with a tap:' },
      empty: { he: 'כתבו משפט, או בחרו דוגמה.', en: 'Type a sentence, or pick an example.' },
      when: { he: 'מתי', en: 'When' }, time: { he: 'שעה', en: 'Time' }, amount: { he: 'סכום', en: 'Amount' },
      owner: { he: 'אחראי/ת', en: 'Owner' }, urgent: { he: 'דחוף', en: 'Urgent' }, repeats: { he: 'חוזר', en: 'Repeats' },
      items: { he: 'פריטים', en: 'Items' }, qty: { he: 'כמות', en: 'Quantity' },
      repeat: { daily: { he: 'כל יום', en: 'every day' }, weekly: { he: 'כל שבוע', en: 'every week' }, monthly: { he: 'כל חודש', en: 'every month' }, yearly: { he: 'כל שנה', en: 'every year' } },
      confirm: { he: 'באפליקציה: הקשה אחת לאישור, והוא בפנים.', en: 'In the app: one tap to confirm, and it’s in.' }
    },

    /* The assistant demo, in the app's own wording. */
    assistant: {
      items: [
        { id: 'late', tone: 'danger', icon: 'i-clock', title: { he: 'המשימה להזמין תור לטכנאי עדיין פתוחה', en: 'Still open: Book the repair engineer' }, hint: { he: 'לקבוע מועד חדש או לסמן שבוצע', en: 'Set a new date or mark it done' } },
        { id: 'bill', tone: 'warning', icon: 'i-receipt', title: { he: 'חשבון ארנונה לתשלום בקרוב', en: 'Due soon: Council tax' }, hint: { he: 'לבדוק אם שולם', en: 'Check whether it is paid' } },
        { id: 'issue', tone: 'mint', icon: 'i-wrench', title: { he: 'התקלה במזגן בחדר הישיבות דורשת טיפול', en: 'Needs handling: Meeting-room AC' }, hint: { he: 'לטפל או להעביר לאחראי', en: 'Handle it or hand it to someone' } }
      ],
      dates: [{ he: 'היום', en: 'Today' }, { he: 'מחר', en: 'Tomorrow' }, { he: 'בעוד שבוע', en: 'In a week' }],
      scheduled: { he: 'נקבע:', en: 'Moved to' },
      completed: { he: 'סומן כבוצע', en: 'Marked done' },
      later: { he: 'נחזור לזה מחר', en: 'We’ll bring it back tomorrow' }
    },

    /* Home or Business. */
    spaces: {
      home: {
        screen: 'today',
        alt: { he: 'מסך היום של RAVO Home', en: 'The RAVO Home Today screen' },
        title: { he: 'הבית מתנהל. אתם נושמים.', en: 'The house runs. You breathe.' },
        lede: { he: 'למשפחות, לזוגות ולשותפים לדירה. מי אוסף, מה חסר, מה צריך לשלם ומה קורה השבוע — בלי לשאול שוב בקבוצה.', en: 'For families, couples and flatmates. Who’s picking up, what’s missing, what needs paying and what’s on this week — without asking the group again.' },
        features: { he: ['משימות עם אחראי ושעה', 'קניות לפי מחלקות', 'יומן משפחתי', 'חשבונות והוצאות'], en: ['Tasks with an owner and a time', 'Shopping by aisle', 'A family calendar', 'Bills and spending'] }
      },
      biz: {
        screen: 'office',
        alt: { he: 'מסך היום בעסק של RAVO Business', en: 'The RAVO Business Today screen' },
        title: { he: 'העסק רץ. שום דבר לא נופל.', en: 'The business runs. Nothing slips.' },
        lede: { he: 'לכל עסק עם צוות: משרדים, חנויות, קליניקות ומסעדות. מי מטפל בתקלה, מה להזמין ומה סוכם — בלי לרדוף אחרי אף אחד.', en: 'For any business with a team: offices, shops, clinics and restaurants. Who’s on the fault, what to order and what was agreed — without chasing anyone.' },
        features: { he: ['משימות צוות', 'תקלות ותחזוקה', 'רכש וספקים', 'עדכונים לצוות'], en: ['Team tasks', 'Issues and maintenance', 'Procurement and vendors', 'Team updates'] }
      }
    },

    /* The tour: real captures, Home and Business alternating. */
    tour: [
      { screen: 'tasks', space: 'home', title: { he: 'משימות', en: 'Tasks' }, line: { he: 'לכל משימה אחראי ומועד. רואים מה של מי.', en: 'Every task has an owner and a date. See who has what.' } },
      { screen: 'biz-procurement', space: 'biz', title: { he: 'רכש', en: 'Procurement' }, line: { he: 'מה להזמין, לפי תחום, ומי מטפל.', en: 'What to order, by area, and who’s on it.' } },
      { screen: 'shopping', space: 'home', title: { he: 'קניות', en: 'Shopping' }, line: { he: 'רשימה משותפת שמסתדרת לפי מחלקות.', en: 'One shared list, sorted by aisle.' } },
      { screen: 'maintenance', space: 'biz', title: { he: 'תקלות', en: 'Issues' }, line: { he: 'מדווחים, מעבירים ועוקבים עד שנפתר.', en: 'Report, hand over, follow until it’s fixed.' } },
      { screen: 'calendar', space: 'home', title: { he: 'יומן', en: 'Calendar' }, line: { he: 'חוגים, תורים וארוחות, עם תזכורת לפני.', en: 'Clubs, appointments and dinners, with a reminder.' } },
      { screen: 'biz-announcements', space: 'biz', title: { he: 'עדכונים לצוות', en: 'Team updates' }, line: { he: 'הודעה אחת שכולם רואים. בלי עוד קבוצה.', en: 'One notice everyone sees. No more group chats.' } },
      { screen: 'money', space: 'home', title: { he: 'חשבונות', en: 'Bills' }, line: { he: 'מה שולם, מה ממתין, ותזכורת לפני המועד.', en: 'What’s paid, what’s waiting, and a reminder before.' } },
      { screen: 'assistant', space: 'biz', title: { he: 'העוזר', en: 'The assistant' }, line: { he: 'מה כדאי לטפל בו עכשיו, והצעד הבא.', en: 'What’s worth handling now, and the next step.' } }
    ]
  }
}

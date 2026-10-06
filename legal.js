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

/*
 * The public legal pages. They carry the same facts as the in-app pages
 * (src/features/legal/LegalPages.tsx), verified against the product in docs/LEGAL_AUDIT_2026-10.md,
 * and must change in the same commit. RAVO is marketed free: there is no subscription or payment
 * page, and nothing here may read as if money were being taken.
 */
const MAIL = '<a href="mailto:support@ravoapp.app">support@ravoapp.app</a>'

const copy = {
  support: {
    he: ['תמיכה', `<p class="legal-note">RAVO מרכז את מה שמחזיק בית או עסק — משימות, קניות, חשבונות ויומן — במרחב משותף. אם משהו לא עובד כצפוי, אנחנו כאן.</p>
<h2>איך פונים אלינו?</h2><p>שלחו מייל אל ${MAIL}. אנחנו משתדלים להשיב בתוך יום עסקים.</p><p>כדי שנוכל לעזור מהר, כתבו מה ניסיתם לעשות, מה קרה במקום ומאיזה מכשיר. אין צורך לשלוח תוכן פרטי, סיסמאות או פרטי תשלום.</p>
<h2>שאלות נפוצות</h2>
<h3>שכחתי סיסמה</h3><p>במסך הכניסה אפשר לבקש איפוס סיסמה ולקבל קוד בדוא״ל.</p>
<h3>הזמנה לא עובדת</h3><p>הזמנה תקפה לשבעה ימים ומיועדת לכתובת המייל שאליה הונפקה. אם פגה, בקשו מבעל המרחב הזמנה חדשה.</p>
<h3 id="delete-account">איך מוחקים חשבון?</h3><p>בהגדרות האפליקציה, בתחתית המסך. המחיקה מתבצעת מיד ומוחקת את החשבון ואת התמונות הפרטיות. מה שנשאר אחרי מחיקה מפורט ב<a href="../privacy/">מדיניות הפרטיות</a>.</p>
<p><strong>אין לכם גישה לאפליקציה?</strong> שלחו בקשת מחיקה מכתובת המייל של החשבון אל ${MAIL}. נוודא שהבקשה הגיעה מבעל החשבון ונמחק אותו באותה דרך שבה הוא נמחק מתוך האפליקציה.</p>`],
    en: ['Support', `<p class="legal-note">RAVO brings together the things that keep a home or business running. If something isn’t working as expected, we’re here.</p>
<h2>Contact us</h2><p>Email ${MAIL}. We aim to reply within one business day.</p><p>Tell us what you tried, what happened instead, and which device you used. Please don’t send private content, passwords or payment details.</p>
<h2>Common questions</h2>
<h3>Forgotten password</h3><p>The sign-in screen can send a password-reset code by email.</p>
<h3>An invitation doesn’t work</h3><p>Invitations stay valid for seven days and are tied to the address they were issued for. If one expires, ask the space’s owner for a new one.</p>
<h3 id="delete-account">Deleting an account</h3><p>In the app’s Settings, at the bottom of the screen. Deletion is immediate and removes the account and your private photos. What remains afterwards is explained in the <a href="../privacy/">privacy policy</a>.</p>
<p><strong>No access to the app?</strong> Email a deletion request from the account’s email address to ${MAIL}. We will confirm the request came from the account holder and delete the account the same way it is deleted from the app.</p>`]
  },
  privacy: {
    he: ['מדיניות פרטיות', `<p class="legal-note">RAVO הוא שירות לניהול מרחב משותף לבית (RAVO Home) או לעסק (RAVO Business). המסמך מסביר איזה מידע נשמר, למה, היכן, מי יכול לראות אותו ומה אפשר לעשות איתו. RAVO נמצא בשלב בטא וניתן כרגע בחינם.</p>
<h2>מי אחראי למידע</h2><p>האחראי למידע (בעל השליטה במאגר המידע, כמשמעותו בחוק הגנת הפרטיות) הוא מפעיל RAVO, ליאל ברנשטיין. פניות בנושא פרטיות: ${MAIL}.</p>
<h2>המידע שנשמר</h2>
<p><strong>חשבון:</strong> כתובת אימייל, מזהה חשבון, שם תצוגה ותפקיד בכל מרחב. אפשר לבחור סיסמה ב־RAVO, שנשמרת בצורה מגובבת ואינה נגישה לנו כטקסט, או להשתמש בהזדהות של Apple באפליקציית האייפון. Apple מוסרת לנו כתובת אימייל מאומתת ומזהה חשבון — ולעולם לא את הסיסמה שלכם אצלה. אם תבחרו ב־Hide My Email, נשמרת כתובת ההעברה של Apple.</p>
<p><strong>תוכן מרחב בית:</strong> משימות, קניות, מזווה, ארוחות, חשבונות, הוצאות, תקציבים ויעדי חיסכון, אירועי יומן, יומן פעילות והתראות שחברי המרחב מוסיפים.</p>
<p><strong>תוכן מרחב עסק:</strong> שם העסק, פרטי החברים והעובדים שנמסרו במרחב, תפקידים והרשאות, משימות והקצאות, רכש, הוצאות, אירועים, הודעות לצוות, ציוד ודיווחי תחזוקה. אם הזנתם ספקים, נשמרים שמותיהם ופרטי הקשר שהזנתם.</p>
<p><strong>מידע על אנשים אחרים:</strong> כשאתם מזמינים מישהו, נשמרים כתובת האימייל, השם והתפקיד שהזנתם, גם אחרי שההזמנה פגה. RAVO אינו שולח את ההזמנה בעצמו: אתם משתפים את הקישור. כשאתם מזינים פרטים של ספקים, עובדים או אנשי קשר, אתם אחראים לכך שיש לכם רשות לכך. אנו משתמשים במידע כזה רק להפעלת המרחב.</p>
<p><strong>תמונת פרופיל (רשות):</strong> אפשר לבחור תמונה או לצלם אחת. היא נחתכת, מוקטנת ומנוקה ממטא־נתוני מצלמה במכשיר לפני העלאה לאחסון פרטי, ומוצגת לחברי המרחב המורשים באמצעות קישור זמני. אין גישה גורפת לספריית התמונות ואין צילום ברקע. אפשר להסיר אותה בכל עת.</p>
<p><strong>התראות:</strong> אם הפעלתם התראות, נשמר אסימון מכשיר של Apple באפליקציית האייפון, או יעד דחיפה ומפתחות הצפנה בדפדפן. התראה עשויה לכלול כותרת ותוכן קצר מפריט שמותר לכם לראות, כמו שם משימה, שם אירוע ושעתו, או שם חשבון ומועד התשלום שלו (בלי סכום). התראות מוצגות גם במסך הנעילה, אלא אם בחרתם בהגדרות המכשיר להסתיר את התצוגה המקדימה. התזכורת היומית של העוזר מתוזמנת מקומית במכשיר ואינה כוללת פרטי משימות או מידע כספי.</p>
<p><strong>רישומי אבטחה ומידע טכני:</strong> שירות ההזדהות שומר רישום של פעולות בחשבון, כמו הרשמה, כניסה ואיפוס סיסמה, הכולל זמן וכתובת IP, לצורכי אבטחה ומניעת שימוש לרעה. ספקי התשתית שומרים יומני גישה טכניים, כמו כתובת IP וסוג דפדפן, לתקופה קצרה. אבחון תקלות נשמר מקומית במכשיר ואינו נשלח אוטומטית; אם תפנו לתמיכה, תבחרו מה לשתף.</p>
<h2>מידע שעשוי להיות רגיש</h2><p>חשבונות והוצאות, מידע על ילדים ופרטים שאתם כותבים בחופשיות (למשל תור לרופא) עשויים להיות מידע רגיש, ואנו מתייחסים אליהם כך. אל תזינו ב־RAVO מספרי כרטיסי אשראי, סיסמאות, מספרי זהות או מידע רפואי מפורט; השירות לא נועד לשמור מידע כזה.</p>
<h2>קטינים</h2><p>ההרשמה העצמית ל־RAVO מיועדת לבני 18 ומעלה. ילדים ובני נוער משתתפים רק כשהורה או מבוגר אחראי בבית מזמין אותם, ובאחריותו. ההזמנה מחייבת כתובת אימייל, ולכן לקטין שנמצא ב־RAVO יש חשבון ונשמרת עבורו כתובת אימייל, לצד שם תצוגה, תפקיד והתוכן שהוא יוצר או משויך אליו. הרשאות התפקיד ילד/ה מצומצמות: אין גישה לנתוני חשבונות ותשלומים. איננו מפנים אל קטינים תוכן שיווקי ואיננו עושים בפרטיהם שימוש פרסומי. אם נודע לנו שקטין פתח חשבון בעצמו בלי הזמנה, אנו רשאים לסגור אותו. הורה יכול לפנות אלינו כדי לעיין במידע של ילדו, לתקן אותו או למחוק אותו.</p>
<h2>האם חובה למסור את המידע</h2><p>אין חובה חוקית למסור לנו מידע. כתובת אימייל נדרשת כדי לפתוח חשבון, ובלי חשבון לא ניתן להשתמש בשירות. יתר המידע נמסר מרצון, והתוצאה היחידה של אי־מסירתו היא שהתכונות הנשענות עליו לא יעבדו.</p>
<h2>למה המידע משמש</h2><p>רק להפעלת השירות: הצגת מידע, סנכרון בין חברי המרחב, אכיפת הרשאות, התראות, הצעות העוזר, אבטחה ומניעת שימוש לרעה, ומענה לפניות. ההוספה המהירה מפענחת את מה שכתבתם במכשיר עצמו. העוזר מחשב הצעות לפי כללים, רק מהמידע שמותר לכם לראות. התוכן אינו נשלח לשירות בינה מלאכותית חיצוני, אינו משמש לאימון מודלים ואינו משמש לפרסום. העדפות העוזר נשמרות במכשיר. טיוטה שנמסרה דרך קיצורי iPhone נשמרת במרחב רק אחרי אישור שלכם.</p>
<h2>מה איננו עושים</h2><p>איננו קוראים את מיקום המכשיר, את אנשי הקשר, את יומן המכשיר או את המיקרופון. איננו מוכרים מידע אישי, איננו מציגים פרסומות, איננו מבצעים פרסום ממוקד — לרבות כלפי קטינים — ואיננו משתמשים בעוגיות מעקב באתר הציבורי. איננו שולחים הודעות שיווקיות: המיילים שנשלחים הם הודעות שירות בלבד, כמו אימות חשבון ואיפוס סיסמה.</p>
<h2>מי רואה מה</h2><p>הגישה מבוססת חשבון, חברות במרחב והרשאות התפקיד. ההרשאות נאכפות במסד הנתונים, כך שמידע שאינו מותר לתפקיד אינו נשלח למכשיר שלו. ילדים, עובדי משק בית ואורחים אינם מקבלים נתוני חשבונות ותשלומים. אין גישה בין מרחבים נפרדים, גם כשאותו חשבון חבר בבית ובעסק.</p>
<h2>גישה טכנית של המפעיל והספקים</h2><p>כמו ברוב שירותי הענן, המידע אינו מוצפן מקצה לקצה, ולכן למפעיל ולספקי התשתית המורשים יש יכולת טכנית לגשת אליו. גישה כזו נעשית רק כשהיא נדרשת להפעלת השירות, לאבטחה, לתחזוקה, לתיקון תקלות, לטיפול בפנייה שלכם או כשהדין מחייב, ובהיקף המצומצם הנדרש לכך. איננו קוראים את תוכן המרחבים כדבר שבשגרה.</p>
<h2>ספקי שירות</h2><p>איננו מוכרים מידע לאיש. המידע מועבר רק לספקים שמפעילים עבורנו חלק מהשירות, ורק לצורך זה:</p>
<ul><li><strong>Supabase</strong> — מסד הנתונים, ההזדהות, אחסון התמונות, הסנכרון ותזמון ההתראות. הפרויקט ממוקם באזור סיאול, דרום קוריאה; החברה אמריקאית.</li><li><strong>Brevo</strong> — שליחת מיילי שירות (אימות חשבון ואיפוס סיסמה). מקבל את כתובת האימייל ואת תוכן ההודעה. האיחוד האירופי.</li><li><strong>Apple</strong> — הזדהות עם Apple, אם בחרתם בה, ומסירת התראות לאייפון.</li><li><strong>שירותי ההתראות של הדפדפן</strong> — Google, Mozilla, Apple או Microsoft, לפי הדפדפן, מעבירים התראות בדפדפן. תוכן ההתראה מוצפן בדרך אליהם.</li><li><strong>GitHub Pages</strong> — אחסון האתר וגרסת הדפדפן של האפליקציה. GitHub עשוי לשמור יומני גישה טכניים.</li></ul>
<h2>העברת מידע אל מחוץ לישראל</h2><p>המידע מאוחסן ומעובד מחוץ לישראל: מסד הנתונים והקבצים בדרום קוריאה, ובהתאם לספק גם בארצות הברית ובאיחוד האירופי. ההעברה נדרשת כדי להפעיל את השירות, והשימוש ב־RAVO כרוך בה.</p>
<h2>כמה זמן המידע נשמר</h2><p>המידע נשמר כל עוד החשבון קיים, וחלקו נמחק אוטומטית לפני כן: יומן הפעילות אחרי 120 יום; התראות 30 יום אחרי שנקראו, ולכל המאוחר אחרי 90 יום; רישומי ההפעלה של אוטומציות אחרי 30 יום. רישומי האבטחה של שירות ההזדהות והזמנות שפג תוקפן נשמרים כרגע בלי מחיקה אוטומטית; אנו פועלים לקבוע להם תקופת שמירה מוגבלת ונעדכן כאן כשתיקבע.</p>
<h2>מחיקת חשבון</h2><p>מחיקת חשבון זמינה בהגדרות האפליקציה ומתבצעת מיד: נמחקים החשבון, תמונות הפרופיל, אסימוני ההתראות וכל מרחב שאתם החברים היחידים בו, על כל תוכנו. במרחב משותף, מה שיצרתם נשאר לשאר החברים בלי שיוך אליכם.</p><p>אחרי המחיקה עדיין עשויים להישאר: התראות ורישומי פעילות שכבר נשלחו לאחרים, עד לניקוי האוטומטי; הזמנות ששלחתם או שנשלחו אליכם; רישומי האבטחה של שירות ההזדהות; ועותקי גיבוי של ספק התשתית, עד שיוחלפו. אפשר לבקש מחיקה גם בלי האפליקציה, כמתואר ב<a href="../support/#delete-account">עמוד התמיכה</a>.</p>
<h2>אבטחה</h2><p>התקשורת בין המכשיר לשרתים מוצפנת, וספק התשתית מצפין את האחסון ואת הגיבויים. ההצפנה מגינה על המידע בדרך ובאחסון, אבל אינה מקצה לקצה: השרתים יכולים לקרוא את המידע כדי להפעיל את השירות. ההרשאות נאכפות ברמת השורה במסד הנתונים, מפתחות בעלי הרשאות מוגברות אינם נשלחים למכשיר, וסיסמאות אינן נשמרות כטקסט. אף שירות אינו חסין לחלוטין. אם יתרחש אירוע אבטחה חמור הנוגע למידע שלכם, נפעל כפי שהדין מחייב, כולל מסירת הודעה כשהיא נדרשת.</p>
<h2>הזכויות שלכם</h2><p>יש לכם זכות לעיין במידע שנשמר עליכם, לבקש את תיקונו אם אינו נכון, שלם, ברור או מעודכן, ולמחוק את החשבון בכל רגע. עיון ותיקון אפשריים ברובם מתוך האפליקציה, ומחיקה — מתוך ההגדרות. לבקשת עותק של המידע, לבקשה בשם ילד שבאחריותכם, או אם בקשת תיקון נדחתה, כתבו אל ${MAIL}. אם התשובה אינה מספקת אתכם, עומדת לכם זכות פנייה לרשות להגנת הפרטיות ולבית המשפט.</p>
<h2>שינויים</h2><p>אם המדיניות תשתנה באופן מהותי, נעדכן את התאריך שבראש העמוד ונודיע בתוך האפליקציה.</p>`],
    en: ['Privacy Policy', `<p class="legal-note">RAVO is a service for running a shared space for a home (RAVO Home) or a business (RAVO Business). This policy explains what information is kept, why, where, who can see it and what you can do about it. RAVO is in beta and is currently free.</p>
<h2>Who is responsible</h2><p>The person responsible for the information (the database controller under the Israeli Privacy Protection Law) is RAVO’s operator, Liel Berenstein. Privacy enquiries: ${MAIL}.</p>
<h2>Information kept</h2>
<p><strong>Account:</strong> email address, account identifier, display name and your role in each space. You can choose a RAVO password, which is stored hashed and is not readable to us as text, or use Apple’s identity service in the iPhone app. Apple gives us a verified email address and an account identifier — never your Apple password. If you choose Hide My Email, Apple’s relay address is what we keep.</p>
<p><strong>Home space content:</strong> tasks, shopping, pantry, meals, bills, spending, budgets and savings goals, calendar events, the activity log and notifications that members add.</p>
<p><strong>Business space content:</strong> the business name, details of members and staff provided in the space, roles and permissions, tasks and assignments, procurement, spending, events, team updates, equipment and maintenance reports. If you add vendors, their names and the contact details you enter are kept.</p>
<p><strong>Information about other people:</strong> when you invite someone, the email address, name and role you entered are kept, including after the invitation expires. RAVO does not send the invitation itself: you share the link. When you enter details of vendors, staff or contacts, you are responsible for having permission to do so. We use such information only to run the space.</p>
<p><strong>Profile photo (optional):</strong> you can choose a photo or take one. It is cropped, resized and stripped of camera metadata on the device before upload to private storage, and shown to authorised members through a temporary link. There is no blanket photo-library access and no background capture. You can remove it at any time.</p>
<p><strong>Notifications:</strong> if you turn them on, an Apple device token is kept for the iPhone app, or a push endpoint and encryption keys for a browser. A notification may include a title and a short line from an item you are allowed to see — such as a task name, an event name and time, or a bill name and its due date (no amount). Notifications also appear on the lock screen unless you choose to hide previews in your device settings. The assistant’s daily reminder is scheduled locally on the device and includes no task details or financial information.</p>
<p><strong>Security records and technical information:</strong> the authentication service keeps a record of account actions such as sign-up, account access and password reset, including the time and IP address, for security and abuse prevention. Infrastructure providers keep technical access logs, such as IP address and browser type, for a short period. Error diagnostics stay on the device and are not sent automatically; if you contact support, you choose what to share.</p>
<h2>Information that may be sensitive</h2><p>Bills and spending, information about children and anything you write freely (for example a doctor’s appointment) may be sensitive, and we treat it that way. Do not enter credit card numbers, passwords, ID numbers or detailed medical information in RAVO; the service is not designed to hold that kind of information.</p>
<h2>Minors</h2><p>Signing up for RAVO by yourself is for people aged 18 and over. Children and teenagers take part only when a parent or responsible adult in the home invites them, under that adult’s responsibility. An invitation requires an email address, so a minor in RAVO has an account and an email address kept for them, alongside a display name, a role and the content they create or are assigned. The child role has narrow permissions: no access to bills and payments. We do not direct marketing at minors and make no advertising use of their details. If we learn that a minor opened an account alone without an invitation, we may close it. A parent can contact us to see, correct or delete their child’s information.</p>
<h2>Is giving information compulsory?</h2><p>There is no legal obligation to give us information. An email address is needed to open an account, and the service cannot be used without one. Everything else is given voluntarily, and the only consequence of not giving it is that the features that rely on it will not work.</p>
<h2>How information is used</h2><p>Only to run the service: showing information, syncing between members, enforcing permissions, notifications, the assistant’s suggestions, security and abuse prevention, and answering your requests. Quick Add reads what you wrote on the device itself. The assistant works out suggestions with rules, using only information you are allowed to see. Content is not sent to an outside AI service, is not used to train models and is not used for advertising. Assistant preferences stay on the device. A draft handed over from iPhone Shortcuts is saved to the space only after you confirm it.</p>
<h2>What we do not do</h2><p>We do not read the device’s location, contacts, device calendar or microphone. We do not sell personal information, show ads, run targeted advertising — including towards minors — or use tracking cookies on the public website. We do not send marketing messages: the emails we send are service messages only, such as account verification and password reset.</p>
<h2>Who sees what</h2><p>Access is based on account, space membership and role permissions. Permissions are enforced in the database, so information a role may not see is never sent to that person’s device. Children, household staff and guests do not receive bills and payments. Separate spaces cannot reach each other, even when one account belongs to a home and a business.</p>
<h2>Technical access by the operator and providers</h2><p>As with most cloud services, the information is not end-to-end encrypted, so the operator and authorised infrastructure providers have the technical ability to access it. Such access happens only when needed to run the service, for security, maintenance, fixing faults, handling your request, or where the law requires it, and only to the limited extent needed. We do not read workspace content as a matter of routine.</p>
<h2>Service providers</h2><p>We do not sell information to anyone. Information is passed only to providers that run part of the service for us, and only for that purpose:</p>
<ul><li><strong>Supabase</strong> — the database, authentication, photo storage, sync and notification scheduling. The project is in the Seoul, South Korea region; the company is American.</li><li><strong>Brevo</strong> — sending service email (account verification and password reset). It receives the email address and the message content. European Union.</li><li><strong>Apple</strong> — Apple’s identity service, if you choose it, and delivery of notifications to iPhone.</li><li><strong>Browser notification services</strong> — Google, Mozilla, Apple or Microsoft, depending on your browser, deliver browser notifications. The notification content is encrypted on its way to them.</li><li><strong>GitHub Pages</strong> — hosting of the website and the browser version of the app. GitHub may keep technical access logs.</li></ul>
<h2>Transfer outside Israel</h2><p>Information is stored and processed outside Israel: the database and files in South Korea and, depending on the provider, also in the United States and the European Union. The transfer is needed to run the service, and using RAVO involves it.</p>
<h2>How long information is kept</h2><p>Information is kept while the account exists, and some of it is deleted automatically before that: the activity log after 120 days; notifications 30 days after being read, and after 90 days at most; automation run records after 30 days. The authentication service’s security records and expired invitations are currently kept without automatic deletion; we are working to set a limited retention period for them and will update this page when it is set.</p>
<h2>Account deletion</h2><p>Account deletion is in the app’s Settings and takes effect immediately: your account, profile photos, notification tokens and any space where you are the only member — with all its content — are deleted. In a shared space, what you created stays with the other members, no longer attached to you.</p><p>After deletion, the following may still remain: notifications and activity records already delivered to others, until the automatic clean-up; invitations you sent or received; the authentication service’s security records; and the infrastructure provider’s backups, until they are replaced. You can also ask for deletion without the app, as described on the <a href="../support/#delete-account">support page</a>.</p>
<h2>Security</h2><p>Connections between your device and the servers are encrypted, and the infrastructure provider encrypts storage and backups. This protects information in transit and at rest, but it is not end-to-end: the servers can read the information in order to run the service. Permissions are enforced row by row in the database, privileged keys are never sent to the device, and passwords are not stored as text. No service is completely immune. If a serious security incident affects your information, we will act as the law requires, including giving notice where it is required.</p>
<h2>Your rights</h2><p>You have the right to see the information kept about you, to ask for it to be corrected if it is not accurate, complete, clear or up to date, and to delete your account at any time. Most viewing and correcting can be done in the app, and deletion in Settings. To ask for a copy of your information, to make a request on behalf of a child you are responsible for, or if a correction request was refused, write to ${MAIL}. If you are not satisfied with the answer, you may turn to the Privacy Protection Authority and to the courts.</p>
<h2>Changes</h2><p>If this policy changes materially, we will update the date at the top of the page and tell you in the app.</p>`]
  },
  terms: {
    he: ['תנאי שימוש', `<p class="legal-note">השימוש ב־RAVO מהווה הסכמה לתנאים האלה ול<a href="../privacy/">מדיניות הפרטיות</a>. RAVO ניתן כרגע בחינם.</p>
<h2>פרטי המפעיל</h2><p><strong>שם:</strong> ליאל ברנשטיין<br><strong>דוא״ל:</strong> ${MAIL}</p>
<h2>השירות</h2><p>RAVO מסייע לבית או לעסק לנהל משימות, קניות, יומן, חשבונות ותפעול משותף, ולשתף אותם בין החברים לפי תפקידים. הוא כלי עזר לארגון ואינו שירות בנקאי, ייעוץ פיננסי, משפטי, רפואי או מקצועי, ואינו שירות חירום. אין להסתמך עליו במקום שבו תקלה עלולה לגרום נזק ממשי.</p>
<h2>מי יכול להשתמש</h2><p>פתיחת חשבון בעצמכם מותרת מגיל 18. ילדים ובני נוער משתתפים רק בהזמנה של הורה או מבוגר אחראי בבית. מי שפותח מרחב עסק בשם עסק מצהיר שיש לו רשות לעשות זאת.</p>
<h2>חשבון ואחריות</h2><p>עליכם לשמור על סודיות הסיסמה ועל המכשיר שלכם, ואתם אחראים לפעולות שנעשות בחשבונכם. יש למסור פרטים נכונים ולהשתמש בכתובת אימייל שבבעלותכם. מי שפותח מרחב ומזמין אליו אנשים — כולל קטינים ועובדים — אחראי לכך שיש לו רשות לעשות זאת ולבחירת התפקידים וההרשאות.</p>
<h2>מידע על אנשים אחרים</h2><p>כשאתם מזינים פרטים של אחרים — בני בית, עובדים, ספקים או אנשי קשר — אתם אחראים לכך שיש לכם רשות לעשות זאת ולשתף אותם עם בעלי ההרשאות במרחב, ושהשימוש בהם תואם את הדין.</p>
<h2>קטינים</h2><p>קטינים משתתפים רק כבני בית שהוזמנו על ידי מבוגר האחראי להם, ובאחריותו. ההזמנה יוצרת עבור הקטין חשבון משלו. RAVO אינו מפנה אל קטינים תוכן שיווקי ואינו עושה שימוש בפרטיהם לפרסום. חשבון שקטין פתח בעצמו בלי הזמנה עשוי להיסגר.</p>
<h2>ללא תשלום</h2><p>RAVO ניתן כרגע בחינם, בלי מנוי ובלי רכישות. אם בעתיד יתווספו תכונות בתשלום, נודיע על כך מראש, ושום חיוב לא יתבצע בלי הסכמה מפורשת שלכם.</p>
<h2>שימוש מותר</h2><p>אין להשתמש ב־RAVO באופן בלתי חוקי, להטרדה או לפגיעה באחרים, לפגיעה בפרטיות, לאחסון תוכן פוגעני או מפר זכויות, להפצת קוד מזיק, לניסיון לעקוף הרשאות או לגשת למידע של מרחב אחר, להעמסה חריגה או אוטומטית על השירות, או להעתקת השירות.</p>
<h2>התוכן שלכם</h2><p>התוכן שאתם מזינים נשאר שלכם. אתם מעניקים לנו רשות מוגבלת לאחסן, להעתיק ולעבד אותו לצורך הפעלת השירות, גיבויו והצגתו לחברי המרחב לפי הרשאותיהם — ולשום מטרה אחרת. אתם אחראים לתוכן שאתם מזינים.</p>
<h2>קניין רוחני</h2><p>השם RAVO, הסמל, העיצוב והתוכנה שייכים למפעיל השירות. השימוש בשירות אינו מעביר לכם זכויות בהם, מלבד רשות אישית להשתמש באפליקציה לפי התנאים האלה.</p>
<h2>זמינות ובטא</h2><p>RAVO בשלב בטא: ייתכנו תקלות, השבתות ושינויים בתכונות. השירות מסופק כפי שהוא, וללא התחייבות לזמינות רציפה או לשימור מידע. אל תסתמכו על RAVO כמקור יחיד למידע חשוב, כגון מועדי תשלום.</p>
<h2>הגבלת אחריות</h2><p>במידה המרבית המותרת בדין, לא נישא באחריות לנזק עקיף או תוצאתי, לאובדן מידע או לאובדן רווח הנובעים מהשימוש בשירות או מאי־זמינותו. אין באמור כדי לגרוע מזכויות שאינן ניתנות להתניה לפי דין, לרבות לפי חוק הגנת הצרכן.</p>
<h2>השעיה וסיום</h2><p>אפשר להפסיק להשתמש ב־RAVO ולמחוק את החשבון בכל עת דרך ההגדרות. אנו רשאים להגביל, להשעות או לסגור חשבון שמפר את התנאים האלה או שמסכן את השירות או משתמשים אחרים, ולהפסיק את השירות או חלקים ממנו. נשתדל להודיע מראש כשהדבר אפשרי.</p>
<h2>דין חל</h2><p>על תנאים אלה יחולו דיני מדינת ישראל, ולבתי המשפט המוסמכים בישראל תהא סמכות השיפוט.</p>
<h2>שינויים</h2><p>אם התנאים ישתנו באופן מהותי, נעדכן את התאריך שבראש העמוד ונודיע בתוך האפליקציה.</p>`],
    en: ['Terms of Use', `<p class="legal-note">Using RAVO means agreeing to these terms and to the <a href="../privacy/">privacy policy</a>. RAVO is currently free.</p>
<h2>Operator</h2><p><strong>Name:</strong> Liel Berenstein<br><strong>Email:</strong> ${MAIL}</p>
<h2>The service</h2><p>RAVO helps a home or business manage tasks, shopping, the calendar, bills and shared operations, and share them between members by role. It is an organising aid, not a banking service, and not financial, legal, medical or professional advice, nor an emergency service. Do not rely on it where a failure could cause real harm.</p>
<h2>Who can use RAVO</h2><p>You may open an account yourself from the age of 18. Children and teenagers take part only by invitation from a parent or responsible adult in the home. Anyone opening a business space on behalf of a business confirms they are allowed to do so.</p>
<h2>Accounts and responsibility</h2><p>You must keep your password and your device secure, and you are responsible for actions taken in your account. Provide accurate details and use an email address you own. Whoever opens a space and invites people to it — including minors and staff — is responsible for having permission to do so and for the roles and permissions chosen.</p>
<h2>Information about other people</h2><p>When you enter details of others — members of the household, staff, vendors or contacts — you are responsible for having permission to do so and to share them with the people allowed to see them in the space, and for using them lawfully.</p>
<h2>Minors</h2><p>Minors take part only as members of a household invited by an adult responsible for them, under that adult’s responsibility. The invitation creates an account of the minor’s own. RAVO does not direct marketing at minors and makes no advertising use of their details. An account a minor opened alone without an invitation may be closed.</p>
<h2>No charge</h2><p>RAVO is currently free, with no subscription and no purchases. If paid features are ever added, we will tell you in advance, and nothing will be charged without your explicit consent.</p>
<h2>Permitted use</h2><p>Do not use RAVO unlawfully, to harass or harm others, to violate privacy, to store offensive or infringing content, to spread malicious code, to try to bypass permissions or reach another space’s information, to place abnormal or automated load on the service, or to copy the service.</p>
<h2>Your content</h2><p>Content you enter remains yours. You give us a limited permission to store, copy and process it in order to run the service, back it up and show it to the space’s members according to their permissions — and for no other purpose. You are responsible for the content you enter.</p>
<h2>Intellectual property</h2><p>The RAVO name, icon, design and software belong to the service’s operator. Using the service does not transfer any rights in them to you, other than a personal permission to use the app under these terms.</p>
<h2>Availability and beta</h2><p>RAVO is in beta: faults, outages and changes to features may happen. The service is provided as is, without a commitment to continuous availability or to preserving information. Do not rely on RAVO as the only record of important information, such as payment dates.</p>
<h2>Limitation of liability</h2><p>To the fullest extent the law allows, we are not liable for indirect or consequential damage, loss of information or loss of profit arising from use of the service or its unavailability. Nothing here limits rights that cannot be waived under law, including under the Israeli Consumer Protection Law.</p>
<h2>Suspension and termination</h2><p>You can stop using RAVO and delete your account at any time from Settings. We may limit, suspend or close an account that breaches these terms or endangers the service or other users, and may discontinue the service or parts of it. We will try to give notice in advance where possible.</p>
<h2>Governing law</h2><p>These terms are governed by the laws of the State of Israel, and the competent courts in Israel have jurisdiction.</p>
<h2>Changes</h2><p>If these terms change materially, we will update the date at the top of the page and tell you in the app.</p>`]
  },
  accessibility: {
    he: ['הצהרת נגישות', `<p class="legal-note">RAVO נבנה עבור בית שלם — כולל אנשים שרואים, שומעים או מפעילים מכשיר אחרת. ההתאמה נמשכת והאתר טרם עבר ביקורת נגישות מוסמכת.</p><h2>מה נעשה באתר</h2><ul><li>מבנה סמנטי וכותרות ברורות.</li><li>ניווט מקלדת ומיקוד נראה.</li><li>ניגודיות וטקסט חלופי לתמונות מוצר.</li><li>עברית מימין לשמאל ואנגלית משמאל לימין.</li><li>שטחי הפעלה נדיבים והתאמה למסכים קטנים.</li><li>כיבוד העדפת המערכת להפחתת תנועה.</li></ul><h2>מה עדיין לא נבדק</h2><p>לא בוצעה ביקורת חיצונית מלאה או בדיקה מקיפה בכל קוראי המסך והמכשירים. לכן איננו מצהירים על הסמכה או התאמה מלאה לתקן.</p><h2>דרך חלופית ופניות</h2><p>רכז הנגישות: ליאל ברנשטיין. אם תוכן מסוים אינו נגיש לכם, כתבו אל ${MAIL}. נשמח לספק מידע בדרך חלופית ולטפל בליקוי.</p>`],
    en: ['Accessibility Statement', `<p class="legal-note">RAVO is being built for a whole household — including people who see, hear or operate a device differently. Accessibility work is ongoing and the site has not had a certified audit.</p><h2>What the website supports</h2><ul><li>Semantic structure and clear headings.</li><li>Keyboard navigation and visible focus.</li><li>Colour contrast and alternative text for product imagery.</li><li>Right-to-left Hebrew and left-to-right English.</li><li>Generous touch targets and small-screen layouts.</li><li>Respect for reduced-motion system preferences.</li></ul><h2>What hasn’t been fully tested</h2><p>No complete external audit or exhaustive testing across every screen reader and device has taken place. We therefore do not claim certification or full standards conformance.</p><h2>Alternative access and contact</h2><p>Accessibility coordinator: Liel Berenstein. If any content is inaccessible, email ${MAIL}. We’ll provide an alternative format and work to fix the issue.</p>`]
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
    updated: 'עודכן: 6 באוקטובר 2026',
    tagline: 'סדר בבית ובעסק',
    skip: 'דילוג לתוכן',
    switchLabel: 'Switch to English',
    nav: 'מידע משפטי'
  },
  en: {
    back: 'Back to website',
    updated: 'Updated: 6 October 2026',
    tagline: 'Home and Business, in sync',
    skip: 'Skip to content',
    switchLabel: 'החלפה לעברית',
    nav: 'Legal information'
  }
}

const ORDER = ['support', 'privacy', 'terms', 'accessibility']
const SHORT = {
  support: { he: 'תמיכה', en: 'Support' },
  privacy: { he: 'פרטיות', en: 'Privacy' },
  terms: { he: 'תנאי שימוש', en: 'Terms' },
  accessibility: { he: 'נגישות', en: 'Accessibility' }
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
  /* A link to #delete-account lands on that question once the page has been written. */
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView()
}

let saved = 'he'
try { saved = localStorage.getItem('ravo-marketing-language') === 'en' ? 'en' : 'he' } catch { /* private mode */ }
render(saved)
switcher.addEventListener('click', () => render(document.documentElement.lang === 'he' ? 'en' : 'he'))

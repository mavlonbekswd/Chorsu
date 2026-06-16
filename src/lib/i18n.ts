import { ideas, nasiyaDetail, caravans } from "./data";

export type Lang = "en" | "ru" | "uz";

export const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "uz", label: "UZ", name: "O‘zbek" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
];

// All translatable copy, per locale. Structural data (slugs, schema field
// names, API paths, prices) lives in data.ts; code identifiers are not
// translated. getContent() merges the two into render-ready content.
const T = {
  en: {
    nav: { stalls: "Stalls", route: "The Route", caravans: "Caravans", login: "Log in", enter: "Enter the bazaar" },
    hero: {
      eyebrow: "The bazaar of ideas · Central Asia",
      headline: "Every great build starts at the bazaar.",
      sub: "Chorsu is a marketplace of ready-to-build startup ideas — each one carrying its full architecture: the problem, the solution, the database, the API, and the road to revenue. Pick an idea. Carry it home. Build.",
      primary: "Enter the bazaar",
      secondary: "See the stalls",
    },
    route: {
      eyebrow: "The trade route",
      title: "Three stops on the road from idea to build.",
      stops: [
        { title: "Browse the stalls", body: "Wander a growing bazaar of ideas, sorted by sector and stack." },
        { title: "Choose your good", body: "Pick the idea that fits your market and your hands." },
        { title: "Build the same day", body: "Unlock its full architecture and start — no setup days lost on the road." },
      ],
    },
    stalls: {
      eyebrow: "Today's stalls",
      title: "The goods on display today.",
      sub: "Each stall holds an idea grounded in a real local problem. Unlock one to carry home its full architecture.",
      locked: "Architecture locked",
      cta: "Walk the whole bazaar",
    },
    sectors: { Retail: "Retail", Food: "Food", Education: "Education", Health: "Health", Services: "Services" },
    problems: {
      nasiya: "Digital credit ledger for neighborhood shops. Retire the paper debt notebook.",
      smena: "Shift & staff scheduler for cafes, with auto-calculated hours.",
      davomat: "Attendance + tuition tracker for learning centers, with parent alerts.",
      dorixona: "Inventory + expiry alerts for small pharmacies.",
      yetkaz: "Order & dispatch CRM for cleaning, moving, and repair crews.",
      sodiq: "Telegram-mini-app loyalty program for local stores.",
    },
    inside: {
      eyebrow: "Inside a stall",
      title: "What you carry home.",
      subPre: "One stall, opened up. This is ",
      subPost: " — a digital credit ledger for neighborhood shops. Walk through the craft behind the good.",
      unlocked: "unlocked",
      open: "open",
      views: { need: "The need", design: "The design", foundation: "The foundation", connections: "The connections", trade: "The trade" },
      need: nasiyaDetail.need,
      design: nasiyaDetail.design,
      trade: nasiyaDetail.trade,
      purposes: nasiyaDetail.endpoints.map((e) => e.purpose),
    },
    promise: {
      eyebrow: "The merchant's promise",
      title: "Why trade here.",
      items: [
        { title: "Real goods, not echoes", body: "Every idea is shaped around a true local problem, with architecture you can ship — not a generic answer you could get anywhere." },
        { title: "Made for these roads", body: "Click, Payme, and Telegram are woven into each blueprint, not bolted on." },
        { title: "No wasted days", body: "The foundation and connections come ready — begin real work, not setup." },
        { title: "The bazaar never sleeps", body: "Fresh, market-specific ideas arrive every week." },
      ],
    },
    caravans: {
      eyebrow: "Choose your caravan",
      title: "Pick how you travel the bazaar.",
      note: "Prices are placeholders, set by the owner.",
      free: "Free",
      unit: "so'm / mo",
      plans: {
        Wanderer: { tagline: "Free", blurb: "Walk the whole bazaar and open a few stalls in full.", cta: "Start wandering", features: ["Browse all stalls in the catalog", "A handful of ideas fully unlocked", "Sector & stack filters", "Weekly highlights newsletter"] },
        Merchant: { tagline: "Most chosen", blurb: "Every idea open, with fresh goods arriving each week.", cta: "Become a merchant", features: ["Every idea fully unlocked", "Full architecture: DB, API, monetization", "New market-specific ideas weekly", "Click & Payme integration blueprints", "Save and organize your shortlist"] },
        Caravan: { tagline: "Team", blurb: "For bootcamps and agencies travelling together.", cta: "Assemble a caravan", features: ["Everything in Merchant", "Up to 10 seats", "Shared workspace & shortlists", "Priority on new-idea requests", "Invoice billing"] },
      },
    },
    final: { line: "The bazaar is open. Your next idea is waiting at a stall.", button: "Enter the bazaar" },
    footer: {
      desc: "The bazaar of ideas for Central Asia — ready-to-build startups, with their architecture included.",
      cols: { bazaar: "Bazaar", about: "About", legal: "Legal" },
      links: { stalls: "Stalls", caravans: "Caravans", route: "The Route", story: "Story", contact: "Contact", terms: "Terms", privacy: "Privacy" },
      rights: "The bazaar of ideas.",
    },
    signup: { title: "The gate to the bazaar.", body: "Sign-up isn't wired up yet — this is a stub. The catalog, accounts, and unlocks come in the next phase of the build.", back: "← Back to the bazaar" },
  },

  ru: {
    nav: { stalls: "Лавки", route: "Путь", caravans: "Караваны", login: "Вход", enter: "Войти на базар" },
    hero: {
      eyebrow: "Базар идей · Центральная Азия",
      headline: "Каждое великое дело начинается на базаре.",
      sub: "Chorsu — это маркетплейс готовых к запуску стартап-идей, каждая из которых несёт полную архитектуру: проблему, решение, базу данных, API и путь к выручке. Выберите идею. Заберите домой. Стройте.",
      primary: "Войти на базар",
      secondary: "Посмотреть лавки",
    },
    route: {
      eyebrow: "Торговый путь",
      title: "Три остановки на пути от идеи к запуску.",
      stops: [
        { title: "Обойдите лавки", body: "Гуляйте по растущему базару идей, отсортированных по отрасли и стеку." },
        { title: "Выберите товар", body: "Выберите идею, которая подходит вашему рынку и вашим рукам." },
        { title: "Стройте в тот же день", body: "Откройте полную архитектуру и начните — без потерянных дней на настройку." },
      ],
    },
    stalls: {
      eyebrow: "Сегодняшние лавки",
      title: "Товары на витрине сегодня.",
      sub: "Каждая лавка хранит идею, выросшую из реальной местной проблемы. Откройте любую, чтобы забрать домой её полную архитектуру.",
      locked: "Архитектура закрыта",
      cta: "Пройти весь базар",
    },
    sectors: { Retail: "Розница", Food: "Еда", Education: "Образование", Health: "Здоровье", Services: "Услуги" },
    problems: {
      nasiya: "Цифровая книга долгов для районных магазинов. Замените бумажную тетрадь долгов.",
      smena: "Планировщик смен и персонала для кафе с автоматическим расчётом часов.",
      davomat: "Учёт посещаемости и оплаты для учебных центров с уведомлениями родителям.",
      dorixona: "Учёт остатков и уведомления о сроках годности для небольших аптек.",
      yetkaz: "CRM приёма и распределения заказов для бригад уборки, переездов и ремонта.",
      sodiq: "Программа лояльности в виде Telegram-мини-приложения для местных магазинов.",
    },
    inside: {
      eyebrow: "Внутри лавки",
      title: "Что вы забираете домой.",
      subPre: "Одна лавка, открытая. Это ",
      subPost: " — цифровая книга долгов для районных магазинов. Пройдитесь по мастерству за этим товаром.",
      unlocked: "открыто",
      open: "открыто",
      views: { need: "Потребность", design: "Решение", foundation: "Основа", connections: "Связи", trade: "Торговля" },
      need: [
        "Районные магазины продают в долг — «насия» — и записывают это в бумажную тетрадь (дафтар). Страницы намокают, имена расплываются, а споры начинаются с «я уже это оплатил».",
        "Владелец не видит, кто должен больше всех, кто просрочил и сколько денег заморожено в долгах в любой момент.",
        "Когда покупатель уезжает или магазин меняет хозяина, память тетради уходит вместе с ней.",
      ],
      design: [
        "Книга долгов в телефоне: добавьте клиента, запишите продажу в долг в два касания, отмечайте платежи по мере поступления.",
        "У каждого клиента есть текущий баланс и история. Напоминание уходит одним касанием через Telegram или SMS на узбекском или русском.",
        "Дашборд показывает общий долг, просроченные счета и сегодняшние платежи — тот же дафтар, только умеющий считать и ничего не забывающий.",
      ],
      trade: [
        "Бесплатно для одного магазина до 30 клиентов — пусть владелец откажется от тетради и почувствует, как это работает.",
        "Pro за ~30 000 сум/месяц: неограниченное число клиентов, напоминания в Telegram и дашборд просрочки.",
        "Берите небольшую плату за каждое отправленное автоматическое напоминание через Payme или Click.",
        "Продавайте от магазина к магазину: каждый владелец знает десяток других на той же улице с такой же намокшей тетрадью.",
      ],
      purposes: [
        "Добавить клиента в книгу",
        "Список клиентов с текущими балансами",
        "Записать продажу в долг или платёж",
        "Полная история одного клиента",
        "Отправить напоминание о долге через Telegram/SMS",
        "Итоги: задолженность, просрочка, сегодняшние платежи",
      ],
    },
    promise: {
      eyebrow: "Обещание торговца",
      title: "Почему торговать здесь.",
      items: [
        { title: "Настоящий товар, а не эхо", body: "Каждая идея выстроена вокруг реальной местной проблемы, с архитектурой, которую можно запустить, — а не общий ответ, который можно получить где угодно." },
        { title: "Сделано для этих дорог", body: "Click, Payme и Telegram вплетены в каждый чертёж, а не прикручены сверху." },
        { title: "Без потерянных дней", body: "Основа и связи готовы — начинайте настоящую работу, а не настройку." },
        { title: "Базар никогда не спит", body: "Свежие идеи под конкретный рынок появляются каждую неделю." },
      ],
    },
    caravans: {
      eyebrow: "Выберите свой караван",
      title: "Выберите, как путешествовать по базару.",
      note: "Цены — это заглушки, заданные владельцем.",
      free: "Бесплатно",
      unit: "сум / мес",
      plans: {
        Wanderer: { tagline: "Бесплатно", blurb: "Пройдите весь базар и откройте несколько лавок полностью.", cta: "Начать прогулку", features: ["Просмотр всех лавок в каталоге", "Несколько идей открыты полностью", "Фильтры по отрасли и стеку", "Еженедельная рассылка лучшего"] },
        Merchant: { tagline: "Чаще всего выбирают", blurb: "Все идеи открыты, новые товары каждую неделю.", cta: "Стать торговцем", features: ["Каждая идея открыта полностью", "Полная архитектура: БД, API, монетизация", "Новые идеи под рынок каждую неделю", "Чертежи интеграции Click и Payme", "Сохраняйте и упорядочивайте свой список"] },
        Caravan: { tagline: "Команда", blurb: "Для буткемпов и агентств, путешествующих вместе.", cta: "Собрать караван", features: ["Всё из Merchant", "До 10 мест", "Общее рабочее пространство и списки", "Приоритет в запросах новых идей", "Оплата по счёту"] },
      },
    },
    final: { line: "Базар открыт. Ваша следующая идея ждёт у лавки.", button: "Войти на базар" },
    footer: {
      desc: "Базар идей для Центральной Азии — готовые к запуску стартапы вместе с их архитектурой.",
      cols: { bazaar: "Базар", about: "О нас", legal: "Правовое" },
      links: { stalls: "Лавки", caravans: "Караваны", route: "Путь", story: "История", contact: "Контакты", terms: "Условия", privacy: "Конфиденциальность" },
      rights: "Базар идей.",
    },
    signup: { title: "Ворота на базар.", body: "Регистрация ещё не подключена — это заглушка. Каталог, аккаунты и разблокировки появятся на следующем этапе.", back: "← Назад на базар" },
  },

  uz: {
    nav: { stalls: "Rastalar", route: "Yo‘l", caravans: "Karvonlar", login: "Kirish", enter: "Bozorga kiring" },
    hero: {
      eyebrow: "G‘oyalar bozori · Markaziy Osiyo",
      headline: "Har bir buyuk loyiha bozordan boshlanadi.",
      sub: "Chorsu — ishga tayyor startap g‘oyalari bozori. Har bir g‘oya o‘zining to‘liq arxitekturasini olib yuradi: muammo, yechim, ma’lumotlar bazasi, API va daromad yo‘li. G‘oyani tanlang. Uyga olib keting. Quring.",
      primary: "Bozorga kiring",
      secondary: "Rastalarni ko‘rish",
    },
    route: {
      eyebrow: "Savdo yo‘li",
      title: "G‘oyadan loyihagacha bo‘lgan yo‘lda uchta bekat.",
      stops: [
        { title: "Rastalarni aylaning", body: "Soha va texnologiya bo‘yicha tartiblangan o‘sib borayotgan g‘oyalar bozorini aylanib chiqing." },
        { title: "O‘z molingizni tanlang", body: "Bozoringizga va qo‘lingizga mos g‘oyani tanlang." },
        { title: "O‘sha kuni quring", body: "To‘liq arxitekturani oching va boshlang — sozlashga kun yo‘qotmasdan." },
      ],
    },
    stalls: {
      eyebrow: "Bugungi rastalar",
      title: "Bugun ko‘rgazmadagi mollar.",
      sub: "Har bir rasta haqiqiy mahalliy muammoga asoslangan g‘oyani saqlaydi. Bittasini ochib, uning to‘liq arxitekturasini uyga olib keting.",
      locked: "Arxitektura qulflangan",
      cta: "Butun bozorni aylanish",
    },
    sectors: { Retail: "Chakana", Food: "Ovqat", Education: "Ta’lim", Health: "Sog‘liq", Services: "Xizmatlar" },
    problems: {
      nasiya: "Mahalla do‘konlari uchun raqamli nasiya daftari. Qog‘oz qarz daftarini yig‘ishtiring.",
      smena: "Kafelar uchun smena va xodimlar jadvali, soatlar avtomatik hisoblanadi.",
      davomat: "O‘quv markazlari uchun davomat va to‘lov hisobi, ota-onalarga xabar bilan.",
      dorixona: "Kichik dorixonalar uchun ombor hisobi va yaroqlilik muddati ogohlantirishlari.",
      yetkaz: "Tozalash, ko‘chirish va ta’mirlash brigadalari uchun buyurtma va dispetcherlik CRM.",
      sodiq: "Mahalliy do‘konlar uchun Telegram-mini-ilova ko‘rinishidagi sodiqlik dasturi.",
    },
    inside: {
      eyebrow: "Rasta ichida",
      title: "Uyga nima olib ketasiz.",
      subPre: "Bitta rasta, ochilgan. Bu ",
      subPost: " — mahalla do‘konlari uchun raqamli nasiya daftari. Mol ortidagi hunar bilan tanishing.",
      unlocked: "ochilgan",
      open: "ochiq",
      views: { need: "Ehtiyoj", design: "Yechim", foundation: "Poydevor", connections: "Aloqalar", trade: "Savdo" },
      need: [
        "Mahalla do‘konlari nasiyaga sotadi va buni qog‘oz daftarga yozadi. Sahifalar ho‘l bo‘ladi, ismlar o‘chadi, va janjal «men buni to‘laganman» degan gapdan boshlanadi.",
        "Egasi kim ko‘p qarzdor, kim muddatini o‘tkazgan va ayni paytda qancha pul qarzga muzlatilganini ko‘ra olmaydi.",
        "Mijoz uzoqqa ketsa yoki do‘kon egasi o‘zgarsa, daftarning xotirasi eshikdan chiqib ketadi.",
      ],
      design: [
        "Telefondagi daftar: mijoz qo‘shing, nasiya savdoni ikki teginishda yozing, to‘lovlarni kelganda belgilang.",
        "Har bir mijozning joriy balansi va tarixi bor. Eslatma bir teginishda Telegram yoki SMS orqali o‘zbek yoki rus tilida yuboriladi.",
        "Boshqaruv paneli umumiy qarz, muddati o‘tgan hisoblar va bugungi to‘lovlarni ko‘rsatadi — o‘sha daftar, faqat hisoblay oladigan va hech narsani unutmaydigan.",
      ],
      trade: [
        "Bitta do‘kon uchun 30 ta mijozgacha bepul — egasi daftarni yig‘ishtirib, qanday ishlashini his qilsin.",
        "Pro ~30 000 so‘m/oy: cheksiz mijozlar, Telegram eslatmalari va muddati o‘tganlar paneli.",
        "Har bir yuborilgan avtomatik eslatma uchun Payme yoki Click orqali kichik haq oling.",
        "Do‘kondan do‘konga soting: har bir ega o‘sha ko‘chada xuddi shunday ho‘l daftarli o‘nta boshqasini biladi.",
      ],
      purposes: [
        "Daftarga mijoz qo‘shish",
        "Joriy balansli mijozlar ro‘yxati",
        "Nasiya savdo yoki to‘lovni yozish",
        "Bitta mijozning to‘liq tarixi",
        "Telegram/SMS orqali qarz eslatmasini yuborish",
        "Jami: qarz, muddati o‘tgan, bugungi to‘lovlar",
      ],
    },
    promise: {
      eyebrow: "Savdogarning va’dasi",
      title: "Nega bu yerda savdo qilish kerak.",
      items: [
        { title: "Haqiqiy mol, aks-sado emas", body: "Har bir g‘oya haqiqiy mahalliy muammo atrofida qurilgan, ishga tushiriladigan arxitektura bilan — istalgan joyda topiladigan umumiy javob emas." },
        { title: "Shu yo‘llar uchun yaratilgan", body: "Click, Payme va Telegram har bir loyihaga to‘qib chiqilgan, ustidan biriktirilmagan." },
        { title: "Behuda kunlar yo‘q", body: "Poydevor va aloqalar tayyor — sozlash emas, haqiqiy ishni boshlang." },
        { title: "Bozor hech qachon uxlamaydi", body: "Bozorga moslashtirilgan yangi g‘oyalar har hafta keladi." },
      ],
    },
    caravans: {
      eyebrow: "Karvoningizni tanlang",
      title: "Bozorni qanday kezishni tanlang.",
      note: "Narxlar — egasi tomonidan qo‘yilgan vaqtinchalik qiymatlar.",
      free: "Bepul",
      unit: "so‘m / oy",
      plans: {
        Wanderer: { tagline: "Bepul", blurb: "Butun bozorni aylanib, bir nechta rastani to‘liq oching.", cta: "Aylanishni boshlash", features: ["Katalogdagi barcha rastalarni ko‘rish", "Bir nechta g‘oya to‘liq ochiq", "Soha va stek bo‘yicha filtrlar", "Haftalik eng yaxshilar xabarnomasi"] },
        Merchant: { tagline: "Eng ko‘p tanlanadi", blurb: "Barcha g‘oyalar ochiq, har hafta yangi mollar.", cta: "Savdogar bo‘lish", features: ["Har bir g‘oya to‘liq ochiq", "To‘liq arxitektura: MB, API, monetizatsiya", "Har hafta bozorga mos yangi g‘oyalar", "Click va Payme integratsiyasi loyihalari", "Ro‘yxatingizni saqlang va tartiblang"] },
        Caravan: { tagline: "Jamoa", blurb: "Birga sayohat qiladigan butkemp va agentliklar uchun.", cta: "Karvon yig‘ish", features: ["Merchant’dagi hammasi", "10 tagacha o‘rin", "Umumiy ish maydoni va ro‘yxatlar", "Yangi g‘oya so‘rovlarida ustuvorlik", "Hisob-faktura orqali to‘lov"] },
      },
    },
    final: { line: "Bozor ochiq. Keyingi g‘oyangiz rastada kutmoqda.", button: "Bozorga kiring" },
    footer: {
      desc: "Markaziy Osiyo uchun g‘oyalar bozori — arxitekturasi bilan birga ishga tayyor startaplar.",
      cols: { bazaar: "Bozor", about: "Biz haqimizda", legal: "Huquqiy" },
      links: { stalls: "Rastalar", caravans: "Karvonlar", route: "Yo‘l", story: "Tarix", contact: "Aloqa", terms: "Shartlar", privacy: "Maxfiylik" },
      rights: "G‘oyalar bozori.",
    },
    signup: { title: "Bozor darvozasi.", body: "Ro‘yxatdan o‘tish hali ulanmagan — bu vaqtinchalik sahifa. Katalog, hisoblar va ochishlar qurilishning keyingi bosqichida keladi.", back: "← Bozorga qaytish" },
  },
} as const;

export function getContent(lang: Lang) {
  const t = T[lang];
  return {
    ...t,
    stalls: {
      ...t.stalls,
      ideas: ideas.map((i) => ({
        slug: i.slug,
        name: i.name,
        sector: i.sector,
        sectorLabel: t.sectors[i.sector],
        problem: t.problems[i.slug as keyof typeof t.problems],
      })),
    },
    inside: {
      ...t.inside,
      schema: nasiyaDetail.schema,
      endpoints: nasiyaDetail.endpoints.map((e, idx) => ({ ...e, purpose: t.inside.purposes[idx] })),
    },
    caravanCards: caravans.map((c) => {
      const p = t.caravans.plans[c.name as keyof typeof t.caravans.plans];
      return {
        name: c.name,
        price: c.price,
        unit: c.unit ? t.caravans.unit : "",
        highlighted: c.highlighted,
        free: t.caravans.free,
        tagline: p.tagline,
        blurb: p.blurb,
        cta: p.cta,
        features: p.features as readonly string[],
      };
    }),
  };
}

export type Content = ReturnType<typeof getContent>;

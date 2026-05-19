export const BRAND = {
  name: "КРИС, СКАЖИ МНЕ",
  emoji: "🕊",
  fullName: "Кристина Ефременкова",
  title: "Перинатальный психолог",
  city: "Брянск",
};

export const SOCIAL = {
  telegramChannel: "https://t.me/kris_tellme_channel",
  vk: "https://vk.com/kris_tellme",
  instagram: "https://www.instagram.com/kris_tellme",
};

export const CONTACT = {
  telegramUsername: "Kris_tellme",
  telegramLink: "https://t.me/Kris_tellme",
};

export const SERVICES = {
  consultation: {
    title: "Консультация 50 минут",
    price: "4 900 ₽",
    description: "Глубокая работа по тревогам и страхам, связанным с родами. Zoom или Телемост.",
    tgMessage: "Здравствуйте, Кристина! Хочу записаться на консультацию.",
  },
  makExpress: {
    title: "МАК-экспресс",
    price: "донейшн от 500 ₽",
    description: "Расшифровка метафорической карты — 2 голосовых сообщения в Telegram или ВК, ~5 минут.",
    tgMessage: "Здравствуйте, Кристина! Хочу заказать МАК-экспресс.",
  },
};

// Категории бесплатных копинг-карточек (в порядке вывода на сайте)
export const CARD_CATEGORIES = [
  {
    slug: "strah-rodov",
    title: "Страх родов",
    description: "Боль, контроль, план Б — три опоры для самых частых страхов.",
  },
  {
    slug: "prinyatie-tela",
    title: "Принятие тела",
    description: "Изменения во время беременности и после родов — без стыда и спешки.",
  },
  {
    slug: "otnosheniya",
    title: "Окружение и отношения",
    description: "Партнёр, советы окружающих, границы со старшими.",
  },
  {
    slug: "izmeneniya-v-zhizni",
    title: "Изменения в жизни",
    description: "Карьера, идентичность, дружба — что меняется и как с этим быть.",
  },
  {
    slug: "neopredelennost",
    title: "В период неопределённости",
    description: "Перед анализом, после тревожного приёма, в ожидании результата.",
  },
] as const;

// 15 бесплатных карточек по 3 на категорию.
// Slug и название должны совпадать со scripts/cards.config.mjs.
export const FREE_CARDS = [
  // Страх родов
  {
    slug: "strah-boli",
    category: "strah-rodov",
    title: "Боль — не враг, а спутник",
    description: "Когда мысли о боли в родах становятся навязчивыми.",
    pngUrl: "/cards/strah-boli.png",
  },
  {
    slug: "otpustit-kontrol",
    category: "strah-rodov",
    title: "Отпустить контроль",
    description: "Когда хочется всё спланировать до минуты — а получается иначе.",
    pngUrl: "/cards/otpustit-kontrol.png",
  },
  {
    slug: "plan-b-bezopasen",
    category: "strah-rodov",
    title: "План Б — это тоже план",
    description: "Если боишься, что «всё пойдёт не так» — вот опора.",
    pngUrl: "/cards/plan-b-bezopasen.png",
  },
  // Принятие тела
  {
    slug: "telo-menyaetsya",
    category: "prinyatie-tela",
    title: "Моё тело меняется",
    description: "Когда смотришь в зеркало и не узнаёшь себя.",
    pngUrl: "/cards/telo-menyaetsya.png",
  },
  {
    slug: "prinyatie-vneshnih-izmeneniy",
    category: "prinyatie-tela",
    title: "Растяжки, отёки, новая форма",
    description: "Когда внешние изменения вызывают стыд или грусть.",
    pngUrl: "/cards/prinyatie-vneshnih-izmeneniy.png",
  },
  {
    slug: "telo-posle-rodov",
    category: "prinyatie-tela",
    title: "Тело после родов — оно справляется",
    description: "В первые недели и месяцы, когда восстановление кажется бесконечным.",
    pngUrl: "/cards/telo-posle-rodov.png",
  },
  // Окружение и отношения
  {
    slug: "partner-v-novoy-roli",
    category: "otnosheniya",
    title: "Партнёр и я — оба в новой роли",
    description: "Когда раздражает, что он «не понимает» или делает «не так».",
    pngUrl: "/cards/partner-v-novoy-roli.png",
  },
  {
    slug: "filtr-sovetov",
    category: "otnosheniya",
    title: "Чужие советы — фильтр включён",
    description: "После разговоров, где насоветовали лишнего.",
    pngUrl: "/cards/filtr-sovetov.png",
  },
  {
    slug: "granicy-so-starshimi",
    category: "otnosheniya",
    title: "Границы со старшими",
    description: "Когда мама, свекровь или родственники забирают пространство.",
    pngUrl: "/cards/granicy-so-starshimi.png",
  },
  // Изменения в жизни
  {
    slug: "karyera-na-pauze",
    category: "izmeneniya-v-zhizni",
    title: "Карьера — не закончилась",
    description: "Когда страшно отдалиться от работы и потерять «себя».",
    pngUrl: "/cards/karyera-na-pauze.png",
  },
  {
    slug: "ya-menyayus",
    category: "izmeneniya-v-zhizni",
    title: "Я меняюсь — это рост, не потеря",
    description: "Когда не узнаёшь себя в зеркале и в собственных мыслях.",
    pngUrl: "/cards/ya-menyayus.png",
  },
  {
    slug: "druzhba-posle-roda",
    category: "izmeneniya-v-zhizni",
    title: "Дружба после рождения",
    description: "Когда отдалилась от подруг и кажется, что одна.",
    pngUrl: "/cards/druzhba-posle-roda.png",
  },
  // В период неопределённости
  {
    slug: "pered-analizom",
    category: "neopredelennost",
    title: "Перед анализом или УЗИ",
    description: "За день и в утро перед скринингом или процедурой.",
    pngUrl: "/cards/pered-analizom.png",
  },
  {
    slug: "nepravilnyy-diagnoz",
    category: "neopredelennost",
    title: "Услышала тревожное от врача",
    description: "Когда после приёма голова кружится от страшных слов.",
    pngUrl: "/cards/nepravilnyy-diagnoz.png",
  },
  {
    slug: "ozhidanie-rezultatov",
    category: "neopredelennost",
    title: "Ждать результаты",
    description: "В дни между сдачей и получением результата.",
    pngUrl: "/cards/ozhidanie-rezultatov.png",
  },
] as const;

// 3 премиум-карточки за кодом — глубокие фундаментальные опоры.
// SHA-256 от ACCESS_CODE = «kris2026» (поменять — обновить хеш ниже).
export const PREMIUM_CARDS = [
  {
    slug: "snizhenie-straha-rodov",
    title: "Снижение страха перед родами",
    description: "Базовая опора. Перенастраивает «роды страшные» в «роды естественные».",
    pngUrl: "/cards/snizhenie-straha-rodov.png",
  },
  {
    slug: "kogda-nakryvayet-trevoga",
    title: "Когда накрывает тревога",
    description: "Скорая помощь в моменте: дыхание 4-7-8, заземление, фраза-якорь.",
    pngUrl: "/cards/kogda-nakryvayet-trevoga.png",
  },
  {
    slug: "vstrecha-ne-ispytanie",
    title: "Встреча, а не испытание",
    description: "Образ родов как первой встречи с малышом — для дней, когда настрой проседает.",
    pngUrl: "/cards/vstrecha-ne-ispytanie.png",
  },
] as const;

// SHA-256(«kris2026»). Чтобы сменить код — пересчитай хеш:
// node -e "console.log(require('crypto').createHash('sha256').update('НОВЫЙКОД').digest('hex'))"
export const PREMIUM_CODE_HASH =
  "9bb0de1b64f17c8a46310ba167b55f3f97c34838ecc68c2359c084436dca9c88";

export const DISCLAIMER = "Материалы носят информационный характер и не заменяют медицинскую помощь.";

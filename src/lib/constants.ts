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

// Программы — две: подготовка к родам и сопровождение после.
// У каждой два тарифа: self (только видео) и personal (видео + 4 созвоны).
export const PROGRAMS = {
  prenatal: {
    slug: "prenatal",
    title: "Подготовка к родам",
    audienceLabel: "Для беременности",
    description:
      "Системная подготовка от «накручиваю сценарии» к «знаю, что делаю и у меня есть инструменты». Оптимально начать с 20-й недели.",
    self: {
      label: "Самостоятельно",
      price: "5 900 ₽",
      pricePer: "разовый платёж",
      includes: [
        "4 видео-модуля по 30–40 минут",
        "Рабочая тетрадь с упражнениями (PDF)",
        "Шаблон плана родов и чек-листы",
        "Доступ к видео навсегда",
      ],
      tgMessage:
        "Здравствуйте, Кристина! Хочу самостоятельный тариф программы «Подготовка к родам».",
    },
    personal: {
      label: "Персональный",
      price: "17 900 ₽",
      pricePer: "за 4 недели",
      includes: [
        "Всё из тарифа «Самостоятельно»",
        "4 живые встречи 50 минут (Zoom / Телемост)",
        "Персональный план на 14 дней после первой встречи",
        "Безлимит в Telegram/ВК всё время программы + 2 недели после",
        "Доступ к 18 копинг-карточкам по коду участницы",
      ],
      tgMessage:
        "Здравствуйте, Кристина! Хочу персональный тариф программы «Подготовка к родам».",
    },
  },
  postnatal: {
    slug: "postnatal",
    title: "Сопровождение после родов",
    audienceLabel: "Для первого года материнства",
    description:
      "Прожить первые месяцы устойчиво — не потерять себя, сохранить отношения и не утонуть в чувстве вины. Можно начать в любой момент от 1-й до 12-й недели после родов.",
    self: {
      label: "Самостоятельно",
      price: "5 900 ₽",
      pricePer: "разовый платёж",
      includes: [
        "4 видео-модуля по 30–40 минут",
        "Рабочая тетрадь с упражнениями (PDF)",
        "Чек-листы по сну, питанию мамы и эмоциональной самопомощи",
        "Доступ к видео навсегда",
      ],
      tgMessage:
        "Здравствуйте, Кристина! Хочу самостоятельный тариф «Сопровождение после родов».",
    },
    personal: {
      label: "Персональный",
      price: "17 900 ₽",
      pricePer: "за 4 недели",
      includes: [
        "Всё из тарифа «Самостоятельно»",
        "4 живые встречи 50 минут (Zoom / Телемост)",
        "Персональный план на ближайшие 14 дней",
        "Безлимит в Telegram/ВК всё время программы + 2 недели после",
        "Поддержка при срочных эпизодах: я отвечаю в течение дня",
      ],
      tgMessage:
        "Здравствуйте, Кристина! Хочу персональный тариф «Сопровождение после родов».",
    },
  },
} as const;

export const SERVICES = {
  consultation: {
    title: "Разовая консультация",
    price: "4 900 ₽",
    pricePer: "50 минут",
    duration: "1 встреча · Zoom или Телемост",
    description:
      "Точечная работа по одному запросу: один страх, один разговор с близкими, одно решение. Подходит для второго мнения, разовой поддержки или быстрой ситуативной помощи.",
    tgMessage: "Здравствуйте, Кристина! Хочу записаться на разовую консультацию.",
  },
  makExpress: {
    title: "МАК-экспресс",
    price: "донейшн от 500 ₽",
    pricePer: "за расшифровку",
    duration: "~5 минут · асинхронно",
    description:
      "Расшифровка метафорической карты — 2 голосовых сообщения в Telegram или ВК. Лёгкий способ познакомиться.",
    tgMessage: "Здравствуйте, Кристина! Хочу заказать МАК-экспресс.",
  },
};

// Категории школьных копинг-карточек (5 шт, по 3 карточки в каждой).
export const CARD_CATEGORIES = [
  {
    slug: "strah-rodov",
    title: "Страх родов",
    description: "Контроль, план Б, базовая опора — три якоря для самых частых страхов.",
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
    description: "Перед анализом, ожидание результатов, базовая техника при острой тревоге.",
  },
] as const;

// 3 открытые копинг-карточки — доступны всем без кода.
export const FREE_CARDS = [
  {
    slug: "strah-boli",
    title: "Боль — не враг, а спутник",
    description: "Когда мысли о боли в родах становятся навязчивыми.",
    pngUrl: "/cards/strah-boli.png",
  },
  {
    slug: "telo-menyaetsya",
    title: "Моё тело меняется",
    description: "Когда смотришь в зеркало и не узнаёшь себя.",
    pngUrl: "/cards/telo-menyaetsya.png",
  },
  {
    slug: "nepravilnyy-diagnoz",
    title: "Услышала тревожное от врача",
    description: "Когда после приёма голова кружится от страшных слов.",
    pngUrl: "/cards/nepravilnyy-diagnoz.png",
  },
] as const;

// 15 карточек школы — доступ по коду.
// Сгруппированы по category (см. CARD_CATEGORIES).
export const SCHOOL_CARDS = [
  // Страх родов
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
  {
    slug: "snizhenie-straha-rodov",
    category: "strah-rodov",
    title: "Снижение страха перед родами",
    description: "Базовая опора. Перенастраивает «роды страшные» в «роды естественные».",
    pngUrl: "/cards/snizhenie-straha-rodov.png",
  },
  // Принятие тела
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
  {
    slug: "vstrecha-ne-ispytanie",
    category: "prinyatie-tela",
    title: "Встреча, а не испытание",
    description: "Образ родов как первой встречи с малышом — для дней, когда настрой проседает.",
    pngUrl: "/cards/vstrecha-ne-ispytanie.png",
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
    slug: "ozhidanie-rezultatov",
    category: "neopredelennost",
    title: "Ждать результаты",
    description: "В дни между сдачей и получением результата.",
    pngUrl: "/cards/ozhidanie-rezultatov.png",
  },
  {
    slug: "kogda-nakryvayet-trevoga",
    category: "neopredelennost",
    title: "Когда накрывает тревога",
    description: "Скорая помощь в моменте: дыхание 4-7-8, заземление, фраза-якорь.",
    pngUrl: "/cards/kogda-nakryvayet-trevoga.png",
  },
] as const;

// SHA-256(«1000days») — код участниц Школы Осознанного материнства.
// Чтобы сменить код — пересчитай хеш:
// node -e "console.log(require('crypto').createHash('sha256').update('НОВЫЙКОД').digest('hex'))"
export const SCHOOL_CODE_HASH =
  "1b650c9b878e955b7bac036fd9817ca98edb7a18863b09e46639306036b7f2ea";

export const DISCLAIMER = "Материалы носят информационный характер и не заменяют медицинскую помощь.";

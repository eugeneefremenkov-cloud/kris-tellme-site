# Kris Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сверстать одностраничный сайт перинатального психолога Кристины (бренд «КРИС, СКАЖИ МНЕ 🕊») с подстраницами статей. Имплементация сейчас даёт **рабочий каркас с плейсхолдерным дизайном**. Финальная палитра, типографика и точный визуал — отдельная сессия после дизайн-этапа.

**Architecture:** Контент-сайт на Astro с Content Collections для статей (MDX). Никакого бэкенда, никаких форм. CTA на консультации/МАК-экспресс — прямые ссылки в личный Telegram Кристины с предзаполненным сообщением. Деплой на Vercel из GitHub.

**Tech Stack:** Astro 5, Tailwind CSS 4 (через `@tailwindcss/vite`), TypeScript, MDX, Vercel.

**Спека:** `docs/specs/2026-05-15-kris-site-design.md`
**Дизайн-система:** `design-system/MASTER.md` (финальные цвета, шрифты, мокапы блоков, спеки активов)

---

## Принципы имплементации

- **Дизайн-токены финальные.** Палитра (sage-палитра + cream + warm beige), типографика (Cormorant Garamond + Inter), радиусы, тени — зафиксированы в `design-system/MASTER.md`. Используем как источник правды. В этом плане Task 4 содержит готовый итоговый CSS.
- **Без TDD-юнит-тестов.** Это контентный сайт. Качество проверяется через `astro check` (типы + schema контента), `astro build` (компиляция) и ручной смоук-тест в браузере. Если бы была бизнес-логика — был бы TDD; её нет.
- **Контентные плейсхолдеры.** Первая копинг-карточка (PNG) — пока заглушка-PNG. Финальный дизайн PNG сделает дизайнер. Текст карточки уже есть в `coping-card-source.txt`.
- **Frequent commits.** Один task = один коммит.
- **Mobile-first.** Аудитория — беременные на мобильных. Сначала верстаем мобайл, потом расширяем под десктоп.

---

## File Structure

```
D:/Projects/Kris/
├── coping-card-source.txt              # уже есть
├── *.jpg (5 фото)                       # уже есть
├── docs/
│   ├── specs/2026-05-15-kris-site-design.md
│   └── plans/2026-05-15-kris-site-implementation.md (этот файл)
└── site/                                # сам Astro-проект
    ├── .gitignore
    ├── astro.config.mjs
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.mjs              # для кастомизации theme (если нужно вне CSS)
    ├── public/
    │   ├── cards/
    │   │   └── snizhenie-straha-rodov.png    # placeholder, заменим финалом от дизайнера
    │   ├── images/
    │   │   ├── kristina-hero.jpg
    │   │   ├── kristina-about.jpg
    │   │   └── ...
    │   ├── favicon.svg
    │   └── og-image.jpg
    └── src/
        ├── lib/
        │   └── constants.ts             # SOCIAL_LINKS, TG_USERNAME, PRICES
        ├── content/
        │   ├── config.ts                # zod schema для articles
        │   └── articles/
        │       └── pervaya-statya.mdx   # одна placeholder-статья
        ├── components/
        │   ├── Header.astro
        │   ├── Footer.astro
        │   ├── Hero.astro
        │   ├── About.astro
        │   ├── CardsSection.astro
        │   ├── ArticlesSection.astro
        │   ├── ServicesSection.astro
        │   ├── ServiceCard.astro
        │   └── TgButton.astro
        ├── layouts/
        │   ├── BaseLayout.astro
        │   └── ArticleLayout.astro
        ├── pages/
        │   ├── index.astro
        │   └── articles/[...slug].astro
        └── styles/
            └── global.css
```

Каждый файл — одна ответственность. Компоненты разделены по блокам лендинга, чтобы можно было модифицировать каждый блок независимо.

---

## Task 1: Инициализация проекта

**Files:**
- Create: `D:/Projects/Kris/site/` (вся подпапка)
- Create: `D:/Projects/Kris/.gitignore`

- [ ] **Step 1: Инициализировать git в корне проекта**

```powershell
cd D:/Projects/Kris
git init
git branch -M main
```

- [ ] **Step 2: Создать корневой .gitignore**

Создать файл `D:/Projects/Kris/.gitignore` со следующим содержимым:

```gitignore
# Node
node_modules/
dist/
.astro/
.vercel/

# Env
.env
.env.local
.env.production

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.iml

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
```

- [ ] **Step 3: Скаффолдить Astro-проект в подпапке `site/`**

Запустить из `D:/Projects/Kris`:

```powershell
npm create astro@latest site -- --template minimal --typescript strict --no-install --no-git --skip-houston
```

Ожидаемый результат: создаётся папка `site/` с минимальным шаблоном Astro и TypeScript конфигом.

- [ ] **Step 4: Установить зависимости**

```powershell
cd site
npm install
```

- [ ] **Step 5: Добавить Tailwind CSS 4 и MDX**

```powershell
npx astro add tailwind --yes
npx astro add mdx --yes
```

`astro add` сам пропатчит `astro.config.mjs` и `package.json`.

- [ ] **Step 6: Проверить, что dev-сервер запускается**

```powershell
npm run dev
```

Ожидаемый результат: dev-сервер слушает `http://localhost:4321`, в браузере открывается стандартная Astro-страница. Остановить (Ctrl+C).

- [ ] **Step 7: Первый коммит**

```powershell
cd D:/Projects/Kris
git add .
git commit -m "chore: scaffold Astro project with Tailwind and MDX"
```

---

## Task 2: Контентные константы

Все ссылки, цены и tg-username в одном месте — чтобы при изменении правки шли только сюда.

**Files:**
- Create: `site/src/lib/constants.ts`

- [ ] **Step 1: Создать файл констант**

Создать `site/src/lib/constants.ts`:

```typescript
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

export const COPING_CARDS = [
  {
    slug: "snizhenie-straha-rodov",
    title: "Снижение страха перед родами",
    description: "Поддерживающая копинг-карточка для 2–3 триместра. Перечитывайте в моменты тревоги.",
    pngUrl: "/cards/snizhenie-straha-rodov.png",
  },
];

export const DISCLAIMER = "Материалы носят информационный характер и не заменяют медицинскую помощь.";
```

- [ ] **Step 2: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/lib/constants.ts
git commit -m "feat: add content constants for brand, social, services"
```

---

## Task 3: Content Collection для статей

**Files:**
- Create: `site/src/content/config.ts`
- Create: `site/src/content/articles/pervaya-statya.mdx`

- [ ] **Step 1: Создать схему коллекции**

Создать `site/src/content/config.ts`:

```typescript
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
```

- [ ] **Step 2: Создать одну placeholder-статью**

Создать `site/src/content/articles/pervaya-statya.mdx`:

```mdx
---
title: "Что взять в роддом психологически"
description: "Не вещи, а внутренние опоры — что поможет тебе чувствовать опору в день родов."
pubDate: 2026-05-15
draft: true
---

Это пример статьи. Финальный текст напишет Кристина.

## Подзаголовок

Текст параграфа. Поддерживающий, тёплый, на «ты».

- Пункт раз
- Пункт два
- Пункт три

> Цитата или важная мысль выделяется тут.

Заключительный абзац, мягко возвращающий читателя к ощущению опоры.
```

- [ ] **Step 3: Проверить, что коллекция типизирована**

```powershell
cd D:/Projects/Kris/site
npx astro check
```

Ожидаемый результат: 0 errors. Если есть ошибки — починить до коммита.

- [ ] **Step 4: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/content/
git commit -m "feat: add articles content collection with placeholder article"
```

---

## Task 4: Глобальные стили и базовая раскладка

Дизайн-плейсхолдер. Конкретные значения цветов/шрифтов — рабочие, заменятся на этапе дизайна.

**Files:**
- Create: `site/src/styles/global.css`
- Modify: `site/astro.config.mjs` (если нужно — обычно `astro add tailwind` уже всё подключил)

- [ ] **Step 1: Создать `site/src/styles/global.css`**

Финальные токены из `design-system/MASTER.md`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Sage palette */
  --color-sage-50: #F4F7F3;
  --color-sage-100: #E3EBE0;
  --color-sage-200: #C7D6C1;
  --color-sage-300: #A6BD9D;
  --color-sage-400: #95B187;
  --color-sage-500: #88A37D;
  --color-sage-600: #6B8A60;
  --color-sage-700: #556E4C;
  --color-sage-800: #45593E;
  --color-sage-900: #303E2D;

  /* Neutrals */
  --color-cream: #FAF7F1;
  --color-cream-deep: #F5EFE4;
  --color-graphite: #2A2A28;
  --color-graphite-muted: #6B6B66;

  /* Warm accent */
  --color-accent: #C8A97E;
  --color-accent-deep: #A8895E;

  /* Fonts */
  --font-serif: "Cormorant Garamond", "Georgia", serif;
  --font-sans: "Inter", system-ui, sans-serif;

  /* Soft shadows (sage-tinted) */
  --shadow-soft-sm: 0 1px 2px rgba(85, 110, 76, 0.05);
  --shadow-soft: 0 4px 16px rgba(85, 110, 76, 0.08);
  --shadow-soft-lg: 0 8px 32px rgba(85, 110, 76, 0.10);
}

html {
  font-family: var(--font-sans);
  color: var(--color-graphite);
  background-color: var(--color-cream);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--font-serif);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--color-graphite);
}

::selection {
  background-color: var(--color-sage-200);
  color: var(--color-sage-900);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Важно:** для primary CTA использовать `bg-sage-700` (не sage-500) — это требование WCAG AA для контраста cream-текста на кнопке.

- [ ] **Step 2: Подключить шрифты Google Fonts**

Шрифты будут подгружены в `BaseLayout.astro` через `<link>` (см. Task 5). Здесь только CSS-переменные.

- [ ] **Step 3: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/styles/global.css
git commit -m "feat: add base global styles with placeholder palette"
```

---

## Task 5: BaseLayout

Общий каркас всех страниц: `<head>`, meta-теги, шрифты, шапка, подвал.

**Files:**
- Create: `site/src/layouts/BaseLayout.astro`
- Create: `site/src/components/Header.astro`
- Create: `site/src/components/Footer.astro`

- [ ] **Step 1: Создать Header**

`site/src/components/Header.astro`:

```astro
---
import { BRAND } from "../lib/constants";
---

<header class="w-full py-6 px-4 sm:px-8">
  <div class="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" class="font-serif text-xl tracking-wide text-sage-700">
      {BRAND.name} <span class="ml-1">{BRAND.emoji}</span>
    </a>
  </div>
</header>
```

- [ ] **Step 2: Создать Footer**

`site/src/components/Footer.astro`:

```astro
---
import { BRAND, SOCIAL, CONTACT, DISCLAIMER } from "../lib/constants";
---

<footer class="w-full mt-24 py-12 px-4 sm:px-8 border-t border-sage-200 bg-sage-50">
  <div class="max-w-6xl mx-auto flex flex-col gap-6 sm:flex-row sm:justify-between">
    <div>
      <p class="font-serif text-lg text-sage-700">
        {BRAND.name} <span>{BRAND.emoji}</span>
      </p>
      <p class="text-sm text-graphite/70 mt-1">
        {BRAND.fullName}, {BRAND.title.toLowerCase()}
      </p>
      <p class="text-sm text-graphite/70">
        {BRAND.city} · онлайн в Zoom / Телемост
      </p>
    </div>

    <nav class="flex flex-col gap-2 text-sm">
      <a href={SOCIAL.telegramChannel} class="hover:text-sage-700" target="_blank" rel="noopener">Telegram-канал</a>
      <a href={SOCIAL.vk} class="hover:text-sage-700" target="_blank" rel="noopener">ВКонтакте</a>
      <a href={SOCIAL.instagram} class="hover:text-sage-700" target="_blank" rel="noopener">Instagram</a>
      <a href={CONTACT.telegramLink} class="hover:text-sage-700" target="_blank" rel="noopener">
        Написать в Telegram: @{CONTACT.telegramUsername}
      </a>
    </nav>
  </div>

  <p class="max-w-6xl mx-auto text-xs text-graphite/50 mt-8">
    {DISCLAIMER}
  </p>
</footer>
```

- [ ] **Step 3: Создать BaseLayout**

`site/src/layouts/BaseLayout.astro`:

```astro
---
import "../styles/global.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const { title, description, ogImage = "/og-image.jpg" } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site ?? "https://example.com").toString();
---

<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonical} />

    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="ru_RU" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap"
    />
  </head>
  <body class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Создать минимальную index.astro для проверки**

Перезаписать `site/src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout
  title="КРИС, СКАЖИ МНЕ — перинатальный психолог Кристина Ефременкова"
  description="Помогаю женщинам спокойно встретить роды. Копинг-карточки, статьи и форматы работы."
>
  <div class="max-w-6xl mx-auto px-4 py-12">
    <p>Layout works.</p>
  </div>
</BaseLayout>
```

- [ ] **Step 5: Смоук-тест**

```powershell
cd D:/Projects/Kris/site
npm run dev
```

Открыть `http://localhost:4321`. Проверить:
- Шапка с надписью «КРИС, СКАЖИ МНЕ 🕊» наверху
- Текст «Layout works.» по центру
- Подвал с соцсетями и дисклеймером внизу
- Никаких ошибок в консоли браузера
- Шрифты Cormorant и Inter применились (заголовки серифные, текст санс)

Остановить (Ctrl+C).

- [ ] **Step 6: Коммит**

```powershell
cd D:/Projects/Kris
git add site/
git commit -m "feat: add BaseLayout with Header and Footer"
```

---

## Task 6: Положить фотографии в `public/`

**Files:**
- Copy: 3-5 файлов `.jpg` из `D:/Projects/Kris/` в `D:/Projects/Kris/site/public/images/`

- [ ] **Step 1: Создать папку и переименовать фото**

```powershell
mkdir D:/Projects/Kris/site/public/images
mkdir D:/Projects/Kris/site/public/cards
```

Скопировать (вручную или через `Copy-Item`) фото из `D:/Projects/Kris/`:
- `IMG_3386.jpg` → `site/public/images/kristina-hero.jpg`
- `IMG_3387.jpg` → `site/public/images/kristina-about.jpg`
- `IMG_3388.jpg` → `site/public/images/kristina-3.jpg`
- остальные `.jpg` тоже скопировать с понятными именами в `images/`

Имена выбрать так, чтобы было ясно где какое фото. Если ты не Женя — спроси какое фото куда.

- [ ] **Step 2: Создать placeholder для копинг-карточки**

На этапе имплементации финального PNG-дизайна копинг-карточки ещё нет. Положить временный плейсхолдер: создать `site/public/cards/snizhenie-straha-rodov.png` любым способом (например, экспорт из Word текста карточки в PNG, или просто png 800x1200 с текстом «Скоро»). Это будет заменено финальным дизайном.

- [ ] **Step 3: Коммит**

```powershell
cd D:/Projects/Kris
git add site/public/
git commit -m "chore: add Kristina photos and placeholder card PNG"
```

---

## Task 7: Hero block

**Files:**
- Create: `site/src/components/Hero.astro`
- Modify: `site/src/pages/index.astro`

- [ ] **Step 1: Создать Hero**

`site/src/components/Hero.astro`:

```astro
---
import { BRAND } from "../lib/constants";
---

<section class="w-full px-4 sm:px-8 pt-8 pb-16 sm:pt-16 sm:pb-24">
  <div class="max-w-6xl mx-auto grid gap-10 sm:gap-16 sm:grid-cols-2 sm:items-center">
    <div class="order-2 sm:order-1 flex flex-col gap-6">
      <p class="text-sage-700 text-sm tracking-widest uppercase">
        {BRAND.title}
      </p>
      <h1 class="font-serif text-4xl sm:text-5xl leading-tight text-graphite">
        Помогаю женщинам спокойно встретить роды
      </h1>
      <p class="text-lg text-graphite/80 leading-relaxed max-w-md">
        Работаю с дородовой и послеродовой тревогой. Поддержка, инструменты, ясность — для тебя и твоего малыша.
      </p>
      <a
        href="#cards"
        class="inline-block self-start mt-2 px-6 py-3 rounded-full bg-sage-500 text-cream hover:bg-sage-600 transition"
      >
        Получить копинг-карточку
      </a>
    </div>

    <div class="order-1 sm:order-2">
      <img
        src="/images/kristina-hero.jpg"
        alt="Кристина Ефременкова — перинатальный психолог"
        class="w-full aspect-[3/4] object-cover rounded-3xl shadow-md"
        loading="eager"
      />
    </div>
  </div>
</section>
```

- [ ] **Step 2: Подключить Hero в index.astro**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.astro";
---

<BaseLayout
  title="КРИС, СКАЖИ МНЕ — перинатальный психолог Кристина Ефременкова"
  description="Помогаю женщинам спокойно встретить роды. Копинг-карточки, статьи и форматы работы."
>
  <Hero />
</BaseLayout>
```

- [ ] **Step 3: Смоук-тест**

`npm run dev`, открыть `http://localhost:4321`. Проверить:
- На десктопе: фото справа, текст слева
- На мобиле (DevTools → toggle device toolbar → iPhone 12): фото сверху, текст снизу
- Кнопка «Получить копинг-карточку» выглядит как pill, при ховере темнее
- Никаких ошибок в консоли

- [ ] **Step 4: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/components/Hero.astro site/src/pages/index.astro
git commit -m "feat: add Hero block"
```

---

## Task 8: About block

**Files:**
- Create: `site/src/components/About.astro`
- Modify: `site/src/pages/index.astro`

- [ ] **Step 1: Создать About**

`site/src/components/About.astro`:

```astro
---
import { BRAND } from "../lib/constants";

const credentials = [
  "Медицинское образование (педиатрия) и высшее психологическое",
  "5 лет частной практики",
  "Методы: КПТ, схема-терапия, подход Шахова, метафорические карты, телесная терапия",
  "Личная терапия, супервизии, повышение квалификации по перинатальному профилю",
];
---

<section id="about" class="w-full px-4 sm:px-8 py-16 bg-sage-50">
  <div class="max-w-6xl mx-auto grid gap-10 sm:gap-16 sm:grid-cols-[1fr_1.4fr] sm:items-center">
    <img
      src="/images/kristina-about.jpg"
      alt={BRAND.fullName}
      class="w-full aspect-square object-cover rounded-2xl"
      loading="lazy"
    />

    <div class="flex flex-col gap-6">
      <h2 class="font-serif text-3xl sm:text-4xl text-graphite">
        Кристина Ефременкова
      </h2>
      <p class="text-lg text-graphite/80 leading-relaxed">
        Перинатальный психолог. Сопровождаю женщин на пути к материнству — от тревог беременности до адаптации после родов. Считаю, что страх перед родами — это нормально, и с ним можно жить мягче.
      </p>

      <ul class="flex flex-col gap-2 text-graphite/80">
        {credentials.map((line) => (
          <li class="flex gap-3 leading-relaxed">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-sage-500 flex-shrink-0"></span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Подключить в index.astro**

Заменить тело `BaseLayout`:

```astro
<Hero />
<About />
```

И добавить импорт сверху:

```astro
import About from "../components/About.astro";
```

- [ ] **Step 3: Смоук-тест**

Дев-сервер, проверить: блок About под Hero, фото и список регалий читаются, мобильный stacking работает.

- [ ] **Step 4: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/components/About.astro site/src/pages/index.astro
git commit -m "feat: add About block with credentials"
```

---

## Task 9: TgButton — переиспользуемая кнопка

CTA в Telegram с предзаполненным сообщением будет использоваться в двух местах (карточки услуг). Делаем компонент.

**Files:**
- Create: `site/src/components/TgButton.astro`

- [ ] **Step 1: Создать TgButton**

`site/src/components/TgButton.astro`:

```astro
---
import { CONTACT } from "../lib/constants";

interface Props {
  message: string;
  label?: string;
  variant?: "primary" | "outline";
}

const { message, label = "Написать в Telegram", variant = "primary" } = Astro.props;

const encoded = encodeURIComponent(message);
const href = `${CONTACT.telegramLink}?text=${encoded}`;

const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition";
const styles =
  variant === "primary"
    ? "bg-sage-500 text-cream hover:bg-sage-600"
    : "border border-sage-500 text-sage-700 hover:bg-sage-100";
---

<a href={href} target="_blank" rel="noopener" class={`${base} ${styles}`}>
  {label}
</a>
```

Примечание: deep-link `https://t.me/<username>?text=<msg>` работает в Telegram Desktop и mobile-app, но в веб-версии текст может не подставиться. Это ограничение Telegram, не наше — на основные платформы (мобайл, десктоп-приложение) работает корректно.

- [ ] **Step 2: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/components/TgButton.astro
git commit -m "feat: add TgButton component for prefilled Telegram messages"
```

---

## Task 10: Copying cards section

**Files:**
- Create: `site/src/components/CardsSection.astro`
- Modify: `site/src/pages/index.astro`

- [ ] **Step 1: Создать CardsSection**

`site/src/components/CardsSection.astro`:

```astro
---
import { COPING_CARDS } from "../lib/constants";

const [heroCard, ...rest] = COPING_CARDS;
---

<section id="cards" class="w-full px-4 sm:px-8 py-16">
  <div class="max-w-6xl mx-auto flex flex-col gap-12">
    <header class="flex flex-col gap-3 max-w-2xl">
      <p class="text-sage-700 text-sm tracking-widest uppercase">Бесплатные материалы</p>
      <h2 class="font-serif text-3xl sm:text-4xl text-graphite">Копинг-карточки</h2>
      <p class="text-graphite/70 leading-relaxed">
        Сохрани на телефон, поставь на заставку или распечатай. Перечитывай в моменты тревоги — это работает.
      </p>
    </header>

    {heroCard && (
      <article class="grid gap-8 sm:gap-12 sm:grid-cols-2 sm:items-center p-6 sm:p-10 rounded-3xl bg-sage-100/60">
        <img
          src={heroCard.pngUrl}
          alt={heroCard.title}
          class="w-full aspect-[3/4] object-cover rounded-2xl shadow-sm bg-cream"
          loading="lazy"
        />
        <div class="flex flex-col gap-4">
          <h3 class="font-serif text-2xl sm:text-3xl text-graphite">{heroCard.title}</h3>
          <p class="text-graphite/80 leading-relaxed">{heroCard.description}</p>
          <a
            href={heroCard.pngUrl}
            download
            class="inline-flex self-start px-5 py-3 rounded-full bg-sage-500 text-cream hover:bg-sage-600 transition"
          >
            Скачать PNG
          </a>
        </div>
      </article>
    )}

    {rest.length > 0 && (
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((card) => (
          <article class="flex flex-col gap-3 p-4 rounded-2xl bg-sage-50">
            <img src={card.pngUrl} alt={card.title} class="w-full aspect-[3/4] object-cover rounded-xl" loading="lazy" />
            <h3 class="font-serif text-xl text-graphite">{card.title}</h3>
            <p class="text-sm text-graphite/70">{card.description}</p>
            <a href={card.pngUrl} download class="text-sm text-sage-700 underline self-start">
              Скачать PNG
            </a>
          </article>
        ))}
      </div>
    )}
  </div>
</section>
```

- [ ] **Step 2: Подключить в index.astro**

```astro
import CardsSection from "../components/CardsSection.astro";
```

В теле:

```astro
<Hero />
<About />
<CardsSection />
```

- [ ] **Step 3: Смоук-тест**

Проверить: блок карточек. Карточка-герой с плейсхолдер-PNG (любым изображением, что положили в Task 6). Кнопка «Скачать PNG» при клике скачивает файл (браузер либо скачивает, либо открывает в новой вкладке — это нормально).

- [ ] **Step 4: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/components/CardsSection.astro site/src/pages/index.astro
git commit -m "feat: add coping cards section"
```

---

## Task 11: Articles section

**Files:**
- Create: `site/src/components/ArticlesSection.astro`
- Modify: `site/src/pages/index.astro`

- [ ] **Step 1: Создать ArticlesSection**

`site/src/components/ArticlesSection.astro`:

```astro
---
import { getCollection } from "astro:content";

const allArticles = await getCollection("articles", ({ data }) => !data.draft);
const articles = allArticles.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

{articles.length > 0 && (
  <section id="articles" class="w-full px-4 sm:px-8 py-16 bg-sage-50">
    <div class="max-w-6xl mx-auto flex flex-col gap-10">
      <header class="flex flex-col gap-3 max-w-2xl">
        <p class="text-sage-700 text-sm tracking-widest uppercase">Статьи</p>
        <h2 class="font-serif text-3xl sm:text-4xl text-graphite">Что почитать</h2>
        <p class="text-graphite/70 leading-relaxed">
          Короткие тексты о тревоге, теле, родах и материнстве.
        </p>
      </header>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <a
            href={`/articles/${article.slug}/`}
            class="flex flex-col gap-3 p-5 rounded-2xl bg-cream hover:bg-white transition"
          >
            <h3 class="font-serif text-xl text-graphite">{article.data.title}</h3>
            <p class="text-sm text-graphite/70 leading-relaxed">{article.data.description}</p>
            <span class="text-sm text-sage-700 mt-2">Читать →</span>
          </a>
        ))}
      </div>
    </div>
  </section>
)}
```

Примечание про placeholder-статью: она помечена `draft: true`, поэтому в этой секции на dev не покажется. Чтобы убедиться, что вёрстка корректна — временно поменяй в статье `draft: true` → `draft: false`, посмотри, верни обратно. На проде (Vercel build) drafts не публикуются.

- [ ] **Step 2: Подключить в index.astro**

```astro
import ArticlesSection from "../components/ArticlesSection.astro";
```

В теле:

```astro
<Hero />
<About />
<CardsSection />
<ArticlesSection />
```

- [ ] **Step 3: Смоук-тест**

Временно убери `draft: true` в `pervaya-statya.mdx`, перезагрузи dev-сервер. Должна появиться секция «Что почитать» с одной превью-карточкой. Затем верни `draft: true`.

- [ ] **Step 4: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/components/ArticlesSection.astro site/src/pages/index.astro
git commit -m "feat: add articles section reading from content collection"
```

---

## Task 12: Services section

**Files:**
- Create: `site/src/components/ServiceCard.astro`
- Create: `site/src/components/ServicesSection.astro`
- Modify: `site/src/pages/index.astro`

- [ ] **Step 1: Создать ServiceCard**

`site/src/components/ServiceCard.astro`:

```astro
---
import TgButton from "./TgButton.astro";

interface Props {
  title: string;
  price: string;
  description: string;
  tgMessage: string;
}

const { title, price, description, tgMessage } = Astro.props;
---

<article class="flex flex-col gap-4 p-6 sm:p-8 rounded-3xl bg-cream border border-sage-200">
  <h3 class="font-serif text-2xl text-graphite">{title}</h3>
  <p class="text-sage-700 font-medium">{price}</p>
  <p class="text-graphite/80 leading-relaxed flex-1">{description}</p>
  <TgButton message={tgMessage} label="Написать в Telegram" />
</article>
```

- [ ] **Step 2: Создать ServicesSection**

`site/src/components/ServicesSection.astro`:

```astro
---
import { SERVICES } from "../lib/constants";
import ServiceCard from "./ServiceCard.astro";
---

<section id="services" class="w-full px-4 sm:px-8 py-16">
  <div class="max-w-6xl mx-auto flex flex-col gap-10">
    <header class="flex flex-col gap-3 max-w-2xl">
      <p class="text-sage-700 text-sm tracking-widest uppercase">Если хочешь глубже</p>
      <h2 class="font-serif text-3xl sm:text-4xl text-graphite">Форматы работы</h2>
      <p class="text-graphite/70 leading-relaxed">
        Лично — короткие или развёрнутые форматы. Можно начать с маленького шага.
      </p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2">
      <ServiceCard
        title={SERVICES.consultation.title}
        price={SERVICES.consultation.price}
        description={SERVICES.consultation.description}
        tgMessage={SERVICES.consultation.tgMessage}
      />
      <ServiceCard
        title={SERVICES.makExpress.title}
        price={SERVICES.makExpress.price}
        description={SERVICES.makExpress.description}
        tgMessage={SERVICES.makExpress.tgMessage}
      />
    </div>
  </div>
</section>
```

- [ ] **Step 3: Подключить в index.astro**

```astro
import ServicesSection from "../components/ServicesSection.astro";
```

В теле:

```astro
<Hero />
<About />
<CardsSection />
<ArticlesSection />
<ServicesSection />
```

- [ ] **Step 4: Смоук-тест**

Проверить: две карточки услуг, цены, кнопки «Написать в Telegram». Кликнуть на каждую — должна открыться вкладка с `https://t.me/Kris_tellme?text=...` (на мобиле — открыться приложение Telegram с предзаполненным текстом).

- [ ] **Step 5: Коммит**

```powershell
cd D:/Projects/Kris
git add site/src/components/ServiceCard.astro site/src/components/ServicesSection.astro site/src/pages/index.astro
git commit -m "feat: add services section with Telegram CTAs"
```

---

## Task 13: Article page template

Подстраница `/articles/<slug>` с MDX-телом статьи.

**Files:**
- Create: `site/src/layouts/ArticleLayout.astro`
- Create: `site/src/pages/articles/[...slug].astro`

- [ ] **Step 1: Создать ArticleLayout**

`site/src/layouts/ArticleLayout.astro`:

```astro
---
import BaseLayout from "./BaseLayout.astro";
import TgButton from "../components/TgButton.astro";

interface Props {
  title: string;
  description: string;
  pubDate: Date;
}

const { title, description, pubDate } = Astro.props;
const formattedDate = pubDate.toLocaleDateString("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
---

<BaseLayout title={`${title} — КРИС, СКАЖИ МНЕ`} description={description}>
  <article class="max-w-2xl mx-auto px-4 sm:px-8 py-12">
    <a href="/#articles" class="text-sm text-sage-700 hover:underline">← К материалам</a>

    <header class="flex flex-col gap-3 mt-6 mb-10">
      <time datetime={pubDate.toISOString()} class="text-sm text-graphite/50">
        {formattedDate}
      </time>
      <h1 class="font-serif text-3xl sm:text-4xl leading-tight text-graphite">
        {title}
      </h1>
      <p class="text-lg text-graphite/70 leading-relaxed">{description}</p>
    </header>

    <div class="prose prose-graphite max-w-none">
      <slot />
    </div>

    <aside class="mt-16 p-6 rounded-2xl bg-sage-50 flex flex-col gap-3">
      <p class="text-graphite/80 leading-relaxed">
        Если хочешь обсудить эту тему лично — напиши, я отвечу.
      </p>
      <TgButton
        message="Здравствуйте, Кристина! Хочу записаться на консультацию."
        label="Написать в Telegram"
      />
    </aside>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Установить `@tailwindcss/typography` для класса `prose`**

```powershell
cd D:/Projects/Kris/site
npm install -D @tailwindcss/typography
```

Подключить в `site/src/styles/global.css`, добавив сверху после `@import "tailwindcss";`:

```css
@plugin "@tailwindcss/typography";
```

- [ ] **Step 3: Создать страницу `/articles/[...slug]`**

`site/src/pages/articles/[...slug].astro`:

```astro
---
import { getCollection, type CollectionEntry } from "astro:content";
import ArticleLayout from "../../layouts/ArticleLayout.astro";

export async function getStaticPaths() {
  const articles = await getCollection("articles", ({ data }) => !data.draft);
  return articles.map((article) => ({
    params: { slug: article.slug },
    props: { article },
  }));
}

interface Props {
  article: CollectionEntry<"articles">;
}

const { article } = Astro.props;
const { Content } = await article.render();
---

<ArticleLayout
  title={article.data.title}
  description={article.data.description}
  pubDate={article.data.pubDate}
>
  <Content />
</ArticleLayout>
```

- [ ] **Step 4: Смоук-тест**

Временно убери `draft: true` в `pervaya-statya.mdx`. Открой `http://localhost:4321/articles/pervaya-statya/`. Проверить:
- Заголовок, дата, описание выводятся
- MDX-разметка (h2, ul, blockquote) отрендерилась с typography-стилями
- Кнопка «Написать в Telegram» внизу
- Ссылка «← К материалам» возвращает на `/#articles`

Верни `draft: true`.

- [ ] **Step 5: Коммит**

```powershell
cd D:/Projects/Kris
git add site/
git commit -m "feat: add article page template with typography plugin"
```

---

## Task 14: SEO + Favicon + OG-image

**Files:**
- Create: `site/public/favicon.svg`
- Create: `site/public/og-image.jpg` (плейсхолдер)

- [ ] **Step 1: Создать favicon-плейсхолдер**

Создать `site/public/favicon.svg` — простой SVG (буква К или эмодзи голубя на sage-фоне):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#88a37d"/>
  <text x="50%" y="58%" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="#faf7f1" font-weight="500">К</text>
</svg>
```

Финальный фавикон сделает дизайнер.

- [ ] **Step 2: Создать og-image-плейсхолдер**

Положить файл `site/public/og-image.jpg` 1200×630 px — может быть одно из фото Кристины с подписью «КРИС, СКАЖИ МНЕ 🕊» (сделать в Figma/Canva вручную или временно использовать `kristina-hero.jpg` в нужном размере). Финальную версию сделает дизайнер.

- [ ] **Step 3: Указать site URL в astro.config.mjs**

Дополнить `site/astro.config.mjs` полем `site` для корректных canonical/og:

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kris-tellme.vercel.app', // заменить на финальный домен
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx()],
});
```

- [ ] **Step 4: Смоук-тест**

`npm run dev`, открой DevTools → Network → headers. Убедись, что в `<head>` тегов:
- `<title>`, `<meta name="description">`
- `<meta property="og:title">`, `og:description`, `og:image`
- `<link rel="canonical">`

- [ ] **Step 5: Коммит**

```powershell
cd D:/Projects/Kris
git add site/
git commit -m "feat: add favicon, og-image placeholder and site URL config"
```

---

## Task 15: Production build check

Перед деплоем проверяем, что сборка работает без ошибок.

- [ ] **Step 1: Astro check (types + content schema)**

```powershell
cd D:/Projects/Kris/site
npx astro check
```

Ожидаемый результат: 0 errors, 0 warnings (или только known-acceptable). Если ошибки — починить.

- [ ] **Step 2: Production build**

```powershell
npm run build
```

Ожидаемый результат: сборка успешна, в `site/dist/` создан статический сайт.

- [ ] **Step 3: Preview production build локально**

```powershell
npm run preview
```

Открой `http://localhost:4321`. Перейди по всем якорям (#cards, #articles, #services), убедись, что страница работает идентично dev-режиму, никаких ошибок.

Остановить (Ctrl+C).

- [ ] **Step 4: Коммит (если были изменения)**

Если на этом этапе появились правки — закоммитить:

```powershell
cd D:/Projects/Kris
git add -A
git commit -m "chore: fix build issues"
```

Если правок нет — пропустить.

---

## Task 16: Deploy to Vercel

- [ ] **Step 1: Создать GitHub-репозиторий**

В GitHub (через UI или `gh` CLI) создать пустой репозиторий `kris-tellme-site` (private или public — на выбор Жени).

- [ ] **Step 2: Запушить локальный репо**

```powershell
cd D:/Projects/Kris
git remote add origin https://github.com/<user>/kris-tellme-site.git
git push -u origin main
```

- [ ] **Step 3: Импортировать в Vercel**

Открыть https://vercel.com/new, выбрать репозиторий.

Важные настройки:
- **Root Directory:** `site` (потому что Astro-проект в подпапке)
- **Framework Preset:** Astro (определяется автоматически)
- **Build Command:** `npm run build` (по умолчанию)
- **Output Directory:** `dist` (по умолчанию)

Нажать Deploy.

- [ ] **Step 4: Проверить деплой**

Получить URL вида `https://kris-tellme-site.vercel.app`. Открыть в браузере — сайт должен работать идентично локальному превью.

Проверить:
- Все секции отрисованы
- Картинки загружаются
- Скачивание копинг-карточки работает (`?download` не работает на разных хостингах одинаково — Vercel должен отдавать PNG как файл)
- Соцсети открываются в новых вкладках
- TG-кнопки правильно открывают `t.me/Kris_tellme?text=...`

- [ ] **Step 5: Обновить site URL в astro.config.mjs**

Заменить плейсхолдерный URL `https://kris-tellme.vercel.app` на финальный URL Vercel-деплоя в `site/astro.config.mjs`. Закоммитить, запушить, дождаться авто-деплоя.

```powershell
cd D:/Projects/Kris
git add site/astro.config.mjs
git commit -m "chore: update site URL to production Vercel domain"
git push
```

---

## Что НЕ делаем в этом плане

- ❌ Финальный PNG копинг-карточки — спека лежит в `design-system/MASTER.md` §9.1, на этапе имплементации в репо лежит placeholder; финальный PNG делает Кристина в Canva по гайду из дизайн-системы
- ❌ Финальный og-image — placeholder
- ❌ Финальный favicon — placeholder
- ❌ Тексты Hero и About — рабочие формулировки, ждём правок от Кристины
- ❌ Реальные статьи — одна заглушка с `draft: true`, контент пишет Кристина
- ❌ Аналитика (Plausible/GA) — добавим позже, если понадобится
- ❌ Свой домен — пока vercel.app, своя зона потом

---

## Self-review

**Spec coverage:**
- Цель и стратегия → отражена в принципах и в what-not-to-do
- Аудитория, JTBD → косвенно через тон формулировок (Hero, About, Cards copy)
- Структура страниц (`/`, `/articles/[slug]`) → Task 13 ✓
- Все 6 блоков лендинга → Tasks 7–12 ✓
- Подстраница статьи (узкий контейнер, шапка с «← К материалам», TG-кнопка внизу, тот же подвал) → Task 13 ✓
- Tech stack (Astro + Tailwind + Vercel) → Tasks 1, 14, 16 ✓
- Контентные правила (тон на «ты», стиль текстов) → отражены в текстах Hero и About copy
- Открытые параметры → отнесены к What-not-to-do, не пилятся ✓
- YAGNI (без форм, без CMS, без эквайринга) → строго соблюдено ✓

**Placeholder scan:**
- Все «плейсхолдеры» в плане — это файлы-плейсхолдеры (PNG карточки, og-image, favicon), они явно так помечены, замена на финал — после дизайн-сессии. Это не плановые placeholders, а намеренные стартовые активы.
- Никаких «TBD», «TODO», «implement later», «add appropriate handling» в самих шагах плана нет. ✓

**Type consistency:**
- `BRAND`, `SOCIAL`, `CONTACT`, `SERVICES`, `COPING_CARDS` — определены в Task 2, используются во всех последующих ✓
- `ServiceCard` props (`title`, `price`, `description`, `tgMessage`) — соответствуют структуре `SERVICES.consultation` / `SERVICES.makExpress` ✓
- `TgButton` props (`message`, `label`, `variant`) — переиспользуется в `ServiceCard` и `ArticleLayout` ✓
- `Article` collection schema совпадает в `config.ts` и в использовании внутри `ArticlesSection` / `[...slug].astro` ✓
- `BaseLayout` props (`title`, `description`, `ogImage`) — совпадает с использованием в `index.astro` и `ArticleLayout.astro` ✓

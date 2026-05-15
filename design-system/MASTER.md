# Design System — «КРИС, СКАЖИ МНЕ 🕊»

> Когда верстаешь конкретную страницу, сначала проверь `design-system/pages/<page>.md`. Если файл есть — его правила перебивают этот Master. Если нет — следуй ему строго.

**Проект:** Сайт перинатального психолога Кристины Ефременковой
**Категория:** Wellness / personal expert / editorial minimalism
**Дата:** 2026-05-15

---

## 1. Тон визуала

**Стиль:** Editorial Minimalism + Soft Wellness.
Спокойная типографическая композиция, много воздуха, мягкие закругления, без жёстких теней и без неоморфизма. Цветовая основа — приглушённый sage с тёплым кремовым фоном.

**Эмоция:** «надёжная тёплая подруга-психолог». Никакого розового сюсюканья, никакого fashion-блеска, никакой клиники.

**Антипаттерны (НЕЛЬЗЯ):**

- Розовый/лавандовый palette
- Эмодзи как иконки (только SVG: Lucide или Heroicons)
- Жёсткие тени `0 10px 30px rgba(0,0,0,0.3)` — у нас всё мягко
- Резкие анимации, scale-эффекты, layout-shift при hover
- Dark mode (на старте не делаем)
- Стоковые иконки беременности в виде животиков
- Градиенты (особенно радужные/мульти-color)
- Сlickbait-CTA: «Скачать СЕЙЧАС», «Жми скорее!», «Не упусти!»

---

## 2. Палитра

### Token map

| Роль | HEX | CSS var | Tailwind name |
|---|---|---|---|
| Основной sage | `#88A37D` | `--color-sage` | `sage-500` |
| Sage hover/тёмный | `#6B8A60` | `--color-sage-deep` | `sage-600` |
| Sage очень тёмный (текст-акцент) | `#45593E` | `--color-sage-darker` | `sage-800` |
| Sage tint (alt-фон секции) | `#F4F7F3` | `--color-sage-tint` | `sage-50` |
| Sage soft border | `#E3EBE0` | `--color-sage-border` | `sage-100` |
| Cream — основной фон | `#FAF7F1` | `--color-cream` | `cream` |
| Cream deeper (cards) | `#F5EFE4` | `--color-cream-deep` | `cream-deep` |
| Графит — основной текст | `#2A2A28` | `--color-graphite` | `graphite` |
| Графит muted | `#6B6B66` | `--color-graphite-muted` | `graphite-muted` |
| Warm beige — акцент | `#C8A97E` | `--color-accent` | `accent` |
| Warm beige deep (hover) | `#A8895E` | `--color-accent-deep` | `accent-deep` |
| White pure | `#FFFFFF` | — | `white` |

### Tailwind theme (готовый CSS)

`site/src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
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

  --color-cream: #FAF7F1;
  --color-cream-deep: #F5EFE4;

  --color-graphite: #2A2A28;
  --color-graphite-muted: #6B6B66;

  --color-accent: #C8A97E;
  --color-accent-deep: #A8895E;

  --font-serif: "Cormorant Garamond", "Georgia", serif;
  --font-sans: "Inter", system-ui, sans-serif;
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
```

### Проверка контраста (WCAG)

| Пара | Ratio | Статус |
|---|---|---|
| graphite `#2A2A28` на cream `#FAF7F1` | 14.7:1 | AAA для всего |
| graphite-muted `#6B6B66` на cream | 5.1:1 | AA |
| white на sage-500 `#88A37D` | 2.6:1 | ❌ нельзя для текста — только декор |
| white на sage-600 `#6B8A60` | 3.7:1 | ❌ только для крупного текста ≥18.66px bold |
| **cream на sage-700 `#556E4C`** | **5.8:1** | **AA — используем для CTA-кнопок** |
| graphite на sage-50 `#F4F7F3` | 14.2:1 | AAA |

**Правило для кнопок:** primary-кнопка использует фон `sage-700` `#556E4C` + текст `cream`, не `sage-500`. Это критично для accessibility.

---

## 3. Типографика

- **Heading:** Cormorant Garamond (weights 400, 500, 600)
- **Body:** Inter (weights 400, 500, 600, 700)

### Google Fonts ссылка

`<link>` в `BaseLayout.astro`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"
/>
```

### Шкала размеров

| Класс | Use | Tailwind |
|---|---|---|
| H1 (Hero) | Главный заголовок лендинга | `text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-[1.1]` |
| H2 (Section) | Заголовок секции | `text-3xl sm:text-4xl font-serif font-medium leading-tight` |
| H3 (Card) | Заголовок карточки/статьи | `text-xl sm:text-2xl font-serif font-medium` |
| Eyebrow | Подпись над H2 (uppercase) | `text-xs tracking-[0.18em] uppercase text-sage-700 font-sans font-medium` |
| Lead | Подзаголовок Hero | `text-lg sm:text-xl text-graphite/80 leading-relaxed font-sans` |
| Body | Основной текст | `text-base leading-relaxed text-graphite/85 font-sans` |
| Caption | Дата, мелкие подписи | `text-sm text-graphite-muted font-sans` |

### Правила
- Никогда не выделять заголовки жирным **bold** в Cormorant — используем weight 500/600, и этого достаточно
- Line-height: 1.1 для H1, 1.2 для H2, 1.4 для H3, 1.6–1.7 для body
- Длина строки текста: max ~70 символов (`max-w-prose` = 65ch)
- Никаких `text-transform: uppercase` для длинных предложений — только для коротких labels (eyebrow)

---

## 4. Spacing, radius, тени

### Spacing scale (Tailwind default, ничего не переопределяем)
Используем стандартные 4/8/12/16/24/32/48/64/96 px (= 1/2/3/4/6/8/12/16/24 в Tailwind).

### Радиусы
| Use | Tailwind |
|---|---|
| Кнопки, чипы | `rounded-full` |
| Карточки малые | `rounded-2xl` (16px) |
| Карточки большие, hero-image | `rounded-3xl` (24px) |
| Input fields | `rounded-xl` (12px) |

### Тени (мягкие, никогда тёмные)
| Уровень | Значение |
|---|---|
| `shadow-soft-sm` | `0 1px 2px rgba(85, 110, 76, 0.05)` |
| `shadow-soft` | `0 4px 16px rgba(85, 110, 76, 0.08)` |
| `shadow-soft-lg` | `0 8px 32px rgba(85, 110, 76, 0.10)` |

Тени окрашены в sage-тон, не серый — это даёт зелёный оттенок, согласный с палитрой.

Дополнить `@theme`:
```css
--shadow-soft-sm: 0 1px 2px rgba(85, 110, 76, 0.05);
--shadow-soft: 0 4px 16px rgba(85, 110, 76, 0.08);
--shadow-soft-lg: 0 8px 32px rgba(85, 110, 76, 0.10);
```

---

## 5. Компоненты

### Primary CTA (sage-кнопка)

```html
<a class="
  inline-flex items-center justify-center gap-2
  px-6 py-3
  rounded-full
  bg-sage-700 text-cream
  font-sans font-medium text-base
  hover:bg-sage-800
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-700
  transition-colors duration-200
  cursor-pointer
">
  Получить копинг-карточку
</a>
```

### Secondary CTA (контурная)

```html
<a class="
  inline-flex items-center justify-center gap-2
  px-6 py-3
  rounded-full
  border border-sage-300 text-sage-800
  font-sans font-medium text-base
  hover:bg-sage-50 hover:border-sage-500
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-700
  transition-colors duration-200
  cursor-pointer
">
  Подробнее
</a>
```

### Telegram-кнопка (для услуг)

Использовать вариант **primary** (sage-700) + иконка Telegram перед текстом:

```html
<a class="... bg-sage-700 text-cream hover:bg-sage-800 ...">
  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <!-- Lucide "send" или Simple Icons Telegram -->
    <path d="..."/>
  </svg>
  Написать в Telegram
</a>
```

### Card (карточка статьи/услуги)

```html
<article class="
  flex flex-col gap-3
  p-6 sm:p-8
  rounded-2xl
  bg-cream-deep
  border border-sage-100
  hover:border-sage-300
  transition-colors duration-200
  cursor-pointer
">
  <h3 class="font-serif text-2xl text-graphite">{title}</h3>
  <p class="text-graphite/80 leading-relaxed">{description}</p>
  <span class="text-sm text-sage-700 mt-auto">Читать →</span>
</article>
```

### Hero portrait frame

```html
<img
  src="/images/kristina-hero.jpg"
  alt="Кристина Ефременкова"
  class="
    w-full aspect-[3/4]
    object-cover object-center
    rounded-3xl
    shadow-soft-lg
  "
/>
```

Не использовать `border-radius: 50%` (круглое фото) — выглядит «стоково». Прямоугольник 3:4 с большим радиусом — современнее.

---

## 6. Иконки

**Источник:** Lucide (`lucide-static` или inline-SVG). Без Heroicons (другая стилистика). Без эмодзи в UI.

**Использовать:**
- `download` — для кнопки скачивания карточки
- `arrow-right` — навигация
- `chevron-left` — «← К материалам»
- `send` / `message-circle` — Telegram-кнопка
- `instagram`, `dribbble` (для VK fallback) — соцсети в подвале

**Размер:** `w-4 h-4` (16px) внутри кнопок, `w-5 h-5` (20px) для standalone.

**Цвет:** наследовать через `currentColor`.

Эмодзи 🕊 в логотипе бренда — **исключение**, потому что это часть бренд-имени (не UI-иконка). Используется один раз в Header и один раз в Footer.

---

## 7. Структура лендинга — текстовый мокап

Размеры даны для desktop ≥1024px. Mobile-first — на мобиле всё в одну колонку.

### Container
- `max-w-6xl mx-auto` (1152px)
- Padding: `px-4 sm:px-8`
- Между секциями: `py-16 sm:py-24` (64-96px вертикально)

### Header (sticky? нет, обычный)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  КРИС, СКАЖИ МНЕ 🕊                                          │
│  (Cormorant 20px, sage-700, letter-spacing wide)            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- Высота: ~72px
- Background: cream (тот же, что body — без визуальной границы)
- Слева: логотип-надпись
- Справа: пусто (никакой навигации — у нас один лендинг)

### Block 1 — Hero (2 колонки)

```
┌─────────────────────────────────────────────────────────────┐
│                                          ┌─────────────────┐│
│  ПЕРИНАТАЛЬНЫЙ ПСИХОЛОГ (eyebrow,         │                 ││
│  sage-700, uppercase, tracking)           │                 ││
│                                           │   Фото          ││
│  Помогаю женщинам                          │   Кристины     ││
│  спокойно встретить                        │   3:4          ││
│  роды                                      │   rounded-3xl  ││
│  (Cormorant H1, 56-64px,                  │   shadow-soft   ││
│  leading-tight, graphite)                 │                 ││
│                                           │                 ││
│  Работаю с дородовой и                    │                 ││
│  послеродовой тревогой.                   │                 ││
│  Поддержка, инструменты,                  │                 ││
│  ясность — для тебя и                     │                 ││
│  малыша.                                  │                 ││
│  (Inter 18px, graphite/80)                │                 ││
│                                           │                 ││
│  [ Получить копинг-карточку ]             │                 ││
│  (primary CTA, sage-700)                  │                 ││
│                                           │                 ││
│                                           └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

- Grid: `sm:grid-cols-2 gap-12 sm:items-center`
- На мобиле: фото СВЕРХУ (`order-1` mobile / `order-2` desktop)
- Декоративная деталь: за фотографией справа едва заметная sage-tint форма-листочек (опционально, как на постере) — `absolute -z-10 right-0 top-0 w-1/2 h-full bg-sage-tint rounded-l-[200px] opacity-60`. Простой вариант — обойтись без декорации.

### Block 2 — Про Кристину (2 колонки, инвертированные пропорции)

Альтернативный фон секции: `bg-sage-50` (sage-tint) — даёт ритм после cream-Hero.

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────┐    Кристина Ефременкова                       │
│  │          │    (Cormorant H2, 40px, graphite)             │
│  │  Фото    │                                                │
│  │ квадрат  │    Перинатальный психолог.                    │
│  │ 1:1      │    Сопровождаю женщин на пути к                │
│  │ rounded  │    материнству — от тревог беременности       │
│  │          │    до адаптации после родов. Считаю,          │
│  │          │    что страх перед родами — это нормально.    │
│  └──────────┘    (Inter 18px, graphite/85, leading-relaxed) │
│                                                             │
│                  • Медицинское образование (педиатрия)      │
│                    и высшее психологическое                 │
│                  • 5 лет частной практики                   │
│                  • КПТ, схема-терапия, подход Шахова,       │
│                    метафорические карты, телесная терапия   │
│                  • Личная терапия, супервизии,              │
│                    повышение квалификации                   │
│                  (Inter 16px, graphite/80, sage-500 dots)   │
└─────────────────────────────────────────────────────────────┘
```

- Grid: `sm:grid-cols-[1fr_1.4fr] gap-12 sm:items-center`
- Буллеты: вместо стандартных точек — sage-500 кружочки `w-1.5 h-1.5 rounded-full bg-sage-500 mt-2.5`

### Block 3 — Копинг-карточки (hero + grid)

Фон: cream (основной).

```
┌─────────────────────────────────────────────────────────────┐
│  БЕСПЛАТНЫЕ МАТЕРИАЛЫ                                       │
│  (eyebrow)                                                  │
│                                                             │
│  Копинг-карточки                                            │
│  (H2)                                                       │
│                                                             │
│  Сохрани на телефон, поставь на заставку или распечатай.    │
│  Перечитывай в моменты тревоги — это работает.              │
│  (lead, max-w-2xl, graphite/70)                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  bg-sage-tint, p-10, rounded-3xl                    │    │
│  │  ┌──────────┐    Снижение страха                    │    │
│  │  │          │    перед родами                       │    │
│  │  │ Карточка │    (H3, 28px)                         │    │
│  │  │ 3:4 PNG  │                                       │    │
│  │  │ preview  │    Поддерживающая карточка для        │    │
│  │  │ rounded  │    2–3 триместра. Перечитывайте       │    │
│  │  │          │    в моменты тревоги.                 │    │
│  │  │ shadow   │    (body)                             │    │
│  │  │          │                                       │    │
│  │  │          │    [ ⬇ Скачать PNG ]                  │    │
│  │  │          │    (primary CTA с иконкой download)   │    │
│  │  └──────────┘                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [Сетка плейсхолдеров для будущих карточек:                 │
│   3 колонки на десктопе, 2 на планшете, 1 на мобиле]        │
└─────────────────────────────────────────────────────────────┘
```

### Block 4 — Статьи (сетка)

Фон: `bg-sage-50`.

```
┌─────────────────────────────────────────────────────────────┐
│  СТАТЬИ                                                     │
│  (eyebrow)                                                  │
│                                                             │
│  Что почитать                                               │
│  (H2)                                                       │
│                                                             │
│  Короткие тексты о тревоге, теле, родах и материнстве.      │
│  (lead)                                                     │
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│  │ Card cream   │ │              │ │              │         │
│  │              │ │              │ │              │         │
│  │ Заголовок    │ │ Заголовок    │ │ Заголовок    │         │
│  │ (H3 serif)   │ │              │ │              │         │
│  │              │ │              │ │              │         │
│  │ Аннотация    │ │ Аннотация    │ │ Аннотация    │         │
│  │ в 2 строки   │ │              │ │              │         │
│  │              │ │              │ │              │         │
│  │ Читать →     │ │ Читать →     │ │ Читать →     │         │
│  │ (sage-700)   │ │              │ │              │         │
│  └──────────────┘ └──────────────┘ └──────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

- Карточки: `bg-cream-deep` или `bg-white`, `border border-sage-100`
- Hover: `border-sage-300` (без scale, без shift)
- На мобиле: 1 колонка

### Block 5 — Форматы работы (2 карточки)

Фон: cream.

```
┌─────────────────────────────────────────────────────────────┐
│  ЕСЛИ ХОЧЕШЬ ГЛУБЖЕ                                         │
│  (eyebrow)                                                  │
│                                                             │
│  Форматы работы                                             │
│  (H2)                                                       │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────┐     │
│  │  Card cream-deep       │  │                        │     │
│  │                        │  │                        │     │
│  │  Консультация          │  │  МАК-экспресс          │     │
│  │  50 минут              │  │                        │     │
│  │  (H3 serif 26px)       │  │  (H3)                  │     │
│  │                        │  │                        │     │
│  │  4 900 ₽               │  │  донейшн от 500 ₽      │     │
│  │  (sage-700 medium)     │  │                        │     │
│  │                        │  │                        │     │
│  │  Глубокая работа       │  │  Расшифровка МАК-карты │     │
│  │  по тревогам и         │  │  — 2 голосовых         │     │
│  │  страхам, связанным    │  │  сообщения, ~5 минут.  │     │
│  │  с родами. Zoom или    │  │  В Telegram или ВК.    │     │
│  │  Телемост.             │  │                        │     │
│  │                        │  │                        │     │
│  │  [→ Написать в TG]     │  │  [→ Написать в TG]     │     │
│  │  (primary CTA)         │  │  (primary CTA)         │     │
│  └────────────────────────┘  └────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

- Padding карточек: `p-8 sm:p-10`
- На мобиле: 1 колонка, gap-6

### Block 6 — Footer

Фон: `bg-sage-50`, отделён `border-t border-sage-100`.

```
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────────────────┐    ┌────────────────────────┐  │
│  │ КРИС, СКАЖИ МНЕ 🕊      │    │ Telegram-канал         │  │
│  │ Кристина Ефременкова,   │    │ ВКонтакте              │  │
│  │ перинатальный психолог  │    │ Instagram              │  │
│  │ Брянск · онлайн         │    │ Написать: @Kris_tellme │  │
│  │ Zoom / Телемост         │    │                        │  │
│  └─────────────────────────┘    └────────────────────────┘  │
│                                                             │
│  ─────────────────────────────────                          │
│                                                             │
│  Материалы носят информационный характер и не заменяют      │
│  медицинскую помощь.                                        │
│  (caption, graphite-muted)                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Подстраница статьи `/articles/<slug>`

```
┌─────────────────────────────────────────────────────────────┐
│  Header (тот же, что на лендинге)                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│       ← К материалам    (sage-700, small)                   │
│                                                             │
│       12 марта 2026     (caption, graphite-muted)           │
│                                                             │
│       Заголовок статьи                                      │
│       (Cormorant H1, 40-48px, не center, left-aligned)      │
│                                                             │
│       Подзаголовок-описание в одну строку.                  │
│       (Inter 18px, graphite/70)                             │
│                                                             │
│       ──────                                                │
│       (Sage-100 разделитель, 60px wide, ml-0)               │
│                                                             │
│       Основной текст статьи. Цвет graphite/85,              │
│       шрифт Inter 18px, line-height 1.7, длина              │
│       строки ~65ch.                                         │
│                                                             │
│       ## Подзаголовок                                       │
│       (Cormorant H2, 32px, mt-12)                           │
│                                                             │
│       Следующий абзац...                                    │
│                                                             │
│       • Bullet 1                                            │
│       • Bullet 2                                            │
│       • Bullet 3                                            │
│                                                             │
│       > Важная мысль выделена цитатой.                      │
│       > (Border-left 3px sage-500, italic, graphite/85)     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ aside, bg-sage-50, rounded-2xl, p-8, mt-16          │    │
│  │                                                     │    │
│  │  Если хочешь обсудить эту тему лично — напиши.      │    │
│  │                                                     │    │
│  │  [→ Написать в Telegram]                            │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  Footer (тот же)                                            │
└─────────────────────────────────────────────────────────────┘
```

- Container: `max-w-2xl mx-auto` (672px) для удобства чтения
- Padding: `px-4 sm:px-8 py-12`
- `prose` плагин Tailwind для базовых markdown-стилей, переопределённый под нашу палитру:

```css
.prose {
  --tw-prose-body: var(--color-graphite);
  --tw-prose-headings: var(--color-graphite);
  --tw-prose-lead: var(--color-graphite);
  --tw-prose-links: var(--color-sage-700);
  --tw-prose-bold: var(--color-graphite);
  --tw-prose-quotes: var(--color-graphite);
  --tw-prose-quote-borders: var(--color-sage-500);
  --tw-prose-bullets: var(--color-sage-500);
}

.prose h2 {
  font-family: var(--font-serif);
  font-weight: 500;
}
```

---

## 9. Спецификации активов

### 9.1 Копинг-карточка PNG

**Файл:** `public/cards/snizhenie-straha-rodov.png`

**Назначение:** скачиваемый, печатаемый PNG. Должна хорошо смотреться и на экране телефона, и распечатанная на А4.

**Размер и пропорции:**
- 1200 × 1600 px (3:4) для экранов
- При печати на А4 — отдельная PDF/PNG в 2480×3508 px (необязательно сейчас, на старте достаточно одного PNG)

**Layout (по референсу-постеру лекции):**

```
┌──────────────────────────────────────────┐  ← cream фон #FAF7F1
│                                          │     с декоративной растительной
│  поддерживающая копинг-карточка          │     тенью-листком в правом
│  (Inter 14px, sage-700, uppercase,        │     верхнем углу (opacity 0.15)
│  tracking-wider)                         │
│                                          │
│  ───                                     │
│  (3 sage-500 точки или короткая линия)   │
│                                          │
│  Снижение                                │
│  страха перед                            │
│  родами                                  │
│  (Cormorant 48px, graphite,              │
│   leading-tight, weight 500)             │
│                                          │
│  ──────────────────────────────          │  ← тонкая sage-100 линия
│                                          │
│  Да, роды меня пугают — это новый        │
│  и важный опыт. Страх перед              │
│  неизвестностью абсолютно нормален.      │
│  Но важно напомнить себе: роды —         │
│  не болезнь и не испытание, а            │
│  естественный, природный процесс,        │
│  который миллионы лет отточен            │
│  самой эволюцией.                        │
│                                          │
│  (Inter 16px, graphite, leading 1.6)     │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ box highlight, bg-sage-tint,       │  │  ← опционально:
│  │ rounded-2xl, p-6                   │  │     ключевая фраза в боксе
│  │                                    │  │     для маркера
│  │ «Моё тело знает, как рожать.       │  │
│  │  Я доверяю ему.»                    │  │
│  │ (Cormorant 22px, italic, sage-800) │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Что поможет прямо сейчас:               │
│  (Inter 16px, graphite, weight 600)      │
│                                          │
│  1. Закрыть глаза и сделать 5–7          │
│     глубоких вдохов...                   │
│  2. ...                                  │
│  3. ...                                  │
│  (нумерация sage-700, текст graphite)    │
│                                          │
│                                          │
│                            КРИС,         │  ← подпись внизу
│                            СКАЖИ МНЕ 🕊  │     (Inter 12px tracking)
│                            @kris_tellme  │
└──────────────────────────────────────────┘
```

**Источник текста:** `coping-card-source.txt`. Делается дизайнером (или Кристиной в Canva с гайдом отсюда) — на этапе имплементации в репо лежит placeholder.

**Многостраничность:** если весь текст не помещается на одну страницу — две страницы (PNG-1 и PNG-2) или одностраничный PDF.

### 9.2 OG-image

**Файл:** `public/og-image.jpg`

**Размер:** 1200 × 630 px (Open Graph стандарт)

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│  bg cream                                                    │
│                                                              │
│  ┌──────────────────────────────┐                            │
│  │                              │     Помогаю женщинам      │
│  │       Фото Кристины          │     спокойно встретить     │
│  │       (cropped vertical)     │     роды                   │
│  │                              │     (Cormorant 56px)       │
│  └──────────────────────────────┘                            │
│                                       КРИС, СКАЖИ МНЕ 🕊    │
│                                       (Inter 18px tracking)  │
└──────────────────────────────────────────────────────────────┘
```

- Фото слева 1/2 ширины, текст справа
- Текст: H1 серифом + бренд-имя под ним
- Без CTA, без URL — это шаринг-картинка

### 9.3 Favicon

**Файлы:**
- `public/favicon.svg` — векторный, основной
- `public/favicon-32.png` — fallback 32×32 (опционально)
- `public/apple-touch-icon.png` — 180×180 (опционально)

**Дизайн:**

```
┌──────────┐
│  bg sage-│   Квадрат sage-500 #88A37D
│  500     │   с буквой «К» по центру:
│          │   Cormorant Garamond,
│    К     │   weight 500,
│          │   color cream #FAF7F1
│          │
└──────────┘
```

SVG:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#88A37D"/>
  <text x="50%" y="60%" text-anchor="middle"
        font-family="Cormorant Garamond, Georgia, serif"
        font-size="40" fill="#FAF7F1" font-weight="500">К</text>
</svg>
```

---

## 10. Анимация

**Принципы:**
- Только `transition-colors`, `transition-opacity`, `transition-transform` (для translateY ≤ 2px)
- Длительность: 200ms (`duration-200`), кривая `ease-out`
- НЕТ масштабирования (`scale`), которое сдвигает соседние элементы
- На уровне body: `prefers-reduced-motion: reduce` → все transitions = 0ms

CSS-хук:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Responsive breakpoints

Используем Tailwind defaults:

| BP | min-width | Use |
|---|---|---|
| sm | 640px | Tablet portrait |
| md | 768px | Tablet landscape |
| lg | 1024px | Desktop |
| xl | 1280px | Wide desktop |

**Тестовые viewport:** 375 (iPhone SE), 768 (iPad), 1024 (laptop), 1440 (desktop). Содержимое — `max-w-6xl` (1152px), на 1440+ остаётся боковой воздух.

---

## 12. Pre-delivery checklist (для имплементатора)

Перед коммитом проверь:

- [ ] Шрифты Cormorant Garamond + Inter подгружены с display=swap
- [ ] Primary CTA использует `bg-sage-700` (не sage-500), чтобы пройти WCAG AA
- [ ] Все clickable элементы имеют `cursor-pointer` и `focus-visible:outline-2`
- [ ] Hover-эффекты только `transition-colors`, никакого scale/translate сильнее 2px
- [ ] Ни одной эмодзи в UI, кроме 🕊 в бренд-имени
- [ ] Иконки — только Lucide SVG
- [ ] Никаких градиентов
- [ ] Никакого dark mode
- [ ] Текст body имеет контраст ≥4.5:1 на cream-фоне
- [ ] `prefers-reduced-motion` отрабатывает
- [ ] Адаптивно проверено на 375 / 768 / 1024 / 1440
- [ ] Long-line ширина body ≤ 70ch
- [ ] Все картинки имеют осмысленный `alt`

# Fullstack Internationalization/Localization Demo

A comprehensive demonstration of implementing Internationalization (i18n) and Localization (l10n) in a fullstack web application with **NestJS** backend and **React** frontend.

## 🌍 What is This?

This project showcases how to build a multi-language web application that supports **German (DE)** and **English (EN)** with:

- ✅ Live language switching without page reloads
- ✅ Backend API translations
- ✅ Frontend UI translations
- ✅ Form elements with dynamic labels
- ✅ Variable interpolation and pluralization
- ✅ Type-safe translation keys
- ✅ Persistent language preference (localStorage)

## 📚 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features Demonstrated](#features-demonstrated)
- [Quick Start](#quick-start)
- [Architecture Overview](#architecture-overview)
- [i18n Implementation Patterns](#i18n-implementation-patterns)
- [Translation File Structure](#translation-file-structure)
- [Backend i18n (NestJS)](#backend-i18n-nestjs)
- [Frontend i18n (React)](#frontend-i18n-react)
- [Language Switcher](#language-switcher)
- [UI Components](#ui-components)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🛠 Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/) (Node.js framework)
- **i18n Library**: [`nestjs-i18n`](https://github.com/Tothekr/nestjs-i18n)
- **Validation**: `class-validator`, `class-transformer`
- **Language**: TypeScript

### Frontend
- **Framework**: [React](https://react.dev/) with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **i18n Library**: [`react-i18next`](https://react.i18next.com/) + [`i18next`](https://www.i18next.com/)
- **Language Detection**: `i18next-browser-languagedetector`
- **Routing**: `react-router-dom`
- **Styling**: Custom CSS (minimalist, responsive)

### Why These Libraries?

| Library | Reason |
|---------|--------|
| **nestjs-i18n** | Live reload, type-safe translations, excellent documentation |
| **react-i18next** | Industry standard, hooks-based API, massive community |
| **i18next** | Universal i18n framework, supports pluralization, interpolation |

---

## 📁 Project Structure

```
nestjs_react_internationalization/
├── .gitignore
├── README.md
│
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── main.ts            # App entry point
│   │   ├── app.module.ts      # Root module with I18nModule
│   │   ├── app.controller.ts  # API endpoints
│   │   ├── app.service.ts     # Service with i18n logic
│   │   └── i18n/              # Translation source files (copied to dist/ on build)
│   │       ├── en/
│   │       │   └── common.json
│   │       └── de/
│   │           └── common.json
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── main.tsx           # App entry point
    │   ├── App.tsx            # Main app component
    │   ├── i18n/
    │   │   ├── i18n.ts        # i18next configuration
    │   │   └── locales/
    │   │       ├── en/
    │   │       │   └── translation.json
    │   │       └── de/
    │   │           └── translation.json
    │   ├── components/
    │   │   ├── LanguageSwitcher.tsx
    │   │   ├── Navigation.tsx
    │   │   ├── HomePage.tsx
    │   │   └── OrderPage.tsx
    │   ├── App.css            # Styles
    │   └── index.css
    ├── package.json
    └── vite.config.ts
```

---

## ✨ Features Demonstrated

### 1. **Text Translation**
Static text in both German and English.

### 2. **Variable Interpolation**
Dynamic content like `{{name}}` and `{{count}}`.

### 3. **Pluralization**
Different forms for singular/plural: `1 item` vs `2 items`.

### 4. **Nested Keys**
Structured translation keys: `common.home`, `pizza.title`.

### 5. **Form Elements**
- Text inputs with labels
- Select boxes (dropdowns)
- Checkboxes
- Radio buttons
- Sliders (range inputs)
- Textareas
- Number inputs

### 6. **Language Switcher**
Real-time language switching with persistence.

### 7. **Routing**
Multi-language routes (`/` and `/order`).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone & Install

```bash
# Navigate to project
cd /home/hacky/nestjs_react_internationalization

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```

### 2. Start Backend (Terminal 1)

```bash
cd backend
npm run start:dev
```

Backend runs on: **http://localhost:3000**

### 3. Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend runs on: **http://localhost:5173**

### 4. Test API Endpoints

```bash
# English greeting
curl http://localhost:3000/greeting?name=Max&lang=en
# Response: "Hello, Max!"

# German greeting
curl http://localhost:3000/greeting?name=Max&lang=de
# Response: "Hallo, Max!"

# Pluralization
curl http://localhost:3000/plural?count=3&lang=de
# Response: "3 Elemente"
```

---

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   React Frontend                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Language   │  │   Pages     │  │  UI Components  │  │
│  │  Switcher   │  │  (Routes)   │  │  (Forms, etc.)  │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│                           │                               │
│                    i18next Engine                         │
│              (react-i18next + i18next)                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼ (CORS enabled)
┌─────────────────────────────────────────────────────────┐
│                   NestJS Backend                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Routes    │  │  Services   │  │  i18nService    │  │
│  │  (API)      │  │  (Logic)    │  │  (Translations) │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│                           │                               │
│                    I18nModule                            │
│              (nestjs-i18n)                               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌──────────────────────┐
              │  Translation Files   │
              │  /i18n/en/common.json│
              │  /i18n/de/common.json│
              └──────────────────────┘
```

---

## 📖 i18n Implementation Patterns

### Translation File Structure

**File**: `frontend/src/i18n/locales/en/translation.json`

```json
{
  "common": {
    "home": "Home",
    "language": {
      "de": "Deutsch",
      "en": "English"
    }
  },
  "home": {
    "title": "Welcome to i18n Demo",
    "features": {
      "title": "Features",
      "feature1": "German and English language support"
    }
  },
  "pizza": {
    "title": "Order Pizza",
    "customerId": "Customer ID",
    "pizzaSelection": "Select pizza",
    "pizzas": {
      "margherita": "Margherita - Classic tomato sauce, mozzarella",
      "pepperoni": "Pepperoni - Spicy pepperoni, tomato sauce"
    },
    "size": "Size",
    "sizeSmall": "small (25cm)",
    "sizeMedium": "medium (32cm)",
    "sizeLarge": "large (40cm)"
  }
}
```

**Key Points**:
- **Flat structure** at root level (no nested `translation` key)
- **Namespaced** by feature (`common`, `home`, `pizza`, `forms`, `navigation`)
- **Nested keys** within namespaces for organization

---

### Pattern 2: Backend Translation Service

**File**: `backend/src/app.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) {}

  getHello(lang: string): string {
    return this.i18n.translate('common.api.hello', { lang });
  }

  getGreeting(name: string, lang: string): string {
    return this.i18n.translate('common.api.greeting', { lang, args: { name } });
  }

  getPlural(count: number, lang: string): string {
    return this.i18n.translate('common.api.plural', { lang, args: { count } });
  }
}
```

**Key Points**:
- Inject `I18nService` and call `this.i18n.translate(key, { lang, args })` directly
- Translation key prefix is the **filename** (`common`) followed by the JSON path
- **Variable interpolation** with `{{name}}` syntax handled by nestjs-i18n
- **Fallback** to `fallbackLanguage` if a key or language is missing

---

### Pattern 3: Frontend Hook Usage

**File**: `frontend/src/components/HomePage.tsx`

```typescript
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
};
```

**Key Points**:
- Use `useTranslation()` hook in functional components
- `t()` function translates keys
- Keys match the JSON structure: `home.title`

---

### Pattern 4: Language Switcher

**File**: `frontend/src/components/LanguageSwitcher.tsx`

```typescript
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${i18n.language === 'de' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('de')}
        aria-label={t('common.language.de')}
      >
        DE
      </button>
      <button
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('en')}
        aria-label={t('common.language.en')}
      >
        EN
      </button>
    </div>
  );
};
```

**Key Points**:
- No custom Context or `useState` needed — i18next manages language state globally
- `i18n.changeLanguage(lang)` switches the language and triggers a re-render everywhere
- Persistence to `localStorage` is handled automatically by `i18next-browser-languagedetector`

---

### Pattern 5: Pluralization

**Translation File** (`en/common.json`):

```json
{
  "items": {
    "zero": "No items",
    "one": "{{count}} item",
    "other": "{{count}} items"
  }
}
```

**Usage**:

```typescript
// Backend
this.i18n.translate('api.plural', { 
  lang, 
  args: { count },
  plural: count === 1 ? 'one' : 'other'
});

// Frontend
t('pizza.quantity', { count: order.quantity });
```

---

### Pattern 6: Form Elements with i18n

**Example: Select Box**

```tsx
<label>{t('pizza.size')}</label>
<select id="size" value={order.size} onChange={handleSizeChange}>
  <option value="">{t('forms.selectSize')}</option>
  <option value="small">{t('pizza.sizeSmall')}</option>
  <option value="medium">{t('pizza.sizeMedium')}</option>
  <option value="large">{t('pizza.sizeLarge')}</option>
</select>
```

**Example: Checkbox Group**

```tsx
<fieldset>
  <legend>{t('pizza.extras')}</legend>
  <label>
    <input type="checkbox" checked={extras.includes('mushrooms')} />
    {t('pizza.extraMushrooms')}
  </label>
  <label>
    <input type="checkbox" checked={extras.includes('olives')} />
    {t('pizza.extraOlives')}
  </label>
</fieldset>
```

**Example: Select Box for Pizza Type**

```tsx
<label>{t('pizza.pizzaSelection')}</label>
<select id="pizzaType" value={order.pizzaType} onChange={handlePizzaTypeChange}>
  <option value="">{t('forms.selectSize')}</option>
  <option value="margherita">{t('pizza.pizzas.margherita')}</option>
  <option value="pepperoni">{t('pizza.pizzas.pepperoni')}</option>
  <option value="vegetariana">{t('pizza.pizzas.vegetariana')}</option>
  <option value="quattro">{t('pizza.pizzas.quattro')}</option>
  <option value="prosciutto">{t('pizza.pizzas.prosciutto')}</option>
</select>
```

**Example: Radio Buttons for Size**

```tsx
<fieldset>
  <legend>{t('pizza.size')}</legend>
  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="size"
        value="small"
        checked={order.size === 'small'}
        onChange={handleSizeChange}
      />
      {t('pizza.sizeSmall')}
    </label>
    <label>
      <input
        type="radio"
        name="size"
        value="medium"
        checked={order.size === 'medium'}
        onChange={handleSizeChange}
      />
      {t('pizza.sizeMedium')}
    </label>
    <label>
      <input
        type="radio"
        name="size"
        value="large"
        checked={order.size === 'large'}
        onChange={handleSizeChange}
      />
      {t('pizza.sizeLarge')}
    </label>
  </div>
</fieldset>
```

**Example: Slider with Label**

```tsx
<label>{t('pizza.spicy')}</label>
<div className="slider-container">
  <input
    type="range"
    value={order.spicy}
    onChange={handleSpicyChange}
    aria-label={t('pizza.spicyLabel')}
  />
  <span>{order.spicy}%</span>
</div>
```

---

## 🎨 UI Components

### Pages

1. **HomePage** (`/`)
   - Welcome message
   - Feature list
   - Call-to-action button

2. **OrderPage** (`/order`)
   - Pizza ordering form with all UI elements demonstrated:
     - Text input (customer ID)
     - Select box (pizza type - 5 different pizzas)
     - Radio buttons (size: small/medium/large)
     - Checkboxes (extras)
     - Slider (spiciness)
     - Number input (quantity)
     - Textarea (notes)
     - Buttons (submit, cancel)

### Components

- **LanguageSwitcher**: DE/EN toggle buttons
- **Navigation**: Menu with active state
- **HomePage**: Static content page
- **OrderPage**: Interactive form page

---

## ✅ Best Practices

### 1. **Organize Translation Files**
- Use **namespaces** for large apps
- Group related keys (e.g., `forms`, `common`, `pages`)
- Use **nested keys** for hierarchy

### 2. **Use Descriptive Keys**
- ✅ `pizza.size`
- ❌ `text1`

### 3. **Handle Missing Translations**
- Set **fallback languages**
- Enable **debug mode** in development
- Log missing keys

### 4. **Type Safety**
- Generate **TypeScript types** from translation files
- Use **IDE autocomplete**

### 5. **Performance**
- **Lazy load** translations for large apps
- **Code split** by language
- **Cache** translated content

### 6. **Testing**
- Test **all languages** before deployment
- Check **RTL** support (if needed)
- Verify **long text** doesn't break layout

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Translations Not Loading

**Problem:** Keys show as `translation.key` instead of actual text

**Solutions:**
- Check file paths in i18n configuration
- Verify JSON files are valid (use JSON lint)
- Ensure `watch: true` is set for development
- Restart backend server

#### 2. Language Switcher Not Working

**Problem:** Clicking language buttons doesn't change text

**Solutions:**
- Check `i18n.changeLanguage()` is being called
- Ensure translations exist for target language
- Verify `i18n` is initialized before the component renders (`useSuspense: false` is set)

#### 3. Backend Returns Empty Strings

**Problem:** API returns empty translations

**Solutions:**
- Check `lang` query parameter is passed
- Verify translation files exist in correct directory
- Check `I18nModule` configuration

#### 4. Translations Show as Keys (e.g., "home.title")

**Problem:** Frontend displays translation keys instead of actual text

**Solutions:**
- **Verify i18n configuration**: Ensure `resources` in `i18n.ts` matches the structure
- **Clear browser cache**: Sometimes cached translations persist
- **Check namespace**: Make sure `defaultNS` is set correctly

#### 5. Language Switcher Not Visible

**Problem:** Language switcher buttons don't appear in navigation

**Solutions:**
- Verify `LanguageSwitcher` is imported and used in `Navigation.tsx`
- Ensure CSS styles are applied
- Verify component is rendered in the correct location

#### 6. TypeScript Errors

**Problem:** "Property does not exist on type"

**Solutions:**
- Ensure translation keys match exactly
- Add type definitions for translation keys
- Restart TypeScript language server

---

## 📚 Learning Resources

### Official Documentation

- [nestjs-i18n Documentation](https://nestjs-i18n.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Core](https://www.i18next.com/)

### Tutorials

- [NestJS i18n Setup Guide](https://nestjs-i18n.com/docs/getting-started)
- [React i18next Tutorial](https://react.i18next.com/latest/usetranslation-hook)
- [i18n Best Practices](https://www.i18nworkflow.com/best-practices)

---

## 📄 License

This project is provided for educational purposes. Feel free to use and modify as needed.

---

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork and modify
- Use as a learning resource
- Adapt for your own projects

---

## 📞 Support

For questions or issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the official documentation links
3. Search for similar issues in the library repositories

---

**Happy Coding! 🚀**

---

## 🗂 Translation File Structure

### Backend (NestJS)

**Location**: `backend/src/i18n/{lang}/common.json`

**Structure**:
```
i18n/
├── en/
│   └── common.json
└── de/
    └── common.json
```

**Features**:
- **Live reload** when files change (development)
- **Type-safe** keys (with additional setup)
- **Nested** JSON structure

---

### Frontend (React)

**Location**: `frontend/src/i18n/locales/{lang}/translation.json`

**Structure**:
```
i18n/
└── locales/
    ├── en/
    │   └── translation.json
    └── de/
        └── translation.json
```

**Features**:
- **Namespaces** (multiple JSON files)
- **Lazy loading** for large apps
- **Fallback** languages

---

## 🔧 Backend i18n (NestJS)

### Configuration

**File**: `backend/src/app.module.ts`

```typescript
import { I18nModule, AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, 'i18n/'),
        watch: true, // Live reload
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // ?lang=de
        AcceptLanguageResolver,                    // Accept-Language: de
      ],
    }),
  ],
})
export class AppModule {}
```

**Key Options**:
- `fallbackLanguage`: Default language if translation missing
- `path`: Directory containing translation files (relative to compiled `dist/`)
- `watch`: Enable live reload in development
- `resolvers`: Language detection strategies, evaluated in order:
  1. `QueryResolver` — explicit `?lang=de` query parameter (highest priority)
  2. `AcceptLanguageResolver` — standard HTTP `Accept-Language` header (e.g. sent by browsers)

---

### API Endpoints

**File**: `backend/src/app.controller.ts`

```typescript
import { I18nLang } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@I18nLang() lang: string): string {
    return this.appService.getHello(lang);
  }

  @Get('greeting')
  getGreeting(
    @Query('name') name: string = 'World',
    @I18nLang() lang: string,
  ): string {
    return this.appService.getGreeting(name, lang);
  }
}
```

`@I18nLang()` resolves the language automatically via the configured resolvers (see module config above). The controller does not need to know which resolution strategy was used.

**Endpoints**:
- `GET /?lang=de` → "Hallo Welt" (via QueryResolver)
- `GET /` with header `Accept-Language: de` → "Hallo Welt" (via AcceptLanguageResolver)
- `GET /greeting?name=Max&lang=en` → "Hello, Max!"

---

## 🎨 Frontend i18n (React)

### Configuration

**File**: `frontend/src/i18n/i18n.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import deTranslation from './locales/de/translation.json';
import enTranslation from './locales/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: deTranslation },
      en: { translation: enTranslation },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });
```

**Key Points**:
- Import translations as JSON modules
- Use `LanguageDetector` for auto-detection
- Set `fallbackLng` for missing translations

---

### Using Translations

**Basic Translation**:
```typescript
const { t } = useTranslation();
<h1>{t('home.title')}</h1>
```

**With Variables**:
```typescript
<p>{t('home.welcome', { name: 'Max' })}</p>
```

**Complex Translations with JSX**:
```typescript
import { Trans } from 'react-i18next';

<Trans>
  You have <strong>{{count}} unread messages</strong>
</Trans>
```

---

## 🔄 Language Switcher

### Implementation

**File**: `frontend/src/components/LanguageSwitcher.tsx`

```typescript
export const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${i18n.language === 'de' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('de')}
        aria-label={t('common.language.de')}
      >
        DE
      </button>
      <button
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => i18n.changeLanguage('en')}
        aria-label={t('common.language.en')}
      >
        EN
      </button>
    </div>
  );
};
```

**Features**:
- Active state indication
- Instant language switch
- Persists to localStorage via `i18next-browser-languagedetector`

---

## 📚 Additional Resources

- [nestjs-i18n Documentation](https://nestjs-i18n.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)

---

**Happy Internationalizing! 🌍**

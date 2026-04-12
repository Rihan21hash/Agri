# Distress Sale App

A fast, locality-first marketplace platform built to help individuals sell goods quickly during urgent situations. The platform connects sellers with nearby buyers through urgency-based listings, real-time chat, live mandi price data, government scheme discovery, and an AI-powered agricultural assistant.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Integrations](#api-integrations)
- [Pages and Routes](#pages-and-routes)
- [AI Chatbot — Kisan Mitra](#ai-chatbot--kisan-mitra)
- [Crop Image Detection System](#crop-image-detection-system)
- [Market Prices Module](#market-prices-module)
- [Government Schemes Module](#government-schemes-module)
- [Responsive Design](#responsive-design)
- [Performance Targets](#performance-targets)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Distress Sale App is a mobile-first web platform designed for speed and locality. It prioritizes urgency-based visibility, enabling sellers to list items in under 60 seconds and reach nearby buyers instantly. The platform is specifically optimized for farmers and rural users, with multilingual support, a live crop price dashboard, a government scheme directory, and an integrated AI assistant.

---

## Problem Statement

People in urgent situations — financial emergencies, relocation, crop overstock — struggle to sell items quickly on conventional marketplaces like OLX or Facebook Marketplace. These platforms are not built for urgency, resulting in delayed transactions, poor visibility for time-sensitive listings, and inefficient price discovery.

This platform addresses that gap with urgency indicators, location-based matching, and a distress-optimized listing flow.

---

## Key Features

### Core Marketplace
- User authentication via email, phone, or Google with OTP verification
- Quick listing creation in under 60 seconds with image upload
- Urgency toggle that marks listings as distress sales with priority feed placement
- Countdown timer on distress listings
- Location-based matching showing nearby listings first
- Smart pricing suggestions based on similar active listings
- In-app real-time chat with quick offer actions (Accept / Reject / Counter)
- Buyer and seller ratings with trust score display

### Farmer-Specific Features
- Auto crop image detection from listing title (100+ crop and product mappings)
- Live mandi price dashboard powered by the Government of India Agmarknet API
- MSP (Minimum Support Price) reference strip for notified crops
- Government scheme directory with eligibility checker and application guides
- Kisan Mitra AI chatbot for agricultural queries in multiple Indian languages
- WhatsApp share integration for listings and price data
- Voice input support on listing title field

### UI and Accessibility
- Multilingual interface: English, Hindi, Marathi, Tamil, Telugu
- High contrast mode for outdoor sunlight readability
- Large tap targets (minimum 48x48px) throughout
- Skeleton loaders and optimistic UI updates
- Offline browsing of cached listings via PWA service worker

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Tailwind CSS |
| Styling Config | tailwind.config.js, postcss.config.js |
| Animations | Framer Motion |
| Data Fetching | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Maps | React Leaflet |
| Charts | Recharts |
| Image Carousels | Swiper.js |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Authentication | Firebase Auth (firebase.js) |
| Database | Firestore (firestore.rules) |
| File Storage | Firebase Storage (storage.rules) |
| State / Context | React Context API (AuthContext, LanguageContext, ThemeContext) |
| AI Chatbot | Anthropic Claude API (claude-sonnet-4-20250514) |
| Market Data | data.gov.in Agmarknet API |
| Utilities | firebaseErrors.js, formatTime.js, sortItems.js |

---

## Project Structure

```
distress-sale-app/
├── public/
│   ├── images/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── BuyerSellerChat.jsx
│   │   ├── CategoryChips.jsx
│   │   ├── CropImageDetector.jsx
│   │   ├── FASellButton.jsx
│   │   ├── FloatingChatbot.jsx
│   │   ├── Formimput.jsx
│   │   ├── Footer.jsx
│   │   ├── ItemCard.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── MobileSectionNav.jsx
│   │   ├── Navbar.jsx
│   │   ├── OfferModal.jsx
│   │   ├── PriceCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SchemeCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── Timer.jsx
│   │   ├── UrgencyBadge.jsx
│   │   └── VoiceInput.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── cropImageMap.js
│   │   ├── governmentSchemes.js
│   │   ├── mockMarketPrices.js
│   │   └── translations.js
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── lib/
│   │   └── cn.js
│   ├── pages/
│   │   ├── AuthPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── GovernmentSchemesPage.jsx
│   │   ├── ItemDetailPage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── MarketPricesPage.jsx
│   │   ├── MyItemsPage.jsx
│   │   └── PostItemPage.jsx
│   ├── services/
│   │   ├── AuthContext.jsx
│   │   ├── storageService.js
│   │   └── userService.js
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── firebaseErrors.js
│   │   ├── formatTime.js
│   │   └── sortItems.js
│   ├── App.css
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── firebase.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── main.jsx
│   └── reportWebVitals.js
├── .env
├── .env.example
├── .gitignore
├── build_output.txt
├── firestore.rules
├── package.json
├── postcss.config.js
├── README.md
├── storage.rules
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Firebase project with Firestore and Storage enabled
- data.gov.in API key (free registration)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/distress-sale-app.git
cd distress-sale-app

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Start the development server
npm run dev
```


---

## Environment Variables

Create a `.env` file in the project root with the following keys:

```env
# Anthropic Claude API
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key

# Firebase Authentication
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Government Market Data
VITE_DATAGOVIN_API_KEY=your_data_gov_in_api_key

```

> To obtain a free `data.gov.in` API key, register at [data.gov.in](https://data.gov.in) and request access to resource ID `9ef84268-d588-465a-a308-a864a43d0070`.

---

## API Integrations

### Agmarknet — data.gov.in

Provides real-time mandi (wholesale market) prices for crops across India.

```
GET https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070
    ?api-key={KEY}
    &format=json
    &limit=100
    &filters[State]={state}
    &filters[Commodity]={commodity}
```

Response fields: `State`, `District`, `Market`, `Commodity`, `Variety`, `Min_x0020_Price`, `Max_x0020_Price`, `Modal_x0020_Price`, `Price_x0020_Date`

A mock dataset covering 30+ crops and major mandis is included in `src/data/mockPriceData.js` for offline development and demo use.

---

## Pages and Routes

| Route | Page File | Description |
|---|---|---|
| `/` | `LandingPage.jsx` | Home page with urgency listings, price preview, and scheme preview |
| `/auth` | `AuthPage.jsx` | Login, sign up, and OTP verification |
| `/dashboard` | `DashboardPage.jsx` | User dashboard with active listings and activity summary |
| `/post` | `PostItemPage.jsx` | 3-step listing wizard with crop image detection |
| `/item/:id` | `ItemDetailPage.jsx` | Listing detail with offer modal and price chart |
| `/my-items` | `MyItemsPage.jsx` | Seller's active and past listings |
| `/market-prices` | `MarketPricesPage.jsx` | Live mandi price dashboard by state and crop |
| `/government-schemes` | `GovernmentSchemesPage.jsx` | Full scheme directory with search and eligibility checker |

### Mobile Navigation (Bottom Bar)

Home | Browse | Sell | Prices | Schemes

---

## AI Chatbot — Kisan Mitra

Kisan Mitra is a persistent floating AI assistant powered by the Anthropic Claude API. It is designed specifically for Indian farmers and rural users.

### Capabilities

- Crop market prices and where to sell
- Government schemes and subsidies (PM-KISAN, PMFBY, KCC, MSP, etc.)
- Farming practices, pest control, and fertilizer guidance
- Weather-based crop recommendations
- How to use the Distress Sale App to list and sell crops quickly
- Urgency-based pricing strategy advice

### Configuration

The chatbot uses a custom system prompt that instructs the model to respond in the same language the user writes in, keep answers under 150 words, use bullet points for mobile readability, and provide realistic Indian market price ranges in INR.

### Quick Prompt Chips

The chat interface includes pre-built prompt chips for common queries:

- Today's crop prices
- Best crop for this season
- PM-KISAN scheme details
- Pest control tips
- How to list a crop for sale

---

## Crop Image Detection System

When a user types a crop or product name in the listing creation form, the app automatically detects the keyword and displays a matching preview image.

### Implementation

```js
// src/data/cropImageMap.js
export const cropImageMap = {
  potato:   "https://source.unsplash.com/400x300/?potato,farm",
  tomato:   "https://source.unsplash.com/400x300/?tomato,fresh",
  wheat:    "https://source.unsplash.com/400x300/?wheat,field",
  onion:    "https://source.unsplash.com/400x300/?onion,vegetable",
  rice:     "https://source.unsplash.com/400x300/?rice,paddy",
  // 100+ entries covering crops, vegetables, fruits,
  // spices, equipment, and household goods
};

// src/hooks/useImageDetection.js
export const useImageDetection = (inputText) => {
  const lower = inputText.toLowerCase();
  const match = Object.keys(cropImageMap).find(key => lower.includes(key));
  return match
    ? cropImageMap[match]
    : "https://source.unsplash.com/400x300/?marketplace,rural";
};
```

The mapping covers 50+ crop varieties including cereals, pulses, vegetables, fruits, spices, and oilseeds, plus 50+ non-crop categories including farm equipment, electronics, furniture, and household goods.

---

## Market Prices Module

### Features

- State and mandi selector with crop category filter chips
- Price cards showing min, modal, and max price per quintal
- 7-day price trend sparkline (Recharts)
- Price direction indicator (up, down, stable)
- MSP reference strip for government-notified crops
- Set Price Alert button for threshold-based notifications
- Share to WhatsApp button for price data
- Nearest APMC market card using browser geolocation
- Direct CTA to list a crop for distress sale from each price card

### Supported Categories

Cereals, Pulses, Vegetables, Fruits, Spices, Oilseeds

---

## Government Schemes Module

### Included Schemes

**Central Government**

| Scheme | Benefit |
|---|---|
| PM-KISAN Samman Nidhi | INR 6,000 per year in 3 installments |
| PM Fasal Bima Yojana | Crop insurance against natural disasters |
| Kisan Credit Card | Revolving credit up to INR 3 lakh at 4% interest |
| PM Kisan Maan Dhan | INR 3,000 per month pension after age 60 |
| Soil Health Card Scheme | Free soil testing and crop recommendation |
| PM Krishi Sinchayee Yojana | Up to 55% subsidy on drip/sprinkler irrigation |
| e-NAM | Online crop selling across 1,000+ mandis |
| Paramparagat Krishi Vikas | INR 50,000 per hectare for organic farming |
| Agriculture Infrastructure Fund | Loans up to INR 2 crore at 3% interest subsidy |
| National Food Security Mission | Free seeds, fertilizers, and training |

**State-Specific Schemes**

State schemes are displayed dynamically based on the user's detected or selected state. Currently included: Maharashtra, Punjab, Uttar Pradesh, Madhya Pradesh, Rajasthan, Karnataka, Andhra Pradesh, and Telangana.

### Eligibility Checker

A built-in widget accepts the user's state, farm size, crop type, and annual income, then returns a filtered list of schemes the user qualifies for.

### Scheme Detail View

Each scheme page includes a full description, step-by-step application process, required documents checklist, official website link, helpline number, and a pre-filled Kisan Mitra chat button.

---

## Responsive Design

The application is built mobile-first with the following breakpoints:

| Breakpoint | Width |
|---|---|
| Mobile S | 320px |
| Mobile L | 480px |
| Tablet | 768px |
| Desktop | 1024px |
| Wide | 1440px |

### Mobile-Specific UX

- Bottom navigation bar with 5 tabs
- Floating Sell Now action button on all pages
- Swipeable listing cards
- Pull-to-refresh on the listing feed
- Full-screen chatbot panel
- Sticky filter bar on scroll

---

## Performance Targets

| Metric | Target |
|---|---|
| Page load time | Under 2 seconds |
| Time to interactive | Under 3 seconds |
| Uptime | 99% |
| Listing creation time | Under 60 seconds |
| Image lazy loading | Blur placeholder on all images |

The app ships as a Progressive Web App (PWA) with a service worker enabling offline browsing of cached listings.

---

## Roadmap

**Phase 1 — Current**
- Core listing and browsing flow
- Urgency-based feed ranking
- Location-based matching
- In-app chat

**Phase 2 — In Progress**
- Escrow payment system
- Payment gateway integration
- Secure transaction flow

**Phase 3 — Planned**
- AI-based price optimization
- Auction-style bidding
- Delivery and logistics integration
- Premium listing boosts
- Expanded multilingual support
- Android and iOS native apps via React Native

---

## Contributing

Contributions are welcome. Please follow the steps below:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a pull request against the `main` branch

Please follow the existing code style and include tests for any new functionality. For major changes, open an issue first to discuss the proposal.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Built for the hackathon with a focus on speed, locality, and farmer accessibility.

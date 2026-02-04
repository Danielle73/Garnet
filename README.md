# Garnet - Privacy-First Period Tracker

> Track your cycle privately. 

## Ideation
Due to commercial period tracking apps that have been caught selling menstrual health data to advertisers, monitoring your health has felt more like a *commodity* rather than an a *insight* into your health. With increasing concerns about health 
data privacy, especially post-Roe v. Wade, many people need a period tracker 
they can trust.

## The Solution
Garnet is a completely client-side period tracker. All data is stored locally 
in your browser using localStorage - no servers, no accounts, no third-party 
access. Your health data never leaves your device.

## Features
- 📅 Interactive calendar for cycle logging
- 📊 Visual history of past cycles
- 🔒 Complete privacy - all data stored locally
- 📱 Responsive design for mobile and desktop
- ⚡ Fast and lightweight (no backend needed)

## Tech Stack
- **React 18** - Component-based UI
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Responsive styling
- **shadcn/ui** - Accessible component library
- **React Router** - Multi-page navigation
- **localStorage** - Client-side data persistence

## Technical Highlights
- Implemented date-range state management for period logging
- Built reusable calendar component with date highlighting
- Designed multi-screen flow (Home → Tracker → History)
- Optimized component architecture to avoid prop-drilling
- Used TypeScript for type-safe data structures

## Privacy Architecture
User Device (Browser)

├── React App (UI)

├── localStorage (Data)

└── No external communication


## Future Enhancements
- Cycle prediction using local ML models
- Export data as encrypted JSON
- Symptom tracking (mood, pain levels)
- Optional encrypted cloud backup (user-controlled)
- Progressive Web App (installable, offline-capable)

## Installation
```bash
git clone https://github.com/Danielle73/Garnet
cd Garnet
npm install
npm run dev
```

## What I Learned
- How to architect stateful applications without a backend
- Managing complex date-based state in React
- Building privacy-conscious applications
- Creating intuitive UX for sensitive personal data
- TypeScript patterns for type-safe data structures

---

Built with privacy and ethics in mind
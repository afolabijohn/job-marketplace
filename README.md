# Job Marketplace

A modern React application for exploring jobs, tracking applications, and managing a simple candidate profile. Built with Create React App, React Router, framer-motion animations, and a small set of reusable UI components.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Development Notes](#development-notes)
- [UI Components](#ui-components)
- [Data & Mocking](#data--mocking)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Demo
- Local development: `http://localhost:3000`

## Features
- Routing with React Router
- Pages: Home, Jobs (with filters and search), Dashboard, Login, Register, Profile
- Jobs filtering UI with basic inputs, select, accordion controls
- Reusable UI components (Button, Card, Input, Badge, etc.)
- Iconography via `lucide-react`
- Animations via `framer-motion`
- Mock data baked in for Jobs and Dashboard to run without a backend

## Tech Stack
- React 19
- Create React App (react-scripts)
- React Router
- framer-motion
- lucide-react
- date-fns (formatting utilities where needed)

## Project Structure
```
job-marketplace/
├── public/
├── src/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── utils/
│   │   └── index.js                 # helpers (e.g., createPageUrl)
│   ├── Pages/                       # top-level pages
│   │   ├── Home.js
│   │   ├── Jobs.js                  # uses mock data; search + filters
│   │   ├── Dashboard.js             # uses mock data; shows stats & recs
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Profile.js
│   ├── Jobs/                        # jobs UI modules
│   │   ├── Jobscard.js              # job card component
│   │   └── JobsFilter.js            # filters panel
│   └── components/
│       ├── dashboard/
│       │   ├── ApplicationTracker.js
│       │   ├── CareerProgress.js
│       │   ├── ProfilePrompt.js
│       │   └── StatCard.js
│       └── ui/                      # small, reusable UI primitives
│           ├── accordion.jsx
│           ├── badge.jsx
│           ├── button.jsx
│           ├── card.jsx
│           ├── input.jsx
│           ├── label.jsx
│           ├── progress.jsx
│           ├── select.jsx
│           ├── tabs.jsx
│           └── textarea.jsx
├── package.json
└── README.md
```

## Routes
Defined in `src/App.js`:
- `/` → `Home`
- `/login` → `Login`
- `/register` → `Register`
- `/dashboard` → `Dashboard`
- `/job/:id` → currently wired to `JobsFilter` (can be replaced by a dedicated JobDetail page)
- `/apply/:id` → currently wired to `Jobscard` (can be replaced by a dedicated JobApplication page)

You can easily replace those two with more specific pages once implemented.

## Getting Started

### Prerequisites
- Node.js 18+ recommended
- npm 8+ (or yarn/pnpm if preferred)

### Installation
```bash
# From the project root
npm install
```

### Available Scripts
- `npm start` — Runs the app in development mode at `http://localhost:3000`
- `npm run build` — Builds the app for production into the `build` folder
- `npm test` — Runs tests (if/when added)

## Development Notes
- This project uses standard relative imports. There is no `@/` path alias configured. If you see `@/` anywhere, change it to the correct relative path (e.g., `../components/ui/button`).
- The filesystem is case-sensitive on many environments. Keep directory names consistent, e.g., `Pages/` vs `pages/`.
- Components are exported either as `default` or named exports depending on file—match imports accordingly.
- Some UI components are intentionally lightweight and focus on classNames for styling (e.g., `Select`, `Tabs`, `Accordion`) to keep the app backend-agnostic and framework-neutral.

## UI Components
Reusable primitives located in `src/components/ui/`:
- `button.jsx`: Standard Button with variants (`default`, `outline`, `secondary`, `ghost`, `link`) and sizes
- `input.jsx`: Styled input
- `textarea.jsx`: Styled textarea
- `card.jsx`: Card, CardHeader, CardTitle, CardContent
- `badge.jsx`: Tag-like status indicators
- `label.jsx`: Form labels
- `select.jsx`: Simple select set (Select, SelectItem, etc.)
- `accordion.jsx`: Basic accordion set
- `tabs.jsx`: Simple tabs implementation
- `progress.jsx`: Progress bar

Dashboard helpers in `src/components/dashboard/`:
- `StatCard.js`, `ApplicationTracker.js`, `RecommendedJobs.js`, `CareerProgress.js`, `ProfilePrompt.js`

## Data & Mocking
- `Jobs.js` and `Dashboard.js` currently use mock data to display lists, stats, and recommendations. Replace these with API calls when your backend is ready.


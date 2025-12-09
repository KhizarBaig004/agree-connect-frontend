# Agree Connect Frontend

A modern Next.js application built with TypeScript and Tailwind CSS.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   └── features/         # Feature-specific components
├── lib/                   # Utility libraries
│   ├── api/              # API client configuration
│   └── utils.ts          # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── constants/             # Application constants
├── config/                # Configuration files
├── services/              # Business logic services
├── store/                 # State management
└── styles/                # Additional stylesheets
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

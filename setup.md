# BeautyRoute MVP - Setup Plan

## Project Overview
**BeautyRoute** is a beauty procedure scheduling app that helps users solve their beauty problems within their budget. Users describe their beauty concern and budget, and the app generates a personalized schedule of procedures from available salons.

---

## Tech Stack

| Technology | Choice | Reason |
|------------|--------|--------|
| Framework | Next.js 15 (App Router) | Latest version, server components, great DX |
| Language | TypeScript | Type safety, better IDE support |
| Styling | Tailwind CSS | Comes with shadcn, utility-first |
| UI Components | shadcn/ui | Beautiful, accessible, customizable |
| Package Manager | Yarn | User preference |
| Data Storage | JSON files | Simple MVP, easy to swap later |

---

## Architecture Decisions

### Data Layer (Repository Pattern)
To make switching from JSON to a real database seamless later:

```
/lib
  /repositories
    /procedures.ts    → getProcedures(), getProcedureById(), etc.
    /salons.ts        → getSalons(), getSalonById(), etc.
  /data
    /procedures.json  → Mock procedure data
    /salons.json      → Mock salon data
```

The repository functions abstract data access. When you switch to a database, you only change the implementation inside these files—no changes needed in components or pages.

### Folder Structure

```
beautyroute-mvp/
├── app/
│   ├── layout.tsx           # Root layout with fonts, metadata
│   ├── page.tsx             # Home: problem input form
│   ├── schedule/
│   │   └── page.tsx         # Generated schedule view
│   ├── procedures/
│   │   └── page.tsx         # Browse all procedures
│   ├── salons/
│   │   └── page.tsx         # Browse all salons
│   └── globals.css          # Global styles + Tailwind
├── components/
│   ├── ui/                  # shadcn components (Button, Card, Input, etc.)
│   ├── problem-form.tsx     # User input form
│   ├── schedule-card.tsx    # Single schedule item
│   ├── procedure-card.tsx   # Procedure display
│   └── salon-card.tsx       # Salon display
├── lib/
│   ├── data/
│   │   ├── procedures.json  # Procedure mock data
│   │   └── salons.json      # Salon mock data
│   ├── repositories/
│   │   ├── procedures.ts    # Procedure data access
│   │   └── salons.ts        # Salon data access
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   └── utils.ts             # Helper functions (cn, etc.)
├── public/                  # Static assets
├── setup.md                 # This file
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Data Models

### Procedure
```typescript
interface Procedure {
  id: string;
  name: string;
  description: string;
  category: 'skin' | 'hair' | 'nails' | 'body' | 'face';
  duration: number;          // in minutes
  priceMin: number;
  priceMax: number;
  solves: string[];          // beauty problems this addresses
  frequency: string;         // e.g., "once", "weekly", "monthly"
}
```

### Salon
```typescript
interface Salon {
  id: string;
  name: string;
  address: string;
  rating: number;
  procedures: {
    procedureId: string;
    price: number;
  }[];
}
```

### UserRequest (input)
```typescript
interface UserRequest {
  problem: string;           // e.g., "acne", "dry skin", "hair loss"
  budget: number;
  timeframe?: string;        // e.g., "1 month", "3 months"
}
```

### ScheduleItem (output)
```typescript
interface ScheduleItem {
  procedure: Procedure;
  salon: Salon;
  price: number;
  suggestedDate: string;
  order: number;
}
```

---

## MVP Features

### Page 1: Home (`/`)
- Hero section explaining the app
- Form with:
  - Beauty problem dropdown/input
  - Budget input (slider or number)
  - "Generate Schedule" button
- Redirects to `/schedule` with results

### Page 2: Schedule (`/schedule`)
- Displays generated procedure schedule
- Shows total cost vs budget
- Timeline view of when to do each procedure
- Links to individual salon pages

### Page 3: Procedures (`/procedures`)
- Browse all available procedures
- Filter by category
- See price ranges

### Page 4: Salons (`/salons`)
- Browse all partner salons
- See their offered procedures and prices

---

## Implementation Steps

1. **Initialize Next.js project** with TypeScript
2. **Install and configure shadcn/ui**
3. **Set up folder structure** as described above
4. **Create TypeScript types** for all data models
5. **Add mock JSON data** for procedures and salons
6. **Build repository layer** for data access
7. **Create UI components** using shadcn
8. **Build pages** (Home → Schedule → Procedures → Salons)
9. **Add simple scheduling algorithm** to match problems to procedures

---

## Future Enhancements (Post-MVP)
- [ ] Switch JSON to PostgreSQL/SQLite with Drizzle ORM
- [ ] Add user authentication
- [ ] Booking integration with salons
- [ ] User profiles and history
- [ ] Reviews and ratings
- [ ] AI-powered recommendations

---

## Commands to Run

```bash
# After setup, start development server
yarn dev

# Build for production
yarn build

# Run production build
yarn start
```

---

## ✅ Implementation Complete!

The MVP has been built with the following structure:

### Files Created

**Types & Data Layer:**
- `lib/types/index.ts` - All TypeScript interfaces and constants
- `lib/data/procedures.json` - 20 beauty procedures
- `lib/data/salons.json` - 8 partner salons
- `lib/repositories/procedures.ts` - Procedure data access
- `lib/repositories/salons.ts` - Salon data access
- `lib/repositories/scheduler.ts` - Schedule generation algorithm

**Components:**
- `components/problem-form.tsx` - User input form (problem, budget, timeframe)
- `components/schedule-card.tsx` - Schedule item display
- `components/procedure-card.tsx` - Procedure card
- `components/salon-card.tsx` - Salon card

**Pages:**
- `app/page.tsx` - Home with hero and form
- `app/schedule/page.tsx` - Generated schedule view
- `app/procedures/page.tsx` - Browse all procedures
- `app/salons/page.tsx` - Browse all salons

### Design
- Warm, sophisticated color palette (rose gold primary, sage secondary)
- DM Sans for body text, Playfair Display for headings
- Responsive design with beautiful hover states
- Custom gradient backgrounds and animations


// Beauty problem categories
export type Category = 'skin' | 'hair' | 'nails' | 'body' | 'face';

// Common beauty problems that procedures can solve
export type BeautyProblem =
  | 'acne'
  | 'wrinkles'
  | 'dry_skin'
  | 'oily_skin'
  | 'pigmentation'
  | 'hair_loss'
  | 'damaged_hair'
  | 'brittle_nails'
  | 'cellulite'
  | 'dull_skin'
  | 'dark_circles'
  | 'puffiness'
  | 'uneven_tone'
  | 'aging';

// Procedure frequency
export type Frequency = 'once' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly';

// Procedure - a beauty treatment type
export interface Procedure {
  id: string;
  name: string;
  description: string;
  category: Category;
  duration: number; // in minutes
  priceMin: number;
  priceMax: number;
  solves: BeautyProblem[]; // what beauty problems this addresses
  frequency: Frequency;
  imageUrl?: string;
}

// Salon's offering of a specific procedure
export interface SalonProcedure {
  procedureId: string;
  price: number;
  availableDays: string[]; // e.g., ['monday', 'wednesday', 'friday']
}

// Salon - a beauty establishment
export interface Salon {
  id: string;
  name: string;
  address: string;
  rating: number; // 1-5
  imageUrl?: string;
  phone?: string;
  procedures: SalonProcedure[];
}

// User's input request
export interface UserRequest {
  problem: BeautyProblem;
  budget: number;
  timeframe: number; // in months
}

// A single item in the generated schedule
export interface ScheduleItem {
  procedure: Procedure;
  salon: Salon;
  price: number;
  suggestedDate: string;
  order: number;
  notes?: string;
}

// The complete schedule response
export interface Schedule {
  items: ScheduleItem[];
  totalCost: number;
  budget: number;
  problem: BeautyProblem;
  timeframe: number;
}

// Helper type for the problem selector
export interface ProblemOption {
  value: BeautyProblem;
  label: string;
  category: Category;
  description: string;
}

// Problem options for the UI
export const PROBLEM_OPTIONS: ProblemOption[] = [
  { value: 'acne', label: 'Acne & Breakouts', category: 'skin', description: 'Pimples, blackheads, and inflammation' },
  { value: 'wrinkles', label: 'Wrinkles & Fine Lines', category: 'face', description: 'Signs of aging around eyes and forehead' },
  { value: 'dry_skin', label: 'Dry Skin', category: 'skin', description: 'Flaky, tight, or dehydrated skin' },
  { value: 'oily_skin', label: 'Oily Skin', category: 'skin', description: 'Excess sebum and shine' },
  { value: 'pigmentation', label: 'Pigmentation', category: 'skin', description: 'Dark spots, melasma, sun damage' },
  { value: 'hair_loss', label: 'Hair Loss', category: 'hair', description: 'Thinning hair or bald patches' },
  { value: 'damaged_hair', label: 'Damaged Hair', category: 'hair', description: 'Dry, brittle, or split ends' },
  { value: 'brittle_nails', label: 'Brittle Nails', category: 'nails', description: 'Weak, peeling, or breaking nails' },
  { value: 'cellulite', label: 'Cellulite', category: 'body', description: 'Dimpled skin on thighs and buttocks' },
  { value: 'dull_skin', label: 'Dull Skin', category: 'skin', description: 'Lack of radiance and glow' },
  { value: 'dark_circles', label: 'Dark Circles', category: 'face', description: 'Under-eye darkness and discoloration' },
  { value: 'puffiness', label: 'Puffiness', category: 'face', description: 'Swelling around eyes or face' },
  { value: 'uneven_tone', label: 'Uneven Skin Tone', category: 'skin', description: 'Blotchy or patchy complexion' },
  { value: 'aging', label: 'General Aging', category: 'face', description: 'Loss of elasticity and volume' },
];

// Category labels for display
export const CATEGORY_LABELS: Record<Category, string> = {
  skin: 'Skin Care',
  hair: 'Hair Care',
  nails: 'Nail Care',
  body: 'Body Care',
  face: 'Face Care',
};

// Frequency labels for display
export const FREQUENCY_LABELS: Record<Frequency, string> = {
  once: 'One-time',
  weekly: 'Weekly',
  biweekly: 'Every 2 weeks',
  monthly: 'Monthly',
  quarterly: 'Every 3 months',
};


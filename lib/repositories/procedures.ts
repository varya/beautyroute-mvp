import { Procedure, Category, BeautyProblem } from '@/lib/types';
import proceduresData from '@/lib/data/procedures.json';

// Cast the JSON data to our Procedure type
const procedures: Procedure[] = proceduresData as Procedure[];

/**
 * Get all procedures
 */
export async function getProcedures(): Promise<Procedure[]> {
  // Simulate async behavior for future DB compatibility
  return procedures;
}

/**
 * Get a procedure by ID
 */
export async function getProcedureById(id: string): Promise<Procedure | undefined> {
  return procedures.find((p) => p.id === id);
}

/**
 * Get procedures by category
 */
export async function getProceduresByCategory(category: Category): Promise<Procedure[]> {
  return procedures.filter((p) => p.category === category);
}

/**
 * Get procedures that solve a specific beauty problem
 */
export async function getProceduresForProblem(problem: BeautyProblem): Promise<Procedure[]> {
  return procedures.filter((p) => p.solves.includes(problem));
}

/**
 * Get procedures within a price range
 */
export async function getProceduresInPriceRange(
  minPrice: number,
  maxPrice: number
): Promise<Procedure[]> {
  return procedures.filter((p) => p.priceMin <= maxPrice && p.priceMax >= minPrice);
}

/**
 * Search procedures by name or description
 */
export async function searchProcedures(query: string): Promise<Procedure[]> {
  const lowerQuery = query.toLowerCase();
  return procedures.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  );
}


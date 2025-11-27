import { Salon } from '@/lib/types';
import salonsData from '@/lib/data/salons.json';

// Cast the JSON data to our Salon type
const salons: Salon[] = salonsData as Salon[];

/**
 * Get all salons
 */
export async function getSalons(): Promise<Salon[]> {
  // Simulate async behavior for future DB compatibility
  return salons;
}

/**
 * Get a salon by ID
 */
export async function getSalonById(id: string): Promise<Salon | undefined> {
  return salons.find((s) => s.id === id);
}

/**
 * Get salons that offer a specific procedure
 */
export async function getSalonsForProcedure(procedureId: string): Promise<Salon[]> {
  return salons.filter((s) => s.procedures.some((p) => p.procedureId === procedureId));
}

/**
 * Get salons sorted by rating (highest first)
 */
export async function getSalonsByRating(): Promise<Salon[]> {
  return [...salons].sort((a, b) => b.rating - a.rating);
}

/**
 * Get the price of a procedure at a specific salon
 */
export async function getProcedurePriceAtSalon(
  salonId: string,
  procedureId: string
): Promise<number | undefined> {
  const salon = salons.find((s) => s.id === salonId);
  if (!salon) return undefined;

  const procedure = salon.procedures.find((p) => p.procedureId === procedureId);
  return procedure?.price;
}

/**
 * Search salons by name or address
 */
export async function searchSalons(query: string): Promise<Salon[]> {
  const lowerQuery = query.toLowerCase();
  return salons.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.address.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get the cheapest salon for a specific procedure
 */
export async function getCheapestSalonForProcedure(
  procedureId: string
): Promise<{ salon: Salon; price: number } | undefined> {
  const salonsWithProcedure = salons
    .filter((s) => s.procedures.some((p) => p.procedureId === procedureId))
    .map((salon) => {
      const proc = salon.procedures.find((p) => p.procedureId === procedureId)!;
      return { salon, price: proc.price };
    })
    .sort((a, b) => a.price - b.price);

  return salonsWithProcedure[0];
}


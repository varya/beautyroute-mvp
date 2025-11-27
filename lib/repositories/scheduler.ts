import { BeautyProblem, Schedule, ScheduleItem, Procedure, Salon, Frequency } from '@/lib/types';
import { getProceduresForProblem } from './procedures';
import { getSalons, getCheapestSalonForProcedure } from './salons';

// How many times each frequency occurs in a month
const FREQUENCY_MULTIPLIER: Record<Frequency, number> = {
  once: 1,
  weekly: 4,
  biweekly: 2,
  monthly: 1,
  quarterly: 0.33,
};

interface ProcedureWithSalon {
  procedure: Procedure;
  salon: Salon;
  price: number;
  totalCostForTimeframe: number;
}

/**
 * Generate a beauty schedule based on user's problem and budget
 */
export async function generateSchedule(
  problem: BeautyProblem,
  budget: number,
  timeframeMonths: number = 3
): Promise<Schedule> {
  // 1. Get all procedures that solve the given problem
  const procedures = await getProceduresForProblem(problem);

  if (procedures.length === 0) {
    return {
      items: [],
      totalCost: 0,
      budget,
      problem,
      timeframe: timeframeMonths,
    };
  }

  // 2. For each procedure, find the cheapest salon offering it
  const proceduresWithSalons: ProcedureWithSalon[] = [];

  for (const procedure of procedures) {
    const result = await getCheapestSalonForProcedure(procedure.id);
    if (result) {
      // Calculate total cost for the timeframe based on frequency
      const sessionsNeeded = Math.ceil(
        FREQUENCY_MULTIPLIER[procedure.frequency] * timeframeMonths
      );
      const totalCostForTimeframe = result.price * sessionsNeeded;

      proceduresWithSalons.push({
        procedure,
        salon: result.salon,
        price: result.price,
        totalCostForTimeframe,
      });
    }
  }

  // 3. Sort by effectiveness (more problems solved) and then by cost
  proceduresWithSalons.sort((a, b) => {
    // Prioritize procedures that solve more problems
    const aEffectiveness = a.procedure.solves.length;
    const bEffectiveness = b.procedure.solves.length;
    if (bEffectiveness !== aEffectiveness) {
      return bEffectiveness - aEffectiveness;
    }
    // Then by cost (cheaper first)
    return a.totalCostForTimeframe - b.totalCostForTimeframe;
  });

  // 4. Select procedures that fit within budget using a greedy approach
  const selectedProcedures: ProcedureWithSalon[] = [];
  let remainingBudget = budget;

  for (const item of proceduresWithSalons) {
    if (item.totalCostForTimeframe <= remainingBudget) {
      selectedProcedures.push(item);
      remainingBudget -= item.totalCostForTimeframe;
    }
  }

  // 5. Generate schedule items with suggested dates
  const scheduleItems: ScheduleItem[] = [];
  const startDate = new Date();
  let order = 1;

  for (const item of selectedProcedures) {
    const sessionsNeeded = Math.ceil(
      FREQUENCY_MULTIPLIER[item.procedure.frequency] * timeframeMonths
    );

    // Calculate days between sessions based on frequency
    const daysBetweenSessions = getDaysBetweenSessions(item.procedure.frequency);

    for (let session = 0; session < sessionsNeeded; session++) {
      const suggestedDate = new Date(startDate);
      suggestedDate.setDate(startDate.getDate() + session * daysBetweenSessions);

      scheduleItems.push({
        procedure: item.procedure,
        salon: item.salon,
        price: item.price,
        suggestedDate: suggestedDate.toISOString().split('T')[0],
        order: order++,
        notes: session === 0 ? 'First session' : undefined,
      });
    }
  }

  // 6. Sort by date
  scheduleItems.sort(
    (a, b) => new Date(a.suggestedDate).getTime() - new Date(b.suggestedDate).getTime()
  );

  // Re-assign order after sorting
  scheduleItems.forEach((item, index) => {
    item.order = index + 1;
  });

  const totalCost = selectedProcedures.reduce(
    (sum, item) => sum + item.totalCostForTimeframe,
    0
  );

  return {
    items: scheduleItems,
    totalCost,
    budget,
    problem,
    timeframe: timeframeMonths,
  };
}

function getDaysBetweenSessions(frequency: Frequency): number {
  switch (frequency) {
    case 'weekly':
      return 7;
    case 'biweekly':
      return 14;
    case 'monthly':
      return 30;
    case 'quarterly':
      return 90;
    case 'once':
    default:
      return 0;
  }
}


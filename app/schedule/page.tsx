import { Suspense } from "react";
import Link from "next/link";
import { generateSchedule } from "@/lib/repositories/scheduler";
import { ScheduleCard } from "@/components/schedule-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BeautyProblem, PROBLEM_OPTIONS } from "@/lib/types";

interface SchedulePageProps {
  searchParams: Promise<{
    problem?: string;
    budget?: string;
    timeframe?: string;
  }>;
}

async function ScheduleContent({ searchParams }: SchedulePageProps) {
  const params = await searchParams;
  const problem = params.problem as BeautyProblem | undefined;
  const budget = params.budget ? parseInt(params.budget) : 500;
  const timeframe = params.timeframe ? parseInt(params.timeframe) : 3;

  if (!problem) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-semibold mb-2">No Problem Selected</h2>
        <p className="text-muted-foreground mb-6">
          Please go back and select a beauty concern to get your personalized schedule.
        </p>
        <Link href="/">
          <Button>
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Start Planning
          </Button>
        </Link>
      </div>
    );
  }

  const schedule = await generateSchedule(problem, budget, timeframe);
  const problemOption = PROBLEM_OPTIONS.find((p) => p.value === problem);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to planning
        </Link>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Your Beauty Route
        </h1>
        <p className="text-muted-foreground">
          Personalized treatment plan for{" "}
          <span className="font-medium text-foreground">
            {problemOption?.label || problem}
          </span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="gradient-card border-border/50">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Total Cost</div>
            <div className="text-3xl font-display font-bold text-primary">
              ${schedule.totalCost}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              of ${budget} budget
            </div>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: `${Math.min((schedule.totalCost / budget) * 100, 100)}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Appointments</div>
            <div className="text-3xl font-display font-bold text-primary">
              {schedule.items.length}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              over {timeframe} {timeframe === 1 ? "month" : "months"}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border/50">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Savings</div>
            <div className="text-3xl font-display font-bold text-green-600">
              ${budget - schedule.totalCost}
            </div>
            <div className="text-sm text-muted-foreground mt-1">remaining budget</div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule List */}
      {schedule.items.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold">Your Schedule</h2>
            <Badge variant="secondary" className="font-normal">
              {new Set(schedule.items.map((i) => i.procedure.id)).size} unique
              treatments
            </Badge>
          </div>
          {schedule.items.map((item, index) => (
            <ScheduleCard key={`${item.procedure.id}-${index}`} item={item} />
          ))}
        </div>
      ) : (
        <Card className="gradient-card border-border/50">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              No Treatments Found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find treatments for your selected concern within your
              budget. Try increasing your budget or selecting a different concern.
            </p>
            <Link href="/">
              <Button>Try Different Options</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {schedule.items.length > 0 && (
        <Card className="gradient-card border-border/50 mt-8">
          <CardContent className="pt-6">
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
              Tips for Best Results
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Book your appointments in advance to secure your preferred time slots.
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Follow pre and post-treatment care instructions provided by each salon.
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Maintain a consistent skincare routine between treatments for optimal results.
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SchedulePage(props: SchedulePageProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-8 w-48 bg-muted animate-shimmer rounded" />
              <div className="h-4 w-64 bg-muted animate-shimmer rounded" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-muted animate-shimmer rounded-xl" />
                ))}
              </div>
            </div>
          }
        >
          <ScheduleContent {...props} />
        </Suspense>
      </div>
    </div>
  );
}


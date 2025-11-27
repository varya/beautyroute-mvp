import { ScheduleItem, FREQUENCY_LABELS, CATEGORY_LABELS } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScheduleCardProps {
  item: ScheduleItem;
}

export function ScheduleCard({ item }: ScheduleCardProps) {
  const { procedure, salon, price, suggestedDate, order, notes } = item;

  const formattedDate = new Date(suggestedDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="group gradient-card border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="pt-6">
        <div className="flex gap-4">
          {/* Order number */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {order}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {procedure.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {procedure.description}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xl font-display font-bold text-primary">
                  ${price}
                </div>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge variant="secondary" className="font-normal">
                {CATEGORY_LABELS[procedure.category]}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {procedure.duration} min
              </Badge>
              <Badge variant="outline" className="font-normal">
                {FREQUENCY_LABELS[procedure.frequency]}
              </Badge>
            </div>

            {/* Salon info */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-secondary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{salon.name}</p>
                    <p className="text-xs text-muted-foreground">{salon.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <svg
                    className="w-4 h-4 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{salon.rating}</span>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="mt-4 flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <span className="text-muted-foreground">Suggested:</span>
              <span className="font-medium text-foreground">{formattedDate}</span>
              {notes && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {notes}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


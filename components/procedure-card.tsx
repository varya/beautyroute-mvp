import { Procedure, CATEGORY_LABELS, FREQUENCY_LABELS } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProcedureCardProps {
  procedure: Procedure;
}

export function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <Card className="group gradient-card border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Badge variant="secondary" className="mb-2 font-normal">
              {CATEGORY_LABELS[procedure.category]}
            </Badge>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {procedure.name}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="line-clamp-2">{procedure.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        {/* Price range */}
        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-1">Price range</div>
          <div className="text-2xl font-display font-bold text-primary">
            ${procedure.priceMin} - ${procedure.priceMax}
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-normal">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {procedure.duration} min
          </Badge>
          <Badge variant="outline" className="font-normal">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
              />
            </svg>
            {FREQUENCY_LABELS[procedure.frequency]}
          </Badge>
        </div>

        {/* Problems it solves */}
        {procedure.solves.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground mb-2">Helps with:</div>
            <div className="flex flex-wrap gap-1">
              {procedure.solves.slice(0, 4).map((problem) => (
                <Badge
                  key={problem}
                  variant="secondary"
                  className="text-xs font-normal capitalize"
                >
                  {problem.replace("_", " ")}
                </Badge>
              ))}
              {procedure.solves.length > 4 && (
                <Badge variant="secondary" className="text-xs font-normal">
                  +{procedure.solves.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


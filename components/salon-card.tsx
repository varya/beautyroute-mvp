import { Salon, Procedure } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SalonCardProps {
  salon: Salon;
  procedures?: Procedure[];
}

export function SalonCard({ salon, procedures = [] }: SalonCardProps) {
  // Get procedure names for display
  const procedureNames = salon.procedures
    .map((sp) => {
      const proc = procedures.find((p) => p.id === sp.procedureId);
      return proc ? { name: proc.name, price: sp.price } : null;
    })
    .filter(Boolean) as { name: string; price: number }[];

  return (
    <Card className="group gradient-card border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center gap-2">
              {salon.name}
              <div className="flex items-center gap-1 text-sm font-normal">
                <svg
                  className="w-4 h-4 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{salon.rating}</span>
              </div>
            </CardTitle>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2">
          <svg
            className="w-4 h-4 flex-shrink-0"
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
          {salon.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Contact */}
        {salon.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
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
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            {salon.phone}
          </div>
        )}

        {/* Services offered */}
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground mb-2">
            Services ({procedureNames.length})
          </div>
          <div className="space-y-2">
            {procedureNames.slice(0, 4).map((proc, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{proc.name}</span>
                <span className="font-medium text-primary">${proc.price}</span>
              </div>
            ))}
            {procedureNames.length > 4 && (
              <div className="text-xs text-muted-foreground">
                +{procedureNames.length - 4} more services
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
          <Badge variant="secondary" className="font-normal">
            {salon.procedures.length} treatments
          </Badge>
          <span className="text-sm text-muted-foreground">
            From $
            {Math.min(...salon.procedures.map((p) => p.price))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}


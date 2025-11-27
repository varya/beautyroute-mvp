import { getSalonsByRating } from "@/lib/repositories/salons";
import { getProcedures } from "@/lib/repositories/procedures";
import { SalonCard } from "@/components/salon-card";

export default async function SalonsPage() {
  const [salons, procedures] = await Promise.all([
    getSalonsByRating(),
    getProcedures(),
  ]);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {salons.length} Partner Locations
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Partner Salons
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our curated selection of top-rated beauty salons. Each partner
            is vetted for quality, expertise, and customer satisfaction.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-secondary/30">
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-primary">
              {salons.length}
            </div>
            <div className="text-sm text-muted-foreground">Partner Salons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-primary">
              {(salons.reduce((sum, s) => sum + s.rating, 0) / salons.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-primary">
              {procedures.length}
            </div>
            <div className="text-sm text-muted-foreground">Treatments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-primary">
              $
              {Math.min(
                ...salons.flatMap((s) => s.procedures.map((p) => p.price))
              )}
            </div>
            <div className="text-sm text-muted-foreground">Starting From</div>
          </div>
        </div>

        {/* Salon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} procedures={procedures} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/30 border border-border/50">
          <h2 className="font-display text-2xl font-semibold mb-2">
            Ready to Start Your Beauty Journey?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Tell us your beauty concern and budget, and we'll create a personalized
            treatment plan from these amazing salons.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
            Plan My Beauty Route
          </a>
        </div>
      </div>
    </div>
  );
}


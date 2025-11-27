import { getProcedures } from "@/lib/repositories/procedures";
import { ProcedureCard } from "@/components/procedure-card";
import { CATEGORY_LABELS, Category } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default async function ProceduresPage() {
  const procedures = await getProcedures();

  // Group procedures by category
  const proceduresByCategory = procedures.reduce(
    (acc, proc) => {
      if (!acc[proc.category]) {
        acc[proc.category] = [];
      }
      acc[proc.category].push(proc);
      return acc;
    },
    {} as Record<Category, typeof procedures>
  );

  const categories = Object.keys(proceduresByCategory) as Category[];

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
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
            {procedures.length} Treatments Available
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Beauty Procedures
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our comprehensive catalog of beauty treatments. Each procedure is
            carefully selected and offered by our partner salons.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-border/50">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="inline-flex items-center gap-2"
            >
              <Badge
                variant="outline"
                className="font-normal hover:bg-secondary transition-colors cursor-pointer"
              >
                {CATEGORY_LABELS[category]}
                <span className="ml-1 text-muted-foreground">
                  ({proceduresByCategory[category].length})
                </span>
              </Badge>
            </a>
          ))}
        </div>

        {/* Procedures by Category */}
        <div className="space-y-16">
          {categories.map((category) => (
            <section key={category} id={category}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CategoryIcon category={category} />
                </div>
                <h2 className="font-display text-2xl font-semibold">
                  {CATEGORY_LABELS[category]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proceduresByCategory[category].map((procedure) => (
                  <ProcedureCard key={procedure.id} procedure={procedure} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryIcon({ category }: { category: Category }) {
  const iconClass = "w-5 h-5 text-primary";

  switch (category) {
    case "skin":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      );
    case "face":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      );
    case "hair":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      );
    case "nails":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15" />
        </svg>
      );
    case "body":
      return (
        <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      );
    default:
      return null;
  }
}


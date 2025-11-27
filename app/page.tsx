import { ProblemForm } from "@/components/problem-form";

export default function Home() {
  return (
    <div className="gradient-hero min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            Your Personalized Beauty Journey
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            Find Your Perfect
            <span className="text-primary block mt-2">Beauty Route</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us your beauty concern and budget. We'll create a personalized treatment 
            schedule from the best local salons—tailored just for you.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-xl mx-auto">
          <ProblemForm />
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Personalized Analysis</h3>
            <p className="text-muted-foreground text-sm">
              We match your specific beauty concerns with the most effective treatments.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Budget-Friendly</h3>
            <p className="text-muted-foreground text-sm">
              Get the best results within your budget—no surprises, no hidden costs.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-muted-foreground text-sm">
              We plan your treatment timeline for optimal results over your chosen period.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-12 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground mt-1">Procedures</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground mt-1">Partner Salons</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">14</div>
              <div className="text-sm text-muted-foreground mt-1">Beauty Concerns</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Personalized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

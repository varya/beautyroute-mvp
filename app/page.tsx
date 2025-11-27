import { ProblemForm } from "@/components/problem-form";
import { RotatingText } from "@/components/rotating-text";

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
            Steps to solve your beauty challenges
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            Get the Best Beauty Results
            <span className="text-primary block mt-2">
              <RotatingText />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have acne, wrinkles, or dry skin? Stop wasting money on random treatments. 
            We create a personalized beauty schedule that will solve your problem.
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Strategic Sequencing</h3>
            <p className="text-muted-foreground text-sm">
              We order treatments so each session prepares your skin for the next—multiplying results.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Budget-Optimized</h3>
            <p className="text-muted-foreground text-sm">
              Get maximum impact within your budget—we pick treatments that deliver the best value.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Timed for Results</h3>
            <p className="text-muted-foreground text-sm">
              Proper spacing between treatments lets your skin heal and respond—boosting effectiveness.
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

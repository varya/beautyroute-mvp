"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PROBLEM_OPTIONS, CATEGORY_LABELS, BeautyProblem, Category } from "@/lib/types";

export function ProblemForm() {
  const router = useRouter();
  const [problem, setProblem] = useState<BeautyProblem | "">("");
  const [budget, setBudget] = useState([1500]);
  const [timeframe, setTimeframe] = useState([3]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem) return;

    const params = new URLSearchParams({
      problem,
      budget: budget[0].toString(),
      timeframe: timeframe[0].toString(),
    });

    router.push(`/schedule?${params.toString()}`);
  };

  // Group problems by category
  const problemsByCategory = PROBLEM_OPTIONS.reduce(
    (acc, option) => {
      if (!acc[option.category]) {
        acc[option.category] = [];
      }
      acc[option.category].push(option);
      return acc;
    },
    {} as Record<Category, typeof PROBLEM_OPTIONS>
  );

  return (
    <Card className="gradient-card border-border/50 shadow-xl">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Problem Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              What beauty concern would you like to address?
            </label>
            <Select value={problem} onValueChange={(v) => setProblem(v as BeautyProblem)}>
              <SelectTrigger className="h-12 text-base bg-background/50">
                <SelectValue placeholder="Select your concern..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(problemsByCategory).map(([category, options]) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {CATEGORY_LABELS[category as Category]}
                    </div>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex flex-col">
                          <span>{option.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                What's your budget?
              </label>
              <span className="text-2xl font-display font-semibold text-primary">
                ${budget[0]}
              </span>
            </div>
            <Slider
              value={budget}
              onValueChange={setBudget}
              min={100}
              max={3000}
              step={50}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$100</span>
              <span>$3,000</span>
            </div>
          </div>

          {/* Timeframe Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                Treatment timeframe
              </label>
              <span className="text-2xl font-display font-semibold text-primary">
                {timeframe[0]} {timeframe[0] === 1 ? "month" : "months"}
              </span>
            </div>
            <Slider
              value={timeframe}
              onValueChange={setTimeframe}
              min={1}
              max={6}
              step={1}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 month</span>
              <span>6 months</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!problem}
            className="w-full h-14 text-lg font-medium rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Generate My Beauty Route
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


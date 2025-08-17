import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export const StepIndicator = ({ steps, currentStep, completedSteps, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-primary/70">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-primary/80 mt-2">
          {steps[currentStep - 1]?.title}
        </p>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <div className="relative">
            {/* Background connector line */}
            <div className="absolute top-4 left-4 right-4 h-1 bg-white/20 rounded-full" />
            
            {/* Active connector line */}
            <div 
              className="absolute top-4 left-4 h-1 bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.max(0, (Math.min(currentStep - 1, steps.length - 1)) * (100 / (steps.length - 1)))}%` 
              }}
            />
            
            <ol className="relative flex items-center justify-between">
              {steps.map((step) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                const isClickable = isCompleted || step.id < currentStep;
                
                return (
                  <li 
                    key={step.id} 
                    className="relative flex flex-col items-center"
                  >
                    {/* Step Button */}
                    <button
                      onClick={() => isClickable && onStepClick(step.id)}
                      disabled={!isClickable}
                      className={cn(
                        "relative flex flex-col items-center group",
                        isClickable && "cursor-pointer hover:opacity-80",
                        !isClickable && "cursor-not-allowed opacity-60"
                      )}
                    >
                      {/* Circle */}
                      <span
                        className={cn(
                          "relative z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 mb-3",
                          isCompleted && "bg-primary text-primary-foreground shadow-lg",
                          isCurrent && !isCompleted && "bg-primary/30 border-2 border-primary text-primary shadow-md",
                          !isCompleted && !isCurrent && "bg-white/20 border-2 border-white/30 text-white/80"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </span>
                      
                      {/* Step Content */}
                      <div className="text-center max-w-24">
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors duration-300 block",
                            "text-primary",
                            !isClickable && "text-primary/60"
                          )}
                        >
                          {step.title}
                        </span>
                        <span
                          className={cn(
                            "text-xs transition-colors duration-300 block mt-1",
                            "text-primary/80",
                            !isClickable && "text-primary/40"
                          )}
                        >
                          {step.description}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </nav>
      </div>
    </div>
  );
};
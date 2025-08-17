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
          <span className="text-sm font-medium text-white">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-white/70">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-white/80 mt-2">
          {steps[currentStep - 1]?.title}
        </p>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const isClickable = isCompleted || step.id < currentStep;
              
              return (
                <li 
                  key={step.id} 
                  className={cn(
                    "relative flex-1",
                    step.id !== steps.length && "pr-8 sm:pr-20"
                  )}
                >
                  {/* Connection Line */}
                  {step.id !== steps.length && (
                    <div 
                      className={cn(
                        "absolute top-4 left-4 -ml-px h-0.5 w-full transition-colors duration-300",
                        isCompleted || currentStep > step.id
                          ? "bg-primary"
                          : "bg-white/20"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  
                  {/* Step Button */}
                  <button
                    onClick={() => isClickable && onStepClick(step.id)}
                    disabled={!isClickable}
                    className={cn(
                      "relative flex items-start group",
                      isClickable && "cursor-pointer hover:opacity-80",
                      !isClickable && "cursor-not-allowed opacity-60"
                    )}
                  >
                    <span className="h-9 flex items-center">
                      <span
                        className={cn(
                          "relative z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300",
                          isCompleted && "bg-primary text-primary-foreground",
                          isCurrent && !isCompleted && "bg-primary/30 border-2 border-primary text-primary",
                          !isCompleted && !isCurrent && "bg-white/20 border-2 border-white/30 text-white/80"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </span>
                    </span>
                    <span className="ml-4 min-w-0 flex flex-col text-left">
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors duration-300",
                          "text-primary",
                          !isClickable && "text-primary/60"
                        )}
                      >
                        {step.title}
                      </span>
                      <span
                        className={cn(
                          "text-xs transition-colors duration-300",
                          "text-primary/80",
                          !isClickable && "text-primary/40"
                        )}
                      >
                        {step.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
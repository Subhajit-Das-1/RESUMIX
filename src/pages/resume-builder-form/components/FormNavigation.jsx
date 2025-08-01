import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSave,
  canProceed = true,
  isSaving = false,
  isNextLoading = false
}) => {
  const steps = [
    { number: 1, label: 'Personal Info', shortLabel: 'Personal' },
    { number: 2, label: 'Experience', shortLabel: 'Experience' },
    { number: 3, label: 'Education', shortLabel: 'Education' },
    { number: 4, label: 'Skills', shortLabel: 'Skills' },
    { number: 5, label: 'Summary', shortLabel: 'Summary' }
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {/* Desktop Steps */}
            <div className="hidden sm:flex items-center space-x-4">
              {steps?.map((step, index) => {
                const status = getStepStatus(step?.number);
                return (
                  <div key={step?.number} className="flex items-center">
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      status === 'completed'
                        ? 'text-success bg-success/10'
                        : status === 'current' ?'text-primary bg-primary/10' :'text-muted-foreground'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                        status === 'completed'
                          ? 'bg-success text-success-foreground'
                          : status === 'current' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                      }`}>
                        {status === 'completed' ? (
                          <Icon name="Check" size={12} />
                        ) : (
                          step?.number
                        )}
                      </div>
                      <span className="hidden md:inline">{step?.label}</span>
                      <span className="md:hidden">{step?.shortLabel}</span>
                    </div>
                    {index < steps?.length - 1 && (
                      <div className="w-8 h-px bg-border mx-2" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Steps */}
            <div className="sm:hidden flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <div className="flex space-x-1">
                {Array.from({ length: totalSteps }, (_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Save"
              iconPosition="left"
              loading={isSaving}
              onClick={onSave}
              className="hidden sm:flex"
            >
              Save Draft
            </Button>

            <div className="flex items-center space-x-2">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  onClick={onPrevious}
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              )}

              {currentStep < totalSteps ? (
                <Button
                  variant="default"
                  size="sm"
                  iconName="ChevronRight"
                  iconPosition="right"
                  onClick={onNext}
                  disabled={!canProceed}
                  loading={isNextLoading}
                >
                  <span className="hidden sm:inline">Next Step</span>
                  <span className="sm:hidden">Next</span>
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={onNext}
                  disabled={!canProceed}
                  loading={isNextLoading}
                >
                  <span className="hidden sm:inline">Preview Resume</span>
                  <span className="sm:hidden">Preview</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;
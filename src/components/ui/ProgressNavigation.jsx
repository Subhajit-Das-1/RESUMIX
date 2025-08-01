import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const ProgressNavigation = ({ 
  currentStep = 1, 
  totalSteps = 3, 
  onSave, 
  onNext, 
  onPrevious,
  isSaving = false,
  canProceed = true,
  showSave = true 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { 
      number: 1, 
      label: 'Template', 
      path: '/template-selection',
      shortLabel: 'Template'
    },
    { 
      number: 2, 
      label: 'Build Resume', 
      path: '/resume-builder-form',
      shortLabel: 'Build'
    },
    { 
      number: 3, 
      label: 'Preview', 
      path: '/resume-preview',
      shortLabel: 'Preview'
    }
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (step) => {
    if (step?.number <= currentStep) {
      navigate(step?.path);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <div className="bg-card border-b border-border shadow-soft">
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
                    <button
                      onClick={() => handleStepClick(step)}
                      disabled={step?.number > currentStep}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        status === 'completed'
                          ? 'text-success bg-success/10 hover:bg-success/20 cursor-pointer'
                          : status === 'current' ?'text-primary bg-primary/10' :'text-muted-foreground cursor-not-allowed'
                      }`}
                    >
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
                    </button>
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
            {showSave && (
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                iconPosition="left"
                loading={isSaving}
                onClick={handleSave}
                className="hidden sm:flex"
              >
                Save Draft
              </Button>
            )}

            <div className="flex items-center space-x-2">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  onClick={handlePrevious}
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              )}

              {currentStep < totalSteps && (
                <Button
                  variant="default"
                  size="sm"
                  iconName="ChevronRight"
                  iconPosition="right"
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  <span className="hidden sm:inline">Next Step</span>
                  <span className="sm:hidden">Next</span>
                </Button>
              )}

              {currentStep === totalSteps && (
                <Button
                  variant="success"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleNext}
                >
                  <span className="hidden sm:inline">Download Resume</span>
                  <span className="sm:hidden">Download</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressNavigation;
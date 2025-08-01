import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import ResumePreview from './ResumePreview';

const MobilePreviewToggle = ({ formData, selectedTemplate, onTemplateChange }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <>
      {/* Floating Preview Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          variant="default"
          size="lg"
          iconName={isPreviewOpen ? "X" : "Eye"}
          onClick={togglePreview}
          className="rounded-full shadow-floating"
        >
          {isPreviewOpen ? "Close" : "Preview"}
        </Button>
      </div>

      {/* Mobile Preview Overlay */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 bg-card border-b border-border p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center space-x-2">
                  <Icon name="Eye" size={18} className="sm:w-5 sm:h-5" />
                  <span>Resume Preview</span>
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={togglePreview}
                >
                  Close
                </Button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-hidden">
              <ResumePreview
                formData={formData}
                selectedTemplate={selectedTemplate}
                onTemplateChange={onTemplateChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobilePreviewToggle;
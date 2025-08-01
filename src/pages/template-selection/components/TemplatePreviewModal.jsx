import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TemplatePreviewModal = ({ 
  template, 
  templates = [], 
  isOpen, 
  onClose, 
  onSelect,
  onNavigate 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (template && templates?.length > 0) {
      const index = templates?.findIndex(t => t?.id === template?.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  }, [template, templates]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e?.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !template) return null;

  const currentTemplate = templates?.[currentIndex] || template;

  const handlePrevious = () => {
    if (templates?.length > 1) {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : templates?.length - 1;
      setCurrentIndex(newIndex);
      if (onNavigate) onNavigate(templates?.[newIndex]);
    }
  };

  const handleNext = () => {
    if (templates?.length > 1) {
      const newIndex = currentIndex < templates?.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
      if (onNavigate) onNavigate(templates?.[newIndex]);
    }
  };

  const handleSelect = () => {
    onSelect(currentTemplate);
    onClose();
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-card rounded-lg shadow-floating overflow-hidden animate-morph">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">
              {currentTemplate?.name}
            </h2>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              currentTemplate?.category === 'Modern' ? 'bg-blue-100 text-blue-800' :
              currentTemplate?.category === 'Classic' ? 'bg-gray-100 text-gray-800' :
              currentTemplate?.category === 'Creative'? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
            }`}>
              {currentTemplate?.category}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Navigation Arrows */}
            {templates?.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevious}
                  aria-label="Previous template"
                >
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} of {templates?.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next template"
                >
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </>
            )}
            
            {/* Zoom Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleZoom}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={20} />
            </Button>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close preview"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-140px)]">
          {/* Preview Image */}
          <div className="flex-1 relative overflow-auto bg-muted">
            <div className={`transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
              <Image
                src={currentTemplate?.fullPreviewImage || currentTemplate?.previewImage}
                alt={`${currentTemplate?.name} full preview`}
                className="w-full h-auto object-contain cursor-pointer"
                onClick={toggleZoom}
              />
            </div>
          </div>

          {/* Template Details */}
          <div className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-border bg-card overflow-y-auto">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-medium text-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentTemplate?.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Key Features</h3>
                <div className="space-y-2">
                  {currentTemplate?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Best For</h3>
                <div className="flex flex-wrap gap-2">
                  {currentTemplate?.bestFor?.map((item, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* ATS Score */}
              <div>
                <h3 className="font-medium text-foreground mb-2">ATS Compatibility</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        currentTemplate?.atsScore >= 90 ? 'bg-success' :
                        currentTemplate?.atsScore >= 70 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${currentTemplate?.atsScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {currentTemplate?.atsScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Continue Browsing
            </Button>
          </div>
          
          <Button
            variant="default"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={handleSelect}
          >
            Continue with {currentTemplate?.name}
          </Button>
        </div>
      </div>
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close modal"
      />
    </div>
  );
};

export default TemplatePreviewModal;
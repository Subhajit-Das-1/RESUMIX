import React from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TemplateCard = ({ 
  template, 
  isSelected, 
  onSelect, 
  onPreview,
  className = '' 
}) => {
  const handleSelect = () => {
    onSelect(template);
  };

  const handlePreview = (e) => {
    e?.stopPropagation();
    onPreview(template);
  };

  return (
    <div 
      className={`group relative bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      } ${className}`}
      onClick={handleSelect}
    >
      {/* Template Preview Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={template?.previewImage}
          alt={`${template?.name} resume template preview`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center space-y-3">
            <Button
              variant="default"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={handlePreview}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Preview
            </Button>
            <div className="text-white text-sm space-y-1">
              {template?.features?.slice(0, 3)?.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2">
                  <Icon name="Check" size={14} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-fade-in">
            <Icon name="Check" size={14} color="white" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            template?.category === 'Modern' ? 'bg-blue-100 text-blue-800' :
            template?.category === 'Classic' ? 'bg-gray-100 text-gray-800' :
            template?.category === 'Creative'? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
          }`}>
            {template?.category}
          </span>
        </div>
      </div>
      {/* Template Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {template?.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {template?.description}
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-1">
          {template?.features?.slice(0, 2)?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Check" size={12} className="text-success" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          fullWidth
          iconName={isSelected ? "Check" : "ArrowRight"}
          iconPosition="left"
          onClick={handleSelect}
        >
          {isSelected ? 'Selected' : 'Select Template'}
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;
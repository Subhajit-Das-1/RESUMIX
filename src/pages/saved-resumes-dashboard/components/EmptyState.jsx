import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmptyState = ({ 
  hasSearchQuery = false, 
  searchQuery = '',
  onClearSearch 
}) => {
  const navigate = useNavigate();

  const handleCreateResume = () => {
    navigate('/template-selection');
  };

  const handleClearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
  };

  if (hasSearchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No resumes found
        </h3>
        
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          We couldn't find any resumes matching "{searchQuery}". Try adjusting your search terms or create a new resume.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            iconName="X"
            iconPosition="left"
            onClick={handleClearSearch}
          >
            Clear Search
          </Button>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={handleCreateResume}
          >
            Create New Resume
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Illustration */}
      <div className="w-64 h-48 mb-8 relative">
        <Image
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop&crop=center"
          alt="Create your first resume illustration"
          className="w-full h-full object-cover rounded-lg opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card/90 backdrop-blur-sm rounded-md p-3 shadow-soft">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Professional Resume</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Create Your First Resume
        </h2>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Get started with our professional resume builder. Choose from multiple templates and create a resume that stands out to employers.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Check" size={12} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">Professional Templates</h4>
              <p className="text-xs text-muted-foreground">ATS-friendly designs</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Check" size={12} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">Real-time Preview</h4>
              <p className="text-xs text-muted-foreground">See changes instantly</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Check" size={12} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">PDF Export</h4>
              <p className="text-xs text-muted-foreground">Download & print ready</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Check" size={12} className="text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">Auto Save</h4>
              <p className="text-xs text-muted-foreground">Never lose your work</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button
            variant="default"
            size="lg"
            iconName="Rocket"
            iconPosition="left"
            onClick={handleCreateResume}
            className="w-full sm:w-auto"
          >
            Create Your First Resume
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="Play"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Watch Demo
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground mt-6">
          Takes less than 10 minutes • No credit card required
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
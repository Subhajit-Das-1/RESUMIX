import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = () => {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    navigate('/template-selection');
  };

  const handleLoadSaved = () => {
    navigate('/saved-resumes-dashboard');
  };

  return (
    <div className="flex-1 bg-gray-100 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
          <Icon name="FileX" size={40} className="text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          No Resume to Preview
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          It looks like you haven't created a resume yet. Start building your professional resume now or load a previously saved one.
        </p>

        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            iconPosition="left"
            onClick={handleStartBuilding}
            fullWidth
          >
            Create New Resume
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="FolderOpen"
            iconPosition="left"
            onClick={handleLoadSaved}
            fullWidth
          >
            Load Saved Resume
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help getting started? Check out our templates and examples.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import PreviewActions from './PreviewActions';

const PreviewHeader = ({ 
  resumeTitle = "My Resume",
  onDownload,
  onPrint,
  isDownloading = false,
  isPrinting = false 
}) => {
  const navigate = useNavigate();

  const handleBackToBuilder = () => {
    navigate('/resume-builder-form');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link 
              to="/landing-page" 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <Icon name="Rocket" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-gray-900 hidden sm:inline">
                RESUMIX
              </span>
            </Link>

            {/* Breadcrumb Navigation */}
            <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <Link 
                to="/resume-builder-form" 
                className="hover:text-gray-700 transition-colors duration-200"
              >
                Builder
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span className="text-gray-900 font-medium">Preview</span>
            </nav>

            {/* Back Button (Mobile) */}
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleBackToBuilder}
              className="md:hidden"
            >
              Back
            </Button>
          </div>

          {/* Center Section - Resume Title */}
          <div className="flex items-center space-x-2 flex-1 justify-center md:justify-start md:ml-8">
            <Icon name="FileText" size={20} className="text-gray-400" />
            <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs md:max-w-md">
              {resumeTitle}
            </h1>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center">
            <PreviewActions
              onDownload={onDownload}
              onPrint={onPrint}
              isDownloading={isDownloading}
              isPrinting={isPrinting}
              resumeTitle={resumeTitle}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default PreviewHeader;
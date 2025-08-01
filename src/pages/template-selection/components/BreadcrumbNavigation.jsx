import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ currentStep = 'Templates' }) => {
  const breadcrumbs = [
    { label: 'Home', path: '/landing-page', icon: 'Home' },
    { label: 'Templates', path: '/template-selection', icon: 'Layout' }
  ];

  return (
    <nav className="bg-muted/30 border-b border-border" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs?.map((breadcrumb, index) => (
              <li key={breadcrumb?.path} className="flex items-center">
                {index > 0 && (
                  <Icon 
                    name="ChevronRight" 
                    size={14} 
                    className="text-muted-foreground mx-2" 
                  />
                )}
                
                {index === breadcrumbs?.length - 1 ? (
                  <div className="flex items-center space-x-2 text-foreground font-medium">
                    <Icon name={breadcrumb?.icon} size={16} />
                    <span>{breadcrumb?.label}</span>
                  </div>
                ) : (
                  <Link
                    to={breadcrumb?.path}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Icon name={breadcrumb?.icon} size={16} />
                    <span>{breadcrumb?.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;
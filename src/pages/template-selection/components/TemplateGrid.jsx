import React from 'react';
import TemplateCard from './TemplateCard';

const TemplateGrid = ({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate, 
  onPreviewTemplate,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg overflow-hidden">
              <div className="aspect-[3/4] bg-muted-foreground/20" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                <div className="h-3 bg-muted-foreground/20 rounded w-full" />
                <div className="h-3 bg-muted-foreground/20 rounded w-2/3" />
                <div className="h-8 bg-muted-foreground/20 rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (templates?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No templates found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms to find the perfect template for your resume.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates?.map((template) => (
        <TemplateCard
          key={template?.id}
          template={template}
          isSelected={selectedTemplate?.id === template?.id}
          onSelect={onSelectTemplate}
          onPreview={onPreviewTemplate}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
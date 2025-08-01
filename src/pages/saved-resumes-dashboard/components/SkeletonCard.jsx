import React from 'react';

const SkeletonCard = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          {/* Checkbox */}
          <div className="w-4 h-4 bg-muted rounded" />
          
          {/* Thumbnail */}
          <div className="w-12 h-16 bg-muted rounded" />
          
          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
          
          {/* Progress */}
          <div className="flex items-center space-x-2">
            <div className="h-3 bg-muted rounded w-8" />
            <div className="w-16 h-2 bg-muted rounded" />
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-muted rounded" />
            <div className="w-8 h-8 bg-muted rounded" />
            <div className="w-8 h-8 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-[3/4] bg-muted" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </div>
        
        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <div className="h-3 bg-muted rounded w-16" />
            <div className="h-3 bg-muted rounded w-8" />
          </div>
          <div className="w-full h-2 bg-muted rounded" />
        </div>
        
        {/* Actions */}
        <div className="flex justify-between pt-3 border-t border-border">
          <div className="flex space-x-1">
            <div className="w-8 h-8 bg-muted rounded" />
            <div className="w-8 h-8 bg-muted rounded" />
            <div className="w-8 h-8 bg-muted rounded" />
          </div>
          <div className="w-20 h-8 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
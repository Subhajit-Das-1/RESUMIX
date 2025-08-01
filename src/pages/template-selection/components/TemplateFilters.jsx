import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TemplateFilters = ({ 
  selectedCategory, 
  onCategoryChange,
  selectedStyle,
  onStyleChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  totalTemplates,
  filteredCount
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'modern', label: 'Modern' },
    { value: 'classic', label: 'Classic' },
    { value: 'creative', label: 'Creative' },
    { value: 'ats-friendly', label: 'ATS-Friendly' }
  ];

  const styleOptions = [
    { value: 'all', label: 'All Styles' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'professional', label: 'Professional' },
    { value: 'bold', label: 'Bold' },
    { value: 'elegant', label: 'Elegant' }
  ];

  const hasActiveFilters = selectedCategory !== 'all' || selectedStyle !== 'all' || searchQuery?.trim() !== '';

  return (
    <div className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Left Section - Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Icon name="Search" size={16} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={onCategoryChange}
              placeholder="Category"
              className="w-full sm:w-40"
            />

            {/* Style Filter */}
            <Select
              options={styleOptions}
              value={selectedStyle}
              onChange={onStyleChange}
              placeholder="Style"
              className="w-full sm:w-40"
            />
          </div>

          {/* Right Section - Results and Clear */}
          <div className="flex items-center justify-between sm:justify-end space-x-4">
            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredCount === totalTemplates ? (
                <span>{totalTemplates} templates</span>
              ) : (
                <span>{filteredCount} of {totalTemplates} templates</span>
              )}
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconPosition="left"
                onClick={onClearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {selectedCategory !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <span>Category: {categoryOptions?.find(opt => opt?.value === selectedCategory)?.label}</span>
                <button
                  onClick={() => onCategoryChange('all')}
                  className="hover:text-primary/80 transition-colors duration-200"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {selectedStyle !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <span>Style: {styleOptions?.find(opt => opt?.value === selectedStyle)?.label}</span>
                <button
                  onClick={() => onStyleChange('all')}
                  className="hover:text-primary/80 transition-colors duration-200"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {searchQuery?.trim() && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <span>Search: "{searchQuery}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:text-primary/80 transition-colors duration-200"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateFilters;
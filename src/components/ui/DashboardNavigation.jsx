import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import Icon from '../AppIcon';

const DashboardNavigation = ({
  searchQuery = '',
  onSearchChange,
  sortBy = 'modified',
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  selectedCount = 0,
  totalCount = 0,
  onBulkDelete,
  onBulkDuplicate,
  onClearSelection,
  showBulkActions = false,
  isLoading = false
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const sortOptions = [
    { value: 'modified', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' }
  ];

  const handleSearchChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e?.target?.value);
    }
  };

  const handleSortChange = (value) => {
    if (onSortChange) {
      onSortChange(value);
    }
  };

  const handleViewModeToggle = () => {
    const newMode = viewMode === 'grid' ? 'list' : 'grid';
    if (onViewModeChange) {
      onViewModeChange(newMode);
    }
  };

  const handleBulkDelete = () => {
    if (onBulkDelete && window.confirm(`Are you sure you want to delete ${selectedCount} resume(s)?`)) {
      onBulkDelete();
    }
  };

  const handleBulkDuplicate = () => {
    if (onBulkDuplicate) {
      onBulkDuplicate();
    }
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 space-y-4 sm:space-y-0">
          {/* Left Section - Search and Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Icon name="Search" size={16} className="text-muted-foreground" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
                placeholder="Sort by"
                className="w-40"
              />

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                iconName="Filter"
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="sm:hidden"
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Right Section - View Controls and Actions */}
          <div className="flex items-center justify-between sm:justify-end space-x-3">
            {/* Results Count */}
            <span className="text-sm text-muted-foreground">
              {totalCount} resume{totalCount !== 1 ? 's' : ''}
            </span>

            {/* View Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              iconName={viewMode === 'grid' ? 'List' : 'Grid3X3'}
              onClick={handleViewModeToggle}
              aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
            />

            {/* Create New Resume */}
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => window.location.href = '/template-selection'}
            >
              <span className="hidden sm:inline">New Resume</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && selectedCount > 0 && (
          <div className="flex items-center justify-between py-3 px-4 bg-primary/5 border border-primary/20 rounded-md mb-4 animate-slide-down">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-primary">
                {selectedCount} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Copy"
                  iconPosition="left"
                  onClick={handleBulkDuplicate}
                  disabled={isLoading}
                >
                  Duplicate
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={handleBulkDelete}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearSelection}
            >
              Clear
            </Button>
          </div>
        )}

        {/* Expanded Filters (Mobile) */}
        {isFilterExpanded && (
          <div className="sm:hidden pb-4 space-y-3 animate-slide-down">
            <div className="grid grid-cols-1 gap-3">
              <Select
                label="Template Type"
                options={[
                  { value: 'all', label: 'All Templates' },
                  { value: 'modern', label: 'Modern' },
                  { value: 'classic', label: 'Classic' },
                  { value: 'creative', label: 'Creative' }
                ]}
                placeholder="Filter by template"
              />
              <Select
                label="Status"
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'complete', label: 'Complete' }
                ]}
                placeholder="Filter by status"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardNavigation;
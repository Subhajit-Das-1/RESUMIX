import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ResumeCard = ({
  resume,
  isSelected = false,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
  onDownload,
  onPreview,
  viewMode = 'grid'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(resume?.id);
    } else {
      navigate('/resume-builder-form', { state: { resumeId: resume?.id } });
    }
  };

  const handleDuplicate = async () => {
    setIsLoading(true);
    try {
      if (onDuplicate) {
        await onDuplicate(resume?.id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this resume?')) {
      onDelete(resume?.id);
    }
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      if (onDownload) {
        await onDownload(resume?.id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(resume);
    } else {
      navigate('/resume-preview', { state: { resumeId: resume?.id } });
    }
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevated transition-all duration-200">
        <div className="flex items-center space-x-4">
          {/* Selection Checkbox */}
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect && onSelect(resume?.id, e?.target?.checked)}
          />

          {/* Resume Thumbnail */}
          <div className="flex-shrink-0 w-12 h-16 bg-muted rounded border overflow-hidden">
            <Image
              src={resume?.thumbnail || '/assets/images/resume-placeholder.png'}
              alt={`${resume?.title} preview`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Resume Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-foreground truncate">
                  {resume?.title}
                </h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span>Template: {resume?.template}</span>
                  <span>•</span>
                  <span>Modified {formatDate(resume?.lastModified)}</span>
                </div>
              </div>

              {/* Completion Status */}
              <div className="flex items-center space-x-2 ml-4">
                <div className={`text-sm font-medium ${getCompletionColor(resume?.completionPercentage)}`}>
                  {resume?.completionPercentage}%
                </div>
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      resume?.completionPercentage >= 80 ? 'bg-success' :
                      resume?.completionPercentage >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${resume?.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={handlePreview}
              aria-label="Preview resume"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={handleEdit}
              aria-label="Edit resume"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              onClick={handleDownload}
              loading={isLoading}
              aria-label="Download resume"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              aria-label="More actions"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-all duration-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect && onSelect(resume?.id, e?.target?.checked)}
          className="bg-card shadow-soft"
        />
      </div>
      {/* Resume Thumbnail */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden cursor-pointer" onClick={handlePreview}>
        <Image
          src={resume?.thumbnail || '/assets/images/resume-placeholder.png'}
          alt={`${resume?.title} preview`}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center animate-fade-in">
            <Button
              variant="default"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={handlePreview}
            >
              Preview
            </Button>
          </div>
        )}

        {/* Completion Badge */}
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-card shadow-soft ${getCompletionColor(resume?.completionPercentage)}`}>
            {resume?.completionPercentage}%
          </div>
        </div>
      </div>
      {/* Resume Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-semibold text-foreground truncate flex-1">
            {resume?.title}
          </h3>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Layout" size={14} />
            <span>{resume?.template}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} />
            <span>Modified {formatDate(resume?.lastModified)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Completion</span>
            <span className={`text-xs font-medium ${getCompletionColor(resume?.completionPercentage)}`}>
              {resume?.completionPercentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                resume?.completionPercentage >= 80 ? 'bg-success' :
                resume?.completionPercentage >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${resume?.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Missing Sections */}
        {resume?.missingSections && resume?.missingSections?.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center space-x-1 text-xs text-warning">
              <Icon name="AlertTriangle" size={12} />
              <span>Missing: {resume?.missingSections?.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              iconName="Edit"
              onClick={handleEdit}
              aria-label="Edit resume"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              onClick={handleDuplicate}
              loading={isLoading}
              aria-label="Duplicate resume"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={handleDelete}
              aria-label="Delete resume"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={handleDownload}
            loading={isLoading}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
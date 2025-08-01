import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const QuickPreviewModal = ({ 
  resume, 
  isOpen, 
  onClose, 
  onEdit, 
  onDownload,
  isDownloading = false 
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(resume?.id);
    } else {
      navigate('/resume-builder-form', { state: { resumeId: resume?.id } });
    }
    onClose();
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(resume?.id);
    }
  };

  const handleFullPreview = () => {
    navigate('/resume-preview', { state: { resumeId: resume?.id } });
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !resume) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-floating max-w-4xl w-full max-h-[90vh] overflow-hidden animate-morph">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {resume?.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {resume?.template} • Modified {formatDate(resume?.lastModified)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Maximize2"
              onClick={handleFullPreview}
              aria-label="Full screen preview"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              aria-label="Close modal"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
          {/* Preview Panel */}
          <div className="flex-1 bg-muted p-4 overflow-auto">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white shadow-elevated rounded-lg overflow-hidden">
                <Image
                  src={resume?.fullPreview || resume?.thumbnail || '/assets/images/resume-placeholder.png'}
                  alt={`${resume?.title} full preview`}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-border bg-card">
            <div className="p-4 space-y-4">
              {/* Resume Stats */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Resume Details</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Completion</span>
                    <span className={`font-medium ${
                      resume?.completionPercentage >= 80 ? 'text-success' :
                      resume?.completionPercentage >= 60 ? 'text-warning' : 'text-error'
                    }`}>
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

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Template</span>
                    <span className="font-medium text-foreground">{resume?.template}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium text-foreground">
                      {new Date(resume.createdAt)?.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">File Size</span>
                    <span className="font-medium text-foreground">{resume?.fileSize || '2.4 MB'}</span>
                  </div>
                </div>
              </div>

              {/* Missing Sections */}
              {resume?.missingSections && resume?.missingSections?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Missing Sections</h3>
                  <div className="space-y-2">
                    {resume?.missingSections?.map((section, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-warning">
                        <Icon name="AlertTriangle" size={14} />
                        <span>{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-border">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Edit"
                  iconPosition="left"
                  onClick={handleEdit}
                >
                  Edit Resume
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  loading={isDownloading}
                  onClick={handleDownload}
                >
                  Download PDF
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  iconName="Maximize2"
                  iconPosition="left"
                  onClick={handleFullPreview}
                >
                  Full Screen Preview
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Copy"
                    iconPosition="left"
                  >
                    Duplicate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share"
                    iconPosition="left"
                  >
                    Share
                  </Button>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-primary mb-1">Pro Tip</p>
                    <p className="text-muted-foreground">
                      Complete all sections to increase your resume's effectiveness and ATS compatibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPreviewModal;
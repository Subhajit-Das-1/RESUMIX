import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const ContextualActionBar = ({ 
  onEdit,
  onDownload,
  onPrint,
  onShare,
  isDownloading = false,
  isPrinting = false,
  resumeTitle = "My Resume",
  showEdit = true,
  showDownload = true,
  showPrint = true,
  showShare = true
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      navigate('/resume-builder-form');
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleShare = () => {
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  const shareOptions = [
    { 
      label: 'Copy Link', 
      icon: 'Link', 
      action: () => {
        navigator.clipboard?.writeText(window.location?.href);
        setIsShareMenuOpen(false);
      }
    },
    { 
      label: 'Email', 
      icon: 'Mail', 
      action: () => {
        const subject = encodeURIComponent(`Check out my resume: ${resumeTitle}`);
        const body = encodeURIComponent(`I'd like to share my resume with you: ${window.location?.href}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        setIsShareMenuOpen(false);
      }
    },
    { 
      label: 'LinkedIn', icon: 'Linkedin', 
      action: () => {
        const url = encodeURIComponent(window.location?.href);
        const text = encodeURIComponent(`Check out my professional resume created with RESUMIX from Rocket Resume`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
        setIsShareMenuOpen(false);
      }
    }
  ];

  return (
    <div className="sticky top-16 z-40 bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Resume Title */}
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-muted-foreground" />
            <h1 className="text-lg font-semibold text-foreground truncate">
              {resumeTitle}
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center space-x-2">
              {showEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}

              {showDownload && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  loading={isDownloading}
                  onClick={handleDownload}
                >
                  Download PDF
                </Button>
              )}

              {showPrint && (
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Printer"
                  iconPosition="left"
                  loading={isPrinting}
                  onClick={handlePrint}
                >
                  Print
                </Button>
              )}

              {showShare && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Share"
                    iconPosition="left"
                    onClick={handleShare}
                  >
                    Share
                  </Button>

                  {/* Share Dropdown */}
                  {isShareMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-floating z-50 animate-slide-down">
                      <div className="py-2">
                        {shareOptions?.map((option) => (
                          <button
                            key={option?.label}
                            onClick={option?.action}
                            className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                          >
                            <Icon name={option?.icon} size={16} />
                            <span>{option?.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Actions - Floating Action Button */}
            <div className="sm:hidden relative">
              <Button
                variant="default"
                size="icon"
                onClick={handleShare}
                className="rounded-full"
              >
                <Icon name="MoreVertical" size={18} />
              </Button>

              {/* Mobile Action Menu */}
              {isShareMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-floating z-50 animate-slide-down">
                  <div className="py-2">
                    {showEdit && (
                      <button
                        onClick={() => {
                          handleEdit();
                          setIsShareMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name="Edit" size={16} />
                        <span>Edit Resume</span>
                      </button>
                    )}

                    {showDownload && (
                      <button
                        onClick={() => {
                          handleDownload();
                          setIsShareMenuOpen(false);
                        }}
                        disabled={isDownloading}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-50"
                      >
                        <Icon name="Download" size={16} />
                        <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                      </button>
                    )}

                    {showPrint && (
                      <button
                        onClick={() => {
                          handlePrint();
                          setIsShareMenuOpen(false);
                        }}
                        disabled={isPrinting}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200 disabled:opacity-50"
                      >
                        <Icon name="Printer" size={16} />
                        <span>{isPrinting ? 'Printing...' : 'Print'}</span>
                      </button>
                    )}

                    <div className="border-t border-border my-2" />

                    {shareOptions?.map((option) => (
                      <button
                        key={option?.label}
                        onClick={option?.action}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <Icon name={option?.icon} size={16} />
                        <span>{option?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Click outside to close */}
      {isShareMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsShareMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default ContextualActionBar;
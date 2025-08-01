import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PreviewActions = ({ 
  onDownload,
  onPrint,
  onShare,
  isDownloading = false,
  isPrinting = false,
  resumeTitle = "My Resume"
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/resume-builder-form');
  };

  const handleDownload = async () => {
    if (onDownload) {
      await onDownload();
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const shareOptions = [
    {
      label: 'Copy Link',
      icon: 'Link',
      action: () => {
        navigator.clipboard?.writeText(window.location?.href);
        setIsShareMenuOpen(false);
        // Show toast notification
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
      label: 'LinkedIn',icon: 'Linkedin',
      action: () => {
        const url = encodeURIComponent(window.location?.href);
        const text = encodeURIComponent(`Check out my professional resume created with RESUMIX from Rocket Resume`);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
        setIsShareMenuOpen(false);
      }
    },
    {
      label: 'Twitter',icon: 'Twitter',
      action: () => {
        const text = encodeURIComponent(`Just created my professional resume with RESUMIX from Rocket Resume! Check it out:`);
        const url = encodeURIComponent(window.location?.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        setIsShareMenuOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-3">
        <Button
          variant="outline"
          iconName="Edit"
          iconPosition="left"
          onClick={handleEdit}
        >
          Edit Resume
        </Button>

        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          loading={isDownloading}
          onClick={handleDownload}
        >
          Download PDF
        </Button>

        <Button
          variant="outline"
          iconName="Printer"
          iconPosition="left"
          loading={isPrinting}
          onClick={handlePrint}
        >
          Print
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
          >
            Share
          </Button>

          {/* Share Dropdown */}
          {isShareMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-slide-down">
              <div className="py-2">
                {shareOptions?.map((option) => (
                  <button
                    key={option?.label}
                    onClick={option?.action}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
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
      {/* Mobile Actions - Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            variant="default"
            size="lg"
            iconName="MoreVertical"
            onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
            className="rounded-full shadow-lg"
          />

          {/* Mobile Actions Menu */}
          {isActionsMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg animate-slide-down">
              <div className="py-2">
                <button
                  onClick={() => {
                    handleEdit();
                    setIsActionsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Icon name="Edit" size={16} />
                  <span>Edit Resume</span>
                </button>

                <button
                  onClick={() => {
                    handleDownload();
                    setIsActionsMenuOpen(false);
                  }}
                  disabled={isDownloading}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  <Icon name="Download" size={16} />
                  <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                </button>

                <button
                  onClick={() => {
                    handlePrint();
                    setIsActionsMenuOpen(false);
                  }}
                  disabled={isPrinting}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  <Icon name="Printer" size={16} />
                  <span>{isPrinting ? 'Printing...' : 'Print'}</span>
                </button>

                <div className="border-t border-gray-200 my-2" />

                {shareOptions?.map((option) => (
                  <button
                    key={option?.label}
                    onClick={() => {
                      option?.action();
                      setIsActionsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
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
      {/* Click outside to close menus */}
      {(isShareMenuOpen || isActionsMenuOpen) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setIsShareMenuOpen(false);
            setIsActionsMenuOpen(false);
          }}
        />
      )}
    </>
  );
};

export default PreviewActions;
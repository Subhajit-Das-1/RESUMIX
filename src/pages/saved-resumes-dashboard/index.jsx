import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import Button from '../../components/ui/Button';

import ResumeCard from './components/ResumeCard';
import EmptyState from './components/EmptyState';
import QuickPreviewModal from './components/QuickPreviewModal';
import SkeletonCard from './components/SkeletonCard';

const SavedResumesDashboard = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('modified');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedResumes, setSelectedResumes] = useState(new Set());
  const [previewModal, setPreviewModal] = useState({ isOpen: false, resume: null });
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock resume data
  const mockResumes = [
    {
      id: 'resume-1',
      title: 'Software Engineer Resume',
      template: 'Modern Professional',
      createdAt: '2025-07-25T10:30:00Z',
      lastModified: '2025-08-01T14:22:00Z',
      completionPercentage: 95,
      missingSections: [],
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop',
      fullPreview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=800&fit=crop',
      fileSize: '2.4 MB'
    },
    {
      id: 'resume-2',
      title: 'Marketing Manager Position',
      template: 'Creative Bold',
      createdAt: '2025-07-20T09:15:00Z',
      lastModified: '2025-07-30T16:45:00Z',
      completionPercentage: 78,
      missingSections: ['References', 'Certifications'],
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop',
      fullPreview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=800&fit=crop',
      fileSize: '1.8 MB'
    },
    {
      id: 'resume-3',
      title: 'Data Analyst Resume',
      template: 'Classic Clean',
      createdAt: '2025-07-15T11:20:00Z',
      lastModified: '2025-07-28T13:30:00Z',
      completionPercentage: 65,
      missingSections: ['Projects', 'Skills', 'Summary'],
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      fullPreview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
      fileSize: '2.1 MB'
    },
    {
      id: 'resume-4',
      title: 'UX Designer Portfolio Resume',
      template: 'Creative Portfolio',
      createdAt: '2025-07-10T14:45:00Z',
      lastModified: '2025-07-25T10:15:00Z',
      completionPercentage: 88,
      missingSections: ['References'],
      thumbnail: 'https://images.unsplash.com/photo-1494790108755-2616c96d5e2c?w=300&h=400&fit=crop',
      fullPreview: 'https://images.unsplash.com/photo-1494790108755-2616c96d5e2c?w=600&h=800&fit=crop',
      fileSize: '3.2 MB'
    },
    {
      id: 'resume-5',
      title: 'Project Manager Resume',
      template: 'Executive Professional',
      createdAt: '2025-07-05T08:30:00Z',
      lastModified: '2025-07-22T17:20:00Z',
      completionPercentage: 92,
      missingSections: [],
      thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop',
      fullPreview: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop',
      fileSize: '2.7 MB'
    },
    {
      id: 'resume-6',
      title: 'Sales Representative Resume',
      template: 'Modern Clean',
      createdAt: '2025-06-28T12:00:00Z',
      lastModified: '2025-07-20T09:45:00Z',
      completionPercentage: 72,
      missingSections: ['Achievements', 'Skills'],
      thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
      fullPreview: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop',
      fileSize: '1.9 MB'
    }
  ];

  // Load resumes from localStorage or use mock data
  useEffect(() => {
    const loadResumes = async () => {
      setIsLoading(true);
      try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const savedResumes = localStorage.getItem('rocket-resumes');
        if (savedResumes) {
          setResumes(JSON.parse(savedResumes));
        } else {
          setResumes(mockResumes);
          localStorage.setItem('rocket-resumes', JSON.stringify(mockResumes));
        }
      } catch (error) {
        console.error('Error loading resumes:', error);
        setResumes(mockResumes);
      } finally {
        setIsLoading(false);
      }
    };

    loadResumes();
  }, []);

  // Filter and sort resumes
  const filteredAndSortedResumes = useMemo(() => {
    let filtered = resumes?.filter(resume =>
      resume?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resume?.template?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    switch (sortBy) {
      case 'modified':
        filtered?.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
        break;
      case 'created':
        filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'name':
        filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
        break;
      case 'name-desc':
        filtered?.sort((a, b) => b?.title?.localeCompare(a?.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [resumes, searchQuery, sortBy]);

  // Handle resume selection
  const handleResumeSelect = (resumeId, isSelected) => {
    const newSelection = new Set(selectedResumes);
    if (isSelected) {
      newSelection?.add(resumeId);
    } else {
      newSelection?.delete(resumeId);
    }
    setSelectedResumes(newSelection);
  };

  // Handle bulk actions
  const handleBulkDelete = async () => {
    const updatedResumes = resumes?.filter(resume => !selectedResumes?.has(resume?.id));
    setResumes(updatedResumes);
    localStorage.setItem('rocket-resumes', JSON.stringify(updatedResumes));
    setSelectedResumes(new Set());
  };

  const handleBulkDuplicate = async () => {
    const resumesToDuplicate = resumes?.filter(resume => selectedResumes?.has(resume?.id));
    const duplicatedResumes = resumesToDuplicate?.map(resume => ({
      ...resume,
      id: `${resume?.id}-copy-${Date.now()}`,
      title: `${resume?.title} (Copy)`,
      createdAt: new Date()?.toISOString(),
      lastModified: new Date()?.toISOString()
    }));
    
    const updatedResumes = [...resumes, ...duplicatedResumes];
    setResumes(updatedResumes);
    localStorage.setItem('rocket-resumes', JSON.stringify(updatedResumes));
    setSelectedResumes(new Set());
  };

  const handleClearSelection = () => {
    setSelectedResumes(new Set());
  };

  // Handle individual resume actions
  const handleEdit = (resumeId) => {
    navigate('/resume-builder-form', { state: { resumeId } });
  };

  const handleDuplicate = async (resumeId) => {
    const resume = resumes?.find(r => r?.id === resumeId);
    if (resume) {
      const duplicatedResume = {
        ...resume,
        id: `${resume?.id}-copy-${Date.now()}`,
        title: `${resume?.title} (Copy)`,
        createdAt: new Date()?.toISOString(),
        lastModified: new Date()?.toISOString()
      };
      
      const updatedResumes = [...resumes, duplicatedResume];
      setResumes(updatedResumes);
      localStorage.setItem('rocket-resumes', JSON.stringify(updatedResumes));
    }
  };

  const handleDelete = (resumeId) => {
    const updatedResumes = resumes?.filter(resume => resume?.id !== resumeId);
    setResumes(updatedResumes);
    localStorage.setItem('rocket-resumes', JSON.stringify(updatedResumes));
  };

  const handleDownload = async (resumeId) => {
    setIsDownloading(true);
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would trigger PDF generation and download
      const resume = resumes?.find(r => r?.id === resumeId);
      if (resume) {
        // Create a temporary link to simulate download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${resume?.title?.replace(/\s+/g, '_')}.pdf`;
        link?.click();
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreview = (resume) => {
    setPreviewModal({ isOpen: true, resume });
  };

  const handleClosePreview = () => {
    setPreviewModal({ isOpen: false, resume: null });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Dashboard Navigation */}
        <DashboardNavigation
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedCount={selectedResumes?.size}
          totalCount={filteredAndSortedResumes?.length}
          onBulkDelete={handleBulkDelete}
          onBulkDuplicate={handleBulkDuplicate}
          onClearSelection={handleClearSelection}
          showBulkActions={selectedResumes?.size > 0}
          isLoading={isLoading}
        />

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
              <p className="text-muted-foreground mt-1">
                Manage and organize your professional resumes
              </p>
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{resumes?.length}</div>
                <div className="text-muted-foreground">Total Resumes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {resumes?.filter(r => r?.completionPercentage >= 80)?.length}
                </div>
                <div className="text-muted-foreground">Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {resumes?.filter(r => r?.completionPercentage < 80)?.length}
                </div>
                <div className="text-muted-foreground">In Progress</div>
              </div>
            </div>
          </div>

          {/* Resume Grid/List */}
          {isLoading ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
            }`}>
              {Array.from({ length: 8 }, (_, index) => (
                <SkeletonCard key={index} viewMode={viewMode} />
              ))}
            </div>
          ) : filteredAndSortedResumes?.length === 0 ? (
            <EmptyState
              hasSearchQuery={searchQuery?.length > 0}
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
            />
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' :'grid-cols-1'
            }`}>
              {filteredAndSortedResumes?.map((resume) => (
                <ResumeCard
                  key={resume?.id}
                  resume={resume}
                  isSelected={selectedResumes?.has(resume?.id)}
                  onSelect={handleResumeSelect}
                  onEdit={handleEdit}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                  onPreview={handlePreview}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Load More Button (for pagination) */}
          {filteredAndSortedResumes?.length > 0 && filteredAndSortedResumes?.length >= 12 && (
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load More Resumes
              </Button>
            </div>
          )}
        </div>

        {/* Floating Action Button (Mobile) */}
        <div className="fixed bottom-6 right-6 lg:hidden z-40">
          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            onClick={() => navigate('/template-selection')}
            className="rounded-full shadow-floating"
            aria-label="Create new resume"
          />
        </div>

        {/* Quick Preview Modal */}
        <QuickPreviewModal
          resume={previewModal?.resume}
          isOpen={previewModal?.isOpen}
          onClose={handleClosePreview}
          onEdit={handleEdit}
          onDownload={handleDownload}
          isDownloading={isDownloading}
        />
      </main>
    </div>
  );
};

export default SavedResumesDashboard;
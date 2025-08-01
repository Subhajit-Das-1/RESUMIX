import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import ProgressNavigation from '../../components/ui/ProgressNavigation';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import TemplateFilters from './components/TemplateFilters';
import TemplateGrid from './components/TemplateGrid';
import TemplatePreviewModal from './components/TemplatePreviewModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock template data
  const allTemplates = [
    {
      id: 'modern-1',
      name: 'Executive Pro',
      category: 'Modern',
      style: 'professional',
      description: 'A clean, modern template perfect for executives and senior professionals. Features a sophisticated layout with emphasis on achievements and leadership experience.',
      previewImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=600&fit=crop',
      fullPreviewImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=1200&fit=crop',
      features: [
        'ATS-friendly format',
        'Professional color scheme',
        'Skills visualization',
        'Achievement highlights',
        'Clean typography'
      ],
      bestFor: ['Executives', 'Managers', 'Senior Professionals'],
      atsScore: 95
    },
    {
      id: 'classic-1',
      name: 'Traditional',
      category: 'Classic',
      style: 'minimal',
      description: 'A timeless, traditional resume format that works well across all industries. Simple, clean, and highly readable with excellent ATS compatibility.',
      previewImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=600&fit=crop',
      fullPreviewImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1200&fit=crop',
      features: [
        'Maximum ATS compatibility',
        'Traditional layout',
        'Easy to customize',
        'Universal appeal',
        'Print-friendly'
      ],
      bestFor: ['Entry Level', 'Career Changers', 'Conservative Industries'],
      atsScore: 98
    },
    {
      id: 'creative-1',
      name: 'Design Focus',
      category: 'Creative',
      style: 'bold',
      description: 'A visually striking template designed for creative professionals. Features unique layouts, color accents, and space for portfolio highlights.',
      previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop',
      fullPreviewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=1200&fit=crop',
      features: [
        'Creative layout',
        'Portfolio section',
        'Color customization',
        'Visual elements',
        'Modern typography'
      ],
      bestFor: ['Designers', 'Artists', 'Marketing', 'Creative Roles'],
      atsScore: 75
    },
    {
      id: 'modern-2',
      name: 'Tech Professional',
      category: 'Modern',
      style: 'minimal',
      description: 'Optimized for technology professionals with sections for technical skills, projects, and certifications. Clean and modern design.',
      previewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      fullPreviewImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop',
      features: [
        'Technical skills section',
        'Project highlights',
        'Certification display',
        'GitHub integration ready',
        'Modern layout'
      ],
      bestFor: ['Software Engineers', 'Data Scientists', 'IT Professionals'],
      atsScore: 92
    },
    {
      id: 'ats-1',
      name: 'ATS Optimized',
      category: 'ATS-Friendly',
      style: 'professional',
      description: 'Specifically designed for maximum ATS compatibility. Simple formatting ensures your resume passes through applicant tracking systems.',
      previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop',
      fullPreviewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=1200&fit=crop',
      features: [
        '100% ATS compatible',
        'Standard formatting',
        'Keyword optimization',
        'Simple structure',
        'Universal compatibility'
      ],
      bestFor: ['All Industries', 'Large Companies', 'Online Applications'],
      atsScore: 100
    },
    {
      id: 'creative-2',
      name: 'Elegant Style',
      category: 'Creative',
      style: 'elegant',
      description: 'An elegant and sophisticated template with subtle design elements. Perfect for professionals who want to stand out while maintaining professionalism.',
      previewImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=600&fit=crop',
      fullPreviewImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=1200&fit=crop',
      features: [
        'Elegant design',
        'Subtle accents',
        'Professional appeal',
        'Customizable colors',
        'Premium feel'
      ],
      bestFor: ['Consultants', 'Finance', 'Legal', 'Healthcare'],
      atsScore: 85
    }
  ];

  // Filter templates based on selected filters
  const filteredTemplates = allTemplates?.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template?.category?.toLowerCase() === selectedCategory;
    const matchesStyle = selectedStyle === 'all' || template?.style === selectedStyle;
    const matchesSearch = searchQuery === '' || 
      template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      template?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    return matchesCategory && matchesStyle && matchesSearch;
  });

  // Load saved template selection
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      try {
        const template = JSON.parse(savedTemplate);
        setSelectedTemplate(template);
      } catch (error) {
        console.error('Error loading saved template:', error);
      }
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
  };

  const handlePreviewTemplate = (template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
  };

  const handleNavigateTemplate = (template) => {
    setPreviewTemplate(template);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/resume-builder-form');
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSearchQuery('');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <Header />
      {/* Progress Navigation */}
      <ProgressNavigation
        currentStep={1}
        totalSteps={3}
        canProceed={!!selectedTemplate}
        onNext={handleContinue}
        showSave={false}
      />
      {/* Breadcrumb */}
      <BreadcrumbNavigation />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a professional template that matches your style and industry. 
            All templates are ATS-friendly and fully customizable.
          </p>
        </div>

        {/* Filters */}
        <TemplateFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
          totalTemplates={allTemplates?.length}
          filteredCount={filteredTemplates?.length}
        />

        {/* Template Grid */}
        <div className="mt-8">
          <TemplateGrid
            templates={filteredTemplates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
            onPreviewTemplate={handlePreviewTemplate}
            isLoading={isLoading}
          />
        </div>

        {/* Continue Button - Fixed at bottom on mobile */}
        {selectedTemplate && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border shadow-elevated sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:p-0 sm:bg-transparent sm:border-t-0 sm:shadow-none sm:mt-12 z-40">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Icon name="Check" size={16} className="text-success" />
                  <span>Selected: {selectedTemplate?.name}</span>
                </div>
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={handleContinue}
                  className="w-full sm:w-auto"
                >
                  Continue to Builder
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Template Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        templates={filteredTemplates}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onSelect={handleSelectTemplate}
        onNavigate={handleNavigateTemplate}
      />
      {/* Bottom spacing for fixed button on mobile */}
      {selectedTemplate && <div className="h-20 sm:h-0" />}
    </motion.div>
  );
};

export default TemplateSelection;
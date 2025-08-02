import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PersonalInfoStep from './components/PersonalInfoStep';
import ExperienceStep from './components/ExperienceStep';
import EducationStep from './components/EducationStep';
import SkillsStep from './components/SkillsStep';
import SummaryStep from './components/SummaryStep';
import ResumePreview from './components/ResumePreview';
import FormNavigation from './components/FormNavigation';
import MobilePreviewToggle from './components/MobilePreviewToggle';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ResumeBuilderForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isSaving, setIsSaving] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [errors, setErrors] = useState({});

  // Initialize form data with mock data
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      title: 'Senior Software Engineer',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      city: 'San Francisco',
      state: 'CA',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      website: 'https://sarahjohnson.dev'
    },
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        startDate: '2021-03-01',
        endDate: '',
        isCurrentJob: true,
        description: `• Led development of microservices architecture serving 1M+ daily users\n• Mentored team of 5 junior developers and improved code review process\n• Reduced application load time by 40% through performance optimization\n• Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes`,
        location: 'San Francisco, CA'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        startDate: '2019-06-01',
        endDate: '2021-02-28',
        isCurrentJob: false,
        description: `• Built responsive web applications using React, Node.js, and PostgreSQL\n• Collaborated with design team to implement pixel-perfect UI components\n• Integrated third-party APIs and payment processing systems\n• Participated in agile development process and sprint planning`,
        location: 'Remote'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'University of California, Berkeley',
        degree: 'bachelor',
        fieldOfStudy: 'Computer Science',
        startDate: '2015-08-01',
        endDate: '2019-05-01',
        isCurrentlyStudying: false,
        gpa: '3.8/4.0',
        description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering'
      }
    ],
    skills: [
      { id: 1, name: 'JavaScript', category: 'technical', proficiency: 'expert' },
      { id: 2, name: 'React', category: 'technical', proficiency: 'expert' },
      { id: 3, name: 'Node.js', category: 'technical', proficiency: 'advanced' },
      { id: 4, name: 'Python', category: 'technical', proficiency: 'advanced' },
      { id: 5, name: 'PostgreSQL', category: 'technical', proficiency: 'intermediate' },
      { id: 6, name: 'AWS', category: 'technical', proficiency: 'intermediate' },
      { id: 7, name: 'Leadership', category: 'soft', proficiency: 'advanced' },
      { id: 8, name: 'Problem Solving', category: 'soft', proficiency: 'expert' },
      { id: 9, name: 'Team Collaboration', category: 'soft', proficiency: 'expert' },
      { id: 10, name: 'Git', category: 'tools', proficiency: 'expert' },
      { id: 11, name: 'Docker', category: 'tools', proficiency: 'intermediate' },
      { id: 12, name: 'English', category: 'language', proficiency: 'expert' },
      { id: 13, name: 'Spanish', category: 'language', proficiency: 'intermediate' }
    ],
    summary: `Experienced software engineer with 5+ years of expertise in full-stack development using React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications serving millions of users and leading cross-functional teams. Passionate about clean code, performance optimization, and mentoring junior developers to achieve their full potential.`
  });

  const totalSteps = 5;

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveToLocalStorage();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    const savedStep = localStorage.getItem('currentStep');

    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }

    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('resumeBuilderData', JSON.stringify(formData));
      localStorage.setItem('selectedTemplate', selectedTemplate);
      localStorage.setItem('currentStep', currentStep?.toString());
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1: // Personal Info
        if (!formData?.personalInfo?.firstName?.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData?.personalInfo?.lastName?.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData?.personalInfo?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.personalInfo?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData?.personalInfo?.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
      case 2: // Experience
        // Experience is optional, but if added, validate required fields
        break;
      case 3: // Education
        // Education is optional, but if added, validate required fields
        break;
      case 4: // Skills
        // Skills are optional
        break;
      case 5: // Summary
        // Summary is optional but recommended
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      saveToLocalStorage();
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsNextLoading(true);
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Navigate to preview page
        saveToLocalStorage();
        navigate('/resume-preview');
      }
    } catch (error) {
      console.error('Error proceeding to next step:', error);
    } finally {
      setIsNextLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem('selectedTemplate', template);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <ExperienceStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <EducationStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <SkillsStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <SummaryStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    // Always allow proceeding for now, validation happens on next click
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSave={handleSave}
        canProceed={canProceed()}
        isSaving={isSaving}
        isNextLoading={isNextLoading}
      />
      <div className="flex h-[calc(100vh-128px)]">
        {/* Form Panel */}
        <div className="w-full md:w-3/5 flex flex-col">
          {/* Form Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-6">
              {renderCurrentStep()}
            </div>
          </div>

          {/* Auto-save Status */}
          {lastSaved && (
            <div className="flex-shrink-0 bg-card border-t border-border p-3">
              <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Save" size={14} className="text-success" />
                  <span>Last saved: {lastSaved?.toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Zap" size={14} className="text-primary" />
                  <span>Auto-save enabled</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Preview Panel */}
        <div className="hidden md:block w-2/5 border-l border-border">
          <ResumePreview
            formData={formData}
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
          />
        </div>
      </div>
      {/* Mobile Preview Toggle */}
      <MobilePreviewToggle
        formData={formData}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
      />
      
      {/* Floating Navigation Button for Mobile */}
      <div className="fixed bottom-6 left-6 z-50 md:hidden">
        <Button
          variant="default"
          size="lg"
          iconName="ChevronRight"
          iconPosition="right"
          onClick={handleNext}
          disabled={!canProceed()}
          loading={isNextLoading}
          className="rounded-full shadow-floating"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResumeBuilderForm;
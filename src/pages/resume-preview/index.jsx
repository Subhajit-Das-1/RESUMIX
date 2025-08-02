import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PreviewHeader from './components/PreviewHeader';
import ResumeViewer from './components/ResumeViewer';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import { generatePDF, generatePDFFromResumeData } from '../../utils/pdfGenerator';

const ResumePreview = () => {
  const [resumeData, setResumeData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const navigate = useNavigate();
  const resumeViewerRef = useRef(null);

  // Mock resume data - in real app this would come from localStorage or API
  const mockResumeData = {
    personalInfo: {
      fullName: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/sarahjohnson"
    },
    summary: `Experienced Software Engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams to achieve project goals. Passionate about creating user-centric solutions and staying current with emerging technologies.`,
    experience: [
      {
        position: "Senior Software Engineer",
        company: "TechCorp Solutions",
        duration: "2022 - Present",
        description: `Led development of customer-facing web applications serving 100K+ users daily. Implemented microservices architecture reducing system response time by 40%. Mentored junior developers and established code review processes that improved code quality by 60%.`
      },
      {
        position: "Software Engineer",
        company: "StartupXYZ",
        duration: "2020 - 2022",
        description: `Developed and maintained React-based dashboard applications for data analytics platform. Collaborated with UX/UI designers to implement responsive designs. Optimized database queries resulting in 30% performance improvement.`
      },
      {
        position: "Junior Developer",
        company: "WebDev Agency",
        duration: "2019 - 2020",
        description: `Built custom WordPress themes and plugins for client websites. Implemented responsive designs and ensured cross-browser compatibility. Participated in agile development processes and client communication.`
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley",
        year: "2019"
      },
      {
        degree: "Full Stack Web Development Bootcamp",
        institution: "General Assembly",
        year: "2018"
      }
    ],
    skills: [
      "JavaScript", "React", "Node.js", "Python", "AWS", "Docker", 
      "MongoDB", "PostgreSQL", "Git", "Agile/Scrum", "REST APIs", "GraphQL"
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: `Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented features including user authentication, payment processing, inventory management, and order tracking. Deployed on AWS with CI/CD pipeline.`,
        technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"]
      },
      {
        name: "Task Management App",
        description: `Developed a collaborative task management application with real-time updates using Socket.io. Features include drag-and-drop interface, team collaboration, file attachments, and progress tracking.`,
        technologies: ["React", "Express.js", "Socket.io", "PostgreSQL"]
      },
      {
        name: "Weather Dashboard",
        description: `Created a responsive weather dashboard that displays current conditions and forecasts for multiple cities. Integrated with OpenWeatherMap API and implemented data visualization using Chart.js.`,
        technologies: ["JavaScript", "Chart.js", "OpenWeatherMap API", "CSS3"]
      }
    ]
  };

  useEffect(() => {
    // Simulate loading resume data
    const loadResumeData = async () => {
      setIsLoading(true);
      
      // Check localStorage for saved resume data
      const savedData = localStorage.getItem('resumeData');
      const savedTemplate = localStorage.getItem('selectedTemplate');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (savedData) {
        try {
          setResumeData(JSON.parse(savedData));
        } catch (error) {
          console.error('Error parsing saved resume data:', error);
          setResumeData(mockResumeData);
        }
      } else {
        setResumeData(mockResumeData);
      }
      
      if (savedTemplate) {
        setSelectedTemplate(savedTemplate);
      }
      
      setIsLoading(false);
    };

    loadResumeData();
  }, []);

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem('selectedTemplate', template);
  };

  const handleZoomChange = (zoom) => {
    setZoomLevel(zoom);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Generate filename based on user's name
      const firstName = resumeData?.personalInfo?.firstName || '';
      const lastName = resumeData?.personalInfo?.lastName || '';
      const filename = `${firstName}_${lastName}_Resume.pdf`.replace(/\s+/g, '_');
      
      // Generate PDF using the data-based approach instead of capturing DOM
      await generatePDFFromResumeData(resumeData, selectedTemplate, filename);
      
      // Show success message
      alert('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Add print styles
    const printStyles = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-only, .print-only * {
          visibility: visible;
        }
        .print-only {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        header, nav, .no-print {
          display: none !important;
        }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = printStyles;
    document.head?.appendChild(styleSheet);
    
    setTimeout(() => {
      window.print();
      document.head?.removeChild(styleSheet);
      setIsPrinting(false);
    }, 500);
  };

  const getResumeTitle = () => {
    if (resumeData?.personalInfo?.fullName) {
      return `${resumeData?.personalInfo?.fullName} - Resume`;
    }
    return "My Resume";
  };

  if (isLoading) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <PreviewHeader 
          resumeTitle="Loading..."
          onDownload={handleDownload}
          onPrint={handlePrint}
          isDownloading={isDownloading}
          isPrinting={isPrinting}
        />
        <LoadingState />
      </motion.div>
    );
  }

  if (!resumeData) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <PreviewHeader 
          resumeTitle="No Resume"
          onDownload={handleDownload}
          onPrint={handlePrint}
          isDownloading={isDownloading}
          isPrinting={isPrinting}
        />
        <EmptyState />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PreviewHeader 
        resumeTitle={getResumeTitle()}
        onDownload={handleDownload}
        onPrint={handlePrint}
        isDownloading={isDownloading}
        isPrinting={isPrinting}
      />
      <ResumeViewer
        ref={resumeViewerRef}
        resumeData={resumeData}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        zoomLevel={zoomLevel}
        onZoomChange={handleZoomChange}
        isPrintMode={isPrinting}
      />
      {/* Print-only version */}
      <div className="print-only hidden">
        <ResumeViewer
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
          zoomLevel={100}
          onZoomChange={() => {}}
          isPrintMode={true}
        />
      </div>
    </motion.div>
  );
};

export default ResumePreview;
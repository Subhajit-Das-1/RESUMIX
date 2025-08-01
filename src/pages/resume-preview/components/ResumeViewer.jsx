import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';


const ResumeViewer = ({ 
  resumeData, 
  selectedTemplate = 'modern',
  onTemplateChange,
  zoomLevel = 100,
  onZoomChange,
  isPrintMode = false 
}) => {
  const viewerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const templates = {
    modern: 'Modern Professional',
    classic: 'Classic Traditional',
    creative: 'Creative Design'
  };

  const zoomOptions = [
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
    { value: 125, label: '125%' },
    { value: 150, label: '150%' },
    { value: 200, label: '200%' }
  ];

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 25, 200);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 25, 50);
    onZoomChange(newZoom);
  };

  const handleFitToWidth = () => {
    onZoomChange(100);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef?.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const renderModernTemplate = () => (
    <div className="bg-white text-gray-900 shadow-lg" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {resumeData?.personalInfo?.fullName || 'John Doe'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>{resumeData?.personalInfo?.email || 'john.doe@email.com'}</span>
            <span>{resumeData?.personalInfo?.phone || '+1 (555) 123-4567'}</span>
            <span>{resumeData?.personalInfo?.location || 'New York, NY'}</span>
            {resumeData?.personalInfo?.linkedin && (
              <span>{resumeData?.personalInfo?.linkedin}</span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData?.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{resumeData?.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData?.experience && resumeData?.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Professional Experience</h2>
            {resumeData?.experience?.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp?.position}</h3>
                    <p className="text-gray-700">{exp?.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">{exp?.duration}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{exp?.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData?.education && resumeData?.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Education</h2>
            {resumeData?.education?.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu?.degree}</h3>
                    <p className="text-gray-700">{edu?.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600">{edu?.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData?.skills && resumeData?.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData?.skills?.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData?.projects && resumeData?.projects?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Projects</h2>
            {resumeData?.projects?.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-gray-900">{project?.name}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{project?.description}</p>
                {project?.technologies && (
                  <p className="text-xs text-gray-600 mt-1">
                    Technologies: {project?.technologies?.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="bg-white text-gray-900 shadow-lg" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center border-b border-gray-300 pb-6 mb-6">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            {resumeData?.personalInfo?.fullName || 'John Doe'}
          </h1>
          <div className="text-sm text-gray-600 space-y-1">
            <div>{resumeData?.personalInfo?.email || 'john.doe@email.com'}</div>
            <div>{resumeData?.personalInfo?.phone || '+1 (555) 123-4567'}</div>
            <div>{resumeData?.personalInfo?.location || 'New York, NY'}</div>
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData?.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{resumeData?.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resumeData?.experience && resumeData?.experience?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            {resumeData?.experience?.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{exp?.position}</h3>
                  <span className="text-sm text-gray-600">{exp?.duration}</span>
                </div>
                <p className="text-gray-700 italic mb-2">{exp?.company}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{exp?.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData?.education && resumeData?.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              EDUCATION
            </h2>
            {resumeData?.education?.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu?.degree}</h3>
                    <p className="text-gray-700 italic">{edu?.institution}</p>
                  </div>
                  <span className="text-sm text-gray-600">{edu?.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeData?.skills && resumeData?.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-serif font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              SKILLS
            </h2>
            <p className="text-gray-700">{resumeData?.skills?.join(' • ')}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-white text-gray-900 shadow-lg" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}>
      <div className="flex max-w-4xl mx-auto">
        {/* Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-blue-600 text-white p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {resumeData?.personalInfo?.fullName || 'John Doe'}
            </h1>
            <div className="text-sm space-y-2 opacity-90">
              <div>{resumeData?.personalInfo?.email || 'john.doe@email.com'}</div>
              <div>{resumeData?.personalInfo?.phone || '+1 (555) 123-4567'}</div>
              <div>{resumeData?.personalInfo?.location || 'New York, NY'}</div>
            </div>
          </div>

          {/* Skills */}
          {resumeData?.skills && resumeData?.skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">SKILLS</h2>
              <div className="space-y-2">
                {resumeData?.skills?.map((skill, index) => (
                  <div key={index} className="bg-white/20 rounded px-3 py-1 text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData?.education && resumeData?.education?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">EDUCATION</h2>
              {resumeData?.education?.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-sm">{edu?.degree}</h3>
                  <p className="text-xs opacity-90">{edu?.institution}</p>
                  <p className="text-xs opacity-75">{edu?.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6">
          {/* Professional Summary */}
          {resumeData?.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-3">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{resumeData?.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData?.experience && resumeData?.experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-purple-600 mb-3">Experience</h2>
              {resumeData?.experience?.map((exp, index) => (
                <div key={index} className="mb-4 relative">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div className="ml-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{exp?.position}</h3>
                      <span className="text-sm text-gray-600">{exp?.duration}</span>
                    </div>
                    <p className="text-purple-600 font-medium mb-2">{exp?.company}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{exp?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resumeData?.projects && resumeData?.projects?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-purple-600 mb-3">Projects</h2>
              {resumeData?.projects?.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-gray-900">{project?.name}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{project?.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      default:
        return renderModernTemplate();
    }
  };

  if (isPrintMode) {
    return (
      <div className="print-only">
        {renderTemplate()}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100 overflow-hidden">
      {/* Zoom Controls */}
      {!isFullscreen && (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ZoomOut"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
              />
              <select
                value={zoomLevel}
                onChange={(e) => onZoomChange(Number(e?.target?.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {zoomOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                iconName="ZoomIn"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 200}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleFitToWidth}
              >
                Fit to Width
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={selectedTemplate}
                onChange={(e) => onTemplateChange(e?.target?.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                {Object.entries(templates)?.map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                iconName={isFullscreen ? "Minimize" : "Maximize"}
                onClick={toggleFullscreen}
              />
            </div>
          </div>
        </div>
      )}
      {/* Resume Viewer */}
      <div 
        ref={viewerRef}
        className="h-full overflow-auto bg-gray-100 p-4 flex justify-center"
      >
        <div className="max-w-4xl w-full">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
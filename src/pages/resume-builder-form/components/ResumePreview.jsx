import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ResumePreview = ({ formData, selectedTemplate, onTemplateChange }) => {
  const [previewScale, setPreviewScale] = useState('100%');

  const templateOptions = [
    { value: 'modern', label: 'Modern Professional' },
    { value: 'classic', label: 'Classic Traditional' },
    { value: 'creative', label: 'Creative Design' }
  ];

  const scaleOptions = [
    { value: '50%', label: '50%' },
    { value: '75%', label: '75%' },
    { value: '100%', label: '100%' },
    { value: '125%', label: '125%' }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const renderModernTemplate = () => (
    <div className="bg-white text-gray-900 shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-1">
          {formData?.personalInfo?.firstName} {formData?.personalInfo?.lastName}
        </h1>
        <p className="text-blue-100 text-lg mb-3">{formData?.personalInfo?.title}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {formData?.personalInfo?.email && (
            <span className="flex items-center gap-1">
              <Icon name="Mail" size={14} />
              {formData?.personalInfo?.email}
            </span>
          )}
          {formData?.personalInfo?.phone && (
            <span className="flex items-center gap-1">
              <Icon name="Phone" size={14} />
              {formData?.personalInfo?.phone}
            </span>
          )}
          {(formData?.personalInfo?.city || formData?.personalInfo?.state) && (
            <span className="flex items-center gap-1">
              <Icon name="MapPin" size={14} />
              {formData?.personalInfo?.city}{formData?.personalInfo?.city && formData?.personalInfo?.state && ', '}{formData?.personalInfo?.state}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Professional Summary */}
        {formData?.summary && (
          <section>
            <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData?.summary}</p>
          </section>
        )}

        {/* Experience */}
        {formData?.experience?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {formData?.experience?.map((exp) => (
                <div key={exp?.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{exp?.position}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp?.startDate)} - {exp?.isCurrentJob ? 'Present' : formatDate(exp?.endDate)}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-1">{exp?.company}</p>
                  {exp?.location && <p className="text-sm text-gray-600 mb-2">{exp?.location}</p>}
                  {exp?.description && (
                    <div className="text-gray-700 text-sm">
                      {exp?.description?.split('\n')?.map((line, index) => (
                        <p key={index} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {formData?.education?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              Education
            </h2>
            <div className="space-y-3">
              {formData?.education?.map((edu) => (
                <div key={edu?.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{edu?.institution}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu?.startDate)} - {edu?.isCurrentlyStudying ? 'Present' : formatDate(edu?.endDate)}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium">{edu?.degree} {edu?.fieldOfStudy && `in ${edu?.fieldOfStudy}`}</p>
                  {edu?.gpa && <p className="text-sm text-gray-600">GPA: {edu?.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {formData?.skills?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-1 mb-3">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['technical', 'soft', 'language', 'tools', 'other']?.map(category => {
                const categorySkills = formData?.skills?.filter(skill => skill?.category === category);
                if (categorySkills?.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h4 className="font-medium text-gray-800 mb-2 capitalize">
                      {category === 'technical' ? 'Technical Skills' : 
                       category === 'soft' ? 'Soft Skills' :
                       category === 'language' ? 'Languages' :
                       category === 'tools' ? 'Tools & Software' : 'Other Skills'}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {categorySkills?.map(skill => (
                        <span key={skill?.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {skill?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="bg-white text-gray-900 shadow-lg">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData?.personalInfo?.firstName} {formData?.personalInfo?.lastName}
          </h1>
          <p className="text-xl text-gray-700 mb-3">{formData?.personalInfo?.title}</p>
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
            {formData?.personalInfo?.email && <span>{formData?.personalInfo?.email}</span>}
            {formData?.personalInfo?.phone && <span>{formData?.personalInfo?.phone}</span>}
            {(formData?.personalInfo?.city || formData?.personalInfo?.state) && (
              <span>
                {formData?.personalInfo?.city}{formData?.personalInfo?.city && formData?.personalInfo?.state && ', '}{formData?.personalInfo?.state}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {formData?.summary && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData?.summary}</p>
          </section>
        )}

        {/* Experience */}
        {formData?.experience?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {formData?.experience?.map((exp) => (
                <div key={exp?.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp?.position}</h3>
                      <p className="font-semibold text-gray-700">{exp?.company}</p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp?.startDate)} - {exp?.isCurrentJob ? 'Present' : formatDate(exp?.endDate)}
                    </span>
                  </div>
                  {exp?.location && <p className="text-sm text-gray-600 mb-2">{exp?.location}</p>}
                  {exp?.description && (
                    <div className="text-gray-700 text-sm">
                      {exp?.description?.split('\n')?.map((line, index) => (
                        <p key={index} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {formData?.education?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-3">
              {formData?.education?.map((edu) => (
                <div key={edu?.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu?.degree} {edu?.fieldOfStudy && `in ${edu?.fieldOfStudy}`}</h3>
                      <p className="font-semibold text-gray-700">{edu?.institution}</p>
                      {edu?.gpa && <p className="text-sm text-gray-600">GPA: {edu?.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu?.startDate)} - {edu?.isCurrentlyStudying ? 'Present' : formatDate(edu?.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {formData?.skills?.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Skills
            </h2>
            <div className="space-y-3">
              {['technical', 'soft', 'language', 'tools', 'other']?.map(category => {
                const categorySkills = formData?.skills?.filter(skill => skill?.category === category);
                if (categorySkills?.length === 0) return null;
                
                return (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {category === 'technical' ? 'Technical Skills' : 
                       category === 'soft' ? 'Soft Skills' :
                       category === 'language' ? 'Languages' :
                       category === 'tools' ? 'Tools & Software' : 'Other Skills'}:
                    </h4>
                    <p className="text-gray-700">
                      {categorySkills?.map(skill => skill?.name)?.join(', ')}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className="bg-white text-gray-900 shadow-lg">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-800 text-white p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-1">
              {formData?.personalInfo?.firstName}
            </h1>
            <h1 className="text-xl font-bold mb-2">
              {formData?.personalInfo?.lastName}
            </h1>
            <p className="text-gray-300 text-sm">{formData?.personalInfo?.title}</p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3 text-gray-300 uppercase tracking-wide">Contact</h3>
            <div className="space-y-2 text-sm">
              {formData?.personalInfo?.email && (
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={12} />
                  <span className="text-xs">{formData?.personalInfo?.email}</span>
                </div>
              )}
              {formData?.personalInfo?.phone && (
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={12} />
                  <span className="text-xs">{formData?.personalInfo?.phone}</span>
                </div>
              )}
              {(formData?.personalInfo?.city || formData?.personalInfo?.state) && (
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={12} />
                  <span className="text-xs">
                    {formData?.personalInfo?.city}{formData?.personalInfo?.city && formData?.personalInfo?.state && ', '}{formData?.personalInfo?.state}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 text-gray-300 uppercase tracking-wide">Skills</h3>
              <div className="space-y-3">
                {['technical', 'soft', 'language', 'tools', 'other']?.map(category => {
                  const categorySkills = formData?.skills?.filter(skill => skill?.category === category);
                  if (categorySkills?.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h4 className="text-xs font-medium text-gray-400 mb-1 uppercase">
                        {category === 'technical' ? 'Technical' : 
                         category === 'soft' ? 'Soft Skills' :
                         category === 'language' ? 'Languages' :
                         category === 'tools' ? 'Tools' : 'Other'}
                      </h4>
                      <div className="space-y-1">
                        {categorySkills?.map(skill => (
                          <div key={skill?.id} className="text-xs text-white">
                            {skill?.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-6 space-y-6">
          {/* Professional Summary */}
          {formData?.summary && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">{formData?.summary}</p>
            </section>
          )}

          {/* Experience */}
          {formData?.experience?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">
                Experience
              </h2>
              <div className="space-y-4">
                {formData?.experience?.map((exp) => (
                  <div key={exp?.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">{exp?.position}</h3>
                      <span className="text-xs text-gray-600">
                        {formatDate(exp?.startDate)} - {exp?.isCurrentJob ? 'Present' : formatDate(exp?.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium text-sm mb-1">{exp?.company}</p>
                    {exp?.location && <p className="text-xs text-gray-600 mb-2">{exp?.location}</p>}
                    {exp?.description && (
                      <div className="text-gray-700 text-xs">
                        {exp?.description?.split('\n')?.map((line, index) => (
                          <p key={index} className="mb-1">{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {formData?.education?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-gray-800 pl-3">
                Education
              </h2>
              <div className="space-y-3">
                {formData?.education?.map((edu) => (
                  <div key={edu?.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{edu?.degree} {edu?.fieldOfStudy && `in ${edu?.fieldOfStudy}`}</h3>
                        <p className="text-gray-700 font-medium text-sm">{edu?.institution}</p>
                        {edu?.gpa && <p className="text-xs text-gray-600">GPA: {edu?.gpa}</p>}
                      </div>
                      <span className="text-xs text-gray-600">
                        {formatDate(edu?.startDate)} - {edu?.isCurrentlyStudying ? 'Present' : formatDate(edu?.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    // Debug: Log the form data to see what's being passed
    console.log('ResumePreview formData:', formData);
    console.log('ResumePreview selectedTemplate:', selectedTemplate);
    
    switch (selectedTemplate) {
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="h-full flex flex-col bg-muted/30">
      {/* Preview Header */}
      <div className="flex-shrink-0 bg-card border-b border-border p-3 sm:p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Eye" size={18} className="sm:w-5 sm:h-5" />
            <span>Live Preview</span>
          </h3>
          <div className="flex items-center space-x-2">
            <Select
              options={scaleOptions}
              value={previewScale}
              onChange={setPreviewScale}
              className="w-20"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Maximize2"
              onClick={() => window.open('/resume-preview', '_blank')}
            >
              Full Screen
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            label="Template"
            options={templateOptions}
            value={selectedTemplate}
            onChange={onTemplateChange}
            className="flex-1"
          />
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto" style={{ 
          minHeight: '842px', 
          width: '100%', 
          maxWidth: '595px',
          transform: previewScale === '75%' ? 'scale(0.75)' : previewScale === '50%' ? 'scale(0.5)' : previewScale === '125%' ? 'scale(1.25)' : 'scale(1)',
          transformOrigin: 'top center'
        }}>
          {formData && Object.keys(formData).length > 0 ? (
            renderTemplate()
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <Icon name="FileText" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Resume Data</h3>
                <p className="text-gray-500">Start building your resume by filling out the form on the left.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Footer */}
      <div className="flex-shrink-0 bg-card border-t border-border p-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Updates automatically as you type</span>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={14} className="text-success" />
            <span>Live Preview Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
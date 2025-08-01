import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExperienceStep = ({ formData, updateFormData, errors }) => {
  const experiences = formData?.experience || [];

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
      location: ''
    };
    updateFormData('experience', [...experiences, newExperience]);
  };

  const removeExperience = (id) => {
    updateFormData('experience', experiences?.filter(exp => exp?.id !== id));
  };

  const updateExperience = (id, field, value) => {
    const updatedExperiences = experiences?.map(exp =>
      exp?.id === id ? { ...exp, [field]: value } : exp
    );
    updateFormData('experience', updatedExperiences);
  };

  const handleCurrentJobChange = (id, isCurrentJob) => {
    const updatedExperiences = experiences?.map(exp =>
      exp?.id === id ? { ...exp, isCurrentJob, endDate: isCurrentJob ? '' : exp?.endDate } : exp
    );
    updateFormData('experience', updatedExperiences);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Briefcase" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
            <p className="text-sm text-muted-foreground">Add your professional experience</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={addExperience}
        >
          Add Experience
        </Button>
      </div>
      {experiences?.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No work experience added</h3>
          <p className="text-muted-foreground mb-4">Start by adding your most recent job</p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={addExperience}
          >
            Add Your First Job
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences?.map((experience, index) => (
            <div key={experience?.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">
                  Experience #{index + 1}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => removeExperience(experience?.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Job Title"
                  type="text"
                  placeholder="e.g., Software Engineer"
                  value={experience?.position}
                  onChange={(e) => updateExperience(experience?.id, 'position', e?.target?.value)}
                  required
                />
                <Input
                  label="Company Name"
                  type="text"
                  placeholder="e.g., Google Inc."
                  value={experience?.company}
                  onChange={(e) => updateExperience(experience?.id, 'company', e?.target?.value)}
                  required
                />
              </div>

              <Input
                label="Location"
                type="text"
                placeholder="e.g., San Francisco, CA"
                value={experience?.location}
                onChange={(e) => updateExperience(experience?.id, 'location', e?.target?.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={experience?.startDate}
                  onChange={(e) => updateExperience(experience?.id, 'startDate', e?.target?.value)}
                  required
                />
                <div className="space-y-2">
                  <Input
                    label="End Date"
                    type="date"
                    value={experience?.endDate}
                    onChange={(e) => updateExperience(experience?.id, 'endDate', e?.target?.value)}
                    disabled={experience?.isCurrentJob}
                    required={!experience?.isCurrentJob}
                  />
                  <Checkbox
                    label="I currently work here"
                    checked={experience?.isCurrentJob}
                    onChange={(e) => handleCurrentJobChange(experience?.id, e?.target?.checked)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Job Description
                </label>
                <textarea
                  className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                  placeholder={`• Developed and maintained web applications using React and Node.js\n• Collaborated with cross-functional teams to deliver high-quality software\n• Improved application performance by 30% through code optimization`}
                  value={experience?.description}
                  onChange={(e) => updateExperience(experience?.id, 'description', e?.target?.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use bullet points to describe your key achievements and responsibilities
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceStep;
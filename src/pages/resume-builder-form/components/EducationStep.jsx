import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const EducationStep = ({ formData, updateFormData, errors }) => {
  const education = formData?.education || [];

  const degreeOptions = [
    { value: 'high-school', label: 'High School Diploma' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate/PhD' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'other', label: 'Other' }
  ];

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      isCurrentlyStudying: false,
      gpa: '',
      description: ''
    };
    updateFormData('education', [...education, newEducation]);
  };

  const removeEducation = (id) => {
    updateFormData('education', education?.filter(edu => edu?.id !== id));
  };

  const updateEducation = (id, field, value) => {
    const updatedEducation = education?.map(edu =>
      edu?.id === id ? { ...edu, [field]: value } : edu
    );
    updateFormData('education', updatedEducation);
  };

  const handleCurrentlyStudyingChange = (id, isCurrentlyStudying) => {
    const updatedEducation = education?.map(edu =>
      edu?.id === id ? { ...edu, isCurrentlyStudying, endDate: isCurrentlyStudying ? '' : edu?.endDate } : edu
    );
    updateFormData('education', updatedEducation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Education</h2>
            <p className="text-sm text-muted-foreground">Add your educational background</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={addEducation}
        >
          Add Education
        </Button>
      </div>
      {education?.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <Icon name="GraduationCap" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No education added</h3>
          <p className="text-muted-foreground mb-4">Add your educational qualifications</p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={addEducation}
          >
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {education?.map((edu, index) => (
            <div key={edu?.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">
                  Education #{index + 1}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => removeEducation(edu?.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Institution Name"
                  type="text"
                  placeholder="e.g., Stanford University"
                  value={edu?.institution}
                  onChange={(e) => updateEducation(edu?.id, 'institution', e?.target?.value)}
                  required
                />
                <Select
                  label="Degree Type"
                  options={degreeOptions}
                  value={edu?.degree}
                  onChange={(value) => updateEducation(edu?.id, 'degree', value)}
                  placeholder="Select degree type"
                  required
                />
              </div>

              <Input
                label="Field of Study"
                type="text"
                placeholder="e.g., Computer Science, Business Administration"
                value={edu?.fieldOfStudy}
                onChange={(e) => updateEducation(edu?.id, 'fieldOfStudy', e?.target?.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={edu?.startDate}
                  onChange={(e) => updateEducation(edu?.id, 'startDate', e?.target?.value)}
                  required
                />
                <div className="space-y-2">
                  <Input
                    label="End Date"
                    type="date"
                    value={edu?.endDate}
                    onChange={(e) => updateEducation(edu?.id, 'endDate', e?.target?.value)}
                    disabled={edu?.isCurrentlyStudying}
                    required={!edu?.isCurrentlyStudying}
                  />
                  <Checkbox
                    label="Currently studying"
                    checked={edu?.isCurrentlyStudying}
                    onChange={(e) => handleCurrentlyStudyingChange(edu?.id, e?.target?.checked)}
                  />
                </div>
                <Input
                  label="GPA (Optional)"
                  type="text"
                  placeholder="e.g., 3.8/4.0"
                  value={edu?.gpa}
                  onChange={(e) => updateEducation(edu?.id, 'gpa', e?.target?.value)}
                  description="Include if 3.5 or higher"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  className="w-full min-h-[80px] px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                  placeholder="Relevant coursework, honors, achievements, thesis title, etc."
                  value={edu?.description}
                  onChange={(e) => updateEducation(edu?.id, 'description', e?.target?.value)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationStep;
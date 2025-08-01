import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PersonalInfoStep = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData('personalInfo', { ...formData?.personalInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
          <p className="text-sm text-muted-foreground">Let's start with your basic details</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.personalInfo?.firstName || ''}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.personalInfo?.lastName || ''}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Professional Title"
        type="text"
        placeholder="e.g., Software Engineer, Marketing Manager"
        value={formData?.personalInfo?.title || ''}
        onChange={(e) => handleInputChange('title', e?.target?.value)}
        description="This will appear as your headline on the resume"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.personalInfo?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData?.personalInfo?.phone || ''}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City"
          type="text"
          placeholder="New York"
          value={formData?.personalInfo?.city || ''}
          onChange={(e) => handleInputChange('city', e?.target?.value)}
        />
        <Input
          label="State/Province"
          type="text"
          placeholder="NY"
          value={formData?.personalInfo?.state || ''}
          onChange={(e) => handleInputChange('state', e?.target?.value)}
        />
      </div>
      <Input
        label="LinkedIn Profile"
        type="url"
        placeholder="https://linkedin.com/in/yourprofile"
        value={formData?.personalInfo?.linkedin || ''}
        onChange={(e) => handleInputChange('linkedin', e?.target?.value)}
        description="Optional: Add your LinkedIn profile URL"
      />
      <Input
        label="Portfolio/Website"
        type="url"
        placeholder="https://yourportfolio.com"
        value={formData?.personalInfo?.website || ''}
        onChange={(e) => handleInputChange('website', e?.target?.value)}
        description="Optional: Add your portfolio or personal website"
      />
    </div>
  );
};

export default PersonalInfoStep;
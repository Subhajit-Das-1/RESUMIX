import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SkillsStep = ({ formData, updateFormData, errors }) => {
  const [newSkill, setNewSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState('technical');
  
  const skills = formData?.skills || [];

  const skillCategories = [
    { value: 'technical', label: 'Technical Skills' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'language', label: 'Languages' },
    { value: 'tools', label: 'Tools & Software' },
    { value: 'other', label: 'Other Skills' }
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const suggestedSkills = {
    technical: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'HTML/CSS', 'Java', 'C++', 'Git', 'AWS'],
    soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Project Management', 'Critical Thinking', 'Adaptability', 'Time Management'],
    language: ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Portuguese', 'Italian'],
    tools: ['Microsoft Office', 'Adobe Creative Suite', 'Figma', 'Slack', 'Jira', 'Trello', 'Salesforce', 'Google Analytics'],
    other: ['Data Analysis', 'Digital Marketing', 'Content Writing', 'Public Speaking', 'Research', 'Customer Service']
  };

  const addSkill = () => {
    if (newSkill?.trim()) {
      const skill = {
        id: Date.now(),
        name: newSkill?.trim(),
        category: skillCategory,
        proficiency: 'intermediate'
      };
      updateFormData('skills', [...skills, skill]);
      setNewSkill('');
    }
  };

  const addSuggestedSkill = (skillName) => {
    const skill = {
      id: Date.now(),
      name: skillName,
      category: skillCategory,
      proficiency: 'intermediate'
    };
    updateFormData('skills', [...skills, skill]);
  };

  const removeSkill = (id) => {
    updateFormData('skills', skills?.filter(skill => skill?.id !== id));
  };

  const updateSkill = (id, field, value) => {
    const updatedSkills = skills?.map(skill =>
      skill?.id === id ? { ...skill, [field]: value } : skill
    );
    updateFormData('skills', updatedSkills);
  };

  const getSkillsByCategory = (category) => {
    return skills?.filter(skill => skill?.category === category);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Skills</h2>
          <p className="text-sm text-muted-foreground">Showcase your abilities and expertise</p>
        </div>
      </div>
      {/* Add New Skill */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium text-foreground">Add New Skill</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Category"
            options={skillCategories}
            value={skillCategory}
            onChange={setSkillCategory}
          />
          <Input
            label="Skill Name"
            type="text"
            placeholder="e.g., JavaScript, Leadership"
            value={newSkill}
            onChange={(e) => setNewSkill(e?.target?.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="flex items-end">
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={addSkill}
              disabled={!newSkill?.trim()}
              fullWidth
            >
              Add Skill
            </Button>
          </div>
        </div>

        {/* Suggested Skills */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">
            Suggested {skillCategories?.find(cat => cat?.value === skillCategory)?.label}
          </h4>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills?.[skillCategory]?.map((suggestedSkill) => (
              <button
                key={suggestedSkill}
                onClick={() => addSuggestedSkill(suggestedSkill)}
                disabled={skills?.some(skill => skill?.name?.toLowerCase() === suggestedSkill?.toLowerCase())}
                className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full border border-border transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + {suggestedSkill}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Skills by Category */}
      {skillCategories?.map((category) => {
        const categorySkills = getSkillsByCategory(category?.value);
        if (categorySkills?.length === 0) return null;

        return (
          <div key={category?.value} className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Tag" size={16} className="text-primary" />
              <span>{category?.label}</span>
              <span className="text-sm text-muted-foreground">({categorySkills?.length})</span>
            </h3>
            <div className="space-y-3">
              {categorySkills?.map((skill) => (
                <div key={skill?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Skill Name"
                      type="text"
                      value={skill?.name}
                      onChange={(e) => updateSkill(skill?.id, 'name', e?.target?.value)}
                      className="mb-0"
                    />
                    <Select
                      label="Proficiency Level"
                      options={proficiencyLevels}
                      value={skill?.proficiency}
                      onChange={(value) => updateSkill(skill?.id, 'proficiency', value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => removeSkill(skill?.id)}
                    className="text-destructive hover:text-destructive ml-4"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {skills?.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-border">
          <Icon name="Zap" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No skills added yet</h3>
          <p className="text-muted-foreground">Start by adding your most relevant skills</p>
        </div>
      )}
    </div>
  );
};

export default SkillsStep;
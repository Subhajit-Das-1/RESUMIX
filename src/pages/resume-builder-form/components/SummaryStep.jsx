import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SummaryStep = ({ formData, updateFormData, errors }) => {
  const handleSummaryChange = (value) => {
    updateFormData('summary', value);
  };

  const summaryTemplates = [
    {
      title: 'Software Engineer',
      content: `Experienced software engineer with 5+ years of expertise in full-stack development using React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading cross-functional teams. Passionate about clean code, performance optimization, and mentoring junior developers.`
    },
    {
      title: 'Marketing Manager',
      content: `Results-driven marketing professional with 7+ years of experience in digital marketing, brand management, and campaign optimization. Successfully increased brand awareness by 150% and generated $2M+ in revenue through strategic marketing initiatives. Expert in data analytics, content strategy, and team leadership.`
    },
    {
      title: 'Project Manager',
      content: `Certified PMP with 6+ years of experience managing complex projects across technology and healthcare industries. Successfully delivered 50+ projects on time and within budget, leading teams of up to 15 members. Expertise in Agile methodologies, risk management, and stakeholder communication.`
    },
    {
      title: 'Data Analyst',
      content: `Detail-oriented data analyst with 4+ years of experience transforming complex datasets into actionable business insights. Proficient in Python, SQL, and Tableau with a strong background in statistical analysis and machine learning. Helped organizations increase efficiency by 25% through data-driven recommendations.`
    }
  ];

  const useTemplate = (template) => {
    handleSummaryChange(template?.content);
  };

  const wordCount = (formData?.summary || '')?.split(' ')?.filter(word => word?.length > 0)?.length;
  const charCount = (formData?.summary || '')?.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Professional Summary</h2>
          <p className="text-sm text-muted-foreground">Write a compelling summary that highlights your key strengths</p>
        </div>
      </div>
      {/* Summary Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Professional Summary
          </label>
          <textarea
            className="w-full min-h-[200px] px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder={`Write a compelling 3-4 sentence summary that highlights:\n• Your years of experience and key expertise\n• Major achievements or quantifiable results\n• Core skills and technologies you excel in\n• What makes you unique as a professional`}
            value={formData?.summary || ''}
            onChange={(e) => handleSummaryChange(e?.target?.value)}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              Aim for 50-150 words for optimal impact
            </p>
            <div className="flex space-x-4 text-xs text-muted-foreground">
              <span className={wordCount > 150 ? 'text-warning' : wordCount < 50 ? 'text-muted-foreground' : 'text-success'}>
                {wordCount} words
              </span>
              <span>{charCount} characters</span>
            </div>
          </div>
        </div>

        {/* Writing Tips */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h3 className="text-sm font-medium text-primary mb-2 flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} />
            <span>Writing Tips</span>
          </h3>
          <ul className="text-sm text-primary/80 space-y-1">
            <li>• Start with your years of experience and current role</li>
            <li>• Include 2-3 key skills or areas of expertise</li>
            <li>• Mention quantifiable achievements when possible</li>
            <li>• Keep it concise but impactful (3-4 sentences)</li>
            <li>• Use action words and avoid first-person pronouns</li>
          </ul>
        </div>
      </div>
      {/* Template Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Summary Templates</h3>
        <p className="text-sm text-muted-foreground">
          Get inspired by these examples or use them as starting points
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summaryTemplates?.map((template, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{template?.title}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Copy"
                  onClick={() => useTemplate(template)}
                >
                  Use This
                </Button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {template?.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* AI Writing Assistant Placeholder */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="Sparkles" size={20} className="text-accent" />
          <h3 className="font-medium text-foreground">AI Writing Assistant</h3>
          <span className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full">Coming Soon</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Our AI assistant will help you craft the perfect professional summary based on your experience and target role.
        </p>
      </div>
    </div>
  );
};

export default SummaryStep;
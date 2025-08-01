import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TemplateShowcase = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);

  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      category: 'Modern',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=600&fit=crop',
      description: 'Clean, contemporary design perfect for tech and creative industries',
      features: ['ATS Optimized', 'Modern Layout', 'Color Customizable']
    },
    {
      id: 2,
      name: 'Executive Classic',
      category: 'Classic',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=600&fit=crop',
      description: 'Traditional format ideal for corporate and executive positions',
      features: ['Professional', 'Traditional', 'Executive Level']
    },
    {
      id: 3,
      name: 'Creative Designer',
      category: 'Creative',
      image: 'https://images.unsplash.com/photo-1586281380614-67ca8b3f618c?w=400&h=600&fit=crop',
      description: 'Eye-catching design for creative professionals and designers',
      features: ['Creative Layout', 'Visual Appeal', 'Portfolio Ready']
    },
    {
      id: 4,
      name: 'Minimalist Pro',
      category: 'Minimal',
      image: 'https://images.unsplash.com/photo-1586281380923-93d9b5e8f9c4?w=400&h=600&fit=crop',
      description: 'Simple, elegant design that focuses on content over decoration',
      features: ['Clean Design', 'Content Focus', 'Versatile']
    }
  ];

  const nextTemplate = () => {
    setActiveTemplate((prev) => (prev + 1) % templates?.length);
  };

  const prevTemplate = () => {
    setActiveTemplate((prev) => (prev - 1 + templates?.length) % templates?.length);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose from our collection of expertly designed templates, each optimized for different industries and career levels
          </p>
          
          <Button
            variant="outline"
            size="default"
            iconName="Layout"
            iconPosition="left"
            asChild
          >
            <Link to="/template-selection">View All Templates</Link>
          </Button>
        </motion.div>

        {/* Desktop Carousel */}
        <div className="hidden lg:block">
          <div className="relative">
            <motion.div
              key={activeTemplate}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Template Preview */}
              <div className="relative">
                <div className="bg-card rounded-2xl p-8 shadow-floating border border-border">
                  <Image
                    src={templates?.[activeTemplate]?.image}
                    alt={templates?.[activeTemplate]?.name}
                    className="w-full h-auto rounded-lg shadow-elevated"
                  />
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevTemplate}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-floating flex items-center justify-center hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                
                <button
                  onClick={nextTemplate}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border border-border rounded-full shadow-floating flex items-center justify-center hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </div>

              {/* Template Details */}
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {templates?.[activeTemplate]?.category}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {templates?.[activeTemplate]?.name}
                </h3>
                
                <p className="text-muted-foreground text-lg mb-6">
                  {templates?.[activeTemplate]?.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {templates?.[activeTemplate]?.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-success" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  asChild
                >
                  <Link to="/template-selection">Use This Template</Link>
                </Button>
              </div>
            </motion.div>

            {/* Template Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {templates?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTemplate(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === activeTemplate ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-6">
          {templates?.map((template, index) => (
            <motion.div
              key={template?.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-soft border border-border hover:shadow-elevated transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <Image
                  src={template?.image}
                  alt={template?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  {template?.category}
                </div>
                
                <h3 className="font-semibold text-foreground mb-2">
                  {template?.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {template?.description}
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  asChild
                >
                  <Link to="/template-selection">Select Template</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
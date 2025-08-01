import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Engineer', 
      company: 'Google',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
              content: `RESUMIX helped me land my dream job at Google! The templates are professional and the builder is so intuitive. I created my resume in just 15 minutes and got 3 interview calls within a week.`,
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&h=400&fit=crop',
      location: 'San Francisco, CA'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Manager',
      company: 'Microsoft',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
              content: `The ATS optimization really works! My resume started getting through automated screening systems after using RESUMIX. The real-time preview feature saved me so much time.`,
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1586281380614-67ca8b3f618c?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1586281380923-93d9b5e8f9c4?w=300&h=400&fit=crop',
      location: 'Seattle, WA'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'Adobe',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
              content: `As a designer, I'm picky about layouts and typography. RESUMIX's templates are beautifully designed and professionally crafted. Highly recommend for creative professionals!`,
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=300&h=400&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop',
      location: 'Los Angeles, CA'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Project Manager',
      company: 'Amazon',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
              content: `I've tried many resume builders, but RESUMIX is by far the best. The step-by-step process is clear, and the final result looks incredibly professional. Worth every penny!`,
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=400&fit=crop',afterImage: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=400&fit=crop',location: 'Austin, TX'
    },
    {
      id: 5,
      name: 'Lisa Wang',role: 'Data Scientist',company: 'Netflix',avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
      content: `The mobile experience is fantastic! I was able to update my resume on my phone during my commute. The auto-save feature ensured I never lost my progress.`,
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=400&fit=crop',afterImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=400&fit=crop',location: 'New York, NY'
    },
    {
      id: 6,
      name: 'James Wilson',role: 'Sales Director',company: 'Salesforce',avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
              content: `RESUMIX transformed my career prospects. The professional templates and easy customization helped me stand out in a competitive market. Landed my current role within 2 weeks!`,
      rating: 5,
      beforeImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop',afterImage: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=300&h=400&fit=crop',location: 'Chicago, IL'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
        whileHover={{ scale: 1.2 }}
      >
        <Icon
          name="Star"
          size={16}
          className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      </motion.div>
    ));
  };

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              💬
            </motion.span>
            Success Stories
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by{' '}
            <motion.span
              className="text-primary relative"
              whileHover={{ scale: 1.05 }}
            >
              50,000+
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.span>{' '}
            Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our users say about their experience with RESUMIX from Rocket Resume
          </p>
        </motion.div>

        {/* Featured Testimonial with Before/After */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 shadow-floating border border-border max-w-5xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Before/After Resume Preview */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="absolute -top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Before
                      </div>
                      <Image
                        src={testimonials?.[activeTestimonial]?.beforeImage}
                        alt="Before Resume"
                        className="w-full h-48 object-cover rounded-lg opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <div className="absolute -top-2 left-2 z-10 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        After
                      </div>
                      <Image
                        src={testimonials?.[activeTestimonial]?.afterImage}
                        alt="After Resume"
                        className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <motion.div
                        className="absolute -top-3 -right-3 bg-success text-success-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        ✓
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Transformation Arrow */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon name="ArrowRight" size={20} />
                  </motion.div>
                </div>

                {/* Testimonial Content */}
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(testimonials?.[activeTestimonial]?.rating)}
                  </div>

                  <motion.blockquote
                    className="text-lg text-muted-foreground mb-6 leading-relaxed italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonials?.[activeTestimonial]?.content}"
                  </motion.blockquote>

                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <Image
                        src={testimonials?.[activeTestimonial]?.avatar}
                        alt={testimonials?.[activeTestimonial]?.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-primary/20"
                      />
                      <motion.div
                        className="absolute -bottom-1 -right-1 bg-success w-5 h-5 rounded-full border-2 border-background"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      />
                    </motion.div>
                    <div>
                      <div className="font-bold text-foreground">
                        {testimonials?.[activeTestimonial]?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials?.[activeTestimonial]?.role} at{' '}
                        <span className="text-primary font-semibold">
                          {testimonials?.[activeTestimonial]?.company}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Icon name="MapPin" size={12} />
                        {testimonials?.[activeTestimonial]?.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials?.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveTestimonial(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'w-12 h-3 bg-primary' :'w-3 h-3 bg-muted hover:bg-muted-foreground/30'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index === activeTestimonial && (
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid of Additional Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials?.slice(0, 6)?.map((testimonial, index) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              className="bg-card rounded-xl p-6 shadow-soft border border-border hover:shadow-elevated transition-all duration-300 cursor-pointer"
              onClick={() => setActiveTestimonial(index)}
            >
              {/* Company Logo Placeholder */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(testimonial?.rating)}
                </div>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {testimonial?.company}
                </div>
              </div>

              <blockquote className="text-muted-foreground mb-6 leading-relaxed text-sm line-clamp-4">
                "{testimonial?.content?.substring(0, 120)}..."
              </blockquote>

              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </motion.div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {testimonial?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial?.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'Shield', label: 'SSL Secured', color: 'text-green-500' },
              { icon: 'Lock', label: 'Privacy Protected', color: 'text-blue-500' },
              { icon: 'Award', label: 'Industry Approved', color: 'text-purple-500' },
              { icon: 'Users', label: '50K+ Users', color: 'text-orange-500' }
            ]?.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
              >
                <Icon name={badge?.icon} size={24} className={`${badge?.color}`} />
                <span className="text-sm font-medium text-muted-foreground">{badge?.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
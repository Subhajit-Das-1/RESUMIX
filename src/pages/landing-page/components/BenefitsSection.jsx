import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BenefitsSection = () => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const benefits = [
    {
      id: 1,
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Create professional resumes in under 10 minutes with our intuitive step-by-step builder.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      gradient: 'from-yellow-400/20 to-orange-500/20'
    },
    {
      id: 2,
      icon: 'Shield',
      title: 'ATS Optimized',
      description: 'All templates are designed to pass Applicant Tracking Systems and get you noticed by recruiters.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      gradient: 'from-green-400/20 to-emerald-500/20'
    },
    {
      id: 3,
      icon: 'Palette',
      title: 'Professional Templates',
      description: 'Choose from expertly designed templates that make you stand out while maintaining professionalism.',
      image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&h=300&fit=crop',
      gradient: 'from-purple-400/20 to-pink-500/20'
    },
    {
      id: 4,
      icon: 'Eye',
      title: 'Real-time Preview',
      description: 'See your resume update instantly as you type. What you see is exactly what you get.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      gradient: 'from-blue-400/20 to-indigo-500/20'
    },
    {
      id: 5,
      icon: 'Download',
      title: 'Instant Download',
      description: 'Download your resume as a high-quality PDF ready for job applications and printing.',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop',
      gradient: 'from-teal-400/20 to-cyan-500/20'
    },
    {
      id: 6,
      icon: 'Smartphone',
      title: 'Mobile Friendly',
      description: 'Build and edit your resume on any device. Your progress is automatically saved.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      gradient: 'from-rose-400/20 to-red-500/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mr-2"
            >
              ⚡
            </motion.span>
            Why Choose Us
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose{' '}
            <motion.span
              className="text-primary relative"
              whileHover={{ scale: 1.05 }}
            >
              RESUMIX?
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Everything you need to create a standout resume that gets you hired faster. 
            Trusted by professionals worldwide.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits?.map((benefit, index) => (
            <motion.div
              key={benefit?.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-elevated transition-all duration-500 transform-gpu perspective-1000"
            >
              {/* Background Image with Overlay */}
              <div className={`relative h-48 bg-gradient-to-br ${benefit?.gradient} overflow-hidden`}>
                <Image
                  src={benefit?.image}
                  alt={benefit?.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Floating Icon */}
                <motion.div
                  className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon 
                    name={benefit?.icon} 
                    size={32} 
                    className="text-primary group-hover:text-accent transition-colors duration-300"
                  />
                </motion.div>

                {/* Animated particles */}
                <motion.div
                  className="absolute top-1/2 right-6 w-2 h-2 bg-white/60 rounded-full"
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.3 
                  }}
                />
                <motion.div
                  className="absolute bottom-8 right-12 w-1 h-1 bg-white/40 rounded-full"
                  animate={{ 
                    y: [0, -15, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: index * 0.2 
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="p-8">
                <motion.h3 
                  className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                  layoutId={`title-${benefit?.id}`}
                >
                  {benefit?.title}
                </motion.h3>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {benefit?.description}
                </motion.p>

                {/* Hover indicator */}
                <motion.div
                  className="mt-6 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  Learn more
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '50K+', label: 'Resumes Created', icon: '📄' },
            { number: '98%', label: 'Success Rate', icon: '🎯' },
            { number: '4.9★', label: 'User Rating', icon: '⭐' },
            { number: '24/7', label: 'Support', icon: '💬' }
          ]?.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
            >
              <motion.div
                className="text-2xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat?.icon}
              </motion.div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.number}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
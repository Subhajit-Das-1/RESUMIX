import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev?.clientX, y: ev?.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const heroImages = [
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=800&fit=crop',
    'https://images.unsplash.com/photo-1586281380614-67ca8b3f618c?w=600&h=800&fit=crop'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages?.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16 overflow-hidden min-h-screen">
      {/* Enhanced Background Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition?.x * 0.02,
            y: mousePosition?.y * 0.02 + 80,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition?.x * -0.03,
            y: mousePosition?.y * -0.03,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 40 }}
        />
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-40 right-1/4 w-4 h-4 bg-primary rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 w-6 h-6 bg-accent rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Content with Enhanced Animations */}
          <motion.div
            style={{ y: textY }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mr-2"
              >
                🚀
              </motion.span>
              AI-Powered Resume Builder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Build Your{' '}
              <motion.span 
                className="text-primary relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Perfect
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                />
              </motion.span>{' '}
              Resume in Minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Create professional, ATS-friendly resumes with our intuitive builder. 
              Choose from premium templates, get real-time preview, and download instantly. 
              <motion.span 
                className="text-primary font-semibold"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                No design skills required.
              </motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="default"
                  size="lg"
                  iconName="Rocket"
                  iconPosition="left"
                  asChild
                  className="text-lg px-8 py-4"
                >
                  <Link to="/template-selection">Create My Resume</Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="text-lg px-8 py-4"
                >
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Trust Indicators with Photos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[
                    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                  ]?.map((avatar, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    >
                      <Image
                        src={avatar}
                        alt="User"
                        className="w-10 h-10 rounded-full border-3 border-background shadow-lg"
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  <strong>50,000+</strong> resumes created
                </motion.span>
              </div>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐⭐⭐⭐⭐
                </motion.div>
                <span><strong>4.9/5</strong> rating</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Hero Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-card rounded-xl sm:rounded-2xl shadow-floating p-2 sm:p-3 lg:p-4 border border-border overflow-hidden max-w-xs sm:max-w-sm lg:max-w-md">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)",
                    "linear-gradient(45deg, rgba(168, 85, 247, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
                    "linear-gradient(45deg, rgba(236, 72, 153, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="transform-gpu perspective-1000"
                >
                  <Image
                    src={heroImages?.[currentImageIndex]}
                    alt="Professional Resume Preview"
                    className="w-full h-auto rounded-2xl shadow-elevated transform hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
                
                {/* Image Indicators */}
                <div className="absolute bottom-1 sm:bottom-2 lg:bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-0.5 sm:space-x-1">
                  {heroImages?.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-primary w-2 sm:w-3' : 'bg-white/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 bg-success text-success-foreground px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1.5 rounded-md sm:rounded-lg text-xs font-bold shadow-floating border border-success/20"
                whileHover={{ scale: 1.02, rotate: 1 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✓
                </motion.span>{' '}
                <span className="hidden sm:inline">ATS Optimized</span>
                <span className="sm:hidden">ATS</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.7 }}
                className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 bg-primary text-primary-foreground px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1.5 rounded-md sm:rounded-lg text-xs font-bold shadow-floating border border-primary/20"
                whileHover={{ scale: 1.02, rotate: -1 }}
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-1"
                >
                  📄
                </motion.span>
                <span className="hidden sm:inline">PDF Ready</span>
                <span className="sm:hidden">PDF</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: [0, 3, 0]
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.9,
                  x: { duration: 3, repeat: Infinity }
                }}
                className="absolute top-1/2 right-2 sm:right-3 lg:right-4 bg-accent text-accent-foreground px-1 py-0.5 sm:px-1.5 sm:py-1 lg:px-2 lg:py-1 rounded-md sm:rounded-lg text-xs font-medium shadow-floating"
              >
                <span className="hidden sm:inline">💼 Professional</span>
                <span className="sm:hidden">💼</span>
              </motion.div>
            </div>

            {/* Additional decorative elements */}
            <motion.div
              className="absolute -z-10 top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-full blur-md sm:blur-lg"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
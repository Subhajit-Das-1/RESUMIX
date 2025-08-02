import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CTASection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev?.clientX, y: ev?.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const successPhotos = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop&crop=face'
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-accent relative overflow-hidden">
      {/* Enhanced Background Pattern with Interactive Elements */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 border border-white rounded-full"
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Interactive mouse-following elements */}
        <motion.div
          className="absolute w-6 h-6 bg-white/30 rounded-full blur-sm"
          animate={{
            x: mousePosition?.x * 0.02,
            y: mousePosition?.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
        <motion.div
          className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm"
          animate={{
            x: mousePosition?.x * -0.01 + 100,
            y: mousePosition?.y * -0.01 + 200,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 40 }}
        />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      </motion.div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Success Photos Carousel */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="flex -space-x-4">
                  {successPhotos?.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, y: 50 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        zIndex: 10,
                        rotate: index % 2 === 0 ? 5 : -5
                      }}
                      className="relative"
                    >
                      <Image
                        src={photo}
                        alt="Success Story"
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <span className="text-white text-xs font-bold">✓</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating success indicators */}
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-primary text-sm font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ delay: 1, duration: 2, repeat: Infinity }}
                >
                  🎉 Just got hired!
                </motion.div>
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6"
            >
              Ready to Build Your{' '}
              <motion.span
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Dream Resume?
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-4 bg-white/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </motion.span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Join thousands of professionals who have successfully landed their dream jobs 
              using our powerful resume builder. Your success story starts here!
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-white to-yellow-200 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <Button
                variant="secondary"
                size="xl"
                iconName="Rocket"
                iconPosition="left"
                asChild
                className="relative text-lg px-10 py-5 bg-white text-primary hover:bg-white/90 font-bold shadow-xl"
              >
                <Link to="/template-selection">
                  <motion.span
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Start Building Now
                  </motion.span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-white/50 to-transparent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <Button
                variant="outline"
                size="xl"
                iconName="FileText"
                iconPosition="left"
                className="relative text-lg px-10 py-5 border-2 border-white text-white hover:bg-white/10 font-bold backdrop-blur-sm"
                asChild
              >
                <Link to="/saved-resumes-dashboard">View My Resumes</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Features List with Icons and Animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid sm:grid-cols-3 gap-8 text-white/90 mb-12"
          >
            {[
              { icon: 'Clock', text: 'Ready in 10 minutes', color: 'from-yellow-400 to-orange-500' },
              { icon: 'Download', text: 'Instant PDF download', color: 'from-green-400 to-blue-500' },
              { icon: 'Shield', text: 'ATS optimized', color: 'from-purple-400 to-pink-500' }
            ]?.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${feature?.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  <Icon name={feature?.icon} size={24} className="text-white" />
                </motion.div>
                <span className="font-medium text-center">{feature?.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Live Stats Counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: '50,247', label: 'Resumes Created', icon: '📄' },
              { number: '15,893', label: 'Jobs Landed', icon: '🎯' },
              { number: '4.9★', label: 'Average Rating', icon: '⭐' },
              { number: '< 10min', label: 'Average Time', icon: '⚡' }
            ]?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: 1.2 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
              >
                <motion.div
                  className="text-2xl mb-2"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {stat?.icon}
                </motion.div>
                <motion.div
                  className="text-2xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  {stat?.number}
                </motion.div>
                <div className="text-sm text-white/80">{stat?.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 flex items-center justify-center gap-3 text-white/80 text-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔒
            </motion.div>
            <span>100% secure • No credit card required • Start for free</span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
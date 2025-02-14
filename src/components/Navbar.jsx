import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-white/80 backdrop-blur-md shadow-md py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img 
              src="/logo.webp" 
              alt="Accredian" 
              className="h-12 w-auto transition-transform duration-300 hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button 
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden 
                text-base font-medium rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 
                text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Login</span>
        
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 
                opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          
              <div className="absolute inset-0 border-2 border-white/10 rounded-lg 
                group-hover:border-white/20 transition-all duration-500" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600/20 to-blue-600/0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </motion.nav>
  );
};

export default Navbar;
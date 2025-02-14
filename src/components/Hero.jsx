import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { motion } from "framer-motion";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          className="flex flex-col items-center text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold"
            variants={childVariants}
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent relative">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 blur-xl"></span>
              Let's Learn
            </span>
            <br />
            <span className="text-gray-800 inline-block">&</span>
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent relative ml-2">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 blur-xl"></span>
              Earn
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl relative"
            variants={childVariants}
          >
            Get a chance to earn{" "}
            <span className="font-bold text-blue-600 relative inline-block">
              ₹10,000
              <span className="absolute inset-0 bg-blue-100 rounded-full blur opacity-50 -z-10"></span>
            </span>{" "}
            for every friend who enrolls!
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8"
            variants={childVariants}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-lg 
                       shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="relative z-10">Refer Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-lg 
                       hover:bg-blue-50 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-blue-100 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-lg opacity-20 animate-float animation-delay-2000"></div>
    </div>
  );
};

export default Hero;
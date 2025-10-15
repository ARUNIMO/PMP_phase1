
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 40);
    
    return () => clearInterval(timer);
  }, []);
  
  const ballVariants = {
    initial: { 
      scale: 0, 
      rotate: 0 
    },
    animate: { 
      scale: 1,
      rotate: 360,
      transition: { 
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const // Fix the TypeScript error by adding 'as const'
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-turf-900 to-sport-900 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-3xl md:text-4xl font-bold mb-10"
      >
        PickMyPitch
      </motion.div>
      
      <div className="flex gap-4 mb-12">
        {['football', 'basketball', 'cricket'].map((sport, index) => (
          <motion.div
            key={sport}
            variants={ballVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.2 }}
            className={`w-6 h-6 rounded-full ${
              sport === 'football' 
                ? 'bg-white' 
                : sport === 'basketball' 
                  ? 'bg-orange-500' 
                  : 'bg-red-500'
            }`}
          />
        ))}
      </div>
      
      <div className="w-64 md:w-80 bg-gray-700 h-2 rounded-full overflow-hidden mb-3">
        <motion.div 
          className="h-full bg-gradient-to-r from-turf-500 to-sport-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <motion.div 
        className="text-white text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading your perfect pitch...
      </motion.div>
    </div>
  );
};

export default LoadingScreen;

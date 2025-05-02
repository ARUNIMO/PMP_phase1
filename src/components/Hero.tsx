
import { useState, useEffect } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = ['Play.', 'Compete.', 'Win.', 'Score.', 'Celebrate.'];
  
  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 150;
    const delayBetweenPhrases = 1500;
    
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        
        if (displayText.length === currentPhrase.length) {
          // Wait before starting to delete
          setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenPhrases);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting, phrases]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="relative min-h-screen flex items-center bg-turf-pattern">
      <div className="absolute inset-0 bg-hero-gradient"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      <motion.div 
        className="container relative z-10 text-white"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            className="h-12 md:h-16 mb-4 text-turf-300 text-3xl md:text-5xl font-bold"
            variants={item}
          >
            <span className="inline-block border-r-4 border-turf-400 animate-pulse">
              {displayText}
            </span>
          </motion.div>
        
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
            variants={item}
          >
            Find Your Perfect <span className="text-turf-300">Pitch</span> in Tamil Nadu
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-200"
            variants={item}
          >
            Book top-quality sports grounds for football, cricket, tennis, and more.
            No hassle, just play.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center" 
            variants={item}
          >
            <Button 
              size="lg" 
              className="bg-turf-500 hover:bg-turf-600 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" 
              asChild
            >
              <Link to="/book-turf">
                Book Now
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105" 
              asChild
            >
              <Link to="/about">
                About Us
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button 
            onClick={scrollToFeatures} 
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Scroll to features"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDownCircle size={36} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

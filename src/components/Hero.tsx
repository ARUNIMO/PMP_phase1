import { useState, useEffect } from 'react';
import { ArrowDownCircle, Search, Trophy, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TurfBg from '../assets/images/turf-bg.jpg';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const phrases = ['PLAY.', 'COMPETE.', 'WIN.'];

  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 150;
    const delayBetweenPhrases = 1500;

    const currentPhrase = phrases[currentPhraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
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

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const sport = (document.getElementById('sport') as HTMLSelectElement).value;
    const location = (document.getElementById('location') as HTMLSelectElement).value;
    if (sport && location) {
      navigate(`/book-turf?sport=${sport}&location=${location}`);
    } else {
        navigate('/book-turf');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="relative h-screen flex flex-col justify-between items-center overflow-hidden bg-pitch-navy">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url(${TurfBg})`,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      ></div>
      <div className="absolute inset-0 hero-gradient"></div>

      {/* Main Content */}
      <motion.div 
        className="container relative z-10 text-white px-4 pt-32 w-full flex-grow flex flex-col items-center justify-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-4xl mx-auto text-center w-full">
          <motion.div className="h-12 md:h-16 mb-4 text-pitch-orange text-3xl md:text-5xl font-bold tracking-widest uppercase" variants={item}>
            <span className="inline-block border-r-4 border-pitch-orange animate-pulse pr-2">
              {displayText}
            </span>
          </motion.div>

          <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight lg:-tracking-[0.04em]" variants={item}>
            Find Your Perfect <span className="text-pitch-teal-light">Pitch</span><br className="hidden md:block"/> in Tamil Nadu
          </motion.h1>

          <motion.p className="text-xl md:text-2xl mb-12 text-gray-300 font-light max-w-2xl mx-auto" variants={item}>
            Book top-quality sports grounds for football, cricket, tennis, and more. No hassle, just play.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16 p-4 glass-card rounded-2xl mx-auto max-w-3xl shadow-2xl shadow-black/50"
            variants={item}
          >
            <div className="relative w-full sm:w-1/3">
              <select
                id="sport"
                className="w-full pl-5 pr-10 py-4 rounded-xl bg-pitch-navy-light/80 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-pitch-teal appearance-none transition-colors"
                defaultValue=""
              >
                <option value="" disabled className="bg-pitch-navy text-gray-400">Select Sport</option>
                <option value="football" className="bg-pitch-navy text-white">Football</option>
                <option value="cricket" className="bg-pitch-navy text-white">Cricket</option>
                <option value="tennis" className="bg-pitch-navy text-white">Tennis</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <div className="relative w-full sm:w-1/3">
              <select
                id="location"
                className="w-full pl-5 pr-10 py-4 rounded-xl bg-pitch-navy-light/80 text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-pitch-teal appearance-none transition-colors"
                defaultValue=""
              >
                <option value="" disabled className="bg-pitch-navy text-gray-400">Select City</option>
                <option value="chennai" className="bg-pitch-navy text-white">Chennai</option>
                <option value="coimbatore" className="bg-pitch-navy text-white">Coimbatore</option>
                <option value="madurai" className="bg-pitch-navy text-white">Madurai</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-1/3 h-14 text-lg bg-pitch-orange hover:bg-pitch-orange-hover text-white transition-all duration-300 shadow-xl shadow-pitch-orange/20 border-0 rounded-xl font-bold uppercase tracking-wide"
              onClick={handleSearch}
            >
              Find Turf
              <Search className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/10"
            variants={item}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-white font-bold text-2xl">
                 <Trophy className="text-pitch-orange w-6 h-6"/>
                 500+
              </div>
              <span className="text-gray-400 text-sm tracking-widest uppercase mt-1">Venues</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-white font-bold text-2xl">
                 <Users className="text-pitch-teal-light w-6 h-6"/>
                 20K+
              </div>
              <span className="text-gray-400 text-sm tracking-widest uppercase mt-1">Players</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-white font-bold text-2xl">
                 <Star className="text-yellow-400 w-6 h-6"/>
                 98%
              </div>
              <span className="text-gray-400 text-sm tracking-widest uppercase mt-1">Satisfaction</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Section */}
      <div className="relative z-10 text-center pb-8 w-full mt-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={scrollToFeatures}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center backdrop-blur-md"
            aria-label="Scroll to features"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDownCircle size={28} className="text-pitch-teal-light" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
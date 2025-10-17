import { useState, useEffect } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TurfBg from '../assets/images/turf-bg.jpg';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const phrases = ['Play.', 'Compete.', 'Win.', 'Score.', 'Celebrate.'];

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
    <div className="relative h-screen flex flex-col justify-between items-center bg-turf-pattern overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 172, 92, 0.82), rgba(2, 188, 221, 0.66)), url(${TurfBg})`,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}
      <motion.div 
        className="container relative z-10 text-white px-4 pt-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div className="h-12 md:h-16 mb-4 text-turf-300 text-3xl md:text-5xl font-bold py-16" variants={item}>
            <span className="inline-block border-r-4 border-turf-400 animate-pulse" style={{ color: 'rgb(2, 170, 221)' }}>
              {displayText}
            </span>
          </motion.div>

          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6" variants={item}>
            Find Your Perfect <span className="text-turf-300">Pitch</span> in Tamil Nadu
          </motion.h1>

          <motion.p className="text-lg md:text-xl mb-8 text-gray-200" variants={item}>
            Book top-quality sports grounds for football, cricket, tennis, and more.
            <br />
            No hassle, just play.
          </motion.p>

          {/* <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            variants={item}
          >
            <div className="w-full sm:w-auto">
              <select
                id="sport"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-turf-500 appearance-none"
              >
                <option value="" className="bg-gray-800 text-white">Select Sport</option>
                <option value="football" className="bg-gray-800 text-white">Football</option>
                <option value="cricket" className="bg-gray-800 text-white">Cricket</option>
                <option value="tennis" className="bg-gray-800 text-white">Tennis</option>
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <select
                id="location"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-turf-500 appearance-none"
              >
                <option value="" className="bg-gray-800 text-white">Select Location</option>
                <option value="chennai" className="bg-gray-800 text-white">Chennai</option>
                <option value="coimbatore" className="bg-gray-800 text-white">Coimbatore</option>
                <option value="madurai" className="bg-gray-800 text-white">Madurai</option>
              </select>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-turf-600 to-sport-600 hover:from-turf-700 hover:to-sport-700 text-white transition-all duration-300 hover:scale-[1.03] shadow-xl hover:shadow-2xl border-2 border-white/30 rounded-xl backdrop-blur-sm group"
              onClick={handleSearch}
            >
              Search
              <span className="ml-2 opacity-80 group-hover:opacity-100 transition-opacity">→</span>
            </Button>
          </motion.div> */}
        </div>
      </motion.div>

      {/* Bottom Section */}
      <div className="relative z-10 text-center pb-8 w-full">
        <motion.div 
          className="mb-6" 
          variants={item}
        >
          <Link 
            to="/about" 
            className="inline-flex items-center text-white hover:text-turf-300 transition-colors group py-[6px] px-3 rounded-lg border border-white/30 hover:bg-white/10"
          >
            Learn more about us
            <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button
            onClick={scrollToFeatures}
            className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center ml-[740px]"
            aria-label="Scroll to features"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDownCircle size={36} className="text-white" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
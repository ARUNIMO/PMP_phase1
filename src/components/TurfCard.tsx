import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';

interface TurfCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  price: number;
  sportTypes: string[];
  index: number;
}

const TurfCard = ({ id, name, location, rating, imageUrl, price, sportTypes, index }: TurfCardProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  // Slide-right animation on scroll with stacking effect
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        controls.start({
          x: 0,
          opacity: 1,
          position: 'static',
          transition: { duration: 0.5, delay: index * 0.2, ease: 'easeOut' }
        });
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [controls, index]);

  // Format price with commas for INR
  const formattedPrice = price.toLocaleString('en-IN');

  return (
    <motion.div
      ref={ref}
      initial={{ x: -300 + index * 5, opacity: 0, position: 'absolute', left: 0 }}
      animate={controls}
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: { duration: 0.3, ease: 'easeInOut' }
      }}
      className="relative glass-card rounded-xl overflow-hidden transition-all duration-300 w-full max-w-sm h-full min-h-[380px] mx-auto group hover:bg-white/5 hover:border-pitch-teal/30 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] flex flex-col"
      style={{
        cursor: 'pointer',
        transformOrigin: 'center bottom'
      }}
    >
      <motion.div 
        className="relative pb-[60%] overflow-hidden"
        whileHover={{
          scale: 1.07,
          transition: { duration: 1.0, ease: 'easeOut' }
        }}
      >
        <img 
          src={imageUrl} 
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-navy via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 right-4 bg-pitch-navy/70 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10 shadow-lg">
          <Star size={14} className="text-pitch-orange fill-pitch-orange" />
          <span className="font-semibold text-sm text-white">{rating.toFixed(1)}</span>
        </div>
      </motion.div>

      {/* Card content */}
      <div className="p-5 flex-1 flex flex-col relative z-20 -mt-6">
        <div className="flex items-start justify-between">
          <div className="max-w-[70%]">
            <h3 className="font-bold text-xl truncate text-white drop-shadow-md">{name}</h3>
            <div className="flex items-center text-gray-400 mt-1">
              <MapPin size={14} className="mr-1 text-pitch-teal" />
              <span className="text-sm truncate">{location}</span>
            </div>
          </div>
          <div className="text-right bg-pitch-navy/80 p-2 rounded-lg border border-white/5 shadow-inner">
            <p className="text-pitch-teal font-bold text-lg leading-none">₹{formattedPrice}</p>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">per hour</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 min-h-[30px]">
          {sportTypes.map((sport, i) => (
            <span key={i} className="text-[10px] font-semibold tracking-wide uppercase bg-pitch-teal/10 border border-pitch-teal/20 text-pitch-teal px-2 py-1 rounded-full">
              {sport}
            </span>
          ))}
        </div>

        <div className="border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-400">
              <Calendar size={14} className="mr-1.5 text-pitch-teal/70" />
              <span className="text-xs font-medium">Available today</span>
            </div>
            <div className="flex items-center text-gray-400 hidden sm:flex">
              <Clock size={14} className="mr-1.5 text-pitch-teal/70" />
              <span className="text-xs font-medium">8AM-10PM</span>
            </div>
          </div>
          <Button 
            size="sm" 
            className="rounded-full bg-pitch-teal hover:bg-pitch-teal/90 text-pitch-navy font-bold shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all duration-300"
            asChild
          >
            <Link to={`/book-turf/${id}`}>
              Book Turf
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TurfCard;
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
  const [isHovered, setIsHovered] = useState(false);
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
      className="relative bg-white dark:bg-dark-theme-lighter rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),0_4px_6px_-4px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5),0_4px_6px_-4px_rgba(0,0,0,0.4)] overflow-hidden transition-shadow duration-300 w-full max-w-sm h-[380px] mx-auto"
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
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-dark-theme-lightest px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-sm text-gray-900 dark:text-gray-200">{rating.toFixed(1)}</span>
        </div>
      </motion.div>

      {/* Card content with hover effects */}
      <div 
        className={cn(
          "p-3 transition-colors duration-300 flex-1 flex flex-col",
          isHovered ? "bg-gray-50 dark:bg-dark-theme-lighter" : "bg-white dark:bg-dark-theme-lighter"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between">
          <div className="max-w-[70%]">
            <h3 className="font-semibold text-xl truncate text-gray-900 dark:text-white">{name}</h3>
            <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm truncate">{location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-turf-700 dark:text-turf-400 font-bold">₹{formattedPrice}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm">per hour</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 min-h-[40px]">
          {sportTypes.map((sport, i) => (
            <span key={i} className="text-xs bg-turf-50 dark:bg-dark-theme-lightest text-turf-700 dark:text-turf-400 px-2 py-1 rounded-full">
              {sport}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3 p-2 mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar size={14} className="mr-1" />
              <span className="text-xs">Available today</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock size={14} className="mr-1" />
              <span className="text-xs">8AM - 10PM</span>
            </div>
          </div>
          <Button 
            size="sm" 
            className={cn(
              "rounded-full transition-colors duration-300",
              isHovered ? "bg-turf-600" : "bg-turf-500"
            )}
            asChild
          >
            <Link to={`/book-turf/${id}`}>
              Book
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TurfCard;
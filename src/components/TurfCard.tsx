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
      className="relative bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 w-full max-w-sm h-[380px] mx-auto"
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
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 z-10">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-sm">{rating.toFixed(1)}</span>
        </div>
      </motion.div>

      {/* Card content with hover effects */}
      <div 
        className={cn(
          "p-3 transition-colors duration-300 flex-1 flex flex-col", // Reduced padding from p-4 to p-3
          isHovered ? "bg-gray-50" : "bg-white"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between">
          <div className="max-w-[70%]">
            <h3 className="font-semibold text-xl truncate">{name}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm truncate">{location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-turf-700 font-bold">₹{formattedPrice}</p>
            <p className="text-gray-600 text-sm">per hour</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 min-h-[32px]"> {/* Reduced mt-3 to mt-2 */}
          {sportTypes.map((sport, i) => (
            <span key={i} className="text-xs bg-turf-50 text-turf-700 px-2 py-1 rounded-full">
              {sport}
            </span>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between mt-auto"> {/* Reduced mt-4 to mt-3 and pt-4 to pt-3 */}
          <div className="flex items-center gap-2"> {/* Reduced gap-3 to gap-2 */}
            <div className="flex items-center text-gray-600">
              <Calendar size={14} className="mr-1" />
              <span className="text-xs">Available today</span>
            </div>
            <div className="flex items-center text-gray-600">
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
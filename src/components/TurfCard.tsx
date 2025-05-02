
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TurfCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  price: number;
  sportTypes: string[];
}

const TurfCard = ({ id, name, location, rating, imageUrl, price, sportTypes }: TurfCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="turf-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-52">
        <img 
          src={imageUrl} 
          alt={name} 
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : ""
          )}
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-sm">{rating}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-xl">{name}</h3>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-turf-700 font-bold">${price}</p>
            <p className="text-gray-500 text-sm">per hour</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {sportTypes.map((sport, index) => (
            <span 
              key={index} 
              className="text-xs bg-turf-50 text-turf-700 px-2 py-1 rounded-full"
            >
              {sport}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-gray-500">
              <Calendar size={14} className="mr-1" />
              <span className="text-xs">Available today</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock size={14} className="mr-1" />
              <span className="text-xs">8AM - 10PM</span>
            </div>
          </div>
          <Button size="sm" className="rounded-full" asChild>
            <Link to={`/book-turf/${id}`}>
              Book
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;

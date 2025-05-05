import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  Calendar, Clock, CreditCard, MapPin, Shield, 
  Star, MessageCircle, Zap, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Features = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);
  const CARD_WIDTH = 480; // Width of each card
  const CARD_HEIGHT = 320; // Height of each card
  const GAP = 8; // Reduced gap between cards from 16 to 8
  const totalCardWidth = CARD_WIDTH + GAP;

  const featuresList = [
    {
      icon: <Calendar className="h-8 w-8 text-turf-600" />,
      title: 'Easy Booking',
      description: 'Book your favorite turf in just a few clicks, anytime, anywhere in Tamil Nadu.',
    },
    {
      icon: <Clock className="h-8 w-8 text-turf-600" />,
      title: 'Real-time Availability',
      description: 'See available slots in real-time and secure your spot instantly.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-turf-600" />,
      title: 'Secure Payments',
      description: 'Multiple payment options with secure and transparent transactions.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-turf-600" />,
      title: 'Location-based Search',
      description: 'Find turfs near you with our smart location-based search across Tamil Nadu.',
    },
    {
      icon: <Shield className="h-8 w-8 text-turf-600" />,
      title: 'Verified Venues',
      description: 'All our turfs are verified for quality and amenities.',
    },
    {
      icon: <Star className="h-8 w-8 text-turf-600" />,
      title: 'Ratings & Reviews',
      description: 'Make informed decisions based on genuine user feedback.',
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-turf-600" />,
      title: 'Instant Confirmation',
      description: 'Get booking confirmations and updates instantly.',
    },
    {
      icon: <Zap className="h-8 w-8 text-turf-600" />,
      title: 'Special Offers',
      description: 'Enjoy exclusive discounts and offers on regular bookings.',
    },
  ];

  const showLeftArrow = activeIndex > 0;
  const showRightArrow = activeIndex < featuresList.length - 1; 

  // Fix for initial positioning and responsive behavior
  useEffect(() => {
    const updatePosition = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.clientWidth;
        const targetX = (containerWidth / 2 - CARD_WIDTH / 2) - activeIndex * totalCardWidth;
        
        // Add smooth animation here
        animate(x, targetX, {
          type: "spring",
          stiffness: 300,
          damping: 30,
          restDelta: 0.001
        });
      }
    };
  
    const observer = new ResizeObserver(updatePosition);
  
    if (sliderRef.current) {
      updatePosition(); // Initial call
      observer.observe(sliderRef.current);
    }
  
    return () => observer.disconnect();
  }, [activeIndex, x]);
  
  const handleDragEnd = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const currentX = x.get();
      const i = Math.round(((containerWidth / 2 - CARD_WIDTH / 2) - currentX) / totalCardWidth);
      const clampedI = Math.max(0, Math.min(i, featuresList.length - 1));
      
      // Add smooth transition when dragging ends
      setActiveIndex(clampedI);
    }
  };
  
  const handlePrev = () => {
    setActiveIndex(prev => {
      const newIndex = Math.max(0, prev - 1);
      return newIndex;
    });
  };
  
  const handleNext = () => {
    setActiveIndex(prev => {
      const newIndex = Math.min(featuresList.length - 1, prev + 1);
      return newIndex;
    });
  };

  return (
    <section id="features" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PickMyPitch?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a seamless booking experience with premium features 
            designed to make your sporting experience exceptional.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto" ref={sliderRef}>
          {showLeftArrow && (
            <button
              className="absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
              onClick={handlePrev}
              aria-label="Previous feature"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          <div className="overflow-hidden pb-6">
            <motion.div
              style={{ x }}
              drag="x"
              dragConstraints={{
                left: -totalCardWidth * (featuresList.length - 1),
                right: totalCardWidth,
              }}
              onDragEnd={handleDragEnd}
              className="flex gap-2 cursor-grab active:cursor-grabbing" // Reduced gap-4 to gap-2
            >
              {featuresList.map((feature, index) => {
                const cardScale = useTransform(x, (currentX) => {
                  const containerCenter = (sliderRef.current?.clientWidth || 0) / 2;
                  const cardCenter = (index * totalCardWidth) + (CARD_WIDTH / 2) + currentX;
                  const distanceFromCenter = Math.abs(containerCenter - cardCenter);
                  const scaleAmount = Math.max(0.85, 1 - (distanceFromCenter / CARD_WIDTH) * 0.3);
                  return scaleAmount;
                });

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      scale: cardScale,
                      height: CARD_HEIGHT,
                    }}
                    className="w-[500px] flex-shrink-0 bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center justify-center"
                  >
                    <div className="mb-6 p-4 bg-turf-50 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 text-lg px-4">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {showRightArrow && (
            <button
              className="absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10"
              onClick={handleNext}
              aria-label="Next feature"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Features;
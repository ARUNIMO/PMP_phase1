
import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Calendar, Clock, CreditCard, MapPin, Shield, 
  Star, MessageCircle, Zap 
} from 'lucide-react';

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const featuresList = [
    {
      icon: <Calendar className="feature-icon" />,
      title: 'Easy Booking',
      description: 'Book your favorite turf in just a few clicks, anytime, anywhere in Tamil Nadu.',
    },
    {
      icon: <Clock className="feature-icon" />,
      title: 'Real-time Availability',
      description: 'See available slots in real-time and secure your spot instantly.',
    },
    {
      icon: <CreditCard className="feature-icon" />,
      title: 'Secure Payments',
      description: 'Multiple payment options with secure and transparent transactions.',
    },
    {
      icon: <MapPin className="feature-icon" />,
      title: 'Location-based Search',
      description: 'Find turfs near you with our smart location-based search across Tamil Nadu.',
    },
    {
      icon: <Shield className="feature-icon" />,
      title: 'Verified Venues',
      description: 'All our turfs are verified for quality and amenities.',
    },
    {
      icon: <Star className="feature-icon" />,
      title: 'Ratings & Reviews',
      description: 'Make informed decisions based on genuine user feedback.',
    },
    {
      icon: <MessageCircle className="feature-icon" />,
      title: 'Instant Confirmation',
      description: 'Get booking confirmations and updates instantly.',
    },
    {
      icon: <Zap className="feature-icon" />,
      title: 'Special Offers',
      description: 'Enjoy exclusive discounts and offers on regular bookings.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50" ref={featuresRef}>
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PickMyPitch?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a seamless booking experience with premium features 
            designed to make your sporting experience exceptional.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {featuresList.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white p-6 rounded-xl shadow-md transition-all border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-turf-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

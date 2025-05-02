
import { useEffect, useRef } from 'react';
import { motion, useScroll, useAnimation, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, MessageCircle, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import TurfCard from '@/components/TurfCard';

const Index = () => {
  const featuredTurfsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (featuredTurfsRef.current) {
      observer.observe(featuredTurfsRef.current);
    }

    return () => {
      if (featuredTurfsRef.current) {
        observer.unobserve(featuredTurfsRef.current);
      }
    };
  }, [controls]);

  const featuredTurfs = [
    {
      id: '1',
      name: 'Green Valley Stadium',
      location: 'T. Nagar, Chennai',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
      price: 1500,
      sportTypes: ['Football', 'Rugby'],
    },
    {
      id: '2',
      name: 'Urban Sports Arena',
      location: 'Anna Nagar, Chennai',
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
      price: 1800,
      sportTypes: ['Football', 'Basketball'],
    },
    {
      id: '3',
      name: 'Central Cricket Ground',
      location: 'Coimbatore',
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
      price: 2200,
      sportTypes: ['Cricket'],
    },
    {
      id: '4',
      name: 'Tennis Paradise',
      location: 'Adyar, Chennai',
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1622279457486-28f993f78ade?w=800&q=80',
      price: 1200,
      sportTypes: ['Tennis', 'Badminton'],
    },
  ];

  const howItWorks = [
    {
      icon: <Search className="w-12 h-12 text-sport-500" />,
      title: 'Find a Turf',
      description: 'Browse through our collection of premium sports turfs in Tamil Nadu and filter based on your requirements.',
    },
    {
      icon: <Calendar className="w-12 h-12 text-sport-500" />,
      title: 'Book Your Slot',
      description: 'Select your preferred date and time slot, and make a secure payment to confirm your booking.',
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-sport-500" />,
      title: 'Get Confirmation',
      description: 'Receive instant confirmation and reminders for your upcoming booking.',
    },
    {
      icon: <Users className="w-12 h-12 text-sport-500" />,
      title: 'Play & Enjoy',
      description: 'Arrive at the venue with your team, use the facilities, and enjoy your game!',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh K.',
      role: 'Football Enthusiast',
      quote: 'PickMyPitch made it super easy to find and book a football ground in Chennai for our weekend matches. Great service!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Divya M.',
      role: 'Tennis Player',
      quote: 'I\'ve been booking tennis courts through PickMyPitch for months now. The process is seamless and the venues are top-notch.',
      rating: 4,
    },
    {
      id: 3,
      name: 'Suresh T.',
      role: 'Cricket Team Captain',
      quote: 'Managing bookings for my entire team has never been easier. The dashboard is intuitive and the customer support is excellent.',
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.div style={{ opacity }}>
        <Navbar />
      </motion.div>
      <Hero />
      <Features />

      {/* Featured Turfs */}
      <section className="py-16 bg-white" ref={featuredTurfsRef}>
        <div className="container">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold">Featured Turfs</h2>
              <p className="text-gray-600 mt-2">Explore our most popular sports venues in Tamil Nadu</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button 
                variant="outline" 
                className="hidden md:flex items-center gap-1 hover:bg-turf-50 hover:text-turf-600 hover:border-turf-200 transition-all" 
                asChild
              >
                <Link to="/book-turf">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {featuredTurfs.map((turf, index) => (
              <motion.div 
                key={turf.id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <TurfCard {...turf} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-8 text-center md:hidden"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Button variant="outline" asChild>
                <Link to="/book-turf">View All Turfs</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              Booking a sports turf with us is quick and easy. Follow these simple steps.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {howItWorks.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="bg-white p-4 rounded-full shadow-md mb-4"
                  whileHover={{ 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
              Don't take our word for it – here's what sports enthusiasts in Tamil Nadu have to say about our platform.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="absolute -top-4 -left-4 bg-turf-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  "
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < testimonial.rating} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-turf-700 to-sport-700 text-white">
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Sports Venue?</h2>
            <p className="text-lg mb-8 text-white/90">
              Join thousands of sports enthusiasts across Tamil Nadu who book their perfect playing field with PickMyPitch.
            </p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-white text-turf-700 hover:bg-gray-100 shadow-lg btn-hover-glow" asChild>
                  <Link to="/book-turf">
                    Book Now
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 shadow-lg" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Star component for testimonials
const Star = ({ filled }: { filled: boolean }) => {
  return (
    <svg 
      className={`w-4 h-4 ${filled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
};

export default Index;

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useAnimation, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Calendar, MessageCircle, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import TurfCard from '@/components/TurfCard';
import Logo1 from '@/assets/logos/Logo-1.png';
import Logo2 from '@/assets/logos/Logo-2.png';
import Logo3 from '@/assets/logos/Logo-3.png';

const Index = () => {
  const featuredTurfsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 1], [1, 0.2]);

  // Theme state synced with Navbar
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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
      name: 'Foot Work',
      location: 'Kallimadai, Coimbatore',
      rating: 4.8,
      imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npFDLq_ymnmxbwTpTSgxmmk3vokbpjmfGCDicIWv4DV3FaIp_ds57eVCJjnH8kPwNB9bEackwj7TgmolKkoOzMjpgf2httzmFCFpOKsy4KWCSSLSUpX5Qz4AZeeWz_VBCWMfQCABQ=s0',
      price: 1500,
      sportTypes: ['Football'],
    },
    {
      id: '2',
      name: 'Sports Training & Fitness Unit',
      location: 'Koundampalayam, Coimbatore',
      rating: 4.6,
      imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipM0tpJkCZj8tusXgafhjxaqPcxoBGJoJI55X3-1',
      price: 1400,
      sportTypes: ['Football', 'Basketball', 'Frisbee', 'Crossfit'],
    },
    {
      id: '3',
      name: 'Tiki Taka',
      location: 'T.Nagar, Chennai',
      rating: 4.7,
      imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipP9ITtkorTsrLbWsHt6BUxS2GeguxK5n-S1jdjZ',
      price: 1500,
      sportTypes: ['Cricket', 'Football'],
    },
    {
      id: '4',
      name: 'Game On Sports Arena',
      location: 'Egmore, Chennai',
      rating: 4.8,
      imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqVVijXJ2gXawJVrgpeXRKCSnI3rF-xUPRSd1X17X94VJ-gzO4xLqQBmA13fFNaSJNsFM2kBTAW7tE-Q2qVriYzCuiiB7oNeDHxHhQNSvsUbSv06A-1bee1roou1oBinNrQ3iw1',
      price: 1500,
      sportTypes: ['Cricket', 'Football'],
    },
  ];

  const howItWorks = [
    {
      icon: <Search className="w-10 h-10 sm:w-12 sm:h-12 text-sport-500 dark:text-sport-300" />,
      title: 'Find a Turf',
      description: 'Browse through our collection of premium sports turfs in Tamil Nadu and filter based on your requirements.',
    },
    {
      icon: <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-sport-500 dark:text-sport-300" />,
      title: 'Book Your Slot',
      description: 'Select your preferred date and time slot, and make a secure payment to confirm your booking.',
    },
    {
      icon: <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-sport-500 dark:text-sport-300" />,
      title: 'Get Confirmation',
      description: 'Receive instant confirmation and reminders for your upcoming booking.',
    },
    {
      icon: <Users className="w-10 h-10 sm:w-12 sm:h-12 text-sport-500 dark:text-sport-300" />,
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
      id: '2',
      name: 'Divya M.',
      role: 'Tennis Player',
      quote: "I've been booking tennis courts through PickMyPitch for months now. The process is seamless and the venues are top-notch.",
      rating: 4,
    },
    {
      id: '3',
      name: 'Suresh T.',
      role: 'Cricket Team Captain',
      quote: 'Managing bookings for my entire team has never been easier. The dashboard is intuitive and the customer support is excellent.',
      rating: 5,
    },
  ];

  // Turf logos for the carousel
  const turfLogos = [
    {
      name: 'Brand 1',
      logoUrl: Logo1,
    },
    {
      name: 'Brand 2',
      logoUrl: Logo2,
    },
    {
      name: 'Brand 3',
      logoUrl: Logo3,
    },
    {
      name: 'Brand 4',
      logoUrl: Logo1,
    },
    {
      name: 'Brand 5',
      logoUrl: Logo2,
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

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  const getDimensions = () => {
    if (!logoRef.current || !containerRef.current) return { logoWidth: 80, gap: 16, singleSetWidth: 0 };
    
    const logoWidth = logoRef.current.offsetWidth;
    const containerStyle = window.getComputedStyle(containerRef.current);
    const gap = parseFloat(containerStyle.gap) || 16;
    const n = turfLogos.length;
    const singleSetWidth = (n * logoWidth) + ((n - 1) * gap);
    return { logoWidth, gap, singleSetWidth };
  };

  const y = useTransform(x, (val) => {
    const { singleSetWidth } = getDimensions();
    return Math.sin((val / singleSetWidth) * Math.PI * 2) * 1;
  });

  useEffect(() => {
    const { singleSetWidth } = getDimensions();
    x.set(0); // Initialize once
  }, []);

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      if (!isPaused) {
        const { singleSetWidth } = getDimensions();
        const currentX = x.get();
        const newX = currentX - 0.75;
        if (newX <= -singleSetWidth) {
          x.set(newX + singleSetWidth);
        } else {
          x.set(newX);
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, [isPaused]);

  const handleHover = (shouldPause: boolean) => {
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      setIsPaused(shouldPause);
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-theme-lighter">
      <motion.div style={{ opacity }} className="fixed w-full z-50">
        <Navbar onThemeChange={handleThemeChange} />
      </motion.div>
      <Hero />
      <Features />

      {/* Featured Turfs */}
      <section className="py-8 sm:py-16 bg-gray-50 dark:bg-dark-theme-lighter" ref={featuredTurfsRef}>
        <div className="container px-2 sm:px-4">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Featured Turfs</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">Explore our most popular sports venues in Tamil Nadu</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-1 bg-white dark:bg-dark-theme-lightest hover:bg-gray-100 dark:hover:bg-dark-theme transition-all dark:border-gray-600 dark:text-gray-200 text-sm sm:text-base"
                asChild
              >
                <Link to="/book-turf">
                  View All
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 z-10">
            {featuredTurfs.map((turf, index) => (
              <TurfCard key={turf.id} {...turf} index={index} />
            ))}
          </div>

          <motion.div
            className="mt-8 text-center md:hidden"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Button variant="outline" asChild className="bg-white dark:bg-dark-theme-lightest hover:bg-gray-100 dark:hover:bg-dark-theme transition-all dark:border-gray-600 dark:text-gray-200 text-sm sm:text-base">
                <Link to="/book-turf">View All Turfs</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 sm:py-16 bg-gray-50 dark:bg-dark-theme-lighter">
        <div className="container px-2 sm:px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              Booking a sports turf with us is quick and easy. Follow these simple steps.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 z-10"
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
                  className="bg-white dark:bg-dark-theme-lightest p-4 rounded-full shadow-md mb-4"
                  whileHover={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-8 sm:py-16 bg-gray-50 dark:bg-dark-theme-lighter">
        <div className="container px-2 sm:px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              Don't take our word for it – here's what sports enthusiasts in Tamil Nadu have to say about our platform.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white dark:bg-dark-theme-lightest p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-600 relative"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-turf-500 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                  "
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic text-sm sm:text-base">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
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

      {/* Our Partners - Logo Carousel */}
      <section className="py-8 sm:py-16 bg-gray-50 dark:bg-dark-theme-lighter">
        <div className="container px-2 sm:px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Our Partners</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              We collaborate with the best turf venues across Tamil Nadu to bring you top-notch sports facilities.
            </p>
          </motion.div>

          <div
            ref={containerRef}
            className="overflow-hidden"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            <motion.div
              style={{ x, y }}
              className="flex gap-4 py-6"
            >
              {[...turfLogos, ...turfLogos, ...turfLogos].map((turf, index) => (
                <motion.div
                  ref={index === 0 ? logoRef : null}
                  key={`${turf.name}-${index}`}
                  className="flex-shrink-0 w-[18vw] h-[18vw] sm:w-[15vw] sm:h-[15vw] max-w-20 max-h-20 sm:max-w-24 sm:max-h-24 bg-white dark:bg-dark-theme-lightest rounded-full flex items-center justify-center relative"
                  whileHover={{ 
                    scale: 1.1, 
                    transition: { type: 'spring', stiffness: 300, damping: 10 } 
                  }}
                >
                  <img
                    src={turf.logoUrl}
                    alt={`${turf.name} logo`}
                    className="max-w-[80%] max-h-[80%] object-contain pointer-events-none"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-gradient-to-r from-turf-700 to-sport-700 text-white font-sans">
        <div className="container px-2 sm:px-4">
          <motion.div
            className="max-w-md sm:max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Book Your Sports Venue?</h2>
            <p className="text-base sm:text-lg mb-8 text-white/90">
              Join thousands of sports enthusiasts across Tamil Nadu who book their perfect playing field with PickMyPitch.
            </p>
            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="default"
                  className="sm:text-lg bg-white dark:bg-dark-theme-lightest text-turf-700 dark:text-turf-300 hover:bg-turf-100 dark:hover:bg-dark-theme font-semibold tracking-wide shadow-lg hover:shadow-glow transition-all duration-300 text-sm sm:text-base"
                  asChild
                >
                  <Link to="/book-turf">Book Now</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="default"
                  className="sm:text-lg bg-white dark:bg-dark-theme-lightest text-turf-700 dark:text-turf-300 hover:bg-turf-100 dark:hover:bg-dark-theme font-semibold tracking-wide shadow-lg hover:shadow-glow transition-all duration-300 text-sm sm:text-base"
                  asChild
                >
                  <Link to="/contact">Contact Us</Link>
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
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useAnimation, useTransform, useMotionValue } from 'framer-motion';
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
    const containerStyle = window.getComputedStyle(containerRef.current.children[0] as HTMLElement);
    const gap = parseFloat(containerStyle.gap) || 16;
    const n = turfLogos.length;
    const singleSetWidth = (n * logoWidth) + ((n - 1) * gap);
    return { logoWidth, gap, singleSetWidth };
  };

  return (
    <div className="min-h-screen flex flex-col bg-pitch-navy text-white font-sans">
      <motion.div style={{ opacity }} className="fixed w-full z-50">
        <Navbar onThemeChange={handleThemeChange} />
      </motion.div>
      <Hero />
      <Features />

      {/* Featured Turfs */}
      <section className="py-20 relative overflow-hidden" ref={featuredTurfsRef}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pitch-teal/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container px-4 sm:px-6 md:px-8 mx-auto relative z-10">
          <motion.div
            className="flex justify-between items-end mb-12"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Featured <span className="text-pitch-teal">Turfs</span>
              </h2>
              <p className="text-gray-400 mt-3 text-base sm:text-lg max-w-2xl">
                Explore our most popular and highly-rated sports venues across Tamil Nadu.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 glass-card hover:bg-pitch-teal/10 hover:border-pitch-teal/50 hover:text-pitch-teal transition-all text-white border-white/10 px-6 py-5 rounded-xl font-medium"
                asChild
              >
                <Link to="/book-turf">
                  View All Turfs
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredTurfs.map((turf, index) => (
              <TurfCard key={turf.id} {...turf} index={index} />
            ))}
          </div>

          <motion.div
            className="mt-10 text-center md:hidden"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Button variant="outline" asChild className="glass-card hover:bg-pitch-teal/10 hover:border-pitch-teal/50 text-white w-full py-6 rounded-xl font-medium">
                <Link to="/book-turf">View All Turfs</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-pitch-navy-light relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pitch-orange/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="container px-4 sm:px-6 md:px-8 mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">How It Works</h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-base sm:text-lg">
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
                className="glass-card p-8 rounded-2xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                variants={itemVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pitch-orange/0 to-pitch-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <motion.div
                  className="mb-6 p-4 bg-pitch-navy rounded-2xl border border-white/5 group-hover:border-pitch-orange/30 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <div className="text-pitch-orange">
                    {step.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-[40%] -right-8 w-16 h-[2px] bg-gradient-to-r from-pitch-orange/50 to-transparent z-0 pointer-events-none"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="container px-4 sm:px-6 md:px-8 mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pitch-teal to-pitch-orange">Users Say</span></h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-base sm:text-lg">
              Don't take our word for it – here's what sports enthusiasts in Tamil Nadu have to say about our platform.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="glass-card p-8 rounded-2xl relative group hover:-translate-y-2 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-pitch-teal to-pitch-orange rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-pitch-navy">
                  "
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed pt-2">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div>
                    <h4 className="font-semibold text-white tracking-wide">{testimonial.name}</h4>
                    <p className="text-xs text-pitch-teal mt-1">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-1 bg-white/5 px-3 py-1.5 rounded-full">
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
      <section className="py-16 border-y border-white/5 bg-black/20">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-medium text-gray-400 tracking-wider uppercase text-sm">Trusted by Premier Venues Across Tamil Nadu</h3>
          </motion.div>

          <div className="overflow-hidden relative flex after:content-[''] after:absolute after:top-0 after:right-0 after:w-32 after:h-full after:bg-gradient-to-l after:from-[#0E131F] after:to-transparent before:content-[''] before:absolute before:top-0 before:left-0 before:w-32 before:h-full before:bg-gradient-to-r before:from-[#0E131F] before:to-transparent z-10 py-6">
            <div className="flex animate-scroll gap-12 sm:gap-20 items-center px-4">
              {[...turfLogos, ...turfLogos, ...turfLogos].map((turf, index) => (
                <div
                  key={`${turf.name}-${index}`}
                  className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full p-4 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 grayscale hover:grayscale-0"
                >
                  <img
                    src={turf.logoUrl}
                    alt={`${turf.name} logo`}
                    className="max-w-full max-h-full object-contain mix-blend-screen"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-250px * ${turfLogos.length})); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
            width: fit-content;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* CTA Box */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            className="glass-card rounded-3xl p-10 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden box-border border-pitch-teal/30"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* CTA Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-pitch-teal/20 via-pitch-navy to-pitch-orange/20 opacity-80"></div>
            
            <div className="relative z-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-lg">
                Ready to Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pitch-teal to-pitch-orange">Digital Arena?</span>
              </h2>
              <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join thousands of sports enthusiasts across Tamil Nadu who book their perfect playing field with PickMyPitch. Secure your spot in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pitch-teal to-pitch-teal/80 hover:from-pitch-teal/90 hover:to-pitch-teal shadow-[0_0_20px_rgba(15,118,110,0.4)] text-white text-lg px-8 py-6 rounded-xl font-semibold border-none transition-all hover:scale-105"
                  asChild
                >
                  <Link to="/book-turf">Book Your Turf Now</Link>
                </Button>
                <Button
                  size="lg"
                  className="glass-button bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 text-lg px-8 py-6 rounded-xl font-medium transition-all hover:scale-105"
                  asChild
                >
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

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
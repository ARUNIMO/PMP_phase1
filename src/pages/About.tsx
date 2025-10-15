import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Heart, MapPin, Target, Shield, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServingInTN from '@/assets/images/serving-in-tn.jpeg';

const About = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const teamMembers = [
    {
      name: "Arjun Kumar",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg", 
      bio: "Former national-level football player with a passion for making sports accessible to everyone."
    },
    {
      name: "Priya Sharma",
      role: "Operations Manager",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Sports management expert ensuring all our turfs meet the highest quality standards."
    },
    {
      name: "Vijay Raghavan",
      role: "Technology Lead",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      bio: "Tech enthusiast who built our booking platform to make finding and reserving sports venues simple."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-theme-lighter">
      <Navbar onThemeChange={handleThemeChange} />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-turf-800 to-sport-900 text-white">
        <div className="container px-2 sm:px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PickMyPitch</h1>
            <p className="text-lg text-gray-200 dark:text-gray-300 mb-8">
              Connecting sports enthusiasts with the best turfs across Tamil Nadu since 2020.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-white dark:bg-dark-theme-lighter">
        <div className="container px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                At PickMyPitch, we're on a mission to transform how sports enthusiasts in Tamil Nadu access quality playing facilities. We believe that everyone deserves convenient access to well-maintained sports venues.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Our platform connects players with the perfect turfs for their needs, eliminating the hassle of finding and booking venues. Whether you're organizing a casual football match with friends or a corporate cricket tournament, we've got you covered.
              </p>
              <div className="flex items-center mt-8">
                <div className="bg-turf-100 dark:bg-turf-700 p-3 rounded-full">
                  <Trophy className="w-8 h-8 text-turf-600 dark:text-turf-300" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Excellence in Service</h3>
                  <p className="text-gray-600 dark:text-gray-300">Committed to providing exceptional booking experiences</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800&q=80" 
                alt="Sports field in Tamil Nadu" 
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-dark-theme-lighter">
        <div className="container px-2 sm:px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at PickMyPitch.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <Users className="w-10 h-10" />, title: "Community", description: "Building a vibrant sports community across Tamil Nadu" },
              { icon: <Shield className="w-10 h-10" />, title: "Quality", description: "Ensuring all listed turfs meet our high standards" },
              { icon: <Heart className="w-10 h-10" />, title: "Passion", description: "Driven by our love for sports and active living" },
              { icon: <Target className="w-10 h-10" />, title: "Accessibility", description: "Making sports venues easy to find and book for everyone" }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-dark-theme-lightest p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-600"
                variants={fadeIn}
              >
                <div className="bg-turf-100 dark:bg-turf-700 p-3 rounded-full inline-block mb-4">
                  <div className="text-turf-600 dark:text-turf-300">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white dark:bg-dark-theme-lighter">
        <div className="container px-2 sm:px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet the passionate team behind PickMyPitch.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-dark-theme-lightest p-6 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-600 text-center"
                variants={fadeIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-turf-100 dark:border-turf-700"
                />
                <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-turf-600 dark:text-turf-300 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Location */}
      <section className="py-16 bg-turf-900 text-white">
        <div className="container px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-turf-400 dark:text-turf-300 mr-3" />
                <h2 className="text-3xl font-bold">Serving Tamil Nadu</h2>
              </div>
              <p className="text-lg text-gray-300 dark:text-gray-300 mb-4">
                Based in Chennai, we're proud to serve sports enthusiasts across Tamil Nadu. From the bustling courts of the capital to the scenic fields of Coimbatore and Madurai, we've partnered with the best sports venues in the state.
              </p>
              <p className="text-lg text-gray-300 dark:text-gray-300 mb-6">
                Our extensive network ensures that you can find quality sports facilities no matter where you are in Tamil Nadu.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Vellore"].map(city => (
                  <span key={city} className="bg-white/10 dark:bg-dark-theme/50 px-3 py-1 rounded-full text-sm">
                    {city}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-theme-lightest p-2 rounded-lg shadow-xl"
            >
              <img 
                src={ServingInTN} // Use the imported image
                alt="Map of Tamil Nadu" 
                className="w-full h-auto rounded"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
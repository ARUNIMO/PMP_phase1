
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Careers', path: '/about' },
        { label: 'Blog', path: '/about' }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Book Turf', path: '/book-turf' },
        { label: 'Corporate Events', path: '/contact' },
        { label: 'Tournaments', path: '/contact' },
        { label: 'Coaching', path: '/contact' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '/contact' },
        { label: 'FAQs', path: '/contact' },
        { label: 'Terms of Service', path: '/about' },
        { label: 'Privacy Policy', path: '/about' }
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <Facebook size={20} />, path: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, path: '#', label: 'Twitter' },
    { icon: <Instagram size={20} />, path: '#', label: 'Instagram' },
    { icon: <Youtube size={20} />, path: '#', label: 'YouTube' }
  ];
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <motion.div 
            className="md:col-span-5 lg:col-span-4" 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-turf-500 to-sport-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">PP</span>
              </div>
              <span className="font-bold text-xl tracking-tight">PickMyPitch</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Connecting sports enthusiasts with the best turfs across Tamil Nadu. Book your perfect pitch in seconds.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-turf-400 mt-1 shrink-0" />
                <p className="text-gray-400">
                  123 Sports Avenue, T. Nagar<br />
                  Chennai 600017<br />
                  Tamil Nadu, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-turf-400 shrink-0" />
                <p className="text-gray-400">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-turf-400 shrink-0" />
                <p className="text-gray-400">hello@pickmypitch.com</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.path}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-turf-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((column, colIndex) => (
                <motion.div 
                  key={colIndex}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: colIndex * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          to={link.path} 
                          className="text-gray-400 hover:text-turf-400 transition-colors hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500"
        >
          <p>© {currentYear} PickMyPitch. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Serving sports enthusiasts across Tamil Nadu with the best turf booking experience.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

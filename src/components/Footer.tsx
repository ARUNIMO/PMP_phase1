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
    <footer className="bg-[#0E131F] text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pitch-teal/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <motion.div 
            className="md:col-span-5 lg:col-span-4" 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-pitch-teal to-pitch-orange rounded-xl flex items-center justify-center transform group-hover:-rotate-6 transition-transform shadow-lg shadow-pitch-teal/20">
                <span className="text-white font-bold text-lg">PP</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-pitch-orange transition-all duration-300">PickMyPitch</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting sports enthusiasts with the best turfs across Tamil Nadu. Book your perfect pitch in seconds.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 group">
                <MapPin size={20} className="text-pitch-teal mt-1 shrink-0 group-hover:text-pitch-orange transition-colors" />
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  123 Sports Avenue, T. Nagar<br />
                  Chennai 600017<br />
                  Tamil Nadu, India
                </p>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone size={20} className="text-pitch-teal shrink-0 group-hover:text-pitch-orange transition-colors" />
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail size={20} className="text-pitch-teal shrink-0 group-hover:text-pitch-orange transition-colors" />
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">hello@pickmypitch.com</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.path}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pitch-navy-light hover:bg-pitch-teal/20 hover:text-pitch-teal w-11 h-11 rounded-xl flex items-center justify-center transition-colors border border-white/5 shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:pl-12">
              {footerLinks.map((column, colIndex) => (
                <motion.div 
                  key={colIndex}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: colIndex * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-6 border-b border-white/10 pb-3 text-white">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          to={link.path} 
                          className="text-gray-400 hover:text-pitch-teal transition-all duration-300 flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full border border-pitch-teal/50 group-hover:bg-pitch-teal transition-colors"></span>
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
          className="border-t border-white/10 pt-8 mt-12 text-center text-gray-500 flex flex-col md:flex-row justify-between items-center"
        >
          <p>© {currentYear} PickMyPitch. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-sm flex items-center gap-1">
            Built with passion for sports in <span className="text-pitch-teal font-medium">Tamil Nadu</span>.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

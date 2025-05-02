
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User, MapPin, Phone, Mail, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: null },
    { to: "/book-turf", label: "Book Turf", icon: null },
    { to: "/about", label: "About Us", icon: <Info size={16} /> },
    { to: "/contact", label: "Contact", icon: <Mail size={16} /> },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm',
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 py-2 shadow-md' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
            className="w-10 h-10 bg-gradient-to-br from-turf-500 to-sport-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">PP</span>
          </motion.div>
          <motion.span 
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'font-bold text-xl tracking-tight transition-colors',
              isScrolled ? 'text-turf-800' : 'text-white'
            )}
          >
            PickMyPitch
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <Link 
                    to={link.to} 
                    className={cn(
                      'animated-link font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-1',
                      location.pathname === link.to 
                        ? 'bg-turf-100 text-turf-800' 
                        : isScrolled 
                          ? 'text-gray-800 hover:bg-gray-100' 
                          : 'text-white hover:bg-white/10'
                    )}
                  >
                    {link.icon && <span>{link.icon}</span>}
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            className={cn(
              "flex items-center gap-1 transition-all hover:scale-105",
              isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
            )} 
            asChild
          >
            <Link to="/login">
              <LogIn size={16} className="mr-1" />
              Login
            </Link>
          </Button>
          <Button 
            className="bg-gradient-to-r from-turf-600 to-sport-600 hover:from-turf-700 hover:to-sport-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105" 
            asChild
          >
            <Link to="/signup">
              <User size={16} className="mr-1" />
              Sign Up
            </Link>
          </Button>
        </div>

        {/* Tamil Nadu Location Indicator */}
        <div className="hidden lg:flex items-center ml-4 text-sm">
          <MapPin size={16} className={cn("mr-1", isScrolled ? "text-turf-600" : "text-turf-300")} />
          <span className={cn(isScrolled ? "text-gray-600" : "text-gray-300")}>
            Tamil Nadu, India
          </span>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 rounded-full hover:bg-black/10" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 animate-fade-in-down"
        >
          <div className="container py-4 flex flex-col gap-3">
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={cn(
                  "px-4 py-3 rounded-md flex items-center transition-colors",
                  location.pathname === link.to 
                    ? "bg-turf-100 text-turf-800" 
                    : "hover:bg-gray-100"
                )}
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center px-4 py-2 mt-1 text-gray-600 text-sm">
              <MapPin size={16} className="mr-1 text-turf-600" />
              Tamil Nadu, India
            </div>
            
            <hr className="my-2" />
            
            <div className="flex flex-col gap-2 px-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/login">
                  <LogIn size={16} className="mr-2" />
                  Login
                </Link>
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-turf-600 to-sport-600" asChild>
                <Link to="/signup">
                  <User size={16} className="mr-2" />
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.title = 'Login - Sportify Turf';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="h-screen w-screen flex bg-gray-50 dark:bg-dark-theme-lighter">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 justify-center relative bg-blue dark:bg-dark-theme-lightest">
        <div className="mb-4">
          <Link to="/" className="text-gray-500 dark:text-gray-300 flex items-center hover:text-gray-700 dark:hover:text-gray-100">
            <ArrowLeft size={16} className="mr-2" />
            Back to home
          </Link>
        </div>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to your account to manage your bookings.</p>
        </div>

        <AuthForm defaultTab="login" />
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1624264834391-92f0ab828711?w=1200&q=80')`,
      }}>
        <div className="h-full w-full bg-gradient-to-r from-turf-700/90 to-sport-700/80 flex items-center justify-center relative">
          <button
            onClick={handleThemeChange}
            className="absolute top-8 right-8 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <div className="max-w-md text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Experience Seamless Sports Venue Booking</h2>
            <p className="mb-6">
              Book your favorite sports turfs with ease, track your reservations,
              and enjoy hassle-free sporting experiences.
            </p>
            <div className="flex gap-4 mb-4">
              <div className="bg-white/10 p-4 rounded-lg flex-1">
                <h3 className="font-bold text-xl">500+</h3>
                <p className="text-sm text-white/80">Sports Venues</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg flex-1">
                <h3 className="font-bold text-xl">20K+</h3>
                <p className="text-sm text-white/80">Happy Players</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg flex-1">
                <h3 className="font-bold text-xl">95%</h3>
                <p className="text-sm text-white/80">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, ArrowRight } from 'lucide-react';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const location = useLocation();
  const defaultTab = location.pathname === '/signup' ? 'register' : 'login';

  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'dark'; // Dark theme default for PitchMaster Pro
  });

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.title = defaultTab === 'register' ? 'Sign Up - PitchMaster Pro' : 'Login - PitchMaster Pro';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, defaultTab]);

  // Force dark mode on mount for the best experience
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      handleThemeChange();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex bg-slate-50 dark:bg-pitch-navy overflow-hidden">
      {/* Left side - Brand Visual Panel */}
      <div className="hidden lg:block lg:w-1/2 relative bg-pitch-navy">
        {/* Background Image with Stadium Theme */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop')` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pitch-teal/90 via-pitch-navy/80 to-pitch-navy/95 border-r border-white/5" />
        
        {/* Radial Lighting Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pitch-teal/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative h-full flex flex-col p-12 justify-between z-10 text-white">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 group hover:text-pitch-teal transition-colors">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pitch-teal/20 transition-colors">
                <ArrowLeft size={16} />
              </div>
              <span className="font-medium tracking-wide text-sm uppercase">Return to Arena</span>
            </Link>
          </div>
          
          <div className="max-w-md">
            <div className="inline-block px-3 py-1 bg-pitch-orange/10 border border-pitch-orange/20 rounded-full text-pitch-orange text-xs font-bold tracking-wider mb-6">
              YOUR GAME STARTS HERE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              EXPERIENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pitch-teal to-cyan-400">SEAMLESS</span> SPORTS VENUE BOOKING
            </h2>
            <p className="mb-10 text-slate-300 text-lg leading-relaxed">
              Book professional-grade sports turfs, manage your matches, and join endless competitions through our elite platform.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="glass-panel p-4 rounded-xl border-white/10">
                <h3 className="font-bold text-2xl text-white mb-1">500+</h3>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Venues</p>
              </div>
              <div className="glass-panel p-4 rounded-xl border-white/10">
                <h3 className="font-bold text-2xl text-white mb-1">20K+</h3>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Players</p>
              </div>
              <div className="glass-panel p-4 rounded-xl border-white/10">
                <h3 className="font-bold text-2xl text-pitch-teal mb-1">98%</h3>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Satisfaction</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>© 2024 PitchMaster Pro</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 justify-center relative bg-white dark:bg-[#0A0D14]">
        {/* Mobile Header elements */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link to="/" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/5 transition-colors border border-slate-200 dark:border-white/5">
            <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
          </Link>
        </div>
        
        <button
          onClick={handleThemeChange}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200 dark:border-white/5"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">Welcome to the Arena</h1>
            <p className="text-slate-500 dark:text-slate-400">Sign in or create an account to claim your pitch and manage bookings.</p>
          </div>

          <AuthForm defaultTab={defaultTab} />
        </div>
      </div>
    </div>
  );
};

export default Login;
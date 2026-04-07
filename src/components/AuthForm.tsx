import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Eye, EyeOff, Facebook, Github } from 'lucide-react';

interface AuthFormProps {
  defaultTab?: 'login' | 'register';
}

const AuthForm = ({ defaultTab = 'login' }: AuthFormProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Login successful!');
    navigate('/book-turf');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration successful! Welcome to PitchMaster Pro.');
    navigate('/book-turf');
  };

  return (
    <div className="w-full animate-fade-in-up">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8 bg-slate-100 dark:bg-[#151c2c] rounded-xl p-1 border border-transparent dark:border-white/5">
          <TabsTrigger 
            value="login" 
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-[#1e273c] data-[state=active]:text-pitch-teal data-[state=active]:shadow-sm transition-all"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="register" 
            className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-[#1e273c] data-[state=active]:text-pitch-teal data-[state=active]:shadow-sm transition-all"
          >
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email-login" className="text-slate-700 dark:text-slate-300 font-medium">Email Address</Label>
              <Input 
                id="email-login" 
                type="email" 
                placeholder="your@email.com" 
                required 
                className="h-12 bg-white dark:bg-[#131927] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 focus-visible:ring-pitch-teal focus-visible:border-pitch-teal rounded-xl" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password-login" className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
                <a href="#" className="text-xs font-medium text-pitch-teal hover:text-pitch-teal/80 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Input 
                  id="password-login" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="h-12 bg-white dark:bg-[#131927] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 focus-visible:ring-pitch-teal focus-visible:border-pitch-teal rounded-xl pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pitch-teal transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-12 mt-2 bg-gradient-to-r from-pitch-teal to-pitch-teal/90 hover:from-pitch-teal/90 hover:to-pitch-teal text-white rounded-xl shadow-lg shadow-pitch-teal/20 transition-all font-semibold tracking-wide">
              Login to Arena ⚡
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white dark:bg-[#0A0D14] text-slate-500 dark:text-slate-400 font-medium tracking-wide">OR CONTINUE WITH</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 flex items-center gap-2 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 bg-white dark:bg-[#131927] hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all">
              <Facebook size={18} className="text-[#1877F2]" />
              <span className="font-medium">Facebook</span>
            </Button>
            <Button variant="outline" className="h-11 flex items-center gap-2 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 bg-white dark:bg-[#131927] hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all">
              <Github size={18} className="dark:text-white" />
              <span className="font-medium">GitHub</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="register" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-slate-700 dark:text-slate-300 font-medium">First Name</Label>
                <Input 
                  id="first-name" 
                  placeholder="John" 
                  required 
                  className="h-12 bg-white dark:bg-[#131927] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 focus-visible:ring-pitch-teal focus-visible:border-pitch-teal rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-slate-700 dark:text-slate-300 font-medium">Last Name</Label>
                <Input 
                  id="last-name" 
                  placeholder="Doe" 
                  required 
                  className="h-12 bg-white dark:bg-[#131927] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 focus-visible:ring-pitch-teal focus-visible:border-pitch-teal rounded-xl" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-register" className="text-slate-700 dark:text-slate-300 font-medium">Email Address</Label>
              <Input 
                id="email-register" 
                type="email" 
                placeholder="your@email.com" 
                required 
                className="h-12 bg-white dark:bg-[#131927] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 focus-visible:ring-pitch-teal focus-visible:border-pitch-teal rounded-xl" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-register" className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
              <div className="relative">
                <Input 
                  id="password-register" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="h-12 bg-white dark:bg-[#131927] text-slate-900 dark:text-white border-slate-200 dark:border-white/10 focus-visible:ring-pitch-teal focus-visible:border-pitch-teal rounded-xl pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pitch-teal transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Must be at least 8 characters long.
              </p>
            </div>
            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="w-4 h-4 rounded border-slate-300 dark:border-white/10 text-pitch-teal focus:ring-pitch-teal dark:bg-[#131927]" 
                  required 
                />
              </div>
              <Label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-tight">
                I agree to PitchMaster Pro's <a href="#" className="text-pitch-teal hover:text-pitch-teal/80 transition-colors">Terms of Service</a> and <a href="#" className="text-pitch-teal hover:text-pitch-teal/80 transition-colors">Privacy Policy</a>
              </Label>
            </div>
            <Button type="submit" className="w-full h-12 mt-4 bg-gradient-to-r from-pitch-teal to-pitch-teal/90 hover:from-pitch-teal/90 hover:to-pitch-teal text-white rounded-xl shadow-lg shadow-pitch-teal/20 transition-all font-semibold tracking-wide">
              Create Account
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-white dark:bg-[#0A0D14] text-slate-500 dark:text-slate-400 font-medium tracking-wide">OR SIGN UP WITH</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 flex items-center gap-2 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 bg-white dark:bg-[#131927] hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all">
              <Facebook size={18} className="text-[#1877F2]" />
              <span className="font-medium">Facebook</span>
            </Button>
            <Button variant="outline" className="h-11 flex items-center gap-2 border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 bg-white dark:bg-[#131927] hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all">
              <Github size={18} className="dark:text-white" />
              <span className="font-medium">GitHub</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
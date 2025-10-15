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
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration successful! Please check your email to verify your account.');
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-900">
          <TabsTrigger value="login" className="text-gray-700 dark:text-gray-200">Login</TabsTrigger>
          <TabsTrigger value="register" className="text-gray-700 dark:text-gray-200">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-login" className="text-gray-700 dark:text-gray-200">Email</Label>
              <Input id="email-login" type="email" placeholder="your@email.com" required className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-login" className="text-gray-700 dark:text-gray-200">Password</Label>
              <div className="relative">
                <Input 
                  id="password-login" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-xs text-sport-600 dark:text-sport-400 hover:underline">Forgot password?</a>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-turf-600 to-sport-600 text-white">
              Login
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700">
              <Facebook size={16} />
              <span>Facebook</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700">
              <Github size={16} />
              <span>GitHub</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-gray-700 dark:text-gray-200">First name</Label>
                <Input id="first-name" placeholder="John" required className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-gray-700 dark:text-gray-200">Last name</Label>
                <Input id="last-name" placeholder="Doe" required className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-register" className="text-gray-700 dark:text-gray-200">Email</Label>
              <Input id="email-register" type="email" placeholder="your@email.com" required className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-register" className="text-gray-700 dark:text-gray-200">Password</Label>
              <div className="relative">
                <Input 
                  id="password-register" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 8 characters long and include a number and a special character.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="terms" className="rounded text-sport-600 dark:text-sport-400" required />
              <Label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-200">
                I agree to the <a href="#" className="text-sport-600 dark:text-sport-400 hover:underline">Terms of Service</a> and <a href="#" className="text-sport-600 dark:text-sport-400 hover:underline">Privacy Policy</a>
              </Label>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-turf-600 to-sport-600 text-white">
              Create Account
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
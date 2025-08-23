import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Eye, EyeOff, Shield, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (formData.email && formData.password) {
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to admin panel.",
        variant: "default",
      });
    } else {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password reset",
      description: "Password reset instructions would be sent to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-glow animate-fade-in relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-admin rounded-full flex items-center justify-center mb-4 animate-float">
            <Lock className="h-10 w-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Admin Portal</CardTitle>
            <CardDescription className="text-base mt-2">
              Secure access to the learning management system
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@edulms.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 transition-smooth focus:shadow-elegant"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your secure password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 pr-12 transition-smooth focus:shadow-elegant"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me
                </Label>
              </div>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm text-primary"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </Button>
            </div>

            <Button>
                <span className="flex items-center gap-2">
                    Sign In 
                </span>
            </Button>
          </form>
          
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              🔒 Secure admin authentication powered by enterprise-grade security
            </p>
            <p className="text-xs text-muted-foreground">
              For production use, connect to Supabase for real authentication
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignIn;

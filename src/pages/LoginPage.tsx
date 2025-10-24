import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle } from
"@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GoogleLogin } from "@react-oauth/google"; // first google continue change

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

{/*const handleGoogleSuccess = async (response: any) => {
    const userData = response.profileObj;
    setIsLoading(true);
    try {
      const user = await login(userData.email, ""); // Use Google email, empty password
      if (user) {
        toast({ title: "Success", description: "Logged in with Google" });
        navigate("/dashboard");
      } else {
        toast({ title: "Error", description: "Google login failed. Please try email/password.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Google login failed. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
*/}
 // second edit not the one up
 
  // [CHANGE 3]: Handle Google OAuth success
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await login(email, password);
      if (user) {
        toast({
          title: "Success",
          description: "You have been logged in"
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

 const handleGoogleSuccess = async (response: any) => {
    setIsLoading(true);
    try {
      // [CHANGE 4]: Parse Google user data (assuming JWT token response)
      const userData = response.profileObj || JSON.parse(atob(response.credential.split('.')[1]));
      const user = await login(userData.email, ""); // Google login with empty password
      if (user) {
        toast({ title: "Success", description: "Logged in with Google" });
        navigate("/dashboard");
      } else {
        toast({ title: "Error", description: "Google login failed. Please try email/password.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Google login failed. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }; 


/*
  // For demo purposes, allow quick login to the most recent user
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const user = await login("alex@example.com", "password");
      if (user) {
        toast({
          title: "Demo Login",
          description: "You are logged in as a demo user"
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Demo login failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };*/

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-id="tiwha7tc5" data-path="src/pages/LoginPage.tsx">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4" data-id="sw0bv6t2g" data-path="src/pages/LoginPage.tsx">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
           {/* [ADDED]: Google OAuth Button */}
            

            <form onSubmit={handleSubmit} className="space-y-4" data-id="1it9qm1ig" data-path="src/pages/LoginPage.tsx">
              <div className="space-y-2" data-id="7d3hw25ch" data-path="src/pages/LoginPage.tsx">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />

              </div>
              
              <div className="space-y-2" data-id="1uunk4oeg" data-path="src/pages/LoginPage.tsx">
                <div className="flex items-center justify-between" data-id="urgartt1f" data-path="src/pages/LoginPage.tsx">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline">

                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />

              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                disabled={isLoading}>

                {isLoading ? "Signing in..." : "Log in"}
              </Button>

               {/* [CHANGE 6]: Add Google OAuth button with logo */}
            <div className="space-y-4">
             {/* [CHANGE 9]: Divider for UX */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              
              <Button
                type ="submit"
                
                onSuccess={handleGoogleSuccess}
                size="large"
                text="signin_with"
        
                width="100%"
                onError={() => toast({ title: "Error", description: "Google auth failed.", variant: "destructive" })}
                variant="outline"
              
                className="w-full h-10 flex items-center justify-center space-x-2  rounded-md"
                disabled={isLoading}
              >
            
                <svg className="w-5 h-5 rounded-2xl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.07 7.67 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.67 1 4.01 3.93 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Continue with Google</span>
              </Button>

              
              {/* [CHANGE 8]: GoogleLogin component for auth */}
             {/* <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast({ title: "Error", description: "Google auth failed.", variant: "destructive" })}
                theme="filled_blue"
                size="large"
                text="signin_with"
                shape="rectangular"
                width="100%"
              />*/}
             
            </div>

              {/*<div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
*/}
              
              { /*<Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={handleDemoLogin}
                disabled={isLoading}>

                Demo Login
              </Button> */}
            </form>
            
            <div className="mt-6 text-center" data-id="ko0isu5ih" data-path="src/pages/LoginPage.tsx">
              <p className="text-sm text-gray-600" data-id="mpi1chdz2" data-path="src/pages/LoginPage.tsx">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>);

};

export default LoginPage;
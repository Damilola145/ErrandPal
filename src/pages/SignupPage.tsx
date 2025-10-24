import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter } from
"@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem } from
"@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GoogleLogin } from "@react-oauth/google"; 
import { sendVerificationEmail } from "@/services/mockData";


const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "both" as UserRole
  });
  const [isLoading, setIsLoading] = useState(false);
   // [CHANGE 4]: State for Google role selection
  const [showGoogleRoleForm, setShowGoogleRoleForm] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

 // [CHANGE 5]: Handle Google OAuth success
  const handleGoogleSuccess = (response: any) => {
    const userData = response.profileObj || JSON.parse(atob(response.credential.split('.')[1]));
    setGoogleUserData({
      name: userData.name,
      email: userData.email,
      googleId: userData.sub || userData.googleId,
    });
    setShowGoogleRoleForm(true);
  };

  // [CHANGE 6]: Handle Google role submission
 const handleGoogleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleUserData) {
      toast({ title: "Error", description: "No Google user data available.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const user = await register({
        name: googleUserData.name,
        email: googleUserData.email,
        googleId: googleUserData.googleId,
        avatar: googleUserData.avatar,
        role: formData.role,
        password: "",
        isVerified: true, // [CHANGE 3]: Set isVerified to true for Google users
      });
      if (user) {
        toast({ title: "Success", description: "Account created! Redirecting to dashboard." });
        navigate("/dashboard"); // [CHANGE 4]: Redirect to dashboard, no verification needed
      } else {
        toast({ title: "Error", description: "Google signup failed. Please try again.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Google signup failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowGoogleRoleForm(false);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const user = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        isVerified: false,
      });

      if (user) {
        toast({
          title: "Success",
          description: "Your account has been created"
        });
        navigate("/dashboard");
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-id="foj99o6il" data-path="src/pages/SignupPage.tsx">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 py-10" data-id="qvjfdaera" data-path="src/pages/SignupPage.tsx">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Sign up to start requesting or running errands
            </CardDescription>
          </CardHeader>
          <CardContent>
            
               {/* [CHANGE 11]: Conditional Google role form */}
            {showGoogleRoleForm && (
              <form onSubmit={handleGoogleRoleSubmit} className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label>I want to:</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => handleRoleChange(value as UserRole)}
                    className="flex flex-col space-y-1"
                    defaultValue="both"
                  >
                    <div className="flex items-center space-x-2" data-id="ln7uym9oy" data-path="src/pages/SignupPage.tsx">
                      <RadioGroupItem value="requester" id="requester" />
                      <Label htmlFor="requester">Request errands</Label>
                    </div>
                    <div className="flex items-center space-x-2" data-id="oafwb0wu8" data-path="src/pages/SignupPage.tsx">
                      <RadioGroupItem value="runner" id="runner" />
                      <Label htmlFor="runner">Run errands for others</Label>
                    </div>
                    <div className="flex items-center space-x-2" data-id="q3zyj703x" data-path="src/pages/SignupPage.tsx">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Complete Signup"}
                </Button>
              </form>
            )}



            {!showGoogleRoleForm && (
            <form onSubmit={handleSubmit} className="space-y-4" data-id="rr3d0q5dk" data-path="src/pages/SignupPage.tsx">
              <div className="space-y-2" data-id="f7ndby38f" data-path="src/pages/SignupPage.tsx">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required />

              </div>
              
              <div className="space-y-2" data-id="gaugdor6a" data-path="src/pages/SignupPage.tsx">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required />

              </div>
              
              <div className="space-y-2" data-id="4a204ebdf" data-path="src/pages/SignupPage.tsx">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required />

              </div>
              
              <div className="space-y-2" data-id="wk3la51jf" data-path="src/pages/SignupPage.tsx">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required />

              </div>
              
              <div className="space-y-3" data-id="q417bnlx6" data-path="src/pages/SignupPage.tsx">
                <Label>I want to:</Label>
                <RadioGroup
                  defaultValue={formData.role}
                  onValueChange={(value) => handleRoleChange(value as UserRole)}
                  className="flex flex-col space-y-1">

                  <div className="flex items-center space-x-2" data-id="ln7uym9oy" data-path="src/pages/SignupPage.tsx">
                    <RadioGroupItem value="requester" id="requester" />
                    <Label htmlFor="requester">Request errands</Label>
                  </div>
                  <div className="flex items-center space-x-2" data-id="oafwb0wu8" data-path="src/pages/SignupPage.tsx">
                    <RadioGroupItem value="runner" id="runner" />
                    <Label htmlFor="runner">Run errands for others</Label>
                  </div>
                  <div className="flex items-center space-x-2" data-id="q3zyj703x" data-path="src/pages/SignupPage.tsx">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                disabled={isLoading}>

                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>)}
                {/* [CHANGE 6]: Add Google OAuth button with logo */}
            <div className="space-y-4">
             {/* [CHANGE 9]: Divider for UX */}
              <div className="relative mt-4"  >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
             
             
            <Button
                type ="submit"
                onClick={handleGoogleSuccess}
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

  
            </div>

          </CardContent>
          <CardFooter className="justify-center ">
            <p className="text-sm text-gray-600 " data-id="4wqcs0cr4" data-path="src/pages/SignupPage.tsx">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
  
          </CardFooter>
       
        </Card>
      </main>
      
      <Footer />
    </div>);

};

export default SignupPage;
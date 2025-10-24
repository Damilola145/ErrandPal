import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { verifyEmailCode, resendVerificationEmail } from "@/services/mockData"; // [ADDED]: Verification functions

const VerifyEmailPage = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Assume user is set after register

  const email = location.state?.email || user?.email;

  useEffect(() => {
    if (!email) {
      toast({ title: "Error", description: "No email found. Please sign up again.", variant: "destructive" });
      navigate("/signup");
    }
  }, [email, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast({ title: "Error", description: "Please enter the verification code", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const isVerified = await verifyEmailCode(email, code);
      if (isVerified) {
        toast({ title: "Success", description: "Email verified! Redirecting to dashboard." });
        navigate("/dashboard");
      } else {
        toast({ title: "Error", description: "Invalid code. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Verification failed. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await resendVerificationEmail(email);
      toast({ title: "Success", description: "Verification code resent to your email." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to resend code. Please try again.", variant: "destructive" });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to <strong>{email}</strong>. Enter it below to verify your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
            <Button
              type="button"
              variant="link"
              onClick={handleResend}
              disabled={resendLoading}
              className="w-full mt-4"
            >
              {resendLoading ? "Resending..." : "Resend Code"}
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmailPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface ErrandApplyFormProps {
  errandId: string;
  errandTitle: string;
  onApply: (message: string) => Promise<void>;
}

const ErrandApplyForm = ({ errandId, errandTitle, onApply }: ErrandApplyFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to apply for errands",
        variant: "destructive"
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please write a message to the errand requester",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onApply(message);
      setMessage("");
      toast({
        title: "Application Sent",
        description: "Your application has been submitted successfully"
      });
    } catch (error) {
      console.error("Error applying for errand:", error);
      toast({
        title: "Error",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for this Errand</CardTitle>
        <CardDescription>
          Send a message to the requester explaining why you're a good fit
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} data-id="4dsxjj2tf" data-path="src/components/errands/ErrandApplyForm.tsx">
        <CardContent>
          <Textarea
            placeholder={`Tell the requester why you'd like to help with "${errandTitle}"`}
            className="min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting} />

        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">

            {isSubmitting ? "Submitting..." : "Apply Now"}
          </Button>
        </CardFooter>
      </form>
    </Card>);

};

export default ErrandApplyForm;
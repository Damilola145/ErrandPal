import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from
"@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { createErrand, errandCategories, getCurrentLocation } from "@/services/mockData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PostErrandPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    payment: "",
    urgency: "medium",
    address: "",
    deadline: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  // Check if user is authenticated and can post errands
  if (!user) {
    navigate("/login");
    return null;
  }

  if (user.role !== "requester" && user.role !== "both") {
    navigate("/dashboard");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.payment) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Get location data (would use actual geolocation in a real app)
      const locationData = useCurrentLocation ?
      await getCurrentLocation() :
      { lat: 0, lng: 0, address: formData.address };

      const payment = parseFloat(formData.payment);
      if (isNaN(payment) || payment <= 0) {
        throw new Error("Please enter a valid payment amount");
      }

      // Create the errand
      const errandData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        payment,
        urgency: formData.urgency as "low" | "medium" | "high",
        location: locationData,
        requester: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          rating: user.rating
        },
        deadline: formData.deadline ? new Date(formData.deadline) : undefined
      };

      const createdErrand = await createErrand(errandData);

      toast({
        title: "Success!",
        description: "Your errand has been posted"
      });

      // Navigate to the errand detail page
      navigate(`/errand/${createdErrand.id}`);
    } catch (error) {
      console.error("Error posting errand:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to post errand",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-id="nxp1psppg" data-path="src/pages/PostErrandPage.tsx">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8" data-id="re44os0ts" data-path="src/pages/PostErrandPage.tsx">
        <div className="max-w-2xl mx-auto" data-id="dqf0idxmw" data-path="src/pages/PostErrandPage.tsx">
          <h1 className="text-3xl font-bold mb-6" data-id="b8rsg94ho" data-path="src/pages/PostErrandPage.tsx">Post a New Errand</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Errand Details</CardTitle>
              <CardDescription>
                Enter the details of the errand you need help with.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" data-id="58wxjtqoj" data-path="src/pages/PostErrandPage.tsx">
                <div className="space-y-2" data-id="td4m6hasm" data-path="src/pages/PostErrandPage.tsx">
                  <Label htmlFor="title">Errand Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Grocery Shopping, Package Pickup"
                    value={formData.title}
                    onChange={handleChange}
                    required />

                </div>
                
                <div className="space-y-2" data-id="ezoo74776" data-path="src/pages/PostErrandPage.tsx">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe what you need done in detail..."
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required />

                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="46k90ghj0" data-path="src/pages/PostErrandPage.tsx">
                  <div className="space-y-2" data-id="hcul64gd1" data-path="src/pages/PostErrandPage.tsx">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}>

                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {errandCategories.map((category) =>
                        <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2" data-id="sr3lro2gg" data-path="src/pages/PostErrandPage.tsx">
                    <Label htmlFor="payment">Payment ($) *</Label>
                    <Input
                      id="payment"
                      name="payment"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="15.00"
                      value={formData.payment}
                      onChange={handleChange}
                      required />

                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="lp091zyzk" data-path="src/pages/PostErrandPage.tsx">
                  <div className="space-y-2" data-id="lgqrpan6v" data-path="src/pages/PostErrandPage.tsx">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select
                      value={formData.urgency}
                      onValueChange={(value) => handleSelectChange("urgency", value)}>

                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Within a few days</SelectItem>
                        <SelectItem value="medium">Medium - Within 24 hours</SelectItem>
                        <SelectItem value="high">High - As soon as possible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2" data-id="pz8aec2k3" data-path="src/pages/PostErrandPage.tsx">
                    <Label htmlFor="deadline">Deadline (Optional)</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="datetime-local"
                      value={formData.deadline}
                      onChange={handleChange} />

                  </div>
                </div>
                
                <div className="space-y-2" data-id="1h8ig7w4g" data-path="src/pages/PostErrandPage.tsx">
                  <div className="flex items-center gap-2" data-id="3wwsvc4fu" data-path="src/pages/PostErrandPage.tsx">
                    <input
                      type="checkbox"
                      id="useCurrentLocation"
                      checked={useCurrentLocation}
                      onChange={() => setUseCurrentLocation(!useCurrentLocation)}
                      className="rounded" data-id="p460q4o7u" data-path="src/pages/PostErrandPage.tsx" />

                    <Label htmlFor="useCurrentLocation">Use my current location</Label>
                  </div>
                  
                  {!useCurrentLocation &&
                  <div className="pt-2" data-id="vlbiidjph" data-path="src/pages/PostErrandPage.tsx">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                      id="address"
                      name="address"
                      placeholder="Enter the address for this errand"
                      value={formData.address}
                      onChange={handleChange}
                      required={!useCurrentLocation} />

                    </div>
                  }
                </div>
                
                <div className="pt-4" data-id="pgaxkfbun" data-path="src/pages/PostErrandPage.tsx">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                    disabled={isLoading}>

                    {isLoading ? "Posting..." : "Post Errand"}
                  </Button>
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}>

                Cancel
              </Button>
              <p className="text-xs text-gray-500" data-id="isdfmyj1d" data-path="src/pages/PostErrandPage.tsx">* Required fields</p>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>);

};

export default PostErrandPage;
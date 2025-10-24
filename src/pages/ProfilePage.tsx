import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
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
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserProfile, getErrands, getReviews } from "@/services/mockData";
import { UserRole } from "@/types";
import { mockUsers } from "@/services/mockData";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
    phone: "",
    address: "",
    role: "both" as UserRole,
    avatar: "",
  });
  const [completedErrands, setCompletedErrands] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Initialize form with user data
    setFormData({
      name: user.name,
      email: user.email,
      about: user.about || "",
      phone: user.phone || "",
      address: user.location?.address || "",
      role: user.role,
      avatar: user.avatar || "",
    });

    // Load user's completed errands and reviews
    const loadUserData = async () => {
      try {
        if (user.role === "runner" || user.role === "both") {
          const runnerErrands = await getErrands({
            userId: user.id,
            userRole: "runner",
            status: "completed",
          });
          setCompletedErrands(runnerErrands);
        } else {
          const requesterErrands = await getErrands({
            userId: user.id,
            userRole: "requester",
            status: "completed",
          });
          setCompletedErrands(requesterErrands);
        }

        const userReviews = await getReviews(user.id);
        setReviews(userReviews);
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate uploading by generating a URL (in a real app, upload to a server)
      const fileUrl = URL.createObjectURL(file);
      setPreviewAvatar(fileUrl);
      setFormData((prev) => ({ ...prev, avatar: fileUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      // Update user profile in mock service
      const updatedUser = await updateUserProfile(user.id, {
        name: formData.name,
        role: formData.role,
        about: formData.about,
        phone: formData.phone,
        address: formData.address,
        avatar: formData.avatar,
      });

      // Update AuthContext with new user data
      updateUser({
        ...user,
        name: formData.name,
        role: formData.role,
        about: formData.about,
        phone: formData.phone,
        location: { ...user.location, address: formData.address },
        avatar: formData.avatar,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
      setIsEditing(false);
      setPreviewAvatar(null); // Clear preview after saving
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast({
        title: "Error",
        description: "Failed to update your profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-50"
      data-id="6i9tagc04"
      data-path="src/pages/ProfilePage.tsx"
    >
      <Header />
      <main
        className="flex-1 container mx-auto px-4 py-8"
        data-id="0ms57x37c"
        data-path="src/pages/ProfilePage.tsx"
      >
        <div className="max-w-4xl mx-auto" data-id="rpcb8anri" data-path="src/pages/ProfilePage.tsx">
          <h1
            className="text-3xl font-bold mb-6"
            data-id="0ymgrlmqy"
            data-path="src/pages/ProfilePage.tsx"
          >
            Your Profile
          </h1>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="errands">Errands</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="flex flex-col md:flex-row gap-8"
                    data-id="lpo525xvt"
                    data-path="src/pages/ProfilePage.tsx"
                  >
                    {/* Avatar and stats */}
                    <div
                      className="md:w-1/3"
                      data-id="21cyqwhnz"
                      data-path="src/pages/ProfilePage.tsx"
                    >
                      <div
                        className="flex flex-col items-center"
                        data-id="cg9h75v47"
                        data-path="src/pages/ProfilePage.tsx"
                      >
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={previewAvatar || user.avatar || "https://ui.shadcn.com/avatars/02.png"} alt={user.name} />
                          <AvatarFallback className="text-xl">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h2
                          className="text-xl font-semibold mt-4"
                          data-id="0mxjdtxx3"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          {user.name}
                        </h2>
                        <p
                          className="text-gray-500 mb-4"
                          data-id="jyfgpnvsg"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          {user.role === "both" ? "Requester & Runner" : user.role === "requester" ? "Requester" : "Runner"}
                        </p>
                        <div
                          className="flex items-center text-yellow-500 mb-4"
                          data-id="atidpo4rv"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill={index < Math.round(user.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              data-id="i9eh6zex9"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                data-id="t3w8qpdh5"
                                data-path="src/pages/ProfilePage.tsx"
                              />
                            </svg>
                          ))}
                          <span
                            className="ml-1 text-gray-600"
                            data-id="vv30nsaxe"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            ({user.rating.toFixed(1)})
                          </span>
                        </div>
                        <div
                          className="bg-gray-100 rounded-lg p-4 w-full space-y-2"
                          data-id="lep0ac5o7"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          <div
                            className="flex justify-between"
                            data-id="ah5sjllna"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <span
                              className="text-gray-600"
                              data-id="75l4hwesb"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              Member since
                            </span>
                            <span
                              data-id="jjpq89x00"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              {new Date(user.joinedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div
                            className="flex justify-between"
                            data-id="cyxh3r2bn"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <span
                              className="text-gray-600"
                              data-id="uzxmsuxpo"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              Completed Errands
                            </span>
                            <span
                              data-id="hx36559c9"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              {user.completedErrands}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Profile form */}
                    <div
                      className="md:w-2/3"
                      data-id="evzz1kto6"
                      data-path="src/pages/ProfilePage.tsx"
                    >
                      {isEditing ? (
                        <form
                          onSubmit={handleSubmit}
                          className="space-y-4"
                          data-id="6exelloii"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          <div
                            className="space-y-2"
                            data-id="l3qjozmqs"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div
                            className="space-y-2"
                            data-id="new-avatar-field"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <Label htmlFor="avatar">Profile Picture</Label>
                            <Input
                              id="avatar"
                              name="avatar"
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                            />
                            {previewAvatar && (
                              <img
                                src={previewAvatar}
                                alt="Avatar preview"
                                className="mt-2 h-24 w-24 object-cover rounded-full"
                              />
                            )}
                          </div>
                          <div
                            className="space-y-2"
                            data-id="3actqmtxp"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled
                            />
                            <p
                              className="text-xs text-gray-500"
                              data-id="g9ea2whyw"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              Email cannot be changed
                            </p>
                          </div>
                          <div
                            className="space-y-2"
                            data-id="80uahbd12"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <Label htmlFor="about">About</Label>
                            <Textarea
                              id="about"
                              name="about"
                              value={formData.about}
                              onChange={handleChange}
                              placeholder="Tell others about yourself..."
                              rows={3}
                            />
                          </div>
                          <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            data-id="rtyqb8op7"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <div
                              className="space-y-2"
                              data-id="fvdfp9t8y"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(123) 456-7890"
                              />
                            </div>
                            <div
                              className="space-y-2"
                              data-id="ffg2oiosj"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              <Label htmlFor="address">Address</Label>
                              <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Your address"
                              />
                            </div>
                          </div>
                          <div
                            className="space-y-3"
                            data-id="6p5dqg7eh"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <Label>I want to:</Label>
                            <RadioGroup
                              value={formData.role}
                              onValueChange={(value) => handleRoleChange(value as UserRole)}
                              className="flex flex-col space-y-1"
                            >
                              <div
                                className="flex items-center space-x-2"
                                data-id="xrqdt6dqt"
                                data-path="src/pages/ProfilePage.tsx"
                              >
                                <RadioGroupItem value="requester" id="role-requester" />
                                <Label htmlFor="role-requester">Request errands</Label>
                              </div>
                              <div
                                className="flex items-center space-x-2"
                                data-id="ftrjz8ubl"
                                data-path="src/pages/ProfilePage.tsx"
                              >
                                <RadioGroupItem value="runner" id="role-runner" />
                                <Label htmlFor="role-runner">Run errands for others</Label>
                              </div>
                              <div
                                className="flex items-center space-x-2"
                                data-id="wlodoew5g"
                                data-path="src/pages/ProfilePage.tsx"
                              >
                                <RadioGroupItem value="both" id="role-both" />
                                <Label htmlFor="role-both">Both</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div
                            className="flex gap-3 pt-4"
                            data-id="o5bskgnva"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <Button
                             type="submit"
                             disabled={isLoading}
                             onClick= {handleRoleChange}
                              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                            >
                              {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setIsEditing(false);
                                setPreviewAvatar(null);
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div
                          className="space-y-6"
                          data-id="09lrhzs31"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          <div data-id="14tjzut0i" data-path="src/pages/ProfilePage.tsx">
                            <h3
                              className="text-md font-medium text-gray-600"
                              data-id="lqk075yiw"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              Full Name
                            </h3>
                            <p data-id="qilhli7kx" data-path="src/pages/ProfilePage.tsx">
                              {user.name}
                            </p>
                          </div>
                          <div data-id="r9sp3o64a" data-path="src/pages/ProfilePage.tsx">
                            <h3
                              className="text-md font-medium text-gray-600"
                              data-id="bv7hakrem"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              Email
                            </h3>
                            <p data-id="i0570zzx3" data-path="src/pages/ProfilePage.tsx">
                              {user.email}
                            </p>
                          </div>
                          {user.about && (
                            <div data-id="new-about-field" data-path="src/pages/ProfilePage.tsx">
                              <h3
                                className="text-md font-medium text-gray-600"
                                data-id="new-about-label"
                                data-path="src/pages/ProfilePage.tsx"
                              >
                                About
                              </h3>
                              <p data-id="new-about-value" data-path="src/pages/ProfilePage.tsx">
                                {user.about}
                              </p>
                            </div>
                          )}
                          {user.phone && (
                            <div data-id="new-phone-field" data-path="src/pages/ProfilePage.tsx">
                              <h3
                                className="text-md font-medium text-gray-600"
                                data-id="new-phone-label"
                                data-path="src/pages/ProfilePage.tsx"
                              >
                                Phone Number
                              </h3>
                              <p data-id="new-phone-value" data-path="src/pages/ProfilePage.tsx">
                                {user.phone}
                              </p>
                            </div>
                          )}
                          <div data-id="bewej0x5a" data-path="src/pages/ProfilePage.tsx">
                            <h3
                              className="text-md font-medium text-gray-600"
                              data-id="v78xhrp4h"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              Account Type
                            </h3>
                            <p
                              className="capitalize"
                              data-id="nz5tjd1zv"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              {user.role === "both" ? "Requester & Runner" : user.role}
                            </p>
                          </div>
                          <div data-id="cjn00cfwi" data-path="src/pages/ProfilePage.tsx">
                            <h3
                              className="text-md font-medium text-gray-600"
                              data-id="4kajts3vw"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              Location
                            </h3>
                            <p
                              data-id="cefgagq8k"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              {user.location?.address || "No location set"}
                            </p>
                          </div>
                          <Button
                            onClick={() => setIsEditing(true)}
                            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                          >
                            Edit Profile
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="errands">
              <Card>
                <CardHeader>
                  <CardTitle>Your Errands</CardTitle>
                  <CardDescription>View all the errands you've requested or completed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {completedErrands.length > 0 ? (
                    completedErrands.map((errand: any) => (
                      <div
                        key={errand.id}
                        className="border rounded-lg p-4 hover:border-blue-200 cursor-pointer"
                        onClick={() => navigate(`/errand/${errand.id}`)}
                        data-id="wsvw1pves"
                        data-path="src/pages/ProfilePage.tsx"
                      >
                        <div
                          className="flex justify-between"
                          data-id="qoyxhjt1q"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          <div data-id="9hnyfva5t" data-path="src/pages/ProfilePage.tsx">
                            <h3
                              className="font-medium"
                              data-id="cb2g6drs2"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              {errand.title}
                            </h3>
                            <p
                              className="text-sm text-gray-600"
                              data-id="wxltu08y6"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              {errand.description.substring(0, 100)}...
                            </p>
                          </div>
                          <div
                            className="text-lg font-semibold"
                            data-id="wcctuavxh"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            ${errand.payment.toFixed(2)}
                          </div>
                        </div>
                        <div
                          className="flex justify-between items-center mt-2"
                          data-id="r2evhmn47"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          <div
                            className="text-sm text-gray-500"
                            data-id="wf6kgf3v6"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            Completed: {new Date(errand.updatedAt || errand.createdAt).toLocaleDateString()}
                          </div>
                          <div
                            className="flex items-center gap-2"
                            data-id="8p0i5utry"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            {user.role === "runner" || user.role === "both" ? (
                              <span
                                className="text-sm"
                                data-id="baykdgpgv"
                                data-path="src/pages/ProfilePage.tsx"
                              >
                                Requested by: {errand.requester.name}
                              </span>
                            ) : (
                              <span
                                className="text-sm"
                                data-id="opyw8u0a9"
                                data-path="src/pages/ProfilePage.tsx"
                              >
                                Completed by: {errand.runner?.name || "Unknown"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className="text-center py-8"
                      data-id="993ygqm6o"
                      data-path="src/pages/ProfilePage.tsx"
                    >
                      <p
                        className="text-gray-500"
                        data-id="x1ncche77"
                        data-path="src/pages/ProfilePage.tsx"
                      >
                        No completed errands yet
                      </p>
                      {user.role === "requester" || user.role === "both" ? (
                        <Button
                          variant="link"
                          onClick={() => navigate("/post-errand")}
                          className="mt-2"
                        >
                          Post your first errand
                        </Button>
                      ) : (
                        <Button
                          variant="link"
                          onClick={() => navigate("/browse")}
                          className="mt-2"
                        >
                          Find errands to run
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Your Reviews</CardTitle>
                  <CardDescription>See what others are saying about you</CardDescription>
                </CardHeader>
                <CardContent>
                  {reviews.length > 0 ? (
                    <div
                      className="space-y-6"
                      data-id="iugfcqz8g"
                      data-path="src/pages/ProfilePage.tsx"
                    >
                      {reviews.map((review: any) => (
                        <div
                          key={review.id}
                          className="border rounded-lg p-4"
                          data-id="yye2xwvfw"
                          data-path="src/pages/ProfilePage.tsx"
                        >
                          <div
                            className="flex justify-between items-start"
                            data-id="eoaq8uvet"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            <div
                              className="flex items-center gap-3"
                              data-id="1ocdq70fp"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={
                                    mockUsers.find((u) => u.id === review.reviewerId)?.avatar
                                  }
                                  alt={mockUsers.find((u) => u.id === review.reviewerId)?.name}
                                />
                                <AvatarFallback>
                                  {mockUsers.find((u) => u.id === review.reviewerId)?.name.charAt(0) || "?"}
                                </AvatarFallback>
                              </Avatar>
                              <div data-id="hoau4f19w" data-path="src/pages/ProfilePage.tsx">
                                <p
                                  className="font-medium"
                                  data-id="ngs3ehiwk"
                                  data-path="src/pages/ProfilePage.tsx"
                                >
                                  {mockUsers.find((u) => u.id === review.reviewerId)?.name || "Unknown User"}
                                </p>
                                <div
                                  className="flex items-center text-yellow-500"
                                  data-id="ab4asftbf"
                                  data-path="src/pages/ProfilePage.tsx"
                                >
                                  {Array.from({ length: 5 }).map((_, index) => (
                                    <svg
                                      key={index}
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      viewBox="0 0 20 20"
                                      fill={index < review.rating ? "currentColor" : "none"}
                                      stroke="currentColor"
                                      data-id="b2wltfz8e"
                                      data-path="src/pages/ProfilePage.tsx"
                                    >
                                      <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        data-id="jkzn0hy1q"
                                        data-path="src/pages/ProfilePage.tsx"
                                      />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div
                              className="text-sm text-gray-500"
                              data-id="j784fzune"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              {new Date(review.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          <p
                            className="mt-3 text-gray-700"
                            data-id="ln4akx9ih"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            {review.comment}
                          </p>
                          <div
                            className="mt-2 text-sm text-gray-500"
                            data-id="19zi8l81t"
                            data-path="src/pages/ProfilePage.tsx"
                          >
                            For errand:{" "}
                            <span
                              className="underline cursor-pointer"
                              onClick={() => navigate(`/errand/${review.errandId}`)}
                              data-id="3o2vrupt0"
                              data-path="src/pages/ProfilePage.tsx"
                            >
                              View Errand
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="text-center py-8"
                      data-id="kbraqg2jx"
                      data-path="src/pages/ProfilePage.tsx"
                    >
                      <p
                        className="text-gray-500"
                        data-id="hotugpt26"
                        data-path="src/pages/ProfilePage.tsx"
                      >
                        No reviews yet
                      </p>
                      <p
                        className="text-sm text-gray-500 mt-2"
                        data-id="83hi8n4la"
                        data-path="src/pages/ProfilePage.tsx"
                      >
                        Complete more errands to receive reviews from users
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
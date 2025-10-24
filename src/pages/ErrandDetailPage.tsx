import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getErrandById,
  updateErrandStatus,
  sendMessage,
  getMessages,
  getErrandApplicants,
  applyForErrand,
  updateApplicantStatus } from
"@/services/mockData";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Errand, Message } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from
"@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter } from
"@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrandApplicantsList, {ErrandApplicant}  from "@/components/errands/ErrandApplicantsList";
import ErrandApplyForm from "@/components/errands/ErrandApplyForm";
import DirectChatInterface from "@/components/messaging/DirectChatInterface";

const ErrandDetailPage = () => {
  const { id } = useParams<{id: string;}>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [errand, setErrand] = useState<Errand | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [applicants, setApplicants] = useState<ErrandApplicant[]>([]);
  const [isApplicantsLoading, setIsApplicantsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isStatusUpdateLoading, setIsStatusUpdateLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ErrandApplicant | null>(null);
  const [isDirectChatOpen, setIsDirectChatOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadErrandData = async () => {
      setIsLoading(true);
      try {
        const errandData = await getErrandById(id);
        if (!errandData) {
          toast({
            title: "Error",
            description: "Errand not found",
            variant: "destructive"
          });
          navigate("/browse");
          return;
        }

        setErrand(errandData);

        // Load messages if user is authorized to see them
        if (user && (user.id === errandData.requester.id || errandData.runner && user.id === errandData.runner.id)) {
          const errandMessages = await getMessages(user.id, id);
          setMessages(errandMessages);
        }

        // Load applicants if user is the requester or if the errand is open
        if (user && (user.id === errandData.requester.id || errandData.status === "open")) {
          loadApplicants();
        }
      } catch (error) {
        console.error("Error loading errand:", error);
        toast({
          title: "Error",
          description: "Failed to load errand details",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadErrandData();
  }, [id, navigate, toast, user]);

  const loadApplicants = async () => {
    if (!id) return;

    setIsApplicantsLoading(true);
    try {
      const applicantsData = await getErrandApplicants(id);
      setApplicants(applicantsData);
    } catch (error) {
      console.error("Error loading applicants:", error);
      toast({
        title: "Error",
        description: "Failed to load applicants",
        variant: "destructive"
      });
    } finally {
      setIsApplicantsLoading(false);
    }
  };

  const handleAcceptErrand = async () => {
    if (!user || !errand) return;

    setIsStatusUpdateLoading(true);
    try {
      const updatedErrand = await updateErrandStatus(errand.id, "assigned", user.id);
      if (updatedErrand) {
        setErrand(updatedErrand);
        toast({
          title: "Success",
          description: "You've accepted this errand!"
        });
        setIsAcceptDialogOpen(false);
      }
    } catch (error) {
      console.error("Error accepting errand:", error);
      toast({
        title: "Error",
        description: "Failed to accept errand",
        variant: "destructive"
      });
    } finally {
      setIsStatusUpdateLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: Errand["status"]) => {
    if (!user || !errand) return;

    setIsStatusUpdateLoading(true);
    try {
      const updatedErrand = await updateErrandStatus(errand.id, newStatus);
      if (updatedErrand) {
        setErrand(updatedErrand);
        toast({
          title: "Status Updated",
          description: `Errand status changed to ${newStatus}`
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    } finally {
      setIsStatusUpdateLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!user || !errand || !newMessage.trim()) return;

    const recipientId = user.id === errand.requester.id ?
    errand.runner?.id :
    errand.requester.id;

    if (!recipientId) {
      toast({
        title: "Error",
        description: "Cannot find recipient for message",
        variant: "destructive"
      });
      return;
    }

    setIsSendingMessage(true);
    try {
      const message = await sendMessage({
        senderId: user.id,
        recipientId,
        content: newMessage,
        errandId: errand.id
      });

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setIsMessageDialogOpen(false);

      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully"
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleSendDirectMessage = async (content: string) => {
    if (!user || !errand || !selectedApplicant) return;

    setIsSendingMessage(true);
    try {
      const message = await sendMessage({
        senderId: user.id,
        recipientId: selectedApplicant.userId,
        content,
        errandId: errand.id
      });

      setMessages((prev) => [...prev, message]);

      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully"
      });

      return message;
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleApplyForErrand = async (message: string) => {
    if (!user || !errand) return;

    try {
      await applyForErrand(errand.id, user.id, message);
      toast({
        title: "Application Submitted",
        description: "Your application has been sent to the requester"
      });
      // Reload applicants to show the new application
      await loadApplicants();
    } catch (error) {
      console.error("Error applying for errand:", error);
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleAcceptApplicant = async (applicantId: string) => {
    if (!errand) return;

    try {
      const updatedApplicant = await updateApplicantStatus(applicantId, "accepted");

      // Find the applicant to get their userId
      const applicant = applicants.find((a) => a.id === applicantId);
      if (!applicant) {
        throw new Error("Applicant not found");
      }

      // Update errand status to assigned with the selected runner
      const updatedErrand = await updateErrandStatus(errand.id, "assigned", applicant.userId);
      if (updatedErrand) {
        setErrand(updatedErrand);

        // Update local applicants state
        setApplicants((prev) =>
        prev.map((a) => a.id === applicantId ? updatedApplicant : { ...a, status: "rejected" })
        );

        toast({
          title: "Applicant Accepted",
          description: `${applicant.name} has been assigned to this errand`
        });
      }
    } catch (error) {
      console.error("Error accepting applicant:", error);
      toast({
        title: "Error",
        description: "Failed to accept applicant",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleRejectApplicant = async (applicantId: string) => {
    try {
      const updatedApplicant = await updateApplicantStatus(applicantId, "rejected");

      // Update local state
      setApplicants((prev) =>
      prev.map((a) => a.id === applicantId ? updatedApplicant : a)
      );

      toast({
        title: "Applicant Rejected",
        description: "The applicant has been rejected"
      });
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      toast({
        title: "Error",
        description: "Failed to reject applicant",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleMessageApplicant = (applicant: ErrandApplicant) => {
    setSelectedApplicant(applicant);
    setIsDirectChatOpen(true);
  };

  const getStatusColor = (status: Errand["status"]) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "assigned":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Determine if user can accept this errand
  const canAcceptErrand = user &&
  errand?.status === "open" &&
  errand?.requester.id !== user.id && (
  user.role === "runner" || user.role === "both");

  // Determine if user can apply for this errand
  const canApplyForErrand = user &&
  errand?.status === "open" &&
  errand?.requester.id !== user.id && (
  user.role === "runner" || user.role === "both") &&
  // Check if user hasn't already applied
  !applicants.some((a) => a.userId === user.id);

  // Determine if user is the requester
  const isRequester = user && errand && user.id === errand.requester.id;

  // Determine if user is the runner
  const isRunner = user && errand?.runner && user.id === errand.runner.id;

  // Determine available status actions based on current status and user role
  const getAvailableStatusActions = () => {
    if (!user || !errand) return [];

    if (isRequester) {
      switch (errand.status) {
        case "open":
          return [["cancelled", "Cancel Errand"]];
        case "assigned":
          return [["in-progress", "Mark In Progress"], ["cancelled", "Cancel Errand"]];
        case "in-progress":
          return [["completed", "Mark Completed"], ["cancelled", "Cancel Errand"]];
        default:
          return [];
      }
    } else if (isRunner) {
      switch (errand.status) {
        case "assigned":
          return [["in-progress", "Start Errand"]];
        case "in-progress":
          return [["completed", "Mark Completed"]];
        default:
          return [];
      }
    }

    return [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50" data-id="jm79tjxv9" data-path="src/pages/ErrandDetailPage.tsx">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center" data-id="y8bp4eoad" data-path="src/pages/ErrandDetailPage.tsx">
          <p data-id="t5ghrkshv" data-path="src/pages/ErrandDetailPage.tsx">Loading errand details...</p>
        </main>
        <Footer />
      </div>);

  }

  if (!errand) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50" data-id="56onp9uaa" data-path="src/pages/ErrandDetailPage.tsx">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center" data-id="asifmo0b4" data-path="src/pages/ErrandDetailPage.tsx">
          <div className="text-center" data-id="sq0gdgrqd" data-path="src/pages/ErrandDetailPage.tsx">
            <h2 className="text-2xl font-bold mb-2" data-id="f3otwsp31" data-path="src/pages/ErrandDetailPage.tsx">Errand Not Found</h2>
            <p className="mb-4" data-id="1mm6eyu16" data-path="src/pages/ErrandDetailPage.tsx">The errand you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/browse")}>Browse Errands</Button>
          </div>
        </main>
        <Footer />
      </div>);

  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-id="05sbj9c8y" data-path="src/pages/ErrandDetailPage.tsx">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8" data-id="w21ww7aoa" data-path="src/pages/ErrandDetailPage.tsx">
        <Button
          variant="outline"
          size="sm"
          className="mb-6"
          onClick={() => navigate(-1)}>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor" data-id="z0srd80s8" data-path="src/pages/ErrandDetailPage.tsx">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" data-id="14kgbbiu7" data-path="src/pages/ErrandDetailPage.tsx" />
          </svg>
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-id="e6umfwtji" data-path="src/pages/ErrandDetailPage.tsx">
          {/* Main Content */}
          <div className="lg:col-span-2" data-id="az530l99f" data-path="src/pages/ErrandDetailPage.tsx">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                {(isRequester && errand.status === "open") &&
                <TabsTrigger value="applicants" onClick={loadApplicants}>
                    Applicants
                    {applicants.length > 0 &&
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full" data-id="wqnyu9vsl" data-path="src/pages/ErrandDetailPage.tsx">
                        {applicants.length}
                      </span>
                  }
                  </TabsTrigger>
                }
                {(isRequester || isRunner) &&
                <TabsTrigger value="messages">Messages</TabsTrigger>
                }
              </TabsList>
              
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start" data-id="a6p1e8va4" data-path="src/pages/ErrandDetailPage.tsx">
                      <div data-id="62h098at1" data-path="src/pages/ErrandDetailPage.tsx">
                        <CardTitle className="text-2xl">{errand.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2" data-id="hs9rq4hib" data-path="src/pages/ErrandDetailPage.tsx">
                          <Badge className={getStatusColor(errand.status)}>
                            {errand.status.charAt(0).toUpperCase() + errand.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">{errand.category}</Badge>
                          <Badge variant={
                          errand.urgency === "high" ?
                          "destructive" :
                          errand.urgency === "medium" ?
                          "secondary" :
                          "outline"
                          }>
                            {errand.urgency.charAt(0).toUpperCase() + errand.urgency.slice(1)} Priority
                          </Badge>
                        </div>
                      </div>
                      <div className="text-2xl font-bold" data-id="w4c6zp47v" data-path="src/pages/ErrandDetailPage.tsx">${errand.payment.toFixed(2)}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div data-id="n7hjayofq" data-path="src/pages/ErrandDetailPage.tsx">
                      <h3 className="font-semibold text-lg mb-2" data-id="0qh4jxnac" data-path="src/pages/ErrandDetailPage.tsx">Description</h3>
                      <p className="text-gray-700 whitespace-pre-line" data-id="oki8px1u0" data-path="src/pages/ErrandDetailPage.tsx">{errand.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="lkfcrinhl" data-path="src/pages/ErrandDetailPage.tsx">
                      <div data-id="g8ltl7co1" data-path="src/pages/ErrandDetailPage.tsx">
                        <h3 className="font-semibold text-md mb-1" data-id="mn0jl7mcn" data-path="src/pages/ErrandDetailPage.tsx">Location</h3>
                        <p className="text-gray-700" data-id="9syc1foit" data-path="src/pages/ErrandDetailPage.tsx">{errand.location.address}</p>
                      </div>
                      
                      <div data-id="x6sqh74dm" data-path="src/pages/ErrandDetailPage.tsx">
                        <h3 className="font-semibold text-md mb-1" data-id="qc7mucy5g" data-path="src/pages/ErrandDetailPage.tsx">
                          {errand.deadline ? "Deadline" : "Posted On"}
                        </h3>
                        <p className="text-gray-700" data-id="q8bz5660i" data-path="src/pages/ErrandDetailPage.tsx">
                          {errand.deadline ?
                          new Date(errand.deadline).toLocaleString() :
                          new Date(errand.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action buttons based on user role and errand status */}
                    <div className="pt-4 border-t flex flex-wrap gap-3" data-id="oj9pfr486" data-path="src/pages/ErrandDetailPage.tsx">
                     {/* {canAcceptErrand &&
                      <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">
                              Accept Errand
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Accept this Errand?</DialogTitle>
                              <DialogDescription>
                                You are about to accept "{errand.title}". Once accepted, you'll be responsible for completing this errand.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                              variant="outline"
                              onClick={() => setIsAcceptDialogOpen(false)}>

                                Cancel
                              </Button>
                              <Button
                              onClick={handleAcceptErrand}
                              disabled={isStatusUpdateLoading}
                              className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">

                                {isStatusUpdateLoading ? "Accepting..." : "Accept Errand"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      }*/}
                      
                      {/* Status update buttons */}
                      {getAvailableStatusActions().map(([status, label]) =>
                      <Button
                        key={status}
                        variant={status === "cancelled" ? "destructive" : "default"}
                        onClick={() => handleStatusChange(status as Errand["status"])}
                        disabled={isStatusUpdateLoading}>

                          {isStatusUpdateLoading ? "Updating..." : label}
                        </Button>
                      )}
                      
                      {/* Message button if user is part of this errand */}
                      {(isRequester || isRunner) && errand.status !== "open" &&
                      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor" data-id="zjztzj2dr" data-path="src/pages/ErrandDetailPage.tsx">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" data-id="6szwlhg9b" data-path="src/pages/ErrandDetailPage.tsx" />
                              </svg>
                              Message
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send a Message</DialogTitle>
                              <DialogDescription>
                                Send a message about this errand to {isRequester ? errand.runner?.name : errand.requester.name}
                              </DialogDescription>
                            </DialogHeader>
                            <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="min-h-[100px]" />

                            <DialogFooter>
                              <Button
                              variant="outline"
                              onClick={() => setIsMessageDialogOpen(false)}>

                                Cancel
                              </Button>
                              <Button
                              onClick={handleSendMessage}
                              disabled={isSendingMessage || !newMessage.trim()}>

                                {isSendingMessage ? "Sending..." : "Send Message"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      }
                    </div>
                  </CardContent>
                </Card>
                
                {/* Apply for Errand - only show this if user can apply */}
                {canApplyForErrand &&
                <div className="mt-6" data-id="gpmcjv5uo" data-path="src/pages/ErrandDetailPage.tsx">
                    <ErrandApplyForm
                    errandId={errand.id}
                    errandTitle={errand.title}
                    onApply={handleApplyForErrand} />

                  </div>
                }
              </TabsContent>
              
              <TabsContent value="applicants">
                {isApplicantsLoading ?
                <Card>
                    <CardContent className="py-10 text-center">
                      <p data-id="54maqnsfo" data-path="src/pages/ErrandDetailPage.tsx">Loading applicants...</p>
                    </CardContent>
                  </Card> :

                <ErrandApplicantsList
                  errandId={errand.id}
                  applicants={applicants}
                  isRequester={isRequester}
                  onAcceptApplicant={handleAcceptApplicant}
                  onRejectApplicant={handleRejectApplicant}
                  onMessageApplicant={handleMessageApplicant} />

                }
              </TabsContent>
              
              <TabsContent value="messages">
                {(isRequester || isRunner) && errand.status !== "open" &&
                <Card>
                    <CardHeader>
                      <CardTitle>Messages</CardTitle>
                      <CardDescription>
                        Communication about this errand
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4" data-id="7vd5oklvj" data-path="src/pages/ErrandDetailPage.tsx">
                        {messages.length > 0 ?
                      messages.map((message) => {
                        const isFromCurrentUser = message.senderId === user?.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`} data-id="dx0pn5z5o" data-path="src/pages/ErrandDetailPage.tsx">

                                  <div className={`max-w-[80%] p-3 rounded-lg ${
                            isFromCurrentUser ?
                            'bg-blue-100 text-blue-900 rounded-br-none' :
                            'bg-gray-100 text-gray-900 rounded-bl-none'}`
                            } data-id="7csrqnn1f" data-path="src/pages/ErrandDetailPage.tsx">
                                    <p data-id="3i5oo42mb" data-path="src/pages/ErrandDetailPage.tsx">{message.content}</p>
                                    <div className={`text-xs mt-1 ${
                              isFromCurrentUser ? 'text-blue-700' : 'text-gray-500'}`
                              } data-id="2pj5td04l" data-path="src/pages/ErrandDetailPage.tsx">
                                      {new Date(message.timestamp).toLocaleString()}
                                    </div>
                                  </div>
                                </div>);
                      }) :

                      <p className="text-center text-gray-500 py-10" data-id="c53f6r7rz" data-path="src/pages/ErrandDetailPage.tsx">No messages yet. Start a conversation!</p>
                      }
                      </div>
                      
                      <div className="mt-4 pt-4 border-t" data-id="54ynuau24" data-path="src/pages/ErrandDetailPage.tsx">
                        <div className="flex gap-2" data-id="cx5od6vvj" data-path="src/pages/ErrandDetailPage.tsx">
                          <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="min-h-[60px]" />

                          <Button
                          onClick={handleSendMessage}
                          disabled={isSendingMessage || !newMessage.trim()}
                          className="mt-auto">

                            Send
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                }
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div data-id="k8bglatho" data-path="src/pages/ErrandDetailPage.tsx">
            {/* Requester Card */}
            <Card>
              <CardHeader>
                <CardTitle>Requested By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4" data-id="90ez4gh03" data-path="src/pages/ErrandDetailPage.tsx">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={errand.requester.avatar} alt={errand.requester.name} />
                    <AvatarFallback>{errand.requester.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div data-id="bcycpcrtv" data-path="src/pages/ErrandDetailPage.tsx">
                    <p className="font-medium" data-id="9o0wdtm3p" data-path="src/pages/ErrandDetailPage.tsx">{errand.requester.name}</p>
                    <div className="flex items-center text-yellow-500 mt-1" data-id="k6raufdbm" data-path="src/pages/ErrandDetailPage.tsx">
                      {Array.from({ length: 5 }).map((_, index) =>
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill={index < Math.round(errand.requester.rating) ? "currentColor" : "none"}
                        stroke="currentColor" data-id="7i2hyt3i1" data-path="src/pages/ErrandDetailPage.tsx">

                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-id="33hgw9gnv" data-path="src/pages/ErrandDetailPage.tsx" />
                        </svg>
                      )}
                      <span className="text-xs ml-1 text-gray-600" data-id="speyykp1i" data-path="src/pages/ErrandDetailPage.tsx">
                        ({errand.requester.rating.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Runner Card (if assigned) */}
            {errand.runner &&
            <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Errand Runner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4" data-id="et2dxs2h5" data-path="src/pages/ErrandDetailPage.tsx">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={errand.runner.avatar} alt={errand.runner.name} />
                      <AvatarFallback>{errand.runner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div data-id="i5xtb5op8" data-path="src/pages/ErrandDetailPage.tsx">
                      <p className="font-medium" data-id="lyukp4bgg" data-path="src/pages/ErrandDetailPage.tsx">{errand.runner.name}</p>
                      <div className="flex items-center text-yellow-500 mt-1" data-id="x42zw76fg" data-path="src/pages/ErrandDetailPage.tsx">
                        {Array.from({ length: 5 }).map((_, index) =>
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill={index < Math.round(errand.runner.rating) ? "currentColor" : "none"}
                        stroke="currentColor" data-id="9gfonyhiy" data-path="src/pages/ErrandDetailPage.tsx">

                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-id="w9lk02voy" data-path="src/pages/ErrandDetailPage.tsx" />
                          </svg>
                      )}
                        <span className="text-xs ml-1 text-gray-600" data-id="r4zkkkmeo" data-path="src/pages/ErrandDetailPage.tsx">
                          ({errand.runner.rating.toFixed(1)})
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            }
            
            {/* Additional Information */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Errand Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm" data-id="mslezqo7k" data-path="src/pages/ErrandDetailPage.tsx">
                  <div className="text-gray-500" data-id="qhzhfwnrj" data-path="src/pages/ErrandDetailPage.tsx">Created:</div>
                  <div data-id="ldk1de9b7" data-path="src/pages/ErrandDetailPage.tsx">{new Date(errand.createdAt).toLocaleDateString()}</div>
                  
                  <div className="text-gray-500" data-id="lln4bd32y" data-path="src/pages/ErrandDetailPage.tsx">Status:</div>
                  <div className="capitalize" data-id="hyy9ke8th" data-path="src/pages/ErrandDetailPage.tsx">{errand.status}</div>
                  
                  <div className="text-gray-500" data-id="q658msdme" data-path="src/pages/ErrandDetailPage.tsx">Category:</div>
                  <div data-id="7k52s7uk6" data-path="src/pages/ErrandDetailPage.tsx">{errand.category}</div>
                  
                  <div className="text-gray-500" data-id="bw4os4qrh" data-path="src/pages/ErrandDetailPage.tsx">Payment:</div>
                  <div data-id="1ljazguvp" data-path="src/pages/ErrandDetailPage.tsx">${errand.payment.toFixed(2)}</div>
                  
                  <div className="text-gray-500" data-id="jv6zzfwei" data-path="src/pages/ErrandDetailPage.tsx">Urgency:</div>
                  <div className="capitalize" data-id="zf3dqm3ft" data-path="src/pages/ErrandDetailPage.tsx">{errand.urgency}</div>
                  
                  {errand.deadline &&
                  <>
                      <div className="text-gray-500" data-id="6wqtgbuoi" data-path="src/pages/ErrandDetailPage.tsx">Deadline:</div>
                      <div data-id="psjhkn2el" data-path="src/pages/ErrandDetailPage.tsx">{new Date(errand.deadline).toLocaleString()}</div>
                    </>
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Direct Message Dialog */}
      <Dialog open={isDirectChatOpen && !!selectedApplicant} onOpenChange={(open) => !open && setIsDirectChatOpen(false)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedApplicant &&
          <DirectChatInterface
            recipientId={selectedApplicant.userId}
            recipientName={selectedApplicant.name}
            recipientAvatar={selectedApplicant.avatar}
            errandId={errand.id}
            errandTitle={errand.title}
            messages={messages.filter((m) =>
            m.senderId === user?.id && m.recipientId === selectedApplicant.userId ||
            m.senderId === selectedApplicant.userId && m.recipientId === user?.id
            )}
            onSendMessage={handleSendDirectMessage} />

          }
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>);

};

export default ErrandDetailPage;
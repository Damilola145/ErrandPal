import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getErrands, getMessages } from "@/services/mockData";
import { Errand, Message } from "@/types";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myErrands, setMyErrands] = useState<Errand[]>([]);
  const [acceptedErrands, setAcceptedErrands] = useState<Errand[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

const defaultTab = user?.role === "runner" ? "accepted-errands" : "my-errands";

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        // Load user's requested errands
        const userErrands = await getErrands({
          userId: user.id,
          userRole: 'requester'
        });
        setMyErrands(userErrands);

      
        // Load errands the user has accepted as a runner
        if (user.role === 'runner' || user.role === 'both') {
          const runnerErrands = await getErrands({
            userId: user.id,
            userRole: 'runner'
          });
          setAcceptedErrands(runnerErrands);
        }

        // Load messages
        const userMessages = await getMessages(user.id);
        setMessages(userMessages);
      } 
      
      
      catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user, navigate]);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-id="29ogwhl34" data-path="src/pages/DashboardPage.tsx">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8" data-id="9gf337mow" data-path="src/pages/DashboardPage.tsx">
        {user &&
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4" data-id="xjabo8nf0" data-path="src/pages/DashboardPage.tsx">
              <div data-id="ngax5fxfy" data-path="src/pages/DashboardPage.tsx">
                <h1 className="text-3xl font-bold" data-id="vhopgjqzn" data-path="src/pages/DashboardPage.tsx">Welcome, {user.name}</h1>
                <p className="text-gray-600" data-id="ps3rsqo01" data-path="src/pages/DashboardPage.tsx">Manage your errands and tasks</p>
              </div>
              <div className="flex gap-4" data-id="d68l8zc52" data-path="src/pages/DashboardPage.tsx">
                 {(user.role === 'requester' || user.role === 'both') &&
                <Button
                onClick={() => navigate("/post-errand")}
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">

                  Post New Errand
                </Button>
                }
                {(user.role === 'runner' || user.role === 'both') &&
              <Button
                variant="outline"
                onClick={() => navigate("/browse")}>

                    Find Errands to Run
                  </Button>
              }
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" data-id="c271fb9nr" data-path="src/pages/DashboardPage.tsx">
              {/* Stats Card 1 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Active Errands</CardTitle>
                  <CardDescription>
                    Errands you've posted or accepted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-id="7ldeuejpb" data-path="src/pages/DashboardPage.tsx">
                    {myErrands.filter((e) => e.status !== 'completed' && e.status !== 'cancelled').length +
                  acceptedErrands.filter((e) => e.status !== 'completed' && e.status !== 'cancelled').length}
                  </div>
                </CardContent>
              </Card>
              
              {/* Stats Card 2 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Completed Errands</CardTitle>
                  <CardDescription>
                    Successfully completed errands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-id="0v4odsq0v" data-path="src/pages/DashboardPage.tsx">
                    {myErrands.filter((e) => e.status === 'completed').length +
                  acceptedErrands.filter((e) => e.status === 'completed').length}
                  </div>
                </CardContent>
              </Card>
              
              {/* Stats Card 3 */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Unread Messages</CardTitle>
                  <CardDescription>
                    Messages waiting for your response
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" data-id="c95tjcje3" data-path="src/pages/DashboardPage.tsx">
                    {messages.filter((m) => !m.read && m.recipientId === user.id).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">

              {(user.role === 'requester' || user.role === 'both') &&
                <TabsTrigger value="my-errands">My Errands</TabsTrigger>

              }
              {(user.role === 'runner' || user.role === 'both') &&
                <TabsTrigger value="accepted-errands">Running</TabsTrigger>
              }
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>


            {(user.role === 'requester' || user.role === 'both') &&
              <TabsContent value="my-errands" className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-6" data-id="yys04gksr" data-path="src/pages/DashboardPage.tsx">
                  <h2 className="text-xl font-semibold mb-4" data-id="4ywufizns" data-path="src/pages/DashboardPage.tsx">Errands You've Posted</h2>

                  {isLoading ?
                    <div className="text-center py-8" data-id="nky38639u" data-path="src/pages/DashboardPage.tsx">Loading your errands...</div> :
                    myErrands.length > 0 ?
                      <div className="space-y-4" data-id="bgv92ftyu" data-path="src/pages/DashboardPage.tsx">
                        {myErrands.map((errand) =>
                          <div
                            key={errand.id}
                            className="border rounded-lg p-4 hover:border-blue-200 cursor-pointer"
                            onClick={() => navigate(`/errand/${errand.id}`)} data-id="icxge1ub8" data-path="src/pages/DashboardPage.tsx">

                            <div className="flex justify-between items-start" data-id="h1zb07vhl" data-path="src/pages/DashboardPage.tsx">
                              <div data-id="z2fhby2vl" data-path="src/pages/DashboardPage.tsx">
                                <h3 className="font-medium" data-id="oez9v5p15" data-path="src/pages/DashboardPage.tsx">{errand.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-1" data-id="18mdwaj9b" data-path="src/pages/DashboardPage.tsx">{errand.description}</p>
                              </div>
                              <Badge className={getStatusColor(errand.status)}>
                                {errand.status.charAt(0).toUpperCase() + errand.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center mt-3" data-id="irrp7si9x" data-path="src/pages/DashboardPage.tsx">
                              <div className="text-sm text-gray-500" data-id="ul8a5xutj" data-path="src/pages/DashboardPage.tsx">
                                {new Date(errand.createdAt).toLocaleDateString()}
                              </div>
                              <div className="font-medium" data-id="g29opinxb" data-path="src/pages/DashboardPage.tsx">${errand.payment.toFixed(2)}</div>
                            </div>
                          </div>
                        )}
                      </div> :

                      <div className="text-center py-8 text-gray-500" data-id="e6fe9o7ef" data-path="src/pages/DashboardPage.tsx">
                        <p data-id="lc2g7hile" data-path="src/pages/DashboardPage.tsx">You haven't posted any errands yet.</p>
                        <Button
                          onClick={() => navigate("/post-errand")}
                          variant="link"
                          className="mt-2">

                          Post your first errand
                        </Button>
                      </div>
                  }
                </div>
              </TabsContent>} 

            {(user.role === 'runner' || user.role === 'both') &&
              <TabsContent value="accepted-errands" className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-6" data-id="zx5mgak8n" data-path="src/pages/DashboardPage.tsx">
                  <h2 className="text-xl font-semibold mb-4" data-id="eb4wlkxh4" data-path="src/pages/DashboardPage.tsx">Errands You're Running</h2>

                  {isLoading ?
                    <div className="text-center py-8" data-id="nbtl8of10" data-path="src/pages/DashboardPage.tsx">Loading accepted errands...</div> :
                    acceptedErrands.length > 0 ?
                      <div className="space-y-4" data-id="or2bs5m9v" data-path="src/pages/DashboardPage.tsx">
                        {acceptedErrands.map((errand) =>
                          <div
                            key={errand.id}
                            className="border rounded-lg p-4 hover:border-blue-200 cursor-pointer"
                            onClick={() => navigate(`/errand/${errand.id}`)} data-id="knfz7vcc5" data-path="src/pages/DashboardPage.tsx">

                            <div className="flex justify-between items-start" data-id="3oci3m105" data-path="src/pages/DashboardPage.tsx">
                              <div data-id="f5vli34wf" data-path="src/pages/DashboardPage.tsx">
                                <h3 className="font-medium" data-id="7373a4tjz" data-path="src/pages/DashboardPage.tsx">{errand.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-1" data-id="hse7iicxa" data-path="src/pages/DashboardPage.tsx">{errand.description}</p>
                                <p className="text-xs text-gray-500 mt-1" data-id="3yldanccw" data-path="src/pages/DashboardPage.tsx">
                                  Requested by: {errand.requester.name}
                                </p>
                              </div>
                              <Badge className={getStatusColor(errand.status)}>
                                {errand.status.charAt(0).toUpperCase() + errand.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center mt-3" data-id="lht33c8sw" data-path="src/pages/DashboardPage.tsx">
                              <div className="text-sm text-gray-500" data-id="0c051uxuq" data-path="src/pages/DashboardPage.tsx">
                                {errand.deadline ?
                                  `Due by: ${new Date(errand.deadline).toLocaleDateString()}` :
                                  "No deadline"}
                              </div>
                              <div className="font-medium" data-id="41iasqvsq" data-path="src/pages/DashboardPage.tsx">${errand.payment.toFixed(2)}</div>
                            </div>
                          </div>
                        )}
                      </div> :

                      <div className="text-center py-8 text-gray-500" data-id="znravtevj" data-path="src/pages/DashboardPage.tsx">
                        <p data-id="q35zvix55" data-path="src/pages/DashboardPage.tsx">You haven't accepted any errands to run yet.</p>
                        <Button
                          onClick={() => navigate("/browse")}
                          variant="link"
                          className="mt-2">

                          Find errands to run
                        </Button>
                      </div>
                  }
                </div>
              </TabsContent>}
              
              <TabsContent value="messages" className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm p-6" data-id="h7t0fpxqh" data-path="src/pages/DashboardPage.tsx">
                  <h2 className="text-xl font-semibold mb-4" data-id="l5cwysnul" data-path="src/pages/DashboardPage.tsx">Recent Messages</h2>
                  
                  {isLoading ?
                <div className="text-center py-8" data-id="56i1yz1y7" data-path="src/pages/DashboardPage.tsx">Loading messages...</div> :
                messages.length > 0 ?
                <div className="space-y-4" data-id="gnoxxwl4v" data-path="src/pages/DashboardPage.tsx">
                      {messages.slice(0, 5).map((message) => {
                    const isReceived = message.recipientId === user.id;
                    return (
                      <div
                        key={message.id}
                        className={`border rounded-lg p-4 cursor-pointer ${
                        isReceived && !message.read ? "bg-blue-50 border-blue-200" : ""}`
                        }
                        onClick={() => navigate("/messages")} data-id="ev22ye6e4" data-path="src/pages/DashboardPage.tsx">

                            <div className="flex justify-between items-start" data-id="m17251chu" data-path="src/pages/DashboardPage.tsx">
                              <div data-id="67e1ped4a" data-path="src/pages/DashboardPage.tsx">
                                <h3 className="font-medium" data-id="kliy4y3og" data-path="src/pages/DashboardPage.tsx">
                                  {isReceived ? "From: " : "To: "}
                                  {isReceived ?
                              mockUsers.find((u) => u.id === message.senderId)?.name || "Unknown User" :
                              mockUsers.find((u) => u.id === message.recipientId)?.name || "Unknown User"}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2" data-id="q1zaa00dv" data-path="src/pages/DashboardPage.tsx">{message.content}</p>
                              </div>
                              {isReceived && !message.read &&
                          <Badge variant="default" className="bg-blue-500">New</Badge>
                          }
                            </div>
                            <div className="text-xs text-gray-500 mt-2" data-id="o7hhs4kfc" data-path="src/pages/DashboardPage.tsx">
                              {new Date(message.timestamp).toLocaleString()}
                            </div>
                          </div>);

                  })}
                      {messages.length > 5 &&
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/messages")}>

                          View All Messages
                        </Button>
                  }
                    </div> :

                <div className="text-center py-8 text-gray-500" data-id="vvm3w6avg" data-path="src/pages/DashboardPage.tsx">
                      <p data-id="a9re3gbm4" data-path="src/pages/DashboardPage.tsx">You don't have any messages yet.</p>
                    </div>
                }
                </div>
              </TabsContent>
            </Tabs>
          </>
        }
      </main>
      
      <Footer />
    </div>);

};

export default DashboardPage;

// Importing mock users for display purposes (in a real app this would come from context or API)
import { mockUsers } from "@/services/mockData";
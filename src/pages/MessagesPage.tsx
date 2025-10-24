import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Message } from "@/types";
import { getMessages, mockUsers, sendMessage } from "@/services/mockData";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationGroup {
  userId: string;
  userName: string;
  userAvatar?: string;
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}

const MessagesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ConversationGroup[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationGroup | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const userMessages = await getMessages(user.id);
        setAllMessages(userMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
        toast({
          title: "Error",
          description: "Failed to load messages",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [user, toast]);

  // Group messages into conversations
  useEffect(() => {
    if (!allMessages.length || !user) return;

    const conversationMap = new Map<string, Message[]>();

    // Group messages by the other person's ID
    allMessages.forEach((message) => {
      const otherPersonId = message.senderId === user.id ? message.recipientId : message.senderId;

      if (!conversationMap.has(otherPersonId)) {
        conversationMap.set(otherPersonId, []);
      }

      conversationMap.get(otherPersonId)?.push(message);
    });

    // Convert map to array and sort
    const conversationGroups: ConversationGroup[] = [];

    conversationMap.forEach((messages, userId) => {
      // Sort messages by timestamp
      const sortedMessages = [...messages].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      const otherUser = mockUsers.find((u) => u.id === userId);

      if (otherUser) {
        conversationGroups.push({
          userId,
          userName: otherUser.name,
          userAvatar: otherUser.avatar,
          messages: sortedMessages,
          lastMessage: sortedMessages[sortedMessages.length - 1],
          unreadCount: sortedMessages.filter((m) => m.recipientId === user.id && !m.read).length
        });
      }
    });

    // Sort conversations by most recent message
    conversationGroups.sort((a, b) =>
    new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    );

    setConversations(conversationGroups);

    // Auto-select the first conversation if none is selected
    if (!selectedConversation && conversationGroups.length > 0) {
      setSelectedConversation(conversationGroups[0]);
    }
  }, [allMessages, user, selectedConversation]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!user || !selectedConversation || !newMessage.trim()) return;

    setIsSending(true);
    try {
      const sentMessage = await sendMessage({
        senderId: user.id,
        recipientId: selectedConversation.userId,
        content: newMessage
      });

      // Update local state
      setAllMessages((prev) => [...prev, sentMessage]);
      setNewMessage("");

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((convo) =>
  convo.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" data-id="hev01lnzy" data-path="src/pages/MessagesPage.tsx">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8" data-id="zapnec3f4" data-path="src/pages/MessagesPage.tsx">
        <h1 className="text-3xl font-bold mb-6" data-id="j50er5o88" data-path="src/pages/MessagesPage.tsx">Messages</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden" data-id="zsqnhymm8" data-path="src/pages/MessagesPage.tsx">
          <div className="flex h-[600px]" data-id="vwup85sm8" data-path="src/pages/MessagesPage.tsx">
            {/* Conversation List */}
            <div className="w-1/3 border-r" data-id="ldfit3om0" data-path="src/pages/MessagesPage.tsx">
              <div className="p-4 border-b" data-id="69vg8hp32" data-path="src/pages/MessagesPage.tsx">
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />

              </div>
              
              {isLoading ?
              <div className="flex items-center justify-center h-full" data-id="jlbz1iv52" data-path="src/pages/MessagesPage.tsx">
                  <p data-id="umw486jnj" data-path="src/pages/MessagesPage.tsx">Loading conversations...</p>
                </div> :
              filteredConversations.length > 0 ?
              <div className="overflow-y-auto h-[calc(600px-65px)]" data-id="q30brdoq4" data-path="src/pages/MessagesPage.tsx">
                  {filteredConversations.map((convo) =>
                <div
                  key={convo.userId}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.userId === convo.userId ? 'bg-blue-50' : ''}`
                  }
                  onClick={() => setSelectedConversation(convo)} data-id="zdufc4o5v" data-path="src/pages/MessagesPage.tsx">

                      <div className="flex items-center gap-3" data-id="rwi4exgyi" data-path="src/pages/MessagesPage.tsx">
                        <Avatar>
                          <AvatarImage src={convo.userAvatar} alt={convo.userName} />
                          <AvatarFallback>{convo.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0" data-id="o00ho6amr" data-path="src/pages/MessagesPage.tsx">
                          <div className="flex justify-between items-center" data-id="z6ib7jlfg" data-path="src/pages/MessagesPage.tsx">
                            <span className="font-medium truncate" data-id="2ak8c0mdp" data-path="src/pages/MessagesPage.tsx">{convo.userName}</span>
                            <span className="text-xs text-gray-500" data-id="wedre160l" data-path="src/pages/MessagesPage.tsx">
                              {new Date(convo.lastMessage.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate" data-id="u7a23spkc" data-path="src/pages/MessagesPage.tsx">
                            {convo.lastMessage.senderId === user.id ? 'You: ' : ''}
                            {convo.lastMessage.content}
                          </p>
                        </div>
                        {convo.unreadCount > 0 &&
                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" data-id="wpsxzxulb" data-path="src/pages/MessagesPage.tsx">
                            {convo.unreadCount}
                          </span>
                    }
                      </div>
                    </div>
                )}
                </div> :

              <div className="flex items-center justify-center h-full" data-id="11lalcpyh" data-path="src/pages/MessagesPage.tsx">
                  <p className="text-gray-500" data-id="78ci4nryc" data-path="src/pages/MessagesPage.tsx">No conversations found</p>
                </div>
              }
            </div>
            
            {/* Message View */}
            <div className="w-2/3 flex flex-col" data-id="3bt25iwpm" data-path="src/pages/MessagesPage.tsx">
              {selectedConversation ?
              <>
                  <div className="p-4 border-b flex items-center gap-3" data-id="j9q2z0i7n" data-path="src/pages/MessagesPage.tsx">
                    <Avatar>
                      <AvatarImage src={selectedConversation.userAvatar} alt={selectedConversation.userName} />
                      <AvatarFallback>{selectedConversation.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div data-id="xfzv7eofk" data-path="src/pages/MessagesPage.tsx">
                      <h2 className="font-semibold" data-id="rap25xzfi" data-path="src/pages/MessagesPage.tsx">{selectedConversation.userName}</h2>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4" data-id="llf1460kk" data-path="src/pages/MessagesPage.tsx">
                    {selectedConversation.messages.map((message) => {
                    const isFromCurrentUser = message.senderId === user.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`} data-id="pha8enfp9" data-path="src/pages/MessagesPage.tsx">

                          <div className={`max-w-[80%] p-3 rounded-lg ${
                        isFromCurrentUser ?
                        'bg-blue-100 text-blue-900 rounded-br-none' :
                        'bg-gray-100 text-gray-900 rounded-bl-none'}`
                        } data-id="goul5dkcc" data-path="src/pages/MessagesPage.tsx">
                            <p data-id="kip0mvyz2" data-path="src/pages/MessagesPage.tsx">{message.content}</p>
                            <div className={`text-xs mt-1 ${
                          isFromCurrentUser ? 'text-blue-700' : 'text-gray-500'}`
                          } data-id="uyggha6qa" data-path="src/pages/MessagesPage.tsx">
                              {new Date(message.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>);

                  })}
                  </div>
                  
                  <div className="p-4 border-t" data-id="nycki1jqq" data-path="src/pages/MessagesPage.tsx">
                    <div className="flex gap-2" data-id="wqbn424dy" data-path="src/pages/MessagesPage.tsx">
                      <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="min-h-[60px]" />

                      <Button
                      onClick={handleSendMessage}
                      disabled={isSending || !newMessage.trim()}
                      className="mt-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">

                        Send
                      </Button>
                    </div>
                  </div>
                </> :

              <div className="flex items-center justify-center h-full" data-id="pft623mcv" data-path="src/pages/MessagesPage.tsx">
                  <div className="text-center" data-id="mlwmph5d5" data-path="src/pages/MessagesPage.tsx">
                    <p className="text-gray-500 mb-2" data-id="p2ez7tgb0" data-path="src/pages/MessagesPage.tsx">Select a conversation to start messaging</p>
                    {conversations.length === 0 && !isLoading &&
                  <Button onClick={() => navigate("/browse")}>
                        Find Errands
                      </Button>
                  }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>);

};

export default MessagesPage;
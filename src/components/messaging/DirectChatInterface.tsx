import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface DirectChatProps {
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  errandId?: string;
  errandTitle?: string;
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
}

const DirectChatInterface = ({
  recipientId,
  recipientName,
  recipientAvatar,
  errandId,
  errandTitle,
  messages,
  onSendMessage
}: DirectChatProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to send messages",
        variant: "destructive"
      });
      return;
    }

    if (!newMessage.trim()) {
      return;
    }

    setIsSending(true);
    try {
      await onSendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="px-4 py-3 border-b flex-shrink-0">
        <div className="flex justify-between items-center" data-id="nwyagz1h4" data-path="src/components/messaging/DirectChatInterface.tsx">
          <div className="flex items-center gap-3" data-id="mrl6tyl7u" data-path="src/components/messaging/DirectChatInterface.tsx">
            <Avatar>
              <AvatarImage src={recipientAvatar} alt={recipientName} />
              <AvatarFallback>{recipientName[0]}</AvatarFallback>
            </Avatar>
            <div data-id="dg8fhg6u7" data-path="src/components/messaging/DirectChatInterface.tsx">
              <CardTitle className="text-lg">{recipientName}</CardTitle>
              {errandTitle &&
              <CardDescription className="flex items-center gap-2">
                  <span data-id="2x2qdiuck" data-path="src/components/messaging/DirectChatInterface.tsx">Regarding:</span>
                  <Badge variant="outline" className="font-normal">
                    {errandTitle}
                  </Badge>
                </CardDescription>
              }
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ?
        messages.map((message) => {
          const isFromCurrentUser = message.senderId === user?.id;
          return (
            <div
              key={message.id}
              className={`flex ${isFromCurrentUser ? "justify-end" : "justify-start"}`} data-id="bipclsv5w" data-path="src/components/messaging/DirectChatInterface.tsx">

                <div
                className={`max-w-[80%] p-3 rounded-lg ${
                isFromCurrentUser ?
                "bg-blue-100 text-blue-900 rounded-br-none" :
                "bg-gray-100 text-gray-900 rounded-bl-none"}`
                } data-id="1jlzr0kce" data-path="src/components/messaging/DirectChatInterface.tsx">

                  <p className="whitespace-pre-line" data-id="5tszrn52n" data-path="src/components/messaging/DirectChatInterface.tsx">{message.content}</p>
                  <div
                  className={`text-xs mt-1 ${
                  isFromCurrentUser ? "text-blue-700" : "text-gray-500"}`
                  } data-id="q073sct91" data-path="src/components/messaging/DirectChatInterface.tsx">

                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>);

        }) :

        <div className="h-full flex items-center justify-center" data-id="geydsm51w" data-path="src/components/messaging/DirectChatInterface.tsx">
            <p className="text-gray-500 text-center" data-id="gnk14tup0" data-path="src/components/messaging/DirectChatInterface.tsx">
              No messages yet.<br data-id="lc5c52k38" data-path="src/components/messaging/DirectChatInterface.tsx" />
              Start the conversation with {recipientName}!
            </p>
          </div>
        }
        <div ref={messagesEndRef} data-id="e6sdxruk1" data-path="src/components/messaging/DirectChatInterface.tsx" />
      </CardContent>
      
      <CardFooter className="p-4 border-t mt-auto">
        <form onSubmit={handleSendMessage} className="w-full" data-id="9a1r1073t" data-path="src/components/messaging/DirectChatInterface.tsx">
          <div className="flex gap-2" data-id="oluulam6a" data-path="src/components/messaging/DirectChatInterface.tsx">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="min-h-[60px] flex-grow"
              disabled={isSending} />

            <Button
              type="submit"
              disabled={isSending || !newMessage.trim()}
              className="mt-auto bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600">

              {isSending ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>);

};

export default DirectChatInterface;
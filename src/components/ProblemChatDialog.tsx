
import { useState } from "react";
import { AtSign, Send, Smile, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  id: number;
  content: string;
  timestamp: string;
  isUser: boolean;
  user: {
    name: string;
    avatar?: string;
    color?: string;
  };
};

type ProblemChatDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  problem: {
    id: string;
    title: string;
    description: string;
    category: string;
    user: {
      name: string;
      avatar?: string;
      color?: string;
    };
  };
};

export const ProblemChatDialog = ({ isOpen, onClose, problem }: ProblemChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Hi there! I need help with my problem: "${problem.description}"`,
      timestamp: "Just now",
      isUser: false,
      user: problem.user
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      content: newMessage,
      timestamp: "Just now",
      isUser: true,
      user: {
        name: "You",
        color: "#5865F2"
      }
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b border-discord-border flex-shrink-0">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">{problem.title}</DialogTitle>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            <span className="bg-discord-primary/20 text-discord-primary px-2 py-0.5 rounded mr-2">
              {problem.category}
            </span>
            Help {problem.user.name} solve their problem
          </div>
        </DialogHeader>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar className="h-8 w-8 mt-0.5 mx-2">
                  {message.user.avatar && <AvatarImage src={message.user.avatar} alt={message.user.name} />}
                  <AvatarFallback style={{ backgroundColor: message.user.color || "#5865F2" }} className="text-white">
                    {message.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-baseline mb-1">
                    <span className="text-sm font-medium text-white mr-2">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <div 
                    className={`rounded-lg p-3 text-sm ${
                      message.isUser 
                        ? 'bg-discord-primary text-white' 
                        : 'bg-discord-sidebar/60 text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-discord-border">
          <div className="relative">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[44px] max-h-[50vh] w-full resize-none rounded-lg bg-discord-sidebar/90 border-none px-4 py-3 text-white placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="absolute right-3 bottom-2.5 flex items-center space-x-2 text-muted-foreground">
              <button className="hover:text-white">
                <AtSign size={20} />
              </button>
              <button className="hover:text-white">
                <Smile size={20} />
              </button>
              <Button 
                size="sm" 
                className="h-8 bg-discord-primary hover:bg-discord-primary/90 ml-2"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

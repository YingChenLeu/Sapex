import { useState, useRef, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Smile, UserRound } from "lucide-react";
import { useSidebar } from "./SideBar";
// Message type for wellness chat, similar to ProblemChatDialog
type Message = {
  id: string;
  content: string;
  createdAt: any;
  user: {
    name: string;
    avatar?: string;
    uid?: string;
  };
};

type WellnessChatDialogProps = {
  sessionId: string;
  isOpen: boolean;
  onClose: () => void;
};

const WellnessChatDialog = ({
  sessionId,
  onClose,
}: WellnessChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { collapsed } = useSidebar();


  // Load messages from Firestore (esupport collection, aligned with ProblemChatDialog)
  useEffect(() => {
    if (!sessionId) return;
    const messagesRef = collection(db, "esupport", sessionId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to Firestore (esupport collection, aligned with ProblemChatDialog)
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;
    let avatar = null;
    if (currentUser?.uid) {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        avatar = userDoc.data().profilePicture || null;
      }
    }
    await addDoc(collection(db, "esupport", sessionId, "messages"), {
      content: newMessage.trim(),
      createdAt: serverTimestamp(),
      user: {
        name: currentUser.displayName || "Anonymous",
        avatar,
        uid: currentUser.uid,
      },
    });
    setNewMessage("");
  };

  // Format time for display
  const formatTime = (createdAt: any) => {
    if (!createdAt?.seconds) return "just now";
    const date = new Date(createdAt.seconds * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      className={`h-screen w-full bg-[#0A0D17] flex flex-col ${
        collapsed ? "pl-[80px]" : "pl-[240px]"
      } transition-all duration-300`}
    >

      <div className="bg-[#1e212d] border-b border-discord-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {currentUser?.uid === sessionId ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserRound className="text-white h-5 w-5" />
              </div>
              <div>
                <h3 className="text-white font-medium">Anonymous User</h3>
              </div>
            </div>
          ) : (
            // Current user is the seeker, show supporter's info
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8oclm0VDc"
                  alt="Supporter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium">Ying Chen Leu</h3>
              </div>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.user.uid === currentUser?.uid
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
              {message.user.uid !== currentUser?.uid && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  {message.user.avatar ? (
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xs font-semibold">
                      {message.user.name ? message.user.name[0] : "S"}
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-col">
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.user.uid === currentUser?.uid
                      ? "bg-discord-primary text-white rounded-br-md"
                      : "bg-discord-sidebar text-white rounded-bl-md"
                  }`}
                >
                  <p className="text-sm rounded-2xl px-4 py-2 w-fit max-w-[500px] break-words bg-green-400/20 text-green-200">{message.content}</p>
                </div>
                <span className="text-xs text-slate-400 mt-1 px-2">
                  {formatTime(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-[#1e212d] border-t border-discord-border p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-discord-sidebar border-none text-white placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          This is a safe space. Your conversation is private and anonymous. The data will only be used to improve our services and will not be shared with third parties.
        </p>
      </div>
    </div>
  );
};

export default WellnessChatDialog;

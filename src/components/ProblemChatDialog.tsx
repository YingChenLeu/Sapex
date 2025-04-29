"use client";

import { useState, useEffect, useRef } from "react";
import { AtSign, Send, Smile } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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

type ProblemChatDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  problem: {
    id: string;
    title: string;
    description: string;
    course: string;
    user: {
      name: string;
      avatar?: string;
    };
  };
};

export const ProblemChatDialog = ({
  isOpen,
  onClose,
  problem,
}: ProblemChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Active users
  useEffect(() => {
    if (!problem?.id || !currentUser) return;

    const activeUserRef = doc(
      db,
      "problems",
      problem.id,
      "activeUsers",
      currentUser.uid
    );

    const setActive = async () => {
      await setDoc(activeUserRef, {
        name: currentUser.displayName || "Anonymous",
        avatar: currentUser.photoURL || null,
        uid: currentUser.uid,
        lastActive: serverTimestamp(),
      });
    };

    setActive();

    return () => {
      deleteDoc(activeUserRef);
    };
  }, [problem?.id, currentUser]);

  // Load messages
  useEffect(() => {
    if (!problem?.id) return;

    const messagesRef = collection(db, "problems", problem.id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [problem?.id]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Active users listener
  useEffect(() => {
    if (!problem?.id) return;

    const usersRef = collection(db, "problems", problem.id, "activeUsers");

    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const count = snapshot.docs.length;
      setActiveUsers(count);
    });

    return () => unsubscribe();
  }, [problem?.id]);

  // Typing users with names and 5s timeout
  useEffect(() => {
    if (!problem?.id) return;

    const typingRef = collection(db, "problems", problem.id, "typing");

    const unsubscribe = onSnapshot(typingRef, (snap) => {
      const usersTyping: { [key: string]: string } = {};

      snap.forEach((doc) => {
        const { name, lastTyped } = doc.data() as {
          name: string;
          lastTyped: any;
        };
        const secondsAgo = Date.now() / 1000 - lastTyped?.seconds;
        if (secondsAgo < 5) {
          usersTyping[doc.id] = name || "Anonymous";
        }
      });

      const filtered = Object.entries(usersTyping)
        .filter(([uid]) => uid !== currentUser?.uid)
        .map(([, name]) => name);

      setTypingUsers(filtered);
    });

    return () => unsubscribe();
  }, [problem?.id, currentUser?.uid]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    await addDoc(collection(db, "problems", problem.id, "messages"), {
      content: newMessage.trim(),
      createdAt: serverTimestamp(),
      user: {
        name: currentUser.displayName || "Anonymous",
        avatar: currentUser.photoURL || null,
        uid: currentUser.uid,
      },
    });

    setNewMessage("");
    await deleteDoc(doc(db, "problems", problem.id, "typing", currentUser.uid));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!currentUser) return;

    setDoc(doc(db, "problems", problem.id, "typing", currentUser.uid), {
      name: currentUser.displayName || "Someone",
      lastTyped: serverTimestamp(),
    });

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 bg-[#11141d] text-white animate-in zoom-in-95 fade-in duration-300 rounded-xl">
        <DialogHeader className="px-6 py-4 border-b border-discord-border flex-shrink-0 relative">
          <DialogTitle className="text-xl font-semibold">
            {problem.title}
          </DialogTitle>
          <div className="absolute right-32 top-6 text-sm text-muted-foreground animate-pulse">
            {activeUsers} online
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            <span className="bg-discord-primary/20 text-discord-primary px-2 py-0.5 rounded mr-2">
              {problem.course}
            </span>
            Help {problem.user.name} solve their problem
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8 mt-0.5">
                {message.user.avatar ? (
                  <AvatarImage
                    src={message.user.avatar}
                    alt={message.user.name}
                  />
                ) : (
                  <AvatarFallback className="bg-discord-primary text-white">
                    {message.user.name?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className="text-sm font-medium text-white">
                    {message.user.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {message.createdAt?.seconds
                      ? dayjs.unix(message.createdAt.seconds).fromNow()
                      : "just now"}
                  </span>
                </div>
                <div className="rounded-2xl px-4 py-2 text-sm w-fit max-w-[500px] break-words bg-blue-400/20 text-blue-200">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {typingUsers.length > 0 && (
            <div className="px-4 text-xs text-muted-foreground animate-pulse">
              {typingUsers.join(", ")}{" "}
              {typingUsers.length === 1 ? "is" : "are"} typing...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

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

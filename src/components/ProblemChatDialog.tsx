"use client";

import { useState, useEffect, useRef } from "react";
import { AtSign, Smile, Trash, CircleUserRound } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Sigma } from "lucide-react";
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
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "framer-motion";
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
    category: string;
    course: string;
    urgency: "low" | "medium" | "high";
    image?: string | null;
    createdAt: Date | null;
    user: {
      name: string;
      avatar?: string;
      uid?: string;
    };
    responses: number;
    likes: number;
  };
};

export const ProblemChatDialog = ({
  isOpen,
  onClose,
  problem,
}: ProblemChatDialogProps) => {
  const [showCalcBar, setShowCalcBar] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [mentionOptions, setMentionOptions] = useState<
    { name: string; avatar?: string }[]
  >([]);
  const [showMentionList, setShowMentionList] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
      let avatar = null;
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        avatar = userDoc.data().profilePicture || null;
      }
      await setDoc(activeUserRef, {
        name: currentUser.displayName || "Anonymous",
        avatar,
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

      const names = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { name: data.name, avatar: data.avatar || null };
      });
      setMentionOptions(names);
    });

    return () => unsubscribe();
  }, [problem?.id]);

  // Typing users
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

    let avatar = null;
    if (currentUser?.uid) {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        avatar = userDoc.data().profilePicture || null;
      }
    }

    await addDoc(collection(db, "problems", problem.id, "messages"), {
      content: newMessage.trim(),
      createdAt: serverTimestamp(),
      user: {
        name: currentUser.displayName || "Anonymous",
        avatar,
        uid: currentUser.uid,
      },
    });

    setNewMessage("");
    setShowMentionList(false);
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
    if (e.key === "Tab" && showMentionList) {
      e.preventDefault();
      if (mentionOptions.length > 0) {
        insertMention(mentionOptions[0].name);
      }
    }
  };

  const insertMention = (username: string) => {
    if (!textAreaRef.current) return;
    const text = newMessage;
    const before = text.substring(0, cursorPosition);
    const after = text.substring(cursorPosition);
    const lastAt = before.lastIndexOf("@");
    const newText = before.substring(0, lastAt + 1) + username + " " + after;
    setNewMessage(newText);
    setShowMentionList(false);
    setTimeout(() => {
      textAreaRef.current?.focus();
      const pos = lastAt + username.length + 2;
      textAreaRef.current?.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleDeletePost = async () => {
    if (!problem?.id) return;

    const messagesRef = collection(db, "problems", problem.id, "messages");
    const snapshot = await getDocs(messagesRef);

    const category = problem.category;

    // Use a Set to ensure each user's contribution is only logged once per post deletion
    const uniqueUserIds = new Set<string>();
    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const uid = data?.user?.uid;
      if (uid) {
        uniqueUserIds.add(uid);
      }
    });

    await Promise.all(
      Array.from(uniqueUserIds).map((uid) =>
        addDoc(collection(db, "users", uid, "contributions"), {
          category,
          timestamp: serverTimestamp(),
        })
      )
    );

    await deleteDoc(doc(db, "problems", problem.id));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 bg-[#11141d] text-white">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="problem-dialog"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={(definition) => {
                if (definition === "exit") onClose();
              }}
              className="flex flex-col h-full"
            >
              <DialogHeader className="px-6 py-4 border-b border-discord-border flex-shrink-0 relative">
                <DialogTitle className="text-xl font-semibold flex items-center gap-4">
                  {problem.title}
                  {currentUser?.uid === problem.user.uid && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeletePost}
                      className="flex items-center gap-1"
                    >
                      <Trash size={16} />
                      Delete Post
                    </Button>
                  )}
                </DialogTitle>
                <div className="absolute right-20 top-5 text-sm text-muted-foreground animate-pulse">
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
                          <CircleUserRound className="w-9 h-9" />
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

              <div className="p-4 border-t border-discord-border relative">
                <Textarea
                  ref={textAreaRef}
                  value={newMessage}
                  onChange={(e) => {
                    const value = e.target.value;
                    const caret = e.target.selectionStart || 0;
                    setNewMessage(value);
                    setCursorPosition(caret);

                    const textUntilCursor = value.slice(0, caret);
                    const lastAt = textUntilCursor.lastIndexOf("@");

                    if (lastAt !== -1) {
                      const query = textUntilCursor.slice(lastAt + 1);
                      if (query.length >= 0) {
                        setMentionQuery(query);
                        setShowMentionList(true);
                      } else {
                        setShowMentionList(false);
                      }
                    } else {
                      setShowMentionList(false);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="min-h-[44px] max-h-[50vh] w-full resize-none rounded-lg bg-discord-sidebar/90 border-none px-4 py-3 text-white placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                {showMentionList && (
                  <div className="absolute left-4 bottom-20 bg-[#1e212d] border border-gray-600 rounded-md mt-2 p-1 max-h-40 overflow-y-auto w-60 z-20">
                    {mentionOptions
                      .filter((option) =>
                        option.name
                          .toLowerCase()
                          .includes(mentionQuery.toLowerCase())
                      )
                      .map((option, idx) => (
                        <div
                          key={idx}
                          className="flex items-center px-2 py-1 hover:bg-blue-500 hover:text-white text-sm cursor-pointer"
                          onClick={() => insertMention(option.name)}
                        >
                          {option.avatar ? (
                            <Avatar className="h-5 w-5 mr-2">
                              <AvatarImage
                                src={option.avatar}
                                alt={option.name}
                              />
                              <AvatarFallback>{option.name[0]}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-500 flex items-center justify-center mr-2 text-xs">
                              {option.name[0]}
                            </div>
                          )}
                          @{option.name}
                        </div>
                      ))}
                  </div>
                )}

                {showEmojiPicker && (
                  <div className="absolute bottom-14 right-3 z-20">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        const emoji = emojiData.emoji;
                        const start = textAreaRef.current?.selectionStart || 0;
                        const end = textAreaRef.current?.selectionEnd || 0;
                        const text = newMessage;
                        const updatedText =
                          text.substring(0, start) +
                          emoji +
                          text.substring(end);
                        setNewMessage(updatedText);
                        setTimeout(() => {
                          textAreaRef.current?.focus();
                          textAreaRef.current?.setSelectionRange(
                            start + emoji.length,
                            start + emoji.length
                          );
                        }, 0);
                      }}
                      theme={Theme.DARK}
                    />
                  </div>
                )}

                <div className="absolute right-3 bottom-2.5 flex items-center space-x-2 text-muted-foreground">
                  <button
                    className="hover:text-white"
                    onClick={() => {
                      if (!textAreaRef.current) return;
                      const start = textAreaRef.current.selectionStart || 0;
                      const end = textAreaRef.current.selectionEnd || 0;
                      const text = newMessage;
                      const updatedText =
                        text.substring(0, start) + "@" + text.substring(end);
                      setNewMessage(updatedText);
                      setTimeout(() => {
                        textAreaRef.current?.focus();
                        textAreaRef.current?.setSelectionRange(
                          start + 1,
                          start + 1
                        );
                      }, 0);
                    }}
                  >
                    <AtSign size={20} />
                  </button>
                  {problem.category.toLowerCase() === "mathematics" && (
                    <>
                      <button
                        className="hover:text-white"
                        onClick={() => setShowCalcBar((prev) => !prev)}
                      >
                        <Sigma size={20} />
                      </button>
                      {showCalcBar && (
                        <div className="absolute bottom-12 right-0 bg-[#1e212d] p-2 rounded shadow-lg flex space-x-2 text-sm z-20">
                          {[
                            { label: "∫", value: "\\int" },
                            { label: "dx", value: "dx" },
                            { label: "dy/dx", value: "\\frac{dy}{dx}" },
                            { label: "x²", value: "x^2" },
                            { label: "√", value: "\\sqrt{}" },
                            { label: "lim", value: "\\lim_{x \\to }" },
                            { label: "∞", value: "∞" },
                          ].map((item) => (
                            <button
                              key={item.label}
                              className="bg-discord-sidebar hover:bg-discord-primary px-2 py-1 rounded"
                              onClick={() => {
                                const start = textAreaRef.current?.selectionStart || 0;
                                const end = textAreaRef.current?.selectionEnd || 0;
                                const text = newMessage;
                                const updatedText =
                                  text.substring(0, start) +
                                  item.value +
                                  text.substring(end);
                                setNewMessage(updatedText);
                                setTimeout(() => {
                                  textAreaRef.current?.focus();
                                  const pos = start + item.value.length;
                                  textAreaRef.current?.setSelectionRange(pos, pos);
                                }, 0);
                              }}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  <button
                    className="hover:text-white"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  >
                    <Smile size={20} />
                  </button>

                  <button
                    disabled={!newMessage.trim()}
                    type="submit"
                    onClick={handleSendMessage}
                    className="h-8 w-8 ml-2 rounded-full disabled:bg-zinc-700 bg-discord-primary hover:bg-discord-primary/90 transition duration-200 flex items-center justify-center"
                  >
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-300 h-4 w-4"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <motion.path
                        d="M5 12l14 0"
                        initial={{
                          strokeDasharray: "50%",
                          strokeDashoffset: "50%",
                        }}
                        animate={{
                          strokeDashoffset: newMessage.trim() ? 0 : "50%",
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "linear",
                        }}
                      />
                      <path d="M13 18l6 -6" />
                      <path d="M13 6l6 6" />
                    </motion.svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
export default ProblemChatDialog;

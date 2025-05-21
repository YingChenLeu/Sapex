"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Paperclip, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useEffect, useState } from "react";
import { DisplayImage } from "./DisplayImage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";


type Problem = {
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

const urgencyColors: Record<Problem["urgency"], string> = {
  low: "bg-blue-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

interface HelpBoardCardProps {
  problem: Problem;
  onHelpClick: (problem: Problem) => void;
}

export const HelpBoardCard = ({ problem, onHelpClick }: HelpBoardCardProps) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [messageCount, setMessageCount] = useState<number>(0);

  useEffect(() => {
    const fetchMessageCount = async () => {
      if (!problem?.id) return;
      const messagesRef = collection(db, "problems", problem.id, "messages");
      const snapshot = await getDocs(messagesRef);
      setMessageCount(snapshot.size); // snapshot.size = number of docs
    };
  
    fetchMessageCount();
  }, [problem?.id]);

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    whileHover={{
      scale: 1.03,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }}
  >
    <Card className="bg-discord-card border-discord-border h-full flex flex-col w-auto">
      {/* Header */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-discord-primary/80 hover:bg-discord-primary">
            {problem.course}
          </Badge>
          <Badge
            className={`${urgencyColors[problem.urgency]} hover:${
              urgencyColors[problem.urgency]
            }`}
          >
            {problem.urgency.charAt(0).toUpperCase() + problem.urgency.slice(1)}{" "}
            Priority
          </Badge>
        </div>
        <CardTitle className="text-lg text-white">{problem.title}</CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-grow overflow-hidden">
        <p className="text-muted-foreground text-sm overflow-y-auto h-22 pr-2 custom-scrollbar">
          {problem.description}
        </p>

        {/* Image Popup Dialog */}
        {problem.image && (
          <DisplayImage
            isOpen={isImageDialogOpen}
            onClose={() => setIsImageDialogOpen(false)}
            imageUrl={problem.image}
          />
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col border-t border-discord-border pt-4 gap-4">
        <div className="flex items-center justify-between w-full">
          {/* User info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {problem.user?.avatar ? (
                <AvatarImage
                  src={problem.user.avatar}
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              ) : (
                <AvatarFallback className="bg-blue-500 text-white">
                  {problem.user?.name?.charAt(0) || "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {problem.user.name}
            </span>
          </div>

          {/* Timestamp */}
          <div className="flex items-center text-muted-foreground text-xs gap-1">
            <Clock size={14} />
            <span>
              {problem.createdAt
                ? formatDistanceToNow(problem.createdAt, { addSuffix: true })
                : "Just now"}
            </span>
          </div>
        </div>

        {/* Attachments and Help Button */}
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            {/* Responses */}
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MessageCircle size={16} />
              <span>{messageCount}</span>
            </div>

            {/* Attachments */}
            {problem.image ? (
              <div
                onClick={() => setIsImageDialogOpen(true)}
                className="flex items-center gap-1 text-muted-foreground text-sm cursor-pointer hover:text-white transition-colors"
              >
                <Paperclip size={16} />
                <span>1 Attachment</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Paperclip size={16} />
                <span>No Attachments</span>
              </div>
            )}
          </div>

          {/* Help Solve Button */}
          <Button
            variant="default"
            className="bg-discord-primary hover:bg-discord-primary/90 hover:text-white text-[#9abbbf] rounded-lg px-4 py-2"
            onClick={() => onHelpClick(problem)}
          >
            Help Solve
          </Button>
        </div>
      </CardFooter>
    </Card>
    </motion.div>
  );
};

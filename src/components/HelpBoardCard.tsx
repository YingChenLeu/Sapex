import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, ThumbsUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";


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
  return (
    <Card className="bg-discord-card border-discord-border h-full flex flex-col w-auto">
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
      <CardContent className="flex-grow overflow-hidden">
        <p className="text-muted-foreground text-sm overflow-y-auto h-22 pr-2 custom-scrollbar">{problem.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col border-t border-discord-border pt-4 gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {problem.user?.avatar ? (
                <AvatarImage src={problem.user.avatar} />
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
          <div className="flex items-center text-muted-foreground text-xs gap-1">
            <Clock size={14} />
            <span>
              {problem.createdAt
                ? formatDistanceToNow(problem.createdAt, { addSuffix: true })
                : "Just now"}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MessageCircle size={16} />
              <span>{problem.responses}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <ThumbsUp size={16} />
              <span>{problem.likes}</span>
            </div>
          </div>
          <Button
            variant="default"
            className="bg-discord-primary hover:bg-discord-primary/90"
            onClick={() => onHelpClick(problem)}
          >
            Help Solve
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

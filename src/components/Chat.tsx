
import { useParams } from "react-router-dom";
import WellnessChatDialog from "@/components/WellnessChatDialog";

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div className="text-white p-4">Invalid session ID</div>;

  return (
    <WellnessChatDialog
      sessionId={id}
      isOpen={true}
      onClose={() => {}}
    />
  );
};

export default ChatPage;
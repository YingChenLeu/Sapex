"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DisplayImageProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const DisplayImage = ({ isOpen, onClose, imageUrl }: DisplayImageProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-transparent border-none flex justify-center items-center">
        <img
          src={imageUrl}
          alt="Attachment"
          className="max-w-auto max-h-auto rounded-lg shadow-lg"
        />
      </DialogContent>
    </Dialog>
  );
};

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Sesuaikan dengan komponen UI yang Anda gunakan
import { RiAiGenerate } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AiPromptPopover = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateClick = () => {
    onGenerate(prompt);
    setIsOpen(false); // Tutup popover setelah generate
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <RiAiGenerate />
          Generate AI
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <h2>Generate AI Content</h2>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
          />
          <Button onClick={handleGenerateClick}>Generate</Button>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AiPromptPopover;

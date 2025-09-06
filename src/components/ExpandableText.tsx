
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ExpandableText = ({ text, maxLength = 200, className = "" }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text || text.length <= maxLength) {
    return <p className={className}>{text}</p>;
  }
  
  const truncatedText = text.slice(0, maxLength) + "...";
  
  return (
    <div>
      <p className={className}>
        {isExpanded ? text : truncatedText}
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 p-0 h-auto text-accent hover:text-accent/80 font-medium"
      >
        {isExpanded ? (
          <>
            Show Less <ChevronUp className="h-4 w-4 ml-1" />
          </>
        ) : (
          <>
            Read More <ChevronDown className="h-4 w-4 ml-1" />
          </>
        )}
      </Button>
    </div>
  );
};

export default ExpandableText;

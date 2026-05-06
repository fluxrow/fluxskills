import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  label?: string;
  tooltip?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "secondary" | "outline";
  copiedLabel?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  tooltip,
  className,
  size = "sm",
  variant = "secondary",
  copiedLabel = "Copied!",
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const button = (
    <Button
      type="button"
      variant={copied ? "default" : variant}
      size={size}
      onClick={handleCopy}
      className={cn("gap-1.5 font-mono text-xs", className)}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? copiedLabel : label}
    </Button>
  );

  if (!tooltip) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

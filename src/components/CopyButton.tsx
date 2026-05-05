import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  label?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function CopyButton({ value, label = "Copy", className, size = "sm" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <Button
      type="button"
      variant={copied ? "default" : "secondary"}
      size={size}
      onClick={handleCopy}
      className={cn("gap-1.5 font-mono text-xs", className)}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : label}
    </Button>
  );
}
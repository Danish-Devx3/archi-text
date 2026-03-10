import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

export function TextareaButton({
    input,
    setInput,
    onGenerate,
    isLoading,
}: {
    input: string;
    setInput: (input: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}) {
    return (
        <div className="grid w-full gap-2 p-4 relative">
            <Textarea className="resize-none h-[200px]" placeholder="Type your message here." value={input} onChange={(e) => setInput(e.target.value)} />
            <Button onClick={onGenerate} disabled={isLoading} className="absolute bottom-8 right-8 z-10 py-5">Generate <Play size={16} className={cn(isLoading && "animate-spin")} /></Button>
        </div>
    )
}

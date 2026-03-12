import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

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
            <Label htmlFor="input" className="text-md font-semibold pb-1 pl-2">Write here problem statement</Label>
            <Textarea id="input" className="resize-none h-[200px]" placeholder="Type for knowning flow" value={input} onChange={(e) => setInput(e.target.value)} />
            <Button onClick={onGenerate} disabled={isLoading} className="absolute bottom-15 right-8 z-10">Generate <Play size={16} className={cn(isLoading && "animate-spin")} /></Button>
            <div className="flex items-center justify-center">
                <span className="text-sm pt-1 text-muted-foreground hover:text-primary transition:text duration-200">More explain more accurate diagram</span>
            </div>
        </div>
    )
}

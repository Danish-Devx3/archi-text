import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setInput } from "@/redux/features/chatSlice";
import { generateDiagram } from "@/lib/llm";
import { Spinner } from "./ui/spinner";

export function TextareaButton() {
    const input = useAppSelector((state) => state.chat.input);
    const isLoading = useAppSelector((state) => state.chat.isLoading);
    const dispatch = useAppDispatch();
    return (
        <div className="grid w-full gap-2 p-4 relative">
            <Label htmlFor="input" className="text-md font-semibold pb-1 pl-2">Write here problem statement</Label>
            <Textarea id="input" className="resize-none h-[200px]" placeholder="Type for knowning flow" value={input} onChange={(e) => dispatch(setInput(e.target.value))} />
            <Button onClick={() => generateDiagram(input, dispatch)} disabled={isLoading} className="absolute bottom-15 right-8 z-10">{isLoading ? (<>Generating <Spinner /></>) : "Generate"}</Button>
            <div className="flex items-center justify-center">
                <span className="text-sm pt-1 text-muted-foreground hover:text-primary transition:text duration-200">More explain more accurate diagram</span>
            </div>
        </div>
    )
}

"use client";

import React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputPanelProps {
    input: string;
    setInput: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const TEMPLATES = [
    { label: "Flowchart", text: "graph TD\n    A[Start] --> B{Is it?}\n    B -- Yes --> C[OK]\n    C --> D[Rethink]\n    D --> B\n    B -- No --> E[End]" },
    { label: "Sequence", text: "sequenceDiagram\n    participant Alice\n    participant Bob\n    Alice->>John: Hello John, how are you?\n    loop Healthcheck\n        John->>John: Fight against hypochondria\n    end\n    Note right of John: Rational thoughts <br/>prevail!\n    John-->>Alice: Great!" },
    { label: "Class", text: "classDiagram\n    Animal <|-- Duck\n    Animal <|-- Fish\n    Animal <|-- Zebra\n    Animal : +int age\n    Animal : +String gender\n    Animal: +isMammal()\n    Animal: +mate()\n    class Duck{\n        +String beakColor\n        +swim()\n        +quack()\n    }" },
    { label: "State", text: "stateDiagram-v2\n    [*] --> Still\n    Still --> [*]\n    Still --> Moving\n    Moving --> Still\n    Moving --> Crash\n    Crash --> [*]" },
    { label: "Gantt", text: "gantt\n    title A Gantt Diagram\n    dateFormat  YYYY-MM-DD\n    section Section\n    A task           :a1, 2014-01-01, 30d\n    Another task     :after a1  , 20d\n    section Another\n    Task in sec      :2014-01-12  , 12d\n    another task      : 24d" },
    { label: "Mindmap", text: "mindmap\n  root((mindmap))\n    Origins\n      Long history\n      ::icon(fa fa-book)\n      Popularisation\n        British popular psychology author Tony Buzan\n    Research\n      On effectiveness<br/>and features\n      On Automatic creation\n        Uses\n            Creative techniques\n            Strategic planning\n            Argument mapping" },
];

export function InputPanel({ input, setInput, onGenerate, isLoading }: InputPanelProps) {
    return (
        <div className="flex flex-col h-full bg-[#161b22] border-r border-slate-800">
            {/* Toolbar / Label */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#161b22]">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Editor</span>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded transition-colors",
                        isLoading
                            ? "text-slate-500 cursor-not-allowed"
                            : "text-green-400 hover:bg-green-400/10 hover:text-green-300"
                    )}
                >
                    <Play size={12} className={cn(isLoading && "animate-spin")} />
                    {isLoading ? "Running..." : "Run"}
                </button>
            </div>

            {/* Code Editor Area */}
            <div className="flex-1 relative group">
                {/* Line Gutter (Visual Only) */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#0d1117] border-r border-slate-800 flex flex-col items-end pt-4 pr-2 text-slate-700 font-mono text-xs select-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="// Describe your diagram or paste Mermaid code directly..."
                    className="w-full h-full bg-[#0d1117] pl-10 pt-4 pr-4 pb-4 text-sm font-mono text-slate-300 resize-none focus:outline-none custom-scrollbar leading-6"
                    spellCheck={false}
                />
            </div>

            {/* Templates Section */}
            <div className="h-[40%] flex flex-col border-t border-slate-800 bg-[#161b22]">
                <div className="px-4 py-2 border-b border-slate-800">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Templates</span>
                </div>
                <div className="p-4 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-3 gap-2">
                        {TEMPLATES.map((t) => (
                            <button
                                key={t.label}
                                onClick={() => setInput(t.text)}
                                className="px-3 py-2 rounded-md bg-slate-800 border border-transparent hover:border-indigo-500 hover:bg-indigo-600/20 transition-all text-xs font-medium text-slate-300 hover:text-white truncate"
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
    { label: "Flowchart", text: "Explain the flowchart for a web application" },
    { label: "Docker Architecture", text: "Explain the docker architecture for beginners" },
    { label: "HTTP Workflow", text: "Explain the HTTP workflow of a web application" },
    { label: "React State Diagram", text: "Explain the state of a React component" },
    { label: "Code Snippet Diagram & Explanation", text: " [Explain it & give Diagram] export async function POST(req: Request) {\n    try {\n        const { message, model, apiKey, baseUrl, systemPrompt } = await req.json();\n\n        // Check if using a custom key that isn't the default placeholder\n        const headers: Record<string, string> = {};\n        if (apiKey && apiKey !== 'ollama') {\n            headers['Authorization'] = `Bearer ${apiKey}`;\n        }\n\n        const ollama = new Ollama({\n            host: baseUrl || 'http://localhost:11434', \n            headers,\n        });\n\n        const completion = await ollama.chat({\n            model: model || 'llama3',\n            messages: [\n                { role: 'system', content: systemPrompt },\n                { role: 'user', content: message },\n            ],\n            format: 'json',\n        });\n\n        let content = completion.message.content || '{}';\n        // Sanitize: Remove markdown code blocks if the model includes them despite instructions\n        content = content.replace(/```json\\n?/g, '').replace(/```\\n?/g, '').trim();\n\n        return NextResponse.json(JSON.parse(content));\n    } catch (error: any) {\n        console.error(\"API Error:\", error);\n        return NextResponse.json(\n            { error: error.message || 'Internal Server Error', mermaid: '', explanation: '' },\n            { status: 500 }\n        );\n    }\n}" },
];

export function InputPanel({ input, setInput, onGenerate, isLoading }: InputPanelProps) {
    return (
        <div className="flex flex-col h-full bg-[#161b22] border-r border-slate-800">
            {/* Toolbar / Label */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#161b22]">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Input</span>
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

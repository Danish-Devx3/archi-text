"use client";

import React from "react";
import { TextareaButton } from "./TextareaButton";
import MarkdownRenderer from "./MarkdownRender";
import { Separator } from "./ui/separator";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setInput } from "@/redux/features/chatSlice";
import { generateDiagram } from "@/lib/llm";

const TEMPLATES = [
    { label: "Flowchart", text: "Explain the flowchart for a web application" },
    { label: "Docker Architecture", text: "Explain the docker architecture for beginners" },
    { label: "HTTP Workflow", text: "Explain the HTTP workflow of a web application" },
    { label: "React State Diagram", text: "Explain the state of a React component" },
    { label: "Code Snippet Diagram & Explanation", text: " [Explain it & give Diagram] export async function POST(req: Request) {\n    try {\n        const { message, model, apiKey, baseUrl, systemPrompt } = await req.json();\n\n        // Check if using a custom key that isn't the default placeholder\n        const headers: Record<string, string> = {};\n        if (apiKey && apiKey !== 'ollama') {\n            headers['Authorization'] = `Bearer ${apiKey}`;\n        }\n\n        const ollama = new Ollama({\n            host: baseUrl || 'http://localhost:11434', \n            headers,\n        });\n\n        const completion = await ollama.chat({\n            model: model || 'llama3',\n            messages: [\n                { role: 'system', content: systemPrompt },\n                { role: 'user', content: message },\n            ],\n            format: 'json',\n        });\n\n        let content = completion.message.content || '{}';\n        // Sanitize: Remove markdown code blocks if the model includes them despite instructions\n        content = content.replace(/```json\\n?/g, '').replace(/```\\n?/g, '').trim();\n\n        return NextResponse.json(JSON.parse(content));\n    } catch (error: any) {\n        console.error(\"API Error:\", error);\n        return NextResponse.json(\n            { error: error.message || 'Internal Server Error', mermaid: '', explanation: '' },\n            { status: 500 }\n        );\n    }\n}" },
];

export function InputPanel() {
    const input = useAppSelector((state) => state.chat.input);
    const isLoading = useAppSelector((state) => state.chat.isLoading);
    const dispatch = useAppDispatch();
    const explanation = useAppSelector((state) => state.chat.explanationMarkdown);
    return (
        <div className="flex flex-col h-full bg-muted/50 border-r border-border">
            {/* Code input Area */}
            <TextareaButton />

            <Separator orientation="horizontal" className="" />


            {/* Exlainatin section with markdown support */}
            <div className="text-center p-4 space-y-3">
                <h3 className="text-md text-start font-semibold">Explaination</h3>
                <div>
                    <MarkdownRenderer content={explanation} />
                </div>
            </div>

            {/* Templates Section */}
            {!input && (
                <div className="h-[40%] flex flex-col border-t border-border bg-muted/50">
                    <div className="px-4 py-2 border-b border-border">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Templates</span>
                    </div>
                    <div className="p-4 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-3 gap-2">
                            {TEMPLATES.map((t) => (
                                <button
                                    key={t.label}
                                    onClick={() => generateDiagram(t.text, dispatch)}
                                    className="px-3 py-2 rounded-md bg-accent border border-transparent hover:border-indigo-500 hover:bg-indigo-600/20 transition-all text-xs font-medium text-muted-foreground hover:text-foreground truncate"
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

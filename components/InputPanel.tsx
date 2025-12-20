"use client";

import React, { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputPanelProps {
    input: string;
    setInput: (value: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const QUICK_PROMPTS = [
    { label: "Login Flow", text: "Create a sequence diagram for a secure user login flow including MFA." },
    { label: "E-Commerce DB", text: "Design an ER diagram for an e-commerce system with users, orders, and products." },
    { label: "Docker Architecture", text: "Explain how Docker containers work using a flowchart." },
    { label: "Project Roadmap", text: "Generate a Gantt chart for a 3-month web development project." },
];

export function InputPanel({ input, setInput, onGenerate, isLoading }: InputPanelProps) {
    return (
        <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 p-6 flex-1 min-w-[350px] shadow-2xl z-10">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
                    Input
                </h2>
                <p className="text-sm text-slate-400">Describe your system, paste code, or raw data.</p>
            </div>

            <div className="flex-1 relative mb-6 group ring-1 ring-slate-800 rounded-xl bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all shadow-inner">
                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900/50 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    <span className="ml-2 text-[10px] text-slate-500 font-mono">input.txt</span>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="// Describe your system architecture..."
                    className="w-full h-full bg-transparent pt-12 p-4 text-slate-100 font-mono text-sm resize-none focus:outline-none custom-scrollbar placeholder:text-slate-500 leading-relaxed"
                    spellCheck={false}
                />
            </div>

            <div className="mb-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <Sparkles size={10} className="text-indigo-400" />
                        Sample Diagrams
                    </span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {QUICK_PROMPTS.map((prompt) => (
                        <button
                            key={prompt.label}
                            onClick={() => setInput(prompt.text)}
                            className="text-[11px] font-medium px-3 py-2 bg-slate-800 text-slate-300 border border-slate-700/50 rounded-lg hover:bg-slate-700 hover:text-white hover:border-indigo-500/30 transition-all duration-200 text-left truncate"
                            title={prompt.label}
                        >
                            {prompt.label}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || !input.trim()}
                className={cn(
                    "w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]",
                    isLoading || !input.trim()
                        ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] transform hover:-translate-y-0.5 border border-indigo-500/20"
                )}
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Sparkles size={18} />
                        Generate Diagram
                    </>
                )}
            </button>
        </div>
    );
}

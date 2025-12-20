"use client";

import React, { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Maximize, RotateCcw, Activity, Terminal, BookOpen } from "lucide-react";
import { MermaidRenderer } from "./MermaidRenderer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface OutputPanelProps {
    mermaidCode: string;
    explanation: string;
    isLoading: boolean;
}

export function OutputPanel({ mermaidCode, explanation, isLoading }: OutputPanelProps) {
    const [showTerminal, setShowTerminal] = useState(true);

    return (
        <div className="flex flex-col flex-[1.2] bg-[#161b22] relative overflow-hidden h-[calc(100vh-56px)] border-l border-slate-800">
            {/* Main Preview Area */}
            <div className="flex-1 relative overflow-hidden bg-dot-pattern">
                {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#0d1117]/80 backdrop-blur-sm">
                        <div className="relative w-16 h-16 mb-4">
                            <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin-reverse"></div>
                        </div>
                        <p className="text-slate-400 font-mono text-xs animate-pulse">Generating Diagram...</p>
                    </div>
                ) : !mermaidCode ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                        <div className="w-16 h-16 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700/50">
                            <Maximize size={24} className="opacity-50" />
                        </div>
                        <p className="font-medium text-sm">Ready to visualize</p>
                        <p className="text-xs opacity-60 mt-1">Select a template or describe your system</p>
                    </div>
                ) : (
                    <TransformWrapper
                        initialScale={1}
                        minScale={0.5}
                        maxScale={10}
                        centerOnInit={true}
                        wheel={{ step: 0.5 }}
                    >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                            <>
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 text-[10px] font-mono text-slate-400">
                                        Preview Mode
                                    </div>
                                </div>

                                <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full" wrapperStyle={{ width: '100%', height: '100%' }}>
                                    <MermaidRenderer chart={mermaidCode} />
                                </TransformComponent>

                                {/* Floating Toolbar (Bottom Right) */}
                                <div className="absolute bottom-6 right-6 z-10 flex items-center gap-1 p-1 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700 shadow-xl">
                                    <button onClick={() => zoomIn()} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors" title="Zoom In">
                                        <ZoomIn size={16} />
                                    </button>
                                    <button onClick={() => zoomOut()} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors" title="Zoom Out">
                                        <ZoomOut size={16} />
                                    </button>
                                    <div className="w-px h-4 bg-slate-700 mx-1"></div>
                                    <button onClick={() => resetTransform()} className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors" title="Reset View">
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </TransformWrapper>
                )}
            </div>

            {/* Terminal / Analysis Panel (Collapsible) */}
            <AnimatePresence>
                {showTerminal && explanation && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "30%" }}
                        exit={{ height: 0 }}
                        className="bg-[#0d1117] border-t border-slate-800 flex flex-col"
                    >
                        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#161b22]">
                            <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                                <BookOpen size={12} /> Analysis Output
                            </span>
                            <button onClick={() => setShowTerminal(false)} className="text-slate-500 hover:text-white">
                                ×
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-400 leading-relaxed custom-scrollbar">
                            {!explanation ? "No explanation available" : explanation}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Status Bar */}
            <div className="h-6 bg-[#0d1117] border-t border-slate-800 flex items-center justify-between px-3 text-[10px] text-slate-500 select-none">
                <div className="flex items-center gap-2">
                    <Activity size={10} className={cn(isLoading ? "text-yellow-500 animate-pulse" : "text-green-500")} />
                    <span>{isLoading ? "Syncing..." : "Ready"}</span>
                </div>
                <div className="flex items-center gap-4">
                    {explanation && (
                        <button
                            onClick={() => setShowTerminal(!showTerminal)}
                            className={cn("hover:text-slate-300 transition-colors flex items-center gap-1", showTerminal && "text-indigo-400")}
                        >
                            <BookOpen size={10} />
                            Console
                        </button>
                    )}
                    <span>UTF-8</span>
                    <span>Mermaid JS</span>
                </div>
            </div>
        </div>
    );
}

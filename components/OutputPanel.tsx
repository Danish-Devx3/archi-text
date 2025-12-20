"use client";

import React, { useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Download, ZoomIn, ZoomOut, Maximize, RotateCcw } from "lucide-react";
import { MermaidRenderer } from "./MermaidRenderer";
import { motion } from "framer-motion";

interface OutputPanelProps {
    mermaidCode: string; // The raw mermaid syntax
    explanation: string; // The AI explanation
    isLoading: boolean;
}

export function OutputPanel({ mermaidCode, explanation, isLoading }: OutputPanelProps) {
    const downloadSvg = () => {
        const svgElement = document.querySelector(".mermaid-container svg");
        if (!svgElement) return;

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `diagram-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 p-6 flex-[2] min-w-[500px] relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
                    Diagram & Explanation
                </h2>

                {mermaidCode && (
                    <button
                        onClick={downloadSvg}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg border border-slate-700 transition-colors"
                    >
                        <Download size={14} />
                        Download SVG
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                        <div className="absolute inset-4 border-4 border-violet-500/20 rounded-full"></div>
                        <div className="absolute inset-4 border-4 border-violet-500 rounded-full border-b-transparent animate-spin-reverse"></div>
                    </div>
                    <p className="text-slate-400 animate-pulse text-sm">Thinking & Drawing...</p>
                </div>
            ) : !mermaidCode ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500 gap-4 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
                    <div className="p-4 bg-slate-900 rounded-full">
                        <Maximize size={32} className="opacity-50" />
                    </div>
                    <p>Your diagram will appear here</p>
                </div>
            ) : (
                <div className="flex-1 flex flex-col gap-4 overflow-hidden z-10">
                    {/* Chart Area */}
                    <div className="flex-1 bg-slate-900/50 backdrop-blur-sm overflow-hidden relative rounded-xl border border-slate-800 shadow-2xl">
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.5}
                            maxScale={4}
                            centerOnInit={true}
                            limitToBounds={false}
                            wheel={{ step: 0.1, smoothStep: 0.002 }}
                            panning={{ velocityDisabled: false }}
                        >
                            {({ zoomIn, zoomOut, resetTransform }) => (
                                <>
                                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 p-1.5 bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700 shadow-xl">
                                        <button onClick={() => zoomIn()} className="p-2 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors" title="Zoom In"><ZoomIn size={18} /></button>
                                        <button onClick={() => zoomOut()} className="p-2 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors" title="Zoom Out"><ZoomOut size={18} /></button>
                                        <div className="h-px w-full bg-slate-700 my-0.5"></div>
                                        <button onClick={() => resetTransform()} className="p-2 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors" title="Reset"><RotateCcw size={18} /></button>
                                    </div>
                                    <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full">
                                        <MermaidRenderer chart={mermaidCode} />
                                    </TransformComponent>
                                </>
                            )}
                        </TransformWrapper>
                    </div>

                    {/* Explanation Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-1/3 bg-slate-900 border-t border-slate-800 p-0 overflow-hidden flex flex-col"
                    >
                        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Analysis</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                            <div className="text-sm text-slate-200 leading-7 font-light whitespace-pre-line">
                                {explanation || "No explanation provided."}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

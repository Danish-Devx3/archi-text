"use client";

import React, { useState, useEffect } from "react";
import { Settings, Download, Copy, Share2, Box, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
    apiKey: string;
    setApiKey: (key: string) => void;
    baseUrl: string;
    setBaseUrl: (url: string) => void;
    model: string;
    setModel: (model: string) => void;
}

export function Header({ apiKey, setApiKey, baseUrl, setBaseUrl, model, setModel }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempKey, setTempKey] = useState(apiKey);
    const [tempUrl, setTempUrl] = useState(baseUrl);
    const [tempModel, setTempModel] = useState(model);

    useEffect(() => {
        setTempKey(apiKey);
        setTempUrl(baseUrl);
        setTempModel(model);
    }, [apiKey, baseUrl, model]);

    const handleSave = () => {
        setApiKey(tempKey);
        setBaseUrl(tempUrl);
        setModel(tempModel);
        setIsOpen(false);
    };

    const handleDownload = () => {
        const svgElement = document.querySelector(".mermaid-container svg");
        if (!svgElement) {
            alert("No diagram to export found.");
            return;
        }
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

    const handleCopyImage = async () => {
        const svgElement = document.querySelector(".mermaid-container svg");
        if (!svgElement) {
            alert("No diagram to copy found.");
            return;
        }
        // Simple copy SVG source for now, or convert to PNG (more complex). 
        // For a "Copy Image" typically users expect raster, but SVG text is easiest. 
        // Let's try to write SVG to clipboard if supported, else warn.
        try {
            const svgData = new XMLSerializer().serializeToString(svgElement);
            await navigator.clipboard.writeText(svgData);
            alert("SVG Code copied to clipboard!");
        } catch (e) {
            console.error(e);
            alert("Failed to copy.");
        }
    };

    return (
        <header className="h-14 flex items-center justify-between px-4 border-b border-slate-800 bg-[#0d1117] relative z-50">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Box size={18} />
                </div>
                <span className="font-semibold text-slate-200 text-sm tracking-wide">Diagram Studio</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
                <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors">
                    <Download size={14} />
                    <span>Export SVG</span>
                </button>
                <button onClick={handleCopyImage} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors">
                    <Copy size={14} />
                    <span>Copy Image</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors">
                    <Share2 size={14} />
                    <span>Share</span>
                </button>

                <div className="w-px h-4 bg-slate-800 mx-2" />

                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
                        title="Settings"
                    >
                        <Settings size={16} />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-10 w-80 bg-[#161b22] border border-slate-800 rounded-lg shadow-2xl p-4 flex flex-col gap-4 z-50"
                            >
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Model</label>
                                        <input
                                            type="text"
                                            value={tempModel}
                                            onChange={(e) => setTempModel(e.target.value)}
                                            className="w-full bg-[#0d1117] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 font-mono"
                                            placeholder="gpt-4"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">API Endpoint</label>
                                        <input
                                            type="text"
                                            value={tempUrl}
                                            onChange={(e) => setTempUrl(e.target.value)}
                                            className="w-full bg-[#0d1117] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">API Key</label>
                                        <input
                                            type="password"
                                            value={tempKey}
                                            onChange={(e) => setTempKey(e.target.value)}
                                            className="w-full bg-[#0d1117] border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 font-mono"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium py-2 rounded transition-colors"
                                >
                                    Save Configuration
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

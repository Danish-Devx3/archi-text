"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save } from "lucide-react";
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

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-slate-900/50 backdrop-blur-md border-b border-indigo-500/20 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="w-5 h-5 text-white"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    DiagramGPT
                </h1>
            </div>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                >
                    <Settings size={20} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-12 w-80 bg-slate-900 border border-indigo-500/30 rounded-xl shadow-2xl p-4 flex flex-col gap-4"
                        >
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                                    Model Name
                                </label>
                                <input
                                    type="text"
                                    value={tempModel}
                                    onChange={(e) => setTempModel(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="gpt-4o, llama3, etc."
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                                    API Endpoint
                                </label>
                                <input
                                    type="text"
                                    value={tempUrl}
                                    onChange={(e) => setTempUrl(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="http://localhost:11434/v1"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
                                    API Key
                                </label>
                                <input
                                    type="password"
                                    value={tempKey}
                                    onChange={(e) => setTempKey(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="sk-..."
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
                            >
                                <Save size={16} />
                                Save Settings
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

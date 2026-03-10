"use client";

import React, { useState, useEffect } from "react";
import { Settings, Download, Copy, Share2, Box, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface HeaderProps {
    apiKey: string;
    setApiKey: (key: string) => void;
    baseUrl: string;
    setBaseUrl: (url: string) => void;
    model: string;
    setModel: (model: string) => void;
}

export function Header() {

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
        <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-background relative z-50">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Box size={18} />
                </div>
                <span className="font-semibold text-foreground text-sm tracking-wide">Archi-Text</span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
                <Button variant={"outline"} onClick={handleDownload} className="flex items-center gap-2 px-3 py-4.5 text-xs font-medium hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <Download size={14} />
                    <span>Export SVG</span>
                </Button>
                <Button variant={"outline"} onClick={handleCopyImage} className="flex items-center gap-2 px-3 py-4.5 text-xs font-medium hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <Copy size={14} />
                    <span>Copy Image</span>
                </Button>
                <Button variant={"outline"} className="flex items-center gap-2 px-3 py-4.5 text-xs font-medium hover:text-foreground hover:bg-accent rounded-md transition-colors">
                    <Share2 size={14} />
                    <span>Share</span>
                </Button >
            </div>
        </header>
    );
}

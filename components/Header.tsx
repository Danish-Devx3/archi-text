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
        <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-accent relative z-50">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <svg className="w-auto h-5 text-foreground" data-logo="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 38">
                    <g id="logogram" transform="translate(40, 2) rotate(90) translate(17, 20) scale(1, -1) translate(-17, -20)" style={{ opacity: 1 }}><path d="M19.2614 5.82192V0H0.905273V40H19.2614V34.1781C15.5012 34.1781 11.8949 32.6842 9.23601 30.0253C6.57711 27.3664 5.08335 23.7603 5.08335 20C5.08335 16.2397 6.57711 12.6334 9.23601 9.97459C11.8949 7.31568 15.5012 5.82192 19.2614 5.82192Z" className="fill-indigo-500"></path><path d="M19.2614 5.8219V34.1781C23.0217 34.1781 26.628 32.6842 29.2869 30.0253C31.9458 27.3664 33.4395 23.7603 33.4395 20C33.4395 16.2397 31.9458 12.6334 29.2869 9.97457C26.628 7.31567 23.0217 5.8219 19.2614 5.8219Z" className="fill-indigo-400"></path></g>
                    <g id="logotype" transform="translate(42, 2.5)" style={{ opacity: 1 }}><path fill="currentColor" className="text-foreground" d="M8.38 31L2 31L12.53 4.40L18.04 4.40L28.49 31L21.95 31L16.90 17.51Q16.63 16.71 16.31 15.80Q15.98 14.89 15.68 13.90Q15.38 12.91 15.11 12Q14.84 11.09 14.65 10.29L14.65 10.29L15.76 10.25Q15.53 11.20 15.26 12.11Q15.00 13.03 14.69 13.94Q14.39 14.85 14.06 15.74Q13.74 16.64 13.40 17.59L13.40 17.59L8.38 31ZM23.28 25.91L7.02 25.91L9.07 20.97L21.23 20.97L23.28 25.91ZM36.81 31L30.65 31L30.65 10.82L36.47 10.82L36.73 17.40L35.59 16.10Q36.09 14.51 37.11 13.22Q38.14 11.92 39.56 11.16Q40.99 10.40 42.55 10.40L42.55 10.40Q43.23 10.40 43.82 10.50Q44.41 10.59 44.86 10.78L44.86 10.78L43.23 17.51Q42.81 17.28 42.11 17.11Q41.41 16.94 40.65 16.94L40.65 16.94Q39.81 16.94 39.11 17.23Q38.40 17.51 37.89 18.04Q37.38 18.57 37.09 19.30Q36.81 20.02 36.81 20.93L36.81 20.93L36.81 31ZM55.47 31.38L55.47 31.38Q52.54 31.38 50.20 30.01Q47.87 28.64 46.54 26.27Q45.21 23.89 45.21 20.93L45.21 20.93Q45.21 17.89 46.54 15.52Q47.87 13.14 50.20 11.77Q52.54 10.40 55.47 10.40L55.47 10.40Q58.16 10.40 60.42 11.37Q62.69 12.34 63.98 14.01L63.98 14.01L60.67 18.04Q60.18 17.40 59.46 16.86Q58.73 16.33 57.86 16.03Q56.99 15.72 56.04 15.72L56.04 15.72Q54.59 15.72 53.49 16.39Q52.39 17.05 51.78 18.23Q51.17 19.41 51.17 20.89L51.17 20.89Q51.17 22.34 51.80 23.50Q52.43 24.65 53.53 25.34Q54.63 26.02 56.00 26.02L56.00 26.02Q56.99 26.02 57.82 25.76Q58.66 25.49 59.36 25.00Q60.06 24.50 60.67 23.82L60.67 23.82L63.98 27.85Q62.69 29.44 60.37 30.41Q58.05 31.38 55.47 31.38ZM66.79 31L66.79 31L66.79 2.88L72.83 2.88L72.83 14.93L71.58 15.38Q72.00 14.01 73.08 12.89Q74.16 11.77 75.68 11.09Q77.20 10.40 78.87 10.40L78.87 10.40Q81.15 10.40 82.71 11.34Q84.27 12.27 85.05 14.11Q85.83 15.95 85.83 18.65L85.83 18.65L85.83 31L79.71 31L79.71 19.11Q79.71 17.89 79.37 17.09Q79.03 16.29 78.34 15.91Q77.66 15.53 76.63 15.57L76.63 15.57Q75.83 15.57 75.15 15.82Q74.47 16.07 73.95 16.54Q73.44 17.02 73.17 17.62Q72.91 18.23 72.91 18.99L72.91 18.99L72.91 31L69.83 31Q68.84 31 68.06 31Q67.28 31 66.79 31ZM96.89 31L90.77 31L90.77 10.82L96.89 10.82L96.89 31ZM93.85 6.83L93.85 6.83Q92.10 6.83 91.13 6.02Q90.16 5.20 90.16 3.68L90.16 3.68Q90.16 2.27 91.15 1.40Q92.14 0.52 93.85 0.52L93.85 0.52Q95.52 0.52 96.49 1.34Q97.46 2.16 97.46 3.68L97.46 3.68Q97.46 5.08 96.49 5.96Q95.52 6.83 93.85 6.83ZM113.83 31L107.34 31L107.34 10.14L99.51 10.14L99.51 4.40L121.93 4.40L121.93 10.14L113.83 10.14L113.83 31ZM131.12 31.38L131.12 31.38Q127.78 31.38 125.29 30.05Q122.80 28.72 121.45 26.38Q120.10 24.05 120.10 21.04L120.10 21.04Q120.10 18.69 120.86 16.73Q121.62 14.77 123.01 13.37Q124.40 11.96 126.28 11.18Q128.16 10.40 130.40 10.40L130.40 10.40Q132.53 10.40 134.28 11.16Q136.03 11.92 137.32 13.29Q138.61 14.66 139.29 16.52Q139.98 18.38 139.94 20.59L139.94 20.59L139.90 22.26L123.87 22.26L122.95 18.80L134.92 18.80L134.28 19.49L134.28 18.73Q134.20 17.78 133.69 17.07Q133.18 16.37 132.36 15.95Q131.54 15.53 130.52 15.53L130.52 15.53Q129.00 15.53 127.95 16.12Q126.91 16.71 126.37 17.81Q125.84 18.92 125.84 20.55L125.84 20.55Q125.84 22.18 126.55 23.44Q127.25 24.69 128.60 25.38Q129.95 26.06 131.81 26.06L131.81 26.06Q133.06 26.06 134.09 25.68Q135.11 25.30 136.29 24.39L136.29 24.39L139.14 28.42Q137.96 29.40 136.63 30.07Q135.30 30.73 133.92 31.06Q132.53 31.38 131.12 31.38ZM162.85 31L155.60 31L151.30 24.50L149.33 21.77L141.35 10.82L148.68 10.82L152.86 17.05L154.95 19.98L162.85 31ZM148.38 31L141.16 31L149.29 19.71L152.56 23.63L148.38 31ZM162.47 10.82L154.57 22.22L151.30 18.31L155.29 10.82L162.47 10.82ZM173.49 31L167.38 31L167.38 5.73L173.49 5.73L173.49 31ZM177.37 16.18L163.80 16.18L163.80 10.82L177.37 10.82L177.37 16.18Z"></path></g>

                </svg>
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

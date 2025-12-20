"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
    chart: string;
}

export function MermaidRenderer({ chart }: MermaidRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            fontFamily: "Inter, sans-serif",
        });
    }, []);

    useEffect(() => {
        const renderChart = async () => {
            if (!chart || !containerRef.current) return;

            try {
                setError("");
                const id = `mermaid-${Date.now()}`;
                // Verify syntax first? mermaid.parse throws if invalid.
                await mermaid.parse(chart);
                const { svg } = await mermaid.render(id, chart);

                // Hack: Remove explicit max-width or height from mermaid SVG string to allow zooming/filling
                const cleanSvg = svg
                    .replace(/max-width:[^;"]+;/g, "")
                    .replace(/height="[^"]*"/, "")
                    .replace(/style="[^"]*"/, 'style="width: 100%; height: auto;"');

                setSvg(cleanSvg);
            } catch (err) {
                console.error("Mermaid Render Error:", err);
                setError("Failed to verify syntax or render diagram. The AI output might be malformed.");
            }
        };

        renderChart();
    }, [chart]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-red-400 p-8 text-center bg-red-950/20 rounded-xl border border-red-500/20">
                <p className="font-semibold mb-2">Rendering Error</p>
                <p className="text-sm opacity-80">{error}</p>
                <pre className="mt-4 text-xs bg-black/50 p-4 rounded text-left overflow-auto max-w-full max-h-40 font-mono text-slate-400">
                    {chart}
                </pre>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center p-4 mermaid-container [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-w-none"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

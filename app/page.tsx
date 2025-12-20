"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { InputPanel } from "@/components/InputPanel";
import { OutputPanel } from "@/components/OutputPanel";
import { generateDiagramConfig } from "@/lib/openai";

export default function Home() {
  // Settings State
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const model = process.env.NEXT_PUBLIC_MODEL;

  // App State
  const [input, setInput] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateDiagram = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMermaidCode("");
    setExplanation("");

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          model: model,
          apiKey: apiKey,
          baseUrl: baseUrl,
          systemPrompt: generateDiagramConfig.systemPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const parsed = await response.json();

      if (parsed.error) {
        throw new Error(parsed.error);
      }

      setMermaidCode(parsed.mermaid);
      setExplanation(parsed.explanation);
    } catch (error: any) {
      console.error("Generation Error:", error);
      setExplanation(`Error generating diagram: ${error.message || "Unknown error"}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-[#0d1117] text-slate-300 font-sans">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Strictly defined 50/50 split */}
        <div className="w-1/5 h-full overflow-hidden">
          <InputPanel
            input={input}
            setInput={setInput}
            onGenerate={generateDiagram}
            isLoading={isLoading}
          />
        </div>

        <div className="w-4/5 h-full overflow-hidden">
          <OutputPanel
            mermaidCode={mermaidCode}
            explanation={explanation}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}

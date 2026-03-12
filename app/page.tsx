"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { InputPanel } from "@/components/InputPanel";
import { OutputPanel } from "@/components/OutputPanel";
import { generateDiagramConfig } from "@/lib/llm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setInput, setLoading, setDiagramAndExplanationMarkdown, setError } from "@/redux/features/chatSlice";

export default function Home() {
  // Settings State
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const model = process.env.NEXT_PUBLIC_MODEL;

  // App State
  const input = useAppSelector((state) => state.chat.input);
  const mermaidCode = useAppSelector((state) => state.chat.mermaidCode);
  const explanation = useAppSelector((state) => state.chat.explanationMarkdown);
  const isLoading = useAppSelector((state) => state.chat.isLoading);

  const dispatch = useAppDispatch();

  const generateDiagram = async () => {
    if (!input.trim()) return;

    dispatch(setLoading(true));
    dispatch(setDiagramAndExplanationMarkdown({
      mermaidCode: "",
      explanationMarkdown: "",
    }));

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

      dispatch(setDiagramAndExplanationMarkdown({
        mermaidCode: parsed.mermaid,
        explanationMarkdown: parsed.explanation,
      }));

    } catch (error: any) {
      console.error("Generation Error:", error);
      dispatch(setError(`Error generating diagram: ${error.message || "Unknown error"}.`));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <main className="">
      <Header />

      <div className="flex overflow-hidden">
        {/* Strictly defined 50/50 split */}
        <div className="w-[30%] h-full overflow-hidden">
          <InputPanel />
        </div>

        <div className="flex-1 h-full overflow-hidden">
          <OutputPanel />
        </div>
      </div>
    </main>
  );
}

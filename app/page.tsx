"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { InputPanel } from "@/components/InputPanel";
import { OutputPanel } from "@/components/OutputPanel";
import { createClient, generateDiagramConfig } from "@/lib/openai";

export default function Home() {
  // State for Settings
  const [apiKey, setApiKey] = useState("644633e59f7e45f39c2f6df2de408c31.VgbbsHjX1LxszE7wyq-ey3Ax");
  const [baseUrl, setBaseUrl] = useState("https://ollama.com");
  const [model, setModel] = useState("deepseek-v3.1:671b-cloud");

  // State for App Logic
  const [input, setInput] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Persist Settings
  useEffect(() => {
    const storedKey = localStorage.getItem("diagram_api_key");
    const storedUrl = localStorage.getItem("diagram_base_url");
    const storedModel = localStorage.getItem("diagram_model");
    if (storedKey) setApiKey(storedKey);
    if (storedUrl) setBaseUrl(storedUrl);
    if (storedModel) setModel(storedModel);
  }, []);

  const handleUpdateSettings = (key: string, url: string, modelName: string) => {
    setApiKey(key);
    setBaseUrl(url);
    setModel(modelName);
    localStorage.setItem("diagram_api_key", key);
    localStorage.setItem("diagram_base_url", url);
    localStorage.setItem("diagram_model", modelName);
  };

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
      setExplanation(`Error generating diagram: ${error.message || "Unknown error"}. \n\nMake sure Ollama is running and responding to JSON requests.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      <Header
        apiKey={apiKey}
        setApiKey={(key) => handleUpdateSettings(key, baseUrl, model)}
        baseUrl={baseUrl}
        setBaseUrl={(url) => handleUpdateSettings(apiKey, url, model)}
        model={model}
        setModel={(m) => handleUpdateSettings(apiKey, baseUrl, m)}
      />

      <div className="flex flex-1 overflow-hidden">
        <InputPanel
          input={input}
          setInput={setInput}
          onGenerate={generateDiagram}
          isLoading={isLoading}
        />
        <OutputPanel
          mermaidCode={mermaidCode}
          explanation={explanation}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
}

import OpenAI from "openai";

export const createClient = (apiKey: string, baseURL: string) => {
    return new OpenAI({
        apiKey: apiKey,
        baseURL: baseURL,
        dangerouslyAllowBrowser: true, // Client-side usage as requested for MVP
    });
};

export const generateDiagramConfig = {
    systemPrompt: `You are a Mermaid.js expert. Analyze the user's input (code, text, or data). 
  Decide the best diagram type (Flowchart, Sequence, ER Diagram, Class, Gantt, or Mindmap). 
  
  Your response must be a JSON object with two keys:
  1. "mermaid": The raw Mermaid syntax. Do not wrap in markdown blocks.
  2. "explanation": A concise explanation of the diagram and the steps taken to generate it.
  
  If the input is vague, infer a structure.`,
};

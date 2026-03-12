import { setDiagramAndExplanationMarkdown, setLoading, setError } from "@/redux/features/chatSlice";
import { AppDispatch } from "@/redux/store";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
});

const systemPrompt = `You are a Senior Software Architect and Mermaid.js Expert. 
    
    YOUR GOAL:
    Analyze the user's input, which will be either a "Natural Language Problem Statement" or a "Code Snippet".
    - If it's a Code Snippet: Reverse-engineer the logic, control flow, or architecture and visualize it.
    - If it's a Problem Statement: Design a complete system or process flow based on requirements.

    OUTPUT FORMAT (JSON ONLY):
    You must respond with a strictly valid JSON object containing exactly these two keys:
    1. "mermaid": (String) The valid Mermaid.js syntax. 
       - Do NOT wrap it in markdown code blocks (\`\`\`).
       - Use appropriate diagram types:
         - Flowchart (graph TD/LR) for processes, logic, or algorithms.
         - SequenceDiagram for interactions between services/objects.
         - ClassDiagram for code structure/OOP.
         - StateDiagram for lifecycle changes.
         - ERDiagram for databases.
    2. "explanation": (String) A detailed, step-by-step breakdown of what the diagram represents in Markdown format.
       - If explaining Code: Walk through the execution flow logic visualized in the diagram.
       - If explaining a System: Detail the components and their interactions.
       - Format this as a clean, readable string using Markdown for structure (headings, lists, etc.).

    CONSTRAINTS:
    - Do not include any conversational text outside the JSON.
    - Ensure the Mermaid syntax is syntactically correct and will render.
    - If the input is ambiguous, make professional architectural assumptions and state them in the explanation.`;

export const generateDiagram = async (input: string, dispatch: AppDispatch) => {
   if (!input.trim()) return;

   dispatch(setLoading(true));
   dispatch(setDiagramAndExplanationMarkdown({
      mermaidCode: "",
      explanationMarkdown: "",
   }));

   try {
      const response: any = await ai.models.generateContent({
         model: "gemini-3-flash-preview",
         contents: [{ role: "user", parts: [{ text: input }] }],
         config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: {
               type: "object",
               properties: {
                  mermaid: { type: "string" },
                  explanation: { type: "string" },
               },
               required: ["mermaid", "explanation"],
            },
         },
      });

      if (!response || !response.text) {
         throw new Error("No response from Gemini");
      }

      const parsed = JSON.parse(response.candidates[0].content.parts[0].text);
      console.log(parsed);

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

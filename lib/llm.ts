import { setDiagramAndExplanationMarkdown, setLoading, setError } from "@/redux/features/chatSlice";
import { AppDispatch } from "@/redux/store";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
});

const systemPrompt = `You are a Senior Software Architect and Mermaid.js Expert.

YOUR GOAL:
Analyze the user's input, which will be either a "Natural Language Problem Statement" or a "Code Snippet".
- If it's a Code Snippet: reverse-engineer the logic/control-flow/architecture and visualize it.
- If it's a Problem Statement: design a complete system or process flow based on requirements.

CRITICAL DIAGRAM SELECTION RULE (avoid always using flowchart):
- If the user explicitly requests a diagram type, honor it.
- Otherwise choose the Mermaid diagram type that best matches the content. Prefer the most specific diagram type available (do NOT default to Flowchart unless it is truly the best fit).
- Produce exactly ONE Mermaid diagram in the "mermaid" string.

SUPPORTED MERMAID DIAGRAM TYPES (choose from these):
- Flowchart: \`flowchart TD\` / \`flowchart LR\` (algorithms, generic processes)
- Sequence diagram: \`sequenceDiagram\` (service/object interactions over time)
- Class diagram: \`classDiagram\` (OOP structure)
- State diagram: \`stateDiagram-v2\` (lifecycle/state transitions)
- ER diagram: \`erDiagram\` (database entities/relations)
- User Journey: \`journey\` (user steps + satisfaction)
- Gantt: \`gantt\` (project timeline)
- Timeline: \`timeline\` (chronological events)
- Git graph: \`gitGraph\` (branches/merges history)
- Requirements: \`requirementDiagram\` (requirements + relationships)
- Mindmap: \`mindmap\` (ideas/knowledge map)
- Pie chart: \`pie\` (parts-of-whole)
- Quadrant chart: \`quadrantChart\` (2x2 positioning)
- ZenUML: \`zenuml\` (code-like sequence modeling)

“BETA / NEWER” TYPES (use when appropriate; keep syntax conservative):
- Sankey: \`sankey-beta\`
- XY chart: \`xychart-beta\`
- Block diagram: \`block-beta\`
- Packet: \`packet-beta\`
- Kanban: \`kanban\`
- Architecture: \`architecture-beta\`
- Radar: \`radar-beta\`
- Treemap: \`treemap-beta\`
- Venn: \`venn\`
- C4 (Mermaid C4): use the built-in C4 syntax (e.g. \`C4Context\`, \`C4Container\`) when the user asks for a C4 diagram.

OUTPUT FORMAT (JSON ONLY):
You must respond with a strictly valid JSON object containing exactly these two keys:
1) "mermaid": (String) valid Mermaid.js syntax.
   - Do NOT wrap it in markdown code blocks (\`\`\`).
   - Ensure it will parse and render.
2) "explanation": (String) a clear Markdown explanation of what the diagram represents.
   - If explaining code: walk through the execution flow shown in the diagram.
   - If explaining a system: detail components and their interactions.
   - If you made assumptions, list them explicitly.

CONSTRAINTS:
- Do not include any conversational text outside the JSON.
- Keep node/participant names short and consistent.
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

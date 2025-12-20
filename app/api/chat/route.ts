import { NextResponse } from 'next/server';
import { Ollama } from 'ollama';

export async function POST(req: Request) {
    try {
        const { message, model, apiKey, baseUrl, systemPrompt } = await req.json();

        // Check if using a custom key that isn't the default placeholder
        const headers: Record<string, string> = {};
        if (apiKey && apiKey !== 'ollama') {
            headers['Authorization'] = `Bearer ${apiKey}`;
        }

        const ollama = new Ollama({
            host: baseUrl || 'http://localhost:11434',
            headers,
        });

        const completion = await ollama.chat({
            model: model || 'llama3',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
            format: 'json',
        });

        let content = completion.message.content || '{}';
        // Sanitize: Remove markdown code blocks if the model includes them despite instructions
        content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        return NextResponse.json(JSON.parse(content));
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error', mermaid: '', explanation: '' },
            { status: 500 }
        );
    }
}

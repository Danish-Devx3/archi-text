import { NextResponse } from 'next/server';
import { Ollama } from 'ollama';

export async function POST(req: Request) {
    try {
        const { message, model, apiKey, baseUrl, systemPrompt } = await req.json();

        const ollama = new Ollama({
            host: baseUrl || 'http://localhost:11434',
        });

        const completion = await ollama.chat({
            model: model || 'llama3',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
            format: 'json',
        });

        return NextResponse.json(JSON.parse(completion.message.content || '{}'));
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error', mermaid: '', explanation: '' },
            { status: 500 }
        );
    }
}

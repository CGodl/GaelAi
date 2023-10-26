import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();
        const body = req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })

        }

        if(!openai.apiKey) {
            return new NextResponse("openai API Key not configured")
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        })

        return NextResponse.json(response.choices[0].message)

	} catch (error) {
		console.log('[Conversation_Error]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

import { updateMessageLikes } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    try {
        const messageId = params.id;
        await updateMessageLikes(messageId);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating likes:', error);
        return NextResponse.json(
            { error: '更新点赞失败' },
            { status: 500 }
        );
    }
}
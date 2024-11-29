import { saveMessage, getMessages } from '@/lib/db';
import { NextResponse } from 'next/server';

// src/app/api/messages/route.js
export async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received request body:', body);

        const { author, content } = body;

        // 参数验证
        if (!author || !content) {
            console.log('Validation failed:', { author, content });
            return NextResponse.json(
                { error: '作者和内容不能为空' },
                { status: 400 }
            );
        }

        // 尝试保存到数据库
        try {
            const messageId = await saveMessage({ author, content });
            console.log('Message saved with ID:', messageId);
            return NextResponse.json({ id: messageId }, { status: 201 });
        } catch (dbError) {
            console.error('Database error:', dbError);
            return NextResponse.json(
                { error: `数据库错误: ${dbError.message}` },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: `服务器错误: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const messages = await getMessages();
        return NextResponse.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: '获取留言失败，当前环境变量状态为：'+process.env.NODE_ENV+'主机环境变量'+process.env.MYSQL_HOST },
            { status: 500 }
        );
    }
}
import { saveTimelineEvent, getTimelineEvents } from '@/lib/db';
import { uploadToOSS } from '@/lib/oss';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        console.log('Received timeline event request');

        const formData = await request.formData();
        console.log('Form data received:', {
            title: formData.get('title'),
            description: formData.get('description'),
            date: formData.get('date'),
            contributor: formData.get('contributor'),
            hasImage: !!formData.get('image')
        });

        const file = formData.get('image');
        const title = formData.get('title');
        const description = formData.get('description');
        const date = formData.get('date');
        const contributor = formData.get('contributor');

        // 验证所有字段
        if (!file || !title || !description || !date || !contributor) {
            console.log('Missing required fields:', {
                hasFile: !!file,
                hasTitle: !!title,
                hasDescription: !!description,
                hasDate: !!date,
                hasContributor: !!contributor
            });
            return NextResponse.json(
                { error: '所有字段都是必填的' },
                { status: 400 }
            );
        }

        // 验证文件
        console.log('File info:', {
            name: file.name,
            type: file.type,
            size: file.size
        });

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: '文件大小不能超过5MB' },
                { status: 400 }
            );
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: '请上传图片文件' },
                { status: 400 }
            );
        }

        try {
            // 转换文件为Buffer
            console.log('Converting file to buffer');
            const buffer = await file.arrayBuffer();

            // 上传到OSS
            console.log('Uploading to OSS');
            const imageUrl = await uploadToOSS(Buffer.from(buffer), file.name);
            console.log('OSS upload successful, URL:', imageUrl);

            // 保存到数据库
            console.log('Saving to database');
            const eventId = await saveTimelineEvent({
                title,
                description,
                date,
                imageUrl,
                contributor
            });
            console.log('Save successful, event ID:', eventId);

            return NextResponse.json({ id: eventId }, { status: 201 });
        } catch (uploadError) {
            console.error('Upload/save error:', uploadError);
            return NextResponse.json(
                { error: uploadError.message || '文件上传失败' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('API error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json(
            { error: `服务器错误: ${error.message}` },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        console.log('Fetching timeline events');
        const events = await getTimelineEvents();
        console.log('Events fetched:', events.length);
        return NextResponse.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: `获取事件失败: ${error.message}` },
            { status: 500 }
        );
    }
}
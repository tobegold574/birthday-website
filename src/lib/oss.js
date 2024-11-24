import OSS from 'ali-oss';
import { ossConfig } from './alicloud';

export async function uploadToOSS(file, fileName) {
    try {
        const client = new OSS(ossConfig);

        // 生成文件路径
        const filePath = `timeline/${Date.now()}-${fileName}`;

        // 上传文件
        const result = await client.put(filePath, file);

        // 返回文件URL
        return result.url;
    } catch (error) {
        console.error('OSS upload error:', error);
        throw new Error('文件上传失败');
    }
}

export async function deleteFromOSS(fileUrl) {
    try {
        const client = new OSS(ossConfig);

        // 从URL中提取文件名
        const fileName = fileUrl.split('/').pop();

        // 删除文件
        await client.delete(fileName);
    } catch (error) {
        console.error('OSS delete error:', error);
        throw new Error('文件删除失败');
    }
}
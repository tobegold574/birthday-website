"use client"

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ContributePage = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formType, setFormType] = useState('message'); // 'message' or 'timeline'
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    // 处理图片选择
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 验证文件类型
            if (!file.type.startsWith('image/')) {
                setError('请选择图片文件');
                return;
            }
            // 验证文件大小 (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('图片大小不能超过5MB');
                return;
            }

            // 创建预览
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author: e.target.author.value,
                    content: e.target.content.value,
                }),
            });

            // 打印完整响应
            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Response data:', data);

            if (!res.ok) {
                throw new Error(data.error || '提交失败');
            }

            alert('留言提交成功，等待审核！');
            e.target.reset();
        } catch (error) {
            console.error('Submit error:', error);
            alert(`提交失败: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTimelineSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const formData = new FormData(e.target);

            // 验证日期不能超过今天
            const selectedDate = new Date(formData.get('date'));
            const today = new Date();
            if (selectedDate > today) {
                throw new Error('日期不能超过今天');
            }

            const res = await fetch('/api/timeline', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            alert('回忆提交成功，等待审核！');
            e.target.reset();
            setPreviewImage(null);
        } catch (error) {
            setError(error.message || '提交失败，请稍后重试');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 自定义文件选择按钮
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 py-12 px-4">
            <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold text-center text-[#E25E3E] mb-8">
                    为她送上生日祝福
                </h1>

                {/* 表单类型选择 */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => {
                            setFormType('message');
                            setError('');
                            setPreviewImage(null);
                        }}
                        className={`px-6 py-2 rounded-full transition-colors ${
                            formType === 'message'
                                ? 'bg-[#FF9B50] text-white'
                                : 'bg-white/50 text-[#E25E3E]'
                        }`}
                    >
                        写留言
                    </button>
                    <button
                        onClick={() => {
                            setFormType('timeline');
                            setError('');
                        }}
                        className={`px-6 py-2 rounded-full transition-colors ${
                            formType === 'timeline'
                                ? 'bg-[#FF9B50] text-white'
                                : 'bg-white/50 text-[#E25E3E]'
                        }`}
                    >
                        分享回忆
                    </button>
                </div>

                {/* 错误提示 */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                        {error}
                    </div>
                )}

                {formType === 'message' ? (
                    <form onSubmit={handleMessageSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[#E25E3E] mb-2" htmlFor="author">
                                你的名字
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                required
                                maxLength={20}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#FF9B50]"
                                placeholder="请输入你的名字"
                            />
                        </div>

                        <div>
                            <label className="block text-[#E25E3E] mb-2" htmlFor="content">
                                祝福留言
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                required
                                maxLength={200}
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#FF9B50]"
                                placeholder="写下你的祝福..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 bg-[#FF9B50] text-white rounded-lg hover:bg-[#E25E3E] transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? '提交中...' : '发送祝福'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleTimelineSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[#E25E3E] mb-2" htmlFor="contributor">
                                你的名字
                            </label>
                            <input
                                type="text"
                                id="contributor"
                                name="contributor"
                                required
                                maxLength={20}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#FF9B50]"
                                placeholder="请输入你的名字"
                            />
                        </div>

                        <div>
                            <label className="block text-[#E25E3E] mb-2" htmlFor="title">
                                回忆标题
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                maxLength={50}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#FF9B50]"
                                placeholder="给这个回忆起个标题"
                            />
                        </div>

                        <div>
                            <label className="block text-[#E25E3E] mb-2" htmlFor="date">
                                发生时间
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#FF9B50]"
                            />
                        </div>

                        <div>
                            <label className="block text-[#E25E3E] mb-2" htmlFor="description">
                                回忆描述
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                maxLength={500}
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#FF9B50]"
                                placeholder="描述这个美好的回忆..."
                            />
                        </div>

                        <div>
                            <label className="block text-[#E25E3E] mb-2">
                                照片上传
                            </label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                name="image"
                                accept="image/*"
                                required
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                className="w-full py-2 px-4 border-2 border-dashed border-purple-200 rounded-lg text-[#E25E3E] hover:border-[#FF9B50] transition-colors"
                            >
                                点击选择照片
                            </button>
                            {previewImage && (
                                <div className="mt-4 relative w-full h-48">
                                    <Image
                                        src={previewImage}
                                        alt="预览图片"
                                        fill
                                        className="rounded-lg object-cover"
                                    />
                                </div>
                            )}
                            <p className="mt-2 text-sm text-gray-500">
                                支持jpg、png格式，大小不超过5MB
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 bg-[#FF9B50] text-white rounded-lg hover:bg-[#E25E3E] transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? '提交中...' : '分享回忆'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContributePage;
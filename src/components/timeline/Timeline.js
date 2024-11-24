"use client"

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
// 单个事件卡片组件
const TimelineEvent = ({ event, isLeft, index }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // 格式化日期
    const formattedDate = useMemo(() => {
        try {
            return new Date(event.event_date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return '日期无效';
        }
    }, [event.event_date]);

    return (
        <div
            className={`
        flex items-center gap-8 mb-12
        opacity-0 animate-fade-in
        ${isLeft ? '-translate-x-24 animate-slide-in-left' : 'translate-x-24 animate-slide-in-right flex-row-reverse'}
      `}
        >
            {/* 时间点 */}
            <div className="w-32 text-center flex-shrink-0">
                <div className="text-[#E25E3E] font-medium">
                    {formattedDate}
                </div>
            </div>

            {/* 连接线和圆点 */}
            <div className="relative flex-shrink-0">
                <div className="absolute w-px h-full bg-[#FFB072] left-1/2 -translate-x-1/2" />
                <div className="relative w-4 h-4 rounded-full border-2 border-[#FF9B50] bg-white z-10" />
            </div>

            {/* 内容卡片 */}
            <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102">
                {/* 图片区域 */}
                <div className="relative h-48 w-full">
                    {!imageError ? (
                        <Image
                            src={event.image_url}
                            alt={event.title}
                            fill
                            className={`
                object-cover
                transition-opacity duration-300
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}
              `}
                            onLoadingComplete={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index === 0}
                            quality={75}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <p className="text-gray-500">图片加载失败</p>
                        </div>
                    )}

                    {/* Loading placeholder */}
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                    )}
                </div>

                {/* 文字内容区域 */}
                <div className="p-6">
                    {/* 标题和时间 */}
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-medium text-[#E25E3E]">
                            {event.title}
                        </h3>
                        <span className="text-sm text-gray-500">
              {new Date(event.created_at).toLocaleDateString('zh-CN')}
            </span>
                    </div>

                    {/* 描述 */}
                    <p className="text-gray-600 leading-relaxed mb-4">
                        {event.description}
                    </p>

                    {/* 贡献者信息 */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>分享者: {event.contributor}</span>
                        <div className="flex items-center space-x-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-[#FF9B50]" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 主Timeline组件
const Timeline = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        contributor: '',
        title: '',
        description: '',
        date: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    // 获取事件列表
    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/timeline');
            if (!response.ok) {
                throw new Error('获取数据失败');
            }
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching events:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 初始加载
    useEffect(() => {
        fetchEvents();
    }, []);

    // 处理图片选择
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('图片大小不能超过5MB');
                return;
            }
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 处理表单输入
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 提交表单
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            alert('请选择图片');
            return;
        }

        setIsSubmitting(true);
        const submitData = new FormData();

        // 添加所有表单数据
        Object.entries(formData).forEach(([key, value]) => {
            submitData.append(key, value);
        });
        submitData.append('image', selectedImage);

        try {
            const response = await fetch('/api/timeline', {
                method: 'POST',
                body: submitData,
            });

            if (!response.ok) {
                throw new Error('提交失败');
            }

            // 重置表单
            setFormData({
                contributor: '',
                title: '',
                description: '',
                date: '',
            });
            setSelectedImage(null);
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // 重新加载事件列表
            await fetchEvents();
            alert('回忆提交成功，等待审核！');
        } catch (err) {
            console.error('Error submitting:', err);
            alert('提交失败，请稍后重试');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E25E3E]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
                <button
                    onClick={fetchEvents}
                    className="ml-2 underline"
                >
                    重试
                </button>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                {/* 时间轴标题 */}
                <h2 className="text-3xl font-bold text-center text-[#E25E3E] mb-12">
                    我们的故事
                </h2>

                {/* 时间轴 */}
                <div className="relative">
                    {/* 中间的时间线 */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#FFB072] -translate-x-1/2" />

                    {/* 事件列表 */}
                    <div className="relative">
                        {events.length > 0 ? (
                            events.map((event, index) => (
                                <TimelineEvent
                                    key={event.id}
                                    event={event}
                                    isLeft={index % 2 === 0}
                                    index={index}
                                />
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-12">
                                还没有回忆，来分享第一个回忆吧~
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
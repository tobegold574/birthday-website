"use client"

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const MessageCard = ({ message, onLike }) => {
    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-102 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-[#E25E3E] mb-2">{message.author}</p>
                    <p className="text-gray-700 mb-4">{message.content}</p>
                </div>
                <span className="text-sm text-gray-500">
          {new Date(message.created_at).toLocaleDateString()}
        </span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onLike(message.id)}
                    className="flex items-center gap-1 text-pink-500 hover:scale-110 transition-transform"
                >
                    <Heart
                        className="w-5 h-5"
                        fill={message.likes > 0 ? "currentColor" : "none"}
                    />
                    <span>{message.likes}</span>
                </button>
            </div>
        </div>
    );
};

const MessageWall = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 加载留言
    useEffect(() => {
        fetchMessages();
    }, []);

    // 获取留言列表
    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();
            setMessages(data);
        } catch (err) {
            setError('Failed to load messages');
            console.error('Error fetching messages:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 点赞功能
    const handleLike = async (messageId) => {
        try {
            const response = await fetch(`/api/messages/${messageId}/like`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Failed to like message');
            }
            // 更新本地状态
            setMessages(messages.map(msg =>
                msg.id === messageId
                    ? { ...msg, likes: msg.likes + 1 }
                    : msg
            ));
        } catch (err) {
            console.error('Error liking message:', err);
        }
    };

    // 提交新留言
    //deprecated
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    author: newAuthor,
                    content: newMessage,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit message');
            }

            // 清空表单
            setNewAuthor('');
            setNewMessage('');

            // 重新加载留言
            await fetchMessages();

            alert('留言提交成功，等待审核！');
        } catch (err) {
            console.error('Error submitting message:', err);
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
                    onClick={fetchMessages}
                    className="ml-2 underline"
                >
                    重试
                </button>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* 留言展示区域 */}
                <div className="space-y-4">
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <MessageCard
                                key={message.id}
                                message={message}
                                onLike={handleLike}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            还没有留言，来写下第一条祝福吧~
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageWall;
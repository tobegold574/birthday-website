"use client"

import { useState, useEffect } from 'react';
import { Heart, Eye, EyeOff } from 'lucide-react';

const MessageCard = ({ message, onLike, onToggleName }) => {
    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg transform hover:scale-102 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-[#E25E3E]">
                        {message.showName ? message.author : '*'.repeat(message.author.length)}
                    </p>
                    <button
                        onClick={() => onToggleName(message.id)}
                        className="text-gray-600 hover:text-gray-800 transition-colors flex items-center"
                        title={message.showName ? "隐藏留言者姓名" : "显示留言者姓名"}
                    >
                        {message.showName ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                </div>
                <span className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleDateString()}
                </span>
            </div>
            <p className="text-gray-700 my-4">{message.content}</p>
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

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/timeline');
            if (!response.ok) {
                const errorData = await response.json();  // 解析错误响应的 JSON 数据
                throw new Error(errorData.error);  // 使用返回的 error 字段作为错误信息
            }

            const data = await response.json();
            // 为每条消息添加显示/隐藏状态
            const messagesWithVisibility = data.map(msg => ({
                ...msg,
                showName: false
            }));
            setMessages(messagesWithVisibility);
        } catch (err) {
            setError('Failed to load messages');
            console.error('Error fetching messages:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async (messageId) => {
        try {
            const response = await fetch(`/api/messages/${messageId}/like`, {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Failed to like message');
            }
            setMessages(messages.map(msg =>
                msg.id === messageId
                    ? { ...msg, likes: msg.likes + 1 }
                    : msg
            ));
        } catch (err) {
            console.error('Error liking message:', err);
        }
    };

    const handleToggleName = (messageId) => {
        setMessages(messages.map(msg =>
            msg.id === messageId
                ? { ...msg, showName: !msg.showName }
                : msg
        ));
    };

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

            setNewAuthor('');
            setNewMessage('');
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

    const sortedMessages = [...messages].sort((a, b) => b.likes - a.likes);

    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                    {sortedMessages.length > 0 ? (
                        sortedMessages.map((message) => (
                            <MessageCard
                                key={message.id}
                                message={message}
                                onLike={handleLike}
                                onToggleName={handleToggleName}
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
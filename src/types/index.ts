// 留言墙数据结构
export interface Message {
    id: string;
    author: string;
    content: string;
    createdAt: Date;
    likes: number;
    isApproved: boolean;
}

// 时间轴数据结构
export interface TimelineEvent {
    id: string;
    date: Date;
    title: string;
    description: string;
    imageUrl: string;
    contributor: string;
    isApproved: boolean;
}

// API响应类型
export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}
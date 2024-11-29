import mysql from 'mysql2/promise';



const getConfig = () => {
    // 根据环境返回不同配置
    const baseConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    };

    if (process.env.NODE_ENV === 'production') {
        // 生产环境添加额外配置
        return {
            ...baseConfig,
            ssl: {
                rejectUnauthorized: false
            },
            connectTimeout: 60000,
            // 连接池设置
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        };
    }

    // 开发环境配置
    return {
        ...baseConfig,
        // 开发环境可以禁用SSL
        ssl: false
    };
};

// 创建连接池
const pool = mysql.createPool(getConfig());

// 导出连接测试函数
export async function testConnection() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Database connected successfully');
        await connection.query('SELECT 1');
        return true;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

// src/lib/db.js
export async function saveMessage({ author, content }) {
    try {
        // 测试连接
        const connection = await pool.getConnection();
        console.log('Database connected successfully');

        try {
            // 执行插入
            const [result] = await connection.execute(
                'INSERT INTO messages (author, content) VALUES (?, ?)',
                [author, content]
            );
            console.log('Insert result:', result);
            return result.insertId;
        } catch (queryError) {
            console.error('Query error:', queryError);
            throw queryError;
        } finally {
            connection.release();
        }
    } catch (connectionError) {
        console.error('Connection error:', connectionError);
        throw new Error(`数据库连接失败: ${connectionError.message}`);
    }
}

export async function getMessages() {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM messages WHERE is_approved = TRUE ORDER BY created_at DESC'
        );
        console.log('getting message completed');
        return rows;
    } catch (error) {
        console.log('getting message...');
        console.error('Error getting messages:', error);
        throw error;
    }
}

export async function updateMessageLikes(messageId) {
    try {
        await pool.execute(
            'UPDATE messages SET likes = likes + 1 WHERE id = ?',
            [messageId]
        );
    } catch (error) {
        console.error('Error updating message likes:', error);
        throw error;
    }
}

// 管理员功能：审核
export async function approveMessage(messageId) {
    try {
        await pool.execute(
            'UPDATE messages SET is_approved = TRUE WHERE id = ?',
            [messageId]
        );
    } catch (error) {
        console.error('Error approving message:', error);
        throw error;
    }
}

export async function approveTimelineEvent(eventId) {
    try {
        await pool.execute(
            'UPDATE timeline_events SET is_approved = TRUE WHERE id = ?',
            [eventId]
        );
    } catch (error) {
        console.error('Error approving timeline event:', error);
        throw error;
    }
}

// 错误处理函数
export function handleDatabaseError(error) {
    console.error('Database error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('记录已存在');
    }
    if (error.code === 'ER_NO_REFERENCED_ROW') {
        throw new Error('关联记录不存在');
    }
    throw new Error('数据库操作失败');
}


export async function saveTimelineEvent({ title, description, date, imageUrl, contributor }) {
    let connection;
    try {
        console.log('Getting database connection');
        connection = await pool.getConnection();

        console.log('Executing insert with params:', {
            title,
            description,
            date,
            imageUrl,
            contributor
        });

        const [result] = await connection.execute(
            `INSERT INTO timeline_events 
       (title, description, event_date, image_url, contributor) 
       VALUES (?, ?, ?, ?, ?)`,
            [title, description, date, imageUrl, contributor]
        );

        console.log('Insert result:', result);
        return result.insertId;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`数据库错误: ${error.message}`);
    } finally {
        if (connection) {
            console.log('Releasing connection');
            connection.release();
        }
    }
}

export async function getTimelineEvents() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(
            'SELECT * FROM timeline_events WHERE is_approved = TRUE ORDER BY event_date ASC'
        );
        return rows;
    } catch (error) {
        console.error('Error getting timeline events:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}
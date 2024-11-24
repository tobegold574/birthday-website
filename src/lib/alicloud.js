// 阿里云配置
const ossConfig = {
    region: process.env.ALI_OSS_REGION,
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
    bucket: process.env.ALI_OSS_BUCKET
};

const dbConfig = {
    // MongoDB配置
    mongoUrl: process.env.MONGODB_URL,
    // 或 MySQL配置
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
};

export { ossConfig, dbConfig };
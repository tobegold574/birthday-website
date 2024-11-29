// 阿里云配置
const ossConfig = {
    region: process.env.ALI_OSS_REGION,
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
    bucket: process.env.ALI_OSS_BUCKET
};

export { ossConfig };
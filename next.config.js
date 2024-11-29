/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['birthday-website.oss-cn-shanghai.aliyuncs.com'],
    },
    // 添加环境变量配置
    env: {
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        NEXT_PUBLIC_TITLE: process.env.NEXT_PUBLIC_TITLE
    },
    // 添加CORS配置
    async headers() {
        return [
            {
                // 匹配所有API路由
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // 在生产环境中建议设置具体的域名
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

module.exports = nextConfig;
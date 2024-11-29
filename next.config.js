/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['birthday-website.oss-cn-shanghai.aliyuncs.com'],
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
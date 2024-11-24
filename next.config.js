/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'birthday-website.oss-cn-shanghai.aliyuncs.com',
                port: '',
                pathname: '/timeline/**',
            },
            {
                protocol: 'https',
                hostname: 'birthday-website.oss-cn-shanghai.aliyuncs.com',
                port: '',
                pathname: '/timeline/**',
            },
        ],
    },
};

module.exports = nextConfig;
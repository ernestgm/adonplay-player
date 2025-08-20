import type {NextConfig} from "next";

const imagesServer = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL || "localhost";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'adonplay-backend',
                port: '9000', // or the port if your server is running on a specific port
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '10.0.2.2',
                port: '9000', // or the port if your server is running on a specific port
                pathname: '/uploads/**',
            },
        ],

    },
    allowedDevOrigins: ['10.0.2.2', 'player-adonplay.local'],
    /* config options here */
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};

export default nextConfig;

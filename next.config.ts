import type {NextConfig} from "next";

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
            // Firebase Storage download URLs
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/**',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/**',
            },
        ],

    },
    allowedDevOrigins: ['10.0.2.2', 'player-adonplay.local', 'localhost'],
    transpilePackages: [
        "apexcharts",
        "react-apexcharts",
        "swiper",
        "firebase",
        "@fullcalendar",
        "react-icons"
    ],
    // Esto ayuda a que el compilador SWC sea más conservador
    swcMinify: true,
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

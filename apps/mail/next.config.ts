// next.config.ts
// 1. Mete esto arriba, antes de cualquier uso de process.env
process.env.NEXT_PUBLIC_BACKEND_URL ??= 'https://dc0kkw0k8go0oow44w80s8sc.automatadr.com';
process.env.NEXTAUTH_URL ??= process.env.NEXT_PUBLIC_BACKEND_URL;

// 2. Luego tu configuración normal:
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // devIndicators: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['warn', 'error'],
          }
        : undefined,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '0.email' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'assets.0.email' },
    ],
  },
  typescript: {
    // TODO: enforce types throwing errors on build
    ignoreBuildErrors: true,
  },
  eslint: {
    // TODO: enforce linting throwing errors on build
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/settings',
        destination: '/settings/general',
        permanent: true,
      },
      {
        source: '/mail',
        destination: '/mail/inbox',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/mailto-handler',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mailto-handler`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);

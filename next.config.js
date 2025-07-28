/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
  images: {
    loader: 'akamai',
    path: '',
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {};
const { withKumaUI } = require('@kuma-ui/next-plugin');

module.exports = withKumaUI(nextConfig);
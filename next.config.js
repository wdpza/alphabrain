/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH0_SECRET: 'e7c4e86ea1da9bd55cf04766c3d5128cdafa3f3f9973755113617b500cb03ec4',
    AUTH0_BASE_URL: 'http://localhost:3000',
    AUTH0_ISSUER_BASE_URL: 'https://dev--tglatiy.us.auth0.com',
    AUTH0_CLIENT_ID: 'qcvOrFql15ZEYyZQfV3rTPjFc9qf8rod',
    AUTH0_CLIENT_SECRET: 'X95LTPaqDr_Ra8pQQ0WWiIPTr6BJk-y0EdjI6Fkhp1W9Mcg6woR1BtVib749C7er'
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 's.gravatar.com'],
  },
}

module.exports = nextConfig
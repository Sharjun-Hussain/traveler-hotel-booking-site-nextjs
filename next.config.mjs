/** @type {import('next').NextConfig} */

const nextConfig = {
  // redirects: async () => [
  //   {
  //     source: "/",
  //     destination: "/en",
  //     permanent: true, // 301 redirect (permanent)
  //   },
  // ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "iguanasurf.net",
      },
      {
        protocol: "https",
        hostname: "www.srilankainstyle.com",
      },
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
      },
    ],
  },
};

export default nextConfig;

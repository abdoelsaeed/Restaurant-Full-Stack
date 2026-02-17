/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "randomuser.me",
      "encrypted-tbn0.gstatic.com",
      "img.freepik.com",
      "d1csarkz8obe9u.cloudfront.net",
      "images.unsplash.com",
      "images.wral.com",
      "media.bizj.us",
      "carolinas.eater.com",
      "www.midtownmag.com",
      "www.foodandwine.com",
      "https://i.pinimg.com",
      "i.pinimg.com",
      // ✅ إضافة Facebook CDN domains
      "scontent.faly2-2.fna.fbcdn.net",
      "scontent.faly2-1.fna.fbcdn.net",
      "scontent.xx.fbcdn.net",
      "platform-lookaside.fbsbx.com",
      // ✅ إضافة Google domains
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      // ✅ إضافة Instagram domains
      "scontent-lax3-1.cdninstagram.com",
      "scontent-lax3-2.cdninstagram.com",
      "scontent.cdninstagram.com",
      // ✅ إضافة Twitter domains
      "pbs.twimg.com",
      "abs.twimg.com",
      // ✅ إضافة LinkedIn domains
      "media.licdn.com",
      "media-exp1.licdn.com",
      // ✅ إضافة Cloudinary domains (شائع في التطبيقات)
      "res.cloudinary.com",
      // ✅ إضافة Gravatar domains
      "secure.gravatar.com",
      "www.gravatar.com",
    ],
  },
  allowedDevOrigins: ["http://127.0.0.1:3001", "http://localhost:3001"],
};

module.exports = nextConfig;

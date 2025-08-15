// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // This flag makes `npm run build` emit a fully static `out/` folder
//   output: 'export',
// };

// module.exports = nextConfig;

// next.config.js
module.exports = {
  images: { unoptimized: true },
};




/* 
         for HTML export in run build
@type {import('next').NextConfig} 
const nextConfig = {
output:"export"
}

module.exports = nextConfig */

/* 
         for HTML export in run build
@type {import('next').NextConfig} 
const nextConfig = {
redirects:async()=>{
    return [
    {
    source:'/productlist',
    destination:'/',
    permanent:false
    }]
    }
}

module.exports = nextConfig */

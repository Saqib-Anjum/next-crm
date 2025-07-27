/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;


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

import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vita Nova',
    short_name: 'VitaNova',
    description: 'Centtralized blood donation and coordination platform for blood donors and recipients and hospitals',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/vitanova192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/vitanova512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
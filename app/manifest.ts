import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Match Note Maker',
    short_name: 'MatchNotes',
    description: 'Track your football analysis instead of betting. Predict, reflect, and earn points.',
    start_url: '/notes',
    display: 'standalone',
    background_color: '#f6f7f4',
    theme_color: '#175437',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

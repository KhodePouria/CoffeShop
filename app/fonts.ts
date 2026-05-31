import localFont from 'next/font/local'

export const Peyda = localFont({
  src: [
    { path: '../public/fonts/Peyda-Thin.woff2', weight: '100' },
    { path: '../public/fonts/peyda-light.woff2', weight: '300' },
    { path: '../public/fonts/Peyda-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Peyda-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Peyda-Bold.woff2', weight: '700' },
    { path: '../public/fonts/Peyda-ExtraBold.woff2', weight: '800' },
    { path: '../public/fonts/Peyda-Black.woff2', weight: '900' },
  ],
  variable: '--font-peyda',
})

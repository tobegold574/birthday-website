import './globals.css'

export const metadata = {
  title: '生日快乐',
  description: '特别的生日祝福网站',
}

export default function RootLayout({ children }) {
  return (
      <html lang="zh">
      <body>{children}</body>
      </html>
  )
}
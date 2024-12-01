import './globals.css'
import type { Metadata } from 'next';
import { Providers } from './GlobalRedux/provider';
import { Inter, Roboto, Caveat } from 'next/font/google'
const metaKeywords: string = "маникюр Севастополь, гель-лак, акрил, педикюр, маникюр ул.Шевченко";
const inter = Inter({ subsets: ['latin'] });
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '400', '500', '700'],
});
const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'ProStudioNails',
  description: 'Web application developed by Roman Zhdanov, © 2024',
  keywords: metaKeywords
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode

}) {
  return (
    <html lang="en">
      <Providers>
        <body className={caveat.className}>{children}</body>
      </Providers>
    </html>
  )
}

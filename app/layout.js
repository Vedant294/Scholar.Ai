import './globals.css';
import { AppProvider } from './context/AppContext';

export const metadata = {
  title: 'ScholarAI | Premium AI Scholarship Assistant for Indian Students',
  description: 'Discover, match, and apply for government, state, and private scholarships in India with instant AI guidance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

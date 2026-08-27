import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Chaithanya Kala Bharathi (CKB) | Nandyal, Andhra Pradesh',
  description: 'Chaithanya Kala Bharathi (CKB) is a registered NGO founded in 1992 in Nandyal, AP (12A, 80G, CSR, FCRA). Dedicated to School Education (Badi Bata), Mother & Child Health, Nutrition, and Livelihoods.',
  keywords: 'Chaithanya Kala Bharathi, CKB Nandyal, CKB NGO, Nandyal NGO, Badi Bata, Andhra Pradesh NGO, FCRA NGO Nandyal, Vijaya Bhaskar CKB',
  authors: [{ name: 'Chaithanya Kala Bharathi' }],
  openGraph: {
    title: 'Chaithanya Kala Bharathi (CKB) - Empowering Rural Communities in Nandyal',
    description: 'Serving communities since 1992 through education, healthcare, mother & child nutrition, and women empowerment.',
    url: 'https://www.ckbndl.org',
    siteName: 'Chaithanya Kala Bharathi',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

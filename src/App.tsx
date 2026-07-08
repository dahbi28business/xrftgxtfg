import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import NotFound from './components/NotFound';
import Chatbot from './components/Chatbot';
import { RouterProvider, useRouter } from './components/Router';

function AppContent() {
  const { path } = useRouter();

  // Strip hashes or query parameters for page routing
  const cleanPath = path.split('#')[0].split('?')[0];

  const renderPage = () => {
    switch (cleanPath) {
      case '/':
        return (
          <>
            <Hero />
            <Services />
            <Pricing />
            <WhyChooseUs />
            <HowItWorks />
            <Testimonials />
            <Contact />
          </>
        );
      case '/privacy':
        return <PrivacyPolicy />;
      case '/terms':
        return <TermsOfService />;
      case '/cookie-policy':
        return <CookiePolicy />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-background-50 text-foreground-900 selection:bg-primary-100 selection:text-primary-900 scroll-smooth flex flex-col justify-between">
      <div>
        <Header />
        <main>
          {renderPage()}
        </main>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

/** @jsx createVNode */
import { createVNode } from '../lib';
import { Header } from '../components/templates/Header';
import { Navigation } from '../components/templates/Navigation';
import { Footer } from '../components/templates/Footer';

export const DefaultLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation />

        {children}

        <Footer />
      </div>
    </div>
  );
};

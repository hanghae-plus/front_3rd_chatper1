/** @jsx createVNode */
import { createVNode } from "@/lib";

import { Header, Navigation, Footer } from "@/components/templates";

export function Layout({ children }) {
  return (
    <div className="max-w-md w-full h-full flex flex-col overflow-hidden">
      <Header />
      <Navigation />
      <main className="p-4 overflow-y-auto flex-1">{children}</main>
      <Footer />
    </div>
  );
}

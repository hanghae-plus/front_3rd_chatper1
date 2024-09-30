/** @jsx createVNode */
import { createVNode } from "@/lib";

export function RootLayout({ children }) {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

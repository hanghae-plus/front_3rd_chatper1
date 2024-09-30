/** @jsx createVNode */
import { Header } from "../components/templates/Header";
import { Navigation } from "../components/templates/Navigation";
import { Footer } from '../components/templates/Footer';
import { createVNode } from "../lib";
import { globalStore } from "../stores";
import { ProfilePage } from "./ProfilePage";

export const HomePage = () => {

  return (
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        {Header()}
        {Navigation()}
      
        <main class="p-4">
          <div id="posts-container" class="space-y-4">
          </div>
        </main>
      
        {Footer()}
      </div>
    </div>
  );
};

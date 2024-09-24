import Articles from '../components/Articles';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Write from '../components/Write';

export default function HomePage() {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}

        <main class="p-4">
          ${Write()}
          ${Articles()}
        </main>

        ${Footer()}
      </div>
    </div>
  `;
}

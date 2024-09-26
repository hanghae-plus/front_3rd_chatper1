import Header from '../components/Header';
import Footer from '../components/Footer';
import Post from '../components/Post';
import PostForm from '../components/PostForm';

const HomePage = ({ isLogged, posts }) => `
<div class="bg-gray-100 min-h-screen flex justify-center">
  <div class="max-w-md w-full">
  ${Header({ isLogged })}
    <main class="p-4">
    ${isLogged ? PostForm() : ''}
      <div class="space-y-4">
      ${posts
        .map((el) => {
          return Post({ ...el });
        })
        .join('')}
      </div>
    </main>
    ${Footer()}
  </div>
</div>
`;

export default HomePage;

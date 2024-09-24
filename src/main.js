import { routes, protectedRoutes } from './routes';
import { useNavigate } from './utils/useNavigate';

const { updateHTML } = useNavigate(routes, protectedRoutes);

updateHTML();

window.addEventListener('popstate', updateHTML);
window.addEventListener('error', (event) => {
  document.getElementById('main').innerHTML = /* HTML */ `
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">오류 발생!</strong>
      <p>${event.message}</p>
    </div>
  `;
});

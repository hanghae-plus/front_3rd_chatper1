import { useNavigate } from './utils/navigate';
import { routes } from './routes';

const { updateHTML } = useNavigate(routes);

window.addEventListener('popstate', updateHTML);
updateHTML();

import LayoutApp from './components/layout-app.component.js';
import './router.js';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
  rootElement.append(LayoutApp());
}

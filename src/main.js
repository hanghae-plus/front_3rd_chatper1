import Router from './router/Router';

const $root = document.getElementById('root');
const $app = document.createElement('div');
$app.setAttribute('id', 'app');

$root.appendChild($app);
Router.init();

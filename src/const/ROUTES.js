import mainTemplate from '../../templates/main.js';
import loginTemplate from '../../templates/login.js';
import errorTemplate from '../../templates/error.js';
import profileTemplate from '../../templates/profile.js';

const templates = {
  MAIN: mainTemplate,
  LOGIN: loginTemplate,
  PROFILE: profileTemplate,
  NOT_FOUND: errorTemplate
};

export const ROUTES = {
  '/': templates.MAIN,
  '/login': templates.LOGIN,
  '/profile': templates.PROFILE,
  'notFound': templates.NOT_FOUND
};


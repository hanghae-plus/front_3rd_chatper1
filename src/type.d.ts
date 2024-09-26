import Component from './core/component';

export interface UserDataType {
  username: string;
  email: string;
  bio: string;
}

export interface RouteType {
  path: string;
  instance: typeof Component;
  element: null | Component;
  layout: boolean;
}

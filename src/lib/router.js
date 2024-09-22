const pageList = ["/main", "/profile", "/login"];

export const routerPush = (path) => {
  if (!pageList.includes(path)) {
    path = "/notFound";
  }
  history.pushState(null, null, path);
};

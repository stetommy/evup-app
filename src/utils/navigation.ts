import { IRoute } from 'types/navigation';

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (
  routes: IRoute[],
  pathname: string
): IRoute => {
  if (!isWindowAvailable()) return null;

  for (const route of routes) {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!route.items) {
      // ===> x.length = 9 -- !x.length  = false -- !!x.length = true
      const found = findCurrentRoute(route.items, pathname);
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!found) return found;
    }
    // if (pathname?.match(route.path) && route) return route;
   /*  console.log(route, 'route'); */
  }
};

export const getActiveRoute = (routes: IRoute[], pathname: string): string => {
  const route = findCurrentRoute(routes, pathname);
  
  const pathArray = pathname.split('/');
  const arrayLastElement = pathArray[pathArray.length - 1];

  if (arrayLastElement.includes('-')) {
    const newLastElement = arrayLastElement.replace('-', ' ');
    return newLastElement.toLocaleUpperCase();
  } else {
    return arrayLastElement.toLocaleUpperCase();
  }
};

export const getActiveNavbar = (
  routes: IRoute[],
  pathname: string
): boolean => {
  const route = findCurrentRoute(routes, pathname);
  return route?.secondary;
};

export const getActiveNavbarText = (
  routes: IRoute[],
  pathname: string
): string | boolean => {
  return getActiveRoute(routes, pathname) || false;
};

import { AUTH_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants";

export const CheckIsPrivateRoute = (currentRoute: string): boolean => {
  return Boolean(
    PRIVATE_ROUTES.find((r: string) => {
      return currentRoute.includes(r);
    })
  );
};

export const CheckIsAuthRoute = (currentRoute: string): boolean => {
  return Boolean(
    AUTH_ROUTES.find((r: string) => {
      return r.includes(currentRoute);
    })
  );
};

export const CheckIsPublicRoute = (currentRoute: string): boolean => {
  return Boolean(
    PUBLIC_ROUTES.find((r: string) => {
      return r.includes(currentRoute);
    })
  );
};

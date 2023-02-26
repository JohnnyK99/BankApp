import { AppRoutes } from '../../app-routes.constants';

export const AuthConstants = {
  timeToRefreshAccessToken: 120000,
  redirectUrlsToIgnore: [AppRoutes.noAccess],
};

import { AppRoutes } from './routes/app-routes.constants';

export const AuthConstants = {
  timeToRefreshAccessToken: 120000,
  redirectUrlsToIgnore: [AppRoutes.noAccess],
  passwordRules: {
    minLength: 10,
    minCapitalLetters: 1,
    minDigits: 1,
    minSpecialCharacters: 1,
    specialCharacters: ['!', '@', '#', '$', '%', '^', '&', '*'],
  },
};

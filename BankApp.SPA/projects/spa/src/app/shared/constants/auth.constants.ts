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
  defaultCustomerCredentials: {
    email: 'adamjones@gmail.com',
    password: 'NkhO*4U42Y7C',
  },
  defaultEmployeeCredentials: {
    email: 'jsmith@gmail.com',
    password: 'I1!1c%Z2569U',
  },
};

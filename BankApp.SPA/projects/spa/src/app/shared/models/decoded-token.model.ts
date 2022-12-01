import { JwtPayload } from 'jwt-decode';

export interface DecodedToken extends JwtPayload {
  name: string;
  role: string[];
}

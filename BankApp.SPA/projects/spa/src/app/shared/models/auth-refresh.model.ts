export interface AuthRefreshModel {
  accessToken: string | null;
  refreshToken: string | null;
  refreshTokenExp: number | null;
}

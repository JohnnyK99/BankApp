export interface IdTranslationsApi {
  id: number;
  translations: Translation[];
}

export interface Translation {
  countryCode: string;
  value: string;
}

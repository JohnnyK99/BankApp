export class StringHelpers {
  static getCapitalLettersCount(s: string): number {
    return s.match(/[A-Z]/g)?.length || 0;
  }

  static getDigitCount(s: string): number {
    return s.match(/\d/g)?.length || 0;
  }

  static getSpecialCharacterCount(s: string, specialCharacters: string[]): number {
    const regex = new RegExp(`[${specialCharacters.join('|')}]`, 'g');
    return s.match(regex)?.length || 0;
  }
}

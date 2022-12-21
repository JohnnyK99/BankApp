import { HttpParams, HttpResponse } from '@angular/common/http';

export class HttpHelpers {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static getQueryStringParams<T extends {}>(params: T): HttpParams {

    const notNullParams = Object.fromEntries(Object.entries(params)
      .filter(([, value]) => value != null)
      .map(entry => entry as [string, number|string|boolean]));

    return new HttpParams({ fromObject: notNullParams });
  }

  static mapResponseToFile(response: HttpResponse<Blob>, defaultFileName: string): File {
    const fileName = HttpHelpers.getFileNameFromHeader(response, defaultFileName);
    if(!response.body) {
      throw new Error('errors.download_file');
    }
    return new File([response.body], fileName);
  }

  private static getFileNameFromHeader(response: HttpResponse<any>, defaultName: string): string {
    const contentDisposition = response.headers.get('content-disposition');
    if(!contentDisposition) {
      return defaultName;
    }

    const reg = /^.*'(.+)$/;
    const match = reg.exec(contentDisposition);

    if(!match) {
      return defaultName;
    }

    return decodeURI(match[1]);
  }
}

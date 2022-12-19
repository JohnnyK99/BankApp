import { HttpResponse } from '@angular/common/http';

export class HttpHelpers {
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

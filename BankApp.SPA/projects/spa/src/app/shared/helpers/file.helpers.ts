export class FileHelpers {
  static downloadFile(file: File): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
    link.remove();
  }
}

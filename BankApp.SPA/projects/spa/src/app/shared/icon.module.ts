import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatIconModule],
})
export class IconModule {
  private path = '../../assets/icons';

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry
      .addSvgIcon('flag-PL', this.setPath('/flags/pl.svg'));
  }

  private setPath(name: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.path}/${name}`);

  }
}

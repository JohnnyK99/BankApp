import { Component, Input } from '@angular/core';

@Component({
  selector: 'bnk-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
})
export class InfoItemComponent {
  @Input()
  subtitle: string;
}

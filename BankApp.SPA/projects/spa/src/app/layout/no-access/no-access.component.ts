import { Component } from '@angular/core';
import { AppRoutes } from '../../shared/constants/routes/app-routes.constants';

@Component({
  selector: 'bnk-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss'],
})
export class NoAccessComponent {
  readonly AppRoutes = AppRoutes;
}

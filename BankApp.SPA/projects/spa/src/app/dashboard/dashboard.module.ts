import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { LeftOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { AccountCardComponent } from './features/account-card/account-card.component';
import { NgxMaskModule } from 'ngx-mask';
import { TranslatedFieldPipe } from '../shared/pipes/translated-field.pipe';
import { DashboardStoreModule } from './state/dashboard-store.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardStoreModule,
    TranslateModule,
    NzCarouselModule,
    NzButtonModule,
    NzSkeletonModule,
    NzIconModule.forChild([LeftOutline, RightOutline]),
    NgxMaskModule.forChild(),
    TranslatedFieldPipe,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }

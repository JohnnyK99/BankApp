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
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InfoItemModule } from '../shared/components/info-item/info-item.module';
import { TransactionDialogComponent } from './features/transaction-dialog/transaction-dialog.component';
import { DashboardStoreModule } from './state/dashboard-store.module';
import { NewAccountCardComponent } from './features/new-account-card/new-account-card.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountCardComponent,
    TransactionDialogComponent,
    NewAccountCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    DashboardStoreModule,
    TranslateModule,
    InfoItemModule,
    NzCarouselModule,
    NzButtonModule,
    NzSkeletonModule,
    NzModalModule,
    NzFormModule,
    NzAlertModule,
    NzSelectModule,
    NzIconModule.forChild([LeftOutline, RightOutline]),
    NgxMaskModule.forChild(),
    TranslatedFieldPipe,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }

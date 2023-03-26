import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { InfoItemModule } from '../shared/components/info-item/info-item.module';
import { TranslatedFieldPipe } from '../shared/pipes/translated-field.pipe';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AccountCardComponent } from './features/account-card/account-card.component';
import { NewAccountCardComponent } from './features/new-account-card/new-account-card.component';
import { TransactionDialogComponent } from './features/transaction-dialog/transaction-dialog.component';
import { DashboardComponent } from './pages/dashboard.component';
import { DashboardStoreModule } from './state/dashboard-store.module';

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
    NzToolTipModule,
    NzIconModule,
    NgxMaskModule.forChild(),
    TranslatedFieldPipe,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }

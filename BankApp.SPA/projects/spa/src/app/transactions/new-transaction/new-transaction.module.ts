import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskModule } from 'ngx-mask';
import { NewTransactionComponent } from './pages/new-transaction.component';
import { AddressBookDialogComponent } from './features/address-book-dialog/address-book-dialog.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { TranslatedFieldPipe } from '../../shared/pipes/translated-field.pipe';
import { ConfirmTransactionDialogComponent } from './features/confirm-transaction-dialog/confirm-transaction-dialog.component';
import { RouterModule } from '@angular/router';
import { InfoItemModule } from '../../shared/components/info-item/info-item.module';
import { NewTransactionStoreModule } from './state/new-transaction-store.module';
import { TransactionSuccessComponent } from './pages/transaction-success/transaction-success.component';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  declarations: [
    NewTransactionComponent,
    AddressBookDialogComponent,
    ConfirmTransactionDialogComponent,
    TransactionSuccessComponent,
  ],
  imports: [
    CommonModule,
    NewTransactionStoreModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    TranslatedFieldPipe,
    RouterModule,
    NgxMaskModule.forChild(),
    InfoItemModule,
    NzFormModule,
    NzInputModule,
    NzIconModule.forChild([]),
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    NzRadioModule,
    NzResultModule,
  ],
  exports: [
  ],
})
export class NewTransactionModule { }

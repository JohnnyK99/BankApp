import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { InfoItemModule } from '../../shared/components/info-item/info-item.module';
import { TranslatedFieldPipe } from '../../shared/pipes/translated-field.pipe';
import { AddressBookDialogComponent } from './features/address-book-dialog/address-book-dialog.component';
import { ConfirmTransactionDialogComponent } from './features/confirm-transaction-dialog/confirm-transaction-dialog.component';
import { NewTransactionComponent } from './pages/new-transaction.component';
import { TransactionSuccessComponent } from './pages/transaction-success/transaction-success.component';

@NgModule({
  declarations: [
    NewTransactionComponent,
    AddressBookDialogComponent,
    ConfirmTransactionDialogComponent,
    TransactionSuccessComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    TranslatedFieldPipe,
    RouterModule,
    NgxMaskModule.forChild(),
    InfoItemModule,

    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    NzRadioModule,
    NzResultModule,
    NzToolTipModule,
  ],
})
export class NewTransactionModule { }

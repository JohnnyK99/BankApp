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

@NgModule({
  declarations: [
    NewTransactionComponent,
    AddressBookDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    TranslatedFieldPipe,
    NgxMaskModule.forChild(),
    NzFormModule,
    NzInputModule,
    NzIconModule.forChild([]),
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    NzRadioModule,
  ],
  exports: [
  ],
})
export class NewTransactionModule { }

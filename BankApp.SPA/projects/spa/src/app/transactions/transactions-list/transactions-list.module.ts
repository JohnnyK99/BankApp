import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TransactionsListComponent } from './pages/transactions-list.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [
    TransactionsListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NzFormModule,
    NgxMaskModule.forChild(),
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzTableModule,
  ],
  exports: [
  ],
})
export class TransactionsListModule { }

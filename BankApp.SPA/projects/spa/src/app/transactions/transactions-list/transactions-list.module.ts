import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxMaskModule } from 'ngx-mask';
import { TransactionsListComponent } from './pages/transactions-list.component';

@NgModule({
  declarations: [
    TransactionsListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NgxMaskModule.forChild(),

    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzTableModule,
  ],
})
export class TransactionsListModule { }

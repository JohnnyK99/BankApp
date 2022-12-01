import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  constructor(
    private toastr: ToastrService,
    private translationService: TranslationService
  ) { }

  error(message: string): void {
    this.toastr.error(this.translationService.getTranslation(message));
  }

  success(message: string): void {
    this.toastr.success(this.translationService.getTranslation(message));
  }

  info(message: string): void {
    this.toastr.info(this.translationService.getTranslation(message));
  }
}

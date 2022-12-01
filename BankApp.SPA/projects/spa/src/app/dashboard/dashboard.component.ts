import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthFacade } from '../global-stores/auth/auth.facade';

@Component({
  selector: 'bnk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(public authFacade: AuthFacade, private http: HttpClient) { }

  onClick(): void {
    this.http.get('https://localhost:7225/api/test').subscribe(res => console.log(res));
  }

}

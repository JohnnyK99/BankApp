import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Client } from 'projects/api-client/src/models/auth/client.model';
import { filter } from 'rxjs';
import { BaseComponent } from '../../../base.component';
import { ClientsFacade } from '../../../global-stores/clients/clients.facade';
import { UserRoles } from '../../../shared/constants/enums/user-roles.enum';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'bnk-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.scss'],
})
export class ClientSelectorComponent extends BaseComponent implements OnInit {

  clientControl = new FormControl<Client | null>(null);

  constructor(
    public facade: ClientsFacade,
    private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    if(this.userService.isInRole(UserRoles.Employee)) {
      this.facade.fetchClients('');
    }

    this.observe(this.clientControl.valueChanges)
      .pipe(filter(Boolean))
      .subscribe(client => this.facade.setSelectedClientId(client.id));
  }
}

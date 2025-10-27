import { Component, OnInit } from '@angular/core';
import { RefreshService } from '../services/refresh.service';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'ngx-data-catalogue',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class DataCatalogueComponent implements OnInit {

  constructor(
    private refreshService: RefreshService,
  ) { }

  ngOnInit(): void {
    this.refreshService.refreshPageOnce('admin-configuration');
  }

}

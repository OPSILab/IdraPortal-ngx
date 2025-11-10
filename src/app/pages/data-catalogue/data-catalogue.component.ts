import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ngx-about',
  template: `
  <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet],
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

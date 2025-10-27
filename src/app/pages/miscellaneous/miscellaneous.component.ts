import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  imports: [RouterOutlet],
  selector: 'ngx-miscellaneous',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class MiscellaneousComponent {
}

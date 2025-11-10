import { NbButtonModule, NbCardModule, NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [TranslateModule, NbCardModule, NbButtonModule, RouterModule],
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  constructor(private menuService: NbMenuService,public translation: TranslateService,) {
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}

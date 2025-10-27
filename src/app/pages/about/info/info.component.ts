import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  imports: [MatCardModule, TranslateModule],
  selector: 'ngx-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public translation: TranslateService,) { }

  ngOnInit(): void {
  }

}

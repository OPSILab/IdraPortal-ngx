import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <a href="https://idra.readthedocs.io/en/latest/" target="_blank">Idra Open Data Federation Platform</a> supporting 
      <a href="https://semiceu.github.io/DCAT-AP/releases/3.0.0-hvd/" target="_blank">DCAT-AP v3.0.0 for High Value Datasets </a>
    </span>
  `,
})
export class FooterComponent {
}

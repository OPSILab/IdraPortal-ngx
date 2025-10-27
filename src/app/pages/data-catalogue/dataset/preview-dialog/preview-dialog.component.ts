import { Component, Input } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogRef, NbSpinnerModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [NbSpinnerModule, NbCardModule, TranslateModule, NbButtonModule],
  selector: 'ngx-remoteCatalogue-dialog',
  templateUrl: 'preview-dialog.component.html',
  styleUrls: ['preview-dialog.component.scss'],
})
export class PreviewDialogComponent {

  @Input() title: string;
  url: string;
  loading: boolean;
  text: string;

  constructor(protected ref: NbDialogRef<PreviewDialogComponent>) {}

  close() {
    this.ref.close();
  }
  ngOnInit() {
  const isCSV = this.url?.includes('csv');
  const isJSON = this.url?.includes('json');

  if (isCSV || isJSON) {
    this.loading = true;
    // Use a public CORS proxy for development only; replace with your backend proxy in production
    const corsProxy = 'https://corsproxy.io/?';
    fetch(corsProxy + encodeURIComponent(this.url), { referrerPolicy: "unsafe-url" })
      .then(response => {
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 15 * 1024 * 1024) {
        const container = document.getElementById('iframeBody');
        if (container) {
        container.innerHTML = '<div style="color: red; font-weight: bold; font-size: 1.2em;">{{ "PREVIEW_SIZE_TOO_LARGE" | translate }}</div>';
        }
        this.loading = false;
        throw new Error("File size too large to preview, but you can still download it");
      }
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text();
      })
      .then(data => {
        if (data && data.length > 20 * 1024 * 1024) {
          const container = document.getElementById('iframeBody');
          if (container) {
          container.innerHTML = '<div style="color: red; font-weight: bold; font-size: 1.2em;">{{ "PREVIEW_SIZE_TOO_LARGE" | translate }}</div>';
          }
          this.loading = false;
          throw new Error("File size too large to preview, but you can still download it");
        }
        const container = document.getElementById('iframeBody');
        if (isCSV) {
          const table = this.csvToTable(data);
          table.setAttribute('style', 'height: 70vh;width: 80vw;overflow: auto;display: block;');
          container.appendChild(table);
        } else {
          const pre = document.createElement('pre');
          pre.textContent = JSON.stringify(JSON.parse(data), null, 2);
          pre.setAttribute('style', 'height: 70vh;width: 80vw;overflow: auto;');
          container.appendChild(pre);
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  } else if (this.text == undefined) {
    this.loading = true;
    const src = 'https://docs.google.com/gview?url=' + this.url + '&embedded=true';
    const iframe = document.createElement('iframe');
    iframe.setAttribute('style','height: 70vh;width: 80vw;');
    iframe.src = src;

    const interval = setInterval(() => {
      this.loading = true;
      iframe.src = src;
    }, 5000);

    iframe.onload = () => {
      this.loading = false;
      clearInterval(interval);
    };
    iframe.onerror = () => {
      this.loading = false;
    };

    document.getElementById('iframeBody').appendChild(iframe);
  // } else {
  //   this.loading = true;
  //   const pre = document.createElement('pre');
  //   pre.setAttribute('style','height: 70vh;width: 80vw;overflow: auto;');
  //   pre.textContent = this.text;
  //   document.getElementById('iframeBody').appendChild(pre);
  //   this.loading = false;
  // }
  } else {
    if (this.text && this.text.length > 15 * 1024 * 1024) {
      const container = document.getElementById('iframeBody');
      if (container) {
      container.innerHTML = '<div style="color: red; font-weight: bold; font-size: 1.2em;">{{ "PREVIEW_SIZE_TOO_LARGE" | translate }}</div>';
      }
      this.loading = false;
      throw new Error("File size too large to preview, but you can still download it");
    }
    this.loading = true;
    const pre = document.createElement('pre');
    pre.setAttribute('style','height: 70vh;width: 80vw;overflow: auto;');
    pre.setAttribute('readonly','true');

    try {
      const parsed = JSON.parse(this.text);
      pre.textContent = JSON.stringify(parsed, null, 2);
    } catch (e) {
      // In caso non sia JSON valido, mostra così com'è
      pre.textContent = this.text;
    }

    document.getElementById('iframeBody').appendChild(pre);
    this.loading = false;
  }
}


  csvToTable(csvText: string): HTMLTableElement {
  const table = document.createElement('table');
  table.border = '1';
  const rows = csvText.trim().split('\n');

  rows.forEach((row, index) => {
    const tr = document.createElement('tr');
    let cells
    if(row.includes(',')) {
      cells = row.split(',');
    } else if(row.includes('\t')) {
      cells = row.split('\t');
    } else if(row.includes('|')) {
      cells = row.split('|');
    } else if(row.includes(';')) {
      cells = row.split(';');
    }

    cells.forEach(cell => {
      const td = document.createElement(index === 0 ? 'th' : 'td');
      td.textContent = cell;
      tr.appendChild(td);
    });

    table.appendChild(tr);
  });

  return table;
}

}

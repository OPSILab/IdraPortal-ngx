import { Component, Input } from '@angular/core';
import { NbCardModule, NbDialogRef } from '@nebular/theme';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [NbCardModule, TranslateModule, CodeEditorModule],
  selector: 'ngx-editor-dialog',
  templateUrl: 'editor-dialog.component.html',
  styleUrls: ['editor-dialog.component.scss'],
})
export class EditorDialogComponent {
  
   model: CodeModel = {
      language: 'json',
      uri: 'main.json',
      value: ``,
    };
    
  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor(protected ref: NbDialogRef<EditorDialogComponent>) {}

  dismiss(mode: boolean) {
    if (mode) 
      this.ref.close(this.model.value);
    else
      return this.ref.close(false);
  } 
}
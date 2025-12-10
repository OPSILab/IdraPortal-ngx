import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dialogSelectedLanguage = new BehaviorSubject<string>(null);
  dialogSelectedLanguage$ = this.dialogSelectedLanguage.asObservable();
  constructor() { }

  propagateDialogSelectedLanguage(dialogSelectedLanguage: string) {
    this.dialogSelectedLanguage.next(dialogSelectedLanguage)
  }
}

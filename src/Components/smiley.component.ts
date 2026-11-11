import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-smiley',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span role="img" aria-label="Lächelndes Gesicht">😊</span>`,
  styles: `
    :host {
      display: inline-block;
      font-size: 3rem;
      line-height: 1;
    }
  `
})
export class SmileyComponent {}

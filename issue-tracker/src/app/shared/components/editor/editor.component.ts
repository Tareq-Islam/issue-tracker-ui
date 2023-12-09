import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eye-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() text!: string;
  @Output() textChange = new EventEmitter();

  onTextChange() {
    this.textChange.emit(this.text);
  }
}

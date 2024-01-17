import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
@Component({
  selector: 'eye-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  ngOnInit(): void {
    document.addEventListener('keypress', (event: KeyboardEvent) => {
      const keyCode = event.keyCode;
      if (keyCode === 13) {
        this.isLoading = true;
        if (this.userName && this.password) {
          this.save.emit({
            userName: this.userName,
            password: this.password,
          });
        } else {
          this._isLoading = false;
          this._isError = true;
          this._errorMessage = ['username and password required'];
        }
      }
    });
  }
  userName: string = 'tareq';
  password: string = '1234';
  _isError = false;
  _isLoading = false;

  @Input() set isError(v: boolean) {
    this._isError = v;
  }

  @Input() set isLoading(v: boolean) {
    this._isLoading = v;
  }

  _errorMessage = ['Invalid Username or Password'];

  @Input() set errorMessage(v: string[]) {
    this._errorMessage = [];
    this._errorMessage = v;
  }

  @Output() save = new EventEmitter<{ userName: string; password: string }>();

  onSave() {
    this.isLoading = true;
    if (this.userName && this.password) {
      this.save.emit({
        userName: this.userName,
        password: this.password,
      });
    } else {
      this._isLoading = false;
      this._isError = true;
      this._errorMessage = ['username and password required'];
    }
  }
}

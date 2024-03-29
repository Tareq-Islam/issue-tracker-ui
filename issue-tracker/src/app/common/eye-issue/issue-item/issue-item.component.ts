import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'eye-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.scss']
})
export class IssueItemComponent{
  faComment = faComment;
  @Output() OnScrolling = new EventEmitter();
  @Input() IsApiCalling = false;
  @Input() NotFound = false;
  @Input() Items:any[] = [];
  status = ['Open', 'Close'];
  priority = ['Low', 'Medium', 'High', 'Critical'];

  constructor(
    private _domSanitizer:DomSanitizer
  ) { }

  trackBy(index: number, item: any): number {
    return item.issueId;
  }

  onScrolling(){
    this.OnScrolling.emit();
  }

  contentSecurity(text:any){
    return this._domSanitizer.bypassSecurityTrustHtml(text);
  }
}

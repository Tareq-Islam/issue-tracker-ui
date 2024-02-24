import { Component, Input} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'eye-issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
export class IssueCommentComponent {
  faComment = faCommentDots;
  @Input() comment!: any;
  constructor(
    private _sanitizer: DomSanitizer
  ) {}


  getShortName(name: string) {
      return name.charAt(0).toUpperCase();
  }

  contentSecurity(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }
}


import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faHandshake, faBullhorn, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'eye-issue-comment-options',
  templateUrl: './issue-comment-options.component.html',
  styleUrls: ['./issue-comment-options.component.scss']
})
export class IssueCommentOptionsComponent {

  @Input() options!: any;
  faCheck = faCheck;
  faHandshake = faHandshake;
  faBullhorn = faBullhorn;
  isStatusDetailsModalOpen = false;
  currentStatus!: any;
  commentUserName!: any;

  constructor(
    private _sanitizer: DomSanitizer
  ) {}

  contentSecurity(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }

  onStatusDetails(currentStatus: any) {
    this.commentUserName = currentStatus.creatorUserName;
    this.currentStatus = currentStatus.doorCurrentSatus;
    this.isStatusDetailsModalOpen = true;
 }

}

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faCommentDots, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'eye-issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
export class IssueCommentComponent implements OnInit {

  faComment = faCommentDots;
  faCheck = faCheck;


  @Input() comment!: any;
  @Input() issueDetails!: any;
  @Input() isComment = false;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  isStatusDetailsModalOpen = false;
  isUserRight = false;
  images = [];
  commentUserName!: any;
  currentStatus!:any;

  constructor(
    private _lightbox: Lightbox,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.comment.imageUrls.map((x: any) => {
      return {
        ...x,
        isLoad: false,
      };
    });
    const userId = 1;
    this.isUserRight = this.comment.creatorUserId === Number(userId);
  }

  getShortName(name: string) {
      return name.charAt(0).toUpperCase();
  }

  contentSecurity(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }

  open(index: number): void {
    this.images = this.comment.imageUrls.map((x: any) => {
      return {
        src: x.largeImageUrl
          ? x.largeImageUrl
          : '/assets/images/other/noimage-found_l.png',
        thumb: x.thumbnailImageUrl
          ? x.thumbnailImageUrl
          : '/assets/images/other/noimage-found_t.png',
      };
    });
    this._lightbox.open(this.images, index, {
      centerVertically: true,
      fadeDuration: 0
    });
  }

  close(): void {
    this._lightbox.close();
  }

  onStatusDetails(currentStatus: any) {
     this.commentUserName = currentStatus.creatorUserName;
     this.currentStatus = currentStatus.doorCurrentSatus;
     this.isStatusDetailsModalOpen = true;
  }
}


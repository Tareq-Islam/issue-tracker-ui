import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TrackService } from '../services/tracks.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

export enum IssueStatusEnum {
  All,
  Open,
  Close,
}

interface Issue {
  id: number;
  categoryId: number;
  categoryName: string;
  siteId: number;
  siteName: string;
  vendorId: number;
  vendorName: string;
  status: IssueStatusEnum;
  priorityStatus: number;
}

export interface Track extends Issue {
  assignees: {
    id: number;
    userId: number;
    userName: string;
    assigneeType: number;
  }[];
  comments: {
    userName: string;
    subject: string;
    assigneeId: number;
    commentText: string;
    creationTime: string;
  }[];
  causes: any[];
  solutions: any[];
}

@Component({
  selector: 'eye-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss'],
})
export class TrackDetailsComponent implements OnInit {
  @Input() trackingData!: Track;
  @Input() issue!: Issue
  constructor(
    public claim: LoginUserClaimService
  ) {}

  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  ngOnInit(): void {
    this.onCommenter();
  }

  onCommenter() {
    this.model = {
      issueId: this.issue.id,
      subject: null,
      comment: null,
    };
    this.fields = [
      {
        className: 'item-self-center',
        type: 'input',
        key: 'subject',
        templateOptions: {
          label: 'Subject',
          placeholder: 'Enter subject',
          required: true,

          maxLength: 200,
        },
      },
      {
        type: 'editor',
        key: 'comment',
        templateOptions: {
          label: 'Comment',
          headerTemplate: true,
          required: true,
          maxLength: 2000,
          style: { height: '128px' },
        },
      },
    ];
  }

  onSubmit() {
    // const submitData = {
    //   issueId: this.model.issueId,
    //   subject:
    //     typeof data.subject == 'string' ? data.subject : data.subject.value,
    //   comment: data.comment,
    // };

    // this._issueTrackerApiService
    //   .createIssueComment(submitData)
    //   .subscribe((res) => {
    //     if (res) {
    //       this.onCommenter();
    //       this.options.parentForm?.resetForm();
    //       this._internalService.getUpdateIssueTrackingEvent.emit({
    //         IssueId: this.issue.issueId,
    //       });
    //     }
    //   });
  }


}

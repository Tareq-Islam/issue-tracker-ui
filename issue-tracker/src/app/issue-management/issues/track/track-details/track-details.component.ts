import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TrackService } from '../services/tracks.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Component({
  selector: 'eye-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss'],
})
export class TrackDetailsComponent implements OnInit {
  @Input() trackingData: any;
  @Input() issue: any;
  constructor(
    // private _issueTrackerApiService: AdminIssueTrackerApiService,
    // private _issuInfoApiService: AdminIssueInfoApiService,
    private _internalService: TrackService,
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
      issueId: this.issue.issueId,
      subject: null,
      comment: null,
      files: [],
    };
    this.fields = [
      {
        className: 'item-self-center',
        type: 'autocomplete',
        key: 'subject',
        templateOptions: {
          placeholder: 'Subject',
          required: true,
          maxLength: 200,
          forceSelection: false,
          results: [],
          searchObject: async (templateOptions: any, $event: any) => {
            if ($event && $event.query) {
              let param = new HttpParams();
              param = param.append('keyword', $event.query);
              // const responseData: any =
              //   (await this._issuInfoApiService
              //     .searchIssueCommentSubject(param)
              //     .toPromise()) || [];
              // templateOptions.results = responseData.data.map((x: any) => {
              //   return {
              //     label: x,
              //     value: x,
              //   };
              // });
            }
          },
        },
      },
      {
        type: 'editor',
        key: 'comment',
        templateOptions: {
          headerTemplate: true,
          required: true,
          maxLength: 2000,
          style: { height: '128px' },
        },
      },
      {
        type: 'multiFileUploader',
        key: 'files',
      },
    ];
  }

  async getIssueCommentSubject(keyword: any) {
    let param = new HttpParams();
    if (keyword) param = param.append('keyword', keyword);
    // const responseData: any =
    //   (await this._issuInfoApiService
    //     .searchIssueCommentSubject(param)
    //     .toPromise()) || [];

    // let result: any;
    // if (responseData.data) {
    //   result = responseData.data.map((x: any) => {
    //     const subject = {
    //       label: x,
    //       value: x,
    //     };
    //     return subject;
    //   });
    //   return result;
    // } else {
    //   return (result = []);
    // }
  }

  async onSubmit(data: {
    issueId: any;
    subject: any;
    comment: any;
    files: any;
  }) {
    const submitData = {
      issueId: this.model.issueId,
      subject:
        typeof data.subject == 'string' ? data.subject : data.subject.value,
      comment: data.comment,
    };

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

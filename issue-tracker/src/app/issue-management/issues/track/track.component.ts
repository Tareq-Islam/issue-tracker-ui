import { HttpParams } from '@angular/common/http';
import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { kebabCase } from 'lodash';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { TrackService } from './services/tracks.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';

@Component({
  selector: 'eye-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit, OnDestroy {
  getUpdatedIssueTrackingSubscription = new Subscription();
  isCommentEditModalOpen = false;
  issue: any;
  issueDetails: any;
  issueTrackingDetails: any;

  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  itemMenus: MenuItem[] = [
    {
      label: 'Edit',
      icon: PrimeIcons.USER_EDIT,
      visible: true,
      command: ({ item }) => {
        // this.onLastCommentEdit(item.trackingData);
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: true,
      command: ({ item }) => {
        // this.onLastCommentDelete(item.trackingData);
      },
    },
  ];

  constructor(
    private _config: DynamicDialogConfig,
    // private _issueService: AdminIssueApiService,
    // private _trackerService: AdminIssueTrackerApiService,
    // private _issueInfoApiService: AdminIssueInfoApiService,
    private _internalService: TrackService,
    private _swal: EyeSwalService,
    public _claimService: LoginUserClaimService
  ) {}

  ngOnInit(): void {
    this.issue = this._config.data.issue;
    this.notificationSeen();
    this.getUpdatedIssueTrackingSubscription =
      this._internalService.getUpdateIssueTrackingEvent.subscribe((res) => {
        this.getIssueDetails(res.IssueId);
        this.getIssueTrackingDetails(res.IssueId);
      });
  }

  onLastCommentEdit(item: any) {
    this.isCommentEditModalOpen = true;
    this.model = {
      issueTrackingId: item.trackingId,
      issueId: this.issue.issueId,
      subject: { label: item.subject, value: item.subject },
      comment: item.comment,
    };
    this.fields = [
      {
        className: 'item-self-center',
        type: 'autocomplete',
        key: 'subject',
        templateOptions: {
          placeholder: 'Enter subject',
          label: 'Subject',
          required: true,
          maxLength: 200,
          forceSelection: false,
          results: [],
          searchObject: async (templateOptions: any, $event: any) => {
            templateOptions.results = await this.getIssueCommentSubject(
              $event.query
            );
          },
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
          style: { height: '250px' },
        },
      },
    ];
  }

  onLastCommentEditSubmit(event: any) {
    this.isCommentEditModalOpen = false;
    const submitData = {
      issueId: this.model.issueId,
      comment: event.comment,
      subject: event.subject.label,
    };
    // this._trackerService
    //   .updateIssueComment(this.model.issueTrackingId, submitData)
    //   .subscribe((res) => {
    //     this.issueTrackingDetails.forEach((x: any) => {
    //       if (x.trackingId === this.model.issueTrackingId) {
    //         x.comment = submitData.comment;
    //         x.subject = submitData.subject;
    //       }
    //     });
    //     this.issueTrackingDetails = this.AddMenuInLastComment(
    //       this.issueTrackingDetails
    //     );
    //   });
  }

  onLastCommentDelete(item: any) {
    this._swal
      .confirm({
        message: `You want to delete comment.`,
      })
      .then((cn: boolean) => {
        // this._trackerService
        //   .deleteIssueComment(item.trackingId)
        //   .subscribe((res) => {
        //     this.issueTrackingDetails = this.issueTrackingDetails.filter(
        //       (x: any) => x.trackingId !== item.trackingId
        //     );
        //     this.issueTrackingDetails = this.AddMenuInLastComment(
        //       this.issueTrackingDetails
        //     );
        //   });
      });
  }

  async getIssueCommentSubject(keyword: any) {
    let param = new HttpParams();
    if (keyword) param = param.append('keyword', keyword);
    // const responseData: any =
    //   (await this._issueInfoApiService
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

  // Get Issue Details For Issue Track Sitebar
  getIssueDetails(issueId: any) {
    // this._issueService.getIssueDetails(issueId).subscribe((res) => {
    //   this.issueDetails = res.data;
    // });
  }

  // Get Issue Tracking Details
  getIssueTrackingDetails(issueId: any) {
    // this._trackerService.getAllTrackingByIssue(issueId).subscribe((res) => {
    //   if (res) {
    //     this.issueTrackingDetails = [];
    //     const data = this.AddMenuInLastComment(res.data);
    //     this.issueTrackingDetails = [...data];
    //   }
    // });
  }

  AddMenuInLastComment(items: any[]): any {
    return items.map((x, i) => {
      const data: any = {
        ...x,
      };
      data.isMenu =
        i === items.length - 1 &&
        this.issue.status === 1
          ? true
          : false;



      data.menus = this.itemMenus
        .filter((x) => x.visible)
        .map((y) => {
          return {
            ...y,
            trackingData: x,
          };
        });
      return data;
    });
  }

  async notificationSeen() {

  }

  ngOnDestroy(): void {
    if (this.getUpdatedIssueTrackingSubscription)
      this.getUpdatedIssueTrackingSubscription.unsubscribe();
  }
}

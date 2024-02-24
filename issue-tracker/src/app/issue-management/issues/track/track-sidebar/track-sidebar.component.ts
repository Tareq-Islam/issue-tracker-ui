import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TrackService } from '../services/tracks.service';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpParams } from '@angular/common/http';
import { TypeheadMenus } from '@shared/components/typehead/typehead.component';
import * as _ from 'lodash';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
export interface SearchIssueAssignee{
  userId:number,
  userName:string,
  organization:string,
  mobileNumber:string
}

@Component({
  selector: 'eye-track-sidebar',
  templateUrl: './track-sidebar.component.html',
  styleUrls: ['./track-sidebar.component.scss'],
})
export class TrackSidebarComponent implements OnInit {
  isCauseFindingModalOpen = false;
  isAddAssigneeModalOpen = false;
  isSolutionTagModal = false;
  @Input() details: any;
  @Input() issue: any;

  faInfoCircle = faInfoCircle;
  priority = ['Low', 'Medium', 'High', 'Critical'];
  userId = 0;
  assignessTooltip = `Assignee refers user who involves in a issue. All assignee will get email notification about that issue.
     If you want someone to involve or let someone notify then please add assignee.`;

  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  param = new HttpParams();

  search: any;
  typeHeadSearchMenu: TypeheadMenus[] = [];
  results: any;
  suggestionItems: any[] = [];
  selectedAssignee: SearchIssueAssignee[] = [];
  isError = false;
  errorMessage = '';
  constructor(
    private _track: TrackService,
    private _sanitizer: DomSanitizer,
    // private _causeApiService: AdminIssueCauseApiService,
    // private _issueApiService: AdminIssueApiService,
    // private _issueInfoApiService: AdminIssueInfoApiService,
    // private _issueAssigneeApiService: AdminIssueAssigneeApiService,
    // private _issueSolutionTagApiService: AdminIssueSolutionTagApiService,
    public _claim: LoginUserClaimService,
    private _swal: EyeSwalService
  ) {}

  ngOnInit() {
    this.userId = this._claim.payload.userId;

  }

  contentSecurity(content: any) {
    return this._sanitizer.bypassSecurityTrustHtml(content);
  }
  // Cause Finding
  async onAddCauseFinding() {
    this.isCauseFindingModalOpen = true;
    // const causeList: any =
    //   (await this._causeApiService.getAllIssueCause(this.param).toPromise()) ||
    //   [];
    this.form = new UntypedFormGroup({});

    const _causePointsIds: any[] = [];

    if (this.details?.causePoints.length > 0) {
      this.details?.causePoints.forEach((x: any) => {
        _causePointsIds.push(x.causeId);
      });
    }

    this.model = {
      cause: this.details.causeDetails ? this.details.causeDetails : '',
      issueId: this.issue.id,
      causeIds: _causePointsIds,
    };
    // this.fields = [
    //   {
    //     type: 'multiSelect',
    //     key: 'causeIds',
    //     templateOptions: {
    //       label: 'Causes',
    //       appendTo: 'body',
    //       required: true,
    //       selectedItemsLabel: '{0} items selected',
    //       placeholder: 'Select cause',
    //       values: causeList.data.map((x: IssueCause) => {
    //         return { value: x.id, label: x.cause };
    //       }),
    //     },
    //   },
    //   {
    //     template: '<div></div>',
    //     hooks: {
    //       onInit: (field) => {
    //         if (field) {
    //           const multiSelectControl = field.form?.get('causeIds');
    //           multiSelectControl?.valueChanges.subscribe((res) => {
    //             const _data = [];

    //             _data.push(
    //               res.map((x: any) => {
    //                 return causeList.data.find((c: any) => c.id == x);
    //               })
    //             );

    //             let _template = '';
    //             _data[0].forEach((d: any) => {
    //               _template += `<li class="py-1">${d.cause}</li> `;
    //             });

    //             field.template = `<div class="p-2 px-8"><ul class="list-disc">${_template}</ul></div>`;
    //           });
    //         }
    //       },
    //       onChanges: (field) => {
    //         if (field) {
    //           const _data = [];

    //           _data.push(
    //             _causePointsIds.map((x: any) => {
    //               return causeList.data.find((c: any) => c.id == x);
    //             })
    //           );

    //           let _template = '';
    //           _data[0].forEach((d: any) => {
    //             _template += `<li class="py-1">${d.cause}</li> `;
    //           });

    //           field.template = `<div class="p-2 px-8"><ul class="list-disc">${_template}</ul></div>`;
    //         }
    //       },
    //     },
    //   },
    //   {
    //     type: 'editor',
    //     key: 'cause',
    //     templateOptions: {
    //       label: 'Remark',
    //       headerTemplate: true,
    //       style: { height: '128px' },
    //       maxLength: 1000,
    //       required: true,
    //     },
    //   },
    // ];
  }

  onCauseFindingSubmit(event: any) {
    this.isCauseFindingModalOpen = false;
    const _submitData = {
      cause: event.cause,
      causeIds: event.causeIds,
    };

    // this._issueApiService
    //   .addIssueCause(this.model.issueId, _submitData)
    //   .subscribe((res) => {
    //     this._track.getUpdateIssueTrackingEvent.emit({
    //       IssueId: this.model.issueId,
    //     });
    //   });
  }
  // Assignee
  onAddAssignee() {
    this.isAddAssigneeModalOpen = true;
    this.search = {};
    this.typeHeadSearchMenu = this.onAddAssigneeSearchMenu();
  }

  selectItem(event: any) {
    this.isError = false;
    this.selectedAssignee.push(event);
  }

  removeFromSelectedAssignee(data: any) {
    this.selectedAssignee = this.selectedAssignee.filter(
      (x: any) => x.userId !== data.userId
    );
  }

  deleteAssigne(item: any) {
    this._swal
      .confirm({
        message: `You want to remove - ${item.userName}`,
      })
      .then((cn: boolean) => {
        // this._issueAssigneeApiService
        //   .removeAssigneeFromIssue(this.issueId, item.userId)
        //   .subscribe((res) => {
        //     this._track.getUpdateIssueTrackingEvent.emit({
        //       IssueId: this.issueId,
        //     });
        //   });
      });
  }

  onAddAssigneeSubmit() {
    if (this.selectedAssignee.length > 0) {
      this.isAddAssigneeModalOpen = false;
      const userIds: number[] = [];
      this.selectedAssignee.forEach((x) => {
        userIds.push(x.userId);
      });
      const _data = {
        issueId: this.issue.id,
        userId: userIds,
      };

      // this._issueAssigneeApiService
      //   .addAssigneeToIssue(_data)
      //   .subscribe((res) => {
      //     this.selectedAssignee = [];
      //     this._track.getUpdateIssueTrackingEvent.emit({
      //       IssueId: this.issueId,
      //     });
      //   });
    } else {
      this.isError = true;
      this.errorMessage = 'Please select users.';
    }
  }

  onAddAssigneeSearchMenu() {
    return [
      {
        label: 'Name',
        placeholder: 'NAMEXXXXX',
        search: (e: { keyword: string; item: TypeheadMenus } | null) => {
          // if (e) {
          //   const params = new HttpParams()
          //     .set('keyword', e.keyword)
          //     .set('field', IssueAssigneeSearchFieldEnum.Name);
          //   this.getIssueAssignee(this.issueId, params);
          // }
        },
      },
      {
        label: 'Email',
        placeholder: 'user@example.com',
        search: (e: { keyword: string; item: TypeheadMenus } | null) => {
          // if (e) {
          //   const params = new HttpParams()
          //     .set('keyword', e.keyword)
          //     .set('field', IssueAssigneeSearchFieldEnum.Email);
          //   this.getIssueAssignee(this.issueId, params);
          // }
        },
      },
      {
        label: 'Mobile',
        placeholder: '01XXXXXXXX',
        search: (e: { keyword: string; item: TypeheadMenus } | null) => {
          // if (e) {
          //   const params = new HttpParams()
          //     .set('keyword', e.keyword)
          //     .set('field', IssueAssigneeSearchFieldEnum.Mobile);
          //   this.getIssueAssignee(this.issueId, params);
          // }
        },
      },
      {
        label: 'Card',
        placeholder: '000XXXXXXX',
        search: (e: { keyword: string; item: TypeheadMenus } | null) => {
          // if (e) {
          //   const params = new HttpParams()
          //     .set('keyword', e.keyword)
          //     .set('field', IssueAssigneeSearchFieldEnum.Card);
          //   this.getIssueAssignee(this.issueId, params);
          // }
        },
      },
    ];
  }

  getIssueAssignee(issueId: number, param: HttpParams) {
    // this._issueInfoApiService
    //   .searchIssueAssignee(issueId, param)
    //   .subscribe((res) => {
    //     this.results = [...res.data];
    //     this.results = _.differenceWith(
    //       res.data,
    //       this.selectedAssignee,
    //       _.isEqual
    //     );
    //   });
  }

  // Solution Tag
  async onSolutionTagUpdate() {
    this.isSolutionTagModal = true;
    // const solutionTagList: any =
    //   (await this._issueSolutionTagApiService
    //     .getAllIssueSolutionTag(this.param)
    //     .toPromise()) || [];
    this.form = new UntypedFormGroup({});

    const _solutionTagId: any[] = [];

    if (this.details?.solutionTags.length > 0) {
      this.details?.solutionTags.forEach((x: any) => {
        _solutionTagId.push(x.solutionTagId);
      });
    }

    this.model = {
      issueId: this.issue.id,
      solutionTagIds: _solutionTagId,
    };
    // this.fields = [
    //   {
    //     type: 'multiSelect',
    //     key: 'solutionTagIds',
    //     templateOptions: {
    //       label: 'Solution Tags',
    //       appendTo: 'body',
    //       required: true,
    //       selectedItemsLabel: '{0} items selected',
    //       placeholder: 'Select solution tag',
    //       values: solutionTagList.data.map((x: AdminIssueSolutionTag) => {
    //         return { value: x.id, label: x.tagName };
    //       }),
    //     },
    //   },
    //   {
    //     template: '<div></div>',
    //     hooks: {
    //       onInit: (field) => {
    //         if (field) {
    //           const multiSelectControl = field.form?.get('solutionTagIds');
    //           multiSelectControl?.valueChanges.subscribe((res) => {
    //             const _data = [];

    //             _data.push(
    //               res.map((x: any) => {
    //                 return solutionTagList.data.find((c: any) => c.id == x);
    //               })
    //             );

    //             let _template = '';
    //             _data[0].forEach((d: any) => {
    //               _template += `<li class="py-1">${d.tagName}</li> `;
    //             });

    //             field.template = `<div class="p-2 px-8"><ul class="list-disc">${_template}</ul></div>`;
    //           });
    //         }
    //       },
    //       onChanges: (field) => {
    //         if (field) {
    //           const _data = [];

    //           _data.push(
    //             _solutionTagId.map((x: any) => {
    //               return solutionTagList.data.find((c: any) => c.id == x);
    //             })
    //           );

    //           let _template = '';
    //           _data[0].forEach((d: any) => {
    //             _template += `<li class="py-1">${d.tagName}</li> `;
    //           });

    //           field.template = `<div class="p-2 px-8"><ul class="list-disc">${_template}</ul></div>`;
    //         }
    //       },
    //     },
    //   },
    // ];
  }

  addAssigneeModalClose(){
    this.isAddAssigneeModalOpen = false;
    this.isError = false;
  }

  onSolutionTagSubmit(event: any) {
    this.isSolutionTagModal = false;
    // this._issueApiService
    //   .updateSolutionTagList(this.model.issueId, {
    //     solutionTagIds: event.solutionTagIds,
    //   })
    //   .subscribe((res) => {
    //     this._track.getUpdateIssueTrackingEvent.emit({ IssueId: this.issueId });
    //   });
  }
}

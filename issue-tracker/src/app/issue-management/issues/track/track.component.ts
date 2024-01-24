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
    this.issueDetails = {
      "categoryName": "Others",
      "doorName": "OfficeFirstDoor",
      "siteName": "OfficeFirstDoor",
      "zoneName": "Mirpur",
      "clusterName": "Dhaka",
      "customerName": "Eye Electronics",
      "status": 1,
      "priority": 1,
      "remark": "<p>&lt;script&gt;</p><p>\tconsole.log(\"test\")</p><p>&lt;/script&gt;</p>",
      "isGlobalOnly": true,
      "issueCreationTime": "2023-08-17T15:46:48.647",
      "issueCreatorUserName": "Global Admin",
      "issueCloseTime": null,
      "issueCloserUserName": null,
      "causeDetails": null,
      "causePoints": [],
      "assignees": [
          {
              "userId": 1,
              "userName": "Global Admin",
              "orgName": "Eye Electronics",
              "email": "admin@eyeelectronics.net",
              "mobileNumber": null,
              "permissionName": null,
              "permissionLevel": null,
              "isAuthor": 1
          },
          {
              "userId": 9,
              "userName": "Md. Imam Uddin",
              "orgName": "Eye Electronics",
              "email": null,
              "mobileNumber": "01630506778",
              "permissionName": "Office",
              "permissionLevel": 3,
              "isAuthor": 0
          }
      ],
      "solutionTags": []
  }
    // this._issueService.getIssueDetails(issueId).subscribe((res) => {
    //   this.issueDetails = res.data;
    // });
  }

  // Get Issue Tracking Details
  getIssueTrackingDetails(issueId: any) {
    this.issueTrackingDetails = [
      {
          "trackingId": 2048,
          "subject": "test",
          "comment": "<p>&lt;script&gt;</p><p>\tconsole.log(\"test\")</p><p>&lt;/script&gt;</p>",
          "imageUrls": [],
          "logType": 1,
          "doorCurrentSatus": {
              "doorId": 1,
              "doorName": "OfficeMainDoor",
              "isActive": 1,
              "doorStatus": 1,
              "doorLogTime": "2023-08-17T15:42:53",
              "lockStatus": 1,
              "lockLogTime": "2023-08-17T15:42:57",
              "isOnline": 1,
              "lastCommunicationTime": "2023-08-17T15:46:28.51",
              "rssi": 30,
              "lastRssiTime": "2023-08-17T15:42:40",
              "outdoorReader": 1,
              "outdoorReaderLogTime": "2022-12-11T15:42:11",
              "isOutdoorReaderEnable": 1,
              "indoorReader": 1,
              "indoorReaderLogTime": "2022-12-11T15:42:11",
              "isIndoorReaderEnable": 1,
              "lastSyncTime": "2023-04-12T12:37:12",
              "customerName": "Eye Electronics",
              "isMemoryFault": 0,
              "deviceId": 14457,
              "doorLastUnlockUserName": "Shibli Noman",
              "doorLastUnlockUserMobileNumber": "01619293758",
              "doorLastUnlockUserPermission": "Global Test",
              "doorLastUnlockUserOrganization": "Eye Electronics",
              "unlockRequestType": 6,
              "commentTime": "0001-01-01T00:00:00",
              "networkErrorDuration": 0,
              "doorErrorDuration": 0,
              "lockErrorDuration": 0,
              "outdoorReaderErrorDuration": 0,
              "indoorReaderErrorDuration": 0,
              "memoryFaultDuration": 0
          },
          "creationTime": "2023-08-17T15:46:48.747",
          "lastModificationTime": null,
          "seenAssignees": [],
          "isNew": false,
          "log": {
              "creatorUserId": 1,
              "lastModifierUserId": null
          },
          "creatorUserName": "Global Admin"
      },
      {
          "trackingId": 2049,
          "subject": "<p><strong>Global Admin</strong> has added <strong>Md. Imam Uddin</strong></p>",
          "comment": null,
          "imageUrls": [],
          "logType": 4,
          "doorCurrentSatus": null,
          "creationTime": "2023-10-08T12:33:36.623",
          "lastModificationTime": null,
          "seenAssignees": [],
          "isNew": false,
          "log": {
              "creatorUserId": 1,
              "lastModifierUserId": null
          },
          "creatorUserName": "Global Admin"
      },
      {
          "trackingId": 2050,
          "subject": "Device Faulty",
          "comment": "<p>sfsf</p>",
          "imageUrls": [
              {
                  "largeImageUrl": "https://file.eyeelectronics.net/image/smartlock/issuetracker/2023/10/20231008124605_131f59c3b4d34bb7b3bada23427dc803_l.webp",
                  "mediumImageUrl": null,
                  "thumbnailImageUrl": "https://file.eyeelectronics.net/image/smartlock/issuetracker/2023/10/20231008124605_131f59c3b4d34bb7b3bada23427dc803_t.webp"
              }
          ],
          "logType": 1,
          "doorCurrentSatus": {
              "doorId": 1,
              "doorName": "OfficeFirstDoor",
              "isActive": 1,
              "doorStatus": 1,
              "doorLogTime": "2023-10-08T12:37:04",
              "lockStatus": 1,
              "lockLogTime": "2023-10-08T12:37:07",
              "isOnline": 1,
              "lastCommunicationTime": "2023-10-08T12:45:31.42",
              "rssi": 30,
              "lastRssiTime": "2023-10-08T12:41:27",
              "outdoorReader": 1,
              "outdoorReaderLogTime": "2023-09-19T11:20:43",
              "isOutdoorReaderEnable": 1,
              "indoorReader": 1,
              "indoorReaderLogTime": "2023-09-19T11:20:43",
              "isIndoorReaderEnable": 1,
              "lastSyncTime": "2023-09-21T14:28:37",
              "customerName": "Eye Electronics",
              "isMemoryFault": 0,
              "deviceId": 14457,
              "doorLastUnlockUserName": "Sabbir",
              "doorLastUnlockUserMobileNumber": null,
              "doorLastUnlockUserPermission": "Office",
              "doorLastUnlockUserOrganization": "Eye Electronics",
              "unlockRequestType": 6,
              "commentTime": "2023-10-08T12:46:04.8993219+06:00",
              "networkErrorDuration": 0,
              "doorErrorDuration": 0,
              "lockErrorDuration": 0,
              "outdoorReaderErrorDuration": 0,
              "indoorReaderErrorDuration": 0,
              "memoryFaultDuration": 0
          },
          "creationTime": "2023-10-08T12:46:04.96",
          "lastModificationTime": null,
          "seenAssignees": [],
          "isNew": false,
          "log": {
              "creatorUserId": 1,
              "lastModifierUserId": null
          },
          "creatorUserName": "Global Admin"
      },
      {
          "trackingId": 2051,
          "subject": "Device Faulty",
          "comment": "<p>sfsf</p>",
          "imageUrls": [
              {
                  "largeImageUrl": "https://file.eyeelectronics.net/image/smartlock/issuetracker/2023/10/20231008124624_68d62440a3a44bb0a35fa81154059f67_l.webp",
                  "mediumImageUrl": null,
                  "thumbnailImageUrl": "https://file.eyeelectronics.net/image/smartlock/issuetracker/2023/10/20231008124624_68d62440a3a44bb0a35fa81154059f67_t.webp"
              }
          ],
          "logType": 1,
          "doorCurrentSatus": {
              "doorId": 1,
              "doorName": "OfficeFirstDoor",
              "isActive": 1,
              "doorStatus": 1,
              "doorLogTime": "2023-10-08T12:37:04",
              "lockStatus": 1,
              "lockLogTime": "2023-10-08T12:37:07",
              "isOnline": 1,
              "lastCommunicationTime": "2023-10-08T12:45:31.42",
              "rssi": 30,
              "lastRssiTime": "2023-10-08T12:41:27",
              "outdoorReader": 1,
              "outdoorReaderLogTime": "2023-09-19T11:20:43",
              "isOutdoorReaderEnable": 1,
              "indoorReader": 1,
              "indoorReaderLogTime": "2023-09-19T11:20:43",
              "isIndoorReaderEnable": 1,
              "lastSyncTime": "2023-09-21T14:28:37",
              "customerName": "Eye Electronics",
              "isMemoryFault": 0,
              "deviceId": 14457,
              "doorLastUnlockUserName": "Sabbir",
              "doorLastUnlockUserMobileNumber": null,
              "doorLastUnlockUserPermission": "Office",
              "doorLastUnlockUserOrganization": "Eye Electronics",
              "unlockRequestType": 6,
              "commentTime": "2023-10-08T12:46:24.1236084+06:00",
              "networkErrorDuration": 0,
              "doorErrorDuration": 0,
              "lockErrorDuration": 0,
              "outdoorReaderErrorDuration": 0,
              "indoorReaderErrorDuration": 0,
              "memoryFaultDuration": 0
          },
          "creationTime": "2023-10-08T12:46:24.13",
          "lastModificationTime": null,
          "seenAssignees": [],
          "isNew": false,
          "log": {
              "creatorUserId": 1,
              "lastModifierUserId": null
          },
          "creatorUserName": "Global Admin"
      },
      {
          "trackingId": 2052,
          "subject": "RFID Reader Fault",
          "comment": "<p>Test</p>",
          "imageUrls": [],
          "logType": 1,
          "doorCurrentSatus": {
              "doorId": 1,
              "doorName": "OfficeFirstDoor",
              "isActive": 1,
              "doorStatus": 1,
              "doorLogTime": "2023-10-11T12:37:34",
              "lockStatus": 1,
              "lockLogTime": "2023-10-11T12:37:38",
              "isOnline": 0,
              "lastCommunicationTime": "2023-10-11T12:43:57.08",
              "rssi": 31,
              "lastRssiTime": "2023-10-11T12:37:22",
              "outdoorReader": 1,
              "outdoorReaderLogTime": "2023-09-19T11:20:43",
              "isOutdoorReaderEnable": 1,
              "indoorReader": 1,
              "indoorReaderLogTime": "2023-09-19T11:20:43",
              "isIndoorReaderEnable": 1,
              "lastSyncTime": "2023-09-21T14:28:37",
              "customerName": "Eye Electronics",
              "isMemoryFault": 0,
              "deviceId": 14457,
              "doorLastUnlockUserName": "Ashik",
              "doorLastUnlockUserMobileNumber": "01780384410",
              "doorLastUnlockUserPermission": "Office",
              "doorLastUnlockUserOrganization": "Eye Electronics",
              "unlockRequestType": 5,
              "commentTime": "2023-10-11T12:49:48.4125067+06:00",
              "networkErrorDuration": 351,
              "doorErrorDuration": 0,
              "lockErrorDuration": 0,
              "outdoorReaderErrorDuration": 0,
              "indoorReaderErrorDuration": 0,
              "memoryFaultDuration": 0
          },
          "creationTime": "2023-10-11T12:49:48.497",
          "lastModificationTime": null,
          "seenAssignees": [],
          "isNew": false,
          "log": {
              "creatorUserId": 1,
              "lastModifierUserId": null
          },
          "creatorUserName": "Global Admin"
      }
  ];;
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

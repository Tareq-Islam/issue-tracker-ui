import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { OptionsSelector } from '@shared/components/options-selector/options-selector.component';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TrackComponent } from './track/track.component';
import { IssueApiService } from '@core/core/api/issue/issue-api.service';
import { IssueCreateComponent } from './issue-create/issue-create.component';

export enum IssuePriorityEnum {
  Low = 1,
  Medium,
  High
}
export enum IssueStatusEnum {
  Open = 1,
  Close,
  Suspend,
}

export interface Issue {
  issueId: number;
  issueCategoryId: number;
  categoryName: string;
  siteName: string;
  vendorId?: number;
  vendorName: string;
  status: IssueStatusEnum;
  priority: number;
  issueCreationTime: string;
  issueCreatorUserName: string;
  issueCloseTime: string | null;
  issueCloserUserName: string | null;
  unseenNotification: number;
}
interface IssueForGlobalExtension extends Issue {
  menus: MenuItem[];
  command: any;
}
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  faComment = faComment;
  isChangePriorityModalOpen = false;
  isEditModal = false;
  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  isSearching = false;
  status = ['Open', 'Close', 'Suspend'];
  priority = ['Low', 'Medium', 'High'];
  filterMenus: OptionsSelector[] = [];
  filterMenusForTab: any[] = [];
  tab = 1;
  items: IssueForGlobalExtension[] = [];
  itemMenus: MenuItem[] = [
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: true,
      command: (e) => {
        // this.onDeleteIssue(e.item.issue);
      },
    },
  ];
  isApiCalling = false;
  notFound = false;
  constructor(
    private _dialogService: DialogService,
    private _issueApi: IssueApiService,
    private _swal: EyeSwalService,
    public claim: LoginUserClaimService
  ) {}

  ngOnInit(): void {
    this.getFilterCount();
    this.getItems();
    this.getCounts();
  }

  async onIssueCreate() {
     const _ref = this._dialogService.open(IssueCreateComponent, {
        header: `Create Issue`,
        closeOnEscape: false,
        dismissableMask: false,
        style: { 'pointer-events': 'fill' },
        styleClass: 'w-[800px]',
        contentStyle: {
          padding: 0,
          'border-bottom-right-radius': '0.375rem',
          'border-bottom-left-radius': '0.375rem',
        },
      });
      _ref.onClose.subscribe((x:any)=> {
        this.getItems();
      });
  }


  onIssueTrack(issue: any) {
    const ref = this._dialogService.open(TrackComponent, {
      header: `ISSUE ID - #${issue.issueId}`,
      closeOnEscape: false,
      data: {
        issue: issue,
      },
      styleClass: 'w-[80vw]',
      contentStyle: {
        padding: 0,
        'border-bottom-right-radius': '0.375rem',
        'border-bottom-left-radius': '0.375rem',
      },
    });
    ref.onClose.subscribe(async (res) => {


    });
  }

  onDeleteIssue(issue: Issue) {
    this._swal
      .confirm({
        message: `You want to delete issue no - ${issue.issueId}`,
      })
      .then((cn: boolean) => {
        // this._issueService.deleteIssue(issue.issueId).subscribe((res) => {
        //   this.items = this.items.filter((x) => x.issueId != issue.issueId);
        //   this.getFilterCount();
        // });
      });
  }

  async getFilterCount() {
    const { all, close, open, reject, request, suspend } = {
      all: 100,
      close: 10,
      open: 20,
      reject: 10,
      request: 20,
      suspend: 20,
    };

    this.filterMenus = [
      {
        id: 1,
        name: `All (${all})`,
        visable: true,
        command: (event) => {
          this.onFilter(IssueStatusEnum.Open);
        },
      },
      {
        id: 2,
        name: `Open (${open})`,
        visable: true,
        command: (event) => {
          this.onFilter(IssueStatusEnum.Open);
        },
      },
      {
        id: 3,
        name: `Closed (${close})`,
        visable: true,
        command: (event) => {
          this.onFilter(IssueStatusEnum.Close);
        },
      },
      {
        id: 4,
        name: `Suspend (${suspend})`,
        visable: true,
        command: (event) => {
          this.onFilter(IssueStatusEnum.Suspend);
        },
      },
    ];

    this.filterMenusForTab = [
      {
        id: 1,
        name: `All`,
        count: all,
        visable: true,
        command: (event: any) => {
          this.tab = this.filterMenusForTab[0].id;
          this.onFilter(IssueStatusEnum.Open);
        },
      },
      {
        id: 2,
        name: `Open`,
        count: open,
        visable: true,
        command: (event: any) => {
          this.tab = this.filterMenusForTab[1].id;
          this.onFilter(IssueStatusEnum.Open);
        },
      },
      {
        id: 3,
        name: `Closed`,
        count: close,
        visable: true,
        command: (event: any) => {
          this.tab = this.filterMenusForTab[2].id;
          this.onFilter(IssueStatusEnum.Close);
        },
      },
      {
        id: 4,
        name: `Suspend`,
        count: suspend,
        visable: true,
        command: (event: any) => {
          this.tab = this.filterMenusForTab[3].id;
          this.onFilter(IssueStatusEnum.Suspend);
        },
      },

    ];
  }

  onFilter(status: IssueStatusEnum) {

    this.getItems();
  }

  trackBy(index: number, item: Issue): number {
    return item.issueId;
  }


  getCounts() {
    this._issueApi.getStatus().subscribe(res => console.log(res)
    )
  }

  getItems() {
    // this.items = this.onUpdateItem([
    //   {
    //     issueId: 830,
    //     issueCategoryId: 1,
    //     categoryName: 'Others',
    //     siteCode: 'TGSDR70',
    //     zoneName: 'Gazipur',
    //     clusterName: 'Dhaka Outer',
    //     vendorId: 1,
    //     vendorName: 'Eye Electronics',
    //     status: 1,
    //     priority: 1,
    //     remark:
    //       '<p>&lt;script&gt;</p><p>\tconsole.log("test")</p><p>&lt;/script&gt;</p>',

    //     issueCreationTime: '2023-08-17T15:46:48.647',
    //     issueCreatorUserName: 'Global Admin',
    //     issueCloseTime: null,
    //     issueCloserUserName: null,
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 829,
    //     issueCategoryId: 8,
    //     categoryName: 'Theft Incident',
    //     siteCode: 'GPSYKNG009',
    //     zoneName: 'Sylhet',
    //     clusterName: 'Sylhet',
    //     vendorId: 1,
    //     vendorName: 'Eye Electronics',
    //     status: 2,
    //     priority: 3,
    //     remark: '<p>Edotco inside team </p><p>01813825728</p>',

    //     issueCreationTime: '2023-03-02T22:12:34.547',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2023-03-13T18:01:18.27',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 828,
    //     issueCategoryId: 11,
    //     categoryName: 'Unlock Issue',
    //     siteCode: 'JSSDRB3',
    //     zoneName: 'Jessore',
    //     clusterName: 'Khulna',
    //     vendorId: 1,
    //     vendorName: 'Eye Electronics',
    //     status: 2,
    //     priority: 3,
    //     remark: '<p>+880 1966-942805</p>',

    //     issueCreationTime: '2023-02-05T16:14:10.957',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2023-03-13T18:03:45.737',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 826,
    //     issueCategoryId: 4,
    //     categoryName: 'Lock Fault',
    //     siteCode: 'KHDMR05',
    //     zoneName: 'Khulna',
    //     clusterName: 'Khulna',
    //     vendorId: 1,
    //     vendorName: 'Eye Electronics',
    //     status: 2,
    //     priority: 3,
    //     remark: null,

    //     issueCreationTime: '2023-01-11T16:16:49.26',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2023-03-13T18:06:16.787',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 825,
    //     issueCategoryId: 11,
    //     categoryName: 'Unlock Issue',
    //     siteCode: 'FNSNG53',
    //     zoneName: 'Feni',
    //     clusterName: 'Noakhali',
    //     vendorId: 1,
    //     vendorName: 'Eye Electronics',
    //     status: 1,
    //     priority: 3,
    //     remark: '<p>Aslam Islam</p><p>+880 1817-181101</p>',

    //     issueCreationTime: '2023-01-07T12:07:54.507',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: null,
    //     issueCloserUserName: null,
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 824,
    //     issueCategoryId: 10,
    //     categoryName: 'Security Breach',
    //     siteCode: 'NSSBP06',
    //     zoneName: 'Uttara',
    //     clusterName: 'Dhaka North',
    //     vendorId: 1,
    //     vendorName: 'Eye Electronics',
    //     status: 1,
    //     priority: 3,
    //     remark:
    //       '<p><strong style="color: rgb(0, 88, 40);">Himu</strong></p><p><a href="mailto:hasanur.rahman_ext@edotcogroup.com" rel="noopener noreferrer" target="_blank" style="color: rgb(31, 73, 125);">hasanur.rahman_ext@edotcogroup.com</a></p><p><span style="color: rgb(9, 115, 75);">DHKS-Kanchpur</span></p><p><span style="color: rgb(9, 115, 75);">+8801611417404</span></p>',

    //     issueCreationTime: '2023-01-04T12:23:24.023',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: null,
    //     issueCloserUserName: null,
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 823,
    //     issueCategoryId: 9,
    //     categoryName: 'Memory Fault',
    //     siteCode: 'TGPGN12',
    //     zoneName: 'Rangpur',
    //     clusterName: 'Rangpur',
    //     vendorId: 1,
    //     vendorName: 'Eye Electronics',
    //     status: 2,
    //     priority: 3,
    //     remark: '<p>Onsite Team</p><p>Vendor</p>',

    //     issueCreationTime: '2022-11-24T13:24:43.003',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2022-12-29T11:19:27.397',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 822,
    //     issueCategoryId: 3,
    //     categoryName: 'Lock Close Failed',
    //     siteCode: 'CPSDR80',
    //     zoneName: 'Chandpur',
    //     clusterName: 'Comilla',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 1,
    //     priority: 3,
    //     remark:
    //       '<p><strong style="color: rgb(9, 115, 75);">Abdul Alim</strong></p><p><span style="color: rgb(9, 115, 75);">Engineer,Regional Operations</span></p><p><span style="color: rgb(9, 115, 75);">Management-Operations</span></p><p><span style="color: rgb(9, 115, 75);">edotco Bangladesh Co. Limited</span></p>',

    //     issueCreationTime: '2022-09-20T10:24:45.057',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: null,
    //     issueCloserUserName: null,
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 821,
    //     issueCategoryId: 2,
    //     categoryName: 'Device Offline',
    //     siteCode: 'MYNND38',
    //     zoneName: 'Mymensingh',
    //     clusterName: 'Mymensingh',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 2,
    //     priority: 3,
    //     remark: 'Software',

    //     issueCreationTime: '2022-08-23T17:42:36.51',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2022-08-31T12:13:59.373',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 803,
    //     issueCategoryId: 2,
    //     categoryName: 'Device Offline',
    //     siteCode: 'BLMYGFG002',
    //     zoneName: 'Mymensingh',
    //     clusterName: 'Mymensingh',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 2,
    //     priority: 3,
    //     remark: 'Software',

    //     issueCreationTime: '2022-08-23T17:42:36.503',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2022-08-31T12:18:43.25',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 801,
    //     issueCategoryId: 2,
    //     categoryName: 'Device Offline',
    //     siteCode: 'MYFLP54',
    //     zoneName: 'Mymensingh',
    //     clusterName: 'Mymensingh',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 1,
    //     priority: 3,
    //     remark: 'Software',

    //     issueCreationTime: '2022-08-23T17:42:36.497',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: null,
    //     issueCloserUserName: null,
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 800,
    //     issueCategoryId: 2,
    //     categoryName: 'Device Offline',
    //     siteCode: 'MYGFG25',
    //     zoneName: 'Mymensingh',
    //     clusterName: 'Mymensingh',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 2,
    //     priority: 3,
    //     remark: 'Software',

    //     issueCreationTime: '2022-08-23T17:42:36.49',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2022-08-31T12:21:08.13',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 799,
    //     issueCategoryId: 2,
    //     categoryName: 'Device Offline',
    //     siteCode: 'MYDBR16',
    //     zoneName: 'Mymensingh',
    //     clusterName: 'Mymensingh',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 1,
    //     priority: 3,
    //     remark: 'Software',

    //     issueCreationTime: '2022-08-23T17:42:36.487',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: null,
    //     issueCloserUserName: null,
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 798,
    //     issueCategoryId: 2,
    //     categoryName: 'Device Offline',
    //     siteCode: 'MYSDR08',
    //     zoneName: 'Mymensingh',
    //     clusterName: 'Mymensingh',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 2,
    //     priority: 3,
    //     remark: 'Software',

    //     issueCreationTime: '2022-08-23T17:42:36.48',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2022-09-18T12:35:27.36',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    //   {
    //     issueId: 797,
    //     issueCategoryId: 11,
    //     categoryName: 'Unlock Issue',
    //     siteCode: 'MYSDR02',
    //     zoneName: 'Mymensingh',
    //     clusterName: 'Mymensingh',
    //     vendorId: 2,
    //     vendorName: 'HS Engineering And Technology Ltd',
    //     status: 2,
    //     priority: 3,
    //     remark: 'Software',

    //     issueCreationTime: '2022-08-23T17:42:36.473',
    //     issueCreatorUserName: 'Md. Imam Uddin',
    //     issueCloseTime: '2022-09-18T12:37:53.783',
    //     issueCloserUserName: 'Md. Imam Uddin',
    //     unseenNotification: 0,
    //   },
    // ]);
    this.isApiCalling = true;
    this._issueApi.gets().subscribe(
      (res) => {
        this.isApiCalling = false;
        this.notFound = false;
        this.isSearching = false;
        if (res.data.length > 0) {
          this.items = this.onUpdateItem(res.data);
        } else {
          this.notFound = true;
          this.items = [];
        }
      },
      (err) => {
        this.isApiCalling = false;
      }
    );
  }

  onUpdateItem(items: Issue[]): IssueForGlobalExtension[] {
    return items.map((x) => {
      const data: any = {
        ...x,
      };

      data.command = (item: any) => {
        this.onIssueTrack(item);
      };

      data.menus = this.itemMenus
        .filter((x) => x.visible)
        .map((y) => {
          return {
            ...y,
            issue: x,
          };
        });
      return data;
    });
  }

}

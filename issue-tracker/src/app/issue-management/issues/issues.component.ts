import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { UntypedFormGroup } from '@angular/forms';
import { TypeheadMenus } from '@shared/components/typehead/typehead.component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EyeMenus } from '@shared/components/search/search.component';
import { HttpParams } from '@angular/common/http';
import { OptionsSelector } from '@shared/components/options-selector/options-selector.component';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { HeaderService } from '@page-layout/header/service/header.service';
import { DialogService } from 'primeng/dynamicdialog';
export enum IssuePriorityEnum {
  Null = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}
export enum IssueStatusEnum {
  Null = 0,
  Open,
  Close,
  Suspend,
  Request,
  Reject,
}
export enum IssueSearchField {
  Issue = 1,
  Door,
  Category,
  Cause,
  SolutionTag,
}
export interface SearchIssueDoor {
  doorId: number;
  doorName: string;
}
export interface Issue {
  issueId: number;
  issueCategoryId: number;
  categoryName: string;
  doorId?: number;
  doorName: string;
  siteName: string;
  zoneName: string;
  clusterName: string;
  vendorId?: number;
  vendorName: string;
  status: IssueStatusEnum;
  priority: number;
  remark: string | null;
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
export class IssuesComponent implements OnInit, OnDestroy {
  faComment = faComment;
  isChangePriorityModalOpen = false;
  isIssueRequestRejectModalOpen = false;
  isEditModal = false;

  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];

  searchMenus: TypeheadMenus[] = [
    {
      label: 'Door',
      placeholder: 'type door name',
      search: (e: { keyword: string; item: EyeMenus } | null) => {
        this.onSearch({
          searchType: IssueSearchField.Door,
          keyword: e?.keyword,
        });
      },
    },
    {
      label: 'Issue',
      placeholder: 'type issue id',
      search: (e: { keyword: string; item: EyeMenus } | null) => {
        this.onSearch({
          searchType: IssueSearchField.Issue,
          keyword: e?.keyword,
        });
      },
    },

    {
      label: 'Category',
      placeholder: 'type category name',
      search: (e: { keyword: string; item: EyeMenus } | null) => {
        this.params = this.params.delete('keyword');
        this.params = this.params.delete('page');
        if (e && e.keyword) {
          const searchParams = new HttpParams().append('keyword', e.keyword);
          this._header.search.isLoading = true;
          // this._issueCategoryApiService
          //   .getAllCategory(searchParams)
          //   .subscribe((res) => {
          //     this._header.search.isLoading = false;
          //     this._header.search.result = res.data.map((x) => {
          //       return {
          //         id: x.id,
          //         name: x.categoryName,
          //       };
          //     });
          //   });
        } else {
          this.page = 1;
          this.params = this.params
            .delete('keyword')
            .delete('page')
            .delete('field');
          this.params = this.params.append('page', this.page);
          this.getItems();
        }
      },
      searchItemSelected: (e: { id: number; name: string }) => {
        this.onSearch({ searchType: IssueSearchField.Category, keyword: e.id });
      },
    },
    {
      label: 'Cause',
      placeholder: 'type cause',
      search: (e: { keyword: string; item: EyeMenus } | null) => {
        if (e && e.keyword) {
          const searchParams = new HttpParams().append('keyword', e.keyword);
          this._header.search.isLoading = true;
          // this._issueCauseApiService
          //   .getAllIssueCause(searchParams)
          //   .subscribe((res) => {
          //     this._header.search.isLoading = false;
          //     this._header.search.result = res.data.map((x) => {
          //       return {
          //         id: x.id,
          //         name: x.cause,
          //       };
          //     });
          //   });
        } else {
          this.page = 1;
          this.params = this.params
            .delete('keyword')
            .delete('page')
            .delete('field');
          this.params = this.params.append('page', this.page);
          this.getItems();
        }
      },
      searchItemSelected: (e: { id: number; name: string }) => {
        this.onSearch({ searchType: IssueSearchField.Cause, keyword: e.id });
      },
    },
    {
      label: 'Solution Tag',
      placeholder: 'type solution tag name',
      search: (e: { keyword: string; item: EyeMenus } | null) => {
        if (e && e.keyword) {
          const searchParams = new HttpParams().append('keyword', e.keyword);
          this._header.search.isLoading = true;
          // this._issueSolutionTagApiService
          //   .getAllIssueSolutionTag(searchParams)
          //   .subscribe((res) => {
          //     this._header.search.isLoading = false;
          //     this._header.search.result = res.data.map((x) => {
          //       return {
          //         id: x.id,
          //         name: x.tagName,
          //       };
          //     });
          //   });
        } else {
          this.page = 1;
          this.params = this.params
            .delete('keyword')
            .delete('page')
            .delete('field');
          this.params = this.params.append('page', this.page);
          this.getItems();
        }
      },
      searchItemSelected: (e: { id: number; name: string }) => {
        this.onSearch({
          searchType: IssueSearchField.SolutionTag,
          keyword: e.id,
        });
      },
    },
  ];

  isSearching = false;
  status = ['Open', 'Close', 'Suspend', 'Request', 'Reject'];
  priority = ['Null', 'Low', 'Medium', 'High'];

  filterMenus: OptionsSelector[] = [];
  filterMenusForTab: any[] = [];
  tab = 1;
  items: IssueForGlobalExtension[] = [];

  itemMenus: MenuItem[] = [
    {
      label: 'Priority',
      icon: 'pi pi-list',
      visible: true,
      command: (e) => {
        // this.onChangeIssuePriority(e.item.issue);
      },
    },
    {
      label: 'Edit',
      icon: PrimeIcons.USER_EDIT,
      visible: true,
      command: (e) => {
        // this.onEditIssue(e.item.issue);
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: true,
      command: (e) => {
        // this.onDeleteIssue(e.item.issue);
      },
    },
    {
      label: 'Accept',
      icon: PrimeIcons.CHECK_SQUARE,
      visible: true,
      command: (e) => {
        // this.approvedIssueRequest(e.item.issue);
      },
    },
    {
      label: 'Reject',
      icon: PrimeIcons.TIMES,
      visible: true,
      command: (e) => {
        // this.onRejectIssue(e.item.issue);
      },
    },
  ];

  isApiCalling = false;
  isScrolling = false;
  notFound = false;
  page = 1;
  pageSize = 15;
  params = new HttpParams();
  constructor(
    private _dialogService: DialogService,
    private _header: HeaderService,
    // private _issueService: AdminIssueApiService,
    // private _issueCategoryApiService: AdminIssueCategoryApiService,
    // private _issueCauseApiService: AdminIssueCauseApiService,
    // private _issueSolutionTagApiService: AdminIssueSolutionTagApiService,
    private _swal: EyeSwalService,
    private _domSanitizer: DomSanitizer,
    // private _issuInfoApiService: AdminIssueInfoApiService,
    public claim: LoginUserClaimService
  ) {
    this._header.search.isSearchEnable = true;
    this._header.search.searchMenus = this.searchMenus;
    this._header.search.isLoading = this.isSearching;

    this.params = this.params
      .set('page', this.page)
      .set('pageSize', this.pageSize);
  }

  ngOnInit(): void {
    this.getFilterCount();
    this.getItems();
  }
  ngOnDestroy(): void {
    this._header.search.isSearchEnable = false;
  }

  async onIssueCreate() {
    //  const _ref = this._dialogService.open(IssueCreateComponent, {
    //     header: `Create Issue`,
    //     closeOnEscape: false,
    //     dismissableMask: false,
    //     style: { 'pointer-events': 'fill' },
    //     styleClass: 'w-[800px]',
    //     contentStyle: {
    //       padding: 0,
    //       'border-bottom-right-radius': '0.375rem',
    //       'border-bottom-left-radius': '0.375rem',
    //     },
    //   });
    //   _ref.onClose.subscribe((x:any)=> {
    //     this.getItems();
    //   });
  }

  async onEditIssue(item: IssueForGlobalExtension) {
    this.isEditModal = true;

    this.model = {
      issueId: item.issueId,
      issueCategoryId: {
        label: item.categoryName,
        value: item.issueCategoryId,
      },
      doorId: { label: item.doorName, value: item.doorId },
      remark: item.remark,
    };

    this.fields = [
      {
        className: 'item-self-center',
        type: 'autocomplete',
        key: 'doorId',
        templateOptions: {
          label: 'Door',
          placeholder: 'Enter door name',
          required: true,
          forceSelection: true,
          results: [],
          searchObject: async (templateOptions: any, $event: any) => {
            const doorList: any = await this.getDoor(
              Number(item.vendorId),
              $event.query
            );
            templateOptions.results = doorList.filter(
              (item: any) =>
                item.label.toLowerCase().indexOf($event.query.toLowerCase()) >
                -1
            );
          },
        },
      },
      {
        className: 'item-self-center',
        type: 'autocomplete',
        key: 'issueCategoryId',
        templateOptions: {
          label: 'Category',
          placeholder: 'Enter category name',
          required: true,
          forceSelection: true,
          results: [],
          searchObject: async (templateOptions: any, $event: any) => {
            const categoryList: any = await this.getCategory($event.query);
            templateOptions.results = categoryList.filter(
              (item: any) =>
                item.label.toLowerCase().indexOf($event.query.toLowerCase()) >
                -1
            );
          },
        },
      },
      {
        type: 'editor',
        key: 'remark',
        templateOptions: {
          label: 'Remark',
          headerTemplate: true,
          style: { height: '128px' },
          maxLength: 2000,
        },
      },
    ];
  }

  onIssueEditSubmit(event: any) {
    this.isEditModal = false;
    const data = {
      issueCategoryId: event.issueCategoryId.value,
      doorId: event.doorId.value,
      remark: event.remark,
    };

    // this._issueService
    //   .updateIssue(this.model.issueId, data)
    //   .subscribe((res) => {
    //     this.items.forEach((x) => {
    //       if (x.issueId === this.model.issueId) {
    //         x.issueCategoryId = event.issueCategoryId.value;
    //         x.categoryName = event.issueCategoryId.label;
    //         x.remark = event.remark;
    //       }
    //     });
    //     this.items = this.onUpdateItem(this.items);
    //   });
  }

  onIssueTrack(issue: any) {
    // const ref = this._dialogService.open(TrackComponent, {
    //   header: `ISSUE ID - #${issue.issueId}`,
    //   closeOnEscape: false,
    //   data: {
    //     issue: issue,
    //   },
    //   styleClass: 'w-[80vw]',
    //   contentStyle: {
    //     padding: 0,
    //     'border-bottom-right-radius': '0.375rem',
    //     'border-bottom-left-radius': '0.375rem',
    //   },
    // });
    // ref.onClose.subscribe(async (res) => {
    //   await this.updateNotificationSeenStatus(issue.issueId);
    //   this.getFilterCount();
    //   this.page = 1;
    //   this.params = this.params.delete('page').append('page', this.page);
    //   this.getItems();
    // });
  }

  onSearch(event: { searchType: IssueSearchField; keyword: any }) {
    this.tab = 1;
    this.params = this.params.delete('status');
    this.isSearching = true;
    if (event.keyword) {
      if (event.searchType == IssueSearchField.Issue) {
        this.params = this.params
          .delete('field')
          .append('field', IssueSearchField.Issue);
        this.params = this.params.delete('keyword');
        if (event.keyword) {
          this.params = this.params.append('keyword', event.keyword);
        }
      }
      if (event.searchType == IssueSearchField.Door) {
        this.params = this.params
          .delete('field')
          .append('field', IssueSearchField.Door);
        this.params = this.params.delete('keyword');
        if (event.keyword) {
          this.params = this.params.append('keyword', event.keyword);
        }
      }
      if (event.searchType == IssueSearchField.Category) {
        this.params = this.params
          .delete('field')
          .append('field', IssueSearchField.Category);
        this.params = this.params.delete('keyword');
        if (event.keyword) {
          this.params = this.params.append('keyword', event.keyword);
        }
      }
      if (event.searchType == IssueSearchField.Cause) {
        this.params = this.params
          .delete('field')
          .append('field', IssueSearchField.Cause);
        this.params = this.params.delete('keyword');
        if (event.keyword) {
          this.params = this.params.append('keyword', event.keyword);
        }
      }
      if (event.searchType == IssueSearchField.SolutionTag) {
        this.params = this.params
          .delete('field')
          .append('field', IssueSearchField.SolutionTag);
        this.params = this.params.delete('keyword');
        if (event.keyword) {
          this.params = this.params.append('keyword', event.keyword);
        }
      }
    } else {
      this.params = this.params.delete('field');
      this.params = this.params.delete('keyword');
    }

    this.page = 1;
    this.params = this.params.delete('page').append('page', this.page);
    this.getItems();
  }

  contentSecurity(text: any) {
    return this._domSanitizer.bypassSecurityTrustHtml(text);
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

  onChangeIssuePriority(issue: Issue) {
    const _priority = [
      { value: 1, label: 'Low' },
      { value: 2, label: 'Medium' },
      { value: 3, label: 'High' },
    ];

    this.form = new UntypedFormGroup({});
    this.model = {
      issueId: issue.issueId,
      priorityId: issue.priority,
    };
    this.fields = [
      {
        type: 'dropdown',
        key: 'priorityId',
        templateOptions: {
          placeholder: 'Select a Priority',
          appendTo: 'body',
          required: true,
          label: '',
          values: [
            ..._priority.map((x) => {
              return {
                label: x.label,
                value: x.value,
              };
            }),
          ],
        },
      },
    ];
    this.isChangePriorityModalOpen = true;
  }

  changeIssuePrioritySubmitted(event: any) {
    this.isChangePriorityModalOpen = false;
    // this._issueService
    //   .changeIssuePriority(this.model.issueId, event.priorityId)
    //   .subscribe((res) => {
    //     this.items.forEach((x) => {
    //       if (x.issueId === this.model.issueId) {
    //         x.priority = event.priorityId;
    //       }
    //     });
    //     this.items = this.onUpdateItem(this.items);
    //   });
  }

  changeIssueVisibilty(item: any) {
    this._swal
      .confirm({
        message: `You want to ${item.label}`,
      })
      .then((cn: boolean) => {
        // this._issueService
        //   .changeIssueVisibility(item.issue.issueId)
        //   .subscribe((res) => {
        //     this.items.forEach((x) => {
        //       if (x.issueId === item.issue.issueId) {
        //         x.isGlobalOnly = x.isGlobalOnly == 1 ? 0 : 1;
        //       }
        //     });
        //     this.items = this.onUpdateItem(this.items);
        //   });
      });
  }

  async getFilterCount() {
    // = await this._issueService
    //   .getIssueStatusCount()
    //   .toPromise();
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
          this.onFilter(IssueStatusEnum.Null);
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
      {
        id: 5,
        name: `Requested (${request})`,
        visable: true,
        command: (event) => {
          this.onFilter(IssueStatusEnum.Request);
        },
      },
      {
        id: 6,
        name: `Rejected (${reject})`,
        visable: true,
        command: (event) => {
          this.onFilter(IssueStatusEnum.Reject);
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
          this.onFilter(IssueStatusEnum.Null);
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
      {
        id: 5,
        name: `Requested`,
        count: request,
        visable: true,
        command: (event: any) => {
          this.tab = this.filterMenusForTab[4].id;
          this.onFilter(IssueStatusEnum.Request);
        },
      },
      {
        id: 6,
        name: `Rejected`,
        count: reject,
        visable: true,
        command: (event: any) => {
          this.tab = this.filterMenusForTab[5].id;
          this.onFilter(IssueStatusEnum.Reject);
        },
      },
    ];
  }

  onFilter(status: IssueStatusEnum) {
    this.page = 1;
    this.params = this.params
      .delete('status')
      .delete('page')
      .append('page', this.page);
    if (status !== IssueStatusEnum.Null) {
      this.params = this.params.append('status', status);
    }
    this.getItems();
  }

  trackBy(index: number, item: Issue): number {
    return item.issueId;
  }

  onScrolling() {
    this.isScrolling = true;
    this.page += 1;
    this.params = this.params.delete('page').append('page', this.page);
    this.getItems();
  }

  getItems() {
    this.items = this.onUpdateItem([
      {
        issueId: 830,
        issueCategoryId: 1,
        categoryName: 'Others',
        doorId: 1,
        doorName: 'OfficeFirstDoor',
        siteName: 'OfficeFirstDoor',
        zoneName: 'Mirpur',
        clusterName: 'Dhaka',
        vendorId: 1,
        vendorName: 'Eye Electronics',
        status: 1,
        priority: 1,
        remark:
          '<p>&lt;script&gt;</p><p>\tconsole.log("test")</p><p>&lt;/script&gt;</p>',

        issueCreationTime: '2023-08-17T15:46:48.647',
        issueCreatorUserName: 'Global Admin',
        issueCloseTime: null,
        issueCloserUserName: null,
        unseenNotification: 0,
      },
      {
        issueId: 829,
        issueCategoryId: 8,
        categoryName: 'Theft Incident',
        doorId: 14837,
        doorName: 'GPSYKNG009',
        siteName: 'GPSYKNG009',
        zoneName: 'Sylhet',
        clusterName: 'Sylhet',
        vendorId: 1,
        vendorName: 'Eye Electronics',
        status: 2,
        priority: 3,
        remark: '<p>Edotco inside team </p><p>01813825728</p>',

        issueCreationTime: '2023-03-02T22:12:34.547',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2023-03-13T18:01:18.27',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 828,
        issueCategoryId: 11,
        categoryName: 'Unlock Issue',
        doorId: 11927,
        doorName: 'JSSDRB3B',
        siteName: 'JSSDRB3',
        zoneName: 'Jessore',
        clusterName: 'Khulna',
        vendorId: 1,
        vendorName: 'Eye Electronics',
        status: 2,
        priority: 3,
        remark: '<p>+880 1966-942805</p>',

        issueCreationTime: '2023-02-05T16:14:10.957',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2023-03-13T18:03:45.737',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 826,
        issueCategoryId: 4,
        categoryName: 'Lock Fault',
        doorId: 3512,
        doorName: 'KHDMR05',
        siteName: 'KHDMR05',
        zoneName: 'Khulna',
        clusterName: 'Khulna',
        vendorId: 1,
        vendorName: 'Eye Electronics',
        status: 2,
        priority: 3,
        remark: null,

        issueCreationTime: '2023-01-11T16:16:49.26',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2023-03-13T18:06:16.787',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 825,
        issueCategoryId: 11,
        categoryName: 'Unlock Issue',
        doorId: 1511,
        doorName: 'FNSNG53',
        siteName: 'FNSNG53',
        zoneName: 'Feni',
        clusterName: 'Noakhali',
        vendorId: 1,
        vendorName: 'Eye Electronics',
        status: 1,
        priority: 3,
        remark: '<p>Aslam Islam</p><p>+880 1817-181101</p>',

        issueCreationTime: '2023-01-07T12:07:54.507',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: null,
        issueCloserUserName: null,
        unseenNotification: 0,
      },
      {
        issueId: 824,
        issueCategoryId: 10,
        categoryName: 'Security Breach',
        doorId: 61,
        doorName: 'NSSBP06',
        siteName: 'NSSBP06',
        zoneName: 'Uttara',
        clusterName: 'Dhaka North',
        vendorId: 1,
        vendorName: 'Eye Electronics',
        status: 1,
        priority: 3,
        remark:
          '<p><strong style="color: rgb(0, 88, 40);">Himu</strong></p><p><a href="mailto:hasanur.rahman_ext@edotcogroup.com" rel="noopener noreferrer" target="_blank" style="color: rgb(31, 73, 125);">hasanur.rahman_ext@edotcogroup.com</a></p><p><span style="color: rgb(9, 115, 75);">DHKS-Kanchpur</span></p><p><span style="color: rgb(9, 115, 75);">+8801611417404</span></p>',

        issueCreationTime: '2023-01-04T12:23:24.023',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: null,
        issueCloserUserName: null,
        unseenNotification: 0,
      },
      {
        issueId: 823,
        issueCategoryId: 9,
        categoryName: 'Memory Fault',
        doorId: 15331,
        doorName: 'TGPGN12',
        siteName: 'TGPGN12',
        zoneName: 'Rangpur',
        clusterName: 'Rangpur',
        vendorId: 1,
        vendorName: 'Eye Electronics',
        status: 2,
        priority: 3,
        remark: '<p>Onsite Team</p><p>Vendor</p>',

        issueCreationTime: '2022-11-24T13:24:43.003',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2022-12-29T11:19:27.397',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 822,
        issueCategoryId: 3,
        categoryName: 'Lock Close Failed',
        doorId: 5560,
        doorName: 'CPSDR80B',
        siteName: 'CPSDR80',
        zoneName: 'Chandpur',
        clusterName: 'Comilla',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 1,
        priority: 3,
        remark:
          '<p><strong style="color: rgb(9, 115, 75);">Abdul Alim</strong></p><p><span style="color: rgb(9, 115, 75);">Engineer,Regional Operations</span></p><p><span style="color: rgb(9, 115, 75);">Management-Operations</span></p><p><span style="color: rgb(9, 115, 75);">edotco Bangladesh Co. Limited</span></p>',

        issueCreationTime: '2022-09-20T10:24:45.057',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: null,
        issueCloserUserName: null,
        unseenNotification: 0,
      },
      {
        issueId: 821,
        issueCategoryId: 2,
        categoryName: 'Device Offline',
        doorId: 14273,
        doorName: 'MYNND38',
        siteName: 'MYNND38',
        zoneName: 'Mymensingh',
        clusterName: 'Mymensingh',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 2,
        priority: 3,
        remark: 'Software',

        issueCreationTime: '2022-08-23T17:42:36.51',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2022-08-31T12:13:59.373',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 803,
        issueCategoryId: 2,
        categoryName: 'Device Offline',
        doorId: 12776,
        doorName: 'BLMYGFG002',
        siteName: 'BLMYGFG002',
        zoneName: 'Mymensingh',
        clusterName: 'Mymensingh',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 2,
        priority: 3,
        remark: 'Software',

        issueCreationTime: '2022-08-23T17:42:36.503',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2022-08-31T12:18:43.25',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 801,
        issueCategoryId: 2,
        categoryName: 'Device Offline',
        doorId: 14109,
        doorName: 'MYFLP54',
        siteName: 'MYFLP54',
        zoneName: 'Mymensingh',
        clusterName: 'Mymensingh',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 1,
        priority: 3,
        remark: 'Software',

        issueCreationTime: '2022-08-23T17:42:36.497',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: null,
        issueCloserUserName: null,
        unseenNotification: 0,
      },
      {
        issueId: 800,
        issueCategoryId: 2,
        categoryName: 'Device Offline',
        doorId: 1603,
        doorName: 'MYGFG25',
        siteName: 'MYGFG25',
        zoneName: 'Mymensingh',
        clusterName: 'Mymensingh',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 2,
        priority: 3,
        remark: 'Software',

        issueCreationTime: '2022-08-23T17:42:36.49',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2022-08-31T12:21:08.13',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 799,
        issueCategoryId: 2,
        categoryName: 'Device Offline',
        doorId: 6850,
        doorName: 'MYDBR16',
        siteName: 'MYDBR16',
        zoneName: 'Mymensingh',
        clusterName: 'Mymensingh',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 1,
        priority: 3,
        remark: 'Software',

        issueCreationTime: '2022-08-23T17:42:36.487',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: null,
        issueCloserUserName: null,
        unseenNotification: 0,
      },
      {
        issueId: 798,
        issueCategoryId: 2,
        categoryName: 'Device Offline',
        doorId: 1282,
        doorName: 'MYSDR08',
        siteName: 'MYSDR08',
        zoneName: 'Mymensingh',
        clusterName: 'Mymensingh',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 2,
        priority: 3,
        remark: 'Software',

        issueCreationTime: '2022-08-23T17:42:36.48',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2022-09-18T12:35:27.36',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
      {
        issueId: 797,
        issueCategoryId: 11,
        categoryName: 'Unlock Issue',
        doorId: 2212,
        doorName: 'MYSDR02',
        siteName: 'MYSDR02',
        zoneName: 'Mymensingh',
        clusterName: 'Mymensingh',
        vendorId: 2,
        vendorName: 'HS Engineering And Technology Ltd',
        status: 2,
        priority: 3,
        remark: 'Software',

        issueCreationTime: '2022-08-23T17:42:36.473',
        issueCreatorUserName: 'Md. Imam Uddin',
        issueCloseTime: '2022-09-18T12:37:53.783',
        issueCloserUserName: 'Md. Imam Uddin',
        unseenNotification: 0,
      },
    ]);
    // this.isApiCalling = true;
    // this._issueService.getAllIssue(this.params).subscribe(
    //   (res) => {
    //     this.isApiCalling = false;
    //     this.notFound = false;
    //     this.isSearching = false;
    //     if (res.data.length > 0) {
    //       this.isScrolling = false;
    //       const items: IssueForGlobalExtension[] = this.onUpdateItem(res.data);
    //       this.items = this.page === 1 ? [...items] : [...this.items, ...items];
    //     } else {
    //       if (!this.isScrolling) {
    //         this.notFound = true;
    //         this.items = [];
    //       }
    //     }
    //   },
    //   (err) => {
    //     this.isApiCalling = false;
    //   }
    // );
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

  approvedIssueRequest(item: any) {
    this._swal
      .confirm({
        message: `You want to approve issue no - ${item.issueId}`,
      })
      .then((cn: boolean) => {
        // this._issueService.approveIssue(item.issueId).subscribe((res) => {
        //   this.page = 1;
        //   this.params = this.params.delete('page').append('page', this.page);
        //   this.getItems();
        //   this.getFilterCount();
        // });
      });
  }

  onRejectIssue(item: any) {
    this.form = new UntypedFormGroup({});
    this.model = {
      issueId: item.issueId,
      comment: '',
    };
    this.fields = [
      {
        type: 'editor',
        key: 'comment',
        templateOptions: {
          headerTemplate: true,
          style: { height: '128px' },
          maxLength: 2000,
          required: true,
        },
      },
    ];
    this.isIssueRequestRejectModalOpen = true;
  }

  issueRejectSubmitted(event: any) {
    this.isIssueRequestRejectModalOpen = false;
    // this._issueService
    //   .rejectIssue(this.model.issueId, { comment: event.comment })
    //   .subscribe((res) => {
    //     this.getItems();
    //     this.getFilterCount();
    //   });
  }

  async getDoor(customerId: number, keyword: any) {
    let param = new HttpParams();
    if (keyword) param = param.append('keyword', keyword);

    // const responsData: any =
    //   (await this._issuInfoApiService
    //     .searchIssueDoor(customerId, param)
    //     .toPromise()) || [];
    // if (responsData) {
    //   return responsData.data.map((x: any) => {
    //     const doorData = {
    //       label: x.doorName,
    //       value: x.doorId,
    //     };
    //     return doorData;
    //   });
    // } else return [];
  }

  async getCategory(keyword: any) {
    let param = new HttpParams();
    if (keyword) param = param.append('keyword', keyword);

    // const responsData: any =
    //   (await this._issueCategoryApiService.getAllCategory(param).toPromise()) ||
    //   [];
    // if (responsData) {
    //   return responsData.data.map((x: IssueCategory) => {
    //     const doorData = {
    //       label: x.categoryName,
    //       value: x.id,
    //     };
    //     return doorData;
    //   });
    // } else return [];
  }

  async updateNotificationSeenStatus(issueId: number) {
    // await this._issuInfoApiService.issueNotificationSeen(issueId).toPromise();
  }

  onUploadIssue() {
    // const ref = this._dialogService.open(IssueImportComponent, {
    //   header: `Issue Import`,
    //   closeOnEscape: false,
    //   styleClass: 'w-[625px]',
    //   contentStyle: {
    //     padding: 0,
    //     'border-bottom-right-radius': '0.375rem',
    //     'border-bottom-left-radius': '0.375rem',
    //   },
    // });
    // ref.onClose.subscribe((result) => {
    //   if (!result) return;
    //   const { file, customerId } = result;
    //   const fileObj = new EyeFile();
    //   fileObj.convertBlobToBase64(file[0]).then((base64: string) => {
    //     const base64File = base64.split('base64,');
    //     this._issueService
    //       .importIssue({ customerId, issueBase64: base64File[1] })
    //       .subscribe((res) => {
    //         this.page = 1;
    //         this.params = this.params
    //           .delete('page')
    //           .append('page', this.page.toString());
    //         this.getItems();
    //       });
    //   });
    // });
  }
}

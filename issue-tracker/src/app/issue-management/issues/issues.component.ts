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
import { HttpParams } from '@angular/common/http';
import { RoleType } from '@core/core/api/auth/login/auth.model';

export enum IssuePriorityEnum {
  Low,
  Medium,
  High,
  Critical
}
export enum IssueStatusEnum {
  All,
  Open,
  Close,
}

export interface Issue {
  id: number;
  categoryId: number;
  categoryName: string;
  siteId: number;
  siteName: string;
  vendorId: number;
  vendorName: string;
  status: number;
  priorityStatus: number;
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
  roleType = RoleType;
  faComment = faComment;
  isChangePriorityModalOpen = false;
  isEditModal = false;
  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  isSearching = false;
  status = ['Open', 'Close'];
  priority = ['Low', 'Medium', 'High', 'Critical'];
  filterMenus: OptionsSelector[] = [];
  filterMenusForTab: any[] = [];
  tab: IssueStatusEnum  = IssueStatusEnum.All;
  issueStatusEnum = IssueStatusEnum;
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
  counts: {
    all: number;
    closed: number;
    open: number;
  } = {
    all: 0,
    closed: 0,
    open: 0
  };
  params = new HttpParams();
  constructor(
    private _dialogService: DialogService,
    private _issueApi: IssueApiService,
    private _swal: EyeSwalService,
    public claim: LoginUserClaimService
  ) {}

  ngOnInit(): void {
    this.getCounts();
    this.getItems();
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
        this._issueApi.save(x).subscribe(res => {
          this.getItems();
        });
      });
  }


  onIssueTrack(issue: any) {
    const ref = this._dialogService.open(TrackComponent, {
      header: `ISSUE ID - #${issue.id}`,
      closeOnEscape: false,
      data: {
        issue: issue,
      },
      styleClass: 'w-[800px]',
      contentStyle: {
        padding: 0,
        'border-bottom-right-radius': '0.375rem',
        'border-bottom-left-radius': '0.375rem',
      },
    });
    ref.onClose.subscribe(async (res) => {


    });
  }

  onFilter(status: IssueStatusEnum) {
    this.tab = status;
    this.params = this.params.delete('Status').append('Status', status);
    this.getCounts();
    this.getItems();
  }

  trackBy(index: number, item: Issue): number {
    return item.id;
  }


  getCounts() {
    this._issueApi.getStatus().subscribe(res => {
      const {open, closed} = res.data;
      this.counts = {
        all: Number(open) + Number(closed),
        open: Number(open),
        closed: Number(closed)
      };
    })
  }

  getItems() {
    this.isApiCalling = true;
    this._issueApi.gets(this.params).subscribe(
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

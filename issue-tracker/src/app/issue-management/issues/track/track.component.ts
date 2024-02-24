import { HttpParams } from '@angular/common/http';
import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { extend, kebabCase } from 'lodash';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { TrackService } from './services/tracks.service';
import { EyeSwalService } from '@core/core/provider/message/swal.service';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { IssueApiService } from '@core/core/api/issue/issue-api.service';

enum IssueStatusEnum {
  Open = 0,
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

interface Track extends Issue {
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
  selector: 'eye-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit, OnDestroy {
  getUpdatedIssueTrackingSubscription = new Subscription();
  issue!: Issue;
  issueTrackingDetails!: Track;
  form = new UntypedFormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  constructor(
    private _config: DynamicDialogConfig,
    private _issueApi: IssueApiService,
    public _claimService: LoginUserClaimService
  ) {}

  ngOnInit(): void {
    if (this._config.data.issue) {
      this.issue = this._config.data.issue;
      this.getTracks();
    }
  }

  getTracks() {
    this._issueApi.getTrack(this.issue.id).subscribe((res) => {
      if (res && res.data.length > 0) {
        this.issueTrackingDetails = res.data[0];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getUpdatedIssueTrackingSubscription)
      this.getUpdatedIssueTrackingSubscription.unsubscribe();
  }
}

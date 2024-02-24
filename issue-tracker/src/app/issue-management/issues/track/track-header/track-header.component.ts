import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RoleType } from '@core/core/api/auth/login/auth.model';
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
@Component({
  selector: 'eye-track-header',
  templateUrl: './track-header.component.html',
  styleUrls: ['./track-header.component.scss'],
})
export class TrackHeaderComponent {
  roleType = RoleType;
  isIssueCloseModalOpen = false;
  @Input() issue: any;
  status = ['Open', 'Closed'];
  priority = ['Low', 'Medium', 'High', 'Critical'];
  constructor(
    public claim: LoginUserClaimService
    ) {}


  async onIssueClose(){
    this.isIssueCloseModalOpen = true;
    // const solutionTagList:any = await this._solutionTagService.getAllIssueSolutionTag(this.param).toPromise() || [];

    // this.form = new UntypedFormGroup({});
    // this.model = {
    //   comment: '',
    //   issueId: this.issueId,
    //   solutionTagIds:[]
    // };

    // this.fields = [
    //   {
    //     type: 'multiSelect',
    //     key: 'solutionTagIds',
    //     templateOptions: {
    //       label: 'Solution Tags',
    //       appendTo:'body',
    //       required: true,
    //       placeholder:'Select solution tag',
    //       selectedItemsLabel:'{0} items selected',
    //       values: solutionTagList.data.map((x:AdminIssueSolutionTag)=>{
    //         return {value:x.id, label:x.tagName};
    //       })
    //     }
    //   },
    //   {
    //     template:'<div></div>',
    //     hooks: {
    //       onInit: (field) => {
    //         if (field) {
    //           const multiSelectControl = field.form?.get('solutionTagIds');
    //           multiSelectControl?.valueChanges.subscribe((res) => {

    //             const _data = [];

    //            _data.push(res.map((x:any)=>{
    //              return solutionTagList.data.find((c:any) => c.id == x);
    //            }));

    //             let _template = '';
    //             _data[0].forEach((d:any) => {
    //               _template += `<li class="py-1">${d.tagName}</li> `;
    //             });

    //            field.template = `<div class="p-2 px-8"><ul class="list-disc">${_template}</ul></div>`;
    //           });
    //         }
    //       }
    //     },
    //   },
    //   {
    //     type: 'editor',
    //     key: 'comment',
    //     templateOptions: {
    //       label: 'Close statement',
    //       headerTemplate: true,
    //       style: { height: '128px' },
    //       maxLength: 2000,
    //       required: true,
    //     },
    //   }
    // ];
  };

}

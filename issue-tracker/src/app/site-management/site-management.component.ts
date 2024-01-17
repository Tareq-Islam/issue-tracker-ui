import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { LoginUserClaimService } from '@core/core/provider/user-claim/login-user-claim.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HeaderService } from '@page-layout/header/service/header.service';
import { MenuItem, PrimeIcons } from 'primeng/api';

interface Site {
  id: number;
  siteCode: string;
  zone: string;
  cluster: string;
  description?: string;
  menus?: MenuItem[];
}

@Component({
  selector: 'app-site-management',
  templateUrl: './site-management.component.html',
})
export class SiteManagementComponent implements OnInit {
  items: Site[] = [];
isApiCalling = false;
notFound = false;
isModalOpen = false;
form!: UntypedFormGroup;
model = {};
fields: FormlyFieldConfig[] = [];
itemMenus: MenuItem[] = [
  {
    label: 'Edit',
    icon: PrimeIcons.USER_EDIT,
    visible: true,
    command: ({ item }) => {
      // this.onModalOpen(
      //   this.modalType.Update,
      //   this.items.filter((x) => x.id === item.id)[0]
      // );
    },
  },
  {
    label: 'Delete',
    icon: PrimeIcons.TRASH,
    visible: true,
    command: ({ item }) => {
      // this.onDelete(this.items.filter((x) => x.id === item.id)[0]);
    },
  },
];
constructor(
  // private _vendorApi: VendorApiService,
  // private _swal: EyeSwalService,
  private _header: HeaderService,
  public claim: LoginUserClaimService,
) { }

ngOnInit() {
  this._header.headerName = 'Site';
  this.getItems();
}

trackBy(index: number, item: Site): number {
  return item.id;
}

getItems() {
  this.items = [{
    "id": 1,
    "zone": "Gazipur",
    "cluster": "Dhaka Outer",
    "siteCode": "TGSDR70",

},
{
    "id": 74,
    "cluster": "Mymensing",
    "zone": "Moulovibazar",
    "siteCode": "NSRPR53",
},
{
    "id": 39,
    "cluster": "Kustia",
    "zone": "Chittagong Metro West",
    "siteCode": "NPSDR42",
},
{
    "id": 31,
    "cluster": "CTG North",
    "zone": "NABINAGAR",
    "siteCode": "GPKPS54",
},
{
    "id": 29,
    "cluster": "Dhaka Metro",
    "zone": "NAWABGANJ",
    "siteCode": "NSMND57",
},
{
    "id": 14,
    "cluster": "Barisal",
    "zone": "CTG North",
    "siteCode": "MYMKT43",
},
{
    "id": 15,
    "cluster": "Chittagong Metro",
    "zone": "CTG Metro West",
    "siteCode": "GPFPSRP002",
},
{
    "id": 16,
    "cluster": "Chittagong North",
    "zone": "Moulvibazar",
    "siteCode": "NOMJDH9",
},
{
    "id": 17,
    "cluster": "Chittagong South",
    "zone": "Chauddagram",
    "siteCode": "DHDEM61",
},
{
    "id": 18,
    "cluster": "Comilla",
    "zone": "Patuakhali",
    "siteCode": "GPKPS54",
},
{
    "id": 19,
    "cluster": "Dhaka North",
    "zone": "Dhaka Metro",
    "siteCode": "GPKPS54",
},
{
    "id": 20,
    "cluster": "Dhaka South",
    "zone": "Jessore",
    "siteCode": "GPKPS54",
},
{
    "id": 21,
    "cluster": "Khulna",
    "zone": "Kustia",
    "siteCode": "GPKPS54",
},
{
    "id": 22,
    "cluster": "Kushtia",
    "zone": "Tangail",
    "siteCode": "GPKPS54",
},
{
    "id": 23,
    "cluster": "Mymensingh",
    "zone": "Rajshahi",
    "siteCode": "GPKPS54",
},
{
  "id": 24,
  "cluster": "Noakhali",
  "zone": "Jessore",
  "siteCode": "GPKPS54",
},
{
  "id": 25,
  "cluster": "Rajshahi",
  "zone": "Chauddagram",
  "siteCode": "GPKPS54",
},
{
  "id": 26,
  "cluster": "Rangpur",
  "zone": "Rajshahi",
  "siteCode": "GPKPS54",
},
{
  "id": 27,
  "cluster": "Sylhet",
  "zone": "Dhaka Metro",
  "siteCode": "GPKPS54",
}];
  // this.isApiCalling = true;
  // this._vendorApi.gets().subscribe({
  //   next: (res) => {
  //     this.isApiCalling = false;
  //     this.notFound = false;
  //     if (res.data.length > 0) {
  //       this.items = res.data;
  //     } else {
  //       this.notFound = true;
  //       this.items = [];
  //     }
  //   },
  //   error: (err) => {
  //     this.isApiCalling = false;
  //   },
  // });
}

onSubmit() {
  // this.isError = false;
  // if (this.selectedUsers.length === 0) {
  //   this.isError = true;
  //   this.errorMessage = 'Please select users.';
  //   return;
  // }
  // if (this.selectedUsers.length > 0) {
  //   this.isModalOpen = false;
  //   const userIds: number[] = [];
  //   this.selectedUsers.forEach((x) => {
  //     userIds.push(x.id);
  //   });
  //   this._vendorApi.save({userIds: userIds}).subscribe((res) => {this.getItems();});
  // }
}

onDelete(item: Site) {
  // this._swal
  //   .confirm({
  //     message: `You want to unassign the ${item.userName}`,
  //   })
  //   .then((cn: boolean) => {
  //     this._vendorApi.delete(item.id).subscribe((res) => {
  //       this.items = this.items.filter((x) => x.id !== item.id);
  //     });
  //   });
}

}

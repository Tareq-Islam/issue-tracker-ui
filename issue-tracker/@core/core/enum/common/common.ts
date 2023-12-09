export enum PanelType {
  Global = 0,
  Customer = 1,
  Tenant = 2,
  Vendor = 3,
}

export enum UserSearchField {
  Username = 0,
  Email,
  Mobile,
}

export enum PermissionLevel {
  Global = 0,
  Cluster,
  Zone,
  Site,
}

export enum SiteLockHistoryStatus {
  Created = 1,
  Deployed,
  Uninstalled,
  Fault,
  Rectified,
}

export enum KmsPermissionType {
  NoPermission,
  CustodianUser,
  KeyRequestUser,
}
export class ApiResponse<T> {
  statusCode!: number;
  message!: string;
  data!: T;
}

export class ApiResponseCount<T> {
  statusCode!: number;
  message!: string;
  count!: number;
  data!: T;
}

export interface Adapter<T> {
  adapt(item: T): T;
}

export interface DoorUnlockStrategyJson {
  isWebUnlockActive: boolean;
  isCardUnlockActive: boolean;
  isSmsUnlockActive: boolean;
  isMobileAppUnlockActive: boolean;
}

export interface GenericAlertNotificationJson {
  email: boolean;
  sms: boolean;
  pushNotification: boolean;
}

export interface AuditLogUser {
  creatorUserId: number;
  lastModifierUserId: number;
}

export interface DoorCurrentStatus {
  deviceId: number;
  isActive: boolean;
  doorStatus: number;
  lockStatus: number;
  indoorReader: number;
  isIndoorReaderEnable: boolean;
  outDoorReader: number;
  isOutdoorReaderEnable: boolean;
  isOnline: boolean;
  rssi: number;
  lastRssiTime: Date;
  lastCommunicationTime: Date;
  isMemoryFault: boolean;
  lastSyncTime: Date;
  customerName: string;
  mobileOperatorInitialNumber: string;
}

export interface OrgDoorUnlockStrategy {
  isWebUnlockActive: boolean;
  isCardUnlockActive: boolean;
  isSmsUnlockActive: boolean;
  isMobileAppUnlockActive: boolean;
}

export interface CustomerUserInfo {
  name: string;
  organization: string;
  email: string;
  mobileNumber: string;
  cardNumber: string;
  permission: string;
  loginStatus: boolean;
  doorUnlockStrategy: OrgDoorUnlockStrategy;
  status: boolean;
}

export interface AssetAlias {
  org: string;
  aliasName: string;
}

export enum DeviceModelType {
  SmartLock = 1,
  BluetoothLock = 2,
}

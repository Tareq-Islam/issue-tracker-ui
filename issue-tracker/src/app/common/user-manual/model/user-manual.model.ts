export interface UserManual {
  id: number;
  name: string;
  rights: number[];
  isAllRightsMatched: boolean;
  description: string;
  isVisible: boolean;
  url: string;
}

export enum CustomerUserManual {
  Dashboard,
  Branch_Permission,
  Key_Request_Permission,
  Site,
  Brand,
  Key_Profile,
  Key_Case,
  My_Keys,
  Key_Request_Purpose,
  Key_Transfer,
  Key_Transfer_Approval,
  Key_Request,
  Key_Request_Approval,
  Key_Extend,
  Key_Extend_Approval,
  Key_Handover,
  Key_Return,
  Key_Return_Approval
}


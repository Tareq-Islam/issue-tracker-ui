import { Adapter } from '../../common/api-response.model';

enum RoleType {
  SUPER_ADMIN = 1,
  ADMIN,
  VENDOR_ADMIN,
  OPERATION,
}
interface Payload {
  roleId: number;
  userName: string;
  userId: number;
  roleName: string;
  roleType: RoleType;
}

interface UserClaim {
  token: string;
  payload: Payload;
}

class PayloadAdapter implements Adapter<UserClaim> {
  adapt(item: any): UserClaim {
    if (!item) {
      return new UserClaim();
    }
    if (!item.data) {
      return new UserClaim();
    }
    return new UserClaim(item.data.token, item.data.payload);
  }
}

class UserClaim {
  constructor(
    token?: string,
    payload?: {
      rid: number;
      userName: string;
      uid: number;
      roleName: string;
      roleType: number;
    }
  ) {
    this.token = token || '';
    if (payload) {
      this.payload.roleId = payload.rid;
      this.payload.roleName = payload.roleName;
      this.payload.userId = payload.uid;
      this.payload.userName = payload.userName;
      this.payload.roleType = <RoleType>payload.roleType;
    }

  }
}

export { Adapter, PayloadAdapter, UserClaim, Payload, RoleType };

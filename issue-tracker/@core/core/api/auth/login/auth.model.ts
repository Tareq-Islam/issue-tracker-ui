import { Adapter } from '../../common/api-response.model';
import { RoleType } from '../../role/role.model';

interface UserClaim {
  token?: string;
  userName?: string;
  roleName?: string;
  roleType?: RoleType;
}

class PayloadAdapter implements Adapter<UserClaim> {
  adapt(item: any): UserClaim {
    if (!item) {
      return new UserClaim();
    }
    if (!item.data) {
      return new UserClaim();
    }
    return new UserClaim(
      item.data.accessToken,
      item.data.userName,
      item.data.roleName,
      item.data.roleType,
    );
  }
}

class UserClaim {
  constructor(
    accessToken?: string,
    userName?: string,
    roleName?: string,
    roleType?: RoleType,
  ) {
    this.token = accessToken;
    this.userName = userName;
    this.roleName = roleName;
    this.roleType = roleType;
  }
}

export { Adapter, PayloadAdapter, UserClaim };


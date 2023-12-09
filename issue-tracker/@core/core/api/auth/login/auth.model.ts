import { Adapter } from '../../common/api-response.model';

interface AuthPayload {
  userId: string;
  panelType: string;
  permissionLevel: string;
  organizationId: string;
  customerId: string;
}

interface UserClaim {
  token?: string;
  userName?: string;
  permissionName?: string;
  roleName?: string;
  payload?: AuthPayload;
  rights?: string;
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
      item.data.permissionName,
      item.data.payload,
      item.data.rights
    );
  }
}

class UserClaim {
  constructor(
    accessToken?: string,
    userName?: string,
    roleName?: string,
    permissionName?: string,
    payload?: {
      cui: string;
      usi: string;
      ori: string;
      pty: string;
      plv: string;
    },
    rights?: string
  ) {
    this.token = accessToken;
    this.userName = userName;
    this.permissionName = permissionName;
    this.roleName = roleName;
    if (payload) {
      this.payload = {
        customerId: payload.cui,
        organizationId: payload.ori,
        panelType: payload.pty,
        permissionLevel: payload.plv,
        userId: payload.usi,
      };
    }
    this.rights = rights;
  }
}

export { Adapter, AuthPayload, PayloadAdapter, UserClaim };


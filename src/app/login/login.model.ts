export interface UserModel {
  username: string;
  password: string;
  attributes: {email: string;
    name: string;
    family_name: string;
    'custom:userId': string;
    'custom:roleName': string;
    };
}

export interface SignModel {
  username: string;
  password: string;
}

export interface UserDataModel {
  username: string;
  email: string;
  name: string;
  family_name: string;
  'custom:userId': string;
  'custom:roleName': string;

}
export interface GetUserModel {
  users: UserDataModel[];
}

export interface IUser{
  name?: string;
  age?: number;
}

export interface IGetUserParams {
  mobile: string;
}

export interface IGetListParams {
  url: string;
  data: any;
}

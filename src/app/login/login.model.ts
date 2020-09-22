export interface UserInfo {
  success: number;
  message: string;
  token: string;
  data: Data;
}

export interface Data {
  nationalId: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  createdDate: string;
  rank: string;
}

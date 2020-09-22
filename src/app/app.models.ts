import { FileUploader } from "ng2-file-upload";

export interface UserInfo {
  success: number;
  message: string;
  data: Datum[];
}

export interface Datum {
  nationalId: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  createdDate: string;
}

export class UserDetails {
  nationalId: string;
  firstName: string;
  lastName: string;
  rank: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  image: FileUploader;
}

export class CustomerDetails {
  nationalId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  telegramName: string;
  imageURL: string;
  dateCreated: string;
  subscriptionType: string;
  startDate: string;
  endDate: string;
  paymentType: string;
}

export interface VideoInfo {
  id: string;
  title: string;
  length: string;
  clip: string;
  localUrl: string;
  category: string;
  dateCreated: string;
}

export interface SignalInfo {
  id: string;
  title: string;
  length: string;
  mediaLink: string;
  category: string;
  dateCreated: string;
}

export interface VideoDetails {
  title: string;
  length: string;
  clip: FileUploader;
}

export interface PublicationInfo {
  id: string;
  title: string;
  pages: string;
  dateCreated: string;
  mediaLink: any;
}

export interface TicketData {
  success: number;
  message: string;
  data: TicketDatum[];
}

export interface TicketDatum {
  ticketId: string;
  nationalId: string;
  assetId: string;
  assetType: string;
  topic: string;
  question: string;
  dateCreated: string;
  responseDate: string;
  firstName: string;
  lastName: string;
}

export interface CallbackData {
  success: number;
  message: string;
  data: CallbackDatum[];
}

export interface CallbackDatum {
  callbackId: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  state: string;
  status: string;
  dateCreated: Date;
}

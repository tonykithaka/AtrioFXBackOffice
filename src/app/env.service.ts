export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public apiUserUrl = '';
  public apiCustomerUrl = '';
  public cloudinaryUrl = '';
  public cloudinaryImageUrl = '';
  public cloudinaryVideoUrl = '';
  public cloudinaryVideoUploadUrl = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  constructor() {
  }
}
(function (window) {
  window.__env = window.__env || {};

  window.__env.apiUserUrl = "http://localhost:3000/api/users"; //users api head
  window.__env.apiCustomerUrl = "http://localhost:3000/api/customer"; //customers api url
  window.__env.cloudinaryUrl = "https://api.cloudinary.com/v1_1/dk8vuddno/image/upload"; //cloudinary api url
  window.__env.cloudinaryImageUrl = "https://res.cloudinary.com/dk8vuddno/image/upload/v1597438409/"; //cloudinary api url
  window.__env.cloudinaryVideoUploadUrl = "https://api.cloudinary.com/v1_1/dk8vuddno/video/upload";
  window.__env.cloudinaryVideoUrl = "https://res.cloudinary.com/dk8vuddno/video/upload/v1597582105/"
  window.__env.enableDebug = true;
})(this);

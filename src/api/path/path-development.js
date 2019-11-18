/* 权限系统 */
export const auth = {
  /* 登录 */
  login: '/login',
  /* 获取用户信息 */
  getUserInfo: '/getUserInfo',
  /* 获取用户角色 */
  getUserRole: '/getUserRole',
  /* 用户资料修改 */
  logout: '/logout'
}

/* 文件系统 */
export const file = {
  /* 文件上传 */
  upload: '/filesystem/upload/file',
  /* 图片上传 */
  uploadImage: '/filesystem/uploadImage',
  /* 图片上传base64 */
  uploadImageBase64: '/filesystem/uploadImage/base64',
  /* 文件下载 */
  downloadFile: '/file/',
  /* 重要文件下载 */
  downloadFileImportant: '/file/important/',
  /* 图片下载 */
  downloadImage: '/image/',
  /* 图片缩略图下载 */
  downloadImageThumb: '/image/thumb/',
  /* 重要图片下载 */
  downloadImageImportant: '/image/important/',
  /* 重要图片缩略图下载 */
  downloadImageImportantThumb: '/image/important/thumb/'
}

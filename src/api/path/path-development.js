/* 权限系统 */
export const auth = {
  /* 获取微信授权的url */
  getAuthUrl: '/auth/wechatAuth/getAuthUrl',
  /* 获取jssdk配置参数 */
  getSDKConfig: '/api/auth/wechatAuth/createJsapiSignature',
  /* 获取jwt */
  getToken: '/auth/wechatAuth/getToken',
  /* 获取用户信息 */
  getUserInfo: '/auth/getUserInfo',
  /* 根据用户二维码获取用户信息 */
  getUserInfoByQrcode: '/auth/getUserInfoByQrcode',
  /* 获取用户二维码 */
  getUserQrcode: '/auth/getUserQrcode',
  /* 获取用户角色 */
  getUserRole: '/auth/getUserRole',
  /* 用户资料修改 */
  editUserInfo: '/auth/editUserInfo'
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

/* 支付系统 */
export const pay = {
  /* 根据订单号支付 */
  pay: '/pay/wechatPay/createPayOrder',
  /* 根据订单号退款 */
  refund: '/pay/wechatPay/createRefundOrder'
}

/* 账户系统 */
export const account = {
  /* 获取账户信息 */
  getUserAccountInfo: '/account/getUserAccountInfo',
  /* 获取流水列表 */
  getUserBillList: '/account/getUserBillList',
  /* 获取商家账户信息 */
  getShopAccountInfo: '/account/getShopAccountInfo',
  /* 获取商家流水列表 */
  getShopBillList: '/account/getShopBillList',
  /* 门店账户提现申请 */
  createShopCashOut: '/account/createShopCashOut',
  /* 门店账户提现状态 */
  getShopCashOutStatus: '/account/getShopCashOutStatus',
  /* 获取门店账户提现详情 */
  getShopCashOutInfo: '/account/getShopCashOutInfo',
  /* 获取门店提现列表 */
  getShopCashOutList: '/account/getShopCashOutList',
  /* 用户账户提现申请 */
  createUserCashOut: '/account/createUserCashOut',
  /* 门店账户提现状态 */
  getUserCashOutStatus: '/account/getUserCashOutStatus',
  /* 获取用户账户提现详情 */
  getUserCashOutInfo: '/account/getUserCashOutInfo',
  /* 获取用户提现列表 */
  getUserCashOutList: '/account/getUserCashOutList'
}

/* 订单系统 */
export const order = {
  /* 获取用户订单列表 */
  getOrderListByUser: '/order/getOrderListByUser',
  /* 获取门店订单列表 */
  getOrderListByShop: '/order/getOrderListByShop',
  /* 获取用户订单详情 */
  getOrderInfoByUser: '/order/getOrderInfoByUser',
  /* 获取门店订单详情 */
  getOrderInfoByShop: '/order/getOrderInfoByShop',
  /* 获取订单二维码 */
  getOrderQRCode: '/order/getOrderQRCode',
  /* 扫描二维码 */
  scanOrderQRCode: '/order/scanOrderQRCode',
  /* 确认签到 */
  confirmQrCode: '/order/confirmQrCode',
  /* 创建支付订单 */
  createPayOrder: '/order/createPayOrder',
  /* 创建退款申请 */
  createRefundOrder: '/order/createRefundOrder',
  /* 获取订单退款信息 */
  getOrderRefundInfo: '/order/getOrderRefundInfo',
  /* 获取订单消费状态 */
  getOrderUseStatus: '/merchant/order/checkUse'
}

/* 门店模块 */
export const shop = {
  /* 门店注册-自主注册 */
  registerBySelf: '/shop/registerBySelf',
  /* 门店注册-代理注册 */
  registerByAgent: '/shop/registerByAgent',
  /* 获取门店列表 */
  getShopListByAgent: '/shop/getShopListByAgent',
  /* 根据shopId获取门店信息 */
  getShopInfoById: '/shop/getShopInfoById',
  /* 根据user获取门店信息 */
  getShopInfoByUser: '/shop/getShopInfoByUser',
  /* 编辑门店信息 */
  editShopInfo: '/shop/editShopInfo',
  /* 获取门店二维码 */
  getShopQrCode: '/shop/getShopQrCode',
  /* 获取门店人员 */
  getShopOperator: '/shop/getShopOperator',
  /* 添加门店人员 */
  addShopOperator: '/shop/addShopOperator',
  /* 删除门店运营人员 */
  deleteShopOperator: '/shop/deleteShopOperator'
}

/* 课程模块 */
export const course = {
  /* 获取课程列表 */
  getCourseList: '/course/getCourseList',
  /* 添加课程 */
  addCourse: '/course/addCourse',
  /* 编辑课程 */
  editCourse: '/course/editCourse',
  /* 删除课程 */
  deleteCourse: '/course/deleteCourse',
  /* 获取课程详情 */
  getCourseInfo: '/course/getCourseInfo',
  /* 获取课程类型 */
  getCourseType: '/course/getCourseType'
}

/* 教师模块 */
export const teacher = {
  /* 获取教师列表 */
  getTeacherList: '/teacher/getTeacherList',
  /* 添加教师 */
  addTeacher: '/teacher/addTeacher',
  /* 编辑教师 */
  editTeacher: '/teacher/editTeacher',
  /* 删除教师 */
  deleteTeacher: '/teacher/deleteTeacher',
  /* 教师详情 */
  getTeacherInfo: '/teacher/getTeacherInfo'
}

/* 动态模块 */
export const dynamic = {}

/* 代理模块 */
export const agent = {
  /* 代理注册 */
  register: '/agent/register',
  /* 获取代理详情 */
  getAgentInfo: '/agent/getAgentInfo'
}

/* ES模块 */
export const es = {
  /* 获取课程列表 */
  getCourseList: '/es/getCourseList',
  /* 获取附近的门店列表 */
  getNearbyShopList: '/es/getNearbyShopList',
  /* 获取商家订单列表 */
  getOrderListByShop: '/merchant/es/order/searchByShop',
  /* 获取用户订单列表 */
  getOrderListByUser: '/merchant/es/order/searchByUser'
}

/* 投诉建议 */
export const opinion = {
  /* 提交意见 */
  createOpinion: '/opinion/createOpinion',
  /* 获取意见提交次数 */
  getOpinionLimit: '/opinion/getOpinionLimit'
}

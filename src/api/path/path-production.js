/* 权限系统 */
export const auth = {
  /* 获取微信授权的url */
  getAuthUrl: '/auth/wechatAuth/getAuthUrl',
  /* 获取jssdk配置参数 */
  getSDKConfig: '/auth/wechatAuth/createJsapiSignature',
  /* 获取jwt */
  getToken: '/auth/wechatAuth/getToken',
  /* 获取用户信息 */
  getUserInfo: '/auth/user/getUserInfo',
  /* 根据用户二维码获取用户信息 */
  getUserInfoByQrcode: '/auth/user/getUserInfoByQrcode',
  /* 获取用户二维码 */
  getUserQrcode: '/auth/user/getUserQrcode',
  /* 获取用户角色 */
  getUserRole: '/merchant/auth/getRole',
  /* 用户资料修改 */
  editUserInfo: '/auth/user/updateUserInfo'
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
  /* 获取用户账户信息 */
  getUserAccountInfo: '/account/userAccount/info',
  /* 获取流水列表 */
  getUserBillList: '/account/userBill/list',
  /* 获取商家账户信息 */
  getShopAccountInfo: '/account/shopAccount/info',
  /* 获取商家流水列表 */
  getShopBillList: '/account/shopBill/list',
  /* 门店账户提现申请 */
  createShopCashOut: '/merchant/shop/cashout/create',
  /* 门店账户提现状态 */
  getShopCashOutStatus: '/merchant/shop/cashout/status',
  /* 获取门店账户提现详情 */
  getShopCashOutInfo: '/merchant/shop/cashout/detail',
  /* 获取门店提现列表 */
  getShopCashOutList: '/merchant/shop/cashout/times',
  /* 用户账户提现申请 */
  createUserCashOut: '/merchant/agent/cashout/create',
  /* 门店账户提现状态 */
  getUserCashOutStatus: '/merchant/agent/cashout/status',
  /* 获取用户账户提现详情 */
  getUserCashOutInfo: '/merchant/agent/cashout/detail',
  /* 获取用户提现列表 */
  getUserCashOutList: '/merchant/agent/cashout/times'
}

/* 订单系统 */
export const order = {
  /* 获取用户订单列表 */
  getOrderListByUser: '/merchant/order/listByUser',
  /* 获取门店订单列表 */
  getOrderListByShop: '/merchant/order/listByShop',
  /* 获取用户订单详情 */
  getOrderInfoByUser: '/merchant/order/detail',
  /* 获取门店订单详情 */
  getOrderInfoByShop: '/merchant/order/detail',
  /* 获取订单二维码 */
  getOrderQRCode: '/merchant/order/qrcode',
  /* 扫描二维码 */
  scanOrderQRCode: '/merchant/order/scanQrcode',
  /* 确认签到 */
  confirmQrCode: '/merchant/order/confirmQrcode',
  /* 创建支付订单 */
  createPayOrder: '/merchant/order/create',
  /* 创建退款申请 */
  createRefundOrder: '/merchant/order/refund/create',
  /* 获取订单退款信息 */
  getOrderRefundInfo: '/merchant/order/refund/detail',
  /* 获取订单消费状态 */
  getOrderUseStatus: '/merchant/order/checkUse'
}

/* 门店模块 */
export const shop = {
  /* 门店注册-自主注册 */
  registerBySelf: '/merchant/shop/registerBySelf',
  /* 门店注册-代理注册 */
  registerByAgent: '/merchant/shop/registerByAgent',
  /* 获取门店列表 */
  getShopListByAgent: '/merchant/shop/findShopsByAgent',
  /* 根据shopId获取门店信息 */
  getShopInfoById: '/merchant/shop/detail',
  /* 根据user获取门店信息 */
  getShopInfoByUser: '/merchant/shop/findShopsByUser',
  /* 编辑门店信息 */
  editShopInfo: '/merchant/shop/updateShop',
  /* 获取门店二维码 */
  getShopQrCode: '/merchant/shop/qrcode',
  /* 获取门店人员 */
  getShopOperator: '/merchant/shop/operator/list',
  /* 添加门店人员 */
  addShopOperator: '/merchant/shop/operator/add',
  /* 删除门店运营人员 */
  deleteShopOperator: '/merchant/shop/operator/delete'
}

/* 课程模块 */
export const course = {
  /* 获取课程列表 */
  getCourseList: '/merchant/course/search',
  /* 添加课程 */
  addCourse: '/merchant/course/create',
  /* 编辑课程 */
  editCourse: '/merchant/course/edit',
  /* 删除课程 */
  deleteCourse: '/merchant/course/delete',
  /* 获取课程详情 */
  getCourseInfo: '/merchant/course/detail',
  /* 获取课程类型 */
  getCourseType: '/merchant/course/type/list'
}

/* 教师模块 */
export const teacher = {
  /* 获取教师列表 */
  getTeacherList: '/merchant/teacher/list',
  /* 添加教师 */
  addTeacher: '/merchant/teacher/create',
  /* 编辑教师 */
  editTeacher: '/merchant/teacher/edit',
  /* 删除教师 */
  deleteTeacher: '/merchant/teacher/delete',
  /* 教师详情 */
  getTeacherInfo: '/merchant/teacher/detail'
}

/* 动态模块 */
export const dynamic = {}

/* 代理模块 */
export const agent = {
  /* 代理注册 */
  register: '/merchant/agent/create',
  /* 获取代理详情 */
  getAgentInfo: '/merchant/agent/detail'
}

/* ES模块 */
export const es = {
  /* 获取课程列表 */
  getCourseList: '/merchant/es/course/search',
  /* 获取附近的商家 */
  getNearbyShopList: '/merchant/es/potentialMerchant/search',
  /* 获取商家订单列表 */
  getOrderListByShop: '/merchant/es/order/searchByShop',
  /* 获取用户订单列表 */
  getOrderListByUser: '/merchant/es/order/searchByUser'
}

/* 投诉建议 */
export const opinion = {
  /* 提交意见 */
  createOpinion: '/merchant/opinion/create',
  /* 获取意见提交次数 */
  getOpinionLimit: '/merchant/opinion/limitTimes'
}

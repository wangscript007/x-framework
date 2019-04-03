export default class User {
  constructor ({userId, account, realName, userType, phone, email, sex, iconPath, orgId, orgName, deptId, deptName, roleSet, permissionSet, appInfo = {}}) {
    this.userId = userId
    this.account = account
    this.realName = realName
    this.userType = userType
    this.phone = phone
    this.email = email
    this.sex = sex
    this.iconPath = iconPath
    this.orgId = orgId
    this.orgName = orgName
    this.deptId = deptId
    this.deptName = deptName
    this.roleSet = roleSet
    this.permissionSet = permissionSet
    this.appInfo = appInfo
  }
}

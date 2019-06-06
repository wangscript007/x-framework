/*
* standard中均为国家标准代码
* 请勿将非国标或自定义标准代码定义到standard中
* 自定义标准代码请根据业务新建模块维护
*/

/* 证件类型 */
export const EMI_CERTIFICATE_TYPE = [
  { id: '1', name: '居民身份证' },
  { id: '2', name: '军官证' },
  { id: '3', name: '士兵证' },
  { id: '4', name: '文职干部证' },
  { id: '5', name: '部队离退休证' },
  { id: '6', name: '香港特区护照/身份证明' },
  { id: '7', name: '澳门特区护照/身份证明' },
  { id: '8', name: '台湾居民来往大陆通行证' },
  { id: '9', name: '境外永久居住证' },
  { id: 'A', name: '护照' },
  { id: 'B', name: '户口本' },
  { id: 'Z', name: '其他' }
]

/* 性别 */
export const EMI_SEX = [
  { id: '0', name: '未知' },
  { id: '1', name: '男' },
  { id: '2', name: '女' },
  { id: '9', name: '未说明' }
]

/* 民族 */
export const EMI_NATION = [
  { id: '1', name: '汉族' },
  { id: '2', name: '蒙古族' },
  { id: '3', name: '回族' },
  { id: '4', name: '藏族' },
  { id: '5', name: '维吾尔族' },
  { id: '6', name: '苗族' },
  { id: '7', name: '彝族' },
  { id: '8', name: '壮族' },
  { id: '9', name: '布依族' },
  { id: '10', name: '朝鲜族' },
  { id: '11', name: '满族' },
  { id: '12', name: '侗族' },
  { id: '13', name: '瑶族' },
  { id: '14', name: '白族' },
  { id: '15', name: '土家族' },
  { id: '16', name: '哈尼族' },
  { id: '17', name: '哈萨克族' },
  { id: '18', name: '傣族' },
  { id: '19', name: '黎族' },
  { id: '20', name: '傈僳族' },
  { id: '21', name: '佤族' },
  { id: '22', name: '畲族' },
  { id: '23', name: '高山族' },
  { id: '24', name: '拉祜族' },
  { id: '25', name: '水族' },
  { id: '26', name: '东乡族' },
  { id: '27', name: '纳西族' },
  { id: '28', name: '景颇族' },
  { id: '29', name: '柯尔克孜族' },
  { id: '30', name: '土族' },
  { id: '31', name: '达翰尔族' },
  { id: '32', name: '么佬族' },
  { id: '33', name: '羌族' },
  { id: '34', name: '布朗族' },
  { id: '35', name: '撒拉族' },
  { id: '36', name: '毛南族' },
  { id: '37', name: '仡佬族' },
  { id: '38', name: '锡伯族' },
  { id: '39', name: '阿昌族' },
  { id: '40', name: '普米族' },
  { id: '41', name: '塔吉克族' },
  { id: '42', name: '怒族' },
  { id: '43', name: '乌孜别克族' },
  { id: '44', name: '俄罗斯族' },
  { id: '45', name: '鄂温克族' },
  { id: '46', name: '德昂族' },
  { id: '47', name: '保安族' },
  { id: '48', name: '裕固族' },
  { id: '49', name: '京族' },
  { id: '50', name: '塔塔尔族' },
  { id: '51', name: '独龙族' },
  { id: '52', name: '鄂伦春族' },
  { id: '53', name: '赫哲族' },
  { id: '54', name: '门巴族' },
  { id: '55', name: '珞巴族' },
  { id: '56', name: '基诺族' }
]

/* 学历 */
export const EMI_EDUCATION = [
  { id: '10', name: '研究生教育' },
  { id: '11', name: '博士研究生毕业' },
  { id: '12', name: '博士研究生结业' },
  { id: '13', name: '博士研究生肄业' },
  { id: '14', name: '硕士研究生毕业' },
  { id: '15', name: '硕士研究生结业' },
  { id: '16', name: '硕士研究生肄业' },
  { id: '17', name: '研究生班毕业' },
  { id: '18', name: '研究生班结业' },
  { id: '19', name: '研究生班肄业' },
  { id: '20', name: '大学本科教育' },
  { id: '21', name: '大学本科毕业' },
  { id: '22', name: '大学本科结业' },
  { id: '23', name: '大学本科肄业' },
  { id: '28', name: '大学普通班毕业' },
  { id: '30', name: '大学专科教育' },
  { id: '31', name: '大学专科毕业' },
  { id: '32', name: '大学专科结业' },
  { id: '33', name: '大学专科肄业' },
  { id: '40', name: '中等职业教育' },
  { id: '41', name: '中等专科毕业' },
  { id: '42', name: '中等专科结业' },
  { id: '43', name: '中等专科肄业' },
  { id: '44', name: '职业高中毕业' },
  { id: '45', name: '职业高中结业' },
  { id: '46', name: '职业高中肄业' },
  { id: '47', name: '技工学校毕业' },
  { id: '48', name: '技工学校结业' },
  { id: '49', name: '技工学校肄业' },
  { id: '60', name: '普通高级中学教育' },
  { id: '61', name: '普通高中毕业' },
  { id: '62', name: '普通高中结业' },
  { id: '63', name: '普通高中肄业' },
  { id: '70', name: '初级中学教育' },
  { id: '71', name: '初中毕业' },
  { id: '73', name: '初中肄业' },
  { id: '80', name: '小学教育' },
  { id: '81', name: '小学毕业' },
  { id: '83', name: '小学肄业' },
  { id: '90', name: '其他' }
]

/* 户口*/
export const EMI_HOUSEHOLD_TYPE = [
  { id: '0', name: '未落常住户口' },
  { id: '1', name: '非农业家庭户口' },
  { id: '2', name: '农业家庭户口' },
  { id: '3', name: '非农业集体户口' },
  { id: '4', name: '农业集体户口' },
  { id: '5', name: '自理口粮户口' },
  { id: '6', name: '寄住户口' },
  { id: '7', name: '暂住户口' },
  { id: '8', name: '其他户口' }
]

/* 政治面貌 */
export const EMI_POLITICAL_STATUS = [
  { id: '01', name: '中国共产党党员' },
  { id: '02', name: '中国共产党预备党员' },
  { id: '03', name: '中国共产主义青年团团员' },
  { id: '04', name: '中国国民党革命委员会会员' },
  { id: '05', name: '中国民主同盟盟员' },
  { id: '06', name: '中国民主建国会会员' },
  { id: '07', name: '中国民主促进会会员' },
  { id: '08', name: '中国农工民主党党员' },
  { id: '09', name: '中国致公党党员' },
  { id: '10', name: '九三学社社员' },
  { id: '11', name: '台湾民主自治同盟盟员' },
  { id: '12', name: '无党派民主人士' },
  { id: '13', name: '群众' }
]

/* 户口性质 */
export const EMI_MARITAL_STATUS = [
  { id: '10', name: '未婚' },
  { id: '20', name: '已婚' },
  { id: '21', name: '初婚' },
  { id: '22', name: '再婚' },
  { id: '23', name: '复婚' },
  { id: '30', name: '丧偶' },
  { id: '40', name: '离婚' },
  { id: '90', name: '未说明' }
]

/* 健康状况 */
export const EMI_HEALTH_STATUS = [
  { id: '1', name: '健康或良好' },
  { id: '2', name: '一般或较弱' },
  { id: '3', name: '有慢性疾病' },
  { id: '6', name: '残疾' }
]

/* 血型 */
export const EMI_BLOOD_TYPE = [
  { id: '0', name: '未知血型' },
  { id: '1', name: 'A血型' },
  { id: '2', name: 'B血型' },
  { id: '3', name: 'AB血型' },
  { id: '4', name: 'O血型' },
  { id: '5', name: 'RH阳性血型' },
  { id: '6', name: 'RH阴性血型' },
  { id: '7', name: 'HLA血型' },
  { id: '8', name: '未定血型' },
  { id: '9', name: '其他血型' }
]

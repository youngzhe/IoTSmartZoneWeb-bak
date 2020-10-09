/** ******************** dashboard开始 ************************ */
// 1今天 2本周 3本月
export const searchTypes = [
  { key: 1, label: '今天' },
  { key: 2, label: '本周' },
  { key: 3, label: '本月' },
]

/** ******************** dashboard结束 ************************ */
// 设备管理里面的设备类型
export const deviceType = [
  { key: 1, label: '广告屏' },
  { key: 2, label: '墨水屏' },
  // { key: 3, label: "LED" },
  // { key: 4, label: "摄像头" },
]
// 设备管理里面的在线状态
export const status = [
  { key: 0, label: '离线' },
  { key: 1, label: '在线' },
]

// 设备管理 车内/车站
export const position = [
  { key: 1, label: '车站' },
  { key: 2, label: '车内' },
]

// 设备管理 分辨率
export const resolutions = [
  // { key: "", label: "全部分辨率" },
  { key: '1920x1080', label: '1920x1080' },
  { key: '1080x1920', label: '1080x1920' },
  { key: 'CUSTOM', label: '自定义' },
]

// 设备管理 车内/车站
export const playStatus = [
  { key: 1, label: '已发布' },
  { key: 2, label: '未发布' },
]

// 设备详情 播放内容信息
export const screenTypes = [
  { key: 1, label: '全屏' },
  { key: 2, label: '左右分屏' },
  { key: 3, label: '上下分屏' },
]

export const controlTypes = {
  SCREENSHOT: 'SCREENSHOT',
  ONTIMER: 'ONTIMER',
  RESTART: 'RESTART',
  UPDATE: 'UPDATE',
  FORMAT: 'FORMAT',
  VOLUMECONTROL: 'VOLUMECONTROL',
}

// 如果有label的采用此布局form,一般用于Modal内
export const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
}

// 一般用来不展示label的配置
export const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

// 一般用于页面内，非Modal
export const pageItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
}

// 车站管理 方向
export const direction = [
  { key: 0, label: '上行' },
  { key: 1, label: '下行' },
]

// 初始化的搜索条件
export const conditionCriteria = {
  pageSize: 10,
  pageIndex: 1,
}

/** ******************** 素材模块开始 ************************ */
// 素材类型
export const resourceTypes = {
  TYPE_IMAGE: '图片',
  TYPE_VIDEO: '视频',
  TYPE_AUDIO: '音频',
}
// 素材状态 或者节目状态
export const resourceStatus = [
  { key: 0, label: '未使用' },
  { key: 1, label: '使用中' },
]

// 素材转码状态
export const transcodeStatus = [
  { key: 1, label: '' },
  { key: 2, label: '转码中' },
  { key: 3, label: '转码成功' },
  { key: 4, label: '转码失败' },
]

/** ******************** 素材模块结束 ************************ */

/** ******************** 计划模块结束 ************************ */
// 计划状态
export const planStatusTypes = [
  { key: 1, label: '待提交' },
  { key: 2, label: '待审核' },
  { key: 3, label: '审核未通过' },
  { key: 4, label: '正在发布' },
  { key: 5, label: '已发布' },
  { key: 6, label: '已结束' },
  { key: 7, label: '超时失败' },
  { key: 8, label: '下发失败' },
  { key: 9, label: '部分成功' },
]

export const weekOptions = [
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
  { label: '周日', value: 7 },
]

export const auditStatus = [
  { key: 0, label: '待审核' },
  { key: 1, label: '已审核' },
]
/** ******************** 计划模块结束 ************************ */

/** ******************** 系统管理模块开始 ************************ */
// 用户状态
export const userStatus = [
  { key: 0, label: '未使用' },
  { key: 1, label: '使用中' },
]
// 公司状态
export const companyStatus = [
  { key: 0, label: '未使用' },
  { key: 1, label: '使用中' },
]
// 用户角色类型
export const roleTypes = [
  { key: 1, label: '平台管理员' },
  { key: 2, label: '管理员' },
  { key: 3, label: '公交运营员' },
  { key: 4, label: '广告运营员' },
]
/** ******************** 系统管理模块结束 ************************ */

/** ******************** 资产管理模块开始 ************************ */
// 区域类型
export const areaType = [
  { key: 1, label: '项目' },
  { key: 2, label: '区域' },
  { key: 3, label: '楼栋' },
  // { key: 4, label: '楼层' },
  // { key: 5, label: '房间' },
]
// 授权状态(1-已授权 2-未授权)
export const authType = [
  { key: 1, label: '已授权' },
  { key: 2, label: '未授权' },
]
/** ******************** 资产管理模块结束 ************************ */

/** ******************** 设备管理（闸机管理）模块开始 ************************ */
// 门禁状态
// 1-在线,2-离线,52-未知
export const doorStatus = [
  { key: 1, label: '在线' },
  { key: 2, label: '离线' },
]

/** ******************** 人员管理模块结束 ************************ */

/** ******************** 人员管理（常驻人员）模块开始 ************************ */
// 人脸数据采集与否–(0:未采集，1:已采集，2:全部)
export const faceStatus = [
  { key: '未采集', label: '未采集' },
  { key: '已采集', label: '已采集' },
]

// 访问目的
export const visitPurpose = [
  { key: '技术交流', label: '技术交流' },
  { key: '学习参观', label: '学习参观' },
  { key: '商务洽谈', label: '商务洽谈' },
  { key: '外协办公', label: '外协办公' },
]

// 状态(1-待处理,2-同意,3-不同意)
export const visitorStatus = [
  { key: 1, label: '待处理' },
  { key: 2, label: '已同意' },
  { key: 3, label: '已拒绝' },
]
/** ******************** 人员管理模块结束 ************************ */

/** ******************** 智慧通行模块开始 ************************ */
// 常驻人员状态
export const residentStatus = [
  { key: 0, label: '异常' },
  { key: 1, label: '正常' },
]
// 人员类型
export const personnelTypes = [
  { key: 0, label: '异常' },
  { key: 1, label: '正常' },
]
// 处理状态
export const processingStatus = [
  { key: 0, label: '未处理' },
  { key: 1, label: '已处理' },
]
// 告警类型(原因)
export const alarmType = [
  { key: 1, label: '超时停留' },
  { key: 2, label: '非法闯入' },
]
/** ******************** 智慧通行模块结束 ************************ */

export default {
  deviceType,
  status,
  position,
  resolutions,
  formItemLayout,
  tailLayout,
  conditionCriteria,
  planStatusTypes,
  faceStatus,
  visitorStatus,
  visitPurpose,
}

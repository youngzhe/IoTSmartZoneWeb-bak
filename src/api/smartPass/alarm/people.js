import httpClient, { httpCommonClient } from '@/tool/axios'

// 获取人员告警列表
export const getAlarmmsgs = data => httpClient.get('/pedestrian/alarmmsgs/personnel', { params: data })

// 根据常驻人员id获取告警详情
export const getAlarmmsgDetailById = data => httpClient.get(`/pedestrian/alarmmsgs/personnel/${data.id}`)

// 条件获取常驻及访客人员告警列表导出
export const exportList = data =>
  httpCommonClient.get('/pedestrian/alarmmsgs/personnel/download', {
    responseType: 'blob',
    params: data,
  })

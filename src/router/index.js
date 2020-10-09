import asyncComponent from '@/tool/asyncComponent'
import { ReactComponent as SmartPass } from '@/assets/svg/smartPass.svg'
import { ReactComponent as Empty } from '@/assets/svg/empty.svg'
import { ReactComponent as PeopleMgmt } from '@/assets/svg/peopleMgmt.svg'
import { ReactComponent as AssetMgmt } from '@/assets/svg/assetMgmt.svg'
import { ReactComponent as DeviceMgmt } from '@/assets/svg/deviceMgmt.svg'

// 参数1为路由路径，参数2为模块路径如login，参数3代码是否精确匹配
// const createRoute = (routePath, appPath, exact = false) => {
//   return {
//     path: routePath,
//     component: asyncComponent(() => import(`@/modules${appPath}`)),
//     exact,
//   };
// };

export const externalRoutes = [
  {
    path: '/',
    component: asyncComponent(() => import('@/modules/login')),
    exact: true,
  },
  {
    path: '/login',
    component: asyncComponent(() => import('@/modules/login')),
    exact: true,
  },
  {
    path: '/smartPass/dashboard/vehicleFullScreen',
    component: asyncComponent(() => import('@/modules/smartPass/dashboard/vehicleFullScreen')),
  },
  {
    path: '/smartPass/dashboard/staffFullScreen',
    component: asyncComponent(() => import('@/modules/smartPass/dashboard/staffFullScreen')),
  },
]

export const constantRoute = [
  {
    path: '/smartPass',
    name: '智慧通行',
    // component: asyncComponent(() => import('@/modules/dashboard')),
    exact: true,
    meta: { role: [1, 2, 3] },
    icon: SmartPass,
    children: [
      {
        path: '/smartPass/dashboard',
        icon: Empty,
        name: '数据看板',
        exact: true,
        children: [
          {
            path: '/smartPass/dashboard/staffSmall',
            name: '人员数据',
            icon: Empty,
            component: asyncComponent(() => import('@/modules/smartPass/dashboard/staffSmall.jsx')),
          },
          {
            path: '/smartPass/dashboard/vehicleSmall',
            name: '车辆数据',
            icon: Empty,
            component: asyncComponent(() => import('@/modules/smartPass/dashboard/vehicleSmall.jsx')),
          },
        ],
      },
      {
        path: '/smartPass/peoplePass',
        name: '人员通行',
        icon: Empty,
        exact: true,
        children: [
          {
            path: '/smartPass/peoplePass/resident',
            name: '常驻人员',
            icon: Empty,
            exact: true,
            component: asyncComponent(() => import('@/modules/smartPass/peoplePass/resident')),
            children: [
              {
                path: '/smartPass/peoplePass/resident/detail/:id',
                name: '常驻人员详情',
                component: asyncComponent(() => import('@/modules/smartPass/peoplePass/resident/detail')),
              },
            ],
          },
          {
            path: '/smartPass/peoplePass/visitor',
            name: '访客人员',
            icon: Empty,
            exact: true,
            component: asyncComponent(() => import('@/modules/smartPass/peoplePass/visitor')),
            children: [
              {
                path: '/smartPass/peoplePass/visitor/detail/:id',
                name: '访客人员详情',
                icon: Empty,
                component: asyncComponent(() => import('@/modules/smartPass/peoplePass/visitor/detail')),
              },
            ],
          },
        ],
      },
      {
        path: '/smartPass/vehiclePass',
        name: '车辆通行',
        icon: Empty,
        exact: true,
        children: [
          {
            path: '/smartPass/vehiclePass/residentVehicle',
            name: '常驻车辆',
            icon: Empty,
            component: asyncComponent(() => import('@/modules/smartPass/vehiclePass/resident')),
            exact: true,
            children: [
              {
                path: '/smartPass/vehiclePass/residentVehicle/detail/:id',
                name: '常驻车辆详情',
                component: asyncComponent(() => import('@/modules/smartPass/vehiclePass/resident/detail')),
              },
            ],
          },
          {
            path: '/smartPass/vehiclePass/visitorVehicle',
            name: '访客车辆',
            icon: Empty,
            exact: true,
            component: asyncComponent(() => import('@/modules/smartPass/vehiclePass/visitor')),
            children: [
              {
                path: '/smartPass/vehiclePass/visitorVehicle/detail/:id',
                name: '访客车辆详情',
                component: asyncComponent(() => import('@/modules/smartPass/vehiclePass/visitor/detail')),
              },
            ],
          },
        ],
      },
      {
        path: '/smartPass/alarm',
        name: '异常告警',
        icon: Empty,
        exact: true,
        children: [
          {
            path: '/smartPass/alarm/peopleAlarm',
            name: '人员告警',
            icon: Empty,
            exact: true,
            component: asyncComponent(() => import('@/modules/smartPass/alarm/people')),
            children: [
              {
                path: '/smartPass/alarm/peopleAlarm/detail/:id',
                name: '人员告警详情',
                component: asyncComponent(() => import('@/modules/smartPass/alarm/people/detail')),
              },
            ],
          },
          {
            path: '/smartPass/alarm/vehicleAlarm',
            name: '车辆告警',
            icon: Empty,
            exact: true,
            component: asyncComponent(() => import('@/modules/smartPass/alarm/vehicle')),
            children: [
              {
                path: '/smartPass/alarm/vehicleAlarm/detail/:id',
                name: '车辆告警详情',
                component: asyncComponent(() => import('@/modules/smartPass/alarm/vehicle/detail')),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/peopleMgmt',
    name: '人员管理',
    exact: true,
    meta: { role: [1, 2, 3] },
    icon: PeopleMgmt,
    children: [
      {
        path: '/peopleMgmt/residents',
        name: '常驻人员',
        icon: Empty,
        exact: true,
        component: asyncComponent(() => import('@/modules/peopleMgmt/residents')),
        children: [
          {
            path: '/peopleMgmt/residents/detail/:id',
            name: '常驻人员详情',
            component: asyncComponent(() => import('@/modules/peopleMgmt/residents/detail')),
          },
        ],
      },
      {
        path: '/peopleMgmt/visitors',
        name: '访客人员',
        icon: Empty,
        exact: true,
        component: asyncComponent(() => import('@/modules/peopleMgmt/visitors')),
        children: [
          {
            path: '/peopleMgmt/visitors/detail/:id',
            name: '访客人员详情',
            component: asyncComponent(() => import('@/modules/peopleMgmt/visitors/detail')),
          },
        ],
      },
      {
        path: '/peopleMgmt/company',
        name: '入驻公司',
        icon: Empty,
        exact: true,
        component: asyncComponent(() => import('@/modules/peopleMgmt/company')),
        children: [
          {
            path: '/peopleMgmt/company/detail/:id',
            name: '入驻公司详情',
            component: asyncComponent(() => import('@/modules/peopleMgmt/company/detail')),
          },
        ],
      },
    ],
  },
  {
    path: '/assetMgmt',
    name: '资产管理',
    exact: true,
    icon: AssetMgmt,
    children: [
      {
        path: '/assetMgmt/area',
        name: '区域管理',
        icon: Empty,
        exact: true,
        component: asyncComponent(() => import('@/modules/assetMgmt/area')),
      },
      {
        path: '/assetMgmt/gate',
        name: '门禁授权',
        icon: Empty,
        exact: true,
        component: asyncComponent(() => import('@/modules/assetMgmt/gate')),
      },
    ],
  },
  {
    path: '/deviceMgmt',
    name: '设备管理',
    exact: true,
    icon: DeviceMgmt,
    children: [
      {
        path: '/deviceMgmt/gate',
        name: '闸机管理',
        icon: Empty,
        exact: true,
        component: asyncComponent(() => import('@/modules/deviceMgmt')),
      },
    ],
  },
]

// export const constantRoute = [
//   {
//     path: '/dashboard',
//     name: '数据统计',
//     component: asyncComponent(() => import('@/modules/dashboard')),
//     exact: true,
//     meta: { role: [1, 2, 3] },
//     icon: asyncComponent(() => import('@ant-design/icons/PieChartOutlined')),
//   },
//   {
//     path: '/ad',
//     name: '广告发布',
//     exact: true,
//     meta: { role: [2, 3, 4] },
//     icon: asyncComponent(() => import('@ant-design/icons/NotificationOutlined')),
//     children: [
//       {
//         path: '/ad/resource',
//         name: '素材',
//         component: asyncComponent(() => import('@/modules/ad/resource')),
//       },
//       {
//         path: '/ad/info',
//         name: '节目',
//         component: asyncComponent(() => import('@/modules/ad/program')),
//       },

//       {
//         path: '/ad/plan',
//         name: '计划',
//         component: asyncComponent(() => import('@/modules/ad/plan')),
//         children: [
//           {
//             path: '/ad/plan/createplan',
//             name: '新建计划',
//             exact: true,
//             component: asyncComponent(() => import('@/modules/ad/plan/addEditPlan')),
//           },
//           {
//             path: '/ad/plan/createplan/:program',
//             name: '新建计划',
//             exact: true,
//             component: asyncComponent(() => import('@/modules/ad/plan/addEditPlan')),
//           },
//           {
//             path: '/ad/plan/editplan/:id',
//             name: '编辑计划',
//             component: asyncComponent(() => import('@/modules/ad/plan/addEditPlan')),
//           },
//           {
//             path: '/ad/plan/publishplan/:id',
//             name: '发布计划',
//             component: asyncComponent(() => import('@/modules/ad/plan/publishPlan')),
//           },
//         ],
//       },
//       {
//         path: '/ad/auditplan',
//         name: '计划审核',
//         meta: { role: [2, 3] },
//         component: asyncComponent(() => import('@/modules/ad/auditPlan')),
//       },
//     ],
//   },
//   {
//     path: '/device',
//     name: '设备管理',
//     component: asyncComponent(() => import('@/modules/device')),
//     icon: asyncComponent(() => import('@ant-design/icons/ClusterOutlined')),
//     meta: { role: [2, 3, 4] },
//     exact: true,
//     // single: true, 保留放置后续有路由需求
//     children: [
//       {
//         path: '/device/control/:ids',
//         name: '设备控制',
//         component: asyncComponent(() => import('@/modules/device/control')),
//       },
//       {
//         path: '/device/detail/:id',
//         name: '设备详情',
//         component: asyncComponent(() => import('@/modules/device/detail')),
//       },
//     ],
//   },
//   {
//     path: '/route',
//     name: '路线管理',
//     component: asyncComponent(() => import('@/modules/route')),
//     icon: asyncComponent(() => import('@ant-design/icons/CarOutlined')),
//     meta: { role: [2, 3] },
//     exact: true,
//     children: [
//       {
//         path: '/route/detail/:id',
//         name: '车站详情',
//         component: asyncComponent(() => import('@/modules/route/detail')),
//       },
//     ],
//   },
//   {
//     path: '/station',
//     name: '车站管理',
//     component: asyncComponent(() => import('@/modules/station')),
//     icon: asyncComponent(() => import('@ant-design/icons/PicCenterOutlined')),
//     exact: true,
//     meta: { role: [2, 3] },
//     children: [
//       {
//         path: '/station/detail/:id',
//         name: '车站详情',
//         component: asyncComponent(() => import('@/modules/station/detail')),
//       },
//     ],
//   },
//   {
//     path: '/system',
//     name: '系统管理',
//     meta: { role: [1, 2] },
//     icon: asyncComponent(() => import('@ant-design/icons/SettingOutlined')),
//     exact: true,
//     children: [
//       {
//         path: '/system/user',
//         name: '用户管理',
//         component: asyncComponent(() => import('@/modules/system/user')),
//       },
//       {
//         path: '/system/company',
//         name: '公司管理',
//         meta: { role: [1] },
//         component: asyncComponent(() => import('@/modules/system/company')),
//       },
//       // {
//       //   path: "/system/journal",
//       //   name: "操作日志",
//       //   component: asyncComponent(() => import("@/modules/system/journal")),
//       // },
//     ],
//   },
// ]

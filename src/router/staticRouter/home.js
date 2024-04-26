const homeRouter = [
  {
    name: 'home',
    path: '/*',
    component: () => import('../../pages/home'),
    redirect: { name: 'dashboard' },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: () => import('../../pages/home/dashboard'),
      },
      {
        name: 'equipmentManage',
        path: '/equipmentManage',
        component: () => import('../../pages/home/equipmentManage'),
      },
      {
        name: 'equipmentDetail',
        path: '/equipment/:id',
        component: () => import('../../pages/home/equipmentManage/detail'),
      },
      {
        name: 'carManage',
        path: '/carManage',
        component: () => import('../../pages/home/carManage'),
      },
      {
        name: 'scheduleManage',
        path: '/scheduleManage',
        component: () => import('../../pages/home/scheduleManage'),
      },
      {
        name: 'warningManage',
        path: '/warningManage',
        component: () => import('../../pages/home/warningManage'),
      },
      {
        name: 'configManage',
        path: '/configManage',
        component: () => import('../../pages/home/configManage'),
      },
      {
        name: 'userManage',
        path: '/userManage',
        component: () => import('../../pages/home/userManage'),
      },
    ],
  },
]

export default homeRouter

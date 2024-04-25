import Home from './home'

const staticRouter = [
  {
    name: 'login',
    path: '/login',
    component: () => import('../../pages/login'),
  },
  {
    name: 'permissionDeny',
    path: '/permission-deny',
    component: () => import('../../pages/permissionDeny'),
  },
  ...Home,
]

export default staticRouter

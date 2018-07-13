import service from '@/main/platformManage/service'
import serviceEdit from '@/main/platformManage/serviceEdit'

export default[
  {
    name:"platformManage",
    path: 'platformManage',
    component: service,
    children:[
      {
        path: 'edit',
        component: serviceEdit,
      }
    ]
  },
]

import putInStorage from '@/main/warehouse/putInStorage'
import putInStorageEdit from '@/main/warehouse/putInStorageEdit'

export default[
    {
      name:"putInStorage",
      path: 'putInStorage',
      component: putInStorage,
      children:[
        {
          path: 'edit',
          component: putInStorageEdit,
        }
      ]
    },
]

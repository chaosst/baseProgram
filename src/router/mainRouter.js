import message from '@/main/basic/message'
import userInfo from '@/main/basic/userInfo'
import indexPage from '@/main/basic/indexPage'

export default[
  {
    path: '',
    component: indexPage
  },
  {
    path: 'index',
    component: indexPage
  },
  {
    path: 'message',
    component: message,
  },
  {
    path: 'userInfo',
    component: userInfo,
  }
]

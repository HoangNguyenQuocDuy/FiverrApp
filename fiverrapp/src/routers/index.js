import routers from '../configs/routers'
import Home from '../pages/home/Home'
import AddGigs from '../pages/addGig/AddGig'
import Gigs from '../pages/gigs/Gigs'
import Login from '../pages/login/Login'
import Messages from '../pages/messages/Messages'
import Message from '../pages/message/Message'
import MyGigs from '../pages/myGigs/MyGigs'
import Orders from '../pages/orders/Orders'
import Register from '../pages/register/Register'
import Gig from '../pages/gig/Gig'

const publicRoutes = [
    {path: routers.home, component: Home},
    {path: routers.addNewGigs, component: AddGigs},
    {path: routers.orders, component: Orders},
    {path: routers.register, component: Register},
    {path: routers.login, component: Login},
    {path: routers.gigs, component: Gigs},
    {path: routers.gig, component: Gig},
]

const privateRoutes = [
    {path: routers.messages, component: Messages},
    {path: routers.message, component: Message},
    {path: routers.myGigs, component: MyGigs},
]

export { publicRoutes, privateRoutes } 
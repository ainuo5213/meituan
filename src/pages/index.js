import Loadable from 'react-loadable'
import {Loading} from '../components'

const Index = Loadable({
    loader: () => import('./index/index'),
    loading: Loading,
});

const Profile = Loadable({
    loader: () => import('./profile'),
    loading: Loading,
});

const Order = Loadable({
    loader: () => import('./order'),
    loading: Loading,
});

const ShopCar = Loadable({
    loader: () => import('./shoppingCart'),
    loading: Loading,
});
export {
    Index,
    Order,
    ShopCar,
    Profile
}
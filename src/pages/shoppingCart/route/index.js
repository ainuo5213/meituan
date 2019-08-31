import Comment from '../comment'
import Menu from '../menu'
import Restaurant from '../restaurant'

export const route = [
    {
        pathname: '/shop/comment',
        component: Comment
    },
    {
        pathname: '/shop/restaurant',
        component: Restaurant
    },
    {
        pathname: '/shop/menu',
        component: Menu
    },
];
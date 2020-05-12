const menuListData = [
    {
        title: '菜品管理',
        entryCode: '1',
        icon: 'ProfileOutlined',
        items: [{
            title: '我的菜品',
            entryCode: '1-1',
            component: 'FoodSet',
            role: '2'
        }],
    },
    {
        title: '订单管理',
        entryCode: '2',
        icon: 'FileTextOutlined',
        items: [{
            title: '我的订单',
            entryCode: '2-1',
            component: 'MyOrder',
            role: '2'
        }]
    },
    {
        title: '店铺管理',
        icon: 'ShopOutlined',
        items: [{
            title: '店铺设置',
            entryCode: '3-1',
            component: 'ShopSet',
            role: '2'
        }]
    },
    {
        title: '用户信息',
        entryCode: '4',
        icon: 'UsergroupDeleteOutlined',
        items: [{
            title: '用户管理',
            entryCode: '4-1',
            component: 'UserManagement',
            role: '1'
        }]
    },
]
export default menuListData
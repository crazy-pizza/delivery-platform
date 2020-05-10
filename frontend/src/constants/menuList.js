const menuListData = [
    {
        title: '菜品信息',
        entryCode: '1',
        icon: 'VerifiedOutlined',
        items: [{
            title: '菜品管理',
            entryCode: '1-1',
            component: 'FoodSet',
        }],
    },
    {
        title: '库存管理',
        entryCode: '2',
        icon: 'FileTextOutlined',
        items: [{
            title: '库存查询',
            entryCode: '2-1',
            component: 'BasicSetup',
        }]
    },
    {
        title: '订单管理',
        entryCode: '3',
        icon: 'AccountBookOutlined',
        items: [{
            title: '订单查询',
            entryCode: '3-1',
            component: 'MyOrder',
        }]
    },
]
export default menuListData
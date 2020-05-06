const menuListData = [
    {
        title: '账套管理',
        entryCode: '1',
        icon: 'AccountBookOutlined',
        items: [{
            title: '账套管理',
            entryCode: '1-1',
            component: 'AccountSet',
        }],
    },
    {
        title: '基础信息',
        entryCode: '2',
        icon: 'FileTextOutlined',
        items: [{
            title: '系统设置',
            entryCode: '2-1',
            component: 'BasicSetup',
        }, {
            title: '组织架构勾稽',
            entryCode: '2-2',
            component: 'Related-Org',
        }, {
            title: '组织与往来单位勾稽',
            entryCode: '2-3',
            component: 'Related-Org-Business',
        }, {
            title: '往来单位勾稽',
            entryCode: '2-4',
            component: 'Related-Business',
        }, {
            title: '会计科目',
            entryCode: '2-5',
            component: 'AccountingItems',
        }]
    },
    {
        title: '凭证生成',
        entryCode: '3',
        icon: 'VerifiedOutlined',
        items: [{
            title: '科目设置',
            entryCode: '3-1',
            component: 'SubjectSet',
        }, {
            title: '摘要设置',
            entryCode: '3-2',
            component: 'SummarySet',
        }, {
            title: '单据凭证生成',
            entryCode: '3-3',
            component: 'MakeVoucher',
        }]
    },
]
export default menuListData
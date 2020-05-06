const serviceUrl = {
    /* 账套管理 */
    updateFinanceAccount: '/account/updateFinanceAccount', // 修改账套
    insertFinanceAccount: '/account/insertFinanceAccount', // 添加账套
    deleteFinanceAccount: '/account/deleteFinanceAccount', // 删除账套
    addFinanceAccountOrg: '/account/addFinanceAccountOrg', // 添加账套组织
    deleteFinanceAccountOrg: '/account/deleteFinanceAccountOrg', // 删除账套组织
    queryFinanceAccountGroupID: '/account/queryFinanceAccountGroupID', // 查询集团账套信息
    queryFinanceAccountOrgByAccountID: '/account/queryFinanceAccountOrgByAccountID', // 根据ID查询组织

    /* 组织架构勾稽 */
    selectOrgs: '/org/selectOrgs', // 查询组织
    queryOrgRelatedFinance: '/org/queryOrgRelatedFinance', // 查询组织的财务设置
    addOrgRelatedFinance: '/org/addOrgRelatedFinance', // 保存组织和财务的关系
    queryOrgFinance: '/org/queryOrgFinance', // 查询财务系统的部门

    /* 往来单位勾稽 */
    querySupplierCategory: '/supplier/querySupplierCategory', // 查询供应商分类 ??
    querySupplier: '/supplier/querySupplier', // 查询供应商
    addSupplierRelatedCompany: '/supplier/addSupplierRelatedCompany', // 添加供应商往来单位关系
    queryRelatedCompany: '/supplier/queryRelatedCompany', // 查看往来单位

    /* 摘要设置 */
    queryFinanceAbstractRemark: '/remark/queryFinanceAbstractRemark', // 查询摘要
    insertFinanceAbstractRemark: '/remark/insertFinanceAbstractRemark', // 添加（修改）摘要
    
    /* 会计科目 */
    queryFinanceSubjectList: '/financeSubject/queryFinanceSubjectList', // 查询财务科目
    syncRemote: '/financeSubject/syncRemote', // 同步财务科目

    /* 科目设置 */
    queryFinanceSubjectCategory: '/subjectCategory/queryFinanceSubjectCategory', // 查询科目类别
    queryFinanceSubjectCategorySetting: '/subjectCategory/queryFinanceSubjectCategorySetting', // 查询科目类别详情及扩展设置
    updateFinanceSubjectCategorySetting: '/subjectCategory/updateFinanceSubjectCategorySetting', // 更新扩展设置
    addFinanceSubjectCategoryDetail: '/subjectCategory/addFinanceSubjectCategoryDetail', // 添加对应科目

    /* 查询品项 */
    queryGoodsCateogry: 'goods/queryGoodsCateogry', // 查询品项类别
    queryGoods: '/goods/queryGoods', // 查询品项
}
export default serviceUrl
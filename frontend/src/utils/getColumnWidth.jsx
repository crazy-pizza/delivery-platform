/* sc统一列宽配置
* 总体思想： 命名字母尽量少，并且容易明白，作为常规列宽（不同的列宽名，但是其实是同样的列宽）的快捷方式； 不同类的加以显著区别，方便快速选择，如width:95，相关命名
* http://wiki.hualala.com/pages/viewpage.action?pageId=13928933 依据 第一个表，相关规范全部定义在下 20190711
＊ charsNum[Number] 所有操作的总字数； actionsNum[Number] 操作数量；
*/
export function getColumnWidth(param, charsNum = 0, actionsNum = 2) {
    let width = 0
    switch (param) {
        case 'name': // 品项名称，相关：成套件名称、配件名称、模板名称
        case 'invoiceType': // 发票类型
            width = 142
            break
        case 'supplier': // 供应商, 相关 组合的配送门店
        case 'stock': // 仓库, 相关 中心仓库/加工间/档口/仓位/领用仓位/归属领料档口
        case 'remark': // 备注
            width = 262
            break
        case 'spec': // 规格，相关 规格、程序版本
        case 'person': // 创建人, 相关 联系人
            width = 82
            break
        case 'price': // 单价，相关 金额、单价、售价、成本、毛利 包含2为小数
        case 'date': // 日期, 相关 发生日期/采购日期  显示用短横线隔开例如2017-08-20
        case 'num': // 数量 包含2为小数
        case 'tel': // 电话
        case 'rate': // 毛利率, 相关 毛利率、差异率 包含2为小数
            width = 95
            break
        case 'abbr': // 助记码
        case 'code': // 编码， 相关 店铺、单据、品项编码
            width = 124
            break
        case 'dateAndTime': // 创建时间 精确到秒 如2019-07-11 08:59:59
            width = 138
            break
        case 'time2': // 时间（时:分），两个不同时间单位组合的， 如时分,10:10
            width = 70
            break
        case 'voucherType': // 单据类型／收货单类型
            width = 90
            break
        case 'action': // 操作－－不固定
            width = 24 + (charsNum * 12) + ((actionsNum - 1) * 10)
            break
        case 'action2': // 操作 2个字
        case 'status2': // 状态 2个字
            width = 50
            break
        case 'status3': // FixDataTable表头换成两行，针对8个中文字符
            width = 80
            break
        case 'status4': // FixDataTable表头换成两行，针对14个中文字符
            width = 110
            break
        case 'categoryName': // 类型名称
        case 'status': // 状态，相关 业务状态/订单状态/差异状态/盘点状态/是否在线 容器、集货位、库区、库存
            width = 94
            break
        case 'shopName': // 门店名称， 相关 订货仓位等、货主、订货组织、客退组织; 店铺名称， 相关 部门  规范中22与34合并在此
        case 'accountEntityName': // 账务主体名称
        case 'routeName': // 路线名称
            width = 202
            break
        case 'index': // 序号
        case 'unit2': // 单位
            width = 70
            break
        case 'unit': // xx单位，如辅助单位
            width = 70
            break
        case 'type': // 类型, 相关 货架类型、区域类型、容器类型、业务类型
            width = 90
            break
        case 'otherPayType': // 其他应付款类型
            width = 45
            break
        case 'orderNum': // 单号 如订单号，采购单号 --order（订单）
            width = 120
            break
        case 'taxRate': // 税率
            width = 66
            break
        case 'address': // 地址
            width = 180
            break
        default:
            // eslint-disable-next-line no-console
            console.log('不存在相应类型:', param, '请选择或添加正确的类型')
            break
    }
    return width
}
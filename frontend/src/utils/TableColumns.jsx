/* 注意： 请从同级的index.jsx文件中引用此片定义方法 */

// table中共用处理函数
/*
    @personName string // '王三'
    @timeStr string // '20190124182010'
    eg:
    创建人/创建时间 hww/2019-1-24 18:20:10
*/
export const getPersonAndTime = (personName, timeStr) => {
    const reg = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
    const rstTime = timeStr.replace(reg, '$1-$2-$3 $4:$5:$6')
    return `${personName} / ${rstTime}`
}

// 计算整张表的列宽宽度之和
export function getTableTotalWidth(cols = []) {
    let width = 0
    function loops(columns = []) {
        columns.map((item) => {
            if (item.children) {
                loops(item.children)
            } else if (item.width) {
                width += parseInt(item.width, 10)
            } else {
                width += 100
            }
            return null
        })
    }
    loops(cols)
    return width
}

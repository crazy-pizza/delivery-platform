import React, { useState } from 'react'
import styles from './bill.module.css'
import { SCAntdTable } from '@components'
import moment from 'moment'
// {
//     "beginTime": 0,
//     "endTime": 0,
//     "foodID": 0,
//     "merchantID": 0,
//     "sumNum": 0,
//     "time": 0,
//     "timeDigit": 0
// }
const OrderReportTable = ({
    dataSource,
}) => {
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: 60,
        }, {
            title: '菜品名称',
            dataIndex: 'foodName',
            width: 160,
            ellipsis: true,
            render: (text, record) => record.food.foodName
        }, {
            title: '总销量',
            width: 120,
            dataIndex: 'sumNum',
        }, {
            title: '时间',
            dataIndex: 'time',
            render: text => String(text).length === 8 ? moment(text, 'YYYYMMDD').format('YYYY-MM-DD') : moment(text, 'YYYYMM').format('YYYY-MM')
        }
    ]

    return (
        <div>
            <div style={{ width: '600px' }}>
                <SCAntdTable
                    rowKey="foodID"
                    columns={columns}
                    dataSource={dataSource}
                    isPagination={false}
                    onRow={(record, index) => {
                        return {
                            onClick: (e) => {
                                setSelectedRowIndex(index)
                            },
                        }
                    }}
                    rowClassName={(record, index) => {
                        return index === selectedRowIndex ? styles.rowSelectedBg : ''
                    }}
                />
            </div>
        </div>
    )
}

export default OrderReportTable

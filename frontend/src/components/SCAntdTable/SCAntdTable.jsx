import React, { Component } from 'react'
import { Table } from 'antd'

export default class SCAntdTable extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {
            columns,
            dataSource,
            total,
            footer,
            pageSizeChange = () => {},
            currentChange = () => {},
            pageSize,
            current,
            onRowDoubleClick,
            isPagination = true,
            ...otherProps
        } = this.props

      
        return (
            <div>
                {columns.length ?
                    <Table
                        bordered
                        size="small"
                        columns={columns}
                        rowKey={(record, index) => index}
                        dataSource={dataSource}
                        pagination={isPagination ? {
                            position: ['bottomLeft'],
                            pageSize,
                            showQuickJumper: true,
                            showSizeChanger: true,
                            current,
                            onShowSizeChange: pageSizeChange,
                            onChange: currentChange,
                            total,
                            showTotal: (total, range) => `本页 ${range[0]}-${range[1]} / 共 ${total} 条`,
                        } : false}
                        {...otherProps}
                    />
                    : null
                }
            </div>
        )
    }
}

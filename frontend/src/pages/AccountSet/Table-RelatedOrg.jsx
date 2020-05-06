import React from 'react'
import styles from './accountSet.module.css'
import { SCAntdTable } from '@components'
// import { data } from './MockData'

class RelatedOrgTable extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
                width: 60,
            }, {
                title: '组织编码',
                dataIndex: 'orgCode',
                width: 220,
            }, {
                title: '组织名称',
                dataIndex: 'orgName',
                ellipsis: true,
            }
        ]
    }

    render = () => {
        const { dataSource: data } = this.props
        return (
            <div>
                <div className={styles['list-prefix']}>哗啦啦组织架构</div>
                <div style={{ width: '560px' }}>
                    <SCAntdTable
                        rowKey="orgCode"
                        scroll={{ y: 260 }}
                        columns={this.columns}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}

export default RelatedOrgTable
import React, { useState } from 'react'
import { Row, Col, Button, Spin, message } from 'antd'
import { SelectAccountset } from '@components'
import { serviceUrl } from '@constants'
import { useAxiosFetch } from '@hooks'
import { axiosFetch } from '@utils'
import SummarySetTable from './SummarySetTable'

const SummarySet = () => {
    const [currentAccount, setCurrentAccount] = useState({}) // 当前选中帐套

    const { data: summaryData } = useAxiosFetch({
        api: serviceUrl.queryFinanceAbstractRemark,
        params: { accountID: currentAccount.id },
        depend: currentAccount.id,
    })

    const onSave = () => {
        axiosFetch({
            api: serviceUrl.insertFinanceAbstractRemark,
            params: { accountID: currentAccount.id, data: summaryData }
        }).then(() => {
            message.success('已保存')
        })
    }

    const onRecordChange = (index, key, value) => {
        summaryData[index][key] = value
    }

    return (
        <Row className="layoutsContainer">
            <Col span={24} className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>摘要设置</h1>
                    </div>
                    <div className="layoutsToolRight">
                        <Button onClick={onSave} type="primary">保存</Button>
                    </div>
                </div>
                <div className="layoutsLine"></div>
                <div className="layoutsSearch">
                    <SelectAccountset
                        onChange={(data) => { setCurrentAccount(data) }}
                        search={() => { console.log(currentAccount) }}
                    />
                </div>
            </Col>
            <Col span={24} className="layoutsLineBlock"></Col>
            <Col span={24} className="layoutsContent">
                <SummarySetTable
                    onRecordChange={onRecordChange}
                    dataSource={summaryData}
                />
            </Col>
        </Row>
    )
}

export default SummarySet
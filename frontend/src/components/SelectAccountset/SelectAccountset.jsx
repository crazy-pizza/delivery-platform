import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { axiosFetch } from '@utils'
import { serviceUrl } from '@constants'

const { Option } = Select

const SelectAccountset = (props) => {
    const { onChange = () => {}, search } = props
    const [accountset, setAccountset] = useState([])
    useEffect(() => {
        axiosFetch({
            api: serviceUrl.queryFinanceAccountGroupID,
            params: {},
        }).then(res => {
            setAccountset(res)
        })
    }, [])

    const onChangeSelect = (id) => {
        if (id) {
            const record = accountset.find(a => a.id === id)
            onChange(record)
        } else {
            onChange({})
        }
    }

    return (
        <Row display="flex" justify="start" align="middle">
            <Col flex='0 1 auto'>
                <span>账套</span>&nbsp;&nbsp;
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择账套"
                    optionFilterProp="children"
                    onChange={onChangeSelect}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        accountset.map(item => <Option key={item.id} value={item.id}>{item.accountName}</Option>)
                    }
                </Select>
            </Col>
            <Col flex='0 1 auto'>
                <Button className="ml20" icon={<SearchOutlined />} type="primary" onClick={search}>查询</Button>
            </Col>
        </Row>
    )
}
export default SelectAccountset

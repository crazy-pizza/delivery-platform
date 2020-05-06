import React, { useState, useEffect, useReducer } from 'react'
import { Row, Col, Space, Button, Select, message, Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { SCAntdTable, SelectAccountset } from '@components'
import { getColumnWidth, getTableTotalWidth, axiosFetch } from '@utils'
import { serviceUrl } from '@constants'

const { Option } = Select;

const OPTION_TABLE_KEY = 'subjectCode'

const AccountingItems = () => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: getColumnWidth('index'),
            fixed: true,
        }, {
            title: '级次',
            dataIndex: 'level',
            width: getColumnWidth('index'),
            fixed: true,
        }, {
            title: '科目编码',
            dataIndex: OPTION_TABLE_KEY,
            width: getColumnWidth('code'),
        }, {
            title: '科目名称',
            dataIndex: 'subjectName',
            width: getColumnWidth('name'),
            render: (text, record) => {
                const level = Number(record.level)
                return <span style={{ 'marginLeft': (level - 1) * 10 }}>{text}</span>
            }
        }, {
            title: '科目类型',
            dataIndex: 'subjectType',
            width: getColumnWidth('type'),
        }, {
            title: '余额方向',
            dataIndex: 'direction',
            width: getColumnWidth('status'),
            render: (text) => {
                return Number(text) === 1 ? '贷' : '借'
            },
        }, {
            title: '辅助核算项',
            dataIndex: 'auxiliary',
            width: getColumnWidth('name'),
        }, {
            title: '状态',
            dataIndex: 'status',
            width: getColumnWidth('status'),
            render: (text, record) => {
                return Number(text) === 1 ? '启用' : '禁用'
            },
        }
    ]
    const [loading, setLoading] = useState(false)
    const [accountset, setAccountset] = useState(undefined)
    const [accountingItems, setAccountingItems] = useState([]) // 对应节点 科目列表
    const [filterVal, setFilterVal] = useState('') // 当前具体科目id
    const [search, setSearch] = useState(accountset)
    const [sync, setSync] = useState(accountset)
    const [ignored, forceUpdate] = useReducer(count => count + 1, 0)

    // 查询财务科目
    const getAccountingItems = (accountset, msg = '') => {
        axiosFetch({
            api: serviceUrl.queryFinanceSubjectList,
            params: {
                accountID: accountset,
            },
        }).then((res) => {
            msg && message.success(msg)
            setAccountingItems(res)
        }).catch((err) => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!search) return
        setLoading(true)
        getAccountingItems(search)
    }, [search, ignored])

    useEffect(() => {
        // 同步财务科目
        if (!sync) return
        setLoading(true)
        axiosFetch({
            api: serviceUrl.syncRemote,
            params: {
                accountID: sync,
            },
            path: '',
        }).then(() => {
            // 同步成功
            // 获取最新数据
            getAccountingItems(sync, '同步成功')
        }).catch(() => {
            setLoading(false)
            message.warning('同步失败!')
        })
    }, [sync, ignored])

    useEffect(() => {
        setLoading(false) // loading 有没有更好的处理方式? TODO:
    }, [accountingItems])

    let tableAccountingItems = accountingItems
    if (filterVal) {
        tableAccountingItems = accountingItems.filter(item => item[OPTION_TABLE_KEY] === filterVal.split(',')[0])
    }
    const accountTipAndRst = () => {
        if (!accountset) {
            message.warning('请先选择账套!')
            return true
        }
        return false
    }
    const tableTotalWidth = getTableTotalWidth(columns)

    return (
        <Spin size="large" spinning={loading}>

            <Row className="layoutsContainer">
                <Col span={24} className="layoutsHeader">
                    <div className="layoutsTool">
                        <div className="layoutsToolLeft">
                            <h1>会计科目</h1>
                        </div>
                        <div className="layoutsToolRight">
                            <Space>
                                <Button
                                    icon={<SyncOutlined />}
                                    onClick={() => {
                                        if (accountTipAndRst()) return
                                        forceUpdate()
                                        setSync(accountset)
                                    }}
                                    type="primary"
                                >同步会计科目</Button>
                            </Space>
                        </div>
                    </div>
                    <div className="layoutsLine"></div>
                    <div className="layoutsSearch">
                        <SelectAccountset
                            onChange={(value) => {
                                setAccountset(value.id)
                            }}
                            search={() => {
                                if (accountTipAndRst()) return
                                setSearch(accountset)
                            }}
                        />
                    </div>
                </Col>
                <Col span={24} className="layoutsLineBlock"></Col>
                <Col span={24} className="layoutsContent">
                    <Row className="flexNoWrap">
                        <Col flex='auto'>
                            <Row display="flex" align="middle">
                                <Col flex='none' className="mr10" style={{ minWidth: '84px' }}>会计科目搜索</Col>
                                <Col flex={'250px'}>
                                    <Select
                                        showSearch
                                        allowClear
                                        style={{ width: 200 }}
                                        placeholder="名称, 编码搜索"
                                        optionFilterProp="children"
                                        onChange={(value) => {
                                            if (!value) {
                                                setFilterVal(undefined)
                                                return
                                            }
                                            setFilterVal(value)
                                        }}
                                        value={filterVal}
                                        filterOption={(input, option) => {
                                            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }}
                                    >
                                        {
                                            accountingItems.map((item) => {
                                                return <Option key={item[OPTION_TABLE_KEY]} value={`${item[OPTION_TABLE_KEY]},${item.subjectName}`}>{item.subjectName}</Option>
                                            })
                                        }
                                    </Select>
                                </Col>
                            </Row>
                            <div className="mt20"></div>
                            <Row>
                                <Col span={24}>
                                    <SCAntdTable
                                        style={{ maxWidth: tableTotalWidth + 50 }}
                                        rowKey={OPTION_TABLE_KEY}
                                        scroll={{ y: 560 }}
                                        columns={columns}
                                        dataSource={tableAccountingItems}
                                        pagination={false}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Spin>
    )
}

export default AccountingItems
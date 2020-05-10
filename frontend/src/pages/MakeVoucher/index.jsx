import React from 'react'
import { Row, Col, Space, Button, Select, Input, DatePicker, message } from 'antd'
import { ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { SCAntdTable } from '@components'
import { getColumnWidth, getTableTotalWidth } from '@utils'
import './style.css'
import { res } from './mockTreeData.js'
const { Option } = Select;

class MakeVoucher extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            accountingItems: res.data.records, // 对应节点 科目列表
        }
        this.columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render: (text, record, index) => index + 1,
                width: getColumnWidth('index'),
                fixed: true,
            }, {
                title: '日期',
                dataIndex: 'level',
                width: getColumnWidth('date'),
                fixed: true,
            }, {
                title: '单据号',
                dataIndex: 'voucherNo',
                width: getColumnWidth('orderNum'),
            }, {
                title: '业务类型名称',
                dataIndex: 'column-4',
                width: getColumnWidth('name'),
            }, {
                title: '入库组织名称',
                dataIndex: 'column-5',
                width: getColumnWidth('supplier'),
            }, {
                title: '供应商名称',
                dataIndex: 'column-6',
                width: getColumnWidth('name'),
            }, {
                title: '金额合计',
                dataIndex: 'column-7',
                width: getColumnWidth('num'),
            }
        ]
    }
    componentDidMount() {
    }
    hanldeOnSelect = (selectedKeys, e) => {
        console.log({ selectedKeys, e })
        const { selectedKey } = this.state
        const newSelectedKey = selectedKeys[0]
        if (selectedKey === newSelectedKey) return

        const selectedNode = e.node
        if (e.selected && !selectedNode.children) {
            this.getAccountingItems(selectedNode)
        }
    }
    search = () => {
        const { accountset } = this.state
        if (!accountset) {
            message.warning('请先选择菜品!')
            return
        }
    }
    onChangeDate = (date, dateString) => {
        console.log(date, dateString)
    }
    render = () => {
        const { accountingItems } = this.state
        let tableAccountingItems = accountingItems
        const tableTotalWidth = getTableTotalWidth(this.columns)
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User',
              // Column configuration not to be checked
              name: record.name,
            }),
          }
        console.log('tableTotalWidth::', tableTotalWidth)
        return (
            <Row className="layoutsContainer">
                <Col span={24} className="layoutsHeader">
                    <div className="layoutsTool">
                        <div className="layoutsToolLeft">
                            <h1>单据凭证生成</h1>
                        </div>
                        <div className="layoutsToolRight">
                            <Space>
                                <Button icon={<ProfileOutlined />} onClick={this.addAccountSet} type="primary">生成凭证</Button>
                            </Space>
                        </div>
                    </div>
                    <div className="layoutsLine"></div>
                    <div className="layoutsSearch">
                        <Row display="flex" justify="start" align="middle" className="searchWrapper">
                            <Col>
                                <span>单据类型</span>&nbsp;&nbsp;
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择类型"
                                    optionFilterProp="children"
                                    // onChange={onAccountsetChange}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        [].map((item) => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col>
                                <span>日期</span>&nbsp;&nbsp;
                                <DatePicker
                                    // style={{ width: 200 }}
                                    placeholder="请选择类型"
                                    onChange={this.onChangeDate}
                                />
                                &nbsp;&nbsp;-&nbsp;&nbsp;
                                <DatePicker
                                    // style={{ width: 200 }}
                                    placeholder="请选择类型"
                                    // onChange={onAccountsetChange}
                            
                                />
                            </Col>
                            <Col>
                                {/* 加上宽度后,就上下对齐了原因不知道 */}
                                <span>单据号</span>&nbsp;&nbsp;
                                <Input placeholder="请输入单据号"  style={{ width: 200 }} />
                            </Col>
                            <Col>
                                <span>入库组织</span>&nbsp;&nbsp;
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择入库组织"
                                    optionFilterProp="children"
                                    // onChange={onAccountsetChange}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        [].map((item) => {
                                            return <Option key={item.id} value={item.id}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col>
                                <span>供应商</span>&nbsp;&nbsp;
                                <Input placeholder="请输入供应商" style={{ width: 200 }} />
                            </Col>
                            <Col>
                                <span>备注</span>&nbsp;&nbsp;
                                <Input placeholder="请输入备注" style={{ width: 200 }} />
                            </Col>
                            <Col>
                                <span>凭证生成状态</span>&nbsp;&nbsp;
                                <Select
                                    style={{ width: 200 }}
                                    placeholder="请选择状态"
                                    // onChange={onAccountsetChange}
                                >
                                    <Option key="0" value={0}>全部</Option>
                                    <Option key="1" value={1}>是</Option>
                                    <Option key="2" value={2}>否</Option>
                                </Select>
                            </Col>
                            <Col>
                                <Button className="ml20" icon={<SearchOutlined />} type="primary" onClick={this.search}>查询</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={24} className="layoutsLineBlock"></Col>
                <Col span={24} className="layoutsContent">
                    <Row className="flexNoWrap">
                        <Col span={24}>
                            <SCAntdTable
                                style={{ maxWidth: tableTotalWidth }}
                                rowKey="id"
                                rowSelection={{
                                    type: 'checkbox',
                                    ...rowSelection,
                                }}
                                // scroll={{ x: tableTotalWidth, y: 260 }}
                                columns={this.columns}
                                dataSource={tableAccountingItems}
                                pagination={false}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default MakeVoucher
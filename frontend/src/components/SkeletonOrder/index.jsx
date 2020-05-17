import React, { useEffect } from 'react'
import { useParams, withRouter, Switch, Route } from "react-router-dom"
import { Layout, Menu } from 'antd'
import { Link } from "react-router-dom"
import { Icon } from '@components'
import Order from './Order'
import Bill from './Bill'
import My from './My'
import ShopFoodDetail from './ShopFoodDetail'

const { Header, Content, Sider } = Layout

const SkeletonOrder = (props) => {
    const { code } = useParams()
    // const [collapsed, setCollapsed] = useState(false)
    useEffect(() => {
        
    }, [code])

    return (
        <Layout style={{ height: '100%' }}>
            <Sider>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<Icon name="ThunderboltOutlined" />}>
                    <Link to={`/order/order`}>我要订餐</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<Icon name="FileTextOutlined" />}>
                    <Link to={`/order/bill`}>查看订单</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<Icon name="UserOutlined" />}>
                    <Link to={`/order/my`}>我的设置</Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Content style={{ overflowY: 'scroll' }}>
                <Header></Header>
                <Switch>
                    <Route exact path="/order/order">
                        <Order />
                    </Route>
                    <Route exact path="/order/detail">
                        <ShopFoodDetail />
                    </Route>
                    <Route exact path="/order/bill">
                        <Bill />
                    </Route>
                    <Route exact path="/order/my">
                        <My />
                    </Route>
                </Switch>
            </Content>
        </Layout>
    )
}

export default withRouter(SkeletonOrder)
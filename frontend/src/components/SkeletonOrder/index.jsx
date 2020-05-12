import React, { useEffect } from 'react'
import { useParams, withRouter, Switch, Route } from "react-router-dom"
import { Layout, Row, Col } from 'antd'
import { Icon } from '@components'
import Order from './Order'
import Bill from './Bill'
import My from './My'
import ShopFoodDetail from './ShopFoodDetail'
import styles from './skeletonOrder.module.css'

const { Header, Footer, Content } = Layout

const SkeletonOrder = (props) => {
    const { code } = useParams()

    useEffect(() => {
        
    }, [code])

    const jumpRouter = (route) => {
        props.history.replace(`/order/${route}`)
    }

    return (
        <Layout style={{ height: '100%' }}>
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
            <Footer style={{ padding: '5px' }}>
                <Row className={styles.rowNav}>
                    <Col className={styles.colNav} span={8}>
                        <dl onClick={() => { jumpRouter('order') }} className={styles.dlNav}>
                            <dt><Icon name="ThunderboltOutlined" /></dt>
                            <dd>订餐</dd>
                        </dl>
                    </Col>
                    <Col className={styles.colNav} span={8}>
                        <dl onClick={() => { jumpRouter('bill') }} className={styles.dlNav}>
                            <dt><Icon name="FileTextOutlined" /></dt>
                            <dd>订单</dd>
                        </dl>
                        
                    </Col>
                    <Col className={styles.colNav} span={8}>
                        <dl onClick={() => { jumpRouter('my') }} className={styles.dlNav}>
                            <dt><Icon name="UserOutlined" /></dt>
                            <dd>我的</dd>
                        </dl>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    )
}

export default withRouter(SkeletonOrder)
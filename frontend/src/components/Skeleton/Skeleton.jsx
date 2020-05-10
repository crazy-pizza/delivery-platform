import React, { useState, useEffect } from 'react'
import { Layout, Button } from 'antd';
import { useParams, useHistory } from "react-router-dom"
import { Icon } from '@components'
import { getEntry } from '@utils'
import MenuUser from './MenuUser'
import MenuList from './MenuList'
import Home from './Home'
import TabList from './TabList'

const { Header, Sider, Content } = Layout

const Skeleton = () => {
    const { code } = useParams()
    const history = useHistory()
    const [collapsed, setCollapsed] = useState(false)
    const [activeTabKey, setActiveKey] = useState(code)
    const [panes, setPanes] = useState([])

    useEffect(() => {
        if (code === 'home') return
        const entry = getEntry(code)
        const isAdd = !panes.some(p => p.entryCode === entry.entryCode)

        if (isAdd) { setPanes([ ...panes, entry ]) }
        setActiveKey(entry.entryCode) // update active tab key
        history.replace(`/index/${entry.entryCode}`) // update router
    }, [code])

    const onRemoveTab = (tabKey, action) => {
        let lastTabKey = ''
        const newPanes = panes.filter(p => p.entryCode !== tabKey)
        if (newPanes.length) {
            lastTabKey = newPanes[newPanes.length - 1].entryCode
        } else {
            lastTabKey = 'home'
        }
        history.replace(`/index/${lastTabKey}`)
        setPanes(newPanes)
        setActiveKey(lastTabKey)
    }

    const onChangeTab = (tabKey) => {
        history.replace(`/index/${tabKey}`)
        setActiveKey(tabKey)
    }

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout style={{ height: '100%' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <MenuUser />
                <MenuList />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background">
                    <Button
                        type="primary"
                        icon={collapsed ?
                            <Icon name="MenuUnfoldOutlined" />
                            :
                            <Icon name="MenuFoldOutlined" />
                        }
                        onClick={toggle}
                    ></Button>
                </Header>
                <Content
                    id="main-content"
                    className="site-layout-background"
                    style={{ padding: '0', overflow: 'hidden'}}
                >
                    {
                        panes.length ?
                        <TabList
                            style={{ 'height': '600px', 'background': '#f66' }}
                            panes={panes}
                            onChangeTab={onChangeTab}
                            activeTabKey={activeTabKey}
                            onRemoveTab={onRemoveTab}
                        /> : <Home />
                    }
                </Content>
            </Layout>
        </Layout>
    ) 
}

export default Skeleton
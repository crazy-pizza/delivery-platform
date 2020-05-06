import React, { useState } from 'react'
import { Tabs } from 'antd'
import { BasicPage } from '@components'
import { useEffect } from 'react'
import { debounce } from 'lodash'

const { TabPane } = Tabs

const TabList = (props) => {
    const { onChangeTab, activeTabKey, onRemoveTab, panes = [] } = props
    const [paneHeight, setPaneHeight] = useState('600')
    const renderTabBar = (props, DefaultTabBar) => {
        return (
            <DefaultTabBar {...props} style={{ margin: 0 }} />
        )
    }

    useEffect(() => {
        const resizeHandler = debounce(() => {
            const mainContent = document.querySelector('#main-content')
            if (!mainContent) return
            const tabPageHeight = mainContent.offsetHeight - 40 // #main-content(不固定高)- tab的40px 
            setPaneHeight(tabPageHeight)
        }, 400)

        resizeHandler()
        
        window.addEventListener('resize', resizeHandler)
        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <Tabs
            hideAdd
            animated={false}
            onChange={onChangeTab}
            activeKey={activeTabKey}
            type="editable-card"
            onEdit={onRemoveTab}
            renderTabBar={renderTabBar}
        >
            {
                panes.map(page => {
                    const isCurrent = activeTabKey === page.entryCode
                    return (
                        <TabPane style={{ 'height': `${isCurrent ? paneHeight : 0}px`, 'overflow': 'auto' }} tab={page.title} key={page.entryCode}>
                            <BasicPage {...page} />
                        </TabPane>
                    )
                })
            }
        </Tabs>
    )
}

export default TabList

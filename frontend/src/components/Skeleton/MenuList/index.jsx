import React from 'react'
import { Menu } from 'antd'
import { menuListData } from '@constants'
import { Icon } from '@components'
import { Link } from "react-router-dom"

const { Item, SubMenu } = Menu

const MenuList = () => {
    const renderMenuList = () => (
        menuListData.map(menu => {
            const { entryCode, items, icon = 'QuestionOutlined', title } = menu
            if (items.length) {
                return (
                    <SubMenu
                        key={entryCode}
                        title={<span><Icon name={icon} /><span>{title}</span></span>}
                    >
                        {
                            items.map(m => (
                                <Item key={m.entryCode}>
                                    <Link to={`/index/${m.entryCode}`} replace>{m.title}</Link>
                                </Item>
                            ))
                        }
                    </SubMenu>
                )
            }

            return (
                <Item key={entryCode}>
                    <span>
                        <Link to={`/index/${entryCode}`}>{title}</Link>
                    </span>
                </Item>
            )
        })
    )

    return (
        <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed={true}
            // defaultSelectedKeys={[code]}
            // defaultOpenKeys={[code]}
        >
            {renderMenuList()}
        </Menu>
    )
}

export default MenuList

import React from 'react'
import { Menu } from 'antd'
import { menuListData } from '@constants'
import { useMappedState } from 'redux-react-hook'
import { Icon } from '@components'
import { Link } from "react-router-dom"

const { Item, SubMenu } = Menu

const MenuList = () => {
    const role = useMappedState($$state => $$state.user.role)

    const renderMenuList = () => (
        menuListData.map(menu => {
            const { entryCode, items, icon = 'QuestionOutlined', title } = menu
            if (items.length) {

                if (items.filter(m => m.role === role).length === 0) return null

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

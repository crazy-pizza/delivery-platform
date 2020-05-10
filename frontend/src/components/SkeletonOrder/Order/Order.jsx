import React, { useEffect, useState } from 'react'
import { useDispatch } from 'redux-react-hook'
import { withRouter } from "react-router-dom"
import { List, Avatar } from 'antd'
import { axiosFetch } from '@utils'
import { serviceUrl } from '@constants'

export const Order = (props) => {
    const [dataSource, setDataSource] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        axiosFetch({
            api: serviceUrl.userSelect,
            params: { role: '2', pageSize: '500', pageNo: '1' },
        }).then((res) => {
            setDataSource(res.records)
        })
    }, [])

    const jumpShop = (id) => {

        dispatch({
            type: 'setUserInfo',
            payload: {
                currentShopUserID: id
            },
        })

        props.history.replace(`/order/detail`)
    }

    const getSrc = (filename) => {
        return filename ? `http://wcpay.ictry.com:5050/file/download?fileName=${filename}` : ''
    }

    return (
        <div style={{ width: '600px', margin: '0 auto' }}>
            <List
                itemLayout="horizontal"
                dataSource={dataSource}
                renderItem={item => (
                    <List.Item onClick={() => { jumpShop(item.userID) }}>
                        <List.Item.Meta
                            avatar={<Avatar shape="square" size="large" src={getSrc(item.headImage)} />}
                            title={<span>{item.userName}</span>}
                            description={''}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default withRouter(Order)

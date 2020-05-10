import React, { useEffect, useState } from 'react'
import { useMappedState } from 'redux-react-hook'
import { axiosFetch } from '@utils'
import { serviceUrl } from '@constants'
import FoodTable from './FoodTable'

export const ShopFoodDetail = () => {
    const [foodList, setFoodList] = useState([])
    const userID = useMappedState($$state => $$state.user.currentShopUserID)

    useEffect(() => {
        axiosFetch({
            api: serviceUrl.foodSelect,
            params: {
                userID,
                pageNo: 1,
                pageSize: 500,
            },
        }).then((res) => {
            res.records.forEach((food) => {
                food.foodNum = 0
            })
            setFoodList(res.records)
        })
    }, [])

    const updateNum = (type, index) => {
        if (type === 'add') {
            foodList[index].foodNum ++
        } else {
            if(foodList[index].foodNum > 0) {
                foodList[index].foodNum --
            }
        }
        setFoodList([ ...foodList ])
    }

    return (
        <div>
            <FoodTable
                updateNum={updateNum}
                dataSource={foodList}
            />
        </div>
    )
}
export default ShopFoodDetail
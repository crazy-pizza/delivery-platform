import React from 'react'
import PropTypes from 'prop-types'
import { useMappedState } from 'redux-react-hook'
import SelectBase from '../SelectBase'

const SelectGoodsCategory = ({ onChange, defaultValue = '' }) => {
    const goodsCategoryList = useMappedState($$state => $$state.goods.goodsCategory)

    const selectOnChange = (record) => {
        onChange && onChange(record)
    }

    return (
        <SelectBase
            key="categoryCode"
            label="categoryName"
            dataSource={goodsCategoryList}
            onChange={selectOnChange}
            defaultValue={defaultValue}
        />
    )
}

SelectGoodsCategory.propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
}

export default SelectGoodsCategory

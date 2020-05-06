import React from 'react'
import PropTypes from 'prop-types'
import { useMappedState } from 'redux-react-hook'
import SelectBase from '../SelectBase'

const SelectSupplierCategory = ({ onChange, defaultValue = '' }) => {
    const supplierCategoryList = useMappedState($$state => $$state.supplier.supplierCategory)

    const selectOnChange = (record) => {
        onChange && onChange(record)
    }

    return (
        <SelectBase
            keyname="categoryCode"
            label="categoryName"
            dataSource={supplierCategoryList}
            onChange={selectOnChange}
            defaultValue={defaultValue}
        />
    )
}

SelectSupplierCategory.propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
}

export default SelectSupplierCategory

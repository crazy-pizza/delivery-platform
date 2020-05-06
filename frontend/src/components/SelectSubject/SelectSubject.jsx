import React from 'react'
import PropTypes from 'prop-types'
import SelectBase from '../SelectBase'

const SelectSubject = (props) => {
    const { onChange, defaultValue = '', dataSource } = props

    const selectOnChange = (record) => {
        onChange && onChange(record)
    }

    return (
        <SelectBase
            style={{ width: '240px' }}
            keyname="subjectCode"
            label="subjectName"
            dataSource={dataSource}
            onChange={selectOnChange}
            defaultValue={defaultValue}
        />
    )
}

SelectSubject.propTypes = {
    dataSource: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
}

export default SelectSubject

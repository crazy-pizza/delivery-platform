import React, { useState, useEffect } from 'react'
import { Select, Tooltip } from 'antd'
import { groupBy } from 'lodash'

const { Option, OptGroup } = Select

/**
 * 固定数据下拉框
 * @param {Array} dataSource 
 * @param {String} keyname 
 * @param {String} label 
 * @param {Function} onChange 
 * @param {String} defaultValue 
 * @param {Object} groupKeyname 分组的依据
 * @param {Object} style 
 */

const SelectBase = ({
    dataSource,
    keyname,
    label,
    onChange,
    defaultValue = '',
    groupKeyname,
    groupLabel,
    style = { width: '100%' },
}) => {
    const [renderDom, setRenderDom] = useState([])
    
    const selectOnChange = (v) => {
        if (v) {
            const record = dataSource.find(item => String(item[keyname]) === v)
            onChange && onChange(record)
        } else {
            onChange && onChange({})
        }
    }

    const renderGroupSelectOption = () => {
        const temArr = []
        const mapData = groupBy(dataSource, groupKeyname)

        for (let [k, v] of Object.entries(mapData)) {
            const text = typeof groupLabel === 'function' ? groupLabel(k) : groupLabel
            temArr.push(
                <OptGroup
                    key={`orgType${k}`}
                    label={text}
                >
                    {
                        k === '0' ? v.map(i => 
                            (
                                <Option key={i[keyname]} value={String(i[keyname])}>
                                    {i[label]}
                                </Option>
                            )) : []
                    }
                </OptGroup>
            )
        }
        return temArr
    }

    const renderSelectOption = () => (
        dataSource.map(i => (
            <Option key={`i${i[keyname]}`} value={i[keyname]}>
                <Tooltip title={i[label]}>{i[label]}</Tooltip>
            </Option>
        ))
    )


    useEffect(() => {
        let renderDom = []
        if (groupKeyname) renderDom = renderGroupSelectOption()
        else renderDom = renderSelectOption()
        setRenderDom(renderDom)
    }, [dataSource])

    return (
        <Select
            showSearch
            style={style}
            onChange={selectOnChange}
            value={defaultValue}
            optionFilterProp="children"
            dropdownMatchSelectWidth={false}
        >{renderDom}</Select>
    )
}

export default SelectBase

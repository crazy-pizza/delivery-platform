import React from 'react'
import PropTypes from 'prop-types'
import SelectBase from '../SelectBase'
import { useMappedState } from 'redux-react-hook'
import { DEFAULT_ORG_TYPE } from '@constants'

const SelectOrg = (props) => {
    const { onChange, defaultValue = '' } = props
    const groupOrgList = useMappedState($$state => $$state.org.orgs)

    const selectOnChange = (record) => {
        onChange && onChange(record)
    }

    return (
        <SelectBase
            groupKeyname="orgTypeID"
            groupLabel={(k) => DEFAULT_ORG_TYPE[`${k}`]}
            keyname="orgID"
            label="orgName"
            dataSource={groupOrgList}
            onChange={selectOnChange}
            defaultValue={defaultValue}
        />
    )
}

SelectOrg.propTypes = {
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
}

export default SelectOrg

import * as antdIcon from '@ant-design/icons'
import React from 'react'

const Icon = ({ name = '', ...props }) => {
    const I = antdIcon[name]
    return <I {...props}/>
}

export default Icon
import { useEffect, useState } from 'react'
// import { useDispatch, useMappedState } from 'redux-react-hook'
import { axiosFetch } from '@utils'
import PropTypes from 'prop-types'

/**
 * 单依赖axiosFetch请求
 * @api {String} 接口地址
 * @param {object} option
 * depend 依赖项
 * resend
 */

const useAxiosFetch = ({ api, params = {}, depend, resend }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        setLoading(true)
        if (api && depend) {
            axiosFetch({
                api,
                params,
            }).then((res) => {
                setData(res)
                setError(null)
                setLoading(false)
            }).catch(err => {
                setData(null)
                setError(err)
                setLoading(false)
            })
        }
    }, [api, depend, resend])
    
    return { data, loading, error }
}

useAxiosFetch.propTypes = {
    api: PropTypes.string.isRequired,
    depend: PropTypes.any.isRequired,
}

export default useAxiosFetch

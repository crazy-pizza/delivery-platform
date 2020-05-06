import { useEffect, useState } from 'react'
// import { useDispatch, useMappedState } from 'redux-react-hook'
import { axiosFetch } from '@utils'
import PropTypes from 'prop-types'

/**
 * @param {object} option
 * api 接口地址
 * depend 依赖项
 */

const useAxiosFetch = ({ api, params = {}, depend }) => {
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
    }, [api, depend])
    
    return { data, loading, error }
}

useAxiosFetch.propTypes = {
    api: PropTypes.string.isRequired,
    depend: PropTypes.any.isRequired,
}

export default useAxiosFetch

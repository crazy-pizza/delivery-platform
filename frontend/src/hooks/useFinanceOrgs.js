import { useState, useEffect } from 'react'
import { axiosFetch } from '@utils'


const useFinanceOrgs = (accountset, url) => {
    const [dropDownParts, setDropDownParts] = useState([])

    useEffect(() => {
        if (!accountset) {
            setDropDownParts([])
            return
        }
        axiosFetch({
            api: url,
            params: {
                accountID: accountset,
            },
        }).then((res) => {
            setDropDownParts(res)
        })
    }, [accountset, url])
    return dropDownParts
}

export default useFinanceOrgs

import { Modal } from "antd"
import _ from 'lodash'
import { menuListData } from '@constants'
export { getTableTotalWidth } from './TableColumns'
export { getColumnWidth } from './getColumnWidth'
export { formatTreeWthTitleAndKey } from './tree'
export { LEFT_TREE_WIDTH } from './layout'

const parseUrl = (url) => {
    return url.split('/')[0] ? url : url.substr(1)
}

const getAllSonEntry = () => _.flatten(_.map(menuListData, 'items'))



/**
 * 根据页面编码获取组件名称，以按照路径加载组件
 * @param {string} code 
 */
export const loadEntryByCode = (code) => {
    const allEntry = getAllSonEntry()

    const findEntry = allEntry.find(entry => entry.entryCode === code)
    return findEntry ? findEntry.component : null
}

/**
 * 获取页面（最下层页面）信息
 * @param {string} code 页面编码: 1-1, 2-1, 2-2 
 */
export const getEntry = (code) => {
    const allEntry = getAllSonEntry()
    if (code) {
        return allEntry.find(entry => entry.entryCode === code)
    }
    return allEntry
}

/**
 * 转化为千位分隔符
 * @param {string|number} num 
 * @param {string} unit 
 */
export const parseThousandSeperator = (num, unit = '') => {
    if (num === '' || num === null) return ''
    const n = Number(num)
    if (isNaN(n)) return ''
    return `${(n).toLocaleString()}${unit}`
}

/**
 * 格式化地址栏参数
 */
export const parseUrlParams = () => {
    const params = {}
    const search = window.location.search.substr(1).split('&')

    if (search.length) {
        search.forEach((param) => {
            param = param.split('=')
            params[param[0]] = decodeURIComponent(param[1])
        })
    }

    return params
}

/**
 * 获取当前域名
 */
export const getHost = () => {
    const prod = window.location.host.indexOf('scm.pay') > -1
    let host = 'scm.pay.hualala.com'

    if (process.env.NODE_ENV === 'development') {
        host = 'localhost:3000'
    } else if (prod) {
        host = 'hualala.com'
    } else {
        host = 'dohko.hualala.com'
    }

    return host
}

export const axiosFetch = (options) => {
    const {
        api,
        params = {},
        showError = true,
    } = options
    const protocol = window.location.protocol
    const host = getHost()
    const url = `${protocol}//${host}/${parseUrl(api)}`

    return window.fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
    }).then(response => {
        return response.json()
    }).then(res => {
        const { success, data } = res
        return success ? data : Promise.reject(res)
    }).catch(err => {
        showError && Modal.error({
            title: '提示',
            content: err.msg,
            onOk: () => {
                const expired = err.code === '002' // 登录失效
                if (expired) {
                    window.location.href = `${protocol}//${host}/login`
                }
            }
        })
        return Promise.reject(err)
    })
}

import React from 'react'
import Loadable from 'react-loadable'
import { loadEntryByCode } from '@utils'
import { getStore } from '@store'
import DefaultPage from './DefaultPage'

class BasicPage extends React.Component {
    constructor() {
        super()
        this.state = {
            Page: null
        }
    }

    componentDidMount() {
        const { entryCode } = this.props
        const pageName = loadEntryByCode(entryCode)

        if (!pageName) {
            this.setState({ Page: null })
            return
        }

        const Page = Loadable({
            loader: async() => {
                const store = getStore()
                const import_promise = import(`../../pages/${pageName}/reducer`).then(cmp => {
                    store.injectReducer(pageName, cmp.default)
                }).catch(err => {
                    console.log(err)
                })
                await import_promise
                return import(`../../pages/${pageName}`)
            },
            loading: () => <DefaultPage />,
            delay: 200,
        })

        this.setState({ Page })

        // import(`../../pages/${pageName}`).then(cmp => {
        //     this.setState({ Page: cmp.default })
        // })
    }

    render() {
        const { Page } = this.state
        return Page ? <Page {...this.props} /> : <DefaultPage />
    }
}


export default BasicPage

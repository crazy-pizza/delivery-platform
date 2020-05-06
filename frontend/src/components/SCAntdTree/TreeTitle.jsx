import React from 'react'
import styles from './treeTitle.module.css'

export function TreeTitle (props) {
    return <div className={styles['treeTitle']}>{props.title}</div>
}

import React from 'react'
import { Tree } from 'antd'
import { formatTreeWthTitleAndKey } from '@utils'
import { TreeTitle } from './TreeTitle.jsx'
import styles from './treeWrapper.module.css'

const { TreeNode } = Tree

export default class SCAntdTree extends React.Component {
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={<div>{item.title}</div>} key={item.key} dataRef={item} {...item}>
            {this.renderTreeNodes(formatTreeWthTitleAndKey(item.children, this.props.option))}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} title={<div>{item.title}</div>} dataRef={item} {...item}/>
    })
  }
  render() {
    const { treeTitle, treeData, option = {}, ...otherProps } = this.props
    if (!Array.isArray(treeData)) {
      throw new Error('缺少treeData属性,且为数组!')
    }
    // 存在重复格式化问题: TODO:
    const formatedTreeData = formatTreeWthTitleAndKey(treeData, option)
    return <div className={styles.treeWrapper}>
      { treeTitle && <TreeTitle title={treeTitle} />}
      <Tree
        // expandedKeys={expandedKeys}
        // onExpand={onExpand}
        // loadData={loadData}
        // onSelect={onSelect}
        {...otherProps}
      >{this.renderTreeNodes(formatedTreeData)}</Tree>
    </div>
  }
}

import React, { useState, useEffect, useCallback } from 'react'
import { Tree, Input } from 'antd'
import style from './SearchTree.module.less'

const { Search } = Input

function SearchTree(props) {
  const {
    dataList,
    chooseArea,
    isMultiple,
    isCheckable,
    authData,
    getBuildingKeys,
    isDisable,
    disabledKeys,
    hint,
  } = props
  const [expandedKeys, setExpandedKeys] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [flattenList, setFlattenList] = useState([])
  const [selectedKeys, setSelectedKeys] = useState()
  const getParentKey = (key, tree) => {
    let parentKey
    tree.forEach(treeNode => {
      const node = treeNode
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    })
    return parentKey
  }

  const generateList = useCallback(data => {
    data.forEach(treeNode => {
      const node = treeNode
      const { key, title } = node

      setFlattenList(list => [...list, { key, title }])
      setExpandedKeys(keys => [...keys, key])
      if (node.children) {
        generateList(node.children)
      }
    })
  }, [])

  useEffect(() => {
    generateList(dataList)
    setSelectedKeys(authData)
  }, [dataList, generateList, authData])

  const onExpand = _expandedKeys => {
    setExpandedKeys(_expandedKeys)
    setAutoExpandParent(false)
  }
  const onSelect = val => {
    chooseArea(val)
    setSelectedKeys(val)
  }
  const onCheck = (val, e) => {
    setSelectedKeys(val)
    if (isMultiple) {
      const arr = []
      e.checkedNodesPositions.forEach(item => {
        if (!item.node.children) {
          arr.push(item.node.key)
        }
      })
      getBuildingKeys(arr)
    }
  }
  const onChange = e => {
    const { value } = e.target
    const keys = flattenList
      .map(item => {
        if (item.title.includes(value)) {
          return getParentKey(item.key, dataList)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)

    setExpandedKeys(keys)
    setSearchValue(value)
    setAutoExpandParent(true)
  }

  const loop = data =>
    data.map(item => {
      const index = item.title.indexOf(searchValue)
      const beforeStr = item.title.slice(0, Math.max(0, index))
      const afterStr = item.title.slice(index + searchValue.length)
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className={style.searchedValue}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        )
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) }
      }
      return {
        title,
        key: item.key,
        disabled: disabledKeys?.includes(item.key),
      }
    })

  return (
    <div>
      <Search style={{ marginBottom: 8 }} placeholder={hint} onChange={onChange} />
      <Tree
        checkable={isCheckable}
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(dataList)}
        onSelect={onSelect}
        multiple={isMultiple}
        onCheck={onCheck}
        checkedKeys={selectedKeys}
        disabled={isDisable}
      />
    </div>
  )
}

export default React.memo(SearchTree)

/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { useState, useCallback, useEffect } from 'react'
import { Table } from 'antd'
import { conditionCriteria } from '@/constants/dictionary'
import ConditionSelector from '../ConditionSelector' // 防止依赖环
import TitleLine from '../TitleLine'

function Element(props) {
  const {
    searchConfig,
    columns,
    getList,
    children,
    rowSelection,
    handleRefSearch,
    propsCriteria,
    exportFile,
    fileName,
  } = props
  const aliaCtireria = propsCriteria ? { ...conditionCriteria, ...propsCriteria } : conditionCriteria
  const [searchCriteria, setSearchCriteria] = useState(aliaCtireria) // 查询条件包括pageSize:10，pageIndex:1
  const [dataSource, setDataSource] = useState([]) // 数据源
  const [total, setTotal] = useState(0) // 数据总条数
  const [topLength, setTopLength] = useState(0)
  const [totalLength] = useState(window.innerHeight)

  // useEffect(() => {
  //   setSearchCriteria(item => {
  //     if (propsCriteria) {
  //       const aliaItem = { ...item, ...propsCriteria }
  //       return aliaItem
  //     }
  //     return item
  //   })
  // }, [propsCriteria])

  const tableRef = React.createRef()
  useEffect(() => {
    setTopLength(tableRef.current.offsetTop)
  }, [tableRef])

  const fetchData = useCallback(async () => {
    const result = propsCriteria
      ? await getList({ ...searchCriteria, ...propsCriteria })
      : await getList(searchCriteria)
    setDataSource(result.data.records)
    setTotal(result.data.total)
  }, [getList, searchCriteria, propsCriteria])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // 将子集的ferchData方法传递给父级
  useEffect(() => {
    if (typeof handleRefSearch === 'function') {
      handleRefSearch(fetchData)
    }
  }, [fetchData, handleRefSearch])

  // 处理搜索数据，pageIndex得设置为1，pageSize保持不变，同时得兼容重置写法
  const handleSearch = data => {
    setSearchCriteria(oldCriteria => ({
      ...aliaCtireria,
      pageIndex: 1,
      pageSize: oldCriteria.pageSize,
      ...data,
    }))
  }
  // 选择10条，20条，30条等等展示数据时
  const onShowSizeChange = (pageIndex, pageSize) => {
    setSearchCriteria(criteria => ({ ...criteria, pageIndex, pageSize }))
  }

  // 点击数字页的时候，table跳转到对应页
  const onNumChange = index => {
    setSearchCriteria(criteria => ({ ...criteria, pageIndex: index }))
  }

  return (
    <>
      <ConditionSelector
        conditions={searchConfig}
        onSubmit={handleSearch}
        exportFile={exportFile}
        fileName={fileName}
      />
      {children && <TitleLine />}
      {children}
      <span ref={tableRef} />
      <Table
        rowKey='id'
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showTotal: () => `共${total}条数据`,
          current: searchCriteria.pageIndex,
          pageSize: searchCriteria.pageSize,
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: onNumChange,
          onShowSizeChange,
        }}
        rowSelection={rowSelection}
        scroll={{ y: totalLength - topLength - 227 }}
      />
    </>
  )
}
export default React.memo(Element)

/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, DatePicker, Form, Input, Select, Tree, TreeSelect, message } from 'antd'
import { isNil, pickBy } from 'lodash'
import * as React from 'react'
import moment from 'moment'
// import classNames from "classnames";
import isPromise from 'is-promise'
import styles from './style.module.less'

/**
 * 例子:
 *  {
        label: "所有分辨率",
        type: "select",
        value: "resolution",
        options: resolutions,
        componentOptions: {
          placeholder: "请选择",
          allowClear: true,
          showSearch: true,
          onChange: this.handleResolutionChange,
          optionFilterProp: "children"
        }
      },
     {
        label: "标签",
        type: "select",
        value: "tag",
        options: tags.map(r => ({
          key: r.id,
          label: r.name
        })),
        componentOptions: {
          placeholder: "请选择",
          mode: "multiple",
          allowClear: true,
          showSearch: true,
          onChange: this.handleTagChange,
          optionFilterProp: "children"
        }
      },
      {
        label: "节目名称",
        type: "input",
        value: "name",
        id: "name",
        style: { width: "190px" },
        componentOptions: {
          placeholder: "请输入",
          onChange: this.handleProgramNameChange
        }
      }

 * */

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker
// const { Search } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

class ConditionSelector extends React.Component {
  formRef = React.createRef()
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  // 用于清空输入框，并二次搜索
  handleReset = () => {
    const { reset } = this.props
    this.formRef.current.resetFields()
    reset && reset()
    this.handleSubmit()
  }

  handleResetFields = (data = []) => {
    const { form } = this.props
    form.resetFields(data)
  }

  // 在表单提交前进行的校验，以及针对时间段的特殊处理
  validateMyForm = values => {
    const takeNecessary = value => !isNil(value)
    let val
    if (values?.openTime) {
      val = {
        ...values,
        startDate: moment(values.openTime[0]).format('YYYY-MM-DD'),
        endDate: moment(values.openTime[1]).format('YYYY-MM-DD'),
      }
      delete val.openTime
    }
    return pickBy(val || values, takeNecessary)
  }

  // 用于提交表单，进行搜索
  handleSubmit = values => {
    // e && e.preventDefault();
    const { onSubmit } = this.props
    const condition = this.validateMyForm(values)
    this.setState({
      loading: true,
    })
    const result = onSubmit(condition)
    if (isPromise(result)) {
      result
        .then(() => {
          this.setState({
            loading: false,
          })
        })
        .catch(() => {
          this.setState({
            loading: false,
          })
        })
    } else {
      setTimeout(() => {
        this.setState({
          loading: false,
        })
      }, 1000)
    }
  }

  // 处理导出文件
  exportFileHandler = async () => {
    const values = await this.formRef.current.validateFields()
    const exportFile = this.props.exportFile
    const condition = this.validateMyForm(values)
    const { idObj = {} } = exportFile
    const { data } = await exportFile.exportMethod({ ...condition, ...idObj })

    const a = document.createElement('a')
    a.download = exportFile.fileName || '报表导出.xlsx'
    a.href = window.URL.createObjectURL(data)
    document.body.append(a)
    a.click()
    a.remove()
    message.success('已成功导出')
  }

  // 生成树节点
  renderTreeNodes = data => {
    const { TreeNode } = Tree
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} key={item.key} />
    })
  }

  // 生成组件选择块，选择块有
  componentSelector = component => {
    // if (isEmpty(component.type)) { // 当省略type时默认为input
    //   return null;
    // }
    const { componentOptions: config, style = {} } = component
    switch (component.type ? component.type.toLowerCase() : '') {
      case 'date':
        return <DatePicker {...config} style={{ width: '100%', ...style }} />
      case 'range':
        return <RangePicker {...config} style={{ width: '230px', ...style }} />
      case 'treeselect':
        return (
          <TreeSelect
            style={{ width: '100%', ...style }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeDefaultExpandAll
            treeData={component.treeData}
            treeNodeFilterProp='title'
            filterTreeNode
            allowClear
            showSearch
            {...config}
            placeholder='请选择'
          />
        )
      case 'select':
        return (
          <Select
            style={{ width: '100%', ...style }}
            placeholder='请选择'
            allowClear
            showSearch
            optionFilterProp='children'
            {...config}
          >
            {component.options.map(o => (
              <Option key={o.key} value={o.key} title={o.label}>
                {o.label}
              </Option>
            ))}
          </Select>
        )
      default:
        return <Input placeholder='请输入' {...config} style={{ width: '100%', ...style }} allowClear />
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { conditions, className, exportFile } = this.props
    const { loading } = this.state
    const initialValues = {}
    conditions.map(d => {
      initialValues[d.value] = d.defaultValue
    })
    return (
      <Form
        layout='inline'
        onFinish={this.handleSubmit}
        // className="clearfix"
        initialValues={initialValues}
        ref={this.formRef}
        className={styles.searchBar}
        autoComplete='off'
      >
        <div className={styles.searchForm}>
          {conditions.map(d => (
            <FormItem name={d.key} key={d.key} label={d.label} {...formItemLayout} style={{ marginBottom: 16 }}>
              {this.componentSelector(d)}
            </FormItem>
          ))}
        </div>

        <div className={styles.searchButton}>
          <Form.Item>
            {exportFile && (
              <Button type='primary' onClick={this.exportFileHandler}>
                导出
              </Button>
            )}
            <Button type='primary' htmlType='submit' loading={loading}>
              查询
            </Button>
            <Button htmlType='button' onClick={this.handleReset}>
              重置
            </Button>
          </Form.Item>
        </div>
      </Form>
      // </section>
    )
  }
}

const ConditionSelectorFrom = ConditionSelector
export default ConditionSelectorFrom

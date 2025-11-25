import { ReactNode } from 'react'
import {
  Input,
  DatePicker,
  InputNumber,
  Switch,
  Select,
  Cascader,
  Radio,
  TreeSelect,
  Transfer,
  AutoComplete,
  Checkbox,
} from 'antd'
import FixedRangePicker from './FixedRangePicker'
import FixedDatePicker from './FixedDatePicker'
import { IItemArray } from './types'
export default function getComponents(item: IItemArray, isPass?: () => void, isAutoFocus?: boolean): ReactNode {
  const ComponentType: { [key: string]: ReactNode } = {
    TreeSelect: (
      <TreeSelect
        allowClear
        autoClearSearchValue
        showSearch
        treeNodeFilterProp="label"
        treeData={item?.options}
        treeLine
        placeholder={item.placeholder || `请选择${item.label}`}
        {...item.config}
      ></TreeSelect>
    ),
    Search: (
      <Input.Search
        placeholder={item.placeholder || `请输入${item.label}`}
        {...item.config}
        onPressEnter={() => isPass && isPass()}
      />
    ),
    Input: (
      <Input
        placeholder={item.placeholder || `请输入${item.label}`}
        allowClear
        {...item.config}
        onPressEnter={() => isPass && isPass()}
        autoFocus={isAutoFocus}
      />
    ),
    Password: <Input.Password placeholder={item.placeholder || `请输入${item.label}`} {...item.config} />,
    TextArea: <Input.TextArea placeholder={item.placeholder || `请输入${item.label}`} {...item.config} />,
    InputNumber: (
      <InputNumber
        style={{ width: '100%' }}
        placeholder={item.placeholder || `请输入${item.label}`}
        {...item.config}
        autoFocus={isAutoFocus}
      />
    ),
    Select: (
      <Select
        allowClear
        placeholder={item.placeholder || `请选择${item.label}`}
        options={item?.options}
        autoFocus={isAutoFocus}
        {...item.config}
      />
    ),
    AutoComplete: (
      <AutoComplete
        placeholder={item.placeholder || `请选择${item.label}`}
        options={item?.options}
        allowClear
        autoFocus={isAutoFocus}
      ></AutoComplete>
    ),
    Switch: <Switch {...item.config} />,
    DatePicker: (
      <DatePicker style={{ width: '100%' }} placeholder={item.placeholder || `请选择${item.label}`} {...item.config} />
    ),
    RangePicker: <DatePicker.RangePicker {...item.config} />,
    FixedRangePicker: <FixedRangePicker {...item.config} />,
    FixedDatePicker: <FixedDatePicker {...item.config} />,
    Cascader: (
      <Cascader placeholder={item.placeholder || `请选择${item.label}`} {...item.config} options={item?.options} />
    ),
    Checkbox: <Checkbox.Group options={item?.options} {...item.config}></Checkbox.Group>,
    Radio: (
      <Radio.Group {...item.config}>
        {item?.options?.map((item: any, index: number) => {
          return (
            <Radio value={item.value} key={index}>
              {item.label}
            </Radio>
          )
        })}
      </Radio.Group>
    ),
    Transfer: <Transfer {...item.config} />,
    Custom: item?.slot,
  }
  return item.type ? (
    ComponentType[item.type]
  ) : (
    <Input placeholder={item.placeholder || `请输入${item.label}`} {...item.config} />
  )
}

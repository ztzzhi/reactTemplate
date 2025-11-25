import SearchForm from './components/SearchForm'
import dayjs from 'dayjs'
import { Button } from 'antd'
import { ExportOutlined, ImportOutlined } from '@ant-design/icons'
import React from 'react'
import { useForm } from 'antd/es/form/Form'
import './demo.less'
export default () => {
  const [form] = useForm()
  return (
    <SearchForm
      form={form}
      searchConfig={[
        {
          label: '销售时间',
          name: 'saleStartDate',
          type: 'FixedRangePicker',
          config: {
            showTime: false,
            customFormat: 'YYYY-MM-DD',
            maxDate: dayjs().subtract(1, 'day'),
            presets: [
              {
                label: '最近7天',
                value: [dayjs().subtract(7, 'day'), dayjs().subtract(1, 'day')],
              },
              {
                label: '最近14天',
                value: [dayjs().subtract(14, 'day'), dayjs().subtract(1, 'day')],
              },
              {
                label: '昨天',
                value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
              },
              {
                label: '上周',
                value: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
              },
              {
                label: '上个月',
                value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
              },
            ],
            disabledDate: (current: any, { from }: any) => {
              if (from) {
                return current.isAfter(from.add(3, 'month')) || current.isBefore(from.subtract(3, 'month'))
              }
              return false
            },
          },
        },
        {
          name: 'branchOffice',
          label: '渠道',
          type: 'Select',
          option: [
            { label: '直营', value: '直营' },
            { label: '加盟', value: '加盟' },
          ],
          placeholder: '请选择渠道',
          config: {
            showSearch: true,
            filterOption: true,
            optionFilterProp: 'label',
          },
        },
        {
          label: '商品年份',
          name: 'year',
          type: 'FixedDatePicker',
          placeholder: '请选择商品年份',
          config: {
            picker: 'year',
            format: 'YYYY',
            customFormat: 'YYYY',
          },
        },
        {
          name: 'branchOffice',
          label: '渠道',
          type: 'Select',
          option: [
            { label: '直营', value: '直营' },
            { label: '加盟', value: '加盟' },
          ],
          placeholder: '请选择渠道',
          config: {
            showSearch: true,
            filterOption: true,
            optionFilterProp: 'label',
          },
        },
        {
          label: '商品年份',
          name: 'year',
          type: 'FixedDatePicker',
          placeholder: '请选择商品年份',
          config: {
            picker: 'year',
            format: 'YYYY',
            customFormat: 'YYYY',
          },
        },
        {
          label: '商品年份',
          name: 'year',
          type: 'FixedDatePicker',
          placeholder: '请选择商品年份',
          config: {
            picker: 'year',
            format: 'YYYY',
            customFormat: 'YYYY',
          },
        },
        {
          label: '商品年份',
          name: 'year',
          type: 'FixedDatePicker',
          placeholder: '请选择商品年份',
          config: {
            picker: 'year',
            format: 'YYYY',
            customFormat: 'YYYY',
          },
        },
      ]}
      onFinish={async (vals) => {
        console.log(vals, 'vals')
      }}
      onReset={() => {
        form.resetFields()
      }}
      extra={
        <div className="table_extra_flex_wrapbox">
          <div className="table_extra_flex">
            <Button icon={<ImportOutlined />}>导入</Button>
          </div>
          <div className="table_extra_flex">
            <Button icon={<ExportOutlined />}>导出</Button>
          </div>
        </div>
      }
    ></SearchForm>
  )
}

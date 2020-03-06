import React, { useState, useEffect } from 'react'
import api from '@api/api.list';
// import { Form } from '@ant-design/compatible'; 旧写法需要引入
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Button, DatePicker, Select, Input, InputNumber, Form } from 'antd';
import moment from 'moment';
import SettlementController from '@api/settlement.controller';
import { FormTypes } from '@common/enum';
const Option = Select.Option;
const { RangePicker } = DatePicker;
interface IProps {
  searchHandler?: any;
  searchForm?: any;
  getInitListFlag?: boolean;
  initListApi?: string;
  collectWaveNo?: string;
  formType?: string;
  params?: any;
  id: string;
}

const MyForm = (props: IProps) => {
  const [form] = Form.useForm();
  const [formInfo, setFormInfo] = useState({
    categoryId: null,
    collectWaveNo: '',
    businessList: [],
    shopList: [],
    pickUpList: [],
    storeList: [],
    thdList: [],
    screenType: '1' // 订单筛选类型
  })
  const changeInfo = (type: string, value: any) => {
    setFormInfo({ ...formInfo, [type]: value });
  };

  const getSelectList = async type => {
    const params = {
      url: api.list,
      data: {
        merchantType: type
      }
    }
    try {
      const res: any = await SettlementController.getlists(params);
      if (res.success) {
        changeInfo('businessList', res.result)
      } else {
        changeInfo('businessList', [])
      }
    } catch (error) {
      console.log(error);
    }
  };
  const selectChange = (e, key) => {
    if (key === 'merchantType') {
      if (e) {
        getSelectList(e);
      }
      changeInfo('businessList', [])
      form.setFieldsValue({
        merchantId: ``
      });
    }
  };

  useEffect(() => {
    if (props.getInitListFlag) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getSelectList(1);
    }
  }, [])

  const onFinish = values => {
    console.log('Success:', values);
    const fieldsValue = JSON.parse(JSON.stringify(values));
    props.searchHandler(fieldsValue);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const disabledDate = current => {
    return current && current > moment().endOf('day');
  };

  const reset = () => {
    form.resetFields();
  };

  const initForm = () => {
    // const { getFieldDecorator } = props.form;
    const formList = props.searchForm || [];
    const formItemList: any = [];
    const TPL: any = (item: any) => {
      const _initInput = (
        <Input
          allowClear
          type='text'
          placeholder={item.placeholder}
          style={{ width: '100%' }}
        />
      )
      const _initInputNumber = (
        <InputNumber
          type='text'
          placeholder={item.placeholder}
          style={{ width: '100%' }}
        />
      )
      const _initDatePicker = (
        <DatePicker
          disabledDate={disabledDate}
          format={item.format ? item.format : 'YYYY-MM-DD'}
          allowClear
          placeholder={item.placeholder}
          style={{ width: '100%' }}
        />
      )
      const _initRangePicker = (
        <RangePicker
          allowClear
          showTime={item.showTime}
          format={item.format ? item.format : 'YYYY-MM-DD'}
        />
      )

      const _initSelect = (
        <Select
          allowClear
          showSearch
          style={{ minWidth: 171 }}
          placeholder={item.placeholder}
          optionFilterProp='children'
          onChange={e => {
            selectChange(e, item.field);
          }}
          filterOption={(input, option: any) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          {item.list && item.list.length && item.list.map(item => {
            return (
              <Option value={item.value} key={item.value}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      )

      const _initSelectBusiness = (<Select
        allowClear
        showSearch
        style={{ minWidth: 171 }}
        placeholder={item.placeholder}
        optionFilterProp='children'
        filterOption={(input, option: any) =>
          option.props.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
      >
        {formInfo.businessList.map((e: any) => {
          return (
            <Option value={e.merchantId} key={e.merchantId}>
              {e.merchantName}
            </Option>
          );
        })}
      </Select>)
      const _initTpl = (refs: any) => {
        return (
          <Col
            span={item.span ? item.span : 8}
            style={{ textAlign: 'left' }}
            key={item.field}
          >
            <Row justify='center' align='middle'>
              <Form.Item label={item.label} name={item.field}
                rules={[{ required: true, message: item.tips }]}
              >
                {refs}
              </Form.Item>
            </Row>

          </Col>
        )
      }
      switch (item.type) {
        case FormTypes.INPUT:
          return _initTpl(_initInput)
        case FormTypes.NUMBER:
          return _initTpl(_initInputNumber)
        case FormTypes.DATE:
          return _initTpl(_initDatePicker)
        case FormTypes.RANGE_DATE:
          return _initTpl(_initRangePicker)
        case FormTypes.SELECT:
          return _initTpl(_initSelect)
        case FormTypes.BUSINESS_SELECT:
          return _initTpl(_initSelectBusiness)

        default:
          break;
      }
    }
    if (formList && formList.length > 0) {
      formList.forEach((item: any) => {
        formItemList.push(TPL(item));
      });
    }
    // //console.log(formItemList)
    return formItemList;
  };

  return (
    <div className='myFormPart' id={props.id} style={{ paddingTop: 10 }}>
      <Form form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>{initForm()}</Row>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px'
          }}
        >
          <Button
            onClick={reset}
            style={{ marginRight: '25px' }}
          >
            重置
          </Button>
          <Button type='primary' htmlType='submit'>
            查询
          </Button>
        </Row>
      </Form>
    </div>
  )
}

MyForm.defaultProps = {
  getInitListFlag: false,
  initListApi: ''
}
export default MyForm

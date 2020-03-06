import React, { useReducer, useEffect } from 'react'
import CommonWrap from '@cpsCommon/CommonWrap'
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import searchForm from '@common/searchForm';
import apiList from '@api/api.list';
import { checkStatus } from '@utils/utils';
import utc from 'dayjs/plugin/utc' // load on demand
import MyForm from '@cps/common/myForm';
import MyList from '@cps/common/myList';
import { ISettlementList } from '@typings/settlementTypes';
import { getSettlementList, setSettlementLoading } from '@redux/settlement.redux';
dayjs.extend(utc) // 拓展utc offset功能

interface IProps {
  getSettlementList?: any;
  listData?: any;
  setSettlementLoading?: any;
}

interface IRow{
  settlementId: null;
  noteInfor: null;
}
interface IState{
  rowObj: IRow;
  visible: boolean;
  titleModal: string;
  propsChange: number;
  title: string;
  performanceType: any;
  saleItemIdModal: any;
  modalForm: any;
  textDescType: number;
  selectList: any;
  selectedRowKeys: any;
  modalType: number;
  supply: number;
  handling: number;
  columns: any;
  pageSize: number;
  updataList: number;
  apiUrl: string;
  visibleFeed: boolean;
  failName: any;
  successName: any;
  params: any;
  listData: ISettlementList;
}

// 较复杂state更新用reducer(保持数据更新)
function reducer (state: IState, action: any) {
  return {
    ...state,
    ...action.data
  };
}

const Settlement = (props: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    rowObj: {
      settlementId: null,
      noteInfor: null
    },
    visible: false,
    titleModal: '添加备注信息',
    propsChange: 1,
    title: '修改履约方式',
    performanceType: null,
    saleItemIdModal: null,
    modalForm: {
      performanceChannel: null,
      supplyType: null,
      machType: null
    },
    textDescType: 1,
    selectList: [],
    selectedRowKeys: [],
    modalType: 1,
    supply: 1,
    handling: 1,
    columns: [
      {
        title: '结算单Id',
        dataIndex: 'settlementId',
        key: 'settlementId',
        width: 100
      },
      {
        title: '商户编号',
        width: 100,
        dataIndex: 'merchantId',
        key: 'merchantId'
      },
      {
        title: '商家类型',
        width: 100,
        dataIndex: 'merchantType',
        key: 'merchantType',
        render: (text, record: any) => {
          return (
            <div className='' style={{}}>
              {record.merchantType === 1 ? (
                <span>销售商</span>
              ) : record.merchantType === 2 ? (
                <span>服务商</span>
              ) : (
                <span>平台</span>
              )}
            </div>
          );
        }
      },
      {
        title: '商家编码',
        dataIndex: 'merchantCode',
        key: 'merchantCode',
        width: 100
      },
      {
        title: '商家名称',
        dataIndex: 'merchantName',
        key: 'merchantName',
        width: 100
      },
      {
        title: '审核时间',
        dataIndex: 'collateTime',
        key: 'collateTime',
        width: 150,
        render: (text, record: any) => {
          return (
            <div className='' style={{}}>
              <span>
                {record.collateTime
                  ? dayjs(record.collateTime)
                    .utcOffset(480)
                    .format('YYYY-MM-DD HH:mm:ss')
                  : ''}
              </span>
            </div>
          );
        }
      },
      {
        title: '结算时间',
        dataIndex: 'settlementTime',
        key: 'settlementTime',
        width: 150,
        render: (text, record: any) => {
          return (
            <div className='' style={{}}>
              <span>
                {dayjs(record.settlementTime)
                  .utcOffset(480)
                  .format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
          );
        }
      },
      {
        title: '账期时间',
        dataIndex: 'accountDate',
        key: 'accountDate',
        width: 150,
        render: (text, record: any) => {
          return (
            <div className='' style={{}}>
              <span>
                {dayjs(record.accountDate)
                  .utcOffset(480)
                  .format('YYYY-MM-DD')}
              </span>
            </div>
          );
        }
      },
      {
        title: '结算金额',
        dataIndex: 'settlePrice',
        width: 150,
        key: 'settlePrice',
        render: (text, record: any) => {
          return (
            <div className='' style={{}}>
              <span>{record.settlePrice / 100}元</span>
            </div>
          );
        }
      },
      {
        title: '结算状态',
        key: 'status',
        width: 150,
        render: (text, record: any) => {
          return (
            <div className='pr prtd' style={{ width: 80 }}>
              {checkStatus(record.status)}
            </div>
          );
        }
      },
      {
        title: '审核备注',
        dataIndex: 'noteInfor',
        key: 'noteInfor',
        width: 150,
        render: (text, record: any) => {
          return (
            <div className='' style={{}}>
              <span>{record.noteInfor}</span>
            </div>
          );
        }
      },

      {
        title: '操作',
        width: 220,
        key: 'action',
        render: (text, record: any) => {
          return (
            <div className='' style={{}}>
              {record.status < 3 ? (
                <div>
                  <span
                    className='bsp'
                    style={{ marginRight: 5 }}
                    onClick={() => {
                    }}
                  >
                    添加备注
                  </span>
                  <span
                    className='bsp'
                    style={{ marginRight: 5 }}
                    onClick={() => {
                    }}
                  >
                    审核
                  </span>
                </div>
              ) : null}
              <span
                className='bsp'
                onClick={() => {
                }}
              >
                导出
              </span>
            </div>
          );
        }
      }
    ],
    pageSize: 20,
    updataList: 1,
    apiUrl: apiList.list,
    visibleFeed: false,
    failName: [],
    successName: [],
    params: {
      accountDateFrom: null,
      accountDateTo: null,
      collateTimeFrom: null,
      collateTimeTo: null,
      merchantId: null, // [1499]
      merchantType: 1,
      tenantId: 2,
      operationGroupId: '200000',
      status: [2, 3]
    }
  })

  // 表单搜索
  const searchHandler = obj => {
    props.setSettlementLoading(true)
    const sumbitForm = obj;
    sumbitForm.accountDateFrom = obj.accountDate || null;
    sumbitForm.accountDateTo = obj.accountDate || null;
    sumbitForm.collateTimeFrom = obj.shenghe ? obj.shenghe[0] : null;
    sumbitForm.collateTimeTo = obj.shenghe ? obj.shenghe[1] : null;
    sumbitForm.merchantId = obj.merchantId ? [obj.merchantId] : null;
    sumbitForm.status = obj.status
      ? obj.status === 1
        ? [2, 3]
        : [obj.status]
      : [2, 3];

    delete sumbitForm.accountDate;
    dispatch({ data: { 'params': sumbitForm } });
    const apiUrl = apiList.list
    getListData(apiUrl, sumbitForm)
  };
  const onSelectChange = (selectedRowKeys) => {
    dispatch({ data: { selectedRowKeys } });
  };

  // 获取数据
  const getListData = (params, page = 1, size = 1) => {
    const p = {
      apiUrl: apiList.list,
      queryCondition: {
        ...params,
        size,
        page
      }
    }
    props.getSettlementList(p)
  }
  // 初始化数据
  useEffect(() => {
    getListData(state.params)
  }, []);

  return (
    <CommonWrap>
      <div style={{ paddingTop: 0 }}>
        <MyForm
          searchForm={searchForm}
          params={state.params}
          searchHandler={searchHandler}
          id='myFormPartOut'
        />
        <MyList
          scrollx={1200}
          id='myListThCenterHeight'
          listData={props.listData}
          params={state.params}
          needDisabled
          rowKey='settlementId'
          apiUrl={state.apiUrl}
          disabledKey='status'
          disabledValue={2}
          columns={state.columns}
          onSelectChange={onSelectChange}
          needRowSelection
          apiversion='2'
          topData
          needPagination
          size={5}
          getListData={getListData}
        />
      </div>
    </CommonWrap>

  )
}

const mapStateToProps = (state: any) => {
  return {
    listData: state.settlement.settlementList
  };
};
const mapDispatchToProps = {
  getSettlementList, setSettlementLoading
};

export default connect(mapStateToProps, mapDispatchToProps)(Settlement);

/**
 * 列表组件
 */
import React, { useEffect, useReducer } from 'react'
import { Table, Pagination } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { pageSizeOptions } from '@common/global';
import { connect } from 'react-redux';

interface IProps {
  params: any;
  size?: number;
  needRowSelection: boolean;
  needPagination?: boolean;
  topData?: boolean;
  columns: any;
  rowKey: string;
  needDisabled: boolean;
  disabledKey: string;
  disabledValue: number;
  updataList?: number;
  apiUrl: string;
  apiversion: string;
  id: string;
  listType?: number;
  scrollx?: number;
  onSelectChange: any;
  listData?: any;
  listLoading?: boolean;
  getListData?: any;
}

interface IState{
  current: number;
  queryCondition: any;
  params: any;
  page: number;
  loading: true;
  selectedRowKeys: [];
  total: any;
  size: number;
  data: [];
}

// 较复杂state更新用reducer(保持数据更新)
function reducer (state: IState, action: any) {
  return {
    ...state,
    ...action.data
  };
}

const MyList = (props: IProps) => {
  const [state, dispatch] = useReducer(reducer, {
    current: 1,
    queryCondition: {},
    params: {},
    page: 1,
    loading: true,
    selectedRowKeys: [],
    total: null,
    size: 5,
    data: []
  })

  const onSelectChange = (selectedRowKeys) => {
    props.onSelectChange(selectedRowKeys, state.data)
    dispatch({ data: { selectedRowKeys } });
  }
  const onChange = page => {
    dispatch({ data: { 'current': page, page } });
    props.getListData(props.params, page, state.size)
  }
  const onShowSizeChange = (current, size) => {
    dispatch({ data: { size } });
    props.getListData(props.params, size, current)
  }

  const rowSelection = props.needDisabled
    ? {
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange,
      getCheckboxProps: (record: any) => ({
        disabled: record[props.disabledKey] !== props.disabledValue // Column configuration not to be checked
      })
    } : {
      selectedRowKeys: state.selectedRowKeys,
      onChange: onSelectChange
    }
  useEffect(() => {
    const res = props.listData
    const _r = {
      updateFlag: false,
      data: res.list,
      page: state.page,
      current: state.page,
      total: typeof res.total === 'string' ? parseInt(res.total, 10) : res.total,
      loading: false
    }
    dispatch({ data: _r });
  }, [props.listData])

  return (
    <div className='myTableList' id={props.id}>
      {props.topData ? (
        <div className='totalNumber'>
          <InfoCircleOutlined style={{ color: '#1985ff', marginRight: '10px' }} />
        总计:{state.total}条数据
        </div>
      ) : null}
      <div className='tablePart' style={{ overflowX: 'scroll' }}>
        {props.needRowSelection ? (
          <Table scroll={{ x: props.scrollx }} loading={props.listLoading} columns={props.columns} rowSelection={rowSelection} dataSource={state.data} rowKey={props.rowKey} pagination={false} />
        ) : (
          <Table loading={props.listLoading} columns={props.columns} dataSource={state.data} rowKey={props.rowKey} pagination={false} />
        )}
      </div>
      {props.needPagination ? (
        <div className='paginationPart' style={{ marginTop: 15 }}>
          <Pagination showQuickJumper current={state.current} showSizeChanger total={state.total} onChange={onChange} onShowSizeChange={onShowSizeChange} style={{ textAlign: 'right' }} pageSizeOptions={pageSizeOptions} defaultPageSize={props.size} pageSize={props.size} />
        </div>
      ) : null}
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    listLoading: state.settlement.settlementList.loading
  };
};
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);

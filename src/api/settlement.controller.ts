import { IGetListParams } from '@typings/common.typing';
import mockData from '@api/mock'
// 实现数据处理和业务解耦
export default class SettlementController { // 可按模块划分，如UserController
  /**
   * 获取列表信息
   * @param data
   */
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  static async getlists (params: IGetListParams) {
    // const res = await axios.post(params.url, params.data);
    return mockData;
  }
}

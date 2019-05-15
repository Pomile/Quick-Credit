import getItemsById from './getItemsById';

class RepaymentHelpers {
  static getRepaymentHistory(list, id, type) {
    return getItemsById(list, id, type);
  }
}

export default RepaymentHelpers;

import removeAllTableChildNode from '../tools/removeAllChildNode';
import loanCardTemplate from './template/loanCard';
import LoanOperator from '../loan/operations';

const loanCard = (data) => {
  const profileCardBlock = document.getElementById('loanCard');
  removeAllTableChildNode('loanCard');
  const duedate = LoanOperator.formatDate(data.duedate);
  const newData = { ...data, duedate };
  const loanBuild = loanCardTemplate(newData);
  profileCardBlock.insertAdjacentHTML('beforeend', loanBuild);
};

export default loanCard;

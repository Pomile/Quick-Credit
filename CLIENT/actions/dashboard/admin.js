import removeAllTableChildNode from '../tools/removeAllChildNode';
import loanSummaryCardTemplate from './template/loanSummaryCard';
import capitalizeWords from '../tools/capitalFirstLetter';

const loanCardsContainer = (data) => {
  const loanContainerBlock = document.getElementById('cardContainer');
  removeAllTableChildNode('cardContainer');
  let title = '';
  const loanCardsBuild = data.map((summary) => {
    if (summary.field && summary.field === 'status') {
      title = summary.value;
    } else if (summary.field && summary.field === 'repaid') {
      title = summary.value === 'true' ? title = 'Repaid' : title = 'Not Fully Repaid';
    } else {
      title = 'Total Loan';
    }
    title = capitalizeWords(title);
    const card = title === 'Total Loan' ? loanSummaryCardTemplate({ title, value: summary.total }) : loanSummaryCardTemplate({ title, value: summary.count });
    return card;
  }).join('\n');
  loanContainerBlock.insertAdjacentHTML('beforeend', loanCardsBuild);
};

export default loanCardsContainer;

import bankTemplate from '../template/Bank';
import removeAllTableChildNode from '../../tools/removeAllChildNode';
import title from '../../title/title';
import getBankDetails from './getBankDetails';

const showBank = () => {
  removeAllTableChildNode('profileId');
  const temp = bankTemplate();
  title('Bank Info');
  const profile = document.getElementById('profileId');
  profile.insertAdjacentHTML('beforeend', temp);
  getBankDetails();
};

export default showBank;

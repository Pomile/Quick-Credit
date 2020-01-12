import bankTemplate from '../template/Bank';
import removeAllTableChildNode from '../../tools/removeAllChildNode';
import title from '../../title/title';

const showBank = () => {
  removeAllTableChildNode('profileId');
  const temp = bankTemplate();
  title('Bank Info');
  const profile = document.getElementById('profileId');
  profile.insertAdjacentHTML('beforeend', temp);
};

export default showBank;

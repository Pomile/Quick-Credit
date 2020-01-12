import employmentTemplate from '../template/Employment';
import removeAllTableChildNode from '../../tools/removeAllChildNode';
import title from '../../title/title';

const showEmployment = () => {
  removeAllTableChildNode('profileId');
  const temp = employmentTemplate();
  title('Employment | Company');
  const profile = document.getElementById('profileId');
  profile.insertAdjacentHTML('beforeend', temp);
};

export default showEmployment;

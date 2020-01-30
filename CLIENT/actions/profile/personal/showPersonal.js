// remove child node if found
// render personal template
import showPersonalTemplate from '../template/Personal';
import removeAllChildNode from '../../tools/removeAllChildNode';
import title from '../../title/title';
import getPersonalData from './getPersonalData';

const showPersonal = () => {
  removeAllChildNode('profileId');
  const temp = showPersonalTemplate();
  title('Personal');
  const profile = document.getElementById('profileId');
  profile.insertAdjacentHTML('beforeend', temp);
  // get a user personal data and display
  getPersonalData();
};

export default showPersonal;

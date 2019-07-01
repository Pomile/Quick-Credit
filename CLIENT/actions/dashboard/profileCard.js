import removeAllTableChildNode from '../tools/removeAllChildNode';
import profileCardTemp from './template/profileCard';

const profileCard = (data) => {
  const profileCardBlock = document.getElementById('profileCard');
  removeAllTableChildNode('profileCard');
  const profileBuild = profileCardTemp(data);
  profileCardBlock.insertAdjacentHTML('beforeend', profileBuild);
};

export default profileCard;

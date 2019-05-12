import getItem from './getItem';

const findUser = (users, email, propName) => getItem(users, email, propName);

export default findUser;

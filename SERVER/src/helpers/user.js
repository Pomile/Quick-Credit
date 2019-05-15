import getItem from './getItem';

class UserHelpers {
  static findUser(users, email, propName) {
    return getItem(users, email, propName);
  }
}

export default UserHelpers;

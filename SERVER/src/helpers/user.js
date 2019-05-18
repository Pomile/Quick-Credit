import read from './read';
import create from './create';


class UserHelpers {
  static async findUser(table, field, value) {
    const userResult = await read(table, field, value);
    return userResult;
  }

  static async findAddress(table, field, value) {
    const addressResult = await read(table, field, value);
    return addressResult;
  }

  static async createUser({
    firstname, lastname, email, phone, password, isAdmin,
  }) {
    return create('users', {
      firstname, lastname, email, phone, password, isAdmin,
    });
  }

  static async createAddress({ userid, homeaddress, state }) {
    return create('addresses', { userid, homeaddress, state });
  }
}

export default UserHelpers;

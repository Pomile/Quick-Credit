import read from './crud/read';
import create from './crud/create';


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

  static async createAddress({ userid, homeAddress, state }) {
    return create('addresses', { userid, homeAddress, state });
  }

  static async createJob({
    officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, userid, state,
  }) {
    return create('jobs', {
      officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, userid, state,
    });
  }
}

export default UserHelpers;

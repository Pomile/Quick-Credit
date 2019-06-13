import read from './crud/read';
import create from './crud/create';
import update from './crud/update';
import readWithInnerJoin from './crud/readWithInnerJoin';

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
    firstname, lastname, email, phone, password,
  }) {
    const userResult = await create('users', {
      firstname, lastname, email, phone, password,
    });
    return userResult;
  }

  static async createAddress({ userid, homeAddress, state }) {
    const address = await create('addresses', { userid, homeAddress, state });
    return address;
  }

  static async createJob({
    officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, userid, state,
  }) {
    const job = await create('jobs', {
      officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, userid, state,
    });
    return job;
  }

  static async updateUserStatus({ status }, { email }) {
    const userStatus = await update('users', { status }, { email });
    return userStatus;
  }

  static async getUsersByStatus(matches, { status, repaid }) {
    const usersAndLoanDetails = await readWithInnerJoin(matches, { status, repaid });
    return usersAndLoanDetails;
  }

  static async updateUserPriviledge({ isadmin }, { email }) {
    const userIsAdmin = await update('users', { isadmin }, { email });
    return userIsAdmin;
  }
}

export default UserHelpers;

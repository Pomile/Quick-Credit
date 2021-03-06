import read from './crud/read';
import create from './crud/create';
import update from './crud/update';
import readWithInnerJoin from './crud/readWithInnerJoin';
import readWithOuterJoin from './crud/readWithOuterJoin';

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
    monthlyIncome, grossIncome, companyName, companyWebsite, position, years, userid,
  }) {
    const job = await create('jobs', {
      monthlyIncome, grossIncome, companyName, companyWebsite, position, years, userid,
    });
    return job;
  }

  static async createBank({
    name, accName, accNumber, bvn, userId,
  }) {
    const bank = await create('banks', {
      name, accName, accNumber, bvn, userId,
    });
    return bank;
  }

  static async updateUserStatus({ status }, { email }) {
    const userStatus = await update('users', { status }, { email });
    return userStatus;
  }

  static async getUsersByStatus(matches, { status, repaid }) {
    const usersAndLoanDetails = await readWithInnerJoin(matches, { status, repaid });
    return usersAndLoanDetails;
  }

  static async getUserProfile(matches, { id }) {
    const userProfile = await readWithOuterJoin(matches, { id });
    return userProfile;
  }

  static async getUserPersonalData({ id }) {
    const userPersonalData = await read('users', 'id', id);
    return userPersonalData;
  }

  static async updateUserPriviledge({ isadmin }, { email }) {
    const userIsAdmin = await update('users', { isadmin }, { email });
    return userIsAdmin;
  }

  static async updateUserImage({ image }, { id }) {
    const userImage = await update('users', { image }, { id });
    return userImage;
  }

  static async updateUserPassword({ password }, { email }) {
    const userPassword = await update('users', { password }, { email });
    return userPassword;
  }

  static async updateUser({
    firstname, lastname, email, phone, homeaddress, state,
  }, { id }) {
    const userUpdate = await update('users', {
      firstname, lastname, email, phone, homeaddress, state,
    }, { id });
    return userUpdate;
  }

  static async updateBankDetails({
    name, accName, accNumber, bvn,
  }, { userid }) {
    const bankDetailsUpdate = await update('banks', {
      name, accName, accNumber, bvn,
    }, { userid });
    return bankDetailsUpdate;
  }

  static async updateEmploymentDetails({
    companyWebsite, monthlyIncome, grossIncome, companyName, position, years,
  }, { userid }) {
    const jobDetailsUpdate = await update('jobs', {
      companyWebsite, monthlyIncome, grossIncome, companyName, position, years,
    }, { userid });
    return jobDetailsUpdate;
  }
}

export default UserHelpers;

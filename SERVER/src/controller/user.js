import jwt from 'jsonwebtoken';
import '@babel/polyfill';
import bcrypt from 'bcrypt';
import userHelpers from '../helpers/user';
import responseHelper from '../helpers/response';


class User {
  static async createAccount(req, res) {
    let token;
    const {
      firstname, lastname, email, phone, password,
    } = req.body;
    const user = await userHelpers.findUser('users', 'email', email);
    if (user.exist) {
      responseHelper.conflict(res, 'user already exists');
    } else {
      token = jwt.sign({
        data: {
          firstname, lastname, email, phone, password,
        },
      }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
      process.env.secretToken = token;
      const userData = await userHelpers.createUser({
        firstname, lastname, email, phone, password,
      });
      if (userData.data) {
        const { id, isadmin, status } = userData.data;
        responseHelper.resourceCreated(res, {
          id, firstname, lastname, email, phone, status, isadmin, token,
        });
      }
    }
  }

  static async authenticate(req, res) {
    const { email, password } = req.body;
    const findUserData = await userHelpers.findUser('users', 'email', email);
    if (findUserData.exist) {
      const hash = findUserData.data.password;
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          const token = jwt.sign({ data: findUserData.data }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
          findUserData.data.token = token;
          const {
            id, firstname, lastname, phone, isadmin, status, image,
          } = findUserData.data;
          responseHelper.oK(res, {
            id, firstname, lastname, email, phone, isadmin, token, status, image,
          }, 'user logged in successfully');
        } else {
          responseHelper.unauthorize(res, 'Incorrect email or password');
        }
      });
    } else {
      responseHelper.notFound(res, 'user not found');
    }
  }

  static async createUserHomeAddress(req, res) {
    const { id } = req.params;
    const { address, state, user } = req.body;
    const userAddress = await userHelpers.findAddress('addresses', 'userid', +id);
    const userid = user; const homeAddress = address;
    if (user === +id && !userAddress.exist) {
      const addAddress = await userHelpers.createAddress({ userid, homeAddress, state });
      responseHelper.resourceCreated(res, addAddress.data);
    } else if (user === +id && userAddress.exist) {
      responseHelper.conflict(res, 'user address already exists');
    } else {
      responseHelper.notFound(res, 'user not found');
    }
  }

  static async createUserJob(req, res) {
    const { id } = req.params;
    const {
      officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, user, state,
    } = req.body;
    const userHasAJob = await userHelpers.findUser('jobs', 'userid', +id);
    if (user === +id && !userHasAJob.exist) {
      const addJob = await userHelpers.createJob({
        officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, userid: user, state,
      });
      responseHelper.resourceCreated(res, addJob.data);
    } else if (user === +id && userHasAJob) {
      responseHelper.conflict(res, 'user job detail already exist');
    } else {
      responseHelper.notFound(res, 'user not found');
    }
  }

  static async createUserBankDetails(req, res) {
    const { id } = req.params;
    const {
      name, accName, accType, accNumber, bvn, user,
    } = req.body;
    const userHasABank = await userHelpers.findUser('banks', 'userid', +id);
    if (user === +id && !userHasABank.exist) {
      const addBank = await userHelpers.createBank({
        name, accName, accType, accNumber, bvn, userId: user,
      });
      responseHelper.resourceCreated(res, addBank.data);
    } else if (user === +id && userHasABank) {
      responseHelper.conflict(res, 'user bank detail already exist');
    } else {
      responseHelper.notFound(res, 'user not found');
    }
  }

  static async verifyUser(req, res) {
    const { email } = req.params;
    const { status } = req.body;
    const userVerify = await userHelpers.updateUserStatus({ status }, { email });
    if (userVerify.success) {
      const {
        id, firstname, lastname, phone, isadmin, token, image,
      } = userVerify.data;
      responseHelper.oK(res, {
        id, firstname, lastname, email, phone, isadmin, token, status, image,
      });
    }
  }

  static async getUsersbyStatus(req, res) {
    const { status } = req.query;
    const matches = {
      users: ['id', 'email', 'status', 'phone', 'firstname', 'lastname', 'image'],
      addresses: ['userid', 'homeaddress', 'state'],
      loans: ['client', 'repaid', 'id'],
    };
    const usersLoanDetails = await userHelpers.getUsersByStatus(matches, { status, repaid: false });
    if (usersLoanDetails.data) {
      responseHelper.oK(res, usersLoanDetails.data);
    }
  }

  static async modifyUserAdminPriviledge(req, res) {
    const { email } = req.params;
    const { isadmin } = req.body;

    const userPriviledge = await userHelpers.updateUserPriviledge({ isadmin }, { email });
    if (userPriviledge.success) {
      const {
        id, firstname, lastname, phone, token, image, status,
      } = userPriviledge.data;
      responseHelper.oK(res, {
        id, firstname, lastname, phone, status, isadmin, token, image,
      });
    }
  }

  static async getUserProfile(req, res) {
    const { id } = req.params;
    const { user } = req.body;
    const userExist = await userHelpers.findUser('users', 'id', +id);
    if (user === +id && userExist.exist) {
      const match = {
        users: ['id', 'email', 'status', 'phone', 'firstname', 'lastname', 'image'],
        addresses: ['userid', 'homeaddress', 'state'],
        jobs: ['userid', 'officeaddress', 'state', 'monthlyincome', 'grossincome', 'companyname', 'companysector', 'position', 'years'],
        banks: ['userid', 'name', 'accnumber', 'accname', 'acctype', 'bvn'],
      };
      const userProfile = await userHelpers.getUserProfile(match, { id: +id });
      const data = { ...userProfile.data[0] };
      responseHelper.oK(res, data, '');
    } else {
      responseHelper.notFound(res, 'user does not exist');
    }
  }

  static async updateUserImage(req, res) {
    const { id } = req.params;
    const { imageUrl } = req.body;
    const userExist = await userHelpers.findUser('users', 'id', +id);
    if (userExist.exist && req.user.id === +id) {
      const updateUser = await userHelpers.updateUserImage({ image: imageUrl }, { id });
      const { email, image } = updateUser.data;
      responseHelper.oK(res, { email, image });
    } else {
      responseHelper.notFound(res, 'user does not exist');
    }
  }
}

export default User;

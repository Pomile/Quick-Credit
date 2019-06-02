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
      users: ['id', 'email', 'status', 'phone', 'firstname', 'lastname'],
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
}

export default User;

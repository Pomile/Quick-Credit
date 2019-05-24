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
        const { id, isadmin } = userData.data;
        responseHelper.resourceCreated(res, {
          id, firstname, lastname, email, phone, isadmin,
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
          responseHelper.oK(res, { ...findUserData.data }, 'user logged in successfully');
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
    if (!userAddress.exist) {
      const addAddress = await userHelpers.createAddress({ userid, homeAddress, state });
      responseHelper.resourceCreated(res, addAddress.data);
    } else {
      responseHelper.conflict(res, 'user address already exists');
    }
  }

  static async createUserJob(req, res) {
    const { id } = req.params;
    const {
      officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, user, state,
    } = req.body;
    const userHasAJob = await userHelpers.findUser('jobs', 'userid', +id);
    if (!userHasAJob.exist) {
      const addJob = await userHelpers.createJob({
        officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, userid: user, state,
      });
      responseHelper.resourceCreated(res, addJob.data);
    } else {
      responseHelper.conflict(res, 'user job detail already exist');
    }
  }

  static async verifyUser(req, res) {
    const { email } = req.params;
    const { status } = req.body;

    const userVerify = await userHelpers.updateUserStatus({ status }, { email });
    if (userVerify.success) {
      responseHelper.oK(res, userVerify.data);
    }
  }
}

export default User;

import jwt from 'jsonwebtoken';
import env from 'dotenv';
import '@babel/polyfill';
import bcrypt from 'bcrypt';
import userHelpers from '../helpers/user';
import responseHelper from '../helpers/response';
import uploadImage from '../helpers/imageHelper';

env.config();

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
      companyWebsite, companyName, monthlyIncome, grossIncome, position, years, user,
    } = req.body;
    const userHasAJob = await userHelpers.findUser('jobs', 'userid', +id);
    if (user === +id && !userHasAJob.exist) {
      const addJob = await userHelpers.createJob({
        companyWebsite, monthlyIncome, grossIncome, companyName, position, years, userid: user,
      });
      responseHelper.resourceCreated(res, { ...addJob.data, msg: 'Employment details created' });
    } else if (user === +id && userHasAJob.exist) {
      const updateJobDetails = await userHelpers.updateEmploymentDetails(
        {
          companyWebsite, monthlyIncome, grossIncome, companyName, position, years,
        },
        { userid: user },
      );
      responseHelper.oK(res, { ...updateJobDetails.data, msg: 'Employment details update successfull' });
    } else {
      responseHelper.notFound(res, 'user not found');
    }
  }

  static async createUserBankDetails(req, res) {
    const { id } = req.params;
    const {
      name, accName, accNumber, bvn, user,
    } = req.body;
    const userHasABank = await userHelpers.findUser('banks', 'userid', +id);
    if (user === +id && !userHasABank.exist) {
      const addBank = await userHelpers.createBank({
        name, accName, accNumber, bvn, userId: user,
      });
      responseHelper.resourceCreated(res, { ...addBank.data, msg: 'Bank details created' });
    } else if (user === +id && userHasABank.exist) {
      const updateBankDetails = await userHelpers.updateBankDetails(
        {
          name, accName, accNumber, bvn,
        },
        { userid: user },
      );
      responseHelper.oK(res, { ...updateBankDetails.data, msg: 'Bank details update successful' });
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
      users: [
        'id',
        'email',
        'status',
        'phone',
        'firstname',
        'lastname',
        'image',
        'homeaddress',
        'state',
      ],
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
    if ((user === +id && userExist.exist) || req.user.isadmin) {
      const match = {
        users: ['id', 'email', 'status', 'phone', 'firstname', 'lastname', 'image', 'homeaddress', 'state'],
        jobs: ['userid', 'monthlyincome', 'grossincome', 'companyname', 'companywebsite', 'position', 'years'],
        banks: ['userid', 'name', 'accnumber', 'accname', 'bvn'],
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
    const userExist = await userHelpers.findUser('users', 'id', +id);
    if (userExist.exist && req.user.id === +id) {
      // upload user image
      let imageUrl;
      await uploadImage(
        `uploads/${userExist.data.firstname}_${id}_profile.jpeg`,
        req.file,
        async (err, result) => {
          if (err) {
            responseHelper.notFound(res, err);
          } else {
            imageUrl = result.url;
            const updatedUser = await userHelpers.updateUserImage({ image: imageUrl }, { id });
            const { email, image } = updatedUser.data;
            responseHelper.oK(res, { email, image });
          }
        },

      );
    } else {
      responseHelper.notFound(res, 'user does not exist');
    }
  }

  static async authorizeEmailAcount(req, res) {
    const {
      id, firstname, lastname, email,
    } = req.verified;
    const token = jwt.sign({
      data: {
        id, firstname, lastname, email,
      },
    }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    responseHelper.oK(res, { token, verified: true });
  }

  static async resetPassword(req, res) {
    const { password } = req.body;
    const { email } = req.user;
    const user = await userHelpers.updateUserPassword({ password }, { email });
    if (user.success) {
      responseHelper.oK(res, { msg: 'password updated successfully', updated: true });
    }
  }

  static async getUserPersonalData(req, res) {
    const { id } = req.params;
    const { user } = req.body;
    const userExist = await userHelpers.findUser('users', 'id', +id);
    if ((user === +id && userExist.exist)) {
      const {
        firstname, lastname, email, phone, homeaddress, state, image,
      } = userExist.data;
      responseHelper.oK(res, {
        firstname, lastname, email, phone, homeaddress, state, image, success: true,
      });
    } else {
      responseHelper.notFound(res, 'user does not exist');
    }
  }

  static async getUserEmploymentData(req, res) {
    const { id } = req.params;
    const { user } = req.body;
    const userJobExist = await userHelpers.findUser('jobs', 'userid', +id);
    if ((user === +id && userJobExist.exist)) {
      responseHelper.oK(res, { ...userJobExist.data, success: true });
    } else {
      responseHelper.notFound(res, 'Employment information is empty');
    }
  }

  static async getUserBankData(req, res) {
    const { id } = req.params;
    const { user } = req.body;
    const userBankExist = await userHelpers.findUser('banks', 'userid', +id);
    if ((user === +id && userBankExist.exist)) {
      responseHelper.oK(res, { ...userBankExist.data, success: true });
    } else {
      responseHelper.notFound(res, 'Bank information is empty');
    }
  }

  static async modifyPersonalData(req, res) {
    const { id } = req.params;
    const {
      firstname, lastname, email, phone, homeAddress, state,
    } = req.body;
    const user = await userHelpers.findUser('users', 'id', id);
    if (user.exist) {
      const updateUser = await userHelpers.updateUser({
        firstname, lastname, email, phone, homeaddress: homeAddress, state,
      }, { id });
      responseHelper.oK(res, {
        firstname: updateUser.data.firstname,
        lastname: updateUser.data.lastname,
        email: updateUser.data.email,
        phone: updateUser.data.phone,
        homeaddress: updateUser.data.homeaddress,
        state: updateUser.data.state,
      });
    } else {
      responseHelper.notFound(res, 'user does not exist');
    }
  }
}

export default User;

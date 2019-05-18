import jwt from 'jsonwebtoken';
import '@babel/polyfill';
import bcrypt from 'bcrypt';
import userHelpers from '../helpers/user';

class User {
  static async createAccount(req, res) {
    let token;
    const {
      firstname, lastname, email, phone, password, isAdmin,
    } = req.body;
    const user = await userHelpers.findUser('users', 'email', email);
    if (user.exist) {
      res.status(409).json({ error: 'user already exists' }).end();
    } else {
      token = jwt.sign({ data: email }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
      process.env.secretToken = token;
      const userData = await userHelpers.createUser({
        firstname, lastname, email, phone, password, isAdmin,
      });
      res.status(201).json({
        status: 201,
        data: {
          token, ...userData.data,
        },
      }).end();
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
          res.status(200).json({
            status: 200,
            data: findUserData.data,
            msg: 'user logged in successfully',
          }).end();
        } else {
          res.status(401).json({ status: 401, error: 'Incorrect password' }).end();
        }
      });
    } else {
      res.status(404).json({ status: 404, error: 'user not found' });
    }
  }

  static async createUserHomeAddress(req, res) {
    const { id } = req.params;
    const { address, state, user } = req.body;
    const userAddress = await userHelpers.findAddress('addresses', 'userid', user);
    const userid = user; const homeAddress = address;
    if (user === +id && !userAddress.exist) {
      const addAddress = await userHelpers.createAddress({ userid, homeAddress, state });
      res.status(201).json({ status: 201, data: addAddress.data }).end();
    } else {
      res.status(409).json({ status: 409, error: 'user address already exists' });
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
      res.status(201).json({ status: 201, data: addJob.data }).end();
    } else {
      res.status(409).json({ status: 409, error: 'user job detail already exist' });
    }
  }

  static verifyUser(req, res) {
    const { id } = req.body;
    const userIndex = data.users.findIndex(user => user.id === +id);
    if (userIndex !== 1) {
      const updateUser = { ...data.users[userIndex], status: 'verified' };
      data.users[userIndex] = updateUser;
      res.status(200).json({ status: 200, data: data.users[userIndex] }).end();
    }
  }
}

export default User;

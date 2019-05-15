import jwt from 'jsonwebtoken';
import '@babel/polyfill';
import bcrypt from 'bcrypt';
import userHelpers from '../helpers/user';
import data from '../data';

let counter = 0;
let homeAddressCounter = 0;
let jobCounter = 0;
class User {
  static async createAccount(req, res) {
    const status = 'unverified'; let token;
    const {
      firstname, lastname, email, phone, password, isAdmin,
    } = req.body;
    const user = userHelpers.findUser(data.users, email, 'email');
    if (user.exist) {
      res.status(409).json({ error: 'user already exists' }).end();
    } else {
      counter += 1;
      token = jwt.sign({ data: counter }, 'landxxxofxxxopportunity', { expiresIn: '24h' });
      data.users.push({
        id: counter, firstname, lastname, email, phone, password, status, isAdmin,
      });
      res.status(201).json({
        status: 201,
        data: {
          token, id: counter, firstname, lastname, email, phone, password, status, isAdmin,
        },
      }).end();
    }
  }

  static async authenticate(req, res) {
    const { email, password } = req.body;
    const findUserData = await userHelpers.findUser(data.users, email, 'email');
    if (findUserData.exist) {
      const hash = findUserData.data.password;
      bcrypt.compare(password, hash, (err, result) => {
        const token = jwt.sign({ data: findUserData.data.id }, 'landxxxofxxxopportunity', { expiresIn: '24h' });
        findUserData.data.token = token;
        if (result) {
          res.status(200).json({
            status: 200,
            data: findUserData.data,
            msg: 'user logged in successfully',
            isAuth: true,
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
    const userAddress = userHelpers.findUser(data.homeAddresses, +id, 'id');
    if (user === +id && !userAddress.exist) {
      homeAddressCounter += 1;
      data.homeAddresses.push({
        id: homeAddressCounter, user: +id, address, state,
      });
      res.status(201).json({
        status: 201,
        data: {
          id: homeAddressCounter, user: +id, address, state,
        },
      }).end();
    } else {
      res.status(409).json({ status: 409, error: 'user address already exists' });
    }
  }

  static async createUserJob(req, res) {
    const { id } = req.params;
    const {
      officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, user, state,
    } = req.body;
    const userHasAJob = userHelpers.findUser(data.job, +id, 'id');
    if (user === +id && !userHasAJob.exist) {
      jobCounter += 1;
      data.job.push({
        id: jobCounter, user: +id, officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, state,
      });
      res.status(201).json({
        status: 201,
        data: {
          id: jobCounter, user: +id, officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, state,
        },
      }).end();
    } else {
      res.status(409).json({ status: 409, error: 'user job detail already exist' });
    }
  }

  static async verifyUser(req, res) {
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

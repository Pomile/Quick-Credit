import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import findUser from '../helpers/findUser';
import findUserByEmail from '../helpers/findUserByEmail';
import findUserById from '../helpers/findUserById';
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
    const userExists = findUser(data.users, email);
    if (userExists) {
      res.status(409).json({ error: 'user already exists' }).end();
    } else {
      counter += 1;
      token = jwt.sign({ data: counter }, 'landxxxofxxxopportunity', { expiresIn: '24h' });
      data.users.push({
        id: counter, firstname, lastname, email, phone, password, status, isAdmin,
      });
      res.status(201).json({
        data: {
          token, id: counter, firstname, lastname, email, phone, password, status, isAdmin,
        },
      }).end();
    }
  }

  static async authenticate(req, res) {
    const { email, password } = req.body;
    const findUserData = findUserByEmail(data.users, email);
    if (findUserData.userExists) {
      const hash = findUserData.data.password;
      bcrypt.compare(password, hash, (err, result) => {
        const token = jwt.sign({ data: findUserData.data.id }, 'landxxxofxxxopportunity', { expiresIn: '24h' });
        findUserData.data.token = token;
        if (result) {
          res.status(200).json({
            data: findUserData.data, sucess: true, msg: 'user logged in successfully', isAuth: true,
          }).end();
        } else {
          res.status(401).json({ error: 'Incorrect password' }).end();
        }
      });
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  }

  static async createUserHomeAddress(req, res) {
    const { userId } = req.params;
    const { address, state, user } = req.body;
    const userAddress = findUserById(data.homeAddresses, +user);
    if (user === +userId && !userAddress.userExists) {
      homeAddressCounter += 1;
      data.homeAddresses.push({
        id: homeAddressCounter, user: +userId, address, state,
      });
      res.status(201).json({
        data: {
          id: homeAddressCounter, user: +userId, address, state,
        },
      }).end();
    } else {
      res.status(409).json({ error: 'user address already exists' });
    }
  }

  static async createUserJob(req, res) {
    const { userId } = req.params;
    const {
      officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, user, state,
    } = req.body;
    const userHasAJob = findUserById(data.job, +userId);
    if (user === +userId && !userHasAJob.userExists) {
      jobCounter += 1;
      data.job.push({
        id: jobCounter, user: +userId, officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, state,
      });
      res.status(201).json({
        data: {
          id: jobCounter, user: +userId, officeAddress, monthlyIncome, grossIncome, companyName, companySector, position, years, state,
        },
      }).end();
    } else {
      res.status(409).json({ error: 'user job detail already exist' });
    }
  }

  static async verifyUser(req, res) {
    const { id } = req.body;
    const userIndex = data.users.findIndex(user => user.id === id);
    const updateUser = { ...data.users[userIndex], status: 'verified' };
    data.users[userIndex] = updateUser;
    res.status(200).json({ data: data.users[userIndex] });
  }
}

export default User;
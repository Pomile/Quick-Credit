import jwt from 'jsonwebtoken';
import findUser from '../helpers/findUser';
import data from '../data';
let counter = 0;
class User {
  static async createAccount(req, res) {
    const status = 'unverified'; let token;
    const {
      firstname, lastname, email, phone, password, isAdmin,
    } = req.body;
    const len = data.users.length;
    const userExists = findUser(data.users, email);
    if (userExists) {
      res.status(409).json({ error: 'user already exists' }).end();
    } else {
      counter +=1;
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
}

export default User;

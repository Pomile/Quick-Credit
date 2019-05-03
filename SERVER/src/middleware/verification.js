import jwt from 'jsonwebtoken';
import findUserById from '../helpers/findUserById';
import data from '../data';

const verifyUser = (req, res, next) => {
  const payload = req.headers.authorization || req.headers['x-access-token'];
  if (req.headers.isauth === undefined) {
    res.status(401).json({ error: 'Not authorized', success: false }).end();
  } else if (JSON.parse(req.headers.isauth)) {
    jwt.verify(payload, 'landxxxofxxxopportunity', async (err, decoded) => {
      if (!err) {
        const user = findUserById(data.users, +decoded.data);
        if (user.userExists) {
          req.body.user = +decoded.data;
          next();
        }
      } else {
        res.status(401).send({ success: false, error: 'Invalid token', errMsg: err.message }).end();
      }
    });
  }
};

export default verifyUser;

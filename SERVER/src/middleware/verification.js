import jwt from 'jsonwebtoken';
import userHelpers from '../helpers/user';
import data from '../data';

const verifyUser = (req, res, next) => {
  const payload = req.headers.authorization;
  if (req.headers.isauth === undefined) {
    res.status(401).json({ status: 401, error: 'Not authorized', success: false }).end();
  } else if (JSON.parse(req.headers.isauth)) {
    jwt.verify(payload, 'landxxxofxxxopportunity', async (err, decoded) => {
      if (!err) {
        const user = userHelpers.findUser(data.users, +decoded.data, 'id');
        if (user.exist) {
          req.body.user = +decoded.data;
          req.user = user.data;
          next();
        }
      } else {
        res.status(422).json({ status: 422, error: 'Invalid token', errMsg: err.message }).end();
      }
    });
  }
};

export default verifyUser;

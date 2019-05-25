import dotenv from 'dotenv';
import debug from 'debug';
import userHelpers from '../helpers/user';
import encryptPassword from './encryptPassword';

dotenv.config();
const createAdmin = async (adminData) => {
  const {
    firstname, lastname, email, isadmin, phone,
  } = adminData;
  const pass = process.env.ADMIN_PASSWORD;
  const password = encryptPassword(pass);
  debug.log('Creating admin user....');
  const admin = await userHelpers.createAdmin({
    firstname, lastname, email, isadmin, phone, password,
  });
  debug.log('....done');
  return admin;
};

export default createAdmin;

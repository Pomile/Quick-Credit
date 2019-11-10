import bcrypt from 'bcrypt';


const encryptPassword = (password) => {
  const salt = 10;
  const pass = bcrypt.hashSync(password, salt, (err, hash) => {
    if (!err) {
      return hash;
    }
    return null;
  });
  return pass;
};

export default encryptPassword;

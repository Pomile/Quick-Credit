import bcrypt from 'bcrypt';

const salt = 10;
const encryptPassword = (password) => {
    const pass = bcrypt.hashSync(password, salt, (err, hash) => {
      if (!err) {
        return hash;
      }
      return null;
    });
    return pass;
  };

  export default encryptPassword;
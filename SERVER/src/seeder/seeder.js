import bcrypt from 'bcrypt';
import data from './data/data';
import userHelpers from '../helpers/user';
import loanHelpers from '../helpers/loan';

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
const seeder = async (datap) => {
  const { users } = datap;
  await users.forEach(async (user, i, arr) => {
    const passwrd = await encryptPassword(user.password);
    if (i === 0) {
      console.log('Start populating user data....');
    }
    if (user.id === (i + 1)) {
      const {
        firstname, lastname, email, phone, isAdmin,
      } = user;
      await userHelpers.createUser({
        firstname, lastname, email, phone, password: passwrd, isAdmin,
      });
    }
    if ((i + 1) === arr.length) {
      console.log('....done');
    }
  });
};

const seeder2 = async (datap) => {
  const { loans } = datap;
  await loans.forEach(async (loan, i, arr) => {
    if (i === 0) {
      console.log('\n Start populating loan data....');
    }
    const {
      client, amount, tenor, interest, monthlyinstallment, duedate, balance, createon,
    } = loan;
    await loanHelpers.createLoan({
      client, createon, amount, tenor, status: loan.status, repaid: loan.repaid, interest, monthlyinstallment, duedate, balance,
    });
    if ((i + 1) === arr.length) {
      console.log('....done');
    }
  });
};

const seedall = async () => {
  await seeder(data);
  await setTimeout(async () => {
    await seeder2(data);
  }, 2000);
};

seedall();

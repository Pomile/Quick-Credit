import create from './crud/create';

const createAdmin = async ({
  firstname, lastname, email, phone, password, isadmin,
}) => {
  const userResult = await create('users', {
    firstname, lastname, email, phone, password, isadmin,
  });
  return userResult;
};

export default createAdmin;

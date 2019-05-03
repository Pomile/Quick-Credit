const user = {
  user1Data: {
    firstname: 'John',
    lastname: 'wilson',
    email: 'john.wilson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false,
  },
  user2Data: {
    firstname: 'Adeniyi',
    lastname: 'Jones',
    email: 'adeniyi.jone@gmail.com',
    phone: '08052392622',
    password: 'jones123456',
    cpassword: 'jones123456',
    isAdmin: true,
  },
  user1DataWithoutFirstname: {
    firstname: '',
    lastname: 'wilson',
    email: 'john.wilson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false,
  },
  user1DataWithoutLastname: {
    firstname: 'John',
    lastname: '',
    email: 'john.wilson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false,
  },
  user1DataWithInvalidEmail: {
    firstname: 'John',
    lastname: 'wilson',
    email: 'john.wilson@yahoo',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false,
  },
  user1DataWithoutPassword: {
    firstname: 'John',
    lastname: 'wilson',
    email: 'john.wilson@yahoo.com',
    phone: '908663789',
    password: '',
    cpassword: '',
    isAdmin: false,
  },

  user1DataWithInvalidPassword: {
    firstname: 'John',
    lastname: 'wilson',
    email: 'john.wilson@yahoo.com',
    phone: '908663789',
    password: 'gff',
    cpassword: 'gff',
    isAdmin: false,
  },
  user1DataWithPasswordMismatch: {
    firstname: 'John',
    lastname: 'wilson',
    email: 'john.wilson@yahoo.com',
    phone: '908663789',
    password: 'will12346',
    cpassword: 'will12340',
    isAdmin: false,
  },

  user1Cred: {
    email: 'john.wilson@yahoo.com',
    password: 'will12345',
  },
  user2Cred: {
    email: 'adeniyi.jone@gmail.com',
    password: 'jones123456',
  },
  user1CredWithoutEmail: {
    email: '',
    password: 'will12345',
  },
  user1CredWithInvalidEmail: {
    email: 'john.wilzon@yahoo.com',
    password: 'will12345',
  },
  user1CredWithIncorectPassword: {
    email: 'john.wilson@yahoo.com',
    password: 'will12345896',
  },
  user1CredWithInvalidPassword: {
    email: 'john.wilson@yahoo.com',
    password: 'wi5',
  },
  user2Cred: {
    email: 'adeniyi.jone@gmail.com',
    password: 'jones123456',
  },
  /* User 1 Update */
  user1Address: {
    address: '234, Gerard rd, Ikoyi',
    state: 'Lagos',
  },
  user1homeAddressWithoutAddress: {
    address: '',
    state: 'Lagos',
  },
  user1homeAddressWithoutState: {
    address: '234, Gerard rd, Ikoyi',
    state: '',
  },
  user1Company: {
    user: 1,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexnader rd, Ikoyi',
    state: 'Lagos',
  },
  user1Employment: {
    user: 1,
    monthlyIncome: 250000,
    grossIncome: 200000,
    position: 'Software developer',
    years: 3,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexnader rd, Ikoyi',
    state: 'Lagos',
  },
  adminAuth: {
    token: '',
    isAuth: false,
  },
  userAuth: {
    token: '',
    isAuth: false,
  },

};


export default user;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var user = {
  user1Data: {
    firstname: 'Kyle',
    lastname: 'Jackson',
    email: 'kyle.jackson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false
  },
  user2Data: {
    firstname: 'Adeniyi',
    lastname: 'Jones',
    email: 'adeniyi.jone@gmail.com',
    phone: '08052392622',
    password: 'jones123456',
    cpassword: 'jones123456',
    isAdmin: true
  },
  user1DataWithoutFirstname: {
    firstname: '',
    lastname: 'Jackson',
    email: 'kyle.jackson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false
  },
  user1DataWithNoFirstnameField: {
    lastname: 'Jackson',
    email: 'kyle.jackson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false
  },
  user1DataWithoutLastname: {
    firstname: 'Kyle',
    lastname: '',
    email: 'kyle.jackson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false
  },
  user1DataWithInvalidEmail: {
    firstname: 'Kyle',
    lastname: 'Jackson',
    email: 'kyle.jackson@yahoo',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12345',
    isAdmin: false
  },
  user1DataWithoutPassword: {
    firstname: 'Kyle',
    lastname: 'Jackson',
    email: 'kyle.jackson@yahoo.com',
    phone: '908663789',
    password: '',
    cpassword: '',
    isAdmin: false
  },
  user1DataWithInvalidPassword: {
    firstname: 'Kyle',
    lastname: 'Jackson',
    email: 'kyle.jackson@yahoo.com',
    phone: '908663789',
    password: 'wil',
    cpassword: 'wil',
    isAdmin: false
  },
  user1DataWithPasswordMismatch: {
    firstname: 'Kyle',
    lastname: 'Jackson',
    email: 'kyle.jackson@yahoo.com',
    phone: '908663789',
    password: 'will12345',
    cpassword: 'will12340',
    isAdmin: false
  },
  user1Cred: {
    email: 'kyle.jackson@yahoo.com',
    password: 'will12345'
  },
  user2Cred: {
    email: 'adeniyi.jone@gmail.com',
    password: 'jones123456'
  },
  user1CredWithoutEmail: {
    email: '',
    password: 'will12345'
  },
  user1CredWithNoEmailField: {
    password: 'will12345'
  },
  user1CredWithInvalidEmail: {
    email: 'kyle.jacksn@yahoo.com',
    password: 'will12345'
  },
  user1CredWithIncorectPassword: {
    email: 'kyle.jackson@yahoo.com',
    password: 'will12345896'
  },
  user1CredWithInvalidPassword: {
    email: 'kyle.jackson@yahoo.com',
    password: 'wi5'
  },
  user2CredWithIncorrectPass: {
    email: 'adeniyi.jone@gmail.com',
    password: 'jones123456'
  },

  /* User 1 Update */
  user1Address: {
    address: '234, Gerard rd, Ikoyi',
    state: 'Lagos'
  },
  user1homeAddressWithoutAddress: {
    address: '',
    state: 'Lagos'
  },
  user1homeAddressWithoutAddressProp: {
    state: 'Lagos'
  },
  user1homeAddressWithoutState: {
    address: '234, Gerard rd, Ikoyi',
    state: ''
  },
  user1Company: {
    user: 1,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexander rd, Ikoyi',
    state: 'Lagos'
  },
  user1Job: {
    monthlyIncome: 250000,
    grossIncome: 200000,
    position: 'Software developer',
    years: 3,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexander rd, Ikoyi',
    state: 'Lagos'
  },
  user1Job2: {
    monthlyIncome: 150000,
    grossIncome: 100000,
    position: 'Database Administrator',
    years: 3,
    companyName: 'Soft blue Limited',
    companySector: 'Computer Programming',
    officeAddress: '300, Malcom rd, Ikoyi',
    state: 'Lagos'
  },
  user1JobWithoutPosition: {
    monthlyIncome: 250000,
    grossIncome: 200000,
    position: '',
    years: 3,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexander rd, Ikoyi',
    state: 'Lagos'
  },
  user1JobWithoutMonthlyIncome: {
    monthlyIncome: '',
    grossIncome: 200000,
    position: 'Software developer',
    years: 3,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexander rd, Ikoyi',
    state: 'Lagos'
  },
  user1JobWithoutCompanyName: {
    monthlyIncome: 250000,
    grossIncome: 200000,
    position: 'Software developer',
    years: 3,
    companyName: '',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexander rd, Ikoyi',
    state: 'Lagos'
  },
  user1JobWithoutOfficeAddress: {
    monthlyIncome: 250000,
    grossIncome: 200000,
    position: 'Software developer',
    years: 3,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '',
    state: 'Lagos'
  },
  user1JobWithoutOfficeAddressProp: {
    monthlyIncome: 250000,
    grossIncome: 200000,
    position: 'Software developer',
    years: 3,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    state: 'Lagos'
  },
  user1JobWithoutState: {
    monthlyIncome: 250000,
    grossIncome: 200000,
    position: 'Software developer',
    years: 3,
    companyName: 'Soft Spring Limited',
    companySector: 'Computer Programming',
    officeAddress: '345, Alexander rd, Ikoyi',
    state: ''
  },
  adminAuth: {
    token: '',
    isAuth: false
  },
  userAuth: {
    token: '',
    isAuth: false
  }
};
var _default = user;
exports["default"] = _default;
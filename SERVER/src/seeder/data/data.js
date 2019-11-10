const data = {
  admin: {
    firstname: 'admin',
    lastname: 'super',
    email: 'admin@gmail.com',
    phone: '09078282177',
    password: 'admin12346',
    isadmin: true,
  },
  users: [
    /* {
            “id” : Integer PK,
            “email” : String unique NOT NULL ,
            “firstName” : String NOT NULL,
            “lastName” : String NOT NULL,
            "phone": String NULL,
            “password” : String NOT NULL,
            “status” : String NOT NULL, // unverified or verified
            “isAdmin” : Boolean NOT NULL,
        } */
    {
      id: 1,
      firstname: 'john',
      lastname: 'Wilson',
      email: 'john.wilson@yahoo.com',
      phone: '099484849',
      password: 'wilson12345',
      isAdmin: false,
    },
    {
      id: 2,
      firstname: 'Maria',
      lastname: 'Dolphin',
      email: 'maria.dolphin@yahoo.com',
      phone: '099484849',
      password: 'maria12345',
      isAdmin: false,
    },
    {
      id: 3,
      firstname: 'Levy',
      lastname: 'right',
      email: 'levy.right@yahoo.com',
      phone: '0894848409',
      password: 'right12345',
      isAdmin: false,
    },
    {
      id: 4,
      firstname: 'Gloria',
      lastname: 'Cold',
      email: 'gloria.cold@yahoo.com',
      phone: '0794840009',
      password: 'cold12345',
      isAdmin: false,
    },
    {
      id: 5,
      firstname: 'Jack',
      lastname: 'White',
      email: 'jack.white@yahoo.com',
      phone: '0794840001',
      password: 'white12345',
      isAdmin: false,
    },
  ],

  homeAddresses: [
    /* {
            “id” : Integer PK ,
            "user": integer FK, //user email
            “address” : String NOT NULL,
            “state” : String NOT NULL,
        } */
  ],

  job: [
    /* {
            “id” : Integer PK,
            "user": String FK, //user email
            “MonthlyIncome” : Float NOT NULL,
            “grossIncome” : Float NOT NULL,
            "years": integer NOT NULL,
            "position": String NOT null,
            "companyName": String NOT NULL,
            "companySector": String NOT NULL,
        } */
  ],


  loans: [
    /* {
            “id” : Integer PK,
            “user” : String FK, // user email
            “createdOn” : DateTime ,
            “status” : String NOT NULL, // pending, approved, rejected
            “repaid” : Boolean NOT NULL,
            “tenor” : Integer NOT NULL, // maximum of 12 months
            “amount” : Float NOT NULL,
            “monthlyInstallment” : Float NOT NULL, // monthly installment payment
                                      (amount + interest) / tenor
            “balance” : Float NOT NULL, (amount + interest) - repayment amount
            “interest” : Float NOT NULL, // 5% of amount
            ...
        } */
    {
      id: 1,
      client: 'john.wilson@yahoo.com',
      createdon: 'Mon Feb 05 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
      status: 'approved',
      repaid: true,
      tenor: 8,
      amount: 120000,
      monthlyinstallment: 15750,
      balance: 126000,
      interest: 6000,
      duedate: 'Jan 19, 2020',
    },

    {
      id: 2,
      client: 'maria.dolphin@yahoo.com',
      createdon: 'Mon October 05 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
      status: 'approved',
      repaid: false,
      tenor: 8,
      amount: 120000,
      monthlyinstallment: 15750,
      balance: 94500,
      interest: 6000,
      duedate: 'January 19, 2020',
    },
    {
      id: 3,
      client: 'gloria.cold@yahoo.com',
      createdon: 'Mon October 05 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
      status: 'pending',
      repaid: false,
      tenor: 8,
      amount: 100000,
      monthlyinstallment: 13125,
      balance: 91875,
      interest: 5000,
      duedate: 'January 19, 2020',
    },
    {
      id: 4,
      client: 'levy.right@yahoo.com',
      createdon: 'Mon May 05 2019 00:00:00 GMT+0100 (West Africa Standard Time)',
      status: 'pending',
      repaid: false,
      tenor: 8,
      amount: 120000,
      monthlyinstallment: 15750,
      balance: 126000,
      interest: 6000,
      duedate: 'January 5, 2020',
    },


  ],

  repayments: [
    /*
        {
            “id” : Integer PK,
            “loanId” : Integer FK,
            "collector": String FK,
            “amount” : Float NOT NULL,
            “createdOn” : DateTime NOT NULL,
                ...
        }
        */
    {
      id: 1,
      loanId: 1,
      collector: 'adeniyi.jone@gmail.com',
      amount: 15750,
      createdOn: 'Mon March 03 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
    },
    {
      id: 2,
      loanId: 1,
      collector: 'adeniyi.jone@gmail.com',
      amount: 15750,
      createdOn: 'Mon April 02 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
    },
    {
      id: 3,
      loanId: 1,
      collector: 'adeniyi.jone@gmail.com',
      amount: 15750,
      createdOn: 'Mon April 02 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
    },
    {
      id: 4,
      loanId: 1,
      collector: 'adeniyi.jone@gmail.com',
      amount: 15750,
      createdOn: 'Mon May 01 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
    },
    {
      id: 5,
      loanId: 1,
      collector: 'adeniyi.jone@gmail.com',
      amount: 31500,
      createdOn: 'Mon June 02 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
    },

    {
      id: 6,
      loanId: 1,
      collector: 'adeniyi.jone@gmail.com',
      amount: 31500,
      createdOn: 'Mon July 05 2018 00:00:00 GMT+0100 (West Africa Standard Time)',
    },

  ],

};

export default data;

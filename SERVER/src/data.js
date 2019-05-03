const data = {
  users: [
    /* {
            “id” : Integer PK,
            “email” : String unique NOT NULL ,
            “firstName” : String NOT NULL,
            “lastName” : String NOT NULL,
            "phone": String NULL,
            “password” : String NOT NULL,
            “address” : String NOT NULL,
            “status” : String NOT NULL, // unverified or verified
            “isAdmin” : Boolean NOT NULL,
        } */
  ],

  homeAddresses: [
    /* {
            “id” : Integer PK ,
            "user": integer FK,
            “address” : String NOT NULL,
            “state” : String NOT NULL,
        } */
  ],

  employment: [
    /* {
            “id” : Integer PK,
            "userId": integer FK,
            “MonthlyIncome” : Float NOT NULL,
            “grossIncome” : Float NOT NULL,
            "years": integer NOT NULL,
            "position": String NOT null,
        } */
  ],

  company: [
    /* {
            “id” : Integer pk,
            "userId": integer fk,
            "companyName": String NOT NULL,
            "companySector": String NOT NULL,
            "yearEstablish": Date NULL
        } */
  ],

  loan: [
    /* {
            “id” : Integer PK,
            “user” : String FK, // user email
            “createdOn” : DateTime ,
            “status” : String NOT NULL, // pending, approved, rejected
            “repaid” : Boolean NOT NULL,
            “tenor” : Integer NOT NULL, // maximum of 12 months
            “amount” : Float NOT NULL,
            “paymentInstallment” : Float NOT NULL, // monthly installment payment
                                      (amount + interest) / tenor
            “balance” : Float NOT NULL, (amount + interest) - repayment amount
            “interest” : Float NOT NULL, // 5% of amount
            ...
        } */
  ],

  repayment: [
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
  ],

};

export default data;

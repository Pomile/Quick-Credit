const job = `
id serial NOT NULL,
userId int UNIQUE NOT NULL,
monthlyIncome Numeric NULL,
grossIncome Numeric NULL,
years int NULL,
position character varying NOT NULL,
companyName text NOT NULL,
companySector character varying NOT NULL,
officeAddress character varying NOT NULL,
state character varying NOT NULL,

CONSTRAINT "Jobs_pkey" PRIMARY KEY (id),
CONSTRAINT "Jobs_userId_fkey" FOREIGN KEY (userId)
REFERENCES Users (id)
ON UPDATE CASCADE
ON DELETE NO ACTION
`;

export default job;

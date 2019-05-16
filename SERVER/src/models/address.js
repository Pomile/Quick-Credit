const address = `
id serial NOT NULL,
userId int UNIQUE NOT NULL,
homeAddress character varying NOT NULL,
state character varying NOT NULL,

CONSTRAINT "Addresses_pkey" PRIMARY KEY (id),
CONSTRAINT "Addresses_userId_fkey" FOREIGN KEY (userId)
REFERENCES Users (id)
ON UPDATE CASCADE
ON DELETE NO ACTION
`;

export default address;

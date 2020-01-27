const bank = `
id serial NOT NULL,
userId int UNIQUE NOT NULL,
accName character varying NOT NULL,
accNumber character varying NOT NULL,
bvn character varying NOT NULL,

CONSTRAINT "banks_pkey" PRIMARY KEY (id),
CONSTRAINT "banks_userId_fkey" FOREIGN KEY (userId)
REFERENCES Users (id)
ON UPDATE CASCADE
ON DELETE NO ACTION `;

export default bank;

const loan = `
id serial NOT NULL,
client text NOT NULL,
createOn timestamptz NOT NULL DEFAULT NOW(),
amount numeric NOT NULL,
tenor int NOT NULL,
repaid boolean NOT NULL DEFAULT false,
interest numeric NOT NULL,
monthlyInstallment numeric NOT NULL,
balance numeric NOT NULL,
dueDate date NOT NULL,

CONSTRAINT "Loans_pkey" PRIMARY KEY (id),
CONSTRAINT "Loans_client_fkey" FOREIGN KEY (client)
REFERENCES Users (email)
ON UPDATE CASCADE
ON DELETE NO ACTION
`;

export default loan;

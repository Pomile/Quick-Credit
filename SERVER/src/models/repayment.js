const repayment = `
id serial NOT NULL,
loanId int NOT NULL,
collector text NOT NULL,
createOn timestamptz NOT NULL DEFAULT NOW(),
amount numeric NOT NULL,
balance numeric NOT NULL,

CONSTRAINT "Repayments_pkey" PRIMARY KEY (id),
CONSTRAINT "Repayments_collector_fkey" FOREIGN KEY (collector)
REFERENCES Users (email)
ON UPDATE CASCADE
ON DELETE NO ACTION,
CONSTRAINT "Repayments_loanId_fkey" FOREIGN KEY (loanId)
REFERENCES Loans (id)
ON UPDATE CASCADE
ON DELETE NO ACTION
`;

export default repayment;

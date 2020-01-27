const user = `
      id serial NOT NULL,
      firstname character varying NOT NULL,
      lastname character varying NOT NULL,
      email text UNIQUE NOT NULL,
      image text NULL,
      password text NOT NULL,
      phone character varying NOT NULL,
      status character varying NOT NULL DEFAULT 'unverified',
      isadmin boolean NOT NULL DEFAULT 'f',
      homeAddress character varying NULL,
      state character varying NULL,
      
      CONSTRAINT "Users_pkey" PRIMARY KEY (id)
`;

export default user;

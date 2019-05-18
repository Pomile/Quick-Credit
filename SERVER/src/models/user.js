const user = `
      id serial NOT NULL,
      firstname character varying NOT NULL,
      lastname character varying NOT NULL,
      email text UNIQUE NOT NULL,
      image bytea NULL,
      password text NOT NULL,
      phone character varying NOT NULL,
      status character varying NOT NULL DEFAULT 'pending',
      isAdmin boolean NOT NULL DEFAULT false,
      CONSTRAINT "Users_pkey" PRIMARY KEY (id)
`;

export default user;
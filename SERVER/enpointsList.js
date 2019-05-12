const endpoints = `
<div style="padding: 10px 5px">- POST /api/v1/auth/signup</div>

<div style="padding: 10px 5px">- POST /api/v1/auth/signin</div>

<div style="padding: 10px 5px">- POST /api/v1/users/:id/address</div>

<div style="padding: 10px 5px">- POST /api/v1/users/:id/job</div>

<div style="padding: 10px 5px">- POST /api/v1/loans</div>

<div style="padding: 10px 5px">- GET /api/v1/loans</div>

<div style="padding: 10px 5px">- PATCH /api/v1/users/:email/verify</div>

<div style="padding: 10px 5px">- PATCH /api/v1/loans/:id</div>

<div style="padding: 10px 5px">- GET /api/v1/loans/:id</div>

<div style="padding: 10px 5px">- POST /api/v1/loans/:id/repayment</div>

<div style="padding: 10px 5px">- GET /api/v1/loans/:id/repayment</div>
`;
export default endpoints;

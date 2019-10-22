
const { NODE_ENV } = process.env;
const baseUrl = NODE_ENV === 'production'
  ? 'https://quick-credit-v1.herokuapp.com/api/v1'
  : 'http://localhost:8000/api/v1';

export default baseUrl;

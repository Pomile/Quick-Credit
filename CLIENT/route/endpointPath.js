
const { NODE_ENV } = process.env;
const baseUrl = NODE_ENV === 'https://quick-credit-v1.herokuapp.com/api/v1';

export default baseUrl;

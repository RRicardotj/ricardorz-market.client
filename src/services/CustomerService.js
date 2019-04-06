import Http from './Http';

const endpoint = 'customer';

export default {
  /**
    * Check token
    * @return {Http} GET to /customer/check
    */
  check() {
    return Http.get(`${endpoint}/check`);
  },

  signUp(data) {
    return Http.post(`${endpoint}/signup`, data);
  },

  signIn(data) {
    return Http.post(`${endpoint}/signin`, data);
  },
};

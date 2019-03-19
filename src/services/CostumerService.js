import Http from './Http';

const endpoint = 'customer';

export default {
  /**
    * Check token
    * @return {Http} GET to /auth/check
    */
  check() {
    return Http.get(`${endpoint}/check`);
  },
};

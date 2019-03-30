import Http from './Http';

const endpoint = 'shipping-region';

export default {
  /**
    * get shipping regions
    * @return {Http} GET to /shipping-region
    */
  index() {
    return Http.get(`${endpoint}`);
  },
};

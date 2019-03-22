import Http from './Http';

const endpoint = 'product';

export default {
  /**
    * get products for main scene
    * @return {Http} GET to /product/main
    */
  getProductsMain() {
    return Http.get(`${endpoint}/main`);
  },
};

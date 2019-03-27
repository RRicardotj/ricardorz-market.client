import Http from './Http';

const endpoint = 'cart';

export default {
  /**
    * get products in cart
    * @return {Http} GET to /category/:id/product
    */
  getShoppingcartByCartId(cartId) {
    return Http.get(`${endpoint}/${cartId}`);
  },

  addProduct(productId, data, cartId) {
    return Http.post(`${endpoint}/add`, { productId, data, cartId });
  },
};

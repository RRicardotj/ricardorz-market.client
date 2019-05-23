import Http from './Http';

const endpoint = 'shopping-cart';

export default {
  update(itemId, { quantity, color, size }, cartId) {
    return Http.put(`${endpoint}/${itemId}`, {
      quantity, color, size, cartId,
    });
  },
};

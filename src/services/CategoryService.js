import Http from './Http';

const endpoint = 'category';

export default {
  /**
    * get products by categoryId
    * @return {Http} GET to /category/:id/product
    */
  getAllProductsByCategoryId(id, page) {
    return Http.get(`${endpoint}/${id}/products`, { params: { page } });
  },
};

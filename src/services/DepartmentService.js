import Http from './Http';

const endpoint = 'department';

export default {
  /**
    * get deparments with their categories
    * @return {Http} GET to /department
    */
  getAllDepartmentsWithCategories() {
    return Http.get(`${endpoint}`);
  },
};

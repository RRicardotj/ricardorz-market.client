import Http from './Http';

const endpoint = 'department';

export default {
  /**
    * Check token
    * @return {Http} GET to /auth/check
    */
  getAllDepartmentsWithCategories() {
    return Http.get(`${endpoint}`);
  },
};
